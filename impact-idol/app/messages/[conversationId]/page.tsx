"use client";

import { use } from "react";
import { trpc } from "@/lib/utils/trpc";
import { useAuth } from "@/lib/stores/auth-store";
import { Skeleton } from "@/components/ui/skeleton";
import { MessageThread } from "@/components/messages/message-thread";
import { MessageInput } from "@/components/messages/message-input";
import { toast } from "sonner";
import { ArrowLeft, Phone, Video, MoreVertical } from "lucide-react";
import Link from "next/link";

export default function ConversationPage({
  params,
}: {
  params: Promise<{ conversationId: string }>;
}) {
  const { conversationId } = use(params);
  const { currentPersona } = useAuth();

  const userId =
    currentPersona.type === "volunteer" ||
    currentPersona.type === "squad-leader" ||
    currentPersona.type === "org-admin"
      ? currentPersona.type === "org-admin"
        ? `org-${currentPersona.organizationId}`
        : currentPersona.userId
      : null;

  const { data: conversation, isLoading } = trpc.messages.getConversation.useQuery({
    conversationId,
  });

  const sendMutation = trpc.messages.sendMessage.useMutation({
    onSuccess: () => {
      // Refetch messages
      trpcUtils.messages.getConversation.invalidate({ conversationId });
    },
    onError: (error) => {
      toast.error("Failed to Send", { description: error.message });
    },
  });

  const trpcUtils = trpc.useUtils();

  if (!userId || currentPersona.type === "guest") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fbfbfc]">
        <div className="text-center">
          <h1 className="mb-2 text-[18px] font-semibold text-linear-900">Login Required</h1>
          <p className="mb-4 text-[13px] text-linear-600">
            Please log in to view messages.
          </p>
          <Link href="/login" className="bg-linear-900 hover:bg-black text-white text-[13px] font-medium px-4 py-2 rounded-md shadow-subtle inline-block">
            Log In
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex h-screen flex-col bg-white">
        <div className="h-14 border-b border-linear-100 flex items-center px-6">
          <Skeleton className="h-5 w-48" />
        </div>
        <div className="flex-1 bg-[#fbfbfc] p-6">
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-3/4" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!conversation) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fbfbfc]">
        <div className="text-center">
          <h1 className="mb-2 text-[18px] font-semibold text-linear-900">Conversation Not Found</h1>
          <p className="mb-4 text-[13px] text-linear-600">
            This conversation doesn't exist or you don't have access to it.
          </p>
          <Link href="/messages" className="bg-linear-900 hover:bg-black text-white text-[13px] font-medium px-4 py-2 rounded-md shadow-subtle inline-block">
            Back to Messages
          </Link>
        </div>
      </div>
    );
  }

  const otherParticipant = conversation.otherParticipant;
  const participantName = otherParticipant?.name || "Unknown";
  const participantAvatar =
    "avatar_url" in (otherParticipant || {})
      ? (otherParticipant as any)?.avatar_url
      : "logo_url" in (otherParticipant || {})
        ? (otherParticipant as any)?.logo_url
        : null;

  const initials = participantName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const handleSend = (message: string) => {
    sendMutation.mutate({
      conversationId,
      body: message,
    });
  };

  return (
    <div className="flex h-screen flex-col bg-white">
      {/* Header */}
      <header className="h-14 border-b border-linear-100 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/messages" className="text-linear-500 hover:text-linear-900 transition-colors">
            <ArrowLeft className="h-4 w-4" />
          </Link>

          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-linear-100 flex items-center justify-center text-[12px] font-bold text-linear-700 overflow-hidden">
              {participantAvatar ? (
                <img src={participantAvatar} alt={participantName} className="w-full h-full object-cover" />
              ) : (
                initials
              )}
            </div>

            <div>
              <p className="text-[13px] font-semibold text-linear-900">{participantName}</p>
              <p className="text-[11px] text-linear-500">Active now</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1">
          <button className="p-2 hover:bg-linear-100 rounded-md text-linear-600 hover:text-linear-900 transition-colors">
            <Phone className="h-4 w-4" />
          </button>
          <button className="p-2 hover:bg-linear-100 rounded-md text-linear-600 hover:text-linear-900 transition-colors">
            <Video className="h-4 w-4" />
          </button>
          <button className="p-2 hover:bg-linear-100 rounded-md text-linear-600 hover:text-linear-900 transition-colors">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-hidden bg-[#fbfbfc]">
        <MessageThread messages={conversation.messages || []} currentUserId={userId} />
      </div>

      {/* Input */}
      <MessageInput onSend={handleSend} isLoading={sendMutation.isPending} />
    </div>
  );
}
