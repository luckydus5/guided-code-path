import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  RefreshCw, 
  Code2,
  FileText,
  Palette,
  Zap
} from "lucide-react";
import Editor from '@monaco-editor/react';

interface CodeFiles {
  html?: string;
  css?: string;
  js?: string;
  python?: string;
  [key: string]: string | undefined;
}

interface MultiLanguageCodeEditorProps {
  languages: string[];
  initialCode: CodeFiles;
  onCodeChange: (files: CodeFiles) => void;
  onRun: () => void;
  isRunning: boolean;
}

export default function MultiLanguageCodeEditor({
  languages,
  initialCode,
  onCodeChange,
  onRun,
  isRunning
}: MultiLanguageCodeEditorProps) {
  const [files, setFiles] = useState<CodeFiles>(initialCode);
  const [activeTab, setActiveTab] = useState(languages[0]);

  const updateFile = (language: string, code: string) => {
    const newFiles = { ...files, [language]: code };
    setFiles(newFiles);
    onCodeChange(newFiles);
  };

  const resetFile = (language: string) => {
    const newFiles = { ...files, [language]: initialCode[language] || '' };
    setFiles(newFiles);
    onCodeChange(newFiles);
  };

  const resetAllFiles = () => {
    setFiles(initialCode);
    onCodeChange(initialCode);
  };

  const getLanguageIcon = (lang: string) => {
    switch (lang) {
      case 'html':
        return <FileText className="h-4 w-4" />;
      case 'css':
        return <Palette className="h-4 w-4" />;
      case 'js':
      case 'javascript':
        return <Zap className="h-4 w-4" />;
      case 'python':
        return <Code2 className="h-4 w-4" />;
      default:
        return <Code2 className="h-4 w-4" />;
    }
  };

  // Function to map language names to Monaco Editor language identifiers
  const getMonacoLanguage = (lang: string): string => {
    const languageMap: { [key: string]: string } = {
      'html': 'html',
      'css': 'css',
      'js': 'javascript',
      'javascript': 'javascript',
      'python': 'python'
    };
    return languageMap[lang] || 'plaintext';
  };

  // Get theme based on system preference
  const getEditorTheme = () => {
    if (typeof window !== 'undefined') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return isDark ? 'vs-dark' : 'light';
    }
    return 'vs-dark';
  };

  const getLanguageLabel = (lang: string) => {
    switch (lang) {
      case 'html':
        return 'HTML';
      case 'css':
        return 'CSS';
      case 'js':
      case 'javascript':
        return 'JavaScript';
      case 'python':
        return 'Python';
      default:
        return lang.toUpperCase();
    }
  };

  const getPlaceholder = (lang: string) => {
    switch (lang) {
      case 'html':
        return '<!DOCTYPE html>\n<html>\n<head>\n  <title>My Project</title>\n</head>\n<body>\n  <!-- Your HTML content here -->\n</body>\n</html>';
      case 'css':
        return '/* Your CSS styles here */\nbody {\n  font-family: Arial, sans-serif;\n}';
      case 'js':
      case 'javascript':
        return '// Your JavaScript code here\nconsole.log("Hello, World!");';
      case 'python':
        return '# Your Python code here\nprint("Hello, World!")';
      default:
        return `// Your ${lang} code here`;
    }
  };

  return (
    <Card className="flex-1">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h3 className="font-semibold flex items-center gap-2">
          <Code2 className="h-4 w-4" />
          Code Editor
        </h3>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={resetAllFiles}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset All
          </Button>
          <Button size="sm" onClick={onRun} disabled={isRunning}>
            <Play className="h-4 w-4 mr-2" />
            {isRunning ? 'Running...' : 'Run Code'}
          </Button>
        </div>
      </div>

      <div className="h-80">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <div className="px-4 pt-4">
            <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 w-full">
              {languages.map((lang) => (
                <TabsTrigger 
                  key={lang} 
                  value={lang}
                  className="flex items-center gap-2 text-xs"
                >
                  {getLanguageIcon(lang)}
                  {getLanguageLabel(lang)}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {languages.map((lang) => (
            <TabsContent key={lang} value={lang} className="flex-1 px-4 pb-4 pt-2">
              <div className="h-full flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {getLanguageLabel(lang)}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {files[lang]?.split('\n').length || 0} lines
                    </span>
                  </div>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => resetFile(lang)}
                    className="h-6 px-2 text-xs"
                  >
                    Reset
                  </Button>
                </div>
                
                <div className="flex-1 border rounded-lg overflow-hidden min-h-0">
                  <Editor
                    height="400px"
                    language={getMonacoLanguage(lang)}
                    value={files[lang] || ''}
                    onChange={(value) => updateFile(lang, value || '')}
                    theme={getEditorTheme()}
                    options={{
                      fontSize: 14,
                      fontFamily: 'JetBrains Mono, Fira Code, Monaco, Consolas, monospace',
                      wordWrap: 'on',
                      minimap: { enabled: false },
                      scrollBeyondLastLine: false,
                      automaticLayout: true,
                      tabSize: 2,
                      insertSpaces: true,
                      detectIndentation: false,
                      renderWhitespace: 'selection',
                      bracketPairColorization: { enabled: true },
                      guides: {
                        bracketPairs: true,
                        indentation: true
                      },
                      suggest: {
                        snippetsPreventQuickSuggestions: false
                      }
                    }}
                  />
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Card>
  );
}