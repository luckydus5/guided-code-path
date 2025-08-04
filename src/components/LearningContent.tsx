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
  },

  // Modules & Packages - Essential for code organization
  "Modules & Packages": {
    type: "lesson",
    difficulty: "Intermediate",
    estimatedTime: "60 min",
    description: "Learn to organize code into reusable modules and packages. Master import statements and create your own modules.",
    steps: [
      {
        id: "modules-intro",
        title: "What Are Modules?",
        content: "Modules are Python files containing code that can be imported and reused in other programs. They help organize code, avoid repetition, and create libraries.\n\nPython has built-in modules (like math, random, datetime) and you can create your own modules.",
        code: `# Using built-in modules
import math
import random
import datetime

# Math module examples
print("=== Math Module ===")
print("Pi:", math.pi)
print("Square root of 16:", math.sqrt(16))
print("Ceiling of 4.2:", math.ceil(4.2))
print("Floor of 4.8:", math.floor(4.8))
print("Factorial of 5:", math.factorial(5))

# Random module examples
print("\\n=== Random Module ===")
print("Random number 1-10:", random.randint(1, 10))
print("Random choice from list:", random.choice(['apple', 'banana', 'cherry']))
print("Random float 0-1:", random.random())

# Shuffle a list
numbers = [1, 2, 3, 4, 5]
random.shuffle(numbers)
print("Shuffled list:", numbers)

# Datetime module examples
print("\\n=== Datetime Module ===")
now = datetime.datetime.now()
print("Current date and time:", now)
print("Current date:", now.date())
print("Current time:", now.time())
print("Year:", now.year)
print("Month:", now.month)
print("Day:", now.day)

# Create specific date
birthday = datetime.date(1990, 5, 15)
print("Birthday:", birthday)
print("Days since birthday:", (now.date() - birthday).days)`,
        output: `=== Math Module ===
Pi: 3.141592653589793
Square root of 16: 4.0
Ceiling of 4.2: 5
Floor of 4.8: 4
Factorial of 5: 120

=== Random Module ===
Random number 1-10: 7
Random choice from list: banana
Random float 0-1: 0.8394571285645
Shuffled list: [3, 1, 5, 2, 4]

=== Datetime Module ===
Current date and time: 2024-03-15 14:30:25.123456
Current date: 2024-03-15
Current time: 14:30:25.123456
Year: 2024
Month: 3
Day: 15
Birthday: 1990-05-15
Days since birthday: 12357`,
        tips: [
          "import loads the entire module",
          "Use module.function() to access functions",
          "Built-in modules are always available",
          "Check documentation with help(module_name)"
        ]
      },
      {
        id: "import-variations",
        title: "Different Ways to Import",
        content: "Python offers several ways to import modules and their contents. Each method has its use cases and benefits.",
        code: `# Different import methods
print("=== Import Variations ===")

# Method 1: Import entire module
import math
result1 = math.sqrt(25)
print("Method 1 - import math:", result1)

# Method 2: Import specific functions
from math import sqrt, pi, factorial
result2 = sqrt(25)
print("Method 2 - from math import sqrt:", result2)
print("Pi directly:", pi)
print("Factorial of 4:", factorial(4))

# Method 3: Import with alias
import datetime as dt
now = dt.datetime.now()
print("Method 3 - import datetime as dt:", now.strftime("%Y-%m-%d"))

# Method 4: Import all (use with caution!)
from random import *
random_num = randint(1, 100)
print("Method 4 - from random import *:", random_num)

# Method 5: Import multiple items
from os import getcwd, listdir, path
print("Current directory:", getcwd())
print("Directory exists:", path.exists("."))

# Import with multiple aliases
from json import loads as json_parse, dumps as json_stringify
data = {"name": "Alice", "age": 30}
json_string = json_stringify(data)
parsed_data = json_parse(json_string)
print("JSON string:", json_string)
print("Parsed data:", parsed_data)

# Conditional imports
try:
    import requests
    print("Requests library is available")
except ImportError:
    print("Requests library not installed")
    
# Check what's available in a module
import sys
print("\\nSome sys module attributes:")
print("Python version:", sys.version_info)
print("Python path:", sys.path[:2])  # Show first 2 paths`,
        output: `=== Import Variations ===
Method 1 - import math: 5.0
Method 2 - from math import sqrt: 5.0
Pi directly: 3.141592653589793
Factorial of 4: 24
Method 3 - import datetime as dt: 2024-03-15
Method 4 - from random import *: 42
Current directory: /home/user/projects
Directory exists: True
JSON string: {"name": "Alice", "age": 30}
Parsed data: {'name': 'Alice', 'age': 30}
Requests library is available

Some sys module attributes:
Python version: sys.version_info(major=3, minor=11, micro=0, releaselevel='final', serial=0)
Python path: ['/home/user/projects', '/usr/lib/python3.11']`,
        tips: [
          "from module import * can cause naming conflicts",
          "Use aliases for long module names",
          "Import only what you need for better performance",
          "Try/except ImportError for optional dependencies"
        ],
        practice: {
          challenge: "Create a utility script that uses multiple import methods to build a simple file analyzer",
          starterCode: `# File analyzer using different import methods
# Import os module with alias
# Import specific functions from pathlib
# Import datetime for file timestamps

def analyze_file(filename):
    # Check if file exists
    # Get file size
    # Get file creation/modification time
    # Get file extension
    # Return analysis dictionary
    pass

def format_file_size(size_bytes):
    # Convert bytes to human readable format (KB, MB, GB)
    # Use math module for calculations
    pass

# Test your analyzer
# filename = "test.txt"
# analysis = analyze_file(filename)
# print("File Analysis:", analysis)`,
          expectedOutput: "File analyzer that checks existence, size, timestamps, and extension",
          hints: [
            "Use os.path or pathlib for file operations",
            "datetime.fromtimestamp() for readable dates",
            "os.path.getsize() for file size",
            "os.path.splitext() for file extension"
          ]
        }
      },
      {
        id: "creating-modules",
        title: "Creating Your Own Modules",
        content: "You can create your own modules by writing Python files. Any .py file can be imported as a module. This promotes code reuse and organization.",
        code: `# Example: Creating a custom math utilities module
# File: math_utils.py (this would be a separate file)

def calculate_area_circle(radius):
    """Calculate the area of a circle."""
    import math
    return math.pi * radius ** 2

def calculate_area_rectangle(length, width):
    """Calculate the area of a rectangle."""
    return length * width

def calculate_area_triangle(base, height):
    """Calculate the area of a triangle."""
    return 0.5 * base * height

def is_prime(n):
    """Check if a number is prime."""
    if n < 2:
        return False
    for i in range(2, int(n ** 0.5) + 1):
        if n % i == 0:
            return False
    return True

def fibonacci(n):
    """Generate fibonacci sequence up to n terms."""
    sequence = []
    a, b = 0, 1
    for _ in range(n):
        sequence.append(a)
        a, b = b, a + b
    return sequence

# Module-level variables
PI = 3.14159
E = 2.71828

# Module initialization code
print("Math utils module loaded!")

# Using the custom module (if it existed)
# import math_utils

print("=== Using Custom Module ===")
# Simulate using the module functions
def calculate_area_circle(radius):
    import math
    return math.pi * radius ** 2

def is_prime(n):
    if n < 2:
        return False
    for i in range(2, int(n ** 0.5) + 1):
        if n % i == 0:
            return False
    return True

def fibonacci(n):
    sequence = []
    a, b = 0, 1
    for _ in range(n):
        sequence.append(a)
        a, b = b, a + b
    return sequence

# Test the functions
print("Circle area (radius 5):", calculate_area_circle(5))
print("Is 17 prime?", is_prime(17))
print("Is 15 prime?", is_prime(15))
print("First 8 Fibonacci numbers:", fibonacci(8))

# Demonstrating __name__ == "__main__"
def main():
    """Main function - only runs when script is executed directly."""
    print("\\n=== Module Main Function ===")
    print("This runs only when the module is executed directly")
    print("Not when it's imported by another module")
    
    # Test all functions
    print("Testing all functions:")
    print("- Circle area (r=3):", calculate_area_circle(3))
    print("- Prime check (13):", is_prime(13))
    print("- Fibonacci (5):", fibonacci(5))

# This is the key pattern for modules
if __name__ == "__main__":
    main()`,
        output: `=== Using Custom Module ===
Circle area (radius 5): 78.53981633974483
Is 17 prime? True
Is 15 prime? False
First 8 Fibonacci numbers: [0, 1, 1, 2, 3, 5, 8, 13]

=== Module Main Function ===
This runs only when the module is executed directly
Not when it's imported by another module
Testing all functions:
- Circle area (r=3): 28.274333882308138
- Prime check (13): True
- Fibonacci (5): [0, 1, 1, 2, 3]`,
        tips: [
          "Any .py file can be imported as a module",
          "Use docstrings to document your functions",
          "__name__ == '__main__' allows modules to be both imported and run",
          "Module-level code runs when the module is first imported"
        ],
        practice: {
          challenge: "Create a text processing module with various string utilities",
          starterCode: `# text_utils.py - Text processing utilities module

def count_words(text):
    """Count the number of words in text."""
    # Split text and count words
    pass

def count_characters(text, include_spaces=True):
    """Count characters in text."""
    # Count characters with option to include/exclude spaces
    pass

def reverse_words(text):
    """Reverse the order of words in text."""
    # Split, reverse, and join words
    pass

def capitalize_words(text):
    """Capitalize the first letter of each word."""
    # Use string methods to capitalize
    pass

def remove_punctuation(text):
    """Remove punctuation from text."""
    # Remove common punctuation marks
    pass

def get_word_frequency(text):
    """Return a dictionary of word frequencies."""
    # Count how many times each word appears
    pass

# Module constants
VOWELS = "aeiouAEIOU"
CONSONANTS = "bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ"

def main():
    # Test all functions with sample text
    sample_text = "Hello, World! This is a test text."
    print("Sample text:", sample_text)
    # Test each function
    pass

if __name__ == "__main__":
    main()`,
          expectedOutput: "Complete text processing module with word counting, formatting, and analysis functions",
          hints: [
            "Use split() to break text into words",
            "string.punctuation contains common punctuation",
            "Dictionary for word frequency counting",
            "Test each function in the main() function"
          ]
        }
      }
    ]
  },

  // Working with External Libraries - Real-world Python development
  "Working with External Libraries": {
    type: "lesson",
    difficulty: "Intermediate",
    estimatedTime: "75 min",
    description: "Learn to use pip for package management and work with popular Python libraries like requests, datetime, os, and json.",
    steps: [
      {
        id: "pip-package-management",
        title: "Package Management with pip",
        content: "pip is Python's package installer. It allows you to install, upgrade, and manage external libraries from the Python Package Index (PyPI).",
        code: `# pip commands (run these in terminal/command prompt)
# Install a package
# pip install requests

# Install specific version
# pip install requests==2.28.0

# Install multiple packages
# pip install requests beautifulsoup4 pandas

# Upgrade a package
# pip upgrade requests

# Uninstall a package
# pip uninstall requests

# List installed packages
# pip list

# Show package information
# pip show requests

# Install from requirements file
# pip install -r requirements.txt

# Create requirements file
# pip freeze > requirements.txt

# Python code to check installed packages
import sys
import subprocess

def check_package_installed(package_name):
    """Check if a package is installed."""
    try:
        __import__(package_name)
        return True
    except ImportError:
        return False

def get_package_version(package_name):
    """Get the version of an installed package."""
    try:
        import importlib.metadata
        return importlib.metadata.version(package_name)
    except:
        return "Version not found"

# Check common packages
packages_to_check = ['json', 'os', 'datetime', 'sys', 'math']
print("=== Checking Built-in Packages ===")
for package in packages_to_check:
    installed = check_package_installed(package)
    print(f"{package}: {'✓ Installed' if installed else '✗ Not found'}")

# Simulate pip list output
print("\\n=== Simulated pip list ===")
print("Package         Version")
print("--------------- -------")
print("pip            23.1.2")
print("setuptools     67.8.0")
print("wheel          0.40.0")

# Example requirements.txt content
requirements_content = '''
requests>=2.28.0
beautifulsoup4==4.12.2
pandas>=1.5.0
numpy>=1.21.0
matplotlib>=3.5.0
'''

print("\\n=== Example requirements.txt ===")
print(requirements_content.strip())`,
        output: `=== Checking Built-in Packages ===
json: ✓ Installed
os: ✓ Installed
datetime: ✓ Installed
sys: ✓ Installed
math: ✓ Installed

=== Simulated pip list ===
Package         Version
--------------- -------
pip            23.1.2
setuptools     67.8.0
wheel          0.40.0

=== Example requirements.txt ===
requests>=2.28.0
beautifulsoup4==4.12.2
pandas>=1.5.0
numpy>=1.21.0
matplotlib>=3.5.0`,
        tips: [
          "Use virtual environments to avoid package conflicts",
          "Pin specific versions in production (package==1.2.3)",
          "Use >= for minimum version requirements",
          "Always check package documentation for usage examples"
        ]
      },
      {
        id: "requests-library",
        title: "HTTP Requests with requests Library",
        content: "The requests library makes HTTP requests simple and pythonic. It's essential for API interactions and web scraping.",
        code: `# Working with the requests library
# Note: In a real environment, you'd need: pip install requests

# Simulating requests library functionality
import json
import urllib.request
import urllib.parse

class MockResponse:
    def __init__(self, data, status_code=200):
        self.data = data
        self.status_code = status_code
        self.headers = {'Content-Type': 'application/json'}
    
    def json(self):
        return json.loads(self.data) if isinstance(self.data, str) else self.data
    
    def text(self):
        return json.dumps(self.data) if not isinstance(self.data, str) else self.data

# Mock requests module
class requests:
    @staticmethod
    def get(url, params=None, headers=None):
        # Simulate different API responses
        if "jsonplaceholder" in url:
            return MockResponse({
                "userId": 1,
                "id": 1,
                "title": "Sample Post",
                "body": "This is a sample post body"
            })
        elif "weather" in url:
            return MockResponse({
                "location": "New York",
                "temperature": 22,
                "condition": "Sunny",
                "humidity": 65
            })
        return MockResponse({"message": "Mock response"})
    
    @staticmethod
    def post(url, data=None, json=None, headers=None):
        return MockResponse({"status": "created", "id": 123}, 201)

# Using requests for API calls
print("=== GET Request Example ===")
response = requests.get("https://jsonplaceholder.typicode.com/posts/1")
print(f"Status Code: {response.status_code}")
print(f"Response: {response.json()}")

print("\\n=== Weather API Example ===")
weather_response = requests.get("https://api.weather.com/current")
weather_data = weather_response.json()
print(f"Location: {weather_data['location']}")
print(f"Temperature: {weather_data['temperature']}°C")
print(f"Condition: {weather_data['condition']}")

print("\\n=== POST Request Example ===")
new_post_data = {
    "title": "My New Post",
    "body": "This is the content of my post",
    "userId": 1
}
post_response = requests.post(
    "https://jsonplaceholder.typicode.com/posts",
    json=new_post_data
)
print(f"Post created - Status: {post_response.status_code}")
print(f"Response: {post_response.json()}")

# Error handling with requests
def safe_api_call(url):
    """Make a safe API call with error handling."""
    try:
        response = requests.get(url)
        if response.status_code == 200:
            return response.json()
        else:
            print(f"API Error: Status {response.status_code}")
            return None
    except Exception as e:
        print(f"Request failed: {e}")
        return None

print("\\n=== Safe API Call ===")
data = safe_api_call("https://api.example.com/data")
if data:
    print("Data received successfully:", data)
else:
    print("Failed to get data")

# Headers and authentication example
headers = {
    "User-Agent": "My Python App 1.0",
    "Authorization": "Bearer your-api-token",
    "Content-Type": "application/json"
}

print("\\n=== Request with Headers ===")
print("Headers to send:", headers)
auth_response = requests.get("https://api.example.com/protected", headers=headers)
print("Authenticated request sent")`,
        output: `=== GET Request Example ===
Status Code: 200
Response: {'userId': 1, 'id': 1, 'title': 'Sample Post', 'body': 'This is a sample post body'}

=== Weather API Example ===
Location: New York
Temperature: 22°C
Condition: Sunny

=== POST Request Example ===
Post created - Status: 201
Response: {'status': 'created', 'id': 123}

=== Safe API Call ===
Data received successfully: {'message': 'Mock response'}

=== Request with Headers ===
Headers to send: {'User-Agent': 'My Python App 1.0', 'Authorization': 'Bearer your-api-token', 'Content-Type': 'application/json'}
Authenticated request sent`,
        tips: [
          "Always check response.status_code before processing data",
          "Use response.json() for JSON APIs",
          "Include proper headers for authentication",
          "Handle exceptions for network errors"
        ]
      },
      {
        id: "os-json-datetime",
        title: "Essential Built-in Libraries",
        content: "Master the essential built-in libraries: os for system operations, json for data exchange, and datetime for time handling.",
        code: `# Working with os module
import os
import json
import datetime

print("=== OS Module Examples ===")
print("Current working directory:", os.getcwd())
print("User home directory:", os.path.expanduser("~"))
print("Operating system:", os.name)

# Environment variables
print("Python path:", os.environ.get('PYTHONPATH', 'Not set'))
print("User:", os.environ.get('USER', os.environ.get('USERNAME', 'Unknown')))

# File and directory operations
print("\\nFile operations:")
print("File exists (this script):", os.path.exists(__file__ if '__file__' in globals() else 'current_file.py'))
print("Is directory (current):", os.path.isdir('.'))
print("Directory contents:", os.listdir('.')[:5])  # First 5 items

# Path operations
file_path = "/home/user/documents/file.txt"
print("\\nPath operations for:", file_path)
print("Directory:", os.path.dirname(file_path))
print("Filename:", os.path.basename(file_path))
print("File extension:", os.path.splitext(file_path)[1])
print("Join paths:", os.path.join("folder", "subfolder", "file.txt"))

print("\\n=== JSON Module Examples ===")
# Working with JSON data
python_data = {
    "name": "Alice Johnson",
    "age": 30,
    "skills": ["Python", "JavaScript", "SQL"],
    "is_employed": True,
    "salary": 75000.50,
    "projects": [
        {"name": "Web App", "status": "completed"},
        {"name": "API Service", "status": "in_progress"}
    ]
}

# Convert Python to JSON
json_string = json.dumps(python_data, indent=2)
print("Python to JSON:")
print(json_string)

# Convert JSON back to Python
parsed_data = json.loads(json_string)
print("\\nJSON to Python:")
print("Name:", parsed_data["name"])
print("Skills:", parsed_data["skills"])
print("First project:", parsed_data["projects"][0]["name"])

# Working with JSON files (simulated)
def save_to_json_file(data, filename):
    """Save data to JSON file."""
    json_content = json.dumps(data, indent=2)
    print(f"\\nSaving to {filename}:")
    print(json_content[:100] + "..." if len(json_content) > 100 else json_content)

def load_from_json_file(filename):
    """Load data from JSON file."""
    # Simulate file content
    return {
        "config": {
            "debug": True,
            "max_connections": 100
        },
        "users": ["alice", "bob", "charlie"]
    }

save_to_json_file(python_data, "user_data.json")
config_data = load_from_json_file("config.json")
print("\\nLoaded config:", config_data)

print("\\n=== Datetime Module Examples ===")
# Current date and time
now = datetime.datetime.now()
today = datetime.date.today()
current_time = datetime.time(now.hour, now.minute, now.second)

print("Current datetime:", now)
print("Today's date:", today)
print("Current time:", current_time)

# Creating specific dates
birthday = datetime.date(1990, 5, 15)
meeting_time = datetime.datetime(2024, 3, 20, 14, 30, 0)

print("\\nSpecific dates:")
print("Birthday:", birthday)
print("Meeting time:", meeting_time)

# Date arithmetic
age_in_days = (today - birthday).days
days_until_meeting = (meeting_time.date() - today).days

print("\\nDate calculations:")
print("Age in days:", age_in_days)
print("Days until meeting:", days_until_meeting)

# Formatting dates
print("\\nDate formatting:")
print("ISO format:", now.isoformat())
print("Custom format:", now.strftime("%B %d, %Y at %I:%M %p"))
print("Short format:", now.strftime("%m/%d/%Y"))

# Parsing date strings
date_string = "2024-03-15 14:30:00"
parsed_date = datetime.datetime.strptime(date_string, "%Y-%m-%d %H:%M:%S")
print("\\nParsed date:", parsed_date)

# Working with timezones (basic)
utc_now = datetime.datetime.utcnow()
print("UTC time:", utc_now)`,
        output: `=== OS Module Examples ===
Current working directory: /home/user/projects
User home directory: /home/user
Operating system: posix

Python path: Not set
User: alice

File operations:
File exists (this script): True
Is directory (current): True
Directory contents: ['main.py', 'data', 'utils', 'tests', 'README.md']

Path operations for: /home/user/documents/file.txt
Directory: /home/user/documents
Filename: file.txt
File extension: .txt
Join paths: folder/subfolder/file.txt

=== JSON Module Examples ===
Python to JSON:
{
  "name": "Alice Johnson",
  "age": 30,
  "skills": [
    "Python",
    "JavaScript",
    "SQL"
  ],
  "is_employed": true,
  "salary": 75000.5,
  "projects": [
    {
      "name": "Web App",
      "status": "completed"
    },
    {
      "name": "API Service",
      "status": "in_progress"
    }
  ]
}

JSON to Python:
Name: Alice Johnson
Skills: ['Python', 'JavaScript', 'SQL']
First project: Web App

Saving to user_data.json:
{
  "name": "Alice Johnson",
  "age": 30,
  "skills": [
    "Python",
    "JavaScript",
    "SQL"
  ],
  "is_emp...

Loaded config: {'config': {'debug': True, 'max_connections': 100}, 'users': ['alice', 'bob', 'charlie']}

=== Datetime Module Examples ===
Current datetime: 2024-03-15 14:30:25.123456
Today's date: 2024-03-15
Current time: 14:30:25

Specific dates:
Birthday: 1990-05-15
Meeting time: 2024-03-20 14:30:00

Date calculations:
Age in days: 12357
Days until meeting: 5

Date formatting:
ISO format: 2024-03-15T14:30:25.123456
Custom format: March 15, 2024 at 02:30 PM
Short format: 03/15/2024

Parsed date: 2024-03-15 14:30:00
UTC time: 2024-03-15 19:30:25.123456`,
        tips: [
          "Use os.path.join() for cross-platform file paths",
          "JSON can't serialize datetime objects directly",
          "Always use try/except when parsing dates",
          "Store dates in ISO format for consistency"
        ],
        practice: {
          challenge: "Build a configuration manager that handles JSON configs and file operations",
          starterCode: `# Configuration Manager
import os
import json
import datetime

class ConfigManager:
    def __init__(self, config_file="app_config.json"):
        self.config_file = config_file
        self.config = {}
        self.load_config()
    
    def load_config(self):
        """Load configuration from JSON file."""
        # Check if file exists
        # Load JSON data
        # Handle file not found gracefully
        pass
    
    def save_config(self):
        """Save current configuration to JSON file."""
        # Convert config to JSON
        # Write to file
        # Handle errors
        pass
    
    def get(self, key, default=None):
        """Get configuration value."""
        # Return config value or default
        pass
    
    def set(self, key, value):
        """Set configuration value."""
        # Update config
        # Auto-save
        pass
    
    def backup_config(self):
        """Create a backup of the current config."""
        # Create backup with timestamp
        # Use datetime for unique filename
        pass
    
    def get_app_info(self):
        """Get application runtime information."""
        # Return dict with:
        # - config file location
        # - last modified time
        # - file size
        # - number of config items
        pass

# Test your ConfigManager
# config = ConfigManager()
# config.set("app_name", "My Python App")
# config.set("debug", True)
# print("App name:", config.get("app_name"))
# config.backup_config()`,
          expectedOutput: "Complete configuration manager with JSON handling, file operations, and backup functionality",
          hints: [
            "Use try/except for file operations",
            "datetime.now().strftime() for backup timestamps",
            "os.path.getsize() and os.path.getmtime() for file info",
            "Provide sensible defaults for missing config values"
          ]
        }
      }
    ]
  },

  // File and Directory Management - Essential I/O operations
  "File and Directory Management": {
    type: "lesson",
    difficulty: "Intermediate",
    estimatedTime: "60 min",
    description: "Master file and directory operations including reading, writing, organizing files, and handling different file formats.",
    steps: [
      {
        id: "basic-file-operations",
        title: "Basic File Reading and Writing",
        content: "Learn the fundamentals of file operations in Python using built-in functions and context managers.",
        code: `# File operations in Python
import os
import shutil

print("=== Basic File Reading and Writing ===")

# Writing to files
def create_sample_file():
    """Create a sample text file."""
    content = """Hello, World!
This is a sample text file.
It contains multiple lines.
Each line has different content.
Python makes file handling easy!"""
    
    # Using with statement (context manager) - recommended
    with open("sample.txt", "w") as file:
        file.write(content)
    print("✓ sample.txt created")

def append_to_file():
    """Append content to existing file."""
    additional_content = "\\nThis line was added later.\\nPython is awesome!"
    
    with open("sample.txt", "a") as file:
        file.write(additional_content)
    print("✓ Content appended to sample.txt")

# Reading from files
def read_entire_file():
    """Read entire file content."""
    try:
        with open("sample.txt", "r") as file:
            content = file.read()
        print("\\n=== Entire File Content ===")
        print(content)
        return content
    except FileNotFoundError:
        print("File not found!")
        return None

def read_file_lines():
    """Read file line by line."""
    try:
        with open("sample.txt", "r") as file:
            lines = file.readlines()
        
        print("\\n=== File Lines ===")
        for i, line in enumerate(lines, 1):
            print(f"Line {i}: {line.strip()}")
        return lines
    except FileNotFoundError:
        print("File not found!")
        return []

def read_file_efficiently():
    """Read large files efficiently."""
    try:
        print("\\n=== Reading Line by Line (Memory Efficient) ===")
        with open("sample.txt", "r") as file:
            for line_num, line in enumerate(file, 1):
                print(f"{line_num:2d}: {line.rstrip()}")
    except FileNotFoundError:
        print("File not found!")

# Demonstrate file operations
create_sample_file()
append_to_file()
content = read_entire_file()
lines = read_file_lines()
read_file_efficiently()

# Binary file operations
def work_with_binary_files():
    """Demonstrate binary file operations."""
    print("\\n=== Binary File Operations ===")
    
    # Create binary data
    binary_data = b"\\x48\\x65\\x6c\\x6c\\x6f\\x20\\x57\\x6f\\x72\\x6c\\x64"  # "Hello World" in bytes
    
    # Write binary file
    with open("binary_sample.bin", "wb") as file:
        file.write(binary_data)
    print("✓ Binary file created")
    
    # Read binary file
    with open("binary_sample.bin", "rb") as file:
        read_data = file.read()
    
    print(f"Binary data: {read_data}")
    print(f"Decoded: {read_data.decode('utf-8')}")

work_with_binary_files()

# File information
def get_file_info(filename):
    """Get information about a file."""
    try:
        if os.path.exists(filename):
            size = os.path.getsize(filename)
            modified_time = os.path.getmtime(filename)
            
            print(f"\\n=== File Info: {filename} ===")
            print(f"Size: {size} bytes")
            print(f"Modified: {modified_time}")
            print(f"Is file: {os.path.isfile(filename)}")
            print(f"Is readable: {os.access(filename, os.R_OK)}")
            print(f"Is writable: {os.access(filename, os.W_OK)}")
        else:
            print(f"File {filename} does not exist")
    except Exception as e:
        print(f"Error getting file info: {e}")

get_file_info("sample.txt")

# File operations with error handling
def safe_file_operation(filename, operation="read"):
    """Perform file operations with comprehensive error handling."""
    try:
        if operation == "read":
            with open(filename, "r") as file:
                return file.read()
        elif operation == "write":
            with open(filename, "w") as file:
                file.write("Safe write operation")
                return True
    except FileNotFoundError:
        print(f"Error: {filename} not found")
    except PermissionError:
        print(f"Error: Permission denied for {filename}")
    except IOError as e:
        print(f"IO Error: {e}")
    except Exception as e:
        print(f"Unexpected error: {e}")
    return None

print("\\n=== Safe File Operations ===")
result = safe_file_operation("sample.txt", "read")
if result:
    print("File read successfully")
else:
    print("File operation failed")`,
        output: `=== Basic File Reading and Writing ===
✓ sample.txt created
✓ Content appended to sample.txt

=== Entire File Content ===
Hello, World!
This is a sample text file.
It contains multiple lines.
Each line has different content.
Python makes file handling easy!
This line was added later.
Python is awesome!

=== File Lines ===
Line 1: Hello, World!
Line 2: This is a sample text file.
Line 3: It contains multiple lines.
Line 4: Each line has different content.
Line 5: Python makes file handling easy!
Line 6: This line was added later.
Line 7: Python is awesome!

=== Reading Line by Line (Memory Efficient) ===
 1: Hello, World!
 2: This is a sample text file.
 3: It contains multiple lines.
 4: Each line has different content.
 5: Python makes file handling easy!
 6: This line was added later.
 7: Python is awesome!

=== Binary File Operations ===
✓ Binary file created
Binary data: b'Hello World'
Decoded: Hello World

=== File Info: sample.txt ===
Size: 149 bytes
Modified: 1647934567.123456
Is file: True
Is readable: True
Is writable: True

=== Safe File Operations ===
File read successfully`,
        tips: [
          "Always use 'with' statement for automatic file closing",
          "Use 'r', 'w', 'a' for text files; 'rb', 'wb', 'ab' for binary",
          "Handle FileNotFoundError and PermissionError",
          "For large files, read line by line to save memory"
        ]
      },
      {
        id: "directory-operations",
        title: "Directory Management and File Organization",
        content: "Learn to create, navigate, and organize directories and files programmatically.",
        code: `# Directory operations and file management
import os
import shutil
import glob
from pathlib import Path

print("=== Directory Operations ===")

# Current directory information
current_dir = os.getcwd()
print(f"Current directory: {current_dir}")
print(f"Directory contents: {os.listdir('.')[:5]}")  # First 5 items

# Creating directories
def create_directory_structure():
    """Create a sample directory structure."""
    directories = [
        "project",
        "project/src",
        "project/src/utils",
        "project/tests",
        "project/docs",
        "project/data"
    ]
    
    for directory in directories:
        os.makedirs(directory, exist_ok=True)
        print(f"✓ Created: {directory}")

create_directory_structure()

# Working with paths
def demonstrate_path_operations():
    """Show various path operations."""
    print("\\n=== Path Operations ===")
    
    # Join paths correctly (cross-platform)
    file_path = os.path.join("project", "src", "main.py")
    print("Joined path: " + file_path)
    
    # Split paths
    directory, filename = os.path.split(file_path)
    print("Directory: " + directory)
    print("Filename: " + filename)
    
    # File extension operations
    name, extension = os.path.splitext(filename)
    print("Name: " + name + ", Extension: " + extension)
    
    # Absolute vs relative paths
    abs_path = os.path.abspath(file_path)
    print("Absolute path: " + abs_path)
    
    # Check path properties
    print("Exists: " + str(os.path.exists(file_path)))
    print("Is absolute: " + str(os.path.isabs(file_path)))

demonstrate_path_operations()

# File and directory listing
def list_directory_contents(path="."):
    """List and categorize directory contents."""
    print("\\n=== Contents of " + path + " ===")
    
    try:
        items = os.listdir(path)
        files = []
        dirs = []
        
        for item in items:
            item_path = os.path.join(path, item)
            if os.path.isfile(item_path):
                files.append(item)
            elif os.path.isdir(item_path):
                dirs.append(item)
        
        print("Directories (" + str(len(dirs)) + "):")
        for directory in sorted(dirs):
            print("  📁 " + directory)
        
        print("\\nFiles (" + str(len(files)) + "):")
        for file in sorted(files):
            size = os.path.getsize(os.path.join(path, file))
            print("  📄 " + file + " (" + str(size) + " bytes)")
            
    except PermissionError:
        print("Permission denied: " + path)
    except FileNotFoundError:
        print("Path not found: " + path)

list_directory_contents(".")
list_directory_contents("project")

# File searching with glob
def search_files_with_patterns():
    """Search for files using glob patterns."""
    print("\\n=== File Pattern Searching ===")
    
    # Create some sample files
    sample_files = [
        "project/src/main.py",
        "project/src/utils/helper.py",
        "project/src/utils/config.py",
        "project/tests/test_main.py",
        "project/docs/readme.txt",
        "project/data/sample.json"
    ]
    
    for file_path in sample_files:
        # Ensure directory exists
        os.makedirs(os.path.dirname(file_path), exist_ok=True)
        # Create empty file
        with open(file_path, "w") as f:
            f.write(f"# Sample content for {os.path.basename(file_path)}")
    
    print("✓ Sample files created")
    
    # Search patterns
    patterns = [
        "project/**/*.py",      # All Python files
        "project/src/*.py",     # Python files in src
        "project/**/test_*.py", # Test files
        "project/**/*.txt",     # Text files
        "project/**/*.json"     # JSON files
    ]
    
    for pattern in patterns:
        matches = glob.glob(pattern, recursive=True)
        print("\\nPattern '" + pattern + "':")
        for match in matches:
            print("  ✓ " + match)

search_files_with_patterns()

# Moving and copying files
def file_management_operations():
    """Demonstrate file copying, moving, and deletion."""
    print("\\n=== File Management Operations ===")
    
    # Create source file
    source_file = "project/source.txt"
    with open(source_file, "w") as f:
        f.write("This is the source file content.\\nIt will be copied and moved.")
    print("✓ Created source file: " + source_file)
    
    # Copy file
    copy_destination = "project/docs/source_copy.txt"
    shutil.copy2(source_file, copy_destination)
    print("✓ Copied to: " + copy_destination)
    
    # Move file
    move_destination = "project/data/moved_source.txt"
    shutil.move(source_file, move_destination)
    print("✓ Moved to: " + move_destination)
    
    # Copy entire directory
    if os.path.exists("project/src"):
        backup_dir = "project/src_backup"
        shutil.copytree("project/src", backup_dir)
        print("✓ Directory copied to: " + backup_dir)
    
    # Get directory size
    def get_directory_size(path):
        total_size = 0
        for dirpath, dirnames, filenames in os.walk(path):
            for filename in filenames:
                filepath = os.path.join(dirpath, filename)
                total_size += os.path.getsize(filepath)
        return total_size
    
    project_size = get_directory_size("project")
    print("\\nProject directory size: " + str(project_size) + " bytes")

file_management_operations()

# Directory tree display
def display_directory_tree(path, prefix="", max_depth=3, current_depth=0):
    """Display directory structure as a tree."""
    if current_depth >= max_depth:
        return
    
    try:
        items = sorted(os.listdir(path))
        for i, item in enumerate(items):
            item_path = os.path.join(path, item)
            is_last = i == len(items) - 1
            
            # Choose the right prefix
            current_prefix = "└── " if is_last else "├── "
            print(prefix + current_prefix + item)
            
            # Recurse into directories
            if os.path.isdir(item_path):
                extension = "    " if is_last else "│   "
                display_directory_tree(
                    item_path, 
                    prefix + extension, 
                    max_depth, 
                    current_depth + 1
                )
    except PermissionError:
        print(prefix + "├── [Permission Denied]")

print("\\n=== Directory Tree ===")
print("project/")
display_directory_tree("project", max_depth=3)`,
        output: `=== Directory Operations ===
Current directory: /home/user/projects/python-learning
Directory contents: ['main.py', 'utils', 'tests', 'data', 'docs']

✓ Created: project
✓ Created: project/src
✓ Created: project/src/utils
✓ Created: project/tests
✓ Created: project/docs
✓ Created: project/data

=== Path Operations ===
Joined path: project/src/main.py
Directory: project/src
Filename: main.py
Name: main, Extension: .py
Absolute path: /home/user/projects/python-learning/project/src/main.py
Exists: False
Is absolute: False

=== Contents of . ===
Directories (1):
  📁 project

Files (0):

=== Contents of project ===
Directories (4):
  📁 data
  📁 docs
  📁 src
  📁 tests

Files (0):

=== File Pattern Searching ===
✓ Sample files created

Pattern 'project/**/*.py':
  ✓ project/src/main.py
  ✓ project/src/utils/helper.py
  ✓ project/src/utils/config.py
  ✓ project/tests/test_main.py

Pattern 'project/src/*.py':
  ✓ project/src/main.py

Pattern 'project/**/test_*.py':
  ✓ project/tests/test_main.py

Pattern 'project/**/*.txt':
  ✓ project/docs/readme.txt

Pattern 'project/**/*.json':
  ✓ project/data/sample.json

=== File Management Operations ===
✓ Created source file: project/source.txt
✓ Copied to: project/docs/source_copy.txt
✓ Moved to: project/data/moved_source.txt
✓ Directory copied to: project/src_backup

Project directory size: 387 bytes

=== Directory Tree ===
project/
├── data
│   ├── moved_source.txt
│   └── sample.json
├── docs
│   ├── readme.txt
│   └── source_copy.txt
├── src
│   ├── main.py
│   └── utils
│       ├── config.py
│       └── helper.py
├── src_backup
│   ├── main.py
│   └── utils
└── tests
    └── test_main.py`,
        tips: [
          "Use os.makedirs(exist_ok=True) to avoid errors if directory exists",
          "glob.glob() supports ** for recursive searching",
          "shutil.copy2() preserves metadata, shutil.copy() doesn't",
          "Always handle PermissionError when working with directories"
        ]
      },
      {
        id: "file-formats",
        title: "Working with Different File Formats",
        content: "Handle various file formats including CSV, JSON, and text files with proper encoding.",
        code: `# Working with different file formats
import csv
import json
import os

print("=== Working with Different File Formats ===")

# CSV File Operations
def work_with_csv_files():
    """Demonstrate CSV file reading and writing."""
    print("\\n=== CSV File Operations ===")
    
    # Sample data
    employees = [
        ["Name", "Age", "Department", "Salary"],
        ["Alice Johnson", 30, "Engineering", 75000],
        ["Bob Smith", 25, "Marketing", 55000],
        ["Carol Davis", 35, "Engineering", 85000],
        ["David Wilson", 28, "Sales", 60000],
        ["Eva Brown", 32, "Engineering", 80000]
    ]
    
    # Write CSV file
    csv_filename = "employees.csv"
    with open(csv_filename, "w", newline="", encoding="utf-8") as csvfile:
        writer = csv.writer(csvfile)
        writer.writerows(employees)
    print("✓ CSV file created: " + csv_filename)
    
    # Read CSV file
    print("\\nReading CSV file:")
    with open(csv_filename, "r", encoding="utf-8") as csvfile:
        reader = csv.reader(csvfile)
        headers = next(reader)  # Skip header row
        print("Headers: " + str(headers))
        
        for row_num, row in enumerate(reader, 1):
            print("Row " + str(row_num) + ": " + str(row))
    
    # Working with CSV DictReader/DictWriter
    print("\\nUsing DictReader:")
    with open(csv_filename, "r", encoding="utf-8") as csvfile:
        dict_reader = csv.DictReader(csvfile)
        for employee in dict_reader:
            print(employee['Name'] + ": " + employee['Department'] + " - $" + employee['Salary'])
    
    # Calculate average salary by department
    department_salaries = {}
    with open(csv_filename, "r", encoding="utf-8") as csvfile:
        dict_reader = csv.DictReader(csvfile)
        for employee in dict_reader:
            dept = employee["Department"]
            salary = int(employee["Salary"])
            
            if dept not in department_salaries:
                department_salaries[dept] = []
            department_salaries[dept].append(salary)
    
    print("\\nAverage salary by department:")
    for dept, salaries in department_salaries.items():
        avg_salary = sum(salaries) / len(salaries)
        print(dept + ": $" + "{:,.2f}".format(avg_salary))

work_with_csv_files()

# JSON File Operations
def work_with_json_files():
    """Demonstrate JSON file operations."""
    print("\\n=== JSON File Operations ===")
    
    # Sample data structure
    project_data = {
        "project": {
            "name": "Python Learning Platform",
            "version": "1.0.0",
            "description": "Interactive Python learning environment",
            "created": "2024-03-15",
            "authors": ["Alice", "Bob", "Carol"]
        },
        "modules": [
            {
                "name": "Basic Syntax",
                "lessons": 5,
                "difficulty": "Beginner",
                "completed": True
            },
            {
                "name": "Data Structures",
                "lessons": 8,
                "difficulty": "Intermediate",
                "completed": False
            },
            {
                "name": "Advanced Topics",
                "lessons": 12,
                "difficulty": "Advanced",
                "completed": False
            }
        ],
        "statistics": {
            "total_users": 1250,
            "active_users": 890,
            "completion_rate": 0.67
        }
    }
    
    # Write JSON file
    json_filename = "project_data.json"
    with open(json_filename, "w", encoding="utf-8") as jsonfile:
        json.dump(project_data, jsonfile, indent=2, ensure_ascii=False)
    print("✓ JSON file created: " + json_filename)
    
    # Read JSON file
    with open(json_filename, "r", encoding="utf-8") as jsonfile:
        loaded_data = json.load(jsonfile)
    
    print("\\nProject Information:")
    project = loaded_data["project"]
    print("Name: " + project['name'])
    print("Version: " + project['version'])
    print("Authors: " + ', '.join(project['authors']))
    
    print("\\nModules:")
    for module in loaded_data["modules"]:
        status = "✓ Completed" if module["completed"] else "⏳ In Progress"
        print("  " + module['name'] + " (" + module['difficulty'] + ") - " + status)
    
    # Update JSON data
    loaded_data["statistics"]["total_users"] = 1350
    loaded_data["modules"][1]["completed"] = True
    
    # Save updated data
    with open(json_filename, "w", encoding="utf-8") as jsonfile:
        json.dump(loaded_data, jsonfile, indent=2)
    print("\\n✓ JSON file updated")

work_with_json_files()

# Text file encoding and processing
def work_with_text_encoding():
    """Demonstrate text file encoding and advanced processing."""
    print("\\n=== Text File Encoding and Processing ===")
    
    # Different encoding examples
    text_samples = {
        "english.txt": "Hello World! This is English text.",
        "unicode.txt": "Unicode: 🐍 Python is awesome! 中文 العربية Русский",
        "special.txt": "Special chars: ñoño café naïve résumé"
    }
    
    # Write files with proper encoding
    for filename, content in text_samples.items():
        with open(filename, "w", encoding="utf-8") as f:
            f.write(content)
        print("✓ Created: " + filename)
    
    # Read files and show encoding handling
    for filename in text_samples.keys():
        try:
            # Try UTF-8 first (recommended)
            with open(filename, "r", encoding="utf-8") as f:
                content = f.read()
            print("\\n" + filename + " (UTF-8): " + content)
        except UnicodeDecodeError:
            # Fallback to other encodings
            try:
                with open(filename, "r", encoding="latin-1") as f:
                    content = f.read()
                print("\\n" + filename + " (Latin-1): " + content)
            except Exception as e:
                print("Error reading " + filename + ": " + str(e))
    
    # Text file processing
    def process_text_file(filename):
        """Process text file with statistics."""
        try:
            with open(filename, "r", encoding="utf-8") as f:
                content = f.read()
            
            # Calculate statistics
            lines = content.split("\\n")
            words = content.split()
            chars = len(content)
            chars_no_spaces = len(content.replace(" ", ""))
            
            print("\\nFile: " + filename)
            print("  Lines: " + str(len(lines)))
            print("  Words: " + str(len(words)))
            print("  Characters: " + str(chars))
            print("  Characters (no spaces): " + str(chars_no_spaces))
            
            return {
                "lines": len(lines),
                "words": len(words),
                "characters": chars,
                "characters_no_spaces": chars_no_spaces
            }
        except Exception as e:
            print("Error processing " + filename + ": " + str(e))
            return None
    
    # Process all text files
    for filename in text_samples.keys():
        process_text_file(filename)

work_with_text_encoding()

# File backup and organization
def file_backup_system():
    """Implement a simple file backup system."""
    print("\\n=== File Backup System ===")
    
    # Create backup directory
    backup_dir = "backups"
    os.makedirs(backup_dir, exist_ok=True)
    
    # Files to backup
    files_to_backup = ["employees.csv", "project_data.json", "unicode.txt"]
    
    import datetime
    timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
    
    for filename in files_to_backup:
        if os.path.exists(filename):
            # Create backup filename with timestamp
            backup_filename = f"{os.path.splitext(filename)[0]}_{timestamp}{os.path.splitext(filename)[1]}"
            backup_path = os.path.join(backup_dir, backup_filename)
            
            # Copy file to backup location
            import shutil
            shutil.copy2(filename, backup_path)
            print("✓ Backed up " + filename + " to " + backup_path)
        else:
            print("⚠ File not found: " + filename)
    
    # List backup directory
    if os.path.exists(backup_dir):
        backups = os.listdir(backup_dir)
        print("\\nBackup directory contains " + str(len(backups)) + " files:")
        for backup in sorted(backups):
            backup_path = os.path.join(backup_dir, backup)
            size = os.path.getsize(backup_path)
            print("  " + backup + " (" + str(size) + " bytes)")

file_backup_system()

print("\\n=== File Operations Summary ===")
print("✓ CSV files: Reading and writing tabular data")
print("✓ JSON files: Structured data storage and retrieval")
print("✓ Text files: Encoding handling and processing")
print("✓ Backup system: File organization and preservation")`,
        output: `=== Working with Different File Formats ===

=== CSV File Operations ===
✓ CSV file created: employees.csv

Reading CSV file:
Headers: ['Name', 'Age', 'Department', 'Salary']
Row 1: ['Alice Johnson', '30', 'Engineering', '75000']
Row 2: ['Bob Smith', '25', 'Marketing', '55000']
Row 3: ['Carol Davis', '35', 'Engineering', '85000']
Row 4: ['David Wilson', '28', 'Sales', '60000']
Row 5: ['Eva Brown', '32', 'Engineering', '80000']

Using DictReader:
Alice Johnson: Engineering - $75000
Bob Smith: Marketing - $55000
Carol Davis: Engineering - $85000
David Wilson: Sales - $60000
Eva Brown: Engineering - $80000

Average salary by department:
Engineering: $80,000.00
Marketing: $55,000.00
Sales: $60,000.00

=== JSON File Operations ===
✓ JSON file created: project_data.json

Project Information:
Name: Python Learning Platform
Version: 1.0.0
Authors: Alice, Bob, Carol

Modules:
  Basic Syntax (Beginner) - ✓ Completed
  Data Structures (Intermediate) - ⏳ In Progress
  Advanced Topics (Advanced) - ⏳ In Progress

✓ JSON file updated

=== Text File Encoding and Processing ===
✓ Created: english.txt
✓ Created: unicode.txt
✓ Created: special.txt

english.txt (UTF-8): Hello World! This is English text.

unicode.txt (UTF-8): Unicode: 🐍 Python is awesome! 中文 العربية Русский

special.txt (UTF-8): Special chars: ñoño café naïve résumé

File: english.txt
  Lines: 1
  Words: 6
  Characters: 37
  Characters (no spaces): 32

File: unicode.txt
  Lines: 1
  Words: 6
  Characters: 44
  Characters (no spaces): 37

File: special.txt
  Lines: 1
  Words: 5
  Characters: 36
  Characters (no spaces): 31

=== File Backup System ===
✓ Backed up employees.csv to backups/employees_20240315_143022.csv
✓ Backed up project_data.json to backups/project_data_20240315_143022.json
✓ Backed up unicode.txt to backups/unicode_20240315_143022.txt

Backup directory contains 3 files:
  employees_20240315_143022.csv (187 bytes)
  project_data_20240315_143022.json (582 bytes)
  unicode_20240315_143022.txt (44 bytes)

=== File Operations Summary ===
✓ CSV files: Reading and writing tabular data
✓ JSON files: Structured data storage and retrieval  
✓ Text files: Encoding handling and processing
✓ Backup system: File organization and preservation`,
        tips: [
          "Always specify encoding='utf-8' for text files",
          "Use csv.DictReader for easier column access",
          "JSON can't store datetime objects - convert to strings",
          "Handle UnicodeDecodeError gracefully with try/except"
        ],
        practice: {
          challenge: "Build a log file analyzer that processes different file formats",
          starterCode: `# Log File Analyzer
import csv
import json
import os
import datetime

class LogAnalyzer:
    def __init__(self, log_directory="logs"):
        self.log_directory = log_directory
        self.analysis_results = {}
    
    def analyze_csv_logs(self, filename):
        """Analyze CSV log files."""
        # Read CSV log file
        # Count entries by status/level
        # Calculate time ranges
        # Return analysis dict
        pass
    
    def analyze_json_logs(self, filename):
        """Analyze JSON log files."""
        # Read JSON log entries
        # Extract error patterns
        # Count by severity
        # Return analysis dict
        pass
    
    def analyze_text_logs(self, filename):
        """Analyze plain text log files."""
        # Read text logs line by line
        # Extract timestamps and messages
        # Find common patterns
        # Return analysis dict
        pass
    
    def generate_report(self):
        """Generate comprehensive analysis report."""
        # Combine all analysis results
        # Create summary statistics
        # Save report as JSON
        # Return formatted report
        pass
    
    def backup_logs(self):
        """Create timestamped backup of all logs."""
        # Create backup directory
        # Copy all log files with timestamps
        # Return backup location
        pass

# Test your LogAnalyzer
# analyzer = LogAnalyzer()
# analyzer.analyze_csv_logs("access.csv")
# analyzer.analyze_json_logs("errors.json")
# analyzer.analyze_text_logs("system.log")
# report = analyzer.generate_report()
# print(report)`,
          expectedOutput: "Complete log analysis system with CSV, JSON, and text file processing capabilities",
          hints: [
            "Use csv.DictReader for structured CSV processing",
            "Parse timestamps with datetime.strptime()",
            "Count occurrences with dictionaries",
            "Handle file encoding errors gracefully"
          ]
        }
      }
    ]
  },

  // Virtual Environments and Dependencies - Python project management
  "Virtual Environments and Dependencies": {
    type: "lesson",
    difficulty: "Intermediate",
    estimatedTime: "45 min",
    description: "Learn to create isolated Python environments, manage dependencies, and organize project structures effectively.",
    steps: [
      {
        id: "virtual-environments",
        title: "Creating and Managing Virtual Environments",
        content: "Virtual environments allow you to create isolated Python installations for different projects, preventing dependency conflicts.",
        code: `# Virtual Environment Management Guide
import os
import sys
import subprocess

print("=== Virtual Environment Concepts ===")

# Understanding the need for virtual environments
print("Why use virtual environments?")
print("1. Isolate project dependencies")
print("2. Avoid version conflicts between projects")
print("3. Keep global Python installation clean")
print("4. Easy dependency management")
print("5. Reproducible development environments")

# Python's built-in venv module (Python 3.3+)
print("\\n=== Using Python's built-in venv module ===")

# Commands you would run in terminal (commented for demonstration)
venv_commands = [
    "# Create a virtual environment",
    "python -m venv myproject_env",
    "",
    "# Activate virtual environment (Windows)",
    "myproject_env\\\\Scripts\\\\activate",
    "",
    "# Activate virtual environment (macOS/Linux)",
    "source myproject_env/bin/activate",
    "",
    "# Deactivate virtual environment",
    "deactivate",
    "",
    "# Remove virtual environment",
    "rmdir /s myproject_env  # Windows",
    "rm -rf myproject_env    # macOS/Linux"
]

for command in venv_commands:
    print(command)

# Checking if running in virtual environment
def check_virtual_environment():
    """Check if currently running in a virtual environment."""
    print("\\n=== Environment Check ===")
    
    # Check for VIRTUAL_ENV environment variable
    virtual_env = os.environ.get('VIRTUAL_ENV')
    if virtual_env:
        print("✓ Running in virtual environment: " + virtual_env)
    else:
        print("⚠ Not running in virtual environment")
    
    # Show Python executable path
    print("Python executable: " + sys.executable)
    
    # Show Python version
    print("Python version: " + sys.version.split()[0])
    
    # Show Python path
    print("Python path entries:")
    for i, path in enumerate(sys.path[:5], 1):  # First 5 entries
        print("  " + str(i) + ". " + path)
    
    return virtual_env is not None

is_venv = check_virtual_environment()

# Simulating virtual environment workflow
def simulate_venv_workflow():
    """Simulate a typical virtual environment workflow."""
    print("\\n=== Virtual Environment Workflow ===")
    
    project_name = "my_python_project"
    
    print("Step 1: Create project directory")
    print("mkdir " + project_name)
    print("cd " + project_name)
    
    print("\\nStep 2: Create virtual environment")
    print("python -m venv " + project_name + "_env")
    
    print("\\nStep 3: Activate environment")
    if os.name == 'nt':  # Windows
        activate_script = project_name + "_env\\\\Scripts\\\\activate"
    else:  # macOS/Linux
        activate_script = "source " + project_name + "_env/bin/activate"
    print(activate_script)
    
    print("\\nStep 4: Verify activation")
    print("which python  # Should point to virtual environment")
    print("pip list      # Should show minimal packages")
    
    print("\\nStep 5: Install project dependencies")
    print("pip install requests pandas matplotlib")
    
    print("\\nStep 6: Create requirements.txt")
    print("pip freeze > requirements.txt")
    
    print("\\nStep 7: Development work...")
    print("# Your Python development here")
    
    print("\\nStep 8: Deactivate when done")
    print("deactivate")

simulate_venv_workflow()

# Virtual environment best practices
def venv_best_practices():
    """Show virtual environment best practices."""
    print("\\n=== Virtual Environment Best Practices ===")
    
    practices = [
        "1. Use descriptive names for environments (project_name_env)",
        "2. Keep environments outside your project code directory",
        "3. Add environment directories to .gitignore",
        "4. Always activate before installing packages",
        "5. Use requirements.txt for dependency tracking",
        "6. Create separate environments for different Python versions",
        "7. Document environment setup in README.md",
        "8. Consider using conda for data science projects",
        "9. Regularly update pip: python -m pip install --upgrade pip",
        "10. Use pip-tools for advanced dependency management"
    ]
    
    for practice in practices:
        print(practice)
    
    print("\\n=== Common Virtual Environment Tools ===")
    tools = {
        "venv": "Built-in Python 3.3+ (recommended for most projects)",
        "virtualenv": "Third-party, works with older Python versions",
        "conda": "Anaconda/Miniconda - great for data science",
        "pipenv": "Higher-level tool combining pip and venv",
        "poetry": "Modern dependency management and packaging"
    }
    
    for tool, description in tools.items():
        print(tool + ": " + description)

venv_best_practices()

# Troubleshooting common issues
def troubleshooting_guide():
    """Common virtual environment issues and solutions."""
    print("\\n=== Troubleshooting Virtual Environments ===")
    
    issues = [
        {
            "problem": "Command 'python' not found after activation",
            "solution": "Check if activation worked: echo $VIRTUAL_ENV or verify Scripts/bin directory"
        },
        {
            "problem": "Permission denied creating environment",
            "solution": "Run terminal as administrator or check directory permissions"
        },
        {
            "problem": "Wrong Python version in environment",
            "solution": "Specify Python version: python3.9 -m venv myenv"
        },
        {
            "problem": "Packages not found after activation",
            "solution": "Ensure environment is activated and packages installed in correct env"
        },
        {
            "problem": "Environment not deactivating properly",
            "solution": "Close terminal and open new one, or run deactivate command"
        }
    ]
    
    for issue in issues:
        print("\\nProblem: " + issue["problem"])
        print("Solution: " + issue["solution"])

troubleshooting_guide()`,
        output: `=== Virtual Environment Concepts ===
Why use virtual environments?
1. Isolate project dependencies
2. Avoid version conflicts between projects
3. Keep global Python installation clean
4. Easy dependency management
5. Reproducible development environments

=== Using Python's built-in venv module ===
# Create a virtual environment
python -m venv myproject_env

# Activate virtual environment (Windows)
myproject_env\\Scripts\\activate

# Activate virtual environment (macOS/Linux)
source myproject_env/bin/activate

# Deactivate virtual environment
deactivate

# Remove virtual environment
rmdir /s myproject_env  # Windows
rm -rf myproject_env    # macOS/Linux

=== Environment Check ===
⚠ Not running in virtual environment
Python executable: /usr/bin/python3
Python version: 3.9.7
Python path entries:
  1. /home/user/projects
  2. /usr/lib/python39.zip
  3. /usr/lib/python3.9
  4. /usr/lib/python3.9/lib-dynload
  5. /home/user/.local/lib/python3.9/site-packages

=== Virtual Environment Workflow ===
Step 1: Create project directory
mkdir my_python_project
cd my_python_project

Step 2: Create virtual environment
python -m venv my_python_project_env

Step 3: Activate environment
source my_python_project_env/bin/activate

Step 4: Verify activation
which python  # Should point to virtual environment
pip list      # Should show minimal packages

Step 5: Install project dependencies
pip install requests pandas matplotlib

Step 6: Create requirements.txt
pip freeze > requirements.txt

Step 7: Development work...
# Your Python development here

Step 8: Deactivate when done
deactivate

=== Virtual Environment Best Practices ===
1. Use descriptive names for environments (project_name_env)
2. Keep environments outside your project code directory
3. Add environment directories to .gitignore
4. Always activate before installing packages
5. Use requirements.txt for dependency tracking
6. Create separate environments for different Python versions
7. Document environment setup in README.md
8. Consider using conda for data science projects
9. Regularly update pip: python -m pip install --upgrade pip
10. Use pip-tools for advanced dependency management

=== Common Virtual Environment Tools ===
venv: Built-in Python 3.3+ (recommended for most projects)
virtualenv: Third-party, works with older Python versions
conda: Anaconda/Miniconda - great for data science
pipenv: Higher-level tool combining pip and venv
poetry: Modern dependency management and packaging

=== Troubleshooting Virtual Environments ===

Problem: Command 'python' not found after activation
Solution: Check if activation worked: echo $VIRTUAL_ENV or verify Scripts/bin directory

Problem: Permission denied creating environment
Solution: Run terminal as administrator or check directory permissions

Problem: Wrong Python version in environment
Solution: Specify Python version: python3.9 -m venv myenv

Problem: Packages not found after activation
Solution: Ensure environment is activated and packages installed in correct env

Problem: Environment not deactivating properly
Solution: Close terminal and open new one, or run deactivate command`,
        tips: [
          "Always activate virtual environment before installing packages",
          "Use requirements.txt to share exact dependency versions",
          "Keep virtual environments separate from your code repository",
          "Name environments descriptively (projectname_env)"
        ]
      },
      {
        id: "dependency-management",
        title: "Dependency Management with pip and requirements.txt",
        content: "Master dependency management using pip, requirements files, and version pinning for reproducible environments.",
        code: `# Dependency Management with pip
import subprocess
import sys
import json

print("=== Dependency Management Best Practices ===")

# Understanding package management
def explain_package_management():
    """Explain Python package management concepts."""
    print("\\n=== Package Management Concepts ===")
    
    concepts = {
        "Package": "A collection of Python modules bundled together",
        "Dependency": "A package that your project needs to function",
        "Version": "Specific release of a package (semantic versioning)",
        "Requirements": "List of all packages and versions your project needs",
        "PyPI": "Python Package Index - central repository for Python packages",
        "pip": "Package installer for Python (pip installs packages)",
        "Wheel": "Built package format for faster installation",
        "Source Distribution": "Package source code that needs to be built"
    }
    
    for term, definition in concepts.items():
        print(term + ": " + definition)

explain_package_management()

# pip commands and usage
def demonstrate_pip_commands():
    """Show comprehensive pip command usage."""
    print("\\n=== Essential pip Commands ===")
    
    # Basic pip commands
    commands = [
        ("Install package", "pip install package_name"),
        ("Install specific version", "pip install package_name==1.2.3"),
        ("Install minimum version", "pip install package_name>=1.2.0"),
        ("Install compatible version", "pip install package_name~=1.2.0"),
        ("Install from requirements", "pip install -r requirements.txt"),
        ("Upgrade package", "pip install --upgrade package_name"),
        ("Uninstall package", "pip uninstall package_name"),
        ("List installed packages", "pip list"),
        ("Show package info", "pip show package_name"),
        ("Search packages", "pip search search_term"),
        ("Check for outdated", "pip list --outdated"),
        ("Create requirements", "pip freeze > requirements.txt"),
        ("Install in dev mode", "pip install -e ."),
        ("Install from git", "pip install git+https://github.com/user/repo.git")
    ]
    
    for description, command in commands:
        print(description + ":")
        print("  " + command)
        print()

demonstrate_pip_commands()

# Version specifiers
def explain_version_specifiers():
    """Explain pip version specifiers."""
    print("=== Version Specifiers ===")
    
    specifiers = [
        ("==1.2.3", "Exactly version 1.2.3"),
        (">=1.2.3", "Version 1.2.3 or higher"),
        ("<=1.2.3", "Version 1.2.3 or lower"),
        (">1.2.3", "Higher than 1.2.3 (exclusive)"),
        ("<1.2.3", "Lower than 1.2.3 (exclusive)"),
        ("~=1.2.3", "Compatible version (>=1.2.3, <1.3.0)"),
        ("!=1.2.3", "Any version except 1.2.3"),
        (">=1.2,<2.0", "Multiple conditions"),
        ("*", "Any version (not recommended for production)")
    ]
    
    print("Specifier format: package_name[specifier]")
    print()
    for spec, meaning in specifiers:
        print(spec + " : " + meaning)

explain_version_specifiers()

# Requirements.txt management
def requirements_txt_guide():
    """Guide to creating and managing requirements.txt files."""
    print("\\n=== Requirements.txt Management ===")
    
    # Basic requirements.txt
    basic_requirements = '''# Basic requirements.txt example
requests==2.28.2
pandas>=1.5.0
matplotlib~=3.6.0
numpy>=1.21.0,<2.0.0
python-dateutil>=2.8.0

# Optional: Comments for clarity
beautifulsoup4==4.12.2  # Web scraping
Pillow>=9.0.0          # Image processing
'''
    
    print("Basic requirements.txt:")
    print(basic_requirements)
    
    # Advanced requirements.txt features
    advanced_requirements = '''# Advanced requirements.txt features

# Development dependencies
-r requirements-dev.txt

# Install from git repository
git+https://github.com/user/custom-package.git@v1.0.0

# Install local package in development mode
-e .

# Install from specific index
--index-url https://pypi.org/simple/
--extra-index-url https://custom-pypi.company.com/

# Install with extras
requests[socks,security]>=2.28.0

# Platform-specific dependencies
pywin32>=227; sys_platform == "win32"
readline>=6.2; sys_platform == "linux"

# Python version specific
typing>=3.7.0; python_version < "3.8"
'''
    
    print("\\nAdvanced requirements.txt:")
    print(advanced_requirements)
    
    # Multiple requirements files
    print("\\n=== Multiple Requirements Files ===")
    files_structure = {
        "requirements.txt": "Production dependencies only",
        "requirements-dev.txt": "Development tools (testing, linting, etc.)",
        "requirements-test.txt": "Testing specific dependencies",
        "requirements-docs.txt": "Documentation building tools"
    }
    
    for filename, purpose in files_structure.items():
        print(filename + ": " + purpose)
    
    # Example dev requirements
    dev_requirements = '''# requirements-dev.txt
-r requirements.txt  # Include production requirements

# Testing
pytest>=7.0.0
pytest-cov>=4.0.0
pytest-mock>=3.10.0

# Code quality
black>=22.0.0        # Code formatting
flake8>=5.0.0        # Linting
mypy>=1.0.0          # Type checking
isort>=5.12.0        # Import sorting

# Development tools
ipython>=8.0.0       # Interactive shell
jupyter>=1.0.0       # Notebooks
pre-commit>=2.20.0   # Git hooks
'''
    
    print("\\nDevelopment requirements example:")
    print(dev_requirements)

requirements_txt_guide()

# Package installation workflows
def installation_workflows():
    """Show different package installation workflows."""
    print("\\n=== Package Installation Workflows ===")
    
    # Fresh project setup
    print("1. Fresh Project Setup:")
    fresh_setup = [
        "mkdir my_project && cd my_project",
        "python -m venv venv",
        "source venv/bin/activate  # or venv\\\\Scripts\\\\activate on Windows",
        "pip install --upgrade pip",
        "pip install package1 package2 package3",
        "pip freeze > requirements.txt",
        "git init && git add requirements.txt"
    ]
    
    for step in fresh_setup:
        print("  " + step)
    
    # Existing project setup
    print("\\n2. Setting up Existing Project:")
    existing_setup = [
        "git clone https://github.com/user/project.git",
        "cd project",
        "python -m venv venv",
        "source venv/bin/activate",
        "pip install --upgrade pip",
        "pip install -r requirements.txt",
        "# Optional: pip install -r requirements-dev.txt"
    ]
    
    for step in existing_setup:
        print("  " + step)
    
    # Updating dependencies
    print("\\n3. Updating Dependencies:")
    update_steps = [
        "pip list --outdated",
        "pip install --upgrade package_name",
        "pip freeze > requirements.txt",
        "# Test your application",
        "git add requirements.txt && git commit -m 'Update dependencies'"
    ]
    
    for step in update_steps:
        print("  " + step)

installation_workflows()

# Dependency conflict resolution
def dependency_conflicts():
    """Handle dependency conflicts and resolution strategies."""
    print("\\n=== Dependency Conflict Resolution ===")
    
    print("Common conflict scenarios:")
    conflicts = [
        "Two packages require different versions of the same dependency",
        "Package requires Python version not available",
        "Circular dependencies between packages",
        "Platform-specific packages on wrong OS",
        "Outdated package repositories"
    ]
    
    for i, conflict in enumerate(conflicts, 1):
        print(str(i) + ". " + conflict)
    
    print("\\nResolution strategies:")
    strategies = [
        "Use pip check to identify conflicts",
        "Create separate virtual environments for conflicting projects",
        "Use compatible version specifiers (~=) instead of exact versions",
        "Update to latest compatible versions",
        "Use pip-tools for dependency resolution",
        "Consider alternative packages with compatible dependencies",
        "Use conda instead of pip for complex scientific packages"
    ]
    
    for i, strategy in enumerate(strategies, 1):
        print(str(i) + ". " + strategy)
    
    # Simulate conflict detection
    print("\\n=== Simulated Conflict Detection ===")
    print("Running: pip check")
    print("Output:")
    print("  ✓ No broken requirements found.")
    print("\\nIf conflicts exist, you might see:")
    print("  package-a 1.0.0 requires package-b>=2.0.0")
    print("  package-c 1.5.0 requires package-b<2.0.0")
    print("  ERROR: Conflict detected!")

dependency_conflicts()`,
        output: `=== Dependency Management Best Practices ===

=== Package Management Concepts ===
Package: A collection of Python modules bundled together
Dependency: A package that your project needs to function
Version: Specific release of a package (semantic versioning)
Requirements: List of all packages and versions your project needs
PyPI: Python Package Index - central repository for Python packages
pip: Package installer for Python (pip installs packages)
Wheel: Built package format for faster installation
Source Distribution: Package source code that needs to be built

=== Essential pip Commands ===
Install package:
  pip install package_name

Install specific version:
  pip install package_name==1.2.3

Install minimum version:
  pip install package_name>=1.2.0

Install compatible version:
  pip install package_name~=1.2.0

Install from requirements:
  pip install -r requirements.txt

Upgrade package:
  pip install --upgrade package_name

Uninstall package:
  pip uninstall package_name

List installed packages:
  pip list

Show package info:
  pip show package_name

Search packages:
  pip search search_term

Check for outdated:
  pip list --outdated

Create requirements:
  pip freeze > requirements.txt

Install in dev mode:
  pip install -e .

Install from git:
  pip install git+https://github.com/user/repo.git

=== Version Specifiers ===
Specifier format: package_name[specifier]

==1.2.3 : Exactly version 1.2.3
>=1.2.3 : Version 1.2.3 or higher
<=1.2.3 : Version 1.2.3 or lower
>1.2.3 : Higher than 1.2.3 (exclusive)
<1.2.3 : Lower than 1.2.3 (exclusive)
~=1.2.3 : Compatible version (>=1.2.3, <1.3.0)
!=1.2.3 : Any version except 1.2.3
>=1.2,<2.0 : Multiple conditions
* : Any version (not recommended for production)

=== Requirements.txt Management ===
Basic requirements.txt:
# Basic requirements.txt example
requests==2.28.2
pandas>=1.5.0
matplotlib~=3.6.0
numpy>=1.21.0,<2.0.0
python-dateutil>=2.8.0

# Optional: Comments for clarity
beautifulsoup4==4.12.2  # Web scraping
Pillow>=9.0.0          # Image processing


Advanced requirements.txt:
# Advanced requirements.txt features

# Development dependencies
-r requirements-dev.txt

# Install from git repository
git+https://github.com/user/custom-package.git@v1.0.0

# Install local package in development mode
-e .

# Install from specific index
--index-url https://pypi.org/simple/
--extra-index-url https://custom-pypi.company.com/

# Install with extras
requests[socks,security]>=2.28.0

# Platform-specific dependencies
pywin32>=227; sys_platform == "win32"
readline>=6.2; sys_platform == "linux"

# Python version specific
typing>=3.7.0; python_version < "3.8"


=== Multiple Requirements Files ===
requirements.txt: Production dependencies only
requirements-dev.txt: Development tools (testing, linting, etc.)
requirements-test.txt: Testing specific dependencies
requirements-docs.txt: Documentation building tools

Development requirements example:
# requirements-dev.txt
-r requirements.txt  # Include production requirements

# Testing
pytest>=7.0.0
pytest-cov>=4.0.0
pytest-mock>=3.10.0

# Code quality
black>=22.0.0        # Code formatting
flake8>=5.0.0        # Linting
mypy>=1.0.0          # Type checking
isort>=5.12.0        # Import sorting

# Development tools
ipython>=8.0.0       # Interactive shell
jupyter>=1.0.0       # Notebooks
pre-commit>=2.20.0   # Git hooks


=== Package Installation Workflows ===
1. Fresh Project Setup:
  mkdir my_project && cd my_project
  python -m venv venv
  source venv/bin/activate  # or venv\\Scripts\\activate on Windows
  pip install --upgrade pip
  pip install package1 package2 package3
  pip freeze > requirements.txt
  git init && git add requirements.txt

2. Setting up Existing Project:
  git clone https://github.com/user/project.git
  cd project
  python -m venv venv
  source venv/bin/activate
  pip install --upgrade pip
  pip install -r requirements.txt
  # Optional: pip install -r requirements-dev.txt

3. Updating Dependencies:
  pip list --outdated
  pip install --upgrade package_name
  pip freeze > requirements.txt
  # Test your application
  git add requirements.txt && git commit -m 'Update dependencies'

=== Dependency Conflict Resolution ===
Common conflict scenarios:
1. Two packages require different versions of the same dependency
2. Package requires Python version not available
3. Circular dependencies between packages
4. Platform-specific packages on wrong OS
5. Outdated package repositories

Resolution strategies:
1. Use pip check to identify conflicts
2. Create separate virtual environments for conflicting projects
3. Use compatible version specifiers (~=) instead of exact versions
4. Update to latest compatible versions
5. Use pip-tools for dependency resolution
6. Consider alternative packages with compatible dependencies
7. Use conda instead of pip for complex scientific packages

=== Simulated Conflict Detection ===
Running: pip check
Output:
  ✓ No broken requirements found.

If conflicts exist, you might see:
  package-a 1.0.0 requires package-b>=2.0.0
  package-c 1.5.0 requires package-b<2.0.0
  ERROR: Conflict detected!`,
        tips: [
          "Pin exact versions in production, use ranges in development",
          "Separate requirements files by environment (dev, test, prod)",
          "Run pip check regularly to detect dependency conflicts",
          "Use pip freeze to capture exact working environment"
        ]
      },
      {
        id: "project-structure",
        title: "Organizing Python Project Structure",
        content: "Learn to structure Python projects professionally with proper organization, configuration files, and development workflows.",
        code: `# Python Project Structure Guide
import os

print("=== Professional Python Project Structure ===")

# Standard project layout
def show_project_structure():
    """Display recommended Python project structure."""
    print("\\n=== Recommended Project Structure ===")
    
    structure = '''
myproject/
│
├── README.md                   # Project documentation
├── requirements.txt            # Production dependencies
├── requirements-dev.txt        # Development dependencies
├── setup.py                   # Package installation script
├── .gitignore                 # Git ignore rules
├── .env                       # Environment variables (don't commit!)
│
├── myproject/                 # Main package directory
│   ├── __init__.py           # Makes it a Python package
│   ├── main.py               # Application entry point
│   ├── config.py             # Configuration settings
│   ├── models/               # Data models
│   │   ├── __init__.py
│   │   ├── user.py
│   │   └── product.py
│   ├── views/                # User interface/API endpoints
│   │   ├── __init__.py
│   │   ├── api.py
│   │   └── web.py
│   ├── utils/                # Utility functions
│   │   ├── __init__.py
│   │   ├── helpers.py
│   │   └── validators.py
│   └── services/             # Business logic
│       ├── __init__.py
│       ├── auth.py
│       └── email.py
│
├── tests/                    # Test files
│   ├── __init__.py
│   ├── test_models.py
│   ├── test_views.py
│   ├── test_utils.py
│   └── fixtures/             # Test data
│       └── sample_data.json
│
├── docs/                     # Documentation
│   ├── api.md
│   ├── installation.md
│   └── user_guide.md
│
├── scripts/                  # Utility scripts
│   ├── deploy.py
│   ├── backup.py
│   └── migrate.py
│
├── data/                     # Data files
│   ├── raw/                  # Raw data
│   ├── processed/            # Processed data
│   └── external/             # External data sources
│
└── logs/                     # Log files
    ├── app.log
    └── error.log
'''
    
    print(structure)

show_project_structure()

# Configuration management
def configuration_examples():
    """Show different ways to handle configuration."""
    print("\\n=== Configuration Management ===")
    
    # config.py example
    config_py = '''# config.py - Configuration file example
import os
from typing import Dict, Any

class Config:
    """Base configuration class."""
    # Database settings
    DATABASE_URL = os.environ.get('DATABASE_URL', 'sqlite:///app.db')
    
    # Security settings
    SECRET_KEY = os.environ.get('SECRET_KEY', 'dev-secret-key')
    DEBUG = os.environ.get('DEBUG', 'False').lower() == 'true'
    
    # API settings
    API_HOST = os.environ.get('API_HOST', 'localhost')
    API_PORT = int(os.environ.get('API_PORT', 5000))
    
    # Email settings
    SMTP_SERVER = os.environ.get('SMTP_SERVER', 'localhost')
    SMTP_PORT = int(os.environ.get('SMTP_PORT', 587))
    
    @classmethod
    def get_settings(cls) -> Dict[str, Any]:
        """Get all configuration settings."""
        return {
            'database_url': cls.DATABASE_URL,
            'debug': cls.DEBUG,
            'api_host': cls.API_HOST,
            'api_port': cls.API_PORT
        }

class DevelopmentConfig(Config):
    """Development configuration."""
    DEBUG = True
    DATABASE_URL = 'sqlite:///dev.db'

class ProductionConfig(Config):
    """Production configuration."""
    DEBUG = False
    # Production settings override here

class TestingConfig(Config):
    """Testing configuration."""
    TESTING = True
    DATABASE_URL = 'sqlite:///:memory:'

# Configuration factory
config_by_name = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'testing': TestingConfig,
    'default': DevelopmentConfig
}
'''
    
    print("Configuration file (config.py):")
    print(config_py)
    
    # .env file example
    env_example = '''# .env file example (don't commit to git!)
DEBUG=true
SECRET_KEY=your-secret-key-here
DATABASE_URL=postgresql://user:password@localhost:5432/mydb
API_KEY=your-api-key
SMTP_USERNAME=your-email@example.com
SMTP_PASSWORD=your-email-password
'''
    
    print("\\nEnvironment file (.env):")
    print(env_example)
    
    # Using configuration
    usage_example = '''# Using configuration in your app
from myproject.config import config_by_name
import os

# Get configuration based on environment
env = os.environ.get('FLASK_ENV', 'default')
config = config_by_name[env]

# Use configuration
print(f"Debug mode: {config.DEBUG}")
print(f"Database: {config.DATABASE_URL}")
'''
    
    print("\\nUsing configuration:")
    print(usage_example)

configuration_examples()

# Package initialization
def package_init_examples():
    """Show proper package initialization."""
    print("\\n=== Package Initialization ===")
    
    # Main package __init__.py
    main_init = '''# myproject/__init__.py - Main package initialization
"""
MyProject - A sample Python application
"""

__version__ = "1.0.0"
__author__ = "Your Name"
__email__ = "your.email@example.com"

# Import main components for easy access
from .main import main
from .config import Config

# Package-level constants
DEFAULT_CONFIG = Config()

def get_version():
    """Get package version."""
    return __version__

# Optional: Initialize logging when package is imported
import logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
logger.info(f"MyProject v{__version__} initialized")
'''
    
    print("Main package __init__.py:")
    print(main_init)
    
    # Subpackage __init__.py
    sub_init = '''# myproject/models/__init__.py - Subpackage initialization
"""
Data models for MyProject
"""

# Import all models for easy access
from .user import User
from .product import Product

# Make models available at package level
__all__ = ['User', 'Product']

# Optional: Model registry
MODELS = {
    'user': User,
    'product': Product
}

def get_model(name: str):
    """Get model class by name."""
    return MODELS.get(name.lower())
'''
    
    print("\\nSubpackage __init__.py:")
    print(sub_init)

package_init_examples()

# Development tools configuration
def development_tools():
    """Show development tools configuration."""
    print("\\n=== Development Tools Configuration ===")
    
    # .gitignore for Python
    gitignore = '''# .gitignore for Python projects
# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
*.egg-info/
.installed.cfg
*.egg

# Virtual environments
venv/
env/
ENV/

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Environment variables
.env
.env.local
.env.*.local

# Logs
logs/
*.log

# Database
*.db
*.sqlite3

# Cache
.cache/
.pytest_cache/

# Coverage reports
htmlcov/
.coverage
.coverage.*
'''
    
    print(".gitignore example:")
    print(gitignore[:500] + "...")
    
    # setup.py for package distribution
    setup_py = '''# setup.py - Package installation configuration
from setuptools import setup, find_packages
import os

# Read README for long description
with open("README.md", "r", encoding="utf-8") as fh:
    long_description = fh.read()

# Read requirements
with open("requirements.txt", "r", encoding="utf-8") as fh:
    requirements = [line.strip() for line in fh if line.strip()]

setup(
    name="myproject",
    version="1.0.0",
    author="Your Name",
    author_email="your.email@example.com",
    description="A sample Python project",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/yourusername/myproject",
    packages=find_packages(),
    classifiers=[
        "Development Status :: 4 - Beta",
        "Intended Audience :: Developers",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
    ],
    python_requires=">=3.8",
    install_requires=requirements,
    extras_require={
        "dev": ["pytest", "black", "flake8"],
        "test": ["pytest", "pytest-cov"],
    },
    entry_points={
        "console_scripts": [
            "myproject=myproject.main:main",
        ],
    },
    include_package_data=True,
    zip_safe=False,
)
'''
    
    print("\\nsetup.py example:")
    print(setup_py)

development_tools()

# Best practices summary
def best_practices():
    """Project organization best practices."""
    print("\\n=== Project Organization Best Practices ===")
    
    practices = [
        "Use descriptive package and module names",
        "Keep modules focused on single responsibility",
        "Use __init__.py to control package exports",
        "Separate configuration from code",
        "Use environment variables for sensitive data",
        "Organize tests parallel to source code structure",
        "Include comprehensive documentation",
        "Use virtual environments for each project",
        "Pin dependency versions in requirements.txt",
        "Use semantic versioning for releases",
        "Include proper logging configuration",
        "Set up continuous integration/deployment",
        "Use type hints for better code clarity",
        "Follow PEP 8 style guidelines",
        "Write unit tests from the beginning"
    ]
    
    for i, practice in enumerate(practices, 1):
        print(str(i) + ". " + practice)
    
    print("\\n=== Quick Start Commands ===")
    quick_start = [
        "mkdir myproject && cd myproject",
        "python -m venv venv",
        "source venv/bin/activate",
        "pip install --upgrade pip",
        "touch README.md requirements.txt .gitignore",
        "mkdir myproject tests docs",
        "touch myproject/__init__.py",
        "git init && git add . && git commit -m 'Initial commit'"
    ]
    
    for command in quick_start:
        print("$ " + command)

best_practices()`,
        output: `=== Professional Python Project Structure ===

=== Recommended Project Structure ===

myproject/
│
├── README.md                   # Project documentation
├── requirements.txt            # Production dependencies
├── requirements-dev.txt        # Development dependencies
├── setup.py                   # Package installation script
├── .gitignore                 # Git ignore rules
├── .env                       # Environment variables (don't commit!)
│
├── myproject/                 # Main package directory
│   ├── __init__.py           # Makes it a Python package
│   ├── main.py               # Application entry point
│   ├── config.py             # Configuration settings
│   ├── models/               # Data models
│   │   ├── __init__.py
│   │   ├── user.py
│   │   └── product.py
│   ├── views/                # User interface/API endpoints
│   │   ├── __init__.py
│   │   ├── api.py
│   │   └── web.py
│   ├── utils/                # Utility functions
│   │   ├── __init__.py
│   │   ├── helpers.py
│   │   └── validators.py
│   └── services/             # Business logic
│       ├── __init__.py
│       ├── auth.py
│       └── email.py
│
├── tests/                    # Test files
│   ├── __init__.py
│   ├── test_models.py
│   ├── test_views.py
│   ├── test_utils.py
│   └── fixtures/             # Test data
│       └── sample_data.json
│
├── docs/                     # Documentation
│   ├── api.md
│   ├── installation.md
│   └── user_guide.md
│
├── scripts/                  # Utility scripts
│   ├── deploy.py
│   ├── backup.py
│   └── migrate.py
│
├── data/                     # Data files
│   ├── raw/                  # Raw data
│   ├── processed/            # Processed data
│   └── external/             # External data sources
│
└── logs/                     # Log files
    ├── app.log
    └── error.log

=== Configuration Management ===
Configuration file (config.py):
# config.py - Configuration file example
import os
from typing import Dict, Any

class Config:
    """Base configuration class."""
    # Database settings
    DATABASE_URL = os.environ.get('DATABASE_URL', 'sqlite:///app.db')
    
    # Security settings
    SECRET_KEY = os.environ.get('SECRET_KEY', 'dev-secret-key')
    DEBUG = os.environ.get('DEBUG', 'False').lower() == 'true'
    
    # API settings
    API_HOST = os.environ.get('API_HOST', 'localhost')
    API_PORT = int(os.environ.get('API_PORT', 5000))
    
    # Email settings
    SMTP_SERVER = os.environ.get('SMTP_SERVER', 'localhost')
    SMTP_PORT = int(os.environ.get('SMTP_PORT', 587))
    
    @classmethod
    def get_settings(cls) -> Dict[str, Any]:
        """Get all configuration settings."""
        return {
            'database_url': cls.DATABASE_URL,
            'debug': cls.DEBUG,
            'api_host': cls.API_HOST,
            'api_port': cls.API_PORT
        }

class DevelopmentConfig(Config):
    """Development configuration."""
    DEBUG = True
    DATABASE_URL = 'sqlite:///dev.db'

class ProductionConfig(Config):
    """Production configuration."""
    DEBUG = False
    # Production settings override here

class TestingConfig(Config):
    """Testing configuration."""
    TESTING = True
    DATABASE_URL = 'sqlite:///:memory:'

# Configuration factory
config_by_name = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'testing': TestingConfig,
    'default': DevelopmentConfig
}

Environment file (.env):
# .env file example (don't commit to git!)
DEBUG=true
SECRET_KEY=your-secret-key-here
DATABASE_URL=postgresql://user:password@localhost:5432/mydb
API_KEY=your-api-key
SMTP_USERNAME=your-email@example.com
SMTP_PASSWORD=your-email-password

Using configuration:
# Using configuration in your app
from myproject.config import config_by_name
import os

# Get configuration based on environment
env = os.environ.get('FLASK_ENV', 'default')
config = config_by_name[env]

# Use configuration
print(f"Debug mode: {config.DEBUG}")
print(f"Database: {config.DATABASE_URL}")

=== Package Initialization ===
Main package __init__.py:
# myproject/__init__.py - Main package initialization
"""
MyProject - A sample Python application
"""

__version__ = "1.0.0"
__author__ = "Your Name"
__email__ = "your.email@example.com"

# Import main components for easy access
from .main import main
from .config import Config

# Package-level constants
DEFAULT_CONFIG = Config()

def get_version():
    """Get package version."""
    return __version__

# Optional: Initialize logging when package is imported
import logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
logger.info(f"MyProject v{__version__} initialized")

Subpackage __init__.py:
# myproject/models/__init__.py - Subpackage initialization
"""
Data models for MyProject
"""

# Import all models for easy access
from .user import User
from .product import Product

# Make models available at package level
__all__ = ['User', 'Product']

# Optional: Model registry
MODELS = {
    'user': User,
    'product': Product
}

def get_model(name: str):
    """Get model class by name."""
    return MODELS.get(name.lower())

=== Development Tools Configuration ===
.gitignore example:
# .gitignore for Python projects
# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
*.egg-info/
.installed.cfg
*.egg

# Virtual environments
venv/
env/
ENV/

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Environment variables
.env
.env.local
.env.*.local

# Logs
logs/
*.log

# Database
*.db
*.sqlite3

# Cache
.cache/
.pytest_cache/

# Coverage reports
htmlcov/
.coverage
.coverage.*
...

setup.py example:
# setup.py - Package installation configuration
from setuptools import setup, find_packages
import os

# Read README for long description
with open("README.md", "r", encoding="utf-8") as fh:
    long_description = fh.read()

# Read requirements
with open("requirements.txt", "r", encoding="utf-8") as fh:
    requirements = [line.strip() for line in fh if line.strip()]

setup(
    name="myproject",
    version="1.0.0",
    author="Your Name",
    author_email="your.email@example.com",
    description="A sample Python project",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/yourusername/myproject",
    packages=find_packages(),
    classifiers=[
        "Development Status :: 4 - Beta",
        "Intended Audience :: Developers",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
    ],
    python_requires=">=3.8",
    install_requires=requirements,
    extras_require={
        "dev": ["pytest", "black", "flake8"],
        "test": ["pytest", "pytest-cov"],
    },
    entry_points={
        "console_scripts": [
            "myproject=myproject.main:main",
        ],
    },
    include_package_data=True,
    zip_safe=False,
)

=== Project Organization Best Practices ===
1. Use descriptive package and module names
2. Keep modules focused on single responsibility
3. Use __init__.py to control package exports
4. Separate configuration from code
5. Use environment variables for sensitive data
6. Organize tests parallel to source code structure
7. Include comprehensive documentation
8. Use virtual environments for each project
9. Pin dependency versions in requirements.txt
10. Use semantic versioning for releases
11. Include proper logging configuration
12. Set up continuous integration/deployment
13. Use type hints for better code clarity
14. Follow PEP 8 style guidelines
15. Write unit tests from the beginning

=== Quick Start Commands ===
$ mkdir myproject && cd myproject
$ python -m venv venv
$ source venv/bin/activate
$ pip install --upgrade pip
$ touch README.md requirements.txt .gitignore
$ mkdir myproject tests docs
$ touch myproject/__init__.py
$ git init && git add . && git commit -m 'Initial commit'`,
        tips: [
          "Follow conventional project structure for better maintainability",
          "Separate configuration from code using environment variables",
          "Use __init__.py files to control what gets imported",
          "Keep requirements.txt updated with exact versions for production"
        ],
        practice: {
          challenge: "Create a complete Python project structure with configuration management",
          starterCode: `# Project Structure Creator
import os

class ProjectCreator:
    def __init__(self, project_name):
        self.project_name = project_name
        self.base_path = os.path.join(os.getcwd(), project_name)
    
    def create_directory_structure(self):
        """Create the complete directory structure."""
        # Define all directories needed
        directories = [
            # Add all necessary directories here
        ]
        
        # Create directories
        # Use os.makedirs with exist_ok=True
        pass
    
    def create_config_files(self):
        """Create configuration files."""
        # Create requirements.txt
        # Create .gitignore
        # Create .env template
        # Create config.py
        pass
    
    def create_package_files(self):
        """Create package initialization files."""
        # Create __init__.py files
        # Create main.py
        # Create setup.py
        pass
    
    def create_readme(self):
        """Create comprehensive README.md."""
        # Include project description
        # Installation instructions
        # Usage examples
        # Development setup
        pass
    
    def initialize_git(self):
        """Initialize git repository."""
        # Run git init
        # Create initial commit
        pass
    
    def setup_virtual_environment(self):
        """Create and setup virtual environment."""
        # Create venv
        # Create activation instructions
        pass

# Test your project creator
# creator = ProjectCreator("my_awesome_project")
# creator.create_directory_structure()
# creator.create_config_files()
# creator.create_package_files()
# creator.create_readme()
# print("Project structure created successfully!")`,
          expectedOutput: "Complete project structure with all configuration files, proper organization, and development setup",
          hints: [
            "Use os.makedirs() with exist_ok=True",
            "Create template files with proper content",
            "Include both development and production configurations",
            "Add proper .gitignore patterns for Python projects"
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