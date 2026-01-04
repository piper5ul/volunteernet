"use client";

import { use, useState } from "react";
import { trpc } from "@/lib/utils/trpc";
import { useAuth } from "@/lib/stores/auth-store";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, ThumbsUp, ArrowLeft, MessageCircle, Filter } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils/date-utils";
import { toast } from "sonner";

type SortBy = "recent" | "helpful" | "rating-high" | "rating-low";
type FilterRating = "all" | "5" | "4" | "3" | "2" | "1";

export default function OrganizationReviewsPage({
  params,
}: {
  params: Promise<{ orgId: string }>;
}) {
  const { orgId } = use(params);
  const { currentPersona } = useAuth();
  const [sortBy, setSortBy] = useState<SortBy>("recent");
  const [filterRating, setFilterRating] = useState<FilterRating>("all");

  const { data: organization } = trpc.organizations.getById.useQuery({ id: orgId });
  const { data: reviews, isLoading } = trpc.organizations.getReviews.useQuery({
    orgId,
  });

  const helpfulMutation = trpc.organizations.markReviewHelpful.useMutation({
    onSuccess: () => {
      toast.success("Marked as helpful!");
    },
  });

  if (isLoading) {
    return (
      <div className="flex flex-col h-screen bg-white">
        <div className="h-14 border-b border-linear-100 flex items-center px-6">
          <Skeleton className="h-5 w-48" />
        </div>
        <div className="flex-1 overflow-y-auto bg-[#fbfbfc] p-8">
          <div className="max-w-4xl mx-auto">
            <Skeleton className="h-96" />
          </div>
        </div>
      </div>
    );
  }

  if (!organization) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fbfbfc]">
        <div className="text-center">
          <h1 className="mb-2 text-[18px] font-semibold text-linear-900">Organization Not Found</h1>
          <Link href="/organizations" className="bg-linear-900 hover:bg-black text-white text-[13px] font-medium px-4 py-2 rounded-md shadow-subtle inline-block">
            Browse Organizations
          </Link>
        </div>
      </div>
    );
  }

  // Calculate rating statistics
  const totalReviews = reviews?.length || 0;
  const averageRating = reviews && reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  const ratingCounts = {
    5: reviews?.filter((r) => r.rating === 5).length || 0,
    4: reviews?.filter((r) => r.rating === 4).length || 0,
    3: reviews?.filter((r) => r.rating === 3).length || 0,
    2: reviews?.filter((r) => r.rating === 2).length || 0,
    1: reviews?.filter((r) => r.rating === 1).length || 0,
  };

  // Filter and sort reviews
  const filteredReviews = (reviews || [])
    .filter((review) => filterRating === "all" || review.rating === parseInt(filterRating))
    .sort((a, b) => {
      if (sortBy === "helpful") {
        return (b.helpfulCount || 0) - (a.helpfulCount || 0);
      } else if (sortBy === "rating-high") {
        return b.rating - a.rating;
      } else if (sortBy === "rating-low") {
        return a.rating - b.rating;
      } else {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });

  const handleMarkHelpful = (reviewId: string) => {
    if (currentPersona.userId) {
      helpfulMutation.mutate({ reviewId, userId: currentPersona.userId });
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <header className="h-14 border-b border-linear-100 flex items-center px-6 gap-4 shrink-0">
        <Link href={`/org/${orgId}`} className="text-linear-500 hover:text-linear-900 transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div className="h-4 w-px bg-linear-200"></div>
        <h1 className="font-medium text-[14px] text-linear-900">Reviews</h1>
        <div className="h-4 w-px bg-linear-200"></div>
        <span className="text-[13px] text-linear-500">{totalReviews} total</span>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-[#fbfbfc]">
        <div className="max-w-4xl mx-auto p-8">
          {/* Rating Summary */}
          <div className="mb-6 rounded-lg border border-linear-200 bg-white shadow-sm p-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Overall Rating */}
              <div className="text-center md:border-r border-linear-200">
                <div className="mb-2 text-[48px] font-bold text-linear-900">{averageRating.toFixed(1)}</div>
                <div className="mb-2 flex justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.round(averageRating)
                          ? "fill-amber-400 text-amber-400"
                          : "text-linear-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-[12px] text-linear-600">
                  Based on {totalReviews} review{totalReviews !== 1 ? "s" : ""}
                </p>
              </div>

              {/* Rating Breakdown */}
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => {
                  const count = ratingCounts[rating as keyof typeof ratingCounts];
                  const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;

                  return (
                    <div key={rating} className="flex items-center gap-2">
                      <div className="flex w-12 items-center gap-1">
                        <span className="text-[12px] font-medium text-linear-900">{rating}</span>
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      </div>
                      <div className="flex-1 h-2 bg-linear-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-400 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="w-12 text-right text-[12px] text-linear-600">
                        {count}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="mb-6 rounded-lg border border-linear-200 bg-white shadow-sm p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-linear-500" />
                <span className="text-[13px] font-medium text-linear-900">Filter & Sort</span>
              </div>

              <div className="flex gap-2">
                {/* Rating Filter */}
                <select
                  value={filterRating}
                  onChange={(e) => setFilterRating(e.target.value as FilterRating)}
                  className="px-3 py-1.5 text-[12px] border border-linear-200 rounded-md focus:outline-none focus:ring-2 focus:ring-linear-900 focus:border-transparent bg-white"
                >
                  <option value="all">All Ratings</option>
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortBy)}
                  className="px-3 py-1.5 text-[12px] border border-linear-200 rounded-md focus:outline-none focus:ring-2 focus:ring-linear-900 focus:border-transparent bg-white"
                >
                  <option value="recent">Most Recent</option>
                  <option value="helpful">Most Helpful</option>
                  <option value="rating-high">Highest Rating</option>
                  <option value="rating-low">Lowest Rating</option>
                </select>
              </div>
            </div>
          </div>

          {/* Reviews List */}
          {filteredReviews.length === 0 ? (
            <div className="rounded-lg border border-linear-200 bg-white shadow-sm p-12 text-center">
              <MessageCircle className="mx-auto mb-4 h-12 w-12 text-linear-400" />
              <p className="text-[12px] text-linear-500">
                {filterRating !== "all"
                  ? `No ${filterRating}-star reviews yet`
                  : "No reviews yet"}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredReviews.map((review) => {
                const initials = review.reviewer.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .substring(0, 2);

                return (
                  <div key={review.id} className="rounded-lg border border-linear-200 bg-white shadow-sm p-6">
                    {/* Reviewer Info */}
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Link href={`/profile/${review.reviewer.username}`}>
                          <div className="h-12 w-12 rounded-full bg-linear-100 flex items-center justify-center text-[12px] font-bold text-linear-700 overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
                            {review.reviewer.avatar_url ? (
                              <img src={review.reviewer.avatar_url} alt={review.reviewer.name} className="w-full h-full object-cover" />
                            ) : (
                              initials
                            )}
                          </div>
                        </Link>

                        <div>
                          <Link href={`/profile/${review.reviewer.username}`}>
                            <h3 className="text-[13px] font-semibold text-linear-900 hover:text-peer-green transition-colors">
                              {review.reviewer.name}
                            </h3>
                          </Link>
                          <p className="text-[11px] text-linear-600">
                            {formatDate(review.created_at, "MMM d, yyyy")}
                          </p>
                          {review.volunteerRole && (
                            <span className="mt-1 inline-block px-2 py-0.5 rounded-md text-[10px] font-medium bg-linear-100 text-linear-700 border border-linear-200">
                              {review.volunteerRole}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? "fill-amber-400 text-amber-400"
                                : "text-linear-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Review Content */}
                    {review.title && (
                      <h4 className="mb-2 text-[14px] font-semibold text-linear-900">{review.title}</h4>
                    )}

                    <p className="mb-4 text-[13px] text-linear-600">{review.content}</p>

                    {/* What went well / What could improve */}
                    {(review.wentWell || review.couldImprove) && (
                      <div className="mb-4 grid gap-4 border-t border-linear-200 pt-4 sm:grid-cols-2">
                        {review.wentWell && (
                          <div>
                            <p className="mb-1 text-[11px] font-semibold text-green-600 uppercase tracking-wider">
                              What went well
                            </p>
                            <p className="text-[12px] text-linear-600">{review.wentWell}</p>
                          </div>
                        )}

                        {review.couldImprove && (
                          <div>
                            <p className="mb-1 text-[11px] font-semibold text-orange-600 uppercase tracking-wider">
                              What could improve
                            </p>
                            <p className="text-[12px] text-linear-600">
                              {review.couldImprove}
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Organization Response */}
                    {review.organizationResponse && (
                      <div className="mb-4 rounded-lg bg-blue-50 border border-blue-200 p-4">
                        <p className="mb-1 text-[12px] font-semibold text-blue-900">
                          Response from {organization.name}
                        </p>
                        <p className="text-[12px] text-blue-800">
                          {review.organizationResponse}
                        </p>
                        <p className="mt-2 text-[10px] text-blue-600">
                          {formatDate(review.responseDate || review.created_at, "MMM d, yyyy")}
                        </p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-4 border-t border-linear-200 pt-3">
                      <button
                        onClick={() => handleMarkHelpful(review.id)}
                        disabled={helpfulMutation.isPending}
                        className="px-3 py-1.5 text-[12px] font-medium text-linear-600 hover:text-linear-900 hover:bg-linear-50 rounded transition-colors flex items-center gap-1.5"
                      >
                        <ThumbsUp className="h-3.5 w-3.5" />
                        Helpful ({review.helpfulCount || 0})
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
