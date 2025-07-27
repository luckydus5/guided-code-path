import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Zap
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

  const startProject = (projectId: number) => {
    toast({
      title: "Project Started!",
      description: "Opening project environment...",
    });
    navigate(`/learn/${language}/project/${projectId}`);
  };

  // If no language is specified, show language selection
  if (!language) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Choose Your Learning Path</h1>
            <p className="text-lg text-muted-foreground">Select a programming language to begin your journey</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { lang: 'python', title: 'Python', description: 'Perfect for beginners and data science', icon: '🐍' },
              { lang: 'javascript', title: 'JavaScript', description: 'Build interactive web applications', icon: '🚀' },
              { lang: 'java', title: 'Java', description: 'Enterprise applications and Android development', icon: '☕' }
            ].map((option) => (
              <Card key={option.lang} className="p-6 cursor-pointer hover:shadow-lg transition-all">
                <div className="text-center" onClick={() => navigate(`/learn/${option.lang}`)}>
                  <div className="text-4xl mb-4">{option.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{option.title}</h3>
                  <p className="text-muted-foreground">{option.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
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
                    {overallProgress}% Complete
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
        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
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
                        onClick={() => startProject(project.id)}
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
                        onClick={() => startProject(project.id)}
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
                        onClick={() => startProject(project.id)}
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

          <TabsContent value="progress" className="space-y-8">
            {/* CodeCraft Learning Platform Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <Card className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/20">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{completedLessons}</div>
                    <div className="text-sm text-muted-foreground">Lessons Completed</div>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-success/20">
                    <FolderOpen className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{completedProjects}</div>
                    <div className="text-sm text-muted-foreground">Projects Completed</div>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-destructive/20">
                    <Crown className="h-5 w-5 text-destructive" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{capstoneCompleted}</div>
                    <div className="text-sm text-muted-foreground">Capstone Projects</div>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-warning/20">
                    <Trophy className="h-5 w-5 text-warning" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{currentLanguageProgress.achievements.length}</div>
                    <div className="text-sm text-muted-foreground">Achievements</div>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-secondary/20">
                    <Star className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{masteryScore}</div>
                    <div className="text-sm text-muted-foreground">Mastery Score</div>
                  </div>
                </div>
              </Card>
            </div>

            {/* CodeCraft Progress Breakdown */}
            <div className="space-y-6">
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-primary/20">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">CodeCraft Learning Platform Progress</h3>
                    <p className="text-sm text-muted-foreground">Project-based learning with 500+ real-world projects</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium">Foundation Lessons</span>
                      <span>{completedLessons} / {totalLessons}</span>
                    </div>
                    <Progress value={(completedLessons / totalLessons) * 100} className="h-2" />
                    <div className="text-xs text-muted-foreground mt-1">Theory, concepts, and guided practice</div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium">Beginner Projects (Target: {currentTargets.beginner})</span>
                      <span>{Math.min(completedProjects, currentTargets.beginner)} / {currentTargets.beginner}</span>
                    </div>
                    <Progress value={(Math.min(completedProjects, currentTargets.beginner) / currentTargets.beginner) * 100} className="h-2" />
                    <div className="text-xs text-muted-foreground mt-1">Foundation building with guided tutorials</div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium">Intermediate Projects (Target: {currentTargets.intermediate})</span>
                      <span>{Math.max(0, Math.min(completedProjects - currentTargets.beginner, currentTargets.intermediate))} / {currentTargets.intermediate}</span>
                    </div>
                    <Progress value={(Math.max(0, Math.min(completedProjects - currentTargets.beginner, currentTargets.intermediate)) / currentTargets.intermediate) * 100} className="h-2" />
                    <div className="text-xs text-muted-foreground mt-1">Skill application with moderate complexity</div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium">Advanced Projects (Target: {currentTargets.advanced})</span>
                      <span>{Math.max(0, Math.min(completedProjects - currentTargets.beginner - currentTargets.intermediate, currentTargets.advanced))} / {currentTargets.advanced}</span>
                    </div>
                    <Progress value={(Math.max(0, Math.min(completedProjects - currentTargets.beginner - currentTargets.intermediate, currentTargets.advanced)) / currentTargets.advanced) * 100} className="h-2" />
                    <div className="text-xs text-muted-foreground mt-1">Expert-level challenges and optimization</div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium">Capstone Projects (Target: {currentTargets.capstone})</span>
                      <span>{capstoneCompleted} / {currentTargets.capstone}</span>
                    </div>
                    <Progress value={(capstoneCompleted / currentTargets.capstone) * 100} className="h-2" />
                    <div className="text-xs text-muted-foreground mt-1">Portfolio-worthy applications demonstrating mastery</div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-base font-semibold mb-2">
                      <span>Overall Platform Progress</span>
                      <span>{overallProgress}%</span>
                    </div>
                    <Progress value={overallProgress} className="h-3" />
                    <div className="text-xs text-muted-foreground mt-2">
                      Target: {totalProjectsTarget} total projects • Mastery Score: {masteryScore}/100
                    </div>
                  </div>
                </div>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Skill Development Pathway
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-success"></div>
                        <span className="text-sm font-medium">Beginner Level</span>
                      </div>
                      <div className="text-sm text-muted-foreground">{currentTargets.beginner} projects</div>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-warning"></div>
                        <span className="text-sm font-medium">Intermediate Level</span>
                      </div>
                      <div className="text-sm text-muted-foreground">{currentTargets.intermediate} projects</div>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-destructive"></div>
                        <span className="text-sm font-medium">Advanced Level</span>
                      </div>
                      <div className="text-sm text-muted-foreground">{currentTargets.advanced} projects</div>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg bg-primary/5">
                      <div className="flex items-center gap-3">
                        <Crown className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">Capstone Projects</span>
                      </div>
                      <div className="text-sm text-muted-foreground">{currentTargets.capstone} projects</div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Learning Metrics
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm">Time Investment</span>
                      <span className="text-sm font-medium">{Math.round(currentLanguageProgress.totalTimeSpent / 60)}h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Current Streak</span>
                      <span className="text-sm font-medium">{currentLanguageProgress.streakDays} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Skills Earned</span>
                      <span className="text-sm font-medium">{currentLanguageProgress.skillsEarned?.length || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Projects in Progress</span>
                      <span className="text-sm font-medium">{currentLanguageProgress.projectsInProgress?.length || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Certifications</span>
                      <span className="text-sm font-medium">{currentLanguageProgress.certifications?.length || 0}</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentLanguageProgress.achievements.length > 0 ? (
                currentLanguageProgress.achievements.map((achievement, index) => (
                  <Card key={index} className="p-6 border-2 border-warning/20">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-warning/20">
                        <Award className="h-5 w-5 text-warning" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{achievement}</h3>
                        <p className="text-sm text-muted-foreground">Achievement unlocked!</p>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <Card className="p-6 col-span-full text-center">
                  <div className="p-4">
                    <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">No Achievements Yet</h3>
                    <p className="text-muted-foreground">Complete projects and challenges to unlock achievements!</p>
                  </div>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}