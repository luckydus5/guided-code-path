import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, Target, Trophy, Maximize, Minimize, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";
import CodeEnvironment from "@/components/CodeEnvironment";
import { useToast } from "@/hooks/use-toast";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { ImperativePanelHandle } from "react-resizable-panels";

interface Project {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  objectives: string[];
  requirements: string[];
  initialFiles?: FileTab[];
}

interface FileTab {
  id: string;
  name: string;
  language: 'html' | 'css' | 'javascript' | 'typescript' | 'python';
  content: string;
  isActive: boolean;
}

interface User {
  id: string;
  email: string;
  name?: string;
}

interface Profile {
  id: string;
  user_id: string;
  username?: string;
  avatar_url?: string;
  learning_progress?: any;
}

interface ProjectEnvironmentProps {
  user?: User;
  profile?: Profile;
}

export default function ProjectEnvironment({ user, profile }: ProjectEnvironmentProps) {
  const { language, projectId } = useParams<{ language: string; projectId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Panel management
  const instructionsPanelRef = useRef<ImperativePanelHandle>(null);
  const codePanelRef = useRef<ImperativePanelHandle>(null);
  const [instructionsMaximized, setInstructionsMaximized] = useState(false);
  const [codeMaximized, setCodeMaximized] = useState(false);
  const [project, setProject] = useState<Project | null>(null);
  const [showInstructions, setShowInstructions] = useState(true);

  // Panel control functions
  const maximizeInstructions = () => {
    if (instructionsPanelRef.current && codePanelRef.current) {
      instructionsPanelRef.current.resize(80);
      codePanelRef.current.resize(20);
      setInstructionsMaximized(true);
      setCodeMaximized(false);
    }
  };

  const maximizeCode = () => {
    if (instructionsPanelRef.current && codePanelRef.current) {
      instructionsPanelRef.current.resize(15);
      codePanelRef.current.resize(85);
      setCodeMaximized(true);
      setInstructionsMaximized(false);
    }
  };

  const restorePanelBalance = () => {
    if (instructionsPanelRef.current && codePanelRef.current) {
      instructionsPanelRef.current.resize(30);
      codePanelRef.current.resize(70);
      setInstructionsMaximized(false);
      setCodeMaximized(false);
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey) {
        switch(event.key) {
          case '1':
            event.preventDefault();
            maximizeInstructions();
            break;
          case '2':
            event.preventDefault();
            maximizeCode();
            break;
          case '0':
            event.preventDefault();
            restorePanelBalance();
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const loadProject = useCallback(() => {
    // Mock project data - in real app, fetch from API
    const projects = {
      '1': {
        id: '1',
        title: 'Interactive Landing Page',
        description: 'Build a modern, responsive landing page with animations and interactive forms.',
        difficulty: 'Beginner',
        objectives: [
          'Create a semantic HTML structure',
          'Style with modern CSS techniques (Flexbox/Grid)',
          'Add smooth scrolling navigation',
          'Implement a contact form with validation',
          'Create hover animations and transitions'
        ],
        requirements: [
          'Use semantic HTML5 elements',
          'Implement responsive design (mobile-first)',
          'Add CSS animations and transitions',
          'Include form validation with JavaScript',
          'Optimize for accessibility'
        ]
      },
      '2': {
        id: '2',
        title: 'Interactive To-Do App',
        description: 'Create a fully functional task management application with local storage.',
        difficulty: 'Beginner',
        objectives: [
          'Build dynamic UI with JavaScript',
          'Implement CRUD operations for tasks',
          'Add task filtering and search',
          'Store data in localStorage',
          'Create smooth animations for interactions'
        ],
        requirements: [
          'Add, edit, delete, and complete tasks',
          'Filter tasks by status (all, active, completed)',
          'Persist data using localStorage',
          'Implement keyboard shortcuts',
          'Add task statistics and counters'
        ]
      },
      '3': {
        id: '3',
        title: 'Portfolio Website',
        description: 'Design and build a professional portfolio website showcasing your skills.',
        difficulty: 'Intermediate',
        objectives: [
          'Create a multi-section portfolio layout',
          'Implement smooth scrolling and navigation',
          'Add project showcase with modal views',
          'Create animated skill progress bars',
          'Build a working contact form'
        ],
        requirements: [
          'Responsive design for all devices',
          'SEO-optimized structure',
          'Performance optimized images',
          'Social media integration',
          'Print-friendly CSS'
        ]
      },
      '4': {
        id: '4',
        title: 'Weather Dashboard',
        description: 'Build a weather application using APIs with dynamic data visualization.',
        difficulty: 'Intermediate',
        objectives: [
          'Fetch data from weather APIs',
          'Display current weather and forecasts',
          'Create interactive weather charts',
          'Implement location-based services',
          'Add weather alerts and notifications'
        ],
        requirements: [
          'Use Fetch API for data retrieval',
          'Handle API errors gracefully',
          'Implement loading states',
          'Cache data for offline viewing',
          'Add geolocation features'
        ]
      },
      '5': {
        id: '5',
        title: 'E-commerce Product Page',
        description: 'Create an interactive product page with shopping cart functionality.',
        difficulty: 'Intermediate',
        objectives: [
          'Build product image gallery with zoom',
          'Implement quantity selectors and variants',
          'Create shopping cart with calculations',
          'Add product reviews and ratings',
          'Design responsive product layout'
        ],
        requirements: [
          'Image zoom and gallery navigation',
          'Cart persistence with localStorage',
          'Price calculations with taxes/shipping',
          'Product variant selection',
          'Customer review system'
        ]
      },
      '6': {
        id: '6',
        title: 'Music Player Interface',
        description: 'Design an interactive music player with playlist management.',
        difficulty: 'Advanced',
        objectives: [
          'Create audio player with custom controls',
          'Build playlist management system',
          'Add visualizations and animations',
          'Implement shuffle and repeat modes',
          'Design responsive media controls'
        ],
        requirements: [
          'Custom audio controls (play, pause, seek)',
          'Playlist creation and management',
          'Progress bars and time displays',
          'Volume control with visualization',
          'Keyboard media key support'
        ]
      },
      '7': {
        id: '7',
        title: 'Interactive Quiz Game',
        description: 'Build an engaging quiz application with scoring and timer features.',
        difficulty: 'Intermediate',
        objectives: [
          'Create dynamic question display',
          'Implement timer and scoring system',
          'Add multiple question types',
          'Build results and analytics page',
          'Create progress tracking'
        ],
        requirements: [
          'Multiple choice and true/false questions',
          'Timer with visual countdown',
          'Score calculation and leaderboard',
          'Question shuffling and randomization',
          'Results sharing functionality'
        ]
      },
      '8': {
        id: '8',
        title: 'Restaurant Menu & Ordering',
        description: 'Create an interactive restaurant menu with order management.',
        difficulty: 'Advanced',
        objectives: [
          'Build categorized menu display',
          'Implement order cart system',
          'Add menu item customization',
          'Create order summary and checkout',
          'Design tablet-friendly interface'
        ],
        requirements: [
          'Menu filtering by category/dietary needs',
          'Item customization (size, extras)',
          'Order total with taxes and tips',
          'Table number and special requests',
          'Print-friendly order receipts'
        ]
      },
      '9': {
        id: '9',
        title: 'Photo Gallery & Editor',
        description: 'Build an interactive photo gallery with basic editing capabilities.',
        difficulty: 'Advanced',
        objectives: [
          'Create responsive photo grid layout',
          'Implement lightbox with navigation',
          'Add basic photo editing tools',
          'Build photo upload and organization',
          'Create slideshow functionality'
        ],
        requirements: [
          'Masonry/grid layout for photos',
          'Canvas-based image editing',
          'Photo filtering and effects',
          'Drag & drop file uploads',
          'EXIF data display'
        ]
      },
      '10': {
        id: '10',
        title: 'Calendar & Event Manager',
        description: 'Design a functional calendar application with event management.',
        difficulty: 'Advanced',
        objectives: [
          'Build interactive calendar grid',
          'Implement event creation and editing',
          'Add different calendar views',
          'Create event notifications',
          'Design recurring event system'
        ],
        requirements: [
          'Month, week, and day views',
          'Event CRUD operations',
          'Event categories and colors',
          'Import/export calendar data',
          'Reminder notifications'
        ]
      },
      '11': {
        id: '11',
        title: 'Expense Tracker Dashboard',
        description: 'Create a comprehensive expense tracking application with charts.',
        difficulty: 'Advanced',
        objectives: [
          'Build expense entry and categorization',
          'Create data visualization charts',
          'Implement budget tracking',
          'Add expense analysis and reports',
          'Design responsive dashboard layout'
        ],
        requirements: [
          'Multiple chart types (pie, bar, line)',
          'Category-based expense tracking',
          'Budget alerts and notifications',
          'Data export functionality',
          'Monthly/yearly reporting'
        ]
      },
      '12': {
        id: '12',
        title: 'Interactive Learning Platform',
        description: 'Build a mini learning platform with courses and progress tracking.',
        difficulty: 'Advanced',
        objectives: [
          'Create course catalog and navigation',
          'Implement lesson progress tracking',
          'Add interactive coding exercises',
          'Build quiz and assessment system',
          'Design student dashboard'
        ],
        requirements: [
          'Course enrollment and progress',
          'Interactive code editor integration',
          'Progress bars and achievements',
          'Certificate generation',
          'Discussion forums or comments'
        ]
      }
    };

    const projectData = projects[projectId as keyof typeof projects];
    
    if (projectData) {
      setProject({
        ...projectData,
        initialFiles: getInitialFiles(projectId)
      });
    } else {
      // Default project
      setProject({
        id: projectId,
        title: `${language?.toUpperCase()} Project ${projectId}`,
        description: `Build an interactive ${language} application with HTML, CSS, and JavaScript.`,
        difficulty: "Beginner",
        objectives: [
          "Create a responsive HTML structure",
          "Style with modern CSS techniques",
          "Add interactive JavaScript functionality",
          "Implement user feedback and animations"
        ],
        initialFiles: getInitialFiles(projectId),
        requirements: [
          "Use semantic HTML elements",
          "Implement responsive design",
          "Add at least 3 interactive features",
          "Include proper error handling"
        ]
      });
    }
  }, [projectId, language]);

  useEffect(() => {
    loadProject();
  }, [loadProject]);

  const getInitialFiles = (projectId: string | undefined) => {
    // Return different starter files based on project
    const baseFiles = [
      {
        id: '1',
        name: 'index.html',
        language: 'html' as const,
        content: getProjectHTML(projectId),
        isActive: true
      },
      {
        id: '2',
        name: 'style.css',
        language: 'css' as const,
        content: getProjectCSS(projectId),
        isActive: false
      },
      {
        id: '3',
        name: 'script.js',
        language: 'javascript' as const,
        content: getProjectJS(projectId),
        isActive: false
      }
    ];
    
    return baseFiles;
  };

  const handleSaveProject = (files: FileTab[]) => {
    // Save project progress
    toast({
      title: "Project Saved",
      description: "Your progress has been saved successfully!"
    });
    
    // In real app, save to backend
    console.log('Saving project files:', files);
  };

  const completeProject = () => {
    toast({
      title: "🎉 Project Completed!",
      description: "Congratulations! You've successfully completed this project."
    });
    
    // Navigate back to learning page
    setTimeout(() => {
      navigate(`/learn/${language}`);
    }, 2000);
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading project...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Project Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate(`/learn/${language}`)}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Learning</span>
              </Button>
              
              <div>
                <h1 className="text-2xl font-bold">{project.title}</h1>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant="secondary">{language?.toUpperCase()}</Badge>
                  <Badge variant="outline">{project.difficulty}</Badge>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowInstructions(!showInstructions)}
              >
                <BookOpen className="h-4 w-4 mr-2" />
                {showInstructions ? 'Hide' : 'Show'} Instructions
              </Button>
              
              {showInstructions && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={maximizeInstructions}
                    disabled={instructionsMaximized}
                    title="Maximize Instructions (Ctrl+1)"
                  >
                    <Maximize className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={maximizeCode}
                    disabled={codeMaximized}
                    title="Maximize Code (Ctrl+2)"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={restorePanelBalance}
                    disabled={!instructionsMaximized && !codeMaximized}
                    title="Restore Balance (Ctrl+0)"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </>
              )}
              
              <Button onClick={completeProject} className="bg-green-600 hover:bg-green-700">
                <Trophy className="h-4 w-4 mr-2" />
                Complete Project
              </Button>
            </div>
          </div>
        </div>
      </div>

      {showInstructions ? (
        <ResizablePanelGroup
          direction="horizontal"
          className="h-[calc(100vh-200px)] border border-border rounded-lg"
        >
          {/* Instructions Panel */}
          <ResizablePanel
            ref={instructionsPanelRef}
            defaultSize={30}
            minSize={15}
            maxSize={80}
            className="bg-card/30"
          >
            <div className="h-full p-6 overflow-y-auto">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <Target className="h-5 w-5 mr-2 text-primary" />
                    Project Overview
                    {instructionsMaximized && (
                      <Badge variant="secondary" className="ml-2 text-xs">
                        Maximized
                      </Badge>
                    )}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Learning Objectives</h4>
                  <ul className="space-y-2">
                    {project.objectives.map((objective: string, index: number) => (
                      <li key={index} className="flex items-start space-x-2 text-sm">
                        <div className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                        <span className="text-muted-foreground">{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Requirements</h4>
                  <ul className="space-y-2">
                    {project.requirements.map((requirement: string, index: number) => (
                      <li key={index} className="flex items-start space-x-2 text-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                        <span className="text-muted-foreground">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Card className="bg-blue-500/10 border-blue-500/20">
                  <CardContent className="p-4">
                    <h5 className="font-medium text-blue-800 dark:text-blue-300 mb-2">💡 Pro Tip</h5>
                    <p className="text-xs text-blue-700 dark:text-blue-400">
                      Use the auto-run feature to see your changes in real-time as you code. 
                      Don't forget to test your project on different screen sizes!
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Code Environment Panel */}
          <ResizablePanel
            ref={codePanelRef}
            defaultSize={70}
            minSize={20}
            maxSize={85}
          >
            <div className="h-full relative">
              {codeMaximized && (
                <div className="absolute top-2 right-2 z-10">
                  <Badge variant="secondary" className="text-xs">
                    Code Maximized
                  </Badge>
                </div>
              )}
              <CodeEnvironment
                projectId={projectId}
                initialFiles={project.initialFiles}
                onSave={handleSaveProject}
              />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      ) : (
        <div className="h-[calc(100vh-200px)]">
          <CodeEnvironment
            projectId={projectId}
            initialFiles={project.initialFiles}
            onSave={handleSaveProject}
          />
        </div>
      )}
    </div>
  );
}

// Project-specific starter code
function getProjectHTML(projectId: string | undefined): string {
  switch (projectId) {
    case '1':
      return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interactive Landing Page</title>
</head>
<body>
    <header class="hero">
        <nav class="navbar">
            <div class="logo">YourBrand</div>
            <ul class="nav-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
            <div class="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </nav>
        
        <div class="hero-content">
            <h1>Welcome to the Future</h1>
            <p>Build amazing things with code</p>
            <button class="cta-button" id="ctaButton">Get Started</button>
        </div>
    </header>
    
    <main>
        <section id="about" class="about">
            <div class="container">
                <h2>About Us</h2>
                <p>We are passionate about creating amazing web experiences.</p>
            </div>
        </section>
        
        <section id="services" class="services">
            <div class="container">
                <h2>Our Services</h2>
                <div class="service-grid">
                    <div class="service-card">
                        <div class="service-icon">🚀</div>
                        <h3>Web Development</h3>
                        <p>Custom websites and applications</p>
                    </div>
                    <div class="service-card">
                        <div class="service-icon">📱</div>
                        <h3>Mobile Apps</h3>
                        <p>iOS and Android applications</p>
                    </div>
                    <div class="service-card">
                        <div class="service-icon">🎨</div>
                        <h3>UI/UX Design</h3>
                        <p>Beautiful and intuitive interfaces</p>
                    </div>
                </div>
            </div>
        </section>
        
        <section id="contact" class="contact">
            <div class="container">
                <h2>Get In Touch</h2>
                <form id="contactForm" class="contact-form">
                    <div class="form-group">
                        <input type="text" id="name" placeholder="Your Name" required>
                        <span class="error-message" id="nameError"></span>
                    </div>
                    <div class="form-group">
                        <input type="email" id="email" placeholder="Your Email" required>
                        <span class="error-message" id="emailError"></span>
                    </div>
                    <div class="form-group">
                        <textarea id="message" placeholder="Your Message" required></textarea>
                        <span class="error-message" id="messageError"></span>
                    </div>
                    <button type="submit">Send Message</button>
                </form>
            </div>
        </section>
    </main>
    
    <footer>
        <div class="container">
            <p>&copy; 2025 YourBrand. All rights reserved.</p>
        </div>
    </footer>
</body>
</html>`;

    case '2':
      return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interactive To-Do App</title>
</head>
<body>
    <div class="app">
        <header class="app-header">
            <h1>My Task Manager</h1>
            <div class="stats">
                <span class="stat">
                    <span id="totalTasks">0</span> total
                </span>
                <span class="stat">
                    <span id="completedTasks">0</span> completed
                </span>
                <span class="stat">
                    <span id="pendingTasks">0</span> pending
                </span>
            </div>
        </header>
        
        <main class="app-main">
            <div class="add-task">
                <input type="text" id="taskInput" placeholder="Add a new task..." maxlength="100">
                <button id="addButton">Add Task</button>
            </div>
            
            <div class="task-controls">
                <div class="task-filters">
                    <button class="filter-btn active" data-filter="all">All</button>
                    <button class="filter-btn" data-filter="pending">Pending</button>
                    <button class="filter-btn" data-filter="completed">Completed</button>
                </div>
                
                <div class="task-actions">
                    <button id="clearCompleted">Clear Completed</button>
                    <button id="clearAll">Clear All</button>
                </div>
            </div>
            
            <div class="search-bar">
                <input type="text" id="searchInput" placeholder="Search tasks...">
            </div>
            
            <div class="task-list" id="taskList">
                <!-- Tasks will be added here dynamically -->
            </div>
            
            <div class="empty-state" id="emptyState" style="display: none;">
                <div class="empty-icon">📝</div>
                <h3>No tasks yet!</h3>
                <p>Add a task above to get started</p>
            </div>
        </main>
    </div>
</body>
</html>`;

    case '3':
      return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfolio - Your Name</title>
</head>
<body>
    <nav class="navbar">
        <div class="nav-container">
            <div class="nav-logo">Portfolio</div>
            <ul class="nav-menu">
                <li><a href="#home" class="nav-link">Home</a></li>
                <li><a href="#about" class="nav-link">About</a></li>
                <li><a href="#skills" class="nav-link">Skills</a></li>
                <li><a href="#projects" class="nav-link">Projects</a></li>
                <li><a href="#contact" class="nav-link">Contact</a></li>
            </ul>
            <div class="hamburger">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </div>
        </div>
    </nav>

    <section id="home" class="hero">
        <div class="hero-content">
            <h1>Hello, I'm <span class="highlight">Your Name</span></h1>
            <p class="hero-description">Web Developer & Designer</p>
            <div class="hero-buttons">
                <a href="#projects" class="btn btn-primary">View My Work</a>
                <a href="#contact" class="btn btn-outline">Get In Touch</a>
            </div>
        </div>
        <div class="hero-image">
            <div class="image-placeholder">
                <span>Your Photo</span>
            </div>
        </div>
    </section>

    <section id="about" class="about">
        <div class="container">
            <h2>About Me</h2>
            <div class="about-content">
                <div class="about-text">
                    <p>I'm a passionate web developer with experience in creating modern, responsive websites and applications.</p>
                    <p>I love turning complex problems into simple, beautiful solutions.</p>
                </div>
                <div class="about-stats">
                    <div class="stat">
                        <span class="stat-number" data-target="50">0</span>
                        <span class="stat-label">Projects</span>
                    </div>
                    <div class="stat">
                        <span class="stat-number" data-target="2">0</span>
                        <span class="stat-label">Years Experience</span>
                    </div>
                    <div class="stat">
                        <span class="stat-number" data-target="100">0</span>
                        <span class="stat-label">Happy Clients</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="skills" class="skills">
        <div class="container">
            <h2>Skills</h2>
            <div class="skills-grid">
                <div class="skill">
                    <h3>HTML/CSS</h3>
                    <div class="skill-bar">
                        <div class="skill-progress" data-percent="90"></div>
                    </div>
                    <span class="skill-percent">90%</span>
                </div>
                <div class="skill">
                    <h3>JavaScript</h3>
                    <div class="skill-bar">
                        <div class="skill-progress" data-percent="85"></div>
                    </div>
                    <span class="skill-percent">85%</span>
                </div>
                <div class="skill">
                    <h3>React</h3>
                    <div class="skill-bar">
                        <div class="skill-progress" data-percent="80"></div>
                    </div>
                    <span class="skill-percent">80%</span>
                </div>
                <div class="skill">
                    <h3>Node.js</h3>
                    <div class="skill-bar">
                        <div class="skill-progress" data-percent="75"></div>
                    </div>
                    <span class="skill-percent">75%</span>
                </div>
            </div>
        </div>
    </section>

    <section id="projects" class="projects">
        <div class="container">
            <h2>My Projects</h2>
            <div class="projects-grid">
                <div class="project-card" data-project="1">
                    <div class="project-image">
                        <div class="image-placeholder">Project 1</div>
                    </div>
                    <div class="project-info">
                        <h3>E-commerce Website</h3>
                        <p>A full-stack e-commerce solution</p>
                        <div class="project-links">
                            <a href="#" class="btn-link">Live Demo</a>
                            <a href="#" class="btn-link">GitHub</a>
                        </div>
                    </div>
                </div>
                
                <div class="project-card" data-project="2">
                    <div class="project-image">
                        <div class="image-placeholder">Project 2</div>
                    </div>
                    <div class="project-info">
                        <h3>Task Management App</h3>
                        <p>React-based productivity tool</p>
                        <div class="project-links">
                            <a href="#" class="btn-link">Live Demo</a>
                            <a href="#" class="btn-link">GitHub</a>
                        </div>
                    </div>
                </div>
                
                <div class="project-card" data-project="3">
                    <div class="project-image">
                        <div class="image-placeholder">Project 3</div>
                    </div>
                    <div class="project-info">
                        <h3>Weather Dashboard</h3>
                        <p>Real-time weather application</p>
                        <div class="project-links">
                            <a href="#" class="btn-link">Live Demo</a>
                            <a href="#" class="btn-link">GitHub</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="contact" class="contact">
        <div class="container">
            <h2>Get In Touch</h2>
            <div class="contact-content">
                <div class="contact-info">
                    <div class="contact-item">
                        <span class="contact-icon">📧</span>
                        <span>your.email@example.com</span>
                    </div>
                    <div class="contact-item">
                        <span class="contact-icon">📱</span>
                        <span>+1 (555) 123-4567</span>
                    </div>
                    <div class="contact-item">
                        <span class="contact-icon">📍</span>
                        <span>Your City, Country</span>
                    </div>
                </div>
                <form class="contact-form" id="contactForm">
                    <input type="text" placeholder="Your Name" required>
                    <input type="email" placeholder="Your Email" required>
                    <textarea placeholder="Your Message" required></textarea>
                    <button type="submit">Send Message</button>
                </form>
            </div>
        </div>
    </section>

    <footer class="footer">
        <div class="container">
            <p>&copy; 2025 Your Name. All rights reserved.</p>
            <div class="social-links">
                <a href="#" class="social-link">GitHub</a>
                <a href="#" class="social-link">LinkedIn</a>
                <a href="#" class="social-link">Twitter</a>
            </div>
        </div>
    </footer>

    <!-- Project Modal -->
    <div id="projectModal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <div id="modalContent">
                <!-- Project details will be inserted here -->
            </div>
        </div>
    </div>
</body>
</html>`;

    case '4':
      return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Weather Dashboard</title>
</head>
<body>
    <div class="app">
        <header class="header">
            <h1>Weather Dashboard</h1>
            <div class="search-container">
                <input type="text" id="searchInput" placeholder="Enter city name...">
                <button id="searchBtn">Search</button>
                <button id="locationBtn" title="Use current location">📍</button>
            </div>
        </header>

        <main class="main">
            <div class="current-weather" id="currentWeather">
                <div class="location">
                    <h2 id="cityName">New York, NY</h2>
                    <p id="currentDate">Monday, January 1, 2025</p>
                </div>
                <div class="weather-info">
                    <div class="temperature">
                        <span id="currentTemp">22°C</span>
                        <div class="weather-icon" id="weatherIcon">☀️</div>
                    </div>
                    <div class="weather-details">
                        <p id="weatherDescription">Sunny</p>
                        <p>Feels like <span id="feelsLike">25°C</span></p>
                    </div>
                </div>
            </div>

            <div class="weather-stats">
                <div class="stat-card">
                    <div class="stat-icon">💨</div>
                    <div class="stat-info">
                        <span class="stat-value" id="windSpeed">12 km/h</span>
                        <span class="stat-label">Wind Speed</span>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">💧</div>
                    <div class="stat-info">
                        <span class="stat-value" id="humidity">65%</span>
                        <span class="stat-label">Humidity</span>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">👁️</div>
                    <div class="stat-info">
                        <span class="stat-value" id="visibility">10 km</span>
                        <span class="stat-label">Visibility</span>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">🌡️</div>
                    <div class="stat-info">
                        <span class="stat-value" id="pressure">1013 hPa</span>
                        <span class="stat-label">Pressure</span>
                    </div>
                </div>
            </div>

            <div class="forecast-container">
                <h3>5-Day Forecast</h3>
                <div class="forecast-grid" id="forecastGrid">
                    <!-- Forecast items will be inserted here -->
                </div>
            </div>

            <div class="hourly-forecast">
                <h3>Hourly Forecast</h3>
                <div class="hourly-scroll" id="hourlyForecast">
                    <!-- Hourly items will be inserted here -->
                </div>
            </div>
        </main>
    </div>

    <div class="loading" id="loading" style="display: none;">
        <div class="spinner"></div>
        <p>Loading weather data...</p>
    </div>
</body>
</html>`;

    case '5':
      return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>E-commerce Product Page</title>
</head>
<body>
    <div class="container">
        <div class="product-page">
            <div class="product-images">
                <div class="main-image">
                    <img id="mainImage" src="https://via.placeholder.com/400x400/007bff/white?text=Product" alt="Product Image">
                    <div class="zoom-lens" id="zoomLens"></div>
                </div>
                <div class="thumbnail-images">
                    <img class="thumbnail active" src="https://via.placeholder.com/80x80/007bff/white?text=1" data-src="https://via.placeholder.com/400x400/007bff/white?text=Product">
                    <img class="thumbnail" src="https://via.placeholder.com/80x80/28a745/white?text=2" data-src="https://via.placeholder.com/400x400/28a745/white?text=Green">
                    <img class="thumbnail" src="https://via.placeholder.com/80x80/dc3545/white?text=3" data-src="https://via.placeholder.com/400x400/dc3545/white?text=Red">
                </div>
            </div>
            
            <div class="product-info">
                <h1>Premium Wireless Headphones</h1>
                <div class="rating">
                    <div class="stars">
                        <span class="star active">★</span>
                        <span class="star active">★</span>
                        <span class="star active">★</span>
                        <span class="star active">★</span>
                        <span class="star">★</span>
                    </div>
                    <span class="rating-text">(4.2/5) 127 reviews</span>
                </div>
                
                <div class="price">
                    <span class="current-price">$129.99</span>
                    <span class="original-price">$179.99</span>
                    <span class="discount">28% OFF</span>
                </div>
                
                <div class="product-options">
                    <div class="option-group">
                        <label>Color:</label>
                        <div class="color-options">
                            <button class="color-option active" data-color="black" style="background: #000"></button>
                            <button class="color-option" data-color="white" style="background: #fff; border: 1px solid #ccc"></button>
                            <button class="color-option" data-color="blue" style="background: #007bff"></button>
                        </div>
                    </div>
                    
                    <div class="option-group">
                        <label>Size:</label>
                        <select id="sizeSelect">
                            <option value="small">Small</option>
                            <option value="medium" selected>Medium</option>
                            <option value="large">Large</option>
                        </select>
                    </div>
                </div>
                
                <div class="quantity-section">
                    <label>Quantity:</label>
                    <div class="quantity-controls">
                        <button id="decreaseQty">-</button>
                        <span id="quantity">1</span>
                        <button id="increaseQty">+</button>
                    </div>
                </div>
                
                <div class="action-buttons">
                    <button id="addToCart" class="btn-primary">Add to Cart</button>
                    <button id="buyNow" class="btn-secondary">Buy Now</button>
                    <button id="wishlist" class="btn-wishlist">♡</button>
                </div>
            </div>
        </div>
        
        <div class="product-tabs">
            <div class="tab-buttons">
                <button class="tab-btn active" data-tab="description">Description</button>
                <button class="tab-btn" data-tab="reviews">Reviews</button>
                <button class="tab-btn" data-tab="shipping">Shipping</button>
            </div>
            
            <div class="tab-content">
                <div id="description" class="tab-pane active">
                    <h3>Product Description</h3>
                    <p>Premium wireless headphones with advanced noise cancellation technology and 30-hour battery life. Perfect for music lovers and professionals.</p>
                    <ul>
                        <li>Active Noise Cancellation</li>
                        <li>30-hour battery life</li>
                        <li>Quick charge: 5 minutes = 3 hours</li>
                        <li>Premium comfort design</li>
                    </ul>
                </div>
                <div id="reviews" class="tab-pane">
                    <h3>Customer Reviews</h3>
                    <div class="review">
                        <div class="review-header">
                            <span class="reviewer">John D.</span>
                            <div class="review-stars">★★★★★</div>
                        </div>
                        <p>"Excellent sound quality and comfortable fit! Worth every penny."</p>
                    </div>
                    <div class="review">
                        <div class="review-header">
                            <span class="reviewer">Sarah M.</span>
                            <div class="review-stars">★★★★☆</div>
                        </div>
                        <p>"Great headphones, noise cancellation works really well."</p>
                    </div>
                </div>
                <div id="shipping" class="tab-pane">
                    <h3>Shipping Information</h3>
                    <p>Free shipping on orders over $100. Express delivery available.</p>
                    <ul>
                        <li>Standard shipping: 3-5 business days</li>
                        <li>Express shipping: 1-2 business days</li>
                        <li>International shipping available</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    
    <div id="cart-sidebar" class="cart-sidebar">
        <div class="cart-header">
            <h3>Shopping Cart</h3>
            <button id="closeCart">×</button>
        </div>
        <div class="cart-items" id="cartItems">
            <div class="empty-cart">Your cart is empty</div>
        </div>
        <div class="cart-footer">
            <div class="cart-total">
                Total: $<span id="cartTotal">0.00</span>
            </div>
            <button class="btn-checkout">Checkout</button>
        </div>
    </div>
</body>
</html>`;

    default:
      return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Web Project</title>
</head>
<body>
    <div class="container">
        <header>
            <h1>Welcome to Your Web Project!</h1>
            <p>Start building something amazing with HTML, CSS, and JavaScript!</p>
        </header>
        
        <main>
            <section class="intro">
                <h2>Getting Started</h2>
                <p>This is your starting template. You can:</p>
                <ul>
                    <li>Edit the HTML structure</li>
                    <li>Style with CSS</li>
                    <li>Add interactivity with JavaScript</li>
                    <li>See live preview as you code</li>
                </ul>
            </section>
            
            <section class="interactive">
                <h2>Interactive Elements</h2>
                <button id="actionButton" class="btn">Click Me!</button>
                <div id="output" class="output">
                    <p>Output will appear here...</p>
                </div>
            </section>
        </main>
        
        <footer>
            <p>Built with ❤️ using HTML, CSS, and JavaScript</p>
        </footer>
    </div>
</body>
</html>`;
  }
}

function getProjectCSS(projectId: string | undefined): string {
  switch (projectId) {
    case '1':
      return `/* Landing Page Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: #333;
}

/* Navigation */
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 5%;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
}

.logo {
    font-size: 1.5rem;
    font-weight: bold;
    color: #667eea;
}

.nav-links {
    display: flex;
    list-style: none;
    gap: 2rem;
}

.nav-links a {
    text-decoration: none;
    color: #333;
    transition: color 0.3s;
}

.nav-links a:hover {
    color: #667eea;
}

/* Hero Section */
.hero {
    height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: white;
}

.hero-content h1 {
    font-size: 3.5rem;
    margin-bottom: 1rem;
    animation: fadeInUp 1s ease-out;
}

.hero-content p {
    font-size: 1.3rem;
    margin-bottom: 2rem;
    opacity: 0.9;
    animation: fadeInUp 1s ease-out 0.2s both;
}

.cta-button {
    padding: 15px 40px;
    font-size: 1.1rem;
    background: #ff6b6b;
    color: white;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s;
    animation: fadeInUp 1s ease-out 0.4s both;
}

.cta-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

/* Features Section */
.features {
    padding: 5rem 5%;
    text-align: center;
}

.features h2 {
    font-size: 2.5rem;
    margin-bottom: 3rem;
    color: #333;
}

.feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

.feature-card {
    padding: 2rem;
    background: white;
    border-radius: 15px;
    box-shadow: 0 5px 20px rgba(0,0,0,0.1);
    transition: transform 0.3s;
}

.feature-card:hover {
    transform: translateY(-5px);
}

/* Contact Section */
.contact {
    padding: 5rem 5%;
    background: #f8f9fa;
    text-align: center;
}

.contact h2 {
    font-size: 2.5rem;
    margin-bottom: 3rem;
}

#contactForm {
    max-width: 600px;
    margin: 0 auto;
    display: grid;
    gap: 1rem;
}

#contactForm input,
#contactForm textarea {
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
}

#contactForm button {
    padding: 1rem 2rem;
    background: #667eea;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.3s;
}

#contactForm button:hover {
    background: #5a67d8;
}

/* Footer */
footer {
    padding: 2rem;
    background: #333;
    color: white;
    text-align: center;
}

/* Animations */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Responsive */
@media (max-width: 768px) {
    .nav-links {
        display: none;
    }
    
    .hero-content h1 {
        font-size: 2.5rem;
    }
    
    .feature-grid {
        grid-template-columns: 1fr;
    }
}`;

    case '2':
      return `/* Task Manager Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
    min-height: 100vh;
    padding: 20px;
}

.app {
    max-width: 800px;
    margin: 0 auto;
    background: white;
    border-radius: 20px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.1);
    overflow: hidden;
}

.app-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 2rem;
    text-align: center;
}

.app-header h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
}

.stats {
    opacity: 0.9;
    font-size: 1.1rem;
}

.app-main {
    padding: 2rem;
}

.add-task {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
}

#taskInput {
    flex: 1;
    padding: 1rem;
    border: 2px solid #e0e0e0;
    border-radius: 10px;
    font-size: 1rem;
    transition: border-color 0.3s;
}

#taskInput:focus {
    outline: none;
    border-color: #667eea;
}

#addButton {
    padding: 1rem 2rem;
    background: #00b894;
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.3s;
}

#addButton:hover {
    background: #00a085;
    transform: translateY(-2px);
}

.task-filters {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    justify-content: center;
}

.filter-btn {
    padding: 0.5rem 1.5rem;
    border: 2px solid #e0e0e0;
    background: white;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s;
    font-weight: 500;
}

.filter-btn.active,
.filter-btn:hover {
    background: #667eea;
    color: white;
    border-color: #667eea;
}

.task-list {
    min-height: 300px;
}

.task-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    margin-bottom: 1rem;
    background: #f8f9fa;
    border-radius: 10px;
    border-left: 4px solid #667eea;
    transition: all 0.3s;
    animation: slideIn 0.3s ease-out;
}

.task-item:hover {
    transform: translateX(5px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.task-item.completed {
    opacity: 0.7;
    border-left-color: #00b894;
}

.task-item.completed .task-text {
    text-decoration: line-through;
}

.task-content {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex: 1;
}

.task-checkbox {
    width: 20px;
    height: 20px;
    accent-color: #00b894;
}

.task-text {
    font-size: 1rem;
    color: #333;
}

.task-actions {
    display: flex;
    gap: 0.5rem;
}

.delete-btn {
    padding: 0.5rem;
    background: #ff6b6b;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s;
}

.delete-btn:hover {
    background: #ff5252;
}

.empty-state {
    text-align: center;
    padding: 3rem;
    color: #666;
}

.empty-state h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateX(-20px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

/* Responsive */
@media (max-width: 768px) {
    .add-task {
        flex-direction: column;
    }
    
    .task-filters {
        flex-wrap: wrap;
    }
    
    .task-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
    }
    
    .task-actions {
        align-self: flex-end;
    }
}`;

    default:
      return `/* Default Project Styles */
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 0;
    padding: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    color: white;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
    padding: 40px;
}

h1 {
    font-size: 2.5rem;
    margin-bottom: 20px;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

p {
    font-size: 1.2rem;
    margin-bottom: 30px;
    opacity: 0.9;
}

button {
    background: #ff6b6b;
    color: white;
    border: none;
    padding: 15px 30px;
    font-size: 1.1rem;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.3);
    background: #ff5252;
}

#output {
    margin-top: 20px;
    padding: 20px;
    background: rgba(255,255,255,0.1);
    border-radius: 10px;
    min-height: 50px;
    backdrop-filter: blur(10px);
}`;
  }
}

function getProjectJS(projectId: string | undefined): string {
  switch (projectId) {
    case '1':
      return `// Landing Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // CTA Button interaction
    const ctaButton = document.getElementById('ctaButton');
    ctaButton.addEventListener('click', function() {
        // Add sparkle effect
        this.style.transform = 'scale(1.1)';
        this.textContent = '🚀 Let\\'s Go!';
        
        setTimeout(() => {
            this.style.transform = 'scale(1)';
            this.textContent = 'Get Started';
        }, 300);
        
        // Scroll to features
        document.getElementById('features').scrollIntoView({
            behavior: 'smooth'
        });
    });
    
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulate form submission
        const button = this.querySelector('button');
        const originalText = button.textContent;
        
        button.textContent = 'Sending...';
        button.disabled = true;
        
        setTimeout(() => {
            button.textContent = '✅ Message Sent!';
            button.style.background = '#00b894';
            
            // Reset form
            this.reset();
            
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
                button.style.background = '#667eea';
            }, 2000);
        }, 1500);
    });
    
    // Feature cards hover effect
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
});

// Add some interactive animations
function addParticleEffect(element) {
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = '#ff6b6b';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = \`float \${Math.random() * 3 + 2}s ease-in-out infinite\`;
        
        element.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 5000);
    }
}

// Welcome message
console.log('🎉 Welcome to your Interactive Landing Page project!');
console.log('💡 Try interacting with the CTA button and contact form!');`;

    case '2':
      return `// Task Manager JavaScript
class TaskManager {
    constructor() {
        this.tasks = [];
        this.filter = 'all';
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.render();
        this.updateStats();
    }
    
    bindEvents() {
        const addButton = document.getElementById('addButton');
        const taskInput = document.getElementById('taskInput');
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        addButton.addEventListener('click', () => this.addTask());
        taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTask();
        });
        
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                filterButtons.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.filter = e.target.dataset.filter;
                this.render();
            });
        });
    }
    
    addTask() {
        const input = document.getElementById('taskInput');
        const text = input.value.trim();
        
        if (text === '') {
            this.showNotification('Please enter a task!', 'error');
            return;
        }
        
        const task = {
            id: Date.now(),
            text: text,
            completed: false,
            createdAt: new Date()
        };
        
        this.tasks.unshift(task);
        input.value = '';
        this.render();
        this.updateStats();
        this.showNotification('Task added successfully!', 'success');
    }
    
    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.render();
            this.updateStats();
            
            const message = task.completed ? 'Task completed! 🎉' : 'Task marked as pending';
            this.showNotification(message, 'info');
        }
    }
    
    deleteTask(id) {
        const taskIndex = this.tasks.findIndex(t => t.id === id);
        if (taskIndex > -1) {
            this.tasks.splice(taskIndex, 1);
            this.render();
            this.updateStats();
            this.showNotification('Task deleted!', 'warning');
        }
    }
    
    getFilteredTasks() {
        switch (this.filter) {
            case 'completed':
                return this.tasks.filter(task => task.completed);
            case 'pending':
                return this.tasks.filter(task => !task.completed);
            default:
                return this.tasks;
        }
    }
    
    render() {
        const taskList = document.getElementById('taskList');
        const filteredTasks = this.getFilteredTasks();
        
        if (filteredTasks.length === 0) {
            taskList.innerHTML = \`
                <div class="empty-state">
                    <h3>No tasks found</h3>
                    <p>Add a task to get started!</p>
                </div>
            \`;
            return;
        }
        
        taskList.innerHTML = filteredTasks.map(task => \`
            <div class="task-item \${task.completed ? 'completed' : ''}" data-id="\${task.id}">
                <div class="task-content">
                    <input 
                        type="checkbox" 
                        class="task-checkbox" 
                        \${task.completed ? 'checked' : ''}
                        onchange="taskManager.toggleTask(\${task.id})"
                    >
                    <span class="task-text">\${task.text}</span>
                </div>
                <div class="task-actions">
                    <button class="delete-btn" onclick="taskManager.deleteTask(\${task.id})">
                        🗑️
                    </button>
                </div>
            </div>
        \`).join('');
    }
    
    updateStats() {
        const totalTasks = document.getElementById('totalTasks');
        totalTasks.textContent = this.tasks.length;
    }
    
    showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.style.cssText = \`
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 2rem;
            border-radius: 8px;
            color: white;
            font-weight: bold;
            z-index: 1000;
            animation: slideInRight 0.3s ease-out;
        \`;
        
        // Set color based on type
        const colors = {
            success: '#00b894',
            error: '#ff6b6b',
            warning: '#fdcb6e',
            info: '#74b9ff'
        };
        
        notification.style.background = colors[type] || colors.info;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Initialize the task manager
const taskManager = new TaskManager();

// Add some sample tasks for demo
setTimeout(() => {
    taskManager.tasks = [
        {
            id: 1,
            text: "Learn HTML, CSS, and JavaScript",
            completed: true,
            createdAt: new Date()
        },
        {
            id: 2,
            text: "Build an awesome task manager",
            completed: false,
            createdAt: new Date()
        },
        {
            id: 3,
            text: "Deploy my first web application",
            completed: false,
            createdAt: new Date()
        }
    ];
    taskManager.render();
    taskManager.updateStats();
}, 1000);

// Add CSS for animations
const style = document.createElement('style');
style.textContent = \`
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
\`;
document.head.appendChild(style);

console.log('📋 Task Manager loaded successfully!');
console.log('✨ Try adding, completing, and filtering tasks!');`;

    default:
      return `// Default Project JavaScript
let clickCount = 0;

document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('actionButton');
    const output = document.getElementById('output');
    
    button.addEventListener('click', function() {
        clickCount++;
        
        const messages = [
            '🎉 Great job!',
            '🚀 You\\'re coding!',
            '⭐ Keep going!',
            '🔥 On fire!',
            '💻 Code master!',
            '🌟 Amazing work!',
            '🎯 Perfect!',
            '⚡ Lightning fast!'
        ];
        
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        
        output.innerHTML = \`
            <h3>\${randomMessage}</h3>
            <p>Button clicked \${clickCount} time\${clickCount !== 1 ? 's' : ''}!</p>
            <p>Current time: \${new Date().toLocaleTimeString()}</p>
            <div style="margin-top: 15px;">
                <div style="background: rgba(255,255,255,0.2); border-radius: 10px; padding: 10px;">
                    <strong>💡 Try this:</strong> Add more interactive elements!
                </div>
            </div>
        \`;
        
        // Add some fun animation
        output.style.transform = 'scale(1.05)';
        output.style.transition = 'transform 0.2s ease';
        
        setTimeout(() => {
            output.style.transform = 'scale(1)';
        }, 200);
        
        // Change button color randomly
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd'];
        button.style.background = colors[Math.floor(Math.random() * colors.length)];
    });
    
    // Initial message
    output.innerHTML = \`
        <p>Welcome to your coding environment! ✨</p>
        <p>Click the button above to see some magic!</p>
        <p><small>💡 Tip: Edit the HTML, CSS, and JavaScript to customize this project!</small></p>
    \`;
});

// Add keyboard interaction
document.addEventListener('keydown', function(e) {
    if (e.key === ' ') { // Spacebar
        e.preventDefault();
        document.getElementById('actionButton').click();
    }
});

console.log('🎯 Welcome to your coding environment!');
console.log('💫 Press spacebar or click the button to interact!');`;
  }
}