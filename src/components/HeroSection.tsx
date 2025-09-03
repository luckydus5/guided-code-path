import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ThemeToggle";
import { 
  Code, 
  Sparkles, 
  Users, 
  PlayCircle,
  ArrowRight,
  CheckCircle,
  Trophy,
  Star,
  Gamepad2,
  MessageSquare,
  LogIn,
  UserPlus
} from "lucide-react";

interface HeroSectionProps {
  onGetStarted: () => void;
  onSignIn?: () => void;
}

export default function HeroSection({ onGetStarted, onSignIn }: HeroSectionProps) {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Decorative wavy border */}
      <div className="absolute top-0 left-0 w-full h-32 overflow-hidden">
        <svg viewBox="0 0 1200 120" className="absolute top-0 left-0 w-full h-full">
          <path d="M0,60 Q300,120 600,60 T1200,60 L1200,0 L0,0 Z" fill="hsl(var(--destructive))" opacity="0.8"/>
        </svg>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-8 w-20 h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl rotate-12 animate-float"></div>
        <div className="absolute top-1/3 right-8 w-16 h-16 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-12 w-24 h-24 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-xl rotate-45 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/3 right-12 w-18 h-18 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Header Navigation */}
      <nav className="relative z-20 flex justify-between items-center px-4 py-6 md:px-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="p-2.5 bg-gradient-to-br from-primary to-secondary rounded-xl shadow-lg">
              <Code className="h-5 w-5 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              CodePath Academy
            </h1>
            <p className="text-xs text-muted-foreground">Learn. Build. Succeed.</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {onSignIn && (
            <>
              <Button 
                variant="ghost"
                size="sm"
                onClick={onSignIn}
                className="text-sm hover:bg-primary/10 hover:text-primary"
              >
                <LogIn className="mr-1.5 h-4 w-4" />
                Sign In
              </Button>
              <Button 
                size="sm"
                onClick={onSignIn}
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white"
              >
                <UserPlus className="mr-1.5 h-4 w-4" />
                Sign Up
              </Button>
            </>
          )}
        </div>
      </nav>
      
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Hero Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 md:py-16">
          <div className="text-center max-w-4xl mx-auto">
            
            {/* Main Headline */}
            <div className="mb-8 animate-fade-in">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Master Coding
                </span>
              </h1>
              
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-6">
                Interactive learning platform designed for students. Learn to code with hands-on projects and real-world challenges.
              </p>
              
              {/* Feature Highlights */}
              <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8">
                <Badge variant="secondary" className="bg-success/10 text-success border-success/20 text-xs">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Interactive
                </Badge>
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-xs">
                  <Trophy className="h-3 w-3 mr-1" />
                  Gamified
                </Badge>
                <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20 text-xs">
                  <Users className="h-3 w-3 mr-1" />
                  Community
                </Badge>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mb-12 animate-slide-up">
              <Button 
                size="lg" 
                className="text-base md:text-lg px-8 py-4 md:px-10 md:py-5 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-xl hover:shadow-2xl transition-all duration-300 group transform hover:scale-105 rounded-full"
                onClick={onGetStarted}
              >
                <Sparkles className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Your Coding Journey Starts Here
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <p className="text-xs md:text-sm text-muted-foreground mt-3">
                Free to start • No credit card required
              </p>
            </div>

            {/* Learning Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="p-4 md:p-6 bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-2xl hover:border-primary/40 transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-gradient-to-r from-primary to-primary/80 rounded-xl">
                    <Code className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground">Interactive Coding</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Learn by doing with real-time feedback and guidance.
                </p>
              </div>

              <div className="p-4 md:p-6 bg-gradient-to-br from-secondary/5 to-secondary/10 border border-secondary/20 rounded-2xl hover:border-secondary/40 transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-gradient-to-r from-secondary to-secondary/80 rounded-xl">
                    <Gamepad2 className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground">Gamified Learning</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Earn XP, unlock achievements, and level up your skills.
                </p>
              </div>

              <div className="p-4 md:p-6 bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20 rounded-2xl hover:border-accent/40 transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-gradient-to-r from-accent to-accent/80 rounded-xl">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground">Community Support</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Join thousands of learners and get help when you need it.
                </p>
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border border-primary/20">
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">50K+</div>
                <div className="text-xs md:text-sm text-muted-foreground">Students</div>
              </div>
              
              <div className="text-center p-4 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-xl border border-secondary/20">
                <div className="text-2xl md:text-3xl font-bold text-secondary mb-1">95%</div>
                <div className="text-xs md:text-sm text-muted-foreground">Success</div>
              </div>
              
              <div className="text-center p-4 bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl border border-accent/20">
                <div className="text-2xl md:text-3xl font-bold text-accent mb-1">24/7</div>
                <div className="text-xs md:text-sm text-muted-foreground">Support</div>
              </div>
              
              <div className="text-center p-4 bg-gradient-to-br from-success/10 to-success/5 rounded-xl border border-success/20">
                <div className="text-2xl md:text-3xl font-bold text-success mb-1">180+</div>
                <div className="text-xs md:text-sm text-muted-foreground">Countries</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}