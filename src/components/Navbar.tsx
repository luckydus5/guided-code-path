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
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-card/80 backdrop-blur-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-secondary">
              <Code className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                CodePath Academy
              </h1>
              <p className="text-xs text-muted-foreground">Learn. Build. Succeed.</p>
            </div>
          </div>

          {/* User Profile */}
          {user && profile && (
            <div className="flex items-center gap-4">
              {/* XP and Level Info */}
              <div className="hidden md:flex items-center gap-3">
                <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-warning/20 text-warning">
                  <Zap className="h-3 w-3" />
                  <span className="text-xs font-medium">{profile.xp} XP</span>
                </div>
                
                <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-primary/20 text-primary">
                  <Star className="h-3 w-3" />
                  <span className="text-xs font-medium">Level {profile.level}</span>
                </div>

                {profile.streak > 0 && (
                  <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-destructive/20 text-destructive">
                    <span className="text-xs">🔥</span>
                    <span className="text-xs font-medium">{profile.streak} day{profile.streak > 1 ? 's' : ''}</span>
                  </div>
                )}
              </div>

              <ThemeToggle />

              {/* User Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={profile.avatar_url} alt={profile.display_name} />
                      <AvatarFallback className="bg-gradient-primary text-white">
                        {profile.display_name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-72">
                  <div className="flex items-center gap-3 p-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={profile.avatar_url} alt={profile.display_name} />
                      <AvatarFallback className="bg-gradient-primary text-white">
                        {profile.display_name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">{profile.display_name}</p>
                      <p className="text-sm text-muted-foreground">@{profile.username}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          Level {profile.level}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {profile.xp} / {getXPForNextLevel(profile.level)} XP
                        </span>
                      </div>
                      <div className="mt-2 w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${getProgressToNextLevel(profile.xp, profile.level)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Trophy className="mr-2 h-4 w-4" />
                    Achievements
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onSettingsClick}>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
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