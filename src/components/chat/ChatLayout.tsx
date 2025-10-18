import { useState } from "react";
import { Sidebar } from "./SideBar";
import { MessageList, Message } from "./MessageList";
import { MessageInput } from "./MessageInput";
import { Hash } from "lucide-react";

interface ChatLayoutProps {
  currentUser: string;
  onLogout: () => void;
}

const INITIAL_CHANNELS = [
  { id: "general", name: "general", unread: 0 },
  { id: "random", name: "random", unread: 2 },
  { id: "dev", name: "dev", unread: 0 },
  { id: "design", name: "design", unread: 5 },
];

const INITIAL_MESSAGES: Record<string, Message[]> = {
  general: [
    {
      id: "1",
      author: "Alice",
      content: "Hey everyone! Welcome to ChatHub 👋",
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: "2",
      author: "Bob",
      content: "Thanks! This looks amazing!",
      timestamp: new Date(Date.now() - 3000000),
    },
    {
      id: "3",
      author: "Charlie",
      content: "I love the clean interface. Great job!",
      timestamp: new Date(Date.now() - 2400000),
    },
  ],
  random: [
    {
      id: "1",
      author: "Diana",
      content: "Anyone up for a coffee break? ☕",
      timestamp: new Date(Date.now() - 1800000),
    },
  ],
  dev: [
    {
      id: "1",
      author: "Eve",
      content: "Working on the new feature. ETA 2 hours.",
      timestamp: new Date(Date.now() - 900000),
    },
  ],
  design: [
    {
      id: "1",
      author: "Frank",
      content: "Check out the new mockups I just shared!",
      timestamp: new Date(Date.now() - 600000),
    },
  ],
};

export const ChatLayout = ({ currentUser, onLogout }: ChatLayoutProps) => {
  const [currentChannel, setCurrentChannel] = useState("general");
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [channels, setChannels] = useState(INITIAL_CHANNELS);

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      author: currentUser,
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => ({
      ...prev,
      [currentChannel]: [...(prev[currentChannel] || []), newMessage],
    }));
  };

  const handleChannelSelect = (channelId: string) => {
    setCurrentChannel(channelId);
    setChannels((prev) =>
      prev.map((ch) => (ch.id === channelId ? { ...ch, unread: 0 } : ch))
    );
  };

  const currentChannelName = channels.find((ch) => ch.id === currentChannel)?.name || "general";

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        currentUser={currentUser}
        currentChannel={currentChannel}
        channels={channels}
        onChannelSelect={handleChannelSelect}
        onLogout={onLogout}
      />
      <div className="flex-1 flex flex-col">
        {/* Channel Header */}
        <div className="h-14 border-b border-border px-4 flex items-center gap-2 bg-card">
          <Hash className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold text-foreground">{currentChannelName}</h2>
        </div>

        {/* Messages */}
        <MessageList messages={messages[currentChannel] || []} currentUser={currentUser} />

        {/* Input */}
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};
