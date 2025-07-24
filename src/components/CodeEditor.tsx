import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Play } from "lucide-react";

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  onRun: () => void;
  isRunning: boolean;
}

export default function CodeEditor({ code, onChange, onRun, isRunning }: CodeEditorProps) {
  return (
    <Card className="h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Code Editor</h3>
          <Button 
            onClick={onRun}
            disabled={isRunning}
            className="bg-gradient-primary hover:shadow-lg transition-all duration-300"
          >
            {isRunning ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent mr-2" />
                Running...
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Run Code
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="flex-1 p-4">
        <Textarea
          value={code}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Write your code here..."
          className="h-full font-mono text-sm resize-none bg-editor-background text-foreground border-border"
          style={{ minHeight: '400px' }}
        />
      </div>
    </Card>
  );
}