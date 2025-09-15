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
    <div className="relative min-h-screen bg-gradient-surface overflow-hidden">
      {/* Advanced Background Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
        <div className="absolute top-1/4 left-8 w-32 h-32 bg-gradient-primary rounded-3xl rotate-12 animate-float opacity-20 blur-xl"></div>
        <div className="absolute top-1/3 right-8 w-24 h-24 bg-gradient-success rounded-full animate-float opacity-30 blur-lg" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-12 w-40 h-40 bg-gradient-learning rounded-2xl rotate-45 animate-float opacity-15 blur-2xl" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/3 right-12 w-28 h-28 bg-gradient-primary rounded-full animate-float opacity-25 blur-lg" style={{ animationDelay: '0.5s' }}></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="w-full h-full" style={{ 
            backgroundImage: `
              linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>

      {/* Header Navigation */}
      <nav className="relative z-20 glassmorphism border-0 border-b">
        <div className="container mx-auto flex justify-between items-center px-4 py-6 md:px-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="p-3 bg-gradient-primary rounded-2xl shadow-medium">
                <Code className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -inset-1 bg-gradient-primary rounded-2xl opacity-30 blur-sm -z-10"></div>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                CodePath Academy
              </h1>
              <p className="text-sm text-muted-foreground font-medium">Learn. Build. Succeed.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <ThemeToggle />
            {onSignIn && (
              <>
                <Button 
                  variant="ghost"
                  size="sm"
                  onClick={onSignIn}
                  className="text-sm hover:bg-primary/10 hover:text-primary transition-all duration-200 rounded-full px-4"
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </Button>
                <Button 
                  size="sm"
                  onClick={onSignIn}
                  className="bg-gradient-primary hover:opacity-90 text-white shadow-medium hover:shadow-strong transition-all duration-300 rounded-full px-6"
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  Sign Up
                </Button>
              </>
            )}
          </div>
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
            <div className="mb-16 animate-slide-up">
              <div className="relative">
                <Button 
                  size="lg" 
                  className="text-lg px-12 py-6 bg-gradient-primary hover:opacity-90 shadow-strong hover:shadow-glow transition-all duration-500 group transform hover:scale-105 rounded-2xl font-semibold relative z-10"
                  onClick={onGetStarted}
                >
                  <Sparkles className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform animate-glow" />
                  Your Coding Journey Starts Here
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                </Button>
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-primary rounded-2xl opacity-50 blur-xl group-hover:opacity-70 transition-opacity duration-500 -z-10"></div>
              </div>
              <p className="text-sm text-muted-foreground mt-4 font-medium">
                🎉 Free to start • No credit card required • Join 50K+ students
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