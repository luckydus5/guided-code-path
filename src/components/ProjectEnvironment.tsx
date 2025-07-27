import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  Play, 
  RefreshCw, 
  BookOpen, 
  CheckCircle,
  AlertCircle,
  Lightbulb,
  Target,
  Code2,
  Terminal
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CodeEditor from "./CodeEditor";
import { getProjectsByLanguage } from "@/data/projects";

export default function ProjectEnvironment() {
  const { language, projectId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const projects = getProjectsByLanguage(language || 'python');
  const project = projects.find(p => p.id === parseInt(projectId || '1'));

  // Sample project steps for the environment
  const projectSteps = [
    {
      title: "Project Setup",
      description: "Set up the basic structure and understand the requirements",
      code: `# ${project?.title || 'Sample Project'}
# ${project?.description || 'Build an amazing project'}

# TODO: Start by understanding the problem
print("Welcome to ${project?.title || 'your project'}!")`,
      explanation: `Welcome to your coding environment! In this step, you'll understand what we're building and set up the basic structure.

The goal is to: ${project?.description || 'Create a functional application'}

Key concepts you'll learn:
• Problem analysis and breakdown
• Code structure and organization
• Best practices for ${language || 'Python'} development`
    },
    {
      title: "Core Implementation",
      description: "Implement the main functionality",
      code: `# Step 2: Core Implementation
# Add your main logic here

def main():
    # Your code goes here
    pass

if __name__ == "__main__":
    main()`,
      explanation: `Now let's implement the core functionality. This is where the magic happens!

Focus on:
• Writing clean, readable code
• Following ${language || 'Python'} conventions
• Testing your logic step by step

Remember: Start simple and build complexity gradually.`
    },
    {
      title: "Testing & Refinement",
      description: "Test your implementation and make improvements",
      code: `# Step 3: Testing & Refinement
# Test your code and handle edge cases

# Add test cases
def test_functionality():
    # Write tests here
    assert True  # Replace with actual tests
    print("All tests passed!")

test_functionality()`,
      explanation: `Testing is crucial for reliable code! In this step you'll:

• Write test cases to verify your code works
• Handle edge cases and potential errors
• Refactor for better performance and readability

Good testing practices lead to robust applications.`
    }
  ];

  useEffect(() => {
    if (projectSteps[currentStep]) {
      setCode(projectSteps[currentStep].code);
    }
  }, [currentStep]);

  const runCode = async () => {
    setIsRunning(true);
    setOutput("Running code...\n");
    
    // Simulate code execution
    setTimeout(() => {
      try {
        // Mock output based on the code
        let result = "Code executed successfully!\n\n";
        
        if (code.includes("print")) {
          const printMatches = code.match(/print\([^)]*\)/g);
          if (printMatches) {
            printMatches.forEach(match => {
              const content = match.match(/print\(["']([^"']*)["']\)/);
              if (content) {
                result += content[1] + "\n";
              }
            });
          }
        }
        
        result += "\n✅ Code completed without errors";
        setOutput(result);
        
        toast({
          title: "Code executed successfully!",
          description: "Great work! Your code ran without errors.",
        });
      } catch (error) {
        setOutput("❌ Error: " + (error as Error).message);
      }
      setIsRunning(false);
    }, 2000);
  };

  const completeStep = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps(prev => [...prev, currentStep]);
      toast({
        title: "Step completed!",
        description: `Great job completing step ${currentStep + 1}!`,
      });
    }
  };

  const nextStep = () => {
    if (currentStep < projectSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center">
        <Card className="p-8 text-center">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Project Not Found</h2>
          <p className="text-muted-foreground mb-4">The requested project could not be found.</p>
          <Button onClick={() => navigate(`/learn/${language}`)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </Button>
        </Card>
      </div>
    );
  }

  const progress = Math.round((completedSteps.length / projectSteps.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <div className="border-b border-border bg-card/80 backdrop-blur-lg sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate(`/learn/${language}`)}
                className="hover:bg-muted"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Projects
              </Button>
              
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-primary/20">
                  <Code2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">{project.title}</h1>
                  <p className="text-sm text-muted-foreground capitalize">{language} • {project.difficulty}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm font-medium">Progress: {progress}%</div>
                <div className="text-xs text-muted-foreground">
                  Step {currentStep + 1} of {projectSteps.length}
                </div>
              </div>
              <div className="w-32">
                <Progress value={progress} className="h-2" />
              </div>
              <Badge variant="outline" className="capitalize">
                {project.difficulty}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-140px)]">
          {/* Instructions Panel */}
          <div className="lg:col-span-1">
            <Card className="h-full flex flex-col">
              <Tabs defaultValue="instructions" className="flex-1 flex flex-col">
                <TabsList className="grid w-full grid-cols-2 m-4 mb-0">
                  <TabsTrigger value="instructions">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Instructions
                  </TabsTrigger>
                  <TabsTrigger value="hints">
                    <Lightbulb className="h-4 w-4 mr-2" />
                    Hints
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="instructions" className="flex-1 p-4 pt-2">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                        <Target className="h-5 w-5 text-primary" />
                        {projectSteps[currentStep].title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        {projectSteps[currentStep].description}
                      </p>
                    </div>
                    
                    <div className="prose prose-sm max-w-none">
                      <div className="bg-muted/50 rounded-lg p-4">
                        {projectSteps[currentStep].explanation.split('\n').map((line, idx) => (
                          <p key={idx} className="mb-2 last:mb-0">{line}</p>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="hints" className="flex-1 p-4 pt-2">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">💡 Helpful Tips</h3>
                    <div className="space-y-3">
                      <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                        <h4 className="font-medium text-blue-900 dark:text-blue-100">Getting Started</h4>
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                          Read the code comments carefully - they guide you through what to implement.
                        </p>
                      </div>
                      <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-3">
                        <h4 className="font-medium text-green-900 dark:text-green-100">Testing</h4>
                        <p className="text-sm text-green-700 dark:text-green-300">
                          Run your code frequently to catch errors early and see your progress.
                        </p>
                      </div>
                      <div className="bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded-lg p-3">
                        <h4 className="font-medium text-purple-900 dark:text-purple-100">Best Practices</h4>
                        <p className="text-sm text-purple-700 dark:text-purple-300">
                          Write clean, readable code with meaningful variable names and comments.
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Step Navigation */}
              <div className="p-4 border-t border-border">
                <div className="flex gap-2 mb-3">
                  {projectSteps.map((_, idx) => (
                    <div 
                      key={idx}
                      className={`h-2 flex-1 rounded ${
                        completedSteps.includes(idx) 
                          ? 'bg-success' 
                          : idx === currentStep 
                            ? 'bg-primary' 
                            : 'bg-muted'
                      }`}
                    />
                  ))}
                </div>
                
                <div className="flex justify-between gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={prevStep}
                    disabled={currentStep === 0}
                  >
                    Previous
                  </Button>
                  
                  <Button 
                    size="sm"
                    onClick={completeStep}
                    disabled={completedSteps.includes(currentStep)}
                  >
                    {completedSteps.includes(currentStep) ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Completed
                      </>
                    ) : (
                      'Mark Complete'
                    )}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={nextStep}
                    disabled={currentStep === projectSteps.length - 1}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Code Editor and Output */}
          <div className="lg:col-span-2 space-y-4">
            {/* Code Editor */}
            <Card className="flex-1">
              <div className="p-4 border-b border-border flex items-center justify-between">
                <h3 className="font-semibold flex items-center gap-2">
                  <Code2 className="h-4 w-4" />
                  Code Editor
                </h3>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => setCode(projectSteps[currentStep].code)}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                  <Button size="sm" onClick={runCode} disabled={isRunning}>
                    <Play className="h-4 w-4 mr-2" />
                    {isRunning ? 'Running...' : 'Run Code'}
                  </Button>
                </div>
              </div>
              <div className="h-64">
                <CodeEditor 
                  value={code}
                  onChange={setCode}
                  language={language || 'python'}
                />
              </div>
            </Card>

            {/* Output Panel */}
            <Card className="flex-1">
              <div className="p-4 border-b border-border">
                <h3 className="font-semibold flex items-center gap-2">
                  <Terminal className="h-4 w-4" />
                  Output
                </h3>
              </div>
              <div className="h-48 p-4">
                <pre className="text-sm font-mono bg-muted/30 p-4 rounded-lg h-full overflow-auto">
                  {output || 'Click "Run Code" to see the output here...'}
                </pre>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}