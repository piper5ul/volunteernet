"use client";

import { useState } from "react";
import { Camera, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function OnboardingProfilePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    headline: "",
    location: "",
    bio: "",
    photoUrl: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.headline) {
      toast.error("Please fill in required fields");
      return;
    }

    toast.success("Profile saved!");
    router.push("/onboarding/interests");
  };

  const handlePhotoUpload = () => {
    toast.success("Photo upload would open here");
  };

  return (
    <div className="min-h-screen bg-[#fbfbfc]">
      {/* Header */}
      <div className="h-14 border-b border-linear-100 bg-white px-6 flex items-center">
        <div className="flex items-center gap-2 text-[11px] text-linear-500">
          <span>Onboarding</span>
          <span>/</span>
          <span className="text-linear-900">Profile</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          {/* Card */}
          <div className="rounded-lg border border-linear-200 bg-white shadow-sm">
            <div className="p-8">
              {/* Header */}
              <div className="mb-8 text-center">
                <h1 className="mb-2 text-[20px] font-semibold text-linear-900">
                  Set Up Your Profile
                </h1>
                <p className="text-[12px] text-linear-600">
                  Tell us about yourself and what you're passionate about
                </p>
              </div>

              {/* Progress Indicator */}
              <div className="mb-8">
                <div className="mb-2 flex justify-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-linear-200"></div>
                  <div className="h-2 w-2 rounded-full bg-peer-green"></div>
                  <div className="h-2 w-2 rounded-full bg-linear-200"></div>
                  <div className="h-2 w-2 rounded-full bg-linear-200"></div>
                </div>
                <p className="text-center text-[11px] text-linear-600">Step 2 of 4</p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Photo Upload */}
                <div className="flex flex-col items-center">
                  <div className="mb-3 flex h-24 w-24 items-center justify-center rounded-full bg-linear-100 text-[32px] font-medium text-linear-900">
                    {formData.photoUrl ? (
                      <img src={formData.photoUrl} alt="Profile" className="h-full w-full rounded-full object-cover" />
                    ) : (
                      <span>{formData.name ? formData.name[0].toUpperCase() : "?"}</span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={handlePhotoUpload}
                    className="flex h-8 items-center gap-2 rounded-md border border-linear-200 bg-white px-3 text-[12px] text-linear-900 hover:bg-linear-50 transition-colors"
                  >
                    <Camera className="h-3.5 w-3.5" />
                    Upload Photo
                  </button>
                  <p className="mt-1 text-[11px] text-linear-600">
                    Optional, but recommended
                  </p>
                </div>

                {/* Name */}
                <div>
                  <label htmlFor="name" className="block mb-1.5 text-[11px] font-medium text-linear-900">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full h-9 rounded-md border border-linear-200 bg-white px-3 text-[13px] text-linear-900 placeholder:text-linear-400 focus:outline-none focus:ring-2 focus:ring-linear-900 focus:border-transparent"
                  />
                </div>

                {/* Headline */}
                <div>
                  <label htmlFor="headline" className="block mb-1.5 text-[11px] font-medium text-linear-900">
                    Headline <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="headline"
                    type="text"
                    placeholder="e.g., Passionate Community Volunteer | Environmental Advocate"
                    value={formData.headline}
                    onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                    required
                    className="w-full h-9 rounded-md border border-linear-200 bg-white px-3 text-[13px] text-linear-900 placeholder:text-linear-400 focus:outline-none focus:ring-2 focus:ring-linear-900 focus:border-transparent"
                  />
                  <p className="mt-1 text-[11px] text-linear-600">
                    This appears below your name on your profile
                  </p>
                </div>

                {/* Location */}
                <div>
                  <label htmlFor="location" className="block mb-1.5 text-[11px] font-medium text-linear-900">
                    Location
                  </label>
                  <input
                    id="location"
                    type="text"
                    placeholder="e.g., San Francisco, CA"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full h-9 rounded-md border border-linear-200 bg-white px-3 text-[13px] text-linear-900 placeholder:text-linear-400 focus:outline-none focus:ring-2 focus:ring-linear-900 focus:border-transparent"
                  />
                </div>

                {/* Bio */}
                <div>
                  <label htmlFor="bio" className="block mb-1.5 text-[11px] font-medium text-linear-900">
                    About Me
                  </label>
                  <textarea
                    id="bio"
                    placeholder="Tell others about your volunteer experience and what causes you care about..."
                    rows={4}
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="w-full rounded-md border border-linear-200 bg-white px-3 py-2 text-[13px] text-linear-900 placeholder:text-linear-400 focus:outline-none focus:ring-2 focus:ring-linear-900 focus:border-transparent resize-none"
                  />
                  <p className="mt-1 text-[11px] text-linear-600">
                    {formData.bio.length}/500 characters
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Link
                    href="/onboarding/welcome"
                    className="flex h-9 flex-1 items-center justify-center gap-2 rounded-md border border-linear-200 bg-white text-[13px] text-linear-900 hover:bg-linear-50 transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </Link>
                  <button
                    type="submit"
                    className="flex h-9 flex-1 items-center justify-center gap-2 rounded-md bg-peer-green text-[13px] font-medium text-white hover:bg-green-600 transition-colors shadow-subtle"
                  >
                    Continue
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </form>

              {/* Skip */}
              <div className="mt-4 text-center">
                <Link
                  href="/onboarding/interests"
                  className="text-[12px] text-linear-600 hover:text-peer-green transition-colors"
                >
                  Skip for now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
