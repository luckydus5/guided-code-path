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
  }
};

// Python code validation function
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