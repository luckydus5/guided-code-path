import { useState, useCallback, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Editor from "@monaco-editor/react";
import { 
  Play, 
  TerminalSquare, 
  RefreshCw, 
  Download, 
  Save, 
  Sun, 
  Moon, 
  BookOpen,
  Code,
  CheckCircle,
  XCircle,
  Lightbulb,
  Trophy,
  Target
} from "lucide-react";
import { usePyodide } from "@/hooks/usePyodide";
import { useToast } from "@/hooks/use-toast";

interface PythonLearningEnvironmentProps {
  projectId?: string;
  projectTitle?: string;
  initialCode?: string;
  onSave?: (code: string) => void;
  onComplete?: () => void;
}

interface Lesson {
  id: string;
  title: string;
  description: string;
  code: string;
  expectedOutput?: string;
  hints?: string[];
}

const pythonLessons: Lesson[] = [
  {
    id: "hello-world",
    title: "Hello World",
    description: "Your first Python program! Print a message to the console.",
    code: `# Welcome to Python! 🐍
# This is a comment - it doesn't run as code
# Let's print our first message

print("Hello, World!")
print("Welcome to Python programming!")`,
    expectedOutput: "Hello, World!\nWelcome to Python programming!",
    hints: [
      "Use print() to display text",
      "Text must be in quotes",
      "Comments start with #"
    ]
  },
  {
    id: "variables",
    title: "Variables and Data Types",
    description: "Learn how to store and use data in Python.",
    code: `# Variables store data
name = "Alice"
age = 25
height = 5.6
is_student = True

# Print variables
print("Name:", name)
print("Age:", age)
print("Height:", height)
print("Is student:", is_student)

# You can change variables
age = age + 1
print("Next year age:", age)`,
    expectedOutput: "Name: Alice\nAge: 25\nHeight: 5.6\nIs student: True\nNext year age: 26",
    hints: [
      "Variables don't need type declarations",
      "Use = to assign values",
      "Strings use quotes, numbers don't"
    ]
  },
  {
    id: "math-operations",
    title: "Math Operations",
    description: "Perform calculations with Python.",
    code: `# Basic math operations
a = 10
b = 3

print("Addition:", a + b)
print("Subtraction:", a - b)
print("Multiplication:", a * b)
print("Division:", a / b)
print("Integer division:", a // b)
print("Remainder:", a % b)
print("Power:", a ** b)`,
    expectedOutput: "Addition: 13\nSubtraction: 7\nMultiplication: 30\nDivision: 3.333...\nInteger division: 3\nRemainder: 1\nPower: 1000",
    hints: [
      "Use +, -, *, / for basic operations",
      "// gives integer division",
      "% gives remainder (modulo)",
      "** is for exponents"
    ]
  },
  {
    id: "loops",
    title: "For Loops",
    description: "Repeat code multiple times with loops.",
    code: `# For loops repeat code
print("Counting to 5:")
for i in range(5):
    print("Number:", i)

print("\\nCounting from 1 to 3:")
for i in range(1, 4):
    print("Count:", i)

print("\\nEven numbers:")
for i in range(0, 10, 2):
    print(i)`,
    expectedOutput: "Counting to 5:\nNumber: 0\nNumber: 1\nNumber: 2\nNumber: 3\nNumber: 4\n\nCounting from 1 to 3:\nCount: 1\nCount: 2\nCount: 3\n\nEven numbers:\n0\n2\n4\n6\n8",
    hints: [
      "range(n) goes from 0 to n-1",
      "range(start, stop) goes from start to stop-1",
      "range(start, stop, step) allows custom increments",
      "Use \\n for new lines in strings"
    ]
  }
];

export default function PythonLearningEnvironment({ 
  projectId, 
  projectTitle, 
  initialCode, 
  onSave,
  onComplete 
}: PythonLearningEnvironmentProps) {
  const [code, setCode] = useState<string>(initialCode || pythonLessons[0].code);
  const [output, setOutput] = useState<string>("");
  const [isRunning, setIsRunning] = useState(false);
  const [theme, setTheme] = useState<'light' | 'vs-dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('python-learning-theme');
      if (saved === 'light' || saved === 'vs-dark') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'vs-dark' : 'light';
    }
    return 'vs-dark';
  });

  const [currentLessonId, setCurrentLessonId] = useState(pythonLessons[0].id);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [showHints, setShowHints] = useState(false);
  const [activeTab, setActiveTab] = useState<'lessons' | 'playground'>('lessons');

  const { toast } = useToast();

  const appendOut = useCallback((text: string) => {
    setOutput((prev) => prev + text);
  }, []);

  const { ready, runPython } = usePyodide({
    onStdout: appendOut,
    onStderr: appendOut,
  });

  const currentLesson = pythonLessons.find(lesson => lesson.id === currentLessonId) || pythonLessons[0];

  useEffect(() => {
    if (activeTab === 'lessons') {
      setCode(currentLesson.code);
      setOutput("");
    }
  }, [currentLessonId, activeTab, currentLesson]);

  const handleRun = async () => {
    if (!ready) {
      toast({ 
        title: "Python Loading", 
        description: "Please wait for Python to finish loading." 
      });
      return;
    }
    
    setIsRunning(true);
    setOutput("");
    
    try {
      await runPython(code);
      
      // Check if this completes a lesson
      if (activeTab === 'lessons' && !completedLessons.has(currentLessonId)) {
        setCompletedLessons(prev => new Set([...prev, currentLessonId]));
        toast({ 
          title: "Lesson Completed! 🎉", 
          description: `Great job completing "${currentLesson.title}"!` 
        });
        
        // Check if all lessons are completed
        if (completedLessons.size + 1 === pythonLessons.length) {
          setTimeout(() => {
            onComplete?.();
            toast({ 
              title: "All Lessons Completed! 🏆", 
              description: "You've mastered the Python basics!" 
            });
          }, 1000);
        }
      }
      
    } catch (e: any) {
      appendOut(`\nError: ${e?.message || String(e)}\n`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleClearOutput = () => setOutput("");

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/x-python' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(projectTitle || currentLesson.title || 'python_code').toLowerCase().replace(/\s+/g, '_')}.py`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const toggleTheme = () => {
    const next = theme === 'vs-dark' ? 'light' : 'vs-dark';
    setTheme(next);
    localStorage.setItem('python-learning-theme', next);
  };

  const handleSave = () => {
    onSave?.(code);
    toast({ title: "Code Saved", description: "Your Python code has been saved." });
  };

  const progressPercentage = (completedLessons.size / pythonLessons.length) * 100;

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-card/80 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <BookOpen className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Python Learning Environment</h2>
          {projectId && <Badge variant="outline">Project: {projectId}</Badge>}
          <Badge variant="secondary" className={ready ? 'bg-green-500/10 text-green-700' : 'opacity-70'}>
            {ready ? '🐍 Python Ready' : '⏳ Loading Python...'}
          </Badge>
          {completedLessons.size > 0 && (
            <Badge variant="default" className="bg-purple-500/10 text-purple-700">
              <Trophy className="h-3 w-3 mr-1" />
              {completedLessons.size}/{pythonLessons.length} Lessons
            </Badge>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={toggleTheme}>
            {theme === 'vs-dark' ? <Sun className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
            {theme === 'vs-dark' ? 'Light' : 'Dark'}
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button variant="outline" size="sm" onClick={handleSave} disabled={!onSave}>
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
          <Button onClick={handleRun} disabled={!ready || isRunning} className="bg-primary hover:bg-primary/90">
            {isRunning ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Play className="h-4 w-4 mr-2" />
            )}
            Run Code
          </Button>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Sidebar */}
        <div className="w-80 border-r bg-card/50">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'lessons' | 'playground')} className="h-full">
            <TabsList className="grid w-full grid-cols-2 m-2">
              <TabsTrigger value="lessons" className="text-xs">
                <Target className="h-3 w-3 mr-1" />
                Lessons
              </TabsTrigger>
              <TabsTrigger value="playground" className="text-xs">
                <Code className="h-3 w-3 mr-1" />
                Playground
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="lessons" className="m-0 h-full">
              <div className="p-3">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm text-muted-foreground">{completedLessons.size}/{pythonLessons.length}</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                </div>
                
                <ScrollArea className="h-[calc(100vh-240px)]">
                  <div className="space-y-2">
                    {pythonLessons.map((lesson) => (
                      <Card 
                        key={lesson.id}
                        className={`cursor-pointer transition-all hover:shadow-md ${
                          currentLessonId === lesson.id ? 'border-primary bg-primary/5' : ''
                        }`}
                        onClick={() => setCurrentLessonId(lesson.id)}
                      >
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-sm">{lesson.title}</h4>
                            {completedLessons.has(lesson.id) ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <div className="h-4 w-4 rounded-full border-2 border-muted-foreground/30" />
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">{lesson.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </TabsContent>
            
            <TabsContent value="playground" className="m-0 h-full">
              <div className="p-3">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Python Playground</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Write and experiment with your own Python code here. Try combining concepts from the lessons!
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Lesson Info (only in lessons mode) */}
          {activeTab === 'lessons' && (
            <div className="p-4 border-b bg-muted/30">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{currentLesson.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{currentLesson.description}</p>
                  
                  {currentLesson.hints && (
                    <div className="space-y-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setShowHints(!showHints)}
                        className="text-xs"
                      >
                        <Lightbulb className="h-3 w-3 mr-1" />
                        {showHints ? 'Hide Hints' : 'Show Hints'}
                      </Button>
                      
                      {showHints && (
                        <div className="space-y-1">
                          {currentLesson.hints.map((hint, index) => (
                            <div key={index} className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                              💡 {hint}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                {completedLessons.has(currentLessonId) && (
                  <Badge variant="default" className="bg-green-500/10 text-green-700">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Completed
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Editor and Console */}
          <div className="flex-1 grid grid-rows-2">
            {/* Editor */}
            <div className="border-b">
              <div className="h-full">
                <Editor
                  height="100%"
                  language="python"
                  value={code}
                  onChange={(val) => setCode(val || '')}
                  theme={theme}
                  options={{
                    fontSize: 14,
                    fontFamily: 'JetBrains Mono, Fira Code, Monaco, Consolas, monospace',
                    wordWrap: 'on',
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    tabSize: 4,
                    insertSpaces: true,
                    detectIndentation: false,
                    renderWhitespace: 'selection',
                    bracketPairColorization: { enabled: true },
                    guides: { bracketPairs: true, indentation: true },
                    suggest: { snippetsPreventQuickSuggestions: false },
                  }}
                />
              </div>
            </div>

            {/* Console */}
            <div className="flex flex-col">
              <div className="flex items-center justify-between p-2 border-b bg-card">
                <div className="flex items-center gap-2">
                  <TerminalSquare className="h-4 w-4" />
                  <span className="font-medium text-sm">Output Console</span>
                </div>
                <div className="flex items-center gap-2">
                  {!ready && (
                    <div className="w-32">
                      <Progress value={60} className="h-2" />
                    </div>
                  )}
                  <Button variant="ghost" size="sm" onClick={handleClearOutput} className="h-7 px-2 text-xs">
                    Clear
                  </Button>
                </div>
              </div>
              <ScrollArea className="flex-1 p-3 bg-muted/30 font-mono text-sm">
                <div className="whitespace-pre-wrap">
                  {output || (ready ? 'Ready to run Python code! Click "Run Code" or press Ctrl+Enter.' : 'Loading Python environment...')}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}