import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Loader2, 
  Mail, 
  Lock, 
  User, 
  ArrowLeft, 
  Code, 
  Sparkles, 
  Shield, 
  Zap,
  Star,
  Rocket,
  Heart,
  Globe
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface AuthFormProps {
  onAuthSuccess: () => void;
  onGoBack?: () => void;
}

export default function AuthForm({ onAuthSuccess, onGoBack }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { toast } = useToast();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
            display_name: username
          },
          emailRedirectTo: `${window.location.origin}/`
        }
      });

      if (error) {
        toast({
          title: "Sign Up Failed",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Account Created!",
          description: "Welcome to CodeLearner! You can now start your coding journey.",
        });
        onAuthSuccess();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        toast({
          title: "Sign In Failed",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Welcome Back!",
          description: "Successfully signed in to your account.",
        });
        onAuthSuccess();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/20 overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-pink-600/5" />
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Motivational Content */}
          <div className="hidden lg:block space-y-8 animate-fade-in">
            {/* Go Back Button */}
            {onGoBack && (
              <Button
                variant="ghost"
                onClick={onGoBack}
                className="mb-6 hover:bg-white/10 transition-all duration-300 group"
              >
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Button>
            )}

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-lg opacity-50"></div>
                  <div className="relative p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl">
                    <Code className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Join CodeLearner
                  </h1>
                  <p className="text-xl text-muted-foreground">
                    Where coding dreams become reality
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Transform your passion for technology into professional skills. Join thousands of developers who've accelerated their careers through our interactive learning platform.
                </p>

                {/* Features List */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl backdrop-blur-sm border border-blue-200/20">
                    <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
                      <Rocket className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Interactive Challenges</h3>
                      <p className="text-sm text-muted-foreground">Learn by doing with hands-on coding exercises</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl backdrop-blur-sm border border-purple-200/20">
                    <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                      <Zap className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">AI-Powered Feedback</h3>
                      <p className="text-sm text-muted-foreground">Get instant code reviews and personalized tips</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl backdrop-blur-sm border border-green-200/20">
                    <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                      <Globe className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Global Community</h3>
                      <p className="text-sm text-muted-foreground">Connect with developers worldwide</p>
                    </div>
                  </div>
                </div>

                {/* Trust Indicators */}
                <div className="flex items-center gap-6 pt-4">
                  <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-500" />
                    <span className="text-sm font-medium text-muted-foreground">10k+ Happy Learners</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-500" />
                    <span className="text-sm font-medium text-muted-foreground">Secure & Private</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Auth Form */}
          <div className="w-full space-y-6 animate-slide-up">
            {/* Mobile Go Back Button */}
            {onGoBack && (
              <div className="lg:hidden">
                <Button
                  variant="ghost"
                  onClick={onGoBack}
                  className="mb-6 hover:bg-white/10 transition-all duration-300 group"
                >
                  <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                  Back to Home
                </Button>
              </div>
            )}

            <Card className="bg-card/80 backdrop-blur-xl border-border/50 shadow-2xl">
              <CardHeader className="text-center space-y-4 pb-8">
                <div className="mx-auto">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-lg opacity-50"></div>
                    <div className="relative p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl">
                      <Code className="h-8 w-8 text-white mx-auto" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Welcome to CodeLearner
                  </CardTitle>
                  <CardDescription className="text-base">
                    Start your coding journey with gamified learning
                  </CardDescription>
                </div>

                {/* Quick Stats */}
                <div className="flex items-center justify-center gap-6 pt-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-medium">6+ Languages</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Sparkles className="h-4 w-4 text-purple-500" />
                    <span className="text-sm font-medium">AI Powered</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <Tabs defaultValue="signin" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 p-1 bg-muted/50">
                    <TabsTrigger 
                      value="signin" 
                      className="text-sm font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm"
                    >
                      Sign In
                    </TabsTrigger>
                    <TabsTrigger 
                      value="signup"
                      className="text-sm font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm"
                    >
                      Create Account
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="signin" className="space-y-6 mt-6">
                    <div className="text-center space-y-2 mb-6">
                      <h3 className="text-xl font-semibold">Welcome back!</h3>
                      <p className="text-muted-foreground">Sign in to continue your learning journey</p>
                    </div>

                    <form onSubmit={handleSignIn} className="space-y-5">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="pl-10 h-11 bg-background/50 border-border/50 focus:border-primary/50 focus:bg-background"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="pl-10 h-11 bg-background/50 border-border/50 focus:border-primary/50 focus:bg-background"
                            required
                          />
                        </div>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 group" 
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Signing In...
                          </>
                        ) : (
                          <>
                            <Rocket className="mr-2 h-4 w-4 group-hover:translate-y-[-1px] transition-transform" />
                            Sign In & Start Learning
                          </>
                        )}
                      </Button>
                    </form>

                    <div className="text-center pt-4 border-t border-border/50">
                      <p className="text-sm text-muted-foreground">
                        Don't have an account?{" "}
                        <Button variant="link" className="p-0 h-auto text-primary hover:text-primary/80">
                          Create one now
                        </Button>
                      </p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="signup" className="space-y-6 mt-6">
                    <div className="text-center space-y-2 mb-6">
                      <h3 className="text-xl font-semibold">Start your journey!</h3>
                      <p className="text-muted-foreground">Join thousands of developers worldwide</p>
                    </div>

                    <form onSubmit={handleSignUp} className="space-y-5">
                      <div className="space-y-2">
                        <Label htmlFor="username" className="text-sm font-medium">Username</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="username"
                            type="text"
                            placeholder="Choose a unique username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="pl-10 h-11 bg-background/50 border-border/50 focus:border-primary/50 focus:bg-background"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="signup-email" className="text-sm font-medium">Email Address</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="signup-email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="pl-10 h-11 bg-background/50 border-border/50 focus:border-primary/50 focus:bg-background"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="signup-password" className="text-sm font-medium">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="signup-password"
                            type="password"
                            placeholder="Create a secure password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="pl-10 h-11 bg-background/50 border-border/50 focus:border-primary/50 focus:bg-background"
                            required
                            minLength={6}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Must be at least 6 characters long
                        </p>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full h-11 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 group" 
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating Account...
                          </>
                        ) : (
                          <>
                            <Sparkles className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
                            Create Account & Start Learning
                          </>
                        )}
                      </Button>
                    </form>

                    <div className="text-center pt-4 border-t border-border/50">
                      <p className="text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Button variant="link" className="p-0 h-auto text-primary hover:text-primary/80">
                          Sign in instead
                        </Button>
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>

                {/* Additional Features */}
                <div className="pt-6 border-t border-border/50">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="space-y-2">
                      <Badge variant="secondary" className="bg-blue-500/10 text-blue-600 px-2 py-1">
                        <Star className="h-3 w-3 mr-1" />
                        Free
                      </Badge>
                      <p className="text-xs text-muted-foreground">Always free to start</p>
                    </div>
                    <div className="space-y-2">
                      <Badge variant="secondary" className="bg-green-500/10 text-green-600 px-2 py-1">
                        <Shield className="h-3 w-3 mr-1" />
                        Secure
                      </Badge>
                      <p className="text-xs text-muted-foreground">Your data is protected</p>
                    </div>
                    <div className="space-y-2">
                      <Badge variant="secondary" className="bg-purple-500/10 text-purple-600 px-2 py-1">
                        <Zap className="h-3 w-3 mr-1" />
                        Fast
                      </Badge>
                      <p className="text-xs text-muted-foreground">Start learning instantly</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}