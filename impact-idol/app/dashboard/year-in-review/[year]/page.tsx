"use client";

import { use } from "react";
import { trpc } from "@/lib/utils/trpc";
import { useAuth } from "@/lib/stores/auth-store";
import {
  TrendingUp,
  Award,
  Heart,
  MapPin,
  Users,
  Calendar,
  Share2,
  Download,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function YearInReviewPage({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year } = use(params);
  const { currentPersona } = useAuth();
  const userId = currentPersona.type === "volunteer" ? currentPersona.userId : null;

  const { data: yearData, isLoading } = trpc.users.getYearInReview.useQuery(
    { userId: userId || "", year: parseInt(year) },
    { enabled: !!userId }
  );

  const handleShare = () => {
    toast.success("Shared to social media!");
  };

  const handleDownload = () => {
    toast.success("Downloading your Year in Review...");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="h-96 animate-pulse rounded-lg bg-linear-100" />
        </div>
      </div>
    );
  }

  if (!yearData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-2 text-[24px] font-semibold text-linear-900">No Data Available</h1>
          <p className="mb-4 text-[14px] text-linear-600">
            No volunteer activity found for {year}
          </p>
          <Link
            href="/dashboard"
            className="inline-flex h-9 items-center rounded-md border border-linear-200 bg-white px-4 text-[13px] text-linear-900 transition-colors hover:bg-linear-50"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const stats = yearData.stats || {};
  const topOrganizations = yearData.topOrganizations || [];
  const topCauses = yearData.topCauses || [];
  const milestones = yearData.milestones || [];
  const photos = yearData.photos || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Back Button */}
        <Link
          href="/dashboard"
          className="mb-4 inline-flex h-9 items-center gap-2 rounded-md bg-white/70 px-3 text-[13px] text-linear-900 transition-colors hover:bg-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        {/* Hero Section */}
        <div className="mb-8 text-center">
          <div className="mb-4 text-[48px]">🎉</div>
          <h1 className="mb-2 text-[48px] font-semibold text-linear-900">Your {year} Impact</h1>
          <p className="text-[16px] text-linear-600">
            Here's how you made a difference this year
          </p>
        </div>

        {/* Main Stats Grid */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="overflow-hidden rounded-lg border-0 bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-center text-white shadow-sm">
            <Calendar className="mx-auto mb-2 h-8 w-8" />
            <div className="mb-1 text-[32px] font-semibold">
              {stats.totalHours?.toLocaleString() || 0}
            </div>
            <div className="text-[12px] opacity-90">Hours Volunteered</div>
          </div>

          <div className="overflow-hidden rounded-lg border-0 bg-gradient-to-br from-green-500 to-green-600 p-6 text-center text-white shadow-sm">
            <Users className="mx-auto mb-2 h-8 w-8" />
            <div className="mb-1 text-[32px] font-semibold">
              {stats.eventsAttended || 0}
            </div>
            <div className="text-[12px] opacity-90">Events Attended</div>
          </div>

          <div className="overflow-hidden rounded-lg border-0 bg-gradient-to-br from-purple-500 to-purple-600 p-6 text-center text-white shadow-sm">
            <MapPin className="mx-auto mb-2 h-8 w-8" />
            <div className="mb-1 text-[32px] font-semibold">
              {stats.organizationsHelped || 0}
            </div>
            <div className="text-[12px] opacity-90">Organizations</div>
          </div>

          <div className="overflow-hidden rounded-lg border-0 bg-gradient-to-br from-pink-500 to-pink-600 p-6 text-center text-white shadow-sm">
            <Heart className="mx-auto mb-2 h-8 w-8" />
            <div className="mb-1 text-[32px] font-semibold">
              {stats.livesImpacted?.toLocaleString() || 0}
            </div>
            <div className="text-[12px] opacity-90">Lives Impacted</div>
          </div>
        </div>

        {/* Top Organizations */}
        {topOrganizations.length > 0 && (
          <div className="mb-8 rounded-lg border border-linear-200 bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-[20px] font-semibold text-linear-900">Organizations You Helped</h2>
            <div className="space-y-3">
              {topOrganizations.map((org: any, index: number) => (
                <div
                  key={org.id}
                  className="flex items-center gap-4 rounded-lg bg-[#fbfbfc] p-4"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-peer-green text-[14px] font-semibold text-white">
                    #{index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-[13px] font-semibold text-linear-900">{org.name}</p>
                    <p className="text-[12px] text-linear-600">
                      {org.hours} hours volunteered
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Top Causes */}
        {topCauses.length > 0 && (
          <div className="mb-8 rounded-lg border border-linear-200 bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-[20px] font-semibold text-linear-900">Causes You Supported</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {topCauses.map((cause: any) => (
                <div
                  key={cause.id}
                  className="rounded-lg border-2 p-4 text-center"
                  style={{ borderColor: cause.color }}
                >
                  <div className="mb-2 text-[28px]">{cause.icon}</div>
                  <p className="mb-1 text-[13px] font-semibold text-linear-900">{cause.name}</p>
                  <p className="text-[12px] text-linear-600">{cause.hours}h</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Milestones */}
        {milestones.length > 0 && (
          <div className="mb-8 rounded-lg border border-linear-200 bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-[20px] font-semibold text-linear-900">Milestones Unlocked</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {milestones.map((milestone: any) => (
                <div
                  key={milestone.id}
                  className="flex items-center gap-4 rounded-lg border-2 border-yellow-400 bg-yellow-50 p-4"
                >
                  <Award className="h-10 w-10 text-yellow-600" />
                  <div>
                    <p className="text-[13px] font-semibold text-linear-900">{milestone.title}</p>
                    <p className="text-[12px] text-linear-600">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Photo Collage */}
        {photos.length > 0 && (
          <div className="mb-8 rounded-lg border border-linear-200 bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-[20px] font-semibold text-linear-900">Your Year in Photos</h2>
            <div className="grid gap-2 sm:grid-cols-3">
              {photos.map((photo: any, index: number) => (
                <div
                  key={index}
                  className="aspect-square overflow-hidden rounded-lg bg-linear-100 bg-cover bg-center"
                  style={{ backgroundImage: `url(${photo.url})` }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Fun Facts */}
        <div className="mb-8 rounded-lg bg-gradient-to-br from-orange-100 to-pink-100 p-8 shadow-sm">
          <h2 className="mb-4 text-[20px] font-semibold text-linear-900">Fun Facts</h2>
          <div className="space-y-3 text-[14px] text-linear-900">
            <p>
              🎯 You volunteered more than <strong>{stats.percentile || 75}%</strong> of
              volunteers on Impact Idol
            </p>
            <p>
              💪 Your longest volunteer streak was{" "}
              <strong>{stats.longestStreak || 5} weeks</strong>
            </p>
            <p>
              🌟 Your most active month was{" "}
              <strong>{stats.mostActiveMonth || "June"}</strong>
            </p>
            {stats.monetaryValue && (
              <p>
                💰 Your volunteer time is worth approximately{" "}
                <strong>${stats.monetaryValue.toLocaleString()}</strong>
              </p>
            )}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mb-8 rounded-lg bg-gradient-to-r from-peer-green to-green-600 p-8 text-center text-white shadow-sm">
          <h2 className="mb-2 text-[20px] font-semibold">Keep Making a Difference!</h2>
          <p className="mb-6 text-[14px] opacity-90">
            You had an incredible {year}. Let's make {parseInt(year) + 1} even better!
          </p>
          <div className="flex justify-center gap-3">
            <Link
              href="/discover"
              className="h-9 rounded-md bg-white px-4 text-[13px] font-medium text-peer-green transition-colors hover:bg-gray-100"
            >
              Find Opportunities
            </Link>
            <Link
              href="/dashboard/goals"
              className="h-9 rounded-md border border-white bg-transparent px-4 text-[13px] font-medium text-white transition-colors hover:bg-white/10"
            >
              Set {parseInt(year) + 1} Goals
            </Link>
          </div>
        </div>

        {/* Share Actions */}
        <div className="flex justify-center gap-3">
          <button
            onClick={handleShare}
            className="h-10 rounded-md border border-linear-200 bg-white px-4 text-[13px] text-linear-900 transition-colors hover:bg-linear-50"
          >
            <Share2 className="mr-2 inline-block h-4 w-4" />
            Share Your Impact
          </button>
          <button
            onClick={handleDownload}
            className="h-10 rounded-md border border-linear-200 bg-white px-4 text-[13px] text-linear-900 transition-colors hover:bg-linear-50"
          >
            <Download className="mr-2 inline-block h-4 w-4" />
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}
