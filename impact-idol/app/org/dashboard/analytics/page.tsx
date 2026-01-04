"use client";

import { trpc } from "@/lib/utils/trpc";
import { useAuth } from "@/lib/stores/auth-store";
import { Skeleton } from "@/components/ui/skeleton";
import { OrgStatsGrid } from "@/components/org/org-stats-grid";
import { ArrowLeft, TrendingUp, Users, Calendar, Clock, Target, Award, Activity } from "lucide-react";
import Link from "next/link";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];

export default function AnalyticsPage() {
  const { currentPersona } = useAuth();

  const orgId = currentPersona.type === "org-admin" ? currentPersona.orgId : null;

  const { data: orgStats, isLoading } = trpc.organizations.getStats.useQuery(
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

  const stats = {
    totalVolunteers: orgStats?.totalVolunteers || 0,
    totalHours: orgStats?.totalHours || 0,
    totalEvents: orgStats?.totalEvents || 0,
    retentionRate: orgStats?.retentionRate || 0,
    monetaryValue: orgStats?.monetaryValue || 0,
    averageRating: orgStats?.averageRating || 0,
  };

  // Mock data for charts
  const monthlyData = [
    { month: "Jul", hours: 120, volunteers: 45 },
    { month: "Aug", hours: 150, volunteers: 52 },
    { month: "Sep", hours: 180, volunteers: 61 },
    { month: "Oct", hours: 165, volunteers: 58 },
    { month: "Nov", hours: 210, volunteers: 72 },
    { month: "Dec", hours: 190, volunteers: 65 },
  ];

  const causeData = [
    { name: "Environment", value: 35 },
    { name: "Education", value: 25 },
    { name: "Health", value: 15 },
    { name: "Community", value: 15 },
    { name: "Other", value: 10 },
  ];

  const performanceMetrics = [
    {
      label: "Fill Rate",
      value: "87%",
      description: "Events reaching capacity",
      trend: "+5%",
      positive: true,
      icon: Target,
      color: "text-blue-600",
    },
    {
      label: "Show-up Rate",
      value: "94%",
      description: "Registered volunteers attending",
      trend: "+2%",
      positive: true,
      icon: Activity,
      color: "text-green-600",
    },
    {
      label: "Volunteer Retention",
      value: `${stats.retentionRate}%`,
      description: "Volunteers returning",
      trend: "+8%",
      positive: true,
      icon: Users,
      color: "text-purple-600",
    },
    {
      label: "Avg. Hours/Volunteer",
      value: (stats.totalHours / (stats.totalVolunteers || 1)).toFixed(1),
      description: "Per volunteer this year",
      trend: "+12%",
      positive: true,
      icon: Clock,
      color: "text-amber-600",
    },
  ];

  const topVolunteers = [
    { name: "Sarah Chen", hours: 28, events: 7 },
    { name: "James Rodriguez", hours: 24, events: 6 },
    { name: "Emily Watson", hours: 22, events: 5 },
    { name: "Michael Brown", hours: 20, events: 5 },
    { name: "Lisa Anderson", hours: 18, events: 4 },
  ];

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <header className="h-14 border-b border-linear-100 flex items-center px-6 gap-4 shrink-0">
        <Link href="/org/dashboard" className="text-linear-500 hover:text-linear-900 transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div className="h-4 w-px bg-linear-200"></div>
        <h1 className="font-medium text-[14px] text-linear-900">Analytics</h1>
        <div className="h-4 w-px bg-linear-200"></div>
        <span className="text-[13px] text-linear-500">Performance insights & trends</span>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-[#fbfbfc]">
        <div className="max-w-7xl mx-auto p-8">
          {/* Stats Grid */}
          <div className="mb-6">
            <OrgStatsGrid stats={stats} />
          </div>

          {/* Performance Metrics */}
          <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {performanceMetrics.map((metric) => {
              const Icon = metric.icon;
              return (
                <div key={metric.label} className="rounded-lg border border-linear-200 bg-white shadow-sm p-5">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-[11px] text-linear-500 uppercase tracking-wider">{metric.label}</p>
                    <Icon className={`h-5 w-5 ${metric.color}`} />
                  </div>
                  <p className="text-[28px] font-bold text-linear-900 mb-1">{metric.value}</p>
                  <p className="text-[11px] text-linear-600 mb-2">{metric.description}</p>
                  <p className={`text-[12px] font-semibold ${metric.positive ? "text-green-600" : "text-red-600"}`}>
                    {metric.trend}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Charts */}
          <div className="grid gap-6 lg:grid-cols-2 mb-6">
            {/* Hours & Volunteers Over Time */}
            <div className="rounded-lg border border-linear-200 bg-white shadow-sm overflow-hidden">
              <div className="border-b border-linear-100 p-5">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-linear-500" />
                  <h3 className="text-[14px] font-semibold text-linear-900">Volunteer Hours & Participation</h3>
                </div>
                <p className="text-[11px] text-linear-500 mt-1">Monthly trends over the last 6 months</p>
              </div>
              <div className="p-5">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#6b7280" />
                    <YAxis tick={{ fontSize: 12 }} stroke="#6b7280" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e5e7eb",
                        borderRadius: "6px",
                        fontSize: "12px",
                      }}
                    />
                    <Bar dataKey="hours" fill="#3b82f6" name="Hours" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="volunteers" fill="#10b981" name="Volunteers" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Cause Distribution */}
            <div className="rounded-lg border border-linear-200 bg-white shadow-sm overflow-hidden">
              <div className="border-b border-linear-100 p-5">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-linear-500" />
                  <h3 className="text-[14px] font-semibold text-linear-900">Hours by Cause</h3>
                </div>
                <p className="text-[11px] text-linear-500 mt-1">Distribution across different causes</p>
              </div>
              <div className="p-5">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={causeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.name} (${entry.value}%)`}
                      outerRadius={90}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {causeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e5e7eb",
                        borderRadius: "6px",
                        fontSize: "12px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Top Volunteers */}
          <div className="rounded-lg border border-linear-200 bg-white shadow-sm overflow-hidden">
            <div className="border-b border-linear-100 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-linear-500" />
                    <h3 className="text-[14px] font-semibold text-linear-900">Top Volunteers This Month</h3>
                  </div>
                  <p className="text-[11px] text-linear-500 mt-1">Most active volunteers ranked by hours</p>
                </div>
                <Link href="/org/dashboard/volunteers" className="text-[12px] font-medium text-linear-900 hover:underline">
                  View All
                </Link>
              </div>
            </div>
            <div className="p-5">
              <div className="space-y-4">
                {topVolunteers.map((volunteer, index) => (
                  <div key={volunteer.name} className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-linear-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold shrink-0 ${
                        index === 0
                          ? "bg-amber-100 text-amber-700"
                          : index === 1
                          ? "bg-linear-200 text-linear-700"
                          : index === 2
                          ? "bg-orange-100 text-orange-700"
                          : "bg-linear-100 text-linear-600"
                      }`}>
                        #{index + 1}
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold text-linear-900">{volunteer.name}</p>
                        <p className="text-[11px] text-linear-500">{volunteer.events} events attended</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-linear-500" />
                      <span className="text-[16px] font-bold text-linear-900">{volunteer.hours}h</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
