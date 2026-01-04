"use client";

import { useState } from "react";
import { trpc } from "@/lib/utils/trpc";
import { useAuth } from "@/lib/stores/auth-store";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowLeft,
  Plus,
  Calendar,
  MapPin,
  Users,
  Clock,
  Search,
  Edit,
  Trash2,
  Grid3x3,
  List,
  TrendingUp,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils/date-utils";
import { toast } from "sonner";

type ViewMode = "grid" | "list";
type StatusFilter = "all" | "OPEN" | "FULL" | "COMPLETED" | "CANCELLED";

export default function ManageOpportunitiesPage() {
  const { currentPersona } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const orgId = currentPersona.type === "org-admin" ? currentPersona.orgId : null;

  const { data: opportunities, isLoading } = trpc.organizations.getOpportunities.useQuery(
    { orgId: orgId! },
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
        <div className="h-14 border-b border-linear-100 flex items-center px-6">
          <Skeleton className="h-5 w-48" />
        </div>
        <div className="flex-1 overflow-y-auto bg-[#fbfbfc] p-8">
          <div className="max-w-7xl mx-auto">
            <Skeleton className="h-96" />
          </div>
        </div>
      </div>
    );
  }

  // Filter opportunities
  const filteredOpportunities = (opportunities || []).filter((opp) => {
    const matchesSearch = opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || opp.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate stats
  const stats = {
    total: opportunities?.length || 0,
    open: opportunities?.filter((o) => o.status === "OPEN").length || 0,
    upcoming: opportunities?.filter((o) => {
      const isUpcoming = new Date(o.starts_at) > new Date();
      return isUpcoming && o.status !== "CANCELLED";
    }).length || 0,
    completed: opportunities?.filter((o) => o.status === "COMPLETED").length || 0,
    totalRegistrations: opportunities?.reduce((sum, o) => sum + o.current_registrations, 0) || 0,
  };

  const handleDelete = (id: string) => {
    toast.success("Opportunity deleted");
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <header className="h-14 border-b border-linear-100 flex items-center px-6 gap-4 shrink-0">
        <Link href="/org/dashboard" className="text-linear-500 hover:text-linear-900 transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div className="h-4 w-px bg-linear-200"></div>
        <h1 className="font-medium text-[14px] text-linear-900">Manage Opportunities</h1>
        <div className="h-4 w-px bg-linear-200"></div>
        <span className="text-[13px] text-linear-500">{stats.total} total</span>

        <div className="ml-auto flex items-center gap-2">
          <Link href="/org/dashboard/opportunities/new" className="bg-linear-900 text-white text-[12px] font-medium px-3 py-1.5 rounded hover:bg-black transition-colors shadow-subtle flex items-center gap-1.5">
            <Plus className="w-3.5 h-3.5" />
            Create Opportunity
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-[#fbfbfc]">
        <div className="max-w-7xl mx-auto p-8">
          {/* Stats Cards */}
          <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border border-linear-200 bg-white shadow-sm p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] text-linear-500 uppercase tracking-wider">Open</p>
                  <p className="text-[24px] font-bold text-linear-900">{stats.open}</p>
                </div>
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
            </div>

            <div className="rounded-lg border border-linear-200 bg-white shadow-sm p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] text-linear-500 uppercase tracking-wider">Upcoming</p>
                  <p className="text-[24px] font-bold text-linear-900">{stats.upcoming}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
            </div>

            <div className="rounded-lg border border-linear-200 bg-white shadow-sm p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] text-linear-500 uppercase tracking-wider">Completed</p>
                  <p className="text-[24px] font-bold text-linear-900">{stats.completed}</p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-purple-600" />
              </div>
            </div>

            <div className="rounded-lg border border-linear-200 bg-white shadow-sm p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] text-linear-500 uppercase tracking-wider">Total Registrations</p>
                  <p className="text-[24px] font-bold text-linear-900">{stats.totalRegistrations}</p>
                </div>
                <Users className="h-8 w-8 text-amber-600" />
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="mb-4 rounded-lg border border-linear-200 bg-white shadow-sm p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-linear-400" />
                <input
                  placeholder="Search opportunities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 text-[13px] border border-linear-200 rounded-md focus:outline-none focus:ring-2 focus:ring-linear-900 focus:border-transparent"
                />
              </div>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
                className="px-3 py-2 text-[13px] border border-linear-200 rounded-md focus:outline-none focus:ring-2 focus:ring-linear-900 focus:border-transparent bg-white"
              >
                <option value="all">All Status</option>
                <option value="OPEN">Open</option>
                <option value="FULL">Full</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
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

          {/* Opportunities */}
          {filteredOpportunities.length === 0 ? (
            <div className="rounded-lg border border-linear-200 bg-white shadow-sm p-12 text-center">
              <Calendar className="mx-auto mb-4 h-12 w-12 text-linear-400" />
              <h3 className="mb-2 text-[14px] font-semibold text-linear-900">
                {searchQuery || statusFilter !== "all" ? "No opportunities found" : "No Opportunities Yet"}
              </h3>
              <p className="mb-4 text-[12px] text-linear-500">
                {searchQuery || statusFilter !== "all"
                  ? "Try adjusting your filters"
                  : "Create your first volunteer opportunity to get started"}
              </p>
              {!searchQuery && statusFilter === "all" && (
                <Link href="/org/dashboard/opportunities/new" className="inline-flex items-center gap-1.5 bg-linear-900 hover:bg-black text-white text-[12px] font-medium px-3 py-1.5 rounded shadow-subtle transition-colors">
                  <Plus className="w-3.5 h-3.5" />
                  Create Opportunity
                </Link>
              )}
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredOpportunities.map((opportunity) => {
                const statusConfig = {
                  OPEN: { bg: "bg-green-100", text: "text-green-700", border: "border-green-200", label: "Open" },
                  FULL: { bg: "bg-yellow-100", text: "text-yellow-700", border: "border-yellow-200", label: "Full" },
                  COMPLETED: { bg: "bg-linear-100", text: "text-linear-700", border: "border-linear-200", label: "Completed" },
                  CANCELLED: { bg: "bg-red-100", text: "text-red-700", border: "border-red-200", label: "Cancelled" },
                };

                const status = statusConfig[opportunity.status] || statusConfig.OPEN;
                const spotsLeft = opportunity.capacity ? opportunity.capacity - opportunity.current_registrations : null;

                return (
                  <div key={opportunity.id} className="rounded-lg border border-linear-200 bg-white shadow-sm overflow-hidden flex flex-col">
                    {opportunity.image_url && (
                      <div className="h-40 w-full overflow-hidden">
                        <img
                          src={opportunity.image_url}
                          alt={opportunity.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="mb-3 flex items-start justify-between gap-2">
                        <h3 className="text-[14px] font-semibold text-linear-900 line-clamp-2">{opportunity.title}</h3>
                        <span className={`px-2 py-1 rounded-md text-[10px] font-medium ${status.bg} ${status.text} border ${status.border} shrink-0`}>
                          {status.label}
                        </span>
                      </div>

                      <div className="mb-4 space-y-2 text-[12px] text-linear-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3.5 w-3.5 text-linear-500" />
                          <span>{formatDate(opportunity.starts_at, "MMM d, yyyy 'at' h:mm a")}</span>
                        </div>
                        {opportunity.location && (
                          <div className="flex items-center gap-2">
                            <MapPin className="h-3.5 w-3.5 text-linear-500" />
                            <span className="line-clamp-1">{opportunity.location.name}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <Users className="h-3.5 w-3.5 text-linear-500" />
                          <span>
                            {opportunity.current_registrations}
                            {opportunity.capacity ? `/${opportunity.capacity}` : ""} registered
                          </span>
                        </div>
                        {spotsLeft !== null && spotsLeft >= 0 && (
                          <div className="flex items-center gap-2">
                            <Clock className="h-3.5 w-3.5 text-linear-500" />
                            <span className={spotsLeft === 0 ? "text-red-600 font-medium" : ""}>
                              {spotsLeft} spot{spotsLeft !== 1 ? "s" : ""} left
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="mt-auto flex gap-2">
                        <Link href={`/org/dashboard/opportunities/${opportunity.id}/registrations`} className="flex-1 px-3 py-1.5 text-[12px] font-medium text-linear-900 bg-white border border-linear-200 rounded hover:bg-linear-50 transition-colors text-center">
                          View ({opportunity.current_registrations})
                        </Link>
                        <button className="p-1.5 hover:bg-linear-100 rounded text-linear-600 hover:text-linear-900 transition-colors">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleDelete(opportunity.id)} className="p-1.5 hover:bg-linear-100 rounded text-linear-600 hover:text-red-600 transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="rounded-lg border border-linear-200 bg-white shadow-sm overflow-hidden">
              <div className="divide-y divide-linear-100">
                {filteredOpportunities.map((opportunity) => {
                  const statusConfig = {
                    OPEN: { bg: "bg-green-100", text: "text-green-700", border: "border-green-200", label: "Open" },
                    FULL: { bg: "bg-yellow-100", text: "text-yellow-700", border: "border-yellow-200", label: "Full" },
                    COMPLETED: { bg: "bg-linear-100", text: "text-linear-700", border: "border-linear-200", label: "Completed" },
                    CANCELLED: { bg: "bg-red-100", text: "text-red-700", border: "border-red-200", label: "Cancelled" },
                  };

                  const status = statusConfig[opportunity.status] || statusConfig.OPEN;
                  const spotsLeft = opportunity.capacity ? opportunity.capacity - opportunity.current_registrations : null;

                  return (
                    <div key={opportunity.id} className="p-5 hover:bg-linear-50 transition-colors">
                      <div className="flex items-start gap-4">
                        {opportunity.image_url && (
                          <div className="h-20 w-20 rounded-md overflow-hidden shrink-0">
                            <img
                              src={opportunity.image_url}
                              alt={opportunity.title}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        )}

                        <div className="flex-1 min-w-0">
                          <div className="mb-2 flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <h3 className="text-[14px] font-semibold text-linear-900 mb-1">{opportunity.title}</h3>
                              <div className="flex items-center gap-3 text-[12px] text-linear-600 flex-wrap">
                                <div className="flex items-center gap-1.5">
                                  <Calendar className="h-3.5 w-3.5 text-linear-500" />
                                  <span>{formatDate(opportunity.starts_at, "MMM d, yyyy")}</span>
                                </div>
                                {opportunity.location && (
                                  <div className="flex items-center gap-1.5">
                                    <MapPin className="h-3.5 w-3.5 text-linear-500" />
                                    <span>{opportunity.location.name}</span>
                                  </div>
                                )}
                                <div className="flex items-center gap-1.5">
                                  <Users className="h-3.5 w-3.5 text-linear-500" />
                                  <span>
                                    {opportunity.current_registrations}
                                    {opportunity.capacity ? `/${opportunity.capacity}` : ""} registered
                                  </span>
                                </div>
                                {spotsLeft !== null && spotsLeft >= 0 && (
                                  <div className="flex items-center gap-1.5">
                                    <Clock className="h-3.5 w-3.5 text-linear-500" />
                                    <span className={spotsLeft === 0 ? "text-red-600 font-medium" : ""}>
                                      {spotsLeft} spot{spotsLeft !== 1 ? "s" : ""} left
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>

                            <span className={`px-2 py-1 rounded-md text-[10px] font-medium ${status.bg} ${status.text} border ${status.border} shrink-0`}>
                              {status.label}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <Link href={`/org/dashboard/opportunities/${opportunity.id}/registrations`} className="px-3 py-1.5 text-[12px] font-medium text-linear-900 bg-white border border-linear-200 rounded hover:bg-linear-50 transition-colors">
                              View Registrations ({opportunity.current_registrations})
                            </Link>
                            <button className="p-1.5 hover:bg-linear-100 rounded text-linear-600 hover:text-linear-900 transition-colors">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button onClick={() => handleDelete(opportunity.id)} className="p-1.5 hover:bg-linear-100 rounded text-linear-600 hover:text-red-600 transition-colors">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
