import { memo, useMemo, Suspense, lazy } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VirtualizedProjectList } from '@/components/VirtualizedProjectList';
import { InstantSearch } from '@/components/InstantSearch';
import FastLoadingSpinner from '@/components/FastLoadingSpinner';
import { useFastDataFetch } from '@/hooks/usePerformanceOptimization';
import LearningDashboard from '@/components/LearningDashboard';
import { useNavigate } from 'react-router-dom';
import { 
  Rocket, 
  Zap, 
  TrendingUp, 
  Award, 
  BookOpen,
  Code,
  Trophy,
  Clock,
  Target,
  Sparkles
} from 'lucide-react';

// Lazy load heavy components - using existing components as fallback
const SimpleAnalytics = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <Card>
      <CardHeader>
        <CardTitle>Learning Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Your detailed analytics will appear here.</p>
      </CardContent>
    </Card>
  </div>
);

const SimpleCommunity = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <Card>
      <CardHeader>
        <CardTitle>Community Hub</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Connect with other learners here.</p>
      </CardContent>
    </Card>
  </div>
);

interface OptimizedLearningDashboardProps {
  user: any;
  profile: any;
}

interface ProjectData {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  duration: string;
  language: string;
  completed?: boolean;
}

// Ultra-fast learning dashboard with performance optimizations
export const OptimizedLearningDashboard = memo(({ user, profile }: OptimizedLearningDashboardProps) => {
  const navigate = useNavigate();

  // Fast data fetching with caching
  const { data: projects = [], loading: projectsLoading } = useFastDataFetch<ProjectData[]>(
    `projects_${user?.id}`,
    async () => {
      // Simulate fast API call - replace with actual data fetching
      return [
        {
          id: '1',
          title: 'African Mobile Money System',
          description: 'Build a comprehensive mobile money transfer system inspired by M-Pesa and other African fintech solutions.',
          difficulty: 'Beginner',
          duration: '4-6 hours',
          language: 'python'
        },
        {
          id: '2',
          title: 'African Language Translator',
          description: 'Create a translation system for major African languages (Swahili, Hausa, Yoruba, Amharic).',
          difficulty: 'Intermediate',
          duration: '6-8 hours',
          language: 'python'
        },
        {
          id: '3',
          title: 'Smart Agriculture Dashboard',
          description: 'Build a modern dashboard for African farmers with crop monitoring and weather integration.',
          difficulty: 'Advanced',
          duration: '8-12 hours',
          language: 'javascript'
        }
      ];
    },
    [user?.id]
  );

  // Memoized calculations for performance
  const stats = useMemo(() => {
    const completedProjects = (projects || []).filter(p => p.completed).length;
    const totalProjects = (projects || []).length;
    const progressPercentage = totalProjects > 0 ? (completedProjects / totalProjects) * 100 : 0;
    
    return {
      totalProjects,
      completedProjects,
      progressPercentage,
      streak: profile?.streak || 0,
      xp: profile?.xp || 0,
      level: profile?.level || 1
    };
  }, [projects, profile]);

  // Fast navigation handlers
  const handleStartProject = (projectId: string) => {
    const project = (projects || []).find(p => p.id === projectId);
    if (project) {
      navigate(`/learn/${project.language}/project/${projectId}`);
    }
  };

  const handleQuickStart = (language: string) => {
    navigate(`/learn/${language}`);
  };

  // Search data for instant search
  const searchData = useMemo(() => {
    return (projects || []).map(project => ({
      id: project.id,
      title: project.title,
      description: project.description,
      type: 'project' as const,
      difficulty: project.difficulty,
      language: project.language,
      path: `/learn/${project.language}/project/${project.id}`
    }));
  }, [projects]);

  const handleSearchSelect = (result: any) => {
    navigate(result.path);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header with Instant Search */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Welcome back, {profile?.display_name || 'Learner'}! 
            </h1>
            <p className="text-muted-foreground mt-2">
              Ready to build something amazing? Let's code at light speed! ⚡
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <InstantSearch 
              data={searchData}
              onSelect={handleSearchSelect}
              placeholder="Search projects, lessons..."
            />
            <Badge variant="outline" className="animate-pulse">
              <Sparkles className="h-3 w-3 mr-1" />
              AI-Powered
            </Badge>
          </div>
        </div>

        {/* Lightning-fast stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { 
              label: 'Projects Done', 
              value: stats.completedProjects, 
              icon: Trophy, 
              color: 'text-yellow-500',
              trend: '+12%'
            },
            { 
              label: 'Current Level', 
              value: stats.level, 
              icon: TrendingUp, 
              color: 'text-blue-500',
              trend: '+1'
            },
            { 
              label: 'Day Streak', 
              value: stats.streak, 
              icon: Zap, 
              color: 'text-orange-500',
              trend: 'Hot!'
            },
            { 
              label: 'Total XP', 
              value: stats.xp.toLocaleString(), 
              icon: Award, 
              color: 'text-purple-500',
              trend: '+250'
            }
          ].map((stat, index) => (
            <Card key={index} className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <Badge variant="secondary" className="text-xs mt-1">
                      {stat.trend}
                    </Badge>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color} group-hover:scale-110 transition-transform duration-200`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Progress Overview */}
        <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Learning Progress
              </CardTitle>
              <Badge variant="outline" className="animate-bounce">
                {Math.round(stats.progressPercentage)}% Complete
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={stats.progressPercentage} className="h-3 mb-2" />
            <p className="text-sm text-muted-foreground">
              {stats.completedProjects} of {stats.totalProjects} projects completed
            </p>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { 
              title: 'Start Python', 
              desc: 'Begin with African-focused projects', 
              action: () => handleQuickStart('python'),
              icon: Code,
              color: 'from-green-500 to-emerald-600'
            },
            { 
              title: 'Web Development', 
              desc: 'Build modern web applications', 
              action: () => handleQuickStart('javascript'),
              icon: Rocket,
              color: 'from-blue-500 to-cyan-600'
            },
            { 
              title: 'AI & Machine Learning', 
              desc: 'Explore AI with real datasets', 
              action: () => handleQuickStart('python'),
              icon: Sparkles,
              color: 'from-purple-500 to-pink-600'
            }
          ].map((action, index) => (
            <Card 
              key={index} 
              className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105"
              onClick={action.action}
            >
              <CardContent className="p-6">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">{action.title}</h3>
                <p className="text-sm text-muted-foreground">{action.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="community" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              Community
            </TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="space-y-4">
            {projectsLoading ? (
              <div className="flex items-center justify-center py-12">
                <FastLoadingSpinner size={32} />
                <span className="ml-3">Loading projects...</span>
              </div>
            ) : (
              <VirtualizedProjectList
                projects={projects}
                onStartProject={handleStartProject}
                height={500}
              />
            )}
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <SimpleAnalytics />
          </TabsContent>

          <TabsContent value="community" className="space-y-4">
            <SimpleCommunity />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
});

OptimizedLearningDashboard.displayName = 'OptimizedLearningDashboard';

export default OptimizedLearningDashboard;