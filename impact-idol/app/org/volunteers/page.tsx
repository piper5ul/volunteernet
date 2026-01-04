"use client";

import { useState } from "react";
import { useAuth } from "@/lib/stores/auth-store";
import { trpc } from "@/lib/utils/trpc";
import { OrgNavigation } from "@/components/org/org-navigation";
import { Users, Check, X, Mail, Search, Filter, Clock, Star, Award } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

interface Application {
  id: string;
  volunteer: {
    id: string;
    name: string;
    email: string;
    avatar_url?: string;
    skills: string[];
    total_hours: number;
    rating: number;
  };
  opportunity: {
    id: string;
    title: string;
    date: string;
  };
  status: "pending" | "approved" | "rejected";
  applied_at: string;
  message?: string;
}

// Mock data
const mockApplications: Application[] = [
  {
    id: "1",
    volunteer: {
      id: "v1",
      name: "Alex Thompson",
      email: "alex@example.com",
      skills: ["Event Planning", "Community Outreach"],
      total_hours: 45,
      rating: 4.8,
    },
    opportunity: {
      id: "opp1",
      title: "Community Garden Clean-Up",
      date: "2024-04-15T09:00:00Z",
    },
    status: "pending",
    applied_at: "2024-03-12T10:30:00Z",
    message: "I'm passionate about urban gardening and have experience with similar projects.",
  },
  {
    id: "2",
    volunteer: {
      id: "v2",
      name: "Jamie Chen",
      email: "jamie@example.com",
      skills: ["Environmental Science", "Photography"],
      total_hours: 120,
      rating: 5.0,
    },
    opportunity: {
      id: "opp2",
      title: "Beach Cleanup Event",
      date: "2024-04-20T08:00:00Z",
    },
    status: "pending",
    applied_at: "2024-03-11T14:20:00Z",
    message: "I've participated in 10+ beach cleanups and would love to help document this event.",
  },
  {
    id: "3",
    volunteer: {
      id: "v3",
      name: "Morgan Davis",
      email: "morgan@example.com",
      skills: ["Teaching", "Youth Mentoring"],
      total_hours: 30,
      rating: 4.5,
    },
    opportunity: {
      id: "opp3",
      title: "Tree Planting in Golden Gate Park",
      date: "2024-05-01T10:00:00Z",
    },
    status: "approved",
    applied_at: "2024-03-10T09:15:00Z",
  },
];

export default function OrgVolunteersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "approved" | "rejected">("pending");
  const [selectedTab, setSelectedTab] = useState<"applications" | "database">("applications");

  const filteredApplications = mockApplications.filter((app) => {
    const matchesSearch =
      app.volunteer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.opportunity.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleApprove = (appId: string) => {
    toast.success("Application approved");
  };

  const handleReject = (appId: string) => {
    toast.success("Application rejected");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-yellow-100 text-yellow-700">
            Pending
          </span>
        );
      case "approved":
        return (
          <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-green-100 text-green-700">
            Approved
          </span>
        );
      case "rejected":
        return (
          <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-red-100 text-red-700">
            Rejected
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#fbfbfc]">
      {/* Navigation */}
      <OrgNavigation />

      {/* Page Header */}
      <div className="border-b border-linear-200 bg-white px-6 py-4">
        <div className="mx-auto max-w-6xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-linear-600" />
            <h1 className="text-[16px] font-semibold text-linear-900">Volunteers</h1>
            <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-[11px] font-medium text-yellow-700">
              {mockApplications.filter((a) => a.status === "pending").length} pending
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-6xl px-6 py-8">
          {/* Tabs */}
          <div className="mb-6 border-b border-linear-200">
            <div className="flex gap-6">
              <button
                onClick={() => setSelectedTab("applications")}
                className={`py-3 text-[13px] font-medium border-b-2 transition-colors ${
                  selectedTab === "applications"
                    ? "border-linear-900 text-linear-900"
                    : "border-transparent text-linear-500 hover:text-linear-900"
                }`}
              >
                Applications
                <span className="ml-2 px-1.5 py-0.5 rounded-full bg-yellow-100 text-[10px] font-medium text-yellow-700">
                  {mockApplications.filter((a) => a.status === "pending").length}
                </span>
              </button>
              <button
                onClick={() => setSelectedTab("database")}
                className={`py-3 text-[13px] font-medium border-b-2 transition-colors ${
                  selectedTab === "database"
                    ? "border-linear-900 text-linear-900"
                    : "border-transparent text-linear-500 hover:text-linear-900"
                }`}
              >
                Volunteer Database
              </button>
            </div>
          </div>

          {selectedTab === "applications" && (
            <>
              {/* Filters & Search */}
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-linear-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search applications..."
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
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="mb-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg border border-linear-200 bg-white shadow-sm p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-medium text-linear-600">Pending Review</p>
                      <p className="mt-1 text-[24px] font-bold text-linear-900">
                        {mockApplications.filter((a) => a.status === "pending").length}
                      </p>
                    </div>
                    <Clock className="h-8 w-8 text-yellow-500" />
                  </div>
                </div>

                <div className="rounded-lg border border-linear-200 bg-white shadow-sm p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-medium text-linear-600">Approved</p>
                      <p className="mt-1 text-[24px] font-bold text-linear-900">
                        {mockApplications.filter((a) => a.status === "approved").length}
                      </p>
                    </div>
                    <Check className="h-8 w-8 text-green-500" />
                  </div>
                </div>

                <div className="rounded-lg border border-linear-200 bg-white shadow-sm p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-medium text-linear-600">Total Applications</p>
                      <p className="mt-1 text-[24px] font-bold text-linear-900">{mockApplications.length}</p>
                    </div>
                    <Users className="h-8 w-8 text-linear-400" />
                  </div>
                </div>
              </div>

              {/* Applications List */}
              <div className="space-y-3">
                {filteredApplications.length === 0 ? (
                  <div className="rounded-lg border border-linear-200 bg-white shadow-sm p-12 text-center">
                    <Users className="mx-auto mb-4 h-12 w-12 text-linear-400" />
                    <h3 className="mb-2 text-[14px] font-semibold text-linear-900">No applications found</h3>
                    <p className="text-[12px] text-linear-600">
                      {searchQuery || statusFilter !== "pending"
                        ? "Try adjusting your search or filters"
                        : "Applications will appear here as volunteers sign up"}
                    </p>
                  </div>
                ) : (
                  filteredApplications.map((app) => (
                    <div
                      key={app.id}
                      className="rounded-lg border border-linear-200 bg-white shadow-sm hover:shadow-md transition-shadow p-5"
                    >
                      <div className="flex items-start gap-4">
                        {/* Avatar */}
                        <div className="w-12 h-12 rounded-full bg-linear-100 flex items-center justify-center text-[16px] font-bold text-linear-700 overflow-hidden shrink-0">
                          {app.volunteer.avatar_url ? (
                            <img
                              src={app.volunteer.avatar_url}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            app.volunteer.name.substring(0, 2).toUpperCase()
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <Link
                                  href={`/org/volunteers/${app.volunteer.id}`}
                                  className="text-[14px] font-semibold text-linear-900 hover:text-peer-green transition-colors"
                                >
                                  {app.volunteer.name}
                                </Link>
                                {getStatusBadge(app.status)}
                              </div>
                              <p className="text-[12px] text-linear-600 mb-1">{app.volunteer.email}</p>
                              <div className="flex items-center gap-3 text-[11px] text-linear-500">
                                <span className="flex items-center gap-1">
                                  <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                                  {app.volunteer.rating.toFixed(1)}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Award className="h-3.5 w-3.5" />
                                  {app.volunteer.total_hours} hours
                                </span>
                              </div>
                            </div>

                            {app.status === "pending" && (
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleApprove(app.id)}
                                  className="flex items-center gap-1.5 h-8 px-3 text-[12px] font-medium text-white bg-peer-green hover:bg-green-600 rounded transition-colors"
                                >
                                  <Check className="h-3.5 w-3.5" />
                                  Approve
                                </button>
                                <button
                                  onClick={() => handleReject(app.id)}
                                  className="flex items-center gap-1.5 h-8 px-3 text-[12px] font-medium text-linear-700 bg-white border border-linear-200 hover:bg-red-50 hover:border-red-200 hover:text-red-700 rounded transition-colors"
                                >
                                  <X className="h-3.5 w-3.5" />
                                  Reject
                                </button>
                              </div>
                            )}
                          </div>

                          {/* Applied for */}
                          <div className="mb-2 rounded-lg bg-linear-50 border border-linear-100 p-3">
                            <p className="text-[11px] font-medium text-linear-600 mb-0.5">Applied for</p>
                            <Link
                              href={`/org/opportunities/${app.opportunity.id}`}
                              className="text-[13px] font-semibold text-linear-900 hover:text-peer-green transition-colors"
                            >
                              {app.opportunity.title}
                            </Link>
                            <p className="text-[11px] text-linear-500 mt-0.5">
                              {new Date(app.opportunity.date).toLocaleDateString()} •{" "}
                              Applied {new Date(app.applied_at).toLocaleDateString()}
                            </p>
                          </div>

                          {/* Skills */}
                          {app.volunteer.skills.length > 0 && (
                            <div className="mb-2">
                              <div className="flex flex-wrap gap-1.5">
                                {app.volunteer.skills.map((skill) => (
                                  <span
                                    key={skill}
                                    className="px-2 py-0.5 rounded text-[10px] font-medium bg-blue-100 text-blue-700"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Message */}
                          {app.message && (
                            <div className="text-[12px] text-linear-600 italic">
                              "{app.message}"
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}

          {selectedTab === "database" && (
            <div className="rounded-lg border border-linear-200 bg-white shadow-sm p-12 text-center">
              <Users className="mx-auto mb-4 h-12 w-12 text-linear-400" />
              <h3 className="mb-2 text-[14px] font-semibold text-linear-900">Volunteer Database</h3>
              <p className="text-[12px] text-linear-600">
                View all volunteers who have participated in your opportunities
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
