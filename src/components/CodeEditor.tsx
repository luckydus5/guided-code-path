import Editor from '@monaco-editor/react';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: string;
}

export default function CodeEditor({ value, onChange, language }: CodeEditorProps) {
  // Function to map language names to Monaco Editor language identifiers
  const getMonacoLanguage = (lang: string): string => {
    const languageMap: { [key: string]: string } = {
      'html': 'html',
      'css': 'css',
      'javascript': 'javascript',
      'typescript': 'typescript',
      'python': 'python',
      'json': 'json',
      'markdown': 'markdown'
    };
    return languageMap[lang.toLowerCase()] || 'plaintext';
  };

  // Get theme based on system preference
  const getEditorTheme = () => {
    if (typeof window !== 'undefined') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return isDark ? 'vs-dark' : 'light';
    }
    return 'vs-dark';
  };

  return (
    <div className="flex-1 p-4">
      <div className="h-full border rounded-lg overflow-hidden">
        <Editor
          height="300px"
          language={getMonacoLanguage(language)}
          value={value}
          onChange={(newValue) => onChange(newValue || '')}
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
  );
}