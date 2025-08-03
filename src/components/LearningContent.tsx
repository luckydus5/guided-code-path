import React, { useState, useRef } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import CodeEditor from "./CodeEditor";
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
  },
  
  // Python Content
  "Python Syntax & Variables": {
    type: "lesson",
    difficulty: "Beginner",
    estimatedTime: "45 min",
    description: "Learn Python's fundamental syntax, how to output data, and work with different types of variables.",
    steps: [
      {
        id: "python-intro",
        title: "Welcome to Python",
        content: "Python is a high-level, interpreted programming language known for its simple syntax and readability. It's perfect for beginners and powerful enough for complex applications.\n\nPython uses indentation to define code blocks, making it visually clean and easy to read.",
        code: `# This is a Python comment
print("Hello, World!")  # This prints text to the screen

# Python is case-sensitive
name = "Python"
print(name)`,
        output: `Hello, World!
Python`,
        tips: [
          "Python uses # for single-line comments",
          "Indentation matters in Python - use 4 spaces",
          "Python is case-sensitive: 'name' and 'Name' are different"
        ]
      },
      {
        id: "python-print",
        title: "The print() Function",
        content: "The print() function is used to display output in Python. You can print text, numbers, and variables.",
        code: `# Printing different types of data
print("Hello, World!")           # String
print(42)                        # Integer
print(3.14)                      # Float
print(True)                      # Boolean

# Print multiple items
print("Age:", 25)
print("Name:", "Alice", "Score:", 95.5)`,
        output: `Hello, World!
42
3.14
True
Age: 25
Name: Alice Score: 95.5`,
        tips: [
          "Strings must be in quotes (single or double)",
          "print() automatically adds a new line",
          "You can print multiple items separated by commas"
        ],
        practice: {
          challenge: "Create a program that prints your name, age, and favorite programming language",
          starterCode: `# Print your information here
# Example: print("Name:", "Your Name")`,
          expectedOutput: "Three print statements showing personal information",
          hints: [
            "Use print() function for each piece of information",
            "Include labels like 'Name:' or 'Age:'",
            "Remember to use quotes for text"
          ]
        }
      },
      {
        id: "python-variables",
        title: "Variables and Data Types",
        content: "Variables in Python are containers for storing data. Python has several built-in data types: integers, floats, strings, and booleans.\n\nUnlike some languages, Python doesn't require you to declare the type of a variable - it figures it out automatically.",
        code: `# Different data types
name = "Alice"           # String
age = 25                 # Integer
height = 5.6             # Float
is_student = True        # Boolean

# Print variables
print("Name:", name)
print("Age:", age)
print("Height:", height)
print("Student:", is_student)

# Check the type of a variable
print(type(name))        # <class 'str'>
print(type(age))         # <class 'int'>`,
        output: `Name: Alice
Age: 25
Height: 5.6
Student: True
<class 'str'>
<class 'int'>`,
        tips: [
          "Variable names should be descriptive",
          "Use snake_case for variable names (e.g., first_name)",
          "Python determines the type automatically",
          "Use type() to check a variable's data type"
        ],
        exercises: [
          "Create variables for a book: title, author, pages, and is_available",
          "Print each variable with a descriptive label",
          "Use type() to check the data type of each variable"
        ],
        practice: {
          challenge: "Create a program about your favorite movie with variables for title, year, rating, and whether you've watched it",
          starterCode: `# Create variables for movie information
# title = 
# year = 
# rating = 
# watched = 

# Print the information`,
          expectedOutput: "Variables created and printed with labels",
          hints: [
            "Use strings for text data",
            "Use integers for whole numbers like year",
            "Use floats for decimal numbers like rating",
            "Use booleans (True/False) for yes/no questions"
          ]
        }
      }
    ]
  },
  
  "Data Types & Type Casting": {
    type: "lesson",
    difficulty: "Beginner",
    estimatedTime: "40 min",
    description: "Learn about Python's built-in data types and how to convert between them.",
    steps: [
      {
        id: "data-types-intro",
        title: "Python Data Types",
        content: "Python has several built-in data types. The most common ones are:\n\n• int (integers): whole numbers\n• float (floating-point): decimal numbers\n• str (strings): text\n• bool (booleans): True or False\n\nPython automatically determines the type based on the value you assign.",
        code: `# Different data types
age = 25                    # int
height = 5.9               # float
name = "Alice"             # str
is_student = True          # bool

# Check data types
print(type(age))           # <class 'int'>
print(type(height))        # <class 'float'>
print(type(name))          # <class 'str'>
print(type(is_student))    # <class 'bool'>`,
        output: `<class 'int'>
<class 'float'>
<class 'str'>
<class 'bool'>`,
        tips: [
          "Use type() function to check the data type",
          "Python is dynamically typed - variables can change types",
          "Integers have no size limit in Python"
        ]
      },
      {
        id: "type-casting",
        title: "Type Casting/Conversion",
        content: "Type casting means converting one data type to another. Python provides built-in functions for this: int(), float(), str(), and bool().",
        code: `# Converting between types
number_str = "42"
number_int = int(number_str)    # String to integer
print(number_int)               # 42

price_int = 25
price_float = float(price_int)  # Integer to float
print(price_float)              # 25.0

age = 30
age_str = str(age)              # Integer to string
print(age_str)                  # "30"

# Boolean conversions
print(bool(0))                  # False
print(bool(1))                  # True
print(bool(""))                 # False (empty string)
print(bool("Hello"))            # True`,
        output: `42
25.0
30
False
True
False
True`,
        tips: [
          "int() converts to whole numbers (truncates decimals)",
          "float() converts to decimal numbers",
          "str() converts anything to text",
          "bool() converts to True/False (0 and empty values are False)"
        ],
        practice: {
          challenge: "Create a program that asks for a user's age as a string, converts it to an integer, and calculates their birth year",
          starterCode: `# Get age as string input
age_str = "25"  # Pretend this is user input

# Convert to integer and calculate birth year
# Hint: current year is 2024

print("Age:", age_int)
print("Birth year:", birth_year)`,
          expectedOutput: "Age and calculated birth year displayed",
          hints: [
            "Use int() to convert string to number",
            "Subtract age from current year (2024)",
            "Don't forget to assign the converted value to a variable"
          ]
        }
      }
    ]
  },
  
  "Control Structures": {
    type: "lesson",
    difficulty: "Beginner", 
    estimatedTime: "50 min",
    description: "Learn how to make decisions in your code using if, elif, and else statements.",
    steps: [
      {
        id: "if-statements",
        title: "If Statements",
        content: "If statements allow your program to make decisions. They execute code only when a condition is True.\n\nPython uses indentation (4 spaces) to define code blocks.",
        code: `# Basic if statement
age = 18

if age >= 18:
    print("You are an adult")
    print("You can vote")

print("This always runs")

# Simple comparison
score = 85

if score >= 80:
    print("Great job!")`,
        output: `You are an adult
You can vote
This always runs
Great job!`,
        tips: [
          "Use : (colon) after the if condition",
          "Indent the code inside if with 4 spaces",
          "Comparison operators: ==, !=, <, >, <=, >="
        ]
      },
      {
        id: "if-else",
        title: "If-Else Statements",
        content: "Else provides an alternative when the if condition is False.",
        code: `# If-else example
temperature = 15

if temperature > 20:
    print("It's warm outside")
else:
    print("It's cool outside")

# Another example
password = "secret123"

if password == "admin123":
    print("Access granted")
else:
    print("Access denied")`,
        output: `It's cool outside
Access denied`,
        tips: [
          "else must be at the same indentation level as if",
          "Only one of if or else will execute, never both",
          "Use == for equality comparison, = for assignment"
        ]
      },
      {
        id: "elif-statements",
        title: "Elif (Else If) Statements",
        content: "Elif allows you to check multiple conditions in sequence.",
        code: `# Multiple conditions with elif
grade = 75

if grade >= 90:
    print("A - Excellent!")
elif grade >= 80:
    print("B - Good job!")
elif grade >= 70:
    print("C - Satisfactory")
elif grade >= 60:
    print("D - Needs improvement")
else:
    print("F - Please study more")

# Weather example
weather = "sunny"

if weather == "sunny":
    print("Wear sunglasses!")
elif weather == "rainy":
    print("Take an umbrella!")
elif weather == "snowy":
    print("Wear warm clothes!")
else:
    print("Check the weather forecast!")`,
        output: `C - Satisfactory
Wear sunglasses!`,
        tips: [
          "elif is short for 'else if'",
          "You can have multiple elif statements",
          "Only the first True condition will execute"
        ],
        practice: {
          challenge: "Create a simple calculator that checks the operation (+, -, *, /) and performs the calculation",
          starterCode: `# Simple calculator
num1 = 10
num2 = 5
operation = "+"

# Write if-elif-else statements to perform the operation
# Print the result`,
          expectedOutput: "Result of the mathematical operation",
          hints: [
            "Check if operation == '+' for addition",
            "Use elif for other operations (-, *, /)",
            "Use else for invalid operations"
          ]
        }
      }
    ]
  },
  
  "Loops": {
    type: "lesson",
    difficulty: "Beginner",
    estimatedTime: "55 min", 
    description: "Learn how to repeat code efficiently using for and while loops.",
    steps: [
      {
        id: "for-loops",
        title: "For Loops",
        content: "For loops repeat code a specific number of times. They're great for iterating through sequences like lists or ranges.",
        code: `# Basic for loop with range
print("Counting to 5:")
for i in range(5):
    print(i)

print("\\nCounting from 1 to 5:")
for i in range(1, 6):
    print(i)

print("\\nCounting by 2s:")
for i in range(0, 10, 2):
    print(i)

# Loop through a list
fruits = ["apple", "banana", "orange"]
print("\\nFruits:")
for fruit in fruits:
    print(f"I like {fruit}")`,
        output: `Counting to 5:
0
1
2
3
4

Counting from 1 to 5:
1
2
3
4
5

Counting by 2s:
0
2
4
6
8

Fruits:
I like apple
I like banana
I like orange`,
        tips: [
          "range(n) goes from 0 to n-1",
          "range(start, stop) goes from start to stop-1",
          "range(start, stop, step) allows custom increments",
          "For loops automatically handle iteration"
        ]
      },
      {
        id: "while-loops",
        title: "While Loops", 
        content: "While loops repeat code as long as a condition is True. Be careful to avoid infinite loops!",
        code: `# Basic while loop
count = 0
print("Counting with while loop:")
while count < 5:
    print(count)
    count = count + 1  # or count += 1

print("\\nGuessing game simulation:")
secret_number = 7
guess = 1

while guess != secret_number:
    print(f"Guess {guess} is wrong")
    guess += 1

print(f"Correct! The number was {secret_number}")`,
        output: `Counting with while loop:
0
1
2
3
4

Guessing game simulation:
Guess 1 is wrong
Guess 2 is wrong
Guess 3 is wrong
Guess 4 is wrong
Guess 5 is wrong
Guess 6 is wrong
Correct! The number was 7`,
        tips: [
          "Always modify the loop variable inside the loop",
          "Make sure the condition will eventually become False",
          "Use += to increment: count += 1 is same as count = count + 1"
        ]
      },
      {
        id: "loop-control",
        title: "Loop Control: Break and Continue",
        content: "Break exits a loop early, and continue skips to the next iteration.",
        code: `# Break example - exit loop early
print("Finding first even number:")
for num in [1, 3, 5, 8, 9, 10]:
    if num % 2 == 0:  # Check if even
        print(f"Found even number: {num}")
        break
    print(f"{num} is odd")

print("\\nSkipping odd numbers with continue:")
for num in range(1, 8):
    if num % 2 == 1:  # If odd
        continue  # Skip to next iteration
    print(f"{num} is even")`,
        output: `Finding first even number:
1 is odd
3 is odd
5 is odd
Found even number: 8

Skipping odd numbers with continue:
2 is even
4 is even
6 is even`,
        tips: [
          "break completely exits the loop",
          "continue skips the rest of the current iteration",
          "Use % (modulo) to check if a number is even/odd"
        ],
        practice: {
          challenge: "Create a program that prints numbers 1-20, but skips multiples of 3 and stops if it finds a number greater than 15",
          starterCode: `# Print numbers 1-20 with conditions
for num in range(1, 21):
    # Add your conditions here
    print(num)`,
          expectedOutput: "Numbers 1-20 printed with specified conditions",
          hints: [
            "Use % 3 == 0 to check multiples of 3",
            "Use continue to skip multiples of 3",
            "Use break when num > 15"
          ]
        }
      }
    ]
  },

  // NEW: Complete Loops System
  "Advanced Loops": {
    type: "lesson",
    difficulty: "Beginner",
    estimatedTime: "55 min",
    description: "Master Python loops: for loops, while loops, and loop control with break and continue.",
    steps: [
      {
        id: "for-loops-advanced",
        title: "For Loops with Lists and Strings",
        content: "For loops can iterate over any sequence in Python, not just numbers. You can loop through lists, strings, and other collections.\n\nThis makes Python loops very powerful for processing data.",
        code: `# Loop through a list
fruits = ["apple", "banana", "orange", "grape"]
print("My favorite fruits:")
for fruit in fruits:
    print(f"- {fruit}")

print("\\nLoop through a string:")
name = "Python"
for letter in name:
    print(f"Letter: {letter}")

# Loop with enumerate (get index and value)
print("\\nWith index numbers:")
for index, fruit in enumerate(fruits):
    print(f"{index + 1}. {fruit}")`,
        output: `My favorite fruits:
- apple
- banana
- orange
- grape

Loop through a string:
Letter: P
Letter: y
Letter: t
Letter: h
Letter: o
Letter: n

With index numbers:
1. apple
2. banana
3. orange
4. grape`,
        tips: [
          "for loops work with any sequence (lists, strings, ranges)",
          "enumerate() gives you both index and value",
          "Use meaningful variable names in loops"
        ],
        practice: {
          challenge: "Create a program that takes a list of your hobbies and prints each one with a number",
          starterCode: `# Create a list of your hobbies
hobbies = ["reading", "gaming", "coding"]

# Use a for loop to print each hobby with its number
# Example output: "1. reading"`,
          expectedOutput: "Each hobby printed with a number prefix",
          hints: [
            "Use enumerate() to get both index and hobby",
            "Add 1 to the index to start counting from 1",
            "Use f-strings for clean formatting"
          ]
        }
      },
      {
        id: "while-loops",
        title: "While Loops",
        content: "While loops repeat code as long as a condition is True. They're perfect when you don't know exactly how many times to loop.\n\nBe careful to avoid infinite loops by making sure the condition eventually becomes False!",
        code: `# Basic while loop
count = 1
print("Counting to 5:")
while count <= 5:
    print(f"Count: {count}")
    count += 1  # Very important: update the variable!

print("\\nUser input example:")
password = ""
while password != "secret":
    password = input("Enter password: ")
    if password != "secret":
        print("Wrong password, try again!")
print("Access granted!")

# While loop with a counter
total = 0
number = 1
while total < 50:
    total += number
    number += 1
    print(f"Added {number-1}, total is now {total}")`,
        output: `Counting to 5:
Count: 1
Count: 2
Count: 3
Count: 4
Count: 5

User input example:
Enter password: hello
Wrong password, try again!
Enter password: secret
Access granted!

Added 1, total is now 1
Added 2, total is now 3
Added 3, total is now 6
Added 4, total is now 10
Added 5, total is now 15
Added 6, total is now 21
Added 7, total is now 28
Added 8, total is now 36
Added 9, total is now 45
Added 10, total is now 55`,
        tips: [
          "Always update the condition variable inside the loop",
          "while loops are great for user input validation",
          "Be careful not to create infinite loops"
        ],
        practice: {
          challenge: "Create a number guessing game where the user keeps guessing until they get the right number (42)",
          starterCode: `# Number guessing game
secret_number = 42
guess = 0

print("I'm thinking of a number between 1 and 100!")
# Add your while loop here`,
          expectedOutput: "Loop continues until user guesses 42",
          hints: [
            "Use while guess != secret_number:",
            "Ask for input inside the loop",
            "Convert input() to int()",
            "Provide feedback if guess is too high or low"
          ]
        }
      },
      {
        id: "loop-control",
        title: "Loop Control: break and continue",
        content: "Sometimes you need to control loop execution. `break` exits the loop completely, while `continue` skips to the next iteration.\n\nThese keywords give you fine control over loop behavior.",
        code: `# Using break to exit early
print("Finding first even number:")
numbers = [1, 3, 7, 8, 9, 10]
for num in numbers:
    print(f"Checking {num}")
    if num % 2 == 0:
        print(f"Found even number: {num}")
        break
    print(f"{num} is odd, continuing...")

print("\\nUsing continue to skip iterations:")
for i in range(1, 11):
    if i % 3 == 0:
        continue  # Skip multiples of 3
    print(f"Number: {i}")

print("\\nPractical example - password validator:")
attempts = 0
max_attempts = 3

while attempts < max_attempts:
    password = input("Enter password: ")
    attempts += 1
    
    if len(password) < 6:
        print("Password too short!")
        continue
    
    if password == "secure123":
        print("Login successful!")
        break
    
    print(f"Wrong password. {max_attempts - attempts} attempts left.")
else:
    print("Too many failed attempts. Account locked!")`,
        output: `Finding first even number:
Checking 1
1 is odd, continuing...
Checking 3
3 is odd, continuing...
Checking 7
7 is odd, continuing...
Checking 8
Found even number: 8

Using continue to skip iterations:
Number: 1
Number: 2
Number: 4
Number: 5
Number: 7
Number: 8
Number: 10`,
        tips: [
          "break exits the entire loop immediately",
          "continue skips the rest of the current iteration",
          "else clause on loops runs if no break occurred"
        ],
        practice: {
          challenge: "Create a program that processes a list of numbers, skips negative numbers, and stops when it finds a number greater than 100",
          starterCode: `# Process numbers
numbers = [5, -2, 15, -8, 25, 150, 200]

print("Processing numbers:")
# Add your loop with break and continue here`,
          expectedOutput: "Skip negative numbers, stop at first number > 100",
          hints: [
            "Use continue for negative numbers",
            "Use break when number > 100",
            "Print each processed number"
          ]
        }
      }
    ]
  },

  // NEW: Functions
  "Functions": {
    type: "lesson",
    difficulty: "Beginner",
    estimatedTime: "60 min",
    description: "Learn to create reusable code with functions, parameters, and return values.",
    steps: [
      {
        id: "basic-functions",
        title: "Creating and Calling Functions",
        content: "Functions are reusable blocks of code that perform specific tasks. They help organize your code and avoid repetition.\n\nDefine functions with `def` and call them by name.",
        code: `# Basic function definition
def greet():
    print("Hello, welcome to Python!")
    print("Functions make code reusable!")

# Call the function
greet()
print("\\nCalling it again:")
greet()

# Function with parameters
def greet_person(name):
    print(f"Hello, {name}!")
    print(f"Nice to meet you, {name}!")

# Call with different arguments
greet_person("Alice")
greet_person("Bob")

# Function with multiple parameters
def introduce(name, age, city):
    print(f"Hi, I'm {name}")
    print(f"I'm {age} years old")
    print(f"I live in {city}")

introduce("Charlie", 25, "New York")`,
        output: `Hello, welcome to Python!
Functions make code reusable!

Calling it again:
Hello, welcome to Python!
Functions make code reusable!
Hello, Alice!
Nice to meet you, Alice!
Hello, Bob!
Nice to meet you, Bob!
Hi, I'm Charlie
I'm 25 years old
I live in New York`,
        tips: [
          "Function names should describe what they do",
          "Use def keyword to define functions",
          "Parameters are like variables that receive values",
          "Functions can be called multiple times"
        ],
        practice: {
          challenge: "Create a function called 'calculate_area' that takes length and width parameters and prints the area of a rectangle",
          starterCode: `# Define your calculate_area function here
def calculate_area(length, width):
    # Calculate and print the area
    pass

# Test your function
calculate_area(5, 3)
calculate_area(10, 7)`,
          expectedOutput: "Function that calculates and prints rectangle areas",
          hints: [
            "Area = length × width",
            "Use print() to display the result",
            "Include the parameters in your output message"
          ]
        }
      },
      {
        id: "return-values",
        title: "Return Values and Using Results",
        content: "Functions can return values using the `return` keyword. This lets you use the function's result in other parts of your code.\n\nReturned values can be stored in variables or used directly.",
        code: `# Function that returns a value
def add_numbers(a, b):
    result = a + b
    return result

# Use the returned value
sum1 = add_numbers(5, 3)
print(f"5 + 3 = {sum1}")

# Use return value directly
print(f"10 + 7 = {add_numbers(10, 7)}")

# Function with multiple calculations
def calculate_circle(radius):
    area = 3.14159 * radius * radius
    circumference = 2 * 3.14159 * radius
    return area, circumference  # Return multiple values

# Unpack multiple return values
area, circumference = calculate_circle(5)
print(f"Circle with radius 5:")
print(f"Area: {area}")
print(f"Circumference: {circumference}")

# Function that returns different types
def analyze_number(num):
    if num > 0:
        return "positive"
    elif num < 0:
        return "negative"
    else:
        return "zero"

print(f"10 is {analyze_number(10)}")
print(f"-5 is {analyze_number(-5)}")
print(f"0 is {analyze_number(0)}")`,
        output: `5 + 3 = 8
10 + 7 = 17
Circle with radius 5:
Area: 78.53975
Circumference: 31.4159
10 is positive
-5 is negative
0 is zero`,
        tips: [
          "return sends a value back to the caller",
          "Functions can return multiple values as tuples",
          "Without return, functions return None",
          "Return values can be any data type"
        ],
        practice: {
          challenge: "Create a function 'get_grade' that takes a score (0-100) and returns the letter grade (A, B, C, D, or F)",
          starterCode: `# Define your get_grade function here
def get_grade(score):
    # Return appropriate letter grade
    # A: 90+, B: 80-89, C: 70-79, D: 60-69, F: below 60
    pass

# Test your function
print(f"Score 95: {get_grade(95)}")
print(f"Score 87: {get_grade(87)}")
print(f"Score 72: {get_grade(72)}")`,
          expectedOutput: "Function returns correct letter grades",
          hints: [
            "Use if/elif statements to check score ranges",
            "Return the letter as a string",
            "Test edge cases like exactly 90, 80, etc."
          ]
        }
      },
      {
        id: "function-scope",
        title: "Variable Scope and Default Parameters",
        content: "Variables inside functions have local scope - they only exist within that function. You can also set default values for parameters.\n\nUnderstanding scope helps prevent variable conflicts.",
        code: `# Variable scope example
global_var = "I'm global!"

def scope_demo():
    local_var = "I'm local!"
    print(f"Inside function: {global_var}")
    print(f"Inside function: {local_var}")

scope_demo()
print(f"Outside function: {global_var}")
# print(local_var)  # This would cause an error!

# Default parameters
def greet_with_title(name, title="Mr./Ms."):
    return f"Hello, {title} {name}!"

# Call with and without optional parameter
print(greet_with_title("Smith"))
print(greet_with_title("Johnson", "Dr."))
print(greet_with_title("Brown", "Professor"))

# Function with multiple defaults
def create_profile(name, age=25, city="Unknown", occupation="Student"):
    return f"{name}, {age} years old, from {city}, works as {occupation}"

print(create_profile("Alice"))
print(create_profile("Bob", 30))
print(create_profile("Carol", 28, "Paris"))
print(create_profile("David", 35, "Tokyo", "Engineer"))`,
        output: `Inside function: I'm global!
Inside function: I'm local!
Outside function: I'm global!
Hello, Mr./Ms. Smith!
Hello, Dr. Johnson!
Hello, Professor Brown!
Alice, 25 years old, from Unknown, works as Student
Bob, 30 years old, from Unknown, works as Student
Carol, 28 years old, from Paris, works as Student
David, 35 years old, from Tokyo, works as Engineer`,
        tips: [
          "Local variables only exist inside their function",
          "Global variables can be read from anywhere",
          "Default parameters make functions more flexible",
          "Put required parameters before optional ones"
        ],
        practice: {
          challenge: "Create a function 'format_money' that takes an amount and optional currency (default 'USD') and returns a formatted string",
          starterCode: `# Define your format_money function here
def format_money(amount, currency="USD"):
    # Return formatted money string like "$50.00 USD"
    pass

# Test your function
print(format_money(50))
print(format_money(75.50, "EUR"))
print(format_money(1000, "JPY"))`,
          expectedOutput: "Function returns properly formatted money strings",
          hints: [
            "Format amount to 2 decimal places",
            "Include currency symbol or code",
            "Use f-strings for formatting"
          ]
        }
      }
    ]
  },

  // NEW: Data Structures
  "Data Structures": {
    type: "lesson",
    difficulty: "Beginner", 
    estimatedTime: "70 min",
    description: "Master Python's built-in data structures: lists, tuples, dictionaries, and sets.",
    steps: [
      {
        id: "lists-advanced",
        title: "Lists: Creation and Methods",
        content: "Lists are ordered, changeable collections that can store multiple items. They're one of the most versatile data structures in Python.\n\nLists have many useful methods for adding, removing, and organizing data.",
        code: `# Creating and modifying lists
fruits = ["apple", "banana", "orange"]
print(f"Original list: {fruits}")

# Adding items
fruits.append("grape")          # Add to end
fruits.insert(1, "kiwi")       # Insert at index 1
print(f"After adding: {fruits}")

# Accessing items
print(f"First fruit: {fruits[0]}")
print(f"Last fruit: {fruits[-1]}")
print(f"Middle fruits: {fruits[1:4]}")

# Removing items
removed = fruits.pop()          # Remove and return last item
print(f"Removed: {removed}")
fruits.remove("kiwi")          # Remove by value
print(f"After removing: {fruits}")

# List methods
numbers = [3, 1, 4, 1, 5, 9, 2, 6]
print(f"Numbers: {numbers}")
print(f"Length: {len(numbers)}")
print(f"Max: {max(numbers)}")
print(f"Min: {min(numbers)}")
print(f"Sum: {sum(numbers)}")

# Sorting
numbers.sort()
print(f"Sorted: {numbers}")
numbers.reverse()
print(f"Reversed: {numbers}")`,
        output: `Original list: ['apple', 'banana', 'orange']
After adding: ['apple', 'kiwi', 'banana', 'orange', 'grape']
First fruit: apple
Last fruit: grape
Middle fruits: ['kiwi', 'banana', 'orange']
Removed: grape
After removing: ['apple', 'banana', 'orange']
Numbers: [3, 1, 4, 1, 5, 9, 2, 6]
Length: 8
Max: 9
Min: 1
Sum: 31
Sorted: [1, 1, 2, 3, 4, 5, 6, 9]
Reversed: [9, 6, 5, 4, 3, 2, 1, 1]`,
        tips: [
          "Lists are ordered and changeable",
          "Use append() to add to the end",
          "Use insert() to add at specific position",
          "Negative indices count from the end"
        ],
        practice: {
          challenge: "Create a shopping list program that can add items, remove items, and display the current list",
          starterCode: `# Shopping list manager
shopping_list = []

# Add some items
# Remove an item
# Display the final list
# Show total number of items`,
          expectedOutput: "Program that manages a shopping list with add/remove operations",
          hints: [
            "Use append() to add items",
            "Use remove() to delete by name",
            "Use len() to count items",
            "Print the list at each step"
          ]
        }
      },
      {
        id: "dictionaries",
        title: "Dictionaries: Key-Value Pairs",
        content: "Dictionaries store data as key-value pairs. They're perfect for organizing related information and creating structured data.\n\nThink of dictionaries like real dictionaries where you look up a word (key) to find its definition (value).",
        code: `# Creating dictionaries
student = {
    "name": "Alice",
    "age": 20,
    "major": "Computer Science",
    "gpa": 3.8
}
print(f"Student info: {student}")

# Accessing values
print(f"Name: {student['name']}")
print(f"Age: {student['age']}")

# Adding and updating
student["year"] = "Junior"        # Add new key-value
student["age"] = 21              # Update existing value
print(f"Updated: {student}")

# Dictionary methods
print(f"Keys: {list(student.keys())}")
print(f"Values: {list(student.values())}")
print(f"Items: {list(student.items())}")

# Checking if key exists
if "email" in student:
    print(f"Email: {student['email']}")
else:
    print("No email address found")

# Safe access with get()
email = student.get("email", "No email provided")
print(f"Email: {email}")

# Looping through dictionary
print("\\nStudent details:")
for key, value in student.items():
    print(f"{key}: {value}")`,
        output: `Student info: {'name': 'Alice', 'age': 20, 'major': 'Computer Science', 'gpa': 3.8}
Name: Alice
Age: 20
Updated: {'name': 'Alice', 'age': 21, 'major': 'Computer Science', 'gpa': 3.8, 'year': 'Junior'}
Keys: ['name', 'age', 'major', 'gpa', 'year']
Values: ['Alice', 21, 'Computer Science', 3.8, 'Junior']
Items: [('name', 'Alice'), ('age', 21), ('major', 'Computer Science'), ('gpa', 3.8), ('year', 'Junior')]
No email address found
Email: No email provided

Student details:
name: Alice
age: 21
major: Computer Science
gpa: 3.8
year: Junior`,
        tips: [
          "Keys must be unique and immutable",
          "Use get() for safe access to avoid errors",
          "Dictionaries are unordered (in Python 3.7+ insertion order is preserved)",
          "Perfect for structured data like records"
        ],
        practice: {
          challenge: "Create a phone book dictionary that stores names and phone numbers, then add/lookup contacts",
          starterCode: `# Phone book dictionary
phone_book = {}

# Add some contacts
# Look up a contact
# Display all contacts
# Handle missing contacts safely`,
          expectedOutput: "Dictionary-based phone book with add/lookup functionality",
          hints: [
            "Use names as keys, phone numbers as values",
            "Use get() method to safely lookup contacts",
            "Loop through items() to display all contacts"
          ]
        }
      },
      {
        id: "tuples-sets",
        title: "Tuples and Sets",
        content: "Tuples are ordered, unchangeable collections. Sets are unordered collections of unique items.\n\nTuples are great for coordinates, RGB colors, or any data that shouldn't change. Sets are perfect for removing duplicates.",
        code: `# Tuples - unchangeable sequences
coordinates = (10, 20)
rgb_color = (255, 128, 0)
person = ("Alice", 25, "Engineer")

print(f"Coordinates: {coordinates}")
print(f"Color RGB: {rgb_color}")
print(f"Person: {person}")

# Accessing tuple items
print(f"X coordinate: {coordinates[0]}")
print(f"Y coordinate: {coordinates[1]}")

# Tuple unpacking
name, age, job = person
print(f"Name: {name}, Age: {age}, Job: {job}")

# Sets - unique collections
fruits = {"apple", "banana", "orange", "apple", "banana"}
print(f"Fruits set: {fruits}")  # Duplicates removed

# Set operations
tropical = {"mango", "pineapple", "coconut", "banana"}
print(f"Tropical fruits: {tropical}")

# Set methods
fruits.add("grape")
print(f"After adding grape: {fruits}")

# Set operations
common = fruits.intersection(tropical)
all_fruits = fruits.union(tropical)
only_regular = fruits.difference(tropical)

print(f"Common fruits: {common}")
print(f"All fruits: {all_fruits}")
print(f"Only regular fruits: {only_regular}")

# Removing duplicates from list
numbers = [1, 2, 3, 2, 4, 3, 5, 1]
unique_numbers = list(set(numbers))
print(f"Original: {numbers}")
print(f"Unique: {unique_numbers}")`,
        output: `Coordinates: (10, 20)
Color RGB: (255, 128, 0)
Person: ('Alice', 25, 'Engineer')
X coordinate: 10
Y coordinate: 20
Name: Alice, Age: 25, Job: Engineer
Fruits set: {'banana', 'apple', 'orange'}
Tropical fruits: {'banana', 'mango', 'coconut', 'pineapple'}
After adding grape: {'banana', 'apple', 'orange', 'grape'}
Common fruits: {'banana'}
All fruits: {'banana', 'apple', 'orange', 'grape', 'mango', 'coconut', 'pineapple'}
Only regular fruits: {'apple', 'orange', 'grape'}
Original: [1, 2, 3, 2, 4, 3, 5, 1]
Unique: [1, 2, 3, 4, 5]`,
        tips: [
          "Tuples use parentheses (), lists use brackets []",
          "Tuples can't be changed after creation",
          "Sets automatically remove duplicates",
          "Use sets for mathematical operations like union/intersection"
        ],
        practice: {
          challenge: "Create a program that takes two lists of student names and finds common students, unique to each class, and all students combined",
          starterCode: `# Student class analysis
class_a = ["Alice", "Bob", "Charlie", "Diana", "Alice"]
class_b = ["Bob", "Eve", "Frank", "Diana", "Grace"]

# Convert to sets and find:
# 1. Students in both classes
# 2. Students only in class A
# 3. Students only in class B  
# 4. All unique students`,
          expectedOutput: "Analysis showing common students, unique students, and all students",
          hints: [
            "Convert lists to sets first",
            "Use intersection() for common students",
            "Use difference() for unique students",
            "Use union() for all students combined"
          ]
        }
      }
    ]
  },

  // NEW: String Operations
  "String Operations": {
    type: "lesson",
    difficulty: "Beginner",
    estimatedTime: "50 min", 
    description: "Master string manipulation: formatting, methods, and text processing in Python.",
    steps: [
      {
        id: "string-methods",
        title: "String Methods and Manipulation",
        content: "Strings in Python have many built-in methods for manipulation. These methods don't change the original string - they return a new string.\n\nString methods are essential for text processing and data cleaning.",
        code: `# Basic string methods
message = "  Hello, Python World!  "
print(f"Original: '{message}'")
print(f"Length: {len(message)}")

# Cleaning methods
clean = message.strip()           # Remove whitespace
print(f"Stripped: '{clean}'")
print(f"Lowercase: {clean.lower()}")
print(f"Uppercase: {clean.upper()}")
print(f"Title case: {clean.title()}")

# Checking methods
text = "Python Programming"
print(f"\\nChecking '{text}':")
print(f"Starts with 'Python': {text.startswith('Python')}")
print(f"Ends with 'ing': {text.endswith('ing')}")
print(f"Contains 'gram': {'gram' in text}")
print(f"Is alphabetic: {text.isalpha()}")
print(f"Is alphanumeric: {text.isalnum()}")

# Searching and replacing
sentence = "I love cats and cats love me"
print(f"\\nOriginal: {sentence}")
print(f"Count 'cats': {sentence.count('cats')}")
print(f"Find 'cats': {sentence.find('cats')}")
print(f"Replace cats with dogs: {sentence.replace('cats', 'dogs')}")

# Splitting and joining
fruits = "apple,banana,orange,grape"
fruit_list = fruits.split(',')
print(f"\\nSplit fruits: {fruit_list}")
joined = " | ".join(fruit_list)
print(f"Joined: {joined}")`,
        output: `Original: '  Hello, Python World!  '
Length: 23
Stripped: 'Hello, Python World!'
Lowercase: hello, python world!
Uppercase: HELLO, PYTHON WORLD!
Title case: Hello, Python World!

Checking 'Python Programming':
Starts with 'Python': True
Ends with 'ing': True
Contains 'gram': True
Is alphabetic: False
Is alphanumeric: False

Original: I love cats and cats love me
Count 'cats': 2
Find 'cats': 7
Replace cats with dogs: I love dogs and dogs love me

Split fruits: ['apple', 'banana', 'orange', 'grape']
Joined: apple | banana | orange | grape`,
        tips: [
          "String methods return new strings, don't modify originals",
          "Use strip() to remove unwanted whitespace",
          "split() and join() are opposites",
          "String methods are chainable: text.strip().lower()"
        ],
        practice: {
          challenge: "Create a text processor that cleans and analyzes a user's input text",
          starterCode: `# Text analyzer
user_text = "  HELLO world! This is PYTHON programming.  "

# Clean the text (strip whitespace, convert to title case)
# Count total words
# Count how many times 'i' appears (case insensitive)
# Replace 'PYTHON' with 'Python'
# Display results`,
          expectedOutput: "Clean and analyze the text with word count and replacements",
          hints: [
            "Use strip() and title() for cleaning",
            "Use split() to count words",
            "Use lower() before counting characters",
            "Chain multiple string methods together"
          ]
        }
      },
      {
        id: "string-formatting",
        title: "String Formatting and F-Strings", 
        content: "Python offers multiple ways to format strings. F-strings (formatted string literals) are the modern, preferred method.\n\nF-strings make it easy to embed variables and expressions in strings.",
        code: "# F-string formatting (modern way)\n" +
"name = \"Alice\"\n" +
"age = 25\n" +
"height = 5.7\n\n" +
"# Basic f-string usage\n" +
"intro = f\"Hi, I'm {name} and I'm {age} years old.\"\n" +
"print(intro)\n\n" +
"# Expressions in f-strings\n" +
"print(f\"Next year I'll be {age + 1}\")\n" +
"print(f\"My height is {height} feet\")\n\n" +
"# Formatting numbers\n" +
"price = 29.99\n" +
"print(f\"Price: ${price:.2f}\")         # 2 decimal places\n" +
"print(f\"Price: ${price:.0f}\")         # No decimal places\n\n" +
"pi = 3.14159265359\n" +
"print(f\"Pi: {pi:.2f}\")                # 2 decimal places\n" +
"print(f\"Pi: {pi:.4f}\")                # 4 decimal places\n\n" +
"# Alignment and padding\n" +
"items = [\"Apple\", \"Banana\", \"Cherry\"]\n" +
"prices = [1.20, 0.75, 2.50]\n\n" +
"print(\"\\nShopping List:\")\n" +
"print(\"-\" * 20)\n" +
"for item, price in zip(items, prices):\n" +
"    print(f\"{item:<10} ${price:>6.2f}\")\n\n" +
"# Other formatting methods (older but still used)\n" +
"template = \"Hello, {} you are {} years old\"\n" +
"print(template.format(name, age))\n\n" +
"# With placeholders\n" +
"template2 = \"Hello, {0}! You are {1} years old. Nice to meet you, {0}!\"\n" +
"print(template2.format(name, age))",
        output: `Hi, I'm Alice and I'm 25 years old.
Next year I'll be 26
My height is 5.7 feet
Price: $29.99
Price: $30
Pi: 3.14
Pi: 3.1416

Shopping List:
--------------------
Apple      $ 1.20
Banana     $ 0.75
Cherry     $ 2.50
Hello, Alice you are 25 years old
Hello, Alice! You are 25 years old. Nice to meet you, Alice!`,
        tips: [
          "F-strings are the most readable and efficient",
          "Use :.2f for 2 decimal places",
          "Use :< for left align, :> for right align",
          "You can put any expression inside {}"
        ],
        practice: {
          challenge: "Create a grade report card formatter that displays student info and grades nicely formatted",
          starterCode: `# Grade report formatter
student_name = "John Smith"
student_id = 12345
math_grade = 87.5
science_grade = 92.0
english_grade = 78.5

# Calculate average grade
# Create a formatted report card using f-strings
# Include proper alignment and decimal formatting`,
          expectedOutput: "Nicely formatted report card with aligned columns and proper decimals",
          hints: [
            "Calculate average: (grade1 + grade2 + grade3) / 3",
            "Use f-strings with alignment (:< and :>)",
            "Format grades to 1 decimal place (:.1f)",
            "Add visual separators like dashes"
          ]
        }
      },
      {
        id: "string-slicing",
        title: "String Indexing and Slicing",
        content: "Strings are sequences of characters. You can access individual characters or slice parts of strings using indexing.\n\nPython uses zero-based indexing and supports negative indices.",
        code: `# String indexing
word = "Python"
print(f"Word: {word}")
print(f"Length: {len(word)}")

# Positive indexing (0-based)
print(f"First character: {word[0]}")
print(f"Second character: {word[1]}")
print(f"Last character: {word[5]}")

# Negative indexing (from end)
print(f"Last character: {word[-1]}")
print(f"Second to last: {word[-2]}")
print(f"First character: {word[-6]}")

# String slicing [start:end:step]
text = "Hello, World!"
print(f"\\nText: {text}")
print(f"First 5 chars: {text[0:5]}")
print(f"First 5 chars: {text[:5]}")      # Same as above
print(f"From index 7: {text[7:]}")
print(f"Last 6 chars: {text[-6:]}")
print(f"Middle part: {text[2:10]}")

# Slicing with step
alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
print(f"\\nAlphabet: {alphabet}")
print(f"Every 2nd letter: {alphabet[::2]}")
print(f"Every 3rd letter: {alphabet[::3]}")
print(f"Reverse: {alphabet[::-1]}")
print(f"First 10 reversed: {alphabet[9::-1]}")

# Practical examples
email = "user@example.com"
username = email[:email.find('@')]
domain = email[email.find('@')+1:]
print(f"\\nEmail: {email}")
print(f"Username: {username}")
print(f"Domain: {domain}")`,
        output: `Word: Python
Length: 6
First character: P
Second character: y
Last character: n
Last character: n
Second to last: o
First character: P

Text: Hello, World!
First 5 chars: Hello
First 5 chars: Hello
From index 7: World!
Last 6 chars: World!
Middle part: llo, Wor

Alphabet: ABCDEFGHIJKLMNOPQRSTUVWXYZ
Every 2nd letter: ACEGIKMOQSUWY
Every 3rd letter: ADGJMPSVY
Reverse: ZYXWVUTSRQPONMLKJIHGFEDCBA
First 10 reversed: JIHGFEDCBA

Email: user@example.com
Username: user
Domain: example.com`,
        tips: [
          "Negative indices count from the end (-1 is last)",
          "Slicing creates new strings, doesn't modify original",
          "Use [::-1] to reverse a string",
          "Empty start/end means beginning/end of string"
        ],
        practice: {
          challenge: "Create a program that extracts and analyzes parts of a full name",
          starterCode: `# Name analyzer
full_name = "Elizabeth Mary Johnson"

# Extract first name, middle name, and last name
# Display initials (first letter of each name)
# Create a username (first name + first letter of last name)
# Show the name in reverse`,
          expectedOutput: "Extract name parts, create initials and username, show reverse",
          hints: [
            "Use split() to separate names",
            "Use indexing [0] to get first characters",
            "Use slicing to get parts of strings",
            "Use [::-1] to reverse"
          ]
        }
      }
    ]
  },

  // NEW: Input/Output Operations
  "Input & Output": {
    type: "lesson",
    difficulty: "Beginner",
    estimatedTime: "45 min",
    description: "Learn to interact with users through input and create file operations for data persistence.",
    steps: [
      {
        id: "user-input",
        title: "Getting User Input",
        content: "The input() function lets your programs interact with users. It always returns a string, so you'll need to convert to other types when needed.\n\nInput validation is important for robust programs.",
        code: `# Basic input
name = input("What's your name? ")
print(f"Hello, {name}!")

# Input always returns strings
age_str = input("How old are you? ")
age = int(age_str)  # Convert to integer
print(f"Next year you'll be {age + 1}")

# Input with type conversion
height = float(input("Enter your height in feet: "))
print(f"Your height is {height} feet or {height * 12} inches")

# Multiple inputs
print("\\nEnter your favorite colors:")
color1 = input("First color: ")
color2 = input("Second color: ")
color3 = input("Third color: ")
colors = [color1, color2, color3]
print(f"Your favorite colors are: {', '.join(colors)}")

# Input validation example
while True:
    try:
        number = int(input("Enter a number between 1 and 10: "))
        if 1 <= number <= 10:
            print(f"Great! You entered {number}")
            break
        else:
            print("Number must be between 1 and 10!")
    except ValueError:
        print("Please enter a valid number!")

# Simple calculator with input
print("\\nSimple Calculator")
num1 = float(input("Enter first number: "))
operator = input("Enter operator (+, -, *, /): ")
num2 = float(input("Enter second number: "))

if operator == "+":
    result = num1 + num2
elif operator == "-":
    result = num1 - num2
elif operator == "*":
    result = num1 * num2
elif operator == "/":
    result = num1 / num2 if num2 != 0 else "Error: Division by zero"
else:
    result = "Error: Invalid operator"

print(f"Result: {num1} {operator} {num2} = {result}")`,
        output: `What's your name? Alice
Hello, Alice!
How old are you? 25
Next year you'll be 26
Enter your height in feet: 5.7
Your height is 5.7 feet or 68.4 inches

Enter your favorite colors:
First color: blue
Second color: green
Third color: red
Your favorite colors are: blue, green, red
Enter a number between 1 and 10: 15
Number must be between 1 and 10!
Enter a number between 1 and 10: abc
Please enter a valid number!
Enter a number between 1 and 10: 7
Great! You entered 7

Simple Calculator
Enter first number: 15
Enter operator (+, -, *, /): *
Enter second number: 3
Result: 15.0 * 3.0 = 45.0`,
        tips: [
          "input() always returns a string",
          "Use int() or float() to convert numbers",
          "Always validate user input",
          "Use try/except for error handling"
        ],
        practice: {
          challenge: "Create a personal information collector that gets user's name, age, city, and calculates birth year",
          starterCode: `# Personal info collector
print("Personal Information Form")
print("-" * 25)

# Get user's name, age, and city
# Calculate and display birth year (current year is 2025)
# Display a summary of all information`,
          expectedOutput: "Interactive form that collects and displays personal information",
          hints: [
            "Use input() for each piece of information",
            "Convert age to integer",
            "Birth year = 2025 - age",
            "Format output nicely"
          ]
        }
      },
      {
        id: "file-operations",
        title: "Basic File Operations",
        content: "Files let you save data permanently. Python makes it easy to read from and write to files.\n\nAlways use 'with' statements for file operations - they automatically close files.",
        code: `# Writing to a file
data = ["Alice", "Bob", "Charlie", "Diana"]

# Write a simple text file
with open("names.txt", "w") as file:
    for name in data:
        file.write(name + "\\n")
print("Names written to file!")

# Read the entire file
with open("names.txt", "r") as file:
    content = file.read()
    print("File contents:")
    print(content)

# Read line by line
print("Reading line by line:")
with open("names.txt", "r") as file:
    for line_number, line in enumerate(file, 1):
        print(f"Line {line_number}: {line.strip()}")

# Read all lines into a list
with open("names.txt", "r") as file:
    lines = file.readlines()
    print(f"\\nAll lines: {lines}")

# Append to existing file
with open("names.txt", "a") as file:
    file.write("Eve\\n")
    file.write("Frank\\n")
print("Added more names!")

# Working with CSV-like data
students = [
    "Alice,20,Computer Science",
    "Bob,22,Mathematics", 
    "Charlie,19,Physics"
]

with open("students.csv", "w") as file:
    file.write("Name,Age,Major\\n")  # Header
    for student in students:
        file.write(student + "\\n")

# Read and process CSV data
print("\\nStudent data:")
with open("students.csv", "r") as file:
    header = file.readline().strip()
    print(f"Header: {header}")
    
    for line in file:
        parts = line.strip().split(",")
        name, age, major = parts
        print(f"Student: {name}, Age: {age}, Major: {major}")`,
        output: `Names written to file!
File contents:
Alice
Bob
Charlie
Diana

Reading line by line:
Line 1: Alice
Line 2: Bob
Line 3: Charlie
Line 4: Diana

All lines: ['Alice\\n', 'Bob\\n', 'Charlie\\n', 'Diana\\n']
Added more names!

Student data:
Header: Name,Age,Major
Student: Alice, Age: 20, Major: Computer Science
Student: Bob, Age: 22, Major: Mathematics
Student: Charlie, Age: 19, Major: Physics`,
        tips: [
          "Use 'with' statements for automatic file closing",
          "Mode 'w' overwrites, 'a' appends, 'r' reads",
          "strip() removes newline characters",
          "split() helps parse CSV-like data"
        ],
        practice: {
          challenge: "Create a simple diary program that saves and reads diary entries",
          starterCode: `# Simple diary program
import datetime

# Get today's date
today = datetime.date.today()

# Get diary entry from user
# Save entry to a file named "diary.txt"
# Include the date with the entry
# Display confirmation message`,
          expectedOutput: "Diary program that saves dated entries to a file",
          hints: [
            "Use input() to get the diary entry",
            "Format: 'Date: entry_text'",
            "Use 'a' mode to append entries",
            "Add \\n for new lines"
          ]
        }
      }
    ]
  },

  // Error Handling - Essential for robust programs
  "Error Handling": {
    type: "lesson",
    difficulty: "Beginner",
    estimatedTime: "40 min",
    description: "Learn to handle errors gracefully in your Python programs using try, except, and finally blocks.",
    steps: [
      {
        id: "exception-intro",
        title: "What Are Exceptions?",
        content: "Exceptions are errors that occur during program execution. Instead of crashing, Python raises exceptions that can be caught and handled.\n\nCommon exceptions include ValueError, TypeError, ZeroDivisionError, and FileNotFoundError.",
        code: `# Examples of common exceptions
print("=== Common Python Exceptions ===")

# 1. ValueError - incorrect value type
try:
    age = int("not a number")
except ValueError as e:
    print(f"ValueError: {e}")

# 2. ZeroDivisionError - division by zero
try:
    result = 10 / 0
except ZeroDivisionError as e:
    print(f"ZeroDivisionError: {e}")

# 3. TypeError - wrong type operation
try:
    text = "hello"
    number = text + 5
except TypeError as e:
    print(f"TypeError: {e}")

# 4. IndexError - index out of range
try:
    numbers = [1, 2, 3]
    print(numbers[10])
except IndexError as e:
    print(f"IndexError: {e}")

# 5. KeyError - key doesn't exist in dictionary
try:
    person = {"name": "Alice", "age": 30}
    print(person["height"])
except KeyError as e:
    print(f"KeyError: {e}")

print("\\nProgram continues running after handling exceptions!")`,
        output: `=== Common Python Exceptions ===
ValueError: invalid literal for int() with base 10: 'not a number'
ZeroDivisionError: division by zero
TypeError: can only concatenate str (not "int") to str
IndexError: list index out of range
KeyError: 'height'

Program continues running after handling exceptions!`,
        tips: [
          "Exceptions prevent programs from crashing unexpectedly",
          "Use 'as e' to capture the error message",
          "Different exception types for different error categories",
          "Programs continue running after handling exceptions"
        ]
      },
      {
        id: "try-except-basics",
        title: "Try-Except Blocks",
        content: "Use try-except blocks to catch and handle specific exceptions. This allows your program to recover from errors gracefully.",
        code: `# Basic try-except structure
print("=== Safe Number Input ===")

def safe_input_number(prompt):
    while True:
        try:
            value = float(input(prompt))
            return value
        except ValueError:
            print("Please enter a valid number!")

# Using the safe input function
# number = safe_input_number("Enter a number: ")
# print(f"You entered: {number}")

# Multiple exception types
print("\\n=== Division Calculator ===")

def safe_divide(a, b):
    try:
        result = a / b
        return f"{a} ÷ {b} = {result}"
    except ZeroDivisionError:
        return "Error: Cannot divide by zero!"
    except TypeError:
        return "Error: Both values must be numbers!"

# Test different scenarios
print(safe_divide(10, 2))      # Normal division
print(safe_divide(10, 0))      # Division by zero
print(safe_divide(10, "2"))    # Type error

# Catching multiple exceptions
print("\\n=== List Access ===")

def safe_get_item(lst, index):
    try:
        return f"Item at index {index}: {lst[index]}"
    except (IndexError, TypeError) as e:
        return f"Error accessing list: {e}"

my_list = [10, 20, 30, 40, 50]
print(safe_get_item(my_list, 2))    # Valid index
print(safe_get_item(my_list, 10))   # Index out of range
print(safe_get_item(my_list, "a"))  # Invalid index type`,
        output: `=== Safe Number Input ===

=== Division Calculator ===
10 ÷ 2 = 5.0
Error: Cannot divide by zero!
Error: Both values must be numbers!

=== List Access ===
Item at index 2: 30
Error accessing list: list index out of range
Error accessing list: list indices must be integers or slices, not str`,
        tips: [
          "Use specific exception types when possible",
          "Handle multiple exceptions with tuple: (Error1, Error2)",
          "Use 'as e' to get error details",
          "Create user-friendly error messages"
        ],
        practice: {
          challenge: "Create a safe calculator that handles all possible errors",
          starterCode: `# Safe calculator function
def safe_calculator():
    print("Safe Calculator")
    print("-" * 15)
    
    try:
        # Get first number
        # Get operation (+, -, *, /)
        # Get second number
        # Perform calculation
        # Return result
        pass
    except:
        # Handle different types of errors
        pass

# Test your calculator
# safe_calculator()`,
          expectedOutput: "Calculator that gracefully handles all input errors",
          hints: [
            "Handle ValueError for invalid number input",
            "Handle ZeroDivisionError for division by zero",
            "Validate operator is one of +, -, *, /",
            "Use specific except blocks for each error type"
          ]
        }
      },
      {
        id: "finally-blocks",
        title: "Finally Blocks and Best Practices",
        content: "The finally block always executes, whether an exception occurs or not. It's perfect for cleanup operations like closing files.",
        code: `# Finally block example
print("=== File Operations with Finally ===")

def read_file_safely(filename):
    file = None
    try:
        print(f"Attempting to open {filename}...")
        file = open(filename, 'r')
        content = file.read()
        print(f"File content: {content[:50]}...")
        return content
    except FileNotFoundError:
        print(f"Error: File '{filename}' not found!")
        return None
    except PermissionError:
        print(f"Error: Permission denied for '{filename}'!")
        return None
    finally:
        if file:
            file.close()
            print("File closed successfully.")
        else:
            print("No file to close.")

# Test with existing and non-existing files
read_file_safely("test.txt")
print()
read_file_safely("nonexistent.txt")

# Exception handling best practices
print("\\n=== Exception Handling Best Practices ===")

class UserInputValidator:
    @staticmethod
    def get_age():
        while True:
            try:
                age = int(input("Enter your age (1-120): "))
                if not 1 <= age <= 120:
                    raise ValueError("Age must be between 1 and 120")
                return age
            except ValueError as e:
                if "invalid literal" in str(e):
                    print("Please enter a valid number!")
                else:
                    print(f"Invalid age: {e}")
    
    @staticmethod
    def get_email():
        while True:
            try:
                email = input("Enter your email: ").strip()
                if "@" not in email or "." not in email:
                    raise ValueError("Email must contain @ and . symbols")
                if len(email) < 5:
                    raise ValueError("Email too short")
                return email
            except ValueError as e:
                print(f"Invalid email: {e}")

# Using the validator
# age = UserInputValidator.get_age()
# email = UserInputValidator.get_email()
# print(f"Valid input - Age: {age}, Email: {email}")

# Comprehensive error handling example
def robust_data_processor(data):
    results = []
    errors = []
    
    for i, item in enumerate(data):
        try:
            # Process each item
            if isinstance(item, str):
                processed = item.upper().strip()
            elif isinstance(item, (int, float)):
                processed = item * 2
            else:
                raise TypeError(f"Unsupported type: {type(item)}")
            
            results.append(processed)
            
        except Exception as e:
            error_msg = f"Item {i}: {e}"
            errors.append(error_msg)
            print(f"Warning: {error_msg}")
    
    return results, errors

# Test with mixed data
test_data = ["hello", 42, 3.14, None, "world", [1, 2, 3]]
results, errors = robust_data_processor(test_data)

print(f"\\nProcessed {len(results)} items successfully")
print(f"Encountered {len(errors)} errors")
print(f"Results: {results}")`,
        output: `=== File Operations with Finally ===
Attempting to open test.txt...
Error: File 'test.txt' not found!
No file to close.

Attempting to open nonexistent.txt...
Error: File 'nonexistent.txt' not found!
No file to close.

=== Exception Handling Best Practices ===

Warning: Item 3: Unsupported type: <class 'NoneType'>
Warning: Item 5: Unsupported type: <class 'list'>

Processed 4 items successfully
Encountered 2 errors
Results: ['HELLO', 84, 6.28, 'WORLD']`,
        tips: [
          "Use finally for cleanup operations",
          "Be specific with exception types",
          "Create custom error messages for users",
          "Log errors but don't crash the program",
          "Validate input early and often"
        ],
        practice: {
          challenge: "Create a robust file manager that handles all file operations safely",
          starterCode: `# Robust file manager
class FileManager:
    def __init__(self):
        self.operations_log = []
    
    def safe_write_file(self, filename, content):
        # Write content to file with error handling
        # Log the operation (success or failure)
        pass
    
    def safe_read_file(self, filename):
        # Read file content with error handling
        # Log the operation
        pass
    
    def get_operations_log(self):
        # Return log of all operations
        return self.operations_log

# Test your file manager
# fm = FileManager()
# fm.safe_write_file("test.txt", "Hello, World!")
# content = fm.safe_read_file("test.txt")
# print(fm.get_operations_log())`,
          expectedOutput: "File manager that safely handles all file operations and logs results",
          hints: [
            "Use try-except-finally blocks",
            "Handle FileNotFoundError, PermissionError",
            "Always close files in finally block",
            "Log both successful and failed operations",
            "Return meaningful status messages"
          ]
        }
      }
    ]
  },

  // Object-Oriented Programming - Moving to Intermediate
  "OOP (Object-Oriented Programming)": {
    type: "lesson",
    difficulty: "Intermediate",
    estimatedTime: "90 min",
    description: "Learn object-oriented programming concepts: classes, objects, inheritance, and encapsulation.",
    steps: [
      {
        id: "classes-objects-intro",
        title: "Introduction to Classes and Objects",
        content: "Object-Oriented Programming (OOP) is a programming paradigm that organizes code into classes and objects. A class is a blueprint for creating objects, and an object is an instance of a class.\n\nOOP helps organize complex programs and makes code reusable and maintainable.",
        code: `# Creating your first class
class Person:
    # Class attribute (shared by all instances)
    species = "Homo sapiens"
    
    # Constructor method (__init__)
    def __init__(self, name, age):
        # Instance attributes (unique to each object)
        self.name = name
        self.age = age
        self.friends = []
    
    # Instance method
    def introduce(self):
        return f"Hi, I'm {self.name} and I'm {self.age} years old."
    
    # Instance method
    def add_friend(self, friend_name):
        self.friends.append(friend_name)
        return f"{friend_name} is now my friend!"
    
    # Instance method
    def list_friends(self):
        if self.friends:
            return f"My friends are: {', '.join(self.friends)}"
        return "I don't have any friends yet."

# Creating objects (instances)
person1 = Person("Alice", 25)
person2 = Person("Bob", 30)

# Using object methods
print(person1.introduce())
print(person2.introduce())

# Accessing attributes
print(f"Person 1 name: {person1.name}")
print(f"Person 2 age: {person2.age}")

# Using methods
print(person1.add_friend("Charlie"))
print(person1.add_friend("Diana"))
print(person1.list_friends())

# Class attributes are shared
print(f"Person 1 species: {person1.species}")
print(f"Person 2 species: {person2.species}")

# Each object has its own instance attributes
print(f"Person 1 friends: {person1.friends}")
print(f"Person 2 friends: {person2.friends}")`,
        output: `Hi, I'm Alice and I'm 25 years old.
Hi, I'm Bob and I'm 30 years old.
Person 1 name: Alice
Person 2 age: 30
Charlie is now my friend!
Diana is now my friend!
My friends are: Charlie, Diana
Person 1 species: Homo sapiens
Person 2 species: Homo sapiens
Person 1 friends: ['Charlie', 'Diana']
Person 2 friends: []`,
        tips: [
          "__init__ is the constructor method called when creating objects",
          "self refers to the current instance of the class",
          "Instance attributes are unique to each object",
          "Class attributes are shared by all instances",
          "Methods are functions defined inside a class"
        ]
      },
      {
        id: "class-methods-properties",
        title: "Advanced Class Features",
        content: "Learn about class methods, static methods, and properties. These advanced features help create more sophisticated and flexible classes.",
        code: `# Advanced class features
class BankAccount:
    # Class attribute - bank name
    bank_name = "Python Bank"
    # Class attribute - total accounts created
    total_accounts = 0
    
    def __init__(self, owner, initial_balance=0):
        self.owner = owner
        self.balance = initial_balance
        self.account_number = f"PB{BankAccount.total_accounts + 1:04d}"
        BankAccount.total_accounts += 1
        self.transaction_history = []
        self._add_transaction("Account opened", initial_balance)
    
    # Regular instance method
    def deposit(self, amount):
        if amount > 0:
            self.balance += amount
            self._add_transaction("Deposit", amount)
            return "Deposited $" + str(amount) + ". New balance: $" + str(self.balance)
        return "Deposit amount must be positive"
    
    def withdraw(self, amount):
        if amount > 0 and amount <= self.balance:
            self.balance -= amount
            self._add_transaction("Withdrawal", -amount)
            return "Withdrew $" + str(amount) + ". New balance: $" + str(self.balance)
        return "Invalid withdrawal amount"
    
    # Private method (convention: starts with _)
    def _add_transaction(self, description, amount):
        self.transaction_history.append({
            'description': description,
            'amount': amount,
            'balance_after': self.balance
        })
    
    # Property - acts like an attribute but runs code
    @property
    def account_info(self):
        return "Account " + self.account_number + ": " + self.owner + " - Balance: $" + str(self.balance)
    
    # Property setter
    @property
    def balance_status(self):
        if self.balance >= 1000:
            return "Premium Account"
        elif self.balance >= 100:
            return "Standard Account"
        else:
            return "Basic Account"
    
    # Class method - works with the class, not instance
    @classmethod
    def get_bank_info(cls):
        return "Welcome to " + cls.bank_name + "! Total accounts: " + str(cls.total_accounts)
    
    # Static method - doesn't need class or instance
    @staticmethod
    def calculate_interest(principal, rate, time):
        return principal * (1 + rate) ** time
    
    # String representation
    def __str__(self):
        return "BankAccount(" + self.owner + ", $" + str(self.balance) + ")"
    
    def __repr__(self):
        return "BankAccount(owner='" + self.owner + "', initial_balance=" + str(self.balance) + ")"

# Using the advanced features
print(BankAccount.get_bank_info())

# Create accounts
account1 = BankAccount("Alice", 500)
account2 = BankAccount("Bob", 1200)

print("\\nAccount Info:")
print(account1.account_info)
print(account2.account_info)

print("\\nBalance Status:")
print("Alice: " + account1.balance_status)
print("Bob: " + account2.balance_status)

# Perform transactions
print("\\nTransactions:")
print(account1.deposit(300))
print(account1.withdraw(100))
print("Updated status: " + account1.balance_status)

# Using static method
interest = BankAccount.calculate_interest(1000, 0.05, 3)
print("\\nInterest calculation: $1000 at 5% for 3 years = $" + str(round(interest, 2)))

# String representations
print("\\nString representations:")
print("str(): " + str(account1))
print("repr(): " + repr(account1))

print("\\nBank info: " + BankAccount.get_bank_info())`,
        output: `Welcome to Python Bank! Total accounts: 0

Account Info:
Account PB0001: Alice - Balance: $500
Account PB0002: Bob - Balance: $1200

Balance Status:
Alice: Standard Account
Bob: Premium Account

Transactions:
Deposited $300. New balance: $800
Withdrew $100. New balance: $700
Updated status: Standard Account

Interest calculation: $1000 at 5% for 3 years = $1157.63

String representations:
str(): BankAccount(Alice, $700)
repr(): BankAccount(owner='Alice', initial_balance=700)

Bank info: Welcome to Python Bank! Total accounts: 2`,
        tips: [
          "@property makes methods act like attributes",
          "@classmethod works with the class, use cls parameter",
          "@staticmethod doesn't need self or cls",
          "__str__ for user-friendly string representation",
          "__repr__ for developer-friendly representation",
          "Use _ prefix for 'private' methods (convention only)"
        ],
        practice: {
          challenge: "Create a Student class with grades management and GPA calculation",
          starterCode: `# Student management system
class Student:
    school_name = "Python Academy"
    total_students = 0
    
    def __init__(self, name, student_id):
        # Initialize student with name and ID
        # Create empty grades list
        # Increment total_students
        pass
    
    def add_grade(self, subject, grade):
        # Add a grade for a subject (grade should be 0-100)
        # Store as dictionary: {'subject': subject, 'grade': grade}
        pass
    
    @property
    def gpa(self):
        # Calculate GPA (average of all grades on 4.0 scale)
        # 90-100: 4.0, 80-89: 3.0, 70-79: 2.0, 60-69: 1.0, below 60: 0.0
        pass
    
    @property
    def academic_status(self):
        # Return status based on GPA
        # 3.5+: "Dean's List", 3.0+: "Good Standing", 2.0+: "Probation", <2.0: "Academic Warning"
        pass
    
    @classmethod
    def get_school_info(cls):
        # Return school name and total students
        pass
    
    @staticmethod
    def grade_to_gpa_point(grade):
        # Convert numeric grade to GPA point
        pass

# Test your Student class
# student1 = Student("Alice", "S001")
# student1.add_grade("Math", 95)
# student1.add_grade("Science", 87)
# print(f"GPA: {student1.gpa}")
# print(f"Status: {student1.academic_status}")`,
          expectedOutput: "Complete student management system with grades, GPA calculation, and academic status",
          hints: [
            "Store grades as list of dictionaries",
            "GPA calculation: sum all grades, convert to 4.0 scale, average",
            "Use grade ranges for GPA point conversion",
            "Class methods use cls, static methods need no special parameter"
          ]
        }
      },
      {
        id: "inheritance-polymorphism",
        title: "Inheritance and Polymorphism",
        content: "Inheritance allows classes to inherit attributes and methods from parent classes. Polymorphism allows objects of different classes to be used interchangeably through a common interface.",
        code: `# Inheritance and Polymorphism Example
class Animal:
    def __init__(self, name, species):
        self.name = name
        self.species = species
        self.energy = 100
    
    def eat(self):
        self.energy += 20
        return self.name + " is eating. Energy: " + str(self.energy)
    
    def sleep(self):
        self.energy += 30
        return self.name + " is sleeping. Energy: " + str(self.energy)
    
    def make_sound(self):
        return self.name + " makes a sound"
    
    def move(self):
        return self.name + " moves around"
    
    def __str__(self):
        return self.name + " the " + self.species

# Child classes inherit from Animal
class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name, "Dog")  # Call parent constructor
        self.breed = breed
        self.tricks = []
    
    # Override parent method (polymorphism)
    def make_sound(self):
        return self.name + " barks: Woof! Woof!"
    
    def move(self):
        return self.name + " runs around playfully"
    
    # New method specific to Dog
    def learn_trick(self, trick):
        self.tricks.append(trick)
        return self.name + " learned to " + trick + "!"
    
    def perform_tricks(self):
        if self.tricks:
            return self.name + " can: " + ", ".join(self.tricks)
        return self.name + " doesn't know any tricks yet"

class Cat(Animal):
    def __init__(self, name, indoor=True):
        super().__init__(name, "Cat")
        self.indoor = indoor
        self.mood = "content"
    
    def make_sound(self):
        return self.name + " meows: Meow!"
    
    def move(self):
        return self.name + " gracefully prowls around"
    
    def purr(self):
        self.mood = "happy"
        return self.name + " is purring contentedly"
    
    def scratch_furniture(self):
        self.mood = "mischievous"
        return self.name + " is scratching the furniture!"

class Bird(Animal):
    def __init__(self, name, can_fly=True):
        super().__init__(name, "Bird")
        self.can_fly = can_fly
        self.altitude = 0
    
    def make_sound(self):
        return self.name + " chirps: Tweet tweet!"
    
    def move(self):
        if self.can_fly:
            return self.name + " flies gracefully"
        return self.name + " hops around"
    
    def fly(self, height):
        if self.can_fly:
            self.altitude = height
            return self.name + " flies to " + str(height) + " feet high!"
        return self.name + " cannot fly"

# Creating instances
animals = [
    Dog("Buddy", "Golden Retriever"),
    Cat("Whiskers", indoor=True),
    Bird("Tweety", can_fly=True),
    Dog("Rex", "German Shepherd")
]

print("=== Animal Interactions ===")
for animal in animals:
    print("\\n" + str(animal))
    print(animal.make_sound())
    print(animal.move())
    print(animal.eat())

# Specific behaviors
print("\\n=== Specific Behaviors ===")
buddy = animals[0]  # Dog
whiskers = animals[1]  # Cat
tweety = animals[2]  # Bird

print(buddy.learn_trick("sit"))
print(buddy.learn_trick("fetch"))
print(buddy.perform_tricks())

print(whiskers.purr())
print(whiskers.scratch_furniture())

print(tweety.fly(100))

# Polymorphism - same method, different behavior
print("\\n=== Polymorphism Demo ===")
def animal_chorus(animal_list):
    print("All animals make sounds:")
    for animal in animal_list:
        print("  " + animal.make_sound())

animal_chorus(animals)

# Method resolution order
print("\\n=== Class Hierarchy ===")
print("Dog MRO: " + str(Dog.__mro__))
print("Cat MRO: " + str(Cat.__mro__))

# Using isinstance and type checking
print("\\n=== Type Checking ===")
for animal in animals:
    print(animal.name + " is Animal: " + str(isinstance(animal, Animal)))
    print(animal.name + " is Dog: " + str(isinstance(animal, Dog)))
    print(animal.name + " type: " + type(animal).__name__)`,
        output: `=== Animal Interactions ===

Buddy the Dog
Buddy barks: Woof! Woof!
Buddy runs around playfully
Buddy is eating. Energy: 120

Whiskers the Cat
Whiskers meows: Meow!
Whiskers gracefully prowls around
Whiskers is eating. Energy: 120

Tweety the Bird
Tweety chirps: Tweet tweet!
Tweety flies gracefully
Tweety is eating. Energy: 120

Rex the Dog
Rex barks: Woof! Woof!
Rex runs around playfully
Rex is eating. Energy: 120

=== Specific Behaviors ===
Buddy learned to sit!
Buddy learned to fetch!
Buddy can: sit, fetch
Whiskers is purring contentedly
Whiskers is scratching the furniture!
Tweety flies to 100 feet high!

=== Polymorphism Demo ===
All animals make sounds:
  Buddy barks: Woof! Woof!
  Whiskers meows: Meow!
  Tweety chirps: Tweet tweet!
  Rex barks: Woof! Woof!

=== Class Hierarchy ===
Dog MRO: (<class '__main__.Dog'>, <class '__main__.Animal'>, <class 'object'>)
Cat MRO: (<class '__main__.Cat'>, <class '__main__.Animal'>, <class 'object'>)

=== Type Checking ===
Buddy is Animal: True
Buddy is Dog: True
Buddy type: Dog
Whiskers is Animal: True
Whiskers is Dog: False
Whiskers type: Cat
Tweety is Animal: True
Tweety is Dog: False
Tweety type: Bird
Rex is Animal: True
Rex is Dog: True
Rex type: Dog`,
        tips: [
          "super() calls the parent class methods",
          "Child classes can override parent methods",
          "Polymorphism allows same interface, different implementations",
          "isinstance() checks if object is instance of a class",
          "__mro__ shows method resolution order",
          "All classes inherit from 'object' in Python"
        ],
        practice: {
          challenge: "Create a vehicle hierarchy with different types of vehicles",
          starterCode: `# Vehicle inheritance system
class Vehicle:
    def __init__(self, make, model, year):
        # Initialize basic vehicle properties
        # Add fuel_level, max_speed attributes
        pass
    
    def start_engine(self):
        # Return message about starting engine
        pass
    
    def stop_engine(self):
        # Return message about stopping engine
        pass
    
    def honk(self):
        # Generic honk sound
        pass

class Car(Vehicle):
    def __init__(self, make, model, year, doors):
        # Call parent constructor
        # Add doors attribute
        pass
    
    def honk(self):
        # Override with car-specific honk
        pass
    
    def open_trunk(self):
        # Car-specific method
        pass

class Motorcycle(Vehicle):
    def __init__(self, make, model, year, engine_size):
        # Call parent constructor
        # Add engine_size attribute
        pass
    
    def honk(self):
        # Override with motorcycle-specific honk
        pass
    
    def wheelie(self):
        # Motorcycle-specific method
        pass

class Truck(Vehicle):
    def __init__(self, make, model, year, cargo_capacity):
        # Call parent constructor
        # Add cargo_capacity attribute
        pass
    
    def honk(self):
        # Override with truck-specific honk
        pass
    
    def load_cargo(self, weight):
        # Truck-specific method
        pass

# Test your vehicle hierarchy
# Create different vehicles and test polymorphism`,
          expectedOutput: "Complete vehicle hierarchy demonstrating inheritance and polymorphism",
          hints: [
            "Use super().__init__() to call parent constructor",
            "Override honk() method in each child class",
            "Add vehicle-specific attributes and methods",
            "Test polymorphism by treating all vehicles the same way"
          ]
        }
      }
    ]
  }
};
const validatePythonCode = (code: string, practice: any) => {
  const errors: string[] = [];
  let isCorrect = true;
  
  // Basic syntax validation
  const lines = code.split('\n').filter(line => line.trim());
  
  // Check for required elements based on the lesson
  if (practice.challenge.toLowerCase().includes('variable')) {
    const hasVariable = /\w+\s*=\s*.+/.test(code);
    if (!hasVariable) {
      errors.push('Line missing: You need to create a variable assignment (e.g., name = "value")');
      isCorrect = false;
    }
  }
  
  if (practice.challenge.toLowerCase().includes('print')) {
    const hasPrint = /print\s*\(/.test(code);
    if (!hasPrint) {
      errors.push('Line missing: You need to use print() function to display output');
      isCorrect = false;
    }
  }
  
  if (practice.challenge.toLowerCase().includes('if') || practice.challenge.toLowerCase().includes('condition')) {
    const hasIf = /if\s+.+:/.test(code);
    if (!hasIf) {
      errors.push('Line missing: You need an if statement (if condition:)');
      isCorrect = false;
    }
  }
  
  if (practice.challenge.toLowerCase().includes('loop') || practice.challenge.toLowerCase().includes('for')) {
    const hasLoop = /for\s+\w+\s+in\s+/.test(code) || /while\s+.+:/.test(code);
    if (!hasLoop) {
      errors.push('Line missing: You need a loop (for or while statement)');
      isCorrect = false;
    }
  }
  
  if (practice.challenge.toLowerCase().includes('function') || practice.challenge.toLowerCase().includes('def')) {
    const hasFunction = /def\s+\w+\s*\(/.test(code);
    if (!hasFunction) {
      errors.push('Line missing: You need to define a function using def');
      isCorrect = false;
    }
  }
  
  // Check for basic Python syntax errors
  lines.forEach((line, index) => {
    const lineNum = index + 1;
    
    // Check for proper indentation in control structures
    if (line.match(/:\s*$/) && index < lines.length - 1) {
      const nextLine = lines[index + 1];
      if (nextLine && !nextLine.startsWith('    ') && !nextLine.startsWith('\t')) {
        errors.push(`Line ${lineNum + 1}: Missing indentation after colon (:)`);
        isCorrect = false;
      }
    }
    
    // Check for missing colons in control structures
    if (line.trim().match(/^(if|elif|else|for|while|def|class)\s+/) && !line.includes(':')) {
      errors.push(`Line ${lineNum}: Missing colon (:) at end of statement`);
      isCorrect = false;
    }
    
    // Check for unmatched parentheses in print statements
    const printMatch = line.match(/print\s*\(/);
    if (printMatch) {
      const openParens = (line.match(/\(/g) || []).length;
      const closeParens = (line.match(/\)/g) || []).length;
      if (openParens !== closeParens) {
        errors.push(`Line ${lineNum}: Unmatched parentheses in print statement`);
        isCorrect = false;
      }
    }
  });
  
  // Check if output matches expected
  if (practice.expectedOutput && isCorrect) {
    // Simple check for expected content in output
    const expectedWords = practice.expectedOutput.toLowerCase().split(/\s+/);
    const codeWords = code.toLowerCase().split(/\s+/);
    
    const hasExpectedContent = expectedWords.some(word => 
      word.length > 2 && codeWords.includes(word)
    );
    
    if (!hasExpectedContent && !code.includes('input(')) {
      errors.push('Output mismatch: Your code output may not match the expected result');
      isCorrect = false;
    }
  }
  
  let message = '';
  if (isCorrect) {
    message = '✅ Excellent! Your code is correct and follows Python best practices.';
  } else {
    message = `❌ Your code needs some improvements. Found ${errors.length} issue(s).`;
  }
  
  return { isCorrect, message, errors };
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
  const [leftPanelWidth, setLeftPanelWidth] = useState(50); // Percentage
  const [isPracticeMinimized, setIsPracticeMinimized] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [showCodeExample, setShowCodeExample] = useState(false);
  const [codeValidationResult, setCodeValidationResult] = useState<{
    isCorrect: boolean;
    message: string;
    errors?: string[];
  } | null>(null);
  const [terminalHeight, setTerminalHeight] = useState(200); // Terminal height in pixels
  const [isTerminalResizing, setIsTerminalResizing] = useState(false);
  
  // Determine language based on lesson title or content
  const getLanguageFromTitle = (title: string): string => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('python') || titleLower.includes('syntax & variables') || 
        titleLower.includes('data types') || titleLower.includes('control structures') ||
        titleLower.includes('loops') || titleLower.includes('functions') ||
        titleLower.includes('oop')) {
      return 'python';
    }
    if (titleLower.includes('javascript') || titleLower.includes('js')) {
      return 'javascript';
    }
    if (titleLower.includes('html')) {
      return 'html';
    }
    if (titleLower.includes('css')) {
      return 'css';
    }
    return 'python'; // Default to Python for this learning path
  };

  const currentLanguage = getLanguageFromTitle(title);
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
    setCodeValidationResult(null);
    
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
    if (currentLanguage === 'python') {
      // For Python lessons, copy to practice area
      setPracticeCode(code);
      setPracticeOutput('Code copied to practice area! Click "Run Code" to execute.');
    } else {
      // For other languages, copy to clipboard
      navigator.clipboard.writeText(code);
    }
  };

  const runPracticeCode = () => {
    const practice = (currentStepData as LessonStep).practice;
    if (practice) {
      if (currentLanguage === 'python') {
        // Validate code against expected patterns and requirements
        const validation = validatePythonCode(practiceCode, practice);
        setCodeValidationResult(validation);
        
        // Simulate Python code execution
        try {
          let output = '';
          
          // Simple Python print() simulation
          const printStatements = practiceCode.match(/print\((.*?)\)/g);
          if (printStatements) {
            printStatements.forEach(statement => {
              const content = statement.match(/print\((.*?)\)/)?.[1];
              if (content) {
                // Remove quotes and evaluate simple expressions
                let result = content.replace(/["']/g, '');
                
                // Handle simple variable assignments
                const lines = practiceCode.split('\n');
                lines.forEach(line => {
                  const varMatch = line.match(/(\w+)\s*=\s*(.+)/);
                  if (varMatch) {
                    const varName = varMatch[1];
                    const varValue = varMatch[2].replace(/["']/g, '');
                    result = result.replace(new RegExp(varName, 'g'), varValue);
                  }
                });
                
                // Handle simple arithmetic
                try {
                  if (/^[\d\s+\-*/().]+$/.test(result)) {
                    result = eval(result).toString();
                  }
                } catch (e) {
                  // Keep original if eval fails
                }
                
                output += result + '\n';
              }
            });
          }
          
          // Check for common Python patterns
          if (practiceCode.includes('range(')) {
            output += 'Loop executed successfully!\n';
          }
          
          if (practiceCode.includes('if ') || practiceCode.includes('for ') || practiceCode.includes('while ')) {
            output += 'Control structure executed!\n';
          }
          
          if (!output) {
            output = 'Code executed successfully! (No output produced)';
          }
          
          // Add validation feedback to output
          if (validation.isCorrect) {
            output += '\n✅ Great job! Your code meets all requirements.';
          } else {
            output += '\n❌ Code needs improvement. Check the feedback below.';
          }
          
          setPracticeOutput(output.trim());
        } catch (error) {
          setPracticeOutput(`Error: ${error}`);
          setCodeValidationResult({
            isCorrect: false,
            message: 'Code execution failed',
            errors: [`Runtime Error: ${error}`]
          });
        }
      } else {
        // Original HTML/CSS/JavaScript logic
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
    }
  };

  const resetPracticeCode = () => {
    const practice = (currentStepData as LessonStep).practice;
    setPracticeCode(practice?.starterCode || '');
    setPracticeOutput('');
    setCodeValidationResult(null);
  };

  const initializePractice = () => {
    const practice = (currentStepData as LessonStep).practice;
    if (practice && !practiceCode) {
      if (currentLanguage === 'python' && practice.starterCode) {
        setPracticeCode(practice.starterCode);
        setPracticeOutput('Ready to practice! Modify the code and click "Run Code" to see results.');
      } else {
        setPracticeCode(practice.starterCode || '');
      }
    }
  };

  // Auto-show practice for Python lessons
  React.useEffect(() => {
    if (currentLanguage === 'python' && currentStepData && (currentStepData as LessonStep).practice) {
      setShowPractice(true);
      if (!practiceCode) {
        initializePractice();
      }
    }
  }, [currentStepData, currentLanguage]);

  // Handle panel resizing
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true);
    e.preventDefault();
    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'col-resize';
  };

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizing) {
        const container = document.querySelector('[data-resize-container]') as HTMLElement;
        if (container) {
          const containerRect = container.getBoundingClientRect();
          const containerWidth = containerRect.width - 4; // Account for resizer width
          const relativeX = e.clientX - containerRect.left;
          const newLeftWidth = Math.min(Math.max((relativeX / containerWidth) * 100, 25), 75);
          setLeftPanelWidth(newLeftWidth);
        }
      }
    };

    const handleMouseUp = () => {
      if (isResizing) {
        setIsResizing(false);
        document.body.style.userSelect = '';
        document.body.style.cursor = '';
      }
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  // Handle terminal resizing
  const handleTerminalMouseDown = (e: React.MouseEvent) => {
    setIsTerminalResizing(true);
    e.preventDefault();
    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'row-resize';
  };

  React.useEffect(() => {
    const handleTerminalMouseMove = (e: MouseEvent) => {
      if (isTerminalResizing) {
        const container = document.querySelector('[data-terminal-container]') as HTMLElement;
        if (container) {
          const containerRect = container.getBoundingClientRect();
          const maxHeight = containerRect.height - 100; // Leave space for editor
          const relativeY = containerRect.bottom - e.clientY;
          const newHeight = Math.min(Math.max(relativeY, 100), maxHeight);
          setTerminalHeight(newHeight);
        }
      }
    };

    const handleTerminalMouseUp = () => {
      if (isTerminalResizing) {
        setIsTerminalResizing(false);
        document.body.style.userSelect = '';
        document.body.style.cursor = '';
      }
    };

    if (isTerminalResizing) {
      document.addEventListener('mousemove', handleTerminalMouseMove);
      document.addEventListener('mouseup', handleTerminalMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleTerminalMouseMove);
      document.removeEventListener('mouseup', handleTerminalMouseUp);
    };
  }, [isTerminalResizing]);

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
    <div className="min-h-screen bg-background overflow-auto custom-scrollbar">
      {/* Custom CSS for enhanced scrollbars */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(229, 231, 235, 0.3);
            border-radius: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgb(156, 163, 175);
            border-radius: 4px;
            border: 1px solid rgba(229, 231, 235, 0.3);
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgb(107, 114, 128);
          }
          .dark .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(55, 65, 81, 0.3);
          }
          .dark .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgb(107, 114, 128);
            border: 1px solid rgba(55, 65, 81, 0.3);
          }
          .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgb(156, 163, 175);
          }
          /* Terminal specific scrollbar styling */
          .terminal-scrollbar::-webkit-scrollbar {
            width: 6px;
            height: 6px;
          }
          .terminal-scrollbar::-webkit-scrollbar-track {
            background: rgb(31, 41, 55);
          }
          .terminal-scrollbar::-webkit-scrollbar-thumb {
            background: rgb(75, 85, 99);
            border-radius: 3px;
          }
          .terminal-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgb(107, 114, 128);
          }
          /* Main container scrollbar */
          body::-webkit-scrollbar {
            width: 10px;
          }
          body::-webkit-scrollbar-track {
            background: rgba(229, 231, 235, 0.2);
          }
          body::-webkit-scrollbar-thumb {
            background: rgb(156, 163, 175);
            border-radius: 5px;
          }
          body::-webkit-scrollbar-thumb:hover {
            background: rgb(107, 114, 128);
          }
        `
      }} />
      
      <div className="max-w-full h-screen flex flex-col overflow-auto custom-scrollbar">
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

        {/* Header */}
        <Card className="mx-4 mt-4 p-3 border-b">
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
                  {currentLanguage === 'python' && (
                    <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                      🐍 Interactive Python
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground">Step {currentStep + 1} of {steps.length}</div>
              <Progress value={progress} className="w-32" />
              <Button size="sm" onClick={handleStepComplete}>
                {currentStep === steps.length - 1 ? (
                  <>
                    <Award className="h-4 w-4 mr-2" />
                    Complete
                  </>
                ) : (
                  <>
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>

        {/* Main Split Layout - VS Code Style */}
        <div className="flex-1 mx-4 mb-4 flex relative overflow-auto custom-scrollbar" style={{ height: 'calc(100vh - 200px)' }} data-resize-container>
          {/* Left Panel - Learning Content */}
          <div 
            className="flex flex-col bg-card border border-r-0 rounded-l-lg overflow-hidden"
            style={{ width: `${leftPanelWidth}%` }}
          >
            {/* Left Panel Header */}
            <div className="border-b bg-muted/50 px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold">Learning Content</span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newStep = Math.max(0, currentStep - 1);
                    handleStepChange(newStep);
                  }}
                  disabled={currentStep === 0}
                >
                  <ArrowLeft className="h-3 w-3" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newStep = Math.min(steps.length - 1, currentStep + 1);
                    handleStepChange(newStep);
                  }}
                  disabled={currentStep === steps.length - 1}
                >
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </div>
            </div>

            {/* Left Panel Content - Scrollable */}
            <div className="flex-1 overflow-y-auto overflow-x-auto custom-scrollbar">
              <div className="p-4 space-y-4 h-full">
                {/* Step Title */}
                <div>
                  <h2 className="text-xl font-bold mb-2">{currentStepData.title}</h2>
                  <div className="text-sm text-muted-foreground mb-4">
                    Step {currentStep + 1} of {steps.length}
                  </div>
                </div>

                {/* Content */}
                <div className="prose prose-sm max-w-none">
                  {currentStepData.content.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-3 leading-relaxed text-sm">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Example Code - Collapsible */}
                {currentStepData.code && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowCodeExample(!showCodeExample)}
                        className="text-sm"
                      >
                        <Code className="h-4 w-4 mr-2" />
                        {showCodeExample ? 'Hide' : 'Show'} Code Example
                      </Button>
                      {showCodeExample && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => copyCode(currentStepData.code!)}
                        >
                          <Copy className="h-3 w-3 mr-1" />
                          {currentLanguage === 'python' ? 'Copy to Practice' : 'Copy'}
                        </Button>
                      )}
                    </div>
                    
                    {showCodeExample && (
                      <>
                        <div className="border rounded-lg overflow-hidden mb-3" style={{ height: '300px' }}>
                          <div className="bg-gray-800 text-gray-300 px-3 py-1 text-xs border-b flex items-center justify-between">
                            <span>📄 example.py</span>
                            <div className="flex items-center gap-2">
                              <span className="text-gray-500">Read-only</span>
                              <div className="flex gap-1">
                                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                              </div>
                            </div>
                          </div>
                          <div className="h-full overflow-auto custom-scrollbar">
                            <CodeEditor
                              value={currentStepData.code}
                              onChange={() => {}} // Read-only for examples
                              language={currentLanguage}
                            />
                          </div>
                        </div>
                        
                        {(currentStepData as LessonStep).output && (
                          <div>
                            <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                              <Monitor className="h-4 w-4" />
                              Expected Output
                            </h4>
                            <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
                              <div className="bg-gray-800 text-gray-300 px-3 py-1 text-xs border-b flex items-center gap-2">
                                <Terminal className="h-3 w-3" />
                                <span>Console Output</span>
                              </div>
                              <div className="p-3 max-h-32 overflow-y-auto overflow-x-auto custom-scrollbar">
                                <pre className="text-xs text-green-400 font-mono whitespace-pre-wrap">
{(currentStepData as LessonStep).output}
                                </pre>
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}

                {/* Tips */}
                {currentStepData.tips && (
                  <div>
                    <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                      <Lightbulb className="h-4 w-4 text-yellow-500" />
                      Tips & Best Practices
                    </h3>
                    <div className="bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 max-h-48 overflow-y-auto custom-scrollbar">
                      <ul className="space-y-2">
                        {currentStepData.tips.map((tip, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-xs text-yellow-700 dark:text-yellow-300 leading-relaxed">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Practice Challenge Description */}
                {(currentStepData as LessonStep).practice && (
                  <div>
                    <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                      <Target className="h-4 w-4 text-orange-500" />
                      Practice Challenge
                    </h3>
                    
                    {/* Challenge Instructions */}
                    <div className="bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800 rounded-lg p-4 mb-4 max-h-80 overflow-y-auto custom-scrollbar">
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-sm font-semibold text-orange-900 dark:text-orange-100 mb-2">📝 Your Task:</h4>
                          <p className="text-sm text-orange-700 dark:text-orange-300">
                            {((currentStepData as LessonStep).practice!).challenge}
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-semibold text-orange-900 dark:text-orange-100 mb-2">🎯 Expected Result:</h4>
                          <p className="text-sm text-orange-600 dark:text-orange-400">
                            {((currentStepData as LessonStep).practice!).expectedOutput}
                          </p>
                        </div>
                        
                        {/* Approach Examples */}
                        <div>
                          <h4 className="text-sm font-semibold text-orange-900 dark:text-orange-100 mb-2">💡 How to Approach:</h4>
                          <ul className="text-xs text-orange-700 dark:text-orange-300 space-y-1">
                            {currentLanguage === 'python' && (
                              <>
                                {((currentStepData as LessonStep).practice!).challenge.toLowerCase().includes('variable') && (
                                  <li>• Start by creating variables to store your data</li>
                                )}
                                {((currentStepData as LessonStep).practice!).challenge.toLowerCase().includes('print') && (
                                  <li>• Use print() function to display your output</li>
                                )}
                                {((currentStepData as LessonStep).practice!).challenge.toLowerCase().includes('if') && (
                                  <li>• Use if statements to make decisions in your code</li>
                                )}
                                {((currentStepData as LessonStep).practice!).challenge.toLowerCase().includes('loop') && (
                                  <li>• Consider using a for loop or while loop to repeat actions</li>
                                )}
                                <li>• Test your code step by step as you write it</li>
                                <li>• Make sure your output matches the expected result exactly</li>
                              </>
                            )}
                          </ul>
                        </div>
                        
                        {currentLanguage === 'python' && (
                          <div className="bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 rounded p-3 mt-3">
                            <p className="text-xs text-blue-600 dark:text-blue-400 flex items-center gap-1">
                              <Terminal className="h-3 w-3" />
                              <strong>Getting Started:</strong> {showCodeExample ? 'Modify the code example above' : 'Click "Show Code Example" above for a starting point'}, then customize it for this challenge!
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Hints */}
                    <div className="mb-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowHints(!showHints)}
                        className="mb-3"
                      >
                        <Lightbulb className="h-3 w-3 mr-1" />
                        {showHints ? 'Hide Hints' : 'Show Hints'} ({((currentStepData as LessonStep).practice!).hints.length})
                      </Button>

                      {showHints && (
                        <Card className="p-3 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 max-h-64 overflow-y-auto custom-scrollbar">
                          <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2 text-sm">💡 Step-by-Step Hints:</h4>
                          <ul className="space-y-2">
                            {((currentStepData as LessonStep).practice!).hints.map((hint, index) => (
                              <li key={index} className="text-xs text-blue-700 dark:text-blue-300 flex items-start gap-2">
                                <span className="bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                                  {index + 1}
                                </span>
                                <span className="leading-relaxed">{hint}</span>
                              </li>
                            ))}
                          </ul>
                        </Card>
                      )}
                    </div>
                  </div>
                )}

                {/* Step Progress Overview */}
                <div>
                  <h3 className="text-sm font-semibold mb-3">Lesson Progress</h3>
                  <div className="space-y-1 max-h-64 overflow-y-auto border rounded-lg p-2 bg-muted/30 custom-scrollbar">
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
                </div>
              </div>
            </div>
          </div>

          {/* Resizer */}
          <div 
            className="w-1 bg-gray-300 dark:bg-gray-600 hover:bg-primary/70 cursor-col-resize flex items-center justify-center relative group transition-colors z-10"
            onMouseDown={handleMouseDown}
          >
            <div className="w-0.5 h-8 bg-gray-400 dark:bg-gray-500 group-hover:bg-primary transition-colors rounded-full"></div>
          </div>

          {/* Right Panel - Practice Environment */}
          <div 
            className={`flex flex-col bg-card border border-l-0 rounded-r-lg overflow-hidden transition-all duration-300 ${
              isPracticeMinimized ? 'w-8' : ''
            }`}
            style={{ width: isPracticeMinimized ? '32px' : `${100 - leftPanelWidth}%` }}
          >
            {/* Right Panel Header */}
            <div className="border-b bg-gray-800 text-gray-300 px-4 py-2 flex items-center justify-between">
              {!isPracticeMinimized ? (
                <>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <Terminal className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-semibold text-white">Python Practice Environment</span>
                    </div>
                    {currentLanguage === 'python' && practiceCode && (
                      <div className="flex items-center gap-2 text-xs">
                        <div className={`h-2 w-2 rounded-full ${autoSaveIndicator ? 'bg-green-500 animate-pulse' : 'bg-orange-500'}`}></div>
                        <span className={autoSaveIndicator ? 'text-green-400' : 'text-orange-400'}>
                          {autoSaveIndicator ? 'Auto-saved' : 'Editing...'}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="ghost" onClick={resetPracticeCode} className="h-7 text-gray-300 hover:text-white hover:bg-gray-700">
                      <RefreshCw className="h-3 w-3 mr-1" />
                      Reset
                    </Button>
                    <Button size="sm" onClick={runPracticeCode} className="h-7 bg-green-600 hover:bg-green-700 text-white">
                      <Play className="h-3 w-3 mr-1" />
                      Run Code
                    </Button>
                    <div className="w-px h-4 bg-gray-600 mx-1"></div>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => setIsPracticeMinimized(true)}
                      className="h-7 w-7 p-0 text-gray-400 hover:text-white hover:bg-gray-700"
                    >
                      ⏷
                    </Button>
                  </div>
                </>
              ) : (
                <Button 
                  size="sm" 
                  variant="ghost"
                  onClick={() => setIsPracticeMinimized(false)}
                  className="w-full justify-center h-7 text-gray-400 hover:text-white hover:bg-gray-700"
                >
                  ⏵
                </Button>
              )}
            </div>

            {/* Right Panel Content */}
            {!isPracticeMinimized && (
              <div className="flex-1 flex flex-col min-h-0" data-terminal-container>
                {/* Code Editor with VS Code features */}
                <div className="flex-1 min-h-0 flex flex-col" style={{ height: `calc(100% - ${(practiceOutput || codeValidationResult) ? terminalHeight : 0}px)` }}>
                  {/* Editor Tab Bar */}
                  <div className="bg-gray-800 text-gray-300 px-3 py-1 text-xs border-b border-gray-700 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="bg-blue-600 text-white px-2 py-0.5 rounded text-xs">🐍</span>
                      <span>practice.py</span>
                      {practiceCode && (
                        <div className={`w-2 h-2 rounded-full ${autoSaveIndicator ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className={`${autoSaveIndicator ? 'text-green-400' : 'text-orange-400'}`}>
                        {autoSaveIndicator ? '● Saved' : '● Unsaved changes'}
                      </span>
                      <span className="text-gray-500">Python 3.12</span>
                    </div>
                  </div>
                  
                  {/* Editor Area */}
                  <div className="flex-1 relative overflow-auto custom-scrollbar">
                    <CodeEditor
                      value={practiceCode}
                      onChange={setPracticeCode}
                      language={currentLanguage}
                    />
                    
                    {/* Line Count Indicator */}
                    <div className="absolute bottom-2 right-2 bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs">
                      {practiceCode.split('\n').length} lines
                    </div>
                  </div>
                </div>

                {/* Enhanced Terminal Output Section - Resizable */}
                {(practiceOutput || codeValidationResult) && (
                  <>
                    {/* Terminal Resizer */}
                    <div 
                      className="h-1 bg-gray-600 hover:bg-primary/70 cursor-row-resize flex items-center justify-center relative group transition-colors z-10"
                      onMouseDown={handleTerminalMouseDown}
                    >
                      <div className="w-8 h-0.5 bg-gray-400 dark:bg-gray-500 group-hover:bg-primary transition-colors rounded-full"></div>
                    </div>
                    
                    <div 
                      className="border-t border-gray-700 bg-gray-900 flex flex-col"
                      style={{ height: `${terminalHeight}px`, minHeight: '100px' }}
                    >
                      {/* Terminal Header */}
                      <div className="bg-gray-800 text-gray-300 px-3 py-2 text-xs border-b border-gray-700 flex items-center justify-between flex-shrink-0">
                        <div className="flex items-center gap-2">
                          <Terminal className="h-4 w-4 text-green-500" />
                          <span>Terminal</span>
                          <div className="flex gap-1">
                            <div className="w-2 h-2 rounded-full bg-red-500"></div>
                            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-6 w-6 p-0" 
                            onClick={() => {setPracticeOutput(''); setCodeValidationResult(null);}}
                            title="Clear terminal"
                          >
                            <RefreshCw className="h-3 w-3 text-gray-400" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0"
                            onClick={() => setTerminalHeight(terminalHeight === 400 ? 200 : 400)}
                            title="Toggle terminal size"
                          >
                            <div className="text-gray-400 text-xs">⇕</div>
                          </Button>
                          <span className="text-gray-500">bash</span>
                        </div>
                      </div>
                      
                      {/* Terminal Content - Fully Scrollable */}
                      <div className="flex-1 overflow-y-auto overflow-x-auto p-3 font-mono text-sm min-h-0 terminal-scrollbar">
                        {/* Command Line */}
                        <div className="flex items-center text-green-400 mb-2">
                          <span className="text-blue-400">user@python-env</span>
                          <span className="text-gray-400">:</span>
                          <span className="text-purple-400">~/practice</span>
                          <span className="text-gray-400">$ </span>
                          <span className="text-green-400">python practice.py</span>
                        </div>
                        
                        {/* Code Execution Output */}
                        {practiceOutput && (
                          <div className="mb-3">
                            <div className="text-gray-400 text-xs mb-1">Output:</div>
                            <pre className="text-green-400 whitespace-pre-wrap leading-relaxed">
{practiceOutput}
                            </pre>
                          </div>
                        )}
                        
                        {/* Validation Feedback */}
                        {codeValidationResult && (
                          <div className="mt-3 border-t border-gray-700 pt-3">
                            <div className="flex items-center gap-2 mb-2">
                              {codeValidationResult.isCorrect ? (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              ) : (
                                <Target className="h-4 w-4 text-red-500" />
                              )}
                              <span className={`text-sm font-semibold ${
                                codeValidationResult.isCorrect ? 'text-green-400' : 'text-red-400'
                              }`}>
                                Code Analysis
                              </span>
                            </div>
                            
                            <div className={`text-xs mb-2 ${
                              codeValidationResult.isCorrect ? 'text-green-300' : 'text-red-300'
                            }`}>
                              {codeValidationResult.message}
                            </div>
                            
                            {codeValidationResult.errors && codeValidationResult.errors.length > 0 && (
                              <div className="space-y-1">
                                <div className="text-xs text-red-400 font-semibold">Issues Found:</div>
                                {codeValidationResult.errors.map((error, index) => (
                                  <div key={index} className="text-xs text-red-300 flex items-start gap-2 pl-2">
                                    <span className="text-red-500 mt-0.5 flex-shrink-0">❌</span>
                                    <span className="leading-relaxed">{error}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                            
                            {codeValidationResult.isCorrect && (
                              <div className="mt-2 flex items-center gap-2 text-xs text-green-400">
                                <Award className="h-3 w-3" />
                                <span>✨ Perfect! Your code meets all requirements. Ready for next step!</span>
                              </div>
                            )}
                          </div>
                        )}
                        
                        {/* Command Prompt */}
                        <div className="flex items-center text-green-400 mt-2">
                          <span className="text-blue-400">user@python-env</span>
                          <span className="text-gray-400">:</span>
                          <span className="text-purple-400">~/practice</span>
                          <span className="text-gray-400">$ </span>
                          <span className="animate-pulse">_</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}