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
  LogIn,
  UserPlus,
  Zap,
  Target
} from "lucide-react";

interface HeroSectionProps {
  onGetStarted: () => void;
  onSignIn?: () => void;
}

export default function HeroSection({ onGetStarted, onSignIn }: HeroSectionProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Beautiful Gradient Background */}
      <div className="absolute inset-0 bg-gradient-glow"></div>
      
      {/* Floating Shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-[10%] w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-40 right-[10%] w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-[15%] w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Clean Navigation */}
      <nav className="relative z-20 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="container mx-auto flex justify-between items-center px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-primary rounded-xl shadow-md">
              <Code className="h-6 w-6 text-white" />
            </div>
            <div className="font-display">
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                BuildStack
              </h1>
              <p className="text-xs text-muted-foreground font-medium">Learn by Building</p>
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
                  className="hidden md:flex rounded-full hover:bg-primary/10"
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </Button>
                <Button 
                  size="sm"
                  onClick={onSignIn}
                  className="bg-gradient-primary hover:shadow-lg text-white rounded-full"
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  Get Started Free
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>
      
      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-6 py-20 md:py-32">
        <div className="text-center max-w-5xl mx-auto">
          
          {/* Badge */}
          <div className="flex justify-center mb-6 animate-fade-in">
            <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2 text-sm font-medium rounded-full">
              <Star className="h-4 w-4 mr-2 fill-primary" />
              Trusted by 50,000+ Students Worldwide
            </Badge>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6 animate-slide-up">
            Learn to Code by
            <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Building Real Projects
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-12 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Master programming through hands-on projects, interactive challenges, and a supportive community. Start your coding journey today—completely free!
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Button 
              size="lg" 
              className="text-lg px-10 py-7 bg-gradient-primary hover:shadow-xl text-white transition-all duration-300 group rounded-2xl font-semibold"
              onClick={onGetStarted}
            >
              <Sparkles className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              Start Learning for Free
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-10 py-7 border-2 hover:bg-muted/50 rounded-2xl font-semibold group"
            >
              <PlayCircle className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Watch Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground mb-20 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-success" />
              <span>No Credit Card</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-success" />
              <span>100% Free Forever</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-success" />
              <span>Start in 30 Seconds</span>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            
            {/* Interactive Learning */}
            <div className="group p-8 bg-card border border-border rounded-3xl hover:shadow-xl hover:border-primary/30 transition-all duration-300 text-left">
              <div className="mb-4 inline-flex p-3 bg-primary/10 rounded-2xl group-hover:scale-110 transition-transform">
                <Code className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-3">Interactive Coding</h3>
              <p className="text-muted-foreground">
                Learn by doing with real-time feedback, live code editors, and instant results. See your code come to life!
              </p>
            </div>

            {/* Gamified Learning */}
            <div className="group p-8 bg-card border border-border rounded-3xl hover:shadow-xl hover:border-secondary/30 transition-all duration-300 text-left">
              <div className="mb-4 inline-flex p-3 bg-secondary/10 rounded-2xl group-hover:scale-110 transition-transform">
                <Trophy className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-3">Gamified Progress</h3>
              <p className="text-muted-foreground">
                Earn XP, unlock achievements, and compete on leaderboards. Make learning fun and engaging!
              </p>
            </div>

            {/* Community Support */}
            <div className="group p-8 bg-card border border-border rounded-3xl hover:shadow-xl hover:border-accent/30 transition-all duration-300 text-left">
              <div className="mb-4 inline-flex p-3 bg-accent/10 rounded-2xl group-hover:scale-110 transition-transform">
                <Users className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-3">Active Community</h3>
              <p className="text-muted-foreground">
                Join 50K+ learners worldwide. Get help, share projects, and grow together in our supportive community.
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 animate-slide-up" style={{ animationDelay: '0.5s' }}>
            <div className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border border-primary/20">
              <div className="text-4xl font-display font-bold text-primary mb-2">50K+</div>
              <div className="text-sm text-muted-foreground font-medium">Active Students</div>
            </div>
            
            <div className="p-6 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-2xl border border-secondary/20">
              <div className="text-4xl font-display font-bold text-secondary mb-2">500+</div>
              <div className="text-sm text-muted-foreground font-medium">Projects</div>
            </div>
            
            <div className="p-6 bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl border border-accent/20">
              <div className="text-4xl font-display font-bold text-accent mb-2">95%</div>
              <div className="text-sm text-muted-foreground font-medium">Success Rate</div>
            </div>
            
            <div className="p-6 bg-gradient-to-br from-success/10 to-success/5 rounded-2xl border border-success/20">
              <div className="text-4xl font-display font-bold text-success mb-2">24/7</div>
              <div className="text-sm text-muted-foreground font-medium">Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
