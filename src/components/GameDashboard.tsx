import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Code, 
  Trophy, 
  Target, 
  Play, 
  Lock, 
  CheckCircle, 
  Star,
  Zap,
  TrendingUp,
  BookOpen,
  Award
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";

interface UserProfile {
  id: string;
  username: string;
  display_name: string;
  xp: number;
  level: number;
  streak: number;
  avatar_url?: string;
}

interface LanguageProgress {
  language: string;
  completedLessons: number;
  totalLessons: number;
  xpEarned: number;
  lastAccessed?: string;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned_at?: string;
}

interface GameDashboardProps {
  user: SupabaseUser;
  profile: UserProfile;
}

const LANGUAGES = [
  {
    id: 'python',
    name: 'Python',
    icon: '🐍',
    color: 'from-green-500 to-green-600',
    description: 'Master the fundamentals of Python programming',
    difficulty: 'Beginner Friendly'
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    icon: '🚀',
    color: 'from-yellow-500 to-yellow-600',
    description: 'Build dynamic web applications with JavaScript',
    difficulty: 'Intermediate'
  },
  {
    id: 'java',
    name: 'Java',
    icon: '☕',
    color: 'from-red-500 to-red-600',
    description: 'Enterprise-level programming with Java',
    difficulty: 'Advanced'
  }
];

export default function GameDashboard({ user, profile }: GameDashboardProps) {
  const navigate = useNavigate();
  const [languageProgress, setLanguageProgress] = useState<LanguageProgress[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [recentAchievements, setRecentAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    fetchProgress();
    fetchAchievements();
  }, [user.id]);

  const fetchProgress = async () => {
    // For now, use sample data since we haven't populated the lessons table yet
    const sampleProgress: LanguageProgress[] = [
      {
        language: 'python',
        completedLessons: Math.floor(Math.random() * 50),
        totalLessons: 150,
        xpEarned: Math.floor(Math.random() * 500),
        lastAccessed: new Date().toISOString()
      },
      {
        language: 'javascript',
        completedLessons: Math.floor(Math.random() * 30),
        totalLessons: 120,
        xpEarned: Math.floor(Math.random() * 300),
        lastAccessed: new Date(Date.now() - 86400000).toISOString()
      },
      {
        language: 'java',
        completedLessons: Math.floor(Math.random() * 20),
        totalLessons: 100,
        xpEarned: Math.floor(Math.random() * 200),
      }
    ];
    setLanguageProgress(sampleProgress);
  };

  const fetchAchievements = async () => {
    try {
      const { data: userAchievements } = await supabase
        .from('user_achievements')
        .select(`
          achievement_id,
          earned_at,
          achievements (
            id,
            name,
            description,
            icon
          )
        `)
        .eq('user_id', user.id)
        .order('earned_at', { ascending: false });

      if (userAchievements) {
        const formattedAchievements: Achievement[] = userAchievements.map(ua => ({
          id: ua.achievements.id,
          name: ua.achievements.name,
          description: ua.achievements.description,
          icon: ua.achievements.icon,
          earned_at: ua.earned_at
        }));
        
        setAchievements(formattedAchievements);
        setRecentAchievements(formattedAchievements.slice(0, 3));
      }
    } catch (error) {
      console.error('Error fetching achievements:', error);
    }
  };

  const getProgressPercentage = (completed: number, total: number) => {
    return (completed / total) * 100;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner Friendly': return 'text-success';
      case 'Intermediate': return 'text-warning';
      case 'Advanced': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const startLearning = (languageId: string) => {
    navigate(`/learn/${languageId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-6">
      <div className="container mx-auto max-w-7xl">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {profile.display_name}! 👋
          </h1>
          <p className="text-muted-foreground">
            Ready to level up your coding skills today?
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/20">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{profile.level}</p>
                  <p className="text-sm text-muted-foreground">Current Level</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-warning/20">
                  <Zap className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{profile.xp.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Total XP</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-destructive/10 to-destructive/5 border-destructive/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-destructive/20">
                  <span className="text-2xl">🔥</span>
                </div>
                <div>
                  <p className="text-2xl font-bold">{profile.streak}</p>
                  <p className="text-sm text-muted-foreground">Day Streak</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-success/20">
                  <Trophy className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{achievements.length}</p>
                  <p className="text-sm text-muted-foreground">Achievements</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Learning Paths */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Code className="h-6 w-6 text-primary" />
              Choose Your Learning Path
            </h2>
            
            <div className="grid gap-6">
              {LANGUAGES.map((language) => {
                const progress = languageProgress.find(p => p.language === language.id);
                const progressPercentage = progress ? getProgressPercentage(progress.completedLessons, progress.totalLessons) : 0;
                
                return (
                  <Card key={language.id} className="group hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-xl bg-gradient-to-br ${language.color} text-white text-2xl`}>
                            {language.icon}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold">{language.name}</h3>
                            <p className="text-muted-foreground text-sm">{language.description}</p>
                            <Badge variant="outline" className={getDifficultyColor(language.difficulty)}>
                              {language.difficulty}
                            </Badge>
                          </div>
                        </div>
                        <Button 
                          onClick={() => startLearning(language.id)}
                          className="group-hover:scale-105 transition-transform"
                        >
                          <Play className="h-4 w-4 mr-2" />
                          {progress?.completedLessons ? 'Continue' : 'Start'}
                        </Button>
                      </div>
                      
                      {progress && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>{progress.completedLessons} / {progress.totalLessons} lessons</span>
                            <span>{progress.xpEarned} XP earned</span>
                          </div>
                          <Progress value={progressPercentage} className="h-2" />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-warning" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                {recentAchievements.length > 0 ? (
                  <div className="space-y-3">
                    {recentAchievements.map((achievement) => (
                      <div key={achievement.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                        <span className="text-2xl">{achievement.icon}</span>
                        <div>
                          <p className="font-medium text-sm">{achievement.name}</p>
                          <p className="text-xs text-muted-foreground">{achievement.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">No achievements yet. Start learning to earn your first badge!</p>
                )}
              </CardContent>
            </Card>

            {/* Next Level Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Level Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Level {profile.level}</span>
                    <span>Level {profile.level + 1}</span>
                  </div>
                  <Progress 
                    value={((profile.xp % 100) / 100) * 100} 
                    className="h-3"
                  />
                  <p className="text-xs text-muted-foreground text-center">
                    {100 - (profile.xp % 100)} XP to next level
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Learning Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-info" />
                  Daily Tip
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  💡 Consistency is key! Try to complete at least one lesson every day to maintain your streak and accelerate your learning.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}