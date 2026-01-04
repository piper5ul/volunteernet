"use client";

import { useState } from "react";
import { trpc } from "@/lib/utils/trpc";
import { MapPin, Navigation, Filter, Calendar, Clock, Users, X } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils/date-utils";

export default function MapDiscoveryPage() {
  const [selectedCause, setSelectedCause] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");
  const [selectedOpportunity, setSelectedOpportunity] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const { data: opportunities, isLoading } = trpc.opportunities.list.useQuery({
    limit: 100,
  });

  const { data: causes } = trpc.causes.list.useQuery();

  // Filter opportunities
  const filteredOpportunities = (opportunities || []).filter((opp) => {
    if (selectedCause !== "all" && opp.cause_id !== selectedCause) return false;

    if (dateFilter !== "all") {
      const oppDate = new Date(opp.starts_at);
      const now = new Date();
      const daysDiff = Math.ceil((oppDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

      if (dateFilter === "today" && daysDiff !== 0) return false;
      if (dateFilter === "week" && (daysDiff < 0 || daysDiff > 7)) return false;
      if (dateFilter === "month" && (daysDiff < 0 || daysDiff > 30)) return false;
    }

    return true;
  });

  const selectedOpp = selectedOpportunity
    ? opportunities?.find((o) => o.id === selectedOpportunity)
    : null;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fbfbfc] py-6">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="h-[calc(100vh-200px)] animate-pulse rounded-lg bg-linear-100" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fbfbfc] py-6">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-4">
          <h1 className="mb-2 text-[28px] font-semibold text-linear-900">Map Discovery</h1>
          <p className="text-[14px] text-linear-600">
            Find volunteer opportunities near you
          </p>
        </div>

        {/* Filters Bar */}
        <div className="mb-4 rounded-lg border border-linear-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-linear-500" />
              <input
                placeholder="Enter location or ZIP code"
                className="h-9 w-full rounded-md border border-linear-200 bg-white pl-9 pr-3 text-[13px] text-linear-900 placeholder:text-linear-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-linear-900"
                defaultValue="San Francisco, CA"
              />
            </div>

            <div className="flex gap-2">
              <select
                value={selectedCause}
                onChange={(e) => setSelectedCause(e.target.value)}
                className="h-9 w-36 rounded-md border border-linear-200 bg-white px-3 text-[13px] text-linear-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-linear-900"
              >
                <option value="all">All Causes</option>
                {causes?.map((cause) => (
                  <option key={cause.id} value={cause.id}>
                    {cause.name}
                  </option>
                ))}
              </select>

              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="h-9 w-32 rounded-md border border-linear-200 bg-white px-3 text-[13px] text-linear-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-linear-900"
              >
                <option value="all">Any Date</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex h-9 w-9 items-center justify-center rounded-md border border-linear-200 bg-white transition-colors hover:bg-linear-50"
              >
                <Filter className="h-4 w-4 text-linear-900" />
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="mt-4 flex gap-2 border-t border-linear-200 pt-4">
              <button className="h-9 rounded-md border border-linear-200 bg-white px-4 text-[13px] text-linear-900 transition-colors hover:bg-linear-50">
                <Navigation className="mr-2 inline-block h-4 w-4" />
                Use My Location
              </button>
              <button className="h-9 rounded-md border border-linear-200 bg-white px-4 text-[13px] text-linear-900 transition-colors hover:bg-linear-50">
                Distance: 10 miles
              </button>
              <button className="h-9 rounded-md border border-linear-200 bg-white px-4 text-[13px] text-linear-900 transition-colors hover:bg-linear-50">
                Virtual Only
              </button>
            </div>
          )}
        </div>

        {/* Map and List Layout */}
        <div className="grid gap-4 lg:grid-cols-2">
          {/* Map Placeholder */}
          <div className="lg:sticky lg:top-4 lg:h-[calc(100vh-220px)] rounded-lg border border-linear-200 bg-white shadow-sm">
            <div className="relative h-full p-0">
              {/* Map placeholder - in production this would be Google Maps, Mapbox, etc. */}
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-100 to-blue-50">
                <div className="text-center">
                  <MapPin className="mx-auto mb-4 h-16 w-16 text-blue-600" />
                  <p className="mb-2 text-[16px] font-semibold text-linear-900">Interactive Map View</p>
                  <p className="text-[13px] text-linear-600">
                    Map integration coming soon
                  </p>
                  <p className="mt-4 text-[11px] text-linear-600">
                    {filteredOpportunities.length} opportunities in your area
                  </p>
                </div>
              </div>

              {/* Selected Opportunity Card (overlays map) */}
              {selectedOpp && (
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="rounded-lg border border-linear-200 bg-white p-4 shadow-sm">
                    <div className="mb-3 flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="mb-1 text-[13px] font-semibold text-linear-900">{selectedOpp.title}</h3>
                        <div className="flex items-center gap-2 text-[11px] text-linear-600">
                          <Calendar className="h-3 w-3" />
                          {formatDate(selectedOpp.starts_at, "MMM d")}
                          <Clock className="h-3 w-3" />
                          {formatDate(selectedOpp.starts_at, "h:mm a")}
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedOpportunity(null)}
                        className="flex h-6 w-6 items-center justify-center rounded-md transition-colors hover:bg-linear-100"
                      >
                        <X className="h-4 w-4 text-linear-900" />
                      </button>
                    </div>
                    <Link
                      href={`/discover/${selectedOpp.id}`}
                      className="flex h-9 w-full items-center justify-center rounded-md bg-peer-green px-4 text-[13px] font-medium text-white transition-colors hover:bg-green-600"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Opportunities List */}
          <div className="space-y-3">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-[13px] text-linear-600">
                {filteredOpportunities.length} opportunities found
              </p>
            </div>

            {filteredOpportunities.length === 0 ? (
              <div className="rounded-lg border border-linear-200 bg-white p-12 text-center shadow-sm">
                <MapPin className="mx-auto mb-4 h-12 w-12 text-linear-400" />
                <p className="text-[13px] text-linear-600">
                  No opportunities found matching your filters
                </p>
              </div>
            ) : (
              filteredOpportunities.map((opp) => (
                <div
                  key={opp.id}
                  className={`cursor-pointer rounded-lg border bg-white p-4 shadow-sm transition-shadow hover:shadow-md ${
                    selectedOpportunity === opp.id ? "border-peer-green ring-2 ring-peer-green" : "border-linear-200"
                  }`}
                  onClick={() => setSelectedOpportunity(opp.id)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <h3 className="mb-1 text-[13px] font-semibold text-linear-900">{opp.title}</h3>

                      <div className="mb-2 flex flex-wrap items-center gap-3 text-[13px] text-linear-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDate(opp.starts_at, "MMM d, yyyy")}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {formatDate(opp.starts_at, "h:mm a")}
                        </div>
                      </div>

                      {opp.location && (
                        <div className="mb-2 flex items-center gap-1 text-[13px] text-linear-600">
                          <MapPin className="h-4 w-4" />
                          {opp.location.name}
                        </div>
                      )}

                      {opp.is_virtual && (
                        <span className="mb-2 inline-flex items-center rounded-full bg-linear-100 px-2 py-0.5 text-[11px] text-linear-900">
                          Virtual
                        </span>
                      )}

                      {opp.cause && (
                        <span
                          className="mb-2 ml-2 inline-flex items-center rounded-full px-2 py-0.5 text-[11px]"
                          style={{ backgroundColor: `${opp.cause.color}20`, color: opp.cause.color }}
                        >
                          {opp.cause.name}
                        </span>
                      )}

                      {opp.capacity && (
                        <div className="flex items-center gap-1 text-[11px] text-linear-600">
                          <Users className="h-3 w-3" />
                          {opp.current_registrations || 0} / {opp.capacity} registered
                        </div>
                      )}
                    </div>

                    <Link
                      href={`/discover/${opp.id}`}
                      className="flex h-9 items-center rounded-md border border-linear-200 bg-white px-4 text-[13px] text-linear-900 transition-colors hover:bg-linear-50"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
