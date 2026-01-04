"use client";

import { useState } from "react";
import { useAuth } from "@/lib/stores/auth-store";
import { trpc } from "@/lib/utils/trpc";
import { OrgNavigation } from "@/components/org/org-navigation";
import { Calendar, MapPin, Users, Plus, MoreVertical, Edit, Copy, Trash2, Eye, Clock, Filter, Search } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

interface Opportunity {
  id: string;
  title: string;
  description: string;
  location: string;
  starts_at: string;
  ends_at: string;
  spots_total: number;
  spots_filled: number;
  applicants: number;
  status: "draft" | "published" | "closed";
  created_at: string;
}

// Mock data
const mockOpportunities: Opportunity[] = [
  {
    id: "1",
    title: "Community Garden Clean-Up",
    description: "Help us maintain our community garden and prepare it for spring planting",
    location: "Mission District, SF",
    starts_at: "2024-04-15T09:00:00Z",
    ends_at: "2024-04-15T13:00:00Z",
    spots_total: 20,
    spots_filled: 15,
    applicants: 3,
    status: "published",
    created_at: "2024-03-01T10:00:00Z",
  },
  {
    id: "2",
    title: "Beach Cleanup Event",
    description: "Join us for a morning of cleaning Ocean Beach and protecting marine life",
    location: "Ocean Beach, SF",
    starts_at: "2024-04-20T08:00:00Z",
    ends_at: "2024-04-20T12:00:00Z",
    spots_total: 30,
    spots_filled: 28,
    applicants: 5,
    status: "published",
    created_at: "2024-03-05T10:00:00Z",
  },
  {
    id: "3",
    title: "Tree Planting in Golden Gate Park",
    description: "Help us plant native trees to restore the urban forest ecosystem",
    location: "Golden Gate Park, SF",
    starts_at: "2024-05-01T10:00:00Z",
    ends_at: "2024-05-01T15:00:00Z",
    spots_total: 25,
    spots_filled: 0,
    applicants: 8,
    status: "draft",
    created_at: "2024-03-10T10:00:00Z",
  },
];

export default function OrgOpportunitiesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft" | "closed">("all");
  const [selectedOpp, setSelectedOpp] = useState<string | null>(null);

  const filteredOpportunities = mockOpportunities.filter((opp) => {
    const matchesSearch = opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || opp.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return (
          <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-green-100 text-green-700">
            Published
          </span>
        );
      case "draft":
        return (
          <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-yellow-100 text-yellow-700">
            Draft
          </span>
        );
      case "closed":
        return (
          <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-linear-100 text-linear-600">
            Closed
          </span>
        );
      default:
        return null;
    }
  };

  const handleDuplicate = (oppId: string) => {
    toast.success("Opportunity duplicated");
  };

  const handleDelete = (oppId: string) => {
    toast.success("Opportunity deleted");
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#fbfbfc]">
      {/* Navigation */}
      <OrgNavigation />

      {/* Page Header */}
      <div className="border-b border-linear-200 bg-white px-6 py-4">
        <div className="mx-auto max-w-6xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-linear-600" />
            <h1 className="text-[16px] font-semibold text-linear-900">Opportunities</h1>
            <span className="rounded-full bg-linear-100 px-2 py-0.5 text-[11px] font-medium text-linear-700">
              {mockOpportunities.length}
            </span>
          </div>
          <Link
            href="/org/opportunities/new"
            className="flex items-center gap-2 h-9 px-4 text-[13px] font-medium text-white bg-linear-900 hover:bg-black rounded-md transition-colors"
          >
            <Plus className="h-4 w-4" />
            Create Opportunity
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-6xl px-6 py-8">
          {/* Filters & Search */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-linear-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search opportunities..."
                className="w-full h-9 pl-9 pr-3 text-[13px] border border-linear-200 rounded-md focus:outline-none focus:ring-2 focus:ring-linear-900 focus:border-transparent"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-linear-500" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
                className="h-9 px-3 text-[13px] border border-linear-200 rounded-md focus:outline-none focus:ring-2 focus:ring-linear-900 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="mb-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-linear-200 bg-white shadow-sm p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-medium text-linear-600">Total Opportunities</p>
                  <p className="mt-1 text-[24px] font-bold text-linear-900">{mockOpportunities.length}</p>
                </div>
                <Calendar className="h-8 w-8 text-linear-400" />
              </div>
            </div>

            <div className="rounded-lg border border-linear-200 bg-white shadow-sm p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-medium text-linear-600">Active Applications</p>
                  <p className="mt-1 text-[24px] font-bold text-linear-900">
                    {mockOpportunities.reduce((sum, opp) => sum + opp.applicants, 0)}
                  </p>
                </div>
                <Users className="h-8 w-8 text-linear-400" />
              </div>
            </div>

            <div className="rounded-lg border border-linear-200 bg-white shadow-sm p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-medium text-linear-600">Spots Filled</p>
                  <p className="mt-1 text-[24px] font-bold text-linear-900">
                    {mockOpportunities.reduce((sum, opp) => sum + opp.spots_filled, 0)}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-linear-400" />
              </div>
            </div>
          </div>

          {/* Opportunities List */}
          <div className="space-y-3">
            {filteredOpportunities.length === 0 ? (
              <div className="rounded-lg border border-linear-200 bg-white shadow-sm p-12 text-center">
                <Calendar className="mx-auto mb-4 h-12 w-12 text-linear-400" />
                <h3 className="mb-2 text-[14px] font-semibold text-linear-900">No opportunities found</h3>
                <p className="mb-4 text-[12px] text-linear-600">
                  {searchQuery || statusFilter !== "all"
                    ? "Try adjusting your search or filters"
                    : "Create your first opportunity to start attracting volunteers"}
                </p>
                {!searchQuery && statusFilter === "all" && (
                  <Link
                    href="/org/opportunities/new"
                    className="inline-flex items-center gap-2 h-9 px-4 text-[13px] font-medium text-white bg-linear-900 hover:bg-black rounded-md transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    Create Opportunity
                  </Link>
                )}
              </div>
            ) : (
              filteredOpportunities.map((opp) => (
                <div
                  key={opp.id}
                  className="rounded-lg border border-linear-200 bg-white shadow-sm hover:shadow-md transition-shadow p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-3 mb-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-[14px] font-semibold text-linear-900">{opp.title}</h3>
                            {getStatusBadge(opp.status)}
                          </div>
                          <p className="text-[12px] text-linear-600 line-clamp-2">{opp.description}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 text-[11px] text-linear-500 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {new Date(opp.starts_at).toLocaleDateString()} at{" "}
                          {new Date(opp.starts_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          {opp.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {Math.round((new Date(opp.ends_at).getTime() - new Date(opp.starts_at).getTime()) / (1000 * 60 * 60))}h
                        </span>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-24 bg-linear-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-peer-green transition-all"
                              style={{ width: `${(opp.spots_filled / opp.spots_total) * 100}%` }}
                            />
                          </div>
                          <span className="text-[11px] font-medium text-linear-600">
                            {opp.spots_filled}/{opp.spots_total} spots
                          </span>
                        </div>

                        {opp.applicants > 0 && (
                          <span className="flex items-center gap-1 text-[11px] font-medium text-blue-600">
                            <Users className="h-3.5 w-3.5" />
                            {opp.applicants} pending
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/org/opportunities/${opp.id}`}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-linear-900 bg-white border border-linear-200 rounded hover:bg-linear-50 transition-colors"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        View
                      </Link>

                      <div className="relative">
                        <button
                          onClick={() => setSelectedOpp(selectedOpp === opp.id ? null : opp.id)}
                          className="p-2 text-linear-500 hover:text-linear-900 hover:bg-linear-100 rounded transition-colors"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </button>

                        {/* Dropdown Menu */}
                        {selectedOpp === opp.id && (
                          <div className="absolute right-0 top-10 w-40 rounded-md border border-linear-200 bg-white shadow-lg z-10">
                            <div className="p-1">
                              <Link
                                href={`/org/opportunities/${opp.id}/edit`}
                                className="w-full flex items-center gap-2 px-3 py-2 text-[12px] text-linear-900 hover:bg-linear-50 rounded transition-colors"
                              >
                                <Edit className="h-3.5 w-3.5" />
                                Edit
                              </Link>
                              <button
                                onClick={() => handleDuplicate(opp.id)}
                                className="w-full flex items-center gap-2 px-3 py-2 text-[12px] text-linear-900 hover:bg-linear-50 rounded transition-colors"
                              >
                                <Copy className="h-3.5 w-3.5" />
                                Duplicate
                              </button>
                              <div className="border-t border-linear-100 my-1"></div>
                              <button
                                onClick={() => handleDelete(opp.id)}
                                className="w-full flex items-center gap-2 px-3 py-2 text-[12px] text-red-600 hover:bg-red-50 rounded transition-colors"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
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
