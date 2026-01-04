"use client";

import { useState } from "react";
import { trpc } from "@/lib/utils/trpc";
import { useAuth } from "@/lib/stores/auth-store";
import {
  Users,
  Search,
  MapPin,
  Briefcase,
  UserPlus,
  Filter,
  X,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function DiscoverPeoplePage() {
  const { currentPersona } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [causeFilter, setCauseFilter] = useState("");
  const [skillFilter, setSkillFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const userId =
    currentPersona.type === "volunteer" || currentPersona.type === "squad-leader"
      ? currentPersona.userId
      : null;

  const { data: allUsers, isLoading } = trpc.users.searchUsers.useQuery(
    {
      query: searchQuery,
      location: locationFilter,
      cause: causeFilter,
      skill: skillFilter,
      limit: 50,
    },
    { enabled: true }
  );

  const { data: causes } = trpc.opportunities.getCauses.useQuery();

  const sendRequestMutation = trpc.connections.sendConnectionRequest.useMutation({
    onSuccess: () => {
      toast.success("Connection request sent!");
    },
    onError: (error) => {
      toast.error("Failed to send request", { description: error.message });
    },
  });

  const filteredUsers = (allUsers || []).filter((user) => user.id !== userId);
  const hasActiveFilters = locationFilter || causeFilter || skillFilter;

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <header className="h-14 border-b border-linear-200 flex items-center px-6 shrink-0">
        <h1 className="font-medium text-[14px] text-linear-900">Discover People</h1>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-[#fbfbfc]">
        <div className="mx-auto max-w-7xl p-6">
          <div className="grid gap-6 lg:grid-cols-12">
            {/* Filters Sidebar - Desktop */}
            <aside className="hidden lg:col-span-3 lg:block">
              <div className="sticky top-6 rounded-lg border border-linear-200 bg-white shadow-sm">
                <div className="border-b border-linear-200 px-4 py-3">
                  <h3 className="text-[13px] font-semibold text-linear-900">Filters</h3>
                </div>
                <div className="p-4 space-y-4">
                  {/* Location Filter */}
                  <div>
                    <label htmlFor="location" className="block mb-1.5 text-[11px] font-medium text-linear-900">
                      Location
                    </label>
                    <input
                      id="location"
                      placeholder="City or region"
                      value={locationFilter}
                      onChange={(e) => setLocationFilter(e.target.value)}
                      className="w-full h-9 rounded-md border border-linear-200 bg-white px-3 text-[13px] text-linear-900 placeholder:text-linear-400 focus:outline-none focus:ring-1 focus:ring-[#22c55e]"
                    />
                  </div>

                  {/* Cause Filter */}
                  <div>
                    <label htmlFor="cause" className="block mb-1.5 text-[11px] font-medium text-linear-900">
                      Cause
                    </label>
                    <div className="relative">
                      <select
                        id="cause"
                        value={causeFilter}
                        onChange={(e) => setCauseFilter(e.target.value)}
                        className="w-full h-9 appearance-none rounded-md border border-linear-200 bg-white px-3 pr-8 text-[13px] text-linear-900 focus:outline-none focus:ring-1 focus:ring-[#22c55e]"
                      >
                        <option value="">All causes</option>
                        {causes?.map((cause) => (
                          <option key={cause.id} value={cause.slug}>
                            {cause.name}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <svg className="h-4 w-4 text-linear-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Skills Filter */}
                  <div>
                    <label htmlFor="skill" className="block mb-1.5 text-[11px] font-medium text-linear-900">
                      Skills
                    </label>
                    <input
                      id="skill"
                      placeholder="e.g. teaching, coding"
                      value={skillFilter}
                      onChange={(e) => setSkillFilter(e.target.value)}
                      className="w-full h-9 rounded-md border border-linear-200 bg-white px-3 text-[13px] text-linear-900 placeholder:text-linear-400 focus:outline-none focus:ring-1 focus:ring-[#22c55e]"
                    />
                  </div>

                  {hasActiveFilters && (
                    <button
                      onClick={() => {
                        setLocationFilter("");
                        setCauseFilter("");
                        setSkillFilter("");
                      }}
                      className="flex h-8 w-full items-center justify-center gap-2 rounded-md border border-linear-200 bg-white text-[12px] text-linear-900 hover:bg-linear-50 transition-colors"
                    >
                      <X className="h-3.5 w-3.5" />
                      Clear Filters
                    </button>
                  )}
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className="lg:col-span-9">
              {/* Search Bar */}
              <div className="mb-6 rounded-lg border border-linear-200 bg-white shadow-sm">
                <div className="p-4">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-linear-500" />
                      <input
                        placeholder="Search by name, headline, or skills..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-9 pl-10 pr-3 rounded-md border border-linear-200 bg-white text-[13px] text-linear-900 placeholder:text-linear-400 focus:outline-none focus:ring-1 focus:ring-[#22c55e]"
                      />
                    </div>
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className="lg:hidden flex h-9 items-center justify-center rounded-md border border-linear-200 bg-white px-3 text-linear-900 hover:bg-linear-50"
                    >
                      <Filter className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Mobile Filters */}
                  {showFilters && (
                    <div className="mt-4 space-y-3 border-t border-linear-200 pt-4 lg:hidden">
                      <div>
                        <label htmlFor="location-mobile" className="block mb-1.5 text-[11px] font-medium text-linear-900">
                          Location
                        </label>
                        <input
                          id="location-mobile"
                          placeholder="City or region"
                          value={locationFilter}
                          onChange={(e) => setLocationFilter(e.target.value)}
                          className="w-full h-9 rounded-md border border-linear-200 bg-white px-3 text-[13px] text-linear-900 placeholder:text-linear-400 focus:outline-none focus:ring-1 focus:ring-[#22c55e]"
                        />
                      </div>

                      <div>
                        <label htmlFor="cause-mobile" className="block mb-1.5 text-[11px] font-medium text-linear-900">
                          Cause
                        </label>
                        <div className="relative">
                          <select
                            id="cause-mobile"
                            value={causeFilter}
                            onChange={(e) => setCauseFilter(e.target.value)}
                            className="w-full h-9 appearance-none rounded-md border border-linear-200 bg-white px-3 pr-8 text-[13px] text-linear-900 focus:outline-none focus:ring-1 focus:ring-[#22c55e]"
                          >
                            <option value="">All causes</option>
                            {causes?.map((cause) => (
                              <option key={cause.id} value={cause.slug}>
                                {cause.name}
                              </option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                            <svg className="h-4 w-4 text-linear-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="skill-mobile" className="block mb-1.5 text-[11px] font-medium text-linear-900">
                          Skills
                        </label>
                        <input
                          id="skill-mobile"
                          placeholder="e.g. teaching, coding"
                          value={skillFilter}
                          onChange={(e) => setSkillFilter(e.target.value)}
                          className="w-full h-9 rounded-md border border-linear-200 bg-white px-3 text-[13px] text-linear-900 placeholder:text-linear-400 focus:outline-none focus:ring-1 focus:ring-[#22c55e]"
                        />
                      </div>

                      {hasActiveFilters && (
                        <button
                          onClick={() => {
                            setLocationFilter("");
                            setCauseFilter("");
                            setSkillFilter("");
                          }}
                          className="flex h-8 w-full items-center justify-center gap-2 rounded-md border border-linear-200 bg-white text-[12px] text-linear-900 hover:bg-linear-50 transition-colors"
                        >
                          <X className="h-3.5 w-3.5" />
                          Clear Filters
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Results Count */}
              <div className="mb-4">
                <p className="text-[12px] text-linear-600">
                  {isLoading ? "Searching..." : `${filteredUsers.length} people found`}
                </p>
              </div>

              {/* People Grid */}
              {isLoading ? (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className="h-64 rounded-lg border border-linear-200 bg-white shadow-sm animate-pulse" />
                  ))}
                </div>
              ) : filteredUsers.length === 0 ? (
                <div className="rounded-lg border border-linear-200 bg-white shadow-sm">
                  <div className="py-12 text-center">
                    <Users className="mx-auto mb-4 h-12 w-12 text-linear-400" />
                    <h3 className="mb-2 text-[14px] font-semibold text-linear-900">No people found</h3>
                    <p className="mb-4 text-[12px] text-linear-600">
                      Try adjusting your search or filters
                    </p>
                    {hasActiveFilters && (
                      <button
                        onClick={() => {
                          setSearchQuery("");
                          setLocationFilter("");
                          setCauseFilter("");
                          setSkillFilter("");
                        }}
                        className="h-9 rounded-md border border-linear-200 bg-white px-4 text-[13px] text-linear-900 hover:bg-linear-50"
                      >
                        Clear All Filters
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredUsers.map((user) => (
                    <PersonCard
                      key={user.id}
                      user={user}
                      currentUserId={userId}
                      onConnect={(toUserId) =>
                        sendRequestMutation.mutate({
                          fromUserId: userId!,
                          toUserId,
                        })
                      }
                    />
                  ))}
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

interface PersonCardProps {
  user: any;
  currentUserId: string | null;
  onConnect: (userId: string) => void;
}

function PersonCard({ user, currentUserId, onConnect }: PersonCardProps) {
  return (
    <div className="rounded-lg border border-linear-200 bg-white shadow-sm hover:shadow-md transition-all">
      <div className="p-6">
        <Link href={`/profile/${user.username}`} className="block">
          <div className="flex flex-col items-center text-center">
            <div className="h-20 w-20 rounded-full bg-linear-100 flex items-center justify-center text-[18px] font-semibold text-linear-700 mb-3">
              {user.name?.substring(0, 2) || "??"}
            </div>

            <h3 className="text-[13px] font-semibold text-linear-900 hover:underline">{user.name}</h3>

            {user.headline && (
              <p className="mt-1 line-clamp-2 text-[11px] text-linear-600">
                {user.headline}
              </p>
            )}

            {user.location && (
              <div className="mt-2 flex items-center gap-1 text-[11px] text-linear-500">
                <MapPin className="h-3 w-3" />
                {user.location}
              </div>
            )}

            {user.total_hours > 0 && (
              <div className="mt-2 flex items-center gap-1 text-[11px] text-linear-500">
                <Briefcase className="h-3 w-3" />
                {user.total_hours} hours volunteered
              </div>
            )}

            {/* Skills */}
            {user.skills && user.skills.length > 0 && (
              <div className="mt-3 flex flex-wrap justify-center gap-1">
                {user.skills.slice(0, 3).map((skill: string, i: number) => (
                  <span key={i} className="inline-flex items-center rounded-full border border-linear-200 bg-white px-2 py-0.5 text-[11px] text-linear-900">
                    {skill}
                  </span>
                ))}
                {user.skills.length > 3 && (
                  <span className="inline-flex items-center rounded-full border border-linear-200 bg-white px-2 py-0.5 text-[11px] text-linear-900">
                    +{user.skills.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>
        </Link>

        <button
          onClick={() => onConnect(user.id)}
          className="mt-4 w-full h-8 rounded-md bg-linear-900 hover:bg-black text-white text-[12px] font-medium flex items-center justify-center gap-1.5 transition-colors"
        >
          <UserPlus className="h-3.5 w-3.5" />
          Connect
        </button>
      </div>
    </div>
  );
}
