export interface RealPythonProject {
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
  initialFiles?: Array<{
    id: string;
    name: string;
    content: string;
    type: 'file' | 'folder';
  }>;
}

export const REAL_PYTHON_PROJECTS: RealPythonProject[] = [
  {
    id: 1,
    title: "African Mobile Money System",
    description: "Build a comprehensive mobile money transfer system inspired by M-Pesa and other African fintech solutions. Learn Python while creating real African financial technology.",
    difficulty: "Beginner",
    estimatedTime: "2 weeks",
    technologies: ["Python", "File I/O", "JSON", "Data Validation"],
    skills: ["Object-Oriented Programming", "File Operations", "Data Structures", "Error Handling"],
    category: "African Fintech",
    languages: ["python"],
    requirements: [
      "User registration and authentication system",
      "Send and receive money functionality",
      "Transaction history tracking",
      "Balance management and verification",
      "Agent network simulation",
      "SMS-like notifications system"
    ],
    learningObjectives: [
      "Master Python classes and object-oriented design",
      "Implement secure data handling practices",
      "Learn file-based database operations",
      "Practice input validation and error handling",
      "Understand African fintech ecosystem"
    ]
  },
  {
    id: 2,
    title: "African Language Translator",
    description: "Create a translation system for major African languages (Swahili, Hausa, Yoruba, Amharic). Build a foundation for language preservation technology.",
    difficulty: "Intermediate",
    estimatedTime: "3 weeks",
    technologies: ["Python", "APIs", "JSON", "Web Scraping"],
    skills: ["API Integration", "Natural Language Processing", "Data Processing", "Cultural Sensitivity"],
    category: "Language Technology",
    languages: ["python"],
    requirements: [
      "Support for 5+ African languages",
      "Basic phrase translation capabilities",
      "Cultural context preservation",
      "Audio pronunciation guides",
      "Offline translation support"
    ],
    learningObjectives: [
      "Learn API integration and web services",
      "Understand natural language processing basics",
      "Practice data parsing and manipulation",
      "Develop cultural awareness in technology"
    ]
  },
  {
    id: 3,
    title: "African Agriculture Management System",
    description: "Build a farm management system for African farmers with crop planning, weather integration, and market price tracking.",
    difficulty: "Intermediate",
    estimatedTime: "4 weeks",
    technologies: ["Python", "APIs", "Data Analysis", "CSV/JSON"],
    skills: ["Data Analysis", "API Integration", "File Processing", "Agricultural Knowledge"],
    category: "AgriTech",
    languages: ["python"],
    requirements: [
      "Crop planning and scheduling system",
      "Weather data integration",
      "Market price tracking",
      "Harvest prediction algorithms",
      "Resource management tools"
    ],
    learningObjectives: [
      "Master data analysis with Python",
      "Learn to work with external APIs",
      "Understand agricultural cycles and planning",
      "Practice building real-world applications"
    ]
  },
  {
    id: 4,
    title: "African Energy Grid Optimizer",
    description: "Create a smart energy distribution system for African communities with solar integration and load balancing.",
    difficulty: "Advanced",
    estimatedTime: "5 weeks",
    technologies: ["Python", "Data Science", "Algorithms", "Visualization"],
    skills: ["Algorithm Design", "Data Visualization", "Mathematical Modeling", "Energy Systems"],
    category: "Energy Technology",
    languages: ["python"],
    requirements: [
      "Solar energy prediction algorithms",
      "Load balancing optimization",
      "Community energy sharing protocols",
      "Real-time monitoring dashboard",
      "Cost optimization calculations"
    ],
    learningObjectives: [
      "Advanced algorithm development",
      "Mathematical modeling in Python",
      "Data visualization techniques",
      "Understanding renewable energy systems"
    ]
  },
  {
    id: 5,
    title: "African Healthcare Data System",
    description: "Build a patient management and health analytics system designed for African healthcare challenges.",
    difficulty: "Advanced",
    estimatedTime: "6 weeks",
    technologies: ["Python", "Data Security", "Analytics", "Database Design"],
    skills: ["Data Security", "Healthcare Systems", "Analytics", "Database Management"],
    category: "HealthTech",
    languages: ["python"],
    requirements: [
      "Secure patient data management",
      "Health analytics and reporting",
      "Vaccination tracking system",
      "Disease outbreak monitoring",
      "Telemedicine integration"
    ],
    learningObjectives: [
      "Learn data security best practices",
      "Understand healthcare data standards",
      "Master advanced data analytics",
      "Develop sensitivity to healthcare privacy"
    ]
  },
  {
    id: 6,
    title: "African Education Management Platform",
    description: "Create a comprehensive education management system for African schools with offline capabilities and multi-language support.",
    difficulty: "Intermediate",
    estimatedTime: "4 weeks",
    technologies: ["Python", "GUI Development", "Data Management", "Offline Systems"],
    skills: ["GUI Development", "Database Design", "Offline Systems", "Educational Technology"],
    category: "EdTech",
    languages: ["python"],
    requirements: [
      "Student and teacher management",
      "Grade tracking and analytics",
      "Offline functionality for rural areas",
      "Multi-language interface",
      "Parent communication system"
    ],
    learningObjectives: [
      "Master GUI development with Python",
      "Learn offline-first application design",
      "Understand educational data management",
      "Practice building accessible interfaces"
    ]
  },
  {
    id: 7,
    title: "African Wildlife Conservation Tracker",
    description: "Build a wildlife tracking and conservation management system for African national parks and reserves.",
    difficulty: "Intermediate",
    estimatedTime: "3 weeks",
    technologies: ["Python", "GPS Data", "Image Processing", "Conservation Science"],
    skills: ["GPS Data Processing", "Image Analysis", "Conservation Technology", "Data Visualization"],
    category: "Conservation Technology",
    languages: ["python"],
    requirements: [
      "Animal tracking and identification",
      "Population monitoring algorithms",
      "Poaching alert systems",
      "Habitat analysis tools",
      "Conservation reporting dashboard"
    ],
    learningObjectives: [
      "Learn GPS data processing",
      "Understand conservation science principles",
      "Practice image processing techniques",
      "Develop environmental awareness through technology"
    ]
  },
  {
    id: 8,
    title: "African Startup Ecosystem Analyzer",
    description: "Create a comprehensive analysis tool for the African startup ecosystem with funding tracking and market analysis.",
    difficulty: "Advanced",
    estimatedTime: "5 weeks",
    technologies: ["Python", "Web Scraping", "Data Analysis", "Machine Learning"],
    skills: ["Web Scraping", "Data Analysis", "Machine Learning", "Business Intelligence"],
    category: "Business Technology",
    languages: ["python"],
    requirements: [
      "Startup data collection and analysis",
      "Funding trend tracking",
      "Market opportunity identification",
      "Investor network mapping",
      "Success prediction models"
    ],
    learningObjectives: [
      "Master web scraping techniques",
      "Learn business data analysis",
      "Understand machine learning applications",
      "Develop insights into African business landscape"
    ]
  },
  {
    id: 9,
    title: "African Transportation Network Optimizer",
    description: "Build a transportation planning system for African cities with route optimization and traffic analysis.",
    difficulty: "Advanced",
    estimatedTime: "6 weeks",
    technologies: ["Python", "Graph Algorithms", "Optimization", "Geographic Data"],
    skills: ["Graph Algorithms", "Optimization Techniques", "Geographic Information Systems", "Urban Planning"],
    category: "Transportation Technology",
    languages: ["python"],
    requirements: [
      "Route optimization algorithms",
      "Traffic flow analysis",
      "Public transport planning",
      "Infrastructure cost modeling",
      "Accessibility analysis for rural areas"
    ],
    learningObjectives: [
      "Master graph algorithms and optimization",
      "Learn geographic data processing",
      "Understand urban planning principles",
      "Practice solving complex logistical problems"
    ]
  },
  {
    id: 10,
    title: "African Microfinance Management System",
    description: "Create a complete microfinance platform for African communities with group lending and mobile integration.",
    difficulty: "Intermediate",
    estimatedTime: "4 weeks",
    technologies: ["Python", "Financial Calculations", "Group Management", "Risk Assessment"],
    skills: ["Financial Modeling", "Risk Assessment", "Group Dynamics", "Community Banking"],
    category: "Financial Technology",
    languages: ["python"],
    requirements: [
      "Group lending management",
      "Credit scoring algorithms",
      "Repayment tracking system",
      "Mobile money integration",
      "Community impact assessment"
    ],
    learningObjectives: [
      "Learn financial modeling techniques",
      "Understand microfinance principles",
      "Master group management algorithms",
      "Develop skills in community-centered technology"
    ]
  }
];