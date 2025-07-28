import AuthForm from "@/components/AuthForm";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const navigate = useNavigate();

  const handleAuthSuccess = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return <AuthForm onAuthSuccess={handleAuthSuccess} onGoBack={handleGoBack} />;
}