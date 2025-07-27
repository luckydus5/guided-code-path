// Lesson-based learning structure that connects projects to specific languages

export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  type: "theory" | "practice" | "project";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  concepts: string[];
  prerequisites?: string[];
  projectId?: string; // Links to projects from projects.ts
}

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  estimatedTime: string;
  objectives: string[];
}

export interface LearningPath {
  id: string;
  name: string;
  description: string;
  language: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  modules: LearningModule[];
  totalLessons: number;
  totalProjects: number;
  estimatedTime: string;
}

// Web Development Fundamentals Path (HTML, CSS, JavaScript)
export const webFundamentalsPath: LearningPath = {
  id: "web-fundamentals",
  name: "Web Development Fundamentals",
  description: "Master HTML, CSS, and JavaScript through hands-on projects",
  language: "html",
  difficulty: "Beginner",
  totalLessons: 24,
  totalProjects: 8,
  estimatedTime: "6-8 weeks",
  modules: [
    {
      id: "html-basics",
      title: "HTML Fundamentals",
      description: "Learn the building blocks of the web",
      estimatedTime: "1-2 weeks",
      objectives: [
        "Understand HTML structure and syntax",
        "Master semantic HTML elements",
        "Build accessible web pages"
      ],
      lessons: [
        {
          id: "html-intro",
          title: "Introduction to HTML",
          description: "What is HTML and how does it work?",
          duration: "30 minutes",
          type: "theory",
          difficulty: "Beginner",
          concepts: ["HTML tags", "Document structure", "Elements vs attributes"]
        },
        {
          id: "html-structure",
          title: "HTML Document Structure",
          description: "Learn about DOCTYPE, head, and body elements",
          duration: "45 minutes",
          type: "practice",
          difficulty: "Beginner",
          concepts: ["DOCTYPE", "head element", "body element", "meta tags"],
          prerequisites: ["html-intro"]
        },
        {
          id: "semantic-html",
          title: "Semantic HTML Elements",
          description: "Using meaningful HTML elements for better structure",
          duration: "60 minutes",
          type: "practice",
          difficulty: "Beginner",
          concepts: ["header", "nav", "main", "article", "section", "footer"],
          prerequisites: ["html-structure"]
        },
        {
          id: "html-project-1",
          title: "Project: Personal Portfolio Page",
          description: "Build your first HTML page using semantic elements",
          duration: "2-3 hours",
          type: "project",
          difficulty: "Beginner",
          concepts: ["semantic HTML", "page structure", "content organization"],
          prerequisites: ["semantic-html"],
          projectId: "personal-portfolio-html" // Links to projects.ts
        }
      ]
    },
    {
      id: "css-styling",
      title: "CSS Styling & Layout",
      description: "Style your HTML with CSS",
      estimatedTime: "2-3 weeks",
      objectives: [
        "Master CSS selectors and properties",
        "Understand the box model",
        "Create responsive layouts with Flexbox and Grid"
      ],
      lessons: [
        {
          id: "css-intro",
          title: "Introduction to CSS",
          description: "Styling HTML elements with CSS",
          duration: "45 minutes",
          type: "theory",
          difficulty: "Beginner",
          concepts: ["CSS syntax", "Selectors", "Properties and values"]
        },
        {
          id: "css-box-model",
          title: "CSS Box Model",
          description: "Understanding margins, padding, borders, and content",
          duration: "60 minutes",
          type: "practice",
          difficulty: "Beginner",
          concepts: ["margin", "padding", "border", "content", "box-sizing"],
          prerequisites: ["css-intro"]
        },
        {
          id: "flexbox-layout",
          title: "Flexbox Layout",
          description: "Create flexible layouts with CSS Flexbox",
          duration: "90 minutes",
          type: "practice",
          difficulty: "Intermediate",
          concepts: ["display: flex", "flex-direction", "justify-content", "align-items"],
          prerequisites: ["css-box-model"]
        },
        {
          id: "css-project-1",
          title: "Project: Responsive Card Layout",
          description: "Build a responsive card layout using Flexbox",
          duration: "3-4 hours",
          type: "project",
          difficulty: "Intermediate",
          concepts: ["flexbox", "responsive design", "media queries"],
          prerequisites: ["flexbox-layout"],
          projectId: "responsive-card-layout" // Links to projects.ts
        }
      ]
    },
    {
      id: "javascript-basics",
      title: "JavaScript Programming",
      description: "Add interactivity with JavaScript",
      estimatedTime: "3-4 weeks",
      objectives: [
        "Understand JavaScript fundamentals",
        "Manipulate the DOM",
        "Handle user events"
      ],
      lessons: [
        {
          id: "js-intro",
          title: "JavaScript Fundamentals",
          description: "Variables, data types, and basic operations",
          duration: "60 minutes",
          type: "theory",
          difficulty: "Beginner",
          concepts: ["variables", "data types", "operators", "functions"]
        },
        {
          id: "dom-manipulation",
          title: "DOM Manipulation",
          description: "Selecting and modifying HTML elements with JavaScript",
          duration: "90 minutes",
          type: "practice",
          difficulty: "Intermediate",
          concepts: ["querySelector", "innerHTML", "addEventListener", "event handling"],
          prerequisites: ["js-intro"]
        },
        {
          id: "js-project-calculator",
          title: "Project: Interactive Calculator",
          description: "Build a fully functional calculator with JavaScript",
          duration: "4-6 hours",
          type: "project",
          difficulty: "Intermediate",
          concepts: ["event handling", "DOM manipulation", "functions", "conditionals"],
          prerequisites: ["dom-manipulation"],
          projectId: "basic-calculator" // Links to projects.ts
        }
      ]
    }
  ]
};

// Python Programming Mastery Path
export const pythonMasteryPath: LearningPath = {
  id: "python-mastery",
  name: "Python Programming Mastery",
  description: "From basics to advanced Python with real-world projects",
  language: "python",
  difficulty: "Beginner",
  totalLessons: 32,
  totalProjects: 12,
  estimatedTime: "8-10 weeks",
  modules: [
    {
      id: "python-fundamentals",
      title: "Python Fundamentals",
      description: "Learn Python basics and syntax",
      estimatedTime: "2-3 weeks",
      objectives: [
        "Understand Python syntax and data types",
        "Master control structures and functions",
        "Work with data structures"
      ],
      lessons: [
        {
          id: "python-intro",
          title: "Introduction to Python",
          description: "Setting up Python and understanding the basics",
          duration: "45 minutes",
          type: "theory",
          difficulty: "Beginner",
          concepts: ["Python installation", "REPL", "Basic syntax", "Print statements"]
        },
        {
          id: "python-variables",
          title: "Variables and Data Types",
          description: "Working with different data types in Python",
          duration: "60 minutes",
          type: "practice",
          difficulty: "Beginner",
          concepts: ["int", "float", "string", "boolean", "type conversion"],
          prerequisites: ["python-intro"]
        },
        {
          id: "python-control-flow",
          title: "Control Flow",
          description: "Conditionals and loops in Python",
          duration: "90 minutes",
          type: "practice",
          difficulty: "Beginner",
          concepts: ["if statements", "for loops", "while loops", "break and continue"],
          prerequisites: ["python-variables"]
        },
        {
          id: "python-project-1",
          title: "Project: Number Guessing Game",
          description: "Build an interactive number guessing game",
          duration: "2-3 hours",
          type: "project",
          difficulty: "Beginner",
          concepts: ["random module", "input/output", "loops", "conditionals"],
          prerequisites: ["python-control-flow"],
          projectId: "number-guessing-game" // Links to projects.ts
        }
      ]
    },
    {
      id: "python-data-structures",
      title: "Data Structures & Functions",
      description: "Master Python's built-in data structures",
      estimatedTime: "2-3 weeks",
      objectives: [
        "Work with lists, dictionaries, and sets",
        "Create and use functions effectively",
        "Understand scope and modules"
      ],
      lessons: [
        {
          id: "python-lists",
          title: "Lists and List Methods",
          description: "Working with Python lists",
          duration: "75 minutes",
          type: "practice",
          difficulty: "Beginner",
          concepts: ["list creation", "indexing", "slicing", "list methods"],
          prerequisites: ["python-control-flow"]
        },
        {
          id: "python-functions",
          title: "Functions and Parameters",
          description: "Creating reusable code with functions",
          duration: "90 minutes",
          type: "practice",
          difficulty: "Intermediate",
          concepts: ["function definition", "parameters", "return values", "scope"],
          prerequisites: ["python-lists"]
        },
        {
          id: "python-project-todo",
          title: "Project: Todo List Manager",
          description: "Build a command-line todo list application",
          duration: "4-5 hours",
          type: "project",
          difficulty: "Intermediate",
          concepts: ["lists", "functions", "file I/O", "user input"],
          prerequisites: ["python-functions"],
          projectId: "todo-list-cli" // Links to projects.ts
        }
      ]
    }
  ]
};

// JavaScript Advanced Path
export const javascriptAdvancedPath: LearningPath = {
  id: "javascript-advanced",
  name: "Advanced JavaScript & React",
  description: "Build modern web applications with React and advanced JS",
  language: "javascript",
  difficulty: "Intermediate",
  totalLessons: 40,
  totalProjects: 15,
  estimatedTime: "10-12 weeks",
  modules: [
    {
      id: "es6-features",
      title: "Modern JavaScript (ES6+)",
      description: "Master modern JavaScript features",
      estimatedTime: "2-3 weeks",
      objectives: [
        "Use arrow functions and destructuring",
        "Understand promises and async/await",
        "Work with modules and classes"
      ],
      lessons: [
        {
          id: "arrow-functions",
          title: "Arrow Functions & Template Literals",
          description: "Modern function syntax and string interpolation",
          duration: "60 minutes",
          type: "practice",
          difficulty: "Intermediate",
          concepts: ["arrow functions", "template literals", "scope differences"]
        },
        {
          id: "destructuring",
          title: "Destructuring & Spread Operator",
          description: "Extract values and spread arrays/objects",
          duration: "75 minutes",
          type: "practice",
          difficulty: "Intermediate",
          concepts: ["array destructuring", "object destructuring", "spread operator"],
          prerequisites: ["arrow-functions"]
        },
        {
          id: "js-advanced-project",
          title: "Project: Weather Dashboard",
          description: "Build a weather app using modern JavaScript and APIs",
          duration: "6-8 hours",
          type: "project",
          difficulty: "Advanced",
          concepts: ["fetch API", "async/await", "destructuring", "DOM manipulation"],
          prerequisites: ["destructuring"],
          projectId: "weather-dashboard" // Links to projects.ts
        }
      ]
    }
  ]
};

export const allLearningPaths: LearningPath[] = [
  webFundamentalsPath,
  pythonMasteryPath,
  javascriptAdvancedPath
];

// Helper functions to connect projects with learning paths
export function getLearningPathByLanguage(language: string): LearningPath | undefined {
  const languageMap: Record<string, string> = {
    'html': 'web-fundamentals',
    'css': 'web-fundamentals', 
    'javascript': 'javascript-advanced',
    'python': 'python-mastery'
  };
  
  const pathId = languageMap[language];
  return allLearningPaths.find(path => path.id === pathId);
}

export function getProjectLessons(projectId: string): Lesson[] {
  const allLessons: Lesson[] = [];
  
  allLearningPaths.forEach(path => {
    path.modules.forEach(module => {
      module.lessons.forEach(lesson => {
        if (lesson.projectId === projectId) {
          allLessons.push(lesson);
        }
      });
    });
  });
  
  return allLessons;
}

export function getNextLesson(pathId: string, currentLessonId?: string): Lesson | undefined {
  const path = allLearningPaths.find(p => p.id === pathId);
  if (!path) return undefined;
  
  const allLessons: Lesson[] = [];
  path.modules.forEach(module => {
    allLessons.push(...module.lessons);
  });
  
  if (!currentLessonId) {
    return allLessons[0]; // Return first lesson
  }
  
  const currentIndex = allLessons.findIndex(lesson => lesson.id === currentLessonId);
  return allLessons[currentIndex + 1];
}

export function getLessonProgress(pathId: string, completedLessons: string[]): number {
  const path = allLearningPaths.find(p => p.id === pathId);
  if (!path) return 0;
  
  return Math.round((completedLessons.length / path.totalLessons) * 100);
}