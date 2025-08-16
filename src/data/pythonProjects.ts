export interface PythonProject {
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

export const PYTHON_PROJECTS: PythonProject[] = [
  // ================ BEGINNER PROJECTS ================
  {
    id: 1,
    title: "Simple Calculator",
    description: "Build a comprehensive calculator with basic arithmetic operations, memory functions, and equation history.",
    difficulty: "Beginner",
    estimatedTime: "3 days",
    technologies: ["Python", "Basic Operations", "User Input"],
    skills: ["Variables", "Functions", "Conditionals", "Loops"],
    category: "Fundamentals",
    languages: ["python"],
    requirements: [
      "Addition, subtraction, multiplication, division",
      "Memory store and recall functions",
      "Calculation history",
      "Error handling for invalid inputs"
    ],
    learningObjectives: [
      "Master basic Python syntax",
      "Learn function creation and usage",
      "Practice input validation",
      "Understand error handling basics"
    ],
    initialFiles: [
      {
        id: '1',
        name: 'calculator.py',
        content: `# Simple Calculator - Python Fundamentals Project
# Build a comprehensive calculator with memory and history

class Calculator:
    def __init__(self):
        self.history = []
        self.memory = 0
    
    def add(self, a, b):
        result = a + b
        self.history.append(f"{a} + {b} = {result}")
        return result
    
    def subtract(self, a, b):
        result = a - b
        self.history.append(f"{a} - {b} = {result}")
        return result
    
    def multiply(self, a, b):
        result = a * b
        self.history.append(f"{a} × {b} = {result}")
        return result
    
    def divide(self, a, b):
        if b == 0:
            raise ValueError("Cannot divide by zero!")
        result = a / b
        self.history.append(f"{a} ÷ {b} = {result}")
        return result
    
    def power(self, a, b):
        result = a ** b
        self.history.append(f"{a} ^ {b} = {result}")
        return result
    
    def store_memory(self, value):
        self.memory = value
        print(f"💾 Stored {value} in memory")
    
    def recall_memory(self):
        print(f"💾 Memory recall: {self.memory}")
        return self.memory
    
    def clear_memory(self):
        self.memory = 0
        print("💾 Memory cleared")
    
    def show_history(self):
        if not self.history:
            print("📝 No calculation history")
            return
        
        print("\\n📝 Calculation History:")
        print("-" * 30)
        for i, calc in enumerate(self.history, 1):
            print(f"{i}. {calc}")
    
    def clear_history(self):
        self.history.clear()
        print("🗑️ History cleared")

def main():
    calc = Calculator()
    print("🧮 Advanced Python Calculator")
    print("=" * 40)
    
    while True:
        print("\\n📋 Operations:")
        print("1. ➕ Addition")
        print("2. ➖ Subtraction")
        print("3. ✖️ Multiplication")
        print("4. ➗ Division")
        print("5. 🔢 Power")
        print("6. 💾 Memory Store")
        print("7. 💾 Memory Recall")
        print("8. 💾 Memory Clear")
        print("9. 📝 Show History")
        print("10. 🗑️ Clear History")
        print("11. 🚪 Exit")
        
        try:
            choice = input("\\nSelect operation (1-11): ")
            
            if choice in ["1", "2", "3", "4", "5"]:
                num1 = float(input("Enter first number: "))
                num2 = float(input("Enter second number: "))
                
                if choice == "1":
                    result = calc.add(num1, num2)
                elif choice == "2":
                    result = calc.subtract(num1, num2)
                elif choice == "3":
                    result = calc.multiply(num1, num2)
                elif choice == "4":
                    result = calc.divide(num1, num2)
                elif choice == "5":
                    result = calc.power(num1, num2)
                
                print(f"✅ Result: {result}")
                
            elif choice == "6":
                value = float(input("Enter value to store: "))
                calc.store_memory(value)
            elif choice == "7":
                calc.recall_memory()
            elif choice == "8":
                calc.clear_memory()
            elif choice == "9":
                calc.show_history()
            elif choice == "10":
                calc.clear_history()
            elif choice == "11":
                print("👋 Thank you for using the calculator!")
                break
            else:
                print("❌ Invalid choice. Please try again.")
                
        except ValueError as e:
            print(f"❌ Error: {e}")
        except Exception as e:
            print(f"❌ Unexpected error: {e}")

if __name__ == "__main__":
    main()`,
        type: 'file'
      }
    ]
  },
  {
    id: 2,
    title: "Password Generator & Manager",
    description: "Create a secure password generator and basic password manager with encryption and strength checking.",
    difficulty: "Beginner",
    estimatedTime: "1 week",
    technologies: ["Python", "Random", "String Manipulation", "File I/O"],
    skills: ["String Operations", "Random Generation", "File Handling", "Security Basics"],
    category: "Security",
    languages: ["python"],
    requirements: [
      "Generate passwords with customizable length and character sets",
      "Check password strength and provide recommendations",
      "Store passwords securely with basic encryption",
      "Password retrieval with master password"
    ],
    learningObjectives: [
      "Learn string manipulation and random generation",
      "Understand basic security principles",
      "Practice file operations and data persistence",
      "Master user input validation"
    ]
  },
  {
    id: 3,
    title: "Personal Finance Tracker",
    description: "Build a comprehensive personal finance management system with expense tracking, budgeting, and financial goal setting.",
    difficulty: "Beginner",
    estimatedTime: "1.5 weeks",
    technologies: ["Python", "File I/O", "Data Analysis", "Visualization"],
    skills: ["Data Structures", "File Operations", "Basic Statistics", "Data Visualization"],
    category: "Finance",
    languages: ["python"],
    requirements: [
      "Income and expense tracking with categories",
      "Monthly budget creation and monitoring",
      "Financial goal setting and progress tracking",
      "Spending analytics and reporting"
    ],
    learningObjectives: [
      "Master data structures (lists, dictionaries)",
      "Learn file-based data persistence",
      "Practice data analysis and calculations",
      "Understand personal finance concepts"
    ]
  },
  {
    id: 4,
    title: "Text Adventure Game",
    description: "Create an interactive text-based adventure game with inventory system, character progression, and multiple story paths.",
    difficulty: "Beginner",
    estimatedTime: "2 weeks",
    technologies: ["Python", "Object-Oriented Programming", "Game Logic"],
    skills: ["OOP", "Game Development", "Story Design", "State Management"],
    category: "Game Development",
    languages: ["python"],
    requirements: [
      "Multiple rooms and locations to explore",
      "Inventory system with collectible items",
      "Character stats and progression",
      "Multiple story paths and endings"
    ],
    learningObjectives: [
      "Master object-oriented programming concepts",
      "Learn game state management",
      "Practice creative problem solving",
      "Understand game design principles"
    ]
  },
  {
    id: 5,
    title: "Contact Book with Search & Backup",
    description: "Build a comprehensive contact management system with advanced search, categorization, and data backup features.",
    difficulty: "Beginner",
    estimatedTime: "1 week",
    technologies: ["Python", "File I/O", "Data Structures", "Search Algorithms"],
    skills: ["Data Management", "Search Algorithms", "File Operations", "Data Validation"],
    category: "Productivity",
    languages: ["python"],
    requirements: [
      "Add, edit, delete contacts with detailed information",
      "Advanced search by name, phone, email, or category",
      "Contact categorization and grouping",
      "Data backup and restore functionality"
    ],
    learningObjectives: [
      "Learn data management best practices",
      "Master search algorithms and filtering",
      "Practice data validation and error handling",
      "Understand backup and recovery systems"
    ]
  },
  
  // ================ INTERMEDIATE PROJECTS ================
  {
    id: 6,
    title: "Weather Data Analyzer with API Integration",
    description: "Create a comprehensive weather analysis system that fetches real-time data, stores historical information, and provides detailed forecasts and trends.",
    difficulty: "Intermediate",
    estimatedTime: "2 weeks",
    technologies: ["Python", "APIs", "JSON", "Data Analysis", "Visualization"],
    skills: ["API Integration", "Data Processing", "Error Handling", "Data Visualization"],
    category: "Data Science",
    languages: ["python"],
    requirements: [
      "Real-time weather data fetching from APIs",
      "Historical weather data storage and analysis",
      "Weather trend visualization and forecasting",
      "Multiple location support with comparison features"
    ],
    learningObjectives: [
      "Master API integration and HTTP requests",
      "Learn data processing and analysis techniques",
      "Practice error handling and data validation",
      "Understand weather data patterns and forecasting"
    ]
  },
  {
    id: 7,
    title: "Inventory Management System",
    description: "Build a complete inventory management system for small businesses with product tracking, supplier management, and automated reorder alerts.",
    difficulty: "Intermediate",
    estimatedTime: "3 weeks",
    technologies: ["Python", "Database", "GUI", "Business Logic"],
    skills: ["Database Design", "GUI Development", "Business Logic", "Report Generation"],
    category: "Business",
    languages: ["python"],
    requirements: [
      "Product catalog with detailed information",
      "Stock level tracking with automatic alerts",
      "Supplier management and purchase orders",
      "Sales tracking and profit analysis"
    ],
    learningObjectives: [
      "Learn database design and operations",
      "Master GUI development with tkinter",
      "Understand business logic implementation",
      "Practice report generation and analytics"
    ]
  },
  {
    id: 8,
    title: "Web Scraper and Data Mining Tool",
    description: "Create a sophisticated web scraping tool with data cleaning, analysis, and automated reporting capabilities for various websites.",
    difficulty: "Intermediate",
    estimatedTime: "2.5 weeks",
    technologies: ["Python", "Web Scraping", "Data Processing", "Automation"],
    skills: ["Web Scraping", "Data Cleaning", "Pattern Recognition", "Automation"],
    category: "Data Mining",
    languages: ["python"],
    requirements: [
      "Multi-website scraping with configurable targets",
      "Data cleaning and normalization pipelines",
      "Automated data quality checks and validation",
      "Scheduled scraping with email notifications"
    ],
    learningObjectives: [
      "Master web scraping libraries and techniques",
      "Learn data cleaning and preprocessing",
      "Practice automation and scheduling",
      "Understand ethical scraping practices"
    ]
  },
  {
    id: 9,
    title: "AI Chatbot with Natural Language Processing",
    description: "Build an intelligent chatbot using natural language processing techniques, with learning capabilities and multiple conversation contexts.",
    difficulty: "Intermediate",
    estimatedTime: "3 weeks",
    technologies: ["Python", "NLP", "Machine Learning", "AI"],
    skills: ["Natural Language Processing", "Machine Learning", "Pattern Recognition", "AI Development"],
    category: "Artificial Intelligence",
    languages: ["python"],
    requirements: [
      "Natural language understanding and response generation",
      "Context-aware conversations with memory",
      "Learning from user interactions",
      "Multiple personality modes and specialized knowledge domains"
    ],
    learningObjectives: [
      "Learn natural language processing fundamentals",
      "Understand machine learning applications",
      "Practice AI development techniques",
      "Master conversation flow design"
    ]
  },
  {
    id: 10,
    title: "Stock Market Analysis & Portfolio Tracker",
    description: "Develop a comprehensive stock market analysis tool with real-time data, portfolio tracking, and automated trading signals.",
    difficulty: "Intermediate",
    estimatedTime: "3 weeks",
    technologies: ["Python", "Financial APIs", "Data Analysis", "Visualization"],
    skills: ["Financial Analysis", "API Integration", "Data Visualization", "Statistical Analysis"],
    category: "Finance",
    languages: ["python"],
    requirements: [
      "Real-time stock price monitoring and alerts",
      "Portfolio performance tracking and analysis",
      "Technical analysis with trading indicators",
      "Risk assessment and diversification analysis"
    ],
    learningObjectives: [
      "Learn financial data analysis techniques",
      "Master statistical analysis and indicators",
      "Understand portfolio management principles",
      "Practice real-time data processing"
    ]
  },
  {
    id: 11,
    title: "Social Media Analytics Dashboard",
    description: "Create a comprehensive social media analytics platform that tracks engagement, analyzes trends, and generates detailed reports.",
    difficulty: "Intermediate",
    estimatedTime: "3.5 weeks",
    technologies: ["Python", "Social APIs", "Data Analysis", "Dashboard"],
    skills: ["API Integration", "Data Analysis", "Visualization", "Social Media Analytics"],
    category: "Analytics",
    languages: ["python"],
    requirements: [
      "Multi-platform social media data collection",
      "Engagement metrics and trend analysis",
      "Sentiment analysis and audience insights",
      "Automated reporting and visualization dashboard"
    ],
    learningObjectives: [
      "Learn social media API integration",
      "Master sentiment analysis techniques",
      "Practice data visualization and dashboards",
      "Understand social media metrics and KPIs"
    ]
  },
  
  // ================ ADVANCED PROJECTS ================
  {
    id: 12,
    title: "Distributed Task Scheduler with Microservices",
    description: "Build a scalable distributed task scheduling system using microservices architecture, with load balancing and fault tolerance.",
    difficulty: "Advanced",
    estimatedTime: "4 weeks",
    technologies: ["Python", "Microservices", "Redis", "Docker", "APIs"],
    skills: ["Distributed Systems", "Microservices", "Load Balancing", "System Design"],
    category: "System Architecture",
    languages: ["python"],
    requirements: [
      "Microservices architecture with multiple worker nodes",
      "Task queue management with priority scheduling",
      "Load balancing and fault tolerance mechanisms",
      "Monitoring dashboard with real-time metrics"
    ],
    learningObjectives: [
      "Master distributed systems design",
      "Learn microservices architecture patterns",
      "Understand load balancing and scaling",
      "Practice system monitoring and observability"
    ]
  },
  {
    id: 13,
    title: "Machine Learning Pipeline for Predictive Analytics",
    description: "Create a complete machine learning pipeline with data preprocessing, model training, evaluation, and automated deployment for business forecasting.",
    difficulty: "Advanced",
    estimatedTime: "5 weeks",
    technologies: ["Python", "Machine Learning", "Data Science", "MLOps"],
    skills: ["Machine Learning", "Data Science", "Model Deployment", "MLOps"],
    category: "Machine Learning",
    languages: ["python"],
    requirements: [
      "Automated data preprocessing and feature engineering",
      "Multiple ML algorithm comparison and selection",
      "Model validation and performance monitoring",
      "Automated model deployment and A/B testing"
    ],
    learningObjectives: [
      "Master end-to-end ML pipeline development",
      "Learn advanced data science techniques",
      "Understand model deployment and monitoring",
      "Practice MLOps and production ML systems"
    ]
  },
  {
    id: 14,
    title: "Real-time Data Processing Engine",
    description: "Build a high-performance real-time data processing engine capable of handling streaming data from multiple sources with complex event processing.",
    difficulty: "Advanced",
    estimatedTime: "6 weeks",
    technologies: ["Python", "Streaming", "Big Data", "Event Processing"],
    skills: ["Stream Processing", "Big Data", "Performance Optimization", "Event-Driven Architecture"],
    category: "Big Data",
    languages: ["python"],
    requirements: [
      "Multi-source data ingestion with real-time processing",
      "Complex event processing with pattern detection",
      "Scalable architecture with horizontal scaling",
      "Real-time analytics dashboard with alerting"
    ],
    learningObjectives: [
      "Master stream processing concepts and implementation",
      "Learn big data processing techniques",
      "Understand performance optimization strategies",
      "Practice building scalable data systems"
    ]
  },
  {
    id: 15,
    title: "Blockchain and Cryptocurrency Trading Bot",
    description: "Develop a sophisticated cryptocurrency trading bot with blockchain integration, advanced trading strategies, and risk management.",
    difficulty: "Advanced",
    estimatedTime: "5 weeks",
    technologies: ["Python", "Blockchain", "Trading APIs", "Cryptography"],
    skills: ["Blockchain Development", "Algorithmic Trading", "Risk Management", "Cryptography"],
    category: "Blockchain",
    languages: ["python"],
    requirements: [
      "Blockchain integration with multiple cryptocurrency exchanges",
      "Advanced trading algorithms with technical analysis",
      "Risk management and portfolio optimization",
      "Real-time market monitoring with automated execution"
    ],
    learningObjectives: [
      "Learn blockchain technology and implementation",
      "Master algorithmic trading strategies",
      "Understand financial risk management",
      "Practice cryptographic security implementation"
    ]
  },
  {
    id: 16,
    title: "Computer Vision and Image Recognition System",
    description: "Create an advanced computer vision system with object detection, facial recognition, and automated image classification for security applications.",
    difficulty: "Advanced",
    estimatedTime: "4 weeks",
    technologies: ["Python", "Computer Vision", "Deep Learning", "OpenCV"],
    skills: ["Computer Vision", "Deep Learning", "Image Processing", "AI Development"],
    category: "Computer Vision",
    languages: ["python"],
    requirements: [
      "Real-time object detection and tracking",
      "Facial recognition with identity management",
      "Automated image classification and tagging",
      "Security monitoring with alert systems"
    ],
    learningObjectives: [
      "Master computer vision techniques and algorithms",
      "Learn deep learning for image recognition",
      "Understand real-time processing optimization",
      "Practice AI model training and deployment"
    ]
  },
  {
    id: 17,
    title: "Cybersecurity Monitoring and Threat Detection",
    description: "Build a comprehensive cybersecurity monitoring system with intrusion detection, threat analysis, and automated response capabilities.",
    difficulty: "Advanced",
    estimatedTime: "5 weeks",
    technologies: ["Python", "Network Security", "Machine Learning", "Threat Intelligence"],
    skills: ["Cybersecurity", "Threat Detection", "Network Analysis", "Security Automation"],
    category: "Cybersecurity",
    languages: ["python"],
    requirements: [
      "Network traffic monitoring and analysis",
      "Intrusion detection with machine learning",
      "Threat intelligence integration and analysis",
      "Automated incident response and reporting"
    ],
    learningObjectives: [
      "Learn cybersecurity monitoring techniques",
      "Master threat detection algorithms",
      "Understand network security principles",
      "Practice security automation and response"
    ]
  },
  {
    id: 18,
    title: "Enterprise Data Warehouse and ETL System",
    description: "Develop a scalable enterprise data warehouse with complex ETL pipelines, data quality monitoring, and business intelligence capabilities.",
    difficulty: "Advanced",
    estimatedTime: "6 weeks",
    technologies: ["Python", "Data Warehousing", "ETL", "Big Data", "BI"],
    skills: ["Data Warehousing", "ETL Development", "Data Quality", "Business Intelligence"],
    category: "Data Engineering",
    languages: ["python"],
    requirements: [
      "Multi-source data integration with complex transformations",
      "Data quality monitoring and validation frameworks",
      "Scalable data warehouse architecture",
      "Business intelligence dashboard and reporting"
    ],
    learningObjectives: [
      "Master enterprise data architecture design",
      "Learn advanced ETL development techniques",
      "Understand data quality and governance",
      "Practice building scalable data systems"
    ]
  }
];