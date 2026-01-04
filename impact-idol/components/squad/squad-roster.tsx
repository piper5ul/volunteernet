import { Clock, Mail, Crown, UserX, CheckCircle2 } from "lucide-react";
import type { User } from "@/lib/types";

interface SquadRosterProps {
  members: Array<
    User & {
      role?: "leader" | "member";
      hours?: number;
      status?: "active" | "invited" | "guest";
    }
  >;
  leaderId: string;
  onRemoveMember?: (userId: string) => void;
  isLeader?: boolean;
}

export function SquadRoster({ members, leaderId, onRemoveMember, isLeader }: SquadRosterProps) {
  return (
    <div>
      <h3 className="mb-4 text-[14px] font-semibold text-linear-900">
        Squad Members ({members.length})
      </h3>
      <div className="space-y-2">
        {members.map((member) => {
          const isSquadLeader = member.id === leaderId;
          const memberName = member.name || "Unknown Member";
          const initials = memberName
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .substring(0, 2);

          return (
            <div
              key={member.id}
              className="flex items-center justify-between gap-4 rounded-lg border border-linear-200 bg-white p-4 hover:bg-linear-50 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="h-12 w-12 rounded-full bg-linear-100 flex items-center justify-center text-[14px] font-bold text-linear-700 overflow-hidden shrink-0">
                  {member.avatar_url ? (
                    <img src={member.avatar_url} alt={memberName} className="w-full h-full object-cover" />
                  ) : (
                    initials
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-[13px] font-semibold text-linear-900">{memberName}</p>
                    {isSquadLeader && (
                      <span className="px-1.5 py-0.5 rounded-md text-[10px] font-medium bg-amber-100 text-amber-700 border border-amber-200 flex items-center gap-1">
                        <Crown className="h-3 w-3" />
                        Leader
                      </span>
                    )}
                    {member.status === "guest" && (
                      <span className="px-1.5 py-0.5 rounded-md text-[10px] font-medium bg-linear-100 text-linear-700 border border-linear-200">
                        Guest
                      </span>
                    )}
                    {member.status === "invited" && (
                      <span className="px-1.5 py-0.5 rounded-md text-[10px] font-medium bg-blue-100 text-blue-700 border border-blue-200">
                        Invited
                      </span>
                    )}
                    {member.is_verified && (
                      <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
                    )}
                  </div>

                  <div className="mt-1 flex items-center gap-4 text-[11px] text-linear-500 flex-wrap">
                    {member.email && (
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {member.email}
                      </div>
                    )}
                    {member.hours !== undefined && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {member.hours} hours
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {isLeader && !isSquadLeader && onRemoveMember && (
                <button
                  onClick={() => onRemoveMember(member.id)}
                  className="p-2 hover:bg-linear-100 rounded-md text-linear-500 hover:text-red-600 transition-colors shrink-0"
                  title="Remove member"
                >
                  <UserX className="h-4 w-4" />
                </button>
              )}
            </div>
          );
        })}

        {members.length === 0 && (
          <div className="py-12 text-center rounded-lg border border-linear-200 bg-white">
            <p className="text-[12px] text-linear-500">No members yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
