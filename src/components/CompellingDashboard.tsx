import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Smartphone,
  Settings,
  Edit3,
  Save,
  User,
  Github,
  ExternalLink,
  FileText,
  File
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface CompellingDashboardProps {
  user: any;
  profile: any;
  onProfileUpdate?: () => void;
  showProfileEdit?: boolean;
  onCloseProfileEdit?: () => void;
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
  resources?: {
    type: "article" | "documentation" | "video";
    title: string;
    url: string;
    duration: string;
    difficulty: "Beginner" | "Intermediate" | "Advanced";
  }[];
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
    projects: 12,
    color: "from-blue-500 to-purple-600",
    technologies: ["HTML", "CSS", "JavaScript"],
    nextLesson: "HTML Structure & Semantic Elements",
    resources: [
      { type: "documentation", title: "CSS Flexbox Complete Reference", url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/", duration: "20 min", difficulty: "Beginner" },
      { type: "article", title: "JavaScript ES6+ Features Overview", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide", duration: "25 min", difficulty: "Intermediate" },
      { type: "documentation", title: "HTML5 Semantic Elements Guide", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element", duration: "15 min", difficulty: "Beginner" },
      { type: "article", title: "CSS Grid Layout Complete Guide", url: "https://css-tricks.com/snippets/css/complete-guide-grid/", duration: "30 min", difficulty: "Intermediate" },
      { type: "video", title: "JavaScript DOM Manipulation", url: "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model", duration: "45 min", difficulty: "Beginner" },
      { type: "documentation", title: "CSS Animations & Transitions", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations", duration: "25 min", difficulty: "Intermediate" },
      { type: "article", title: "Responsive Web Design Principles", url: "https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design", duration: "35 min", difficulty: "Beginner" },
      { type: "documentation", title: "JavaScript Event Handling", url: "https://developer.mozilla.org/en-US/docs/Web/Events", duration: "20 min", difficulty: "Beginner" },
      { type: "article", title: "Web Accessibility (a11y) Basics", url: "https://developer.mozilla.org/en-US/docs/Learn/Accessibility", duration: "40 min", difficulty: "Intermediate" },
      { type: "video", title: "Modern CSS Layout Techniques", url: "https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout", duration: "50 min", difficulty: "Intermediate" },
      { type: "documentation", title: "JavaScript Async Programming", url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous", duration: "30 min", difficulty: "Advanced" },
      { type: "article", title: "Web Performance Optimization", url: "https://developer.mozilla.org/en-US/docs/Learn/Performance", duration: "45 min", difficulty: "Advanced" }
    ]
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
    nextLesson: "Python Basics & Variables",
    resources: [
      { type: "article", title: "Python Data Structures Explained", url: "https://docs.python.org/3/tutorial/datastructures.html", duration: "18 min", difficulty: "Beginner" },
      { type: "documentation", title: "Python Standard Library Reference", url: "https://docs.python.org/3/library/", duration: "30 min", difficulty: "Intermediate" },
      { type: "article", title: "Object-Oriented Programming in Python", url: "https://realpython.com/python3-object-oriented-programming/", duration: "22 min", difficulty: "Intermediate" }
    ]
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
    nextLesson: "ES6+ Features & Modern JavaScript",
    resources: [
      { type: "article", title: "Modern JavaScript Features Guide", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide", duration: "25 min", difficulty: "Intermediate" },
      { type: "documentation", title: "React Official Documentation", url: "https://react.dev/learn", duration: "35 min", difficulty: "Intermediate" },
      { type: "article", title: "Node.js Best Practices", url: "https://nodejs.org/en/docs/guides/", duration: "20 min", difficulty: "Advanced" }
    ]
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
    nextLesson: "Mobile Development Fundamentals",
    resources: [
      { type: "article", title: "React Native Getting Started Guide", url: "https://reactnative.dev/docs/getting-started", duration: "20 min", difficulty: "Intermediate" },
      { type: "documentation", title: "Expo SDK Documentation", url: "https://docs.expo.dev/", duration: "25 min", difficulty: "Intermediate" },
      { type: "article", title: "Mobile App Performance Optimization", url: "https://reactnative.dev/docs/performance", duration: "30 min", difficulty: "Advanced" }
    ]
  }
];

export default function CompellingDashboard({ user, profile, onProfileUpdate, showProfileEdit = false, onCloseProfileEdit }: CompellingDashboardProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [stats, setStats] = useState({
    totalXP: profile?.xp || 0,
    level: profile?.level || 1,
    streak: profile?.streak || 0,
    projectsCompleted: 0,
    lessonsCompleted: 0,
    badgesEarned: 0,
    minutesCoded: 0,
    codingTimeDisplay: '0 mins',
    rank: "#0"
  });
  const [isProfileEditOpen, setIsProfileEditOpen] = useState(showProfileEdit);
  const [editProfile, setEditProfile] = useState({
    display_name: profile?.display_name || '',
    username: profile?.username || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.id) {
      fetchUserStats();
    }
  }, [user?.id]);

  useEffect(() => {
    setIsProfileEditOpen(showProfileEdit);
  }, [showProfileEdit]);

  const fetchUserStats = async () => {
    if (!user?.id) return;

    try {
      // Fetch completed projects
      const { data: projectCompletions, error: projectError } = await supabase
        .from('project_completions')
        .select('*')
        .eq('user_id', user.id);

      if (projectError) {
        console.error('Error fetching project completions:', projectError);
      }

      // Fetch completed lessons  
      const { data: lessonProgress, error: lessonError } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('completed', true);

      if (lessonError) {
        console.error('Error fetching lesson progress:', lessonError);
      }

      // Fetch user achievements
      const { data: userAchievements, error: achievementError } = await supabase
        .from('user_achievements')
        .select('*')
        .eq('user_id', user.id);

      if (achievementError) {
        console.error('Error fetching achievements:', achievementError);
      }

      // Calculate total coding time from projects and lessons
      const projectTime = projectCompletions?.reduce((total, project) => 
        total + (project.time_spent_seconds || 0), 0) || 0;
      const lessonTime = lessonProgress?.reduce((total, lesson) => 
        total + (lesson.time_spent_seconds || 0), 0) || 0;
      const totalSeconds = projectTime + lessonTime;
      const totalMinutes = Math.floor(totalSeconds / 60);

      // Format time display
      const formatCodingTime = (minutes: number) => {
        if (minutes >= 60) {
          const hours = Math.floor(minutes / 60);
          const remainingMinutes = minutes % 60;
          return {
            value: hours + (remainingMinutes > 0 ? (remainingMinutes / 60) : 0),
            unit: hours === 1 ? 'hour' : 'hours',
            display: hours + (remainingMinutes > 0 ? `.${Math.floor(remainingMinutes / 6)}` : '') + (hours === 1 ? ' hr' : ' hrs')
          };
        }
        return {
          value: minutes,
          unit: minutes === 1 ? 'minute' : 'minutes', 
          display: `${minutes} min${minutes !== 1 ? 's' : ''}`
        };
      };

      const codingTime = formatCodingTime(totalMinutes);

      // Calculate rank based on XP (simplified ranking)
      const currentXP = profile?.xp || 0;
      const estimatedRank = Math.max(1, Math.floor((10000 - currentXP) / 100));

      setStats({
        totalXP: currentXP,
        level: profile?.level || 1,
        streak: profile?.streak || 0,
        projectsCompleted: projectCompletions?.length || 0,
        lessonsCompleted: lessonProgress?.length || 0,
        badgesEarned: userAchievements?.length || 0,
        minutesCoded: totalMinutes,
        codingTimeDisplay: codingTime.display,
        rank: `#${estimatedRank}`
      });

    } catch (error) {
      console.error('Error fetching user stats:', error);
    }
  };

  const handleProfileEdit = () => {
    setEditProfile({
      display_name: profile?.display_name || '',
      username: profile?.username || '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setIsProfileEditOpen(true);
  };

  const handleSaveProfile = async () => {
    if (!user?.id || !profile?.id) return;

    // Validation
    if (!editProfile.display_name.trim()) {
      toast({
        title: "Error",
        description: "Display name cannot be empty",
        variant: "destructive"
      });
      return;
    }

    if (editProfile.newPassword && editProfile.newPassword !== editProfile.confirmPassword) {
      toast({
        title: "Error", 
        description: "New passwords don't match",
        variant: "destructive"
      });
      return;
    }

    if (editProfile.newPassword && editProfile.newPassword.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      // Update profile in database
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          display_name: editProfile.display_name,
          username: editProfile.username
        })
        .eq('id', profile.id);

      if (profileError) {
        throw profileError;
      }

      // Update password if provided
      if (editProfile.newPassword) {
        const { error: passwordError } = await supabase.auth.updateUser({
          password: editProfile.newPassword
        });

        if (passwordError) {
          throw passwordError;
        }
      }

      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated"
      });

      setIsProfileEditOpen(false);
      
      if (onCloseProfileEdit) {
        onCloseProfileEdit();
      }
      
      // Call the update callback if provided, otherwise refresh the page
      if (onProfileUpdate) {
        onProfileUpdate();
      } else {
        window.location.reload();
      }

    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update profile",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const startLearningPath = (pathId: string) => {
    const path = learningPaths.find(p => p.id === pathId);
    if (path?.id === "web-fundamentals") {
      navigate("/learn/html");
    } else if (path?.id === "python-mastery") {
      navigate("/learn/python");
    } else if (path?.id === "javascript-advanced") {
      navigate("/learn/javascript");
    } else if (path?.id === "mobile-development") {
      navigate("/learn/javascript"); // React Native uses JavaScript
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
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl font-bold text-foreground">
                    Welcome back, {profile?.display_name || "Coder"}!
                  </h1>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleProfileEdit}
                    className="hover:bg-muted"
                  >
                    <Edit3 className="h-4 w-4" />
                  </Button>
                </div>
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
                <div className="text-lg font-bold text-foreground">{stats.codingTimeDisplay}</div>
                <p className="text-sm text-muted-foreground">Time coded</p>
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

                          {path.resources && path.resources.length > 0 && (
                            <div className="mt-4 space-y-2">
                              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                <BookOpen className="h-4 w-4" />
                                <span>Learning Resources</span>
                              </div>
                              <div className="space-y-2 max-h-32 overflow-y-auto">
                                {path.resources.slice(0, 2).map((resource, index) => (
                                  <div key={index} className="p-2 bg-muted/20 rounded border border-border/50 hover:bg-muted/40 transition-colors">
                                    <div className="flex items-start justify-between">
                                      <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-2">
                                          <div className="flex items-center gap-1">
                                            {resource.type === 'article' && <File className="h-3 w-3 text-blue-500" />}
                                            {resource.type === 'documentation' && <FileText className="h-3 w-3 text-green-500" />}
                                            {resource.type === 'video' && <Play className="h-3 w-3 text-red-500" />}
                                            <p className="text-xs font-medium text-foreground truncate">
                                              {resource.title}
                                            </p>
                                          </div>
                                          <Badge variant="outline" className="text-xs px-1 py-0">
                                            {resource.type}
                                          </Badge>
                                        </div>
                                        <div className="flex items-center gap-2 mt-1">
                                          <span className="text-xs text-muted-foreground">
                                            {resource.duration}
                                          </span>
                                          <Badge variant="secondary" className="text-xs px-1 py-0">
                                            {resource.difficulty}
                                          </Badge>
                                        </div>
                                      </div>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-6 w-6 p-0 ml-2"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          window.open(resource.url, '_blank');
                                        }}
                                      >
                                        <ExternalLink className="h-3 w-3" />
                                      </Button>
                                    </div>
                                  </div>
                                ))}
                                {path.resources.length > 2 && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="w-full h-6 text-xs"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      // TODO: Show all resources in a modal or navigate to learn page
                                    }}
                                  >
                                    View {path.resources.length - 2} more resources
                                  </Button>
                                )}
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
                    
                    {/* AI Features Under Development Notice */}
                    <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Brain className="h-4 w-4 text-yellow-600" />
                        <span className="text-sm font-medium text-yellow-800 dark:text-yellow-300">AI Analysis</span>
                        <Badge variant="outline" className="bg-yellow-500/10 text-yellow-700 border-yellow-500/30 text-xs">
                          Under Development
                        </Badge>
                      </div>
                      <p className="text-xs text-yellow-700 dark:text-yellow-400">
                        AI-powered skill analysis and personalized recommendations coming soon!
                      </p>
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

                    {/* AI Achievements Coming Soon */}
                    <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Brain className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-800 dark:text-blue-300">AI-Powered Insights</span>
                        <Badge variant="outline" className="bg-blue-500/10 text-blue-700 border-blue-500/30 text-xs">
                          Coming Soon
                        </Badge>
                      </div>
                      <p className="text-xs text-blue-700 dark:text-blue-400">
                        Smart achievement tracking and personalized learning paths are in development.
                      </p>
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

      {/* Profile Edit Dialog */}
      <Dialog open={isProfileEditOpen} onOpenChange={(open) => {
        setIsProfileEditOpen(open);
        if (!open && onCloseProfileEdit) {
          onCloseProfileEdit();
        }
      }}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Edit Profile
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="display_name" className="text-right">
                Display Name
              </Label>
              <Input
                id="display_name"
                value={editProfile.display_name}
                onChange={(e) => setEditProfile(prev => ({ ...prev, display_name: e.target.value }))}
                className="col-span-3"
                placeholder="Your display name"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input
                id="username"
                value={editProfile.username}
                onChange={(e) => setEditProfile(prev => ({ ...prev, username: e.target.value }))}
                className="col-span-3"
                placeholder="Your username"
              />
            </div>
            <div className="border-t pt-4">
              <h4 className="text-sm font-medium mb-3">Change Password</h4>
              <div className="grid grid-cols-4 items-center gap-4 mb-3">
                <Label htmlFor="new_password" className="text-right text-sm">
                  New Password
                </Label>
                <Input
                  id="new_password"
                  type="password"
                  value={editProfile.newPassword}
                  onChange={(e) => setEditProfile(prev => ({ ...prev, newPassword: e.target.value }))}
                  className="col-span-3"
                  placeholder="Leave blank to keep current"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="confirm_password" className="text-right text-sm">
                  Confirm Password
                </Label>
                <Input
                  id="confirm_password"
                  type="password"
                  value={editProfile.confirmPassword}
                  onChange={(e) => setEditProfile(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  className="col-span-3"
                  placeholder="Confirm new password"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => {
              setIsProfileEditOpen(false);
              if (onCloseProfileEdit) {
                onCloseProfileEdit();
              }
            }}>
              Cancel
            </Button>
            <Button onClick={handleSaveProfile} disabled={loading}>
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}