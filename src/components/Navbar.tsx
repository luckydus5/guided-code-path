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
    <nav className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Clean Logo */}
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-primary shadow-md">
              <Code className="h-6 w-6 text-white" />
            </div>
            <div className="font-display">
              <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                BuildStack
              </h1>
              <p className="text-xs text-muted-foreground font-medium">Learn by Building</p>
            </div>
          </div>

          {/* User Profile Section */}
          {user && profile && (
            <div className="flex items-center gap-4">
              {/* Stats - Desktop */}
              <div className="hidden lg:flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-warning/10 border border-warning/20">
                  <Zap className="h-4 w-4 text-warning" />
                  <span className="text-sm font-semibold text-foreground">{profile.xp}</span>
                  <span className="text-xs text-muted-foreground">XP</span>
                </div>
                
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                  <Star className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-foreground">Lvl {profile.level}</span>
                </div>

                {profile.streak > 0 && (
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-destructive/10 border border-destructive/20">
                    <span className="text-sm">🔥</span>
                    <span className="text-sm font-semibold text-foreground">{profile.streak} day{profile.streak > 1 ? 's' : ''}</span>
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
                <DropdownMenuContent align="end" className="w-80 bg-card backdrop-blur-lg border-border/50 shadow-xl z-50">
                  <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-t-lg">
                    <Avatar className="h-16 w-16 border-2 border-primary/30">
                      <AvatarImage src={profile.avatar_url} alt={profile.display_name} />
                      <AvatarFallback className="bg-gradient-primary text-white font-bold text-xl">
                        {profile.display_name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-semibold text-lg">{profile.display_name}</p>
                      <p className="text-sm text-muted-foreground">@{profile.username}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className="bg-gradient-primary text-white border-0">
                          Level {profile.level}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {profile.xp} / {getXPForNextLevel(profile.level)} XP
                        </span>
                      </div>
                      <div className="mt-2 w-full bg-muted rounded-full h-2 overflow-hidden">
                        <div 
                          className="bg-gradient-primary h-full rounded-full transition-all duration-500"
                          style={{ width: `${getProgressToNextLevel(profile.xp, profile.level)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="p-3 cursor-pointer hover:bg-primary/10 transition-colors">
                    <User className="mr-3 h-4 w-4 text-primary" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="p-3 cursor-pointer hover:bg-secondary/10 transition-colors">
                    <Trophy className="mr-3 h-4 w-4 text-secondary" />
                    <span>Achievements</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onSettingsClick} className="p-3 cursor-pointer hover:bg-accent/10 transition-colors">
                    <Settings className="mr-3 h-4 w-4 text-accent" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="p-3 cursor-pointer text-destructive hover:bg-destructive/10 transition-colors">
                    <LogOut className="mr-3 h-4 w-4" />
                    <span>Sign Out</span>
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