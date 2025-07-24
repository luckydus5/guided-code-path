import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Code, 
  Play, 
  CheckCircle, 
  XCircle, 
  Lightbulb, 
  ArrowLeft,
  Bot,
  User,
  Sparkles
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Challenge {
  id: number;
  title: string;
  description: string;
  instructions: string;
  starterCode: string;
  expectedOutput: string;
  hints: string[];
  difficulty: "Easy" | "Medium" | "Hard";
}

interface ChatMessage {
  id: string;
  type: "ai" | "user";
  content: string;
  timestamp: Date;
}

// Mock challenges data
const pythonChallenges: Challenge[] = [
  {
    id: 1,
    title: "Hello World",
    description: "Your first Python program! Learn how to display text.",
    instructions: "Write a program that prints 'Hello, World!' to the console.",
    starterCode: "# Write your code here\n",
    expectedOutput: "Hello, World!",
    hints: [
      "Use the print() function to display text",
      "Put the text inside quotes: 'Hello, World!'",
      "Don't forget the comma and space after 'Hello'"
    ],
    difficulty: "Easy"
  },
  {
    id: 2,
    title: "Variables and Numbers",
    description: "Learn how to store and use data in variables.",
    instructions: "Create a variable 'age' with value 25, then print it.",
    starterCode: "# Create a variable called 'age' and assign it the value 25\n# Then print the variable\n",
    expectedOutput: "25",
    hints: [
      "Use the = operator to assign values to variables",
      "Variable names can contain letters, numbers, and underscores",
      "Use print() to display the variable value"
    ],
    difficulty: "Easy"
  }
];

export default function Learn() {
  const { language } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [userCode, setUserCode] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; output: string; message: string } | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "ai",
      content: `Welcome to ${language?.toUpperCase()} learning! I'm your AI tutor. I'll guide you through each challenge step by step. Let's start with the basics!`,
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState("");

  const currentChallenge = pythonChallenges[currentChallengeIndex];
  const progress = ((currentChallengeIndex + 1) / pythonChallenges.length) * 100;

  useEffect(() => {
    if (currentChallenge) {
      setUserCode(currentChallenge.starterCode);
    }
  }, [currentChallenge]);

  const runCode = async () => {
    setIsRunning(true);
    
    // Simulate code execution
    setTimeout(() => {
      const trimmedCode = userCode.trim();
      const isCorrect = checkSolution(trimmedCode);
      
      setTestResult({
        success: isCorrect,
        output: isCorrect ? currentChallenge.expectedOutput : "No output or incorrect output",
        message: isCorrect 
          ? "Excellent! Your solution is correct!" 
          : "Not quite right. Check the hints and try again."
      });
      
      setIsRunning(false);
      
      if (isCorrect) {
        toast({
          title: "Challenge Completed!",
          description: "Great job! Moving to the next challenge.",
        });
        
        // Add AI congratulations message
        addAIMessage("🎉 Perfect! You solved it correctly. You're ready for the next challenge!");
        
        setTimeout(() => {
          if (currentChallengeIndex < pythonChallenges.length - 1) {
            setCurrentChallengeIndex(prev => prev + 1);
            setTestResult(null);
            addAIMessage(`Let's move on to: "${pythonChallenges[currentChallengeIndex + 1].title}". ${pythonChallenges[currentChallengeIndex + 1].description}`);
          }
        }, 2000);
      } else {
        addAIMessage("That's not quite right. Let me give you a hint: " + getRandomHint());
      }
    }, 1500);
  };

  const checkSolution = (code: string): boolean => {
    // Simple solution checking (in real app, this would be more sophisticated)
    if (currentChallenge.id === 1) {
      return code.includes("print") && code.includes("Hello, World!");
    } else if (currentChallenge.id === 2) {
      return code.includes("age") && code.includes("25") && code.includes("print");
    }
    return false;
  };

  const getRandomHint = (): string => {
    const hints = currentChallenge.hints;
    return hints[Math.floor(Math.random() * hints.length)];
  };

  const addAIMessage = (content: string) => {
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      type: "ai",
      content,
      timestamp: new Date()
    };
    setChatMessages(prev => [...prev, newMsg]);
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    
    // Add user message
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: newMessage,
      timestamp: new Date()
    };
    setChatMessages(prev => [...prev, userMsg]);
    setNewMessage("");
    
    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I understand your question. Try breaking down the problem into smaller steps.",
        "That's a great question! Remember to check the challenge instructions carefully.",
        "Look at the starter code - it gives you a good foundation to build on.",
        "Don't worry, everyone struggles with this at first. You're doing great!",
        `For this challenge, focus on ${currentChallenge.title.toLowerCase()}. Check the hints if you need help.`
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      addAIMessage(randomResponse);
    }, 1000);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-success text-success-foreground";
      case "Medium": return "bg-warning text-warning-foreground";
      case "Hard": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
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
                <Code className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-semibold capitalize">{language} Learning</h1>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground">
                Challenge {currentChallengeIndex + 1} of {pythonChallenges.length}
              </div>
              <Progress value={progress} className="w-32" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-12rem)]">
          {/* Challenge Panel */}
          <div className="lg:col-span-1">
            <Card className="h-full p-6 overflow-y-auto">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">{currentChallenge.title}</h2>
                  <Badge className={getDifficultyColor(currentChallenge.difficulty)}>
                    {currentChallenge.difficulty}
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-4">{currentChallenge.description}</p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Instructions:</h3>
                  <p className="text-sm">{currentChallenge.instructions}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-warning" />
                  Hints
                </h3>
                <div className="space-y-2">
                  {currentChallenge.hints.map((hint, index) => (
                    <div key={index} className="text-sm text-muted-foreground bg-card border rounded-lg p-3">
                      {hint}
                    </div>
                  ))}
                </div>
              </div>

              {testResult && (
                <div className={`p-4 rounded-lg mb-4 ${testResult.success ? 'bg-success/20 border border-success/50' : 'bg-destructive/20 border border-destructive/50'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    {testResult.success ? (
                      <CheckCircle className="h-5 w-5 text-success" />
                    ) : (
                      <XCircle className="h-5 w-5 text-destructive" />
                    )}
                    <span className="font-semibold">{testResult.message}</span>
                  </div>
                  <div className="text-sm opacity-80">
                    Output: {testResult.output}
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Code Editor */}
          <div className="lg:col-span-1">
            <Card className="h-full flex flex-col">
              <div className="p-4 border-b border-border">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Code Editor</h3>
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

              <div className="flex-1 p-4">
                <Textarea
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value)}
                  placeholder="Write your code here..."
                  className="h-full font-mono text-sm resize-none bg-editor-background text-foreground border-border"
                  style={{ minHeight: '400px' }}
                />
              </div>
            </Card>
          </div>

          {/* AI Chat */}
          <div className="lg:col-span-1">
            <Card className="h-full flex flex-col">
              <div className="p-4 border-b border-border">
                <h3 className="font-semibold flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  AI Tutor Chat
                </h3>
              </div>

              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {chatMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex gap-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`p-2 rounded-full ${message.type === 'ai' ? 'bg-primary/20' : 'bg-secondary/20'}`}>
                        {message.type === 'ai' ? (
                          <Bot className="h-4 w-4 text-primary" />
                        ) : (
                          <User className="h-4 w-4 text-secondary" />
                        )}
                      </div>
                      <div
                        className={`p-3 rounded-lg ${
                          message.type === 'ai' 
                            ? 'bg-muted text-foreground' 
                            : 'bg-primary text-primary-foreground'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-border">
                <div className="flex gap-2">
                  <Textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Ask your AI tutor anything..."
                    className="resize-none"
                    rows={2}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                  />
                  <Button onClick={sendMessage} size="sm" className="self-end">
                    Send
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}