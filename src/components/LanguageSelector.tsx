import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Zap, Star, ArrowLeft } from "lucide-react";
import { PROGRAMMING_LANGUAGES, type Language } from "@/data/languages";

const languages = PROGRAMMING_LANGUAGES;

interface LanguageSelectorProps {
  onSelect: (language: Language) => void;
  onBack?: () => void;
}

export default function LanguageSelector({ onSelect, onBack }: LanguageSelectorProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);

  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language);
    onSelect(language);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "text-success";
      case "Intermediate": return "text-warning";
      case "Advanced": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return <Zap className="h-4 w-4" />;
      case "Intermediate": return <Code className="h-4 w-4" />;
      case "Advanced": return <Star className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-6">
      {onBack && (
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="hover:bg-muted"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      )}
      
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
          Choose Your Language
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Start your coding journey with any language. Our AI tutor adapts to your pace and provides personalized guidance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {languages.map((language) => (
          <Card
            key={language.id}
            className={`relative p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 group ${
              selectedLanguage?.id === language.id 
                ? 'border-primary shadow-lg animate-glow-pulse' 
                : 'border-border hover:border-primary/50'
            }`}
            onClick={() => handleLanguageSelect(language)}
          >
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="text-4xl">{language.icon}</div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(language.difficulty)}`}>
                  {getDifficultyIcon(language.difficulty)}
                  {language.difficulty}
                </div>
              </div>
              
              <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                {language.name}
              </h3>
              
              <p className="text-muted-foreground text-sm mb-4">
                {language.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">
                  Interactive Learning
                </div>
                {selectedLanguage?.id === language.id && (
                  <div className="text-primary text-sm font-medium">
                    Selected ✓
                  </div>
                )}
              </div>
            </div>

            {/* Gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${language.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-lg`} />
          </Card>
        ))}
      </div>

      {selectedLanguage && (
        <div className="text-center animate-slide-up">
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 bg-gradient-primary hover:shadow-xl transition-all duration-300"
            onClick={() => onSelect(selectedLanguage)}
          >
            Start Learning {selectedLanguage.name}
            <Code className="ml-2 h-5 w-5" />
          </Button>
        </div>
      )}
    </div>
  );
}