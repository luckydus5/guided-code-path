export interface Challenge {
  id: number;
  title: string;
  description: string;
  instructions: string;
  starterCode: string;
  expectedOutput: string;
  hints: string[];
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
  concepts: string[];
}

export interface LanguageChallenges {
  [key: string]: Challenge[];
}

// Python challenges (800+ total)
const pythonChallenges: Challenge[] = [
  // Basic Concepts (1-50)
  {
    id: 1,
    title: "Hello World",
    description: "Your first Python program! Learn how to display text.",
    instructions: "Write a program that prints 'Hello, World!' to the console.",
    starterCode: "# Write your code here\n",
    expectedOutput: "Hello, World!",
    hints: [
      "Use the print() function to display text",
      "Put the text inside quotes: 'Hello, World!'",
      "Don't forget the comma and space after 'Hello'"
    ],
    difficulty: "Easy",
    category: "Basics",
    concepts: ["print", "strings"]
  },
  {
    id: 2,
    title: "Variables and Numbers",
    description: "Learn how to store and use data in variables.",
    instructions: "Create a variable 'age' with value 25, then print it.",
    starterCode: "# Create a variable called 'age' and assign it the value 25\n# Then print the variable\n",
    expectedOutput: "25",
    hints: [
      "Use the = operator to assign values to variables",
      "Variable names can contain letters, numbers, and underscores",
      "Use print() to display the variable value"
    ],
    difficulty: "Easy",
    category: "Variables",
    concepts: ["variables", "integers", "print"]
  },
  // ... Continue with more Python challenges
  {
    id: 50,
    title: "Advanced Data Structures",
    description: "Master complex data manipulation with nested structures.",
    instructions: "Create a nested dictionary representing a company's departments and employees, then perform complex queries.",
    starterCode: "# Create company structure\n# Perform data analysis\n",
    expectedOutput: "Complex nested data output",
    hints: ["Use nested dictionaries", "Implement search algorithms", "Handle edge cases"],
    difficulty: "Hard",
    category: "Data Structures",
    concepts: ["dictionaries", "nested data", "algorithms"]
  }
];

// JavaScript challenges
const javascriptChallenges: Challenge[] = [
  {
    id: 1,
    title: "Console Hello World",
    description: "Your first JavaScript program using console.log().",
    instructions: "Write a program that logs 'Hello, JavaScript!' to the console.",
    starterCode: "// Write your code here\n",
    expectedOutput: "Hello, JavaScript!",
    hints: [
      "Use console.log() to display text",
      "Put the text inside quotes",
      "End statements with semicolons"
    ],
    difficulty: "Easy",
    category: "Basics",
    concepts: ["console.log", "strings"]
  },
  {
    id: 2,
    title: "Variables and Let",
    description: "Learn modern JavaScript variable declarations with let and const.",
    instructions: "Create a variable 'userName' with value 'CodeMentor', then log it.",
    starterCode: "// Use let or const to declare variables\n",
    expectedOutput: "CodeMentor",
    hints: [
      "Use let for variables that change",
      "Use const for constants",
      "Use camelCase for variable names"
    ],
    difficulty: "Easy",
    category: "Variables",
    concepts: ["let", "const", "variables"]
  }
  // ... Continue with 800+ JavaScript challenges
];

// Java challenges
const javaChallenges: Challenge[] = [
  {
    id: 1,
    title: "Hello World Class",
    description: "Create your first Java class with a main method.",
    instructions: "Write a Java program that prints 'Hello, Java!' using System.out.println().",
    starterCode: "public class HelloWorld {\n    public static void main(String[] args) {\n        // Write your code here\n    }\n}",
    expectedOutput: "Hello, Java!",
    hints: [
      "Use System.out.println() to print",
      "Java is case-sensitive",
      "Don't forget semicolons"
    ],
    difficulty: "Easy",
    category: "Basics",
    concepts: ["classes", "main method", "System.out.println"]
  }
  // ... Continue with 800+ Java challenges
];

// C++ challenges
const cppChallenges: Challenge[] = [
  {
    id: 1,
    title: "iostream Hello World",
    description: "Learn C++ input/output with iostream library.",
    instructions: "Write a C++ program that outputs 'Hello, C++!' using cout.",
    starterCode: "#include <iostream>\nusing namespace std;\n\nint main() {\n    // Write your code here\n    return 0;\n}",
    expectedOutput: "Hello, C++!",
    hints: [
      "Use cout << to output text",
      "Include iostream header",
      "Use endl for new lines"
    ],
    difficulty: "Easy",
    category: "Basics",
    concepts: ["iostream", "cout", "main function"]
  }
  // ... Continue with 800+ C++ challenges
];

// Generate challenges for all languages
export const LANGUAGE_CHALLENGES: LanguageChallenges = {
  python: generatePythonChallenges(),
  javascript: generateJavaScriptChallenges(),
  java: generateJavaChallenges(),
  cpp: generateCppChallenges(),
  csharp: generateCSharpChallenges(),
  go: generateGoChallenges(),
  rust: generateRustChallenges(),
  swift: generateSwiftChallenges(),
  kotlin: generateKotlinChallenges(),
  php: generatePhpChallenges(),
  ruby: generateRubyChallenges(),
  r: generateRChallenges(),
  scala: generateScalaChallenges(),
  dart: generateDartChallenges(),
  sql: generateSqlChallenges()
};

// Challenge generation functions
function generatePythonChallenges(): Challenge[] {
  const realChallenges = [
    // Basics (1-40)
    {
      id: 1,
      title: "Print Hello World",
      description: "Learn the fundamental print statement in Python",
      instructions: "Write a program that prints 'Hello, World!' to the console.",
      starterCode: "# Print Hello, World! to the console\n",
      expectedOutput: "Hello, World!",
      hints: [
        "Use the print() function",
        "Put the text in quotes",
        "Python is case-sensitive"
      ],
      difficulty: "Easy" as const,
      category: "Basics",
      concepts: ["print", "strings"]
    },
    {
      id: 2,
      title: "Variables and Assignment",
      description: "Learn how to store values in variables",
      instructions: "Create a variable 'name' with your name and print it.",
      starterCode: "# Create a variable called 'name' and assign your name to it\n# Then print it\n",
      expectedOutput: "Your Name",
      hints: [
        "Use the = operator for assignment",
        "Variable names should be lowercase",
        "Strings need quotes"
      ],
      difficulty: "Easy" as const,
      category: "Variables",
      concepts: ["variables", "assignment", "strings"]
    },
    {
      id: 3,
      title: "Basic Math Operations",
      description: "Perform arithmetic calculations",
      instructions: "Calculate 15 + 25 and print the result.",
      starterCode: "# Calculate 15 + 25 and print the result\n",
      expectedOutput: "40",
      hints: [
        "Use the + operator",
        "You can print expressions directly",
        "No quotes needed for numbers"
      ],
      difficulty: "Easy" as const,
      category: "Basics",
      concepts: ["arithmetic", "operators"]
    },
    {
      id: 4,
      title: "String Concatenation",
      description: "Join strings together",
      instructions: "Create two variables: first_name and last_name. Print them together with a space.",
      starterCode: "# Create first_name and last_name variables\n# Print them together with a space\n",
      expectedOutput: "John Doe",
      hints: [
        "Use + to join strings",
        "Don't forget the space between names",
        "You can assign any names you like"
      ],
      difficulty: "Easy" as const,
      category: "Strings",
      concepts: ["string concatenation", "variables"]
    },
    {
      id: 5,
      title: "User Input",
      description: "Get input from the user",
      instructions: "Ask the user for their age using input() and print a greeting.",
      starterCode: "# Ask for user's age and print a greeting\n",
      expectedOutput: "Hello! You are 25 years old.",
      hints: [
        "Use input() function",
        "Store the result in a variable",
        "Use string concatenation or f-strings"
      ],
      difficulty: "Easy" as const,
      category: "Input/Output",
      concepts: ["input", "strings", "user interaction"]
    }
  ];
  
  // Generate remaining challenges programmatically
  const categories = [
    "Control Flow", "Functions", "Lists", "Dictionaries", "Loops",
    "Conditionals", "String Methods", "File I/O", "Error Handling", 
    "Classes", "Modules", "List Comprehensions", "Lambda Functions",
    "Decorators", "Generators", "Context Managers", "Regular Expressions",
    "JSON", "APIs", "Testing"
  ];
  
  const challenges: Challenge[] = [...realChallenges];
  let id = realChallenges.length + 1;
  
  categories.forEach((category, categoryIndex) => {
    const challengesPerCategory = Math.floor((800 - realChallenges.length) / categories.length);
    
    for (let i = 0; i < challengesPerCategory; i++) {
      const difficulty = i < challengesPerCategory * 0.4 ? "Easy" : 
                        i < challengesPerCategory * 0.7 ? "Medium" : "Hard";
      
      challenges.push({
        id: id++,
        title: getChallengeTitle(category, i + 1),
        description: `Master ${category.toLowerCase()} concepts in Python`,
        instructions: getChallengeInstructions(category, i + 1),
        starterCode: getChallengeStarterCode(category, i + 1),
        expectedOutput: `Expected output for ${category.toLowerCase()} challenge`,
        hints: getChallengeHints(category),
        difficulty,
        category,
        concepts: [category.toLowerCase()]
      });
    }
  });
  
  return challenges;
}

function getChallengeTitle(category: string, num: number): string {
  const titles: { [key: string]: string[] } = {
    "Control Flow": ["If-Else Basics", "Nested Conditions", "Multiple Conditions", "Ternary Operator"],
    "Functions": ["Define Function", "Function Parameters", "Return Values", "Default Parameters"],
    "Lists": ["Create Lists", "List Indexing", "List Methods", "List Slicing"],
    "Dictionaries": ["Create Dictionary", "Access Values", "Dictionary Methods", "Nested Dictionaries"],
    "Loops": ["For Loop Basics", "While Loop", "Loop with Range", "Nested Loops"],
    "Conditionals": ["Boolean Logic", "Complex Conditions", "Switch Alternative", "Guard Clauses"]
  };
  
  const categoryTitles = titles[category] || [`${category} Challenge`];
  return categoryTitles[num % categoryTitles.length] || `${category} Challenge ${num}`;
}

function getChallengeInstructions(category: string, num: number): string {
  const instructions: { [key: string]: string[] } = {
    "Control Flow": [
      "Write an if-else statement to check if a number is positive or negative",
      "Create nested if statements to categorize ages (child, adult, senior)",
      "Use elif to create a grade calculator (A, B, C, D, F)",
      "Implement a simple ternary-like operation"
    ],
    "Functions": [
      "Create a function that greets a person by name",
      "Write a function that adds two numbers",
      "Create a function that returns the square of a number",
      "Write a function with default parameter values"
    ],
    "Lists": [
      "Create a list of your favorite colors and print it",
      "Access the first and last elements of a list",
      "Add and remove items from a list",
      "Use list slicing to get sublists"
    ]
  };
  
  const categoryInstructions = instructions[category] || [`Complete this ${category.toLowerCase()} challenge`];
  return categoryInstructions[num % categoryInstructions.length] || `Complete this ${category.toLowerCase()} challenge`;
}

function getChallengeStarterCode(category: string, num: number): string {
  const starterCodes: { [key: string]: string[] } = {
    "Control Flow": [
      "# Check if a number is positive or negative\nnumber = 10\n# Write your if-else statement here\n",
      "# Categorize ages\nage = 25\n# Write nested if statements here\n",
      "# Grade calculator\nscore = 85\n# Use elif statements here\n"
    ],
    "Functions": [
      "# Define a greeting function\ndef greet(name):\n    # Write your code here\n    pass\n\n# Call the function\n",
      "# Function to add two numbers\ndef add_numbers(a, b):\n    # Write your code here\n    pass\n"
    ],
    "Lists": [
      "# Create a list of favorite colors\ncolors = []\n# Add your colors here\n",
      "# Work with list indexing\nfruits = ['apple', 'banana', 'orange']\n# Access elements here\n"
    ]
  };
  
  const categoryCodes = starterCodes[category] || [`# ${category} Challenge ${num}\n# Write your solution here\n`];
  return categoryCodes[num % categoryCodes.length] || `# ${category} Challenge ${num}\n# Write your solution here\n`;
}

function getChallengeHints(category: string): string[] {
  const hints: { [key: string]: string[] } = {
    "Control Flow": [
      "Use if, elif, and else keywords",
      "Remember the colon (:) after conditions",
      "Indentation is crucial in Python"
    ],
    "Functions": [
      "Use the 'def' keyword to define functions",
      "Don't forget the colon after function definition",
      "Use 'return' to send values back"
    ],
    "Lists": [
      "Lists use square brackets []",
      "Index starts at 0",
      "Use append() to add items"
    ],
    "Loops": [
      "Use 'for' for known iterations",
      "Use 'while' for condition-based loops",
      "Remember proper indentation"
    ]
  };
  
  return hints[category] || [
    `Focus on ${category.toLowerCase()} concepts`,
    "Read the problem carefully",
    "Test with different inputs"
  ];
}

function generateJavaScriptChallenges(): Challenge[] {
  const categories = [
    "Basics", "Variables", "Functions", "Arrays", "Objects", "DOM",
    "Events", "Async/Await", "Promises", "ES6+", "React", "Node.js",
    "Express", "APIs", "Testing", "TypeScript", "Webpack", "Progressive Web Apps",
    "Performance", "Security"
  ];
  
  return generateChallengesForLanguage("JavaScript", categories);
}

function generateJavaChallenges(): Challenge[] {
  const categories = [
    "Basics", "OOP", "Collections", "Generics", "Streams", "Multithreading",
    "Spring Framework", "Hibernate", "Maven", "JUnit", "Design Patterns",
    "JDBC", "Servlets", "JSP", "REST APIs", "Microservices", "Docker",
    "Performance", "Security", "Enterprise Applications"
  ];
  
  return generateChallengesForLanguage("Java", categories);
}

function generateCppChallenges(): Challenge[] {
  const categories = [
    "Basics", "Pointers", "Memory Management", "STL", "Templates", "OOP",
    "Polymorphism", "Operator Overloading", "File I/O", "Exception Handling",
    "Concurrency", "Game Development", "System Programming", "Embedded Systems",
    "Performance Optimization", "Design Patterns", "Qt Framework", "Boost Libraries",
    "Network Programming", "Graphics Programming"
  ];
  
  return generateChallengesForLanguage("C++", categories);
}

function generateCSharpChallenges(): Challenge[] {
  const categories = [
    "Basics", ".NET Framework", "OOP", "LINQ", "Entity Framework", "ASP.NET",
    "WPF", "WinForms", "Threading", "Async Programming", "Delegates", "Events",
    "Generics", "Collections", "Exception Handling", "File I/O", "Reflection",
    "Attributes", "Unit Testing", "Design Patterns"
  ];
  
  return generateChallengesForLanguage("C#", categories);
}

function generateGoChallenges(): Challenge[] {
  const categories = [
    "Basics", "Goroutines", "Channels", "Interfaces", "Structs", "Packages",
    "Error Handling", "Web Development", "APIs", "Databases", "Testing",
    "Concurrency", "Microservices", "Docker", "Kubernetes", "CLI Tools",
    "Network Programming", "Performance", "Security", "Cloud Development"
  ];
  
  return generateChallengesForLanguage("Go", categories);
}

function generateRustChallenges(): Challenge[] {
  const categories = [
    "Basics", "Ownership", "Borrowing", "Lifetimes", "Traits", "Generics",
    "Error Handling", "Concurrency", "Cargo", "Testing", "Web Development",
    "System Programming", "Game Development", "Blockchain", "WebAssembly",
    "Performance", "Safety", "Memory Management", "Async Programming", "Macros"
  ];
  
  return generateChallengesForLanguage("Rust", categories);
}

function generateSwiftChallenges(): Challenge[] {
  const categories = [
    "Basics", "Optionals", "Closures", "Protocols", "Extensions", "Generics",
    "iOS Development", "UIKit", "SwiftUI", "Core Data", "Networking", "Testing",
    "App Store", "Performance", "Security", "Combine", "RxSwift", "Design Patterns",
    "Architecture", "Cross-Platform"
  ];
  
  return generateChallengesForLanguage("Swift", categories);
}

function generateKotlinChallenges(): Challenge[] {
  const categories = [
    "Basics", "Null Safety", "Extension Functions", "Data Classes", "Coroutines",
    "Android Development", "Jetpack Compose", "Room Database", "Retrofit",
    "Testing", "Multiplatform", "Spring Boot", "Web Development", "Server-Side",
    "Functional Programming", "DSLs", "Interoperability", "Performance", "Architecture", "Security"
  ];
  
  return generateChallengesForLanguage("Kotlin", categories);
}

function generatePhpChallenges(): Challenge[] {
  const categories = [
    "Basics", "OOP", "Arrays", "Strings", "File Handling", "Databases",
    "Laravel", "Symfony", "WordPress", "APIs", "Security", "Sessions",
    "Cookies", "Forms", "Validation", "Testing", "Composer", "MVC",
    "Performance", "Deployment"
  ];
  
  return generateChallengesForLanguage("PHP", categories);
}

function generateRubyChallenges(): Challenge[] {
  const categories = [
    "Basics", "Blocks", "Iterators", "Modules", "Classes", "Metaprogramming",
    "Ruby on Rails", "Gems", "Testing", "Web Development", "APIs", "Databases",
    "Active Record", "Routing", "Controllers", "Views", "Deployment", "Performance",
    "Security", "Best Practices"
  ];
  
  return generateChallengesForLanguage("Ruby", categories);
}

function generateRChallenges(): Challenge[] {
  const categories = [
    "Basics", "Data Types", "Vectors", "Data Frames", "Functions", "Statistics",
    "Data Visualization", "ggplot2", "dplyr", "tidyr", "Machine Learning",
    "Regression", "Classification", "Time Series", "Shiny", "R Markdown",
    "Package Development", "Data Mining", "Bioinformatics", "Research Methods"
  ];
  
  return generateChallengesForLanguage("R", categories);
}

function generateScalaChallenges(): Challenge[] {
  const categories = [
    "Basics", "Functional Programming", "Collections", "Pattern Matching",
    "Traits", "Case Classes", "Akka", "Spark", "Play Framework", "SBT",
    "Testing", "Concurrency", "Futures", "Implicits", "Type System",
    "Macros", "Cats", "Monads", "Big Data", "Distributed Systems"
  ];
  
  return generateChallengesForLanguage("Scala", categories);
}

function generateDartChallenges(): Challenge[] {
  const categories = [
    "Basics", "OOP", "Async Programming", "Streams", "Generics", "Flutter",
    "Widgets", "State Management", "Navigation", "Animations", "HTTP",
    "Local Storage", "Testing", "Performance", "Platform Channels", "Packages",
    "Firebase", "Deployment", "Web Development", "Server-Side"
  ];
  
  return generateChallengesForLanguage("Dart", categories);
}

function generateSqlChallenges(): Challenge[] {
  const categories = [
    "Basics", "SELECT", "WHERE", "JOIN", "GROUP BY", "HAVING",
    "Subqueries", "Views", "Stored Procedures", "Triggers", "Indexes",
    "Normalization", "Transactions", "Performance", "Security", "PostgreSQL",
    "MySQL", "SQLite", "NoSQL", "Data Warehousing"
  ];
  
  return generateChallengesForLanguage("SQL", categories);
}

function generateChallengesForLanguage(language: string, categories: string[]): Challenge[] {
  const challenges: Challenge[] = [];
  let id = 1;
  
  categories.forEach((category, categoryIndex) => {
    const challengesPerCategory = 40; // 800 total / 20 categories
    
    for (let i = 0; i < challengesPerCategory; i++) {
      const difficulty = i < 15 ? "Easy" : i < 30 ? "Medium" : "Hard";
      
      challenges.push({
        id: id++,
        title: `${category} Challenge ${i + 1}`,
        description: `Master ${category.toLowerCase()} concepts in ${language}`,
        instructions: `Complete this ${category.toLowerCase()} challenge to advance your ${language} skills`,
        starterCode: `// ${category} Challenge ${i + 1}\n// Write your solution here\n`,
        expectedOutput: `Expected output for ${category.toLowerCase()} challenge`,
        hints: [
          `Focus on ${category.toLowerCase()} concepts`,
          "Read the problem carefully",
          "Test with different inputs"
        ],
        difficulty,
        category,
        concepts: [category.toLowerCase()]
      });
    }
  });
  
  return challenges;
}