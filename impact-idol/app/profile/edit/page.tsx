"use client";

import { useState, useEffect } from "react";
import { trpc } from "@/lib/utils/trpc";
import { useAuth } from "@/lib/stores/auth-store";
import { toast } from "sonner";
import { ArrowLeft, Upload, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AVAILABLE_SKILLS = [
  "Event Planning", "Marketing", "Social Media", "Graphic Design", "Photography",
  "Videography", "Writing", "Public Speaking", "Teaching", "Tutoring",
  "Mentoring", "Fundraising", "Grant Writing", "Web Development", "Data Analysis",
  "Project Management", "Translation", "Medical Skills", "Carpentry", "Gardening",
  "Cooking", "Childcare", "Elder Care", "Animal Care",
];

export default function EditProfilePage() {
  const { currentPersona } = useAuth();
  const router = useRouter();

  const userId =
    currentPersona.type === "volunteer" || currentPersona.type === "squad-leader"
      ? currentPersona.userId
      : null;

  const { data: user, isLoading } = trpc.users.get.useQuery(
    { id: userId! },
    { enabled: !!userId }
  );

  const updateMutation = trpc.users.update.useMutation({
    onSuccess: () => {
      toast.success("Profile Updated", {
        description: "Your changes have been saved successfully.",
      });
    },
    onError: (error) => {
      toast.error("Update Failed", { description: error.message });
    },
  });

  const [formData, setFormData] = useState({
    name: "",
    headline: "",
    bio: "",
    location: "",
    website_url: "",
    linkedin_url: "",
    skills_offered: [] as string[],
    skills_to_gain: [] as string[],
    causes_interested_in: [] as string[],
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        headline: user.headline || "",
        bio: user.bio || "",
        location: user.location || "",
        website_url: user.website_url || "",
        linkedin_url: user.linkedin_url || "",
        skills_offered: user.skills_offered || [],
        skills_to_gain: user.skills_to_gain || [],
        causes_interested_in: user.causes_interested_in || [],
      });
    }
  }, [user]);

  if (!userId || currentPersona.type === "guest") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fbfbfc]">
        <div className="text-center">
          <h1 className="mb-2 text-[20px] font-semibold text-linear-900">Login Required</h1>
          <p className="mb-4 text-[13px] text-linear-600">
            Please log in to edit your profile.
          </p>
          <Link
            href="/login"
            className="inline-flex h-9 items-center rounded-md bg-[#22c55e] px-4 text-[13px] font-medium text-white hover:bg-[#22c55e]/90"
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

    updateMutation.mutate({
      id: userId,
      data: formData,
    });
  };

  const toggleSkill = (skill: string, field: "skills_offered" | "skills_to_gain") => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(skill)
        ? prev[field].filter((s) => s !== skill)
        : [...prev[field], skill],
    }));
  };

  const initials = user?.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="min-h-screen bg-[#fbfbfc]">
      {/* Header */}
      <div className="h-14 border-b border-linear-200 bg-white px-6 flex items-center">
        <div className="flex items-center gap-2 text-[11px] text-linear-600">
          <Link href={`/profile/${user?.username}`} className="hover:text-linear-900">Profile</Link>
          <span>/</span>
          <span className="text-linear-900">Edit</span>
        </div>
      </div>

      <div className="container mx-auto max-w-3xl px-4 py-8">
        <div className="mb-6">
          <Link
            href={`/profile/${user?.username}`}
            className="inline-flex items-center gap-2 text-[12px] text-linear-600 hover:text-linear-900 mb-4"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Profile
          </Link>
          <h1 className="text-[20px] font-semibold text-linear-900">Edit Profile</h1>
          <p className="text-[12px] text-linear-600">Update your public profile information</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Photo */}
          <div className="rounded-lg border border-linear-200 bg-white shadow-sm">
            <div className="border-b border-linear-200 px-6 py-4">
              <h2 className="text-[13px] font-semibold text-linear-900">Profile Photo</h2>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-6">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-linear-100 text-[24px] font-medium text-linear-900">
                  {user?.avatar_url ? (
                    <img src={user.avatar_url} alt={user.name} className="h-24 w-24 rounded-full object-cover" />
                  ) : (
                    initials
                  )}
                </div>
                <div className="space-y-2">
                  <button
                    type="button"
                    className="flex h-8 items-center gap-2 rounded-md border border-linear-200 bg-white px-3 text-[12px] text-linear-900 hover:bg-linear-50"
                  >
                    <Upload className="h-3.5 w-3.5" />
                    Upload Photo
                  </button>
                  <p className="text-[11px] text-linear-500">
                    JPG, PNG or GIF. Max size 5MB.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="rounded-lg border border-linear-200 bg-white shadow-sm">
            <div className="border-b border-linear-200 px-6 py-4">
              <h2 className="text-[13px] font-semibold text-linear-900">Basic Information</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label htmlFor="name" className="block mb-1.5 text-[11px] font-medium text-linear-900">
                  Full Name *
                </label>
                <input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  required
                  className="w-full h-9 rounded-md border border-linear-200 bg-white px-3 text-[13px] text-linear-900 focus:outline-none focus:ring-1 focus:ring-[#22c55e]"
                />
              </div>

              <div>
                <label htmlFor="headline" className="block mb-1.5 text-[11px] font-medium text-linear-900">
                  Headline
                </label>
                <input
                  id="headline"
                  value={formData.headline}
                  onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                  placeholder="Passionate environmental advocate | 200+ hours volunteered"
                  maxLength={120}
                  className="w-full h-9 rounded-md border border-linear-200 bg-white px-3 text-[13px] text-linear-900 focus:outline-none focus:ring-1 focus:ring-[#22c55e]"
                />
                <p className="mt-1 text-[11px] text-linear-500">
                  A short tagline that appears below your name
                </p>
              </div>

              <div>
                <label htmlFor="bio" className="block mb-1.5 text-[11px] font-medium text-linear-900">
                  Bio
                </label>
                <textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Tell people about yourself, your volunteer interests, and what motivates you to give back..."
                  rows={5}
                  maxLength={500}
                  className="w-full rounded-md border border-linear-200 bg-white px-3 py-2 text-[13px] text-linear-900 focus:outline-none focus:ring-1 focus:ring-[#22c55e]"
                />
                <p className="mt-1 text-[11px] text-linear-500">
                  {formData.bio.length}/500 characters
                </p>
              </div>

              <div>
                <label htmlFor="location" className="block mb-1.5 text-[11px] font-medium text-linear-900">
                  Location
                </label>
                <input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="San Francisco, CA"
                  className="w-full h-9 rounded-md border border-linear-200 bg-white px-3 text-[13px] text-linear-900 focus:outline-none focus:ring-1 focus:ring-[#22c55e]"
                />
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="rounded-lg border border-linear-200 bg-white shadow-sm">
            <div className="border-b border-linear-200 px-6 py-4">
              <h2 className="text-[13px] font-semibold text-linear-900">Links</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label htmlFor="website" className="block mb-1.5 text-[11px] font-medium text-linear-900">
                  Website
                </label>
                <input
                  id="website"
                  type="url"
                  value={formData.website_url}
                  onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                  placeholder="https://yourwebsite.com"
                  className="w-full h-9 rounded-md border border-linear-200 bg-white px-3 text-[13px] text-linear-900 focus:outline-none focus:ring-1 focus:ring-[#22c55e]"
                />
              </div>

              <div>
                <label htmlFor="linkedin" className="block mb-1.5 text-[11px] font-medium text-linear-900">
                  LinkedIn
                </label>
                <input
                  id="linkedin"
                  type="url"
                  value={formData.linkedin_url}
                  onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                  placeholder="https://linkedin.com/in/yourprofile"
                  className="w-full h-9 rounded-md border border-linear-200 bg-white px-3 text-[13px] text-linear-900 focus:outline-none focus:ring-1 focus:ring-[#22c55e]"
                />
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="rounded-lg border border-linear-200 bg-white shadow-sm">
            <div className="border-b border-linear-200 px-6 py-4">
              <h2 className="text-[13px] font-semibold text-linear-900">Skills I Can Offer</h2>
            </div>
            <div className="p-6">
              <p className="mb-4 text-[12px] text-linear-600">
                Select skills you can contribute during volunteer opportunities
              </p>
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_SKILLS.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => toggleSkill(skill, "skills_offered")}
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] cursor-pointer transition-colors ${
                      formData.skills_offered.includes(skill)
                        ? "bg-[#22c55e] text-white"
                        : "border border-linear-200 bg-white text-linear-900 hover:bg-linear-50"
                    }`}
                  >
                    {skill}
                    {formData.skills_offered.includes(skill) && (
                      <X className="h-3 w-3" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-linear-200 bg-white shadow-sm">
            <div className="border-b border-linear-200 px-6 py-4">
              <h2 className="text-[13px] font-semibold text-linear-900">Skills I Want to Gain</h2>
            </div>
            <div className="p-6">
              <p className="mb-4 text-[12px] text-linear-600">
                Select skills you'd like to learn or develop through volunteering
              </p>
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_SKILLS.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => toggleSkill(skill, "skills_to_gain")}
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] cursor-pointer transition-colors ${
                      formData.skills_to_gain.includes(skill)
                        ? "bg-[#22c55e] text-white"
                        : "border border-linear-200 bg-white text-linear-900 hover:bg-linear-50"
                    }`}
                  >
                    {skill}
                    {formData.skills_to_gain.includes(skill) && (
                      <X className="h-3.5 w-3.5" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between gap-4 border-t border-linear-200 bg-white p-4 sticky bottom-0">
            <Link
              href={`/profile/${user?.username}`}
              className="h-9 rounded-md border border-linear-200 bg-white px-4 text-[13px] text-linear-900 hover:bg-linear-50 inline-flex items-center"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={updateMutation.isPending}
              className="h-9 rounded-md bg-[#22c55e] px-4 text-[13px] font-medium text-white hover:bg-[#22c55e]/90 disabled:opacity-50"
            >
              {updateMutation.isPending ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
