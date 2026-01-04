"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { trpc } from "@/lib/utils/trpc";
import { useAuth } from "@/lib/stores/auth-store";
import { toast } from "sonner";
import { ArrowLeft, Users, Briefcase, GraduationCap, Heart, Home } from "lucide-react";
import Link from "next/link";

const SQUAD_TYPES = [
  {
    value: "corporate",
    label: "Corporate Team",
    description: "Company volunteer program or team building",
    icon: Briefcase,
  },
  {
    value: "school",
    label: "School/University",
    description: "Student clubs, classes, or campus groups",
    icon: GraduationCap,
  },
  {
    value: "social",
    label: "Social Group",
    description: "Friends, clubs, or community organizations",
    icon: Users,
  },
  {
    value: "family",
    label: "Family",
    description: "Family members volunteering together",
    icon: Home,
  },
  {
    value: "other",
    label: "Other",
    description: "Any other type of group",
    icon: Heart,
  },
] as const;

export default function CreateSquadPage() {
  const router = useRouter();
  const { currentPersona } = useAuth();

  const userId =
    currentPersona.type === "volunteer" || currentPersona.type === "squad-leader"
      ? currentPersona.userId
      : null;

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "social" as "corporate" | "school" | "social" | "family" | "other",
  });

  const createMutation = trpc.squads.create.useMutation({
    onSuccess: (data) => {
      toast.success("Squad Created!", {
        description: "Your squad has been created successfully.",
      });
      router.push(`/squads/${data.id}`);
    },
    onError: (error) => {
      toast.error("Creation Failed", { description: error.message });
    },
  });

  if (!userId || currentPersona.type === "guest") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fbfbfc]">
        <div className="text-center">
          <h1 className="mb-2 text-[20px] font-semibold text-linear-900">Login Required</h1>
          <p className="mb-4 text-[13px] text-linear-600">
            Please log in to create a squad.
          </p>
          <Link
            href="/login"
            className="inline-flex h-8 items-center justify-center rounded-md bg-[#22c55e] px-4 text-[13px] font-medium text-white hover:bg-[#16a34a]"
          >
            Log In
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;

    createMutation.mutate({
      ...formData,
      leader_id: userId,
    });
  };

  return (
    <div className="min-h-screen bg-[#fbfbfc]">
      {/* Header */}
      <div className="h-14 border-b border-linear-200 bg-white px-6 flex items-center gap-3">
        <Link href="/squads" className="flex items-center gap-2 text-[13px] text-linear-600 hover:text-linear-900">
          <ArrowLeft className="h-4 w-4" />
          <span>Squads</span>
        </Link>
        <span className="text-[13px] text-linear-400">/</span>
        <span className="text-[13px] text-linear-900 font-medium">Create Squad</span>
      </div>

      <div className="mx-auto max-w-2xl px-6 py-8">
        <div className="mb-6">
          <h1 className="text-[20px] font-semibold text-linear-900 mb-1">Create a Squad</h1>
          <p className="text-[13px] text-linear-600">
            Set up a group to volunteer together
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="rounded-lg border border-linear-200 bg-white shadow-sm p-6">
            <h2 className="text-[14px] font-semibold text-linear-900 mb-4">Squad Information</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-[12px] font-medium text-linear-900 mb-2">
                  Squad Name *
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Acme Corp Volunteers, Smith Family, Tech Club"
                  required
                  maxLength={100}
                  className="w-full h-9 rounded-md border border-linear-200 bg-white px-3 text-[13px] text-linear-900 placeholder:text-linear-400 focus:outline-none focus:ring-1 focus:ring-[#22c55e] focus:border-[#22c55e]"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-[12px] font-medium text-linear-900 mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Tell us about your squad and what motivates you to volunteer together..."
                  rows={4}
                  maxLength={500}
                  className="w-full rounded-md border border-linear-200 bg-white px-3 py-2 text-[13px] text-linear-900 placeholder:text-linear-400 focus:outline-none focus:ring-1 focus:ring-[#22c55e] focus:border-[#22c55e] resize-none"
                />
                <p className="mt-1 text-[11px] text-linear-500">
                  {formData.description.length}/500 characters
                </p>
              </div>
            </div>
          </div>

          {/* Squad Type */}
          <div className="rounded-lg border border-linear-200 bg-white shadow-sm p-6">
            <h2 className="text-[14px] font-semibold text-linear-900 mb-4">Squad Type</h2>
            <div className="space-y-3">
              {SQUAD_TYPES.map((type) => {
                const Icon = type.icon;
                return (
                  <label
                    key={type.value}
                    htmlFor={type.value}
                    className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors hover:bg-[#fbfbfc] ${
                      formData.type === type.value
                        ? "border-[#22c55e] bg-[#22c55e]/5"
                        : "border-linear-200"
                    }`}
                  >
                    <input
                      type="radio"
                      id={type.value}
                      name="squadType"
                      value={type.value}
                      checked={formData.type === type.value}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value as typeof formData.type })}
                      className="mt-1 h-4 w-4 text-[#22c55e] focus:ring-[#22c55e]"
                    />
                    <Icon className="mt-0.5 h-5 w-5 text-linear-600" />
                    <div className="flex-1">
                      <p className="text-[13px] font-medium text-linear-900">{type.label}</p>
                      <p className="text-[12px] text-linear-600">{type.description}</p>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* What's Next */}
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
            <h3 className="mb-2 text-[13px] font-semibold text-blue-900">What happens next?</h3>
            <ul className="space-y-2 text-[12px] text-blue-800">
              <li className="flex items-start gap-2">
                <span>1.</span>
                <span>Your squad will be created and you'll be the leader</span>
              </li>
              <li className="flex items-start gap-2">
                <span>2.</span>
                <span>Find volunteer opportunities and book spots for your squad</span>
              </li>
              <li className="flex items-start gap-2">
                <span>3.</span>
                <span>Get a magic link to share with your team members</span>
              </li>
              <li className="flex items-start gap-2">
                <span>4.</span>
                <span>
                  Team members can register with just their name and email - no account needed!
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span>5.</span>
                <span>Track your squad's collective impact</span>
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/squads"
              className="inline-flex h-9 items-center justify-center rounded-md border border-linear-200 bg-white px-4 text-[13px] font-medium text-linear-900 hover:bg-[#fbfbfc]"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={createMutation.isPending || !formData.name}
              className="inline-flex h-9 items-center justify-center rounded-md bg-[#22c55e] px-4 text-[13px] font-medium text-white hover:bg-[#16a34a] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {createMutation.isPending ? "Creating..." : "Create Squad"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
