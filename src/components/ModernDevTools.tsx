import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  Terminal, 
  Globe, 
  Smartphone, 
  Monitor,
  Zap,
  Package,
  GitBranch,
  Settings,
  Download,
  Play
} from 'lucide-react';

interface DevTool {
  id: string;
  name: string;
  description: string;
  category: 'browser' | 'mobile' | 'performance' | 'package' | 'git' | 'build';
  icon: JSX.Element;
  features: string[];
  tutorial?: string;
  isActive: boolean;
}

interface BuildCommand {
  id: string;
  name: string;
  command: string;
  description: string;
  category: 'npm' | 'git' | 'dev' | 'build';
}

const DEV_TOOLS: DevTool[] = [
  {
    id: 'browser-devtools',
    name: 'Browser DevTools',
    description: 'Inspect, debug, and optimize your web applications',
    category: 'browser',
    icon: <Globe className="h-5 w-5" />,
    features: [
      'Element Inspector',
      'Console Debugging',
      'Network Monitoring',
      'Performance Profiling',
      'Responsive Design Mode'
    ],
    tutorial: 'Learn to use Chrome/Firefox DevTools effectively',
    isActive: true
  },
  {
    id: 'responsive-testing',
    name: 'Responsive Testing',
    description: 'Test your website on different device sizes',
    category: 'mobile',
    icon: <Smartphone className="h-5 w-5" />,
    features: [
      'Device Simulation',
      'Custom Viewport Sizes',
      'Touch Event Testing',
      'Orientation Testing'
    ],
    isActive: false
  },
  {
    id: 'lighthouse',
    name: 'Lighthouse Audit',
    description: 'Analyze web page performance and best practices',
    category: 'performance',
    icon: <Zap className="h-5 w-5" />,
    features: [
      'Performance Score',
      'Accessibility Audit',
      'SEO Analysis',
      'Best Practices Check',
      'PWA Readiness'
    ],
    isActive: false
  },
  {
    id: 'npm-manager',
    name: 'NPM Package Manager',
    description: 'Manage JavaScript packages and dependencies',
    category: 'package',
    icon: <Package className="h-5 w-5" />,
    features: [
      'Package Installation',
      'Dependency Management',
      'Script Running',
      'Version Control'
    ],
    isActive: false
  },
  {
    id: 'git-version-control',
    name: 'Git Version Control',
    description: 'Track changes and collaborate on code',
    category: 'git',
    icon: <GitBranch className="h-5 w-5" />,
    features: [
      'Version Tracking',
      'Branch Management',
      'Commit History',
      'Merge Conflicts'
    ],
    isActive: false
  }
];

const BUILD_COMMANDS: BuildCommand[] = [
  // NPM Commands
  {
    id: 'npm-install',
    name: 'Install Dependencies',
    command: 'npm install',
    description: 'Install all project dependencies from package.json',
    category: 'npm'
  },
  {
    id: 'npm-start',
    name: 'Start Development Server',
    command: 'npm start',
    description: 'Start the development server with hot reload',
    category: 'dev'
  },
  {
    id: 'npm-build',
    name: 'Build for Production',
    command: 'npm run build',
    description: 'Create optimized production build',
    category: 'build'
  },
  {
    id: 'npm-test',
    name: 'Run Tests',
    command: 'npm test',
    description: 'Execute test suite',
    category: 'dev'
  },
  
  // Git Commands
  {
    id: 'git-init',
    name: 'Initialize Repository',
    command: 'git init',
    description: 'Initialize a new Git repository',
    category: 'git'
  },
  {
    id: 'git-add',
    name: 'Stage Changes',
    command: 'git add .',
    description: 'Stage all changes for commit',
    category: 'git'
  },
  {
    id: 'git-commit',
    name: 'Commit Changes',
    command: 'git commit -m "commit message"',
    description: 'Save staged changes with a message',
    category: 'git'
  },
  {
    id: 'git-push',
    name: 'Push to Remote',
    command: 'git push origin main',
    description: 'Upload commits to remote repository',
    category: 'git'
  }
];

interface ModernDevToolsProps {
  currentCode: {
    html: string;
    css: string;
    javascript: string;
  };
  onToolActivate: (toolId: string) => void;
}

export const ModernDevTools: React.FC<ModernDevToolsProps> = ({
  currentCode,
  onToolActivate
}) => {
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [commandInput, setCommandInput] = useState('');
  const [lighthouseScore, setLighthouseScore] = useState<any>(null);
  const [responsiveMode, setResponsiveMode] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  const runLighthouseAudit = () => {
    setLighthouseScore({ loading: true });
    
    // Simulate Lighthouse audit
    setTimeout(() => {
      const mockScore = {
        performance: Math.floor(Math.random() * 30) + 70,
        accessibility: Math.floor(Math.random() * 20) + 80,
        bestPractices: Math.floor(Math.random() * 25) + 75,
        seo: Math.floor(Math.random() * 20) + 80,
        suggestions: [
          'Optimize images for better performance',
          'Add alt text to images',
          'Use semantic HTML elements',
          'Minify CSS and JavaScript'
        ]
      };
      setLighthouseScore(mockScore);
    }, 3000);
  };

  const executeCommand = (command: string) => {
    setTerminalOutput(prev => [
      ...prev,
      `$ ${command}`,
      `Executing: ${command}`,
      `✅ Command completed successfully`
    ]);
  };

  const clearTerminal = () => {
    setTerminalOutput([]);
  };

  const getDeviceWidth = () => {
    switch (responsiveMode) {
      case 'mobile': return '375px';
      case 'tablet': return '768px';
      case 'desktop': return '100%';
      default: return '100%';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'browser': return <Globe className="h-4 w-4" />;
      case 'mobile': return <Smartphone className="h-4 w-4" />;
      case 'performance': return <Zap className="h-4 w-4" />;
      case 'package': return <Package className="h-4 w-4" />;
      case 'git': return <GitBranch className="h-4 w-4" />;
      case 'build': return <Settings className="h-4 w-4" />;
      default: return <Terminal className="h-4 w-4" />;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Terminal className="h-5 w-5 text-blue-500" />
          <span>Modern Development Tools</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="tools" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="tools">Dev Tools</TabsTrigger>
            <TabsTrigger value="responsive">Responsive</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="terminal">Terminal</TabsTrigger>
          </TabsList>
          
          {/* Development Tools */}
          <TabsContent value="tools" className="space-y-4">
            <div className="grid gap-4">
              {DEV_TOOLS.map((tool) => (
                <Card 
                  key={tool.id} 
                  className={`p-4 cursor-pointer transition-all ${
                    activeTool === tool.id ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'hover:shadow-md'
                  }`}
                  onClick={() => {
                    setActiveTool(activeTool === tool.id ? null : tool.id);
                    onToolActivate(tool.id);
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-muted rounded-lg">
                        {tool.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium flex items-center space-x-2">
                          <span>{tool.name}</span>
                          {tool.isActive && (
                            <Badge variant="secondary" className="text-xs">Active</Badge>
                          )}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">{tool.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mt-3">
                          {tool.features.map((feature, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <Button variant="outline" size="sm">
                      {activeTool === tool.id ? 'Close' : 'Open'}
                    </Button>
                  </div>
                  
                  {activeTool === tool.id && tool.tutorial && (
                    <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-sm">💡 <strong>Tip:</strong> {tool.tutorial}</p>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Responsive Testing */}
          <TabsContent value="responsive" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Responsive Design Testing</h3>
              <div className="flex space-x-2">
                {(['mobile', 'tablet', 'desktop'] as const).map((mode) => (
                  <Button
                    key={mode}
                    variant={responsiveMode === mode ? "default" : "outline"}
                    size="sm"
                    onClick={() => setResponsiveMode(mode)}
                  >
                    {mode === 'mobile' && <Smartphone className="h-4 w-4 mr-2" />}
                    {mode === 'tablet' && <Monitor className="h-4 w-4 mr-2" />}
                    {mode === 'desktop' && <Monitor className="h-4 w-4 mr-2" />}
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="border rounded-lg p-4 bg-muted/30">
              <div 
                className="bg-white border rounded mx-auto transition-all duration-300"
                style={{ 
                  width: getDeviceWidth(),
                  minHeight: '400px',
                  maxWidth: '100%'
                }}
              >
                <div className="p-4 text-center text-muted-foreground">
                  <div className="mb-4">
                    <Badge variant="outline">
                      {responsiveMode} View ({getDeviceWidth()})
                    </Badge>
                  </div>
                  <p>Your website preview would appear here</p>
                  <p className="text-sm mt-2">
                    Test how your design looks on different devices
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Performance Testing */}
          <TabsContent value="performance" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Lighthouse Performance Audit</h3>
              <Button onClick={runLighthouseAudit} disabled={lighthouseScore?.loading}>
                {lighthouseScore?.loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
                    Running Audit...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    Run Audit
                  </>
                )}
              </Button>
            </div>
            
            {lighthouseScore && !lighthouseScore.loading && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="p-4 text-center">
                  <div className={`text-2xl font-bold ${getScoreColor(lighthouseScore.performance)}`}>
                    {lighthouseScore.performance}
                  </div>
                  <div className="text-sm text-muted-foreground">Performance</div>
                </Card>
                <Card className="p-4 text-center">
                  <div className={`text-2xl font-bold ${getScoreColor(lighthouseScore.accessibility)}`}>
                    {lighthouseScore.accessibility}
                  </div>
                  <div className="text-sm text-muted-foreground">Accessibility</div>
                </Card>
                <Card className="p-4 text-center">
                  <div className={`text-2xl font-bold ${getScoreColor(lighthouseScore.bestPractices)}`}>
                    {lighthouseScore.bestPractices}
                  </div>
                  <div className="text-sm text-muted-foreground">Best Practices</div>
                </Card>
                <Card className="p-4 text-center">
                  <div className={`text-2xl font-bold ${getScoreColor(lighthouseScore.seo)}`}>
                    {lighthouseScore.seo}
                  </div>
                  <div className="text-sm text-muted-foreground">SEO</div>
                </Card>
              </div>
            )}
            
            {lighthouseScore?.suggestions && (
              <Card className="p-4">
                <h4 className="font-medium mb-3">💡 Optimization Suggestions</h4>
                <ul className="space-y-2">
                  {lighthouseScore.suggestions.map((suggestion: string, index: number) => (
                    <li key={index} className="flex items-start space-x-2 text-sm">
                      <span className="text-orange-500 mt-0.5">•</span>
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </TabsContent>
          
          {/* Terminal */}
          <TabsContent value="terminal" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Command Terminal</h3>
              <Button variant="outline" size="sm" onClick={clearTerminal}>
                Clear
              </Button>
            </div>
            
            {/* Quick Commands */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {BUILD_COMMANDS.map((cmd) => (
                <Button
                  key={cmd.id}
                  variant="outline"
                  size="sm"
                  onClick={() => executeCommand(cmd.command)}
                  className="justify-start text-left"
                >
                  <div className="flex items-center space-x-2">
                    {getCategoryIcon(cmd.category)}
                    <div>
                      <div className="font-medium">{cmd.name}</div>
                      <div className="text-xs text-muted-foreground font-mono">
                        {cmd.command}
                      </div>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
            
            {/* Terminal Output */}
            <Card className="bg-black text-green-400 font-mono text-sm">
              <CardContent className="p-4">
                <div className="min-h-[200px] max-h-[300px] overflow-y-auto">
                  {terminalOutput.length === 0 ? (
                    <div className="text-gray-500">
                      Terminal ready. Click commands above or type below.
                    </div>
                  ) : (
                    terminalOutput.map((line, index) => (
                      <div key={index} className="mb-1">
                        {line}
                      </div>
                    ))
                  )}
                </div>
                
                <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-gray-700">
                  <span className="text-gray-400">$</span>
                  <Input
                    value={commandInput}
                    onChange={(e) => setCommandInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && commandInput.trim()) {
                        executeCommand(commandInput);
                        setCommandInput('');
                      }
                    }}
                    placeholder="Type a command..."
                    className="bg-transparent border-none text-green-400 focus:ring-0"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
