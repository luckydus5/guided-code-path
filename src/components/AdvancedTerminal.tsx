import { useState, useCallback, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Terminal as TerminalIcon, 
  Play, 
  Trash2, 
  Copy, 
  Settings, 
  Zap,
  ChevronRight,
  Folder,
  File,
  Download
} from "lucide-react";

interface TerminalSession {
  id: string;
  name: string;
  shell: 'powershell' | 'bash' | 'cmd' | 'python' | 'node';
  history: TerminalLine[];
  currentDir: string;
  isActive: boolean;
}

interface TerminalLine {
  id: string;
  type: 'command' | 'output' | 'error' | 'info';
  content: string;
  timestamp: Date;
  exitCode?: number;
}

interface AdvancedTerminalProps {
  onPythonExecution?: (code: string) => Promise<string>;
  className?: string;
}

const shellConfigs = {
  powershell: {
    name: "PowerShell",
    prompt: "PS C:\\>",
    color: "bg-blue-500/10 text-blue-700",
    icon: "⚡"
  },
  bash: {
    name: "Bash",
    prompt: "$",
    color: "bg-green-500/10 text-green-700",
    icon: "🐚"
  },
  cmd: {
    name: "Command Prompt",
    prompt: "C:\\>",
    color: "bg-gray-500/10 text-gray-700",
    icon: "💻"
  },
  python: {
    name: "Python REPL",
    prompt: ">>>",
    color: "bg-yellow-500/10 text-yellow-700",
    icon: "🐍"
  },
  node: {
    name: "Node.js",
    prompt: ">",
    color: "bg-purple-500/10 text-purple-700",
    icon: "📗"
  }
};

export default function AdvancedTerminal({ 
  onPythonExecution, 
  className = "" 
}: AdvancedTerminalProps) {
  const [sessions, setSessions] = useState<TerminalSession[]>([
    {
      id: 'main',
      name: 'Main Terminal',
      shell: 'bash',
      history: [
        {
          id: '1',
          type: 'info',
          content: 'Welcome to Advanced Terminal Environment!\nSupporting PowerShell, Bash, CMD, Python REPL, and Node.js',
          timestamp: new Date()
        }
      ],
      currentDir: '/home/user',
      isActive: true
    }
  ]);

  const [activeSessionId, setActiveSessionId] = useState('main');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentCommand, setCurrentCommand] = useState('');
  const [fontSize, setFontSize] = useState(14);
  const [terminalTheme, setTerminalTheme] = useState<'dark' | 'light'>('dark');

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const activeSession = sessions.find(s => s.id === activeSessionId) || sessions[0];
  const shellConfig = shellConfigs[activeSession.shell];

  // Auto-scroll to bottom when new content is added
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollArea = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollArea) {
        scrollArea.scrollTop = scrollArea.scrollHeight;
      }
    }
  }, [activeSession.history]);

  const addLine = useCallback((sessionId: string, line: Omit<TerminalLine, 'id' | 'timestamp'>) => {
    setSessions(prev => prev.map(session => 
      session.id === sessionId 
        ? {
            ...session,
            history: [...session.history, {
              ...line,
              id: Date.now().toString(),
              timestamp: new Date()
            }]
          }
        : session
    ));
  }, []);

  const simulateCommand = async (command: string, shell: string): Promise<{ output: string; exitCode: number }> => {
    // Simulate common commands
    const cmd = command.trim().toLowerCase();
    
    switch (shell) {
      case 'powershell':
        if (cmd === 'get-location' || cmd === 'pwd') {
          return { output: 'C:\\Users\\Developer\\Projects', exitCode: 0 };
        }
        if (cmd.startsWith('get-childitem') || cmd === 'ls' || cmd === 'dir') {
          return { 
            output: `Directory: C:\\Users\\Developer\\Projects

Mode                LastWriteTime         Length Name
----                -------------         ------ ----
d-----        8/18/2025   2:30 PM                src
d-----        8/18/2025   2:30 PM                dist
-a----        8/18/2025   2:30 PM           1024 package.json
-a----        8/18/2025   2:30 PM           2048 README.md`, 
            exitCode: 0 
          };
        }
        if (cmd.startsWith('echo ')) {
          return { output: command.substring(5), exitCode: 0 };
        }
        if (cmd === 'get-date') {
          return { output: new Date().toLocaleString(), exitCode: 0 };
        }
        break;

      case 'bash':
        if (cmd === 'pwd') {
          return { output: '/home/user/projects', exitCode: 0 };
        }
        if (cmd === 'ls' || cmd === 'ls -la') {
          return { 
            output: `total 24
drwxr-xr-x 3 user user 4096 Aug 18 14:30 .
drwxr-xr-x 3 user user 4096 Aug 18 14:30 ..
drwxr-xr-x 2 user user 4096 Aug 18 14:30 src
-rw-r--r-- 1 user user 1024 Aug 18 14:30 package.json
-rw-r--r-- 1 user user 2048 Aug 18 14:30 README.md`, 
            exitCode: 0 
          };
        }
        if (cmd.startsWith('echo ')) {
          return { output: command.substring(5), exitCode: 0 };
        }
        if (cmd === 'date') {
          return { output: new Date().toString(), exitCode: 0 };
        }
        if (cmd === 'whoami') {
          return { output: 'developer', exitCode: 0 };
        }
        break;

      case 'cmd':
        if (cmd === 'cd' || cmd === 'cd.') {
          return { output: 'C:\\Users\\Developer\\Projects', exitCode: 0 };
        }
        if (cmd === 'dir') {
          return { 
            output: ` Volume in drive C has no label.
 Directory of C:\\Users\\Developer\\Projects

08/18/2025  02:30 PM    <DIR>          .
08/18/2025  02:30 PM    <DIR>          ..
08/18/2025  02:30 PM    <DIR>          src
08/18/2025  02:30 PM             1,024 package.json
08/18/2025  02:30 PM             2,048 README.md
               2 File(s)          3,072 bytes
               3 Dir(s)  25,000,000,000 bytes free`, 
            exitCode: 0 
          };
        }
        if (cmd.startsWith('echo ')) {
          return { output: command.substring(5), exitCode: 0 };
        }
        break;

      case 'python':
        if (onPythonExecution) {
          try {
            const result = await onPythonExecution(command);
            return { output: result, exitCode: 0 };
          } catch (error) {
            return { output: `Error: ${error}`, exitCode: 1 };
          }
        }
        // Simple Python simulation
        if (cmd.startsWith('print(')) {
          const match = command.match(/print\((.+)\)/);
          if (match) {
            let content = match[1];
            if ((content.startsWith('"') && content.endsWith('"')) || 
                (content.startsWith("'") && content.endsWith("'"))) {
              content = content.slice(1, -1);
            }
            return { output: content, exitCode: 0 };
          }
        }
        if (cmd.includes('=') && !cmd.includes('==')) {
          return { output: '', exitCode: 0 };
        }
        return { output: 'Python code executed', exitCode: 0 };

      case 'node':
        if (cmd.startsWith('console.log(')) {
          const match = command.match(/console\.log\((.+)\)/);
          if (match) {
            let content = match[1];
            if ((content.startsWith('"') && content.endsWith('"')) || 
                (content.startsWith("'") && content.endsWith("'"))) {
              content = content.slice(1, -1);
            }
            return { output: content, exitCode: 0 };
          }
        }
        return { output: 'undefined', exitCode: 0 };
    }

    // Common commands across shells
    if (cmd === 'help' || cmd === '--help') {
      return { 
        output: `Available commands:
- ls/dir: List directory contents
- pwd/cd: Show current directory
- echo: Print text
- date: Show current date/time
- clear: Clear terminal
- help: Show this help message`, 
        exitCode: 0 
      };
    }

    if (cmd === 'clear' || cmd === 'cls') {
      return { output: '__CLEAR__', exitCode: 0 };
    }

    return { output: `Command not found: ${command}`, exitCode: 1 };
  };

  const executeCommand = async (command: string) => {
    if (!command.trim()) return;

    // Add command to history
    setCommandHistory(prev => [...prev.slice(-50), command]);
    setHistoryIndex(-1);

    // Add command line to session
    addLine(activeSessionId, {
      type: 'command',
      content: `${shellConfig.prompt} ${command}`
    });

    // Execute command
    try {
      const result = await simulateCommand(command, activeSession.shell);
      
      if (result.output === '__CLEAR__') {
        // Clear terminal
        setSessions(prev => prev.map(session => 
          session.id === activeSessionId 
            ? { ...session, history: [] }
            : session
        ));
      } else if (result.output) {
        addLine(activeSessionId, {
          type: result.exitCode === 0 ? 'output' : 'error',
          content: result.output,
          exitCode: result.exitCode
        });
      }
    } catch (error) {
      addLine(activeSessionId, {
        type: 'error',
        content: `Error: ${error}`
      });
    }

    setCurrentCommand('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(currentCommand);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentCommand('');
      }
    }
  };

  const createNewSession = (shell: keyof typeof shellConfigs) => {
    const newSession: TerminalSession = {
      id: `session-${Date.now()}`,
      name: `${shellConfigs[shell].name} ${sessions.length + 1}`,
      shell,
      history: [
        {
          id: '1',
          type: 'info',
          content: `${shellConfigs[shell].name} session started`,
          timestamp: new Date()
        }
      ],
      currentDir: shell === 'powershell' || shell === 'cmd' ? 'C:\\' : '/home/user',
      isActive: false
    };

    setSessions(prev => [...prev, newSession]);
    setActiveSessionId(newSession.id);
  };

  const closeSession = (sessionId: string) => {
    if (sessions.length <= 1) return;
    
    setSessions(prev => prev.filter(s => s.id !== sessionId));
    if (activeSessionId === sessionId) {
      setActiveSessionId(sessions.find(s => s.id !== sessionId)?.id || sessions[0].id);
    }
  };

  const changeShell = (shell: keyof typeof shellConfigs) => {
    setSessions(prev => prev.map(session => 
      session.id === activeSessionId 
        ? { 
            ...session, 
            shell,
            history: [...session.history, {
              id: Date.now().toString(),
              type: 'info',
              content: `Switched to ${shellConfigs[shell].name}`,
              timestamp: new Date()
            }]
          }
        : session
    ));
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const exportSession = () => {
    const sessionData = activeSession.history.map(line => 
      `[${line.timestamp.toLocaleTimeString()}] ${line.content}`
    ).join('\n');
    
    const blob = new Blob([sessionData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `terminal-session-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card className={`h-full flex flex-col ${className}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TerminalIcon className="h-5 w-5" />
            <span className="font-semibold">Advanced Terminal</span>
            <Badge className={shellConfig.color}>
              {shellConfig.icon} {shellConfig.name}
            </Badge>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Shell Selector */}
            <Select value={activeSession.shell} onValueChange={changeShell}>
              <SelectTrigger className="w-32 h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(shellConfigs).map(([key, config]) => (
                  <SelectItem key={key} value={key}>
                    {config.icon} {config.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* New Session */}
            <Select onValueChange={(shell) => createNewSession(shell as keyof typeof shellConfigs)}>
              <SelectTrigger className="w-8 h-8 p-0">
                <Play className="h-4 w-4" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(shellConfigs).map(([key, config]) => (
                  <SelectItem key={key} value={key}>
                    New {config.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="ghost" size="sm" onClick={exportSession} className="h-8 px-2">
              <Download className="h-4 w-4" />
            </Button>

            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setSessions(prev => prev.map(s => 
                s.id === activeSessionId ? { ...s, history: [] } : s
              ))}
              className="h-8 px-2"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Session Tabs */}
        <Tabs value={activeSessionId} onValueChange={setActiveSessionId}>
          <TabsList className="h-8 p-0">
            {sessions.map((session) => (
              <TabsTrigger 
                key={session.id} 
                value={session.id}
                className="text-xs px-3 relative group"
              >
                {shellConfigs[session.shell].icon} {session.name}
                {sessions.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 ml-2 opacity-0 group-hover:opacity-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      closeSession(session.id);
                    }}
                  >
                    ×
                  </Button>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        {/* Terminal Output */}
        <ScrollArea 
          ref={scrollAreaRef}
          className={`flex-1 p-4 font-mono text-sm ${
            terminalTheme === 'dark' 
              ? 'bg-gray-900 text-green-400' 
              : 'bg-gray-50 text-gray-800'
          }`}
          style={{ fontSize: `${fontSize}px` }}
        >
          <div className="space-y-1">
            {activeSession.history.map((line) => (
              <div 
                key={line.id} 
                className={`group hover:bg-white/5 p-1 rounded cursor-pointer ${
                  line.type === 'error' ? 'text-red-400' :
                  line.type === 'info' ? 'text-blue-400' :
                  line.type === 'command' ? 'text-yellow-400' :
                  ''
                }`}
                onClick={() => copyToClipboard(line.content)}
              >
                <div className="flex items-start justify-between">
                  <pre className="whitespace-pre-wrap flex-1">{line.content}</pre>
                  <Copy className="h-3 w-3 opacity-0 group-hover:opacity-50 transition-opacity" />
                </div>
                {line.type === 'command' && (
                  <div className="text-xs text-gray-500 mt-1">
                    {line.timestamp.toLocaleTimeString()}
                    {line.exitCode !== undefined && ` • Exit code: ${line.exitCode}`}
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Command Input */}
        <div className={`flex items-center p-4 border-t ${
          terminalTheme === 'dark' 
            ? 'bg-gray-900 border-gray-700' 
            : 'bg-gray-50 border-gray-200'
        }`}>
          <span className={`font-mono text-sm mr-2 ${
            terminalTheme === 'dark' ? 'text-green-400' : 'text-gray-600'
          }`}>
            {shellConfig.prompt}
          </span>
          <Input
            ref={inputRef}
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`flex-1 border-0 bg-transparent font-mono text-sm focus-visible:ring-0 ${
              terminalTheme === 'dark' ? 'text-green-400' : 'text-gray-800'
            }`}
            placeholder="Type a command..."
            autoComplete="off"
            spellCheck={false}
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => executeCommand(currentCommand)}
            className="ml-2 h-8 px-2"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}