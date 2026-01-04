"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Paperclip, Smile } from "lucide-react";

interface MessageInputProps {
  onSend: (message: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

export function MessageInput({
  onSend,
  isLoading,
  placeholder = "Type a message...",
}: MessageInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSend(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Send on Enter, new line on Shift+Enter
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t bg-white p-4">
      <div className="flex items-end gap-2">
        {/* Emoji Picker Button */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="mb-1 flex-shrink-0"
        >
          <Smile className="h-5 w-5" />
        </Button>

        {/* File Attachment Button */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="mb-1 flex-shrink-0"
        >
          <Paperclip className="h-5 w-5" />
        </Button>

        {/* Message Input */}
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="min-h-[44px] max-h-32 resize-none"
          rows={1}
        />

        {/* Send Button */}
        <Button
          type="submit"
          disabled={!message.trim() || isLoading}
          size="icon"
          className="mb-1 flex-shrink-0"
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>

      <p className="mt-1 text-xs text-muted-foreground">
        Press Enter to send, Shift+Enter for new line
      </p>
    </form>
  );
}
