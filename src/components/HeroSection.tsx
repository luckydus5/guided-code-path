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
  Smartphone
} from "lucide-react";

interface HeroSectionProps {
  onGetStarted: () => void;
  onSignIn?: () => void;
}

export default function HeroSection({ onGetStarted, onSignIn }: HeroSectionProps) {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/10 overflow-hidden">
      {/* African-inspired Background with Tech Elements */}
      <div className="absolute inset-0">
        {/* Continental silhouette effect */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-600/8 via-orange-600/6 to-red-600/8" />
        
        {/* Tech innovation glow */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-emerald-500/15 to-cyan-500/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-orange-500/15 to-amber-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-green-500/8 to-blue-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Circuit pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 border border-primary/30 rounded-lg"></div>
          <div className="absolute top-40 right-20 w-24 h-24 border border-secondary/30 rounded-full"></div>
          <div className="absolute bottom-32 left-32 w-40 h-40 border border-accent/30 rounded-lg"></div>
        </div>
      </div>

      {/* Top Navigation Bar */}
      {onSignIn && (
        <div className="relative z-20 flex justify-between items-center p-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur-lg opacity-50"></div>
              <div className="relative p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                <img src="/icon.png" alt="BuildStack" className="h-6 w-6" />
              </div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-orange-600 bg-clip-text text-transparent">
              AfriCode Academy
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
            {/* Mission Statement */}
            <div className="mb-12 animate-fade-in">
              <div className="flex items-center justify-center gap-3 mb-6">
                <MapPin className="h-8 w-8 text-orange-600" />
                <Badge className="bg-gradient-to-r from-emerald-600 to-orange-600 text-white px-4 py-2 text-lg font-semibold">
                  Made in Africa, For Africa
                </Badge>
              </div>
              
              <div className="text-center mb-8">
                <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-emerald-600 via-orange-600 to-red-600 bg-clip-text text-transparent leading-tight mb-4">
                  Innovating Africa's
                </h1>
                <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-6">
                  Tech Future
                </h2>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-orange-600 rounded-2xl blur-lg opacity-30"></div>
                  <div className="relative p-6 bg-gradient-to-r from-emerald-500/10 to-orange-600/10 rounded-2xl border border-emerald-500/20 backdrop-blur-sm">
                    <p className="text-xl md:text-2xl font-bold text-foreground mb-2">
                      🚀 My Mission: Solve Real African Problems Through Technology
                    </p>
                    <p className="text-lg text-muted-foreground">
                      Building meaningful solutions that transform communities across the continent
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Vision Statement */}
              <div className="mb-8">
                <p className="text-lg md:text-xl text-muted-foreground max-w-5xl mx-auto leading-relaxed mb-6">
                  I'm on a mission to become a <span className="text-emerald-600 font-semibold">creative force in Africa's tech ecosystem</span>, 
                  developing innovative solutions that address our continent's most pressing challenges. Through 
                  <span className="text-orange-600 font-semibold mx-1">hands-on coding</span>, 
                  <span className="text-amber-600 font-semibold mx-1">real-world projects</span>, and 
                  <span className="text-red-600 font-semibold mx-1">community impact</span>, 
                  I'm building the skills to shape Africa's digital transformation.
                </p>
              </div>

              {/* Five Year Vision */}
              <div className="mb-8">
                <Card className="bg-gradient-to-r from-emerald-500/10 via-orange-500/10 to-amber-500/10 border border-emerald-500/20 shadow-xl backdrop-blur-sm max-w-4xl mx-auto">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-center mb-4">
                      <Rocket className="h-8 w-8 text-orange-600 mr-3" />
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-orange-600 bg-clip-text text-transparent">
                        My 5-Year Vision for Africa
                      </h3>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/10">
                        <Building className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                        <h4 className="font-semibold text-emerald-700 mb-1">Tech Innovation Hubs</h4>
                        <p className="text-sm text-muted-foreground">Establish coding academies in 5 African cities</p>
                      </div>
                      <div className="text-center p-4 bg-orange-500/5 rounded-xl border border-orange-500/10">
                        <Smartphone className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                        <h4 className="font-semibold text-orange-700 mb-1">Mobile-First Solutions</h4>
                        <p className="text-sm text-muted-foreground">Create 10+ apps solving African problems</p>
                      </div>
                      <div className="text-center p-4 bg-amber-500/5 rounded-xl border border-amber-500/10">
                        <Users className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                        <h4 className="font-semibold text-amber-700 mb-1">Community Impact</h4>
                        <p className="text-sm text-muted-foreground">Train 1000+ African developers</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Enhanced CTA Button */}
            <div className="flex flex-col items-center gap-4 mb-16 animate-slide-up">
              <Button 
                size="lg" 
                className="text-xl px-12 py-7 bg-gradient-to-r from-emerald-600 to-orange-600 hover:from-emerald-700 hover:to-orange-700 shadow-2xl hover:shadow-3xl transition-all duration-300 group transform hover:scale-105"
                onClick={onGetStarted}
              >
                <Flame className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                Join the African Tech Revolution
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
              </Button>
              <p className="text-sm text-muted-foreground font-medium">
                🌍 Building Africa's digital future, one developer at a time
              </p>
            </div>

            {/* African Tech Focus Areas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Card className="p-8 bg-gradient-to-br from-emerald-500/5 to-green-500/5 backdrop-blur-sm border-emerald-200/20 hover:border-emerald-400/50 transition-all duration-300 group transform hover:scale-105 hover:shadow-xl">
                <div className="mb-6">
                  <div className="p-4 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl w-fit mx-auto group-hover:from-emerald-600 group-hover:to-emerald-700 transition-all shadow-lg">
                    <Smartphone className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">Mobile-First Solutions</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Building apps that work seamlessly across Africa's diverse mobile ecosystem and connectivity challenges.
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600">
                    <Smartphone className="h-3 w-3 mr-1" />
                    Mobile
                  </Badge>
                  <Badge variant="secondary" className="bg-green-500/10 text-green-600">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Accessible
                  </Badge>
                </div>
              </Card>

              <Card className="p-8 bg-gradient-to-br from-orange-500/5 to-amber-500/5 backdrop-blur-sm border-orange-200/20 hover:border-orange-400/50 transition-all duration-300 group transform hover:scale-105 hover:shadow-xl">
                <div className="mb-6">
                  <div className="p-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl w-fit mx-auto group-hover:from-orange-600 group-hover:to-orange-700 transition-all shadow-lg">
                    <Database className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">Data-Driven Impact</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Leveraging Africa's growing data landscape to create insights that drive economic and social progress.
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-orange-500/10 text-orange-600">
                    <Database className="h-3 w-3 mr-1" />
                    Analytics
                  </Badge>
                  <Badge variant="secondary" className="bg-amber-500/10 text-amber-600">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Growth
                  </Badge>
                </div>
              </Card>

              <Card className="p-8 bg-gradient-to-br from-red-500/5 to-pink-500/5 backdrop-blur-sm border-red-200/20 hover:border-red-400/50 transition-all duration-300 group transform hover:scale-105 hover:shadow-xl">
                <div className="mb-6">
                  <div className="p-4 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl w-fit mx-auto group-hover:from-red-600 group-hover:to-red-700 transition-all shadow-lg">
                    <Cpu className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">AI for Africa</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Implementing artificial intelligence solutions tailored to African languages, cultures, and challenges.
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-red-500/10 text-red-600">
                    <Brain className="h-3 w-3 mr-1" />
                    AI/ML
                  </Badge>
                  <Badge variant="secondary" className="bg-pink-500/10 text-pink-600">
                    <Globe className="h-3 w-3 mr-1" />
                    Localized
                  </Badge>
                </div>
              </Card>
            </div>

            {/* Impact Projects Showcase */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <Card className="p-6 bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 backdrop-blur-sm border-emerald-200/20 hover:border-emerald-400/50 transition-all duration-300 group">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl">
                    <GraduationCap className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Education Tech</h4>
                    <p className="text-muted-foreground">Building learning platforms that work offline and in low-bandwidth environments across Africa.</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-orange-500/5 to-red-500/5 backdrop-blur-sm border-orange-200/20 hover:border-orange-400/50 transition-all duration-300 group">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl">
                    <Briefcase className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Economic Empowerment</h4>
                    <p className="text-muted-foreground">Creating fintech and marketplace solutions that boost local economies and entrepreneurship.</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* African Tech Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="text-center p-6 bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 rounded-2xl backdrop-blur-sm border border-emerald-200/20">
                <div className="flex items-center justify-center mb-3">
                  <MapPin className="h-6 w-6 text-emerald-600 mr-2" />
                  <div className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">54</div>
                </div>
                <div className="text-sm font-medium text-muted-foreground">Countries</div>
                <div className="text-xs text-muted-foreground mt-1">Across the African continent</div>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-br from-orange-500/10 to-orange-600/10 rounded-2xl backdrop-blur-sm border border-orange-200/20">
                <div className="flex items-center justify-center mb-3">
                  <Layers className="h-6 w-6 text-orange-600 mr-2" />
                  <div className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">10+</div>
                </div>
                <div className="text-sm font-medium text-muted-foreground">Real Projects</div>
                <div className="text-xs text-muted-foreground mt-1">Solving African problems</div>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-br from-amber-500/10 to-amber-600/10 rounded-2xl backdrop-blur-sm border border-amber-200/20">
                <div className="flex items-center justify-center mb-3">
                  <Users className="h-6 w-6 text-amber-600 mr-2" />
                  <div className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-amber-700 bg-clip-text text-transparent">1M+</div>
                </div>
                <div className="text-sm font-medium text-muted-foreground">Lives Impacted</div>
                <div className="text-xs text-muted-foreground mt-1">Our target by 2029</div>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-br from-red-500/10 to-red-600/10 rounded-2xl backdrop-blur-sm border border-red-200/20">
                <div className="flex items-center justify-center mb-3">
                  <Flame className="h-6 w-6 text-red-600 mr-2" />
                  <div className="text-4xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">100%</div>
                </div>
                <div className="text-sm font-medium text-muted-foreground">African-Focused</div>
                <div className="text-xs text-muted-foreground mt-1">Built for local impact</div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-20 animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <h3 className="text-3xl font-bold mb-8 bg-gradient-to-r from-emerald-600 to-orange-600 bg-clip-text text-transparent">
                Be Part of Africa's Tech Renaissance
              </h3>
              <div className="max-w-3xl mx-auto mb-8">
                <p className="text-lg text-muted-foreground mb-6">
                  This is more than just learning to code - it's about joining a movement of African innovators who are 
                  reshaping our continent's future through technology, creativity, and determination.
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="flex items-center gap-3 p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/10">
                    <CheckCircle className="h-6 w-6 text-emerald-600 flex-shrink-0" />
                    <span className="font-medium text-emerald-700">Scholar-Ready Portfolio</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-orange-500/5 rounded-xl border border-orange-500/10">
                    <CheckCircle className="h-6 w-6 text-orange-600 flex-shrink-0" />
                    <span className="font-medium text-orange-700">Real Impact Projects</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-amber-500/5 rounded-xl border border-amber-500/10">
                    <CheckCircle className="h-6 w-6 text-amber-600 flex-shrink-0" />
                    <span className="font-medium text-amber-700">Community Leadership</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}