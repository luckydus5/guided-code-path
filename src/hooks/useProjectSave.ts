import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface FileTab {
  id: string;
  name: string;
  language: 'html' | 'css' | 'javascript' | 'typescript' | 'python';
  content: string;
  isActive: boolean;
}

interface SavedProject {
  projectId: string;
  language: string;
  files: FileTab[];
  lastSaved: Date;
  version: number;
}

export const useProjectSave = (projectId: string | undefined, language: string | undefined) => {
  const { toast } = useToast();
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved');
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);

  const getStorageKey = useCallback(() => {
    return `project_${projectId}_${language}`;
  }, [projectId, language]);

  const getVersionKey = useCallback(() => {
    return `project_versions_${projectId}_${language}`;
  }, [projectId, language]);

  const saveToLocalStorage = useCallback((files: FileTab[], isAutoSave = false) => {
    if (!projectId || !language) return;

    try {
      setSaveStatus('saving');
      
      const projectData: SavedProject = {
        projectId,
        language,
        files,
        lastSaved: new Date(),
        version: Date.now(),
      };

      // Save current version
      localStorage.setItem(getStorageKey(), JSON.stringify(projectData));

      // Save to version history (keep last 10 versions)
      const versionsKey = getVersionKey();
      const existingVersions = JSON.parse(localStorage.getItem(versionsKey) || '[]');
      const newVersions = [projectData, ...existingVersions].slice(0, 10);
      localStorage.setItem(versionsKey, JSON.stringify(newVersions));

      setSaveStatus('saved');
      
      if (!isAutoSave) {
        toast({
          title: "Project Saved",
          description: `Your ${language} project has been saved locally.`,
        });
      }
    } catch (error) {
      console.error('Save error:', error);
      setSaveStatus('unsaved');
      toast({
        title: "Save Failed",
        description: "Could not save your project. Please try again.",
        variant: "destructive",
      });
    }
  }, [projectId, language, getStorageKey, getVersionKey, toast]);

  const loadFromLocalStorage = useCallback((): FileTab[] | null => {
    if (!projectId || !language) return null;

    try {
      const saved = localStorage.getItem(getStorageKey());
      if (saved) {
        const projectData: SavedProject = JSON.parse(saved);
        return projectData.files;
      }
    } catch (error) {
      console.error('Load error:', error);
    }
    return null;
  }, [projectId, language, getStorageKey]);

  const getVersionHistory = useCallback((): SavedProject[] => {
    if (!projectId || !language) return [];

    try {
      const versions = localStorage.getItem(getVersionKey());
      return versions ? JSON.parse(versions) : [];
    } catch (error) {
      console.error('Version history error:', error);
      return [];
    }
  }, [projectId, language, getVersionKey]);

  const restoreVersion = useCallback((version: SavedProject) => {
    localStorage.setItem(getStorageKey(), JSON.stringify(version));
    toast({
      title: "Version Restored",
      description: `Restored project from ${version.lastSaved.toLocaleString()}`,
    });
    return version.files;
  }, [getStorageKey, toast]);

  // Auto-save functionality
  useEffect(() => {
    let autoSaveInterval: NodeJS.Timeout;
    
    if (autoSaveEnabled && saveStatus === 'unsaved') {
      autoSaveInterval = setTimeout(() => {
        // This would be triggered by file changes
        // The actual auto-save logic should be in the component
      }, 3000); // Auto-save after 3 seconds of inactivity
    }

    return () => {
      if (autoSaveInterval) {
        clearTimeout(autoSaveInterval);
      }
    };
  }, [autoSaveEnabled, saveStatus]);

  return {
    saveToLocalStorage,
    loadFromLocalStorage,
    getVersionHistory,
    restoreVersion,
    saveStatus,
    setSaveStatus,
    autoSaveEnabled,
    setAutoSaveEnabled,
  };
};
