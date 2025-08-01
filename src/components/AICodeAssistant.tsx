import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, X, ChevronDown, ChevronUp, Zap } from 'lucide-react';

interface CodeHint {
  id: string;
  type: 'suggestion' | 'error' | 'optimization' | 'accessibility';
  title: string;
  description: string;
  code?: string;
  line?: number;
  severity: 'low' | 'medium' | 'high';
}

interface AICodeAssistantProps {
  currentCode: string;
  language: 'html' | 'css' | 'javascript';
  projectType: string;
}

export const AICodeAssistant: React.FC<AICodeAssistantProps> = ({
  currentCode,
  language,
  projectType
}) => {
  const [hints, setHints] = useState<CodeHint[]>([]);
  const [isExpanded, setIsExpanded] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Mock AI analysis - in real app, this would call an AI API
  const analyzeCode = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockHints: CodeHint[] = generateMockHints(currentCode, language, projectType);
    setHints(mockHints);
    setIsAnalyzing(false);
  };

  const generateMockHints = (code: string, lang: string, project: string): CodeHint[] => {
    const hints: CodeHint[] = [];

    if (lang === 'html') {
      if (!code.includes('alt=') && code.includes('<img')) {
        hints.push({
          id: '1',
          type: 'accessibility',
          title: 'Missing Alt Text',
          description: 'Add alt attributes to images for accessibility',
          code: '<img src="image.jpg" alt="Description of image">',
          severity: 'high'
        });
      }
      
      if (!code.includes('<!DOCTYPE html>')) {
        hints.push({
          id: '2',
          type: 'error',
          title: 'Missing DOCTYPE',
          description: 'Add DOCTYPE declaration at the beginning',
          code: '<!DOCTYPE html>',
          severity: 'medium'
        });
      }
    }

    if (lang === 'css') {
      if (code.includes('position: fixed') && !code.includes('z-index')) {
        hints.push({
          id: '3',
          type: 'suggestion',
          title: 'Consider Z-Index',
          description: 'Fixed positioned elements often need z-index',
          code: 'z-index: 1000;',
          severity: 'low'
        });
      }
    }

    if (lang === 'javascript') {
      if (code.includes('var ')) {
        hints.push({
          id: '4',
          type: 'optimization',
          title: 'Use Modern Variable Declaration',
          description: 'Use const or let instead of var',
          code: 'const myVariable = value;',
          severity: 'medium'
        });
      }
      
      if (code.includes('getElementById') && !code.includes('null')) {
        hints.push({
          id: '5',
          type: 'error',
          title: 'Check for Null Elements',
          description: 'Always check if element exists before using it',
          code: 'const element = document.getElementById("id");\nif (element) {\n  // Your code here\n}',
          severity: 'high'
        });
      }
    }

    return hints;
  };

  const dismissHint = (hintId: string) => {
    setHints(prev => prev.filter(h => h.id !== hintId));
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'suggestion': return '💡';
      case 'error': return '⚠️';
      case 'optimization': return '⚡';
      case 'accessibility': return '♿';
      default: return '💡';
    }
  };

  if (!isExpanded) {
    return (
      <Card className="w-full mb-4">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4 text-blue-500" />
              <CardTitle className="text-sm">AI Assistant</CardTitle>
              {hints.length > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {hints.length} hints
                </Badge>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(true)}
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full mb-4">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Zap className="h-4 w-4 text-blue-500" />
            <CardTitle className="text-sm">AI Code Assistant</CardTitle>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={analyzeCode}
              disabled={isAnalyzing}
            >
              <Lightbulb className="h-4 w-4 mr-1" />
              {isAnalyzing ? 'Analyzing...' : 'Analyze Code'}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(false)}
            >
              <ChevronUp className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {hints.length === 0 && !isAnalyzing && (
          <div className="text-center py-4 text-muted-foreground">
            <Lightbulb className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Click "Analyze Code" to get AI-powered suggestions</p>
          </div>
        )}
        
        {isAnalyzing && (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto mb-2"></div>
            <p className="text-sm text-muted-foreground">AI is analyzing your code...</p>
          </div>
        )}
        
        {hints.map((hint) => (
          <div key={hint.id} className="border rounded-lg p-3 space-y-2">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-lg">{getTypeIcon(hint.type)}</span>
                <div>
                  <h4 className="text-sm font-medium">{hint.title}</h4>
                  <p className="text-xs text-muted-foreground">{hint.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${getSeverityColor(hint.severity)}`}></div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => dismissHint(hint.id)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
            
            {hint.code && (
              <div className="bg-muted p-2 rounded text-xs font-mono">
                <pre className="whitespace-pre-wrap">{hint.code}</pre>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
