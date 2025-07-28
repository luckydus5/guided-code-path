import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  RefreshCw, 
  Download, 
  Upload, 
  Save,
  FolderOpen,
  Settings,
  Eye,
  Code,
  Monitor,
  Smartphone,
  Tablet,
  FileText,
  Palette,
  Zap,
  RotateCcw
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FileTab {
  id: string;
  name: string;
  language: 'html' | 'css' | 'javascript' | 'typescript' | 'python';
  content: string;
  isActive: boolean;
}

interface CodeEnvironmentProps {
  projectId?: string;
  initialFiles?: FileTab[];
  onSave?: (files: FileTab[]) => void;
}

const CodeEnvironment: React.FC<CodeEnvironmentProps> = ({ 
  projectId, 
  initialFiles = [], 
  onSave 
}) => {
  const { toast } = useToast();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [files, setFiles] = useState<FileTab[]>(initialFiles.length > 0 ? initialFiles : [
    { id: '1', name: 'index.html', language: 'html', content: defaultHTML, isActive: true },
    { id: '2', name: 'style.css', language: 'css', content: defaultCSS, isActive: false },
    { id: '3', name: 'script.js', language: 'javascript', content: defaultJS, isActive: false }
  ]);
  const [activeFileId, setActiveFileId] = useState('1');
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isRunning, setIsRunning] = useState(false);
  const [autoRun, setAutoRun] = useState(true);
  const [showPreview, setShowPreview] = useState(true);

  const activeFile = files.find(f => f.id === activeFileId);

  useEffect(() => {
    if (autoRun) {
      const debounceTimer = setTimeout(() => {
        runCode();
      }, 1000);
      return () => clearTimeout(debounceTimer);
    }
  }, [files, autoRun]);

  const updateFileContent = (fileId: string, content: string) => {
    setFiles(prev => prev.map(file => 
      file.id === fileId ? { ...file, content } : file
    ));
  };

  const runCode = () => {
    setIsRunning(true);
    
    const htmlFile = files.find(f => f.language === 'html');
    const cssFile = files.find(f => f.language === 'css');
    const jsFile = files.find(f => f.language === 'javascript');

    if (!htmlFile) {
      toast({
        title: "Error",
        description: "No HTML file found",
        variant: "destructive"
      });
      setIsRunning(false);
      return;
    }

    // Combine HTML, CSS, and JavaScript
    const combinedHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Preview</title>
        <style>
          ${cssFile?.content || ''}
        </style>
      </head>
      <body>
        ${htmlFile.content}
        <script>
          // Error handling for preview
          window.onerror = function(msg, url, line, col, error) {
            console.error('Error:', msg, 'at line', line);
            return false;
          };
          
          ${jsFile?.content || ''}
        </script>
      </body>
      </html>
    `;

    // Update iframe
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      iframe.srcdoc = combinedHTML;
    }

    setTimeout(() => setIsRunning(false), 500);
  };

  const addNewFile = () => {
    const newId = (files.length + 1).toString();
    const newFile: FileTab = {
      id: newId,
      name: `file${newId}.js`,
      language: 'javascript',
      content: '',
      isActive: false
    };
    setFiles(prev => [...prev, newFile]);
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
    
    setFiles(prev => prev.filter(f => f.id !== fileId));
    if (activeFileId === fileId) {
      setActiveFileId(files[0].id);
    }
  };

  const downloadProject = () => {
    files.forEach(file => {
      const blob = new Blob([file.content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      a.click();
      URL.revokeObjectURL(url);
    });
    
    toast({
      title: "Download Complete",
      description: "All files have been downloaded"
    });
  };

  const saveProject = () => {
    if (onSave) {
      onSave(files);
    }
    
    toast({
      title: "Project Saved",
      description: "Your code has been saved successfully"
    });
  };

  const getPreviewWidth = () => {
    switch (previewMode) {
      case 'mobile': return '375px';
      case 'tablet': return '768px';
      default: return '100%';
    }
  };

  const getLanguageIcon = (language: string) => {
    switch (language) {
      case 'html': return <FileText className="h-4 w-4 text-orange-500" />;
      case 'css': return <Palette className="h-4 w-4 text-blue-500" />;
      case 'javascript': return <Zap className="h-4 w-4 text-yellow-500" />;
      default: return <Code className="h-4 w-4" />;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-card">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold">Code Environment</h1>
          {projectId && (
            <Badge variant="outline">Project: {projectId}</Badge>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowPreview(!showPreview)}
            className={showPreview ? 'bg-blue-500/10 text-blue-700' : 'bg-gray-500/10 text-gray-700'}
          >
            <Eye className="h-4 w-4 mr-2" />
            {showPreview ? 'Hide Preview' : 'Show Preview'}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setAutoRun(!autoRun)}
            className={autoRun ? 'bg-green-500/10 text-green-700' : ''}
          >
            <Settings className="h-4 w-4 mr-2" />
            Auto-run: {autoRun ? 'ON' : 'OFF'}
          </Button>
          
          <Button variant="outline" size="sm" onClick={runCode} disabled={isRunning}>
            {isRunning ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Play className="h-4 w-4 mr-2" />
            )}
            Run
          </Button>
          
          <Button variant="outline" size="sm" onClick={saveProject}>
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
          
          <Button variant="outline" size="sm" onClick={downloadProject}>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Editor Panel */}
        <div className={`${showPreview ? 'w-1/2' : 'w-full'} h-full border-r bg-card transition-all duration-300`}>
          {/* File Tabs */}
          <div className="flex items-center justify-between border-b p-2">
            <div className="flex items-center space-x-1 overflow-x-auto">
              {files.map(file => (
                <Button
                  key={file.id}
                  variant={activeFileId === file.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveFileId(file.id)}
                  className="flex items-center space-x-2 whitespace-nowrap"
                >
                  {getLanguageIcon(file.language)}
                  <span>{file.name}</span>
                  {files.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteFile(file.id);
                      }}
                      className="ml-2 text-muted-foreground hover:text-destructive"
                    >
                      ×
                    </button>
                  )}
                </Button>
              ))}
            </div>
            
            <Button variant="ghost" size="sm" onClick={addNewFile}>
              +
            </Button>
          </div>

          {/* Code Editor */}
          <div className="h-full p-4">
            {activeFile && (
              <div className="h-full">
                <div className="mb-2 flex items-center justify-between">
                  <Badge variant="secondary">
                    {activeFile.language.toUpperCase()}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {activeFile.name}
                  </span>
                </div>
                
                <textarea
                  value={activeFile.content}
                  onChange={(e) => updateFileContent(activeFile.id, e.target.value)}
                  className="w-full h-5/6 p-4 font-mono text-sm bg-muted border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder={`Enter your ${activeFile.language} code here...`}
                  spellCheck={false}
                />
              </div>
            )}
          </div>
        </div>

        {/* Preview Panel */}
        {showPreview && (
          <div className="w-1/2 flex flex-col bg-background transition-all duration-300">
          {/* Preview Controls */}
          <div className="flex items-center justify-between p-4 border-b bg-card">
            <div className="flex items-center space-x-2">
              <Eye className="h-4 w-4" />
              <span className="font-medium">Preview</span>
              <Badge variant="outline">{previewMode}</Badge>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant={previewMode === 'desktop' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPreviewMode('desktop')}
              >
                <Monitor className="h-4 w-4" />
              </Button>
              <Button
                variant={previewMode === 'tablet' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPreviewMode('tablet')}
              >
                <Tablet className="h-4 w-4" />
              </Button>
              <Button
                variant={previewMode === 'mobile' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPreviewMode('mobile')}
              >
                <Smartphone className="h-4 w-4" />
              </Button>
              
              <Button variant="outline" size="sm" onClick={runCode}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Preview Content */}
          <div className="flex-1 p-4 bg-muted/30">
            <div className="h-full flex justify-center">
              <div 
                style={{ width: getPreviewWidth() }}
                className="h-full border bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <iframe
                  ref={iframeRef}
                  className="w-full h-full border-0"
                  title="Preview"
                  sandbox="allow-scripts allow-same-origin"
                />
              </div>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

// Default file contents
const defaultHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Project</title>
</head>
<body>
    <div class="container">
        <h1>Welcome to Your Code Environment!</h1>
        <p>Start building something amazing!</p>
        <button id="clickMe">Click Me!</button>
        <div id="output"></div>
    </div>
</body>
</html>`;

const defaultCSS = `body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 0;
    padding: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    color: white;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
    padding: 40px;
}

h1 {
    font-size: 2.5rem;
    margin-bottom: 20px;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

p {
    font-size: 1.2rem;
    margin-bottom: 30px;
    opacity: 0.9;
}

button {
    background: #ff6b6b;
    color: white;
    border: none;
    padding: 15px 30px;
    font-size: 1.1rem;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.3);
    background: #ff5252;
}

#output {
    margin-top: 20px;
    padding: 20px;
    background: rgba(255,255,255,0.1);
    border-radius: 10px;
    min-height: 50px;
    backdrop-filter: blur(10px);
}`;

const defaultJS = `// Welcome to your JavaScript playground!
let clickCount = 0;

document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('clickMe');
    const output = document.getElementById('output');
    
    button.addEventListener('click', function() {
        clickCount++;
        
        const messages = [
            '🎉 Great job!',
            '🚀 You\\'re coding!',
            '⭐ Keep going!',
            '🔥 On fire!',
            '💻 Code master!'
        ];
        
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        
        output.innerHTML = \`
            <h3>\${randomMessage}</h3>
            <p>Button clicked \${clickCount} time\${clickCount !== 1 ? 's' : ''}!</p>
            <p>Current time: \${new Date().toLocaleTimeString()}</p>
        \`;
        
        // Add some fun animation
        output.style.transform = 'scale(1.05)';
        setTimeout(() => {
            output.style.transform = 'scale(1)';
        }, 200);
    });
    
    // Initial message
    output.innerHTML = '<p>Click the button above to see some magic! ✨</p>';
});

// Feel free to experiment with your own code!
console.log('Welcome to your coding environment!');`;

export default CodeEnvironment;
