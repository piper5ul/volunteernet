"use client";

import { use, useState } from "react";
import { trpc } from "@/lib/utils/trpc";
import { useAuth } from "@/lib/stores/auth-store";
import { Skeleton } from "@/components/ui/skeleton";
import { SquadStats } from "@/components/squad/squad-stats";
import { SquadRoster } from "@/components/squad/squad-roster";
import { MagicLinkGenerator } from "@/components/squad/magic-link-generator";
import { SquadBookingModal } from "@/components/squad/squad-booking-modal";
import { ImpactTimeline } from "@/components/dashboard/impact-timeline";
import { toast } from "sonner";
import {
  ArrowLeft,
  Settings,
  UserPlus,
  Calendar,
  Crown,
} from "lucide-react";
import Link from "next/link";

export default function SquadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { currentPersona } = useAuth();
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"members" | "history" | "magic-link">("members");

  const userId =
    currentPersona.type === "volunteer" || currentPersona.type === "squad-leader"
      ? currentPersona.userId
      : null;

  const { data: squad, isLoading } = trpc.squads.get.useQuery({ id });

  const isLeader = squad?.leader_id === userId;

  if (isLoading) {
    return (
      <div className="flex flex-col h-screen bg-white">
        <div className="h-14 border-b border-linear-100 flex items-center px-6">
          <Skeleton className="h-5 w-32" />
        </div>
        <div className="flex-1 overflow-y-auto bg-[#fbfbfc] p-8">
          <div className="max-w-7xl mx-auto">
            <Skeleton className="mb-4 h-12 w-64" />
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <Skeleton className="h-96" />
              </div>
              <div>
                <Skeleton className="h-64" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!squad) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fbfbfc]">
        <div className="text-center">
          <h1 className="mb-2 text-[18px] font-semibold text-linear-900">Squad Not Found</h1>
          <p className="mb-4 text-[13px] text-linear-600">
            This squad doesn't exist or you don't have access to it.
          </p>
          <Link href="/squads" className="bg-linear-900 hover:bg-black text-white text-[13px] font-medium px-4 py-2 rounded-md shadow-subtle inline-block">
            Back to Squads
          </Link>
        </div>
      </div>
    );
  }

  const typeColors: Record<string, { bg: string; text: string; border: string }> = {
    corporate: { bg: "bg-blue-100", text: "text-blue-700", border: "border-blue-200" },
    school: { bg: "bg-purple-100", text: "text-purple-700", border: "border-purple-200" },
    social: { bg: "bg-green-100", text: "text-green-700", border: "border-green-200" },
    family: { bg: "bg-pink-100", text: "text-pink-700", border: "border-pink-200" },
    other: { bg: "bg-linear-100", text: "text-linear-700", border: "border-linear-200" },
  };

  const typeLabels: Record<string, string> = {
    corporate: "Corporate",
    school: "School",
    social: "Social",
    family: "Family",
    other: "Other",
  };

  // Safely get the squad type, defaulting to "other" if undefined or unknown
  const squadType = (squad.type && typeColors[squad.type]) ? squad.type : "other";
  const colors = typeColors[squadType];
  const typeLabel = typeLabels[squadType] || "Other";

  // Calculate stats
  const stats = {
    memberCount: squad.members?.length || 0,
    totalHours: squad.total_hours || 0,
    eventCount: squad.event_count || 0,
    averageHoursPerMember:
      (squad.total_hours || 0) / (squad.members?.length || 1),
    monetaryValue: Math.round((squad.total_hours || 0) * 33.49),
    topVolunteer: squad.members && squad.members.length > 0
      ? {
          name: squad.members[0].name,
          hours: squad.members[0].hours || 0,
        }
      : undefined,
  };

  // Mock magic link - in real app this would come from booking
  const magicLink = `https://impact-idol.com/join/${squad.id}-abc123`;

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <header className="h-14 border-b border-linear-100 flex items-center px-6 gap-4 shrink-0">
        <Link href="/squads" className="text-linear-500 hover:text-linear-900 flex items-center gap-2 text-[13px] font-medium transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>
        <div className="h-4 w-px bg-linear-200"></div>
        <h1 className="font-medium text-[14px] text-linear-900 truncate">{squad.name}</h1>

        {isLeader && (
          <div className="ml-auto flex items-center gap-2">
            <button className="px-3 py-1.5 text-[12px] font-medium text-linear-900 bg-white border border-linear-200 rounded hover:bg-linear-50 transition-colors flex items-center gap-1.5">
              <Settings className="h-3.5 w-3.5" />
              Settings
            </button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-[#fbfbfc]">
        <div className="max-w-7xl mx-auto p-8">
          {/* Squad Header Card */}
          <div className="mb-6 rounded-lg border border-linear-200 bg-white shadow-sm p-6">
            <div className="mb-3 flex items-center gap-2 flex-wrap">
              <h1 className="text-[24px] font-bold text-linear-900">{squad.name}</h1>
              <span className={`px-2 py-0.5 rounded-md text-[11px] font-medium border ${colors.bg} ${colors.text} ${colors.border}`}>
                {typeLabel}
              </span>
              {isLeader && (
                <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-amber-100 text-amber-700 border border-amber-200 flex items-center gap-1">
                  <Crown className="h-3 w-3" />
                  Squad Leader
                </span>
              )}
            </div>
            {squad.description && (
              <p className="text-[13px] text-linear-600">{squad.description}</p>
            )}
          </div>

          {/* Stats */}
          <div className="mb-6">
            <SquadStats stats={stats} />
          </div>

          {/* Quick Actions */}
          {isLeader && (
            <div className="mb-6 flex flex-wrap gap-2">
              <Link href="/discover" className="px-3 py-1.5 text-[12px] font-medium text-white bg-peer-green hover:bg-green-600 rounded shadow-subtle transition-colors flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                Find Opportunities
              </Link>
              <button className="px-3 py-1.5 text-[12px] font-medium text-linear-900 bg-white border border-linear-200 rounded hover:bg-linear-50 transition-colors flex items-center gap-1.5">
                <UserPlus className="h-3.5 w-3.5" />
                Invite Members
              </button>
            </div>
          )}

          {/* Tabs */}
          <div className="rounded-lg border border-linear-200 bg-white shadow-sm overflow-hidden">
            <div className="border-b border-linear-100 px-6">
              <div className="flex gap-6">
                <button
                  onClick={() => setActiveTab("members")}
                  className={`py-3 text-[13px] font-medium border-b-2 transition-colors ${
                    activeTab === "members"
                      ? 'border-linear-900 text-linear-900'
                      : 'border-transparent text-linear-500 hover:text-linear-900'
                  }`}
                >
                  Members
                  <span className="ml-2 px-1.5 py-0.5 rounded-full bg-linear-100 text-[10px] font-medium text-linear-700">
                    {squad.members?.length || 0}
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab("history")}
                  className={`py-3 text-[13px] font-medium border-b-2 transition-colors ${
                    activeTab === "history"
                      ? 'border-linear-900 text-linear-900'
                      : 'border-transparent text-linear-500 hover:text-linear-900'
                  }`}
                >
                  History
                </button>
                {isLeader && (
                  <button
                    onClick={() => setActiveTab("magic-link")}
                    className={`py-3 text-[13px] font-medium border-b-2 transition-colors ${
                      activeTab === "magic-link"
                        ? 'border-linear-900 text-linear-900'
                        : 'border-transparent text-linear-500 hover:text-linear-900'
                    }`}
                  >
                    Magic Link
                  </button>
                )}
              </div>
            </div>

            <div className="p-6">
              {/* Members Tab */}
              {activeTab === "members" && (
                <SquadRoster
                  members={squad.members || []}
                  leaderId={squad.leader_id}
                  isLeader={isLeader}
                />
              )}

              {/* History Tab */}
              {activeTab === "history" && (
                <ImpactTimeline entries={[]} />
              )}

              {/* Magic Link Tab */}
              {activeTab === "magic-link" && isLeader && (
                <MagicLinkGenerator
                  link={magicLink}
                  squadName={squad.name}
                  spotsReserved={0}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
