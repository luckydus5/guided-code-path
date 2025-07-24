import { Textarea } from "@/components/ui/textarea";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: string;
}

export default function CodeEditor({ value, onChange, language }: CodeEditorProps) {
  return (
    <div className="flex-1 p-4">
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Write your ${language} code here...`}
        className="h-full font-mono text-sm resize-none bg-editor-background text-foreground border-border"
        style={{ minHeight: '300px' }}
      />
    </div>
  );
}