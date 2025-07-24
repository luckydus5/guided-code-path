import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeroSection from "@/components/HeroSection";
import LanguageSelector from "@/components/LanguageSelector";

interface Language {
  id: string;
  name: string;
  icon: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  color: string;
}

const Index = () => {
  const navigate = useNavigate();
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);

  const handleGetStarted = () => {
    setShowLanguageSelector(true);
  };

  const handleLanguageSelect = (language: Language) => {
    // Navigate to learning page with selected language
    navigate(`/learn/${language.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {!showLanguageSelector ? (
        <HeroSection onGetStarted={handleGetStarted} />
      ) : (
        <div className="min-h-screen flex items-center justify-center py-12">
          <LanguageSelector onSelect={handleLanguageSelect} />
        </div>
      )}
    </div>
  );
};

export default Index;
