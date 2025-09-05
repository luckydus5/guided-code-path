import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Monitor, 
  Code2, 
  Rocket, 
  Smartphone,
  Clock,
  BookOpen,
  FileCode,
  TrendingUp,
  Users,
  Star
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface LearningDashboardProps {
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
    technologies: ["HTML", "CSS", "JavaScript"]
  },
  {
    id: "python-mastery",
    name: "Python",
    description: "Master Python from foundations to production-grade code",
    icon: Code2,
    difficulty: "Beginner", 
    estimatedTime: "12-16 weeks",
    progress: 0,
    lessons: 45,
    projects: 8,
    color: "from-green-500 to-yellow-500",
    technologies: ["Python", "APIs", "Flask/FastAPI", "Data Science"]
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
    technologies: ["JavaScript", "React", "Node.js"]
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
    technologies: ["React Native", "TypeScript", "Expo"]
  }
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Beginner': return 'bg-green-500';
    case 'Intermediate': return 'bg-yellow-500';
    case 'Advanced': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
};

export default function LearningDashboard({ user, profile }: LearningDashboardProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("learning-paths");

  const startLearningPath = (pathId: string) => {
    const path = learningPaths.find(p => p.id === pathId);
    if (path?.id === "web-fundamentals") {
      navigate("/learn/web-fundamentals");
    } else if (path?.id === "python-mastery") {
      navigate("/learn/python");
    } else if (path?.id === "javascript-advanced") {
      navigate("/learn/javascript");
    } else if (path?.id === "mobile-development") {
      navigate("/learn/javascript");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Stats Header */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-foreground">{profile?.xp || 0}</div>
              <div className="text-sm text-muted-foreground">Total XP</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-foreground">0</div>
              <div className="text-sm text-muted-foreground">Projects</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-foreground">0</div>
              <div className="text-sm text-muted-foreground">Lessons</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-foreground">0 mins</div>
              <div className="text-sm text-muted-foreground">Time coded</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="learning-paths" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Learning Paths
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Progress
            </TabsTrigger>
            <TabsTrigger value="community" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Community
            </TabsTrigger>
          </TabsList>

          <TabsContent value="learning-paths" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Choose Your Learning Path</h2>
              <Button variant="outline" size="sm">
                Structured Learning
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {learningPaths.map((path) => {
                const IconComponent = path.icon;
                return (
                  <Card key={path.id} className="hover:shadow-lg transition-shadow duration-200 bg-card">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-3 rounded-xl bg-gradient-to-r ${path.color}`}>
                            <IconComponent className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-lg font-semibold text-foreground">
                              {path.name}
                            </CardTitle>
                            <div className="flex items-center gap-2 mt-1">
                              <div className={`w-2 h-2 rounded-full ${getDifficultyColor(path.difficulty)}`}></div>
                              <span className="text-sm text-muted-foreground">{path.difficulty}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right text-sm text-muted-foreground">
                          {path.estimatedTime}
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {path.description}
                      </p>
                      
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-foreground">Progress</span>
                          <span className="text-sm text-muted-foreground">{path.progress}%</span>
                        </div>
                        <Progress value={path.progress} className="h-2" />
                      </div>

                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{path.lessons} lessons</span>
                        <span>{path.projects} projects</span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {path.technologies.map((tech, index) => (
                          <Badge 
                            key={index} 
                            variant="secondary" 
                            className="text-xs bg-secondary/50"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      <Button 
                        onClick={() => startLearningPath(path.id)}
                        className={`w-full bg-gradient-to-r ${path.color} hover:opacity-90 text-white font-medium`}
                      >
                        Start Learning
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <div className="text-center py-12">
              <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Track Your Progress</h3>
              <p className="text-muted-foreground">
                Start a learning path to see your progress and achievements here.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="community" className="space-y-6">
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Join the Community</h3>
              <p className="text-muted-foreground">
                Connect with other learners, share your projects, and get help.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}