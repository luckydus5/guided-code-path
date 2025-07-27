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
}

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
  return HANDS_ON_PROJECTS.filter(project => project.difficulty === difficulty);
};

// Helper function to get projects by language
export const getProjectsByLanguage = (languageId: string) => {
  return HANDS_ON_PROJECTS.filter(project => project.languages.includes(languageId));
};