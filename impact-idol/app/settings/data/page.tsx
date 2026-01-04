"use client";

import { ArrowLeft, Download, Trash2, FileText, Shield } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function DataPrivacyPage() {
  const handleDownloadData = () => {
    toast.success("Your data will be emailed to you within 24 hours");
  };

  const handleDeleteAccount = () => {
    toast.error("This action is irreversible");
  };

  return (
    <div className="min-h-screen bg-[#fbfbfc]">
      {/* Header */}
      <div className="h-14 border-b border-linear-200 bg-white px-6 flex items-center">
        <div className="flex items-center gap-2 text-[11px] text-linear-600">
          <Link href="/settings" className="hover:text-linear-900">Settings</Link>
          <span>/</span>
          <span className="text-linear-900">Data & Privacy</span>
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
          <h1 className="mb-2 text-[20px] font-semibold text-linear-900">Data & Privacy</h1>
          <p className="text-[12px] text-linear-600">
            Download your data or delete your account
          </p>
        </div>

        <div className="space-y-6">
          {/* Download Data */}
          <div className="rounded-lg border border-linear-200 bg-white shadow-sm">
            <div className="border-b border-linear-200 px-6 py-4">
              <h2 className="text-[13px] font-semibold text-linear-900">Download Your Data</h2>
              <p className="mt-1 text-[11px] text-linear-600">
                Get a copy of all your information from Impact Idol
              </p>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-[12px] text-linear-600">
                We'll send you an email with a link to download your data. This includes:
              </p>
              <ul className="list-inside list-disc space-y-1 text-[12px] text-linear-600">
                <li>Profile information and settings</li>
                <li>Volunteer history and hours logged</li>
                <li>Messages and connections</li>
                <li>Photos and media you've uploaded</li>
                <li>Reviews and endorsements</li>
              </ul>
              <button
                onClick={handleDownloadData}
                className="flex h-9 items-center gap-2 rounded-md bg-[#22c55e] px-4 text-[13px] font-medium text-white hover:bg-[#22c55e]/90 transition-colors"
              >
                <Download className="h-3.5 w-3.5" />
                Request Data Download
              </button>
            </div>
          </div>

          {/* Data Portability */}
          <div className="rounded-lg border border-linear-200 bg-white shadow-sm">
            <div className="border-b border-linear-200 px-6 py-4">
              <h2 className="text-[13px] font-semibold text-linear-900">Data Portability</h2>
              <p className="mt-1 text-[11px] text-linear-600">
                Transfer your data to another service
              </p>
            </div>
            <div className="p-6">
              <p className="mb-4 text-[12px] text-linear-600">
                You have the right to receive your data in a structured, commonly used format
                that can be transferred to another service.
              </p>
              <button className="flex h-9 items-center gap-2 rounded-md border border-linear-200 bg-white px-4 text-[13px] text-linear-900 hover:bg-linear-50 transition-colors">
                <FileText className="h-3.5 w-3.5" />
                Export Data (JSON)
              </button>
            </div>
          </div>

          {/* Privacy Policy */}
          <div className="rounded-lg border border-linear-200 bg-white shadow-sm">
            <div className="border-b border-linear-200 px-6 py-4">
              <h2 className="text-[13px] font-semibold text-linear-900">Privacy & Security</h2>
              <p className="mt-1 text-[11px] text-linear-600">
                Learn how we protect your information
              </p>
            </div>
            <div className="p-6 space-y-3">
              <Link
                href="/privacy"
                className="flex h-9 w-full items-center gap-2 rounded-md border border-linear-200 bg-white px-4 text-[13px] text-linear-900 hover:bg-linear-50 transition-colors"
              >
                <Shield className="h-3.5 w-3.5" />
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="flex h-9 w-full items-center gap-2 rounded-md border border-linear-200 bg-white px-4 text-[13px] text-linear-900 hover:bg-linear-50 transition-colors"
              >
                <FileText className="h-3.5 w-3.5" />
                Terms of Service
              </Link>
            </div>
          </div>

          {/* Delete Account */}
          <div className="rounded-lg border border-red-200 bg-white shadow-sm">
            <div className="border-b border-red-200 px-6 py-4">
              <h2 className="text-[13px] font-semibold text-red-600">Delete Account</h2>
              <p className="mt-1 text-[11px] text-red-600">
                Permanently delete your account and all data
              </p>
            </div>
            <div className="p-6 space-y-4">
              <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                <h4 className="mb-2 text-[13px] font-semibold text-red-900">This action cannot be undone</h4>
                <p className="text-[12px] text-red-800">
                  Deleting your account will permanently remove:
                </p>
                <ul className="mt-2 list-inside list-disc space-y-1 text-[12px] text-red-800">
                  <li>All your profile information</li>
                  <li>Volunteer history and verified hours</li>
                  <li>Messages, connections, and endorsements</li>
                  <li>Photos and all other content</li>
                </ul>
              </div>

              <button
                onClick={handleDeleteAccount}
                className="flex h-9 items-center gap-2 rounded-md bg-red-600 px-4 text-[13px] font-medium text-white hover:bg-red-700 transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Delete My Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
