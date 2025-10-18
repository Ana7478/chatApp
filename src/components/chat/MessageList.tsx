import { useEffect, useRef } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface Message {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
}

interface MessageListProps {
  messages: Message[];
  currentUser: string;
}

export const MessageList = ({ messages, currentUser }: MessageListProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <ScrollArea className="flex-1 p-4" ref={scrollRef}>
      <div className="space-y-4">
        {messages.map((message, index) => {
          const isCurrentUser = message.author === currentUser;
          const showAvatar = index === 0 || messages[index - 1].author !== message.author;

          return (
            <div
              key={message.id}
              className={`flex gap-3 animate-fade-in ${showAvatar ? "mt-4" : "mt-1"}`}
            >
              {showAvatar ? (
                <Avatar className="h-10 w-10">
                  <AvatarFallback
                    className={
                      isCurrentUser
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }
                  >
                    {message.author.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <div className="w-10" />
              )}
              <div className="flex-1 space-y-1">
                {showAvatar && (
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-semibold text-foreground">
                      {message.author}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                )}
                <p className="text-sm text-foreground leading-relaxed">{message.content}</p>
              </div>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
};
