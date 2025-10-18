import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Smile, Paperclip } from "lucide-react";

interface MessageInputProps {
  onSendMessage: (content: string) => void;
}

export const MessageInput = ({ onSendMessage }: MessageInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-border bg-background">
      <div className="flex items-end gap-2">
        <Button type="button" variant="ghost" size="icon" className="shrink-0">
          <Paperclip className="h-5 w-5" />
        </Button>
        <div className="flex-1 relative">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="pr-10"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
          >
            <Smile className="h-4 w-4" />
          </Button>
        </div>
        <Button type="submit" size="icon" className="shrink-0" disabled={!message.trim()}>
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </form>
  );
};
