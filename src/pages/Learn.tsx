import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import LearningContent from "@/components/LearningContent";
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
import { HANDS_ON_PROJECTS, getProjectsByLanguage, getWebFundamentalsProjects, getCapstoneProjects, getProjectsByDifficulty } from "@/data/projects";

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
      // Check if there's a saved learning path in sessionStorage
      const savedPath = sessionStorage.getItem('current-learning-path');
      if (savedPath && savedPath.startsWith('/learn/')) {
        navigate(savedPath);
        return;
      }
      // If no saved path, redirect to default dashboard
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

  // State for learning content display
  const [currentLearningContent, setCurrentLearningContent] = useState<{
    title: string;
    type: string;
    difficulty: string;
    description?: string;
  } | null>(null);

  // Storage key for current learning content
  const learningContentStorageKey = `currentLearningContent_${language || 'web-fundamentals'}`;

  // Load saved learning content state on component mount
  useEffect(() => {
    try {
      const savedLearningContent = localStorage.getItem(learningContentStorageKey);
      if (savedLearningContent) {
        setCurrentLearningContent(JSON.parse(savedLearningContent));
      }
    } catch (error) {
      console.error('Error loading saved learning content state:', error);
    }
  }, [learningContentStorageKey]);

  // Auto-save learning content state when it changes
  useEffect(() => {
    if (currentLearningContent) {
      localStorage.setItem(learningContentStorageKey, JSON.stringify(currentLearningContent));
    } else {
      localStorage.removeItem(learningContentStorageKey);
    }
  }, [currentLearningContent, learningContentStorageKey]);

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
      'web-fundamentals': [
        // HTML Learning Resources
        { type: "article", title: "HTML Basics - MDN Web Docs", url: "https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics", duration: "30 min", difficulty: "Beginner", description: "Complete introduction to HTML fundamentals from Mozilla" },
        { type: "documentation", title: "HTML5 Semantic Elements Guide", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element", duration: "45 min", difficulty: "Beginner", description: "Comprehensive reference for HTML5 semantic elements" },
        { type: "article", title: "HTML Forms and Input Elements", url: "https://developer.mozilla.org/en-US/docs/Learn/Forms", duration: "40 min", difficulty: "Beginner", description: "Master HTML forms and input validation" },
        { type: "documentation", title: "HTML Accessibility Guidelines", url: "https://developer.mozilla.org/en-US/docs/Learn/Accessibility/HTML", duration: "35 min", difficulty: "Intermediate", description: "Building accessible web content with HTML" },
        
        // CSS Learning Resources  
        { type: "article", title: "CSS Basics - MDN Web Docs", url: "https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/CSS_basics", duration: "35 min", difficulty: "Beginner", description: "Essential CSS concepts and styling fundamentals" },
        { type: "article", title: "CSS Flexbox Complete Guide", url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/", duration: "25 min", difficulty: "Beginner", description: "Master CSS Flexbox for modern layouts" },
        { type: "article", title: "CSS Grid Layout Complete Guide", url: "https://css-tricks.com/snippets/css/complete-guide-grid/", duration: "30 min", difficulty: "Intermediate", description: "Comprehensive guide to CSS Grid layout system" },
        { type: "documentation", title: "CSS Animations and Transitions", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations", duration: "25 min", difficulty: "Intermediate", description: "Creating smooth animations with CSS" },
        { type: "article", title: "Responsive Web Design Principles", url: "https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design", duration: "40 min", difficulty: "Intermediate", description: "Building responsive websites for all devices" },
        
        // JavaScript Learning Resources
        { type: "article", title: "JavaScript Basics - MDN Web Docs", url: "https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics", duration: "35 min", difficulty: "Beginner", description: "JavaScript fundamentals and core concepts" },
        { type: "documentation", title: "JavaScript DOM Manipulation", url: "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model", duration: "45 min", difficulty: "Beginner", description: "Interacting with HTML elements using JavaScript" },
        { type: "article", title: "JavaScript Event Handling", url: "https://developer.mozilla.org/en-US/docs/Web/Events", duration: "30 min", difficulty: "Beginner", description: "Handling user interactions and browser events" },
        { type: "documentation", title: "JavaScript Async Programming", url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous", duration: "50 min", difficulty: "Intermediate", description: "Promises, async/await, and asynchronous JavaScript" },
        { type: "article", title: "Modern JavaScript ES6+ Features", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide", duration: "60 min", difficulty: "Intermediate", description: "Modern JavaScript features and best practices" },
        { type: "article", title: "Web Performance Optimization", url: "https://developer.mozilla.org/en-US/docs/Learn/Performance", duration: "45 min", difficulty: "Advanced", description: "Optimizing web applications for speed and efficiency" },
        
        // GitHub Repositories - Educational Content
        { type: "github", title: "freeCodeCamp - Web Development Curriculum", url: "https://github.com/freeCodeCamp/freeCodeCamp", stars: "384k", difficulty: "Beginner", description: "Complete interactive web development curriculum with HTML, CSS, and JavaScript projects" },
        { type: "github", title: "JavaScript30 - 30 Day Vanilla JS Challenge", url: "https://github.com/wesbos/JavaScript30", stars: "26k", difficulty: "Beginner", description: "30-day vanilla JavaScript coding challenge to build real projects without frameworks" },
        { type: "github", title: "You Don't Know JS Book Series", url: "https://github.com/getify/You-Dont-Know-JS", stars: "177k", difficulty: "Intermediate", description: "Deep dive into JavaScript core mechanisms and advanced concepts" },
        { type: "github", title: "33 JavaScript Concepts", url: "https://github.com/leonardomso/33-js-concepts", stars: "62k", difficulty: "Intermediate", description: "33 JavaScript concepts every developer should know with examples" },
        { type: "github", title: "JavaScript Algorithms and Data Structures", url: "https://github.com/trekhleb/javascript-algorithms", stars: "183k", difficulty: "Intermediate", description: "Algorithms and data structures implemented in JavaScript with explanations" },
        { type: "github", title: "HTML5 Boilerplate", url: "https://github.com/h5bp/html5-boilerplate", stars: "56k", difficulty: "Intermediate", description: "Professional front-end template for building fast, robust web applications" },
        { type: "github", title: "Animate.css - CSS Animation Library", url: "https://github.com/animate-css/animate.css", stars: "79k", difficulty: "Beginner", description: "Cross-browser CSS animations library ready to use in your projects" },
        { type: "github", title: "Modern CSS Layout Patterns", url: "https://github.com/una/layout-patterns", stars: "12k", difficulty: "Intermediate", description: "Collection of modern CSS layout patterns and techniques" },
        { type: "github", title: "Web Development Best Practices", url: "https://github.com/google/WebFundamentals", stars: "13k", difficulty: "Intermediate", description: "Google's web development best practices and performance guidelines" },
        { type: "github", title: "Frontend Mentor Challenges", url: "https://github.com/frontendmentor-community/html-css-js-challenges", stars: "8k", difficulty: "Beginner", description: "Real-world HTML, CSS, and JavaScript coding challenges" },
        { type: "github", title: "Clean Code JavaScript", url: "https://github.com/ryanmcdermott/clean-code-javascript", stars: "89k", difficulty: "Intermediate", description: "Clean Code concepts adapted for JavaScript developers" },
        { type: "github", title: "Awesome CSS Learning", url: "https://github.com/micromata/awesome-css-learning", stars: "3k", difficulty: "Beginner", description: "Curated list of awesome CSS learning resources and tools" }
      ],
      html: [
        { type: "article", title: "HTML5 Semantic Elements Masterclass", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element", duration: "45 min", difficulty: "Beginner" },
        { type: "article", title: "Building Accessible Web Forms", url: "https://developer.mozilla.org/en-US/docs/Learn/Forms", duration: "20 min", difficulty: "Beginner" },
        { type: "documentation", title: "HTML5 API Reference Guide", url: "https://developer.mozilla.org/en-US/docs/Web/API", duration: "30 min", difficulty: "Intermediate" },
        { type: "article", title: "SEO-Optimized HTML Structure", url: "https://developer.mozilla.org/en-US/docs/Learn/HTML", duration: "35 min", difficulty: "Intermediate" },
        { type: "article", title: "Progressive Web App HTML Foundation", url: "https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps", duration: "25 min", difficulty: "Advanced" },
        { type: "article", title: "HTML Performance Optimization", url: "https://developer.mozilla.org/en-US/docs/Learn/Performance", duration: "40 min", difficulty: "Advanced" },
        // GitHub Repositories
        { type: "github", title: "freeCodeCamp - Complete Web Development Curriculum", url: "https://github.com/freeCodeCamp/freeCodeCamp", stars: "384k", difficulty: "Beginner", description: "The most comprehensive web development curriculum with interactive HTML challenges and projects" },
        { type: "github", title: "30 seconds of code - HTML Snippets", url: "https://github.com/30-seconds/30-seconds-of-code", stars: "118k", difficulty: "Beginner", description: "Short HTML code snippets for all your development needs" },
        { type: "github", title: "HTML5 Boilerplate", url: "https://github.com/h5bp/html5-boilerplate", stars: "56k", difficulty: "Intermediate", description: "Professional front-end template for building web apps and sites" },
        { type: "github", title: "HEAD - Guide to HTML head elements", url: "https://github.com/joshbuchea/HEAD", stars: "29k", difficulty: "Beginner", description: "Everything you need to know about the HTML head element" }
      ],
      css: [
        { type: "article", title: "CSS Flexbox Complete Course", url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/", duration: "50 min", difficulty: "Beginner" },
        { type: "article", title: "CSS Grid Layout Fundamentals", url: "https://css-tricks.com/snippets/css/complete-guide-grid/", duration: "30 min", difficulty: "Beginner" },
        { type: "documentation", title: "CSS Custom Properties Guide", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties", duration: "20 min", difficulty: "Intermediate" },
        { type: "article", title: "Advanced CSS Animations", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations", duration: "45 min", difficulty: "Intermediate" },
        { type: "article", title: "CSS Architecture & Methodologies", url: "https://developer.mozilla.org/en-US/docs/Learn/CSS", duration: "35 min", difficulty: "Advanced" },
        { type: "article", title: "CSS-in-JS and Modern Styling", url: "https://developer.mozilla.org/en-US/docs/Learn/CSS", duration: "40 min", difficulty: "Advanced" },
        // GitHub Repositories
        { type: "github", title: "Animate.css - CSS Animations Library", url: "https://github.com/animate-css/animate.css", stars: "79k", difficulty: "Beginner", description: "Cross-browser CSS animations library ready to use" },
        { type: "github", title: "CSS Layout Patterns", url: "https://github.com/una/layout-patterns", stars: "12k", difficulty: "Intermediate", description: "Modern CSS layout patterns and techniques" },
        { type: "github", title: "CSS Guidelines", url: "https://github.com/csswizardry/CSS-Guidelines", stars: "6k", difficulty: "Advanced", description: "High-level advice and guidelines for writing sane CSS" },
        { type: "github", title: "Flexbox Froggy Solutions", url: "https://github.com/thomaspark/flexboxfroggy", stars: "4k", difficulty: "Beginner", description: "Game for learning CSS flexbox with interactive exercises" }
      ],
      javascript: [
        { type: "article", title: "JavaScript ES6+ Features Deep Dive", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide", duration: "60 min", difficulty: "Beginner" },
        { type: "article", title: "DOM Manipulation & Event Handling", url: "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model", duration: "25 min", difficulty: "Beginner" },
        { type: "documentation", title: "Async JavaScript & Promises", url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous", duration: "30 min", difficulty: "Intermediate" },
        { type: "article", title: "JavaScript Design Patterns", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", duration: "55 min", difficulty: "Intermediate" },
        { type: "article", title: "Performance Optimization Techniques", url: "https://developer.mozilla.org/en-US/docs/Learn/Performance", duration: "40 min", difficulty: "Advanced" },
        { type: "article", title: "Node.js & Server-Side JavaScript", url: "https://nodejs.org/en/docs/", duration: "65 min", difficulty: "Advanced" },
        // GitHub Repositories
        { type: "github", title: "JavaScript30 - 30 Day Vanilla JS Challenge", url: "https://github.com/wesbos/JavaScript30", stars: "26k", difficulty: "Beginner", description: "30-day vanilla JavaScript coding challenge to build real projects" },
        { type: "github", title: "33 JS Concepts - JavaScript Fundamentals", url: "https://github.com/leonardomso/33-js-concepts", stars: "62k", difficulty: "Intermediate", description: "33 JavaScript concepts every developer should know" },
        { type: "github", title: "You Don't Know JS Book Series", url: "https://github.com/getify/You-Dont-Know-JS", stars: "177k", difficulty: "Advanced", description: "Deep dive into JavaScript core mechanisms and advanced concepts" },
        { type: "github", title: "JavaScript Algorithms and Data Structures", url: "https://github.com/trekhleb/javascript-algorithms", stars: "183k", difficulty: "Intermediate", description: "Algorithms and data structures implemented in JavaScript with explanations" }
      ],
      python: [
        // ✅ Beginner Level (Foundations)
        { type: "level", title: "✅ Beginner Level (Foundations)", goal: "Understand syntax, data types, and basic problem-solving", duration: "4-6 weeks", difficulty: "Beginner" },
        
        // Python Syntax & Variables
        { type: "lesson", title: "Python Syntax & Variables", description: "print(), indentation, comments - Declaring variables (int, float, string, bool)", duration: "45 min", difficulty: "Beginner" },
        
        // Data Types & Type Casting
        { type: "lesson", title: "Data Types & Type Casting", description: "int(), float(), str(), bool()", duration: "40 min", difficulty: "Beginner" },
        
        // Control Structures
        { type: "lesson", title: "Control Structures", description: "if, elif, else - Logical & comparison operators", duration: "50 min", difficulty: "Beginner" },
        
        // Loops
        { type: "lesson", title: "Loops", description: "for and while loops - break, continue, range()", duration: "55 min", difficulty: "Beginner" },
        
        // Functions
        { type: "lesson", title: "Functions", description: "def, return values, arguments, scope", duration: "60 min", difficulty: "Beginner" },
        
        // Data Structures
        { type: "lesson", title: "Data Structures", description: "Lists, tuples, sets, dictionaries - Basic operations and methods (append, pop, keys())", duration: "70 min", difficulty: "Beginner" },
        
        // Basic Input/Output
        { type: "lesson", title: "Basic Input/Output", description: "input(), file reading/writing (open, read, write, with)", duration: "45 min", difficulty: "Beginner" },
        
        // Error Handling
        { type: "lesson", title: "Error Handling", description: "try, except, finally", duration: "40 min", difficulty: "Beginner" },
        
        // Beginner Project
        { type: "project", title: "🔧 Project: Build a CLI to-do list or basic calculator", description: "Apply beginner concepts in a real project", duration: "4-6 hours", difficulty: "Beginner" },

        // ⚙️ Intermediate Level (Core Dev Skills)
        { type: "level", title: "⚙️ Intermediate Level (Core Dev Skills)", goal: "Write reusable, modular, and real-world Python code", duration: "6-8 weeks", difficulty: "Intermediate" },
        
        // OOP (Object-Oriented Programming)
        { type: "lesson", title: "OOP (Object-Oriented Programming)", description: "Classes, objects, __init__, inheritance, polymorphism", duration: "90 min", difficulty: "Intermediate" },
        
        // Modules & Packages
        { type: "lesson", title: "Modules & Packages", description: "import, creating your own modules - __name__ == '__main__' concept", duration: "60 min", difficulty: "Intermediate" },
        
        // Working with External Libraries
        { type: "lesson", title: "Working with External Libraries", description: "pip, using libraries like requests, datetime, os, json", duration: "75 min", difficulty: "Intermediate" },
        
        // File & Directory Management
        { type: "lesson", title: "File & Directory Management", description: "Handling files, working with CSV/JSON, paths", duration: "65 min", difficulty: "Intermediate" },
        
        // Virtual Environments & Dependency Management
        { type: "lesson", title: "Virtual Environments & Dependency Management", description: "venv, pip freeze, requirements.txt", duration: "50 min", difficulty: "Intermediate" },
        
        // Debugging & Logging
        { type: "lesson", title: "Debugging & Logging", description: "logging, pdb, stack traces", duration: "55 min", difficulty: "Intermediate" },
        
        // Unit Testing
        { type: "lesson", title: "Unit Testing", description: "unittest, pytest, TDD basics", duration: "80 min", difficulty: "Intermediate" },
        
        // Data Handling
        { type: "lesson", title: "Data Handling", description: "Use pandas and numpy for structured data", duration: "85 min", difficulty: "Intermediate" },
        
        // Intermediate Project
        { type: "project", title: "🔧 Project: Build a weather app using an API, or a command-line note manager", description: "Create real-world applications with APIs", duration: "8-12 hours", difficulty: "Intermediate" },

        // 🧠 Advanced Level (Real Engineering)
        { type: "level", title: "🧠 Advanced Level (Real Engineering)", goal: "Write production-grade, efficient, and scalable Python code", duration: "8-10 weeks", difficulty: "Advanced" },
        
        // Advanced OOP Concepts
        { type: "lesson", title: "Advanced OOP Concepts", description: "Encapsulation, abstraction, classmethods, staticmethods, @property", duration: "95 min", difficulty: "Advanced" },
        
        // Decorators & Generators
        { type: "lesson", title: "Decorators & Generators", description: "yield, @decorator, closures, functools", duration: "90 min", difficulty: "Advanced" },
        
        // Concurrency & Parallelism
        { type: "lesson", title: "Concurrency & Parallelism", description: "threading, multiprocessing, asyncio, await", duration: "100 min", difficulty: "Advanced" },
        
        // Design Patterns
        { type: "lesson", title: "Design Patterns", description: "Singleton, Factory, Observer, etc.", duration: "85 min", difficulty: "Advanced" },
        
        // Data Structures & Algorithms
        { type: "lesson", title: "Data Structures & Algorithms", description: "Trees, graphs, recursion, search & sort, big-O complexity", duration: "120 min", difficulty: "Advanced" },
        
        // Advanced Libraries - Web
        { type: "lesson", title: "Advanced Libraries: Web", description: "Flask, FastAPI", duration: "95 min", difficulty: "Advanced" },
        
        // Advanced Libraries - Automation
        { type: "lesson", title: "Advanced Libraries: Automation", description: "Selenium, BeautifulSoup", duration: "80 min", difficulty: "Advanced" },
        
        // Advanced Libraries - Data Science
        { type: "lesson", title: "Advanced Libraries: Data Science", description: "pandas, matplotlib, seaborn, scikit-learn", duration: "110 min", difficulty: "Advanced" },
        
        // Packaging & Deployment
        { type: "lesson", title: "Packaging & Deployment", description: "Build Python packages, publish to PyPI, create CLI tools", duration: "75 min", difficulty: "Advanced" },
        
        // Security & Best Practices
        { type: "lesson", title: "Security & Best Practices", description: "Handle user input safely, sanitize data, secure APIs", duration: "70 min", difficulty: "Advanced" },
        
        // Advanced Project
        { type: "project", title: "🔧 Project: Build a REST API with Flask/FastAPI, or a machine learning pipeline for a real dataset", description: "Create production-grade applications", duration: "15-20 hours", difficulty: "Advanced" }
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
      'web-fundamentals': [
        // Project-specific HTML resources
        { type: "article", title: "HTML Structure Best Practices", url: "https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure", duration: "15 min", difficulty: "Beginner" },
        { type: "documentation", title: "HTML Forms and Validation", url: "https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation", duration: "20 min", difficulty: "Beginner" },
        { type: "article", title: "CSS Layout Techniques for Projects", url: "https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout", duration: "25 min", difficulty: "Intermediate" },
        { type: "documentation", title: "JavaScript Project Patterns", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects", duration: "18 min", difficulty: "Intermediate" },
        { type: "article", title: "Responsive Design Implementation", url: "https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design", duration: "22 min", difficulty: "Intermediate" },
        // GitHub repositories for project inspiration
        { type: "github", title: "Frontend Mentor Projects", url: "https://github.com/frontendmentor-community", stars: "5k", difficulty: "Beginner", description: "Real-world frontend projects with designs and requirements" },
        { type: "github", title: "JavaScript Project Examples", url: "https://github.com/bradtraversy/50projects50days", stars: "33k", difficulty: "Beginner", description: "50 mini web projects using HTML, CSS & JavaScript" },
        { type: "github", title: "Responsive Web Design Projects", url: "https://github.com/microsoft/Web-Dev-For-Beginners", stars: "81k", difficulty: "Beginner", description: "Microsoft's web development curriculum with projects" }
      ],
      html: [
        { type: "article", title: "HTML Semantic Elements for This Project", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element", duration: "10 min" },
        { type: "article", title: "Building Responsive Layouts", url: "https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design", duration: "15 min" },
        { type: "documentation", title: "HTML5 Best Practices", url: "https://developer.mozilla.org/en-US/docs/Learn/HTML", duration: "8 min" }
      ],
      css: [
        { type: "article", title: "CSS Flexbox for This Project", url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/", duration: "12 min" },
        { type: "article", title: "CSS Grid Layout Tutorial", url: "https://css-tricks.com/snippets/css/complete-guide-grid/", duration: "20 min" },
        { type: "documentation", title: "CSS Animations for This Project", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations", duration: "15 min" }
      ],
      javascript: [
        { type: "article", title: "JavaScript Features for This Project", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide", duration: "15 min" },
        { type: "article", title: "DOM Manipulation for This Project", url: "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model", duration: "18 min" },
        { type: "documentation", title: "Async Patterns for This Project", url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous", duration: "12 min" }
      ],
      python: [
        { type: "article", title: "Python Libraries for This Project", url: "#", duration: "12 min" },
        { type: "article", title: "OOP Concepts for This Project", url: "#", duration: "25 min" },
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
      case "level": return <Target className="h-4 w-4" />;
      case "lesson": return <BookOpen className="h-4 w-4" />;
      case "project": return <Code className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  // If no language is specified, redirect to Python by default
  const handleLearningComplete = () => {
    toast({
      title: "Lesson Completed! 🎉",
      description: "Great job! You've completed this learning module.",
    });
    setCurrentLearningContent(null);
  };

  const handleBackToResources = () => {
    setCurrentLearningContent(null);
  };

  if (!language) {
    navigate('/learn/python');
    return null;
  }

  // If learning content is selected, show it instead of the main page
  if (currentLearningContent) {
    return (
      <LearningContent
        title={currentLearningContent.title}
        type={currentLearningContent.type}
        difficulty={currentLearningContent.difficulty}
        onComplete={handleLearningComplete}
        onBack={handleBackToResources}
      />
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
              
              <div className="space-y-6">
                {getLanguageLearningResources(language || 'python').map((resource, index) => {
                  // Level headers
                  if (resource.type === 'level') {
                    return (
                      <div key={index} className="mb-8">
                        <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 rounded-lg border-l-4 border-primary">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-lg bg-primary/20">
                              <Target className="h-5 w-5 text-primary" />
                            </div>
                            <h2 className="text-xl font-bold">{resource.title}</h2>
                            <Badge variant="secondary" className="text-xs">
                              {resource.duration}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground ml-11">
                            <strong>Goal:</strong> {resource.goal}
                          </p>
                        </div>
                      </div>
                    );
                  }

                  // Regular lessons and projects
                  return (
                    <Card key={index} className={`p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer ${
                      resource.type === 'project' ? 'border-l-4 border-orange-500 bg-orange-50/50 dark:bg-orange-900/10' : ''
                    }`}>
                      <div className="flex items-start gap-3 mb-4">
                        <div className={`p-2 rounded-lg ${
                          resource.type === 'project' ? 'bg-orange-500/20' : 'bg-primary/10'
                        }`}>
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
                      
                      {resource.description && (
                        <p className="text-sm text-muted-foreground mb-3">
                          {resource.description}
                        </p>
                      )}
                      
                      <div className="space-y-3">
                        <Button 
                          size="sm" 
                          className="w-full" 
                          variant={resource.type === 'project' ? 'default' : 'outline'}
                          onClick={() => {
                            setCurrentLearningContent({
                              title: resource.title,
                              type: resource.type,
                              difficulty: resource.difficulty,
                              description: resource.description
                            });
                          }}
                        >
                          {resource.type === 'project' ? (
                            <>
                              <Code className="h-3 w-3 mr-2" />
                              Start Project
                            </>
                          ) : (
                            <>
                              <BookOpen className="h-3 w-3 mr-2" />
                              Start Lesson
                            </>
                          )}
                        </Button>
                      </div>
                    </Card>
                  );
                })}
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