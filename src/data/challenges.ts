export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  instructions: string;
  starterCode: string;
  expectedOutput: string;
  hints: string[];
  category: string;
  learningObjectives: string[];
  detailedExplanation: string;
}

// Comprehensive Python challenges covering everything from basics to advanced
const pythonChallenges: Challenge[] = [
  // BEGINNER LEVEL - Python Fundamentals
  {
    id: "py-hello-world",
    title: "Hello World",
    description: "Your first Python program! Learn to display text on screen.",
    difficulty: "Beginner",
    instructions: `
Welcome to Python programming! In this challenge, you'll write your very first Python program.

WHAT YOU NEED TO DO:
1. Use the print() function to display text
2. The text should be exactly "Hello World" (without quotes)
3. Make sure to include the parentheses () after print
4. Put your text inside quotes - either "Hello World" or 'Hello World'

EXAMPLE FORMAT:
print("your text here")

TIP: Python is case-sensitive, so make sure to use lowercase 'print'

PYTHON BASICS:
- Python uses indentation to group code (4 spaces or 1 tab)
- Statements don't need semicolons (unlike JavaScript or Java)
- Comments start with # symbol
- Python reads code from top to bottom
    `,
    starterCode: "# Write your first Python program here\n# Use print() to display 'Hello World'\n",
    expectedOutput: "Hello World",
    hints: [
      "Use the print() function",
      "Put 'Hello World' inside quotes",
      "Don't forget the parentheses",
      "Check your spelling and capitalization"
    ],
    category: "Output",
    learningObjectives: [
      "Understand Python syntax basics",
      "Learn to use the print() function",
      "Understand string literals",
      "Practice proper code formatting"
    ],
    detailedExplanation: "The print() function is one of the most basic and important functions in Python. It displays text or data to the console/screen. Everything inside the parentheses gets displayed. This is your gateway to Python programming!"
  },
  {
    id: "py-variables-basic",
    title: "Variables and Assignment",
    description: "Learn to store and use data with variables.",
    difficulty: "Beginner",
    instructions: `
Variables are like labeled boxes that store information. You can put data in them and use that data later.

WHAT YOU NEED TO DO:
1. Create a variable called 'name' and store your name in it
2. Create a variable called 'age' and store a number in it
3. Use print() to display both variables

VARIABLE SYNTAX:
variable_name = value

FOR STRINGS (text): name = "John"
FOR NUMBERS: age = 25

PYTHON VARIABLE RULES:
- Names can contain letters, numbers, and underscores
- Must start with a letter or underscore (not a number)
- Case-sensitive (Name and name are different)
- Use snake_case convention (my_variable, not myVariable)
- Avoid Python keywords (if, for, while, etc.)

EXAMPLE:
my_var = "Hello"
my_number = 42
print(my_var)
print(my_number)
    `,
    starterCode: "# Create variables for name and age\n# Then print them both\n\n",
    expectedOutput: "Variable declared and printed",
    hints: [
      "Use = to assign values to variables",
      "Put text in quotes, numbers don't need quotes",
      "Print both variables using separate print() statements",
      "Variable names are case-sensitive"
    ],
    category: "Variables",
    learningObjectives: [
      "Understand variable assignment",
      "Learn naming conventions",
      "Practice string and number variables",
      "Understand data types basics"
    ],
    detailedExplanation: "Variables are fundamental in programming. They let you store data and reuse it throughout your program. Python variables don't need type declarations - Python figures out the type automatically (dynamic typing)."
  },
  {
    id: "py-math-operations",
    title: "Basic Math Operations",
    description: "Perform calculations using Python's arithmetic operators.",
    difficulty: "Beginner",
    instructions: `
Python can do math just like a calculator! Let's learn the basic arithmetic operators.

ARITHMETIC OPERATORS:
+ Addition: 5 + 3 = 8
- Subtraction: 5 - 3 = 2
* Multiplication: 5 * 3 = 15
/ Division: 6 / 3 = 2.0 (always returns float)
// Floor Division: 7 // 3 = 2 (integer result)
** Exponentiation: 2 ** 3 = 8 (2 to the power of 3)
% Modulo (remainder): 7 % 3 = 1

OPERATOR PRECEDENCE (PEMDAS/BODMAS):
1. Parentheses ()
2. Exponents **
3. Multiplication *, Division /, Floor Division //, Modulo %
4. Addition +, Subtraction -

WHAT YOU NEED TO DO:
1. Create two variables with numbers
2. Add them together and store in a new variable
3. Print the result

EXAMPLE:
num1 = 10
num2 = 5
result = num1 + num2
print(result)  # Outputs: 15
    `,
    starterCode: "# Create two number variables\n# Add them together\n# Print the sum\n\n",
    expectedOutput: "Sum calculated",
    hints: [
      "Use + for addition",
      "Store the result in a variable",
      "Use print() to display the result",
      "Make sure to use numbers, not text"
    ],
    category: "Math",
    learningObjectives: [
      "Learn arithmetic operators",
      "Practice variable operations",
      "Understand operator precedence",
      "Work with numeric data types"
    ],
    detailedExplanation: "Arithmetic operators let you perform mathematical calculations. Python follows standard mathematical order of operations (PEMDAS/BODMAS). Understanding these operators is essential for any computational work."
  },
  {
    id: "py-strings-basic",
    title: "Working with Strings",
    description: "Learn to manipulate text data in Python.",
    difficulty: "Beginner",
    instructions: `
Strings are sequences of characters (text). Python has many powerful string operations.

STRING BASICS:
- Strings are text enclosed in quotes: "Hello" or 'Hello'
- You can use single or double quotes (be consistent)
- Triple quotes for multi-line strings: """text"""
- Escape characters: \\n (newline), \\t (tab), \\\\ (backslash)

STRING OPERATIONS:
- Concatenation: "Hello" + " World" = "Hello World"
- Repetition: "Hi" * 3 = "HiHiHi"
- Length: len("Hello") = 5
- Indexing: "Hello"[0] = "H" (starts from 0)

STRING METHODS:
- .upper() makes text UPPERCASE
- .lower() makes text lowercase
- .capitalize() makes First letter capital
- .title() Makes Each Word Title Case
- .replace("old", "new") replaces text
- .strip() removes whitespace from ends

WHAT YOU NEED TO DO:
1. Create a string variable with your favorite color
2. Make it uppercase using .upper()
3. Print the result

EXAMPLE:
text = "hello world"
result = text.upper()
print(result)  # Prints: HELLO WORLD
    `,
    starterCode: "# Create a string with your favorite color\n# Convert it to uppercase\n# Print the result\n\n",
    expectedOutput: "String manipulated",
    hints: [
      "Put your color name in quotes",
      "Use .upper() method after the string variable",
      "Store the result or print directly",
      "Don't forget the parentheses in .upper()"
    ],
    category: "Strings",
    learningObjectives: [
      "Understand string data type",
      "Learn string methods",
      "Practice string manipulation",
      "Understand immutability of strings"
    ],
    detailedExplanation: "Strings are one of the most commonly used data types. Python provides many built-in methods to manipulate strings efficiently. Strings are immutable in Python, meaning they cannot be changed in place."
  },
  {
    id: "py-input-basic",
    title: "Getting User Input",
    description: "Learn to get information from users.",
    difficulty: "Beginner",
    instructions: `
The input() function lets your program ask users questions and get their responses.

INPUT SYNTAX:
variable = input("Your question here: ")

IMPORTANT NOTES:
- input() always returns a string (text)
- If you need a number, convert it: int(input("Enter number: "))
- The text in quotes is the prompt shown to the user
- User types response and presses Enter

TYPE CONVERSION:
- int(value) converts to integer
- float(value) converts to decimal number
- str(value) converts to string
- bool(value) converts to True/False

WHAT YOU NEED TO DO:
1. Ask the user for their name using input()
2. Store the response in a variable
3. Print a greeting using their name

EXAMPLE:
name = input("What's your name? ")
print("Hello, " + name + "!")

# Or using f-strings (modern Python):
print(f"Hello, {name}!")

TIP: F-strings are the modern way to format strings in Python
    `,
    starterCode: "# Ask user for their name\n# Print a personalized greeting\n\n",
    expectedOutput: "User input processed",
    hints: [
      "Use input() with a question",
      "Store the result in a variable",
      "Combine strings with + for the greeting",
      "Remember input() returns a string"
    ],
    category: "Input/Output",
    learningObjectives: [
      "Learn to get user input",
      "Practice string concatenation",
      "Understand data type conversion",
      "Create interactive programs"
    ],
    detailedExplanation: "User input makes programs interactive. The input() function pauses program execution and waits for the user to type something and press Enter. This is essential for creating programs that respond to user needs."
  },
  
  // INTERMEDIATE LEVEL - Control Structures
  {
    id: "py-if-statements",
    title: "Conditional Logic with If Statements",
    description: "Make decisions in your code using if, elif, and else.",
    difficulty: "Intermediate",
    instructions: `
If statements let your program make decisions and run different code based on conditions.

IF STATEMENT SYNTAX:
if condition:
    # code to run if condition is True
elif another_condition:
    # code to run if another_condition is True
else:
    # code to run if no conditions are True

COMPARISON OPERATORS:
== equal to (note: double equals!)
!= not equal to
> greater than
< less than
>= greater than or equal
<= less than or equal

LOGICAL OPERATORS:
and - both conditions must be True
or - at least one condition must be True
not - reverses the condition

BOOLEAN VALUES:
True, False (note the capitalization)

WHAT YOU NEED TO DO:
1. Ask user for their age
2. Convert it to an integer using int()
3. Print different messages based on age:
   - Under 18: "You're a minor"
   - 18-65: "You're an adult"
   - Over 65: "You're a senior"

EXAMPLE:
age = int(input("Enter your age: "))
if age < 18:
    print("You're a minor")
elif age <= 65:
    print("You're an adult")
else:
    print("You're a senior")

REMEMBER: Indentation matters in Python! Use 4 spaces or Tab consistently
    `,
    starterCode: "# Ask for user's age\n# Use if/elif/else to categorize them\n\n",
    expectedOutput: "Conditional logic executed",
    hints: [
      "Use int(input()) to get a number",
      "Use if, elif, else for multiple conditions",
      "Check your indentation",
      "Use comparison operators like < and >"
    ],
    category: "Conditionals",
    learningObjectives: [
      "Learn conditional statements",
      "Practice comparison operators",
      "Understand Python indentation",
      "Master logical decision making"
    ],
    detailedExplanation: "Conditional statements are the foundation of program logic. They allow programs to respond differently to different situations, making them dynamic and useful. Proper indentation is crucial in Python as it defines code blocks."
  },
  {
    id: "py-for-loops",
    title: "For Loops and Iteration",
    description: "Repeat code efficiently using for loops.",
    difficulty: "Intermediate",
    instructions: `
For loops let you repeat code multiple times, which is much more efficient than writing the same code over and over.

FOR LOOP SYNTAX:
for variable in sequence:
    # code to repeat

COMMON PATTERNS:
- for i in range(5): # repeats 5 times (0,1,2,3,4)
- for i in range(1, 6): # repeats from 1 to 5
- for i in range(0, 10, 2): # steps by 2: (0,2,4,6,8)
- for char in "hello": # loops through each character
- for item in [1,2,3]: # loops through list items

RANGE FUNCTION:
- range(5) = [0,1,2,3,4] (starts at 0, stops before 5)
- range(1,6) = [1,2,3,4,5] (starts at 1, stops before 6)
- range(0,10,2) = [0,2,4,6,8] (step by 2)

LOOP CONTROL:
- break: exit the loop immediately
- continue: skip to next iteration
- pass: do nothing (placeholder)

WHAT YOU NEED TO DO:
1. Use a for loop with range() to print numbers 1 to 5
2. Each number should be on its own line

EXAMPLE:
for i in range(1, 6):
    print(i)

OUTPUT:
1
2
3
4
5
    `,
    starterCode: "# Use a for loop to print numbers 1 to 5\n\n",
    expectedOutput: "Loop executed",
    hints: [
      "Use for i in range()",
      "range(1, 6) gives you 1,2,3,4,5",
      "Use print(i) inside the loop",
      "Check your indentation"
    ],
    category: "Loops",
    learningObjectives: [
      "Learn for loop syntax",
      "Understand the range() function",
      "Practice loop indentation",
      "Master iteration concepts"
    ],
    detailedExplanation: "Loops are essential for avoiding repetitive code. They let you execute the same block of code multiple times with different values, making your programs much more powerful and concise. The range() function is particularly useful for creating sequences of numbers."
  },
  
  // ADVANCED LEVEL - Functions and Data Structures
  {
    id: "py-functions-basic",
    title: "Creating Functions",
    description: "Write reusable code with functions.",
    difficulty: "Advanced",
    instructions: `
Functions are reusable blocks of code that perform specific tasks. They help organize code and avoid repetition.

FUNCTION SYNTAX:
def function_name(parameters):
    """Optional docstring explaining what the function does"""
    # function body
    return result  # optional

FUNCTION COMPONENTS:
- def: keyword to define function
- function_name: choose descriptive names using snake_case
- parameters: inputs to the function (optional)
- docstring: describes what function does (good practice)
- return: send result back to caller (optional)

FUNCTION BENEFITS:
- Code reusability
- Better organization
- Easier debugging
- Modularity
- Easier testing

PARAMETERS vs ARGUMENTS:
- Parameters: variables in function definition
- Arguments: actual values passed when calling

WHAT YOU NEED TO DO:
1. Create a function called 'greet' that takes a name parameter
2. The function should return a greeting message
3. Call the function with a name and print the result

EXAMPLE:
def add_numbers(a, b):
    """Adds two numbers together and returns the sum"""
    result = a + b
    return result

# Call the function
answer = add_numbers(5, 3)
print(answer)  # Prints: 8

# Or more concisely:
def add_numbers(a, b):
    return a + b
    `,
    starterCode: "# Define a function called 'greet' that takes a name parameter\n# Return a greeting message\n# Call the function and print the result\n\n",
    expectedOutput: "Function defined",
    hints: [
      "Start with 'def greet(name):'",
      "Use return to send back a value",
      "Call function with greet('YourName')",
      "Don't forget the colon after the function definition"
    ],
    category: "Functions",
    learningObjectives: [
      "Learn function definition syntax",
      "Understand parameters and return values",
      "Practice function calls",
      "Master code organization"
    ],
    detailedExplanation: "Functions are the building blocks of larger programs. They encapsulate functionality, make code reusable, and help break down complex problems into smaller, manageable pieces. Good function design is crucial for maintainable code."
  },
  {
    id: "py-lists-basic",
    title: "Working with Lists",
    description: "Store and manipulate collections of data.",
    difficulty: "Advanced",
    instructions: `
Lists are ordered collections that can store multiple items. They're one of Python's most useful data types.

LIST BASICS:
- Create: my_list = [1, 2, 3, "hello"]
- Access: my_list[0] gets first item (indexing starts at 0)
- Negative indexing: my_list[-1] gets last item
- Modify: my_list[0] = "new value"
- Length: len(my_list)

LIST METHODS:
- .append(item): adds item to end
- .insert(index, item): adds item at specific position
- .remove(item): removes first occurrence of item
- .pop(): removes and returns last item
- .pop(index): removes and returns item at index
- .sort(): sorts the list in place
- .reverse(): reverses the list in place
- .count(item): counts occurrences of item
- .index(item): finds index of first occurrence

LIST SLICING:
- my_list[1:4]: items from index 1 to 3
- my_list[:3]: first 3 items
- my_list[2:]: items from index 2 to end
- my_list[:]: copy of entire list
- my_list[::2]: every second item

WHAT YOU NEED TO DO:
1. Create a list with at least 3 items
2. Add another item using append()
3. Print the entire list
4. Print the length of the list

EXAMPLE:
fruits = ["apple", "banana", "orange"]
fruits.append("grape")
print(fruits)  # ['apple', 'banana', 'orange', 'grape']
print("Length:", len(fruits))  # Length: 4

LIST CHARACTERISTICS:
- Ordered (maintains insertion order)
- Mutable (can be changed)
- Allow duplicates
- Can store different data types
    `,
    starterCode: "# Create a list with 3 items\n# Add another item using append()\n# Print the list and its length\n\n",
    expectedOutput: "List operations completed",
    hints: [
      "Use square brackets [] to create lists",
      "Use .append() to add items",
      "Use len() to get list length",
      "Print the list directly"
    ],
    category: "Data Structures",
    learningObjectives: [
      "Understand list data type",
      "Learn list methods",
      "Practice list manipulation",
      "Master indexing and slicing"
    ],
    detailedExplanation: "Lists are fundamental data structures in Python. They're versatile, mutable (changeable), and can store any type of data, making them perfect for many programming tasks. Understanding lists is crucial for data manipulation and algorithm implementation."
  }
];

// Comprehensive JavaScript challenges
const javascriptChallenges: Challenge[] = [
  // BEGINNER LEVEL
  {
    id: "js-hello-world",
    title: "Hello World in JavaScript",
    description: "Your first JavaScript program using console.log().",
    difficulty: "Beginner",
    instructions: `
Welcome to JavaScript! You'll learn to display messages in the browser console.

WHAT YOU NEED TO DO:
1. Use console.log() to display text
2. The text should be exactly "Hello World"
3. Put your text inside quotes - either "Hello World" or 'Hello World'

CONSOLE.LOG BASICS:
- console.log() displays messages in the browser's developer console
- It's similar to print() in Python
- You can see the output by opening Developer Tools (F12)
- Essential for debugging and development

JAVASCRIPT SYNTAX:
- Statements end with semicolons (;) - good practice
- JavaScript is case-sensitive
- Comments use // for single line or /* */ for multi-line
- Strings can use single or double quotes

SYNTAX:
console.log("your message here");

DEVELOPMENT TOOLS:
- F12 opens Developer Tools in most browsers
- Console tab shows console.log() output
- Console is your debugging best friend

IMPORTANT: Don't forget the semicolon ; at the end (good practice in JavaScript)
    `,
    starterCode: "// Write your first JavaScript program here\n// Use console.log() to display 'Hello World'\n",
    expectedOutput: "Hello World",
    hints: [
      "Use console.log() function",
      "Put 'Hello World' inside quotes",
      "Don't forget the semicolon",
      "Check spelling and capitalization"
    ],
    category: "Output",
    learningObjectives: [
      "Understand JavaScript syntax",
      "Learn console.log() function",
      "Practice string literals",
      "Understand browser development tools"
    ],
    detailedExplanation: "console.log() is your best friend for debugging and displaying information. It outputs to the browser's console, which developers use constantly. This is the foundation of JavaScript development!"
  },
  {
    id: "js-variables-let-const",
    title: "Variables with let and const",
    description: "Learn modern JavaScript variable declarations.",
    difficulty: "Beginner",
    instructions: `
JavaScript has three ways to declare variables: var, let, and const. Modern JavaScript uses let and const.

VARIABLE TYPES:
- let: for variables that can change (mutable)
- const: for variables that won't change (constants)
- var: old way (avoid in modern JavaScript - has scope issues)

SYNTAX:
let variableName = value;
const constantName = value;

NAMING RULES:
- Use camelCase for variable names (firstName, lastName, userAge)
- Start with letter, underscore, or dollar sign
- Can contain letters, numbers, underscores, dollar signs
- Cannot start with numbers
- Cannot use JavaScript keywords (if, for, while, etc.)

CONST vs LET:
- const: Value cannot be reassigned (for constants, objects, arrays)
- let: Value can be reassigned (for changing variables)
- const objects/arrays can still be modified (contents can change)

WHAT YOU NEED TO DO:
1. Create a const variable for your name
2. Create a let variable for your age
3. Log both variables to console

EXAMPLE:
const firstName = "John";
let age = 25;
console.log(firstName);
console.log(age);

// This works:
age = 26; // let allows reassignment

// This would cause an error:
// firstName = "Jane"; // const doesn't allow reassignment

BEST PRACTICES:
- Use const by default
- Use let only when you need to reassign
- Avoid var in modern JavaScript
- Use descriptive variable names
    `,
    starterCode: "// Declare a const variable for your name\n// Declare a let variable for your age\n// Log both to console\n\n",
    expectedOutput: "Variable declared and logged",
    hints: [
      "Use const for name (won't change)",
      "Use let for age (might change)",
      "Log each variable separately",
      "Use camelCase naming"
    ],
    category: "Variables",
    learningObjectives: [
      "Learn let vs const",
      "Practice variable naming",
      "Understand variable scope",
      "Master modern JavaScript syntax"
    ],
    detailedExplanation: "Modern JavaScript prefers let and const over var because they have better scoping rules and help prevent common programming errors. Understanding when to use each is crucial for writing maintainable code."
  },
  {
    id: "js-template-literals",
    title: "Template Literals and String Interpolation",
    description: "Create dynamic strings using template literals.",
    difficulty: "Intermediate",
    instructions: `
Template literals are a powerful way to create strings with embedded expressions.

TEMPLATE LITERAL SYNTAX:
\`Your text here with \${variable}\`

KEY FEATURES:
- Use backticks (\`) instead of quotes
- Embed variables with \${variable}
- Support multi-line strings
- Much cleaner than string concatenation
- Can include any JavaScript expression

OLD WAY (concatenation):
"Hello " + name + ", you are " + age + " years old"

NEW WAY (template literals):
\`Hello \${name}, you are \${age} years old\`

ADVANCED FEATURES:
- Multi-line strings without \\n
- Expression evaluation: \${2 + 3}
- Function calls: \${getName()}
- Nested template literals

WHAT YOU NEED TO DO:
1. Create variables for name and age
2. Use a template literal to create a greeting message
3. Include both variables in the template literal
4. Log the result

EXAMPLE:
const name = "Alice";
const age = 30;
const message = \`Hi \${name}, you're \${age} years old!\`;
console.log(message);

MULTI-LINE EXAMPLE:
const multiLine = \`
  Hello \${name},
  Welcome to our website!
  You are \${age} years old.
\`;
    `,
    starterCode: "// Create variables for name and age\n// Use template literal to create a greeting\n// Log the greeting message\n\n",
    expectedOutput: "Template literal used",
    hints: [
      "Use backticks ` not regular quotes",
      "Use ${variable} to embed variables",
      "Create a complete sentence",
      "Don't forget to console.log the result"
    ],
    category: "Strings",
    learningObjectives: [
      "Learn template literal syntax",
      "Practice string interpolation",
      "Understand modern JavaScript features",
      "Master dynamic string creation"
    ],
    detailedExplanation: "Template literals make string creation much more readable and powerful. They're essential for modern JavaScript development and are widely used in frameworks like React, Vue, and Angular."
  },
  {
    id: "js-arrow-functions",
    title: "Arrow Functions",
    description: "Learn the modern way to write functions in JavaScript.",
    difficulty: "Intermediate",
    instructions: `
Arrow functions are a shorter way to write functions, introduced in ES6.

ARROW FUNCTION SYNTAX:
const functionName = (parameters) => {
    // function body
    return result;
};

COMPARISON:
Traditional function:
function greet(name) {
    return "Hello " + name;
}

Arrow function:
const greet = (name) => {
    return "Hello " + name;
};

SHORT FORMS:
Single parameter (parentheses optional):
const greet = name => "Hello " + name;

Single expression (implicit return):
const greet = (name) => "Hello " + name;

No parameters:
const sayHello = () => "Hello!";

Multiple parameters:
const add = (a, b) => a + b;

ARROW FUNCTION BENEFITS:
- Shorter syntax
- Implicit return for single expressions
- Lexical 'this' binding (important for object methods)
- Commonly used in array methods

WHAT YOU NEED TO DO:
1. Create an arrow function called 'greet'
2. It should take a name parameter
3. Return a greeting message using template literals
4. Call the function and log the result

EXAMPLE:
const add = (a, b) => a + b;
const result = add(5, 3);
console.log(result); // 8

const greetUser = (name) => \`Hello, \${name}!\`;
console.log(greetUser("World")); // Hello, World!
    `,
    starterCode: "// Create an arrow function called 'greet'\n// Use template literal in the return\n// Call the function and log result\n\n",
    expectedOutput: "Arrow function defined",
    hints: [
      "Use const greet = (name) => ...",
      "Use template literal for the return",
      "Call with greet('YourName')",
      "Don't forget to console.log the result"
    ],
    category: "Functions",
    learningObjectives: [
      "Learn arrow function syntax",
      "Practice modern JavaScript",
      "Understand function expressions",
      "Master concise function writing"
    ],
    detailedExplanation: "Arrow functions are more concise and have different 'this' binding behavior. They're widely used in modern JavaScript and React development, especially with array methods like map, filter, and reduce."
  }
];

// Generate comprehensive challenges for all languages covering all programming concepts
const generateChallenges = (language: string): Challenge[] => {
  const baseLanguageChallenges = language === 'python' ? pythonChallenges : 
                                language === 'javascript' ? javascriptChallenges : [];
  
  // Add programmatically generated challenges to reach 800+
  const additionalChallenges: Challenge[] = [];
  
  // BEGINNER CONCEPTS (200 challenges)
  const beginnerTopics = [
    'Variables and Data Types', 'Basic Input/Output', 'String Operations', 
    'Number Operations', 'Boolean Logic', 'Comments and Documentation',
    'Basic Error Handling', 'Type Conversion', 'Constants', 'Operators'
  ];
  
  beginnerTopics.forEach((topic, topicIndex) => {
    for (let i = 1; i <= 20; i++) {
      additionalChallenges.push({
        id: `${language}-beginner-${topicIndex}-${i}`,
        title: `${topic} - Exercise ${i}`,
        description: `Practice ${topic.toLowerCase()} with hands-on coding.`,
        difficulty: "Beginner",
        instructions: getInstructionsForTopic(language, topic, i),
        starterCode: getStarterCodeForTopic(language, topic, i),
        expectedOutput: getExpectedOutputForTopic(language, topic, i),
        hints: getHintsForTopic(language, topic, i),
        category: topic,
        learningObjectives: getLearningObjectives(language, topic, i),
        detailedExplanation: getDetailedExplanation(language, topic, i)
      });
    }
  });
  
  // INTERMEDIATE CONCEPTS (300 challenges)
  const intermediateTopics = [
    'Control Flow (If/Else)', 'Loops (For/While)', 'Functions', 'Arrays/Lists',
    'Objects/Dictionaries', 'Error Handling', 'File Operations', 'Modules/Imports',
    'Classes (Basic)', 'Debugging Techniques', 'Algorithm Basics', 'Data Validation',
    'Regular Expressions', 'Date and Time', 'JSON Operations'
  ];
  
  intermediateTopics.forEach((topic, topicIndex) => {
    for (let i = 1; i <= 20; i++) {
      additionalChallenges.push({
        id: `${language}-intermediate-${topicIndex}-${i}`,
        title: `${topic} - Challenge ${i}`,
        description: `Master ${topic.toLowerCase()} through practical exercises.`,
        difficulty: "Intermediate",
        instructions: getInstructionsForTopic(language, topic, i),
        starterCode: getStarterCodeForTopic(language, topic, i),
        expectedOutput: getExpectedOutputForTopic(language, topic, i),
        hints: getHintsForTopic(language, topic, i),
        category: topic,
        learningObjectives: getLearningObjectives(language, topic, i),
        detailedExplanation: getDetailedExplanation(language, topic, i)
      });
    }
  });
  
  // ADVANCED CONCEPTS (300 challenges)
  const advancedTopics = [
    'Advanced Functions', 'Decorators/Higher-Order Functions', 'Advanced Data Structures',
    'Object-Oriented Programming', 'Design Patterns', 'Algorithms and Complexity',
    'Recursion', 'Memory Management', 'Performance Optimization', 'Testing',
    'Concurrency/Async Programming', 'Database Integration', 'Web APIs',
    'Advanced Error Handling', 'Security Best Practices'
  ];
  
  advancedTopics.forEach((topic, topicIndex) => {
    for (let i = 1; i <= 20; i++) {
      additionalChallenges.push({
        id: `${language}-advanced-${topicIndex}-${i}`,
        title: `${topic} - Expert Challenge ${i}`,
        description: `Advanced ${topic.toLowerCase()} for expert-level programming.`,
        difficulty: "Advanced",
        instructions: getInstructionsForTopic(language, topic, i),
        starterCode: getStarterCodeForTopic(language, topic, i),
        expectedOutput: getExpectedOutputForTopic(language, topic, i),
        hints: getHintsForTopic(language, topic, i),
        category: topic,
        learningObjectives: getLearningObjectives(language, topic, i),
        detailedExplanation: getDetailedExplanation(language, topic, i)
      });
    }
  });
  
  return [...baseLanguageChallenges, ...additionalChallenges];
};

// Helper functions for generating comprehensive instructions
const getInstructionsForTopic = (language: string, topic: string, challengeNum: number): string => {
  const instructionMap: { [key: string]: string[] } = {
    'Variables and Data Types': [
      `Learn to store data in variables. In ${language}, variables are containers that hold information.`,
      `Practice declaring variables with different data types: strings, numbers, booleans.`,
      `Understand variable naming conventions and best practices in ${language}.`,
      `Explore variable scope and lifetime in your programs.`,
      `Master type conversion and type checking in ${language}.`
    ],
    'Basic Input/Output': [
      `Learn to get input from users and display output effectively.`,
      `Practice formatting output for better user experience.`,
      `Understand different input methods and their use cases.`,
      `Master error handling for invalid input.`,
      `Create interactive programs that respond to user input.`
    ],
    'Control Flow (If/Else)': [
      `Learn to make decisions in your code using conditional statements.`,
      `Practice using comparison operators and logical operators.`,
      `Master nested if statements and complex conditions.`,
      `Understand when to use if/elif/else vs other control structures.`,
      `Create programs that branch based on different conditions.`
    ],
    'Loops (For/While)': [
      `Master repetition in programming using loops.`,
      `Learn when to use for loops vs while loops.`,
      `Practice loop control with break and continue.`,
      `Understand nested loops and their applications.`,
      `Optimize loop performance and avoid infinite loops.`
    ],
    'Functions': [
      `Learn to organize code into reusable functions.`,
      `Practice function parameters and return values.`,
      `Master function scope and local vs global variables.`,
      `Understand function documentation and best practices.`,
      `Create modular programs using well-designed functions.`
    ]
  };
  
  const topicInstructions = instructionMap[topic] || [`Practice ${topic} concepts in ${language}.`];
  const instruction = topicInstructions[(challengeNum - 1) % topicInstructions.length];
  
  return `
${instruction}

CHALLENGE ${challengeNum}:
This exercise will help you master ${topic.toLowerCase()} in ${language}. 

WHAT YOU NEED TO DO:
1. Read the problem carefully
2. Write clean, readable code
3. Test your solution thoroughly
4. Follow ${language} best practices

REMEMBER:
- Use meaningful variable names
- Add comments to explain your logic
- Handle edge cases appropriately
- Write code that others can understand

${getLanguageSpecificTips(language)}
  `.trim();
};

const getLanguageSpecificTips = (language: string): string => {
  const tips: { [key: string]: string } = {
    python: `
PYTHON TIPS:
- Use snake_case for variable names (my_variable)
- Indentation matters! Use 4 spaces consistently
- Use meaningful function and variable names
- Follow PEP 8 style guidelines
- Use list comprehensions for elegant code
- Handle exceptions with try/except blocks
- Use f-strings for string formatting: f"Hello {name}"
- Remember: Python is case-sensitive
    `,
    javascript: `
JAVASCRIPT TIPS:
- Use camelCase for variable names (myVariable)
- Use const for values that won't change, let for variables
- Use template literals with backticks: \`Hello \${name}\`
- Use arrow functions for cleaner code
- Use strict equality (===) instead of loose equality (==)
- Handle async operations with promises or async/await
- Use destructuring for cleaner code
- Always use semicolons for consistency
    `,
    java: `
JAVA TIPS:
- Use PascalCase for class names, camelCase for variables
- Every method must be in a class
- Use proper access modifiers (public, private, protected)
- Handle exceptions with try-catch blocks
- Use StringBuilder for string concatenation in loops
- Follow naming conventions consistently
- Use meaningful package names
- Always close resources (use try-with-resources)
    `,
    'c++': `
C++ TIPS:
- Use RAII (Resource Acquisition Is Initialization)
- Prefer smart pointers over raw pointers
- Use const whenever possible
- Initialize variables when declaring them
- Use std namespace properly
- Handle memory management carefully
- Use references instead of pointers when possible
- Follow the Rule of Three/Five/Zero
    `
  };
  
  return tips[language] || `
GENERAL PROGRAMMING TIPS:
- Write clean, readable code
- Use meaningful variable names
- Add comments to explain complex logic
- Test your code thoroughly
- Follow language-specific conventions
- Handle errors gracefully
- Keep functions small and focused
- Practice good naming conventions
  `;
};

const getStarterCodeForTopic = (language: string, topic: string, challengeNum: number): string => {
  const starterCodes: { [key: string]: { [key: string]: string[] } } = {
    python: {
      'Variables and Data Types': [
        '# Declare variables of different types\n',
        '# Create string, integer, and boolean variables\n',
        '# Practice variable naming conventions\n',
        '# Convert between data types\n',
        '# Use type() function to check types\n'
      ],
      'Control Flow (If/Else)': [
        '# Write conditional statements\n',
        '# Use comparison operators\n',
        '# Practice nested if statements\n',
        '# Combine conditions with and/or\n',
        '# Handle multiple conditions with elif\n'
      ],
      'Loops (For/While)': [
        '# Write a for loop\n',
        '# Use range() function\n',
        '# Practice while loops\n',
        '# Use break and continue\n',
        '# Write nested loops\n'
      ],
      'Functions': [
        '# Define a function\ndef my_function():\n    pass\n',
        '# Function with parameters\ndef greet(name):\n    pass\n',
        '# Function with return value\ndef calculate():\n    return 0\n',
        '# Function with default parameters\ndef func(param="default"):\n    pass\n',
        '# Function with multiple returns\ndef multi_return():\n    return 1, 2\n'
      ]
    },
    javascript: {
      'Variables and Data Types': [
        '// Declare variables with let and const\n',
        '// Create different data types\n',
        '// Practice variable naming\n',
        '// Use typeof operator\n',
        '// Convert between types\n'
      ],
      'Control Flow (If/Else)': [
        '// Write if statements\n',
        '// Use comparison operators\n',
        '// Practice ternary operator\n',
        '// Handle multiple conditions\n',
        '// Use switch statements\n'
      ],
      'Template Literals': [
        '// Use template literals with backticks\n',
        '// Embed variables with ${}\n',
        '// Create multi-line strings\n',
        '// Practice string interpolation\n',
        '// Combine template literals with functions\n'
      ],
      'Arrow Functions': [
        '// Define arrow functions\nconst func = () => {\n    \n};\n',
        '// Arrow function with parameters\nconst greet = (name) => {\n    \n};\n',
        '// Single expression arrow function\nconst add = (a, b) => a + b;\n',
        '// Arrow function with destructuring\nconst func = ({prop}) => {\n    \n};\n',
        '// Arrow function returning object\nconst createObj = () => ({});\n'
      ]
    }
  };
  
  const langCodes = starterCodes[language] || {};
  const topicCodes = langCodes[topic] || ['// Write your solution here\n'];
  return topicCodes[(challengeNum - 1) % topicCodes.length];
};

const getExpectedOutputForTopic = (language: string, topic: string, challengeNum: number): string => {
  return `Challenge ${challengeNum} completed successfully`;
};

const getHintsForTopic = (language: string, topic: string, challengeNum: number): string[] => {
  const commonHints = [
    `Follow ${language} syntax carefully`,
    "Test your code step by step",
    "Use meaningful variable names",
    "Check for typos and syntax errors",
    "Read error messages carefully"
  ];
  
  return commonHints;
};

const getLearningObjectives = (language: string, topic: string, challengeNum: number): string[] => {
  return [
    `Master ${topic} concepts in ${language}`,
    "Apply best practices and coding standards",
    "Develop problem-solving skills",
    "Build confidence in programming"
  ];
};

const getDetailedExplanation = (language: string, topic: string, challengeNum: number): string => {
  return `This challenge focuses on ${topic} in ${language}. You'll learn essential concepts and apply them in practical scenarios to build your programming expertise.`;
};

// Export the main object with all language challenges
export const LANGUAGE_CHALLENGES: { [key: string]: Challenge[] } = {
  python: generateChallenges('python'),
  javascript: generateChallenges('javascript'),
  java: generateChallenges('java'),
  cpp: generateChallenges('c++'),
  csharp: generateChallenges('csharp'),
  go: generateChallenges('go'),
  rust: generateChallenges('rust'),
  swift: generateChallenges('swift'),
  kotlin: generateChallenges('kotlin'),
  php: generateChallenges('php'),
  ruby: generateChallenges('ruby'),
  r: generateChallenges('r'),
  scala: generateChallenges('scala'),
  dart: generateChallenges('dart'),
  typescript: generateChallenges('typescript')
};