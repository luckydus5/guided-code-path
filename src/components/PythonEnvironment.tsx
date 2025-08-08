import { useCallback, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Editor from "@monaco-editor/react";
import { Play, TerminalSquare, RefreshCw, Download, Save, Sun, Moon, BaggageClaim } from "lucide-react";
import { usePyodide } from "@/hooks/usePyodide";
import { useToast } from "@/hooks/use-toast";

interface PythonEnvironmentProps {
  projectId?: string;
  projectTitle?: string;
  initialCode?: string;
  onSave?: (code: string) => void;
}

export default function PythonEnvironment({ projectId, projectTitle, initialCode, onSave }: PythonEnvironmentProps) {
  const defaultCode = useMemo(
    () =>
      initialCode ||
      `# ${projectTitle || "Python Project"}\n# Write Python below and press Run.\n\nprint("Hello from Python 🐍")\nfor i in range(3):\n    print("Counting:", i + 1)\n`,
    [initialCode, projectTitle]
  );

  const [code, setCode] = useState<string>(defaultCode);
  const [output, setOutput] = useState<string>("");
  const [isRunning, setIsRunning] = useState(false);
  const [theme, setTheme] = useState<'light' | 'vs-dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('python-env-theme');
      if (saved === 'light' || saved === 'vs-dark') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'vs-dark' : 'light';
    }
    return 'vs-dark';
  });

  const { toast } = useToast();

  const appendOut = useCallback((text: string) => {
    setOutput((prev) => prev + text);
  }, []);

  const { ready, runPython } = usePyodide({
    onStdout: appendOut,
    onStderr: (t) => appendOut(t),
  });

  const handleRun = async () => {
    if (!ready) return;
    setIsRunning(true);
    setOutput("");
    try {
      await runPython(code);
      toast({ title: "Python executed", description: "Code ran successfully." });
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
    a.download = `${(projectTitle || 'main').toLowerCase().replace(/\s+/g, '_')}.py`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const toggleTheme = () => {
    const next = theme === 'vs-dark' ? 'light' : 'vs-dark';
    setTheme(next);
    localStorage.setItem('python-env-theme', next);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-card/80 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">Python Environment</h2>
          {projectId && <Badge variant="outline">Project: {projectId}</Badge>}
          <Badge variant="secondary" className={ready ? '' : 'opacity-70'}>
            {ready ? 'Python Ready' : 'Loading Python…'}
          </Badge>
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
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSave?.(code)}
            disabled={!onSave}
            title={onSave ? 'Save code' : 'Save unavailable'}
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
            Run
          </Button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 grid grid-rows-2">
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
              <span className="font-medium text-sm">Console</span>
            </div>
            <div className="flex items-center gap-2">
              {!ready && (
                <div className="w-32">
                  <Progress value={35} className="h-2" />
                </div>
              )}
              <Button variant="ghost" size="sm" onClick={handleClearOutput} className="h-7 px-2 text-xs">
                Clear
              </Button>
            </div>
          </div>
          <div className="flex-1 p-3 bg-muted/30 font-mono text-sm overflow-auto whitespace-pre-wrap">
            {output || 'Output will appear here…'}
          </div>
        </div>
      </div>
    </div>
  );
}
