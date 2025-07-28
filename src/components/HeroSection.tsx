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
  Globe
} from "lucide-react";

interface HeroSectionProps {
  onGetStarted: () => void;
  onSignIn?: () => void;
}

export default function HeroSection({ onGetStarted, onSignIn }: HeroSectionProps) {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/20 overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-pink-600/5" />
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Top Navigation Bar */}
      {onSignIn && (
        <div className="relative z-20 flex justify-between items-center p-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur-lg opacity-50"></div>
              <div className="relative p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                <Code className="h-6 w-6 text-white" />
              </div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              CodeLearner
            </span>
          </div>
          
          <Button 
            variant="outline"
            size="lg"
            onClick={onSignIn}
            className="border-2 border-white/20 hover:border-white/40 hover:bg-white/10 backdrop-blur-sm transition-all duration-300 group"
          >
            <Users className="mr-2 h-4 w-4" />
            Sign In
          </Button>
        </div>
      )}
      
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Hero Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-20">
          <div className="text-center max-w-7xl mx-auto">
            {/* Logo and Main Title */}
            <div className="mb-12 animate-fade-in">
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-lg opacity-50"></div>
                  <div className="relative p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl">
                    <Code className="h-10 w-10 text-white" />
                  </div>
                </div>
                <div className="text-left">
                  <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
                    Learn. Code.
                  </h1>
                  <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Level Up.
                  </h2>
                </div>
              </div>
              
              {/* Motivational Tagline */}
              <div className="mb-8">
                <p className="text-2xl md:text-3xl font-semibold text-foreground/90 mb-4">
                  Transform your dreams into code, one challenge at a time
                </p>
                <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                  Join thousands of developers who've turned their passion into profession. Learn through 
                  <span className="text-blue-600 font-semibold mx-1">interactive challenges</span>, get 
                  <span className="text-purple-600 font-semibold mx-1">AI-powered feedback</span>, and build 
                  <span className="text-pink-600 font-semibold mx-1">real-world projects</span> that land you your dream job.
                </p>
              </div>

              {/* Inspiring Quote */}
              <div className="mb-8">
                <Card className="bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border-none shadow-xl backdrop-blur-sm max-w-2xl mx-auto">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-center mb-3">
                      <Lightbulb className="h-6 w-6 text-yellow-500 mr-2" />
                      <span className="text-sm font-medium text-muted-foreground">Daily Inspiration</span>
                    </div>
                    <blockquote className="text-lg font-medium text-foreground/90 italic mb-2">
                      "The only way to learn a new programming language is by writing programs in it."
                    </blockquote>
                    <cite className="text-sm text-muted-foreground">— Dennis Ritchie, Creator of C</cite>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Enhanced CTA Button */}
            <div className="flex justify-center mb-16 animate-slide-up">
              <Button 
                size="lg" 
                className="text-xl px-12 py-7 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-2xl hover:shadow-3xl transition-all duration-300 group transform hover:scale-105"
                onClick={onGetStarted}
              >
                <Rocket className="mr-3 h-6 w-6 group-hover:translate-y-[-2px] transition-transform" />
                Start Your Journey
                <ChevronRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
              </Button>
            </div>

            {/* Enhanced Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Card className="p-8 bg-gradient-to-br from-blue-500/5 to-purple-500/5 backdrop-blur-sm border-blue-200/20 hover:border-blue-400/50 transition-all duration-300 group transform hover:scale-105 hover:shadow-xl">
                <div className="mb-6">
                  <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl w-fit mx-auto group-hover:from-blue-600 group-hover:to-blue-700 transition-all shadow-lg">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">Step-by-Step Learning</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Progress through carefully crafted challenges. No skipping ahead until you master each concept.
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-blue-500/10 text-blue-600">
                    <BookOpen className="h-3 w-3 mr-1" />
                    Structured
                  </Badge>
                  <Badge variant="secondary" className="bg-green-500/10 text-green-600">
                    <Trophy className="h-3 w-3 mr-1" />
                    Progressive
                  </Badge>
                </div>
              </Card>

              <Card className="p-8 bg-gradient-to-br from-purple-500/5 to-pink-500/5 backdrop-blur-sm border-purple-200/20 hover:border-purple-400/50 transition-all duration-300 group transform hover:scale-105 hover:shadow-xl">
                <div className="mb-6">
                  <div className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl w-fit mx-auto group-hover:from-purple-600 group-hover:to-purple-700 transition-all shadow-lg">
                    <Brain className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">AI Code Review</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Get instant feedback on your code with detailed explanations and improvement suggestions.
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-purple-500/10 text-purple-600">
                    <Zap className="h-3 w-3 mr-1" />
                    Instant
                  </Badge>
                  <Badge variant="secondary" className="bg-orange-500/10 text-orange-600">
                    <Award className="h-3 w-3 mr-1" />
                    Smart
                  </Badge>
                </div>
              </Card>

              <Card className="p-8 bg-gradient-to-br from-green-500/5 to-emerald-500/5 backdrop-blur-sm border-green-200/20 hover:border-green-400/50 transition-all duration-300 group transform hover:scale-105 hover:shadow-xl">
                <div className="mb-6">
                  <div className="p-4 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl w-fit mx-auto group-hover:from-green-600 group-hover:to-green-700 transition-all shadow-lg">
                    <TrendingUp className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">Personal Progress</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Track your learning journey across multiple languages with detailed analytics.
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-green-500/10 text-green-600">
                    <Users className="h-3 w-3 mr-1" />
                    Community
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-500/10 text-blue-600">
                    <Star className="h-3 w-3 mr-1" />
                    Gamified
                  </Badge>
                </div>
              </Card>
            </div>

            {/* Additional Features Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <Card className="p-6 bg-gradient-to-br from-orange-500/5 to-red-500/5 backdrop-blur-sm border-orange-200/20 hover:border-orange-400/50 transition-all duration-300 group">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl">
                    <GitBranch className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Real-World Projects</h4>
                    <p className="text-muted-foreground">Build portfolio-worthy projects that showcase your skills to employers.</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-indigo-500/5 to-blue-500/5 backdrop-blur-sm border-indigo-200/20 hover:border-indigo-400/50 transition-all duration-300 group">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl">
                    <Globe className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Global Community</h4>
                    <p className="text-muted-foreground">Connect with developers worldwide and learn together in our supportive community.</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="text-center p-6 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-2xl backdrop-blur-sm border border-blue-200/20">
                <div className="flex items-center justify-center mb-3">
                  <Code className="h-6 w-6 text-blue-600 mr-2" />
                  <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">6+</div>
                </div>
                <div className="text-sm font-medium text-muted-foreground">Languages</div>
                <div className="text-xs text-muted-foreground mt-1">JavaScript, Python, Java & more</div>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-2xl backdrop-blur-sm border border-purple-200/20">
                <div className="flex items-center justify-center mb-3">
                  <Target className="h-6 w-6 text-purple-600 mr-2" />
                  <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">100+</div>
                </div>
                <div className="text-sm font-medium text-muted-foreground">Challenges</div>
                <div className="text-xs text-muted-foreground mt-1">From beginner to expert</div>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-2xl backdrop-blur-sm border border-green-200/20">
                <div className="flex items-center justify-center mb-3">
                  <Brain className="h-6 w-6 text-green-600 mr-2" />
                  <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">AI</div>
                </div>
                <div className="text-sm font-medium text-muted-foreground">Powered</div>
                <div className="text-xs text-muted-foreground mt-1">Smart learning assistant</div>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-br from-orange-500/10 to-orange-600/10 rounded-2xl backdrop-blur-sm border border-orange-200/20">
                <div className="flex items-center justify-center mb-3">
                  <Clock className="h-6 w-6 text-orange-600 mr-2" />
                  <div className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">24/7</div>
                </div>
                <div className="text-sm font-medium text-muted-foreground">Learning</div>
                <div className="text-xs text-muted-foreground mt-1">Learn at your own pace</div>
              </div>
            </div>

            {/* Success Stories Teaser */}
            <div className="mt-20 animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <h3 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Join 10,000+ Successful Developers
              </h3>
              <div className="flex items-center justify-center gap-8 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  <span className="font-medium">Loved by students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-500" />
                  <span className="font-medium">Trusted by educators</span>
                </div>
                <div className="flex items-center gap-2">
                  <Coffee className="h-5 w-5 text-amber-500" />
                  <span className="font-medium">Built by developers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}