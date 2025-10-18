import { useState } from "react";
import { LoginScreen } from "@/components/chat/LoginScreen";
import { ChatLayout } from "@/components/chat/ChatLayout";

const Index = () => {
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  const handleLogin = (username: string) => {
    setCurrentUser(username);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  if (!currentUser) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return <ChatLayout currentUser={currentUser} onLogout={handleLogout} />;
};

export default Index;
