import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Video, 
  ExternalLink, 
  FileText,
  Code,
  Lightbulb,
  Target
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
  
  // Generate resources based on project context
  const getResourcesForProject = (): Resource[] => {
    const resources: Resource[] = [];
    
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
          title: "HTML Semantic Elements",
          type: "article",
          url: "https://developer.mozilla.org/en-US/docs/Glossary/Semantics",
          description: "Understanding semantic HTML for better accessibility",
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
        }
      );
    }
    
    if (technologies.includes('JavaScript')) {
      resources.push(
        {
          title: "JavaScript.info",
          type: "tutorial",
          url: "https://javascript.info/",
          description: "Modern JavaScript tutorial from basics to advanced",
          difficulty: "beginner"
        },
        {
          title: "Eloquent JavaScript",
          type: "article",
          url: "https://eloquentjavascript.net/",
          description: "Free online book about JavaScript programming",
          difficulty: "intermediate"
        }
      );
    }
    
    // Project-specific resources based on title keywords
    if (projectTitle.toLowerCase().includes('calculator')) {
      resources.push(
        {
          title: "Building a Calculator with JavaScript",
          type: "tutorial",
          url: "https://www.freecodecamp.org/news/how-to-build-an-html-calculator-app-from-scratch-using-javascript-4454b8714b98/",
          description: "Step-by-step guide to building a functional calculator",
          duration: "2 hours",
          difficulty: "intermediate"
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
        }
      );
    }
    
    if (projectTitle.toLowerCase().includes('game')) {
      resources.push(
        {
          title: "Game Development Basics",
          type: "video",
          url: "https://www.youtube.com/watch?v=bG2BmmYr9NQ",
          description: "Introduction to game development concepts",
          duration: "30 min",
          difficulty: "beginner"
        }
      );
    }
    
    if (projectTitle.toLowerCase().includes('api') || projectTitle.toLowerCase().includes('weather')) {
      resources.push(
        {
          title: "Working with APIs in JavaScript",
          type: "tutorial",
          url: "https://www.freecodecamp.org/news/how-to-use-fetch-api/",
          description: "Learn to fetch data from external APIs",
          duration: "1 hour",
          difficulty: "intermediate"
        }
      );
    }
    
    // Add some general resources
    resources.push(
      {
        title: "Code Review Best Practices",
        type: "article",
        url: "https://google.github.io/eng-practices/review/",
        description: "Google's guide to effective code reviews",
        difficulty: "intermediate"
      },
      {
        title: "Clean Code Principles",
        type: "article",
        url: "https://blog.cleancoder.com/",
        description: "Writing maintainable and readable code",
        difficulty: "intermediate"
      }
    );
    
    return resources;
  };

  const resources = getResourcesForProject();
  
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
        return 'bg-green-500/20 text-green-700 dark:text-green-300';
      case 'intermediate':
        return 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-300';
      case 'advanced':
        return 'bg-red-500/20 text-red-700 dark:text-red-300';
      default:
        return 'bg-gray-500/20 text-gray-700 dark:text-gray-300';
    }
  };

  const filteredResources = resources.filter(resource => {
    if (difficulty === 'beginner') return true;
    if (difficulty === 'intermediate') return resource.difficulty !== 'advanced';
    return true; // Advanced learners see all resources
  });

  return (
    <Card className="h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold flex items-center gap-2 mb-2">
          <Target className="h-5 w-5 text-primary" />
          Learning Resources
        </h3>
        <p className="text-sm text-muted-foreground">
          Curated resources to help you master this project
        </p>
      </div>

      <div className="flex-1 p-4 space-y-4 overflow-auto">
        {filteredResources.map((resource, index) => (
          <div key={index} className="group">
            <Card className="p-4 hover:shadow-md transition-all duration-200 border border-border/50 hover:border-primary/30">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-muted/50 flex-shrink-0">
                  {getResourceIcon(resource.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="font-medium text-sm leading-tight group-hover:text-primary transition-colors">
                      {resource.title}
                    </h4>
                    <div className="flex gap-1 flex-shrink-0">
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${getDifficultyColor(resource.difficulty)}`}
                      >
                        {resource.difficulty}
                      </Badge>
                      {resource.duration && (
                        <Badge variant="outline" className="text-xs">
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
                    className="w-full justify-center text-xs h-7"
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
          </div>
        ))}
        
        {filteredResources.length === 0 && (
          <div className="text-center py-8">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No resources available for this project yet.</p>
          </div>
        )}
      </div>
      
      <div className="p-4 border-t border-border">
        <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
          <h4 className="font-medium text-blue-900 dark:text-blue-100 text-sm mb-1">
            💡 Pro Tip
          </h4>
          <p className="text-xs text-blue-700 dark:text-blue-300">
            Start with beginner resources, then progress to more advanced topics as you build confidence.
          </p>
        </div>
      </div>
    </Card>
  );
}