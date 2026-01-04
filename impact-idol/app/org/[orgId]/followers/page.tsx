"use client";

import { use, useState } from "react";
import { trpc } from "@/lib/utils/trpc";
import { useAuth } from "@/lib/stores/auth-store";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, Search, MapPin, UserPlus, CheckCircle2, ArrowLeft, Grid3x3, List } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

type SortBy = "recent" | "hours" | "mutual";
type ViewMode = "grid" | "list";

export default function OrganizationFollowersPage({
  params,
}: {
  params: Promise<{ orgId: string }>;
}) {
  const { orgId } = use(params);
  const { currentPersona } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortBy>("recent");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const { data: organization } = trpc.organizations.getById.useQuery({ id: orgId });
  const { data: followers, isLoading } = trpc.organizations.getFollowers.useQuery({
    orgId,
  });

  const connectMutation = trpc.connections.sendConnectionRequest.useMutation({
    onSuccess: () => {
      toast.success("Connection request sent!");
    },
  });

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

  // Filter and sort followers
  const filteredFollowers = (followers || [])
    .filter((follower) =>
      follower.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      follower.headline?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "hours") {
        return (b.hoursContributed || 0) - (a.hoursContributed || 0);
      } else if (sortBy === "mutual") {
        return (b.mutualConnections || 0) - (a.mutualConnections || 0);
      } else {
        return new Date(b.followedAt).getTime() - new Date(a.followedAt).getTime();
      }
    });

  const handleConnect = (userId: string) => {
    if (currentPersona.type === "volunteer" && currentPersona.userId) {
      connectMutation.mutate({
        fromUserId: currentPersona.userId,
        toUserId: userId,
      });
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
        <h1 className="font-medium text-[14px] text-linear-900">{organization.name} Followers</h1>
        <div className="h-4 w-px bg-linear-200"></div>
        <span className="text-[13px] text-linear-500">{filteredFollowers.length} people</span>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-[#fbfbfc]">
        <div className="max-w-6xl mx-auto p-8">
          {/* Filters */}
          <div className="mb-4 rounded-lg border border-linear-200 bg-white shadow-sm p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-linear-400" />
                <input
                  placeholder="Search followers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 text-[13px] border border-linear-200 rounded-md focus:outline-none focus:ring-2 focus:ring-linear-900 focus:border-transparent"
                />
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortBy)}
                className="px-3 py-2 text-[13px] border border-linear-200 rounded-md focus:outline-none focus:ring-2 focus:ring-linear-900 focus:border-transparent bg-white"
              >
                <option value="recent">Most Recent</option>
                <option value="hours">Most Hours</option>
                <option value="mutual">Mutual Connections</option>
              </select>

              {/* View Toggle */}
              <div className="flex rounded-md border border-linear-200 overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-3 py-2 text-[12px] font-medium transition-colors ${
                    viewMode === "grid"
                      ? "bg-linear-900 text-white"
                      : "bg-white text-linear-600 hover:bg-linear-50"
                  }`}
                >
                  <Grid3x3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`px-3 py-2 text-[12px] font-medium transition-colors border-l border-linear-200 ${
                    viewMode === "list"
                      ? "bg-linear-900 text-white"
                      : "bg-white text-linear-600 hover:bg-linear-50"
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Followers List/Grid */}
          {filteredFollowers.length === 0 ? (
            <div className="rounded-lg border border-linear-200 bg-white shadow-sm p-12 text-center">
              <Users className="mx-auto mb-4 h-12 w-12 text-linear-400" />
              <p className="text-[12px] text-linear-500">
                {searchQuery ? "No followers found matching your search" : "No followers yet"}
              </p>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredFollowers.map((follower) => {
                const initials = follower.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .substring(0, 2);

                return (
                  <div key={follower.id} className="rounded-lg border border-linear-200 bg-white shadow-sm hover:shadow-md transition-shadow p-6">
                    <div className="mb-4 flex items-start justify-between">
                      <Link href={`/profile/${follower.username}`}>
                        <div className="h-16 w-16 rounded-full bg-linear-100 flex items-center justify-center text-[14px] font-bold text-linear-700 overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
                          {follower.avatar_url ? (
                            <img src={follower.avatar_url} alt={follower.name} className="w-full h-full object-cover" />
                          ) : (
                            initials
                          )}
                        </div>
                      </Link>
                      {follower.isVerified && (
                        <div className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium bg-blue-100 text-blue-700 border border-blue-200">
                          <CheckCircle2 className="h-3 w-3" />
                          Verified
                        </div>
                      )}
                    </div>

                    <Link href={`/profile/${follower.username}`}>
                      <h3 className="mb-1 text-[13px] font-semibold text-linear-900 hover:text-peer-green transition-colors">
                        {follower.name}
                      </h3>
                    </Link>

                    {follower.headline && (
                      <p className="mb-3 line-clamp-2 text-[12px] text-linear-600">
                        {follower.headline}
                      </p>
                    )}

                    <div className="mb-4 space-y-1 text-[11px] text-linear-600">
                      {follower.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-linear-500" />
                          {follower.location}
                        </div>
                      )}
                      {follower.mutualConnections && follower.mutualConnections > 0 && (
                        <p className="text-linear-500">
                          {follower.mutualConnections} mutual connection
                          {follower.mutualConnections !== 1 ? "s" : ""}
                        </p>
                      )}
                      {follower.hoursContributed && follower.hoursContributed > 0 && (
                        <p className="font-medium text-peer-green">
                          {follower.hoursContributed} hours contributed
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => handleConnect(follower.id)}
                      disabled={follower.isConnected || connectMutation.isPending}
                      className={`w-full px-3 py-1.5 text-[12px] font-medium rounded transition-colors flex items-center justify-center gap-1.5 ${
                        follower.isConnected
                          ? "bg-linear-100 text-linear-600 cursor-not-allowed"
                          : "bg-linear-900 text-white hover:bg-black"
                      }`}
                    >
                      {follower.isConnected ? (
                        <>
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Connected
                        </>
                      ) : (
                        <>
                          <UserPlus className="h-3.5 w-3.5" />
                          Connect
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredFollowers.map((follower) => {
                const initials = follower.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .substring(0, 2);

                return (
                  <div key={follower.id} className="rounded-lg border border-linear-200 bg-white shadow-sm p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <Link href={`/profile/${follower.username}`}>
                          <div className="h-12 w-12 rounded-full bg-linear-100 flex items-center justify-center text-[12px] font-bold text-linear-700 overflow-hidden cursor-pointer hover:opacity-80 transition-opacity shrink-0">
                            {follower.avatar_url ? (
                              <img src={follower.avatar_url} alt={follower.name} className="w-full h-full object-cover" />
                            ) : (
                              initials
                            )}
                          </div>
                        </Link>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <Link href={`/profile/${follower.username}`}>
                              <h3 className="text-[13px] font-semibold text-linear-900 hover:text-peer-green transition-colors">
                                {follower.name}
                              </h3>
                            </Link>
                            {follower.isVerified && (
                              <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                            )}
                          </div>
                          <p className="text-[12px] text-linear-600 truncate">{follower.headline}</p>
                          <div className="mt-1 flex flex-wrap items-center gap-3 text-[11px] text-linear-500">
                            {follower.location && (
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {follower.location}
                              </span>
                            )}
                            {follower.mutualConnections && follower.mutualConnections > 0 && (
                              <span>{follower.mutualConnections} mutual</span>
                            )}
                            {follower.hoursContributed && follower.hoursContributed > 0 && (
                              <span className="font-medium text-peer-green">
                                {follower.hoursContributed}h contributed
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleConnect(follower.id)}
                        disabled={follower.isConnected || connectMutation.isPending}
                        className={`px-3 py-1.5 text-[12px] font-medium rounded transition-colors shrink-0 ${
                          follower.isConnected
                            ? "bg-linear-100 text-linear-600 cursor-not-allowed"
                            : "bg-linear-900 text-white hover:bg-black"
                        }`}
                      >
                        {follower.isConnected ? "Connected" : "Connect"}
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
