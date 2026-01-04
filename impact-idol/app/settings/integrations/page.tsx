"use client";

import { useState } from "react";
import { ArrowLeft, Calendar as CalendarIcon, Link as LinkIcon, Download, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function IntegrationsPage() {
  const [googleCalendarConnected, setGoogleCalendarConnected] = useState(false);
  const [linkedInConnected, setLinkedInConnected] = useState(false);

  const handleConnectGoogleCalendar = () => {
    setGoogleCalendarConnected(true);
    toast.success("Google Calendar connected");
  };

  const handleConnectLinkedIn = () => {
    setLinkedInConnected(true);
    toast.success("LinkedIn connected");
  };

  const handleDisconnect = (service: string) => {
    if (service === "google") setGoogleCalendarConnected(false);
    if (service === "linkedin") setLinkedInConnected(false);
    toast.success(`${service} disconnected`);
  };

  return (
    <div className="min-h-screen bg-[#fbfbfc]">
      {/* Header */}
      <div className="h-14 border-b border-linear-200 bg-white px-6 flex items-center">
        <div className="flex items-center gap-2 text-[11px] text-linear-600">
          <Link href="/settings" className="hover:text-linear-900">Settings</Link>
          <span>/</span>
          <span className="text-linear-900">Integrations</span>
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
          <h1 className="mb-2 text-[20px] font-semibold text-linear-900">Integrations</h1>
          <p className="text-[12px] text-linear-600">
            Connect your calendar and other apps to sync your volunteer schedule
          </p>
        </div>

        <div className="space-y-4">
          {/* Google Calendar */}
          <div className="rounded-lg border border-linear-200 bg-white shadow-sm p-6">
            <div className="flex items-start justify-between">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <CalendarIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-[13px] font-semibold text-linear-900">Google Calendar</h3>
                    {googleCalendarConnected && (
                      <div className="inline-flex items-center gap-1 rounded-full bg-linear-100 px-2 py-0.5 text-[11px] text-linear-900">
                        <CheckCircle2 className="h-3 w-3" />
                        Connected
                      </div>
                    )}
                  </div>
                  <p className="mt-1 text-[12px] text-linear-600">
                    Sync volunteer events to your Google Calendar automatically
                  </p>
                  {googleCalendarConnected && (
                    <p className="mt-2 text-[11px] text-linear-500">
                      Connected to: user@example.com
                    </p>
                  )}
                </div>
              </div>

              <div>
                {googleCalendarConnected ? (
                  <button
                    onClick={() => handleDisconnect("google")}
                    className="h-8 rounded-md border border-linear-200 bg-white px-3 text-[12px] text-linear-900 hover:bg-linear-50 transition-colors"
                  >
                    Disconnect
                  </button>
                ) : (
                  <button
                    onClick={handleConnectGoogleCalendar}
                    className="h-8 rounded-md bg-[#22c55e] px-3 text-[12px] font-medium text-white hover:bg-[#22c55e]/90 transition-colors"
                  >
                    Connect
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Outlook Calendar */}
          <div className="rounded-lg border border-linear-200 bg-white shadow-sm p-6">
            <div className="flex items-start justify-between">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <CalendarIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-[13px] font-semibold text-linear-900">Outlook Calendar</h3>
                  <p className="mt-1 text-[12px] text-linear-600">
                    Sync volunteer events to your Outlook Calendar
                  </p>
                </div>
              </div>

              <button className="h-8 rounded-md bg-[#22c55e] px-3 text-[12px] font-medium text-white hover:bg-[#22c55e]/90 transition-colors">
                Connect
              </button>
            </div>
          </div>

          {/* LinkedIn */}
          <div className="rounded-lg border border-linear-200 bg-white shadow-sm p-6">
            <div className="flex items-start justify-between">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-700">
                  <LinkIcon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-[13px] font-semibold text-linear-900">LinkedIn</h3>
                    {linkedInConnected && (
                      <div className="inline-flex items-center gap-1 rounded-full bg-linear-100 px-2 py-0.5 text-[11px] text-linear-900">
                        <CheckCircle2 className="h-3 w-3" />
                        Connected
                      </div>
                    )}
                  </div>
                  <p className="mt-1 text-[12px] text-linear-600">
                    Import your LinkedIn profile and share volunteer achievements
                  </p>
                </div>
              </div>

              <div>
                {linkedInConnected ? (
                  <button
                    onClick={() => handleDisconnect("linkedin")}
                    className="h-8 rounded-md border border-linear-200 bg-white px-3 text-[12px] text-linear-900 hover:bg-linear-50 transition-colors"
                  >
                    Disconnect
                  </button>
                ) : (
                  <button
                    onClick={handleConnectLinkedIn}
                    className="h-8 rounded-md bg-[#22c55e] px-3 text-[12px] font-medium text-white hover:bg-[#22c55e]/90 transition-colors"
                  >
                    Connect
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* .ics Download */}
          <div className="rounded-lg border border-linear-200 bg-white shadow-sm p-6">
            <div className="flex items-start justify-between">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-linear-100">
                  <Download className="h-6 w-6 text-linear-600" />
                </div>
                <div>
                  <h3 className="text-[13px] font-semibold text-linear-900">Calendar File (.ics)</h3>
                  <p className="mt-1 text-[12px] text-linear-600">
                    Download events as .ics files for any calendar app
                  </p>
                </div>
              </div>

              <button className="h-8 rounded-md border border-linear-200 bg-white px-3 text-[12px] text-linear-900 hover:bg-linear-50 transition-colors inline-flex items-center gap-2">
                <Download className="h-3.5 w-3.5" />
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
