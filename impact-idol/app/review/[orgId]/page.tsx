"use client";

import { use, useState } from "react";
import { trpc } from "@/lib/utils/trpc";
import { useAuth } from "@/lib/stores/auth-store";
import { Star, Camera, Upload, ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LeaveReviewPage({
  params,
}: {
  params: Promise<{ orgId: string }>;
}) {
  const { orgId } = use(params);
  const router = useRouter();
  const { currentPersona } = useAuth();

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [wentWell, setWentWell] = useState("");
  const [couldImprove, setCouldImprove] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { data: organization, isLoading } = trpc.organizations.get.useQuery({ id: orgId });

  const submitReviewMutation = trpc.organizations.submitReview.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      toast.success("Review submitted successfully!");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error("Please select a star rating");
      return;
    }

    if (!reviewText.trim()) {
      toast.error("Please write a review");
      return;
    }

    const userId =
      currentPersona.type === "volunteer" || currentPersona.type === "squad-leader"
        ? currentPersona.userId
        : null;

    if (!userId) {
      toast.error("Please log in to submit a review");
      return;
    }

    submitReviewMutation.mutate({
      orgId,
      userId,
      rating,
      reviewText,
      wentWell,
      couldImprove,
      isAnonymous,
    });
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fbfbfc]">
        <div className="text-[13px] text-linear-600">Loading...</div>
      </div>
    );
  }

  if (!organization) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-2 text-[24px] font-semibold text-linear-900">Organization Not Found</h1>
          <Link
            href="/organizations"
            className="h-9 inline-flex items-center rounded-md border border-linear-200 bg-white px-4 text-[13px] text-linear-900 transition-colors hover:bg-linear-50"
          >
            Back to Organizations
          </Link>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fbfbfc] px-4">
        <div className="w-full max-w-md rounded-lg border border-linear-200 bg-white p-12 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="mb-2 text-[24px] font-semibold text-linear-900">Review Submitted!</h1>
          <p className="mb-6 text-[13px] text-linear-600">
            Thank you for your feedback. Your review helps others find great volunteer
            opportunities.
          </p>
          <div className="space-y-2">
            <Link
              href={`/org/${orgId}`}
              className="flex h-9 w-full items-center justify-center rounded-md bg-peer-green px-4 text-[13px] font-medium text-white transition-colors hover:bg-green-600"
            >
              View Organization
            </Link>
            <Link
              href="/discover"
              className="flex h-9 w-full items-center justify-center rounded-md border border-linear-200 bg-white px-4 text-[13px] text-linear-900 transition-colors hover:bg-linear-50"
            >
              Find More Opportunities
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fbfbfc] py-8">
      <div className="container mx-auto max-w-2xl px-4">
        {/* Back Button */}
        <Link
          href={`/org/${orgId}`}
          className="mb-4 inline-flex h-8 items-center gap-2 text-[13px] text-linear-600 transition-colors hover:text-linear-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Organization
        </Link>

        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="mb-2 text-[28px] font-semibold text-linear-900">Leave a Review</h1>
          <p className="text-[14px] text-linear-600">
            Share your experience volunteering with {organization.name}
          </p>
        </div>

        {/* Form */}
        <div className="rounded-lg border border-linear-200 bg-white p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Star Rating */}
            <div>
              <label className="mb-3 block text-[13px] font-medium text-linear-900">Overall Rating *</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`h-10 w-10 ${
                        star <= (hoverRating || rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-linear-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <p className="mt-2 text-[13px] text-linear-600">
                  {rating === 5
                    ? "Excellent!"
                    : rating === 4
                      ? "Very Good"
                      : rating === 3
                        ? "Good"
                        : rating === 2
                          ? "Fair"
                          : "Poor"}
                </p>
              )}
            </div>

            {/* Review Text */}
            <div>
              <label htmlFor="review" className="mb-1.5 block text-[13px] font-medium text-linear-900">
                Your Review *
              </label>
              <textarea
                id="review"
                placeholder="Describe your volunteer experience..."
                rows={5}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                required
                className="w-full rounded-md border border-linear-200 bg-white px-3 py-2 text-[13px] text-linear-900 placeholder:text-linear-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-linear-900"
              />
              <p className="mt-1 text-[11px] text-linear-500">
                {reviewText.length}/1000 characters
              </p>
            </div>

            {/* What Went Well */}
            <div>
              <label htmlFor="wentWell" className="mb-1.5 block text-[13px] font-medium text-linear-900">
                What Went Well (Optional)
              </label>
              <textarea
                id="wentWell"
                placeholder="What did the organization do well?"
                rows={3}
                value={wentWell}
                onChange={(e) => setWentWell(e.target.value)}
                className="w-full rounded-md border border-linear-200 bg-white px-3 py-2 text-[13px] text-linear-900 placeholder:text-linear-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-linear-900"
              />
            </div>

            {/* What Could Improve */}
            <div>
              <label htmlFor="couldImprove" className="mb-1.5 block text-[13px] font-medium text-linear-900">
                What Could Be Improved (Optional)
              </label>
              <textarea
                id="couldImprove"
                placeholder="Constructive suggestions for improvement..."
                rows={3}
                value={couldImprove}
                onChange={(e) => setCouldImprove(e.target.value)}
                className="w-full rounded-md border border-linear-200 bg-white px-3 py-2 text-[13px] text-linear-900 placeholder:text-linear-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-linear-900"
              />
            </div>

            {/* Photo Upload */}
            <div>
              <label className="mb-2 block text-[13px] font-medium text-linear-900">Add Photos (Optional)</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="h-9 rounded-md border border-linear-200 bg-white px-4 text-[13px] text-linear-900 transition-colors hover:bg-linear-50"
                >
                  <Camera className="mr-2 inline-block h-4 w-4" />
                  Take Photo
                </button>
                <button
                  type="button"
                  className="h-9 rounded-md border border-linear-200 bg-white px-4 text-[13px] text-linear-900 transition-colors hover:bg-linear-50"
                >
                  <Upload className="mr-2 inline-block h-4 w-4" />
                  Upload
                </button>
              </div>
              <p className="mt-1 text-[11px] text-linear-500">
                Photos help show what it's like to volunteer here
              </p>
            </div>

            {/* Anonymous Option */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="anonymous"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="h-4 w-4 rounded border-linear-300 text-peer-green focus:ring-2 focus:ring-linear-900"
              />
              <label htmlFor="anonymous" className="text-[13px] text-linear-600">
                Post this review anonymously
              </label>
            </div>

            {/* Info Box */}
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-[13px] text-blue-800">
              <p className="mb-2 font-medium">Review Guidelines:</p>
              <ul className="list-inside list-disc space-y-1 text-[12px]">
                <li>Be honest and constructive</li>
                <li>Focus on your actual experience</li>
                <li>Avoid offensive language</li>
                <li>Don't include personal contact information</li>
              </ul>
            </div>

            {/* Submit */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => router.back()}
                className="h-9 flex-1 rounded-md border border-linear-200 bg-white px-4 text-[13px] text-linear-900 transition-colors hover:bg-linear-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitReviewMutation.isPending}
                className="h-9 flex-1 rounded-md bg-peer-green px-4 text-[13px] font-medium text-white transition-colors hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitReviewMutation.isPending ? "Submitting..." : "Submit Review"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
