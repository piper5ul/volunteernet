"use client";

import { useAuth } from "@/lib/stores/auth-store";
import {
  User,
  Lock,
  Bell,
  Mail,
  Shield,
  Database,
  Link as LinkIcon,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
  const { currentPersona } = useAuth();

  if (!currentPersona || currentPersona.type === "guest") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fbfbfc]">
        <div className="text-center">
          <h1 className="mb-2 text-[18px] font-semibold text-linear-900">Sign In Required</h1>
          <p className="mb-4 text-[13px] text-linear-600">
            Sign in to access settings
          </p>
          <Link href="/login" className="bg-linear-900 hover:bg-black text-white text-[13px] font-medium px-4 py-2 rounded-md shadow-subtle inline-block">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  const settingsSections = [
    {
      title: "Account",
      description: "Manage your account details and password",
      icon: User,
      href: "/settings/account",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Privacy",
      description: "Control who can see your profile and activity",
      icon: Shield,
      href: "/settings/privacy",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Notifications",
      description: "Configure how you receive notifications",
      icon: Bell,
      href: "/settings/notifications",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Email Preferences",
      description: "Manage your email subscription settings",
      icon: Mail,
      href: "/settings/emails",
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      title: "Integrations",
      description: "Connect calendars and other apps",
      icon: LinkIcon,
      href: "/settings/integrations",
      color: "text-pink-600",
      bgColor: "bg-pink-100",
    },
    {
      title: "Data & Privacy",
      description: "Download or delete your data",
      icon: Database,
      href: "/settings/data",
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
  ];

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <header className="h-14 border-b border-linear-100 flex items-center px-6 gap-4 shrink-0">
        <h1 className="font-medium text-[14px] text-linear-900">Settings</h1>
        <div className="h-4 w-px bg-linear-200"></div>
        <span className="text-[13px] text-linear-500 capitalize">{currentPersona.type} Account</span>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-[#fbfbfc] p-8">
        <div className="max-w-4xl mx-auto">
          {/* Settings Grid */}
          <div className="grid gap-3 sm:grid-cols-2">
            {settingsSections.map((section) => {
              const Icon = section.icon;
              return (
                <Link
                  key={section.href}
                  href={section.href}
                  className="group rounded-lg border border-linear-200 bg-white shadow-sm hover:shadow-md transition-all"
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-3">
                        <div className={`rounded-md ${section.bgColor} p-2.5 shrink-0`}>
                          <Icon className={`w-5 h-5 ${section.color}`} />
                        </div>
                        <div>
                          <h3 className="text-[14px] font-semibold text-linear-900 group-hover:text-peer-green transition-colors">
                            {section.title}
                          </h3>
                          <p className="mt-1 text-[12px] text-linear-600">
                            {section.description}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-linear-400 shrink-0" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Account Overview Card */}
          <div className="mt-6 rounded-lg border border-linear-200 bg-white shadow-sm">
            <div className="p-4 border-b border-linear-100">
              <h3 className="text-[14px] font-semibold text-linear-900">Account Overview</h3>
              <p className="text-[12px] text-linear-500 mt-0.5">Quick summary of your account</p>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-linear-500">Account Type</span>
                <span className="text-[13px] font-medium text-linear-900 capitalize">{currentPersona.type}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-linear-500">Member Since</span>
                <span className="text-[13px] font-medium text-linear-900">January 2024</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-linear-500">Profile Completeness</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-linear-100 rounded-full overflow-hidden">
                    <div className="h-full bg-peer-green rounded-full" style={{ width: "85%" }}></div>
                  </div>
                  <span className="text-[13px] font-medium text-linear-900">85%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="mt-6 rounded-lg border border-red-200 bg-red-50/50">
            <div className="p-4 border-b border-red-200">
              <h3 className="text-[14px] font-semibold text-red-900">Danger Zone</h3>
              <p className="text-[12px] text-red-700 mt-0.5">Irreversible and destructive actions</p>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[13px] font-medium text-red-900">Delete Account</p>
                  <p className="text-[12px] text-red-700 mt-0.5">Permanently delete your account and all data</p>
                </div>
                <button className="text-[12px] font-medium text-red-600 px-3 py-1.5 rounded border border-red-300 hover:bg-red-100 transition-colors">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
