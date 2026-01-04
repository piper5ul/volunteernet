"use client";

import { trpc } from "@/lib/utils/trpc";
import { useAuth } from "@/lib/stores/auth-store";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  MapPin,
  Clock,
  Award,
  Download,
  Plus,
  ArrowUpRight,
  TrendingUp,
  MoreHorizontal
} from "lucide-react";
import { formatDateWithContext } from "@/lib/utils/date-utils";
import { format } from "date-fns";
import Link from "next/link";

export default function DashboardPage() {
  const { currentPersona } = useAuth();

  const userId =
    currentPersona.type === "volunteer" || currentPersona.type === "squad-leader"
      ? currentPersona.userId
      : null;

  const { data: stats, isLoading: statsLoading } = trpc.users.getImpactStats.useQuery(
    { userId: userId! },
    { enabled: !!userId }
  );

  const { data: timeline, isLoading: timelineLoading } = trpc.users.getTimeline.useQuery(
    { userId: userId! },
    { enabled: !!userId }
  );

  const { data: badges, isLoading: badgesLoading } = trpc.users.getBadges.useQuery(
    { userId: userId! },
    { enabled: !!userId }
  );

  const { data: upcomingEvents, isLoading: upcomingLoading } = trpc.opportunities.list.useQuery(
    { userId: userId!, status: "upcoming" },
    { enabled: !!userId }
  );

  if (!userId || currentPersona.type === "guest") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fbfbfc]">
        <div className="text-center">
          <h1 className="mb-2 text-[18px] font-semibold text-linear-900">Login Required</h1>
          <p className="mb-4 text-[13px] text-linear-600">
            Please log in to view your dashboard.
          </p>
          <Button asChild className="bg-linear-900 hover:bg-black text-white text-[13px] font-medium px-4 py-2 rounded-md shadow-subtle">
            <Link href="/login">Log In</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (statsLoading) {
    return (
      <div className="flex flex-col h-screen bg-white">
        <div className="h-14 border-b border-linear-100 flex items-center px-6">
          <Skeleton className="h-5 w-32" />
        </div>
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-4 gap-4 mb-10">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-24" />
              ))}
            </div>
            <Skeleton className="h-96 mb-6" />
          </div>
        </div>
      </div>
    );
  }

  const upcomingEventsFiltered = timeline?.filter(
    (entry) => new Date(entry.date) > new Date() && entry.status !== "COMPLETED"
  ) || [];

  const recentActivity = timeline?.slice(0, 5) || [];

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <header className="h-14 border-b border-linear-100 flex items-center px-6 gap-4 shrink-0">
        <h1 className="font-medium text-[14px] text-linear-900">Dashboard</h1>
        <div className="h-4 w-px bg-linear-200"></div>
        <span className="text-[13px] text-linear-500">Overview</span>

        <div className="ml-auto flex items-center gap-3">
          <div className="flex items-center gap-2 text-[12px] text-linear-500">
            <span>Last synced 2m ago</span>
            <button className="p-1 hover:bg-linear-100 rounded text-linear-900 transition-colors">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <button className="bg-linear-900 text-white text-[12px] font-medium px-3 py-1.5 rounded hover:bg-black transition-colors shadow-subtle border border-transparent">
            <Plus className="w-3.5 h-3.5 inline-block mr-1.5" />
            New Entry
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-5xl mx-auto">
          {/* Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            <div className="p-4 rounded-lg border border-linear-200 shadow-subtle bg-white">
              <span className="text-[12px] font-medium text-linear-500">Total Hours</span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-medium tracking-tight text-linear-900">
                  {stats?.totalHours || 0}
                </span>
                {stats?.hoursGrowth && (
                  <span className="text-[11px] font-medium text-peer-green">
                    +{stats.hoursGrowth}%
                  </span>
                )}
              </div>
            </div>

            <div className="p-4 rounded-lg border border-linear-200 shadow-subtle bg-white">
              <span className="text-[12px] font-medium text-linear-500">Events Attended</span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-medium tracking-tight text-linear-900">
                  {stats?.eventsAttended || 0}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-lg border border-linear-200 shadow-subtle bg-white">
              <span className="text-[12px] font-medium text-linear-500">Impact Score</span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-medium tracking-tight text-linear-900">
                  {stats?.impactScore || 0}
                </span>
                <span className="text-[11px] font-medium text-linear-400">Top 5%</span>
              </div>
            </div>

            <div className="p-4 rounded-lg border border-linear-200 shadow-subtle bg-white">
              <span className="text-[12px] font-medium text-linear-500">Network Reach</span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-medium tracking-tight text-linear-900">
                  {stats?.networkReach ? `${(stats.networkReach / 1000).toFixed(1)}k` : '0'}
                </span>
              </div>
            </div>
          </div>

          {/* Active Opportunities Table */}
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[14px] font-medium text-linear-900">Active Volunteer Opportunities</h3>
            <div className="flex gap-2 text-[12px]">
              <button className="text-linear-900 font-medium hover:bg-linear-100 px-2 py-0.5 rounded transition-colors">All</button>
              <button className="text-linear-500 hover:text-linear-900 hover:bg-linear-100 px-2 py-0.5 rounded transition-colors">Active</button>
              <button className="text-linear-500 hover:text-linear-900 hover:bg-linear-100 px-2 py-0.5 rounded transition-colors">Pending</button>
            </div>
          </div>

          <div className="border border-linear-200 rounded-lg bg-white shadow-sm overflow-hidden mb-10">
            <div className="flex items-center px-4 py-2 border-b border-linear-100 bg-linear-50/50 text-[11px] font-medium text-linear-500">
              <div className="w-20">ID</div>
              <div className="flex-1">Title</div>
              <div className="w-32">Status</div>
              <div className="w-32">Organization</div>
              <div className="w-24 text-right">Date</div>
            </div>

            {timelineLoading ? (
              <div className="p-4 space-y-3">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-12" />
                ))}
              </div>
            ) : !timeline || timeline.length === 0 ? (
              <div className="py-12 text-center">
                <Calendar className="mx-auto mb-2 h-8 w-8 text-linear-400" />
                <p className="text-[13px] text-linear-500 mb-3">No volunteer activities yet</p>
                <Link href="/discover" className="text-[12px] text-linear-900 font-medium hover:underline">
                  Browse Opportunities
                </Link>
              </div>
            ) : (
              <>
                {timeline.slice(0, 5).map((entry, i) => {
                  const status = entry.status === "COMPLETED" ? "Done" : entry.status === "PENDING" ? "Todo" : "In Progress";
                  const statusColor = entry.status === "COMPLETED" ? "linear" : entry.status === "PENDING" ? "gray" : "orange";

                  return (
                    <div
                      key={entry.id}
                      className="flex items-center px-4 py-2.5 border-b border-linear-100 text-[13px] cursor-pointer hover:bg-linear-50 transition-colors group"
                    >
                      <div className="w-20 font-mono text-[11px] text-linear-400 group-hover:text-linear-500">
                        VOL-{String(i + 100).padStart(3, '0')}
                      </div>
                      <div className={`flex-1 font-medium ${entry.status === "COMPLETED" ? 'line-through text-linear-400' : 'text-linear-900'}`}>
                        {entry.role_title || entry.opportunity?.title || 'Volunteer Activity'}
                      </div>
                      <div className="w-32 flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-2 ${
                          statusColor === 'linear' ? 'bg-linear-400' :
                          statusColor === 'gray' ? 'bg-linear-300' :
                          'bg-orange-400'
                        }`}></div>
                        <span className={statusColor === 'linear' ? 'text-linear-400' : 'text-linear-600'}>
                          {status}
                        </span>
                      </div>
                      <div className="w-32 flex items-center gap-1.5 text-linear-600">
                        {entry.organization && (
                          <>
                            <span className="w-3 h-3 rounded-[2px] bg-blue-500"></span>
                            {entry.organization.name.slice(0, 10)}
                          </>
                        )}
                      </div>
                      <div className="w-24 text-right text-linear-400 text-[12px]">
                        {format(new Date(entry.date), 'MMM d')}
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>

          {/* Activity & Goals */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Recent Activity Timeline */}
            <div className="flex-1">
              <h3 className="text-[14px] font-medium text-linear-900 mb-4">Recent Activity</h3>
              <div className="relative border-l border-linear-200 ml-2 space-y-6 pl-6 pb-2">
                {timelineLoading ? (
                  <div className="space-y-6">
                    {[...Array(3)].map((_, i) => (
                      <Skeleton key={i} className="h-16" />
                    ))}
                  </div>
                ) : !recentActivity || recentActivity.length === 0 ? (
                  <div className="relative">
                    <div className="absolute -left-[29px] top-1 w-3 h-3 bg-white border border-linear-300 rounded-full"></div>
                    <div className="text-[13px] text-linear-500">No recent activity</div>
                  </div>
                ) : (
                  recentActivity.map((entry, i) => (
                    <div key={entry.id} className="relative">
                      <div className="absolute -left-[29px] top-1 w-3 h-3 bg-white border border-linear-300 rounded-full"></div>
                      <div className="text-[13px] text-linear-900">
                        Completed <span className="font-medium">{entry.role_title || entry.opportunity?.title}</span>
                        {entry.organization && (
                          <> at <span className="font-medium">{entry.organization.name}</span></>
                        )}
                      </div>
                      <div className="text-[12px] text-linear-400 mt-0.5">
                        {formatDateWithContext(new Date(entry.date))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Goals & Badges Sidebar */}
            <div className="w-full lg:w-72 shrink-0 space-y-6">
              {/* Goals */}
              <div>
                <h3 className="text-[14px] font-medium text-linear-900 mb-4">Goals</h3>
                <div className="bg-linear-50 rounded-lg p-4 border border-linear-100 space-y-4">
                  <div>
                    <div className="flex justify-between text-[12px] mb-1.5">
                      <span className="font-medium text-linear-700">Monthly Hours</span>
                      <span className="text-linear-500">
                        {stats?.totalHours ? Math.min(Math.round((stats.totalHours / 50) * 100), 100) : 0}%
                      </span>
                    </div>
                    <div className="w-full bg-linear-200 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-peer-green h-full rounded-full"
                        style={{ width: `${stats?.totalHours ? Math.min(Math.round((stats.totalHours / 50) * 100), 100) : 0}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[12px] mb-1.5">
                      <span className="font-medium text-linear-700">Skills Gained</span>
                      <span className="text-linear-500">{badges?.length || 0}/5</span>
                    </div>
                    <div className="w-full bg-linear-200 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-linear-500 h-full rounded-full"
                        style={{ width: `${badges?.length ? Math.min((badges.length / 5) * 100, 100) : 0}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Badges */}
              <div>
                <h3 className="text-[14px] font-medium text-linear-900 mb-4">Achievements</h3>
                {badgesLoading ? (
                  <div className="grid grid-cols-3 gap-3">
                    {[...Array(6)].map((_, i) => (
                      <Skeleton key={i} className="h-20" />
                    ))}
                  </div>
                ) : !badges || badges.length === 0 ? (
                  <div className="py-8 text-center bg-linear-50 rounded-lg border border-linear-100">
                    <Award className="mx-auto mb-2 h-8 w-8 text-linear-400" />
                    <p className="text-[12px] text-linear-500">
                      Start volunteering to earn badges!
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-2">
                    {badges.slice(0, 6).map((badge) => (
                      <div
                        key={badge.id}
                        className="flex flex-col items-center gap-1 rounded-lg border border-linear-200 p-3 text-center hover:bg-linear-50 transition-colors"
                      >
                        <div className="text-2xl">{badge.icon}</div>
                        <p className="text-[10px] font-medium text-linear-700 leading-tight">{badge.name}</p>
                      </div>
                    ))}
                  </div>
                )}
                {badges && badges.length > 6 && (
                  <Link href="/dashboard/achievements" className="block mt-3 text-center text-[12px] text-linear-900 font-medium hover:underline">
                    View All {badges.length} Badges
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
