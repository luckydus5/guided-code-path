import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  BookOpen, 
  Eye,
  Code2,
  Lightbulb
} from 'lucide-react';

interface TutorialStep {
  id: string;
  title: string;
  description: string;
  code: string;
  explanation: string;
  visualDemo?: string; // URL or component for visual demonstration
  highlights?: string[]; // Lines of code to highlight
  tips?: string[];
}

interface Tutorial {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'html' | 'css' | 'javascript' | 'responsive' | 'accessibility';
  estimatedTime: number; // in minutes
  steps: TutorialStep[];
  finalProject: {
    title: string;
    description: string;
    code: string;
  };
}

const FUNDAMENTAL_TUTORIALS: Tutorial[] = [
  {
    id: 'html-basics',
    title: 'HTML Fundamentals: Building Your First Webpage',
    description: 'Learn the building blocks of web development with HTML',
    difficulty: 'beginner',
    category: 'html',
    estimatedTime: 30,
    steps: [
      {
        id: 'step-1',
        title: 'Document Structure',
        description: 'Every HTML document starts with a basic structure',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Webpage</title>
</head>
<body>
    <!-- Your content goes here -->
</body>
</html>`,
        explanation: 'The DOCTYPE tells the browser this is HTML5. The html element wraps everything. Head contains metadata, body contains visible content.',
        highlights: ['<!DOCTYPE html>', '<html lang="en">', '<head>', '<body>'],
        tips: [
          'Always include the DOCTYPE declaration',
          'Set the language attribute for accessibility',
          'The viewport meta tag makes your site mobile-friendly'
        ]
      },
      {
        id: 'step-2',
        title: 'Headings and Paragraphs',
        description: 'Add structure with headings and content with paragraphs',
        code: `<body>
    <h1>Welcome to My Website</h1>
    <h2>About Me</h2>
    <p>Hi there! I'm learning web development and this is my first webpage.</p>
    
    <h2>My Interests</h2>
    <p>I love coding, music, and exploring new technologies.</p>
</body>`,
        explanation: 'Use h1-h6 for headings (h1 is most important). Paragraphs go in <p> tags. Maintain a logical heading hierarchy.',
        highlights: ['<h1>', '<h2>', '<p>'],
        tips: [
          'Only use one h1 per page',
          'Don\'t skip heading levels (h1 → h3)',
          'Keep paragraphs focused on one idea'
        ]
      },
      {
        id: 'step-3',
        title: 'Links and Images',
        description: 'Connect pages with links and add visual content with images',
        code: `<h2>Links and Images</h2>
<p>Check out <a href="https://developer.mozilla.org">MDN Web Docs</a> for more learning!</p>

<h3>My Photo</h3>
<img src="https://via.placeholder.com/200x200" alt="A placeholder image representing me">

<p>
    <a href="mailto:hello@example.com">Send me an email</a> or 
    <a href="tel:+1234567890">call me</a>!
</p>`,
        explanation: 'Links use <a> with href attribute. Images use <img> with src and alt attributes. Alt text is crucial for accessibility.',
        highlights: ['<a href=', '<img src=', 'alt='],
        tips: [
          'Always include alt text for images',
          'Use descriptive link text (not "click here")',
          'mailto: and tel: links open email and phone apps'
        ]
      }
    ],
    finalProject: {
      title: 'Personal Profile Page',
      description: 'Create a complete personal profile page using all learned concepts',
      code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>John Doe - Web Developer</title>
</head>
<body>
    <header>
        <h1>John Doe</h1>
        <p>Aspiring Web Developer</p>
    </header>
    
    <main>
        <section>
            <h2>About Me</h2>
            <img src="profile.jpg" alt="John Doe smiling at camera">
            <p>I'm passionate about creating amazing web experiences...</p>
        </section>
        
        <section>
            <h2>Contact</h2>
            <p>
                <a href="mailto:john@example.com">Email me</a> |
                <a href="https://linkedin.com/in/johndoe">LinkedIn</a>
            </p>
        </section>
    </main>
</body>
</html>`
    }
  },
  {
    id: 'css-styling',
    title: 'CSS Styling: Making Your Website Beautiful',
    description: 'Transform plain HTML into visually appealing designs',
    difficulty: 'beginner',
    category: 'css',
    estimatedTime: 45,
    steps: [
      {
        id: 'css-step-1',
        title: 'Adding Styles to HTML',
        description: 'Learn different ways to add CSS to your webpage',
        code: `/* External CSS file (styles.css) */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
}

h1 {
    color: #2c3e50;
    text-align: center;
}

/* In your HTML head: */
<link rel="stylesheet" href="styles.css">`,
        explanation: 'CSS can be external (recommended), internal (in <style> tags), or inline. External stylesheets are best for maintainability.',
        highlights: ['font-family', 'color', 'text-align'],
        tips: [
          'External CSS keeps HTML clean',
          'Use meaningful file names',
          'Link CSS in the <head> section'
        ]
      }
    ],
    finalProject: {
      title: 'Styled Profile Page',
      description: 'Style your HTML profile page with modern CSS',
      code: `/* Add beautiful styling to your profile page */`
    }
  }
];

interface StepByStepTutorialProps {
  selectedLanguage: string;
  onProgressUpdate: (tutorialId: string, stepIndex: number) => void;
}

export const StepByStepTutorial: React.FC<StepByStepTutorialProps> = ({
  selectedLanguage,
  onProgressUpdate
}) => {
  const [selectedTutorial, setSelectedTutorial] = useState<Tutorial | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const filteredTutorials = FUNDAMENTAL_TUTORIALS.filter(tutorial => 
    tutorial.category === selectedLanguage.toLowerCase() || selectedLanguage === 'all'
  );

  const currentStep = selectedTutorial?.steps[currentStepIndex];
  const progress = selectedTutorial ? (currentStepIndex / selectedTutorial.steps.length) * 100 : 0;

  useEffect(() => {
    if (isAutoPlay && selectedTutorial && currentStepIndex < selectedTutorial.steps.length - 1) {
      const timer = setTimeout(() => {
        nextStep();
      }, 10000); // Auto-advance every 10 seconds
      return () => clearTimeout(timer);
    }
  }, [isAutoPlay, currentStepIndex, selectedTutorial]);

  const startTutorial = (tutorial: Tutorial) => {
    setSelectedTutorial(tutorial);
    setCurrentStepIndex(0);
    setIsAutoPlay(false);
  };

  const nextStep = () => {
    if (!selectedTutorial) return;
    
    if (currentStepIndex < selectedTutorial.steps.length - 1) {
      const newIndex = currentStepIndex + 1;
      setCurrentStepIndex(newIndex);
      onProgressUpdate(selectedTutorial.id, newIndex);
      
      // Mark current step as completed
      if (currentStep) {
        setCompletedSteps(prev => [...prev, currentStep.id]);
      }
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500';
      case 'intermediate': return 'bg-yellow-500';
      case 'advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'html': return '🏗️';
      case 'css': return '🎨';
      case 'javascript': return '⚡';
      case 'responsive': return '📱';
      case 'accessibility': return '♿';
      default: return '📚';
    }
  };

  if (selectedTutorial && currentStep) {
    return (
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button variant="ghost" onClick={() => setSelectedTutorial(null)}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div>
                <CardTitle className="text-lg">{selectedTutorial.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Step {currentStepIndex + 1} of {selectedTutorial.steps.length}: {currentStep.title}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAutoPlay(!isAutoPlay)}
              >
                {isAutoPlay ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {isAutoPlay ? 'Pause' : 'Auto'}
              </Button>
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
          
          <Tabs defaultValue="code" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="code">
                <Code2 className="h-4 w-4 mr-2" />
                Code
              </TabsTrigger>
              <TabsTrigger value="explanation">
                <BookOpen className="h-4 w-4 mr-2" />
                Explanation
              </TabsTrigger>
              <TabsTrigger value="tips">
                <Lightbulb className="h-4 w-4 mr-2" />
                Tips
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="code" className="space-y-3">
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-sm font-mono whitespace-pre-wrap overflow-x-auto">
                  {currentStep.code}
                </pre>
              </div>
            </TabsContent>
            
            <TabsContent value="explanation" className="space-y-3">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm">{currentStep.explanation}</p>
                
                {currentStep.highlights && (
                  <div className="mt-4">
                    <h5 className="font-medium mb-2">Key Concepts:</h5>
                    <div className="flex flex-wrap gap-2">
                      {currentStep.highlights.map((highlight, index) => (
                        <Badge key={index} variant="secondary" className="font-mono text-xs">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="tips" className="space-y-3">
              {currentStep.tips && (
                <div className="space-y-2">
                  {currentStep.tips.map((tip, index) => (
                    <div key={index} className="flex items-start space-x-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <span className="text-yellow-600 mt-0.5">💡</span>
                      <p className="text-sm">{tip}</p>
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
              {currentStepIndex + 1} / {selectedTutorial.steps.length}
            </span>
            
            <Button
              onClick={nextStep}
              disabled={currentStepIndex === selectedTutorial.steps.length - 1}
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
          <BookOpen className="h-5 w-5 text-blue-500" />
          <span>Step-by-Step Tutorials</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          {filteredTutorials.map((tutorial) => (
            <Card key={tutorial.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-lg">{getCategoryIcon(tutorial.category)}</span>
                    <h3 className="font-semibold">{tutorial.title}</h3>
                    <div className={`w-2 h-2 rounded-full ${getDifficultyColor(tutorial.difficulty)}`}></div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">{tutorial.description}</p>
                  
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>⏱️ {tutorial.estimatedTime} min</span>
                    <span>📝 {tutorial.steps.length} steps</span>
                    <Badge variant="outline" className="text-xs">
                      {tutorial.difficulty}
                    </Badge>
                  </div>
                </div>
                
                <Button onClick={() => startTutorial(tutorial)}>
                  Start Tutorial
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
