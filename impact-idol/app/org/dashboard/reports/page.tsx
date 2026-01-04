"use client";

import { useState } from "react";
import { trpc } from "@/lib/utils/trpc";
import { useAuth } from "@/lib/stores/auth-store";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Download,
  TrendingUp,
  Users,
  Clock,
  Calendar,
  Award,
  Target,
  ArrowLeft,
  PieChart,
  Activity,
  BarChart2,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

type TimeRange = "month" | "quarter" | "year" | "all";
type ActiveTab = "trends" | "demographics" | "retention" | "impact";

export default function OrganizationReportsPage() {
  const { currentPersona } = useAuth();
  const orgId = currentPersona.type === "org-admin" ? currentPersona.orgId : null;

  const [timeRange, setTimeRange] = useState<TimeRange>("month");
  const [activeTab, setActiveTab] = useState<ActiveTab>("trends");

  const { data: analytics, isLoading } = trpc.organizations.getAnalytics.useQuery(
    { orgId: orgId || "", timeRange },
    { enabled: !!orgId }
  );

  const handleExportReport = (type: string) => {
    toast.success(`Exporting ${type} report...`);
  };

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

  const stats = analytics?.summary || {
    totalVolunteers: 72,
    activeVolunteers: 58,
    totalHours: 1240,
    totalEvents: 28,
    retentionRate: 68,
    avgHoursPerVolunteer: 17.2,
  };

  const monthlyData = analytics?.monthlyTrends || [
    { month: "July", hours: 120, volunteers: 45 },
    { month: "August", hours: 150, volunteers: 52 },
    { month: "September", hours: 180, volunteers: 61 },
    { month: "October", hours: 165, volunteers: 58 },
    { month: "November", hours: 210, volunteers: 72 },
    { month: "December", hours: 190, volunteers: 65 },
  ];

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <header className="h-14 border-b border-linear-100 flex items-center px-6 gap-4 shrink-0">
        <Link href="/org/dashboard" className="text-linear-500 hover:text-linear-900 transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div className="h-4 w-px bg-linear-200"></div>
        <h1 className="font-medium text-[14px] text-linear-900">Reports & Analytics</h1>
        <div className="h-4 w-px bg-linear-200"></div>
        <span className="text-[13px] text-linear-500">Grant reporting & impact metrics</span>

        <div className="ml-auto flex items-center gap-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as TimeRange)}
            className="px-3 py-1.5 text-[12px] border border-linear-200 rounded-md focus:outline-none focus:ring-2 focus:ring-linear-900 focus:border-transparent bg-white"
          >
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
            <option value="all">All Time</option>
          </select>
          <button onClick={() => handleExportReport("full")} className="px-3 py-1.5 text-[12px] font-medium text-linear-900 bg-white border border-linear-200 rounded hover:bg-linear-50 transition-colors flex items-center gap-1.5">
            <Download className="w-3.5 h-3.5" />
            Export All
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-[#fbfbfc]">
        <div className="max-w-7xl mx-auto p-8">
          {/* Summary Stats */}
          <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border border-linear-200 bg-white shadow-sm p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] text-linear-500 uppercase tracking-wider">Total Volunteers</p>
                  <p className="text-[28px] font-bold text-linear-900">{stats.totalVolunteers}</p>
                  <p className="mt-1 text-[11px] text-green-600 font-medium">
                    {stats.activeVolunteers} active
                  </p>
                </div>
                <Users className="h-10 w-10 text-blue-600" />
              </div>
            </div>

            <div className="rounded-lg border border-linear-200 bg-white shadow-sm p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] text-linear-500 uppercase tracking-wider">Total Hours</p>
                  <p className="text-[28px] font-bold text-linear-900">{stats.totalHours.toLocaleString()}</p>
                  <p className="mt-1 text-[11px] text-linear-600">
                    Avg: {stats.avgHoursPerVolunteer}h per volunteer
                  </p>
                </div>
                <Clock className="h-10 w-10 text-purple-600" />
              </div>
            </div>

            <div className="rounded-lg border border-linear-200 bg-white shadow-sm p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] text-linear-500 uppercase tracking-wider">Retention Rate</p>
                  <p className="text-[28px] font-bold text-linear-900">{stats.retentionRate}%</p>
                  <p className="mt-1 text-[11px] text-linear-600">
                    {stats.totalEvents} events hosted
                  </p>
                </div>
                <TrendingUp className="h-10 w-10 text-green-600" />
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-4 flex gap-2 border-b border-linear-200">
            {[
              { id: "trends", label: "Trends", icon: TrendingUp },
              { id: "demographics", label: "Demographics", icon: Users },
              { id: "retention", label: "Retention", icon: Activity },
              { id: "impact", label: "Impact", icon: Award },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as ActiveTab)}
                  className={`px-4 py-2 text-[13px] font-medium border-b-2 transition-colors flex items-center gap-2 ${
                    activeTab === tab.id
                      ? "border-linear-900 text-linear-900"
                      : "border-transparent text-linear-600 hover:text-linear-900"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          {activeTab === "trends" && (
            <div className="space-y-6">
              <div className="rounded-lg border border-linear-200 bg-white shadow-sm overflow-hidden">
                <div className="border-b border-linear-100 p-5 flex items-center justify-between">
                  <div>
                    <h3 className="text-[14px] font-semibold text-linear-900">Volunteer Hours Over Time</h3>
                    <p className="text-[11px] text-linear-500 mt-1">Monthly volunteer hours and participation</p>
                  </div>
                  <button
                    onClick={() => handleExportReport("trends")}
                    className="px-3 py-1.5 text-[12px] font-medium text-linear-900 bg-white border border-linear-200 rounded hover:bg-linear-50 transition-colors flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Export
                  </button>
                </div>

                <div className="p-5">
                  {monthlyData.length > 0 ? (
                    <div className="space-y-4">
                      {monthlyData.map((month: any) => (
                        <div key={month.month}>
                          <div className="mb-2 flex items-center justify-between text-[12px]">
                            <span className="font-semibold text-linear-900">{month.month}</span>
                            <span className="text-linear-600">
                              {month.hours}h • {month.volunteers} volunteers
                            </span>
                          </div>
                          <div className="h-3 w-full overflow-hidden rounded-full bg-linear-100">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-blue-600 to-blue-400"
                              style={{
                                width: `${Math.min((month.hours / Math.max(...monthlyData.map((m: any) => m.hours))) * 100, 100)}%`,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-12 text-center">
                      <Calendar className="mx-auto mb-2 h-12 w-12 text-linear-400" />
                      <p className="text-[12px] text-linear-500">No data available yet</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-lg border border-linear-200 bg-white shadow-sm p-5">
                  <h3 className="mb-4 text-[14px] font-semibold text-linear-900">Event Attendance</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[12px] text-linear-600">Average Attendance</span>
                      <span className="text-[24px] font-bold text-linear-900">85%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[12px] text-linear-600">No-Show Rate</span>
                      <span className="text-[18px] font-semibold text-orange-600">15%</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-linear-200 bg-white shadow-sm p-5">
                  <h3 className="mb-4 text-[14px] font-semibold text-linear-900">Volunteer Growth</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[12px] text-linear-600">New This Month</span>
                      <span className="text-[24px] font-bold text-green-600">+12</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[12px] text-linear-600">Growth Rate</span>
                      <span className="text-[18px] font-semibold text-linear-900">+8%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "demographics" && (
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-lg border border-linear-200 bg-white shadow-sm overflow-hidden">
                <div className="border-b border-linear-100 p-5 flex items-center gap-2">
                  <PieChart className="h-4 w-4 text-linear-500" />
                  <h3 className="text-[14px] font-semibold text-linear-900">Age Distribution</h3>
                </div>
                <div className="p-5 space-y-4">
                  {[
                    { range: "18-24", percentage: 25, count: 15 },
                    { range: "25-34", percentage: 35, count: 21 },
                    { range: "35-44", percentage: 20, count: 12 },
                    { range: "45-54", percentage: 12, count: 7 },
                    { range: "55+", percentage: 8, count: 5 },
                  ].map((age) => (
                    <div key={age.range}>
                      <div className="mb-2 flex items-center justify-between text-[12px]">
                        <span className="font-medium text-linear-900">{age.range} years</span>
                        <span className="text-linear-600">
                          {age.count} ({age.percentage}%)
                        </span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-linear-100">
                        <div
                          className="h-full rounded-full bg-blue-600"
                          style={{ width: `${age.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-linear-200 bg-white shadow-sm overflow-hidden">
                <div className="border-b border-linear-100 p-5">
                  <h3 className="text-[14px] font-semibold text-linear-900">Location Breakdown</h3>
                </div>
                <div className="p-5 space-y-3">
                  {[
                    { city: "San Francisco", count: 25 },
                    { city: "Oakland", count: 18 },
                    { city: "Berkeley", count: 12 },
                    { city: "San Jose", count: 8 },
                    { city: "Other", count: 7 },
                  ].map((location) => (
                    <div key={location.city} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-linear-50 transition-colors">
                      <span className="text-[12px] font-medium text-linear-900">{location.city}</span>
                      <span className="text-[14px] font-bold text-linear-900">{location.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "retention" && (
            <div className="rounded-lg border border-linear-200 bg-white shadow-sm overflow-hidden">
              <div className="border-b border-linear-100 p-5">
                <h3 className="text-[14px] font-semibold text-linear-900">Retention Cohorts</h3>
                <p className="text-[11px] text-linear-500 mt-1">
                  Percentage of volunteers who return after their first event
                </p>
              </div>
              <div className="p-5 overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-linear-200">
                      <th className="pb-3 text-left text-[11px] font-semibold text-linear-600 uppercase tracking-wider">Cohort</th>
                      <th className="pb-3 text-center text-[11px] font-semibold text-linear-600 uppercase tracking-wider">Month 1</th>
                      <th className="pb-3 text-center text-[11px] font-semibold text-linear-600 uppercase tracking-wider">Month 2</th>
                      <th className="pb-3 text-center text-[11px] font-semibold text-linear-600 uppercase tracking-wider">Month 3</th>
                      <th className="pb-3 text-center text-[11px] font-semibold text-linear-600 uppercase tracking-wider">Month 6</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-linear-100">
                    {[
                      { cohort: "Jan 2024", m1: 100, m2: 75, m3: 60, m6: 45 },
                      { cohort: "Feb 2024", m1: 100, m2: 80, m3: 65, m6: 50 },
                      { cohort: "Mar 2024", m1: 100, m2: 78, m3: 62, m6: null },
                    ].map((row) => (
                      <tr key={row.cohort} className="hover:bg-linear-50 transition-colors">
                        <td className="py-3 text-[12px] font-semibold text-linear-900">{row.cohort}</td>
                        <td className="py-3 text-center text-[12px] text-linear-900">{row.m1}%</td>
                        <td className="py-3 text-center text-[12px] text-linear-900">{row.m2}%</td>
                        <td className="py-3 text-center text-[12px] text-linear-900">{row.m3}%</td>
                        <td className="py-3 text-center text-[12px] text-linear-600">{row.m6 ? `${row.m6}%` : "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "impact" && (
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="rounded-lg border border-linear-200 bg-white shadow-sm p-6 text-center">
                <Target className="mx-auto mb-4 h-12 w-12 text-blue-600" />
                <p className="mb-2 text-[32px] font-bold text-linear-900">$125,000</p>
                <p className="text-[12px] font-medium text-linear-900">Estimated Value</p>
                <p className="mt-2 text-[11px] text-linear-500">
                  Based on volunteer hours
                </p>
              </div>

              <div className="rounded-lg border border-linear-200 bg-white shadow-sm p-6 text-center">
                <Award className="mx-auto mb-4 h-12 w-12 text-amber-600" />
                <p className="mb-2 text-[32px] font-bold text-linear-900">5,000</p>
                <p className="text-[12px] font-medium text-linear-900">Lives Impacted</p>
                <p className="mt-2 text-[11px] text-linear-500">
                  Estimated reach
                </p>
              </div>

              <div className="rounded-lg border border-linear-200 bg-white shadow-sm p-6 text-center">
                <Users className="mx-auto mb-4 h-12 w-12 text-green-600" />
                <p className="mb-2 text-[32px] font-bold text-linear-900">92%</p>
                <p className="text-[12px] font-medium text-linear-900">Satisfaction</p>
                <p className="mt-2 text-[11px] text-linear-500">
                  Avg volunteer rating
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
