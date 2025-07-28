export interface Language {
  id: string;
  name: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  popularity: number;
  icon: string;
  color: string;
  features: string[];
  useCases: string[];
  estimatedTime: string;
}

export const PROGRAMMING_LANGUAGES: Language[] = [
  {
    id: "python",
    name: "Python",
    description: "Easy-to-learn, versatile language perfect for beginners. Used in AI, web development, and data science.",
    difficulty: "Beginner",
    popularity: 95,
    icon: "🐍",
    color: "from-blue-500 to-yellow-500",
    features: ["Simple Syntax", "Versatile", "Large Community", "Rich Libraries"],
    useCases: ["Web Development", "Data Science", "AI/ML", "Automation"],
    estimatedTime: "2-3 months"
  },
  {
    id: "javascript",
    name: "JavaScript",
    description: "The language of the web. Essential for frontend development and increasingly popular for backend.",
    difficulty: "Beginner",
    popularity: 98,
    icon: "🌐",
    color: "from-yellow-400 to-orange-500",
    features: ["Web Native", "Flexible", "Event-Driven", "Dynamic"],
    useCases: ["Frontend Development", "Backend (Node.js)", "Mobile Apps", "Desktop Apps"],
    estimatedTime: "2-4 months"
  },
  {
    id: "java",
    name: "Java",
    description: "Enterprise-grade language known for 'write once, run anywhere'. Great for large-scale applications.",
    difficulty: "Intermediate",
    popularity: 85,
    icon: "☕",
    color: "from-red-500 to-orange-600",
    features: ["Platform Independent", "Object-Oriented", "Secure", "Robust"],
    useCases: ["Enterprise Applications", "Android Development", "Web Backend", "Desktop Apps"],
    estimatedTime: "3-5 months"
  },
  {
    id: "cpp",
    name: "C++",
    description: "Powerful, high-performance language for system programming and game development.",
    difficulty: "Advanced",
    popularity: 75,
    icon: "⚡",
    color: "from-blue-600 to-purple-600",
    features: ["High Performance", "Memory Control", "Object-Oriented", "System Programming"],
    useCases: ["Game Development", "System Programming", "Embedded Systems", "Performance-Critical Apps"],
    estimatedTime: "4-6 months"
  },
  {
    id: "csharp",
    name: "C#",
    description: "Microsoft's flagship language for .NET development. Great for Windows applications and web development.",
    difficulty: "Intermediate",
    popularity: 80,
    icon: "🔷",
    color: "from-purple-500 to-indigo-600",
    features: ["Type Safe", "Object-Oriented", "Garbage Collection", ".NET Ecosystem"],
    useCases: ["Windows Applications", "Web Development", "Game Development", "Enterprise Software"],
    estimatedTime: "3-4 months"
  },
  {
    id: "go",
    name: "Go",
    description: "Google's modern language designed for simplicity and efficiency in concurrent programming.",
    difficulty: "Intermediate",
    popularity: 70,
    icon: "🐹",
    color: "from-cyan-400 to-blue-500",
    features: ["Simple Syntax", "Fast Compilation", "Concurrent", "Statically Typed"],
    useCases: ["Backend Services", "Cloud Applications", "DevOps Tools", "Microservices"],
    estimatedTime: "2-3 months"
  },
  {
    id: "rust",
    name: "Rust",
    description: "Systems programming language focused on safety, speed, and concurrency without garbage collection.",
    difficulty: "Advanced",
    popularity: 65,
    icon: "🦀",
    color: "from-orange-500 to-red-600",
    features: ["Memory Safety", "Zero-Cost Abstractions", "Concurrency", "Performance"],
    useCases: ["System Programming", "Web Backend", "Blockchain", "Game Engines"],
    estimatedTime: "4-6 months"
  },
  {
    id: "swift",
    name: "Swift",
    description: "Apple's modern language for iOS, macOS, and beyond. Combines performance with developer-friendly syntax.",
    difficulty: "Intermediate",
    popularity: 60,
    icon: "🍎",
    color: "from-orange-400 to-pink-500",
    features: ["Type Safe", "Fast Performance", "Modern Syntax", "Interoperable"],
    useCases: ["iOS Development", "macOS Apps", "Server-Side Development", "Cross-Platform"],
    estimatedTime: "3-4 months"
  },
  {
    id: "kotlin",
    name: "Kotlin",
    description: "JetBrains' modern language that's 100% interoperable with Java. Google's preferred language for Android.",
    difficulty: "Intermediate",
    popularity: 55,
    icon: "📱",
    color: "from-purple-400 to-blue-500",
    features: ["Interoperable", "Concise", "Safe", "Modern"],
    useCases: ["Android Development", "Server-Side", "Cross-Platform Mobile", "Web Development"],
    estimatedTime: "2-3 months"
  },
  {
    id: "php",
    name: "PHP",
    description: "Server-side scripting language that powers a large portion of the web, including WordPress.",
    difficulty: "Beginner",
    popularity: 70,
    icon: "🐘",
    color: "from-purple-600 to-blue-700",
    features: ["Web-Focused", "Easy Deployment", "Large Ecosystem", "Dynamic"],
    useCases: ["Web Development", "Content Management", "E-commerce", "Server-Side Scripting"],
    estimatedTime: "2-3 months"
  },
  {
    id: "ruby",
    name: "Ruby",
    description: "Elegant language designed for programmer happiness. Powers many web applications with Ruby on Rails.",
    difficulty: "Beginner",
    popularity: 45,
    icon: "💎",
    color: "from-red-500 to-pink-600",
    features: ["Readable", "Flexible", "Object-Oriented", "Productive"],
    useCases: ["Web Development", "Automation", "DevOps", "Prototyping"],
    estimatedTime: "2-3 months"
  },
  {
    id: "r",
    name: "R",
    description: "Statistical computing language beloved by data scientists for analysis and visualization.",
    difficulty: "Intermediate",
    popularity: 40,
    icon: "📊",
    color: "from-blue-500 to-teal-600",
    features: ["Statistical Analysis", "Data Visualization", "Package Ecosystem", "Research-Oriented"],
    useCases: ["Data Analysis", "Statistical Modeling", "Research", "Data Visualization"],
    estimatedTime: "3-4 months"
  },
  {
    id: "scala",
    name: "Scala",
    description: "Functional and object-oriented language that runs on JVM, popular for big data processing.",
    difficulty: "Advanced",
    popularity: 35,
    icon: "🎭",
    color: "from-red-600 to-purple-700",
    features: ["Functional Programming", "Object-Oriented", "JVM Compatible", "Scalable"],
    useCases: ["Big Data", "Web Backend", "Distributed Systems", "Financial Systems"],
    estimatedTime: "4-5 months"
  },
  {
    id: "dart",
    name: "Dart",
    description: "Google's language optimized for building mobile, desktop, server, and web applications with Flutter.",
    difficulty: "Intermediate",
    popularity: 50,
    icon: "🎯",
    color: "from-blue-400 to-cyan-500",
    features: ["Cross-Platform", "Fast Development", "Modern Syntax", "Flutter Integration"],
    useCases: ["Mobile Development", "Web Apps", "Desktop Apps", "Server-Side"],
    estimatedTime: "2-3 months"
  },
  {
    id: "sql",
    name: "SQL",
    description: "Essential language for database management and data manipulation. Critical skill for any developer.",
    difficulty: "Beginner",
    popularity: 90,
    icon: "🗄️",
    color: "from-indigo-500 to-purple-600",
    features: ["Database Management", "Data Querying", "Standardized", "Declarative"],
    useCases: ["Database Design", "Data Analysis", "Backend Development", "Business Intelligence"],
    estimatedTime: "1-2 months"
  },
  {
    id: "capstone",
    name: "Capstone Projects",
    description: "Advanced, real-world projects that combine multiple technologies. Perfect for building a professional portfolio.",
    difficulty: "Advanced",
    popularity: 100,
    icon: "🚀",
    color: "from-purple-600 to-pink-600",
    features: ["Full-Stack Development", "Industry Best Practices", "Portfolio Ready", "Real-World Applications"],
    useCases: ["Job Applications", "Portfolio Building", "Skill Demonstration", "Career Advancement"],
    estimatedTime: "Coming Soon"
  }
];