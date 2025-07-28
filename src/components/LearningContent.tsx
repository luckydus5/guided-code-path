import React, { useState, useRef } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { 
  BookOpen, 
  Code, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  Play,
  Copy,
  Monitor,
  FileText,
  Lightbulb,
  Terminal,
  RefreshCw,
  Award,
  Target
} from "lucide-react";

interface LearningContentProps {
  title: string;
  type: string;
  difficulty: string;
  onComplete: () => void;
  onBack: () => void;
}

interface LessonStep {
  id: string;
  title: string;
  content: string;
  code?: string;
  output?: string;
  tips?: string[];
  exercises?: string[];
  practice?: {
    challenge: string;
    starterCode: string;
    expectedOutput: string;
    hints: string[];
  };
}

const LEARNING_CONTENT = {
  "HTML Basics - MDN Web Docs": {
    steps: [
      {
        id: "html-intro",
        title: "What is HTML?",
        content: "HTML (HyperText Markup Language) is the standard markup language for creating web pages. It describes the structure of a web page using markup tags.\n\nHTML documents are made up of HTML elements, which are represented by tags. These tags label pieces of content such as 'heading', 'paragraph', 'table', and so on.\n\nHTML elements tell the browser how to display the content.",
        code: `<!DOCTYPE html>
<html>
<head>
    <title>My First Web Page</title>
</head>
<body>
    <h1>Welcome to HTML!</h1>
    <p>This is my first paragraph.</p>
</body>
</html>`,
        output: "This creates a basic web page with a title and a paragraph.",
        tips: [
          "HTML tags are enclosed in angle brackets < >",
          "Most HTML elements have opening and closing tags",
          "The <!DOCTYPE html> declaration defines this as an HTML5 document"
        ],
        practice: {
          challenge: "Create your first HTML page with a title 'My Portfolio' and add a heading that says 'Hello World!'",
          starterCode: `<!DOCTYPE html>
<html>
<head>
    <!-- Add your title here -->
</head>
<body>
    <!-- Add your heading here -->
</body>
</html>`,
          expectedOutput: "A web page with title 'My Portfolio' and an h1 heading saying 'Hello World!'",
          hints: [
            "Use <title> tag inside <head> for the page title",
            "Use <h1> tag for the main heading",
            "Remember to close all tags"
          ]
        }
      },
      {
        id: "html-elements",
        title: "HTML Elements & Tags",
        content: "HTML elements are the building blocks of HTML pages. An HTML element is defined by a start tag, some content, and an end tag.\n\nThe HTML element is everything from the start tag to the end tag. Elements can contain text, other elements, or both.\n\nSome elements are empty and don't have content or end tags (like <br>, <img>, <hr>).",
        code: `<!-- Basic HTML elements -->
<h1>Main Heading</h1>
<h2>Sub Heading</h2>
<p>This is a paragraph with <strong>bold text</strong> and <em>italic text</em>.</p>

<!-- Lists -->
<ul>
    <li>First item</li>
    <li>Second item</li>
</ul>

<!-- Links and Images -->
<a href="https://example.com">Visit Example</a>
<img src="image.jpg" alt="Description" />

<!-- Line breaks and horizontal rules -->
<br />
<hr />`,
        output: "Various HTML elements creating headings, paragraphs, lists, links, and images",
        tips: [
          "Always use semantic HTML elements for better accessibility",
          "Empty elements like <img> and <br> don't need closing tags",
          "The alt attribute for images is important for screen readers"
        ],
        practice: {
          challenge: "Create a simple webpage about yourself with a heading, paragraph, and an unordered list of your hobbies",
          starterCode: `<!DOCTYPE html>
<html>
<head>
    <title>About Me</title>
</head>
<body>
    <!-- Add your heading here -->
    
    <!-- Add a paragraph about yourself -->
    
    <!-- Add a list of your hobbies -->
    
</body>
</html>`,
          expectedOutput: "A webpage with your name as heading, a description paragraph, and a bulleted list of hobbies",
          hints: [
            "Use <h1> for your main heading",
            "Use <p> for paragraph text",
            "Use <ul> and <li> for an unordered (bulleted) list"
          ]
        }
      },
      {
        id: "html-attributes",
        title: "HTML Attributes",
        content: "HTML attributes provide additional information about HTML elements. Attributes are always specified in the start tag and usually come in name/value pairs like name='value'.\n\nCommon attributes include id, class, src, href, alt, title, and style. These attributes help define the behavior, appearance, or provide metadata about elements.",
        code: `<!-- Elements with attributes -->
<div id="main-content" class="container">
    <h1 class="title">Page Title</h1>
    <p class="description" style="color: blue;">
        This paragraph has multiple attributes.
    </p>
    
    <a href="https://example.com" target="_blank" title="Visit Example Site">
        External Link
    </a>
    
    <img src="photo.jpg" alt="A beautiful landscape" width="300" height="200" />
    
    <input type="text" placeholder="Enter your name" required />
</div>`,
        output: "HTML elements enhanced with attributes for styling, linking, and functionality",
        tips: [
          "Always use quotes around attribute values",
          "The id attribute should be unique on a page",
          "class attributes can be used multiple times and help with CSS styling"
        ],
        practice: {
          challenge: "Create a div with class 'profile-card' containing an image with alt text and a link that opens in a new tab",
          starterCode: `<!DOCTYPE html>
<html>
<head>
    <title>Profile Card</title>
</head>
<body>
    <!-- Create your profile card div here -->
    
</body>
</html>`,
          expectedOutput: "A div with class 'profile-card' containing an image and an external link",
          hints: [
            "Use class='profile-card' for the div",
            "Add alt attribute to describe your image",
            "Use target='_blank' to open links in new tab"
          ]
        }
      }
    ]
  },
  
  "CSS Basics - MDN Web Docs": {
    steps: [
      {
        id: "css-intro",
        title: "What is CSS?",
        content: "CSS (Cascading Style Sheets) is a language used to describe the presentation of HTML documents. It controls the layout, colors, fonts, and overall visual appearance of web pages.\n\nCSS works by selecting HTML elements and applying style rules to them. This separation of content (HTML) and presentation (CSS) makes websites easier to maintain and more flexible.",
        code: `/* CSS Syntax */
selector {
    property: value;
    property: value;
}

/* Example */
h1 {
    color: blue;
    font-size: 24px;
    text-align: center;
}

p {
    color: #333333;
    line-height: 1.6;
    margin: 16px 0;
}`,
        output: "Styled HTML elements with custom colors, fonts, and spacing",
        tips: [
          "CSS rules consist of selectors and declaration blocks",
          "Always end CSS declarations with a semicolon",
          "Use meaningful class and ID names for better organization"
        ],
        practice: {
          challenge: "Style a heading with red color, center alignment, and 32px font size",
          starterCode: `/* Add your CSS here */
h1 {
    /* Your styles go here */
}`,
          expectedOutput: "A red, centered heading with 32px font size",
          hints: [
            "Use color: red; for red text",
            "Use text-align: center; for center alignment",
            "Use font-size: 32px; for font size"
          ]
        }
      },
      {
        id: "css-selectors",
        title: "CSS Selectors",
        content: "CSS selectors are patterns used to select and style HTML elements. There are several types of selectors: element selectors, class selectors, ID selectors, and more advanced selectors.\n\nSelectors allow you to target specific elements or groups of elements to apply styles. Understanding selectors is crucial for effective CSS styling.",
        code: `/* Element selector */
p {
    color: black;
}

/* Class selector */
.highlight {
    background-color: yellow;
}

/* ID selector */
#main-title {
    font-size: 28px;
    font-weight: bold;
}

/* Descendant selector */
.container p {
    margin-bottom: 10px;
}

/* Multiple selectors */
h1, h2, h3 {
    font-family: Arial, sans-serif;
}`,
        output: "Different HTML elements styled using various CSS selector types",
        tips: [
          "Use class selectors (.) for reusable styles",
          "Use ID selectors (#) for unique elements",
          "Descendant selectors target nested elements"
        ],
        practice: {
          challenge: "Create CSS rules for a class called 'button' with blue background, white text, and 10px padding",
          starterCode: `.button {
    /* Add your styles here */
}`,
          expectedOutput: "A button class with blue background, white text, and padding",
          hints: [
            "Use background-color: blue; for blue background",
            "Use color: white; for white text",
            "Use padding: 10px; for spacing"
          ]
        }
      },
      {
        id: "css-box-model",
        title: "CSS Box Model",
        content: "The CSS box model describes how elements are rendered on a webpage. Every element is a rectangular box consisting of content, padding, border, and margin.\n\nUnderstanding the box model is essential for layout and spacing. The total width/height includes content + padding + border (margin is outside).",
        code: `.box {
    /* Content area */
    width: 200px;
    height: 100px;
    
    /* Padding (inside spacing) */
    padding: 20px;
    
    /* Border */
    border: 2px solid black;
    
    /* Margin (outside spacing) */
    margin: 10px;
    
    /* Background for visualization */
    background-color: lightblue;
}

/* Alternative box-sizing */
.border-box {
    box-sizing: border-box; /* Includes padding and border in width/height */
    width: 200px;
    padding: 20px;
    border: 2px solid red;
}`,
        output: "Visual demonstration of how padding, border, and margin affect element sizing",
        tips: [
          "Use browser dev tools to visualize the box model",
          "box-sizing: border-box makes sizing more predictable",
          "Margin collapses between adjacent elements"
        ],
        practice: {
          challenge: "Create a CSS rule for a class 'card' with 300px width, 20px padding, 1px solid gray border, and 15px margin",
          starterCode: `.card {
    /* Add your box model properties here */
}`,
          expectedOutput: "A card class with specified dimensions, padding, border, and margin",
          hints: [
            "Set width: 300px; for the width",
            "Use padding: 20px; for inner spacing",
            "Use border: 1px solid gray; for the border",
            "Use margin: 15px; for outer spacing"
          ]
        }
      }
    ]
  },

  "JavaScript Basics - MDN Web Docs": {
    steps: [
      {
        id: "js-intro",
        title: "What is JavaScript?",
        content: "JavaScript is a programming language that enables interactive web pages. It is an essential part of web applications alongside HTML and CSS.\n\nJavaScript can change HTML content, attribute values, and CSS styles. It can also hide and show HTML elements, validate form data, and much more.",
        code: `// Variables
let message = "Hello World!";
const pi = 3.14159;

// Functions
function greet(name) {
    return "Hello, " + name + "!";
}

// DOM Manipulation
document.getElementById("demo").innerHTML = "Hello JavaScript!";

// Event Handling
button.addEventListener('click', function() {
    alert('Button clicked!');
});`,
        output: "Interactive web page elements that respond to user actions",
        tips: [
          "Use let for variables that change, const for constants",
          "Functions help organize and reuse code",
          "JavaScript can modify HTML elements in real-time"
        ],
        practice: {
          challenge: "Create a function that takes a name and returns a personalized greeting",
          starterCode: `function createGreeting(name) {
    // Your code here
    // Return a greeting message
}

// Test your function
console.log(createGreeting("Alice"));`,
          expectedOutput: "A function that returns 'Hello, Alice!' when called with 'Alice'",
          hints: [
            "Use the return statement to return a value",
            "Concatenate strings with the + operator",
            "Don't forget to include the name parameter in your greeting"
          ]
        }
      },
      {
        id: "js-variables",
        title: "JavaScript Variables",
        content: "Variables in JavaScript are containers for storing data values. JavaScript has three ways to declare variables: var, let, and const.\n\nlet is used for variables that can change, const is for constants that cannot be reassigned, and var is the older way (avoid in modern JavaScript).",
        code: `// Different variable declarations
let userName = "Alice";           // Can be changed
const MAX_USERS = 100;          // Cannot be changed
var oldStyle = "avoid this";     // Old way, avoid

// Variable types
let number = 42;
let text = "Hello World";
let boolean = true;
let array = [1, 2, 3, 4, 5];
let object = {
    name: "John",
    age: 30,
    city: "New York"
};

// Changing variables
userName = "Bob";  // This works with let
// MAX_USERS = 200;  // This would cause an error with const`,
        output: "Variables storing different types of data and demonstrating mutability",
        tips: [
          "Use const by default, let when you need to reassign",
          "JavaScript is dynamically typed - variables can hold any type",
          "Use descriptive variable names for better code readability"
        ],
        practice: {
          challenge: "Create variables for a person's information: name (changeable), age (changeable), and birthYear (constant)",
          starterCode: `// Declare your variables here
// name should be changeable
// age should be changeable  
// birthYear should be constant

// Test your variables
console.log("Name:", name);
console.log("Age:", age);
console.log("Birth Year:", birthYear);`,
          expectedOutput: "Three variables declared with appropriate keywords for their intended use",
          hints: [
            "Use let for variables that might change",
            "Use const for values that won't change",
            "Initialize variables with sample values"
          ]
        }
      },
      {
        id: "js-functions",
        title: "JavaScript Functions",
        content: "Functions are blocks of code designed to perform particular tasks. They are executed when something invokes (calls) them.\n\nFunctions help organize code, make it reusable, and easier to debug. JavaScript has several ways to create functions.",
        code: `// Function declaration
function greetUser(name) {
    return "Hello, " + name + "!";
}

// Function expression
const calculateArea = function(width, height) {
    return width * height;
};

// Arrow function (ES6+)
const multiply = (a, b) => a * b;

// Function with default parameters
function createMessage(text, sender = "Anonymous") {
    return \`Message from \${sender}: \${text}\`;
}

// Calling functions
console.log(greetUser("Alice"));
console.log(calculateArea(5, 10));
console.log(multiply(3, 4));
console.log(createMessage("Hello World!"));`,
        output: "Different function types demonstrating various ways to create and use functions",
        tips: [
          "Functions should do one thing and do it well",
          "Use descriptive function names that explain what they do",
          "Arrow functions are great for short, simple functions"
        ],
        practice: {
          challenge: "Create a function called 'calculateTip' that takes a bill amount and tip percentage, returns the tip amount",
          starterCode: `// Create your calculateTip function here
function calculateTip(billAmount, tipPercentage) {
    // Your code here
}

// Test your function
console.log(calculateTip(50, 20)); // Should return 10
console.log(calculateTip(100, 15)); // Should return 15`,
          expectedOutput: "A function that calculates tip amount based on bill and tip percentage",
          hints: [
            "Tip amount = (bill amount * tip percentage) / 100",
            "Use the return statement to return the calculated value",
            "Make sure to convert percentage to decimal if needed"
          ]
        }
      }
    ]
  }
};

export default function LearningContent({ 
  title, 
  type, 
  difficulty, 
  onComplete, 
  onBack 
}: LearningContentProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [practiceCode, setPracticeCode] = useState('');
  const [showPractice, setShowPractice] = useState(false);
  const [practiceOutput, setPracticeOutput] = useState('');
  const [showHints, setShowHints] = useState(false);
  const [hasRestoredState, setHasRestoredState] = useState(false);
  const [autoSaveIndicator, setAutoSaveIndicator] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const content = LEARNING_CONTENT[title as keyof typeof LEARNING_CONTENT];

  // Create storage keys for this specific lesson
  const storageKeys = {
    currentStep: `learning_${title}_currentStep`,
    completedSteps: `learning_${title}_completedSteps`,
    practiceCode: `learning_${title}_practiceCode`,
    showPractice: `learning_${title}_showPractice`,
    showHints: `learning_${title}_showHints`
  };

  // Load saved state from localStorage on component mount
  React.useEffect(() => {
    try {
      const savedCurrentStep = localStorage.getItem(storageKeys.currentStep);
      const savedCompletedSteps = localStorage.getItem(storageKeys.completedSteps);
      const savedPracticeCode = localStorage.getItem(storageKeys.practiceCode);
      const savedShowPractice = localStorage.getItem(storageKeys.showPractice);
      const savedShowHints = localStorage.getItem(storageKeys.showHints);

      let hasRestored = false;

      if (savedCurrentStep) {
        const stepIndex = parseInt(savedCurrentStep);
        if (stepIndex >= 0 && stepIndex < content.steps.length) {
          setCurrentStep(stepIndex);
          hasRestored = true;
        }
      }

      if (savedCompletedSteps) {
        const completed = JSON.parse(savedCompletedSteps);
        setCompletedSteps(new Set(completed));
        if (completed.length > 0) hasRestored = true;
      }

      if (savedPracticeCode) {
        setPracticeCode(savedPracticeCode);
        hasRestored = true;
      }

      if (savedShowPractice) {
        setShowPractice(JSON.parse(savedShowPractice));
      }

      if (savedShowHints) {
        setShowHints(JSON.parse(savedShowHints));
      }

      setHasRestoredState(hasRestored);
    } catch (error) {
      console.error('Error loading saved learning state:', error);
    }
  }, [title, content.steps.length]);

  // Auto-save state to localStorage whenever it changes
  React.useEffect(() => {
    localStorage.setItem(storageKeys.currentStep, currentStep.toString());
  }, [currentStep, storageKeys.currentStep]);

  React.useEffect(() => {
    localStorage.setItem(storageKeys.completedSteps, JSON.stringify(Array.from(completedSteps)));
  }, [completedSteps, storageKeys.completedSteps]);

  if (!content) {
    return (
      <Card className="p-6">
        <div className="text-center">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Content Not Available</h3>
          <p className="text-muted-foreground mb-4">
            This learning content is being developed. Please check back soon!
          </p>
          <Button onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Resources
          </Button>
        </div>
      </Card>
    );
  }

  const steps = content.steps;
  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  // Auto-save practice code with debouncing (per step)
  React.useEffect(() => {
    if (practiceCode && currentStepData) {
      // Clear existing timeout
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }

      // Set new timeout for debounced save
      autoSaveTimeoutRef.current = setTimeout(() => {
        const stepSpecificKey = `learning_${title}_step_${currentStepData.id}_practiceCode`;
        localStorage.setItem(stepSpecificKey, practiceCode);
        setAutoSaveIndicator(true);
        
        // Hide indicator after 2 seconds
        setTimeout(() => setAutoSaveIndicator(false), 2000);
      }, 1000); // 1 second debounce
    }

    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, [practiceCode, title, currentStepData]);

  React.useEffect(() => {
    localStorage.setItem(storageKeys.showPractice, JSON.stringify(showPractice));
  }, [showPractice, storageKeys.showPractice]);

  React.useEffect(() => {
    localStorage.setItem(storageKeys.showHints, JSON.stringify(showHints));
  }, [showHints, storageKeys.showHints]);

  // Function to clear all saved progress for this lesson
  const clearSavedProgress = () => {
    // Clear general lesson data
    Object.values(storageKeys).forEach(key => {
      localStorage.removeItem(key);
    });
    
    // Clear step-specific practice code for all steps
    content.steps.forEach(step => {
      const stepSpecificKey = `learning_${title}_step_${step.id}_practiceCode`;
      localStorage.removeItem(stepSpecificKey);
    });
    
    setCurrentStep(0);
    setCompletedSteps(new Set());
    setPracticeCode('');
    setShowPractice(false);
    setShowHints(false);
    setPracticeOutput('');
    setHasRestoredState(false);
    
    // Initialize practice code for first step
    const firstStep = content.steps[0] as LessonStep;
    if (firstStep.practice) {
      setPracticeCode(firstStep.practice.starterCode);
    }
  };

  const handleStepComplete = () => {
    setCompletedSteps(prev => new Set([...prev, currentStepData.id]));
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setShowPractice(false);
      setPracticeOutput('');
      setShowHints(false);
    } else {
      onComplete();
    }
  };

  const handleStepChange = (newStepIndex: number) => {
    setCurrentStep(newStepIndex);
    setShowPractice(false);
    setPracticeOutput('');
    setShowHints(false);
    
    // Load practice code for the new step after a brief delay
    setTimeout(() => {
      const newStep = steps[newStepIndex] as LessonStep;
      const savedCode = localStorage.getItem(`learning_${title}_step_${newStep.id}_practiceCode`);
      if (savedCode) {
        setPracticeCode(savedCode);
      } else if (newStep.practice) {
        setPracticeCode(newStep.practice.starterCode);
      } else {
        setPracticeCode('');
      }
    }, 100);
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  const runPracticeCode = () => {
    const practice = (currentStepData as LessonStep).practice;
    if (practice) {
      // Create a simple HTML document with the user's code
      const htmlDoc = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            ${practiceCode.includes('.') ? practiceCode : ''}
          </style>
        </head>
        <body>
          ${!practiceCode.includes('.') ? practiceCode : '<div class="container"><div class="item box box1"></div><div class="item box box2"></div><div class="item box box3"></div></div>'}
          <script>
            try {
              ${practiceCode.includes('function') || practiceCode.includes('let') || practiceCode.includes('const') ? practiceCode : ''}
            } catch(e) {
              document.body.innerHTML += '<div style="color: red; margin-top: 20px;">Error: ' + e.message + '</div>';
            }
          </script>
        </body>
        </html>
      `;
      
      if (iframeRef.current) {
        const doc = iframeRef.current.contentDocument;
        if (doc) {
          doc.open();
          doc.write(htmlDoc);
          doc.close();
        }
      }
      setPracticeOutput('Code executed! Check the preview above.');
    }
  };

  const resetPracticeCode = () => {
    const practice = (currentStepData as LessonStep).practice;
    setPracticeCode(practice?.starterCode || '');
    setPracticeOutput('');
  };

  const initializePractice = () => {
    const practice = (currentStepData as LessonStep).practice;
    if (practice && !practiceCode) {
      setPracticeCode(practice.starterCode);
    }
  };

  // Initialize practice code when step changes
  React.useEffect(() => {
    if (currentStepData) {
      const stepSpecificKey = `learning_${title}_step_${currentStepData.id}_practiceCode`;
      const savedCode = localStorage.getItem(stepSpecificKey);
      
      if (savedCode) {
        setPracticeCode(savedCode);
      } else {
        const practice = (currentStepData as LessonStep).practice;
        if (practice) {
          setPracticeCode(practice.starterCode);
        } else {
          setPracticeCode('');
        }
      }
    }
  }, [currentStep, title, currentStepData]);

  React.useEffect(() => {
    const practice = (currentStepData as LessonStep).practice;
    if (practice && !practiceCode) {
      setPracticeCode(practice.starterCode);
    }
  }, [currentStepData, practiceCode]);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-full h-screen flex flex-col">
        {/* Restoration Notification */}
        {hasRestoredState && (
          <Card className="mx-4 mt-4 p-3 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-blue-700 dark:text-blue-300">
                  Your progress has been restored! You can continue where you left off.
                </span>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  clearSavedProgress();
                  setHasRestoredState(false);
                }}
              >
                Start Fresh
              </Button>
            </div>
          </Card>
        )}

        {/* Compact Header */}
        <Card className="mx-4 mt-4 p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-lg font-bold">{title}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs">{type}</Badge>
                  <Badge variant={difficulty === 'Beginner' ? 'default' : difficulty === 'Intermediate' ? 'secondary' : 'destructive'} className="text-xs">
                    {difficulty}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Step {currentStep + 1} of {steps.length}</div>
              <Progress value={progress} className="w-32 mt-1" />
            </div>
          </div>
        </Card>

        {/* Main Learning Area - Maximized Layout */}
        <div className="flex-1 mx-4 mt-4 mb-4 grid grid-cols-1 lg:grid-cols-5 gap-4 min-h-0">
          {/* Main Content - Takes most space */}
          <div className="lg:col-span-4 flex flex-col min-h-0">
            <Card className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-semibold">{currentStepData.title}</h2>
                </div>
                
                <div className="prose prose-sm max-w-none">
                  {currentStepData.content.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-3 leading-relaxed text-sm">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {currentStepData.code && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-semibold flex items-center gap-2">
                        <Code className="h-4 w-4" />
                        Example Code
                      </h3>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => copyCode(currentStepData.code!)}
                      >
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </Button>
                    </div>
                    <pre className="bg-muted p-3 rounded-lg overflow-x-auto text-xs">
                      <code>{currentStepData.code}</code>
                    </pre>
                    
                    {(currentStepData as LessonStep).output && (
                      <div className="mt-3">
                        <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                          <Monitor className="h-4 w-4" />
                          Output
                        </h4>
                        <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-3">
                          <pre className="text-xs text-green-700 dark:text-green-300">
                            {(currentStepData as LessonStep).output}
                          </pre>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Interactive Practice Section */}
                {(currentStepData as LessonStep).practice && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-base font-semibold flex items-center gap-2">
                        <Target className="h-4 w-4 text-orange-500" />
                        Practice Challenge
                      </h3>
                      <Button 
                        variant={showPractice ? "secondary" : "default"}
                        size="sm"
                        onClick={() => {
                          setShowPractice(!showPractice);
                          initializePractice();
                        }}
                      >
                        <Terminal className="h-4 w-4 mr-2" />
                        {showPractice ? 'Hide Practice' : 'Start Practice'}
                      </Button>
                    </div>

                    <div className="bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800 rounded-lg p-3 mb-3">
                      <p className="text-xs text-orange-700 dark:text-orange-300">
                        <strong>Challenge:</strong> {((currentStepData as LessonStep).practice!).challenge}
                      </p>
                      <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">
                        <strong>Expected:</strong> {((currentStepData as LessonStep).practice!).expectedOutput}
                      </p>
                    </div>

                    {showPractice && (
                      <div className="space-y-3">
                        <Tabs defaultValue="code" className="w-full">
                          <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="code">Code Editor</TabsTrigger>
                            <TabsTrigger value="preview">Live Preview</TabsTrigger>
                          </TabsList>
                          
                          <TabsContent value="code" className="space-y-3">
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <label className="text-xs font-medium">Your Code:</label>
                                <div className="flex items-center gap-2">
                                  {practiceCode && (
                                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                                      <div className={`h-2 w-2 rounded-full ${autoSaveIndicator ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                                      {autoSaveIndicator ? 'Saved!' : 'Auto-save'}
                                    </span>
                                  )}
                                  <Button size="sm" variant="outline" onClick={resetPracticeCode}>
                                    <RefreshCw className="h-3 w-3 mr-1" />
                                    Reset
                                  </Button>
                                  <Button size="sm" onClick={runPracticeCode}>
                                    <Play className="h-3 w-3 mr-1" />
                                    Run Code
                                  </Button>
                                </div>
                              </div>
                              <Textarea
                                value={practiceCode}
                                onChange={(e) => setPracticeCode(e.target.value)}
                                className="font-mono text-xs min-h-[180px] resize-none"
                                placeholder="Write your code here..."
                              />
                            </div>
                            
                            {practiceOutput && (
                              <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-2">
                                <p className="text-xs text-green-700 dark:text-green-300">
                                  {practiceOutput}
                                </p>
                              </div>
                            )}
                          </TabsContent>
                          
                          <TabsContent value="preview">
                            <div className="border rounded-lg overflow-hidden">
                              <div className="bg-muted px-3 py-1 text-xs font-medium">Live Preview</div>
                              <iframe
                                ref={iframeRef}
                                className="w-full h-48 bg-white"
                                title="Code Preview"
                              />
                            </div>
                          </TabsContent>
                        </Tabs>

                        <div className="flex items-center justify-between">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowHints(!showHints)}
                          >
                            <Lightbulb className="h-3 w-3 mr-1" />
                            {showHints ? 'Hide Hints' : 'Show Hints'}
                          </Button>
                        </div>

                        {showHints && (
                          <Card className="p-3 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
                            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2 text-sm">💡 Hints:</h4>
                            <ul className="space-y-1">
                              {((currentStepData as LessonStep).practice!).hints.map((hint, index) => (
                                <li key={index} className="text-xs text-blue-700 dark:text-blue-300">
                                  {index + 1}. {hint}
                                </li>
                              ))}
                            </ul>
                          </Card>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {(currentStepData as LessonStep).exercises && (
                  <div>
                    <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Practice Exercises
                    </h3>
                    <ul className="space-y-1">
                      {(currentStepData as LessonStep).exercises!.map((exercise, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary font-semibold text-xs">{index + 1}.</span>
                          <span className="text-xs">{exercise}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      const newStep = Math.max(0, currentStep - 1);
                      handleStepChange(newStep);
                    }}
                    disabled={currentStep === 0}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                  
                  <Button size="sm" onClick={handleStepComplete}>
                    {currentStep === steps.length - 1 ? (
                      <>
                        <Award className="h-4 w-4 mr-2" />
                        Complete Lesson
                      </>
                    ) : (
                      <>
                        Next Step
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Compact Sidebar */}
          <div className="lg:col-span-1 space-y-4 min-h-0">
            {/* Progress Overview */}
            <Card className="p-3 flex-shrink-0">
              <h3 className="font-semibold mb-3 text-sm">Progress</h3>
              <div className="space-y-1 max-h-48 overflow-y-auto">
                {steps.map((step, index) => (
                  <div 
                    key={step.id}
                    className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors text-xs ${
                      index === currentStep 
                        ? 'bg-primary/10 border border-primary/20' 
                        : completedSteps.has(step.id)
                        ? 'bg-green-50 dark:bg-green-950/30'
                        : 'hover:bg-muted'
                    }`}
                    onClick={() => handleStepChange(index)}
                  >
                    {completedSteps.has(step.id) ? (
                      <CheckCircle className="h-3 w-3 text-green-600 flex-shrink-0" />
                    ) : index === currentStep ? (
                      <Play className="h-3 w-3 text-primary flex-shrink-0" />
                    ) : (
                      <div className="h-3 w-3 rounded-full border-2 border-muted-foreground/30 flex-shrink-0" />
                    )}
                    <span className={`${index === currentStep ? 'font-medium' : ''} leading-tight`}>
                      {step.title}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Tips */}
            {currentStepData.tips && (
              <Card className="p-3 flex-shrink-0">
                <h3 className="font-semibold mb-3 flex items-center gap-2 text-sm">
                  <Lightbulb className="h-4 w-4 text-yellow-500" />
                  Tips
                </h3>
                <ul className="space-y-1">
                  {currentStepData.tips.map((tip, index) => (
                    <li key={index} className="text-xs text-muted-foreground leading-relaxed">
                      • {tip}
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}