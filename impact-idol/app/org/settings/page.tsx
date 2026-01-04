"use client";

import { useState } from "react";
import { useAuth } from "@/lib/stores/auth-store";
import { trpc } from "@/lib/utils/trpc";
import { OrgNavigation } from "@/components/org/org-navigation";
import { Building2, Upload, Globe, MapPin, Mail, Phone, Palette, Users } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export default function OrgSettingsPage() {
  const { currentPersona } = useAuth();
  const [activeTab, setActiveTab] = useState<"profile" | "branding" | "contact" | "social">("profile");

  // Mock org data - replace with actual query
  const orgId = currentPersona?.organization_id || "demo-org";
  const { data: org, isLoading } = trpc.organizations.get.useQuery({ id: orgId });

  const [formData, setFormData] = useState({
    name: org?.name || "",
    description: org?.description || "",
    mission: org?.mission || "",
    location: org?.location || "",
    website: org?.website || "",
    email: org?.email || "",
    phone: org?.phone || "",
    logo_url: org?.logo_url || "",
    cover_photo: org?.cover_photo || "",
    primary_color: "#22c55e",
    twitter: "",
    facebook: "",
    instagram: "",
    linkedin: "",
  });

  const handleSave = () => {
    toast.success("Settings saved successfully");
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fbfbfc]">
        <div className="text-[13px] text-linear-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#fbfbfc]">
      {/* Navigation */}
      <OrgNavigation />

      {/* Page Header */}
      <div className="border-b border-linear-200 bg-white px-6 py-4">
        <div className="mx-auto max-w-6xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Building2 className="h-5 w-5 text-linear-600" />
            <h1 className="text-[16px] font-semibold text-linear-900">Organization Settings</h1>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={`/org/${orgId}`}
              className="px-3 py-1.5 text-[12px] font-medium text-linear-600 hover:text-linear-900 transition-colors"
            >
              View Public Profile
            </Link>
            <button
              onClick={handleSave}
              className="h-9 px-4 text-[13px] font-medium text-white bg-linear-900 hover:bg-black rounded-md transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <div className="grid gap-6 lg:grid-cols-12">
            {/* Sidebar Navigation */}
            <aside className="lg:col-span-3">
              <nav className="rounded-lg border border-linear-200 bg-white shadow-sm p-2">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-[13px] font-medium rounded transition-colors ${
                    activeTab === "profile"
                      ? "bg-linear-100 text-linear-900"
                      : "text-linear-600 hover:bg-linear-50"
                  }`}
                >
                  <Building2 className="h-4 w-4" />
                  Profile & Mission
                </button>
                <button
                  onClick={() => setActiveTab("branding")}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-[13px] font-medium rounded transition-colors ${
                    activeTab === "branding"
                      ? "bg-linear-100 text-linear-900"
                      : "text-linear-600 hover:bg-linear-50"
                  }`}
                >
                  <Palette className="h-4 w-4" />
                  Branding & Media
                </button>
                <button
                  onClick={() => setActiveTab("contact")}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-[13px] font-medium rounded transition-colors ${
                    activeTab === "contact"
                      ? "bg-linear-100 text-linear-900"
                      : "text-linear-600 hover:bg-linear-50"
                  }`}
                >
                  <Mail className="h-4 w-4" />
                  Contact Info
                </button>
                <button
                  onClick={() => setActiveTab("social")}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-[13px] font-medium rounded transition-colors ${
                    activeTab === "social"
                      ? "bg-linear-100 text-linear-900"
                      : "text-linear-600 hover:bg-linear-50"
                  }`}
                >
                  <Globe className="h-4 w-4" />
                  Social Links
                </button>
              </nav>
            </aside>

            {/* Main Content Area */}
            <main className="lg:col-span-9">
              <div className="rounded-lg border border-linear-200 bg-white shadow-sm p-6">
                {/* Profile & Mission Tab */}
                {activeTab === "profile" && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-[16px] font-semibold text-linear-900 mb-1">Profile & Mission</h2>
                      <p className="text-[12px] text-linear-600">
                        Help volunteers understand who you are and what you stand for
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-[13px] font-medium text-linear-900 mb-1.5">
                          Organization Name
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full h-9 px-3 text-[13px] border border-linear-200 rounded-md focus:outline-none focus:ring-2 focus:ring-linear-900 focus:border-transparent"
                          placeholder="Green Future SF"
                        />
                      </div>

                      <div>
                        <label className="block text-[13px] font-medium text-linear-900 mb-1.5">
                          Description
                        </label>
                        <textarea
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          rows={4}
                          className="w-full px-3 py-2 text-[13px] border border-linear-200 rounded-md focus:outline-none focus:ring-2 focus:ring-linear-900 focus:border-transparent resize-none"
                          placeholder="Tell volunteers about your organization..."
                        />
                        <p className="mt-1 text-[11px] text-linear-500">
                          This appears on your public profile
                        </p>
                      </div>

                      <div>
                        <label className="block text-[13px] font-medium text-linear-900 mb-1.5">
                          Mission Statement
                        </label>
                        <textarea
                          value={formData.mission}
                          onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
                          rows={3}
                          className="w-full px-3 py-2 text-[13px] border border-linear-200 rounded-md focus:outline-none focus:ring-2 focus:ring-linear-900 focus:border-transparent resize-none"
                          placeholder="What's your organization's mission?"
                        />
                      </div>

                      <div>
                        <label className="block text-[13px] font-medium text-linear-900 mb-1.5 flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5" />
                          Location
                        </label>
                        <input
                          type="text"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          className="w-full h-9 px-3 text-[13px] border border-linear-200 rounded-md focus:outline-none focus:ring-2 focus:ring-linear-900 focus:border-transparent"
                          placeholder="San Francisco, CA"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Branding & Media Tab */}
                {activeTab === "branding" && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-[16px] font-semibold text-linear-900 mb-1">Branding & Media</h2>
                      <p className="text-[12px] text-linear-600">
                        Customize your organization's visual identity
                      </p>
                    </div>

                    <div className="space-y-6">
                      {/* Logo Upload */}
                      <div>
                        <label className="block text-[13px] font-medium text-linear-900 mb-3">
                          Organization Logo
                        </label>
                        <div className="flex items-center gap-4">
                          <div className="h-20 w-20 rounded-lg border border-linear-200 bg-linear-50 flex items-center justify-center overflow-hidden">
                            {formData.logo_url ? (
                              <img src={formData.logo_url} alt="Logo" className="w-full h-full object-cover" />
                            ) : (
                              <Building2 className="h-8 w-8 text-linear-400" />
                            )}
                          </div>
                          <div className="flex-1">
                            <button className="flex items-center gap-2 h-9 px-4 text-[13px] font-medium text-linear-900 bg-white border border-linear-200 rounded-md hover:bg-linear-50 transition-colors">
                              <Upload className="h-4 w-4" />
                              Upload Logo
                            </button>
                            <p className="mt-1.5 text-[11px] text-linear-500">
                              Recommended: Square image, at least 200x200px
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Cover Photo Upload */}
                      <div>
                        <label className="block text-[13px] font-medium text-linear-900 mb-3">
                          Cover Photo
                        </label>
                        <div className="space-y-3">
                          <div className="h-32 w-full rounded-lg border border-linear-200 bg-linear-50 flex items-center justify-center overflow-hidden">
                            {formData.cover_photo ? (
                              <img src={formData.cover_photo} alt="Cover" className="w-full h-full object-cover" />
                            ) : (
                              <div className="text-center">
                                <Upload className="h-8 w-8 text-linear-400 mx-auto mb-2" />
                                <p className="text-[12px] text-linear-500">No cover photo</p>
                              </div>
                            )}
                          </div>
                          <button className="flex items-center gap-2 h-9 px-4 text-[13px] font-medium text-linear-900 bg-white border border-linear-200 rounded-md hover:bg-linear-50 transition-colors">
                            <Upload className="h-4 w-4" />
                            Upload Cover Photo
                          </button>
                          <p className="text-[11px] text-linear-500">
                            Recommended: 1200x400px, shows at the top of your profile
                          </p>
                        </div>
                      </div>

                      {/* Primary Color */}
                      <div>
                        <label className="block text-[13px] font-medium text-linear-900 mb-3">
                          Primary Color
                        </label>
                        <div className="flex items-center gap-3">
                          <input
                            type="color"
                            value={formData.primary_color}
                            onChange={(e) => setFormData({ ...formData, primary_color: e.target.value })}
                            className="h-9 w-16 cursor-pointer rounded border border-linear-200"
                          />
                          <input
                            type="text"
                            value={formData.primary_color}
                            onChange={(e) => setFormData({ ...formData, primary_color: e.target.value })}
                            className="h-9 px-3 text-[13px] border border-linear-200 rounded-md focus:outline-none focus:ring-2 focus:ring-linear-900 focus:border-transparent w-32"
                          />
                          <p className="text-[12px] text-linear-600">
                            Used for buttons and accents on your profile
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Contact Info Tab */}
                {activeTab === "contact" && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-[16px] font-semibold text-linear-900 mb-1">Contact Information</h2>
                      <p className="text-[12px] text-linear-600">
                        How volunteers can reach your organization
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-[13px] font-medium text-linear-900 mb-1.5 flex items-center gap-1.5">
                          <Globe className="h-3.5 w-3.5" />
                          Website
                        </label>
                        <input
                          type="url"
                          value={formData.website}
                          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                          className="w-full h-9 px-3 text-[13px] border border-linear-200 rounded-md focus:outline-none focus:ring-2 focus:ring-linear-900 focus:border-transparent"
                          placeholder="https://yourorg.org"
                        />
                      </div>

                      <div>
                        <label className="block text-[13px] font-medium text-linear-900 mb-1.5 flex items-center gap-1.5">
                          <Mail className="h-3.5 w-3.5" />
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full h-9 px-3 text-[13px] border border-linear-200 rounded-md focus:outline-none focus:ring-2 focus:ring-linear-900 focus:border-transparent"
                          placeholder="contact@yourorg.org"
                        />
                      </div>

                      <div>
                        <label className="block text-[13px] font-medium text-linear-900 mb-1.5 flex items-center gap-1.5">
                          <Phone className="h-3.5 w-3.5" />
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full h-9 px-3 text-[13px] border border-linear-200 rounded-md focus:outline-none focus:ring-2 focus:ring-linear-900 focus:border-transparent"
                          placeholder="(555) 123-4567"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Social Links Tab */}
                {activeTab === "social" && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-[16px] font-semibold text-linear-900 mb-1">Social Media Links</h2>
                      <p className="text-[12px] text-linear-600">
                        Connect your social media accounts
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-[13px] font-medium text-linear-900 mb-1.5">
                          Twitter/X
                        </label>
                        <input
                          type="url"
                          value={formData.twitter}
                          onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                          className="w-full h-9 px-3 text-[13px] border border-linear-200 rounded-md focus:outline-none focus:ring-2 focus:ring-linear-900 focus:border-transparent"
                          placeholder="https://twitter.com/yourorg"
                        />
                      </div>

                      <div>
                        <label className="block text-[13px] font-medium text-linear-900 mb-1.5">
                          Facebook
                        </label>
                        <input
                          type="url"
                          value={formData.facebook}
                          onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                          className="w-full h-9 px-3 text-[13px] border border-linear-200 rounded-md focus:outline-none focus:ring-2 focus:ring-linear-900 focus:border-transparent"
                          placeholder="https://facebook.com/yourorg"
                        />
                      </div>

                      <div>
                        <label className="block text-[13px] font-medium text-linear-900 mb-1.5">
                          Instagram
                        </label>
                        <input
                          type="url"
                          value={formData.instagram}
                          onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                          className="w-full h-9 px-3 text-[13px] border border-linear-200 rounded-md focus:outline-none focus:ring-2 focus:ring-linear-900 focus:border-transparent"
                          placeholder="https://instagram.com/yourorg"
                        />
                      </div>

                      <div>
                        <label className="block text-[13px] font-medium text-linear-900 mb-1.5">
                          LinkedIn
                        </label>
                        <input
                          type="url"
                          value={formData.linkedin}
                          onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                          className="w-full h-9 px-3 text-[13px] border border-linear-200 rounded-md focus:outline-none focus:ring-2 focus:ring-linear-900 focus:border-transparent"
                          placeholder="https://linkedin.com/company/yourorg"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
