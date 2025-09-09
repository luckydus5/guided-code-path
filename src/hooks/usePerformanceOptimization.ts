import { useCallback, useEffect, useState, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';

// Performance optimization hook for caching and preloading
export const usePerformanceOptimization = () => {
  const [cache, setCache] = useState<Map<string, any>>(new Map());
  const [isPreloading, setIsPreloading] = useState(false);

  // Intelligent caching with expiration
  const cacheWithExpiry = useCallback((key: string, data: any, ttl = 5 * 60 * 1000) => {
    const item = {
      data,
      timestamp: Date.now(),
      ttl
    };
    setCache(prev => new Map(prev.set(key, item)));
  }, []);

  // Fast cache retrieval
  const getCached = useCallback((key: string) => {
    const item = cache.get(key);
    if (!item) return null;
    
    if (Date.now() - item.timestamp > item.ttl) {
      setCache(prev => {
        const newCache = new Map(prev);
        newCache.delete(key);
        return newCache;
      });
      return null;
    }
    
    return item.data;
  }, [cache]);

  // Preload critical data in background
  const preloadCriticalData = useCallback(async (userId?: string) => {
    if (!userId || isPreloading) return;
    
    setIsPreloading(true);
    try {
      // Preload user profile and progress in parallel
      const [profileData, progressData, achievementsData] = await Promise.all([
        supabase.from('profiles').select('*').eq('user_id', userId).maybeSingle(),
        supabase.from('user_progress').select('*').eq('user_id', userId).limit(50),
        supabase.from('user_achievements').select('*, achievements(*)').eq('user_id', userId)
      ]);

      // Cache the preloaded data
      if (profileData.data) cacheWithExpiry(`profile_${userId}`, profileData.data);
      if (progressData.data) cacheWithExpiry(`progress_${userId}`, progressData.data);
      if (achievementsData.data) cacheWithExpiry(`achievements_${userId}`, achievementsData.data);

    } catch (error) {
      console.error('Preloading failed:', error);
    } finally {
      setIsPreloading(false);
    }
  }, [isPreloading, cacheWithExpiry]);

  // Optimistic update for instant UI feedback
  const optimisticUpdate = useCallback(<T>(
    key: string, 
    updateFn: (current: T) => T,
    serverUpdate: () => Promise<T>
  ) => {
    const current = getCached(key);
    if (current) {
      const optimistic = updateFn(current);
      cacheWithExpiry(key, optimistic, 30000); // Short TTL for optimistic updates
      
      // Update server in background
      serverUpdate()
        .then(result => cacheWithExpiry(key, result))
        .catch(() => {
          // Revert on failure
          if (current) cacheWithExpiry(key, current);
        });
    }
  }, [getCached, cacheWithExpiry]);

  return {
    cache: getCached,
    setCache: cacheWithExpiry,
    preloadCriticalData,
    optimisticUpdate,
    isPreloading
  };
};

// Fast data fetcher with intelligent caching
export const useFastDataFetch = <T>(
  key: string,
  fetchFn: () => Promise<T>,
  dependencies: any[] = []
) => {
  const { cache, setCache } = usePerformanceOptimization();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    // Check cache first
    const cached = cache(key);
    if (cached) {
      setData(cached);
      setLoading(false);
      return cached;
    }

    try {
      setLoading(true);
      const result = await fetchFn();
      setCache(key, result);
      setData(result);
      setError(null);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fetch failed');
      return null;
    } finally {
      setLoading(false);
    }
  }, [key, fetchFn, cache, setCache]);

  useEffect(() => {
    fetchData();
  }, [fetchData, ...dependencies]);

  return { data, loading, error, refetch: fetchData };
};