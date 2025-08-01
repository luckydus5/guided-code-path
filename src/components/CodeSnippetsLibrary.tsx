import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Code, Search, Plus, Star } from 'lucide-react';

interface CodeSnippet {
  id: string;
  title: string;
  description: string;
  language: 'html' | 'css' | 'javascript' | 'typescript' | 'python';
  category: string;
  code: string;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  isStarred?: boolean;
}

interface CodeSnippetsLibraryProps {
  onInsertSnippet: (code: string) => void;
  currentLanguage: 'html' | 'css' | 'javascript' | 'typescript' | 'python';
}

const BUILT_IN_SNIPPETS: CodeSnippet[] = [
  // HTML Snippets
  {
    id: 'html-1',
    title: 'Responsive Navigation',
    description: 'Mobile-friendly navigation with hamburger menu',
    language: 'html',
    category: 'Components',
    difficulty: 'intermediate',
    tags: ['navigation', 'responsive', 'mobile'],
    code: `<nav class="navbar">
  <div class="nav-container">
    <div class="nav-logo">Logo</div>
    <ul class="nav-menu">
      <li><a href="#home">Home</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="#services">Services</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
    <div class="hamburger">
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </div>
  </div>
</nav>`
  },
  {
    id: 'html-2',
    title: 'Contact Form',
    description: 'Accessible contact form with validation',
    language: 'html',
    category: 'Forms',
    difficulty: 'beginner',
    tags: ['form', 'contact', 'accessibility'],
    code: `<form class="contact-form" id="contactForm">
  <div class="form-group">
    <label for="name">Name *</label>
    <input type="text" id="name" name="name" required>
  </div>
  <div class="form-group">
    <label for="email">Email *</label>
    <input type="email" id="email" name="email" required>
  </div>
  <div class="form-group">
    <label for="message">Message *</label>
    <textarea id="message" name="message" rows="5" required></textarea>
  </div>
  <button type="submit">Send Message</button>
</form>`
  },
  // CSS Snippets
  {
    id: 'css-1',
    title: 'Flexbox Center',
    description: 'Perfect centering with flexbox',
    language: 'css',
    category: 'Layout',
    difficulty: 'beginner',
    tags: ['flexbox', 'center', 'layout'],
    code: `.center-flex {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}`
  },
  {
    id: 'css-2',
    title: 'Smooth Animations',
    description: 'Smooth hover and transition effects',
    language: 'css',
    category: 'Animations',
    difficulty: 'intermediate',
    tags: ['animation', 'transition', 'hover'],
    code: `.smooth-hover {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateY(0);
}

.smooth-hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}`
  },
  // JavaScript Snippets
  {
    id: 'js-1',
    title: 'DOM Ready',
    description: 'Wait for DOM to be ready',
    language: 'javascript',
    category: 'Utilities',
    difficulty: 'beginner',
    tags: ['dom', 'ready', 'initialization'],
    code: `document.addEventListener('DOMContentLoaded', function() {
  // Your code here
  console.log('DOM is ready!');
});`
  },
  {
    id: 'js-2',
    title: 'Smooth Scroll',
    description: 'Smooth scrolling to element',
    language: 'javascript',
    category: 'Navigation',
    difficulty: 'intermediate',
    tags: ['scroll', 'smooth', 'navigation'],
    code: `function smoothScrollTo(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// Usage: smoothScrollTo('section-id');`
  },
  {
    id: 'js-3',
    title: 'Local Storage Helper',
    description: 'Save and load data from localStorage',
    language: 'javascript',
    category: 'Utilities',
    difficulty: 'intermediate',
    tags: ['storage', 'data', 'persistence'],
    code: `const storage = {
  save: (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Storage save error:', error);
      return false;
    }
  },
  
  load: (key, defaultValue = null) => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (error) {
      console.error('Storage load error:', error);
      return defaultValue;
    }
  },
  
  remove: (key) => {
    localStorage.removeItem(key);
  }
};`
  }
];

export const CodeSnippetsLibrary: React.FC<CodeSnippetsLibraryProps> = ({
  onInsertSnippet,
  currentLanguage
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [starredSnippets, setStarredSnippets] = useState<string[]>([]);

  const filteredSnippets = BUILT_IN_SNIPPETS.filter(snippet => {
    const matchesLanguage = snippet.language === currentLanguage;
    const matchesSearch = snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         snippet.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         snippet.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || snippet.category === selectedCategory;
    
    return matchesLanguage && matchesSearch && matchesCategory;
  });

  const categories = ['all', ...new Set(BUILT_IN_SNIPPETS.map(s => s.category))];

  const toggleStar = (snippetId: string) => {
    setStarredSnippets(prev => 
      prev.includes(snippetId) 
        ? prev.filter(id => id !== snippetId)
        : [...prev, snippetId]
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500';
      case 'intermediate': return 'bg-yellow-500';
      case 'advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Code className="h-5 w-5" />
          <span>Code Snippets</span>
          <Badge variant="outline">{currentLanguage.toUpperCase()}</Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {/* Search and Filters */}
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search snippets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid grid-cols-4 w-full">
              {categories.slice(0, 4).map((category) => (
                <TabsTrigger key={category} value={category} className="text-xs">
                  {category === 'all' ? 'All' : category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {/* Snippets List */}
          <ScrollArea className="h-96">
            <div className="space-y-3">
              {filteredSnippets.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Code className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No snippets found for "{searchTerm}"</p>
                </div>
              ) : (
                filteredSnippets.map((snippet) => (
                  <Card key={snippet.id} className="p-3">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="text-sm font-medium">{snippet.title}</h4>
                          <div className={`w-2 h-2 rounded-full ${getDifficultyColor(snippet.difficulty)}`}></div>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{snippet.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {snippet.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 ml-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleStar(snippet.id)}
                          className="p-1"
                        >
                          <Star 
                            className={`h-4 w-4 ${
                              starredSnippets.includes(snippet.id) 
                                ? 'fill-yellow-400 text-yellow-400' 
                                : 'text-muted-foreground'
                            }`} 
                          />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onInsertSnippet(snippet.code)}
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Insert
                        </Button>
                      </div>
                    </div>
                    
                    <div className="bg-muted p-2 rounded text-xs font-mono">
                      <pre className="whitespace-pre-wrap overflow-x-auto">
                        {snippet.code.slice(0, 150)}
                        {snippet.code.length > 150 && '...'}
                      </pre>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
};
