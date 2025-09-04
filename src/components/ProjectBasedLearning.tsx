import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  Code2,
  Lightbulb,
  Target,
  CheckCircle2,
  Play
} from 'lucide-react';

interface ProjectStep {
  id: string;
  title: string;
  description: string;
  instructions: string[];
  codeExample: string;
  explanation: string;
  hints: string[];
  keyParts: string[];
  checkpoint: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  language: string;
  estimatedTime: string;
  learningGoals: string[];
  steps: ProjectStep[];
  finalResult: {
    title: string;
    description: string;
    features: string[];
  };
}

const PROJECTS: Project[] = [
  {
    id: 'personal-portfolio',
    title: 'Personal Portfolio Website',
    description: 'Build a complete personal portfolio from scratch using HTML, CSS, and basic JavaScript',
    difficulty: 'Beginner',
    language: 'HTML/CSS',
    estimatedTime: '3-4 hours',
    learningGoals: [
      'Structure content with semantic HTML',
      'Style layouts with CSS Flexbox',
      'Create responsive designs',
      'Add interactive elements'
    ],
    steps: [
      {
        id: 'step-1',
        title: 'Create HTML Structure',
        description: 'Set up the basic HTML structure for your portfolio',
        instructions: [
          'Create a new HTML file called index.html',
          'Add the basic HTML5 document structure',
          'Include sections for header, about, skills, projects, and contact',
          'Use semantic HTML elements for better accessibility'
        ],
        codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Name - Web Developer</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <nav>
            <!-- Navigation will go here -->
        </nav>
        <section class="hero">
            <!-- Hero section content -->
        </section>
    </header>
    
    <main>
        <section id="about">
            <!-- About section -->
        </section>
        
        <section id="skills">
            <!-- Skills section -->
        </section>
        
        <section id="projects">
            <!-- Projects section -->
        </section>
        
        <section id="contact">
            <!-- Contact section -->
        </section>
    </main>
    
    <footer>
        <!-- Footer content -->
    </footer>
</body>
</html>`,
        explanation: 'This creates the foundation of your portfolio. We use semantic HTML5 elements like <header>, <main>, <section> for better structure and accessibility.',
        hints: [
          'Use meaningful class names and IDs',
          'Include meta viewport for mobile responsiveness',
          'Link your CSS file in the head section'
        ],
        keyParts: ['<!DOCTYPE html>', '<meta name="viewport">', 'semantic elements'],
        checkpoint: 'Your HTML file should have a clear structure with all main sections defined'
      },
      {
        id: 'step-2',
        title: 'Add Content to Sections',
        description: 'Fill in the content for each section of your portfolio',
        instructions: [
          'Add your name and tagline to the hero section',
          'Write a brief about section describing yourself',
          'List your skills using appropriate HTML elements',
          'Create placeholder content for your projects',
          'Add contact information and links'
        ],
        codeExample: `<section class="hero">
    <div class="hero-content">
        <h1>Hi, I'm [Your Name]</h1>
        <p class="tagline">Aspiring Web Developer</p>
        <a href="#contact" class="cta-button">Get In Touch</a>
    </div>
</section>

<section id="about">
    <div class="container">
        <h2>About Me</h2>
        <p>I'm passionate about creating beautiful and functional websites...</p>
    </div>
</section>

<section id="skills">
    <div class="container">
        <h2>My Skills</h2>
        <ul class="skills-list">
            <li>HTML5</li>
            <li>CSS3</li>
            <li>JavaScript</li>
            <li>Responsive Design</li>
        </ul>
    </div>
</section>`,
        explanation: 'Content gives life to your structure. Use headings (h1, h2) to create hierarchy and organize information logically.',
        hints: [
          'Keep your about section concise but personal',
          'Use bullet points or lists for skills',
          'Make sure your hero section is compelling'
        ],
        keyParts: ['<h1>', '<h2>', 'semantic content structure'],
        checkpoint: 'All sections should have meaningful content that represents you'
      },
      {
        id: 'step-3',
        title: 'Style with CSS',
        description: 'Create a CSS file and add basic styling to make your portfolio look professional',
        instructions: [
          'Create a styles.css file',
          'Add CSS reset and basic body styling',
          'Style the navigation and hero section',
          'Create a consistent color scheme',
          'Make the layout visually appealing'
        ],
        codeExample: `/* Reset and base styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    color: #333;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Hero section styling */
.hero {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    text-align: center;
    padding: 100px 0;
}

.hero h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.tagline {
    font-size: 1.2rem;
    margin-bottom: 2rem;
}

.cta-button {
    display: inline-block;
    background: white;
    color: #667eea;
    padding: 12px 30px;
    text-decoration: none;
    border-radius: 25px;
    font-weight: bold;
    transition: transform 0.3s ease;
}

.cta-button:hover {
    transform: translateY(-2px);
}`,
        explanation: 'CSS brings your design to life. We start with a reset, add base styles, and create visual hierarchy with colors, fonts, and spacing.',
        hints: [
          'Use a CSS reset to ensure consistency across browsers',
          'Choose a color scheme and stick to it',
          'Add hover effects for better user experience'
        ],
        keyParts: ['CSS reset', 'color scheme', 'hover effects'],
        checkpoint: 'Your portfolio should now have a professional appearance with consistent styling'
      },
      {
        id: 'step-4',
        title: 'Make it Responsive',
        description: 'Add responsive design to ensure your portfolio looks great on all devices',
        instructions: [
          'Add media queries for different screen sizes',
          'Make the navigation mobile-friendly',
          'Ensure text and images scale properly',
          'Test on different device sizes',
          'Adjust spacing and font sizes for mobile'
        ],
        codeExample: `/* Mobile-first responsive design */
@media (max-width: 768px) {
    .hero h1 {
        font-size: 2rem;
    }
    
    .tagline {
        font-size: 1rem;
    }
    
    .container {
        padding: 0 15px;
    }
    
    .skills-list {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
    }
}

@media (max-width: 480px) {
    .hero {
        padding: 60px 0;
    }
    
    .hero h1 {
        font-size: 1.8rem;
    }
    
    .skills-list {
        grid-template-columns: 1fr;
    }
}

/* Flexible layout for larger screens */
@media (min-width: 1024px) {
    .hero h1 {
        font-size: 3.5rem;
    }
    
    .about-content {
        display: flex;
        align-items: center;
        gap: 40px;
    }
}`,
        explanation: 'Media queries allow your design to adapt to different screen sizes. We use a mobile-first approach, starting with mobile styles and enhancing for larger screens.',
        hints: [
          'Start with mobile design first',
          'Test on actual devices or browser dev tools',
          'Use relative units (rem, %) instead of fixed pixels'
        ],
        keyParts: ['@media queries', 'mobile-first approach', 'flexible layouts'],
        checkpoint: 'Your portfolio should look great and be fully functional on mobile, tablet, and desktop'
      }
    ],
    finalResult: {
      title: 'Complete Personal Portfolio',
      description: 'A fully responsive, professional portfolio website',
      features: [
        'Clean, semantic HTML structure',
        'Professional CSS styling',
        'Fully responsive design',
        'Smooth animations and hover effects',
        'Cross-browser compatibility'
      ]
    }
  },
  {
    id: 'todo-app-python',
    title: 'Todo List Application',
    description: 'Build a command-line todo list manager with Python',
    difficulty: 'Beginner',
    language: 'Python',
    estimatedTime: '2-3 hours',
    learningGoals: [
      'Work with Python lists and dictionaries',
      'Handle user input and validation',
      'Implement file operations for data persistence',
      'Create a simple command-line interface'
    ],
    steps: [
      {
        id: 'step-1',
        title: 'Setup and Basic Structure',
        description: 'Create the basic structure for your todo application',
        instructions: [
          'Create a new Python file called todo_app.py',
          'Set up the main function and basic menu structure',
          'Create a list to store todo items',
          'Implement a simple welcome message'
        ],
        codeExample: `# todo_app.py
def main():
    """Main function to run the todo application"""
    todos = []  # List to store our todo items
    
    print("=== Welcome to Your Todo List Manager ===")
    print("Stay organized and get things done!")
    
    while True:
        show_menu()
        choice = input("Enter your choice (1-5): ").strip()
        
        if choice == '1':
            add_todo(todos)
        elif choice == '2':
            view_todos(todos)
        elif choice == '3':
            complete_todo(todos)
        elif choice == '4':
            delete_todo(todos)
        elif choice == '5':
            print("Thanks for using Todo Manager! Stay productive!")
            break
        else:
            print("Invalid choice. Please try again.")

def show_menu():
    """Display the main menu options"""
    print("\\n" + "="*40)
    print("What would you like to do?")
    print("1. Add a new todo")
    print("2. View all todos") 
    print("3. Mark todo as complete")
    print("4. Delete a todo")
    print("5. Exit")
    print("="*40)

if __name__ == "__main__":
    main()`,
        explanation: 'This creates the foundation of our todo app. We use a while loop for the main program flow and organize our code into functions for better structure.',
        hints: [
          'Use descriptive function names',
          'Add docstrings to explain what each function does',
          'The if __name__ == "__main__": ensures main() only runs when the script is executed directly'
        ],
        keyParts: ['while True loop', 'function definitions', 'if __name__ == "__main__"'],
        checkpoint: 'You should have a working menu that displays options (functions can be empty for now)'
      },
      {
        id: 'step-2',
        title: 'Implement Add Todo Functionality',
        description: 'Allow users to add new todo items to their list',
        instructions: [
          'Create the add_todo function',
          'Get user input for the todo item',
          'Validate the input to ensure it\'s not empty',
          'Add the todo to the list with a status',
          'Show confirmation to the user'
        ],
        codeExample: `def add_todo(todos):
    """Add a new todo item to the list"""
    print("\\n--- Add New Todo ---")
    
    while True:
        todo_text = input("Enter your todo item: ").strip()
        
        if todo_text:  # Check if input is not empty
            # Create a todo dictionary with text and completion status
            todo_item = {
                'text': todo_text,
                'completed': False
            }
            todos.append(todo_item)
            print(f"✅ Added: '{todo_text}'")
            break
        else:
            print("Todo cannot be empty. Please try again.")

def view_todos(todos):
    """Display all todo items"""
    print("\\n--- Your Todo List ---")
    
    if not todos:  # Check if list is empty
        print("No todos yet. Add some tasks to get started!")
        return
    
    for i, todo in enumerate(todos, 1):
        status = "✅" if todo['completed'] else "⭕"
        print(f"{i}. {status} {todo['text']}")
    
    print(f"\\nTotal: {len(todos)} todos")`,
        explanation: 'We store each todo as a dictionary with text and completion status. This makes it easy to track what\'s done and what\'s pending.',
        hints: [
          'Use enumerate(todos, 1) to start numbering from 1',
          'Check for empty input to prevent adding blank todos',
          'Use emojis to make the interface more friendly'
        ],
        keyParts: ['dictionary structure', 'input validation', 'enumerate()'],
        checkpoint: 'Users should be able to add todos and see them displayed in a numbered list'
      },
      {
        id: 'step-3',
        title: 'Complete and Delete Functions',
        description: 'Add functionality to mark todos as complete and delete them',
        instructions: [
          'Implement the complete_todo function',
          'Allow users to select a todo by number',
          'Toggle the completion status',
          'Implement the delete_todo function',
          'Add proper error handling for invalid selections'
        ],
        codeExample: `def complete_todo(todos):
    """Mark a todo item as complete or incomplete"""
    if not todos:
        print("No todos to mark as complete!")
        return
    
    view_todos(todos)
    
    try:
        choice = int(input("Enter the number of the todo to toggle: "))
        if 1 <= choice <= len(todos):
            todo = todos[choice - 1]
            todo['completed'] = not todo['completed']
            status = "completed" if todo['completed'] else "pending"
            print(f"✅ Todo '{todo['text']}' marked as {status}")
        else:
            print("Invalid todo number!")
    except ValueError:
        print("Please enter a valid number!")

def delete_todo(todos):
    """Delete a todo item from the list"""
    if not todos:
        print("No todos to delete!")
        return
    
    view_todos(todos)
    
    try:
        choice = int(input("Enter the number of the todo to delete: "))
        if 1 <= choice <= len(todos):
            deleted_todo = todos.pop(choice - 1)
            print(f"🗑️ Deleted: '{deleted_todo['text']}'")
        else:
            print("Invalid todo number!")
    except ValueError:
        print("Please enter a valid number!")`,
        explanation: 'These functions handle user interaction for completing and deleting todos. We use try-except blocks to handle invalid input gracefully.',
        hints: [
          'Always validate user input before using it',
          'Use try-except to catch ValueError when converting to int',
          'Check if the list is empty before trying to modify it'
        ],
        keyParts: ['try-except blocks', 'list.pop()', 'input validation'],
        checkpoint: 'Users should be able to mark todos as complete/incomplete and delete them'
      }
    ],
    finalResult: {
      title: 'Complete Todo List Manager',
      description: 'A fully functional command-line todo application',
      features: [
        'Add, view, complete, and delete todos',
        'User-friendly command-line interface',
        'Input validation and error handling',
        'Clean, organized code structure'
      ]
    }
  },
  {
    id: 'calculator-javascript',
    title: 'Interactive Calculator',
    description: 'Build a working calculator with HTML, CSS, and JavaScript',
    difficulty: 'Beginner',
    language: 'JavaScript',
    estimatedTime: '2-3 hours',
    learningGoals: [
      'DOM manipulation with JavaScript',
      'Event handling and user interaction',
      'Mathematical operations and validation',
      'Creating responsive layouts'
    ],
    steps: [
      {
        id: 'step-1',
        title: 'HTML Structure',
        description: 'Create the calculator layout with buttons and display',
        instructions: [
          'Create the basic HTML structure',
          'Add a display area for calculations',
          'Create buttons for numbers 0-9',
          'Add operation buttons (+, -, *, /, =)',
          'Include clear and decimal point buttons'
        ],
        codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interactive Calculator</title>
    <link rel="stylesheet" href="calculator.css">
</head>
<body>
    <div class="calculator">
        <div class="display">
            <div id="previous-operand" class="previous-operand"></div>
            <div id="current-operand" class="current-operand">0</div>
        </div>
        
        <div class="buttons">
            <button class="btn btn-clear" onclick="clearAll()">AC</button>
            <button class="btn btn-delete" onclick="deleteLast()">DEL</button>
            <button class="btn btn-operator" onclick="appendOperator('/')">/</button>
            <button class="btn btn-operator" onclick="appendOperator('*')">×</button>
            
            <button class="btn btn-number" onclick="appendNumber('7')">7</button>
            <button class="btn btn-number" onclick="appendNumber('8')">8</button>
            <button class="btn btn-number" onclick="appendNumber('9')">9</button>
            <button class="btn btn-operator" onclick="appendOperator('-')">-</button>
            
            <button class="btn btn-number" onclick="appendNumber('4')">4</button>
            <button class="btn btn-number" onclick="appendNumber('5')">5</button>
            <button class="btn btn-number" onclick="appendNumber('6')">6</button>
            <button class="btn btn-operator" onclick="appendOperator('+')">+</button>
            
            <button class="btn btn-number" onclick="appendNumber('1')">1</button>
            <button class="btn btn-number" onclick="appendNumber('2')">2</button>
            <button class="btn btn-number" onclick="appendNumber('3')">3</button>
            <button class="btn btn-equals" onclick="calculate()" rowspan="2">=</button>
            
            <button class="btn btn-number btn-zero" onclick="appendNumber('0')">0</button>
            <button class="btn btn-number" onclick="appendNumber('.')">.</button>
        </div>
    </div>
    
    <script src="calculator.js"></script>
</body>
</html>`,
        explanation: 'This creates the calculator structure with a display area and button grid. We use onclick attributes for simplicity in this beginner project.',
        hints: [
          'Use semantic class names for styling',
          'Keep the button grid organized in rows',
          'The display has two parts: previous and current operands'
        ],
        keyParts: ['display structure', 'button grid', 'onclick handlers'],
        checkpoint: 'You should have a calculator layout with all buttons visible'
      },
      {
        id: 'step-2',
        title: 'JavaScript Functionality',
        description: 'Add the core calculator logic with JavaScript',
        instructions: [
          'Create variables to store the calculator state',
          'Implement the appendNumber function',
          'Add the appendOperator function',
          'Create the calculate function',
          'Add clear and delete functionality'
        ],
        codeExample: `// calculator.js
let currentOperand = '0';
let previousOperand = '';
let operator = null;

function updateDisplay() {
    document.getElementById('current-operand').textContent = currentOperand;
    if (operator) {
        document.getElementById('previous-operand').textContent = 
            \`\${previousOperand} \${operator}\`;
    } else {
        document.getElementById('previous-operand').textContent = '';
    }
}

function appendNumber(number) {
    if (number === '.' && currentOperand.includes('.')) return;
    
    if (currentOperand === '0') {
        currentOperand = number === '.' ? '0.' : number;
    } else {
        currentOperand += number;
    }
    
    updateDisplay();
}

function appendOperator(newOperator) {
    if (operator !== null) calculate();
    
    operator = newOperator;
    previousOperand = currentOperand;
    currentOperand = '0';
    updateDisplay();
}

function calculate() {
    if (operator === null || previousOperand === '') return;
    
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    
    let result;
    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert('Cannot divide by zero!');
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }
    
    currentOperand = result.toString();
    operator = null;
    previousOperand = '';
    updateDisplay();
}

function clearAll() {
    currentOperand = '0';
    previousOperand = '';
    operator = null;
    updateDisplay();
}

function deleteLast() {
    if (currentOperand.length > 1) {
        currentOperand = currentOperand.slice(0, -1);
    } else {
        currentOperand = '0';
    }
    updateDisplay();
}`,
        explanation: 'This implements the calculator logic. We track the current number, previous number, and operator, then perform calculations when needed.',
        hints: [
          'Use parseFloat() to convert strings to numbers',
          'Always check for division by zero',
          'Update the display after every change'
        ],
        keyParts: ['state variables', 'parseFloat()', 'switch statement'],
        checkpoint: 'Your calculator should perform basic arithmetic operations correctly'
      }
    ],
    finalResult: {
      title: 'Working Calculator',
      description: 'A fully functional calculator web application',
      features: [
        'Basic arithmetic operations',
        'Decimal number support',
        'Error handling for division by zero',
        'Clear and delete functionality',
        'Responsive design'
      ]
    }
  },
  {
    id: 'weather-app-api',
    title: 'Weather Dashboard',
    description: 'Create a weather app that fetches data from an API',
    difficulty: 'Intermediate',
    language: 'JavaScript',
    estimatedTime: '4-5 hours',
    learningGoals: [
      'Working with APIs and fetch requests',
      'Handling async/await operations',
      'Processing JSON data',
      'Dynamic DOM manipulation',
      'Error handling for network requests'
    ],
    steps: [
      {
        id: 'step-1',
        title: 'Setup and API Integration',
        description: 'Set up the project and integrate with a weather API',
        instructions: [
          'Create the HTML structure with search and display areas',
          'Sign up for a free weather API key (OpenWeatherMap)',
          'Create the basic JavaScript structure',
          'Implement the API fetch function',
          'Add error handling for failed requests'
        ],
        codeExample: `// weather.js
const API_KEY = 'your-api-key-here'; // Get from openweathermap.org
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

async function fetchWeatherData(city) {
    try {
        const response = await fetch(
            \`\${API_URL}?q=\${city}&appid=\${API_KEY}&units=metric\`
        );
        
        if (!response.ok) {
            throw new Error(\`Weather data not found for \${city}\`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather:', error);
        throw error;
    }
}

async function searchWeather() {
    const cityInput = document.getElementById('city-input');
    const city = cityInput.value.trim();
    
    if (!city) {
        alert('Please enter a city name');
        return;
    }
    
    const loadingDiv = document.getElementById('loading');
    const weatherDiv = document.getElementById('weather-display');
    
    try {
        loadingDiv.style.display = 'block';
        weatherDiv.style.display = 'none';
        
        const weatherData = await fetchWeatherData(city);
        displayWeather(weatherData);
        
    } catch (error) {
        alert('Error: ' + error.message);
    } finally {
        loadingDiv.style.display = 'none';
    }
}

function displayWeather(data) {
    const weatherDiv = document.getElementById('weather-display');
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    
    weatherDiv.innerHTML = \`
        <h2>\${data.name}, \${data.sys.country}</h2>
        <div class="temperature">\${temperature}°C</div>
        <div class="description">\${description.charAt(0).toUpperCase() + description.slice(1)}</div>
        <div class="details">
            <p>Humidity: \${humidity}%</p>
            <p>Wind Speed: \${windSpeed} m/s</p>
        </div>
    \`;
    
    weatherDiv.style.display = 'block';
}`,
        explanation: 'This code fetches weather data from an API using async/await. We handle errors gracefully and provide user feedback during loading.',
        hints: [
          'Always use try-catch with async/await',
          'Check if the response is ok before parsing JSON',
          'Provide loading indicators for better user experience'
        ],
        keyParts: ['async/await', 'fetch API', 'error handling'],
        checkpoint: 'Your app should successfully fetch and display weather data for any city'
      }
    ],
    finalResult: {
      title: 'Weather Dashboard',
      description: 'A responsive weather application with API integration',
      features: [
        'Real-time weather data from API',
        'Search functionality for any city',
        'Responsive design for all devices',
        'Error handling and loading states',
        'Clean, modern interface'
      ]
    }
  }
];

interface ProjectBasedLearningProps {
  selectedLanguage: string;
  onProgressUpdate: (projectId: string, stepIndex: number) => void;
}

export const ProjectBasedLearning: React.FC<ProjectBasedLearningProps> = ({
  selectedLanguage,
  onProgressUpdate
}) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const filteredProjects = PROJECTS.filter(project => 
    selectedLanguage === 'all' || project.language.toLowerCase().includes(selectedLanguage.toLowerCase())
  );

  const currentStep = selectedProject?.steps[currentStepIndex];
  const progress = selectedProject ? ((currentStepIndex + 1) / selectedProject.steps.length) * 100 : 0;

  const startProject = (project: Project) => {
    setSelectedProject(project);
    setCurrentStepIndex(0);
    setCompletedSteps([]);
  };

  const nextStep = () => {
    if (!selectedProject || !currentStep) return;
    
    if (currentStepIndex < selectedProject.steps.length - 1) {
      const newIndex = currentStepIndex + 1;
      setCurrentStepIndex(newIndex);
      onProgressUpdate(selectedProject.id, newIndex);
      
      // Mark current step as completed
      setCompletedSteps(prev => [...prev, currentStep.id]);
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500';
      case 'Intermediate': return 'bg-yellow-500';
      case 'Advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (selectedProject && currentStep) {
    return (
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button variant="ghost" onClick={() => setSelectedProject(null)}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div>
                <CardTitle className="text-lg">{selectedProject.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Step {currentStepIndex + 1} of {selectedProject.steps.length}: {currentStep.title}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Badge variant="outline">
                {Math.round(progress)}% Complete
              </Badge>
            </div>
          </div>
          
          <Progress value={progress} className="w-full" />
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Step Description */}
          <div>
            <h3 className="text-lg font-semibold mb-2">{currentStep.title}</h3>
            <p className="text-muted-foreground">{currentStep.description}</p>
          </div>
          
          <Tabs defaultValue="instructions" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="instructions">
                <Target className="h-4 w-4 mr-2" />
                Instructions
              </TabsTrigger>
              <TabsTrigger value="example">
                <Code2 className="h-4 w-4 mr-2" />
                Example
              </TabsTrigger>
              <TabsTrigger value="explanation">
                <BookOpen className="h-4 w-4 mr-2" />
                Explanation
              </TabsTrigger>
              <TabsTrigger value="hints">
                <Lightbulb className="h-4 w-4 mr-2" />
                Hints
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="instructions" className="space-y-3">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h5 className="font-medium mb-3">What you need to do:</h5>
                <ol className="list-decimal list-inside space-y-2">
                  {currentStep.instructions.map((instruction, index) => (
                    <li key={index} className="text-sm">{instruction}</li>
                  ))}
                </ol>
                
                <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded border-l-4 border-green-500">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-green-800 dark:text-green-300">Checkpoint:</span>
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-300">{currentStep.checkpoint}</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="example" className="space-y-3">
              <div className="bg-muted p-4 rounded-lg">
                <h5 className="font-medium mb-3">Code Example:</h5>
                <pre className="text-sm font-mono whitespace-pre-wrap overflow-x-auto">
                  {currentStep.codeExample}
                </pre>
              </div>
              
              {currentStep.keyParts && (
                <div className="mt-4">
                  <h5 className="font-medium mb-2">Key Parts to Focus On:</h5>
                  <div className="flex flex-wrap gap-2">
                    {currentStep.keyParts.map((part, index) => (
                      <Badge key={index} variant="secondary" className="font-mono text-xs">
                        {part}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="explanation" className="space-y-3">
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <p className="text-sm">{currentStep.explanation}</p>
              </div>
            </TabsContent>
            
            <TabsContent value="hints" className="space-y-3">
              {currentStep.hints && (
                <div className="space-y-2">
                  {currentStep.hints.map((hint, index) => (
                    <div key={index} className="flex items-start space-x-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <span className="text-yellow-600 mt-0.5">💡</span>
                      <p className="text-sm">{hint}</p>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
          
          {/* Navigation */}
          <div className="flex items-center justify-between pt-4 border-t">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStepIndex === 0}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            
            <span className="text-sm text-muted-foreground">
              {currentStepIndex + 1} / {selectedProject.steps.length}
            </span>
            
            <Button
              onClick={nextStep}
              disabled={currentStepIndex === selectedProject.steps.length - 1}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Play className="h-5 w-5 text-green-500" />
          <span>Project-Based Learning</span>
        </CardTitle>
        <p className="text-muted-foreground">
          Learn by building real projects step-by-step with detailed instructions and examples
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-semibold">{project.title}</h3>
                    <div className={`w-2 h-2 rounded-full ${getDifficultyColor(project.difficulty)}`}></div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                  
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-3">
                    <span>⏱️ {project.estimatedTime}</span>
                    <span>📝 {project.steps.length} steps</span>
                    <span>💻 {project.language}</span>
                    <Badge variant="outline" className="text-xs">
                      {project.difficulty}
                    </Badge>
                  </div>
                  
                  <div className="mb-3">
                    <h5 className="text-sm font-medium mb-2">You'll learn:</h5>
                    <div className="flex flex-wrap gap-1">
                      {project.learningGoals.map((goal, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {goal}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <Button onClick={() => startProject(project)} className="ml-4">
                  Start Project
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};