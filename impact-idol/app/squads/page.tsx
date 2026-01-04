"use client";

import { trpc } from "@/lib/utils/trpc";
import { useAuth } from "@/lib/stores/auth-store";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Users, Crown, Calendar, Award } from "lucide-react";
import Link from "next/link";

export default function SquadsPage() {
  const { currentPersona } = useAuth();

  const userId =
    currentPersona.type === "volunteer" || currentPersona.type === "squad-leader"
      ? currentPersona.userId
      : null;

  const { data: squads, isLoading } = trpc.squads.getUserSquads.useQuery(
    { userId: userId! },
    { enabled: !!userId }
  );

  if (!userId || currentPersona.type === "guest") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fbfbfc]">
        <div className="text-center">
          <h1 className="mb-2 text-[18px] font-semibold text-linear-900">Login Required</h1>
          <p className="mb-4 text-[13px] text-linear-600">
            Please log in to view your squads.
          </p>
          <Link href="/login" className="bg-linear-900 hover:bg-black text-white text-[13px] font-medium px-4 py-2 rounded-md shadow-subtle inline-block">
            Log In
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col h-screen bg-white">
        <div className="h-14 border-b border-linear-100 flex items-center px-6">
          <Skeleton className="h-5 w-32" />
        </div>
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-48" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <header className="h-14 border-b border-linear-100 flex items-center px-6 gap-4 shrink-0">
        <h1 className="font-medium text-[14px] text-linear-900">Squads</h1>
        <div className="h-4 w-px bg-linear-200"></div>
        <span className="text-[13px] text-linear-500">
          {squads?.length || 0} {squads?.length === 1 ? 'squad' : 'squads'}
        </span>

        <div className="ml-auto flex items-center gap-3">
          <Link href="/squads/create" className="bg-linear-900 text-white text-[12px] font-medium px-3 py-1.5 rounded hover:bg-black transition-colors shadow-subtle flex items-center gap-1.5">
            <Plus className="w-3.5 h-3.5" />
            Create Squad
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-[#fbfbfc] p-8">
        <div className="max-w-7xl mx-auto">
          {/* Squads Grid */}
          {!squads || squads.length === 0 ? (
            <div className="flex min-h-[400px] items-center justify-center rounded-lg border-2 border-dashed border-linear-200 bg-white">
              <div className="text-center px-6">
                <Users className="mx-auto mb-4 h-12 w-12 text-linear-400" />
                <h3 className="mb-2 text-[16px] font-semibold text-linear-900">No Squads Yet</h3>
                <p className="mb-4 text-[13px] text-linear-600 max-w-md">
                  Create a squad to volunteer with your team, company, or school
                </p>
                <Link href="/squads/create" className="bg-linear-900 hover:bg-black text-white text-[13px] font-medium px-4 py-2 rounded-md shadow-subtle inline-flex items-center gap-1.5">
                  <Plus className="w-3.5 h-3.5" />
                  Create Your First Squad
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {squads.map((squad) => (
                <SquadCard key={squad.id} squad={squad} />
              ))}
            </div>
          )}

          {/* Info Section */}
          <div className="mt-8 rounded-lg border border-blue-200 bg-blue-50/50 p-6">
            <h3 className="mb-3 text-[14px] font-semibold text-blue-900">
              Why Create a Squad?
            </h3>
            <ul className="space-y-2 text-[13px] text-blue-800">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-blue-600 text-[16px]">•</span>
                <span>
                  <strong className="font-medium">Book as a group:</strong> Reserve multiple spots at once for your team
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-blue-600 text-[16px]">•</span>
                <span>
                  <strong className="font-medium">Magic links:</strong> Share a simple link - no account needed for
                  participants
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-blue-600 text-[16px]">•</span>
                <span>
                  <strong className="font-medium">Track collective impact:</strong> See your group's total hours and
                  achievements
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-blue-600 text-[16px]">•</span>
                <span>
                  <strong className="font-medium">Perfect for:</strong> Companies, schools, clubs, families, friend groups
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

interface SquadCardProps {
  squad: any;
}

function SquadCard({ squad }: SquadCardProps) {
  return (
    <Link
      href={`/squads/${squad.id}`}
      className="group rounded-lg border border-linear-200 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden"
    >
      <div className="p-4">
        {/* Squad Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-md bg-linear-100 flex items-center justify-center text-[14px] font-bold text-linear-700">
              {squad.name?.substring(0, 2)?.toUpperCase() || "SQ"}
            </div>
            <div>
              <h3 className="text-[14px] font-semibold text-linear-900 group-hover:text-peer-green transition-colors">
                {squad.name}
              </h3>
              <p className="text-[11px] text-linear-500">
                {squad.type || "Team Squad"}
              </p>
            </div>
          </div>
          {squad.isLeader && (
            <div className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 border border-amber-200">
              <Crown className="w-3 h-3" />
            </div>
          )}
        </div>

        {/* Description */}
        {squad.description && (
          <p className="text-[12px] text-linear-600 line-clamp-2 mb-4">
            {squad.description}
          </p>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="text-center">
            <div className="text-[16px] font-semibold text-linear-900">
              {squad.memberCount || 0}
            </div>
            <div className="text-[10px] text-linear-500 uppercase tracking-wide">Members</div>
          </div>
          <div className="text-center">
            <div className="text-[16px] font-semibold text-linear-900">
              {squad.totalHours || 0}
            </div>
            <div className="text-[10px] text-linear-500 uppercase tracking-wide">Hours</div>
          </div>
          <div className="text-center">
            <div className="text-[16px] font-semibold text-linear-900">
              {squad.eventsCount || 0}
            </div>
            <div className="text-[10px] text-linear-500 uppercase tracking-wide">Events</div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-4 text-[11px] text-linear-500 pt-3 border-t border-linear-100">
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            {squad.activeMembers || 0} active
          </div>
          {squad.nextEvent && (
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              Next event soon
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
