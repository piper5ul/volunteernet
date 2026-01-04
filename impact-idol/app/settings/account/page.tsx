"use client";

import { useState } from "react";
import { useAuth } from "@/lib/stores/auth-store";
import { ArrowLeft, Save, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function AccountSettingsPage() {
  const { currentPersona } = useAuth();
  const [email, setEmail] = useState("sarah.chen@example.com");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSaveEmail = () => {
    toast.success("Email updated successfully");
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    toast.success("Password changed successfully");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="min-h-screen bg-[#fbfbfc]">
      {/* Header */}
      <div className="h-14 border-b border-linear-200 bg-white px-6 flex items-center">
        <div className="flex items-center gap-2 text-[11px] text-linear-600">
          <Link href="/settings" className="hover:text-linear-900">Settings</Link>
          <span>/</span>
          <span className="text-linear-900">Account</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-4xl px-4 py-6">
        {/* Back Button */}
        <Link
          href="/settings"
          className="mb-4 inline-flex items-center gap-2 text-[12px] text-linear-600 hover:text-linear-900 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Settings
        </Link>

        {/* Page Header */}
        <div className="mb-6">
          <h1 className="mb-2 text-[20px] font-semibold text-linear-900">Account Settings</h1>
          <p className="text-[12px] text-linear-600">
            Manage your account details and security
          </p>
        </div>

        {/* Email Settings */}
        <div className="mb-6 rounded-lg border border-linear-200 bg-white shadow-sm">
          <div className="border-b border-linear-200 px-6 py-4">
            <h2 className="text-[13px] font-semibold text-linear-900">Email Address</h2>
            <p className="mt-1 text-[11px] text-linear-600">
              Your email address is used for login and notifications
            </p>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label htmlFor="email" className="block mb-1.5 text-[11px] font-medium text-linear-900">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-9 rounded-md border border-linear-200 bg-white px-3 text-[13px] text-linear-900 focus:outline-none focus:ring-1 focus:ring-[#22c55e]"
              />
            </div>
            <button
              onClick={handleSaveEmail}
              className="flex h-9 items-center gap-2 rounded-md bg-[#22c55e] px-4 text-[13px] font-medium text-white hover:bg-[#22c55e]/90 transition-colors"
            >
              <Save className="h-3.5 w-3.5" />
              Save Email
            </button>
          </div>
        </div>

        {/* Password Settings */}
        <div className="mb-6 rounded-lg border border-linear-200 bg-white shadow-sm">
          <div className="border-b border-linear-200 px-6 py-4">
            <h2 className="text-[13px] font-semibold text-linear-900">Change Password</h2>
            <p className="mt-1 text-[11px] text-linear-600">
              Update your password to keep your account secure
            </p>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label htmlFor="current-password" className="block mb-1.5 text-[11px] font-medium text-linear-900">
                Current Password
              </label>
              <input
                id="current-password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full h-9 rounded-md border border-linear-200 bg-white px-3 text-[13px] text-linear-900 focus:outline-none focus:ring-1 focus:ring-[#22c55e]"
              />
            </div>
            <div>
              <label htmlFor="new-password" className="block mb-1.5 text-[11px] font-medium text-linear-900">
                New Password
              </label>
              <input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full h-9 rounded-md border border-linear-200 bg-white px-3 text-[13px] text-linear-900 focus:outline-none focus:ring-1 focus:ring-[#22c55e]"
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="block mb-1.5 text-[11px] font-medium text-linear-900">
                Confirm New Password
              </label>
              <input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full h-9 rounded-md border border-linear-200 bg-white px-3 text-[13px] text-linear-900 focus:outline-none focus:ring-1 focus:ring-[#22c55e]"
              />
            </div>
            <button
              onClick={handleChangePassword}
              className="flex h-9 items-center gap-2 rounded-md bg-[#22c55e] px-4 text-[13px] font-medium text-white hover:bg-[#22c55e]/90 transition-colors"
            >
              <Save className="h-3.5 w-3.5" />
              Change Password
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="rounded-lg border border-red-200 bg-white shadow-sm">
          <div className="border-b border-red-200 px-6 py-4">
            <h2 className="text-[13px] font-semibold text-red-600">Danger Zone</h2>
            <p className="mt-1 text-[11px] text-red-600/80">
              Irreversible actions that will affect your account
            </p>
          </div>
          <div className="p-6 space-y-4">
            <div className="rounded-lg border border-red-200 bg-red-50 p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="text-[13px] font-semibold text-red-900">Deactivate Account</h4>
                  <p className="mt-1 text-[11px] text-red-700">
                    Temporarily disable your account. You can reactivate it later.
                  </p>
                  <button className="mt-3 h-8 rounded-md border border-red-300 bg-white px-3 text-[12px] text-red-600 hover:bg-red-50 transition-colors">
                    Deactivate Account
                  </button>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-red-300 bg-red-100 p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-700 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="text-[13px] font-semibold text-red-900">Delete Account</h4>
                  <p className="mt-1 text-[11px] text-red-800">
                    Permanently delete your account and all associated data. This cannot be undone.
                  </p>
                  <button className="mt-3 h-8 rounded-md bg-red-600 px-3 text-[12px] text-white hover:bg-red-700 transition-colors">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
