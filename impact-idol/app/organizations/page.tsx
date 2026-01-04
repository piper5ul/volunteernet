"use client";

import { useState } from "react";
import { trpc } from "@/lib/utils/trpc";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Search,
  Building2,
  MapPin,
  Users,
  Star,
  UserPlus,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function OrganizationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [causeFilter, setCauseFilter] = useState("");

  const { data: organizations, isLoading } = trpc.organizations.search.useQuery({
    query: searchQuery,
    cause: causeFilter,
    limit: 50,
  });

  const { data: causes } = trpc.opportunities.getCauses.useQuery();

  const filteredOrgs = organizations || [];

  const handleFollow = (orgId: string, orgName: string) => {
    toast.success(`Following ${orgName}`);
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <header className="h-14 border-b border-linear-100 flex items-center px-6 gap-4 shrink-0">
        <h1 className="font-medium text-[14px] text-linear-900">Organizations</h1>
        <div className="h-4 w-px bg-linear-200"></div>
        <span className="text-[13px] text-linear-500">
          {isLoading ? "Searching..." : `${filteredOrgs.length} organizations`}
        </span>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-[#fbfbfc]">
        <div className="max-w-6xl mx-auto p-8">
          {/* Search & Filters */}
          <div className="mb-6 rounded-lg border border-linear-200 bg-white shadow-sm p-4">
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-linear-400" />
                <input
                  placeholder="Search organizations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 text-[13px] border border-linear-200 rounded-md focus:outline-none focus:ring-2 focus:ring-linear-900 focus:border-transparent"
                />
              </div>

              <select
                value={causeFilter}
                onChange={(e) => setCauseFilter(e.target.value)}
                className="px-3 py-2 text-[13px] border border-linear-200 rounded-md focus:outline-none focus:ring-2 focus:ring-linear-900 focus:border-transparent bg-white sm:w-[200px]"
              >
                <option value="">All causes</option>
                {causes?.map((cause) => (
                  <option key={cause.id} value={cause.slug}>
                    {cause.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Organizations List */}
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-32" />
              ))}
            </div>
          ) : filteredOrgs.length === 0 ? (
            <div className="rounded-lg border border-linear-200 bg-white shadow-sm p-12 text-center">
              <Building2 className="mx-auto mb-4 h-12 w-12 text-linear-400" />
              <h3 className="mb-2 text-[14px] font-semibold text-linear-900">No organizations found</h3>
              <p className="text-[12px] text-linear-500">
                Try adjusting your search or filters
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrgs.map((org) => {
                const orgName = org.name || "Unknown Organization";
                const initials = orgName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .substring(0, 2);

                return (
                  <div
                    key={org.id}
                    className="rounded-lg border border-linear-200 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex gap-4">
                        <Link href={`/org/${org.id}`}>
                          <div className="h-16 w-16 rounded-lg bg-linear-100 flex items-center justify-center text-[16px] font-bold text-linear-700 overflow-hidden shrink-0 cursor-pointer hover:opacity-80 transition-opacity">
                            {org.logo_url ? (
                              <img src={org.logo_url} alt={orgName} className="w-full h-full object-cover" />
                            ) : (
                              initials
                            )}
                          </div>
                        </Link>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <Link href={`/org/${org.id}`}>
                                <h3 className="text-[15px] font-semibold text-linear-900 hover:text-peer-green transition-colors">
                                  {orgName}
                                </h3>
                              </Link>

                              {org.is_verified && (
                                <div className="flex items-center gap-1.5 mt-1">
                                  <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
                                  <span className="text-[11px] text-green-600 font-medium">Verified Organization</span>
                                </div>
                              )}

                              {org.description && (
                                <p className="mt-2 line-clamp-2 text-[12px] text-linear-600">
                                  {org.description}
                                </p>
                              )}

                              <div className="mt-3 flex flex-wrap gap-4 text-[12px] text-linear-600">
                                {org.location && (
                                  <span className="flex items-center gap-1.5">
                                    <MapPin className="h-3.5 w-3.5 text-linear-500" />
                                    {org.location}
                                  </span>
                                )}

                                <span className="flex items-center gap-1.5">
                                  <Users className="h-3.5 w-3.5 text-linear-500" />
                                  1.2k followers
                                </span>

                                <span className="flex items-center gap-1.5">
                                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                                  4.8 rating
                                </span>

                                <span className="flex items-center gap-1.5">
                                  <TrendingUp className="h-3.5 w-3.5 text-linear-500" />
                                  2.5k volunteer hours
                                </span>
                              </div>

                              {org.causes && org.causes.length > 0 && (
                                <div className="mt-3 flex flex-wrap gap-2">
                                  {org.causes.map((cause) => (
                                    <span
                                      key={cause.id}
                                      className="px-2 py-1 rounded-md text-[10px] font-medium bg-linear-100 text-linear-700 border border-linear-200"
                                    >
                                      {cause.name}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>

                            <button
                              onClick={() => handleFollow(org.id, orgName)}
                              className="px-3 py-1.5 text-[12px] font-medium text-linear-900 bg-white border border-linear-200 rounded hover:bg-linear-50 transition-colors flex items-center gap-1.5 shrink-0"
                            >
                              <UserPlus className="w-3.5 h-3.5" />
                              Follow
                            </button>
                          </div>
                        </div>
                      </div>
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
