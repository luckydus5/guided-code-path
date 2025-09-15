import React, { memo, useMemo, useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, Clock, Star } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  duration: string;
  language: string;
  completed?: boolean;
}

interface ProjectItemProps {
  index: number;
  style: React.CSSProperties;
  data: {
    projects: Project[];
    onStartProject: (projectId: string) => void;
  };
}

// Simple virtualized list simulation for ultra-fast rendering
const VirtualizedList = ({ height, itemCount, itemSize, itemData, children: ItemComponent }: {
  height: number;
  itemCount: number;
  itemSize: number;
  itemData: any;
  children: React.ComponentType<any>;
}) => {
  const [scrollTop, setScrollTop] = React.useState(0);
  
  const startIndex = Math.floor(scrollTop / itemSize);
  const endIndex = Math.min(startIndex + Math.ceil(height / itemSize) + 1, itemCount);
  
  const items = [];
  for (let i = startIndex; i < endIndex; i++) {
    items.push(
      <ItemComponent
        key={i}
        index={i}
        style={{
          position: 'absolute',
          top: i * itemSize,
          left: 0,
          right: 0,
          height: itemSize,
        }}
        data={itemData}
      />
    );
  }
  
  return (
    <div
      style={{ height, overflowY: 'auto', position: 'relative' }}
      onScroll={(e) => setScrollTop((e.target as HTMLElement).scrollTop)}
      className="scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent"
    >
      <div style={{ height: itemCount * itemSize, position: 'relative' }}>
        {items}
      </div>
    </div>
  );
};

// Memoized project item for optimal performance
const ProjectItem = memo(({ index, style, data }: ProjectItemProps) => {
  const project = data.projects[index];
  
  return (
    <div style={style} className="px-2 py-1">
      <Card className="h-full hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <CardTitle className="text-lg font-semibold line-clamp-2">
              {project.title}
            </CardTitle>
            {project.completed && (
              <Star className="h-5 w-5 text-yellow-500 fill-current flex-shrink-0" />
            )}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Badge 
              variant={project.difficulty === 'Beginner' ? 'secondary' : 
                      project.difficulty === 'Intermediate' ? 'default' : 'destructive'}
            >
              {project.difficulty}
            </Badge>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-3 w-3 mr-1" />
              {project.duration}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
            {project.description}
          </p>
          
          <Button 
            onClick={() => data.onStartProject(project.id)}
            className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary transition-all duration-200"
          >
            <Play className="h-4 w-4 mr-2" />
            {project.completed ? 'Review Project' : 'Start Project'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
});

ProjectItem.displayName = 'ProjectItem';

interface VirtualizedProjectListProps {
  projects: Project[];
  onStartProject: (projectId: string) => void;
  height?: number;
}

// Virtualized list for ultra-fast rendering of large project lists
export const VirtualizedProjectList = memo(({ 
  projects, 
  onStartProject, 
  height = 600 
}: VirtualizedProjectListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');

  // Fast filtering with useMemo
  const filteredProjects = useMemo(() => {
    return (projects || []).filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDifficulty = difficultyFilter === 'all' || project.difficulty === difficultyFilter;
      
      return matchesSearch && matchesDifficulty;
    });
  }, [projects, searchTerm, difficultyFilter]);

  const itemData = useMemo(() => ({
    projects: filteredProjects,
    onStartProject
  }), [filteredProjects, onStartProject]);

  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  const handleDifficultyFilter = useCallback((difficulty: string) => {
    setDifficultyFilter(difficulty);
  }, []);

  return (
    <div className="space-y-4">
      {/* Fast filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="flex-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
        />
        
        <select
          value={difficultyFilter}
          onChange={(e) => handleDifficultyFilter(e.target.value)}
          className="px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
        >
          <option value="all">All Difficulties</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>

      {/* Virtualized list for performance */}
      {filteredProjects.length > 0 ? (
        <VirtualizedList
          height={height}
          itemCount={filteredProjects.length}
          itemSize={280}
          itemData={itemData}
        >
          {ProjectItem}
        </VirtualizedList>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No projects found matching your criteria.</p>
        </div>
      )}
    </div>
  );
});

VirtualizedProjectList.displayName = 'VirtualizedProjectList';