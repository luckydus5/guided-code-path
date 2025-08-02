/**
 * Learning Resources Component for Guided Code Path
 * 
 * This component provides curated learning resources based on the current project context.
 * It dynamically generates resources for different programming languages and technologies,
 * with special focus on Web Development Fundamentals learning path.
 * 
 * Features:
 * - Context-aware resource recommendations
 * - Filtering by type (video, article, documentation, tutorial, example)
 * - Difficulty-based filtering (beginner, intermediate, advanced)
 * - Search functionality across resource titles and descriptions
 * - Favorites system for bookmarking resources
 * - Responsive grid layout with detailed resource cards
 * - External link handling with proper security attributes
 * 
 * @version 1.0.0
 * @author Guided Code Path Team
 */

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  BookOpen, 
  Video, 
  ExternalLink, 
  FileText,
  Code,
  Lightbulb,
  Target,
  Search,
  Filter,
  Clock,
  Star,
  PlayCircle,
  CheckCircle2,
  ArrowRight
} from "lucide-react";

/**
 * Represents a learning resource with metadata
 * 
 * @interface Resource
 * @property {string} title - The display title of the resource
 * @property {'video' | 'article' | 'documentation' | 'tutorial' | 'example'} type - Type of learning resource
 * @property {string} url - External URL to the resource
 * @property {string} description - Brief description of what the resource covers
 * @property {string} [duration] - Optional estimated time to complete (e.g., "2 hours", "30 minutes")
 * @property {'beginner' | 'intermediate' | 'advanced'} difficulty - Skill level required
 * @property {string} [content] - Learning notes and key concepts covered in the resource
 * @property {string[]} [keyPoints] - Important takeaways and concepts to learn
 * @property {string[]} [prerequisites] - What you should know before starting this resource
 */
interface Resource {
  title: string;
  type: 'video' | 'article' | 'documentation' | 'tutorial' | 'example';
  url: string;
  description: string;
  duration?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  content?: string;
  keyPoints?: string[];
  prerequisites?: string[];
}

/**
 * Props for the LearningResources component
 * 
 * @interface LearningResourcesProps
 * @property {string} projectTitle - Current project title for context-specific recommendations
 * @property {string} language - Programming language or learning path (e.g., 'web-fundamentals', 'javascript', 'python')
 * @property {string} difficulty - Current project difficulty level
 * @property {string[]} technologies - Array of technologies used in the current project
 */
interface LearningResourcesProps {
  projectTitle: string;
  language: string;
  difficulty: string;
  technologies: string[];
}

/**
 * LearningResources Component
 * 
 * Renders a comprehensive learning resources panel that adapts to the current project context.
 * Provides curated educational content including videos, articles, documentation, tutorials,
 * and practical examples relevant to the user's current learning path.
 * 
 * The component features:
 * - Dynamic resource generation based on project language and technologies
 * - Multi-criteria filtering (type, difficulty level, search terms)
 * - Favorites management with local state
 * - Responsive tabbed interface for different resource types
 * - Comprehensive Web Development Fundamentals curriculum integration
 * 
 * @param {LearningResourcesProps} props - Component configuration
 * @param {string} props.projectTitle - Current project title for contextual recommendations
 * @param {string} props.language - Programming language or learning path identifier
 * @param {string} props.difficulty - Project difficulty level for appropriate resource filtering
 * @param {string[]} props.technologies - Technologies stack for targeted resource suggestions
 * 
 * @returns {JSX.Element} Rendered learning resources component with filtering and favorites
 * 
 * @example
 * ```tsx
 * <LearningResources
 *   projectTitle="Personal Portfolio Website"
 *   language="web-fundamentals"
 *   difficulty="beginner"
 *   technologies={["HTML", "CSS", "JavaScript"]}
 * />
 * ```
 */
export default function LearningResources({ 
  projectTitle, 
  language, 
  difficulty, 
  technologies 
}: LearningResourcesProps) {
  // Component state for filtering and user preferences
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  
  /**
   * Generates context-aware learning resources based on project parameters
   * 
   * This function creates a curated list of educational resources tailored to the
   * current project's language, difficulty, and technology stack. It includes
   * comprehensive coverage for Web Development Fundamentals and other programming
   * languages with appropriate difficulty progression.
   * 
   * @returns {Resource[]} Array of learning resources with metadata
   */
  // Generate resources based on project context
  const getResourcesForProject = (): Resource[] => {
    const resources: Resource[] = [];
    
    // ============================================================================
    // WEB DEVELOPMENT FUNDAMENTALS LEARNING RESOURCES
    // ============================================================================
    // GitHub-based tutorials, interactive learning, and video resources
    // Focused on practical learning through repositories and hands-on projects
    // Excludes documentation and articles - only tutorials, videos, and examples
    if (language === 'web-fundamentals') {
      
      // FOUNDATION RESOURCES - Interactive Tutorials & Videos
      // GitHub repositories, video courses, and hands-on learning platforms
      resources.push(
        {
          title: "freeCodeCamp Web Development",
          type: "tutorial",
          url: "https://www.freecodecamp.org/learn/responsive-web-design/",
          description: "Free interactive web development curriculum with hands-on projects and certifications",
          duration: "300 hours",
          difficulty: "beginner",
          content: `# freeCodeCamp Learning Notes

## Interactive Learning Experience
freeCodeCamp offers hands-on coding experience with immediate feedback. You'll build real projects while learning.

## Responsive Web Design Certification
1. **Basic HTML and HTML5** (5 hours)
   - Elements, attributes, forms
   - Semantic structure
   - Accessibility basics

2. **Basic CSS** (5 hours)
   - Selectors, properties, values
   - Box model fundamentals
   - Color and typography

3. **Applied Visual Design** (6 hours)
   - Layout techniques
   - Animations and transforms
   - Design principles

4. **Applied Accessibility** (4 hours)
   - Screen reader compatibility
   - Keyboard navigation
   - ARIA attributes

5. **Responsive Web Design Principles** (4 hours)
   - Mobile-first approach
   - Flexbox and Grid
   - Media queries

6. **CSS Flexbox & Grid** (6 hours)
   - Modern layout systems
   - Responsive patterns
   - Browser support

## Certification Projects
- Tribute Page
- Survey Form
- Product Landing Page
- Technical Documentation Page
- Personal Portfolio

## Learning Benefits
- 100% free with no ads
- Self-paced learning
- Real project portfolio
- Active community support
- Industry-recognized certificates`,
          keyPoints: [
            "Interactive coding challenges with immediate feedback",
            "5 real-world projects for your portfolio",
            "300+ coding challenges covering all fundamentals",
            "Free certification upon completion",
            "Active community support and forums"
          ],
          prerequisites: ["Basic computer skills", "Willingness to code daily"]
        },
        {
          title: "HTML & CSS Crash Course",
          type: "video",
          url: "https://www.youtube.com/watch?v=UB1O30fR-EE",
          description: "Comprehensive beginner-friendly video covering HTML and CSS fundamentals in depth",
          duration: "2 hours",
          difficulty: "beginner",
          content: `# HTML & CSS Crash Course Notes

## Video Course Overview
This comprehensive 2-hour video covers everything you need to start building websites from scratch.

## Part 1: HTML Fundamentals (45 minutes)
- **Document Structure**: DOCTYPE, html, head, body
- **Essential Elements**: headings, paragraphs, links, images
- **Semantic HTML**: header, nav, main, section, article, footer
- **Forms**: input types, validation, accessibility
- **Media**: images, videos, audio elements

## Part 2: CSS Styling (75 minutes)
- **CSS Basics**: selectors, properties, values
- **Box Model**: margin, border, padding, content
- **Layout**: display, position, float, flexbox
- **Responsive Design**: media queries, mobile-first
- **Modern CSS**: variables, animations, transforms

## Practical Project
You'll build a complete responsive website including:
- Professional header with navigation
- Hero section with call-to-action
- Feature sections with cards
- Contact form
- Responsive footer

## Key Concepts Explained
- How browsers render HTML/CSS
- Best practices for structure and naming
- Common layout patterns
- Mobile-first responsive design
- Performance considerations

## Follow-Along Tips
- Code along with the instructor
- Pause to experiment with variations
- Take notes on key concepts
- Practice the project multiple times
- Experiment with different designs`,
          keyPoints: [
            "Complete website built from scratch in 2 hours",
            "Visual explanations of complex concepts",
            "Modern CSS techniques and best practices",
            "Responsive design implementation",
            "Professional development workflow"
          ],
          prerequisites: ["Text editor installed", "Web browser", "Basic computer skills"]
        },
        {
          title: "Codecademy HTML & CSS Course",
          type: "tutorial",
          url: "https://www.codecademy.com/learn/learn-html",
          description: "Interactive HTML and CSS lessons with immediate feedback and practice exercises",
          duration: "20 hours",
          difficulty: "beginner",
          content: `# Codecademy HTML & CSS Learning Notes

## Interactive Learning Platform
Codecademy provides hands-on coding practice with instant feedback and guided exercises.

## HTML Course Structure (10 hours)
1. **Introduction to HTML**
   - Elements and tags
   - Document structure
   - Basic text formatting

2. **HTML Document Standards**
   - DOCTYPE declarations
   - Head section optimization
   - Meta tags and SEO

3. **Tables and Forms**
   - Data presentation
   - Form controls and validation
   - Accessibility considerations

4. **Semantic HTML**
   - Meaningful structure
   - Screen reader compatibility
   - SEO benefits

## CSS Course Structure (10 hours)
1. **CSS Setup and Syntax**
   - Selectors and properties
   - Inline, internal, external styles
   - CSS specificity rules

2. **Visual Styling**
   - Colors, fonts, backgrounds
   - Text and box styling
   - Visual hierarchy

3. **Box Model and Layout**
   - Margin, padding, border
   - Display properties
   - Positioning techniques

4. **Responsive Design**
   - Media queries
   - Flexible layouts
   - Mobile-first approach

## Practice Projects
- Personal portfolio page
- Restaurant menu layout
- Blog article styling
- Responsive navigation

## Learning Benefits
- Immediate code execution
- Step-by-step guidance
- Real-time error feedback
- Progress tracking
- Certificate of completion`,
          keyPoints: [
            "Interactive coding environment with instant feedback",
            "Structured curriculum with clear progression",
            "Real-world projects and exercises",
            "Progress tracking and achievements",
            "Mobile-friendly learning platform"
          ],
          prerequisites: ["Web browser", "Basic typing skills", "Codecademy account (free)"]
        },
        {
          title: "W3Schools Web Development Tutorial",
          type: "tutorial",
          url: "https://www.w3schools.com/html/",
          description: "Step-by-step web development tutorials with live examples and try-it-yourself editors",
          difficulty: "beginner",
          content: `# W3Schools Learning Notes

## Comprehensive Reference and Tutorials
W3Schools provides extensive tutorials with live examples you can edit and test immediately.

## HTML Tutorial Sections
1. **HTML Basics**
   - Elements, attributes, headings
   - Paragraphs, links, images
   - Lists and tables

2. **HTML Forms**
   - Input types and attributes
   - Form validation
   - Accessibility features

3. **HTML5 Features**
   - Semantic elements
   - Audio and video
   - Canvas and SVG

4. **HTML Graphics**
   - Canvas API basics
   - SVG graphics
   - Responsive images

## CSS Tutorial Sections
1. **CSS Fundamentals**
   - Selectors and properties
   - Colors and backgrounds
   - Text and fonts

2. **CSS Layout**
   - Box model
   - Flexbox and Grid
   - Responsive design

3. **CSS Advanced**
   - Animations and transitions
   - Transforms
   - Variables and functions

## Interactive Features
- "Try it Yourself" editors
- Live code examples
- Instant preview
- Color picker tools
- Reference guides

## Learning Approach
- Start with basics
- Progress to advanced topics
- Practice with examples
- Use as reference guide
- Test code variations

## Best Use Cases
- Quick reference lookup
- Concept reinforcement
- Code experimentation
- Syntax verification
- Property exploration`,
          keyPoints: [
            "Extensive reference material for HTML and CSS",
            "Interactive 'Try it Yourself' code editors",
            "Live examples for every concept",
            "Beginner-friendly explanations",
            "Comprehensive coverage of web standards"
          ],
          prerequisites: ["Web browser", "Basic computer literacy"]
        },
        
        // JAVASCRIPT FUNDAMENTALS
        // Progressive JavaScript learning from basics to modern ES6+ features
        {
          title: "JavaScript.info - Modern Tutorial",
          type: "tutorial",
          url: "https://javascript.info/",
          description: "Comprehensive modern JavaScript tutorial covering ES6+, async programming, and advanced concepts",
          difficulty: "beginner",
          content: `# JavaScript.info Learning Notes

## The Modern JavaScript Tutorial
This is one of the most comprehensive and up-to-date JavaScript resources available, covering everything from basics to advanced concepts.

## Part 1: The JavaScript Language
1. **An Introduction**
   - What is JavaScript?
   - Code editors and developer tools
   - JavaScript engines and runtime

2. **JavaScript Fundamentals** (20 lessons)
   - Variables and constants
   - Data types (numbers, strings, booleans)
   - Operators and comparisons
   - Conditional statements
   - Loops and iterations
   - Functions and scope

3. **Code Quality**
   - Debugging in browser
   - Coding style and best practices
   - Comments and documentation
   - Testing with automated tests

4. **Objects: The Basics**
   - Object syntax and properties
   - Object references and copying
   - Garbage collection
   - Object methods and 'this'
   - Constructor functions

5. **Data Types**
   - Primitive methods
   - Numbers and strings
   - Arrays and array methods
   - Maps and Sets
   - WeakMap and WeakSet

6. **Advanced Working with Functions**
   - Function binding
   - Arrow functions
   - Call, apply, bind
   - Decorators and forwarding

7. **Objects, Classes and Inheritance**
   - Prototypal inheritance
   - Class syntax
   - Mixins and composition

## Part 2: Browser: Document, Events, Interfaces
1. **Document Object Model (DOM)**
   - DOM tree structure
   - Searching and modifying elements
   - Element properties and attributes

2. **Events**
   - Event handling
   - Bubbling and capturing
   - Event delegation
   - Custom events

3. **Forms and Controls**
   - Form validation
   - Input events
   - File handling

## Part 3: Additional Articles
- Network requests (fetch, XMLHttpRequest)
- Animation and graphics
- Web components
- Error handling

## Learning Approach
- Read theory first
- Practice with provided examples
- Complete tasks at the end of each chapter
- Build small projects using learned concepts
- Reference back as needed

## Why This Resource is Excellent
- Modern ES6+ syntax throughout
- Detailed explanations with examples
- Interactive tasks and solutions
- Regular updates with latest features
- Free and comprehensive`,
          keyPoints: [
            "Covers modern JavaScript (ES6+) from basics to advanced",
            "Interactive examples and practice tasks",
            "Clear explanations of complex concepts",
            "Comprehensive coverage of DOM and browser APIs",
            "Regularly updated with latest JavaScript features"
          ],
          prerequisites: ["Basic programming concepts", "HTML/CSS basics", "Text editor"]
        },
        {
          title: "JavaScript30 - 30 Day Challenge",
          type: "tutorial",
          url: "https://javascript30.com/",
          description: "Build 30 real-world projects in 30 days using vanilla JavaScript - no frameworks, no libraries",
          duration: "30 days",
          difficulty: "intermediate",
          content: `# JavaScript30 Learning Notes

## 30 Days, 30 Projects, Pure JavaScript
Created by Wes Bos, this free course teaches JavaScript through building 30 real-world projects without using any frameworks or libraries.

## Course Philosophy
- No frameworks, just vanilla JavaScript
- Focus on fundamentals and core concepts
- Learn by building, not just watching
- Short videos (10-30 minutes each)
- Real-world applicable projects

## Sample Projects Include:
1. **JavaScript Drum Kit**
   - Event listeners
   - Playing audio
   - CSS transforms
   - Data attributes

2. **JS + CSS Clock**
   - Date object manipulation
   - CSS transforms
   - Real-time updates
   - Smooth animations

3. **CSS Variables + JS**
   - CSS custom properties
   - Range inputs
   - Real-time updates
   - Color manipulation

4. **Array Cardio**
   - Array methods mastery
   - Filter, map, reduce
   - Sort and find
   - Data manipulation

5. **Flex Panel Gallery**
   - CSS Flexbox
   - Event delegation
   - CSS transitions
   - Toggle classes

6. **Type Ahead**
   - Fetch API
   - Regular expressions
   - Array filtering
   - Dynamic content

7. **HTML5 Canvas**
   - Canvas API
   - Mouse events
   - Drawing and painting
   - Color manipulation

## Key Learning Areas
- **DOM Manipulation**: querySelector, event listeners, classList
- **ES6 Features**: arrow functions, destructuring, template literals
- **APIs**: Fetch, Geolocation, Speech Recognition, Camera
- **CSS Integration**: Variables, transforms, animations
- **Data Handling**: JSON, localStorage, array methods
- **Modern JavaScript**: modules, promises, async/await

## Daily Workflow
1. Watch the project video
2. Code along with the instructor
3. Experiment with variations
4. Add your own features
5. Share your version online

## Skills You'll Gain
- Vanilla JavaScript mastery
- Problem-solving approach
- Code debugging skills
- Project-based thinking
- Real-world development practices

## Community Aspect
- Share your solutions on social media
- Connect with other learners
- Get feedback on your code
- Build a portfolio of projects`,
          keyPoints: [
            "30 real-world projects using pure JavaScript",
            "No frameworks or libraries - focus on fundamentals",
            "Short, focused videos perfect for daily learning",
            "Covers modern ES6+ JavaScript features",
            "Strong community of learners sharing solutions"
          ],
          prerequisites: ["Basic JavaScript knowledge", "HTML/CSS understanding", "Text editor and browser"]
        },
        
        // INTERACTIVE CSS LEARNING
        // Gamified learning for complex CSS concepts like Flexbox and Grid
        {
          title: "Flexbox Froggy Game",
          type: "tutorial",
          url: "https://flexboxfroggy.com/",
          description: "Master CSS Flexbox layout through fun, interactive gameplay with step-by-step challenges",
          duration: "1 hour",
          difficulty: "beginner",
          content: `# Flexbox Froggy Learning Notes

## Interactive CSS Flexbox Game
Learn CSS Flexbox through a fun game where you help Froggy and friends reach their lily pads using flexbox properties.

## Game Progression (24 Levels)
### Levels 1-6: Basic Alignment
- **justify-content**: Controls horizontal alignment
  - flex-start (default): items at start
  - flex-end: items at end
  - center: items in center
  - space-between: equal space between items
  - space-around: equal space around items

### Levels 7-12: Cross-Axis Alignment
- **align-items**: Controls vertical alignment
  - flex-start: items at top
  - flex-end: items at bottom
  - center: items in middle
  - baseline: items aligned to text baseline
  - stretch: items stretch to fill container

### Levels 13-18: Direction and Wrap
- **flex-direction**: Changes main axis
  - row (default): left to right
  - row-reverse: right to left
  - column: top to bottom
  - column-reverse: bottom to top

- **flex-wrap**: Controls wrapping
  - nowrap (default): all items on one line
  - wrap: items wrap to new lines
  - wrap-reverse: items wrap in reverse order

### Levels 19-24: Advanced Properties
- **flex-flow**: Shorthand for direction + wrap
- **align-content**: Aligns wrapped lines
- **align-self**: Aligns individual items

## Key Flexbox Concepts Learned
1. **Main Axis vs Cross Axis**
   - Main axis determined by flex-direction
   - Cross axis perpendicular to main axis

2. **Container vs Item Properties**
   - Container: justify-content, align-items, flex-direction
   - Items: align-self, flex-grow, flex-shrink

3. **Common Layout Patterns**
   - Centering content
   - Equal height columns
   - Space distribution
   - Responsive navigation

## Practical Applications
- Navigation bars
- Card layouts
- Form controls
- Media objects
- Responsive grids

## Learning Tips
- Complete all 24 levels
- Experiment with different values
- Practice the concepts in real projects
- Use browser dev tools to visualize
- Reference back when building layouts`,
          keyPoints: [
            "24 interactive levels teaching Flexbox fundamentals",
            "Visual feedback helps understand layout behavior",
            "Covers all major Flexbox properties and values",
            "Fun, game-like approach to learning CSS",
            "Perfect introduction to modern CSS layouts"
          ],
          prerequisites: ["Basic CSS knowledge", "Understanding of HTML structure"]
        },
        {
          title: "Grid Garden Game",
          type: "tutorial",
          url: "https://cssgridgarden.com/",
          description: "Learn CSS Grid layout system through interactive gardening-themed coding challenges",
          duration: "1 hour",
          difficulty: "beginner",
          content: `# Grid Garden Learning Notes

## Interactive CSS Grid Game
Learn CSS Grid by watering your garden! Write CSS code to grow your carrot garden using grid properties.

## Game Progression (28 Levels)
### Levels 1-7: Basic Grid Positioning
- **grid-column-start**: Start position on column axis
- **grid-column-end**: End position on column axis
- **grid-column**: Shorthand for start/end
- **grid-row**: Same concept for rows

### Levels 8-14: Spanning and Shortcuts
- **Spanning**: Use span keyword for relative positioning
  - grid-column: 2 / span 3 (start at 2, span 3 columns)
- **Negative values**: Count from the end
  - grid-column: 1 / -1 (full width)

### Levels 15-21: Grid Areas and Lines
- **grid-area**: Position in all directions
  - grid-area: row-start / col-start / row-end / col-end
- **Named lines**: Use custom line names
- **Grid template areas**: Named regions

### Levels 22-28: Advanced Grid Features
- **grid-template-columns**: Define column sizes
  - Fixed: 100px 200px 100px
  - Flexible: 1fr 2fr 1fr
  - Repeat: repeat(3, 1fr)
- **grid-template-rows**: Define row sizes
- **fr unit**: Fraction of available space

## Key Grid Concepts Learned
1. **Grid Container vs Grid Items**
   - Container defines the grid
   - Items are placed within the grid

2. **Grid Lines vs Grid Tracks**
   - Lines are the boundaries
   - Tracks are the spaces between lines

3. **Explicit vs Implicit Grid**
   - Explicit: defined with template properties
   - Implicit: auto-generated for overflow

4. **Grid Areas**
   - Named regions for easier placement
   - Semantic layout descriptions

## Grid vs Flexbox
- **Grid**: Two-dimensional layouts (rows AND columns)
- **Flexbox**: One-dimensional layouts (row OR column)
- **Use together**: Grid for page layout, Flexbox for components

## Practical Applications
- Page layouts (header, sidebar, main, footer)
- Photo galleries
- Card grids
- Magazine-style layouts
- Dashboard interfaces

## Modern CSS Grid Features
- **Subgrid**: Inherit parent grid (coming soon)
- **Container queries**: Responsive to container size
- **Gap properties**: Space between items
- **Auto-fit/Auto-fill**: Responsive columns

## Learning Path After Grid Garden
1. Practice with real layouts
2. Combine with Flexbox
3. Learn CSS Grid Level 2 features
4. Explore grid-based design systems`,
          keyPoints: [
            "28 levels covering all essential CSS Grid concepts",
            "Interactive visual feedback for immediate learning",
            "Progressive difficulty from basic to advanced",
            "Covers modern grid features and best practices",
            "Perfect complement to Flexbox learning"
          ],
          prerequisites: ["Basic CSS knowledge", "HTML structure understanding", "Flexbox basics recommended"]
        },
        
        // ========================================================================
        // GITHUB REPOSITORIES & HANDS-ON PROJECTS  
        // ========================================================================
        // Interactive tutorials and practical projects from GitHub
        // Focus on building real applications and following along with code
        
        {
          title: "30 Days of JavaScript",
          type: "tutorial",
          url: "https://github.com/Asabeneh/30-Days-Of-JavaScript",
          description: "30 days step by step guide to learn JavaScript programming language with challenges",
          duration: "30 days",
          difficulty: "beginner"
        },
        {
          title: "30 Days of HTML & CSS",
          type: "tutorial", 
          url: "https://github.com/Asabeneh/30-Days-Of-HTML",
          description: "30 days of HTML and CSS step by step challenges and projects",
          duration: "30 days",
          difficulty: "beginner"
        },
        {
          title: "JavaScript Algorithms and Data Structures",
          type: "tutorial",
          url: "https://github.com/trekhleb/javascript-algorithms",
          description: "Algorithms and data structures implemented in JavaScript with explanations",
          difficulty: "intermediate"
        },
        {
          title: "Web Development for Beginners",
          type: "tutorial",
          url: "https://github.com/microsoft/Web-Dev-For-Beginners",
          description: "24-lesson curriculum all about JavaScript, CSS, and HTML basics",
          duration: "12 weeks",
          difficulty: "beginner"
        },
        {
          title: "Vanilla JavaScript Projects",
          type: "tutorial",
          url: "https://github.com/bradtraversy/vanillawebprojects",
          description: "Mini projects built with HTML5, CSS & JavaScript. No frameworks or libraries",
          difficulty: "beginner"
        },
        {
          title: "50 Projects in 50 Days",
          type: "example",
          url: "https://github.com/bradtraversy/50projects50days",
          description: "50 mini web projects using HTML, CSS & JS",
          duration: "50 days",
          difficulty: "beginner"
        },
        {
          title: "Frontend Project Ideas",
          type: "example", 
          url: "https://github.com/florinpop17/app-ideas",
          description: "Collection of application ideas for improving coding skills",
          difficulty: "beginner"
        },
        {
          title: "JavaScript Learning Resources",
          type: "tutorial",
          url: "https://github.com/micromata/awesome-javascript-learning",
          description: "Curated list of JavaScript learning resources and projects",
          difficulty: "beginner"
        },
        {
          title: "HTML5 Boilerplate",
          type: "example",
          url: "https://github.com/h5bp/html5-boilerplate", 
          description: "Professional front-end template and build system",
          difficulty: "intermediate"
        },
        {
          title: "Developer Portfolio Template",
          type: "example",
          url: "https://github.com/saadpasta/developerFolio",
          description: "Clean and beautiful portfolio template for developers",
          difficulty: "intermediate"
        }
      );
    }
    
    // Language-specific resources
    if (language === 'python') {
      resources.push(
        {
          title: "Python Official Tutorial",
          type: "documentation",
          url: "https://docs.python.org/3/tutorial/",
          description: "Complete Python tutorial from the official documentation",
          difficulty: "beginner"
        },
        {
          title: "Python for Everybody (Coursera)",
          type: "video",
          url: "https://www.coursera.org/specializations/python",
          description: "Comprehensive Python course series",
          duration: "8 weeks",
          difficulty: "beginner"
        },
        {
          title: "Real Python Tutorials",
          type: "tutorial",
          url: "https://realpython.com/",
          description: "High-quality Python tutorials and articles",
          difficulty: "intermediate"
        },
        {
          title: "Python Package Index (PyPI)",
          type: "documentation",
          url: "https://pypi.org/",
          description: "Find and install Python packages",
          difficulty: "intermediate"
        },
        {
          title: "Automate the Boring Stuff",
          type: "tutorial",
          url: "https://automatetheboringstuff.com/",
          description: "Practical Python programming for total beginners",
          difficulty: "beginner"
        }
      );
    }
    
    if (language === 'javascript') {
      resources.push(
        {
          title: "JavaScript MDN Guide",
          type: "documentation",
          url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
          description: "Complete JavaScript guide from Mozilla",
          difficulty: "beginner"
        },
        {
          title: "You Don't Know JS (Book Series)",
          type: "article",
          url: "https://github.com/getify/You-Dont-Know-JS",
          description: "Deep dive into JavaScript core concepts",
          difficulty: "advanced"
        },
        {
          title: "JavaScript30",
          type: "tutorial",
          url: "https://javascript30.com/",
          description: "30 projects in 30 days with vanilla JavaScript",
          duration: "30 days",
          difficulty: "intermediate"
        },
        {
          title: "Node.js Official Docs",
          type: "documentation",
          url: "https://nodejs.org/en/docs/",
          description: "Learn server-side JavaScript with Node.js",
          difficulty: "intermediate"
        }
      );
    }
    
    if (language === 'react') {
      resources.push(
        {
          title: "React Official Documentation",
          type: "documentation",
          url: "https://react.dev/",
          description: "Official React docs with interactive examples",
          difficulty: "intermediate"
        },
        {
          title: "React Tutorial for Beginners",
          type: "video",
          url: "https://www.youtube.com/watch?v=SqcY0GlETPk",
          description: "Complete React course from scratch",
          duration: "3 hours",
          difficulty: "beginner"
        },
        {
          title: "Thinking in React",
          type: "article",
          url: "https://react.dev/learn/thinking-in-react",
          description: "Learn the React mindset and component design",
          difficulty: "intermediate"
        }
      );
    }
    
    if (technologies.includes('HTML')) {
      resources.push(
        {
          title: "HTML5 Forms Tutorial",
          type: "tutorial",
          url: "https://developer.mozilla.org/en-US/docs/Learn/Forms",
          description: "Master HTML forms and validation",
          difficulty: "intermediate"
        }
      );
    }
    
    if (technologies.includes('CSS')) {
      resources.push(
        {
          title: "Flexbox Froggy",
          type: "tutorial",
          url: "https://flexboxfroggy.com/",
          description: "Interactive game to learn CSS Flexbox",
          difficulty: "beginner"
        },
        {
          title: "CSS Grid Garden",
          type: "tutorial",
          url: "https://cssgridgarden.com/",
          description: "Interactive game to learn CSS Grid",
          difficulty: "beginner"
        },
        {
          title: "CSS Animation Tutorial",
          type: "tutorial",
          url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations",
          description: "Create smooth animations with CSS",
          difficulty: "intermediate"
        },
        {
          title: "Responsive Web Design",
          type: "tutorial",
          url: "https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design",
          description: "Build websites that work on all devices",
          difficulty: "intermediate"
        }
      );
    }
    
    if (technologies.includes('JavaScript')) {
      resources.push(
        {
          title: "JavaScript.info Complete Tutorial",
          type: "tutorial",
          url: "https://javascript.info/",
          description: "Modern JavaScript tutorial from basics to advanced",
          difficulty: "beginner"
        },
        {
          title: "Async/Await Tutorial",
          type: "tutorial",
          url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await",
          description: "Master asynchronous JavaScript programming",
          difficulty: "intermediate"
        },
        {
          title: "DOM Manipulation Guide",
          type: "tutorial",
          url: "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction",
          description: "Interact with web pages using JavaScript",
          difficulty: "intermediate"
        }
      );
    }
    
    // Project-specific resources based on title keywords
    if (projectTitle.toLowerCase().includes('landing') || projectTitle.toLowerCase().includes('homepage')) {
      resources.push(
        {
          title: "CSS Hero Sections Tutorial",
          type: "tutorial",
          url: "https://www.youtube.com/watch?v=9YffrCViTVk",
          description: "Create stunning hero sections with CSS",
          duration: "45 min",
          difficulty: "intermediate"
        },
        {
          title: "Form Validation with JavaScript",
          type: "tutorial",
          url: "https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation",
          description: "Client-side form validation techniques",
          difficulty: "intermediate"
        }
      );
    }
    
    if (projectTitle.toLowerCase().includes('calculator')) {
      resources.push(
        {
          title: "Building a Calculator with JavaScript",
          type: "tutorial",
          url: "https://www.freecodecamp.org/news/how-to-build-an-html-calculator-app-from-scratch-using-javascript-4454b8714b98/",
          description: "Step-by-step guide to building a functional calculator",
          duration: "2 hours",
          difficulty: "intermediate"
        },
        {
          title: "Math Object in JavaScript",
          type: "documentation",
          url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math",
          description: "Master JavaScript mathematical operations",
          difficulty: "beginner"
        },
        {
          title: "Regular Expressions for Input Validation",
          type: "tutorial",
          url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions",
          description: "Validate calculator input with regex",
          difficulty: "advanced"
        }
      );
    }
    
    if (projectTitle.toLowerCase().includes('todo') || projectTitle.toLowerCase().includes('task')) {
      resources.push(
        {
          title: "Todo App with Local Storage",
          type: "tutorial",
          url: "https://www.youtube.com/watch?v=Ttf3CEsEwMQ",
          description: "Build a todo app that saves data locally",
          duration: "45 min",
          difficulty: "intermediate"
        },
        {
          title: "Local Storage vs Session Storage",
          type: "article",
          url: "https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API",
          description: "Understanding browser storage options",
          difficulty: "intermediate"
        },
        {
          title: "Array Methods for Todo Apps",
          type: "tutorial",
          url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array",
          description: "Filter, map, and reduce for task management",
          difficulty: "intermediate"
        },
        {
          title: "CSS Transitions for Todo Interactions",
          type: "tutorial",
          url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions",
          description: "Smooth animations for todo operations",
          difficulty: "intermediate"
        }
      );
    }
    
    if (projectTitle.toLowerCase().includes('portfolio')) {
      resources.push(
        {
          title: "Portfolio Design Inspiration",
          type: "article",
          url: "https://dribbble.com/tags/portfolio",
          description: "Creative portfolio designs for inspiration",
          difficulty: "beginner"
        },
        {
          title: "Intersection Observer API",
          type: "tutorial",
          url: "https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API",
          description: "Create scroll-triggered animations",
          difficulty: "advanced"
        },
        {
          title: "CSS Grid for Portfolio Layouts",
          type: "tutorial",
          url: "https://css-tricks.com/snippets/css/complete-guide-grid/",
          description: "Master grid layouts for portfolio sites",
          difficulty: "intermediate"
        },
        {
          title: "Performance Optimization for Portfolios",
          type: "article",
          url: "https://web.dev/performance/",
          description: "Make your portfolio fast and responsive",
          difficulty: "advanced"
        }
      );
    }
    
    if (projectTitle.toLowerCase().includes('weather')) {
      resources.push(
        {
          title: "Working with APIs in JavaScript",
          type: "tutorial",
          url: "https://www.freecodecamp.org/news/how-to-use-fetch-api/",
          description: "Learn to fetch data from external APIs",
          duration: "1 hour",
          difficulty: "intermediate"
        },
        {
          title: "OpenWeatherMap API Documentation",
          type: "documentation",
          url: "https://openweathermap.org/api",
          description: "Free weather API for your projects",
          difficulty: "intermediate"
        },
        {
          title: "Async/Await with Fetch API",
          type: "tutorial",
          url: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
          description: "Modern asynchronous JavaScript patterns",
          difficulty: "intermediate"
        },
        {
          title: "Chart.js for Data Visualization",
          type: "tutorial",
          url: "https://www.chartjs.org/docs/latest/getting-started/",
          description: "Create beautiful charts for weather data",
          difficulty: "intermediate"
        }
      );
    }
    
    if (projectTitle.toLowerCase().includes('e-commerce') || projectTitle.toLowerCase().includes('shop')) {
      resources.push(
        {
          title: "E-commerce UX Best Practices",
          type: "article",
          url: "https://baymard.com/blog",
          description: "Research-based e-commerce design principles",
          difficulty: "intermediate"
        },
        {
          title: "Shopping Cart Implementation",
          type: "tutorial",
          url: "https://www.youtube.com/watch?v=B20Getj_Zk4",
          description: "Build a functional shopping cart with JavaScript",
          duration: "2 hours",
          difficulty: "intermediate"
        },
        {
          title: "Payment Integration Basics",
          type: "documentation",
          url: "https://stripe.com/docs",
          description: "Integrate payment processing (Stripe)",
          difficulty: "advanced"
        },
        {
          title: "Product Image Gallery",
          type: "tutorial",
          url: "https://css-tricks.com/can-get-pretty-far-making-slider-just-html-css/",
          description: "Create interactive product image galleries",
          difficulty: "intermediate"
        }
      );
    }
    
    if (projectTitle.toLowerCase().includes('music') || projectTitle.toLowerCase().includes('player')) {
      resources.push(
        {
          title: "HTML5 Audio API",
          type: "documentation",
          url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement",
          description: "Control audio playback with JavaScript",
          difficulty: "intermediate"
        },
        {
          title: "Web Audio API Tutorial",
          type: "tutorial",
          url: "https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API",
          description: "Advanced audio processing and visualization",
          difficulty: "advanced"
        },
        {
          title: "Custom Audio Player Design",
          type: "tutorial",
          url: "https://css-tricks.com/making-an-audio-waveform-visualizer-with-vanilla-javascript/",
          description: "Create custom audio player interfaces",
          duration: "1 hour",
          difficulty: "intermediate"
        }
      );
    }
    
    if (projectTitle.toLowerCase().includes('quiz') || projectTitle.toLowerCase().includes('game')) {
      resources.push(
        {
          title: "JavaScript Game Development Basics",
          type: "tutorial",
          url: "https://developer.mozilla.org/en-US/docs/Games/Introduction",
          description: "Introduction to game development with JavaScript",
          difficulty: "intermediate"
        },
        {
          title: "Quiz App Tutorial",
          type: "video",
          url: "https://www.youtube.com/watch?v=riDzcEQbX6k",
          description: "Build a complete quiz application",
          duration: "1.5 hours",
          difficulty: "intermediate"
        },
        {
          title: "Canvas API for Games",
          type: "tutorial",
          url: "https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial",
          description: "Create graphics and animations with Canvas",
          difficulty: "advanced"
        },
        {
          title: "Game State Management",
          type: "article",
          url: "https://gameprogrammingpatterns.com/state.html",
          description: "Manage game states and transitions",
          difficulty: "advanced"
        }
      );
    }
    
    if (projectTitle.toLowerCase().includes('restaurant') || projectTitle.toLowerCase().includes('menu')) {
      resources.push(
        {
          title: "Restaurant Website Design",
          type: "article",
          url: "https://www.webdesignerdepot.com/2019/07/restaurant-website-design-best-practices/",
          description: "Best practices for restaurant websites",
          difficulty: "beginner"
        },
        {
          title: "Dynamic Menu Display",
          type: "tutorial",
          url: "https://www.youtube.com/watch?v=3PHXvlpOkf4",
          description: "Create dynamic, filterable menus",
          duration: "1 hour",
          difficulty: "intermediate"
        },
        {
          title: "Online Ordering System",
          type: "tutorial",
          url: "https://www.freecodecamp.org/news/learn-crud-operations-in-javascript-by-building-todo-app/",
          description: "Build ordering functionality with CRUD operations",
          difficulty: "intermediate"
        }
      );
    }
    
    if (projectTitle.toLowerCase().includes('photo') || projectTitle.toLowerCase().includes('gallery')) {
      resources.push(
        {
          title: "Image Lazy Loading",
          type: "tutorial",
          url: "https://developer.mozilla.org/en-US/docs/Web/Performance/Lazy_loading",
          description: "Optimize image loading for better performance",
          difficulty: "intermediate"
        },
        {
          title: "CSS Grid Image Gallery",
          type: "tutorial",
          url: "https://css-tricks.com/look-ma-no-media-queries-responsive-layouts-using-css-grid/",
          description: "Create responsive image galleries with CSS Grid",
          difficulty: "intermediate"
        },
        {
          title: "Lightbox Implementation",
          type: "tutorial",
          url: "https://www.w3schools.com/howto/howto_js_lightbox.asp",
          description: "Build a custom lightbox for image viewing",
          difficulty: "intermediate"
        },
        {
          title: "File Upload with Drag & Drop",
          type: "tutorial",
          url: "https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API",
          description: "Implement drag and drop file uploads",
          difficulty: "advanced"
        }
      );
    }
    
    if (projectTitle.toLowerCase().includes('calendar') || projectTitle.toLowerCase().includes('event')) {
      resources.push(
        {
          title: "JavaScript Date Object",
          type: "documentation",
          url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date",
          description: "Master date manipulation in JavaScript",
          difficulty: "intermediate"
        },
        {
          title: "Calendar Component Tutorial",
          type: "tutorial",
          url: "https://www.youtube.com/watch?v=o1yMqPyYeAo",
          description: "Build a calendar from scratch",
          duration: "2 hours",
          difficulty: "intermediate"
        },
        {
          title: "Event Management Systems",
          type: "article",
          url: "https://en.wikipedia.org/wiki/Event-driven_programming",
          description: "Understanding event-driven programming",
          difficulty: "advanced"
        }
      );
    }
    
    if (projectTitle.toLowerCase().includes('expense') || projectTitle.toLowerCase().includes('budget')) {
      resources.push(
        {
          title: "Chart.js Data Visualization",
          type: "tutorial",
          url: "https://www.chartjs.org/docs/latest/getting-started/",
          description: "Create charts for expense tracking",
          difficulty: "intermediate"
        },
        {
          title: "Local Storage for Data Persistence",
          type: "tutorial",
          url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage",
          description: "Save expense data in the browser",
          difficulty: "intermediate"
        },
        {
          title: "JavaScript Number Formatting",
          type: "article",
          url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat",
          description: "Format currency and numbers properly",
          difficulty: "intermediate"
        }
      );
    }
    
    if (projectTitle.toLowerCase().includes('learning') || projectTitle.toLowerCase().includes('course')) {
      resources.push(
        {
          title: "E-learning Platform Design",
          type: "article",
          url: "https://elearningindustry.com/elearning-design-principles",
          description: "Principles of effective online learning",
          difficulty: "intermediate"
        },
        {
          title: "Progress Tracking Systems",
          type: "tutorial",
          url: "https://www.youtube.com/watch?v=6BozpmSjk-Y",
          description: "Implement learning progress tracking",
          duration: "1 hour",
          difficulty: "intermediate"
        },
        {
          title: "Code Editor Integration",
          type: "tutorial",
          url: "https://microsoft.github.io/monaco-editor/",
          description: "Embed Monaco Editor in web applications",
          difficulty: "advanced"
        }
      );
    }
    
    // Filter to only allow GitHub-based resources for web-fundamentals projects
    if (language === 'web-fundamentals') {
      return resources.filter(resource => 
        (resource.type === 'tutorial' || 
         resource.type === 'video' || 
         resource.type === 'example') &&
        resource.url.includes('github.com')
      );
    }
    
    return resources;
  };

  const resources = getResourcesForProject();
  
  /**
   * Toggles a resource's favorite status in local component state
   * 
   * @param {string} resourceTitle - Title of the resource to toggle
   */
  const toggleFavorite = (resourceTitle: string) => {
    setFavorites(prev => 
      prev.includes(resourceTitle) 
        ? prev.filter(fav => fav !== resourceTitle)
        : [...prev, resourceTitle]
    );
  };
  
  /**
   * Returns the appropriate icon component for a given resource type
   * 
   * @param {Resource['type']} type - Type of the resource
   * @returns {JSX.Element} Lucide icon component
   */
  const getResourceIcon = (type: Resource['type']) => {
    switch (type) {
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'article':
        return <FileText className="h-4 w-4" />;
      case 'documentation':
        return <BookOpen className="h-4 w-4" />;
      case 'tutorial':
        return <Code className="h-4 w-4" />;
      case 'example':
        return <Lightbulb className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  /**
   * Returns Tailwind CSS classes for difficulty badge styling
   * 
   * @param {Resource['difficulty']} difficulty - Difficulty level of the resource
   * @returns {string} Tailwind CSS class string for badge styling
   */
  const getDifficultyColor = (difficulty: Resource['difficulty']) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-500/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800';
      case 'intermediate':
        return 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800';
      case 'advanced':
        return 'bg-red-500/20 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800';
      default:
        return 'bg-gray-500/20 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800';
    }
  };

  /**
   * Filters resources based on search term, type, difficulty, and project context
   * Implements progressive difficulty filtering where beginners see all levels,
   * intermediate users don't see advanced content, and advanced users see everything
   */
  const filteredResources = resources.filter(resource => {
    // Search filter
    const matchesSearch = searchTerm === "" || 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Type filter
    const matchesType = selectedType === "all" || resource.type === selectedType;
    
    // Difficulty filter
    const matchesDifficulty = selectedDifficulty === "all" || resource.difficulty === selectedDifficulty;
    
    // Project difficulty filter (progressive learning approach)
    const matchesProjectDifficulty = (() => {
      if (difficulty === 'beginner') return true;
      if (difficulty === 'intermediate') return resource.difficulty !== 'advanced';
      return true; // Advanced learners see all resources
    })();
    
    return matchesSearch && matchesType && matchesDifficulty && matchesProjectDifficulty;
  });

  /**
   * Categorizes filtered resources into different tabs for the UI
   * Provides quick access to resources by type, difficulty, and favorites
   */
  const categorizedResources = {
    all: filteredResources,
    favorites: filteredResources.filter(resource => favorites.includes(resource.title)),
    beginner: filteredResources.filter(resource => resource.difficulty === 'beginner'),
    intermediate: filteredResources.filter(resource => resource.difficulty === 'intermediate'),
    advanced: filteredResources.filter(resource => resource.difficulty === 'advanced'),
    videos: filteredResources.filter(resource => resource.type === 'video'),
    tutorials: filteredResources.filter(resource => resource.type === 'tutorial'),
    documentation: filteredResources.filter(resource => resource.type === 'documentation')
  };

  return (
    <Card className="h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold flex items-center gap-2 mb-3">
          <Target className="h-5 w-5 text-primary" />
          Learning Resources
        </h3>
        
        {/* Search and Filter Controls */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-8 text-sm"
            />
          </div>
          
          <div className="flex gap-2">
            <select 
              value={selectedType} 
              onChange={(e) => setSelectedType(e.target.value)}
              className="flex-1 h-8 text-xs border border-border rounded-md px-2 bg-background"
            >
              <option value="all">All Types</option>
              <option value="tutorial">Tutorials</option>
              <option value="video">Videos</option>
              <option value="documentation">Docs</option>
              <option value="article">Articles</option>
              <option value="example">Examples</option>
            </select>
            
            <select 
              value={selectedDifficulty} 
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="flex-1 h-8 text-xs border border-border rounded-md px-2 bg-background"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>
      </div>

      <Tabs defaultValue="all" className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-4 m-2 mb-0 h-8">
          <TabsTrigger value="all" className="text-xs">
            All ({categorizedResources.all.length})
          </TabsTrigger>
          <TabsTrigger value="favorites" className="text-xs">
            ⭐ ({categorizedResources.favorites.length})
          </TabsTrigger>
          <TabsTrigger value="videos" className="text-xs">
            📹 ({categorizedResources.videos.length})
          </TabsTrigger>
          <TabsTrigger value="tutorials" className="text-xs">
            📚 ({categorizedResources.tutorials.length})
          </TabsTrigger>
        </TabsList>
        
        {(['all', 'favorites', 'videos', 'tutorials'] as const).map((tab) => (
          <TabsContent key={tab} value={tab} className="flex-1 p-0 m-0">
            <div className="p-3 space-y-3 overflow-auto h-full">
              {categorizedResources[tab].length === 0 ? (
                <div className="text-center py-8">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground text-sm">
                    {tab === 'favorites' ? 'No favorite resources yet.' : 'No resources found.'}
                  </p>
                  {tab === 'favorites' && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Click the star icon to save resources as favorites.
                    </p>
                  )}
                </div>
              ) : (
                categorizedResources[tab].map((resource, index) => (
                  <Card key={`${tab}-${index}`} className="p-3 hover:shadow-md transition-all duration-200 border border-border/50 hover:border-primary/30 group">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-muted/50 flex-shrink-0">
                        {getResourceIcon(resource.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h4 className="font-medium text-sm leading-tight group-hover:text-primary transition-colors line-clamp-2">
                            {resource.title}
                          </h4>
                          <div className="flex gap-1 flex-shrink-0 items-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleFavorite(resource.title)}
                              className="h-6 w-6 p-0 hover:bg-yellow-100 dark:hover:bg-yellow-900/20"
                            >
                              <Star 
                                className={`h-3 w-3 ${
                                  favorites.includes(resource.title) 
                                    ? 'fill-yellow-400 text-yellow-400' 
                                    : 'text-muted-foreground'
                                }`} 
                              />
                            </Button>
                            <Badge 
                              variant="secondary" 
                              className={`text-xs ${getDifficultyColor(resource.difficulty)}`}
                            >
                              {resource.difficulty}
                            </Badge>
                            {resource.duration && (
                              <Badge variant="outline" className="text-xs flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {resource.duration}
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                          {resource.description}
                        </p>
                        
                        <div className="flex gap-2">
                          {resource.content && (
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  size="sm" 
                                  variant="default" 
                                  className="flex-1 justify-center text-xs h-7"
                                  onClick={() => setSelectedResource(resource)}
                                >
                                  <PlayCircle className="h-3 w-3 mr-1" />
                                  Start Learning
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-4xl max-h-[80vh]">
                                <DialogHeader>
                                  <DialogTitle className="flex items-center gap-2">
                                    {getResourceIcon(resource.type)}
                                    {resource.title}
                                    <Badge variant="secondary" className={getDifficultyColor(resource.difficulty)}>
                                      {resource.difficulty}
                                    </Badge>
                                  </DialogTitle>
                                  <DialogDescription>
                                    {resource.description}
                                  </DialogDescription>
                                </DialogHeader>
                                <ScrollArea className="h-[60vh] pr-4">
                                  <div className="space-y-4">
                                    {resource.prerequisites && resource.prerequisites.length > 0 && (
                                      <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                                        <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                                          <Target className="h-4 w-4" />
                                          Prerequisites
                                        </h4>
                                        <ul className="text-sm space-y-1">
                                          {resource.prerequisites.map((prereq, idx) => (
                                            <li key={idx} className="flex items-center gap-2">
                                              <CheckCircle2 className="h-3 w-3 text-green-500" />
                                              {prereq}
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}
                                    
                                    {resource.keyPoints && resource.keyPoints.length > 0 && (
                                      <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
                                        <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                                          <Lightbulb className="h-4 w-4" />
                                          Key Learning Points
                                        </h4>
                                        <ul className="text-sm space-y-2">
                                          {resource.keyPoints.map((point, idx) => (
                                            <li key={idx} className="flex items-start gap-2">
                                              <ArrowRight className="h-3 w-3 mt-1 text-green-600 flex-shrink-0" />
                                              {point}
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}
                                    
                                    <div className="prose prose-sm max-w-none dark:prose-invert">
                                      <div className="whitespace-pre-wrap">{resource.content}</div>
                                    </div>
                                    
                                    <div className="flex gap-2 pt-4 border-t">
                                      <Button asChild className="flex-1">
                                        <a 
                                          href={resource.url} 
                                          target="_blank" 
                                          rel="noopener noreferrer"
                                          className="flex items-center gap-2"
                                        >
                                          <ExternalLink className="h-4 w-4" />
                                          Open Original Resource
                                        </a>
                                      </Button>
                                    </div>
                                  </div>
                                </ScrollArea>
                              </DialogContent>
                            </Dialog>
                          )}
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className={`${resource.content ? 'flex-1' : 'w-full'} justify-center text-xs h-7 hover:bg-primary hover:text-primary-foreground`}
                            asChild
                          >
                            <a 
                              href={resource.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center gap-2"
                            >
                              <ExternalLink className="h-3 w-3" />
                              Open Resource
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
      
      <div className="p-3 border-t border-border">
        <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
          <h4 className="font-medium text-blue-900 dark:text-blue-100 text-sm mb-1 flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            Learning Tips
          </h4>
          <p className="text-xs text-blue-700 dark:text-blue-300">
            {filteredResources.length > 0 
              ? `Found ${filteredResources.length} resources. Start with beginner materials and bookmark favorites with the star icon.`
              : "Try adjusting your search terms or filters to find more resources."
            }
          </p>
        </div>
      </div>
    </Card>
  );
}

/**
 * LEARNING RESOURCES COVERAGE SUMMARY
 * =====================================
 * 
 * This component provides comprehensive educational resources for:
 * 
 * 🌐 WEB DEVELOPMENT FUNDAMENTALS:
 *    • HTML5 semantic elements, forms, SEO optimization
 *    • CSS fundamentals, Flexbox, Grid, animations, responsive design
 *    • JavaScript basics to advanced, ES6+, DOM manipulation, async programming
 *    • Interactive learning games (Flexbox Froggy, Grid Garden)
 *    • Accessibility (A11Y) and inclusive design principles
 *    • Performance optimization and best practices
 * 
 * 🔧 DEVELOPMENT TOOLS:
 *    • Browser compatibility checking (Can I Use)
 *    • Code quality and architecture patterns (BEM, CSS organization)
 *    • Modern development workflows and environments
 * 
 * 📚 LEARNING FORMATS:
 *    • Interactive tutorials with hands-on coding
 *    • Comprehensive documentation and references
 *    • Video courses and crash courses
 *    • Practical articles and guides
 *    • Real-world project examples
 * 
 * 🎯 SKILL PROGRESSION:
 *    • Beginner: Foundation concepts and basic implementation
 *    • Intermediate: Advanced techniques and best practices
 *    • Advanced: Performance optimization and complex patterns
 * 
 * 🔄 ADAPTIVE FILTERING:
 *    • Context-aware resource suggestions based on current project
 *    • Progressive difficulty filtering (beginners see all levels)
 *    • Search functionality across titles and descriptions
 *    • Favorites system for personalized learning paths
 * 
 * The component dynamically generates relevant resources ensuring learners
 * have access to high-quality, up-to-date educational content tailored to
 * their current learning context and skill level.
 */