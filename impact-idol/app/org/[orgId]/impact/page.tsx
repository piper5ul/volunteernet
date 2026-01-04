"use client";

import { use } from "react";
import { trpc } from "@/lib/utils/trpc";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, TrendingUp, Users, Clock, Heart, Calendar, Award } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils/date-utils";

export default function OrganizationImpactPage({
  params,
}: {
  params: Promise<{ orgId: string }>;
}) {
  const { orgId } = use(params);

  const { data: organization, isLoading } = trpc.organizations.getById.useQuery({ id: orgId });
  const { data: impactStats } = trpc.organizations.getImpactStats.useQuery(
    { orgId },
    { enabled: !!organization }
  );
  const { data: impactStories } = trpc.organizations.getImpactStories.useQuery(
    { orgId },
    { enabled: !!organization }
  );

  if (isLoading) {
    return (
      <div className="flex flex-col h-screen bg-white">
        <div className="h-14 border-b border-linear-100 flex items-center px-6">
          <Skeleton className="h-5 w-48" />
        </div>
        <div className="flex-1 overflow-y-auto bg-[#fbfbfc] p-8">
          <div className="max-w-6xl mx-auto">
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

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <header className="h-14 border-b border-linear-100 flex items-center px-6 gap-4 shrink-0">
        <Link href={`/org/${orgId}`} className="text-linear-500 hover:text-linear-900 transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div className="h-4 w-px bg-linear-200"></div>
        <h1 className="font-medium text-[14px] text-linear-900">Our Impact</h1>
        <div className="h-4 w-px bg-linear-200"></div>
        <span className="text-[13px] text-linear-500">{organization.name}</span>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-[#fbfbfc]">
        <div className="max-w-6xl mx-auto p-8">
          {/* Impact Stats Grid */}
          <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border border-linear-200 bg-white shadow-sm p-6 text-center">
              <Clock className="mx-auto mb-3 h-12 w-12 text-blue-600" />
              <div className="mb-1 text-[32px] font-bold text-blue-600">
                {impactStats?.totalHours?.toLocaleString() || 0}
              </div>
              <div className="text-[12px] text-linear-600">Total Volunteer Hours</div>
            </div>

            <div className="rounded-lg border border-linear-200 bg-white shadow-sm p-6 text-center">
              <Users className="mx-auto mb-3 h-12 w-12 text-green-600" />
              <div className="mb-1 text-[32px] font-bold text-green-600">
                {impactStats?.totalVolunteers?.toLocaleString() || 0}
              </div>
              <div className="text-[12px] text-linear-600">Volunteers Engaged</div>
            </div>

            <div className="rounded-lg border border-linear-200 bg-white shadow-sm p-6 text-center">
              <Heart className="mx-auto mb-3 h-12 w-12 text-pink-600" />
              <div className="mb-1 text-[32px] font-bold text-pink-600">
                {impactStats?.livesImpacted?.toLocaleString() || 0}
              </div>
              <div className="text-[12px] text-linear-600">Lives Impacted</div>
            </div>

            <div className="rounded-lg border border-linear-200 bg-white shadow-sm p-6 text-center">
              <Calendar className="mx-auto mb-3 h-12 w-12 text-purple-600" />
              <div className="mb-1 text-[32px] font-bold text-purple-600">
                {impactStats?.eventsHosted || 0}
              </div>
              <div className="text-[12px] text-linear-600">Events Hosted</div>
            </div>
          </div>

          {/* Volunteer Hours Over Time */}
          <div className="mb-8 rounded-lg border border-linear-200 bg-white shadow-sm overflow-hidden">
            <div className="border-b border-linear-100 p-5">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-linear-500" />
                <h2 className="text-[14px] font-semibold text-linear-900">Volunteer Engagement Over Time</h2>
              </div>
              <p className="text-[11px] text-linear-500 mt-1">Monthly volunteer hours and participation</p>
            </div>

            <div className="p-5">
              {impactStats?.monthlyHours && impactStats.monthlyHours.length > 0 ? (
                <div className="space-y-4">
                  {impactStats.monthlyHours.map((month: any) => (
                    <div key={month.month}>
                      <div className="mb-2 flex items-center justify-between text-[12px]">
                        <span className="font-semibold text-linear-900">{month.month}</span>
                        <span className="text-linear-600">
                          {month.hours} hours • {month.volunteers} volunteers
                        </span>
                      </div>
                      <div className="h-3 w-full overflow-hidden rounded-full bg-linear-100">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-blue-600 to-blue-400"
                          style={{
                            width: `${Math.min((month.hours / (impactStats.totalHours || 1)) * 100, 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[12px] text-linear-500 text-center py-8">No data available yet</p>
              )}
            </div>
          </div>

          {/* Impact by Cause */}
          {impactStats?.causeBreakdown && impactStats.causeBreakdown.length > 0 && (
            <div className="mb-8 rounded-lg border border-linear-200 bg-white shadow-sm overflow-hidden">
              <div className="border-b border-linear-100 p-5">
                <h2 className="text-[14px] font-semibold text-linear-900">Impact by Cause Area</h2>
              </div>

              <div className="p-5">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {impactStats.causeBreakdown.map((cause: any) => (
                    <div key={cause.cause} className="rounded-lg border border-linear-200 p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <h3 className="text-[13px] font-semibold text-linear-900">{cause.cause}</h3>
                        <span className="px-2 py-1 rounded-md text-[10px] font-medium bg-linear-100 text-linear-700 border border-linear-200">
                          {cause.percentage}%
                        </span>
                      </div>
                      <p className="text-[24px] font-bold text-peer-green">{cause.hours}h</p>
                      <p className="text-[11px] text-linear-600">
                        {cause.volunteers} volunteers
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Impact Stories */}
          <div className="mb-8">
            <h2 className="mb-4 text-[16px] font-semibold text-linear-900">Impact Stories</h2>

            {impactStories && impactStories.length > 0 ? (
              <div className="space-y-6">
                {impactStories.map((story: any) => (
                  <div key={story.id} className="rounded-lg border border-linear-200 bg-white shadow-sm overflow-hidden">
                    {story.imageUrl && (
                      <div
                        className="h-64 bg-cover bg-center"
                        style={{ backgroundImage: `url(${story.imageUrl})` }}
                      />
                    )}

                    <div className="p-6">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="px-2 py-1 rounded-md text-[10px] font-medium bg-linear-100 text-linear-700 border border-linear-200">
                          {story.category}
                        </span>
                        <span className="text-[12px] text-linear-600">
                          {formatDate(story.date, "MMM d, yyyy")}
                        </span>
                      </div>

                      <h3 className="mb-3 text-[18px] font-bold text-linear-900">{story.title}</h3>
                      <p className="mb-4 text-[13px] text-linear-600">{story.description}</p>

                      {story.metrics && story.metrics.length > 0 && (
                        <div className="flex flex-wrap gap-6 border-t border-linear-200 pt-4">
                          {story.metrics.map((metric: any, index: number) => (
                            <div key={index}>
                              <p className="text-[24px] font-bold text-peer-green">{metric.value}</p>
                              <p className="text-[12px] text-linear-600">{metric.label}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-linear-200 bg-white shadow-sm p-12 text-center">
                <Award className="mx-auto mb-4 h-12 w-12 text-linear-400" />
                <p className="text-[12px] text-linear-500">No impact stories yet</p>
              </div>
            )}
          </div>

          {/* Photo Gallery */}
          {impactStats?.photoGallery && impactStats.photoGallery.length > 0 && (
            <div>
              <h2 className="mb-4 text-[16px] font-semibold text-linear-900">Photo Gallery</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {impactStats.photoGallery.map((photo: any, index: number) => (
                  <div
                    key={index}
                    className="group relative aspect-square overflow-hidden rounded-lg bg-cover bg-center"
                    style={{ backgroundImage: `url(${photo.url})` }}
                  >
                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                      <div className="p-4 text-white">
                        <p className="text-[13px] font-medium">{photo.caption}</p>
                        <p className="text-[11px]">{formatDate(photo.date, "MMM d, yyyy")}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
