import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Code, 
  Sparkles, 
  Target, 
  Users, 
  Zap, 
  ChevronRight, 
  Rocket,
  Brain,
  Heart,
  Trophy,
  Star,
  Clock,
  BookOpen,
  Award,
  Coffee,
  GitBranch,
  Lightbulb,
  TrendingUp,
  Shield,
  Globe,
  MapPin,
  Layers,
  Building,
  GraduationCap,
  Briefcase,
  PlusCircle,
  ArrowRight,
  CheckCircle,
  Flame,
  Cpu,
  Database,
  Smartphone,
  PlayCircle,
  MessageSquare,
  Headphones,
  Gamepad2,
  Timer,
  Repeat,
  BarChart3,
  Calendar
} from "lucide-react";

interface HeroSectionProps {
  onGetStarted: () => void;
  onSignIn?: () => void;
}

export default function HeroSection({ onGetStarted, onSignIn }: HeroSectionProps) {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-background via-muted/30 to-background overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl rotate-12 animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-2xl rotate-45 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 right-10 w-28 h-28 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Header Navigation */}
      <nav className="relative z-20 flex justify-between items-center p-4 md:p-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="p-3 bg-gradient-to-br from-primary to-secondary rounded-2xl shadow-lg">
              <Code className="h-6 w-6 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              CodePath Academy
            </h1>
            <p className="text-xs text-muted-foreground hidden sm:block">Learn. Build. Succeed.</p>
          </div>
        </div>
        
        {onSignIn && (
          <Button 
            variant="outline"
            onClick={onSignIn}
            className="border-2 hover:bg-primary hover:text-white transition-all duration-300"
          >
            <Users className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Sign In</span>
          </Button>
        )}
      </nav>
      
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Hero Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-6 py-12 md:py-20">
          <div className="text-center max-w-6xl mx-auto">
            {/* Hero Badge */}
            <div className="mb-6 md:mb-8 animate-fade-in">
              <Badge className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 text-sm md:text-base font-semibold shadow-lg">
                <Sparkles className="h-4 w-4 mr-2" />
                Your Coding Journey Starts Here
              </Badge>
            </div>
            
            {/* Main Headline */}
            <div className="mb-8 md:mb-12 animate-fade-in">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 md:mb-6">
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Master Coding
                </span>
                <br />
                <span className="text-foreground">
                  Build Your Future
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-6 md:mb-8">
                Join thousands of students learning to code with our interactive, hands-on platform. 
                From beginner to professional, we'll guide you every step of the way.
              </p>
              
              {/* Feature Highlights */}
              <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8">
                <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Interactive Learning
                </Badge>
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                  <Trophy className="h-3 w-3 mr-1" />
                  Gamified Progress
                </Badge>
                <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                  <Users className="h-3 w-3 mr-1" />
                  Community Support
                </Badge>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mb-12 md:mb-16 animate-slide-up">
              <Button 
                size="lg" 
                className="text-lg md:text-xl px-8 md:px-12 py-6 md:py-8 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-2xl hover:shadow-3xl transition-all duration-300 group transform hover:scale-105"
                onClick={onGetStarted}
              >
                <PlayCircle className="mr-3 h-5 w-5 md:h-6 md:w-6 group-hover:scale-110 transition-transform" />
                Start Learning for Free
                <ArrowRight className="ml-3 h-5 w-5 md:h-6 md:w-6 group-hover:translate-x-2 transition-transform" />
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                No credit card required • Join 50,000+ students worldwide
              </p>
            </div>

            {/* Learning Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Card className="p-6 md:p-8 bg-gradient-to-br from-primary/5 to-primary/10 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 group transform hover:scale-105 hover:shadow-xl">
                <div className="mb-6">
                  <div className="p-4 bg-gradient-to-r from-primary to-primary/80 rounded-2xl w-fit mx-auto group-hover:from-primary group-hover:to-primary transition-all shadow-lg">
                    <Code className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-foreground">Interactive Coding</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Learn by doing with our interactive code editor. Practice real programming with instant feedback and guidance.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                    <Zap className="h-3 w-3 mr-1" />
                    Real-time
                  </Badge>
                  <Badge variant="secondary" className="bg-success/10 text-success text-xs">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Guided
                  </Badge>
                </div>
              </Card>

              <Card className="p-6 md:p-8 bg-gradient-to-br from-secondary/5 to-secondary/10 backdrop-blur-sm border-secondary/20 hover:border-secondary/40 transition-all duration-300 group transform hover:scale-105 hover:shadow-xl">
                <div className="mb-6">
                  <div className="p-4 bg-gradient-to-r from-secondary to-secondary/80 rounded-2xl w-fit mx-auto group-hover:from-secondary group-hover:to-secondary transition-all shadow-lg">
                    <Gamepad2 className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-foreground">Gamified Learning</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Earn XP, unlock achievements, and level up your skills. Make learning addictive and fun with game mechanics.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-secondary/10 text-secondary text-xs">
                    <Trophy className="h-3 w-3 mr-1" />
                    Achievements
                  </Badge>
                  <Badge variant="secondary" className="bg-accent/10 text-accent text-xs">
                    <Star className="h-3 w-3 mr-1" />
                    Leaderboards
                  </Badge>
                </div>
              </Card>

              <Card className="p-6 md:p-8 bg-gradient-to-br from-accent/5 to-accent/10 backdrop-blur-sm border-accent/20 hover:border-accent/40 transition-all duration-300 group transform hover:scale-105 hover:shadow-xl">
                <div className="mb-6">
                  <div className="p-4 bg-gradient-to-r from-accent to-accent/80 rounded-2xl w-fit mx-auto group-hover:from-accent group-hover:to-accent transition-all shadow-lg">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-foreground">Community Driven</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Join a supportive community of learners. Get help, share projects, and collaborate with fellow students.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-accent/10 text-accent text-xs">
                    <MessageSquare className="h-3 w-3 mr-1" />
                    Forums
                  </Badge>
                  <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                    <Headphones className="h-3 w-3 mr-1" />
                    Mentorship
                  </Badge>
                </div>
              </Card>
            </div>

            {/* Learning Path Preview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <Card className="p-4 md:p-6 bg-gradient-to-br from-success/5 to-success/10 backdrop-blur-sm border-success/20 hover:border-success/40 transition-all duration-300 group">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-r from-success to-success/80 rounded-xl">
                    <BookOpen className="h-5 w-5 md:h-6 md:w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">Learn Fundamentals</h4>
                    <p className="text-sm text-muted-foreground">Master the basics with interactive lessons</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 md:p-6 bg-gradient-to-br from-primary/5 to-primary/10 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 group">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-r from-primary to-primary/80 rounded-xl">
                    <Cpu className="h-5 w-5 md:h-6 md:w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">Build Projects</h4>
                    <p className="text-sm text-muted-foreground">Apply skills in real-world scenarios</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 md:p-6 bg-gradient-to-br from-secondary/5 to-secondary/10 backdrop-blur-sm border-secondary/20 hover:border-secondary/40 transition-all duration-300 group">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-r from-secondary to-secondary/80 rounded-xl">
                    <Trophy className="h-5 w-5 md:h-6 md:w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">Earn Certificates</h4>
                    <p className="text-sm text-muted-foreground">Get recognized for your achievements</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 md:p-6 bg-gradient-to-br from-accent/5 to-accent/10 backdrop-blur-sm border-accent/20 hover:border-accent/40 transition-all duration-300 group">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-r from-accent to-accent/80 rounded-xl">
                    <Briefcase className="h-5 w-5 md:h-6 md:w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">Land Jobs</h4>
                    <p className="text-sm text-muted-foreground">Get career support and job placement</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl backdrop-blur-sm border border-primary/20">
                <div className="flex items-center justify-center mb-3">
                  <Users className="h-6 w-6 text-primary mr-2" />
                  <div className="text-3xl md:text-4xl font-bold text-primary">50K+</div>
                </div>
                <div className="text-sm font-medium text-muted-foreground">Active Students</div>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-2xl backdrop-blur-sm border border-secondary/20">
                <div className="flex items-center justify-center mb-3">
                  <Award className="h-6 w-6 text-secondary mr-2" />
                  <div className="text-3xl md:text-4xl font-bold text-secondary">95%</div>
                </div>
                <div className="text-sm font-medium text-muted-foreground">Success Rate</div>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl backdrop-blur-sm border border-accent/20">
                <div className="flex items-center justify-center mb-3">
                  <Clock className="h-6 w-6 text-accent mr-2" />
                  <div className="text-3xl md:text-4xl font-bold text-accent">24/7</div>
                </div>
                <div className="text-sm font-medium text-muted-foreground">Support</div>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-br from-success/10 to-success/5 rounded-2xl backdrop-blur-sm border border-success/20">
                <div className="flex items-center justify-center mb-3">
                  <Globe className="h-6 w-6 text-success mr-2" />
                  <div className="text-3xl md:text-4xl font-bold text-success">180+</div>
                </div>
                <div className="text-sm font-medium text-muted-foreground">Countries</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}