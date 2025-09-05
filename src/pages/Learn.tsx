import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectBasedLearning } from "@/components/ProjectBasedLearning";
import { 
  ArrowLeft,
  BookOpen,
  Star,
  TrendingUp,
  Target,
  Brain,
  Trophy,
  Clock
} from "lucide-react";

interface UserProgress {
  [language: string]: {
    completedProjects: number[];
    currentProject: number;
    totalTimeSpent: number;
    skillLevel: "Beginner" | "Intermediate" | "Advanced" | "Expert";
    achievements: string[];
    completedLessons: string[];
    masteryScore: number;
    streakDays: number;
    lastActiveDate: string;
  };
}

export default function Learn() {
  const { language } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [achievements, setAchievements] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load user progress from localStorage
  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('codelearning-progress');
    return saved ? JSON.parse(saved) : {};
  });

  // Get user data
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      
      if (user) {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();
        
        if (profileError) {
          console.error('Error fetching profile:', profileError);
        } else {
          setProfile(profileData);
        }

        const { data: achievementData } = await supabase
          .from('user_achievements')
          .select(`*, achievements (*)`)
          .eq('user_id', user.id);
        
        setAchievements(achievementData || []);
      }
      
      setIsLoading(false);
    };

    getUser();
  }, []);

  // Ensure we have a valid language parameter
  useEffect(() => {
    if (!language) {
      navigate('/learn/html');
      return;
    }
  }, [language, navigate]);

  const currentLanguageProgress = userProgress[language || 'html'] || {
    completedProjects: [],
    currentProject: 0,
    totalTimeSpent: 0,
    skillLevel: "Beginner" as const,
    achievements: [],
    completedLessons: [],
    masteryScore: 0,
    streakDays: 0,
    lastActiveDate: new Date().toISOString()
  };

  // Handle progress updates
  const handleProgressUpdate = (projectId: string, stepIndex: number) => {
    const currentLang = language || 'html';
    const updatedProgress = {
      ...userProgress,
      [currentLang]: {
        ...currentLanguageProgress,
        lastActiveDate: new Date().toISOString(),
        totalTimeSpent: currentLanguageProgress.totalTimeSpent + 15 // Add 15 minutes per step
      }
    };
    
    setUserProgress(updatedProgress);
    localStorage.setItem('codelearning-progress', JSON.stringify(updatedProgress));
    
    toast({
      title: "Progress Saved",
      description: `Step ${stepIndex + 1} completed!`,
      variant: "default"
    });
  };

  const completedProjects = currentLanguageProgress.completedProjects?.length || 0;
  const totalTimeSpent = Math.round(currentLanguageProgress.totalTimeSpent / 60) || 0; // Convert to hours
  const masteryScore = currentLanguageProgress.masteryScore || 0;
  const streakDays = currentLanguageProgress.streakDays || 0;

  const getLanguageDisplayName = (lang: string) => {
    const names: { [key: string]: string } = {
      'html': 'HTML/CSS',
      'python': 'Python',
      'javascript': 'JavaScript',
      'java': 'Java',
      'cpp': 'C++',
      'web-fundamentals': 'Web Fundamentals'
    };
    return names[lang] || lang.charAt(0).toUpperCase() + lang.slice(1);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your learning journey...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate('/')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-2xl font-bold">
                  {getLanguageDisplayName(language || 'html')} Learning Path
                </h1>
                <p className="text-muted-foreground">
                  Learn by building real projects step-by-step
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="flex items-center gap-1">
                <Trophy className="h-3 w-3" />
                Level: {currentLanguageProgress.skillLevel}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Star className="h-3 w-3" />
                {masteryScore}% Mastery
              </Badge>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <Card className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{completedProjects}</div>
                <div className="text-sm text-muted-foreground">Projects Completed</div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{totalTimeSpent}h</div>
                <div className="text-sm text-muted-foreground">Time Invested</div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{currentLanguageProgress.completedLessons?.length || 0}</div>
                <div className="text-sm text-muted-foreground">Steps Completed</div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{streakDays}</div>
                <div className="text-sm text-muted-foreground">Day Streak</div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="projects">
              <BookOpen className="h-4 w-4 mr-2" />
              Learn Projects
            </TabsTrigger>
            <TabsTrigger value="progress">
              <TrendingUp className="h-4 w-4 mr-2" />
              Progress
            </TabsTrigger>
            <TabsTrigger value="resources">
              <Target className="h-4 w-4 mr-2" />
              Resources
            </TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="mt-6">
            <ProjectBasedLearning 
              selectedLanguage={language || 'html'}
              onProgressUpdate={handleProgressUpdate}
            />
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Learning Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Overall Mastery</span>
                    <span className="text-sm text-muted-foreground">{masteryScore}%</span>
                  </div>
                  <Progress value={masteryScore} className="h-2" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Learning Stats</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Skill Level:</span>
                        <Badge variant="outline">{currentLanguageProgress.skillLevel}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Projects Completed:</span>
                        <span>{completedProjects}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Time Invested:</span>
                        <span>{totalTimeSpent} hours</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Current Streak:</span>
                        <span>{streakDays} days</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Recent Achievements</h4>
                    <div className="space-y-1">
                      {currentLanguageProgress.achievements?.length > 0 ? (
                        currentLanguageProgress.achievements.slice(0, 3).map((achievement, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <Trophy className="h-3 w-3 text-yellow-500" />
                            <span>{achievement}</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          Complete your first project to earn achievements!
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Learning Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">📚 Documentation</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Official documentation and guides for {getLanguageDisplayName(language || 'html')}
                    </p>
                    <Button variant="outline" size="sm">
                      View Resources
                    </Button>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">💡 Tips & Best Practices</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Learn industry best practices and coding standards
                    </p>
                    <Button variant="outline" size="sm">
                      Learn More
                    </Button>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">🏆 Challenges</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Test your skills with coding challenges and exercises
                    </p>
                    <Button variant="outline" size="sm">
                      Try Challenges
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}