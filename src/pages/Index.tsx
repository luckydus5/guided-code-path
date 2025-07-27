import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import HeroSection from "@/components/HeroSection";
import LanguageSelector from "@/components/LanguageSelector";
import GameDashboard from "@/components/GameDashboard";
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
  username: string;
  display_name: string;
  xp: number;
  level: number;
  streak: number;
  avatar_url?: string;
}

const Index = () => {
  const navigate = useNavigate();
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    // Check for existing session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchProfile(session.user.id);
      }
      setLoading(false);
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      if (data) {
        setProfile(data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleGetStarted = () => {
    if (!user) {
      setShowAuth(true);
    } else {
      setShowLanguageSelector(true);
    }
  };

  const handleLanguageSelect = (language: Language) => {
    navigate(`/learn/${language.id}`);
  };

  const handleAuthSuccess = () => {
    setShowAuth(false);
  };

  const handleSignOut = () => {
    setUser(null);
    setProfile(null);
    setShowLanguageSelector(false);
    setShowAuth(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (showAuth) {
    return <AuthForm onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={user} profile={profile} onSignOut={handleSignOut} />
      
      {user && profile ? (
        showLanguageSelector ? (
          <div className="min-h-screen flex items-center justify-center py-12">
            <LanguageSelector onSelect={handleLanguageSelect} />
          </div>
        ) : (
          <GameDashboard user={user} profile={profile} />
        )
      ) : (
        <HeroSection onGetStarted={handleGetStarted} />
      )}
    </div>
  );
};

export default Index;
