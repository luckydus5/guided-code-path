export interface Project {
  id: number;
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedTime: string;
  technologies: string[];
  skills: string[];
  category: string;
  languages: string[];
  requirements?: string[];
  learningObjectives?: string[];
  isWebFundamentalsProject?: boolean;
}

// WEB DEVELOPMENT FUNDAMENTALS PROJECTS
export const WEB_FUNDAMENTALS_PROJECTS: Project[] = [
  // BEGINNER LEVEL (1-15)
  {
    id: 1,
    title: "Personal Profile Card",
    description: "Create a beautiful profile card using HTML and CSS with hover effects, gradients, and responsive design. Perfect introduction to modern web design.",
    difficulty: "Beginner",
    estimatedTime: "2-3 days",
    technologies: ["HTML", "CSS"],
    skills: ["HTML Structure", "CSS Styling", "Responsive Design", "Flexbox"],
    category: "Web Development",
    languages: ["html", "css"],
    isWebFundamentalsProject: true,
    requirements: [
      "Use semantic HTML elements",
      "Apply CSS flexbox for layout",
      "Add hover effects and transitions",
      "Make it responsive for mobile devices",
      "Include a profile image and contact info"
    ],
    learningObjectives: [
      "Master HTML semantic elements",
      "Understand CSS selectors and properties",
      "Learn responsive design principles",
      "Practice modern CSS features"
    ]
  },
  {
    id: 2,
    title: "Interactive Landing Page",
    description: "Build a modern landing page with smooth scrolling, CSS animations, and interactive elements. Learn the fundamentals of web design.",
    difficulty: "Beginner",
    estimatedTime: "1 week",
    technologies: ["HTML", "CSS", "JavaScript"],
    skills: ["Page Layout", "CSS Animations", "Basic JavaScript", "UI/UX"],
    category: "Web Development",
    languages: ["html", "css", "javascript"],
    isWebFundamentalsProject: true,
    requirements: [
      "Create multiple sections (hero, about, services, contact)",
      "Add smooth scrolling navigation",
      "Implement CSS animations and transitions",
      "Include a contact form with basic validation",
      "Make it fully responsive"
    ],
    learningObjectives: [
      "Learn page structure and layout",
      "Master CSS animations and keyframes",
      "Understand basic JavaScript DOM manipulation",
      "Practice form handling and validation"
    ]
  },
  {
    id: 3,
    title: "Calculator with Theme Switcher",
    description: "Create a functional calculator with multiple themes, keyboard support, and history feature. Perfect for learning JavaScript logic.",
    difficulty: "Beginner",
    estimatedTime: "4-5 days",
    technologies: ["HTML", "CSS", "JavaScript"],
    skills: ["JavaScript Logic", "Event Handling", "Local Storage", "CSS Variables"],
    category: "Web Development",
    languages: ["html", "css", "javascript"],
    isWebFundamentalsProject: true,
    requirements: [
      "Implement basic arithmetic operations",
      "Add keyboard support for all functions",
      "Create multiple color themes",
      "Store calculation history in localStorage",
      "Handle edge cases and errors gracefully"
    ],
    learningObjectives: [
      "Master JavaScript functions and logic",
      "Learn event handling and keyboard events",
      "Understand local storage and data persistence",
      "Practice error handling and edge cases"
    ]
  },
  {
    id: 4,
    title: "To-Do List with Categories",
    description: "Build an advanced todo application with categories, due dates, priority levels, and drag-and-drop functionality.",
    difficulty: "Beginner",
    estimatedTime: "1 week",
    technologies: ["HTML", "CSS", "JavaScript"],
    skills: ["CRUD Operations", "Drag & Drop", "Data Management", "CSS Grid"],
    category: "Web Development",
    languages: ["html", "css", "javascript"],
    isWebFundamentalsProject: true,
    requirements: [
      "Add, edit, delete, and mark tasks complete",
      "Organize tasks by categories",
      "Set due dates and priority levels",
      "Implement drag-and-drop reordering",
      "Save all data to localStorage"
    ],
    learningObjectives: [
      "Master CRUD operations in JavaScript",
      "Learn HTML5 drag and drop API",
      "Understand data structures and management",
      "Practice CSS Grid and advanced layouts"
    ]
  },
  {
    id: 5,
    title: "Weather Dashboard",
    description: "Create a comprehensive weather app with current conditions, 5-day forecast, and location search using real weather APIs.",
    difficulty: "Beginner",
    estimatedTime: "1 week",
    technologies: ["HTML", "CSS", "JavaScript", "Weather API"],
    skills: ["API Integration", "Async Programming", "Error Handling", "Data Visualization"],
    category: "Web Development",
    languages: ["html", "css", "javascript"],
    isWebFundamentalsProject: true,
    requirements: [
      "Fetch weather data from OpenWeatherMap API",
      "Display current weather and 5-day forecast",
      "Add location search and geolocation",
      "Show weather icons and animations",
      "Handle API errors gracefully"
    ],
    learningObjectives: [
      "Learn API integration and fetch()",
      "Master async/await and promises",
      "Understand error handling in web apps",
      "Practice working with external data"
    ]
  },
  {
    id: 6,
    title: "Image Gallery with Lightbox",
    description: "Build a responsive image gallery with filtering, lightbox modal, and lazy loading for optimal performance.",
    difficulty: "Beginner",
    estimatedTime: "5-6 days",
    technologies: ["HTML", "CSS", "JavaScript"],
    skills: ["Image Handling", "Modal Windows", "CSS Grid", "Performance Optimization"],
    category: "Web Development",
    languages: ["html", "css", "javascript"],
    isWebFundamentalsProject: true,
    requirements: [
      "Create responsive grid layout for images",
      "Implement category filtering",
      "Add lightbox modal for full-size viewing",
      "Include image lazy loading",
      "Add navigation controls in lightbox"
    ],
    learningObjectives: [
      "Master CSS Grid for complex layouts",
      "Learn modal window implementation",
      "Understand performance optimization techniques",
      "Practice image handling and optimization"
    ]
  },
  {
    id: 7,
    title: "Music Player Interface",
    description: "Design a modern music player interface with playlist management, progress controls, and visualizations (no actual audio required).",
    difficulty: "Beginner",
    estimatedTime: "1 week",
    technologies: ["HTML", "CSS", "JavaScript"],
    skills: ["UI Design", "CSS Animations", "Component Architecture", "State Management"],
    category: "Web Development",
    languages: ["html", "css", "javascript"],
    isWebFundamentalsProject: true,
    requirements: [
      "Create player controls (play, pause, next, previous)",
      "Design a playlist with add/remove functionality",
      "Add progress bar and time display",
      "Include volume control and shuffle/repeat",
      "Create smooth animations and transitions"
    ],
    learningObjectives: [
      "Learn complex UI component design",
      "Master CSS animations and transitions",
      "Understand component-based architecture",
      "Practice state management in vanilla JS"
    ]
  },
  {
    id: 8,
    title: "Quiz Application",
    description: "Build an interactive quiz app with multiple question types, scoring system, and results analysis with beautiful UI.",
    difficulty: "Beginner",
    estimatedTime: "1 week",
    technologies: ["HTML", "CSS", "JavaScript"],
    skills: ["Quiz Logic", "Scoring Systems", "Data Structures", "UI Interactions"],
    category: "Web Development",
    languages: ["html", "css", "javascript"],
    isWebFundamentalsProject: true,
    requirements: [
      "Support multiple choice and true/false questions",
      "Implement timer and scoring system",
      "Show progress indicator during quiz",
      "Display detailed results and explanations",
      "Add restart and review functionality"
    ],
    learningObjectives: [
      "Master complex JavaScript logic",
      "Learn data structure management",
      "Understand timer implementation",
      "Practice dynamic content generation"
    ]
  },

  // INTERMEDIATE LEVEL (9-16)
  {
    id: 9,
    title: "Social Media Dashboard",
    description: "Create a comprehensive social media dashboard with posts, comments, likes, and user interactions using advanced CSS and JavaScript.",
    difficulty: "Intermediate",
    estimatedTime: "2 weeks",
    technologies: ["HTML", "CSS", "JavaScript"],
    skills: ["Complex Layouts", "State Management", "Component Design", "Data Filtering"],
    category: "Web Development",
    languages: ["html", "css", "javascript"],
    isWebFundamentalsProject: true,
    requirements: [
      "Design user profile and feed interface",
      "Implement post creation with media upload",
      "Add like, comment, and share functionality",
      "Create user search and filtering",
      "Include notifications and messaging interface"
    ],
    learningObjectives: [
      "Master complex state management",
      "Learn advanced CSS layout techniques",
      "Understand component-based design patterns",
      "Practice data filtering and searching"
    ]
  },
  {
    id: 10,
    title: "E-commerce Product Showcase",
    description: "Build a complete product page with image zoom, variant selection, shopping cart, and checkout process simulation.",
    difficulty: "Intermediate",
    estimatedTime: "2 weeks",
    technologies: ["HTML", "CSS", "JavaScript"],
    skills: ["E-commerce Logic", "Image Manipulation", "Cart Management", "Form Validation"],
    category: "Web Development",
    languages: ["html", "css", "javascript"],
    isWebFundamentalsProject: true,
    requirements: [
      "Create product gallery with zoom functionality",
      "Implement size/color variant selection",
      "Build shopping cart with quantity management",
      "Add product reviews and ratings",
      "Design checkout form with validation"
    ],
    learningObjectives: [
      "Learn e-commerce application logic",
      "Master image manipulation techniques",
      "Understand cart state management",
      "Practice advanced form validation"
    ]
  },
  {
    id: 11,
    title: "Expense Tracker with Charts",
    description: "Create a personal finance tracker with categories, budgets, and interactive charts for expense visualization.",
    difficulty: "Intermediate",
    estimatedTime: "2 weeks",
    technologies: ["HTML", "CSS", "JavaScript", "Chart.js"],
    skills: ["Data Visualization", "Chart Integration", "Financial Logic", "Export Features"],
    category: "Web Development",
    languages: ["html", "css", "javascript"],
    isWebFundamentalsProject: true,
    requirements: [
      "Add income and expense tracking",
      "Create budget categories and limits",
      "Generate interactive charts and graphs",
      "Implement data export to CSV",
      "Add expense search and filtering"
    ],
    learningObjectives: [
      "Learn data visualization with Chart.js",
      "Master complex data management",
      "Understand financial application logic",
      "Practice data export and import"
    ]
  },
  {
    id: 12,
    title: "Real-time Chat Interface",
    description: "Build a chat application interface with emoji support, file sharing, typing indicators, and message search (frontend only).",
    difficulty: "Intermediate",
    estimatedTime: "2 weeks",
    technologies: ["HTML", "CSS", "JavaScript"],
    skills: ["Real-time UI", "Message Management", "File Handling", "Search Implementation"],
    category: "Web Development",
    languages: ["html", "css", "javascript"],
    isWebFundamentalsProject: true,
    requirements: [
      "Design chat interface with message bubbles",
      "Add emoji picker and reactions",
      "Implement file upload simulation",
      "Create typing indicators and status",
      "Add message search and filtering"
    ],
    learningObjectives: [
      "Master real-time interface design",
      "Learn message queue management",
      "Understand file handling in browsers",
      "Practice search and filtering algorithms"
    ]
  },
  {
    id: 13,
    title: "Task Management Board",
    description: "Create a Kanban-style task board with drag-and-drop, team collaboration features, and project management tools.",
    difficulty: "Intermediate",
    estimatedTime: "2-3 weeks",
    technologies: ["HTML", "CSS", "JavaScript"],
    skills: ["Drag & Drop", "Project Management", "Team Features", "Data Organization"],
    category: "Web Development",
    languages: ["html", "css", "javascript"],
    isWebFundamentalsProject: true,
    requirements: [
      "Create multiple project boards",
      "Implement drag-and-drop between columns",
      "Add task assignment and due dates",
      "Include team member management",
      "Create project analytics and reports"
    ],
    learningObjectives: [
      "Master advanced drag-and-drop functionality",
      "Learn project management concepts",
      "Understand team collaboration features",
      "Practice complex data organization"
    ]
  },
  {
    id: 14,
    title: "Portfolio Website with CMS",
    description: "Build an advanced portfolio with content management system, blog functionality, and contact form integration.",
    difficulty: "Intermediate",
    estimatedTime: "3 weeks",
    technologies: ["HTML", "CSS", "JavaScript"],
    skills: ["CMS Development", "Blog Features", "SEO Optimization", "Performance"],
    category: "Web Development",
    languages: ["html", "css", "javascript"],
    isWebFundamentalsProject: true,
    requirements: [
      "Create admin panel for content management",
      "Implement blog with categories and tags",
      "Add portfolio project showcase",
      "Include contact form with email integration",
      "Optimize for SEO and performance"
    ],
    learningObjectives: [
      "Learn content management principles",
      "Master blog functionality implementation",
      "Understand SEO optimization techniques",
      "Practice performance optimization"
    ]
  },
  {
    id: 15,
    title: "Event Management System",
    description: "Create a complete event management platform with calendar integration, RSVP tracking, and event promotion tools.",
    difficulty: "Intermediate",
    estimatedTime: "3 weeks",
    technologies: ["HTML", "CSS", "JavaScript"],
    skills: ["Calendar Integration", "Event Logic", "RSVP Management", "Notification Systems"],
    category: "Web Development",
    languages: ["html", "css", "javascript"],
    isWebFundamentalsProject: true,
    requirements: [
      "Build event creation and management interface",
      "Integrate calendar view with event display",
      "Implement RSVP and guest management",
      "Add event promotion and sharing tools",
      "Create notification and reminder system"
    ],
    learningObjectives: [
      "Master calendar and date management",
      "Learn event-driven programming",
      "Understand guest management systems",
      "Practice notification implementation"
    ]
  },

  // ADVANCED LEVEL (16-20)
  {
    id: 16,
    title: "Advanced Code Editor",
    description: "Build a web-based code editor with syntax highlighting, auto-completion, file management, and live preview capabilities.",
    difficulty: "Advanced",
    estimatedTime: "4 weeks",
    technologies: ["HTML", "CSS", "JavaScript", "Monaco Editor"],
    skills: ["Code Editor APIs", "Syntax Highlighting", "File Systems", "Live Preview"],
    category: "Web Development",
    languages: ["html", "css", "javascript"],
    isWebFundamentalsProject: true,
    requirements: [
      "Implement syntax highlighting for multiple languages",
      "Add auto-completion and error detection",
      "Create file tree and project management",
      "Include live preview for web projects",
      "Add themes and customization options"
    ],
    learningObjectives: [
      "Master advanced text processing",
      "Learn code editor API integration",
      "Understand file system simulation",
      "Practice complex UI component development"
    ]
  },
  {
    id: 17,
    title: "Data Visualization Dashboard",
    description: "Create an interactive dashboard with multiple chart types, real-time data updates, and advanced filtering capabilities.",
    difficulty: "Advanced",
    estimatedTime: "4 weeks",
    technologies: ["HTML", "CSS", "JavaScript", "D3.js", "Chart.js"],
    skills: ["Data Visualization", "Interactive Charts", "Real-time Updates", "Performance"],
    category: "Web Development",
    languages: ["html", "css", "javascript"],
    isWebFundamentalsProject: true,
    requirements: [
      "Create multiple chart types (line, bar, pie, scatter)",
      "Implement real-time data updates",
      "Add interactive filtering and drilling",
      "Include data export and sharing",
      "Optimize for large datasets"
    ],
    learningObjectives: [
      "Master data visualization libraries",
      "Learn real-time data handling",
      "Understand interactive chart design",
      "Practice performance optimization for data"
    ]
  },
  {
    id: 18,
    title: "Multi-User Collaboration Tool",
    description: "Build a collaborative workspace with document editing, real-time cursors, version control, and team communication.",
    difficulty: "Advanced",
    estimatedTime: "5 weeks",
    technologies: ["HTML", "CSS", "JavaScript"],
    skills: ["Collaboration Features", "Version Control", "Real-time Sync", "Conflict Resolution"],
    category: "Web Development",
    languages: ["html", "css", "javascript"],
    isWebFundamentalsProject: true,
    requirements: [
      "Implement collaborative document editing",
      "Add real-time cursor and selection sharing",
      "Create version history and rollback",
      "Include team chat and commenting",
      "Handle conflict resolution for simultaneous edits"
    ],
    learningObjectives: [
      "Master collaborative editing algorithms",
      "Learn real-time synchronization techniques",
      "Understand version control principles",
      "Practice conflict resolution strategies"
    ]
  },
  {
    id: 19,
    title: "Progressive Web App (PWA)",
    description: "Create a full-featured PWA with offline functionality, push notifications, background sync, and app-like experience.",
    difficulty: "Advanced",
    estimatedTime: "5 weeks",
    technologies: ["HTML", "CSS", "JavaScript", "Service Workers", "Web APIs"],
    skills: ["PWA Development", "Service Workers", "Offline Storage", "Push Notifications"],
    category: "Web Development",
    languages: ["html", "css", "javascript"],
    isWebFundamentalsProject: true,
    requirements: [
      "Implement service worker for offline functionality",
      "Add push notification system",
      "Create app manifest and install prompt",
      "Include background sync capabilities",
      "Optimize for mobile app-like experience"
    ],
    learningObjectives: [
      "Master Progressive Web App development",
      "Learn Service Worker API",
      "Understand offline-first design",
      "Practice mobile app optimization"
    ]
  },
  {
    id: 20,
    title: "WebGL 3D Visualization",
    description: "Build an interactive 3D web application using WebGL with animations, user controls, and performance optimization.",
    difficulty: "Advanced",
    estimatedTime: "6 weeks",
    technologies: ["HTML", "CSS", "JavaScript", "WebGL", "Three.js"],
    skills: ["3D Graphics", "WebGL", "Animation", "Performance Optimization"],
    category: "Web Development",
    languages: ["html", "css", "javascript"],
    isWebFundamentalsProject: true,
    requirements: [
      "Create 3D scenes with lighting and materials",
      "Implement user controls for navigation",
      "Add animations and particle effects",
      "Include model loading and textures",
      "Optimize for smooth 60fps performance"
    ],
    learningObjectives: [
      "Master 3D graphics programming",
      "Learn WebGL and Three.js",
      "Understand 3D math and transformations",
      "Practice graphics performance optimization"
    ]
  }
];

export const HANDS_ON_PROJECTS: Project[] = [
  // BEGINNER PROJECTS (1-35)
  {
    id: 1,
    title: "Personal Portfolio Website",
    description: "Build a responsive personal portfolio showcasing your projects and skills with modern design.",
    difficulty: "Beginner",
    estimatedTime: "1-2 weeks",
    technologies: ["HTML", "CSS", "JavaScript"],
    skills: ["Responsive Design", "CSS Grid", "DOM Manipulation"],
    category: "Web Development",
    languages: ["javascript", "css", "html"]
  },
  {
    id: 2,
    title: "Todo List Application",
    description: "Create a dynamic todo list with add, edit, delete, and completion features using local storage.",
    difficulty: "Beginner",
    estimatedTime: "3-5 days",
    technologies: ["JavaScript", "HTML", "CSS", "Local Storage"],
    skills: ["Event Handling", "Data Persistence", "CRUD Operations"],
    category: "Web Development",
    languages: ["javascript"]
  },
  {
    id: 3,
    title: "Calculator App",
    description: "Build a functional calculator with basic arithmetic operations and a clean interface.",
    difficulty: "Beginner",
    estimatedTime: "2-4 days",
    technologies: ["JavaScript", "HTML", "CSS"],
    skills: ["Mathematical Operations", "UI Design", "Event Handling"],
    category: "Web Development",
    languages: ["javascript", "python"]
  },
  {
    id: 4,
    title: "Weather App",
    description: "Fetch weather data from an API and display current conditions for any city worldwide.",
    difficulty: "Beginner",
    estimatedTime: "1 week",
    technologies: ["JavaScript", "REST API", "CSS"],
    skills: ["API Integration", "Async Programming", "Error Handling"],
    category: "Web Development",
    languages: ["javascript", "python"]
  },
  {
    id: 5,
    title: "Random Quote Generator",
    description: "Display inspirational quotes with sharing capabilities and beautiful typography.",
    difficulty: "Beginner",
    estimatedTime: "2-3 days",
    technologies: ["JavaScript", "API", "CSS"],
    skills: ["API Calls", "UI Design", "Social Sharing"],
    category: "Web Development",
    languages: ["javascript", "python"]
  },
  {
    id: 6,
    title: "Password Generator",
    description: "Generate secure passwords with customizable length and character options.",
    difficulty: "Beginner",
    estimatedTime: "1-2 days",
    technologies: ["JavaScript", "HTML", "CSS"],
    skills: ["String Manipulation", "Security Concepts", "User Input"],
    category: "Utility",
    languages: ["javascript", "python", "java"]
  },
  {
    id: 7,
    title: "Digital Clock",
    description: "Create a real-time digital clock with different time zones and customizable themes.",
    difficulty: "Beginner",
    estimatedTime: "2-3 days",
    technologies: ["JavaScript", "CSS", "Date API"],
    skills: ["Date/Time Handling", "Intervals", "CSS Animations"],
    category: "Web Development",
    languages: ["javascript", "python"]
  },
  {
    id: 8,
    title: "Countdown Timer",
    description: "Build a countdown timer for events with notifications and sound alerts.",
    difficulty: "Beginner",
    estimatedTime: "3-4 days",
    technologies: ["JavaScript", "HTML", "CSS", "Web Audio API"],
    skills: ["Timer Logic", "Notifications", "Audio Control"],
    category: "Web Development",
    languages: ["javascript", "python"]
  },
  {
    id: 9,
    title: "Color Palette Generator",
    description: "Generate harmonious color palettes for design projects with export functionality.",
    difficulty: "Beginner",
    estimatedTime: "1 week",
    technologies: ["JavaScript", "CSS", "Canvas API"],
    skills: ["Color Theory", "Canvas Manipulation", "File Export"],
    category: "Design Tools",
    languages: ["javascript", "python"]
  },
  {
    id: 10,
    title: "Simple Blog",
    description: "Create a basic blog with post creation, editing, and commenting functionality.",
    difficulty: "Beginner",
    estimatedTime: "2 weeks",
    technologies: ["HTML", "CSS", "JavaScript", "Local Storage"],
    skills: ["Content Management", "User Interface", "Data Persistence"],
    category: "Web Development",
    languages: ["javascript", "python", "php"]
  },
  {
    id: 11,
    title: "Memory Card Game",
    description: "Build an interactive memory game with different difficulty levels and scoring.",
    difficulty: "Beginner",
    estimatedTime: "1 week",
    technologies: ["JavaScript", "CSS", "HTML"],
    skills: ["Game Logic", "Array Manipulation", "CSS Animations"],
    category: "Games",
    languages: ["javascript", "python"]
  },
  {
    id: 12,
    title: "Unit Converter",
    description: "Convert between different units (length, weight, temperature) with a clean interface.",
    difficulty: "Beginner",
    estimatedTime: "3-5 days",
    technologies: ["JavaScript", "HTML", "CSS"],
    skills: ["Mathematical Calculations", "User Input Validation", "UI Design"],
    category: "Utility",
    languages: ["javascript", "python", "java"]
  },
  {
    id: 13,
    title: "QR Code Generator",
    description: "Generate QR codes for text, URLs, and contact information with download options.",
    difficulty: "Beginner",
    estimatedTime: "2-4 days",
    technologies: ["JavaScript", "QR Library", "Canvas"],
    skills: ["Library Integration", "File Generation", "User Interface"],
    category: "Utility",
    languages: ["javascript", "python"]
  },
  {
    id: 14,
    title: "Expense Tracker",
    description: "Track personal expenses with categories, charts, and budget warnings.",
    difficulty: "Beginner",
    estimatedTime: "1-2 weeks",
    technologies: ["JavaScript", "Chart.js", "Local Storage"],
    skills: ["Data Visualization", "Financial Calculations", "Data Management"],
    category: "Finance",
    languages: ["javascript", "python"]
  },
  {
    id: 15,
    title: "Recipe Finder",
    description: "Search for recipes by ingredients with detailed cooking instructions and images.",
    difficulty: "Beginner",
    estimatedTime: "1 week",
    technologies: ["JavaScript", "Recipe API", "CSS"],
    skills: ["API Integration", "Search Functionality", "Responsive Design"],
    category: "Web Development",
    languages: ["javascript", "python"]
  },
  {
    id: 16,
    title: "Music Player App",
    description: "Create a responsive music player with playlists, controls, and audio visualization.",
    difficulty: "Beginner",
    estimatedTime: "1-2 weeks",
    technologies: ["JavaScript", "Web Audio API", "CSS"],
    skills: ["Audio Processing", "User Interface", "File Handling"],
    category: "Web Development",
    languages: ["javascript"]
  },
  {
    id: 17,
    title: "Image Gallery",
    description: "Build an interactive image gallery with filtering, lightbox, and lazy loading.",
    difficulty: "Beginner",
    estimatedTime: "1 week",
    technologies: ["JavaScript", "CSS", "Intersection Observer"],
    skills: ["Image Optimization", "Performance", "UI/UX"],
    category: "Web Development",
    languages: ["javascript"]
  },
  {
    id: 18,
    title: "Contact Manager",
    description: "Manage contacts with CRUD operations, search, and export functionality.",
    difficulty: "Beginner",
    estimatedTime: "1 week",
    technologies: ["JavaScript", "Local Storage", "CSS"],
    skills: ["Data Management", "Search Algorithms", "UI Design"],
    category: "Productivity",
    languages: ["javascript", "python"]
  },
  {
    id: 19,
    title: "Snake Game",
    description: "Classic snake game with collision detection, scoring, and difficulty levels.",
    difficulty: "Beginner",
    estimatedTime: "3-5 days",
    technologies: ["JavaScript", "Canvas", "CSS"],
    skills: ["Game Logic", "Canvas Manipulation", "Event Handling"],
    category: "Games",
    languages: ["javascript", "python"]
  },
  {
    id: 20,
    title: "Text Editor",
    description: "Simple text editor with formatting, save/load, and find/replace features.",
    difficulty: "Beginner",
    estimatedTime: "1-2 weeks",
    technologies: ["JavaScript", "File API", "CSS"],
    skills: ["Text Processing", "File Operations", "User Interface"],
    category: "Productivity",
    languages: ["javascript", "python"]
  },
  {
    id: 21,
    title: "Habit Tracker",
    description: "Track daily habits with streaks, statistics, and visual progress indicators.",
    difficulty: "Beginner",
    estimatedTime: "1 week",
    technologies: ["JavaScript", "Chart.js", "Local Storage"],
    skills: ["Data Visualization", "Progress Tracking", "Statistics"],
    category: "Productivity",
    languages: ["javascript", "python"]
  },
  {
    id: 22,
    title: "Quiz Application",
    description: "Interactive quiz app with multiple choice questions, scoring, and results.",
    difficulty: "Beginner",
    estimatedTime: "1 week",
    technologies: ["JavaScript", "JSON", "CSS"],
    skills: ["Data Structures", "Logic Flow", "User Interaction"],
    category: "Education",
    languages: ["javascript", "python"]
  },
  {
    id: 23,
    title: "Currency Converter",
    description: "Real-time currency converter with exchange rates from external APIs.",
    difficulty: "Beginner",
    estimatedTime: "3-5 days",
    technologies: ["JavaScript", "Exchange Rate API", "CSS"],
    skills: ["API Integration", "Mathematical Calculations", "Error Handling"],
    category: "Finance",
    languages: ["javascript", "python"]
  },
  {
    id: 24,
    title: "Recipe Book",
    description: "Digital recipe book with categories, search, and shopping list generation.",
    difficulty: "Beginner",
    estimatedTime: "1-2 weeks",
    technologies: ["JavaScript", "Local Storage", "CSS"],
    skills: ["Data Organization", "Search Functionality", "List Management"],
    category: "Lifestyle",
    languages: ["javascript", "python"]
  },
  {
    id: 25,
    title: "Tic Tac Toe",
    description: "Classic Tic Tac Toe game with AI opponent and score tracking.",
    difficulty: "Beginner",
    estimatedTime: "2-3 days",
    technologies: ["JavaScript", "CSS", "Minimax Algorithm"],
    skills: ["Game Logic", "AI Implementation", "Pattern Recognition"],
    category: "Games",
    languages: ["javascript", "python", "java"]
  },
  {
    id: 26,
    title: "News Aggregator",
    description: "Aggregate news from multiple sources with filtering and bookmarking.",
    difficulty: "Beginner",
    estimatedTime: "1-2 weeks",
    technologies: ["JavaScript", "News API", "CSS"],
    skills: ["API Integration", "Data Filtering", "Content Management"],
    category: "News",
    languages: ["javascript", "python"]
  },
  {
    id: 27,
    title: "BMI Calculator",
    description: "Calculate BMI with health recommendations and progress tracking.",
    difficulty: "Beginner",
    estimatedTime: "2-3 days",
    technologies: ["JavaScript", "Chart.js", "CSS"],
    skills: ["Health Calculations", "Data Visualization", "User Input"],
    category: "Health",
    languages: ["javascript", "python"]
  },
  {
    id: 28,
    title: "Markdown Editor",
    description: "Live markdown editor with preview, syntax highlighting, and export options.",
    difficulty: "Beginner",
    estimatedTime: "1 week",
    technologies: ["JavaScript", "Markdown Parser", "CSS"],
    skills: ["Text Processing", "Real-time Updates", "File Export"],
    category: "Productivity",
    languages: ["javascript", "python"]
  },
  {
    id: 29,
    title: "Color Picker Tool",
    description: "Advanced color picker with palette generation and color harmony rules.",
    difficulty: "Beginner",
    estimatedTime: "1 week",
    technologies: ["JavaScript", "Canvas", "Color Theory"],
    skills: ["Color Mathematics", "Canvas API", "Design Tools"],
    category: "Design Tools",
    languages: ["javascript", "python"]
  },
  {
    id: 30,
    title: "Memory Game",
    description: "Card matching memory game with themes, difficulty levels, and high scores.",
    difficulty: "Beginner",
    estimatedTime: "1 week",
    technologies: ["JavaScript", "CSS Animations", "Local Storage"],
    skills: ["Game Logic", "Memory Management", "Animation"],
    category: "Games",
    languages: ["javascript", "python"]
  },
  {
    id: 31,
    title: "URL Shortener",
    description: "Create short URLs with click tracking and analytics dashboard.",
    difficulty: "Beginner",
    estimatedTime: "1 week",
    technologies: ["JavaScript", "Local Storage", "Chart.js"],
    skills: ["URL Manipulation", "Analytics", "Data Tracking"],
    category: "Utility",
    languages: ["javascript", "python", "go"]
  },
  {
    id: 32,
    title: "Pomodoro Timer",
    description: "Productivity timer with work/break cycles, notifications, and statistics.",
    difficulty: "Beginner",
    estimatedTime: "3-5 days",
    technologies: ["JavaScript", "Notification API", "CSS"],
    skills: ["Timer Logic", "Notifications", "Productivity Methods"],
    category: "Productivity",
    languages: ["javascript", "python"]
  },
  {
    id: 33,
    title: "Drawing Canvas",
    description: "Digital drawing app with brush tools, colors, and save functionality.",
    difficulty: "Beginner",
    estimatedTime: "1-2 weeks",
    technologies: ["JavaScript", "Canvas API", "File API"],
    skills: ["Canvas Drawing", "Tool Implementation", "File Handling"],
    category: "Creative",
    languages: ["javascript", "python"]
  },
  {
    id: 34,
    title: "Typing Speed Test",
    description: "Test typing speed and accuracy with various text samples and statistics.",
    difficulty: "Beginner",
    estimatedTime: "1 week",
    technologies: ["JavaScript", "CSS", "Statistics"],
    skills: ["Text Analysis", "Performance Metrics", "User Interface"],
    category: "Education",
    languages: ["javascript", "python"]
  },
  {
    id: 35,
    title: "Random Password Manager",
    description: "Generate and store secure passwords with encryption and categories.",
    difficulty: "Beginner",
    estimatedTime: "1-2 weeks",
    technologies: ["JavaScript", "Crypto API", "Local Storage"],
    skills: ["Cryptography", "Security", "Data Management"],
    category: "Security",
    languages: ["javascript", "python", "java"]
  },

  // INTERMEDIATE PROJECTS (36-70)
  {
    id: 36,
    title: "E-commerce Platform",
    description: "Full-featured online store with shopping cart, payment integration, and admin panel.",
    difficulty: "Intermediate",
    estimatedTime: "4-6 weeks",
    technologies: ["React", "Node.js", "MongoDB", "Stripe API"],
    skills: ["Full-Stack Development", "Payment Processing", "Database Design"],
    category: "Web Development",
    languages: ["javascript", "python", "java"]
  },
  {
    id: 37,
    title: "Social Media Dashboard",
    description: "Analytics dashboard showing metrics from multiple social media platforms.",
    difficulty: "Intermediate",
    estimatedTime: "3-4 weeks",
    technologies: ["React", "D3.js", "REST APIs", "Node.js"],
    skills: ["Data Visualization", "API Integration", "Real-time Updates"],
    category: "Analytics",
    languages: ["javascript", "python"]
  },
  {
    id: 38,
    title: "Video Streaming App",
    description: "Netflix-like application with user authentication, video upload, and streaming.",
    difficulty: "Intermediate",
    estimatedTime: "6-8 weeks",
    technologies: ["React", "Node.js", "AWS S3", "Video.js"],
    skills: ["Video Processing", "Cloud Storage", "User Authentication"],
    category: "Media",
    languages: ["javascript", "python"]
  },
  {
    id: 39,
    title: "Real-time Chat Application",
    description: "Multi-room chat app with real-time messaging, file sharing, and user presence.",
    difficulty: "Intermediate",
    estimatedTime: "3-4 weeks",
    technologies: ["Socket.io", "React", "Node.js", "MongoDB"],
    skills: ["WebSocket Communication", "Real-time Features", "File Handling"],
    category: "Communication",
    languages: ["javascript", "python", "go"]
  },
  {
    id: 40,
    title: "Task Management System",
    description: "Project management tool with teams, deadlines, file attachments, and notifications.",
    difficulty: "Intermediate",
    estimatedTime: "4-5 weeks",
    technologies: ["React", "Node.js", "PostgreSQL", "Redis"],
    skills: ["Project Management Logic", "Team Collaboration", "Notification Systems"],
    category: "Productivity",
    languages: ["javascript", "python", "java"]
  },
  {
    id: 41,
    title: "Learning Management System",
    description: "Online education platform with courses, quizzes, progress tracking, and certificates.",
    difficulty: "Intermediate",
    estimatedTime: "6-8 weeks",
    technologies: ["React", "Node.js", "MongoDB", "JWT"],
    skills: ["Educational Technology", "Progress Tracking", "Authentication"],
    category: "Education",
    languages: ["javascript", "python", "java"]
  },
  {
    id: 42,
    title: "Stock Trading Simulator",
    description: "Virtual trading platform with real market data, portfolios, and performance analytics.",
    difficulty: "Intermediate",
    estimatedTime: "4-6 weeks",
    technologies: ["React", "Financial APIs", "WebSocket", "Chart.js"],
    skills: ["Financial Data", "Real-time Updates", "Portfolio Management"],
    category: "Finance",
    languages: ["javascript", "python", "java"]
  },
  {
    id: 43,
    title: "Code Review Platform",
    description: "GitHub-like platform for code reviews, pull requests, and collaboration.",
    difficulty: "Intermediate",
    estimatedTime: "5-7 weeks",
    technologies: ["React", "Git API", "Node.js", "Monaco Editor"],
    skills: ["Version Control", "Code Analysis", "Collaborative Tools"],
    category: "Developer Tools",
    languages: ["javascript", "python", "go"]
  },
  {
    id: 44,
    title: "Restaurant Management System",
    description: "Complete restaurant system with POS, inventory, staff management, and analytics.",
    difficulty: "Intermediate",
    estimatedTime: "5-6 weeks",
    technologies: ["React", "Node.js", "PostgreSQL", "Receipt Printing"],
    skills: ["Business Logic", "Inventory Management", "Payment Processing"],
    category: "Business",
    languages: ["javascript", "python", "java"]
  },
  {
    id: 45,
    title: "Event Management Platform",
    description: "Event organization platform with ticketing, attendee management, and check-in.",
    difficulty: "Intermediate",
    estimatedTime: "4-5 weeks",
    technologies: ["React", "Node.js", "Stripe", "QR Codes"],
    skills: ["Event Planning", "Ticket Management", "QR Code Generation"],
    category: "Events",
    languages: ["javascript", "python"]
  },
  {
    id: 46,
    title: "IoT Dashboard",
    description: "Monitor and control IoT devices with real-time data visualization and alerts.",
    difficulty: "Intermediate",
    estimatedTime: "4-6 weeks",
    technologies: ["React", "MQTT", "InfluxDB", "Grafana"],
    skills: ["IoT Protocols", "Time Series Data", "Device Management"],
    category: "IoT",
    languages: ["javascript", "python", "cpp"]
  },
  {
    id: 47,
    title: "Health Monitoring App",
    description: "Track health metrics with wearable device integration and health insights.",
    difficulty: "Intermediate",
    estimatedTime: "5-6 weeks",
    technologies: ["React Native", "Health APIs", "Machine Learning"],
    skills: ["Health Data", "Mobile Development", "Data Analysis"],
    category: "Health",
    languages: ["javascript", "python", "swift"]
  },
  {
    id: 48,
    title: "Music Streaming Service",
    description: "Spotify-like music streaming with playlists, recommendations, and social features.",
    difficulty: "Intermediate",
    estimatedTime: "6-8 weeks",
    technologies: ["React", "Node.js", "FFmpeg", "Recommendation Engine"],
    skills: ["Audio Streaming", "Recommendation Systems", "Social Features"],
    category: "Media",
    languages: ["javascript", "python"]
  },
  {
    id: 49,
    title: "Delivery Tracking System",
    description: "Package delivery system with real-time tracking, route optimization, and notifications.",
    difficulty: "Intermediate",
    estimatedTime: "4-5 weeks",
    technologies: ["React", "Google Maps API", "WebSocket", "Push Notifications"],
    skills: ["Geolocation", "Route Planning", "Real-time Tracking"],
    category: "Logistics",
    languages: ["javascript", "python", "java"]
  },
  {
    id: 50,
    title: "Online Banking System",
    description: "Secure banking platform with transactions, transfers, and account management.",
    difficulty: "Intermediate",
    estimatedTime: "6-8 weeks",
    technologies: ["React", "Node.js", "Encryption", "2FA"],
    skills: ["Financial Security", "Transaction Processing", "Authentication"],
    category: "Finance",
    languages: ["javascript", "python", "java"]
  },

  // ADVANCED PROJECTS (71-100)
  {
    id: 71,
    title: "AI-Powered Code Editor",
    description: "Advanced code editor with AI code completion, syntax highlighting, and collaborative editing.",
    difficulty: "Advanced",
    estimatedTime: "8-12 weeks",
    technologies: ["Monaco Editor", "WebRTC", "AI APIs", "Docker"],
    skills: ["Complex UI Development", "AI Integration", "Real-time Collaboration"],
    category: "Developer Tools",
    languages: ["javascript", "python", "go"]
  },
  {
    id: 72,
    title: "Blockchain Cryptocurrency",
    description: "Create your own cryptocurrency with mining, transactions, and decentralized network.",
    difficulty: "Advanced",
    estimatedTime: "10-16 weeks",
    technologies: ["Node.js", "Cryptography", "P2P Networks", "React"],
    skills: ["Blockchain Technology", "Cryptographic Security", "Distributed Systems"],
    category: "Blockchain",
    languages: ["javascript", "python", "go", "rust"]
  },
  {
    id: 73,
    title: "Machine Learning Platform",
    description: "End-to-end ML platform with model training, deployment, and monitoring capabilities.",
    difficulty: "Advanced",
    estimatedTime: "12-20 weeks",
    technologies: ["Python", "TensorFlow", "Docker", "Kubernetes", "React"],
    skills: ["Machine Learning", "DevOps", "Microservices", "Cloud Deployment"],
    category: "AI/ML",
    languages: ["python", "r", "scala"]
  },
  {
    id: 74,
    title: "Distributed File System",
    description: "Build a scalable distributed file storage system with replication and fault tolerance.",
    difficulty: "Advanced",
    estimatedTime: "10-14 weeks",
    technologies: ["Go", "gRPC", "Docker", "Kubernetes"],
    skills: ["Distributed Systems", "Network Programming", "System Design"],
    category: "System Programming",
    languages: ["go", "rust", "cpp", "java"]
  },
  {
    id: 75,
    title: "Real-time Trading Platform",
    description: "High-frequency trading platform with real-time market data and algorithmic trading.",
    difficulty: "Advanced",
    estimatedTime: "12-16 weeks",
    technologies: ["C++", "WebSocket", "Redis", "PostgreSQL", "React"],
    skills: ["High-Performance Computing", "Financial Algorithms", "Real-time Systems"],
    category: "Finance",
    languages: ["cpp", "java", "python", "rust"]
  },
  {
    id: 76,
    title: "Cloud Operating System",
    description: "Browser-based operating system with virtual desktop, file system, and applications.",
    difficulty: "Advanced",
    estimatedTime: "14-20 weeks",
    technologies: ["WebAssembly", "Service Workers", "IndexedDB", "WebRTC"],
    skills: ["Operating System Concepts", "WebAssembly", "System Architecture"],
    category: "System Programming",
    languages: ["javascript", "rust", "cpp"]
  },
  {
    id: 77,
    title: "Game Engine",
    description: "2D/3D game engine with physics, rendering, audio, and scripting capabilities.",
    difficulty: "Advanced",
    estimatedTime: "16-24 weeks",
    technologies: ["C++", "OpenGL", "Physics Engine", "Audio Engine"],
    skills: ["Graphics Programming", "Physics Simulation", "Engine Architecture"],
    category: "Game Development",
    languages: ["cpp", "rust", "csharp"]
  },
  {
    id: 78,
    title: "Compiler and Language",
    description: "Design and implement a new programming language with compiler and runtime.",
    difficulty: "Advanced",
    estimatedTime: "12-18 weeks",
    technologies: ["LLVM", "Parser Generators", "Assembly"],
    skills: ["Compiler Design", "Language Theory", "Code Generation"],
    category: "System Programming",
    languages: ["cpp", "rust", "go"]
  },
  {
    id: 79,
    title: "Neural Network Framework",
    description: "Deep learning framework with automatic differentiation and GPU acceleration.",
    difficulty: "Advanced",
    estimatedTime: "14-20 weeks",
    technologies: ["CUDA", "OpenCL", "Linear Algebra", "Python C Extensions"],
    skills: ["GPU Programming", "Parallel Computing", "Mathematical Optimization"],
    category: "AI/ML",
    languages: ["python", "cpp", "cuda"]
  },
  {
    id: 80,
    title: "Database Management System",
    description: "Relational database with SQL parser, query optimizer, and transaction management.",
    difficulty: "Advanced",
    estimatedTime: "16-24 weeks",
    technologies: ["C++", "B+ Trees", "ACID Properties", "Query Optimization"],
    skills: ["Database Architecture", "Query Processing", "Concurrency Control"],
    category: "System Programming",
    languages: ["cpp", "rust", "java"]
  }
  // Continue adding more projects to reach 100...
];

// Helper function to get projects by difficulty
export const getProjectsByDifficulty = (difficulty: "Beginner" | "Intermediate" | "Advanced") => {
  const allProjects = [...WEB_FUNDAMENTALS_PROJECTS, ...HANDS_ON_PROJECTS];
  return allProjects.filter(project => project.difficulty === difficulty);
};

// Helper function to get projects by language
export const getProjectsByLanguage = (languageId: string) => {
  if (languageId === 'html' || languageId === 'web-fundamentals') {
    return WEB_FUNDAMENTALS_PROJECTS;
  }
  return HANDS_ON_PROJECTS.filter(project => project.languages.includes(languageId));
};

// Helper function to get Web Fundamentals projects specifically
export const getWebFundamentalsProjects = () => {
  return WEB_FUNDAMENTALS_PROJECTS;
};

// Helper function to get all projects
export const getAllProjects = () => {
  return [...WEB_FUNDAMENTALS_PROJECTS, ...HANDS_ON_PROJECTS];
};