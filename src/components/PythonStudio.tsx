import { useState, useCallback, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import Editor from "@monaco-editor/react";
import { 
  Play, 
  TerminalSquare, 
  RefreshCw, 
  Download, 
  Save, 
  Sun, 
  Moon, 
  FileText,
  FolderOpen,
  Plus,
  Trash2,
  Folder,
  File,
  X
} from "lucide-react";
import { usePyodide } from "@/hooks/usePyodide";
import { useToast } from "@/hooks/use-toast";

interface PythonFile {
  id: string;
  name: string;
  content: string;
  type: 'file' | 'folder';
  parentId?: string;
}

interface PythonStudioProps {
  projectId?: string;
  projectTitle?: string;
  initialFiles?: PythonFile[];
  onSave?: (files: PythonFile[]) => void;
}

const DEFAULT_FILES: PythonFile[] = [
  {
    id: '1',
    name: 'main.py',
    content: `# Welcome to Python Studio! 🐍
# This is a full-featured Python development environment

def main():
    print("Hello, Python World!")
    
    # Variables and data types
    name = "Python Developer"
    age = 25
    height = 5.8
    is_programmer = True
    
    print(f"Name: {name}")
    print(f"Age: {age}")
    print(f"Height: {height}ft")
    print(f"Is Programmer: {is_programmer}")
    
    # Lists and loops
    languages = ["Python", "JavaScript", "Java", "C++"]
    print("\\nProgramming Languages:")
    for i, lang in enumerate(languages, 1):
        print(f"{i}. {lang}")
    
    # Dictionary
    person = {
        "name": name,
        "skills": languages,
        "experience": age - 18
    }
    
    print(f"\\nPerson info: {person}")

if __name__ == "__main__":
    main()
`,
    type: 'file'
  },
  {
    id: '2',
    name: 'utils.py',
    content: `# Utility functions for your project

def calculate_average(numbers):
    """Calculate the average of a list of numbers."""
    if not numbers:
        return 0
    return sum(numbers) / len(numbers)

def format_currency(amount):
    """Format a number as currency."""
    return f"${'{'}{amount:,.2f{'}'}"

def validate_email(email):
    """Basic email validation."""
    return "@" in email and "." in email.split("@")[1]

# Example usage
if __name__ == "__main__":
    # Test the functions
    nums = [10, 20, 30, 40, 50]
    avg = calculate_average(nums)
    print(f"Average of {nums}: {avg}")
    
    price = 1234.56
    print(f"Price: {format_currency(price)}")
    
    emails = ["test@example.com", "invalid-email", "user@domain.org"]
    for email in emails:
        status = "Valid" if validate_email(email) else "Invalid"
        print(f"{email}: {status}")
`,
    type: 'file'
  },
  {
    id: '3',
    name: 'data_analysis.py',
    content: `# Data Analysis Examples
import json

def analyze_data():
    """Analyze sample data and show Python data manipulation."""
    
    # Sample data - student grades
    students = [
        {"name": "Alice", "grades": [85, 92, 78, 96]},
        {"name": "Bob", "grades": [79, 85, 88, 91]},
        {"name": "Charlie", "grades": [95, 89, 92, 88]},
        {"name": "Diana", "grades": [88, 94, 87, 93]}
    ]
    
    print("📊 Student Grade Analysis")
    print("-" * 40)
    
    for student in students:
        name = student["name"]
        grades = student["grades"]
        
        average = sum(grades) / len(grades)
        highest = max(grades)
        lowest = min(grades)
        
        print(f"\\n{name}:")
        print(f"  Grades: {grades}")
        print(f"  Average: {average:.1f}")
        print(f"  Highest: {highest}")
        print(f"  Lowest: {lowest}")
        print(f"  Grade: {get_letter_grade(average)}")
    
    # Class statistics
    all_grades = [grade for student in students for grade in student["grades"]]
    class_average = sum(all_grades) / len(all_grades)
    
    print(f"\\n🏆 Class Statistics:")
    print(f"Class Average: {class_average:.1f}")
    print(f"Total Students: {len(students)}")
    print(f"Total Grades: {len(all_grades)}")

def get_letter_grade(average):
    """Convert numeric grade to letter grade."""
    if average >= 90:
        return "A"
    elif average >= 80:
        return "B"
    elif average >= 70:
        return "C"
    elif average >= 60:
        return "D"
    else:
        return "F"

if __name__ == "__main__":
    analyze_data()
`,
    type: 'file'
  }
];

export default function PythonStudio({ projectId, projectTitle, initialFiles, onSave }: PythonStudioProps) {
  const [files, setFiles] = useState<PythonFile[]>(initialFiles || DEFAULT_FILES);
  const [activeFileId, setActiveFileId] = useState<string>(files[0]?.id || '1');
  const [output, setOutput] = useState<string>("");
  const [isRunning, setIsRunning] = useState(false);
  const [newFileName, setNewFileName] = useState("");
  const [showNewFileInput, setShowNewFileInput] = useState(false);
  const [theme, setTheme] = useState<'light' | 'vs-dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('python-studio-theme');
      if (saved === 'light' || saved === 'vs-dark') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'vs-dark' : 'light';
    }
    return 'vs-dark';
  });

  const { toast } = useToast();

  const activeFile = useMemo(() => 
    files.find(f => f.id === activeFileId), 
    [files, activeFileId]
  );

  const appendOut = useCallback((text: string) => {
    setOutput((prev) => prev + text);
  }, []);

  const { ready, runPython } = usePyodide({
    onStdout: appendOut,
    onStderr: (t) => appendOut(t),
  });

  const updateFileContent = (fileId: string, content: string) => {
    setFiles(prev => prev.map(file => 
      file.id === fileId ? { ...file, content } : file
    ));
  };

  const createNewFile = () => {
    if (!newFileName.trim()) return;
    
    const fileName = newFileName.endsWith('.py') ? newFileName : `${newFileName}.py`;
    const newFile: PythonFile = {
      id: Date.now().toString(),
      name: fileName,
      content: `# ${fileName}\n# Add your Python code here\n\nprint("Hello from ${fileName}!")`,
      type: 'file'
    };
    
    setFiles(prev => [...prev, newFile]);
    setActiveFileId(newFile.id);
    setNewFileName("");
    setShowNewFileInput(false);
    
    toast({
      title: "File created",
      description: `${fileName} has been created`
    });
  };

  const deleteFile = (fileId: string) => {
    if (files.length <= 1) {
      toast({
        title: "Cannot delete",
        description: "At least one file is required",
        variant: "destructive"
      });
      return;
    }
    
    const fileToDelete = files.find(f => f.id === fileId);
    setFiles(prev => prev.filter(f => f.id !== fileId));
    
    if (activeFileId === fileId) {
      const remainingFiles = files.filter(f => f.id !== fileId);
      setActiveFileId(remainingFiles[0]?.id || '');
    }
    
    toast({
      title: "File deleted",
      description: `${fileToDelete?.name} has been deleted`
    });
  };

  const handleRun = async () => {
    if (!ready || !activeFile) return;
    setIsRunning(true);
    setOutput("");
    
    try {
      // Create all files in the Python environment
      for (const file of files) {
        if (file.type === 'file' && file.name.endsWith('.py')) {
          // For files other than the active one, we need to make them available for import
          if (file.id !== activeFileId) {
            const moduleName = file.name.replace('.py', '');
            await runPython(`
# Creating module ${moduleName}
${file.content}
`);
          }
        }
      }
      
      // Run the active file
      await runPython(activeFile.content);
      
      toast({ 
        title: "Code executed", 
        description: `${activeFile.name} ran successfully.` 
      });
    } catch (e: any) {
      appendOut(`\\nError: ${e?.message || String(e)}\\n`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleSave = () => {
    onSave?.(files);
    toast({
      title: "Project saved",
      description: "All files have been saved successfully"
    });
  };

  const downloadProject = () => {
    files.forEach(file => {
      if (file.type === 'file') {
        const blob = new Blob([file.content], { type: 'text/x-python' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = file.name;
        a.click();
        URL.revokeObjectURL(url);
      }
    });
    
    toast({
      title: "Download complete",
      description: `${files.filter(f => f.type === 'file').length} files downloaded`
    });
  };

  const toggleTheme = () => {
    const next = theme === 'vs-dark' ? 'light' : 'vs-dark';
    setTheme(next);
    localStorage.setItem('python-studio-theme', next);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-card/80 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-green-500/20">
            <FileText className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Python Studio</h2>
            <div className="flex items-center gap-2">
              {projectId && <Badge variant="outline" className="text-xs">Project: {projectId}</Badge>}
              <Badge variant="secondary" className={`text-xs ${ready ? 'bg-green-500/20 text-green-700' : 'opacity-70'}`}>
                {ready ? '🐍 Python Ready' : '⏳ Loading Python…'}
              </Badge>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={toggleTheme}>
            {theme === 'vs-dark' ? <Sun className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
            {theme === 'vs-dark' ? 'Light' : 'Dark'}
          </Button>
          <Button variant="outline" size="sm" onClick={downloadProject}>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleSave}
            disabled={!onSave}
          >
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
          <Button onClick={handleRun} disabled={!ready || isRunning}>
            {isRunning ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Play className="h-4 w-4 mr-2" />
            )}
            Run {activeFile?.name}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <ResizablePanelGroup direction="horizontal">
          {/* File Explorer */}
          <ResizablePanel defaultSize={25} minSize={15} maxSize={40}>
            <div className="h-full border-r bg-card/50">
              <div className="p-3 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FolderOpen className="h-4 w-4" />
                    <span className="font-medium text-sm">Explorer</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowNewFileInput(true)}
                    className="h-6 w-6 p-0"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                
                {showNewFileInput && (
                  <div className="mt-2 space-y-2">
                    <Input
                      value={newFileName}
                      onChange={(e) => setNewFileName(e.target.value)}
                      placeholder="filename.py"
                      className="text-sm h-7"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') createNewFile();
                        if (e.key === 'Escape') {
                          setShowNewFileInput(false);
                          setNewFileName("");
                        }
                      }}
                      autoFocus
                    />
                    <div className="flex gap-1">
                      <Button size="sm" onClick={createNewFile} className="h-6 text-xs">
                        Create
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => {
                          setShowNewFileInput(false);
                          setNewFileName("");
                        }}
                        className="h-6 text-xs"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-2">
                {files.map((file) => (
                  <div
                    key={file.id}
                    className={`flex items-center justify-between p-2 rounded hover:bg-muted/50 cursor-pointer group ${
                      activeFileId === file.id ? 'bg-primary/10 text-primary' : ''
                    }`}
                    onClick={() => setActiveFileId(file.id)}
                  >
                    <div className="flex items-center gap-2 flex-1">
                      <File className="h-4 w-4 text-blue-500" />
                      <span className="text-sm truncate">{file.name}</span>
                    </div>
                    {files.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteFile(file.id);
                        }}
                        className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle />

          {/* Editor and Console */}
          <ResizablePanel defaultSize={75}>
            <ResizablePanelGroup direction="vertical">
              {/* Editor */}
              <ResizablePanel defaultSize={60} minSize={30}>
                <div className="h-full flex flex-col">
                  {/* File Tabs */}
                  <div className="flex items-center border-b bg-card/30 overflow-x-auto">
                    {files.map((file) => (
                      <div
                        key={file.id}
                        className={`flex items-center gap-2 px-3 py-2 border-r cursor-pointer hover:bg-muted/50 ${
                          activeFileId === file.id ? 'bg-background' : ''
                        }`}
                        onClick={() => setActiveFileId(file.id)}
                      >
                        <File className="h-3 w-3 text-blue-500" />
                        <span className="text-sm whitespace-nowrap">{file.name}</span>
                        {files.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteFile(file.id);
                            }}
                            className="h-4 w-4 p-0 ml-1"
                          >
                            <X className="h-2 w-2" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {/* Editor */}
                  <div className="flex-1">
                    {activeFile && (
                      <Editor
                        height="100%"
                        language="python"
                        value={activeFile.content}
                        onChange={(val) => updateFileContent(activeFile.id, val || '')}
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
                    )}
                  </div>
                </div>
              </ResizablePanel>

              <ResizableHandle />

              {/* Console */}
              <ResizablePanel defaultSize={40} minSize={20}>
                <div className="h-full flex flex-col">
                  <div className="flex items-center justify-between p-2 border-b bg-card">
                    <div className="flex items-center gap-2">
                      <TerminalSquare className="h-4 w-4" />
                      <span className="font-medium text-sm">Console Output</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {!ready && (
                        <div className="w-32">
                          <Progress value={65} className="h-2" />
                        </div>
                      )}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setOutput("")}
                        className="h-7 px-2 text-xs"
                      >
                        Clear
                      </Button>
                    </div>
                  </div>
                  <div className="flex-1 p-3 bg-muted/30 font-mono text-sm overflow-auto whitespace-pre-wrap">
                    {output || 'Run your Python code to see output here…'}
                  </div>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}