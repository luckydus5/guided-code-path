import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Star
} from "lucide-react";

interface Resource {
  title: string;
  type: 'video' | 'article' | 'documentation' | 'tutorial' | 'example';
  url: string;
  description: string;
  duration?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

interface LearningResourcesProps {
  projectTitle: string;
  language: string;
  difficulty: string;
  technologies: string[];
}

export default function LearningResources({ 
  projectTitle, 
  language, 
  difficulty, 
  technologies 
}: LearningResourcesProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [favorites, setFavorites] = useState<string[]>([]);
  
  // Generate resources based on project context
  const getResourcesForProject = (): Resource[] => {
    const resources: Resource[] = [];
    
    // Web Fundamentals specific resources
    if (language === 'web-fundamentals') {
      resources.push(
        {
          title: "MDN Web Development Guide",
          type: "documentation",
          url: "https://developer.mozilla.org/en-US/docs/Learn",
          description: "Complete web development learning guide from Mozilla",
          difficulty: "beginner"
        },
        {
          title: "freeCodeCamp Web Development",
          type: "tutorial",
          url: "https://www.freecodecamp.org/learn/responsive-web-design/",
          description: "Free interactive web development curriculum",
          duration: "300 hours",
          difficulty: "beginner"
        },
        {
          title: "HTML & CSS Crash Course",
          type: "video",
          url: "https://www.youtube.com/watch?v=UB1O30fR-EE",
          description: "Learn HTML and CSS basics in one video",
          duration: "2 hours",
          difficulty: "beginner"
        },
        {
          title: "Codecademy HTML & CSS Course",
          type: "tutorial",
          url: "https://www.codecademy.com/learn/learn-html",
          description: "Interactive HTML and CSS lessons",
          duration: "20 hours",
          difficulty: "beginner"
        },
        {
          title: "W3Schools Web Development Tutorial",
          type: "tutorial",
          url: "https://www.w3schools.com/html/",
          description: "Step-by-step web development tutorials",
          difficulty: "beginner"
        },
        {
          title: "JavaScript.info - Modern Tutorial",
          type: "tutorial",
          url: "https://javascript.info/",
          description: "Modern JavaScript tutorial from basics to advanced",
          difficulty: "beginner"
        },
        {
          title: "JavaScript30 - 30 Day Challenge",
          type: "tutorial",
          url: "https://javascript30.com/",
          description: "Build 30 projects in 30 days with vanilla JavaScript",
          duration: "30 days",
          difficulty: "intermediate"
        },
        {
          title: "Flexbox Froggy Game",
          type: "tutorial",
          url: "https://flexboxfroggy.com/",
          description: "Learn CSS Flexbox through fun gameplay",
          duration: "1 hour",
          difficulty: "beginner"
        },
        {
          title: "Grid Garden Game",
          type: "tutorial",
          url: "https://cssgridgarden.com/",
          description: "Master CSS Grid through interactive challenges",
          duration: "1 hour",
          difficulty: "beginner"
        },
        {
          title: "CSS-Tricks Complete Guide",
          type: "article",
          url: "https://css-tricks.com/guides/",
          description: "Comprehensive CSS guides and tutorials",
          difficulty: "intermediate"
        },
        {
          title: "Web.dev by Google",
          type: "documentation",
          url: "https://web.dev/learn/",
          description: "Google's comprehensive web development curriculum",
          difficulty: "intermediate"
        },
        {
          title: "The Odin Project",
          type: "tutorial",
          url: "https://www.theodinproject.com/",
          description: "Full-stack web development curriculum",
          duration: "1000+ hours",
          difficulty: "beginner"
        },
        {
          title: "Can I Use - Browser Support",
          type: "documentation",
          url: "https://caniuse.com/",
          description: "Check browser support for web technologies",
          difficulty: "intermediate"
        },
        {
          title: "A11Y Project - Accessibility",
          type: "documentation",
          url: "https://www.a11yproject.com/",
          description: "Learn web accessibility best practices",
          difficulty: "intermediate"
        },
        
        // Essential HTML Articles
        {
          title: "HTML5 Semantic Elements Guide",
          type: "article",
          url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element",
          description: "Complete guide to HTML5 semantic elements",
          difficulty: "beginner"
        },
        {
          title: "HTML Forms Best Practices",
          type: "article",
          url: "https://web.dev/learn/forms/",
          description: "Build accessible and user-friendly forms",
          difficulty: "intermediate"
        },
        {
          title: "HTML Meta Tags for SEO",
          type: "article",
          url: "https://moz.com/blog/meta-data-templates-123",
          description: "Essential meta tags for search engine optimization",
          difficulty: "intermediate"
        },
        {
          title: "Progressive Enhancement with HTML",
          type: "article",
          url: "https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement",
          description: "Build websites that work for everyone",
          difficulty: "intermediate"
        },
        
        // CSS Fundamentals Articles
        {
          title: "CSS Box Model Explained",
          type: "article",
          url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Introduction_to_the_CSS_box_model",
          description: "Master the fundamental CSS box model",
          difficulty: "beginner"
        },
        {
          title: "CSS Flexbox Complete Guide",
          type: "article",
          url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/",
          description: "Everything you need to know about Flexbox",
          difficulty: "beginner"
        },
        {
          title: "CSS Grid Garden Tutorial",
          type: "tutorial",
          url: "https://cssgridgarden.com/",
          description: "Learn CSS Grid through interactive gameplay",
          difficulty: "beginner"
        },
        {
          title: "CSS Custom Properties (Variables)",
          type: "article",
          url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties",
          description: "Dynamic styling with CSS variables",
          difficulty: "intermediate"
        },
        {
          title: "CSS Architecture - BEM Methodology",
          type: "article",
          url: "https://css-tricks.com/bem-101/",
          description: "Organize CSS for scalable projects",
          difficulty: "intermediate"
        },
        {
          title: "CSS Animation and Transitions",
          type: "article",
          url: "https://web.dev/animations/",
          description: "Create smooth animations for better UX",
          difficulty: "intermediate"
        },
        {
          title: "Responsive Web Design Principles",
          type: "article",
          url: "https://web.dev/responsive-web-design-basics/",
          description: "Build websites that work on all devices",
          difficulty: "intermediate"
        },
        {
          title: "CSS Performance Optimization",
          type: "article",
          url: "https://web.dev/fast-css/",
          description: "Write CSS that loads and renders quickly",
          difficulty: "advanced"
        },
        
        // JavaScript Fundamentals Articles
        {
          title: "JavaScript Fundamentals",
          type: "article",
          url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Introduction",
          description: "Core JavaScript concepts and syntax",
          difficulty: "beginner"
        },
        {
          title: "JavaScript ES6+ Features",
          type: "article",
          url: "https://github.com/lukehoban/es6features",
          description: "Modern JavaScript features you should know",
          difficulty: "intermediate"
        },
        {
          title: "Understanding JavaScript Closures",
          type: "article",
          url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures",
          description: "Master one of JavaScript's most important concepts",
          difficulty: "intermediate"
        },
        {
          title: "JavaScript Async/Await Guide",
          type: "article",
          url: "https://javascript.info/async-await",
          description: "Handle asynchronous operations elegantly",
          difficulty: "intermediate"
        },
        {
          title: "DOM Manipulation Best Practices",
          type: "article",
          url: "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction",
          description: "Interact with web pages using JavaScript",
          difficulty: "intermediate"
        },
        {
          title: "JavaScript Event Handling",
          type: "article",
          url: "https://developer.mozilla.org/en-US/docs/Web/Events",
          description: "Handle user interactions and browser events",
          difficulty: "intermediate"
        },
        {
          title: "JavaScript Promises Explained",
          type: "article",
          url: "https://web.dev/promises/",
          description: "Master asynchronous JavaScript with Promises",
          difficulty: "intermediate"
        },
        {
          title: "JavaScript Modules (ES6)",
          type: "article",
          url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules",
          description: "Organize code with JavaScript modules",
          difficulty: "intermediate"
        },
        
        // Web Performance Articles
        {
          title: "Web Performance Fundamentals",
          type: "article",
          url: "https://web.dev/why-speed-matters/",
          description: "Why performance matters for web applications",
          difficulty: "intermediate"
        },
        {
          title: "Core Web Vitals Explained",
          type: "article",
          url: "https://web.dev/vitals/",
          description: "Google's essential metrics for web performance",
          difficulty: "intermediate"
        },
        {
          title: "Image Optimization for Web",
          type: "article",
          url: "https://web.dev/fast/#optimize-your-images",
          description: "Optimize images for faster loading",
          difficulty: "intermediate"
        },
        {
          title: "Critical Rendering Path",
          type: "article",
          url: "https://developers.google.com/web/fundamentals/performance/critical-rendering-path",
          description: "How browsers render web pages",
          difficulty: "advanced"
        },
        {
          title: "Lazy Loading Images and Content",
          type: "article",
          url: "https://web.dev/lazy-loading/",
          description: "Load content only when needed",
          difficulty: "intermediate"
        },
        
        // Accessibility Articles
        {
          title: "Web Accessibility Guidelines (WCAG)",
          type: "article",
          url: "https://www.w3.org/WAI/WCAG21/quickref/",
          description: "Make your websites accessible to everyone",
          difficulty: "intermediate"
        },
        {
          title: "ARIA Labels and Attributes",
          type: "article",
          url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA",
          description: "Enhance accessibility with ARIA",
          difficulty: "intermediate"
        },
        {
          title: "Color and Contrast for Accessibility",
          type: "article",
          url: "https://web.dev/color-and-contrast-accessibility/",
          description: "Design with accessible color schemes",
          difficulty: "intermediate"
        },
        {
          title: "Keyboard Navigation Best Practices",
          type: "article",
          url: "https://web.dev/keyboard-access/",
          description: "Make your site navigable by keyboard",
          difficulty: "intermediate"
        },
        
        // SEO and Best Practices
        {
          title: "SEO Fundamentals for Developers",
          type: "article",
          url: "https://developers.google.com/search/docs/beginner/seo-starter-guide",
          description: "Google's guide to search engine optimization",
          difficulty: "intermediate"
        },
        {
          title: "Structured Data and Schema.org",
          type: "article",
          url: "https://developers.google.com/search/docs/guides/intro-structured-data",
          description: "Help search engines understand your content",
          difficulty: "advanced"
        },
        {
          title: "Progressive Web Apps (PWA) Guide",
          type: "article",
          url: "https://web.dev/progressive-web-apps/",
          description: "Build app-like web experiences",
          difficulty: "advanced"
        },
        {
          title: "Web Security Best Practices",
          type: "article",
          url: "https://web.dev/secure/",
          description: "Protect your web applications",
          difficulty: "advanced"
        },
        
        // Modern Web Development
        {
          title: "Modern CSS Reset and Normalize",
          type: "article",
          url: "https://piccalil.li/blog/a-modern-css-reset",
          description: "Start with a clean CSS foundation",
          difficulty: "intermediate"
        },
        {
          title: "CSS-in-JS vs Traditional CSS",
          type: "article",
          url: "https://css-tricks.com/the-fragmented-but-evolving-state-of-css-in-js/",
          description: "Compare modern CSS approaches",
          difficulty: "advanced"
        },
        {
          title: "Web Components Introduction",
          type: "article",
          url: "https://developer.mozilla.org/en-US/docs/Web/Web_Components",
          description: "Create reusable custom elements",
          difficulty: "advanced"
        },
        {
          title: "JavaScript Build Tools Overview",
          type: "article",
          url: "https://blog.logrocket.com/javascript-build-tools-past-and-present/",
          description: "Understanding modern build processes",
          difficulty: "advanced"
        },
        {
          title: "Browser Developer Tools Mastery",
          type: "article",
          url: "https://developer.chrome.com/docs/devtools/",
          description: "Master browser debugging tools",
          difficulty: "intermediate"
        },
        
        // Industry Best Practices
        {
          title: "Frontend Development Best Practices",
          type: "article",
          url: "https://github.com/bendc/frontend-guidelines",
          description: "Industry standards for frontend development",
          difficulty: "intermediate"
        },
        {
          title: "Code Review Guidelines",
          type: "article",
          url: "https://google.github.io/eng-practices/review/reviewer/",
          description: "How to conduct effective code reviews",
          difficulty: "intermediate"
        },
        {
          title: "Git Workflow Best Practices",
          type: "article",
          url: "https://www.atlassian.com/git/tutorials/comparing-workflows",
          description: "Effective Git workflows for teams",
          difficulty: "intermediate"
        },
        {
          title: "Documentation Writing for Developers",
          type: "article",
          url: "https://www.writethedocs.org/guide/writing/beginners-guide-to-docs/",
          description: "Write clear and helpful documentation",
          difficulty: "intermediate"
        },
        
        // Practical Learning Resources
        {
          title: "Frontend Mentor Challenges",
          type: "tutorial",
          url: "https://www.frontendmentor.io/",
          description: "Real-world frontend coding challenges",
          difficulty: "intermediate"
        },
        {
          title: "CSS Battle - CSS Challenges",
          type: "tutorial",
          url: "https://cssbattle.dev/",
          description: "Sharpen CSS skills with coding battles",
          difficulty: "intermediate"
        },
        {
          title: "Codepen Code Examples",
          type: "example",
          url: "https://codepen.io/trending",
          description: "Explore creative code examples and experiments",
          difficulty: "beginner"
        },
        {
          title: "Can I Use - Feature Support",
          type: "documentation",
          url: "https://caniuse.com/",
          description: "Check browser support for web technologies",
          difficulty: "beginner"
        },
        {
          title: "Web Development Roadmap",
          type: "article",
          url: "https://roadmap.sh/frontend",
          description: "Complete roadmap for frontend development",
          difficulty: "beginner"
        },
        {
          title: "HTML5 Boilerplate",
          type: "example",
          url: "https://html5boilerplate.com/",
          description: "Professional front-end template",
          difficulty: "intermediate"
        },
        {
          title: "CSS Reset vs Normalize",
          type: "article",
          url: "https://elad.medium.com/normalize-css-or-css-reset-9d75175c5d1e",
          description: "Choose the right CSS foundation",
          difficulty: "intermediate"
        },
        {
          title: "Viewport Meta Tag Guide",
          type: "article",
          url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag",
          description: "Control layout on mobile browsers",
          difficulty: "beginner"
        },
        {
          title: "HTTP Status Codes Reference",
          type: "documentation",
          url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status",
          description: "Understanding HTTP response codes",
          difficulty: "intermediate"
        },
        {
          title: "Web API References",
          type: "documentation",
          url: "https://developer.mozilla.org/en-US/docs/Web/API",
          description: "Complete reference for Web APIs",
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
          title: "MDN HTML Basics",
          type: "documentation",
          url: "https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics",
          description: "Learn HTML fundamentals from Mozilla Developer Network",
          difficulty: "beginner"
        },
        {
          title: "HTML Semantic Elements Guide",
          type: "article",
          url: "https://developer.mozilla.org/en-US/docs/Glossary/Semantics",
          description: "Understanding semantic HTML for better accessibility",
          difficulty: "intermediate"
        },
        {
          title: "HTML5 Forms Tutorial",
          type: "tutorial",
          url: "https://developer.mozilla.org/en-US/docs/Learn/Forms",
          description: "Master HTML forms and validation",
          difficulty: "intermediate"
        },
        {
          title: "HTML Accessibility Guidelines",
          type: "documentation",
          url: "https://www.w3.org/WAI/WCAG21/quickref/",
          description: "Web Content Accessibility Guidelines",
          difficulty: "advanced"
        },
        {
          title: "HTML Best Practices",
          type: "article",
          url: "https://github.com/hail2u/html-best-practices",
          description: "Writing clean and maintainable HTML",
          difficulty: "intermediate"
        }
      );
    }
    
    if (technologies.includes('CSS')) {
      resources.push(
        {
          title: "CSS Grid Complete Guide",
          type: "article",
          url: "https://css-tricks.com/snippets/css/complete-guide-grid/",
          description: "Master CSS Grid for modern layouts",
          difficulty: "intermediate"
        },
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
          title: "CSS-in-JS vs CSS",
          type: "article",
          url: "https://css-tricks.com/the-fragmented-but-evolving-state-of-css-in-js/",
          description: "Modern CSS styling approaches",
          difficulty: "advanced"
        },
        {
          title: "Responsive Web Design",
          type: "tutorial",
          url: "https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design",
          description: "Build websites that work on all devices",
          difficulty: "intermediate"
        },
        {
          title: "CSS Variables (Custom Properties)",
          type: "article",
          url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties",
          description: "Dynamic styling with CSS variables",
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
          title: "Eloquent JavaScript (Free Book)",
          type: "article",
          url: "https://eloquentjavascript.net/",
          description: "Free online book about JavaScript programming",
          difficulty: "intermediate"
        },
        {
          title: "ES6 Features Guide",
          type: "article",
          url: "https://github.com/lukehoban/es6features",
          description: "Overview of ECMAScript 6 features",
          difficulty: "intermediate"
        },
        {
          title: "Async/Await Tutorial",
          type: "tutorial",
          url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await",
          description: "Master asynchronous JavaScript programming",
          difficulty: "intermediate"
        },
        {
          title: "JavaScript Design Patterns",
          type: "article",
          url: "https://addyosmani.com/resources/essentialjsdesignpatterns/book/",
          description: "Essential JavaScript design patterns",
          difficulty: "advanced"
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
          title: "Landing Page Design Principles",
          type: "article",
          url: "https://blog.hubspot.com/marketing/landing-page-examples-list",
          description: "Best practices for effective landing pages",
          difficulty: "beginner"
        },
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
    
    // Add comprehensive general resources
    resources.push(
      // Development Tools & Environment
      {
        title: "VS Code Essential Extensions",
        type: "article",
        url: "https://code.visualstudio.com/docs/editor/extension-marketplace",
        description: "Must-have extensions for web development",
        difficulty: "beginner"
      },
      {
        title: "Git Version Control Tutorial",
        type: "tutorial",
        url: "https://www.atlassian.com/git/tutorials",
        description: "Master Git for version control and collaboration",
        difficulty: "beginner"
      },
      {
        title: "Chrome DevTools Guide",
        type: "tutorial",
        url: "https://developer.chrome.com/docs/devtools/",
        description: "Debug and optimize with browser developer tools",
        difficulty: "intermediate"
      },
      {
        title: "NPM & Package Management",
        type: "documentation",
        url: "https://docs.npmjs.com/",
        description: "Manage JavaScript packages and dependencies",
        difficulty: "intermediate"
      },
      
      // Code Quality & Best Practices
      {
        title: "Clean Code Principles",
        type: "article",
        url: "https://blog.cleancoder.com/",
        description: "Writing maintainable and readable code",
        difficulty: "intermediate"
      },
      {
        title: "Code Review Best Practices",
        type: "article",
        url: "https://google.github.io/eng-practices/review/",
        description: "Google's guide to effective code reviews",
        difficulty: "intermediate"
      },
      {
        title: "ESLint Configuration Guide",
        type: "tutorial",
        url: "https://eslint.org/docs/latest/user-guide/getting-started",
        description: "Set up code linting for consistent style",
        difficulty: "intermediate"
      },
      {
        title: "Prettier Code Formatting",
        type: "tutorial",
        url: "https://prettier.io/docs/en/index.html",
        description: "Automatic code formatting for consistency",
        difficulty: "beginner"
      },
      
      // Performance & Optimization
      {
        title: "Web Performance Optimization",
        type: "article",
        url: "https://web.dev/performance/",
        description: "Google's guide to making websites fast",
        difficulty: "advanced"
      },
      {
        title: "Lighthouse Performance Audits",
        type: "tutorial",
        url: "https://web.dev/lighthouse-performance/",
        description: "Audit and improve website performance",
        difficulty: "intermediate"
      },
      {
        title: "Image Optimization Techniques",
        type: "article",
        url: "https://web.dev/fast/#optimize-your-images",
        description: "Optimize images for web performance",
        difficulty: "intermediate"
      },
      {
        title: "Critical Rendering Path",
        type: "article",
        url: "https://web.dev/critical-rendering-path/",
        description: "Understand how browsers render web pages",
        difficulty: "advanced"
      },
      
      // Security & Best Practices
      {
        title: "Web Security Fundamentals",
        type: "article",
        url: "https://web.dev/secure/",
        description: "Essential security practices for web apps",
        difficulty: "intermediate"
      },
      {
        title: "HTTPS Implementation Guide",
        type: "tutorial",
        url: "https://web.dev/why-https-matters/",
        description: "Secure your website with HTTPS",
        difficulty: "intermediate"
      },
      {
        title: "Content Security Policy (CSP)",
        type: "documentation",
        url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP",
        description: "Prevent XSS attacks with CSP headers",
        difficulty: "advanced"
      },
      
      // Testing & Quality Assurance
      {
        title: "JavaScript Testing Introduction",
        type: "tutorial",
        url: "https://jestjs.io/docs/getting-started",
        description: "Write tests for your JavaScript code",
        difficulty: "intermediate"
      },
      {
        title: "End-to-End Testing with Playwright",
        type: "tutorial",
        url: "https://playwright.dev/docs/intro",
        description: "Automate browser testing for web apps",
        difficulty: "advanced"
      },
      {
        title: "Accessibility Testing Guide",
        type: "article",
        url: "https://web.dev/accessibility/",
        description: "Test and improve web accessibility",
        difficulty: "intermediate"
      },
      
      // Modern Development Practices
      {
        title: "Progressive Web Apps (PWA)",
        type: "tutorial",
        url: "https://web.dev/progressive-web-apps/",
        description: "Build app-like web experiences",
        difficulty: "advanced"
      },
      {
        title: "Service Workers Guide",
        type: "tutorial",
        url: "https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API",
        description: "Enable offline functionality and caching",
        difficulty: "advanced"
      },
      {
        title: "Web Components Standard",
        type: "documentation",
        url: "https://developer.mozilla.org/en-US/docs/Web/Web_Components",
        description: "Create reusable custom elements",
        difficulty: "advanced"
      },
      {
        title: "CSS Architecture (BEM, SMACSS)",
        type: "article",
        url: "https://sass-guidelin.es/#architecture",
        description: "Organize CSS for large projects",
        difficulty: "intermediate"
      },
      
      // Deployment & DevOps
      {
        title: "Netlify Deployment Guide",
        type: "tutorial",
        url: "https://docs.netlify.com/",
        description: "Deploy static sites with continuous deployment",
        difficulty: "beginner"
      },
      {
        title: "Vercel Deployment Tutorial",
        type: "tutorial",
        url: "https://vercel.com/docs",
        description: "Deploy modern web applications",
        difficulty: "beginner"
      },
      {
        title: "GitHub Pages Setup",
        type: "tutorial",
        url: "https://pages.github.com/",
        description: "Host static websites for free on GitHub",
        difficulty: "beginner"
      },
      {
        title: "Docker for Web Developers",
        type: "tutorial",
        url: "https://docs.docker.com/get-started/",
        description: "Containerize web applications",
        difficulty: "advanced"
      },
      
      // Career & Learning Resources
      {
        title: "freeCodeCamp Full Curriculum",
        type: "tutorial",
        url: "https://www.freecodecamp.org/learn/",
        description: "Complete web development certification",
        duration: "300+ hours",
        difficulty: "beginner"
      },
      {
        title: "MDN Learning Area",
        type: "documentation",
        url: "https://developer.mozilla.org/en-US/docs/Learn",
        description: "Comprehensive web development learning path",
        difficulty: "beginner"
      },
      {
        title: "Web.dev Learn",
        type: "tutorial",
        url: "https://web.dev/learn/",
        description: "Google's structured web development courses",
        difficulty: "intermediate"
      },
      {
        title: "Frontend Mentor Challenges",
        type: "tutorial",
        url: "https://www.frontendmentor.io/",
        description: "Real-world frontend coding challenges",
        difficulty: "intermediate"
      },
      {
        title: "Codepen for Inspiration",
        type: "example",
        url: "https://codepen.io/",
        description: "Explore creative code examples and experiments",
        difficulty: "beginner"
      },
      {
        title: "Stack Overflow Developer Survey",
        type: "article",
        url: "https://insights.stackoverflow.com/survey/",
        description: "Stay updated with industry trends",
        difficulty: "beginner"
      }
    );
    
    return resources;
  };

  const resources = getResourcesForProject();
  
  const toggleFavorite = (resourceTitle: string) => {
    setFavorites(prev => 
      prev.includes(resourceTitle) 
        ? prev.filter(fav => fav !== resourceTitle)
        : [...prev, resourceTitle]
    );
  };
  
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

  const filteredResources = resources.filter(resource => {
    // Search filter
    const matchesSearch = searchTerm === "" || 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Type filter
    const matchesType = selectedType === "all" || resource.type === selectedType;
    
    // Difficulty filter
    const matchesDifficulty = selectedDifficulty === "all" || resource.difficulty === selectedDifficulty;
    
    // Project difficulty filter (original logic)
    const matchesProjectDifficulty = (() => {
      if (difficulty === 'beginner') return true;
      if (difficulty === 'intermediate') return resource.difficulty !== 'advanced';
      return true; // Advanced learners see all resources
    })();
    
    return matchesSearch && matchesType && matchesDifficulty && matchesProjectDifficulty;
  });

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
                        
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="w-full justify-center text-xs h-7 hover:bg-primary hover:text-primary-foreground"
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