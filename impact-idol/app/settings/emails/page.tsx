"use client";

import { useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function EmailPreferencesPage() {
  const [emailFrequency, setEmailFrequency] = useState("immediate");
  const [opportunityEmails, setOpportunityEmails] = useState(true);
  const [networkActivity, setNetworkActivity] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [monthlyNewsletter, setMonthlyNewsletter] = useState(true);
  const [productUpdates, setProductUpdates] = useState(false);

  const handleSave = () => {
    toast.success("Email preferences saved");
  };

  const Toggle = ({ checked, onChange, id, disabled }: { checked: boolean; onChange: (val: boolean) => void; id: string; disabled?: boolean }) => (
    <button
      id={id}
      onClick={() => onChange(!checked)}
      disabled={disabled}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${checked && !disabled ? "bg-[#22c55e]" : "bg-linear-300"}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );

  return (
    <div className="min-h-screen bg-[#fbfbfc]">
      {/* Header */}
      <div className="h-14 border-b border-linear-200 bg-white px-6 flex items-center">
        <div className="flex items-center gap-2 text-[11px] text-linear-600">
          <Link href="/settings" className="hover:text-linear-900">Settings</Link>
          <span>/</span>
          <span className="text-linear-900">Emails</span>
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
          <h1 className="mb-2 text-[20px] font-semibold text-linear-900">Email Preferences</h1>
          <p className="text-[12px] text-linear-600">
            Control what emails you receive and how often
          </p>
        </div>

        <div className="space-y-6">
          {/* Email Frequency */}
          <div className="rounded-lg border border-linear-200 bg-white shadow-sm">
            <div className="border-b border-linear-200 px-6 py-4">
              <h2 className="text-[13px] font-semibold text-linear-900">Email Frequency</h2>
              <p className="mt-1 text-[11px] text-linear-600">
                Choose how often you want to receive email updates
              </p>
            </div>
            <div className="p-6">
              <div className="relative">
                <select
                  value={emailFrequency}
                  onChange={(e) => setEmailFrequency(e.target.value)}
                  className="w-full h-9 appearance-none rounded-md border border-linear-200 bg-white px-3 pr-8 text-[13px] text-linear-900 focus:outline-none focus:ring-1 focus:ring-[#22c55e]"
                >
                  <option value="immediate">Immediate - As they happen</option>
                  <option value="daily">Daily Digest</option>
                  <option value="weekly">Weekly Summary</option>
                  <option value="never">Never - Unsubscribe from all</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg className="h-4 w-4 text-linear-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Opportunity Emails */}
          <div className="rounded-lg border border-linear-200 bg-white shadow-sm">
            <div className="border-b border-linear-200 px-6 py-4">
              <h2 className="text-[13px] font-semibold text-linear-900">Opportunity Emails</h2>
              <p className="mt-1 text-[11px] text-linear-600">
                Get notified about new volunteer opportunities
              </p>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label htmlFor="opportunity-emails" className="text-[12px] font-medium text-linear-900">
                    New Opportunities
                  </label>
                  <p className="text-[11px] text-linear-600">
                    Opportunities matching your interests
                  </p>
                </div>
                <Toggle
                  checked={opportunityEmails}
                  onChange={setOpportunityEmails}
                  id="opportunity-emails"
                  disabled={emailFrequency === "never"}
                />
              </div>
            </div>
          </div>

          {/* Network Activity */}
          <div className="rounded-lg border border-linear-200 bg-white shadow-sm">
            <div className="border-b border-linear-200 px-6 py-4">
              <h2 className="text-[13px] font-semibold text-linear-900">Network Activity</h2>
              <p className="mt-1 text-[11px] text-linear-600">
                Updates from your volunteer network
              </p>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label htmlFor="network-activity" className="text-[12px] font-medium text-linear-900">
                    Connection Activity
                  </label>
                  <p className="text-[11px] text-linear-600">
                    When your connections volunteer or earn achievements
                  </p>
                </div>
                <Toggle
                  checked={networkActivity}
                  onChange={setNetworkActivity}
                  id="network-activity"
                  disabled={emailFrequency === "never"}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label htmlFor="weekly-digest" className="text-[12px] font-medium text-linear-900">
                    Weekly Digest
                  </label>
                  <p className="text-[11px] text-linear-600">
                    Summary of your network's activity
                  </p>
                </div>
                <Toggle
                  checked={weeklyDigest}
                  onChange={setWeeklyDigest}
                  id="weekly-digest"
                  disabled={emailFrequency === "never"}
                />
              </div>
            </div>
          </div>

          {/* Updates & News */}
          <div className="rounded-lg border border-linear-200 bg-white shadow-sm">
            <div className="border-b border-linear-200 px-6 py-4">
              <h2 className="text-[13px] font-semibold text-linear-900">Updates & News</h2>
              <p className="mt-1 text-[11px] text-linear-600">
                Stay informed about Impact Idol
              </p>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label htmlFor="monthly-newsletter" className="text-[12px] font-medium text-linear-900">
                    Monthly Newsletter
                  </label>
                  <p className="text-[11px] text-linear-600">
                    Inspiring stories and volunteer spotlights
                  </p>
                </div>
                <Toggle
                  checked={monthlyNewsletter}
                  onChange={setMonthlyNewsletter}
                  id="monthly-newsletter"
                  disabled={emailFrequency === "never"}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label htmlFor="product-updates" className="text-[12px] font-medium text-linear-900">
                    Product Updates
                  </label>
                  <p className="text-[11px] text-linear-600">
                    New features and improvements
                  </p>
                </div>
                <Toggle
                  checked={productUpdates}
                  onChange={setProductUpdates}
                  id="product-updates"
                  disabled={emailFrequency === "never"}
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleSave}
            className="flex h-9 items-center gap-2 rounded-md bg-[#22c55e] px-4 text-[13px] font-medium text-white hover:bg-[#22c55e]/90 transition-colors"
          >
            <Save className="h-3.5 w-3.5" />
            Save Email Preferences
          </button>
        </div>
      </div>
    </div>
  );
}
