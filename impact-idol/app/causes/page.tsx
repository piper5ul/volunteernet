"use client";

import { trpc } from "@/lib/utils/trpc";
import { Heart, TrendingUp, Users, Briefcase, BookOpen, Home, Globe, Leaf } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

const causeIcons: Record<string, any> = {
  "Education & Literacy": BookOpen,
  "Poverty & Homelessness": Home,
  "Health & Medicine": Heart,
  "Environment": Leaf,
  "Animal Welfare": Heart,
  "Community Development": Users,
  "Arts & Culture": Briefcase,
  "International Aid": Globe,
};

export default function CausesPage() {
  const { data: causes, isLoading } = trpc.causes.list.useQuery();
  const { data: causeStats } = trpc.causes.getStats.useQuery();
  const [followedCauses, setFollowedCauses] = useState<Set<string>>(new Set());

  const followMutation = trpc.causes.follow.useMutation({
    onSuccess: (_, variables) => {
      setFollowedCauses((prev) => new Set(prev).add(variables.causeId));
      toast.success("Following cause!");
    },
  });

  const unfollowMutation = trpc.causes.unfollow.useMutation({
    onSuccess: (_, variables) => {
      setFollowedCauses((prev) => {
        const next = new Set(prev);
        next.delete(variables.causeId);
        return next;
      });
      toast.success("Unfollowed cause");
    },
  });

  const handleToggleFollow = (causeId: string) => {
    if (followedCauses.has(causeId)) {
      unfollowMutation.mutate({ causeId, userId: "current-user" });
    } else {
      followMutation.mutate({ causeId, userId: "current-user" });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fbfbfc] py-8">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-6 h-32 animate-pulse rounded-lg bg-linear-100" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 animate-pulse rounded-lg bg-linear-100" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const topCauses = causeStats?.topCauses || [];
  const topOrganizations = causeStats?.topOrganizations || [];
  const topVolunteers = causeStats?.topVolunteers || [];

  return (
    <div className="min-h-screen bg-[#fbfbfc] py-8">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-3 text-[32px] font-semibold text-linear-900">Explore Causes</h1>
          <p className="mx-auto max-w-2xl text-[16px] text-linear-600">
            Find causes you're passionate about and connect with organizations making a
            difference
          </p>
        </div>

        {/* Impact Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-linear-200 bg-white p-6 text-center shadow-sm">
            <TrendingUp className="mx-auto mb-2 h-10 w-10 text-blue-600" />
            <div className="mb-1 text-[28px] font-semibold text-linear-900">
              {causeStats?.totalHours?.toLocaleString() || 0}
            </div>
            <div className="text-[13px] text-linear-600">Total Hours Contributed</div>
          </div>

          <div className="rounded-lg border border-linear-200 bg-white p-6 text-center shadow-sm">
            <Users className="mx-auto mb-2 h-10 w-10 text-green-600" />
            <div className="mb-1 text-[28px] font-semibold text-linear-900">
              {causeStats?.totalVolunteers?.toLocaleString() || 0}
            </div>
            <div className="text-[13px] text-linear-600">Active Volunteers</div>
          </div>

          <div className="rounded-lg border border-linear-200 bg-white p-6 text-center shadow-sm">
            <Briefcase className="mx-auto mb-2 h-10 w-10 text-purple-600" />
            <div className="mb-1 text-[28px] font-semibold text-linear-900">
              {causeStats?.totalOrganizations?.toLocaleString() || 0}
            </div>
            <div className="text-[13px] text-linear-600">Organizations</div>
          </div>
        </div>

        {/* Causes Grid */}
        <div className="mb-12">
          <h2 className="mb-6 text-[20px] font-semibold text-linear-900">All Causes</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {causes?.map((cause) => {
              const Icon = causeIcons[cause.name] || Heart;
              const stats = topCauses.find((c: any) => c.id === cause.id);
              const isFollowing = followedCauses.has(cause.id);

              return (
                <div key={cause.id} className="overflow-hidden rounded-lg border border-linear-200 bg-white shadow-sm transition-shadow hover:shadow-md">
                  <div
                    className="flex h-32 items-center justify-center bg-gradient-to-br"
                    style={{
                      background: `linear-gradient(135deg, ${cause.color}dd, ${cause.color})`,
                    }}
                  >
                    <Icon className="h-16 w-16 text-white" />
                  </div>

                  <div className="p-6">
                    <h3 className="mb-2 text-[18px] font-semibold text-linear-900">{cause.name}</h3>
                    <p className="mb-4 line-clamp-3 text-[13px] text-linear-600">
                      {cause.description}
                    </p>

                    {/* Stats */}
                    <div className="mb-4 grid grid-cols-3 gap-2 border-t border-linear-200 pt-4 text-center">
                      <div>
                        <div className="text-[16px] font-semibold text-peer-green">
                          {stats?.hours?.toLocaleString() || 0}
                        </div>
                        <div className="text-[11px] text-linear-600">Hours</div>
                      </div>
                      <div>
                        <div className="text-[16px] font-semibold text-peer-green">
                          {stats?.volunteers || 0}
                        </div>
                        <div className="text-[11px] text-linear-600">Volunteers</div>
                      </div>
                      <div>
                        <div className="text-[16px] font-semibold text-peer-green">
                          {stats?.organizations || 0}
                        </div>
                        <div className="text-[11px] text-linear-600">Orgs</div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleToggleFollow(cause.id)}
                        disabled={followMutation.isPending || unfollowMutation.isPending}
                        className={`h-9 flex-1 rounded-md px-4 text-[13px] font-medium transition-colors ${
                          isFollowing
                            ? "border border-linear-200 bg-white text-linear-900 hover:bg-linear-50"
                            : "bg-peer-green text-white hover:bg-green-600"
                        }`}
                      >
                        {isFollowing ? "Following" : "Follow"}
                      </button>
                      <Link
                        href={`/discover?cause=${cause.id}`}
                        className="flex h-9 flex-1 items-center justify-center rounded-md border border-linear-200 bg-white px-4 text-[13px] text-linear-900 transition-colors hover:bg-linear-50"
                      >
                        Explore
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Organizations by Cause */}
        {topOrganizations.length > 0 && (
          <div className="mb-12">
            <h2 className="mb-6 text-[20px] font-semibold text-linear-900">Top Organizations</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {topOrganizations.slice(0, 6).map((org: any) => (
                <div key={org.id} className="rounded-lg border border-linear-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-linear-200 bg-linear-50 text-[14px] font-semibold text-linear-900">
                      {org.logo_url ? (
                        <img src={org.logo_url} alt={org.name} className="h-full w-full rounded-lg object-cover" />
                      ) : (
                        org.name[0]
                      )}
                    </div>

                    <div className="flex-1">
                      <Link href={`/org/${org.id}`}>
                        <h3 className="text-[13px] font-semibold text-linear-900 transition-colors hover:text-peer-green">{org.name}</h3>
                      </Link>
                      <div className="flex items-center gap-2 text-[11px] text-linear-600">
                        <span>{org.hours?.toLocaleString() || 0}h</span>
                        <span>•</span>
                        <span className="inline-flex items-center rounded-full bg-linear-100 px-2 py-0.5 text-[11px] text-linear-900">
                          {org.cause}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Top Volunteers */}
        {topVolunteers.length > 0 && (
          <div>
            <h2 className="mb-6 text-[20px] font-semibold text-linear-900">Top Volunteers</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {topVolunteers.slice(0, 6).map((volunteer: any) => (
                <div key={volunteer.id} className="rounded-lg border border-linear-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-200 text-[14px] font-semibold text-linear-900">
                      {volunteer.avatar_url ? (
                        <img src={volunteer.avatar_url} alt={volunteer.name} className="h-full w-full rounded-full object-cover" />
                      ) : (
                        volunteer.name[0]
                      )}
                    </div>

                    <div className="flex-1">
                      <Link href={`/profile/${volunteer.username}`}>
                        <h3 className="text-[13px] font-semibold text-linear-900 transition-colors hover:text-peer-green">{volunteer.name}</h3>
                      </Link>
                      <div className="flex items-center gap-2 text-[11px] text-linear-600">
                        <span>{volunteer.hours?.toLocaleString() || 0}h</span>
                        <span>•</span>
                        <span>{volunteer.causes?.join(", ")}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
