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
  }
  // ... Continue with more projects to reach 100
];

// Helper function to get projects by difficulty
export const getProjectsByDifficulty = (difficulty: "Beginner" | "Intermediate" | "Advanced") => {
  return HANDS_ON_PROJECTS.filter(project => project.difficulty === difficulty);
};

// Helper function to get projects by language
export const getProjectsByLanguage = (languageId: string) => {
  return HANDS_ON_PROJECTS.filter(project => project.languages.includes(languageId));
};