"use client";

import { useState } from "react";
import { trpc } from "@/lib/utils/trpc";
import { useAuth } from "@/lib/stores/auth-store";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Download, Mail, Users, TrendingUp, Clock, Star, ArrowLeft, ChevronDown } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils/date-utils";
import { toast } from "sonner";

export default function VolunteerCRMPage() {
  const { currentPersona } = useAuth();
  const orgId = currentPersona.type === "org-admin" ? currentPersona.orgId : null;

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "hours" | "lastActive">("hours");
  const [filterSegment, setFilterSegment] = useState<"all" | "active" | "inactive" | "top">("all");
  const [selectedVolunteers, setSelectedVolunteers] = useState<Set<string>>(new Set());

  const { data: volunteers, isLoading } = trpc.organizations.getVolunteers.useQuery(
    { orgId: orgId || "", sortBy },
    { enabled: !!orgId }
  );

  const handleSelectVolunteer = (volunteerId: string) => {
    setSelectedVolunteers((prev) => {
      const next = new Set(prev);
      if (next.has(volunteerId)) {
        next.delete(volunteerId);
      } else {
        next.add(volunteerId);
      }
      return next;
    });
  };

  const handleSelectAll = () => {
    if (selectedVolunteers.size === filteredVolunteers.length) {
      setSelectedVolunteers(new Set());
    } else {
      setSelectedVolunteers(new Set(filteredVolunteers.map((v) => v.user.id)));
    }
  };

  const handleEmailSelected = () => {
    toast.success(`Email campaign created for ${selectedVolunteers.size} volunteers`);
  };

  const handleExportData = () => {
    toast.success("Downloading volunteer data...");
  };

  // Filter volunteers
  const filteredVolunteers = (volunteers || [])
    .filter((v) => {
      const matchesSearch =
        v.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.user.email?.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (filterSegment === "active") {
        const daysSinceActive = Math.floor(
          (Date.now() - new Date(v.lastActive).getTime()) / (1000 * 60 * 60 * 24)
        );
        return daysSinceActive <= 30;
      } else if (filterSegment === "inactive") {
        const daysSinceActive = Math.floor(
          (Date.now() - new Date(v.lastActive).getTime()) / (1000 * 60 * 60 * 24)
        );
        return daysSinceActive > 90;
      } else if (filterSegment === "top") {
        return v.totalHours >= 20;
      }

      return true;
    });

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

  const stats = {
    total: volunteers?.length || 0,
    active: volunteers?.filter((v) => {
      const days = Math.floor((Date.now() - new Date(v.lastActive).getTime()) / (1000 * 60 * 60 * 24));
      return days <= 30;
    }).length || 0,
    top: volunteers?.filter((v) => v.totalHours >= 20).length || 0,
    totalHours: volunteers?.reduce((sum, v) => sum + v.totalHours, 0) || 0,
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <header className="h-14 border-b border-linear-100 flex items-center px-6 gap-4 shrink-0">
        <Link href="/org/dashboard" className="text-linear-500 hover:text-linear-900 transition-colors">
          <ArrowLeft className="w-4 w-4" />
        </Link>
        <div className="h-4 w-px bg-linear-200"></div>
        <h1 className="font-medium text-[14px] text-linear-900">Volunteer CRM</h1>
        <div className="h-4 w-px bg-linear-200"></div>
        <span className="text-[13px] text-linear-500">{stats.total} volunteers</span>

        <div className="ml-auto flex items-center gap-2">
          <button onClick={handleExportData} className="px-3 py-1.5 text-[12px] font-medium text-linear-900 bg-white border border-linear-200 rounded hover:bg-linear-50 transition-colors flex items-center gap-1.5">
            <Download className="w-3.5 h-3.5" />
            Export
          </button>
          <button onClick={handleEmailSelected} disabled={selectedVolunteers.size === 0} className="px-3 py-1.5 text-[12px] font-medium text-white bg-peer-green hover:bg-green-600 rounded shadow-subtle transition-colors disabled:opacity-50 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5" />
            Email ({selectedVolunteers.size})
          </button>
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
                  <p className="text-[11px] text-linear-500 uppercase tracking-wider">Total Volunteers</p>
                  <p className="text-[24px] font-bold text-linear-900">{stats.total}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </div>

            <div className="rounded-lg border border-linear-200 bg-white shadow-sm p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] text-linear-500 uppercase tracking-wider">Active (30 days)</p>
                  <p className="text-[24px] font-bold text-linear-900">{stats.active}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </div>

            <div className="rounded-lg border border-linear-200 bg-white shadow-sm p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] text-linear-500 uppercase tracking-wider">Top Volunteers</p>
                  <p className="text-[24px] font-bold text-linear-900">{stats.top}</p>
                </div>
                <Star className="h-8 w-8 text-amber-600" />
              </div>
            </div>

            <div className="rounded-lg border border-linear-200 bg-white shadow-sm p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] text-linear-500 uppercase tracking-wider">Total Hours</p>
                  <p className="text-[24px] font-bold text-linear-900">{stats.totalHours}</p>
                </div>
                <Clock className="h-8 w-8 text-purple-600" />
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
                  placeholder="Search volunteers by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 text-[13px] border border-linear-200 rounded-md focus:outline-none focus:ring-2 focus:ring-linear-900 focus:border-transparent"
                />
              </div>

              {/* Segment Filter */}
              <select
                value={filterSegment}
                onChange={(e) => setFilterSegment(e.target.value as any)}
                className="px-3 py-2 text-[13px] border border-linear-200 rounded-md focus:outline-none focus:ring-2 focus:ring-linear-900 focus:border-transparent bg-white"
              >
                <option value="all">All Volunteers</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="top">Top Volunteers</option>
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 text-[13px] border border-linear-200 rounded-md focus:outline-none focus:ring-2 focus:ring-linear-900 focus:border-transparent bg-white"
              >
                <option value="hours">Most Hours</option>
                <option value="lastActive">Recent Activity</option>
                <option value="name">Name (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Volunteers Table */}
          <div className="rounded-lg border border-linear-200 bg-white shadow-sm overflow-hidden">
            {/* Table Header */}
            <div className="border-b border-linear-100 bg-linear-50 p-4">
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  checked={selectedVolunteers.size === filteredVolunteers.length && filteredVolunteers.length > 0}
                  onChange={handleSelectAll}
                  className="h-4 w-4 rounded border-linear-300"
                />
                <div className="flex-1 text-[12px] font-medium text-linear-600">
                  {filteredVolunteers.length} volunteers
                </div>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-linear-100">
              {filteredVolunteers.length === 0 ? (
                <div className="py-12 text-center">
                  <Users className="mx-auto mb-4 h-12 w-12 text-linear-400" />
                  <p className="text-[12px] text-linear-500">
                    {searchQuery ? "No volunteers found matching your search" : "No volunteers yet"}
                  </p>
                </div>
              ) : (
                filteredVolunteers.map((volunteer) => (
                  <div key={volunteer.user.id} className="p-4 hover:bg-linear-50 transition-colors">
                    <div className="flex items-center gap-4">
                      {/* Checkbox */}
                      <input
                        type="checkbox"
                        checked={selectedVolunteers.has(volunteer.user.id)}
                        onChange={() => handleSelectVolunteer(volunteer.user.id)}
                        className="h-4 w-4 rounded border-linear-300"
                      />

                      {/* Avatar & Info */}
                      <div className="flex flex-1 items-center gap-3 min-w-0">
                        <Link href={`/profile/${volunteer.user.username}`}>
                          <div className="h-10 w-10 rounded-full bg-linear-100 flex items-center justify-center text-[14px] font-bold text-linear-700 overflow-hidden cursor-pointer shrink-0">
                            {volunteer.user.avatar_url ? (
                              <img src={volunteer.user.avatar_url} alt={volunteer.user.name} className="w-full h-full object-cover" />
                            ) : (
                              volunteer.user.name[0].toUpperCase()
                            )}
                          </div>
                        </Link>

                        <div className="flex-1 min-w-0">
                          <Link href={`/profile/${volunteer.user.username}`}>
                            <p className="text-[13px] font-semibold text-linear-900 hover:text-peer-green transition-colors truncate">{volunteer.user.name}</p>
                          </Link>
                          <p className="text-[11px] text-linear-500 truncate">{volunteer.user.email}</p>
                        </div>

                        {/* Stats */}
                        <div className="hidden items-center gap-6 sm:flex">
                          <div className="text-right">
                            <p className="text-[13px] font-semibold text-linear-900">{volunteer.totalHours}h</p>
                            <p className="text-[10px] text-linear-500 uppercase tracking-wider">Hours</p>
                          </div>

                          <div className="text-right">
                            <p className="text-[13px] font-semibold text-linear-900">{volunteer.eventCount}</p>
                            <p className="text-[10px] text-linear-500 uppercase tracking-wider">Events</p>
                          </div>

                          <div className="text-right">
                            <p className="text-[13px] font-semibold text-linear-900">
                              {formatDate(volunteer.lastActive, "MMM d")}
                            </p>
                            <p className="text-[10px] text-linear-500 uppercase tracking-wider">Last Active</p>
                          </div>
                        </div>

                        {/* Actions */}
                        <Link href={`/org/dashboard/volunteers/${volunteer.user.id}`} className="px-3 py-1.5 text-[12px] font-medium text-linear-900 bg-white border border-linear-200 rounded hover:bg-linear-50 transition-colors shrink-0">
                          View
                        </Link>
                      </div>
                    </div>

                    {/* Mobile Stats */}
                    <div className="mt-3 flex gap-4 sm:hidden ml-12">
                      <div>
                        <p className="text-[10px] text-linear-500 uppercase tracking-wider">Hours</p>
                        <p className="text-[12px] font-semibold text-linear-900">{volunteer.totalHours}h</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-linear-500 uppercase tracking-wider">Events</p>
                        <p className="text-[12px] font-semibold text-linear-900">{volunteer.eventCount}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-linear-500 uppercase tracking-wider">Last Active</p>
                        <p className="text-[12px] font-semibold text-linear-900">
                          {formatDate(volunteer.lastActive, "MMM d")}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
