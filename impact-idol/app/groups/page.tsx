"use client";

import { useState } from "react";
import { trpc } from "@/lib/utils/trpc";
import { Users, Search, Plus, TrendingUp, Globe, Lock, Heart } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function VolunteerGroupsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"discover" | "my-groups">("discover");

  const { data: allGroups, isLoading } = trpc.groups.list.useQuery();
  const { data: myGroups } = trpc.groups.getMyGroups.useQuery({
    userId: "current-user",
  });

  const joinMutation = trpc.groups.join.useMutation({
    onSuccess: () => {
      toast.success("Joined group successfully!");
    },
  });

  // Filter groups
  const filteredGroups = (allGroups || []).filter((group) =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleJoinGroup = (groupId: string) => {
    joinMutation.mutate({ groupId, userId: "current-user" });
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

  return (
    <div className="min-h-screen bg-[#fbfbfc] py-8">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="mb-2 text-[32px] font-semibold text-linear-900">Volunteer Communities</h1>
              <p className="text-[16px] text-linear-600">
                Join affinity groups and connect with like-minded volunteers
              </p>
            </div>
            <Link
              href="/groups/create"
              className="flex h-10 items-center gap-2 rounded-md bg-peer-green px-4 text-[13px] font-medium text-white transition-colors hover:bg-green-600"
            >
              <Plus className="h-4 w-4" />
              Create Group
            </Link>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6 rounded-lg border border-linear-200 bg-white p-4 shadow-sm">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-linear-500" />
            <input
              placeholder="Search groups by name, interest, or cause..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 w-full rounded-md border border-linear-200 bg-white pl-9 pr-3 text-[13px] text-linear-900 placeholder:text-linear-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-linear-900"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 space-y-6">
          <div className="flex gap-2 border-b border-linear-200">
            <button
              onClick={() => setActiveTab("discover")}
              className={`h-10 px-4 text-[13px] font-medium transition-colors ${
                activeTab === "discover"
                  ? "border-b-2 border-linear-900 text-linear-900"
                  : "text-linear-600 hover:text-linear-900"
              }`}
            >
              Discover Groups
            </button>
            <button
              onClick={() => setActiveTab("my-groups")}
              className={`h-10 px-4 text-[13px] font-medium transition-colors ${
                activeTab === "my-groups"
                  ? "border-b-2 border-linear-900 text-linear-900"
                  : "text-linear-600 hover:text-linear-900"
              }`}
            >
              My Groups ({myGroups?.length || 0})
            </button>
          </div>

          {/* Discover Groups */}
          {activeTab === "discover" && (
            <div className="space-y-6">
              {/* Featured Groups */}
              <div>
                <h2 className="mb-4 text-[18px] font-semibold text-linear-900">Featured Groups</h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredGroups.slice(0, 3).map((group) => (
                    <div key={group.id} className="overflow-hidden rounded-lg border border-linear-200 bg-white shadow-sm transition-shadow hover:shadow-md">
                      {group.coverImage && (
                        <div
                          className="h-32 bg-cover bg-center"
                          style={{ backgroundImage: `url(${group.coverImage})` }}
                        />
                      )}
                      {!group.coverImage && (
                        <div className="flex h-32 items-center justify-center bg-gradient-to-br from-green-100 to-green-50">
                          <Users className="h-16 w-16 text-green-300" />
                        </div>
                      )}

                      <div className="p-6">
                        <div className="mb-3 flex items-start justify-between">
                          <div className="flex-1">
                            <div className="mb-2 flex items-center gap-2">
                              {group.isPrivate ? (
                                <Lock className="h-4 w-4 text-linear-500" />
                              ) : (
                                <Globe className="h-4 w-4 text-linear-500" />
                              )}
                              <span className="text-[11px] text-linear-600">
                                {group.isPrivate ? "Private" : "Public"} Group
                              </span>
                            </div>
                            <h3 className="mb-1 text-[16px] font-semibold text-linear-900">{group.name}</h3>
                          </div>
                        </div>

                        <p className="mb-4 line-clamp-2 text-[13px] text-linear-600">
                          {group.description}
                        </p>

                        {/* Stats */}
                        <div className="mb-4 flex items-center gap-4 text-[13px] text-linear-600">
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {group.memberCount} members
                          </div>
                          {group.category && (
                            <span className="inline-flex items-center rounded-full bg-linear-100 px-2 py-0.5 text-[11px] text-linear-900">
                              {group.category}
                            </span>
                          )}
                        </div>

                        {/* Action */}
                        <button
                          onClick={() => handleJoinGroup(group.id)}
                          disabled={joinMutation.isPending}
                          className="h-9 w-full rounded-md bg-peer-green px-4 text-[13px] font-medium text-white transition-colors hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {group.isMember ? "Joined" : "Join Group"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* All Groups */}
              <div>
                <h2 className="mb-4 text-[18px] font-semibold text-linear-900">All Groups</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredGroups.slice(3).map((group) => (
                    <div key={group.id} className="rounded-lg border border-linear-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
                      <div className="mb-3 flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-linear-200 bg-linear-50">
                          {group.avatar ? (
                            <img src={group.avatar} alt={group.name} className="h-full w-full rounded-lg object-cover" />
                          ) : (
                            <Users className="h-6 w-6 text-linear-600" />
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="mb-1 flex items-center gap-2">
                            <h3 className="text-[13px] font-semibold text-linear-900">{group.name}</h3>
                            {group.isPrivate && <Lock className="h-3 w-3 text-linear-500" />}
                          </div>
                          <p className="text-[11px] text-linear-600">
                            {group.memberCount} members
                          </p>
                        </div>
                      </div>

                      <p className="mb-3 line-clamp-2 text-[13px] text-linear-600">
                        {group.description}
                      </p>

                      {group.category && (
                        <span className="mb-3 inline-flex items-center rounded-full bg-linear-100 px-2 py-0.5 text-[11px] text-linear-900">
                          {group.category}
                        </span>
                      )}

                      <button
                        onClick={() => handleJoinGroup(group.id)}
                        disabled={joinMutation.isPending}
                        className="mt-3 h-9 w-full rounded-md border border-linear-200 bg-white px-4 text-[13px] text-linear-900 transition-colors hover:bg-linear-50 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {group.isMember ? "Joined" : "Join"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* My Groups */}
          {activeTab === "my-groups" && (
            <div>
              {myGroups && myGroups.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {myGroups.map((group) => (
                    <div key={group.id} className="rounded-lg border border-linear-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
                      <div className="mb-3 flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-linear-200 bg-linear-50">
                          {group.avatar ? (
                            <img src={group.avatar} alt={group.name} className="h-full w-full rounded-lg object-cover" />
                          ) : (
                            <Users className="h-6 w-6 text-linear-600" />
                          )}
                        </div>

                        <div className="flex-1">
                          <h3 className="mb-1 text-[13px] font-semibold text-linear-900">{group.name}</h3>
                          <p className="text-[11px] text-linear-600">
                            {group.memberCount} members
                          </p>
                        </div>
                      </div>

                      <p className="mb-3 line-clamp-2 text-[13px] text-linear-600">
                        {group.description}
                      </p>

                      {group.recentActivity && (
                        <div className="mb-3 rounded-lg bg-blue-50 p-2 text-[11px] text-blue-700">
                          <TrendingUp className="mr-1 inline h-3 w-3" />
                          {group.recentActivity}
                        </div>
                      )}

                      <Link
                        href={`/groups/${group.id}`}
                        className="flex h-9 w-full items-center justify-center rounded-md border border-linear-200 bg-white px-4 text-[13px] text-linear-900 transition-colors hover:bg-linear-50"
                      >
                        View Group
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border border-linear-200 bg-white p-12 text-center shadow-sm">
                  <Users className="mx-auto mb-4 h-12 w-12 text-linear-400" />
                  <p className="mb-2 text-[14px] font-semibold text-linear-900">You haven't joined any groups yet</p>
                  <p className="mb-4 text-[13px] text-linear-600">
                    Explore groups and connect with like-minded volunteers
                  </p>
                  <button
                    onClick={() => setActiveTab("discover")}
                    className="h-9 rounded-md bg-peer-green px-4 text-[13px] font-medium text-white transition-colors hover:bg-green-600"
                  >
                    Discover Groups
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Group Categories */}
        <div className="mt-12">
          <h2 className="mb-4 text-[18px] font-semibold text-linear-900">Browse by Category</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "Tech Volunteers", icon: "💻", count: 12 },
              { name: "LGBTQ+ Volunteers", icon: "🏳️‍🌈", count: 8 },
              { name: "Young Professionals", icon: "👔", count: 15 },
              { name: "Environmental Activists", icon: "🌱", count: 10 },
              { name: "Education Supporters", icon: "📚", count: 9 },
              { name: "Healthcare Heroes", icon: "⚕️", count: 7 },
              { name: "Animal Lovers", icon: "🐾", count: 11 },
              { name: "Arts & Culture", icon: "🎨", count: 6 },
            ].map((category) => (
              <div key={category.name} className="cursor-pointer rounded-lg border border-linear-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
                <div className="flex items-center gap-3">
                  <div className="text-[28px]">{category.icon}</div>
                  <div className="flex-1">
                    <p className="text-[13px] font-semibold text-linear-900">{category.name}</p>
                    <p className="text-[11px] text-linear-600">
                      {category.count} groups
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
