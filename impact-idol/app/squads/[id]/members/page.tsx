"use client";

import { use, useState } from "react";
import { trpc } from "@/lib/utils/trpc";
import { useAuth } from "@/lib/stores/auth-store";
import { Users, Search, UserPlus, Crown, MoreVertical, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function SquadMembersPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { currentPersona } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [showMenu, setShowMenu] = useState<string | null>(null);

  const { data: squad, isLoading: squadLoading } = trpc.squads.getById.useQuery({ squadId: id });
  const { data: members, isLoading: membersLoading } = trpc.squads.getMembers.useQuery({
    squadId: id,
  });

  const removeMemberMutation = trpc.squads.removeMember.useMutation({
    onSuccess: () => {
      toast.success("Member removed from squad");
    },
  });

  const makeLeaderMutation = trpc.squads.makeLeader.useMutation({
    onSuccess: () => {
      toast.success("Member promoted to leader");
    },
  });

  const handleRemoveMember = (userId: string) => {
    if (confirm("Are you sure you want to remove this member?")) {
      removeMemberMutation.mutate({ squadId: id, userId });
    }
  };

  const handleMakeLeader = (userId: string) => {
    if (confirm("Transfer squad leadership to this member?")) {
      makeLeaderMutation.mutate({ squadId: id, userId });
    }
  };

  if (squadLoading || membersLoading) {
    return (
      <div className="min-h-screen bg-[#fbfbfc]">
        <div className="h-14 border-b border-linear-200 bg-white px-6 flex items-center">
          <div className="h-4 w-32 bg-linear-200 rounded animate-pulse"></div>
        </div>
        <div className="mx-auto max-w-4xl px-6 py-8">
          <div className="h-96 bg-white rounded-lg border border-linear-200"></div>
        </div>
      </div>
    );
  }

  if (!squad) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fbfbfc]">
        <div className="text-center">
          <h1 className="mb-2 text-[20px] font-semibold text-linear-900">Squad Not Found</h1>
          <Link
            href="/squads"
            className="inline-flex h-8 items-center justify-center rounded-md bg-[#22c55e] px-4 text-[13px] font-medium text-white hover:bg-[#16a34a]"
          >
            Back to Squads
          </Link>
        </div>
      </div>
    );
  }

  const isLeader =
    currentPersona.type === "squad-leader" &&
    currentPersona.squadId === id;

  const filteredMembers = (members || []).filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#fbfbfc]">
      {/* Header */}
      <div className="h-14 border-b border-linear-200 bg-white px-6 flex items-center gap-3">
        <Link href={`/squads/${id}`} className="flex items-center gap-2 text-[13px] text-linear-600 hover:text-linear-900">
          <ArrowLeft className="h-4 w-4" />
          <span>{squad.name}</span>
        </Link>
        <span className="text-[13px] text-linear-400">/</span>
        <span className="text-[13px] text-linear-900 font-medium">Members</span>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-8">
        {/* Title and Actions */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-[20px] font-semibold text-linear-900 mb-1">Squad Members</h1>
            <p className="text-[13px] text-linear-600">
              {filteredMembers.length} member{filteredMembers.length !== 1 ? "s" : ""}
            </p>
          </div>
          {isLeader && (
            <Link
              href={`/squads/${id}/invite`}
              className="inline-flex h-8 items-center justify-center gap-2 rounded-md bg-[#22c55e] px-4 text-[13px] font-medium text-white hover:bg-[#16a34a]"
            >
              <UserPlus className="h-4 w-4" />
              Invite Members
            </Link>
          )}
        </div>

        {/* Search */}
        <div className="mb-6 rounded-lg border border-linear-200 bg-white shadow-sm p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-linear-500" />
            <input
              placeholder="Search members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 rounded-md border border-linear-200 bg-white pl-9 pr-3 text-[13px] text-linear-900 placeholder:text-linear-400 focus:outline-none focus:ring-1 focus:ring-[#22c55e] focus:border-[#22c55e]"
            />
          </div>
        </div>

        {/* Members Grid */}
        {filteredMembers.length === 0 ? (
          <div className="rounded-lg border border-linear-200 bg-white shadow-sm py-12 text-center">
            <Users className="mx-auto mb-4 h-12 w-12 text-linear-400" />
            <p className="text-[13px] text-linear-600">
              {searchQuery ? "No members found" : "No members yet"}
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {filteredMembers.map((member) => (
              <div key={member.id} className="rounded-lg border border-linear-200 bg-white shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <Link href={`/profile/${member.username}`}>
                      <div className="h-14 w-14 rounded-full bg-linear-200 flex items-center justify-center text-[18px] font-semibold text-linear-600 cursor-pointer hover:bg-linear-300">
                        {member.avatar_url ? (
                          <img src={member.avatar_url} alt={member.name} className="h-14 w-14 rounded-full object-cover" />
                        ) : (
                          member.name[0]
                        )}
                      </div>
                    </Link>

                    <div className="flex-1 min-w-0">
                      <div className="mb-1 flex items-center gap-2">
                        <Link href={`/profile/${member.username}`}>
                          <h3 className="text-[13px] font-semibold text-linear-900 hover:text-[#22c55e] truncate">{member.name}</h3>
                        </Link>
                        {member.role === "leader" && (
                          <Crown className="h-4 w-4 text-yellow-600 flex-shrink-0" />
                        )}
                      </div>
                      {member.headline && (
                        <p className="line-clamp-1 text-[12px] text-linear-600">
                          {member.headline}
                        </p>
                      )}
                    </div>
                  </div>

                  {isLeader && member.role !== "leader" && (
                    <div className="relative">
                      <button
                        onClick={() => setShowMenu(showMenu === member.id ? null : member.id)}
                        className="h-8 w-8 rounded-md hover:bg-[#fbfbfc] flex items-center justify-center text-linear-600"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>
                      {showMenu === member.id && (
                        <div className="absolute right-0 top-full mt-1 w-48 rounded-lg border border-linear-200 bg-white shadow-lg py-1 z-10">
                          <button
                            onClick={() => {
                              handleMakeLeader(member.id);
                              setShowMenu(null);
                            }}
                            className="w-full px-4 py-2 text-left text-[13px] text-linear-900 hover:bg-[#fbfbfc]"
                          >
                            Make Leader
                          </button>
                          <button
                            onClick={() => {
                              handleRemoveMember(member.id);
                              setShowMenu(null);
                            }}
                            className="w-full px-4 py-2 text-left text-[13px] text-red-600 hover:bg-red-50"
                          >
                            Remove Member
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Member Stats */}
                <div className="mt-4 flex gap-4 border-t border-linear-200 pt-3 text-center">
                  <div className="flex-1">
                    <p className="text-[14px] font-semibold text-linear-900">{member.hoursContributed || 0}</p>
                    <p className="text-[11px] text-linear-600">Hours</p>
                  </div>
                  <div className="flex-1 border-l border-linear-200">
                    <p className="text-[14px] font-semibold text-linear-900">{member.eventsAttended || 0}</p>
                    <p className="text-[11px] text-linear-600">Events</p>
                  </div>
                </div>

                {member.joinedAt && (
                  <p className="mt-3 text-[11px] text-center text-linear-500">
                    Joined {new Date(member.joinedAt).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
