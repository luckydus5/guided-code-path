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
  SkipForward,
  Github
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { LANGUAGE_CHALLENGES } from "@/data/challenges";
import { HANDS_ON_PROJECTS, getProjectsByLanguage, getWebFundamentalsProjects, getProjectsByDifficulty } from "@/data/projects";

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
  
  // Ensure we have a valid language parameter, handle navigation on refresh
  useEffect(() => {
    if (!language) {
      // If no language is specified, redirect to default dashboard
      navigate('/learn/python');
      return;
    }
    
    // Store current path in sessionStorage to handle refresh
    sessionStorage.setItem('current-learning-path', window.location.pathname);
  }, [language, navigate]);
  
  // Check if this is Web Fundamentals
  const isWebFundamentals = language === 'web-fundamentals';
  
  // Load user progress from localStorage - HOOKS MUST BE CALLED FIRST
  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('codelearning-progress');
    return saved ? JSON.parse(saved) : {};
  });

  const languageChallenges = isWebFundamentals ? [] : (LANGUAGE_CHALLENGES[language || 'python'] || LANGUAGE_CHALLENGES.python);
  
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

  // Get projects based on whether it's Web Fundamentals or other languages
  const languageProjects = isWebFundamentals ? getWebFundamentalsProjects() : getProjectsByLanguage(language || 'python');
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

  // Comprehensive learning resources for each language
  const getLanguageLearningResources = (language: string) => {
    const resourcesByLanguage = {
      html: [
        { type: "video", title: "HTML5 Semantic Elements Masterclass", url: "#", duration: "45 min", difficulty: "Beginner" },
        { type: "article", title: "Building Accessible Web Forms", url: "#", duration: "20 min", difficulty: "Beginner" },
        { type: "documentation", title: "HTML5 API Reference Guide", url: "#", duration: "30 min", difficulty: "Intermediate" },
        { type: "video", title: "SEO-Optimized HTML Structure", url: "#", duration: "35 min", difficulty: "Intermediate" },
        { type: "article", title: "Progressive Web App HTML Foundation", url: "#", duration: "25 min", difficulty: "Advanced" },
        { type: "video", title: "HTML Performance Optimization", url: "#", duration: "40 min", difficulty: "Advanced" },
        // GitHub Repositories
        { type: "github", title: "freeCodeCamp - Complete Web Development Curriculum", url: "https://github.com/freeCodeCamp/freeCodeCamp", stars: "384k", difficulty: "Beginner", description: "The most comprehensive web development curriculum with interactive HTML challenges and projects" },
        { type: "github", title: "30 seconds of code - HTML Snippets", url: "https://github.com/30-seconds/30-seconds-of-code", stars: "118k", difficulty: "Beginner", description: "Short HTML code snippets for all your development needs" },
        { type: "github", title: "HTML5 Boilerplate", url: "https://github.com/h5bp/html5-boilerplate", stars: "56k", difficulty: "Intermediate", description: "Professional front-end template for building web apps and sites" },
        { type: "github", title: "HEAD - Guide to HTML head elements", url: "https://github.com/joshbuchea/HEAD", stars: "29k", difficulty: "Beginner", description: "Everything you need to know about the HTML head element" }
      ],
      css: [
        { type: "video", title: "CSS Flexbox Complete Course", url: "#", duration: "50 min", difficulty: "Beginner" },
        { type: "article", title: "CSS Grid Layout Fundamentals", url: "#", duration: "30 min", difficulty: "Beginner" },
        { type: "documentation", title: "CSS Custom Properties Guide", url: "#", duration: "20 min", difficulty: "Intermediate" },
        { type: "video", title: "Advanced CSS Animations", url: "#", duration: "45 min", difficulty: "Intermediate" },
        { type: "article", title: "CSS Architecture & Methodologies", url: "#", duration: "35 min", difficulty: "Advanced" },
        { type: "video", title: "CSS-in-JS and Modern Styling", url: "#", duration: "40 min", difficulty: "Advanced" },
        // GitHub Repositories
        { type: "github", title: "Animate.css - CSS Animations Library", url: "https://github.com/animate-css/animate.css", stars: "79k", difficulty: "Beginner", description: "Cross-browser CSS animations library ready to use" },
        { type: "github", title: "CSS Layout Patterns", url: "https://github.com/una/layout-patterns", stars: "12k", difficulty: "Intermediate", description: "Modern CSS layout patterns and techniques" },
        { type: "github", title: "CSS Guidelines", url: "https://github.com/csswizardry/CSS-Guidelines", stars: "6k", difficulty: "Advanced", description: "High-level advice and guidelines for writing sane CSS" },
        { type: "github", title: "Flexbox Froggy Solutions", url: "https://github.com/thomaspark/flexboxfroggy", stars: "4k", difficulty: "Beginner", description: "Game for learning CSS flexbox with interactive exercises" }
      ],
      javascript: [
        { type: "video", title: "JavaScript ES6+ Features Deep Dive", url: "#", duration: "60 min", difficulty: "Beginner" },
        { type: "article", title: "DOM Manipulation & Event Handling", url: "#", duration: "25 min", difficulty: "Beginner" },
        { type: "documentation", title: "Async JavaScript & Promises", url: "#", duration: "30 min", difficulty: "Intermediate" },
        { type: "video", title: "JavaScript Design Patterns", url: "#", duration: "55 min", difficulty: "Intermediate" },
        { type: "article", title: "Performance Optimization Techniques", url: "#", duration: "40 min", difficulty: "Advanced" },
        { type: "video", title: "Node.js & Server-Side JavaScript", url: "#", duration: "65 min", difficulty: "Advanced" },
        // GitHub Repositories
        { type: "github", title: "JavaScript30 - 30 Day Vanilla JS Challenge", url: "https://github.com/wesbos/JavaScript30", stars: "26k", difficulty: "Beginner", description: "30-day vanilla JavaScript coding challenge to build real projects" },
        { type: "github", title: "33 JS Concepts - JavaScript Fundamentals", url: "https://github.com/leonardomso/33-js-concepts", stars: "62k", difficulty: "Intermediate", description: "33 JavaScript concepts every developer should know" },
        { type: "github", title: "You Don't Know JS Book Series", url: "https://github.com/getify/You-Dont-Know-JS", stars: "177k", difficulty: "Advanced", description: "Deep dive into JavaScript core mechanisms and advanced concepts" },
        { type: "github", title: "JavaScript Algorithms and Data Structures", url: "https://github.com/trekhleb/javascript-algorithms", stars: "183k", difficulty: "Intermediate", description: "Algorithms and data structures implemented in JavaScript with explanations" }
      ],
      python: [
        { type: "video", title: "Python Data Structures & Algorithms", url: "#", duration: "70 min", difficulty: "Beginner" },
        { type: "article", title: "Object-Oriented Programming in Python", url: "#", duration: "35 min", difficulty: "Beginner" },
        { type: "documentation", title: "Python Standard Library Overview", url: "#", duration: "25 min", difficulty: "Intermediate" },
        { type: "video", title: "Web Development with Flask/Django", url: "#", duration: "80 min", difficulty: "Intermediate" },
        { type: "article", title: "Machine Learning with Python", url: "#", duration: "45 min", difficulty: "Advanced" },
        { type: "video", title: "Python Performance & Optimization", url: "#", duration: "50 min", difficulty: "Advanced" },
        // GitHub Repositories
        { type: "github", title: "The Algorithms - Python Implementation", url: "https://github.com/TheAlgorithms/Python", stars: "178k", difficulty: "Intermediate", description: "All algorithms implemented in Python with detailed explanations" },
        { type: "github", title: "Python Programming Exercises", url: "https://github.com/zhiwehu/Python-programming-exercises", stars: "25k", difficulty: "Beginner", description: "100+ Python programming exercises with solutions for skill building" },
        { type: "github", title: "Real Python Tutorials", url: "https://github.com/realpython/python-guide", stars: "27k", difficulty: "Intermediate", description: "Python best practices guidebook written for humans" },
        { type: "github", title: "Project-Based Learning Python", url: "https://github.com/practical-tutorials/project-based-learning", stars: "157k", difficulty: "Beginner", description: "Curated list of project-based Python tutorials and learning resources" }
      ],
      java: [
        { type: "video", title: "Java Fundamentals & OOP Concepts", url: "#", duration: "75 min", difficulty: "Beginner" },
        { type: "article", title: "Java Collections Framework", url: "#", duration: "40 min", difficulty: "Beginner" },
        { type: "documentation", title: "Spring Framework Essentials", url: "#", duration: "50 min", difficulty: "Intermediate" },
        { type: "video", title: "Java Concurrency & Multithreading", url: "#", duration: "60 min", difficulty: "Intermediate" },
        { type: "article", title: "Microservices with Spring Boot", url: "#", duration: "55 min", difficulty: "Advanced" },
        { type: "video", title: "Java Performance Tuning", url: "#", duration: "45 min", difficulty: "Advanced" },
        // GitHub Repositories
        { type: "github", title: "Java Design Patterns", url: "https://github.com/iluwatar/java-design-patterns", stars: "86k", difficulty: "Intermediate", description: "Design patterns implemented in Java with detailed examples" },
        { type: "github", title: "Spring Boot Examples", url: "https://github.com/spring-projects/spring-boot", stars: "73k", difficulty: "Intermediate", description: "Official Spring Boot repository with examples and documentation" },
        { type: "github", title: "Effective Java Examples", url: "https://github.com/jbloch/effective-java-3e-source-code", stars: "4k", difficulty: "Advanced", description: "Source code for the book 'Effective Java' by Joshua Bloch" },
        { type: "github", title: "Java Programming Practice", url: "https://github.com/TheAlgorithms/Java", stars: "57k", difficulty: "Beginner", description: "All algorithms implemented in Java with explanations" }
      ]
    };

    return resourcesByLanguage[language as keyof typeof resourcesByLanguage] || resourcesByLanguage.python;
  };

  // Learning resources for each project
  const getProjectLearningResources = (projectId: number, language: string) => {
    const projectSpecificResources = {
      html: [
        { type: "article", title: "HTML Semantic Elements for This Project", url: "#", duration: "10 min" },
        { type: "video", title: "Building Responsive Layouts", url: "#", duration: "15 min" },
        { type: "documentation", title: "HTML5 Best Practices", url: "#", duration: "8 min" }
      ],
      css: [
        { type: "article", title: "CSS Flexbox for This Project", url: "#", duration: "12 min" },
        { type: "video", title: "CSS Grid Layout Tutorial", url: "#", duration: "20 min" },
        { type: "documentation", title: "CSS Animations for This Project", url: "#", duration: "15 min" }
      ],
      javascript: [
        { type: "article", title: "JavaScript Features for This Project", url: "#", duration: "15 min" },
        { type: "video", title: "DOM Manipulation for This Project", url: "#", duration: "18 min" },
        { type: "documentation", title: "Async Patterns for This Project", url: "#", duration: "12 min" }
      ],
      python: [
        { type: "article", title: "Python Libraries for This Project", url: "#", duration: "12 min" },
        { type: "video", title: "OOP Concepts for This Project", url: "#", duration: "25 min" },
        { type: "documentation", title: "Python Best Practices", url: "#", duration: "10 min" }
      ]
    };

    return projectSpecificResources[language as keyof typeof projectSpecificResources] || [];
  };

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

  const handleStartProject = (projectId: number) => {
    startProjectDirectly(projectId);
  };

  const startProjectDirectly = (projectId: number) => {
    toast({
      title: "Project Started!",
      description: "Opening project environment...",
    });
    
    // Use web-fundamentals as the language parameter for Web Fundamentals projects
    const projectLanguage = isWebFundamentals ? 'web-fundamentals' : language;
    navigate(`/learn/${projectLanguage}/project/${projectId}`);
  };

  const ResourceIcon = ({ type }: { type: string }) => {
    switch (type) {
      case "video": return <Video className="h-4 w-4" />;
      case "documentation": return <FileText className="h-4 w-4" />;
      case "github": return <Github className="h-4 w-4" />;
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
                {getLanguageLearningResources(language || 'python').map((resource, index) => (
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
                          {resource.type === 'github' ? (
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-yellow-500" />
                              <span className="text-xs text-muted-foreground">{resource.stars}</span>
                            </div>
                          ) : (
                            <Badge variant="secondary" className="text-xs">
                              {resource.duration}
                            </Badge>
                          )}
                        </div>
                        <Badge 
                          variant={resource.difficulty === 'Beginner' ? 'default' : resource.difficulty === 'Intermediate' ? 'secondary' : 'destructive'} 
                          className="text-xs"
                        >
                          {resource.difficulty}
                        </Badge>
                      </div>
                    </div>
                    
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                      {resource.title}
                    </h3>
                    
                    {resource.type === 'github' && resource.description && (
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {resource.description}
                      </p>
                    )}
                    
                    <div className="space-y-3">
                      <Button 
                        size="sm" 
                        className="w-full" 
                        variant="outline"
                        onClick={() => {
                          if (resource.type === 'github') {
                            window.open(resource.url, '_blank');
                          }
                        }}
                      >
                        {resource.type === 'github' ? (
                          <>
                            <Github className="h-3 w-3 mr-2" />
                            View Repository
                          </>
                        ) : (
                          <>
                            <ExternalLink className="h-3 w-3 mr-2" />
                            Start Learning
                          </>
                        )}
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
      </div>
    </div>
  );
}