import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { User as SupabaseUser, Session } from "@supabase/supabase-js";
import HeroSection from "@/components/HeroSection";
import LanguageSelector from "@/components/LanguageSelector";
import GameDashboard from "@/components/GameDashboard";
import CompellingDashboard from "@/components/CompellingDashboard";
import Navbar from "@/components/Navbar";
import AuthForm from "@/components/AuthForm";

interface Language {
  id: string;
  name: string;
  icon: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  color: string;
}

interface UserProfile {
  id: string;
  user_id: string;
  username: string | null;
  display_name: string | null;
  xp: number;
  level: number;
  streak: number;
  avatar_url?: string | null;
  bio?: string | null;
  last_activity?: string | null;
  created_at: string;
  updated_at: string;
}

const Index = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAuth, setShowAuth] = useState(false);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [showProfileSettings, setShowProfileSettings] = useState(false);

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      // Set up auth listener first
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          setSession(session);
          setUser(session?.user ?? null);
          
          if (session?.user) {
            // Defer profile handling to avoid auth callback deadlock
            setTimeout(() => {
              handleUserProfile(session.user.id);
            }, 0);
          } else {
            setProfile(null);
            setLoading(false);
          }
        }
      );

      // Then check for existing session
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      
      if (currentSession?.user) {
        setSession(currentSession);
        setUser(currentSession.user);
        await handleUserProfile(currentSession.user.id);
      } else {
        setLoading(false);
      }

      return () => subscription.unsubscribe();
    } catch (error) {
      console.error('Auth initialization error:', error);
      setLoading(false);
    }
  };

  const handleUserProfile = async (userId: string) => {
    try {
      // First try to fetch existing profile
      const { data: existingProfile, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (fetchError) {
        console.error('Error fetching profile:', fetchError);
        setLoading(false);
        return;
      }

      if (existingProfile) {
        setProfile(existingProfile);
        setLoading(false);
      } else {
        // Create new profile if doesn't exist
        const { data: newProfile, error: createError } = await supabase
          .from('profiles')
          .insert({
            user_id: userId,
            username: `user_${Date.now()}`,
            display_name: 'New Learner',
            xp: 0,
            level: 1,
            streak: 0
          })
          .select()
          .single();

        if (createError) {
          console.error('Error creating profile:', createError);
          setLoading(false);
          return;
        }

        setProfile(newProfile);
        setLoading(false);
      }
    } catch (error) {
      console.error('Profile handling error:', error);
      setLoading(false);
    }
  };

  const handleGetStarted = () => {
    if (!user) {
      setShowAuth(true);
    } else {
      setShowLanguageSelector(true);
    }
  };

  const handleSignIn = () => {
    setShowAuth(true);
  };

  const handleLanguageSelect = (language: Language) => {
    navigate(`/learn/${language.id}`);
  };

  const handleBackToDashboard = () => {
    setShowLanguageSelector(false);
  };

  const handleProfileUpdate = async () => {
    // Refresh the profile data
    if (user?.id) {
      await handleUserProfile(user.id);
    }
  };

  const handleSettingsClick = () => {
    setShowProfileSettings(true);
  };

  const handleAuthSuccess = () => {
    setShowAuth(false);
    // Don't immediately show language selector, wait for profile to load
    // This will be handled by the auth state change listener
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      setProfile(null);
      setShowLanguageSelector(false);
      setShowAuth(false);
      setLoading(false);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (showAuth) {
    return <AuthForm onAuthSuccess={handleAuthSuccess} onGoBack={() => setShowAuth(false)} />;
  }

  // Show loading if user exists but profile is still loading
  if (user && !profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-muted-foreground">Setting up your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        user={user} 
        profile={profile} 
        onSignOut={handleSignOut}
        onSettingsClick={handleSettingsClick}
      />
      
      {user && profile ? (
        showLanguageSelector ? (
          <div className="min-h-screen flex items-center justify-center py-12">
            <LanguageSelector onSelect={handleLanguageSelect} onBack={handleBackToDashboard} />
          </div>
        ) : (
          <CompellingDashboard 
            user={user} 
            profile={profile} 
            onProfileUpdate={handleProfileUpdate}
            showProfileEdit={showProfileSettings}
            onCloseProfileEdit={() => setShowProfileSettings(false)}
          />
        )
      ) : (
        <HeroSection onGetStarted={handleGetStarted} onSignIn={handleSignIn} />
      )}
    </div>
  );
};

export default Index;