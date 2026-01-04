"use client";

import { useState } from "react";
import { useAuth } from "@/lib/stores/auth-store";
import { trpc } from "@/lib/utils/trpc";
import { OrgNavigation } from "@/components/org/org-navigation";
import { Users, UserPlus, Mail, MoreVertical, Shield, Eye, Trash2, Crown } from "lucide-react";
import { toast } from "sonner";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar_url?: string;
  role: "admin" | "manager" | "member";
  joined_at: string;
  last_active: string;
}

// Mock data
const mockTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@greenfuture.org",
    avatar_url: undefined,
    role: "admin",
    joined_at: "2024-01-15T10:00:00Z",
    last_active: "2024-03-10T15:30:00Z",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael@greenfuture.org",
    avatar_url: undefined,
    role: "manager",
    joined_at: "2024-02-01T10:00:00Z",
    last_active: "2024-03-09T14:20:00Z",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily@greenfuture.org",
    avatar_url: undefined,
    role: "member",
    joined_at: "2024-02-15T10:00:00Z",
    last_active: "2024-03-08T11:15:00Z",
  },
];

export default function OrgTeamPage() {
  const { currentPersona } = useAuth();
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<"admin" | "manager" | "member">("member");
  const [selectedMember, setSelectedMember] = useState<string | null>(null);

  const handleInvite = () => {
    toast.success(`Invitation sent to ${inviteEmail}`);
    setShowInviteModal(false);
    setInviteEmail("");
    setInviteRole("member");
  };

  const handleRemoveMember = (memberId: string) => {
    toast.success("Team member removed");
  };

  const handleChangeRole = (memberId: string, newRole: "admin" | "manager" | "member") => {
    toast.success("Role updated");
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-purple-100 text-purple-700">
            <Crown className="h-3 w-3" />
            Admin
          </span>
        );
      case "manager":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-blue-100 text-blue-700">
            <Shield className="h-3 w-3" />
            Manager
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-linear-100 text-linear-700">
            <Eye className="h-3 w-3" />
            Member
          </span>
        );
    }
  };

  const getRoleDescription = (role: string) => {
    switch (role) {
      case "admin":
        return "Full access to all settings and data";
      case "manager":
        return "Can manage opportunities and volunteers";
      default:
        return "View-only access to organization data";
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
            <h1 className="text-[16px] font-semibold text-linear-900">Team Members</h1>
            <span className="rounded-full bg-linear-100 px-2 py-0.5 text-[11px] font-medium text-linear-700">
              {mockTeamMembers.length}
            </span>
          </div>
          <button
            onClick={() => setShowInviteModal(true)}
            className="flex items-center gap-2 h-9 px-4 text-[13px] font-medium text-white bg-linear-900 hover:bg-black rounded-md transition-colors"
          >
            <UserPlus className="h-4 w-4" />
            Invite Member
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-6xl px-6 py-8">
          {/* Info Card */}
          <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
            <h3 className="text-[13px] font-semibold text-blue-900 mb-1">Team Member Roles</h3>
            <div className="space-y-1 text-[12px] text-blue-700">
              <p><strong>Admin:</strong> Full access to all settings, billing, and team management</p>
              <p><strong>Manager:</strong> Can manage opportunities, volunteers, and view reports</p>
              <p><strong>Member:</strong> View-only access to organization data</p>
            </div>
          </div>

          {/* Team Members List */}
          <div className="rounded-lg border border-linear-200 bg-white shadow-sm overflow-hidden">
            <div className="p-6 border-b border-linear-200">
              <h2 className="text-[14px] font-semibold text-linear-900">Team Members</h2>
              <p className="mt-1 text-[12px] text-linear-600">
                Manage your organization's team and their permissions
              </p>
            </div>

            <div className="divide-y divide-linear-100">
              {mockTeamMembers.map((member) => (
                <div key={member.id} className="p-5 hover:bg-linear-50 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-4 flex-1 min-w-0">
                      {/* Avatar */}
                      <div className="w-12 h-12 rounded-full bg-linear-100 flex items-center justify-center text-[16px] font-bold text-linear-700 overflow-hidden shrink-0">
                        {member.avatar_url ? (
                          <img src={member.avatar_url} alt="" className="w-full h-full object-cover" />
                        ) : (
                          member.name.substring(0, 2).toUpperCase()
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-[14px] font-semibold text-linear-900">{member.name}</h3>
                          {getRoleBadge(member.role)}
                        </div>
                        <p className="text-[12px] text-linear-600 mb-1">{member.email}</p>
                        <p className="text-[11px] text-linear-500">
                          Joined {new Date(member.joined_at).toLocaleDateString()} • Last active{" "}
                          {new Date(member.last_active).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="relative">
                      <button
                        onClick={() => setSelectedMember(selectedMember === member.id ? null : member.id)}
                        className="p-2 text-linear-500 hover:text-linear-900 hover:bg-linear-100 rounded transition-colors"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>

                      {/* Dropdown Menu */}
                      {selectedMember === member.id && (
                        <div className="absolute right-0 top-10 w-48 rounded-md border border-linear-200 bg-white shadow-lg z-10">
                          <div className="p-1">
                            <div className="px-3 py-2 text-[11px] font-medium text-linear-500 border-b border-linear-100">
                              Change Role
                            </div>
                            <button
                              onClick={() => handleChangeRole(member.id, "admin")}
                              disabled={member.role === "admin"}
                              className="w-full flex items-center gap-2 px-3 py-2 text-[12px] text-linear-900 hover:bg-linear-50 rounded transition-colors disabled:opacity-50"
                            >
                              <Crown className="h-3.5 w-3.5" />
                              Admin
                            </button>
                            <button
                              onClick={() => handleChangeRole(member.id, "manager")}
                              disabled={member.role === "manager"}
                              className="w-full flex items-center gap-2 px-3 py-2 text-[12px] text-linear-900 hover:bg-linear-50 rounded transition-colors disabled:opacity-50"
                            >
                              <Shield className="h-3.5 w-3.5" />
                              Manager
                            </button>
                            <button
                              onClick={() => handleChangeRole(member.id, "member")}
                              disabled={member.role === "member"}
                              className="w-full flex items-center gap-2 px-3 py-2 text-[12px] text-linear-900 hover:bg-linear-50 rounded transition-colors disabled:opacity-50"
                            >
                              <Eye className="h-3.5 w-3.5" />
                              Member
                            </button>
                            <div className="border-t border-linear-100 my-1"></div>
                            <button
                              onClick={() => handleRemoveMember(member.id)}
                              className="w-full flex items-center gap-2 px-3 py-2 text-[12px] text-red-600 hover:bg-red-50 rounded transition-colors"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              Remove
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-lg border border-linear-200 bg-white shadow-lg p-6">
            <h2 className="text-[16px] font-semibold text-linear-900 mb-4">Invite Team Member</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-[13px] font-medium text-linear-900 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="w-full h-9 px-3 text-[13px] border border-linear-200 rounded-md focus:outline-none focus:ring-2 focus:ring-linear-900 focus:border-transparent"
                  placeholder="colleague@example.com"
                />
              </div>

              <div>
                <label className="block text-[13px] font-medium text-linear-900 mb-1.5">
                  Role
                </label>
                <div className="space-y-2">
                  {["admin", "manager", "member"].map((role) => (
                    <label
                      key={role}
                      className="flex items-start gap-3 p-3 rounded-lg border border-linear-200 cursor-pointer hover:bg-linear-50 transition-colors"
                    >
                      <input
                        type="radio"
                        name="role"
                        value={role}
                        checked={inviteRole === role}
                        onChange={(e) => setInviteRole(e.target.value as typeof inviteRole)}
                        className="mt-0.5"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {getRoleBadge(role)}
                        </div>
                        <p className="text-[11px] text-linear-600">
                          {getRoleDescription(role)}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-2 justify-end">
              <button
                onClick={() => setShowInviteModal(false)}
                className="h-9 px-4 text-[13px] font-medium text-linear-700 hover:text-linear-900 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleInvite}
                disabled={!inviteEmail}
                className="h-9 px-4 text-[13px] font-medium text-white bg-linear-900 hover:bg-black rounded-md transition-colors disabled:opacity-50"
              >
                Send Invitation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
