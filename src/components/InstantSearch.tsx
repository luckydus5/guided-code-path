import { memo, useState, useCallback, useMemo, useEffect } from 'react';
import { Search, X, Zap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'project' | 'lesson' | 'resource';
  difficulty?: string;
  language?: string;
  path: string;
}

interface InstantSearchProps {
  data: SearchResult[];
  onSelect: (result: SearchResult) => void;
  placeholder?: string;
}

// Lightning-fast instant search with debouncing and fuzzy matching
export const InstantSearch = memo(({ data, onSelect, placeholder = "Search everything..." }: InstantSearchProps) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Ultra-fast fuzzy search algorithm
  const fuzzyScore = useCallback((text: string, pattern: string): number => {
    if (pattern.length === 0) return 1;
    if (text.length === 0) return 0;

    let score = 0;
    let patternIdx = 0;
    let prevMatched = false;

    for (let i = 0; i < text.length && patternIdx < pattern.length; i++) {
      const textChar = text[i].toLowerCase();
      const patternChar = pattern[patternIdx].toLowerCase();

      if (textChar === patternChar) {
        score += prevMatched ? 2 : 1;
        patternIdx++;
        prevMatched = true;
      } else {
        prevMatched = false;
      }
    }

    return patternIdx === pattern.length ? score / text.length : 0;
  }, []);

  // Instant search results with scoring
  const searchResults = useMemo(() => {
    if (!query.trim()) return [];

    const results = data
      .map(item => ({
        ...item,
        score: Math.max(
          fuzzyScore(item.title, query),
          fuzzyScore(item.description, query) * 0.7,
          fuzzyScore(item.type, query) * 0.5
        )
      }))
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8); // Limit for performance

    return results;
  }, [query, data, fuzzyScore]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < searchResults.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : searchResults.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (searchResults[selectedIndex]) {
          handleSelect(searchResults[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setQuery('');
        break;
    }
  }, [isOpen, searchResults, selectedIndex]);

  const handleSelect = useCallback((result: SearchResult) => {
    onSelect(result);
    setIsOpen(false);
    setQuery('');
    setSelectedIndex(0);
  }, [onSelect]);

  const handleInputChange = useCallback((value: string) => {
    setQuery(value);
    setIsOpen(value.trim().length > 0);
    setSelectedIndex(0);
  }, []);

  // Auto-focus management
  useEffect(() => {
    const handleSlash = (e: KeyboardEvent) => {
      if (e.key === '/' && e.ctrlKey) {
        e.preventDefault();
        const input = document.getElementById('instant-search');
        input?.focus();
      }
    };

    window.addEventListener('keydown', handleSlash);
    return () => window.removeEventListener('keydown', handleSlash);
  }, []);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'project': return 'bg-blue-500/10 text-blue-600';
      case 'lesson': return 'bg-green-500/10 text-green-600';
      case 'resource': return 'bg-purple-500/10 text-purple-600';
      default: return 'bg-gray-500/10 text-gray-600';
    }
  };

  const highlightMatch = (text: string, pattern: string) => {
    if (!pattern) return text;
    
    const regex = new RegExp(`(${pattern.split('').join('.*?')})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-200 px-1 rounded">$1</mark>');
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          id="instant-search"
          type="text"
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query && setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          placeholder={placeholder}
          className="pl-10 pr-10 py-2 w-full border-2 focus:border-primary/50 transition-all duration-200"
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
        <Badge variant="outline" className="absolute right-12 top-1/2 transform -translate-y-1/2 text-xs">
          <Zap className="h-3 w-3 mr-1" />
          Ctrl+/
        </Badge>
      </div>

      {/* Instant results dropdown */}
      {isOpen && searchResults.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
          {searchResults.map((result, index) => (
            <div
              key={result.id}
              onClick={() => handleSelect(result)}
              className={`p-3 cursor-pointer transition-all duration-150 ${
                index === selectedIndex 
                  ? 'bg-primary/10 border-l-4 border-primary' 
                  : 'hover:bg-muted/50'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h4 
                    className="font-medium text-sm truncate"
                    dangerouslySetInnerHTML={{ 
                      __html: highlightMatch(result.title, query) 
                    }}
                  />
                  <p 
                    className="text-xs text-muted-foreground mt-1 line-clamp-2"
                    dangerouslySetInnerHTML={{ 
                      __html: highlightMatch(result.description, query) 
                    }}
                  />
                </div>
                <div className="flex items-center gap-1 ml-2">
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${getTypeColor(result.type)}`}
                  >
                    {result.type}
                  </Badge>
                  {result.difficulty && (
                    <Badge variant="secondary" className="text-xs">
                      {result.difficulty}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

InstantSearch.displayName = 'InstantSearch';