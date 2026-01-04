"use client";

import { useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function PrivacySettingsPage() {
  const [profileVisibility, setProfileVisibility] = useState("public");
  const [activityVisibility, setActivityVisibility] = useState("connections");
  const [searchEngineIndexing, setSearchEngineIndexing] = useState(true);
  const [showEmail, setShowEmail] = useState(false);
  const [showLocation, setShowLocation] = useState(true);
  const [connectionRequests, setConnectionRequests] = useState("everyone");

  const handleSave = () => {
    toast.success("Privacy settings saved");
  };

  return (
    <div className="min-h-screen bg-[#fbfbfc]">
      {/* Header */}
      <div className="h-14 border-b border-linear-200 bg-white px-6 flex items-center">
        <div className="flex items-center gap-2 text-[11px] text-linear-600">
          <Link href="/settings" className="hover:text-linear-900">Settings</Link>
          <span>/</span>
          <span className="text-linear-900">Privacy</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-4xl px-4 py-6">
        <Link
          href="/settings"
          className="mb-4 inline-flex items-center gap-2 text-[12px] text-linear-600 hover:text-linear-900 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Settings
        </Link>

        <div className="mb-6">
          <h1 className="mb-2 text-[20px] font-semibold text-linear-900">Privacy Settings</h1>
          <p className="text-[12px] text-linear-600">
            Control who can see your profile and activity
          </p>
        </div>

        <div className="space-y-6">
          {/* Profile Visibility */}
          <div className="rounded-lg border border-linear-200 bg-white shadow-sm">
            <div className="border-b border-linear-200 px-6 py-4">
              <h2 className="text-[13px] font-semibold text-linear-900">Profile Visibility</h2>
              <p className="mt-1 text-[11px] text-linear-600">
                Choose who can view your profile
              </p>
            </div>
            <div className="p-6">
              <div className="relative">
                <select
                  value={profileVisibility}
                  onChange={(e) => setProfileVisibility(e.target.value)}
                  className="w-full h-9 appearance-none rounded-md border border-linear-200 bg-white px-3 pr-8 text-[13px] text-linear-900 focus:outline-none focus:ring-1 focus:ring-[#22c55e]"
                >
                  <option value="public">Public - Anyone can view</option>
                  <option value="connections">Connections Only</option>
                  <option value="private">Private - Only you</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg className="h-4 w-4 text-linear-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Visibility */}
          <div className="rounded-lg border border-linear-200 bg-white shadow-sm">
            <div className="border-b border-linear-200 px-6 py-4">
              <h2 className="text-[13px] font-semibold text-linear-900">Activity Visibility</h2>
              <p className="mt-1 text-[11px] text-linear-600">
                Control who can see your volunteer activity
              </p>
            </div>
            <div className="p-6">
              <div className="relative">
                <select
                  value={activityVisibility}
                  onChange={(e) => setActivityVisibility(e.target.value)}
                  className="w-full h-9 appearance-none rounded-md border border-linear-200 bg-white px-3 pr-8 text-[13px] text-linear-900 focus:outline-none focus:ring-1 focus:ring-[#22c55e]"
                >
                  <option value="public">Everyone</option>
                  <option value="connections">Connections Only</option>
                  <option value="private">Only Me</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg className="h-4 w-4 text-linear-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Connection Requests */}
          <div className="rounded-lg border border-linear-200 bg-white shadow-sm">
            <div className="border-b border-linear-200 px-6 py-4">
              <h2 className="text-[13px] font-semibold text-linear-900">Connection Requests</h2>
              <p className="mt-1 text-[11px] text-linear-600">
                Who can send you connection requests
              </p>
            </div>
            <div className="p-6">
              <div className="relative">
                <select
                  value={connectionRequests}
                  onChange={(e) => setConnectionRequests(e.target.value)}
                  className="w-full h-9 appearance-none rounded-md border border-linear-200 bg-white px-3 pr-8 text-[13px] text-linear-900 focus:outline-none focus:ring-1 focus:ring-[#22c55e]"
                >
                  <option value="everyone">Everyone</option>
                  <option value="connections-of-connections">Connections of my connections</option>
                  <option value="none">No one</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg className="h-4 w-4 text-linear-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <div className="rounded-lg border border-linear-200 bg-white shadow-sm">
            <div className="border-b border-linear-200 px-6 py-4">
              <h2 className="text-[13px] font-semibold text-linear-900">Profile Information</h2>
              <p className="mt-1 text-[11px] text-linear-600">
                Choose what information to display on your profile
              </p>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label htmlFor="show-email" className="text-[12px] font-medium text-linear-900">
                    Show Email
                  </label>
                  <p className="text-[11px] text-linear-600">
                    Display your email address on your profile
                  </p>
                </div>
                <button
                  id="show-email"
                  onClick={() => setShowEmail(!showEmail)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    showEmail ? "bg-[#22c55e]" : "bg-linear-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      showEmail ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label htmlFor="show-location" className="text-[12px] font-medium text-linear-900">
                    Show Location
                  </label>
                  <p className="text-[11px] text-linear-600">
                    Display your city/region on your profile
                  </p>
                </div>
                <button
                  id="show-location"
                  onClick={() => setShowLocation(!showLocation)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    showLocation ? "bg-[#22c55e]" : "bg-linear-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      showLocation ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Search Engines */}
          <div className="rounded-lg border border-linear-200 bg-white shadow-sm">
            <div className="border-b border-linear-200 px-6 py-4">
              <h2 className="text-[13px] font-semibold text-linear-900">Search Engine Indexing</h2>
              <p className="mt-1 text-[11px] text-linear-600">
                Allow search engines to index your profile
              </p>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label htmlFor="search-indexing" className="text-[12px] font-medium text-linear-900">
                    Allow Indexing
                  </label>
                  <p className="text-[11px] text-linear-600">
                    Your profile may appear in Google and other search engines
                  </p>
                </div>
                <button
                  id="search-indexing"
                  onClick={() => setSearchEngineIndexing(!searchEngineIndexing)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    searchEngineIndexing ? "bg-[#22c55e]" : "bg-linear-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      searchEngineIndexing ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={handleSave}
            className="flex h-9 items-center gap-2 rounded-md bg-[#22c55e] px-4 text-[13px] font-medium text-white hover:bg-[#22c55e]/90 transition-colors"
          >
            <Save className="h-3.5 w-3.5" />
            Save Privacy Settings
          </button>
        </div>
      </div>
    </div>
  );
}
