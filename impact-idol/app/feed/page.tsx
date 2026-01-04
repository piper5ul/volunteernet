"use client";

import { useState } from "react";
import { trpc } from "@/lib/utils/trpc";
import { useAuth } from "@/lib/stores/auth-store";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Heart,
  MessageCircle,
  Share2,
  Send,
  TrendingUp,
  Award,
  Users,
  Clock,
  MoreHorizontal,
  Sparkles,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

export default function FeedPage() {
  const { currentPersona } = useAuth();
  const [postText, setPostText] = useState("");
  const [feedFilter, setFeedFilter] = useState<"all" | "connections" | "following">("all");

  const userId =
    currentPersona.type === "volunteer" || currentPersona.type === "squad-leader"
      ? currentPersona.userId
      : null;

  const { data: feedItems, isLoading, refetch } = trpc.feed.getFeed.useQuery(
    { userId: userId!, filter: feedFilter },
    { enabled: !!userId }
  );

  const { data: suggestedConnections } = trpc.connections.getSuggestions.useQuery(
    { userId: userId!, limit: 5 },
    { enabled: !!userId }
  );

  const createPostMutation = trpc.feed.createPost.useMutation({
    onSuccess: () => {
      toast.success("Posted to your feed!");
      setPostText("");
      refetch();
    },
    onError: (error) => {
      toast.error("Failed to post");
    },
  });

  const handlePost = () => {
    if (!postText.trim()) return;
    createPostMutation.mutate({ userId: userId!, content: postText });
  };

  if (!userId || currentPersona.type === "guest") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fbfbfc]">
        <div className="text-center">
          <h1 className="mb-2 text-[18px] font-semibold text-linear-900">Welcome to Impact Idol</h1>
          <p className="mb-4 text-[13px] text-linear-600">
            Sign in to see your personalized feed
          </p>
          <Link href="/login" className="bg-linear-900 hover:bg-black text-white text-[13px] font-medium px-4 py-2 rounded-md shadow-subtle inline-block">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-white">
      {/* Left Sidebar */}
      <aside className="w-56 border-r border-linear-100 bg-[#fbfbfc] flex flex-col pt-4 shrink-0">
        <div className="px-3 mb-2 text-[11px] font-medium text-linear-500 uppercase tracking-wider">Feed</div>
        <nav className="space-y-0.5 px-2 mb-6">
          {['all', 'connections', 'following'].map((filter) => (
            <button
              key={filter}
              onClick={() => setFeedFilter(filter as any)}
              className={`flex w-full items-center gap-2 px-2 py-1.5 rounded-md text-[13px] font-medium transition-colors capitalize ${
                feedFilter === filter ? 'bg-linear-100/50 text-linear-900' : 'text-linear-600 hover:bg-linear-50'
              }`}
            >
              {filter === 'all' && <Sparkles className="w-4 h-4" />}
              {filter === 'connections' && <Users className="w-4 h-4" />}
              {filter === 'following' && <TrendingUp className="w-4 h-4" />}
              {filter.replace('_', ' ')}
            </button>
          ))}
        </nav>

        <div className="px-3 mb-2 text-[11px] font-medium text-linear-500 uppercase tracking-wider">Quick Links</div>
        <nav className="space-y-0.5 px-2">
          <Link
            href="/connections"
            className="flex w-full items-center gap-2 px-2 py-1.5 rounded-md text-[13px] text-linear-600 hover:bg-linear-50 transition-colors"
          >
            <Users className="w-4 h-4" />
            My Connections
          </Link>
          <Link
            href="/discover"
            className="flex w-full items-center gap-2 px-2 py-1.5 rounded-md text-[13px] text-linear-600 hover:bg-linear-50 transition-colors"
          >
            <TrendingUp className="w-4 h-4" />
            Find Opportunities
          </Link>
          <Link
            href="/dashboard"
            className="flex w-full items-center gap-2 px-2 py-1.5 rounded-md text-[13px] text-linear-600 hover:bg-linear-50 transition-colors"
          >
            <Award className="w-4 h-4" />
            My Impact
          </Link>
        </nav>
      </aside>

      {/* Main Feed */}
      <main className="flex-1 overflow-y-auto bg-white">
        <div className="max-w-2xl mx-auto py-6 px-4">
          {/* Create Post */}
          <div className="mb-6 rounded-lg border border-linear-200 bg-white shadow-sm">
            <div className="p-4">
              <textarea
                placeholder="Share your volunteer journey..."
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                className="w-full min-h-[80px] text-[13px] text-linear-900 placeholder-linear-400 focus:outline-none resize-none bg-transparent"
              />
              <div className="mt-3 flex items-center justify-end">
                <button
                  onClick={handlePost}
                  disabled={!postText.trim() || createPostMutation.isPending}
                  className="bg-linear-900 text-white text-[12px] font-medium px-3 py-1.5 rounded hover:bg-black transition-colors shadow-subtle flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-3.5 h-3.5" />
                  {createPostMutation.isPending ? "Posting..." : "Post"}
                </button>
              </div>
            </div>
          </div>

          {/* Feed Items */}
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="rounded-lg border border-linear-200 bg-white shadow-sm p-6">
                  <div className="flex gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-1/3" />
                      <Skeleton className="h-4 w-1/4" />
                      <Skeleton className="mt-3 h-20 w-full" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : !feedItems || feedItems.length === 0 ? (
            <div className="rounded-lg border border-linear-200 bg-white shadow-sm py-12 text-center">
              <TrendingUp className="mx-auto mb-3 h-10 w-10 text-linear-400" />
              <h3 className="mb-2 text-[14px] font-semibold text-linear-900">Your feed is empty</h3>
              <p className="mb-4 text-[13px] text-linear-500">
                Connect with other volunteers to see their activity here
              </p>
              <Link href="/discover/people" className="bg-linear-900 hover:bg-black text-white text-[13px] font-medium px-4 py-2 rounded-md shadow-subtle inline-block">
                Find People to Connect
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {feedItems.map((item) => (
                <FeedItem key={item.id} item={item} userId={userId} />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className="w-80 bg-[#fbfbfc] flex flex-col overflow-y-auto shrink-0 border-l border-linear-100">
        {/* Suggested Connections */}
        <div className="p-6 border-b border-linear-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[13px] font-semibold text-linear-900">People you may know</h3>
            <Link
              href="/connections/suggestions"
              className="text-[11px] text-linear-900 hover:underline"
            >
              See all
            </Link>
          </div>
          <div className="space-y-3">
            {suggestedConnections && suggestedConnections.length > 0 ? (
              suggestedConnections.map((suggestion) => (
                <div key={suggestion.id} className="flex items-start gap-2">
                  <div className="w-10 h-10 rounded-full bg-linear-100 flex items-center justify-center text-[12px] font-medium text-linear-700 shrink-0">
                    {suggestion.name?.substring(0, 2)?.toUpperCase() || "??"}
                  </div>
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/profile/${suggestion.username}`}
                      className="block truncate text-[13px] font-medium text-linear-900 hover:underline"
                    >
                      {suggestion.name}
                    </Link>
                    <p className="truncate text-[11px] text-linear-500">
                      {suggestion.mutualConnections} mutual
                    </p>
                    <button className="mt-2 px-2 py-1 rounded text-[11px] font-medium text-linear-900 border border-linear-200 hover:bg-linear-50 transition-colors flex items-center gap-1">
                      <UserPlus className="w-3 h-3" />
                      Connect
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-[12px] text-linear-500">No suggestions available</p>
            )}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="p-6">
          <h3 className="mb-4 text-[13px] font-semibold text-linear-900">Upcoming Events</h3>
          <div className="space-y-3">
            <div className="rounded-lg border border-linear-200 p-3 bg-white">
              <p className="text-[12px] font-medium text-linear-900">Beach Cleanup</p>
              <div className="mt-1 flex items-center gap-1 text-[11px] text-linear-500">
                <Clock className="w-3 h-3" />
                Tomorrow at 9:00 AM
              </div>
            </div>
          </div>
          <Link href="/discover" className="mt-3 w-full text-[11px] text-linear-900 hover:underline block text-center">
            Browse Opportunities
          </Link>
        </div>
      </aside>
    </div>
  );
}

interface FeedItemProps {
  item: any;
  userId: string;
}

function FeedItem({ item, userId }: FeedItemProps) {
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");

  const handleLike = () => {
    setLiked(!liked);
    toast.success(liked ? "Unliked" : "Liked");
  };

  const handleComment = () => {
    if (!comment.trim()) return;
    toast.success("Comment posted!");
    setComment("");
  };

  return (
    <div className="rounded-lg border border-linear-200 bg-white shadow-sm">
      <div className="p-4">
        {/* Header */}
        <div className="mb-4 flex items-start justify-between">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-linear-100 flex items-center justify-center text-[12px] font-medium text-linear-700 shrink-0">
              {item.author?.name?.substring(0, 2)?.toUpperCase() || "??"}
            </div>
            <div>
              <Link
                href={`/profile/${item.author?.username}`}
                className="text-[13px] font-semibold text-linear-900 hover:underline"
              >
                {item.author?.name || "Unknown User"}
              </Link>
              <p className="text-[11px] text-linear-500">{item.author?.headline}</p>
              <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-linear-400">
                <span>{item.created_at ? formatDistanceToNow(new Date(item.created_at), { addSuffix: true }) : "Just now"}</span>
                <span>•</span>
                <Users className="w-3 h-3" />
              </div>
            </div>
          </div>
          <button className="p-1 hover:bg-linear-100 rounded text-linear-500 hover:text-linear-900 transition-colors">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="mb-4">
          <p className="whitespace-pre-wrap text-[13px] text-linear-800 leading-relaxed">{item.content}</p>

          {/* Activity Type Badges */}
          {item.type === "volunteer_activity" && (
            <div className="mt-3 rounded-lg border border-green-200 bg-green-50/50 p-3">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-green-600 shrink-0" />
                <div className="flex-1">
                  <p className="text-[12px] font-medium text-green-900">
                    Volunteered at {item.organization?.name}
                  </p>
                  <p className="text-[11px] text-green-700">
                    <Clock className="mr-1 inline w-3 h-3" />
                    {item.hours} hours • {item.role_title}
                  </p>
                </div>
              </div>
            </div>
          )}

          {item.type === "connection" && (
            <div className="mt-3 rounded-lg border border-blue-200 bg-blue-50/50 p-3">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600 shrink-0" />
                <p className="text-[12px] font-medium text-blue-900">
                  Connected with {item.connection?.name}
                </p>
              </div>
            </div>
          )}

          {item.type === "endorsement" && (
            <div className="mt-3 rounded-lg border border-purple-200 bg-purple-50/50 p-3">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-purple-600 shrink-0" />
                <p className="text-[12px] font-medium text-purple-900">
                  Endorsed {item.endorsee?.name} for {item.skill}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Image if present */}
        {item.image_url && (
          <div className="mb-4 overflow-hidden rounded-lg">
            <img
              src={item.image_url}
              alt="Post image"
              className="w-full object-cover"
            />
          </div>
        )}

        {/* Stats */}
        <div className="mb-3 flex items-center justify-between border-t border-linear-100 pt-2 text-[11px] text-linear-500">
          <button className="hover:underline">
            {item.likes_count || 0} {item.likes_count === 1 ? "like" : "likes"}
          </button>
          <button
            onClick={() => setShowComments(!showComments)}
            className="hover:underline"
          >
            {item.comments_count || 0} {item.comments_count === 1 ? "comment" : "comments"}
          </button>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-3 gap-2 border-t border-linear-100 pt-2">
          <button
            className={`flex items-center justify-center gap-1.5 px-2 py-1.5 text-[12px] font-medium rounded hover:bg-linear-50 transition-colors ${
              liked ? "text-red-600" : "text-linear-700"
            }`}
            onClick={handleLike}
          >
            <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
            Like
          </button>
          <button
            className="flex items-center justify-center gap-1.5 px-2 py-1.5 text-[12px] font-medium text-linear-700 rounded hover:bg-linear-50 transition-colors"
            onClick={() => setShowComments(!showComments)}
          >
            <MessageCircle className="w-4 h-4" />
            Comment
          </button>
          <button className="flex items-center justify-center gap-1.5 px-2 py-1.5 text-[12px] font-medium text-linear-700 rounded hover:bg-linear-50 transition-colors">
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="mt-4 space-y-3 border-t border-linear-100 pt-4">
            {/* Comment Input */}
            <div className="flex gap-2">
              <div className="w-8 h-8 rounded-full bg-linear-100 flex items-center justify-center text-[11px] font-medium text-linear-700 shrink-0">
                SC
              </div>
              <div className="flex-1">
                <textarea
                  placeholder="Add a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full min-h-[60px] text-[12px] text-linear-900 placeholder-linear-400 focus:outline-none resize-none border border-linear-200 rounded p-2"
                />
                <button
                  onClick={handleComment}
                  disabled={!comment.trim()}
                  className="mt-2 bg-linear-900 text-white text-[11px] font-medium px-3 py-1.5 rounded hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Post Comment
                </button>
              </div>
            </div>

            {/* Existing Comments */}
            {item.comments?.map((c: any) => (
              <div key={c.id} className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-linear-100 flex items-center justify-center text-[11px] font-medium text-linear-700 shrink-0">
                  {c.author?.name?.substring(0, 2)?.toUpperCase() || "??"}
                </div>
                <div className="flex-1 rounded-lg bg-linear-50 p-3">
                  <Link
                    href={`/profile/${c.author?.username}`}
                    className="text-[12px] font-semibold text-linear-900 hover:underline"
                  >
                    {c.author?.name}
                  </Link>
                  <p className="mt-1 text-[12px] text-linear-800">{c.content}</p>
                  <p className="mt-1 text-[11px] text-linear-400">
                    {c.created_at ? formatDistanceToNow(new Date(c.created_at), { addSuffix: true }) : "Just now"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
