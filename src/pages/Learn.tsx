import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Code, 
  Play, 
  ArrowLeft,
  Trophy,
  BookOpen,
  Star,
  TrendingUp,
  Clock,
  FolderOpen,
  Rocket,
  Crown,
  GitBranch,
  Award,
  Target,
  Zap,
  GraduationCap,
  FileText,
  Video,
  ExternalLink,
  SkipForward
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { LANGUAGE_CHALLENGES } from "@/data/challenges";
import { HANDS_ON_PROJECTS, getProjectsByLanguage } from "@/data/projects";

interface UserProgress {
  [language: string]: {
    completedChallenges: number[];
    currentChallenge: number;
    totalTimeSpent: number;
    skillLevel: "Beginner" | "Intermediate" | "Advanced" | "Expert";
    achievements: string[];
    completedProjects: number[];
    completedLessons: string[];
    currentModule: string;
    masteryScore: number; // 0-100
    projectsInProgress: number[];
    capstoneProjectsCompleted: number[];
    skillsEarned: string[];
    certifications: string[];
    streakDays: number;
    lastActiveDate: string;
  };
}

export default function Learn() {
  const { language } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Load user progress from localStorage - HOOKS MUST BE CALLED FIRST
  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('codelearning-progress');
    return saved ? JSON.parse(saved) : {};
  });

  const languageChallenges = LANGUAGE_CHALLENGES[language || 'python'] || LANGUAGE_CHALLENGES.python;
  
  const currentLanguageProgress = userProgress[language || 'python'] || {
    completedChallenges: [],
    currentChallenge: 0,
    totalTimeSpent: 0,
    skillLevel: "Beginner" as const,
    achievements: [],
    completedProjects: [],
    completedLessons: [],
    currentModule: "",
    masteryScore: 0,
    projectsInProgress: [],
    capstoneProjectsCompleted: [],
    skillsEarned: [],
    certifications: [],
    streakDays: 0,
    lastActiveDate: new Date().toISOString()
  };

  const languageProjects = getProjectsByLanguage(language || 'python');
  const beginnerProjects = languageProjects.filter(p => p.difficulty === 'Beginner');
  const intermediateProjects = languageProjects.filter(p => p.difficulty === 'Intermediate');
  const advancedProjects = languageProjects.filter(p => p.difficulty === 'Advanced');

  // CodeCraft Learning Platform Progress Calculation (500+ projects per language)
  const CODECRAFT_PROJECT_TARGETS = {
    python: { beginner: 200, intermediate: 200, advanced: 100, capstone: 25 },
    javascript: { beginner: 200, intermediate: 200, advanced: 100, capstone: 25 },
    java: { beginner: 200, intermediate: 200, advanced: 100, capstone: 25 },
    html: { beginner: 200, intermediate: 200, advanced: 100, capstone: 20 },
    css: { beginner: 200, intermediate: 200, advanced: 100, capstone: 20 }
  };

  const currentTargets = CODECRAFT_PROJECT_TARGETS[language as keyof typeof CODECRAFT_PROJECT_TARGETS] || 
                        CODECRAFT_PROJECT_TARGETS.python;
  
  const totalProjectsTarget = currentTargets.beginner + currentTargets.intermediate + 
                             currentTargets.advanced + currentTargets.capstone;
  
  const totalLessons = languageChallenges.length;
  const completedLessons = currentLanguageProgress.completedLessons?.length || 
                          currentLanguageProgress.completedChallenges.length;
  const totalProjects = languageProjects.length;
  const completedProjects = currentLanguageProgress.completedProjects?.length || 0;
  const capstoneCompleted = currentLanguageProgress.capstoneProjectsCompleted?.length || 0;
  
  // Advanced progress calculation with weighted scoring
  const lessonProgress = (completedLessons / totalLessons) * 0.3; // 30% weight
  const projectProgress = (completedProjects / totalProjectsTarget) * 0.5; // 50% weight  
  const capstoneProgress = (capstoneCompleted / currentTargets.capstone) * 0.2; // 20% weight
  
  const overallProgress = Math.min(100, Math.round((lessonProgress + projectProgress + capstoneProgress) * 100));
  
  // Mastery score calculation
  const masteryScore = currentLanguageProgress.masteryScore || 
    Math.round((overallProgress * 0.7) + (currentLanguageProgress.skillsEarned?.length || 0) * 2);

  // Calculate current step based on progress (10 total steps)
  const getCurrentStep = () => {
    if (overallProgress <= 10) return 1;
    if (overallProgress <= 20) return 2;
    if (overallProgress <= 30) return 3;
    if (overallProgress <= 40) return 4;
    if (overallProgress <= 50) return 5;
    if (overallProgress <= 60) return 6;
    if (overallProgress <= 70) return 7;
    if (overallProgress <= 80) return 8;
    if (overallProgress <= 90) return 9;
    return 10;
  };

  const currentStep = getCurrentStep();
  const totalSteps = 10;

  // Learning resources for each project
  const getProjectLearningResources = (projectId: number, language: string) => {
    const resourcesByLanguage = {
      html: {
        resources: [
          { type: "article", title: "HTML Semantic Elements Guide", url: "#", duration: "10 min" },
          { type: "video", title: "Building Responsive Layouts", url: "#", duration: "15 min" },
          { type: "documentation", title: "HTML5 Best Practices", url: "#", duration: "8 min" }
        ]
      },
      css: {
        resources: [
          { type: "article", title: "CSS Flexbox Complete Guide", url: "#", duration: "12 min" },
          { type: "video", title: "CSS Grid Layout Tutorial", url: "#", duration: "20 min" },
          { type: "documentation", title: "CSS Animations & Transitions", url: "#", duration: "15 min" }
        ]
      },
      javascript: {
        resources: [
          { type: "article", title: "JavaScript ES6+ Features", url: "#", duration: "15 min" },
          { type: "video", title: "DOM Manipulation Basics", url: "#", duration: "18 min" },
          { type: "documentation", title: "Async/Await Pattern", url: "#", duration: "12 min" }
        ]
      },
      python: {
        resources: [
          { type: "article", title: "Python Data Structures", url: "#", duration: "12 min" },
          { type: "video", title: "Object-Oriented Programming", url: "#", duration: "25 min" },
          { type: "documentation", title: "Python Libraries Overview", url: "#", duration: "10 min" }
        ]
      }
    };

    return resourcesByLanguage[language as keyof typeof resourcesByLanguage]?.resources || [];
  };

  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [showLearningResources, setShowLearningResources] = useState(false);

  const handleStartProject = (projectId: number) => {
    setSelectedProjectId(projectId);
    setShowLearningResources(true);
  };

  const startProjectDirectly = (projectId: number) => {
    toast({
      title: "Project Started!",
      description: "Opening project environment...",
    });
    setShowLearningResources(false);
    navigate(`/learn/${language}/project/${projectId}`);
  };

  const ResourceIcon = ({ type }: { type: string }) => {
    switch (type) {
      case "video": return <Video className="h-4 w-4" />;
      case "documentation": return <FileText className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  // If no language is specified, redirect to Python by default
  if (!language) {
    navigate('/learn/python');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Enhanced Header with Progress */}
      <div className="border-b border-border bg-card/80 backdrop-blur-lg sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate("/")}
                className="hover:bg-muted"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
              
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-primary/20">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-xl font-bold capitalize">{language} Learning Path</h1>
                  <p className="text-sm text-muted-foreground">Progress through lessons and projects</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              {/* Progress Overview */}
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">
                      {completedLessons} / {totalLessons} Lessons
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Step {currentStep} of {totalSteps} • {overallProgress}% Complete
                  </div>
                </div>
                <div className="w-32">
                  <Progress value={overallProgress} className="h-2" />
                </div>
              </div>
              
              <Badge variant="secondary" className="capitalize">
                {currentLanguageProgress.skillLevel}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="resources" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="resources" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Learning Resources
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <FolderOpen className="h-4 w-4" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="capstones" className="flex items-center gap-2">
              <Crown className="h-4 w-4" />
              Capstones
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Progress
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              Achievements
            </TabsTrigger>
          </TabsList>

          <TabsContent value="resources" className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-primary/20">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold capitalize">{language} Learning Resources</h2>
                  <p className="text-muted-foreground">Master the fundamentals before diving into projects</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getProjectLearningResources(1, language || 'python').map((resource, index) => (
                  <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <ResourceIcon type={resource.type} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <Badge variant="outline" className="text-xs capitalize">
                            {resource.type}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {resource.duration}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                      {resource.title}
                    </h3>
                    
                    <div className="space-y-3">
                      <Button 
                        size="sm" 
                        className="w-full" 
                        variant="outline"
                      >
                        <ExternalLink className="h-3 w-3 mr-2" />
                        Start Learning
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="projects" className="space-y-8">
            {/* Beginner Projects */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-success/20">
                  <Zap className="h-5 w-5 text-success" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Beginner Projects</h2>
                  <p className="text-muted-foreground">Build foundational skills with guided projects</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {beginnerProjects.slice(0, 15).map((project) => (
                  <Card key={project.id} className="p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer">
                    <div className="flex items-start justify-between mb-4">
                      <Badge variant="outline" className="text-success border-success">
                        {project.difficulty}
                      </Badge>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {project.estimatedTime}
                      </div>
                    </div>
                    
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {project.description}
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{project.technologies.length - 3}
                          </Badge>
                        )}
                      </div>
                      
                      <Button 
                        size="sm" 
                        className="w-full" 
                        variant="outline"
                        onClick={() => handleStartProject(project.id)}
                      >
                        <Play className="h-3 w-3 mr-2" />
                        Start Project
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Intermediate Projects */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-warning/20">
                  <Target className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Intermediate Projects</h2>
                  <p className="text-muted-foreground">Challenge yourself with more complex applications</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {intermediateProjects.slice(0, 12).map((project) => (
                  <Card key={project.id} className="p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer">
                    <div className="flex items-start justify-between mb-4">
                      <Badge variant="outline" className="text-warning border-warning">
                        {project.difficulty}
                      </Badge>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {project.estimatedTime}
                      </div>
                    </div>
                    
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {project.description}
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{project.technologies.length - 3}
                          </Badge>
                        )}
                      </div>
                      
                      <Button 
                        size="sm" 
                        className="w-full" 
                        variant="outline"
                        onClick={() => handleStartProject(project.id)}
                      >
                        <GitBranch className="h-3 w-3 mr-2" />
                        Start Project
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="capstones" className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-destructive/20">
                  <Crown className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Capstone Projects</h2>
                  <p className="text-muted-foreground">Advanced projects to showcase your mastery</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {advancedProjects.slice(0, 8).map((project) => (
                  <Card key={project.id} className="p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer border-2 border-destructive/20">
                    <div className="flex items-start justify-between mb-4">
                      <Badge variant="destructive">
                        {project.difficulty}
                      </Badge>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {project.estimatedTime}
                      </div>
                    </div>
                    
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {project.description}
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 4 && (
                          <Badge variant="secondary" className="text-xs">
                            +{project.technologies.length - 4}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="text-xs text-muted-foreground mb-2">
                        Skills: {project.skills.slice(0, 3).join(", ")}
                      </div>
                      
                      <Button 
                        size="sm" 
                        className="w-full"
                        onClick={() => handleStartProject(project.id)}
                      >
                        <Rocket className="h-3 w-3 mr-2" />
                        Start Capstone
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Rest of tabs content... */}
          <TabsContent value="progress" className="space-y-8">
            {/* Progress content will be here */}
          </TabsContent>

          <TabsContent value="achievements" className="space-y-8">
            {/* Achievements content will be here */}
          </TabsContent>
        </Tabs>

        {/* Learning Resources Modal */}
        <Dialog open={showLearningResources} onOpenChange={setShowLearningResources}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Learning Resources
              </DialogTitle>
            </DialogHeader>
            
            {selectedProjectId && (
              <div className="space-y-6">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">
                    Review these resources before starting your project for better understanding
                  </p>
                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    Estimated reading time: 25-40 minutes
                  </div>
                </div>

                <div className="space-y-4">
                  {getProjectLearningResources(selectedProjectId, language || 'python').map((resource, index) => (
                    <Card key={index} className="p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <ResourceIcon type={resource.type} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium">{resource.title}</h4>
                            <Badge variant="outline" className="text-xs">
                              {resource.duration}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground capitalize">
                            {resource.type}
                          </p>
                        </div>
                        <Button size="sm" variant="ghost">
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>

                <div className="flex gap-3 pt-4 border-t">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => startProjectDirectly(selectedProjectId)}
                  >
                    <SkipForward className="h-4 w-4 mr-2" />
                    Skip to Project
                  </Button>
                  <Button 
                    className="flex-1"
                    onClick={() => {
                      // In a real app, track that user reviewed resources
                      setTimeout(() => startProjectDirectly(selectedProjectId), 500);
                    }}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Start Learning
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}