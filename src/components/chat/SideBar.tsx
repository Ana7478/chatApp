import { Hash, Plus, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Channel {
  id: string;
  name: string;
  unread?: number;
}

interface SidebarProps {
  currentUser: string;
  currentChannel: string;
  channels: Channel[];
  onChannelSelect: (channelId: string) => void;
  onLogout: () => void;
}

export const Sidebar = ({ currentUser, currentChannel, channels, onChannelSelect, onLogout }: SidebarProps) => {
  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <h2 className="text-lg font-bold text-sidebar-foreground">ChatHub</h2>
      </div>

      {/* Channels */}
      <ScrollArea className="flex-1 px-2 py-4">
        <div className="space-y-1">
          <div className="flex items-center justify-between px-2 mb-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase">Channels</span>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {channels.map((channel) => (
            <button
              key={channel.id}
              onClick={() => onChannelSelect(channel.id)}
              className={`w-full flex items-center justify-between px-2 py-2 rounded-md text-sm transition-colors ${
                currentChannel === channel.id
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              }`}
            >
              <div className="flex items-center gap-2">
                <Hash className="h-4 w-4" />
                <span>{channel.name}</span>
              </div>
              {channel.unread && channel.unread > 0 && (
                <Badge variant="default" className="h-5 px-1.5 text-xs">
                  {channel.unread}
                </Badge>
              )}
            </button>
          ))}
        </div>
      </ScrollArea>

      {/* User Section */}
      <div className="p-3 border-t border-sidebar-border bg-sidebar-accent/30">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-primary text-primary-foreground">
              {currentUser.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">{currentUser}</p>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span className="text-xs text-muted-foreground">Online</span>
            </div>
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
