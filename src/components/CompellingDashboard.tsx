import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Code2, 
  Trophy, 
  Target, 
  BookOpen, 
  Zap, 
  Users, 
  TrendingUp,
  Play,
  CheckCircle,
  Clock,
  Star,
  Flame,
  Brain,
  Rocket,
  FileCode,
  Monitor,
  Smartphone
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CompellingDashboardProps {
  user: any;
  profile: any;
}

interface LearningPath {
  id: string;
  name: string;
  description: string;
  icon: any;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedTime: string;
  progress: number;
  lessons: number;
  projects: number;
  color: string;
  technologies: string[];
  nextLesson?: string;
}

const learningPaths: LearningPath[] = [
  {
    id: "web-fundamentals",
    name: "Web Development Fundamentals",
    description: "Master HTML, CSS, and JavaScript through hands-on projects",
    icon: Monitor,
    difficulty: "Beginner",
    estimatedTime: "6-8 weeks",
    progress: 0,
    lessons: 24,
    projects: 8,
    color: "from-blue-500 to-purple-600",
    technologies: ["HTML", "CSS", "JavaScript"],
    nextLesson: "HTML Structure & Semantic Elements"
  },
  {
    id: "python-mastery",
    name: "Python Programming Mastery",
    description: "From basics to advanced Python with real-world projects",
    icon: Code2,
    difficulty: "Beginner",
    estimatedTime: "8-10 weeks",
    progress: 0,
    lessons: 32,
    projects: 12,
    color: "from-green-500 to-yellow-500",
    technologies: ["Python", "Django", "FastAPI"],
    nextLesson: "Python Basics & Variables"
  },
  {
    id: "javascript-advanced",
    name: "Advanced JavaScript & React",
    description: "Build modern web applications with React and advanced JS",
    icon: Rocket,
    difficulty: "Intermediate",
    estimatedTime: "10-12 weeks",
    progress: 0,
    lessons: 40,
    projects: 15,
    color: "from-yellow-500 to-orange-500",
    technologies: ["JavaScript", "React", "Node.js"],
    nextLesson: "ES6+ Features & Modern JavaScript"
  },
  {
    id: "mobile-development",
    name: "Mobile App Development",
    description: "Create native mobile apps with React Native",
    icon: Smartphone,
    difficulty: "Advanced",
    estimatedTime: "12-14 weeks",
    progress: 0,
    lessons: 36,
    projects: 10,
    color: "from-purple-500 to-pink-500",
    technologies: ["React Native", "TypeScript", "Expo"],
    nextLesson: "Mobile Development Fundamentals"
  }
];

export default function CompellingDashboard({ user, profile }: CompellingDashboardProps) {
  const navigate = useNavigate();
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [streakDays, setStreakDays] = useState(7);
  const [todayCompleted, setTodayCompleted] = useState(false);

  // Mock data for demonstration
  const [stats] = useState({
    totalXP: profile?.xp || 1250,
    level: profile?.level || 5,
    streak: profile?.streak || 7,
    projectsCompleted: 12,
    lessonsCompleted: 48,
    badgesEarned: 8,
    minutesCoded: 420,
    rank: "#127"
  });

  const startLearningPath = (pathId: string) => {
    const path = learningPaths.find(p => p.id === pathId);
    if (path?.id === "web-fundamentals") {
      navigate("/learn?language=html");
    } else if (path?.id === "python-mastery") {
      navigate("/learn?language=python");
    } else if (path?.id === "javascript-advanced") {
      navigate("/learn?language=javascript");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Stats Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-10"></div>
        <div className="container mx-auto px-6 py-12 relative">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16 ring-4 ring-primary/20">
                <AvatarImage src={profile?.avatar_url} />
                <AvatarFallback className="bg-gradient-primary text-2xl font-bold">
                  {profile?.display_name?.[0] || user?.email?.[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Welcome back, {profile?.display_name || "Coder"}!
                </h1>
                <p className="text-muted-foreground">Ready to level up your coding skills?</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="flex items-center space-x-1">
                  <Flame className="h-5 w-5 text-orange-500" />
                  <span className="text-2xl font-bold text-foreground">{stats.streak}</span>
                </div>
                <p className="text-sm text-muted-foreground">Day streak</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">Level {stats.level}</div>
                <p className="text-sm text-muted-foreground">Global rank {stats.rank}</p>
              </div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Star className="h-6 w-6 text-yellow-500" />
                </div>
                <div className="text-2xl font-bold text-foreground">{stats.totalXP}</div>
                <p className="text-sm text-muted-foreground">Total XP</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Trophy className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground">{stats.projectsCompleted}</div>
                <p className="text-sm text-muted-foreground">Projects</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <BookOpen className="h-6 w-6 text-green-500" />
                </div>
                <div className="text-2xl font-bold text-foreground">{stats.lessonsCompleted}</div>
                <p className="text-sm text-muted-foreground">Lessons</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Clock className="h-6 w-6 text-purple-500" />
                </div>
                <div className="text-2xl font-bold text-foreground">{stats.minutesCoded}</div>
                <p className="text-sm text-muted-foreground">Minutes coded</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 pb-12">
        <Tabs defaultValue="learning-paths" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="learning-paths" className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4" />
              <span>Learning Paths</span>
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>Progress</span>
            </TabsTrigger>
            <TabsTrigger value="community" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Community</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="learning-paths">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Choose Your Learning Path</h2>
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  Structured Learning
                </Badge>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {learningPaths.map((path) => {
                  const IconComponent = path.icon;
                  return (
                    <Card 
                      key={path.id}
                      className={`relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                        selectedPath === path.id ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => setSelectedPath(path.id)}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r ${path.color} opacity-5`}></div>
                      <CardHeader className="relative">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`p-3 rounded-lg bg-gradient-to-r ${path.color}`}>
                              <IconComponent className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <CardTitle className="text-lg">{path.name}</CardTitle>
                              <Badge variant="outline" className="mt-1 text-xs">
                                {path.difficulty}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-muted-foreground">{path.estimatedTime}</div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="relative">
                        <p className="text-muted-foreground mb-4">{path.description}</p>
                        
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="text-foreground font-medium">{path.progress}%</span>
                          </div>
                          <Progress value={path.progress} className="h-2" />
                          
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-4">
                              <span className="text-muted-foreground">{path.lessons} lessons</span>
                              <span className="text-muted-foreground">{path.projects} projects</span>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1 mt-3">
                            {path.technologies.map((tech) => (
                              <Badge key={tech} variant="secondary" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>

                          {path.nextLesson && (
                            <div className="mt-4 p-3 bg-muted/30 rounded-lg">
                              <div className="flex items-center space-x-2">
                                <Play className="h-4 w-4 text-primary" />
                                <span className="text-sm font-medium">Next: {path.nextLesson}</span>
                              </div>
                            </div>
                          )}
                        </div>

                        <Button 
                          className="w-full mt-4" 
                          onClick={(e) => {
                            e.stopPropagation();
                            startLearningPath(path.id);
                          }}
                          variant={path.progress > 0 ? "default" : "default"}
                        >
                          {path.progress > 0 ? (
                            <>
                              <Play className="h-4 w-4 mr-2" />
                              Continue Learning
                            </>
                          ) : (
                            <>
                              <Rocket className="h-4 w-4 mr-2" />
                              Start Learning Path
                            </>
                          )}
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="progress">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">Your Learning Progress</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Brain className="h-5 w-5 text-primary" />
                      <span>Skills Development</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">HTML/CSS</span>
                        <span className="text-sm font-medium">75%</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">JavaScript</span>
                        <span className="text-sm font-medium">60%</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Python</span>
                        <span className="text-sm font-medium">40%</span>
                      </div>
                      <Progress value={40} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Target className="h-5 w-5 text-green-500" />
                      <span>Recent Achievements</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-full">
                        <CheckCircle className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">First HTML Project</p>
                        <p className="text-xs text-muted-foreground">Completed 2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-500/10 rounded-full">
                        <Zap className="h-4 w-4 text-green-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">7-Day Streak</p>
                        <p className="text-xs text-muted-foreground">Keep it up!</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-yellow-500/10 rounded-full">
                        <FileCode className="h-4 w-4 text-yellow-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Code Master</p>
                        <p className="text-xs text-muted-foreground">Completed 10 exercises</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="community">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">Community & Leaderboard</h2>
              
              <Card>
                <CardHeader>
                  <CardTitle>Top Learners This Week</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Alex Chen", xp: 2450, rank: 1, avatar: "AC" },
                      { name: "Sarah Johnson", xp: 2380, rank: 2, avatar: "SJ" },
                      { name: "You", xp: stats.totalXP, rank: 127, avatar: profile?.display_name?.[0] || "U" },
                    ].map((user) => (
                      <div key={user.rank} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="text-lg font-bold text-muted-foreground">#{user.rank}</div>
                          <Avatar className="h-10 w-10">
                            <AvatarFallback>{user.avatar}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.xp} XP</p>
                          </div>
                        </div>
                        {user.name === "You" && (
                          <Badge variant="outline" className="bg-primary/10 text-primary">You</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}