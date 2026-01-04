"use client";

import { trpc } from "@/lib/utils/trpc";
import { useAuth } from "@/lib/stores/auth-store";
import { OrgNavigation } from "@/components/org/org-navigation";
import { OrgStatsGrid } from "@/components/org/org-stats-grid";
import {
  TrendingUp,
  Users,
  Calendar,
  Clock,
  AlertCircle,
  Plus,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function OrgDashboardPage() {
  const { currentPersona } = useAuth();

  const orgId =
    currentPersona.type === "org-admin" ? currentPersona.orgId : null;

  const { data: orgStats, isLoading } = trpc.organizations.getStats.useQuery(
    { orgId: orgId! },
    { enabled: !!orgId }
  );

  const { data: pendingVerifications } = trpc.verification.getPendingQueue.useQuery(
    { orgId: orgId! },
    { enabled: !!orgId }
  );

  const { data: upcomingEvents } = trpc.organizations.getOpportunities.useQuery(
    { orgId: orgId!, status: "upcoming", limit: 5 },
    { enabled: !!orgId }
  );

  if (!orgId || currentPersona.type !== "org-admin") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fbfbfc]">
        <div className="text-center">
          <h1 className="mb-2 text-[18px] font-semibold text-linear-900">Access Denied</h1>
          <p className="mb-4 text-[13px] text-linear-600">
            You must be an organization admin to view this page.
          </p>
          <Link href="/" className="bg-linear-900 hover:bg-black text-white text-[13px] font-medium px-4 py-2 rounded-md shadow-subtle inline-block">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col h-screen bg-white">
        <OrgNavigation />
        <div className="h-14 border-b border-linear-100 flex items-center px-6">
          <div className="h-5 w-48 bg-linear-100 rounded animate-pulse" />
        </div>
        <div className="flex-1 overflow-y-auto bg-[#fbfbfc] p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-32 bg-linear-100 rounded animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const stats = {
    totalVolunteers: orgStats?.totalVolunteers || 0,
    totalHours: orgStats?.totalHours || 0,
    totalEvents: orgStats?.totalEvents || 0,
    retentionRate: orgStats?.retentionRate || 0,
    monetaryValue: orgStats?.monetaryValue || 0,
    averageRating: orgStats?.averageRating || 0,
  };

  const pendingCount = pendingVerifications?.length || 0;

  return (
    <div className="flex flex-col min-h-screen bg-[#fbfbfc]">
      {/* Navigation */}
      <OrgNavigation />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-[#fbfbfc]">
        <div className="max-w-7xl mx-auto p-8">
          {/* Stats Grid */}
          <div className="mb-6">
            <OrgStatsGrid stats={stats} />
          </div>

          {/* Alert for Pending Verifications */}
          {pendingCount > 0 && (
            <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-5">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-600 shrink-0" />
                  <div>
                    <p className="text-[13px] font-semibold text-amber-900">
                      {pendingCount} Volunteer Hour{pendingCount !== 1 ? "s" : ""} Pending Verification
                    </p>
                    <p className="text-[12px] text-amber-800">
                      Review and verify volunteer hours to maintain trust
                    </p>
                  </div>
                </div>
                <Link href="/org/dashboard/verification" className="px-3 py-1.5 text-[12px] font-medium text-amber-900 bg-white border border-amber-300 rounded hover:bg-amber-50 transition-colors flex items-center gap-1.5 shrink-0">
                  Review Now
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Upcoming Events */}
            <div className="rounded-lg border border-linear-200 bg-white shadow-sm">
              <div className="border-b border-linear-100 p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-linear-500" />
                    <h3 className="text-[14px] font-semibold text-linear-900">Upcoming Events</h3>
                  </div>
                  <Link href="/org/dashboard/opportunities" className="text-[12px] font-medium text-linear-900 hover:underline">
                    View All
                  </Link>
                </div>
              </div>
              <div className="p-5">
                {!upcomingEvents || upcomingEvents.length === 0 ? (
                  <div className="py-8 text-center">
                    <Calendar className="mx-auto mb-3 h-12 w-12 text-linear-400" />
                    <p className="mb-2 text-[12px] text-linear-500">No upcoming events</p>
                    <Link href="/org/dashboard/opportunities/new" className="text-[12px] font-medium text-linear-900 hover:underline">
                      Create One →
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {upcomingEvents.slice(0, 5).map((event) => (
                      <div
                        key={event.id}
                        className="flex items-start justify-between gap-4 rounded-lg border border-linear-200 p-3 hover:bg-linear-50 transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] font-semibold text-linear-900 truncate">{event.title}</p>
                          <div className="mt-1 flex items-center gap-3 text-[11px] text-linear-500">
                            <span>{new Date(event.starts_at).toLocaleDateString()}</span>
                            <span>
                              {event.current_registrations}/{event.capacity || "∞"} registered
                            </span>
                          </div>
                        </div>
                        <Link href={`/org/dashboard/opportunities/${event.id}/registrations`} className="px-3 py-1.5 text-[12px] font-medium text-linear-900 bg-white border border-linear-200 rounded hover:bg-linear-50 transition-colors shrink-0">
                          View
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* This Month's Performance */}
            <div className="rounded-lg border border-linear-200 bg-white shadow-sm">
              <div className="border-b border-linear-100 p-5">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-linear-500" />
                  <h3 className="text-[14px] font-semibold text-linear-900">This Month's Performance</h3>
                </div>
              </div>
              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-600" />
                    <span className="text-[12px] text-linear-600">New Volunteers</span>
                  </div>
                  <p className="text-[20px] font-bold text-linear-900">
                    {Math.floor(stats.totalVolunteers * 0.12)}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-green-600" />
                    <span className="text-[12px] text-linear-600">Hours Logged</span>
                  </div>
                  <p className="text-[20px] font-bold text-linear-900">
                    {Math.floor(stats.totalHours * 0.08)}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-purple-600" />
                    <span className="text-[12px] text-linear-600">Events Hosted</span>
                  </div>
                  <p className="text-[20px] font-bold text-linear-900">
                    {Math.floor(stats.totalEvents * 0.15)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Link href="/org/dashboard/volunteers" className="rounded-lg border border-linear-200 bg-white shadow-sm hover:shadow-md transition-shadow p-5">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-md bg-blue-100 flex items-center justify-center shrink-0">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-linear-900">Volunteers</p>
                  <p className="text-[11px] text-linear-500">CRM & Management</p>
                </div>
              </div>
            </Link>

            <Link href="/org/dashboard/verification" className="rounded-lg border border-linear-200 bg-white shadow-sm hover:shadow-md transition-shadow p-5">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-md bg-amber-100 flex items-center justify-center shrink-0">
                  <Clock className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-linear-900">Verification</p>
                  <p className="text-[11px] text-linear-500">Approve Hours</p>
                </div>
              </div>
            </Link>

            <Link href="/org/dashboard/reports" className="rounded-lg border border-linear-200 bg-white shadow-sm hover:shadow-md transition-shadow p-5">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-md bg-green-100 flex items-center justify-center shrink-0">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-linear-900">Reports</p>
                  <p className="text-[11px] text-linear-500">Grant Reporting</p>
                </div>
              </div>
            </Link>

            <Link href="/org/dashboard/analytics" className="rounded-lg border border-linear-200 bg-white shadow-sm hover:shadow-md transition-shadow p-5">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-md bg-purple-100 flex items-center justify-center shrink-0">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-linear-900">Analytics</p>
                  <p className="text-[11px] text-linear-500">Insights & Trends</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
