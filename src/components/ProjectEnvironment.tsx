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
  Terminal,
  Trophy,
  Eye,
  EyeOff,
  Rocket,
  Share
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import MultiLanguageCodeEditor from "./MultiLanguageCodeEditor";
import LearningResources from "./LearningResources";
import DeploymentModal from "./DeploymentModal";
import { getProjectsByLanguage, getWebFundamentalsProjects } from "@/data/projects";
// Enhanced Learning Components
import { InteractiveChallenges } from "./InteractiveChallenges";
import { StepByStepTutorial } from "./StepByStepTutorial";
import { CodeValidator } from "./CodeValidator";
import { LearningPath } from "./LearningPath";
import { ModernDevTools } from "./ModernDevTools";

export default function ProjectEnvironment() {
  const { language, projectId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Handle navigation on refresh - preserve the current project state
  useEffect(() => {
    // Store current project path when component mounts
    if (language && projectId) {
      sessionStorage.setItem('current-project-path', window.location.pathname);
    }
  }, [language, projectId]);
  
  const [codeFiles, setCodeFiles] = useState<any>({});
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [startTime] = useState(Date.now());
  const [resetCount, setResetCount] = useState(0);
  const [isCodeHidden, setIsCodeHidden] = useState(false);
  const [showLearningPath, setShowLearningPath] = useState(false);
  const [showDeploymentModal, setShowDeploymentModal] = useState(false);

  const projects = language === 'web-fundamentals' 
    ? getWebFundamentalsProjects() 
    : getProjectsByLanguage(language || 'python');
  const project = projects.find(p => p.id === parseInt(projectId || '1'));
  
  // Check if this is a Web Fundamentals project
  const isWebFundamentalsProject = language === 'web-fundamentals';
  
  // Determine if this is a multi-language project
  const isWebProject = project?.technologies.some(tech => 
    ['HTML', 'CSS', 'JavaScript'].includes(tech)
  );
  const projectLanguages = isWebProject ? ['html', 'css', 'js'] : [language || 'python'];

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
      setCodeFiles(projectSteps[currentStep].code);
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
        
        // Handle different file types
        if (isWebProject) {
          result += "🌐 Web Project Output:\n";
          if (codeFiles.html) result += "✓ HTML structure loaded\n";
          if (codeFiles.css) result += "✓ CSS styles applied\n";
          if (codeFiles.js) result += "✓ JavaScript functionality active\n";
          
          // Check for console.log statements
          if (codeFiles.js?.includes("console.log")) {
            const logMatches = codeFiles.js.match(/console\.log\([^)]*\)/g);
            if (logMatches) {
              logMatches.forEach(match => {
                const content = match.match(/console\.log\(["']([^"']*)["']\)/);
                if (content) {
                  result += `Console: ${content[1]}\n`;
                }
              });
            }
          }
        } else {
          // Handle Python or other single-language projects
          const code = codeFiles[language || 'python'] || '';
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

  const completeStep = async () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps(prev => [...prev, currentStep]);
      toast({
        title: "Step completed!",
        description: `Great job completing step ${currentStep + 1}!`,
      });
      
      // If this is the last step, complete the project
      if (currentStep === projectSteps.length - 1) {
        await completeProject();
      }
    }
  };

  const completeProject = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to save your progress.",
          variant: "destructive"
        });
        return;
      }

      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      const skillsLearned = [
        ...project?.technologies || [],
        `${language} programming`,
        'Problem solving',
        'Code debugging'
      ];

      const { data, error } = await supabase
        .from('project_completions')
        .insert({
          user_id: user.id,
          project_id: projectId,
          language: language || 'python',
          final_code: codeFiles,
          time_spent_seconds: timeSpent,
          difficulty: project?.difficulty || 'beginner',
          skills_learned: skillsLearned
        })
        .select()
        .single();

      if (error) throw error;

      // Check for badge achievements
      await checkBadgeAchievements(data.id, timeSpent);

      // Add project completion to achievements
      await addProjectCompletionAchievement(data.id, project);

      toast({
        title: "🎉 Project Completed!",
        description: "Congratulations! Your achievement has been recorded. Redirecting...",
      });

      // Notify parent component about completion and redirect
      toast({
        title: "🎉 Project Completed!",
        description: "Great job! Your progress has been saved.",
      });
      
      setTimeout(() => {
        navigate(`/learn/${language}/project/${projectId}/preview`);
      }, 1500);

    } catch (error) {
      console.error('Error completing project:', error);
      toast({
        title: "Error saving completion",
        description: "Your project is complete, but we couldn't save it. Please try again.",
        variant: "destructive"
      });
    }
  };

  const checkBadgeAchievements = async (completionId: string, timeSpent: number) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Check for various badge criteria
      const badges = [];

      // First project badge
      const { count: projectCount } = await supabase
        .from('project_completions')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      if (projectCount === 1) {
        badges.push('First Steps');
      }

      // Speed coder badge (completed in under 2 hours)
      if (timeSpent < 7200) {
        badges.push('Speed Coder');
      }

      // Perfectionist badge (no resets)
      if (resetCount === 0) {
        badges.push('Perfectionist');
      }

      // Web Master badge (for web projects)
      if (isWebProject) {
        const { count: webProjectCount } = await supabase
          .from('project_completions')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id)
          .in('language', ['html', 'css', 'javascript']);

        if (webProjectCount >= 3) {
          badges.push('Web Master');
        }
      }

      // Award badges
      for (const badgeName of badges) {
        const { data: badge, error: badgeError } = await supabase
          .from('project_badges')
          .select('id')
          .eq('name', badgeName)
          .maybeSingle();

        if (badgeError) {
          console.error('Error fetching badge:', badgeError);
          continue;
        }

        if (badge) {
          await supabase
            .from('user_project_badges')
            .insert({
              user_id: user.id,
              badge_id: badge.id,
              project_completion_id: completionId
            });
        }
      }
    } catch (error) {
      console.error('Error checking badges:', error);
    }
  };

  const addProjectCompletionAchievement = async (completionId: string, project: any) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || !project) return;

      // For now, just show a success message
      // The actual achievement system can be expanded later with proper database schema
      toast({
        title: "🏆 Achievement Unlocked!",
        description: `"${project.title} Completed" - Great job finishing this project!`,
      });
      
      console.log(`Achievement: ${project.title} completed by user ${user.id}`);
    } catch (error) {
      console.error('Error adding project achievement:', error);
    }
  };

  const getDeploymentFiles = () => {
    // For web projects, include HTML structure
    if (project?.languages?.includes('html') || project?.languages?.includes('css') || project?.languages?.includes('javascript')) {
      const htmlContent = codeFiles.html || `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${project?.title || 'My Project'}</title>
    <style>
        ${codeFiles.css || '/* Add your CSS here */'}
    </style>
</head>
<body>
    ${codeFiles.html || '<h1>Hello World!</h1>'}
    <script>
        ${codeFiles.js || codeFiles.javascript || '// Add your JavaScript here'}
    </script>
</body>
</html>`;

      return [
        { name: 'index.html', content: htmlContent, language: 'html' },
        { name: 'style.css', content: codeFiles.css || '/* Add your CSS here */', language: 'css' },
        { name: 'script.js', content: codeFiles.js || codeFiles.javascript || '// Add your JavaScript here', language: 'javascript' }
      ];
    }

    // For single-language projects
    const getFileExtension = () => {
      switch (language) {
        case 'python': return 'py';
        case 'javascript': return 'js';
        case 'typescript': return 'ts';
        case 'java': return 'java';
        case 'cpp': return 'cpp';
        case 'c': return 'c';
        case 'csharp': return 'cs';
        case 'go': return 'go';
        case 'rust': return 'rs';
        case 'php': return 'php';
        case 'ruby': return 'rb';
        case 'swift': return 'swift';
        case 'kotlin': return 'kt';
        default: return 'txt';
      }
    };

    const fileName = `${project?.title?.toLowerCase().replace(/\s+/g, '_') || 'main'}.${getFileExtension()}`;
    const currentCode = codeFiles[language] || Object.values(codeFiles)[0] || `// ${project?.title || 'My Project'}\n// Add your code here`;
    
    return [
      { 
        name: fileName, 
        content: currentCode, 
        language: language 
      }
    ];
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
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsCodeHidden(!isCodeHidden)}
                className="flex items-center gap-2"
              >
                {isCodeHidden ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                {isCodeHidden ? 'Show Code' : 'Hide Code'}
              </Button>

              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowDeploymentModal(true)}
                className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-700 hover:from-blue-500/20 hover:to-purple-500/20 border-blue-200"
              >
                <Rocket className="h-4 w-4 mr-2" />
                Deploy
              </Button>

              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowDeploymentModal(true)}
              >
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-4 h-[calc(100vh-140px)] max-h-[650px] overflow-hidden">
        {isCodeHidden ? (
          <div className="h-full">
            <Card className="h-full overflow-hidden">
              <div className="p-3 border-b border-border flex items-center justify-between flex-shrink-0">
                <h3 className="font-semibold flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Full Page Preview
                </h3>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => {
                      setCodeFiles(projectSteps[currentStep].code);
                      setResetCount(prev => prev + 1);
                    }}
                    className="text-xs px-2 py-1 h-7"
                  >
                    <RefreshCw className="h-3 w-3 mr-1" />
                    Reset
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={runCode}
                    disabled={isRunning}
                    className="text-xs px-2 py-1 h-7"
                  >
                    <Play className="h-3 w-3 mr-1" />
                    {isRunning ? 'Running...' : 'Run'}
                  </Button>
                </div>
              </div>
              <div className="flex-1 min-h-0 bg-white">
                <div className="h-full w-full p-4 bg-gray-50 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-2">Project Preview</h3>
                    <p className="text-gray-600 mb-4">This is where your project output will be displayed</p>
                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <pre className="text-sm text-left">{output || 'Run your code to see the output here...'}</pre>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        ) : (
        <div className="flex gap-4 h-full">
          {/* Instructions Panel */}
          <div className="w-1/4 flex-shrink-0">
            <Card className="h-full overflow-hidden">
              <Tabs defaultValue="instructions" className="h-full flex flex-col">
                <TabsList className="grid w-full grid-cols-6 m-2 mb-0 text-xs flex-shrink-0 h-8">
                  <TabsTrigger value="instructions" className="text-xs p-1">
                    <BookOpen className="h-3 w-3 mr-1" />
                    Guide
                  </TabsTrigger>
                  <TabsTrigger value="hints" className="text-xs p-1">
                    <Lightbulb className="h-3 w-3 mr-1" />
                    Tips
                  </TabsTrigger>
                  <TabsTrigger value="resources" className="text-xs p-1">
                    <Target className="h-3 w-3 mr-1" />
                    Learn
                  </TabsTrigger>
                  <TabsTrigger value="challenges" className="text-xs p-1">
                    <Trophy className="h-3 w-3 mr-1" />
                    Challenges
                  </TabsTrigger>
                  <TabsTrigger value="tutorial" className="text-xs p-1">
                    <Play className="h-3 w-3 mr-1" />
                    Tutorial
                  </TabsTrigger>
                  <TabsTrigger value="tools" className="text-xs p-1">
                    <Terminal className="h-3 w-3 mr-1" />
                    Tools
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="instructions" className="flex-1 p-3 pt-2 overflow-y-auto">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-base mb-2 flex items-center gap-2">
                        <Target className="h-4 w-4 text-primary" />
                        {projectSteps[currentStep].title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3">
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
                          {isWebProject 
                            ? "Use the tabs to switch between HTML, CSS, and JavaScript files as you build your web project."
                            : "Read the code comments carefully - they guide you through what to implement."
                          }
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
                      {isWebProject && (
                        <div className="bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800 rounded-lg p-3">
                          <h4 className="font-medium text-orange-900 dark:text-orange-100">Web Development</h4>
                          <p className="text-sm text-orange-700 dark:text-orange-300">
                            Start with HTML structure, add CSS styling, then JavaScript functionality.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="resources" className="flex-1 p-0">
                  <LearningResources
                    projectTitle={project?.title || ''}
                    language={language || 'python'}
                    difficulty={project?.difficulty || 'beginner'}
                    technologies={project?.technologies || []}
                  />
                </TabsContent>

                {/* Interactive Challenges Tab */}
                <TabsContent value="challenges" className="flex-1 p-0 overflow-y-auto">
                  <InteractiveChallenges
                    language={language || 'web-fundamentals'}
                    onCompleteChallenge={(challengeId, points) => {
                      console.log('Challenge completed:', challengeId, 'Points:', points);
                      toast({
                        title: "Challenge Completed!",
                        description: `You earned ${points} points!`,
                      });
                    }}
                  />
                </TabsContent>

                {/* Step-by-Step Tutorial Tab */}
                <TabsContent value="tutorial" className="flex-1 p-0 overflow-y-auto">
                  <StepByStepTutorial
                    selectedLanguage={language || 'web-fundamentals'}
                    onProgressUpdate={(tutorialId, stepIndex) => {
                      console.log('Tutorial progress:', tutorialId, stepIndex);
                    }}
                  />
                </TabsContent>

                {/* Modern Dev Tools Tab */}
                <TabsContent value="tools" className="flex-1 p-0 overflow-y-auto">
                  <ModernDevTools
                    currentCode={{
                      html: '',
                      css: '',
                      javascript: ''
                    }}
                    onToolActivate={(toolId) => {
                      console.log('Tool activated:', toolId);
                    }}
                  />
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
          <div className="flex-1 flex flex-col gap-3 min-h-0">
            {/* Code Editor */}
            <Card className="flex-1 min-h-0 overflow-hidden">
              <div className="p-3 border-b border-border flex items-center justify-between flex-shrink-0">
                <h3 className="font-semibold flex items-center gap-2 text-sm">
                  <Code2 className="h-4 w-4" />
                  Code Editor
                </h3>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => {
                      setCodeFiles(projectSteps[currentStep].code);
                      setResetCount(prev => prev + 1);
                    }}
                    className="text-xs px-2 py-1 h-7"
                  >
                    <RefreshCw className="h-3 w-3 mr-1" />
                    Reset
                  </Button>
                  {currentStep === projectSteps.length - 1 && completedSteps.includes(currentStep) && (
                    <Button size="sm" onClick={completeProject} className="bg-gradient-primary text-xs px-2 py-1 h-7">
                      <Trophy className="h-3 w-3 mr-1" />
                      Complete
                    </Button>
                  )}
                </div>
              </div>
              {/* Start Fresh Message for Web Fundamentals */}
              {isWebFundamentalsProject && (
                <div className="p-2 bg-blue-50 dark:bg-blue-950/30 border-b border-blue-200 dark:border-blue-800 flex-shrink-0">
                  <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                    <Lightbulb className="h-3 w-3" />
                    <span className="text-xs font-medium">Start Fresh Instructions:</span>
                  </div>
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                    Delete all code in the environment and start the project from scratch. This is how you truly learn!
                  </p>
                </div>
              )}
              <div className="flex-1 min-h-0">
                <MultiLanguageCodeEditor
                  languages={projectLanguages}
                  initialCode={codeFiles}
                  onCodeChange={setCodeFiles}
                  onRun={runCode}
                  isRunning={isRunning}
                />
              </div>
              
              {/* Code Validator - Only show for web projects */}
              {isWebProject && (
                <div className="h-40 flex-shrink-0 mt-2">
                  <CodeValidator
                    code={codeFiles.html || codeFiles.css || codeFiles.js || ''}
                    language="html"
                    onValidationComplete={(results) => {
                      console.log('Validation results:', results);
                    }}
                  />
                </div>
              )}
            </Card>

            {/* Output Panel */}
            <Card className="h-32 flex-shrink-0 overflow-hidden">
              <div className="p-2 border-b border-border flex-shrink-0">
                <h3 className="font-semibold flex items-center gap-2 text-xs">
                  <Terminal className="h-3 w-3" />
                  Output
                </h3>
              </div>
              <div className="flex-1 p-2 min-h-0">
                <pre className="text-xs font-mono bg-muted/30 p-2 rounded-lg h-full overflow-auto">
                  {output || 'Click "Run Code" to see the output here...'}
                </pre>
              </div>
            </Card>
          </div>
        </div>
        )}
        
        {/* Floating Learning Path Button */}
        <Button
          className="fixed bottom-6 right-6 rounded-full w-12 h-12 shadow-lg z-50"
          onClick={() => setShowLearningPath(!showLearningPath)}
        >
          <Trophy className="h-5 w-5" />
        </Button>
        
        {/* Learning Path Overlay */}
        {showLearningPath && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-background rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-xl font-semibold">Learning Path Progress</h2>
                <Button variant="ghost" onClick={() => setShowLearningPath(false)}>
                  ×
                </Button>
              </div>
              <div className="overflow-y-auto max-h-[calc(90vh-100px)]">
                <LearningPath
                  onModuleStart={(moduleId) => {
                    console.log('Module started:', moduleId);
                    setShowLearningPath(false);
                  }}
                  onProgressUpdate={(progress) => {
                    console.log('Progress updated:', progress);
                    toast({
                      title: "Progress Updated!",
                      description: `Level ${progress.currentLevel} - ${progress.totalXP} XP`,
                    });
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Deployment Modal */}
      <DeploymentModal
        isOpen={showDeploymentModal}
        onClose={() => setShowDeploymentModal(false)}
        projectFiles={getDeploymentFiles()}
        projectTitle={project?.title || 'My Project'}
      />
    </div>
  );
}