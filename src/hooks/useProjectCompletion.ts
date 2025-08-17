import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

export const useProjectCompletion = (user: User | null) => {
  const [completedProjects, setCompletedProjects] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setCompletedProjects(new Set());
      setLoading(false);
      return;
    }

    fetchCompletedProjects();
  }, [user]);

  const fetchCompletedProjects = async () => {
    if (!user) return;

    try {
      const { data: projectCompletions } = await supabase
        .from('project_completions')
        .select('project_id')
        .eq('user_id', user.id);
      
      if (projectCompletions) {
        setCompletedProjects(new Set(projectCompletions.map(p => p.project_id)));
      }
    } catch (error) {
      console.error('Error fetching completed projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const markProjectCompleted = (projectId: string) => {
    setCompletedProjects(prev => new Set([...prev, projectId]));
  };

  const isProjectCompleted = (projectId: string) => {
    return completedProjects.has(projectId);
  };

  return {
    completedProjects,
    loading,
    isProjectCompleted,
    markProjectCompleted,
    refreshCompletions: fetchCompletedProjects
  };
};