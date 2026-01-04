"use client";

import { useState } from "react";
import { trpc } from "@/lib/utils/trpc";
import {
  Search,
  Users,
  Building2,
  Calendar,
  MapPin,
  Clock,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function UniversalSearchPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState("all");

  const { data: peopleResults, isLoading: peopleLoading } = trpc.users.searchUsers.useQuery(
    { query: searchQuery, limit: 20 },
    { enabled: searchQuery.length > 0 }
  );

  const { data: orgResults, isLoading: orgsLoading } = trpc.organizations.search.useQuery(
    { query: searchQuery, limit: 20 },
    { enabled: searchQuery.length > 0 }
  );

  const { data: opportunityResults, isLoading: oppsLoading } = trpc.opportunities.list.useQuery(
    { search: searchQuery, limit: 20 },
    { enabled: searchQuery.length > 0 }
  );

  const totalPeople = peopleResults?.length || 0;
  const totalOrgs = orgResults?.length || 0;
  const totalOpps = opportunityResults?.total || 0;
  const totalResults = totalPeople + totalOrgs + totalOpps;

  const isLoading = peopleLoading || orgsLoading || oppsLoading;

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <header className="h-14 border-b border-linear-100 flex items-center px-6 shrink-0">
        <h1 className="font-medium text-[14px] text-linear-900">Search</h1>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-[#fbfbfc]">
        <div className="max-w-6xl mx-auto p-8">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-linear-500" />
              <input
                type="text"
                placeholder="Search people, organizations, opportunities, causes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-12 pr-4 text-[13px] rounded-md border border-linear-200 focus:outline-none focus:ring-1 focus:ring-[#22c55e] focus:border-[#22c55e]"
                autoFocus
              />
            </div>
          </div>

          {!searchQuery ? (
            <div className="rounded-lg border border-linear-200 bg-white shadow-sm">
              <div className="py-16 text-center">
                <Search className="mx-auto mb-4 h-12 w-12 text-linear-400" />
                <h3 className="mb-2 text-[14px] font-semibold text-linear-900">Start searching</h3>
                <p className="text-[12px] text-linear-500">
                  Find people, organizations, and opportunities
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Results Count */}
              <div className="mb-4">
                <p className="text-[12px] text-linear-500">
                  {isLoading ? "Searching..." : `${totalResults} results found`}
                </p>
              </div>

              {/* Tabs */}
              <div className="mb-6">
                <div className="flex items-center gap-2 border-b border-linear-200">
                  <button
                    onClick={() => setActiveTab("all")}
                    className={`px-3 py-2 text-[12px] font-medium border-b-2 transition-colors ${
                      activeTab === "all"
                        ? "border-[#22c55e] text-linear-900"
                        : "border-transparent text-linear-500 hover:text-linear-900"
                    }`}
                  >
                    All <span className="ml-1.5 text-[11px] text-linear-400">{totalResults}</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("people")}
                    className={`px-3 py-2 text-[12px] font-medium border-b-2 transition-colors flex items-center gap-1.5 ${
                      activeTab === "people"
                        ? "border-[#22c55e] text-linear-900"
                        : "border-transparent text-linear-500 hover:text-linear-900"
                    }`}
                  >
                    <Users className="h-3.5 w-3.5" />
                    People <span className="ml-1.5 text-[11px] text-linear-400">{totalPeople}</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("organizations")}
                    className={`px-3 py-2 text-[12px] font-medium border-b-2 transition-colors flex items-center gap-1.5 ${
                      activeTab === "organizations"
                        ? "border-[#22c55e] text-linear-900"
                        : "border-transparent text-linear-500 hover:text-linear-900"
                    }`}
                  >
                    <Building2 className="h-3.5 w-3.5" />
                    Organizations <span className="ml-1.5 text-[11px] text-linear-400">{totalOrgs}</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("opportunities")}
                    className={`px-3 py-2 text-[12px] font-medium border-b-2 transition-colors flex items-center gap-1.5 ${
                      activeTab === "opportunities"
                        ? "border-[#22c55e] text-linear-900"
                        : "border-transparent text-linear-500 hover:text-linear-900"
                    }`}
                  >
                    <Calendar className="h-3.5 w-3.5" />
                    Opportunities <span className="ml-1.5 text-[11px] text-linear-400">{totalOpps}</span>
                  </button>
                </div>
              </div>

              {/* All Results */}
              {activeTab === "all" && (
                <div className="space-y-6">
                  {/* People Section */}
                  {totalPeople > 0 && (
                    <div>
                      <h2 className="mb-3 text-[13px] font-semibold text-linear-900">People</h2>
                      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {peopleResults?.slice(0, 3).map((person) => (
                          <PersonCard key={person.id} person={person} />
                        ))}
                      </div>
                      {totalPeople > 3 && (
                        <button
                          onClick={() => setActiveTab("people")}
                          className="mt-3 text-[12px] font-medium text-[#22c55e] hover:underline"
                        >
                          View all {totalPeople} people →
                        </button>
                      )}
                    </div>
                  )}

                  {/* Organizations Section */}
                  {totalOrgs > 0 && (
                    <div>
                      <h2 className="mb-3 text-[13px] font-semibold text-linear-900">Organizations</h2>
                      <div className="space-y-2">
                        {orgResults?.slice(0, 3).map((org) => (
                          <OrgCard key={org.id} org={org} />
                        ))}
                      </div>
                      {totalOrgs > 3 && (
                        <button
                          onClick={() => setActiveTab("organizations")}
                          className="mt-3 text-[12px] font-medium text-[#22c55e] hover:underline"
                        >
                          View all {totalOrgs} organizations →
                        </button>
                      )}
                    </div>
                  )}

                  {/* Opportunities Section */}
                  {totalOpps > 0 && (
                    <div>
                      <h2 className="mb-3 text-[13px] font-semibold text-linear-900">Opportunities</h2>
                      <div className="space-y-2">
                        {opportunityResults?.opportunities.slice(0, 3).map((opp) => (
                          <OpportunityCard key={opp.id} opportunity={opp} />
                        ))}
                      </div>
                      {totalOpps > 3 && (
                        <button
                          onClick={() => setActiveTab("opportunities")}
                          className="mt-3 text-[12px] font-medium text-[#22c55e] hover:underline"
                        >
                          View all {totalOpps} opportunities →
                        </button>
                      )}
                    </div>
                  )}

                  {totalResults === 0 && !isLoading && (
                    <div className="rounded-lg border border-linear-200 bg-white shadow-sm">
                      <div className="py-16 text-center">
                        <Search className="mx-auto mb-4 h-12 w-12 text-linear-400" />
                        <h3 className="mb-2 text-[14px] font-semibold text-linear-900">No results found</h3>
                        <p className="text-[12px] text-linear-500">
                          Try different keywords or check your spelling
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* People Tab */}
              {activeTab === "people" && (
                <div>
                  {peopleLoading ? (
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-48 rounded-lg border border-linear-200 bg-white animate-pulse" />
                      ))}
                    </div>
                  ) : totalPeople === 0 ? (
                    <div className="rounded-lg border border-linear-200 bg-white shadow-sm">
                      <div className="py-16 text-center">
                        <Users className="mx-auto mb-4 h-12 w-12 text-linear-400" />
                        <h3 className="mb-2 text-[14px] font-semibold text-linear-900">No people found</h3>
                      </div>
                    </div>
                  ) : (
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {peopleResults?.map((person) => (
                        <PersonCard key={person.id} person={person} />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Organizations Tab */}
              {activeTab === "organizations" && (
                <div>
                  {orgsLoading ? (
                    <div className="space-y-2">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-32 rounded-lg border border-linear-200 bg-white animate-pulse" />
                      ))}
                    </div>
                  ) : totalOrgs === 0 ? (
                    <div className="rounded-lg border border-linear-200 bg-white shadow-sm">
                      <div className="py-16 text-center">
                        <Building2 className="mx-auto mb-4 h-12 w-12 text-linear-400" />
                        <h3 className="mb-2 text-[14px] font-semibold text-linear-900">No organizations found</h3>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {orgResults?.map((org) => (
                        <OrgCard key={org.id} org={org} />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Opportunities Tab */}
              {activeTab === "opportunities" && (
                <div>
                  {oppsLoading ? (
                    <div className="space-y-2">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-32 rounded-lg border border-linear-200 bg-white animate-pulse" />
                      ))}
                    </div>
                  ) : totalOpps === 0 ? (
                    <div className="rounded-lg border border-linear-200 bg-white shadow-sm">
                      <div className="py-16 text-center">
                        <Calendar className="mx-auto mb-4 h-12 w-12 text-linear-400" />
                        <h3 className="mb-2 text-[14px] font-semibold text-linear-900">No opportunities found</h3>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {opportunityResults?.opportunities.map((opp) => (
                        <OpportunityCard key={opp.id} opportunity={opp} />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function PersonCard({ person }: { person: any }) {
  return (
    <div className="rounded-lg border border-linear-200 bg-white shadow-sm hover:shadow-md transition-all">
      <div className="p-5">
        <Link href={`/profile/${person.username}`} className="block">
          <div className="flex flex-col items-center text-center">
            <div className="h-16 w-16 rounded-full bg-linear-100 flex items-center justify-center text-[18px] font-semibold text-linear-700 mb-3">
              {person.name?.substring(0, 2) || "??"}
            </div>
            <h3 className="text-[13px] font-semibold text-linear-900 hover:underline">{person.name}</h3>
            {person.headline && (
              <p className="mt-1 line-clamp-2 text-[11px] text-linear-500">
                {person.headline}
              </p>
            )}
            {person.location && (
              <div className="mt-2 flex items-center gap-1 text-[11px] text-linear-500">
                <MapPin className="h-3 w-3" />
                {person.location}
              </div>
            )}
          </div>
        </Link>
        <button className="mt-4 w-full h-8 rounded-md bg-linear-900 hover:bg-black text-white text-[12px] font-medium flex items-center justify-center gap-1.5 transition-colors">
          <UserPlus className="h-3.5 w-3.5" />
          Connect
        </button>
      </div>
    </div>
  );
}

function OrgCard({ org }: { org: any }) {
  return (
    <div className="rounded-lg border border-linear-200 bg-white shadow-sm hover:shadow-md transition-all">
      <div className="p-4">
        <Link href={`/org/${org.id}`} className="flex gap-4">
          <div className="h-16 w-16 rounded-md bg-linear-100 flex items-center justify-center text-[18px] font-semibold text-linear-700 shrink-0">
            {org.name?.substring(0, 2) || "??"}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-[13px] font-semibold text-linear-900 hover:underline">{org.name}</h3>
            {org.description && (
              <p className="mt-1 line-clamp-2 text-[11px] text-linear-500">
                {org.description}
              </p>
            )}
            {org.location && (
              <div className="mt-2 flex items-center gap-1 text-[11px] text-linear-500">
                <MapPin className="h-3 w-3" />
                {org.location}
              </div>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
}

function OpportunityCard({ opportunity }: { opportunity: any }) {
  return (
    <div className="rounded-lg border border-linear-200 bg-white shadow-sm hover:shadow-md transition-all">
      <div className="p-4">
        <Link href={`/discover/${opportunity.id}`}>
          <h3 className="text-[13px] font-semibold text-linear-900 hover:underline">{opportunity.title}</h3>
          {opportunity.description && (
            <p className="mt-2 line-clamp-2 text-[11px] text-linear-500">
              {opportunity.description}
            </p>
          )}
          <div className="mt-3 flex flex-wrap gap-3 text-[11px] text-linear-500">
            {opportunity.organization && (
              <span className="flex items-center gap-1">
                <Building2 className="h-3 w-3" />
                {opportunity.organization.name}
              </span>
            )}
            {opportunity.starts_at && (
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {new Date(opportunity.starts_at).toLocaleDateString()}
              </span>
            )}
            {opportunity.location && (
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {opportunity.location}
              </span>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
}
