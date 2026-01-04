"use client";

import { trpc } from "@/lib/utils/trpc";
import { useAuth } from "@/lib/stores/auth-store";
import { Skeleton } from "@/components/ui/skeleton";
import { Archive, Send, Inbox as InboxIcon, Paperclip, Star, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function MessagesPage() {
  const router = useRouter();
  const { currentPersona } = useAuth();
  const [filter, setFilter] = useState<"inbox" | "sent" | "archived">("inbox");
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);

  const userId =
    currentPersona.type === "volunteer" ||
    currentPersona.type === "squad-leader" ||
    currentPersona.type === "org-admin"
      ? currentPersona.type === "org-admin"
        ? `org-${currentPersona.organizationId}`
        : currentPersona.userId
      : null;

  const { data: conversations, isLoading } = trpc.messages.getConversations.useQuery(
    { userId: userId! },
    { enabled: !!userId }
  );

  const archiveMutation = trpc.messages.archiveConversation.useMutation({
    onSuccess: () => {
      toast.success("Conversation archived");
    },
  });

  const deleteMutation = trpc.messages.deleteConversation.useMutation({
    onSuccess: () => {
      toast.success("Conversation deleted");
      setSelectedConversationId(null);
    },
  });

  const starMutation = trpc.messages.toggleStar.useMutation({
    onSuccess: (data) => {
      toast.success(data.starred ? "Starred" : "Unstarred");
    },
  });

  const markAsReadMutation = trpc.messages.markAsRead.useMutation();

  const handleSelectConversation = (conversationId: string) => {
    setSelectedConversationId(conversationId);
    markAsReadMutation.mutate({ conversationId });
  };

  const handleOpenConversationDetail = (conversationId: string) => {
    router.push(`/messages/${conversationId}`);
  };

  if (!userId || currentPersona.type === "guest") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fbfbfc]">
        <div className="text-center">
          <h1 className="mb-2 text-[18px] font-semibold text-linear-900">Login Required</h1>
          <p className="mb-4 text-[13px] text-linear-600">
            Please log in to view your messages.
          </p>
          <Link href="/login" className="bg-linear-900 hover:bg-black text-white text-[13px] font-medium px-4 py-2 rounded-md shadow-subtle inline-block">
            Log In
          </Link>
        </div>
      </div>
    );
  }

  const filteredConversations = conversations?.filter(conv => {
    if (filter === "archived") return conv.isArchived;
    if (filter === "sent") return false; // TODO: implement sent filter
    return !conv.isArchived; // inbox
  }) || [];

  const selectedConversation = conversations?.find(c => c.id === selectedConversationId);
  const unreadCount = conversations?.reduce((acc, c) => acc + (c.unread_count || 0), 0) || 0;
  const archivedCount = conversations?.filter(c => c.isArchived).length || 0;

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar 1: Inbox Nav */}
      <nav className="w-16 lg:w-56 border-r border-linear-100 bg-[#fbfbfc] flex flex-col shrink-0 transition-all">
        <div className="flex-1 overflow-y-auto py-2 px-2 space-y-0.5 mt-2">
          <button
            onClick={() => setFilter("inbox")}
            className={`w-full flex items-center gap-3 px-2 lg:px-3 py-1.5 rounded-md transition-colors ${
              filter === "inbox" ? "bg-linear-100/50 text-linear-900 font-medium" : "hover:bg-linear-50 text-linear-600"
            }`}
          >
            <InboxIcon className="w-4 h-4 text-linear-800 shrink-0" />
            <span className="text-[13px] hidden lg:block">Inbox</span>
            {unreadCount > 0 && (
              <span className="ml-auto text-[10px] bg-linear-200 px-1.5 rounded-full hidden lg:block">{unreadCount}</span>
            )}
          </button>
          <button
            onClick={() => setFilter("sent")}
            className={`w-full flex items-center gap-3 px-2 lg:px-3 py-1.5 rounded-md transition-colors ${
              filter === "sent" ? "bg-linear-100/50 text-linear-900 font-medium" : "hover:bg-linear-50 text-linear-600"
            }`}
          >
            <Send className="w-4 h-4 text-linear-400 shrink-0" />
            <span className="text-[13px] hidden lg:block">Sent</span>
          </button>
          <button
            onClick={() => setFilter("archived")}
            className={`w-full flex items-center gap-3 px-2 lg:px-3 py-1.5 rounded-md transition-colors ${
              filter === "archived" ? "bg-linear-100/50 text-linear-900 font-medium" : "hover:bg-linear-50 text-linear-600"
            }`}
          >
            <Archive className="w-4 h-4 text-linear-400 shrink-0" />
            <span className="text-[13px] hidden lg:block">Archive</span>
            {archivedCount > 0 && (
              <span className="ml-auto text-[10px] bg-linear-200 px-1.5 rounded-full hidden lg:block">{archivedCount}</span>
            )}
          </button>
        </div>
      </nav>

      {/* Sidebar 2: Thread List */}
      <div className="w-80 border-r border-linear-100 bg-white flex flex-col shrink-0">
        <div className="h-14 border-b border-linear-100 flex items-center px-4 justify-between shrink-0">
          <span className="font-medium text-[13px] text-linear-900">
            {filter === "inbox" ? `Inbox (${filteredConversations.length})` :
             filter === "sent" ? "Sent" :
             `Archive (${archivedCount})`}
          </span>
        </div>

        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="p-3 space-y-3">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-20" />
              ))}
            </div>
          ) : filteredConversations.length === 0 ? (
            <div className="py-12 text-center">
              <InboxIcon className="mx-auto mb-2 h-8 w-8 text-linear-400" />
              <p className="text-[13px] text-linear-500 mb-3">No conversations</p>
              <Link href="/messages/new" className="text-[12px] text-linear-900 font-medium hover:underline">
                Start a Conversation
              </Link>
            </div>
          ) : (
            filteredConversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => handleSelectConversation(conv.id)}
                onDoubleClick={() => handleOpenConversationDetail(conv.id)}
                className={`p-3 cursor-pointer group border-b border-linear-50 hover:bg-linear-50 transition-colors ${
                  selectedConversationId === conv.id ? "bg-linear-50 shadow-[inset_3px_0_0_#3a404c]" : ""
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className={`text-[13px] font-semibold text-linear-900 flex items-center gap-1.5`}>
                    {conv.unread_count > 0 && <div className="w-2 h-2 rounded-full bg-blue-500"></div>}
                    {conv.otherParticipant?.name || "Unknown"}
                  </span>
                  <span className="text-[11px] text-linear-400">
                    {conv.updated_at ? formatDistanceToNow(new Date(conv.updated_at), { addSuffix: false }) : ""}
                  </span>
                </div>
                <div className="text-[12px] font-medium text-linear-800 mb-1 truncate">
                  {conv.isStarred && <Star className="inline w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />}
                  Message Thread
                </div>
                <p className="text-[12px] text-linear-500 line-clamp-2">
                  {conv.last_message || "No messages yet"}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Main Content: Thread View */}
      <main className="flex-1 flex flex-col min-w-0 bg-white">
        {!selectedConversation ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <InboxIcon className="mx-auto mb-3 h-12 w-12 text-linear-300" />
              <p className="text-[13px] text-linear-500 mb-3">Select a conversation to view messages</p>
              <Link href="/messages/new" className="text-[12px] text-linear-900 font-medium hover:underline">
                Start New Conversation
              </Link>
            </div>
          </div>
        ) : (
          <>
            <header className="h-14 border-b border-linear-100 flex items-center px-6 justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-linear-100 overflow-hidden flex items-center justify-center text-[13px] font-medium text-linear-700">
                  {selectedConversation.otherParticipant?.name?.[0]?.toUpperCase() || "?"}
                </div>
                <div>
                  <div className="text-[13px] font-bold text-linear-900">
                    {selectedConversation.otherParticipant?.name || "Unknown"}
                  </div>
                  <div className="text-[11px] text-linear-500">
                    {selectedConversation.otherParticipant?.email || ""}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => starMutation.mutate({ conversationId: selectedConversation.id })}
                  className="p-1.5 hover:bg-linear-100 rounded text-linear-500 hover:text-linear-900 transition-colors"
                >
                  <Star className={`w-4 h-4 ${selectedConversation.isStarred ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                </button>
                <button
                  onClick={() => archiveMutation.mutate({ conversationId: selectedConversation.id })}
                  className="p-1.5 hover:bg-linear-100 rounded text-linear-500 hover:text-linear-900 transition-colors"
                >
                  <Archive className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    if (confirm("Delete this conversation?")) {
                      deleteMutation.mutate({ conversationId: selectedConversation.id });
                    }
                  }}
                  className="p-1.5 hover:bg-linear-100 rounded text-linear-500 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </header>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="flex justify-center">
                <span className="text-[10px] font-medium text-linear-400 bg-linear-50 px-2 py-1 rounded-full border border-linear-100">
                  {selectedConversation.updated_at ? new Date(selectedConversation.updated_at).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  }) : "Today"}
                </span>
              </div>

              {/* Message bubbles */}
              <div className="flex gap-4 group">
                <div className="w-8 h-8 rounded-full bg-linear-100 shrink-0 flex items-center justify-center text-[13px] font-medium text-linear-700">
                  {selectedConversation.otherParticipant?.name?.[0]?.toUpperCase() || "?"}
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-[13px] font-bold text-linear-900">
                      {selectedConversation.otherParticipant?.name || "Unknown"}
                    </span>
                    <span className="text-[11px] text-linear-400">
                      {selectedConversation.updated_at ? new Date(selectedConversation.updated_at).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit'
                      }) : ""}
                    </span>
                  </div>
                  <div className="text-[13px] text-linear-800 leading-relaxed">
                    <p>{selectedConversation.last_message || "No message content"}</p>
                  </div>
                </div>
              </div>

              {/* Your reply placeholder */}
              <div className="flex gap-4 group bg-linear-50/50 p-4 -mx-4 rounded-lg border border-transparent hover:border-linear-100 transition-colors">
                <div className="w-8 h-8 rounded-full bg-peer-green shrink-0 flex items-center justify-center text-[13px] font-medium text-white">
                  {currentPersona.type === "volunteer" ? "V" : currentPersona.type === "org-admin" ? "O" : "S"}
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-[13px] font-bold text-linear-900">You</span>
                    <span className="text-[11px] text-linear-400">
                      {formatDistanceToNow(new Date(), { addSuffix: false })} ago
                    </span>
                  </div>
                  <div className="text-[13px] text-linear-800 leading-relaxed">
                    <p className="text-linear-500 italic">Click "View Full Thread" to see all messages...</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={() => handleOpenConversationDetail(selectedConversation.id)}
                  className="text-[12px] text-linear-900 font-medium hover:underline"
                >
                  View Full Thread →
                </button>
              </div>
            </div>

            <div className="p-6 pt-2 shrink-0">
              <div className="relative border border-linear-200 rounded-lg shadow-sm bg-white focus-within:ring-1 focus-within:ring-linear-300 focus-within:border-linear-300 transition-shadow">
                <textarea
                  className="w-full min-h-[100px] max-h-[300px] p-3 text-[13px] text-linear-900 placeholder-linear-400 focus:outline-none resize-none rounded-t-lg"
                  placeholder={`Reply to ${selectedConversation.otherParticipant?.name || "recipient"}...`}
                ></textarea>
                <div className="flex justify-between items-center px-2 py-2 bg-linear-50 rounded-b-lg border-t border-linear-100">
                  <div className="flex gap-1">
                    <button className="p-1.5 hover:bg-linear-100 rounded text-linear-500 hover:text-linear-900 transition-colors">
                      <Paperclip className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex gap-2 items-center">
                    <span className="text-[11px] text-linear-400">Cmd + Enter to send</span>
                    <button className="bg-linear-900 text-white text-[12px] font-medium px-3 py-1.5 rounded hover:bg-black transition-colors shadow-subtle">
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
