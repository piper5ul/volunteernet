"use client";

import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { formatDate } from "@/lib/utils/date-utils";
import type { Message, User } from "@/lib/types";

interface MessageThreadProps {
  messages: Array<
    Message & {
      sender?: User | null;
    }
  >;
  currentUserId: string;
}

export function MessageThread({ messages, currentUserId }: MessageThreadProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">No messages yet. Start the conversation!</p>
      </div>
    );
  }

  // Group messages by date
  const groupedMessages: { [key: string]: typeof messages } = {};
  messages.forEach((message) => {
    const dateKey = formatDate(message.created_at, "PP");
    if (!groupedMessages[dateKey]) {
      groupedMessages[dateKey] = [];
    }
    groupedMessages[dateKey].push(message);
  });

  return (
    <div ref={scrollRef} className="flex h-full flex-col gap-4 overflow-y-auto p-4">
      {Object.entries(groupedMessages).map(([date, dateMessages]) => (
        <div key={date}>
          {/* Date Divider */}
          <div className="mb-4 flex items-center justify-center">
            <span className="rounded-full bg-gray-200 px-3 py-1 text-xs text-muted-foreground">
              {date}
            </span>
          </div>

          {/* Messages for this date */}
          <div className="space-y-4">
            {dateMessages.map((message) => {
              const isOwnMessage = message.sender_id === currentUserId;
              const initials = message.sender?.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase();

              return (
                <div
                  key={message.id}
                  className={`flex items-start gap-3 ${
                    isOwnMessage ? "flex-row-reverse" : ""
                  }`}
                >
                  {/* Avatar */}
                  <Avatar className="h-8 w-8">
                    {message.sender?.avatar_url ? (
                      <AvatarImage
                        src={message.sender.avatar_url}
                        alt={message.sender.name}
                      />
                    ) : (
                      <AvatarFallback className="text-xs">{initials}</AvatarFallback>
                    )}
                  </Avatar>

                  {/* Message Bubble */}
                  <div
                    className={`flex max-w-[70%] flex-col ${
                      isOwnMessage ? "items-end" : "items-start"
                    }`}
                  >
                    {!isOwnMessage && (
                      <span className="mb-1 text-xs font-medium text-muted-foreground">
                        {message.sender?.name}
                      </span>
                    )}

                    <div
                      className={`rounded-lg px-4 py-2 ${
                        isOwnMessage
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-900"
                      }`}
                    >
                      <p className="whitespace-pre-wrap break-words text-sm">
                        {message.body}
                      </p>
                    </div>

                    <span className="mt-1 text-xs text-muted-foreground">
                      {formatDate(message.created_at, "p")}
                      {message.is_read && isOwnMessage && (
                        <span className="ml-1">✓✓</span>
                      )}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
