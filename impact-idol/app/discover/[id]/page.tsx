"use client";

import { use, useState } from "react";
import { trpc } from "@/lib/utils/trpc";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Globe,
  AlertCircle,
  Share2,
  Heart,
  ArrowLeft,
  Download,
  UserPlus,
  MessageCircle,
  Send,
  CheckCircle,
} from "lucide-react";
import { formatDateWithContext, formatTimeRange, calculateHours, formatDate } from "@/lib/utils/date-utils";
import { useAuth } from "@/lib/stores/auth-store";
import { toast } from "sonner";
import Link from "next/link";

export default function OpportunityDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { currentPersona } = useAuth();
  const [commentText, setCommentText] = useState("");
  const [activeTab, setActiveTab] = useState<"volunteers" | "discussion">("volunteers");

  const { data: opportunity, isLoading } = trpc.opportunities.get.useQuery({ id });
  const { data: volunteers } = trpc.opportunities.getVolunteers.useQuery({ opportunityId: id });
  const { data: comments } = trpc.opportunities.getComments.useQuery({ opportunityId: id });
  const { data: similarOpportunities } = trpc.opportunities.list.useQuery({
    cause: opportunity?.cause_id,
    limit: 3,
  });

  const registerMutation = trpc.opportunities.register.useMutation({
    onSuccess: () => {
      toast.success("Registration Successful!", {
        description: "You're registered for this opportunity. Check your email for details.",
      });
    },
    onError: (error) => {
      toast.error("Registration Failed", { description: error.message });
    },
  });

  const commentMutation = trpc.opportunities.addComment.useMutation({
    onSuccess: () => {
      toast.success("Comment added!");
      setCommentText("");
    },
  });

  const handleRegister = () => {
    if (currentPersona.type === "guest") {
      toast.error("Login Required", {
        description: "Please log in to register for opportunities.",
      });
      return;
    }

    const userId =
      currentPersona.type === "volunteer" || currentPersona.type === "squad-leader"
        ? currentPersona.userId
        : null;

    if (!userId) return;

    registerMutation.mutate({ opportunityId: id, userId });
  };

  const handleDownloadCalendar = () => {
    toast.success("Calendar file downloaded!");
  };

  const handleShareToFeed = () => {
    toast.success("Shared to your feed!");
  };

  const handleInviteConnections = () => {
    toast.success("Invitation modal would open here");
  };

  const handlePostComment = () => {
    if (!commentText.trim()) return;

    const userId =
      currentPersona.type === "volunteer" || currentPersona.type === "squad-leader"
        ? currentPersona.userId
        : null;

    if (!userId) {
      toast.error("Please log in to comment");
      return;
    }

    commentMutation.mutate({
      opportunityId: id,
      userId,
      content: commentText,
    });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col h-screen bg-white">
        <div className="h-14 border-b border-linear-100 flex items-center px-6">
          <div className="h-5 w-32 bg-linear-100 rounded animate-pulse" />
        </div>
        <div className="flex-1 overflow-y-auto bg-[#fbfbfc] p-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-4">
                <div className="h-64 w-full bg-linear-100 rounded animate-pulse" />
                <div className="h-10 w-3/4 bg-linear-100 rounded animate-pulse" />
                <div className="h-32 w-full bg-linear-100 rounded animate-pulse" />
              </div>
              <div>
                <div className="h-96 w-full bg-linear-100 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!opportunity) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fbfbfc]">
        <div className="text-center">
          <h1 className="mb-2 text-[18px] font-semibold text-linear-900">Opportunity Not Found</h1>
          <p className="mb-4 text-[13px] text-linear-600">
            This opportunity doesn't exist or has been removed.
          </p>
          <Link href="/discover" className="bg-linear-900 hover:bg-black text-white text-[13px] font-medium px-4 py-2 rounded-md shadow-subtle inline-block">
            Back to Discover
          </Link>
        </div>
      </div>
    );
  }

  const spotsLeft = opportunity.capacity
    ? opportunity.capacity - opportunity.current_registrations
    : null;

  const duration = calculateHours(opportunity.starts_at, opportunity.ends_at);

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <header className="h-14 border-b border-linear-100 flex items-center px-6 gap-4 shrink-0">
        <Link href="/discover" className="text-linear-500 hover:text-linear-900 flex items-center gap-2 text-[13px] font-medium transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>
        <div className="h-4 w-px bg-linear-200"></div>
        <h1 className="font-medium text-[14px] text-linear-900 truncate">{opportunity.title}</h1>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-[#fbfbfc]">
        <div className="max-w-7xl mx-auto p-8">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Image */}
              {opportunity.image_url && (
                <div className="overflow-hidden rounded-lg border border-linear-200 bg-white">
                  <img
                    src={opportunity.image_url}
                    alt={opportunity.title}
                    className="h-64 w-full object-cover lg:h-80"
                  />
                </div>
              )}

              {/* Title and Organization Card */}
              <div className="rounded-lg border border-linear-200 bg-white shadow-sm p-6">
                <div className="mb-3 flex items-center gap-2 flex-wrap">
                  {opportunity.cause && (
                    <span
                      className="px-2 py-0.5 rounded-md text-[11px] font-medium border"
                      style={{
                        borderColor: opportunity.cause.color,
                        color: opportunity.cause.color,
                        backgroundColor: `${opportunity.cause.color}15`
                      }}
                    >
                      {opportunity.cause.name}
                    </span>
                  )}
                  {opportunity.is_virtual && (
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-medium border border-purple-300 text-purple-700 bg-purple-50">
                      Virtual
                    </span>
                  )}
                </div>
                <h1 className="mb-4 text-[28px] font-bold text-linear-900 leading-tight">{opportunity.title}</h1>

                {/* Organization */}
                {opportunity.organization && (
                  <Link
                    href={`/org/${opportunity.organization.slug}`}
                    className="flex items-center gap-3 p-3 rounded-md border border-linear-200 transition-colors hover:bg-linear-50"
                  >
                    <div className="w-10 h-10 rounded-md bg-linear-100 flex items-center justify-center overflow-hidden shrink-0">
                      {opportunity.organization.logo_url ? (
                        <img
                          src={opportunity.organization.logo_url}
                          alt={opportunity.organization.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-[14px] font-bold text-linear-700">
                          {opportunity.organization.name.substring(0, 2).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-linear-900">{opportunity.organization.name}</p>
                      <p className="text-[12px] text-linear-500">
                        View organization profile →
                      </p>
                    </div>
                  </Link>
                )}
              </div>

              {/* Description */}
              <div className="rounded-lg border border-linear-200 bg-white shadow-sm p-6">
                <h2 className="mb-3 text-[16px] font-semibold text-linear-900">About This Opportunity</h2>
                <p className="whitespace-pre-wrap text-[13px] leading-relaxed text-linear-600">{opportunity.description}</p>
              </div>

              {/* Expected Impact */}
              {opportunity.expected_impact_description && (
                <div className="rounded-lg border border-linear-200 bg-white shadow-sm p-6">
                  <h2 className="mb-3 text-[16px] font-semibold text-linear-900">Expected Impact</h2>
                  <p className="text-[13px] leading-relaxed text-linear-600">{opportunity.expected_impact_description}</p>
                </div>
              )}

              {/* What to Bring */}
              {opportunity.what_to_bring && (
                <div className="rounded-lg border border-blue-200 bg-blue-50/50 p-5">
                  <h3 className="mb-2 text-[14px] font-semibold text-blue-900">What to Bring</h3>
                  <p className="text-[12px] text-blue-800">{opportunity.what_to_bring}</p>
                </div>
              )}

              {/* Requirements */}
              {(opportunity.min_age ||
                opportunity.requires_background_check ||
                opportunity.physical_requirements) && (
                <div className="rounded-lg border border-linear-200 bg-white shadow-sm p-6">
                  <h3 className="mb-3 text-[16px] font-semibold text-linear-900">Requirements</h3>
                  <ul className="space-y-2 text-[12px] text-linear-600">
                    {opportunity.min_age && (
                      <li className="flex items-center gap-2">
                        <AlertCircle className="h-3.5 w-3.5 text-linear-500" />
                        Minimum age: {opportunity.min_age} years
                      </li>
                    )}
                    {opportunity.requires_background_check && (
                      <li className="flex items-center gap-2">
                        <AlertCircle className="h-3.5 w-3.5 text-linear-500" />
                        Background check required
                      </li>
                    )}
                    {opportunity.physical_requirements && (
                      <li className="flex items-center gap-2">
                        <AlertCircle className="h-3.5 w-3.5 text-linear-500" />
                        {opportunity.physical_requirements}
                      </li>
                    )}
                  </ul>
                </div>
              )}

              {/* Tabs */}
              <div className="rounded-lg border border-linear-200 bg-white shadow-sm overflow-hidden">
                <div className="border-b border-linear-100 px-6">
                  <div className="flex gap-6">
                    <button
                      onClick={() => setActiveTab("volunteers")}
                      className={`py-3 text-[13px] font-medium border-b-2 transition-colors ${
                        activeTab === "volunteers"
                          ? 'border-linear-900 text-linear-900'
                          : 'border-transparent text-linear-500 hover:text-linear-900'
                      }`}
                    >
                      Volunteers
                      <span className="ml-2 px-1.5 py-0.5 rounded-full bg-linear-100 text-[10px] font-medium text-linear-700">
                        {volunteers?.length || 0}
                      </span>
                    </button>
                    <button
                      onClick={() => setActiveTab("discussion")}
                      className={`py-3 text-[13px] font-medium border-b-2 transition-colors ${
                        activeTab === "discussion"
                          ? 'border-linear-900 text-linear-900'
                          : 'border-transparent text-linear-500 hover:text-linear-900'
                      }`}
                    >
                      Discussion
                      <span className="ml-2 px-1.5 py-0.5 rounded-full bg-linear-100 text-[10px] font-medium text-linear-700">
                        {comments?.length || 0}
                      </span>
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  {activeTab === "volunteers" ? (
                    <div>
                      <h3 className="mb-4 text-[14px] font-semibold text-linear-900">Who's Attending</h3>
                      {volunteers && volunteers.length > 0 ? (
                        <div className="space-y-2">
                          {volunteers.map((volunteer: any) => (
                            <div
                              key={volunteer.id}
                              className="flex items-center gap-3 p-2 rounded-md hover:bg-linear-50 transition-colors"
                            >
                              <Link href={`/profile/${volunteer.username}`}>
                                <div className="w-10 h-10 rounded-full bg-linear-100 flex items-center justify-center text-[14px] font-bold text-linear-700 overflow-hidden cursor-pointer">
                                  {volunteer.avatar_url ? (
                                    <img src={volunteer.avatar_url} alt={volunteer.name} className="w-full h-full object-cover" />
                                  ) : (
                                    volunteer.name[0].toUpperCase()
                                  )}
                                </div>
                              </Link>
                              <div className="flex-1 min-w-0">
                                <Link href={`/profile/${volunteer.username}`}>
                                  <p className="text-[13px] font-medium text-linear-900 hover:text-peer-green transition-colors">
                                    {volunteer.name}
                                  </p>
                                </Link>
                                {volunteer.headline && (
                                  <p className="text-[11px] text-linear-500 truncate">
                                    {volunteer.headline}
                                  </p>
                                )}
                              </div>
                              {volunteer.registeredAt && (
                                <p className="text-[11px] text-linear-400">
                                  {formatDate(volunteer.registeredAt, "MMM d")}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="py-12 text-center">
                          <Users className="mx-auto mb-3 h-12 w-12 text-linear-400" />
                          <p className="text-[12px] text-linear-500">
                            No volunteers registered yet. Be the first!
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      <h3 className="mb-4 text-[14px] font-semibold text-linear-900">Event Discussion</h3>

                      {/* Post Comment Form */}
                      <div className="mb-6 rounded-md bg-linear-50 border border-linear-200 p-4">
                        <textarea
                          placeholder="Ask a question or share your thoughts..."
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          className="w-full mb-2 px-3 py-2 text-[13px] border border-linear-200 rounded-md focus:outline-none focus:ring-2 focus:ring-linear-900 focus:border-transparent resize-none"
                          rows={3}
                        />
                        <button
                          onClick={handlePostComment}
                          disabled={!commentText.trim() || commentMutation.isPending}
                          className="px-3 py-1.5 text-[12px] font-medium text-white bg-peer-green hover:bg-green-600 rounded shadow-subtle transition-colors disabled:opacity-50 flex items-center gap-1.5"
                        >
                          <Send className="h-3.5 w-3.5" />
                          Post Comment
                        </button>
                      </div>

                      {/* Comments List */}
                      {comments && comments.length > 0 ? (
                        <div className="space-y-4">
                          {comments.map((comment: any) => (
                            <div key={comment.id} className="border-l-2 border-linear-200 pl-4">
                              <div className="mb-2 flex items-center gap-2">
                                <Link href={`/profile/${comment.author.username}`}>
                                  <div className="w-8 h-8 rounded-full bg-linear-100 flex items-center justify-center text-[12px] font-bold text-linear-700 overflow-hidden cursor-pointer">
                                    {comment.author.avatar_url ? (
                                      <img src={comment.author.avatar_url} alt={comment.author.name} className="w-full h-full object-cover" />
                                    ) : (
                                      comment.author.name[0].toUpperCase()
                                    )}
                                  </div>
                                </Link>
                                <div>
                                  <Link href={`/profile/${comment.author.username}`}>
                                    <p className="text-[12px] font-medium text-linear-900 hover:text-peer-green transition-colors">
                                      {comment.author.name}
                                    </p>
                                  </Link>
                                  <p className="text-[11px] text-linear-500">
                                    {formatDate(comment.created_at, "MMM d, h:mm a")}
                                  </p>
                                </div>
                              </div>
                              <p className="text-[12px] text-linear-600">{comment.content}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="py-12 text-center">
                          <MessageCircle className="mx-auto mb-3 h-12 w-12 text-linear-400" />
                          <p className="text-[12px] text-linear-500">
                            No comments yet. Start the conversation!
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Similar Opportunities */}
              {similarOpportunities && similarOpportunities.filter((opp) => opp.id !== id).length > 0 && (
                <div>
                  <h3 className="mb-4 text-[16px] font-semibold text-linear-900">Similar Opportunities</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {similarOpportunities
                      .filter((opp) => opp.id !== id)
                      .slice(0, 2)
                      .map((opp) => (
                        <div key={opp.id} className="rounded-lg border border-linear-200 bg-white shadow-sm hover:shadow-md transition-shadow p-4">
                          <Link href={`/discover/${opp.id}`}>
                            <h4 className="mb-2 text-[14px] font-semibold text-linear-900 hover:text-peer-green transition-colors">
                              {opp.title}
                            </h4>
                          </Link>
                          <div className="mb-2 flex items-center gap-2 text-[11px] text-linear-500">
                            <Calendar className="h-3 w-3" />
                            {formatDate(opp.starts_at, "MMM d, yyyy")}
                          </div>
                          {opp.cause && (
                            <span
                              className="inline-block px-2 py-0.5 mb-3 rounded-md text-[10px] font-medium"
                              style={{
                                backgroundColor: `${opp.cause.color}20`,
                                color: opp.cause.color
                              }}
                            >
                              {opp.cause.name}
                            </span>
                          )}
                          <Link
                            href={`/discover/${opp.id}`}
                            className="block w-full text-center px-3 py-1.5 text-[12px] font-medium text-linear-900 bg-white border border-linear-200 rounded hover:bg-linear-50 transition-colors"
                          >
                            View Details
                          </Link>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:sticky lg:top-6 lg:self-start">
              <div className="rounded-lg border border-linear-200 bg-white shadow-sm p-5">
                {/* Date & Time */}
                <div className="mb-4">
                  <div className="mb-3 flex items-start gap-3">
                    <Calendar className="mt-0.5 h-4 w-4 text-linear-500" />
                    <div>
                      <p className="text-[13px] font-semibold text-linear-900">{formatDateWithContext(opportunity.starts_at)}</p>
                      <p className="text-[11px] text-linear-500">
                        {formatTimeRange(opportunity.starts_at, opportunity.ends_at)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-linear-500">
                    <Clock className="h-4 w-4" />
                    <span>{duration} hour{duration !== 1 ? "s" : ""}</span>
                  </div>
                </div>

                <div className="my-4 border-t border-linear-100"></div>

                {/* Location */}
                <div className="mb-4 flex items-start gap-3">
                  {opportunity.is_virtual ? (
                    <>
                      <Globe className="mt-0.5 h-4 w-4 text-linear-500" />
                      <div>
                        <p className="text-[13px] font-semibold text-linear-900">Virtual Event</p>
                        <p className="text-[11px] text-linear-500">
                          Meeting link provided after registration
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <MapPin className="mt-0.5 h-4 w-4 text-linear-500" />
                      <div>
                        <p className="text-[13px] font-semibold text-linear-900">Location</p>
                        <p className="text-[11px] text-linear-500">
                          {opportunity.location?.name}
                        </p>
                      </div>
                    </>
                  )}
                </div>

                {/* Capacity */}
                {opportunity.capacity && (
                  <>
                    <div className="my-4 border-t border-linear-100"></div>
                    <div className="mb-4 flex items-start gap-3">
                      <Users className="mt-0.5 h-4 w-4 text-linear-500" />
                      <div className="flex-1">
                        <p className="text-[13px] font-semibold text-linear-900">Volunteers</p>
                        <p className="text-[11px] text-linear-500">
                          {opportunity.current_registrations} of {opportunity.capacity} registered
                        </p>
                        {spotsLeft !== null && spotsLeft > 0 && (
                          <span className="inline-block mt-1 px-2 py-0.5 rounded-md text-[10px] font-medium bg-green-100 text-green-700">
                            {spotsLeft} spot{spotsLeft !== 1 ? "s" : ""} left
                          </span>
                        )}
                      </div>
                    </div>
                  </>
                )}

                <div className="my-4 border-t border-linear-100"></div>

                {/* Register Button */}
                <button
                  onClick={handleRegister}
                  disabled={opportunity.status !== "OPEN" || registerMutation.isPending}
                  className="w-full mb-3 px-4 py-2.5 text-[13px] font-semibold text-white bg-peer-green hover:bg-green-600 rounded shadow-subtle transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {registerMutation.isPending ? (
                    "Registering..."
                  ) : opportunity.status === "FULL" ? (
                    "Event Full"
                  ) : opportunity.status === "COMPLETED" ? (
                    "Event Completed"
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4" />
                      Register Now
                    </>
                  )}
                </button>

                {/* Additional Actions */}
                <div className="space-y-2">
                  <button
                    onClick={handleDownloadCalendar}
                    className="w-full px-3 py-2 text-[12px] font-medium text-linear-900 bg-white border border-linear-200 rounded hover:bg-linear-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Add to Calendar
                  </button>

                  <button
                    onClick={handleShareToFeed}
                    className="w-full px-3 py-2 text-[12px] font-medium text-linear-900 bg-white border border-linear-200 rounded hover:bg-linear-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <Share2 className="h-3.5 w-3.5" />
                    Share to Feed
                  </button>

                  <button
                    onClick={handleInviteConnections}
                    className="w-full px-3 py-2 text-[12px] font-medium text-linear-900 bg-white border border-linear-200 rounded hover:bg-linear-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <UserPlus className="h-3.5 w-3.5" />
                    Invite Connections
                  </button>

                  <button className="w-full px-3 py-2 text-[12px] font-medium text-linear-900 bg-white border border-linear-200 rounded hover:bg-linear-50 transition-colors flex items-center justify-center gap-2">
                    <Heart className="h-3.5 w-3.5" />
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
