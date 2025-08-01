import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Info,
  Zap,
  Target,
  Accessibility,
  Smartphone
} from 'lucide-react';

interface ValidationRule {
  id: string;
  name: string;
  category: 'html' | 'css' | 'javascript' | 'accessibility' | 'performance' | 'seo';
  severity: 'error' | 'warning' | 'info';
  check: (code: string) => boolean;
  message: string;
  suggestion: string;
  learnMore?: string;
}

interface ValidationResult {
  rule: ValidationRule;
  passed: boolean;
  line?: number;
  column?: number;
}

const VALIDATION_RULES: ValidationRule[] = [
  // HTML Rules
  {
    id: 'html-doctype',
    name: 'DOCTYPE Declaration',
    category: 'html',
    severity: 'error',
    check: (code) => code.includes('<!DOCTYPE html>'),
    message: 'Missing DOCTYPE declaration',
    suggestion: 'Add <!DOCTYPE html> at the beginning of your HTML document',
    learnMore: 'DOCTYPE tells the browser which version of HTML to use'
  },
  {
    id: 'html-lang',
    name: 'Language Attribute',
    category: 'html',
    severity: 'warning',
    check: (code) => code.includes('lang='),
    message: 'Missing language attribute',
    suggestion: 'Add lang="en" to your <html> tag for accessibility',
    learnMore: 'Language attribute helps screen readers pronounce content correctly'
  },
  {
    id: 'html-title',
    name: 'Page Title',
    category: 'html',
    severity: 'error',
    check: (code) => code.includes('<title>') && !code.includes('<title></title>'),
    message: 'Missing or empty page title',
    suggestion: 'Add a descriptive <title> in the <head> section',
    learnMore: 'Page titles appear in browser tabs and search results'
  },
  {
    id: 'html-viewport',
    name: 'Viewport Meta Tag',
    category: 'html',
    severity: 'warning',
    check: (code) => code.includes('name="viewport"'),
    message: 'Missing viewport meta tag',
    suggestion: 'Add <meta name="viewport" content="width=device-width, initial-scale=1.0">',
    learnMore: 'Viewport meta tag makes your site mobile-friendly'
  },
  
  // Accessibility Rules
  {
    id: 'a11y-img-alt',
    name: 'Image Alt Text',
    category: 'accessibility',
    severity: 'error',
    check: (code) => {
      const imgTags = code.match(/<img[^>]*>/g) || [];
      return imgTags.every(tag => tag.includes('alt='));
    },
    message: 'Images missing alt attributes',
    suggestion: 'Add alt="description" to all <img> tags',
    learnMore: 'Alt text helps screen readers describe images to visually impaired users'
  },
  {
    id: 'a11y-heading-hierarchy',
    name: 'Heading Hierarchy',
    category: 'accessibility',
    severity: 'warning',
    check: (code) => {
      const hasH1 = code.includes('<h1>');
      const hasSkippedHeading = code.includes('<h3>') && !code.includes('<h2>');
      return hasH1 && !hasSkippedHeading;
    },
    message: 'Improper heading hierarchy',
    suggestion: 'Use heading tags in order (h1 → h2 → h3) and include only one h1',
    learnMore: 'Proper heading structure helps screen readers navigate content'
  },
  
  // CSS Rules
  {
    id: 'css-vendor-prefixes',
    name: 'Vendor Prefixes',
    category: 'css',
    severity: 'info',
    check: (code) => {
      const modernProps = ['transform', 'transition', 'animation'];
      return !modernProps.some(prop => 
        code.includes(prop + ':') && !code.includes('-webkit-' + prop)
      );
    },
    message: 'Consider adding vendor prefixes',
    suggestion: 'Add -webkit- prefixes for better browser support',
    learnMore: 'Vendor prefixes ensure CSS works across different browsers'
  },
  {
    id: 'css-mobile-first',
    name: 'Mobile-First Design',
    category: 'css',
    severity: 'info',
    check: (code) => {
      const hasMediaQueries = code.includes('@media');
      const hasMinWidth = code.includes('min-width');
      return !hasMediaQueries || hasMinWidth;
    },
    message: 'Consider mobile-first approach',
    suggestion: 'Use min-width in media queries for mobile-first design',
    learnMore: 'Mobile-first design ensures better performance on mobile devices'
  },
  
  // JavaScript Rules
  {
    id: 'js-const-let',
    name: 'Modern Variable Declaration',
    category: 'javascript',
    severity: 'warning',
    check: (code) => !code.includes('var '),
    message: 'Using deprecated var keyword',
    suggestion: 'Use const or let instead of var',
    learnMore: 'const and let have better scoping rules than var'
  },
  {
    id: 'js-strict-mode',
    name: 'Strict Mode',
    category: 'javascript',
    severity: 'info',
    check: (code) => code.includes('"use strict"'),
    message: 'Consider enabling strict mode',
    suggestion: 'Add "use strict"; at the top of your JavaScript',
    learnMore: 'Strict mode catches common coding mistakes and unsafe actions'
  },
  
  // Performance Rules
  {
    id: 'perf-inline-styles',
    name: 'Inline Styles',
    category: 'performance',
    severity: 'warning',
    check: (code) => !code.includes(' style='),
    message: 'Avoid inline styles',
    suggestion: 'Move styles to CSS files for better performance and maintainability',
    learnMore: 'External CSS can be cached by browsers'
  },
  
  // SEO Rules
  {
    id: 'seo-meta-description',
    name: 'Meta Description',
    category: 'seo',
    severity: 'info',
    check: (code) => code.includes('name="description"'),
    message: 'Missing meta description',
    suggestion: 'Add <meta name="description" content="your description">',
    learnMore: 'Meta descriptions appear in search engine results'
  }
];

interface CodeValidatorProps {
  code: string;
  language: 'html' | 'css' | 'javascript';
  onValidationComplete: (results: ValidationResult[]) => void;
}

export const CodeValidator: React.FC<CodeValidatorProps> = ({
  code,
  language,
  onValidationComplete
}) => {
  const [validationResults, setValidationResults] = useState<ValidationResult[]>([]);
  const [isValidating, setIsValidating] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const validateCode = useCallback((codeToValidate: string) => {
    setIsValidating(true);
    
    // Filter rules based on language and category
    const applicableRules = VALIDATION_RULES.filter(rule => {
      const languageMatch = rule.category === language || 
                           rule.category === 'accessibility' || 
                           rule.category === 'performance' || 
                           rule.category === 'seo';
      return languageMatch;
    });

    const results: ValidationResult[] = applicableRules.map(rule => ({
      rule,
      passed: rule.check(codeToValidate)
    }));

    setValidationResults(results);
    onValidationComplete(results);
    setIsValidating(false);
  }, [language, onValidationComplete]);

  useEffect(() => {
    if (code.trim()) {
      const debounceTimer = setTimeout(() => {
        validateCode(code);
      }, 1000); // Debounce validation

      return () => clearTimeout(debounceTimer);
    }
  }, [code, validateCode]);

  const getStats = () => {
    const total = validationResults.length;
    const passed = validationResults.filter(r => r.passed).length;
    const errors = validationResults.filter(r => !r.passed && r.rule.severity === 'error').length;
    const warnings = validationResults.filter(r => !r.passed && r.rule.severity === 'warning').length;
    const info = validationResults.filter(r => !r.passed && r.rule.severity === 'info').length;
    
    return { total, passed, errors, warnings, info, score: total > 0 ? (passed / total) * 100 : 0 };
  };

  const filteredResults = validationResults.filter(result => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'failed') return !result.passed;
    return result.rule.category === selectedCategory;
  });

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'error': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'info': return <Info className="h-4 w-4 text-blue-500" />;
      default: return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'html': return '🏗️';
      case 'css': return '🎨';
      case 'javascript': return '⚡';
      case 'accessibility': return <Accessibility className="h-4 w-4" />;
      case 'performance': return <Zap className="h-4 w-4" />;
      case 'seo': return <Target className="h-4 w-4" />;
      default: return '📝';
    }
  };

  const stats = getStats();

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span>Code Validator</span>
          </CardTitle>
          
          <div className="flex items-center space-x-2">
            {isValidating && (
              <Badge variant="secondary">
                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-primary mr-2"></div>
                Validating...
              </Badge>
            )}
            
            <Badge variant={stats.score >= 80 ? "default" : stats.score >= 60 ? "secondary" : "destructive"}>
              Score: {Math.round(stats.score)}%
            </Badge>
          </div>
        </div>
        
        {validationResults.length > 0 && (
          <div className="space-y-2">
            <Progress value={stats.score} className="w-full" />
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <span className="text-green-600">✅ {stats.passed} passed</span>
                {stats.errors > 0 && <span className="text-red-600">❌ {stats.errors} errors</span>}
                {stats.warnings > 0 && <span className="text-yellow-600">⚠️ {stats.warnings} warnings</span>}
                {stats.info > 0 && <span className="text-blue-600">ℹ️ {stats.info} suggestions</span>}
              </div>
              <span className="text-muted-foreground">{stats.total} total checks</span>
            </div>
          </div>
        )}
      </CardHeader>
      
      <CardContent>
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="failed">Issues</TabsTrigger>
            <TabsTrigger value="accessibility">A11y</TabsTrigger>
            <TabsTrigger value="performance">Perf</TabsTrigger>
          </TabsList>
          
          <TabsContent value={selectedCategory} className="space-y-3 mt-4">
            {filteredResults.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
                <p>{validationResults.length === 0 ? 'Start coding to see validation results' : 'No issues found! Great job! 🎉'}</p>
              </div>
            ) : (
              filteredResults.map((result, index) => (
                <Alert key={index} variant={result.passed ? "default" : "destructive"}>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-0.5">
                      {result.passed ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        getSeverityIcon(result.rule.severity)
                      )}
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium flex items-center space-x-2">
                          <span>{getCategoryIcon(result.rule.category)}</span>
                          <span>{result.rule.name}</span>
                        </h4>
                        <Badge variant="outline" className="text-xs">
                          {result.rule.category}
                        </Badge>
                      </div>
                      
                      <AlertDescription>
                        {result.passed ? (
                          <span className="text-green-700">✅ Check passed</span>
                        ) : (
                          <div className="space-y-2">
                            <p className="text-sm">{result.rule.message}</p>
                            <div className="bg-muted p-3 rounded text-sm">
                              <strong>💡 Suggestion:</strong> {result.rule.suggestion}
                            </div>
                            {result.rule.learnMore && (
                              <p className="text-xs text-muted-foreground">
                                <strong>Why:</strong> {result.rule.learnMore}
                              </p>
                            )}
                          </div>
                        )}
                      </AlertDescription>
                    </div>
                  </div>
                </Alert>
              ))
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
