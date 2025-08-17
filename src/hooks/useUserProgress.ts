import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ProjectProgress {
  id: string;
  user_id: string;
  lesson_id: string; // We'll use this as project_id
  language: string;
  completed: boolean;
  attempts: number;
  time_spent_seconds: number;
  completed_at: string | null;
  created_at: string;
}

export const useProjectProgress = (userId: string | undefined, projectId: string | undefined, language: string | undefined) => {
  const [progress, setProgress] = useState<ProjectProgress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId || !projectId || !language) return;
    fetchProgress();
  }, [userId, projectId, language]);

  const fetchProgress = async () => {
    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId)
        .eq('lesson_id', projectId)
        .eq('language', language)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      setProgress(data || null);
    } catch (error) {
      console.error('Error fetching progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProgress = async (progressData: {
    completed?: boolean;
    attempts?: number;
    time_spent_seconds?: number;
  }) => {
    if (!userId || !projectId || !language) return;

    try {
      const { error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: userId,
          lesson_id: projectId,
          language: language,
          ...progressData,
          completed_at: progressData.completed ? new Date().toISOString() : null,
        });

      if (error) throw error;
      
      fetchProgress(); // Refresh progress
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  const completeProject = async () => {
    await updateProgress({
      completed: true,
      attempts: (progress?.attempts || 0) + 1,
    });
  };

  return {
    progress,
    loading,
    updateProgress,
    completeProject,
    refreshProgress: fetchProgress,
  };
};
