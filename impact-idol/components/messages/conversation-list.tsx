import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "@/lib/utils/date-utils";
import type { Conversation, User, Organization } from "@/lib/types";
import Link from "next/link";

interface ConversationListProps {
  conversations: Array<
    Conversation & {
      otherParticipant?: User | Organization | null;
      lastMessage?: {
        body: string;
        created_at: Date;
        sender_id: string;
      } | null;
      unread_count?: number;
    }
  >;
  currentUserId: string;
}

export function ConversationList({ conversations, currentUserId }: ConversationListProps) {
  if (conversations.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <p className="text-muted-foreground">No conversations yet</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-2">
      {conversations.map((conversation) => {
        const otherParticipant = conversation.otherParticipant;
        const isUnread = (conversation.unread_count || 0) > 0;
        const lastMessageFromOther =
          conversation.lastMessage?.sender_id !== currentUserId;

        const participantName = otherParticipant?.name || "Unknown";
        const participantAvatar =
          "avatar_url" in (otherParticipant || {})
            ? (otherParticipant as User)?.avatar_url
            : "logo_url" in (otherParticipant || {})
              ? (otherParticipant as Organization)?.logo_url
              : null;

        const initials = participantName
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase();

        return (
          <Link key={conversation.id} href={`/messages/${conversation.id}`}>
            <Card
              className={`cursor-pointer transition-all hover:shadow-md ${
                isUnread ? "border-blue-500 bg-blue-50" : ""
              }`}
            >
              <CardContent className="flex items-center gap-4 p-4">
                <Avatar className="h-12 w-12">
                  {participantAvatar ? (
                    <AvatarImage src={participantAvatar} alt={participantName} />
                  ) : (
                    <AvatarFallback>{initials}</AvatarFallback>
                  )}
                </Avatar>

                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center justify-between gap-2">
                    <p
                      className={`font-medium ${
                        isUnread ? "font-semibold text-blue-900" : ""
                      }`}
                    >
                      {participantName}
                    </p>
                    {conversation.lastMessage && (
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(conversation.lastMessage.created_at))}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    {conversation.lastMessage && (
                      <p
                        className={`text-sm text-muted-foreground line-clamp-1 ${
                          isUnread && lastMessageFromOther ? "font-medium text-blue-800" : ""
                        }`}
                      >
                        {conversation.lastMessage.sender_id === currentUserId
                          ? "You: "
                          : ""}
                        {conversation.lastMessage.body}
                      </p>
                    )}
                    {isUnread && (
                      <Badge className="ml-auto bg-blue-600 text-xs">
                        {conversation.unread_count}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
