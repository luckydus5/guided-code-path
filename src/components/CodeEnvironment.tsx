import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  RefreshCw, 
  Download, 
  Upload, 
  Save,
  FolderOpen,
  Settings,
  Eye,
  Code,
  Monitor,
  Smartphone,
  Tablet,
  FileText,
  Palette,
  Zap,
  RotateCcw
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FileTab {
  id: string;
  name: string;
  language: 'html' | 'css' | 'javascript' | 'typescript' | 'python';
  content: string;
  isActive: boolean;
}

interface CodeEnvironmentProps {
  projectId?: string;
  projectTitle?: string;
  projectDescription?: string;
  initialFiles?: FileTab[];
  onSave?: (files: FileTab[]) => void;
}

const CodeEnvironment: React.FC<CodeEnvironmentProps> = ({ 
  projectId, 
  projectTitle,
  projectDescription,
  initialFiles = [], 
  onSave 
}) => {
  const { toast } = useToast();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [files, setFiles] = useState<FileTab[]>(initialFiles.length > 0 ? initialFiles : [
    { id: '1', name: 'index.html', language: 'html', content: getProjectHTML(projectId, projectTitle, projectDescription), isActive: true },
    { id: '2', name: 'style.css', language: 'css', content: getProjectCSS(projectId, projectTitle), isActive: false },
    { id: '3', name: 'script.js', language: 'javascript', content: getProjectJS(projectId, projectTitle), isActive: false }
  ]);
  const [activeFileId, setActiveFileId] = useState('1');
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isRunning, setIsRunning] = useState(false);
  const [autoRun, setAutoRun] = useState(true);
  const [showPreview, setShowPreview] = useState(true);
  const [showCodeEditor, setShowCodeEditor] = useState(true);

  const activeFile = files.find(f => f.id === activeFileId);

  useEffect(() => {
    if (autoRun) {
      const debounceTimer = setTimeout(() => {
        runCode();
      }, 1000);
      return () => clearTimeout(debounceTimer);
    }
  }, [files, autoRun]);

  const updateFileContent = (fileId: string, content: string) => {
    setFiles(prev => prev.map(file => 
      file.id === fileId ? { ...file, content } : file
    ));
  };

  const runCode = () => {
    setIsRunning(true);
    
    const htmlFile = files.find(f => f.language === 'html');
    const cssFile = files.find(f => f.language === 'css');
    const jsFile = files.find(f => f.language === 'javascript');

    if (!htmlFile) {
      toast({
        title: "Error",
        description: "No HTML file found",
        variant: "destructive"
      });
      setIsRunning(false);
      return;
    }

    // Combine HTML, CSS, and JavaScript
    const combinedHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Preview</title>
        <style>
          ${cssFile?.content || ''}
        </style>
      </head>
      <body>
        ${htmlFile.content}
        <script>
          // Error handling for preview
          window.onerror = function(msg, url, line, col, error) {
            console.error('Error:', msg, 'at line', line);
            return false;
          };
          
          ${jsFile?.content || ''}
        </script>
      </body>
      </html>
    `;

    // Update iframe
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      iframe.srcdoc = combinedHTML;
    }

    setTimeout(() => setIsRunning(false), 500);
  };

  const addNewFile = () => {
    const newId = (files.length + 1).toString();
    const newFile: FileTab = {
      id: newId,
      name: `file${newId}.js`,
      language: 'javascript',
      content: '',
      isActive: false
    };
    setFiles(prev => [...prev, newFile]);
  };

  const deleteFile = (fileId: string) => {
    if (files.length <= 1) {
      toast({
        title: "Cannot delete",
        description: "At least one file is required",
        variant: "destructive"
      });
      return;
    }
    
    setFiles(prev => prev.filter(f => f.id !== fileId));
    if (activeFileId === fileId) {
      setActiveFileId(files[0].id);
    }
  };

  const downloadProject = () => {
    files.forEach(file => {
      const blob = new Blob([file.content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      a.click();
      URL.revokeObjectURL(url);
    });
    
    toast({
      title: "Download Complete",
      description: "All files have been downloaded"
    });
  };

  const saveProject = () => {
    if (onSave) {
      onSave(files);
    }
    
    toast({
      title: "Project Saved",
      description: "Your code has been saved successfully"
    });
  };

  const getPreviewWidth = () => {
    switch (previewMode) {
      case 'mobile': return '375px';
      case 'tablet': return '768px';
      default: return '100%';
    }
  };

  const getLanguageIcon = (language: string) => {
    switch (language) {
      case 'html': return <FileText className="h-4 w-4 text-orange-500" />;
      case 'css': return <Palette className="h-4 w-4 text-blue-500" />;
      case 'javascript': return <Zap className="h-4 w-4 text-yellow-500" />;
      default: return <Code className="h-4 w-4" />;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-card">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold">Code Environment</h1>
          {projectId && (
            <Badge variant="outline">Project: {projectId}</Badge>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowPreview(!showPreview)}
            className={showPreview ? 'bg-blue-500/10 text-blue-700' : 'bg-gray-500/10 text-gray-700'}
          >
            <Eye className="h-4 w-4 mr-2" />
            {showPreview ? 'Hide Preview' : 'Show Preview'}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowCodeEditor(!showCodeEditor)}
            className={showCodeEditor ? 'bg-green-500/10 text-green-700' : 'bg-gray-500/10 text-gray-700'}
          >
            <Code className="h-4 w-4 mr-2" />
            {showCodeEditor ? 'Hide Code' : 'Show Code'}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setAutoRun(!autoRun)}
            className={autoRun ? 'bg-green-500/10 text-green-700' : ''}
          >
            <Settings className="h-4 w-4 mr-2" />
            Auto-run: {autoRun ? 'ON' : 'OFF'}
          </Button>
          
          <Button variant="outline" size="sm" onClick={runCode} disabled={isRunning}>
            {isRunning ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Play className="h-4 w-4 mr-2" />
            )}
            Run
          </Button>
          
          <Button variant="outline" size="sm" onClick={saveProject}>
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
          
          <Button variant="outline" size="sm" onClick={downloadProject}>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Editor Panel */}
        {showCodeEditor && (
          <div className={`${
            showPreview ? 'w-1/2' : 'w-full'
          } h-full border-r bg-card transition-all duration-300`}>
          {/* File Tabs */}
          <div className="flex items-center justify-between border-b p-2">
            <div className="flex items-center space-x-1 overflow-x-auto">
              {files.map(file => (
                <Button
                  key={file.id}
                  variant={activeFileId === file.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveFileId(file.id)}
                  className="flex items-center space-x-2 whitespace-nowrap"
                >
                  {getLanguageIcon(file.language)}
                  <span>{file.name}</span>
                  {files.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteFile(file.id);
                      }}
                      className="ml-2 text-muted-foreground hover:text-destructive"
                    >
                      ×
                    </button>
                  )}
                </Button>
              ))}
            </div>
            
            <Button variant="ghost" size="sm" onClick={addNewFile}>
              +
            </Button>
          </div>

          {/* Code Editor */}
          <div className="h-full p-4">
            {activeFile && (
              <div className="h-full">
                <div className="mb-2 flex items-center justify-between">
                  <Badge variant="secondary">
                    {activeFile.language.toUpperCase()}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {activeFile.name}
                  </span>
                </div>
                
                <textarea
                  value={activeFile.content}
                  onChange={(e) => updateFileContent(activeFile.id, e.target.value)}
                  className="w-full h-5/6 p-4 font-mono text-sm bg-muted border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder={`Enter your ${activeFile.language} code here...`}
                  spellCheck={false}
                />
              </div>
            )}
          </div>
        </div>
        )}

        {/* Preview Panel */}
        {showPreview && (
          <div className={`${
            showCodeEditor ? 'w-1/2' : 'w-full'
          } flex flex-col bg-background transition-all duration-300`}>
          {/* Preview Controls */}
          <div className="flex items-center justify-between p-4 border-b bg-card">
            <div className="flex items-center space-x-2">
              <Eye className="h-4 w-4" />
              <span className="font-medium">Preview</span>
              <Badge variant="outline">{previewMode}</Badge>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant={previewMode === 'desktop' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPreviewMode('desktop')}
              >
                <Monitor className="h-4 w-4" />
              </Button>
              <Button
                variant={previewMode === 'tablet' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPreviewMode('tablet')}
              >
                <Tablet className="h-4 w-4" />
              </Button>
              <Button
                variant={previewMode === 'mobile' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPreviewMode('mobile')}
              >
                <Smartphone className="h-4 w-4" />
              </Button>
              
              <Button variant="outline" size="sm" onClick={runCode}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Preview Content */}
          <div className="flex-1 p-4 bg-muted/30">
            <div className="h-full flex justify-center">
              <div 
                style={{ width: getPreviewWidth() }}
                className="h-full border bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <iframe
                  ref={iframeRef}
                  className="w-full h-full border-0"
                  title="Preview"
                  sandbox="allow-scripts allow-same-origin"
                />
              </div>
            </div>
          </div>
        </div>
        )}

        {/* Empty state when both panels are hidden */}
        {!showPreview && !showCodeEditor && (
          <div className="w-full flex items-center justify-center bg-muted/10">
            <div className="text-center p-8">
              <Code className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">Both panels are hidden</h3>
              <p className="text-muted-foreground mb-4">
                Show the code editor or preview to start working on your project.
              </p>
              <div className="flex items-center justify-center space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setShowCodeEditor(true)}
                >
                  <Code className="h-4 w-4 mr-2" />
                  Show Code Editor
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowPreview(true)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Show Preview
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Project-specific content generators
const getProjectHTML = (projectId?: string, projectTitle?: string, projectDescription?: string): string => {
  const title = projectTitle || 'My Project';
  const description = projectDescription || 'Build something amazing!';
  
  // Check if this is a capstone project (ID >= 101)
  if (projectId && parseInt(projectId) >= 101) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - Coming Soon</title>
</head>
<body>
    <div class="coming-soon-container">
        <div class="coming-soon-card">
            <div class="coming-soon-header">
                <div class="icon-container">
                    <div class="rocket-icon">🚀</div>
                </div>
                <h1 class="coming-soon-title">${title}</h1>
                <p class="coming-soon-subtitle">Capstone Project</p>
            </div>
            
            <div class="coming-soon-content">
                <div class="status-badge">Coming Soon</div>
                
                <p class="project-description">
                    ${description}
                </p>
                
                <div class="features-preview">
                    <h3>What You'll Build:</h3>
                    <div class="feature-grid">
                        <div class="feature-item">
                            <span class="feature-icon">💻</span>
                            <span>Full-Stack Application</span>
                        </div>
                        <div class="feature-item">
                            <span class="feature-icon">🔧</span>
                            <span>Production-Ready Code</span>
                        </div>
                        <div class="feature-item">
                            <span class="feature-icon">📱</span>
                            <span>Responsive Design</span>
                        </div>
                        <div class="feature-item">
                            <span class="feature-icon">🎯</span>
                            <span>Industry Best Practices</span>
                        </div>
                    </div>
                </div>
                
                <div class="timeline-section">
                    <h3>Development Timeline:</h3>
                    <div class="timeline">
                        <div class="timeline-item">
                            <div class="timeline-dot"></div>
                            <div class="timeline-content">
                                <h4>Phase 1: Planning & Design</h4>
                                <p>Project architecture and UI/UX design</p>
                            </div>
                        </div>
                        <div class="timeline-item">
                            <div class="timeline-dot"></div>
                            <div class="timeline-content">
                                <h4>Phase 2: Backend Development</h4>
                                <p>API development and database design</p>
                            </div>
                        </div>
                        <div class="timeline-item">
                            <div class="timeline-dot"></div>
                            <div class="timeline-content">
                                <h4>Phase 3: Frontend Implementation</h4>
                                <p>User interface and user experience</p>
                            </div>
                        </div>
                        <div class="timeline-item">
                            <div class="timeline-dot"></div>
                            <div class="timeline-content">
                                <h4>Phase 4: Testing & Deployment</h4>
                                <p>Quality assurance and production deployment</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="notify-section">
                    <h3>Get Notified When Available</h3>
                    <form class="notify-form" id="notifyForm">
                        <input type="email" placeholder="Enter your email address" required>
                        <button type="submit">Notify Me</button>
                    </form>
                </div>
                
                <div class="alternative-projects">
                    <h3>Meanwhile, Try These Projects:</h3>
                    <div class="project-suggestions">
                        <a href="#" class="suggestion-card">
                            <span class="suggestion-icon">🎨</span>
                            <div>
                                <h4>Personal Profile Card</h4>
                                <p>Build your first web project</p>
                            </div>
                        </a>
                        <a href="#" class="suggestion-card">
                            <span class="suggestion-icon">📱</span>
                            <div>
                                <h4>To-Do List App</h4>
                                <p>Master JavaScript fundamentals</p>
                            </div>
                        </a>
                        <a href="#" class="suggestion-card">
                            <span class="suggestion-icon">🌤️</span>
                            <div>
                                <h4>Weather Dashboard</h4>
                                <p>Learn API integration</p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>`;
  }
  
  switch (projectId) {
    case '1':
      return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Personal Profile Card</title>
</head>
<body>
    <div class="profile-container">
        <div class="profile-card">
            <div class="profile-header">
                <img src="https://via.placeholder.com/120/667eea/ffffff?text=You" alt="Profile Picture" class="profile-image">
                <h1 class="profile-name">Your Name</h1>
                <p class="profile-title">Web Developer</p>
            </div>
            
            <div class="profile-info">
                <p class="profile-bio">
                    Passionate web developer creating amazing digital experiences.
                    Love to code, design, and bring ideas to life.
                </p>
                
                <div class="contact-info">
                    <div class="contact-item">
                        <span class="icon">📧</span>
                        <span>your.email@example.com</span>
                    </div>
                    <div class="contact-item">
                        <span class="icon">📱</span>
                        <span>+1 (555) 123-4567</span>
                    </div>
                    <div class="contact-item">
                        <span class="icon">📍</span>
                        <span>Your City, Country</span>
                    </div>
                </div>
                
                <div class="skills">
                    <h3>Skills</h3>
                    <div class="skill-tags">
                        <span class="skill-tag">HTML</span>
                        <span class="skill-tag">CSS</span>
                        <span class="skill-tag">JavaScript</span>
                        <span class="skill-tag">React</span>
                    </div>
                </div>
                
                <div class="social-links">
                    <button class="social-btn github">GitHub</button>
                    <button class="social-btn linkedin">LinkedIn</button>
                    <button class="social-btn portfolio">Portfolio</button>
                </div>
            </div>
        </div>
    </div>
</body>
</html>`;

    case '2':
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
            <div class="hamburger" id="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </nav>
        
        <div class="hero-content">
            <h1 class="hero-title">Welcome to the Future</h1>
            <p class="hero-subtitle">Build amazing things with code</p>
            <button class="cta-button" id="ctaButton">Get Started</button>
        </div>
    </header>
    
    <main>
        <section id="about" class="about">
            <div class="container">
                <h2>About Us</h2>
                <p>We are passionate about creating amazing web experiences that inspire and engage users.</p>
                <div class="stats">
                    <div class="stat">
                        <h3>100+</h3>
                        <p>Projects Completed</p>
                    </div>
                    <div class="stat">
                        <h3>50+</h3>
                        <p>Happy Clients</p>
                    </div>
                    <div class="stat">
                        <h3>5+</h3>
                        <p>Years Experience</p>
                    </div>
                </div>
            </div>
        </section>
        
        <section id="services" class="services">
            <div class="container">
                <h2>Our Services</h2>
                <div class="service-grid">
                    <div class="service-card">
                        <div class="service-icon">🎨</div>
                        <h3>Web Design</h3>
                        <p>Beautiful, responsive designs that work on all devices.</p>
                    </div>
                    <div class="service-card">
                        <div class="service-icon">💻</div>
                        <h3>Development</h3>
                        <p>Clean, efficient code that brings your ideas to life.</p>
                    </div>
                    <div class="service-card">
                        <div class="service-icon">🚀</div>
                        <h3>Optimization</h3>
                        <p>Fast, SEO-friendly websites that rank well.</p>
                    </div>
                </div>
            </div>
        </section>
        
        <section id="contact" class="contact">
            <div class="container">
                <h2>Get In Touch</h2>
                <form class="contact-form" id="contactForm">
                    <input type="text" placeholder="Your Name" required>
                    <input type="email" placeholder="Your Email" required>
                    <textarea placeholder="Your Message" required></textarea>
                    <button type="submit">Send Message</button>
                </form>
            </div>
        </section>
    </main>
</body>
</html>`;

    case '3':
      return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calculator with Theme Switcher</title>
</head>
<body>
    <div class="calculator-container">
        <div class="calculator">
            <div class="calculator-header">
                <h1>Calculator</h1>
                <div class="theme-switcher">
                    <button class="theme-btn" data-theme="light">Light</button>
                    <button class="theme-btn" data-theme="dark">Dark</button>
                    <button class="theme-btn" data-theme="colorful">Colorful</button>
                </div>
            </div>
            
            <div class="display">
                <div class="display-previous" id="previousDisplay"></div>
                <div class="display-current" id="currentDisplay">0</div>
            </div>
            
            <div class="buttons">
                <button class="btn btn-clear" id="clearAll">AC</button>
                <button class="btn btn-clear" id="clear">C</button>
                <button class="btn btn-operator" data-operation="÷">÷</button>
                <button class="btn btn-operator" data-operation="×">×</button>
                
                <button class="btn btn-number" data-number="7">7</button>
                <button class="btn btn-number" data-number="8">8</button>
                <button class="btn btn-number" data-number="9">9</button>
                <button class="btn btn-operator" data-operation="-">-</button>
                
                <button class="btn btn-number" data-number="4">4</button>
                <button class="btn btn-number" data-number="5">5</button>
                <button class="btn btn-number" data-number="6">6</button>
                <button class="btn btn-operator" data-operation="+">+</button>
                
                <button class="btn btn-number" data-number="1">1</button>
                <button class="btn btn-number" data-number="2">2</button>
                <button class="btn btn-number" data-number="3">3</button>
                <button class="btn btn-equals" id="equals" rowspan="2">=</button>
                
                <button class="btn btn-number btn-zero" data-number="0">0</button>
                <button class="btn btn-number" data-number=".">.</button>
            </div>
            
            <div class="history">
                <h3>History</h3>
                <div class="history-list" id="historyList">
                    <p class="no-history">No calculations yet</p>
                </div>
                <button class="btn btn-clear-history" id="clearHistory">Clear History</button>
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
    <title>To-Do List with Categories</title>
</head>
<body>
    <div class="todo-container">
        <header class="todo-header">
            <h1>📝 My Tasks</h1>
            <div class="stats">
                <span class="stat">Total: <span id="totalTasks">0</span></span>
                <span class="stat">Completed: <span id="completedTasks">0</span></span>
                <span class="stat">Pending: <span id="pendingTasks">0</span></span>
            </div>
        </header>
        
        <div class="todo-main">
            <div class="add-task-section">
                <form class="add-task-form" id="addTaskForm">
                    <input type="text" id="taskInput" placeholder="Add a new task..." required>
                    <select id="categorySelect">
                        <option value="work">Work</option>
                        <option value="personal">Personal</option>
                        <option value="shopping">Shopping</option>
                        <option value="health">Health</option>
                        <option value="learning">Learning</option>
                    </select>
                    <select id="prioritySelect">
                        <option value="low">Low Priority</option>
                        <option value="medium">Medium Priority</option>
                        <option value="high">High Priority</option>
                    </select>
                    <input type="date" id="dueDateInput">
                    <button type="submit">Add Task</button>
                </form>
            </div>
            
            <div class="filters">
                <div class="filter-group">
                    <label>Filter by Category:</label>
                    <select id="filterCategory">
                        <option value="all">All Categories</option>
                        <option value="work">Work</option>
                        <option value="personal">Personal</option>
                        <option value="shopping">Shopping</option>
                        <option value="health">Health</option>
                        <option value="learning">Learning</option>
                    </select>
                </div>
                
                <div class="filter-group">
                    <label>Filter by Status:</label>
                    <select id="filterStatus">
                        <option value="all">All Tasks</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                
                <div class="filter-group">
                    <label>Sort by:</label>
                    <select id="sortBy">
                        <option value="dateAdded">Date Added</option>
                        <option value="dueDate">Due Date</option>
                        <option value="priority">Priority</option>
                        <option value="category">Category</option>
                    </select>
                </div>
            </div>
            
            <div class="tasks-container">
                <div class="task-categories">
                    <div class="category-section" data-category="work">
                        <h3>💼 Work</h3>
                        <div class="tasks-list" id="workTasks"></div>
                    </div>
                    <div class="category-section" data-category="personal">
                        <h3>👤 Personal</h3>
                        <div class="tasks-list" id="personalTasks"></div>
                    </div>
                    <div class="category-section" data-category="shopping">
                        <h3>🛒 Shopping</h3>
                        <div class="tasks-list" id="shoppingTasks"></div>
                    </div>
                    <div class="category-section" data-category="health">
                        <h3>🏥 Health</h3>
                        <div class="tasks-list" id="healthTasks"></div>
                    </div>
                    <div class="category-section" data-category="learning">
                        <h3>📚 Learning</h3>
                        <div class="tasks-list" id="learningTasks"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>`;

    case '5':
      return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Weather Dashboard</title>
</head>
<body>
    <div class="weather-app">
        <header class="weather-header">
            <h1>🌤️ Weather Dashboard</h1>
            <div class="search-container">
                <input type="text" id="cityInput" placeholder="Enter city name...">
                <button id="searchBtn">Search</button>
                <button id="locationBtn">📍 Use My Location</button>
            </div>
        </header>
        
        <main class="weather-main">
            <div class="current-weather">
                <div class="weather-card main-card">
                    <div class="weather-info">
                        <div class="location">
                            <h2 id="currentLocation">New York, NY</h2>
                            <p id="currentDate">${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        </div>
                        <div class="temperature">
                            <span id="currentTemp">22°C</span>
                            <div class="weather-icon">☀️</div>
                        </div>
                    </div>
                    <div class="weather-details">
                        <div class="detail">
                            <span class="label">Feels like</span>
                            <span id="feelsLike">25°C</span>
                        </div>
                        <div class="detail">
                            <span class="label">Humidity</span>
                            <span id="humidity">65%</span>
                        </div>
                        <div class="detail">
                            <span class="label">Wind Speed</span>
                            <span id="windSpeed">15 km/h</span>
                        </div>
                        <div class="detail">
                            <span class="label">Pressure</span>
                            <span id="pressure">1013 hPa</span>
                        </div>
                        <div class="detail">
                            <span class="label">Visibility</span>
                            <span id="visibility">10 km</span>
                        </div>
                        <div class="detail">
                            <span class="label">UV Index</span>
                            <span id="uvIndex">5</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="forecast-section">
                <h3>5-Day Forecast</h3>
                <div class="forecast-container" id="forecastContainer">
                    <!-- Forecast cards will be generated by JavaScript -->
                </div>
            </div>
            
            <div class="hourly-forecast">
                <h3>Hourly Forecast</h3>
                <div class="hourly-container" id="hourlyContainer">
                    <!-- Hourly forecast will be generated by JavaScript -->
                </div>
            </div>
        </main>
    </div>
</body>
</html>`;

    default:
      return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
</head>
<body>
    <div class="container">
        <header>
            <h1>${title}</h1>
            <p>${description}</p>
        </header>
        
        <main>
            <section class="project-section">
                <h2>Welcome to Your Project!</h2>
                <p>Start building something amazing. This is your starting template.</p>
                
                <div class="features">
                    <div class="feature">
                        <h3>🎨 Modern Design</h3>
                        <p>Beautiful, responsive design that works on all devices.</p>
                    </div>
                    <div class="feature">
                        <h3>⚡ Fast Performance</h3>
                        <p>Optimized code for lightning-fast loading times.</p>
                    </div>
                    <div class="feature">
                        <h3>🔧 Easy to Customize</h3>
                        <p>Well-structured code that's easy to modify and extend.</p>
                    </div>
                </div>
                
                <button id="actionButton" class="primary-button">Get Started</button>
                <div id="output" class="output-area">
                    <p>Click the button above to see some magic! ✨</p>
                </div>
            </section>
        </main>
        
        <footer>
            <p>&copy; 2025 ${title}. Built with HTML, CSS, and JavaScript.</p>
        </footer>
    </div>
</body>
</html>`;
  }
};

const getProjectCSS = (projectId?: string, projectTitle?: string): string => {
  // Check if this is a capstone project (ID >= 101)
  if (projectId && parseInt(projectId) >= 101) {
    return `/* Coming Soon Capstone Project Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
}

.coming-soon-container {
    max-width: 900px;
    width: 100%;
}

.coming-soon-card {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 40px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    animation: fadeInUp 1s ease;
}

.coming-soon-header {
    text-align: center;
    margin-bottom: 40px;
}

.icon-container {
    margin-bottom: 20px;
}

.rocket-icon {
    font-size: 4rem;
    animation: bounce 2s infinite;
}

.coming-soon-title {
    font-size: 2.5rem;
    font-weight: 700;
    color: #333;
    margin-bottom: 10px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.coming-soon-subtitle {
    font-size: 1.2rem;
    color: #666;
    font-weight: 500;
}

.status-badge {
    display: inline-block;
    background: linear-gradient(135deg, #ff6b6b, #ee5a52);
    color: white;
    padding: 8px 20px;
    border-radius: 25px;
    font-weight: 600;
    font-size: 0.9rem;
    margin-bottom: 20px;
    animation: pulse 2s infinite;
}

.project-description {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #555;
    margin-bottom: 30px;
    text-align: center;
}

.features-preview h3,
.timeline-section h3,
.notify-section h3,
.alternative-projects h3 {
    font-size: 1.5rem;
    color: #333;
    margin-bottom: 20px;
    text-align: center;
}

.feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
    margin-bottom: 40px;
}

.feature-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 15px;
    background: #f8f9ff;
    border-radius: 10px;
    border-left: 4px solid #667eea;
    transition: transform 0.3s ease;
}

.feature-item:hover {
    transform: translateY(-2px);
}

.feature-icon {
    font-size: 1.5rem;
}

.timeline {
    position: relative;
    max-width: 600px;
    margin: 0 auto 40px;
}

.timeline::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    height: 100%;
    width: 2px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    transform: translateX(-50%);
}

.timeline-item {
    position: relative;
    margin-bottom: 30px;
    display: flex;
    align-items: center;
}

.timeline-item:nth-child(odd) {
    justify-content: flex-end;
    text-align: right;
}

.timeline-item:nth-child(even) {
    justify-content: flex-start;
    text-align: left;
}

.timeline-dot {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea, #764ba2);
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    box-shadow: 0 0 0 4px rgba(255, 255, 255, 1);
}

.timeline-content {
    width: 45%;
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.timeline-content h4 {
    color: #333;
    margin-bottom: 5px;
    font-size: 1.1rem;
}

.timeline-content p {
    color: #666;
    font-size: 0.9rem;
}

.notify-form {
    display: flex;
    gap: 10px;
    max-width: 400px;
    margin: 0 auto 40px;
}

.notify-form input {
    flex: 1;
    padding: 12px 16px;
    border: 2px solid #e1e5e9;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.3s ease;
}

.notify-form input:focus {
    outline: none;
    border-color: #667eea;
}

.notify-form button {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.3s ease;
}

.notify-form button:hover {
    transform: translateY(-2px);
}

.project-suggestions {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 15px;
}

.suggestion-card {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 20px;
    background: white;
    border-radius: 10px;
    text-decoration: none;
    color: inherit;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
}

.suggestion-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.suggestion-icon {
    font-size: 2rem;
    flex-shrink: 0;
}

.suggestion-card h4 {
    color: #333;
    margin-bottom: 5px;
    font-size: 1.1rem;
}

.suggestion-card p {
    color: #666;
    font-size: 0.9rem;
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

@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-10px);
    }
    60% {
        transform: translateY(-5px);
    }
}

@keyframes pulse {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.05);
    }
    100% {
        transform: scale(1);
    }
}

/* Responsive Design */
@media (max-width: 768px) {
    .coming-soon-card {
        padding: 20px;
    }
    
    .coming-soon-title {
        font-size: 2rem;
    }
    
    .feature-grid {
        grid-template-columns: 1fr;
    }
    
    .timeline::before {
        left: 20px;
    }
    
    .timeline-item {
        justify-content: flex-start !important;
        text-align: left !important;
        padding-left: 50px;
    }
    
    .timeline-dot {
        left: 20px;
    }
    
    .timeline-content {
        width: 100%;
    }
    
    .notify-form {
        flex-direction: column;
    }
    
    .project-suggestions {
        grid-template-columns: 1fr;
    }
}`;
  }
  
  switch (projectId) {
    case '1':
      return `/* Personal Profile Card Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
}

.profile-container {
    perspective: 1000px;
}

.profile-card {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 30px;
    max-width: 400px;
    width: 100%;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.profile-card:hover {
    transform: translateY(-10px) rotateX(5deg);
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.2);
}

.profile-header {
    text-align: center;
    margin-bottom: 25px;
}

.profile-image {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid #667eea;
    margin-bottom: 15px;
    transition: transform 0.3s ease;
}

.profile-image:hover {
    transform: scale(1.1);
}

.profile-name {
    font-size: 1.8rem;
    font-weight: 700;
    color: #333;
    margin-bottom: 5px;
}

.profile-title {
    color: #667eea;
    font-size: 1.1rem;
    font-weight: 500;
}

.profile-bio {
    color: #666;
    line-height: 1.6;
    margin-bottom: 20px;
    text-align: center;
}

.contact-info {
    margin-bottom: 25px;
}

.contact-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    padding: 8px;
    border-radius: 8px;
    transition: background-color 0.3s ease;
}

.contact-item:hover {
    background-color: #f8f9ff;
}

.contact-item .icon {
    margin-right: 12px;
    font-size: 1.2rem;
}

.skills h3 {
    color: #333;
    margin-bottom: 15px;
    font-size: 1.1rem;
}

.skill-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 25px;
}

.skill-tag {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 500;
    transition: transform 0.3s ease;
}

.skill-tag:hover {
    transform: translateY(-2px);
}

.social-links {
    display: flex;
    gap: 10px;
    justify-content: center;
}

.social-btn {
    flex: 1;
    padding: 10px;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
}

.social-btn.github {
    background: #333;
    color: white;
}

.social-btn.linkedin {
    background: #0077b5;
    color: white;
}

.social-btn.portfolio {
    background: #667eea;
    color: white;
}

.social-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

@media (max-width: 480px) {
    .profile-card {
        margin: 10px;
        padding: 20px;
    }
    
    .profile-name {
        font-size: 1.5rem;
    }
    
    .social-links {
        flex-direction: column;
    }
}`;

    case '2':
      return `/* Interactive Landing Page Styles */
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
    width: 100%;
    z-index: 1000;
    transition: all 0.3s ease;
}

.logo {
    font-size: 1.5rem;
    font-weight: bold;
    background: linear-gradient(135deg, #667eea, #764ba2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.nav-links {
    display: flex;
    list-style: none;
    gap: 2rem;
}

.nav-links a {
    text-decoration: none;
    color: #333;
    font-weight: 500;
    transition: color 0.3s ease;
    position: relative;
}

.nav-links a:hover {
    color: #667eea;
}

.nav-links a::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    transition: width 0.3s ease;
}

.nav-links a:hover::after {
    width: 100%;
}

.hamburger {
    display: none;
    flex-direction: column;
    cursor: pointer;
}

.hamburger span {
    width: 25px;
    height: 3px;
    background: #333;
    margin: 3px 0;
    transition: 0.3s;
}

/* Hero Section */
.hero {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

.hero-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 0 5%;
}

.hero-title {
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    opacity: 0;
    animation: fadeInUp 1s ease forwards 0.5s;
}

.hero-subtitle {
    font-size: 1.3rem;
    margin-bottom: 2rem;
    opacity: 0.9;
    opacity: 0;
    animation: fadeInUp 1s ease forwards 0.7s;
}

.cta-button {
    background: rgba(255, 255, 255, 0.2);
    border: 2px solid rgba(255, 255, 255, 0.3);
    color: white;
    padding: 15px 30px;
    font-size: 1.1rem;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
    opacity: 0;
    animation: fadeInUp 1s ease forwards 0.9s;
}

.cta-button:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

/* Sections */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 5%;
}

section {
    padding: 80px 0;
}

.about {
    background: #f8f9fa;
}

.about h2, .services h2, .contact h2 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 3rem;
    color: #333;
}

.stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
}

.stat {
    text-align: center;
    padding: 2rem;
    background: white;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.stat:hover {
    transform: translateY(-5px);
}

.stat h3 {
    font-size: 2.5rem;
    color: #667eea;
    margin-bottom: 0.5rem;
}

/* Services */
.service-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
}

.service-card {
    background: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    text-align: center;
    transition: all 0.3s ease;
}

.service-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
}

.service-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.service-card h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #333;
}

/* Contact */
.contact {
    background: #f8f9fa;
}

.contact-form {
    max-width: 600px;
    margin: 0 auto;
    display: grid;
    gap: 1rem;
}

.contact-form input,
.contact-form textarea {
    padding: 1rem;
    border: 2px solid #e9ecef;
    border-radius: 5px;
    font-size: 1rem;
    transition: border-color 0.3s ease;
}

.contact-form input:focus,
.contact-form textarea:focus {
    outline: none;
    border-color: #667eea;
}

.contact-form textarea {
    resize: vertical;
    min-height: 120px;
}

.contact-form button {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    border: none;
    padding: 1rem;
    font-size: 1.1rem;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.contact-form button:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
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
    
    .hamburger {
        display: flex;
    }
    
    .hero-title {
        font-size: 2.5rem;
    }
    
    .hero-subtitle {
        font-size: 1.1rem;
    }
    
    section {
        padding: 50px 0;
    }
    
    .about h2, .services h2, .contact h2 {
        font-size: 2rem;
    }
}`;

    default:
      return `/* Modern Project Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: #333;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    margin-top: 50px;
}

header {
    text-align: center;
    margin-bottom: 3rem;
}

header h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #333;
    margin-bottom: 1rem;
    background: linear-gradient(135deg, #667eea, #764ba2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

header p {
    font-size: 1.1rem;
    color: #666;
    max-width: 600px;
    margin: 0 auto;
}

.project-section {
    margin-bottom: 3rem;
}

.project-section h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #333;
}

.features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin: 2rem 0;
}

.feature {
    background: #f8f9ff;
    padding: 2rem;
    border-radius: 10px;
    border-left: 4px solid #667eea;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.feature h3 {
    color: #333;
    margin-bottom: 1rem;
    font-size: 1.3rem;
}

.feature p {
    color: #666;
    line-height: 1.6;
}

.primary-button {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    border: none;
    padding: 15px 30px;
    font-size: 1.1rem;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease;
    margin: 2rem auto;
    display: block;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.primary-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.output-area {
    background: #f8f9ff;
    border: 2px dashed #667eea;
    border-radius: 10px;
    padding: 2rem;
    margin-top: 2rem;
    text-align: center;
    transition: all 0.3s ease;
}

.output-area.active {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    border-color: transparent;
}

footer {
    text-align: center;
    padding: 2rem 0;
    border-top: 1px solid #eee;
    margin-top: 3rem;
    color: #666;
}

/* Responsive Design */
@media (max-width: 768px) {
    .container {
        margin: 20px;
        padding: 15px;
    }
    
    header h1 {
        font-size: 2rem;
    }
    
    .features {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
    
    .feature {
        padding: 1.5rem;
    }
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

.feature {
    animation: fadeInUp 0.6s ease forwards;
}

.feature:nth-child(1) { animation-delay: 0.1s; }
.feature:nth-child(2) { animation-delay: 0.2s; }
.feature:nth-child(3) { animation-delay: 0.3s; }`;
  }
};

const getProjectJS = (projectId?: string, projectTitle?: string): string => {
  // Check if this is a capstone project (ID >= 101)
  if (projectId && parseInt(projectId) >= 101) {
    return `// Coming Soon Capstone Project JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const notifyForm = document.getElementById('notifyForm');
    const suggestionCards = document.querySelectorAll('.suggestion-card');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const featureItems = document.querySelectorAll('.feature-item');
    
    // Email notification form handling
    notifyForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value;
        const button = this.querySelector('button');
        const originalText = button.textContent;
        
        // Simulate form submission
        button.textContent = 'Subscribing...';
        button.disabled = true;
        
        setTimeout(() => {
            button.textContent = '✓ Subscribed!';
            button.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.style.cssText = \`
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #4CAF50, #45a049);
                color: white;
                padding: 15px 25px;
                border-radius: 10px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                z-index: 9999;
                animation: slideInRight 0.5s ease;
            \`;
            successMessage.innerHTML = \`
                <strong>🎉 Success!</strong><br>
                We'll notify you at <strong>\${email}</strong> when this capstone project is ready!
            \`;
            
            document.body.appendChild(successMessage);
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.style.animation = 'slideOutRight 0.5s ease';
                setTimeout(() => {
                    successMessage.remove();
                }, 500);
            }, 5000);
            
            // Reset form
            this.reset();
            
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
                button.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
            }, 3000);
        }, 2000);
    });
    
    // Suggestion card interactions
    suggestionCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            
            const projectTitle = this.querySelector('h4').textContent;
            
            // Create floating notification
            const notification = document.createElement('div');
            notification.style.cssText = \`
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: linear-gradient(135deg, #667eea, #764ba2);
                color: white;
                padding: 15px 25px;
                border-radius: 10px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                z-index: 9999;
                animation: slideInDown 0.5s ease;
            \`;
            notification.innerHTML = \`
                <strong>📚 \${projectTitle}</strong><br>
                Redirecting to project... (This would normally navigate to the project)
            \`;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.animation = 'slideOutUp 0.5s ease';
                setTimeout(() => {
                    notification.remove();
                }, 500);
            }, 3000);
        });
        
        // Add hover effect
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Timeline animation on scroll
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Initially hide timeline items for animation
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = \`all 0.6s ease \${index * 0.2}s\`;
        timelineObserver.observe(item);
    });
    
    // Feature items staggered animation
    featureItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = \`all 0.5s ease \${index * 0.1}s\`;
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 500 + (index * 100));
    });
    
    // Add interactive particles effect
    function createParticle() {
        const particle = document.createElement('div');
        particle.style.cssText = \`
            position: fixed;
            width: 4px;
            height: 4px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1;
            opacity: 0.7;
        \`;
        
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        
        document.body.appendChild(particle);
        
        // Animate particle
        const angle = Math.random() * Math.PI * 2;
        const velocity = 50 + Math.random() * 50;
        const life = 3000 + Math.random() * 2000;
        
        let currentX = x;
        let currentY = y;
        let opacity = 0.7;
        
        const startTime = Date.now();
        
        function animate() {
            const elapsed = Date.now() - startTime;
            const progress = elapsed / life;
            
            if (progress >= 1) {
                particle.remove();
                return;
            }
            
            currentX += Math.cos(angle) * velocity * 0.016;
            currentY += Math.sin(angle) * velocity * 0.016;
            opacity = 0.7 * (1 - progress);
            
            particle.style.left = currentX + 'px';
            particle.style.top = currentY + 'px';
            particle.style.opacity = opacity;
            
            requestAnimationFrame(animate);
        }
        
        animate();
    }
    
    // Create particles periodically
    setInterval(createParticle, 2000);
    
    // Add countdown timer (mock)
    function updateCountdown() {
        const countdownElement = document.querySelector('.status-badge');
        if (countdownElement) {
            const messages = [
                'Coming Soon',
                'In Development',
                'Almost Ready',
                'Final Testing',
                'Coming Soon'
            ];
            let currentIndex = 0;
            
            setInterval(() => {
                countdownElement.textContent = messages[currentIndex];
                currentIndex = (currentIndex + 1) % messages.length;
            }, 3000);
        }
    }
    
    updateCountdown();
    
    console.log('🚀 Capstone project preview loaded!');
    console.log('📧 Sign up for notifications to be the first to know when this project is available!');
});

// Add CSS animations
const animationStyles = document.createElement('style');
animationStyles.textContent = \`
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes slideInDown {
        from {
            transform: translateX(-50%) translateY(-100%);
            opacity: 0;
        }
        to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutUp {
        from {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
        to {
            transform: translateX(-50%) translateY(-100%);
            opacity: 0;
        }
    }
\`;
document.head.appendChild(animationStyles);`;
  }
  
  switch (projectId) {
    case '1':
      return `// Personal Profile Card JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Add interactive hover effects
    const profileCard = document.querySelector('.profile-card');
    const profileImage = document.querySelector('.profile-image');
    const socialButtons = document.querySelectorAll('.social-btn');
    const skillTags = document.querySelectorAll('.skill-tag');
    
    // Profile card tilt effect
    profileCard.addEventListener('mousemove', function(e) {
        const rect = profileCard.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = (e.clientX - centerX) / (rect.width / 2);
        const deltaY = (e.clientY - centerY) / (rect.height / 2);
        
        const rotateX = deltaY * -10;
        const rotateY = deltaX * 10;
        
        profileCard.style.transform = \`perspective(1000px) rotateX(\${rotateX}deg) rotateY(\${rotateY}deg) translateZ(20px)\`;
    });
    
    profileCard.addEventListener('mouseleave', function() {
        profileCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    });
    
    // Social button interactions
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonType = this.classList[1]; // github, linkedin, portfolio
            
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.width = '100px';
            ripple.style.height = '100px';
            ripple.style.marginLeft = '-50px';
            ripple.style.marginTop = '-50px';
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Handle different social media actions
            switch(buttonType) {
                case 'github':
                    alert('Opening GitHub profile... (Add your GitHub URL here)');
                    // window.open('https://github.com/yourusername', '_blank');
                    break;
                case 'linkedin':
                    alert('Opening LinkedIn profile... (Add your LinkedIn URL here)');
                    // window.open('https://linkedin.com/in/yourusername', '_blank');
                    break;
                case 'portfolio':
                    alert('Opening portfolio website... (Add your portfolio URL here)');
                    // window.open('https://yourportfolio.com', '_blank');
                    break;
            }
        });
    });
    
    // Skill tag interactions
    skillTags.forEach((tag, index) => {
        tag.addEventListener('click', function() {
            const skill = this.textContent;
            this.style.transform = 'scale(1.1)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
            
            alert(\`You clicked on \${skill}! Add more details about your \${skill} skills here.\`);
        });
        
        // Staggered animation on load
        setTimeout(() => {
            tag.style.opacity = '1';
            tag.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // Contact item interactions
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('click', function() {
            const text = this.textContent.trim();
            
            if (text.includes('@')) {
                // Email
                window.location.href = \`mailto:\${text.split(' ')[1]}\`;
            } else if (text.includes('+')) {
                // Phone
                window.location.href = \`tel:\${text.split(' ')[1]}\`;
            } else {
                // Location
                alert('Opening maps... (Add your location coordinates here)');
            }
        });
    });
    
    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = \`
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .skill-tag {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.3s ease;
        }
    \`;
    document.head.appendChild(style);
    
    console.log('Profile card loaded successfully!');
});`;

    case '2':
      return `// Interactive Landing Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    const ctaButton = document.getElementById('ctaButton');
    const hamburger = document.getElementById('hamburger');
    const navLinksContainer = document.querySelector('.nav-links');
    const contactForm = document.getElementById('contactForm');
    
    // Smooth scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Mobile hamburger menu
    hamburger.addEventListener('click', function() {
        navLinksContainer.classList.toggle('active');
        this.classList.toggle('active');
    });
    
    // CTA Button interaction
    ctaButton.addEventListener('click', function() {
        // Create floating particles effect
        for (let i = 0; i < 15; i++) {
            createParticle(this);
        }
        
        // Scroll to about section
        setTimeout(() => {
            document.getElementById('about').scrollIntoView({
                behavior: 'smooth'
            });
        }, 500);
    });
    
    // Create particle effect
    function createParticle(button) {
        const particle = document.createElement('div');
        const rect = button.getBoundingClientRect();
        
        particle.style.position = 'fixed';
        particle.style.left = rect.left + rect.width / 2 + 'px';
        particle.style.top = rect.top + rect.height / 2 + 'px';
        particle.style.width = '6px';
        particle.style.height = '6px';
        particle.style.background = 'rgba(255, 255, 255, 0.8)';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        
        document.body.appendChild(particle);
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = 100 + Math.random() * 100;
        const life = 1000 + Math.random() * 1000;
        
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        let x = rect.left + rect.width / 2;
        let y = rect.top + rect.height / 2;
        let opacity = 1;
        
        const startTime = Date.now();
        
        function animate() {
            const elapsed = Date.now() - startTime;
            const progress = elapsed / life;
            
            if (progress >= 1) {
                particle.remove();
                return;
            }
            
            x += vx * 0.016;
            y += vy * 0.016;
            opacity = 1 - progress;
            
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.opacity = opacity;
            
            requestAnimationFrame(animate);
        }
        
        animate();
    }
    
    // Stats counter animation
    function animateCounters() {
        const stats = document.querySelectorAll('.stat h3');
        
        stats.forEach(stat => {
            const target = parseInt(stat.textContent);
            const duration = 2000;
            const start = Date.now();
            
            function updateCounter() {
                const elapsed = Date.now() - start;
                const progress = Math.min(elapsed / duration, 1);
                
                const current = Math.floor(target * progress);
                stat.textContent = current + '+';
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                }
            }
            
            updateCounter();
        });
    }
    
    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Trigger counter animation for stats
                if (entry.target.classList.contains('stats')) {
                    animateCounters();
                }
            }
        });
    }, { threshold: 0.1 });
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.stat, .service-card, .stats');
    animatedElements.forEach(el => observer.observe(el));
    
    // Contact form handling
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // Simple form validation
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Simulate form submission
        const submitButton = this.querySelector('button');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            alert(\`Thank you, \${name}! Your message has been sent successfully.\`);
            this.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
    
    // Navbar scroll effect
    let lastScrollY = window.scrollY;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Service cards hover effect
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    console.log('Landing page loaded with interactive features!');
});

// Add CSS for mobile menu
const mobileStyles = document.createElement('style');
mobileStyles.textContent = \`
    @media (max-width: 768px) {
        .nav-links {
            position: fixed;
            top: 70px;
            left: -100%;
            width: 100%;
            height: calc(100vh - 70px);
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            padding-top: 2rem;
            transition: left 0.3s ease;
        }
        
        .nav-links.active {
            left: 0;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
\`;
document.head.appendChild(mobileStyles);`;

    default:
      return `// Interactive Project JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const actionButton = document.getElementById('actionButton');
    const outputArea = document.getElementById('output');
    let clickCount = 0;
    
    // Main button interaction
    actionButton.addEventListener('click', function() {
        clickCount++;
        
        // Button animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
        
        // Create ripple effect
        createRipple(this);
        
        // Update output with dynamic content
        updateOutput();
        
        // Add floating animation to features
        animateFeatures();
    });
    
    function createRipple(button) {
        const ripple = document.createElement('div');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.transform = 'translate(-50%, -50%) scale(0)';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.3)';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'ripple 0.6s ease-out';
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    function updateOutput() {
        const messages = [
            \`🎉 Awesome! You've clicked \${clickCount} time\${clickCount !== 1 ? 's' : ''}!\`,
            \`🚀 Great job! This is interaction #\${clickCount}\`,
            \`⭐ Keep going! You're doing amazing!\`,
            \`🔥 You're on fire! Click #\${clickCount} completed!\`,
            \`💻 Coding master! \${clickCount} clicks and counting!\`,
            \`🎯 Perfect! You've mastered the click!\`,
            \`🌟 Incredible! You're a natural at this!\`
        ];
        
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        
        outputArea.innerHTML = \`
            <div style="animation: slideInUp 0.5s ease;">
                <h3 style="margin-bottom: 1rem; color: #333;">\${randomMessage}</h3>
                <p style="color: #666; margin-bottom: 1rem;">
                    Current time: \${new Date().toLocaleTimeString()}
                </p>
                <div style="background: linear-gradient(135deg, #667eea, #764ba2); 
                           color: white; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
                    <strong>Pro Tip:</strong> Try modifying the CSS or JavaScript to customize this project!
                </div>
            </div>
        \`;
        
        outputArea.classList.add('active');
        
        // Add progress indicator
        const progressBar = document.createElement('div');
        progressBar.style.cssText = \`
            width: 100%; height: 4px; background: #eee; border-radius: 2px; 
            margin: 1rem 0; overflow: hidden;
        \`;
        
        const progress = document.createElement('div');
        progress.style.cssText = \`
            height: 100%; background: linear-gradient(135deg, #667eea, #764ba2);
            width: 0%; transition: width 1s ease; border-radius: 2px;
        \`;
        
        progressBar.appendChild(progress);
        outputArea.appendChild(progressBar);
        
        setTimeout(() => {
            progress.style.width = Math.min(clickCount * 10, 100) + '%';
        }, 100);
    }
    
    function animateFeatures() {
        const features = document.querySelectorAll('.feature');
        
        features.forEach((feature, index) => {
            setTimeout(() => {
                feature.style.transform = 'translateY(-10px)';
                setTimeout(() => {
                    feature.style.transform = 'translateY(0)';
                }, 300);
            }, index * 100);
        });
    }
    
    // Add hover effects to features
    const features = document.querySelectorAll('.feature');
    features.forEach(feature => {
        feature.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.15)';
        });
        
        feature.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            actionButton.click();
        }
        
        if (e.key === 'r' && e.ctrlKey) {
            e.preventDefault();
            location.reload();
        }
    });
    
    // Random color theme switcher
    let currentTheme = 0;
    const themes = [
        { primary: '#667eea', secondary: '#764ba2' },
        { primary: '#ff6b6b', secondary: '#ee5a52' },
        { primary: '#4ecdc4', secondary: '#44a08d' },
        { primary: '#45b7d1', secondary: '#96c93d' },
        { primary: '#f093fb', secondary: '#f5576c' }
    ];
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 't' && e.altKey) {
            e.preventDefault();
            currentTheme = (currentTheme + 1) % themes.length;
            const theme = themes[currentTheme];
            
            document.documentElement.style.setProperty('--primary-color', theme.primary);
            document.documentElement.style.setProperty('--secondary-color', theme.secondary);
            
            // Update gradient backgrounds
            document.body.style.background = \`linear-gradient(135deg, \${theme.primary} 0%, \${theme.secondary} 100%)\`;
            actionButton.style.background = \`linear-gradient(135deg, \${theme.primary}, \${theme.secondary})\`;
            
            console.log(\`Theme switched to: \${theme.primary} / \${theme.secondary}\`);
        }
    });
    
    console.log('🎉 Project loaded successfully!');
    console.log('💡 Press Alt+T to switch color themes');
    console.log('⌨️ Press Enter or Space to trigger the main action');
    console.log('🔄 Press Ctrl+R to refresh');
});

// Add CSS animations
const animationStyles = document.createElement('style');
animationStyles.textContent = \`
    @keyframes ripple {
        to {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
        }
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .feature {
        transition: all 0.3s ease;
    }
\`;
document.head.appendChild(animationStyles);`;
  }
};

// Default file contents (fallback)
const defaultHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Code Environment</title>
</head>
<body>
    <div class="container">
        <h1>Welcome to Code Environment!</h1>
        <p>Start building something amazing!</p>
        <button id="clickMe">Click Me!</button>
        <div id="output"></div>
    </div>
</body>
</html>`;

const defaultCSS = `/* Code Environment Styles */
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

button {
    background: #ff6b6b;
    color: white;
    border: none;
    padding: 15px 30px;
    font-size: 1.1rem;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease;
}

button:hover {
    transform: translateY(-2px);
    background: #ff5252;
}

#output {
    margin-top: 20px;
    padding: 20px;
    background: rgba(255,255,255,0.1);
    border-radius: 10px;
    min-height: 50px;
}`;

const defaultJS = `// Code Environment JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('clickMe');
    const output = document.getElementById('output');
    let clickCount = 0;
    
    button.addEventListener('click', function() {
        clickCount++;
        output.innerHTML = \`
            <h3>Button clicked \${clickCount} time\${clickCount !== 1 ? 's' : ''}!</h3>
            <p>Time: \${new Date().toLocaleTimeString()}</p>
        \`;
    });
    
    output.innerHTML = '<p>Click the button to see magic! ✨</p>';
});`;

export default CodeEnvironment;
