import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Code, 
  Play, 
  CheckCircle, 
  XCircle, 
  Lightbulb, 
  ArrowLeft,
  Trophy,
  BookOpen,
  Target,
  Star,
  Zap,
  Brain,
  Award,
  TrendingUp,
  Clock,
  ChevronRight,
  Lock,
  RotateCcw
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { LANGUAGE_CHALLENGES } from "@/data/challenges";
import ChallengePanel from "@/components/ChallengePanel";
import CodeEditor from "@/components/CodeEditor";

interface UserProgress {
  [language: string]: {
    completedChallenges: number[];
    currentChallenge: number;
    totalTimeSpent: number;
    skillLevel: "Beginner" | "Intermediate" | "Advanced" | "Expert";
    achievements: string[];
  };
}

export default function Learn() {
  const { language } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [userCode, setUserCode] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; output: string; message: string; actualOutput?: string } | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [timeSpent, setTimeSpent] = useState(0);
  
  // Load user progress from localStorage
  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('codelearning-progress');
    return saved ? JSON.parse(saved) : {};
  });

  const languageChallenges = LANGUAGE_CHALLENGES[language || 'python'] || LANGUAGE_CHALLENGES.python;
  const currentChallenge = languageChallenges[currentChallengeIndex];
  
  const currentLanguageProgress = userProgress[language || 'python'] || {
    completedChallenges: [],
    currentChallenge: 0,
    totalTimeSpent: 0,
    skillLevel: "Beginner" as const,
    achievements: []
  };

  const progress = (currentLanguageProgress.completedChallenges.length / languageChallenges.length) * 100;

  useEffect(() => {
    if (currentChallenge) {
      setUserCode(currentChallenge.starterCode);
      setStartTime(new Date());
    }
  }, [currentChallenge]);

  useEffect(() => {
    // Set current challenge to the first uncompleted one
    const firstIncomplete = languageChallenges.findIndex(
      (_, index) => !currentLanguageProgress.completedChallenges.includes(index)
    );
    if (firstIncomplete !== -1) {
      setCurrentChallengeIndex(firstIncomplete);
    }
  }, [language, currentLanguageProgress.completedChallenges]);

  // Save progress to localStorage
  const saveProgress = (newProgress: UserProgress) => {
    localStorage.setItem('codelearning-progress', JSON.stringify(newProgress));
    setUserProgress(newProgress);
  };

  const runCode = async () => {
    setIsRunning(true);
    
    setTimeout(() => {
      const trimmedCode = userCode.trim();
      const { isCorrect, actualOutput } = checkSolution(trimmedCode);
      
      setTestResult({
        success: isCorrect,
        output: currentChallenge.expectedOutput,
        actualOutput: actualOutput,
        message: isCorrect 
          ? "Excellent! Your solution is correct!" 
          : "Not quite right. Check the hints and try again."
      });
      
      setIsRunning(false);
      
        if (isCorrect && startTime) {
        const timeSpentOnChallenge = Date.now() - startTime.getTime();
        
        // Update progress
        const newProgress = { ...userProgress };
        const langKey = language || 'python';
        
        if (!newProgress[langKey]) {
          newProgress[langKey] = {
            completedChallenges: [],
            currentChallenge: 0,
            totalTimeSpent: 0,
            skillLevel: "Beginner",
            achievements: []
          };
        }
        
        // Mark challenge as completed
        if (!newProgress[langKey].completedChallenges.includes(currentChallengeIndex)) {
          newProgress[langKey].completedChallenges.push(currentChallengeIndex);
          newProgress[langKey].totalTimeSpent += timeSpentOnChallenge;
          
          // Check for achievements
          const completedCount = newProgress[langKey].completedChallenges.length;
          const newAchievements = [];
          
          if (completedCount === 1 && !newProgress[langKey].achievements.includes("First Steps")) {
            newAchievements.push("First Steps");
          }
          if (completedCount === 10 && !newProgress[langKey].achievements.includes("Getting Started")) {
            newAchievements.push("Getting Started");
          }
          if (completedCount === 50 && !newProgress[langKey].achievements.includes("Dedicated Learner")) {
            newAchievements.push("Dedicated Learner");
          }
          
          newProgress[langKey].achievements.push(...newAchievements);
          
          // Update skill level
          if (completedCount >= 200) newProgress[langKey].skillLevel = "Expert";
          else if (completedCount >= 100) newProgress[langKey].skillLevel = "Advanced";
          else if (completedCount >= 50) newProgress[langKey].skillLevel = "Intermediate";
          
          saveProgress(newProgress);
          
          if (newAchievements.length > 0) {
            toast({
              title: "🏆 Achievement Unlocked!",
              description: newAchievements.join(", "),
            });
          }
        }
        
        toast({
          title: "Challenge Completed!",
          description: "Great job! Keep up the excellent work.",
        });
        
        // Move to next challenge after a short delay
        setTimeout(() => {
          const nextIncomplete = languageChallenges.findIndex(
            (_, index) => index > currentChallengeIndex && 
            !newProgress[langKey].completedChallenges.includes(index)
          );
          
          if (nextIncomplete !== -1) {
            setCurrentChallengeIndex(nextIncomplete);
            setTestResult(null);
          }
        }, 2000);
      }
    }, 1500);
  };

  const checkSolution = (code: string): { isCorrect: boolean; actualOutput: string } => {
    const challenge = currentChallenge;
    const normalizedCode = code.toLowerCase().replace(/\s+/g, ' ').trim();
    
    // Simulate code execution to get output
    let actualOutput = "";
    let isCorrect = false;
    
    // Prevent empty or unchanged code from being correct
    if (code.trim() === "" || code.trim() === challenge.starterCode.trim()) {
      return { isCorrect: false, actualOutput: "No output - code is empty or unchanged" };
    }
    
    try {
      // Language-specific validation with strict checks
      if (language === 'python') {
        if (challenge.title.includes("Hello World")) {
          isCorrect = normalizedCode.includes("print(") && 
                     (normalizedCode.includes("hello world") || normalizedCode.includes("'hello world'") || normalizedCode.includes('"hello world"'));
          actualOutput = isCorrect ? "Hello World" : "No output or wrong text";
        } else if (challenge.title.includes("Variables")) {
          const hasValidVariable = normalizedCode.includes("=") && 
                                 (normalizedCode.includes("name") && normalizedCode.includes("print"));
          isCorrect = hasValidVariable;
          actualOutput = isCorrect ? "Variable declared and printed" : "Missing variable declaration or print statement";
        } else if (challenge.title.includes("Addition")) {
          isCorrect = normalizedCode.includes("+") && normalizedCode.includes("print");
          actualOutput = isCorrect ? "Sum calculated" : "Missing addition or print";
        } else if (challenge.title.includes("Loop")) {
          isCorrect = normalizedCode.includes("for") && normalizedCode.includes("range") && normalizedCode.includes("print");
          actualOutput = isCorrect ? "Loop executed" : "Missing proper for loop with range";
        } else if (challenge.title.includes("Function")) {
          isCorrect = normalizedCode.includes("def ") && normalizedCode.includes("return");
          actualOutput = isCorrect ? "Function defined" : "Missing function definition or return statement";
        }
      } else if (language === 'javascript') {
        if (challenge.title.includes("Hello World")) {
          isCorrect = normalizedCode.includes("console.log(") && 
                     (normalizedCode.includes("hello world") || normalizedCode.includes("'hello world'") || normalizedCode.includes('"hello world"'));
          actualOutput = isCorrect ? "Hello World" : "No output or wrong text";
        } else if (challenge.title.includes("Variables")) {
          isCorrect = (normalizedCode.includes("let ") || normalizedCode.includes("const ")) && 
                     normalizedCode.includes("=") && normalizedCode.includes("console.log");
          actualOutput = isCorrect ? "Variable declared and logged" : "Missing variable declaration or console.log";
        } else if (challenge.title.includes("Arrow Functions")) {
          isCorrect = normalizedCode.includes("=>") && normalizedCode.includes("const ");
          actualOutput = isCorrect ? "Arrow function defined" : "Missing arrow function syntax";
        } else if (challenge.title.includes("Template Literals")) {
          isCorrect = normalizedCode.includes("`") && normalizedCode.includes("${");
          actualOutput = isCorrect ? "Template literal used" : "Missing template literal syntax";
        }
      }
      
      // If no specific check matched, return false
      if (actualOutput === "") {
        actualOutput = "Challenge type not recognized or incomplete code";
        isCorrect = false;
      }
      
    } catch (error) {
      actualOutput = "Error in code execution";
      isCorrect = false;
    }
    
    return { isCorrect, actualOutput };
  };

  const resetChallenge = () => {
    setUserCode(currentChallenge.starterCode);
    setTestResult(null);
    setStartTime(new Date());
  };

  const goToChallenge = (index: number) => {
    // Allow going to any completed challenge or the next incomplete one
    const isAccessible = currentLanguageProgress.completedChallenges.includes(index) ||
                        index === currentLanguageProgress.completedChallenges.length;
    
    if (isAccessible) {
      setCurrentChallengeIndex(index);
      setTestResult(null);
    }
  };

  const getSkillLevelColor = (level: string) => {
    switch (level) {
      case "Expert": return "text-purple-500";
      case "Advanced": return "text-blue-500";
      case "Intermediate": return "text-green-500";
      default: return "text-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Enhanced Header */}
      <div className="border-b border-border bg-card/80 backdrop-blur-lg sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate("/")}
                className="hover:bg-muted"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
              
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-primary/20">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-xl font-bold capitalize">{language} Dashboard</h1>
                  <p className="text-sm text-muted-foreground">Master programming step by step</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-warning" />
                  <span className="text-sm font-medium">
                    {currentLanguageProgress.completedChallenges.length} / {languageChallenges.length}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground capitalize">
                  {currentLanguageProgress.skillLevel} Level
                </div>
              </div>
              <Progress value={progress} className="w-32" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 h-[calc(100vh-12rem)]">
          {/* Challenge Navigation Sidebar */}
          <div className="xl:col-span-1">
            <Card className="h-full">
              <div className="p-4 border-b border-border">
                <h3 className="font-semibold flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" />
                  Challenges
                </h3>
              </div>
              <div className="p-2 h-[calc(100%-80px)] overflow-y-auto space-y-1">
                {languageChallenges.slice(0, 100).map((challenge, index) => {
                  const isCompleted = currentLanguageProgress.completedChallenges.includes(index);
                  const isCurrent = index === currentChallengeIndex;
                  const isAccessible = isCompleted || index <= currentLanguageProgress.completedChallenges.length;
                  
                  return (
                    <Button
                      key={challenge.id}
                      variant={isCurrent ? "default" : "ghost"}
                      size="sm"
                      className={`w-full justify-start p-2 h-auto ${
                        !isAccessible ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      onClick={() => isAccessible && goToChallenge(index)}
                      disabled={!isAccessible}
                    >
                      <div className="flex items-center gap-2 w-full">
                        <div className="flex-shrink-0">
                          {isCompleted ? (
                            <CheckCircle className="h-4 w-4 text-success" />
                          ) : isAccessible ? (
                            <div className="h-4 w-4 rounded-full border-2 border-muted-foreground" />
                          ) : (
                            <Lock className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                        <div className="flex-1 text-left">
                          <div className="text-xs font-medium truncate">
                            {challenge.title}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {challenge.difficulty}
                          </div>
                        </div>
                      </div>
                    </Button>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="xl:col-span-3">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
              {/* Challenge Panel */}
              <div className="lg:col-span-1">
                <ChallengePanel 
                  challenge={currentChallenge} 
                  testResult={testResult}
                />
              </div>

              {/* Code Editor and Learning Resources */}
              <div className="lg:col-span-1 space-y-6">
                {/* Code Editor */}
                <Card className="flex-1">
                  <div className="p-4 border-b border-border">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Code Editor</h3>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline"
                          size="sm"
                          onClick={resetChallenge}
                        >
                          <RotateCcw className="h-4 w-4 mr-2" />
                          Reset
                        </Button>
                        <Button 
                          onClick={runCode}
                          disabled={isRunning}
                          className="bg-gradient-primary hover:shadow-lg transition-all duration-300"
                        >
                          {isRunning ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent mr-2" />
                              Running...
                            </>
                          ) : (
                            <>
                              <Play className="h-4 w-4 mr-2" />
                              Run Code
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <CodeEditor 
                      value={userCode}
                      onChange={setUserCode}
                      language={language || 'python'}
                    />
                    
                    {/* Code Output Window */}
                    {testResult && (
                      <div className="border-t border-border pt-4">
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          <div className={`h-2 w-2 rounded-full ${testResult.success ? 'bg-success' : 'bg-destructive'}`} />
                          Output
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Expected Output:</p>
                            <div className="p-2 bg-muted/30 rounded font-mono text-sm">
                              {testResult.output}
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Your Output:</p>
                            <div className={`p-2 rounded font-mono text-sm ${
                              testResult.success ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
                            }`}>
                              {testResult.actualOutput}
                            </div>
                          </div>
                        </div>
                        <div className={`mt-3 p-2 rounded text-sm ${
                          testResult.success ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
                        }`}>
                          {testResult.message}
                        </div>
                      </div>
                    )}
                  </div>
                </Card>

                {/* Learning Resources */}
                <Card className="h-80">
                  <Tabs defaultValue="tips" className="h-full">
                    <div className="p-4 border-b border-border">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="tips" className="text-xs">
                          <Lightbulb className="h-3 w-3 mr-1" />
                          Tips
                        </TabsTrigger>
                        <TabsTrigger value="tricks" className="text-xs">
                          <Zap className="h-3 w-3 mr-1" />
                          Tricks
                        </TabsTrigger>
                        <TabsTrigger value="progress" className="text-xs">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          Stats
                        </TabsTrigger>
                      </TabsList>
                    </div>

                    <TabsContent value="tips" className="p-4 h-[calc(100%-80px)] overflow-y-auto">
                      <div className="space-y-3">
                        <h4 className="font-medium">Programming Tips:</h4>
                        <div className="space-y-2 text-sm">
                          <div className="p-2 bg-muted/50 rounded">
                            💡 Always write clean, readable code
                          </div>
                          <div className="p-2 bg-muted/50 rounded">
                            🔍 Test your code with different inputs
                          </div>
                          <div className="p-2 bg-muted/50 rounded">
                            📝 Use meaningful variable names
                          </div>
                          <div className="p-2 bg-muted/50 rounded">
                            🔄 Practice regularly to build muscle memory
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="tricks" className="p-4 h-[calc(100%-80px)] overflow-y-auto">
                      <div className="space-y-3">
                        <h4 className="font-medium">{language?.toUpperCase()} Tricks:</h4>
                        <div className="space-y-2 text-sm">
                          {language === 'python' && (
                            <>
                              <div className="p-2 bg-muted/50 rounded">
                                🐍 Use list comprehensions for cleaner code
                              </div>
                              <div className="p-2 bg-muted/50 rounded">
                                ⚡ Use f-strings for string formatting
                              </div>
                              <div className="p-2 bg-muted/50 rounded">
                                🔧 Use enumerate() for index-value pairs
                              </div>
                            </>
                          )}
                          {language === 'javascript' && (
                            <>
                              <div className="p-2 bg-muted/50 rounded">
                                🚀 Use arrow functions for concise syntax
                              </div>
                              <div className="p-2 bg-muted/50 rounded">
                                📦 Use destructuring for cleaner code
                              </div>
                              <div className="p-2 bg-muted/50 rounded">
                                🔄 Use async/await for better async code
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="progress" className="p-4 h-[calc(100%-80px)] overflow-y-auto">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Skill Level</span>
                          <Badge className={getSkillLevelColor(currentLanguageProgress.skillLevel)}>
                            {currentLanguageProgress.skillLevel}
                          </Badge>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Completed</span>
                            <span>{currentLanguageProgress.completedChallenges.length} challenges</span>
                          </div>
                          <Progress value={progress} />
                        </div>

                        <div className="space-y-2">
                          <h5 className="text-sm font-medium">Achievements</h5>
                          {currentLanguageProgress.achievements.length > 0 ? (
                            <div className="space-y-1">
                              {currentLanguageProgress.achievements.map((achievement, index) => (
                                <div key={index} className="flex items-center gap-2 text-xs">
                                  <Award className="h-3 w-3 text-warning" />
                                  {achievement}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-xs text-muted-foreground">Complete challenges to earn achievements!</p>
                          )}
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}