import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Lightbulb } from "lucide-react";
import type { Challenge } from "@/data/challenges";

interface ChallengePanelProps {
  challenge: Challenge;
  testResult?: { success: boolean; output: string; message: string } | null;
}

export default function ChallengePanel({ challenge, testResult }: ChallengePanelProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-success text-success-foreground";
      case "Medium": return "bg-warning text-warning-foreground";
      case "Hard": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="h-full p-6 overflow-y-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">{challenge.title}</h2>
          <Badge className={getDifficultyColor(challenge.difficulty)}>
            {challenge.difficulty}
          </Badge>
        </div>
        <p className="text-muted-foreground mb-4">{challenge.description}</p>
        <div className="bg-muted/50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Instructions:</h3>
          <p className="text-sm">{challenge.instructions}</p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-warning" />
          Hints
        </h3>
        <div className="space-y-2">
          {challenge.hints.map((hint, index) => (
            <div key={index} className="text-sm text-muted-foreground bg-card border rounded-lg p-3">
              {hint}
            </div>
          ))}
        </div>
      </div>

      {testResult && (
        <div className={`p-4 rounded-lg mb-4 ${testResult.success ? 'bg-success/20 border border-success/50' : 'bg-destructive/20 border border-destructive/50'}`}>
          <div className="flex items-center gap-2 mb-2">
            {testResult.success ? (
              <CheckCircle className="h-5 w-5 text-success" />
            ) : (
              <XCircle className="h-5 w-5 text-destructive" />
            )}
            <span className="font-semibold">{testResult.message}</span>
          </div>
          <div className="text-sm opacity-80">
            Output: {testResult.output}
          </div>
        </div>
      )}
    </Card>
  );
}