"use client";

import { use, useState } from "react";
import { trpc } from "@/lib/utils/trpc";
import { useAuth } from "@/lib/stores/auth-store";
import {
  MapPin,
  Globe,
  Users,
  Calendar,
  Clock,
  Star,
  UserPlus,
  Mail,
  Building2,
  Check,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface PageProps {
  params: Promise<{ orgId: string }>;
}

export default function OrganizationPublicProfilePage({ params }: PageProps) {
  const { orgId } = use(params);
  const { currentPersona } = useAuth();
  const [activeTab, setActiveTab] = useState<"about" | "opportunities" | "reviews">("about");

  const { data: org, isLoading } = trpc.organizations.get.useQuery({ id: orgId });

  const { data: opportunities } = trpc.organizations.getOpportunities.useQuery(
    { orgId, limit: 6 },
    { enabled: !!orgId }
  );

  const { data: reviews } = trpc.organizations.getReviews.useQuery(
    { orgId },
    { enabled: !!orgId }
  );

  const followMutation = trpc.organizations.follow.useMutation({
    onSuccess: () => {
      toast.success("Following organization");
    },
  });

  if (isLoading) {
    return (
      <div className="flex flex-col h-screen bg-white">
        <div className="h-48 w-full bg-linear-100 animate-pulse" />
        <div className="flex-1 overflow-y-auto bg-[#fbfbfc] p-8">
          <div className="max-w-6xl mx-auto">
            <div className="h-96 w-full bg-linear-100 rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (!org) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fbfbfc]">
        <div className="text-center">
          <Building2 className="mx-auto mb-4 h-12 w-12 text-linear-400" />
          <h1 className="mb-2 text-[18px] font-semibold text-linear-900">Organization Not Found</h1>
          <Link href="/organizations" className="bg-linear-900 hover:bg-black text-white text-[13px] font-medium px-4 py-2 rounded-md shadow-subtle inline-block">
            Browse Organizations
          </Link>
        </div>
      </div>
    );
  }

  const avgRating = reviews && reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Cover Photo & Header */}
      <div className="relative h-56 bg-gradient-to-r from-linear-900 to-linear-800">
        {org.cover_photo && (
          <img
            src={org.cover_photo}
            alt={org.name}
            className="h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="container absolute bottom-0 left-1/2 mx-auto w-full max-w-6xl -translate-x-1/2 px-6 pb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex gap-4">
              <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-lg border-4 border-white bg-white flex items-center justify-center overflow-hidden shrink-0">
                {org.logo_url ? (
                  <img src={org.logo_url} alt={org.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[24px] font-bold text-linear-700">
                    {org.name.substring(0, 2).toUpperCase()}
                  </span>
                )}
              </div>

              <div className="flex-1 text-white">
                <h1 className="mb-2 text-[24px] font-bold sm:text-[28px]">{org.name}</h1>
                <div className="flex flex-wrap gap-3 text-[12px]">
                  {org.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {org.location}
                    </span>
                  )}
                  {org.website && (
                    <a
                      href={org.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 hover:underline"
                    >
                      <Globe className="h-3.5 w-3.5" />
                      Website
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => followMutation.mutate({ orgId })}
                disabled={followMutation.isPending}
                className="px-3 py-2 text-[12px] font-medium text-white bg-peer-green hover:bg-green-600 rounded shadow-lg transition-colors disabled:opacity-50 flex items-center gap-1.5"
              >
                <UserPlus className="h-3.5 w-3.5" />
                Follow
              </button>
              <Link
                href={`/messages?org=${orgId}`}
                className="px-3 py-2 text-[12px] font-medium text-white bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded transition-colors flex items-center gap-1.5"
              >
                <Mail className="h-3.5 w-3.5" />
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-[#fbfbfc]">
        <div className="container mx-auto max-w-6xl px-6 py-8">
          <div className="grid gap-6 lg:grid-cols-12">
            {/* Left Sidebar */}
            <aside className="lg:col-span-4 space-y-4">
              {/* Stats */}
              <div className="rounded-lg border border-linear-200 bg-white shadow-sm p-5">
                <h3 className="mb-4 text-[14px] font-semibold text-linear-900">Organization Stats</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-[12px] text-linear-600">
                      <Users className="h-3.5 w-3.5 text-linear-500" />
                      Followers
                    </span>
                    <span className="text-[13px] font-semibold text-linear-900">1,234</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-[12px] text-linear-600">
                      <Clock className="h-3.5 w-3.5 text-linear-500" />
                      Total Hours
                    </span>
                    <span className="text-[13px] font-semibold text-linear-900">5,678</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-[12px] text-linear-600">
                      <Star className="h-3.5 w-3.5 text-linear-500" />
                      Rating
                    </span>
                    <span className="text-[13px] font-semibold text-linear-900">{avgRating.toFixed(1)}</span>
                  </div>
                </div>
              </div>

              {/* Causes */}
              {org.causes && org.causes.length > 0 && (
                <div className="rounded-lg border border-linear-200 bg-white shadow-sm p-5">
                  <h3 className="mb-4 text-[14px] font-semibold text-linear-900">Causes</h3>
                  <div className="flex flex-wrap gap-2">
                    {org.causes.map((cause) => (
                      <span
                        key={cause.id}
                        className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-linear-100 text-linear-700"
                      >
                        {cause.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </aside>

            {/* Main Column */}
            <main className="lg:col-span-8">
              <div className="rounded-lg border border-linear-200 bg-white shadow-sm overflow-hidden">
                {/* Tabs */}
                <div className="border-b border-linear-100 px-6">
                  <div className="flex gap-6">
                    <button
                      onClick={() => setActiveTab("about")}
                      className={`py-3 text-[13px] font-medium border-b-2 transition-colors ${
                        activeTab === "about"
                          ? 'border-linear-900 text-linear-900'
                          : 'border-transparent text-linear-500 hover:text-linear-900'
                      }`}
                    >
                      About
                    </button>
                    <button
                      onClick={() => setActiveTab("opportunities")}
                      className={`py-3 text-[13px] font-medium border-b-2 transition-colors ${
                        activeTab === "opportunities"
                          ? 'border-linear-900 text-linear-900'
                          : 'border-transparent text-linear-500 hover:text-linear-900'
                      }`}
                    >
                      Opportunities
                      <span className="ml-2 px-1.5 py-0.5 rounded-full bg-linear-100 text-[10px] font-medium text-linear-700">
                        {opportunities?.length || 0}
                      </span>
                    </button>
                    <button
                      onClick={() => setActiveTab("reviews")}
                      className={`py-3 text-[13px] font-medium border-b-2 transition-colors ${
                        activeTab === "reviews"
                          ? 'border-linear-900 text-linear-900'
                          : 'border-transparent text-linear-500 hover:text-linear-900'
                      }`}
                    >
                      Reviews
                      <span className="ml-2 px-1.5 py-0.5 rounded-full bg-linear-100 text-[10px] font-medium text-linear-700">
                        {reviews?.length || 0}
                      </span>
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  {/* About Tab */}
                  {activeTab === "about" && (
                    <div>
                      <h2 className="mb-4 text-[16px] font-semibold text-linear-900">About {org.name}</h2>
                      <p className="whitespace-pre-wrap text-[13px] leading-relaxed text-linear-600">
                        {org.description || "No description available."}
                      </p>

                      {org.mission && (
                        <div className="mt-6">
                          <h3 className="mb-2 text-[14px] font-semibold text-linear-900">Our Mission</h3>
                          <p className="text-[13px] leading-relaxed text-linear-600">{org.mission}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Opportunities Tab */}
                  {activeTab === "opportunities" && (
                    <div className="space-y-3">
                      {!opportunities || opportunities.length === 0 ? (
                        <div className="py-12 text-center">
                          <Calendar className="mx-auto mb-4 h-12 w-12 text-linear-400" />
                          <h3 className="mb-2 text-[14px] font-semibold text-linear-900">No active opportunities</h3>
                          <p className="text-[12px] text-linear-600">
                            Check back later for upcoming volunteer opportunities
                          </p>
                        </div>
                      ) : (
                        opportunities.map((opp) => (
                          <div key={opp.id} className="rounded-lg border border-linear-200 bg-white shadow-sm hover:shadow-md transition-shadow p-4">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1 min-w-0">
                                <Link
                                  href={`/discover/${opp.id}`}
                                  className="text-[14px] font-semibold text-linear-900 hover:text-peer-green transition-colors"
                                >
                                  {opp.title}
                                </Link>
                                <p className="mt-1 line-clamp-2 text-[12px] text-linear-600">
                                  {opp.description}
                                </p>
                                <div className="mt-2 flex flex-wrap gap-3 text-[11px] text-linear-500">
                                  <span className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    {new Date(opp.starts_at).toLocaleDateString()}
                                  </span>
                                  {opp.location && (
                                    <span className="flex items-center gap-1">
                                      <MapPin className="h-3 w-3" />
                                      {opp.location}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <Link
                                href={`/discover/${opp.id}`}
                                className="px-3 py-1.5 text-[12px] font-medium text-linear-900 bg-white border border-linear-200 rounded hover:bg-linear-50 transition-colors shrink-0"
                              >
                                View Details
                              </Link>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}

                  {/* Reviews Tab */}
                  {activeTab === "reviews" && (
                    <div className="space-y-4">
                      {!reviews || reviews.length === 0 ? (
                        <div className="py-12 text-center">
                          <Star className="mx-auto mb-4 h-12 w-12 text-linear-400" />
                          <h3 className="mb-2 text-[14px] font-semibold text-linear-900">No reviews yet</h3>
                          <p className="text-[12px] text-linear-600">
                            Be the first to review this organization
                          </p>
                        </div>
                      ) : (
                        <>
                          <div className="rounded-lg border border-linear-200 bg-linear-50 p-5">
                            <div className="flex items-center gap-4">
                              <div className="text-center">
                                <div className="text-[36px] font-bold text-linear-900">{avgRating.toFixed(1)}</div>
                                <div className="flex items-center gap-0.5 text-amber-500">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-3.5 w-3.5 ${i < Math.round(avgRating) ? "fill-current" : ""}`}
                                    />
                                  ))}
                                </div>
                                <p className="mt-1 text-[11px] text-linear-500">
                                  {reviews.length} reviews
                                </p>
                              </div>
                            </div>
                          </div>

                          {reviews.map((review) => (
                            <div key={review.id} className="rounded-lg border border-linear-200 bg-white shadow-sm p-4">
                              <div className="flex gap-3">
                                <div className="w-10 h-10 rounded-full bg-linear-100 flex items-center justify-center text-[14px] font-bold text-linear-700 overflow-hidden shrink-0">
                                  {review.reviewer?.avatar_url ? (
                                    <img src={review.reviewer.avatar_url} alt="" className="w-full h-full object-cover" />
                                  ) : (
                                    (review.reviewer?.name?.substring(0, 2) || "??").toUpperCase()
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-2">
                                    <div>
                                      <p className="text-[13px] font-semibold text-linear-900">{review.reviewer?.name}</p>
                                      <div className="mt-0.5 flex items-center gap-0.5 text-amber-500">
                                        {[...Array(5)].map((_, i) => (
                                          <Star
                                            key={i}
                                            className={`h-3 w-3 ${i < review.rating ? "fill-current" : ""}`}
                                          />
                                        ))}
                                      </div>
                                    </div>
                                    <span className="text-[11px] text-linear-500 whitespace-nowrap">
                                      {new Date(review.created_at).toLocaleDateString()}
                                    </span>
                                  </div>
                                  <p className="mt-2 text-[12px] text-linear-600">{review.comment}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
