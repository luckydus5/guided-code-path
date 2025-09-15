import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/ThemeToggle";
import { User, LogOut, Settings, Trophy, Code, Zap, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { User as SupabaseUser } from "@supabase/supabase-js";

interface UserProfile {
  id: string;
  username: string;
  display_name: string;
  xp: number;
  level: number;
  streak: number;
  avatar_url?: string;
}

interface NavbarProps {
  user: SupabaseUser | null;
  profile: UserProfile | null;
  onSignOut: () => void;
  onSettingsClick?: () => void;
}

export default function Navbar({ user, profile, onSignOut, onSettingsClick }: NavbarProps) {
  const { toast } = useToast();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive"
      });
    } else {
      onSignOut();
      toast({
        title: "Signed Out",
        description: "Successfully signed out of your account"
      });
    }
  };

  const getXPForNextLevel = (level: number) => {
    return level * 100; // Simple formula: each level requires 100 * level XP
  };

  const getProgressToNextLevel = (xp: number, level: number) => {
    const currentLevelXP = (level - 1) * 100;
    const nextLevelXP = level * 100;
    const progress = ((xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;
    return Math.max(0, Math.min(100, progress));
  };

  return (
    <nav className="sticky top-0 z-50 w-full glassmorphism border-b border-border/30">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Enhanced Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="p-3 rounded-2xl bg-gradient-primary shadow-medium">
                <Code className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -inset-1 bg-gradient-primary rounded-2xl opacity-30 blur-sm -z-10"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                CodePath Academy
              </h1>
              <p className="text-xs text-muted-foreground font-medium">Learn. Build. Succeed.</p>
            </div>
          </div>

          {/* Enhanced User Profile */}
          {user && profile && (
            <div className="flex items-center gap-3">
              {/* Enhanced XP and Level Info */}
              <div className="hidden md:flex items-center gap-2">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-warning/20 to-warning/10 border border-warning/20 shadow-soft">
                  <Zap className="h-4 w-4 text-warning" />
                  <span className="text-sm font-semibold text-warning">{profile.xp}</span>
                  <span className="text-xs text-warning/70">XP</span>
                </div>
                
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/20 shadow-soft">
                  <Star className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-primary">{profile.level}</span>
                </div>

                {profile.streak > 0 && (
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-destructive/20 to-destructive/10 border border-destructive/20 shadow-soft">
                    <span className="text-sm">🔥</span>
                    <span className="text-sm font-semibold text-destructive">{profile.streak}</span>
                  </div>
                )}
              </div>

              <ThemeToggle />

              {/* Enhanced User Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative h-12 w-12 rounded-full hover:ring-2 hover:ring-primary/20 transition-all">
                    <Avatar className="h-12 w-12 border-2 border-primary/20">
                      <AvatarImage src={profile.avatar_url} alt={profile.display_name} />
                      <AvatarFallback className="bg-gradient-primary text-white font-bold text-lg">
                        {profile.display_name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80 shadow-strong border-border/50">
                  <div className="flex items-center gap-4 p-4 bg-gradient-card rounded-t-lg">
                    <Avatar className="h-16 w-16 border-3 border-primary/30 shadow-medium">
                      <AvatarImage src={profile.avatar_url} alt={profile.display_name} />
                      <AvatarFallback className="bg-gradient-primary text-white font-bold text-xl">
                        {profile.display_name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-semibold text-lg text-foreground">{profile.display_name}</p>
                      <p className="text-sm text-muted-foreground">@{profile.username}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className="bg-gradient-primary text-white border-0 font-medium">
                          Level {profile.level}
                        </Badge>
                        <span className="text-sm text-muted-foreground font-medium">
                          {profile.xp} / {getXPForNextLevel(profile.level)} XP
                        </span>
                      </div>
                      <div className="mt-3 w-full bg-muted rounded-full h-3 overflow-hidden">
                        <div 
                          className="bg-gradient-primary h-full rounded-full transition-all duration-500 shadow-glow"
                          style={{ width: `${getProgressToNextLevel(profile.xp, profile.level)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="p-3 hover:bg-primary/5 transition-colors">
                    <User className="mr-3 h-5 w-5 text-primary" />
                    <span className="font-medium">Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="p-3 hover:bg-secondary/5 transition-colors">
                    <Trophy className="mr-3 h-5 w-5 text-secondary" />
                    <span className="font-medium">Achievements</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onSettingsClick} className="p-3 hover:bg-accent/5 transition-colors">
                    <Settings className="mr-3 h-5 w-5 text-accent" />
                    <span className="font-medium">Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="p-3 text-destructive hover:bg-destructive/5 transition-colors">
                    <LogOut className="mr-3 h-5 w-5" />
                    <span className="font-medium">Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}

          {/* Show theme toggle for non-logged in users */}
          {!user && <ThemeToggle />}
        </div>
      </div>
    </nav>
  );
}