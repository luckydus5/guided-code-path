import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Code, Sparkles, Target, Users, Zap, ChevronRight } from "lucide-react";

interface HeroSectionProps {
  onGetStarted: () => void;
}

export default function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-glow opacity-30" />
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      
      {/* Main Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto">
        {/* Logo and Title */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-gradient-primary rounded-2xl">
              <Code className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              CodeMentor.AI
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Learn to code through <span className="text-primary font-semibold">interactive challenges</span>, 
            get <span className="text-secondary font-semibold">AI-powered feedback</span>, 
            and unlock your programming potential step by step.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up">
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 bg-gradient-primary hover:shadow-xl transition-all duration-300 group"
            onClick={onGetStarted}
          >
            Start Learning Now
            <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button 
            size="lg" 
            variant="outline"
            className="text-lg px-8 py-6 border-primary/50 hover:bg-primary/10 transition-all duration-300"
          >
            <Sparkles className="mr-2 h-5 w-5" />
            View Demo
          </Button>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <Card className="p-6 bg-card/80 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 group">
            <div className="mb-4">
              <div className="p-3 bg-primary/20 rounded-xl w-fit mx-auto group-hover:bg-primary/30 transition-colors">
                <Target className="h-6 w-6 text-primary" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3">Step-by-Step Learning</h3>
            <p className="text-muted-foreground">
              Progress through carefully crafted challenges. No skipping ahead until you master each concept.
            </p>
          </Card>

          <Card className="p-6 bg-card/80 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 group">
            <div className="mb-4">
              <div className="p-3 bg-secondary/20 rounded-xl w-fit mx-auto group-hover:bg-secondary/30 transition-colors">
                <Zap className="h-6 w-6 text-secondary" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3">AI Code Review</h3>
            <p className="text-muted-foreground">
              Get instant feedback on your code with detailed explanations and improvement suggestions.
            </p>
          </Card>

          <Card className="p-6 bg-card/80 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 group">
            <div className="mb-4">
              <div className="p-3 bg-success/20 rounded-xl w-fit mx-auto group-hover:bg-success/30 transition-colors">
                <Users className="h-6 w-6 text-success" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3">Personal Progress</h3>
            <p className="text-muted-foreground">
              Track your learning journey across multiple languages with detailed analytics.
            </p>
          </Card>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">6+</div>
            <div className="text-sm text-muted-foreground">Languages</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-secondary mb-2">100+</div>
            <div className="text-sm text-muted-foreground">Challenges</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-success mb-2">AI</div>
            <div className="text-sm text-muted-foreground">Powered</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-warning mb-2">24/7</div>
            <div className="text-sm text-muted-foreground">Learning</div>
          </div>
        </div>
      </div>
    </div>
  );
}