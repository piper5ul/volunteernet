"use client";

import { useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function NotificationSettingsPage() {
  // Email Notifications
  const [emailMessages, setEmailMessages] = useState(true);
  const [emailConnectionRequests, setEmailConnectionRequests] = useState(true);
  const [emailConnectionAccepted, setEmailConnectionAccepted] = useState(true);
  const [emailEventReminders, setEmailEventReminders] = useState(true);
  const [emailVerificationUpdates, setEmailVerificationUpdates] = useState(true);
  const [emailEndorsements, setEmailEndorsements] = useState(false);
  const [emailWeeklyDigest, setEmailWeeklyDigest] = useState(true);

  // Push Notifications
  const [pushMessages, setPushMessages] = useState(true);
  const [pushConnectionRequests, setPushConnectionRequests] = useState(true);
  const [pushEventReminders, setPushEventReminders] = useState(true);

  const handleSave = () => {
    toast.success("Notification settings saved");
  };

  const Toggle = ({ checked, onChange, id }: { checked: boolean; onChange: (val: boolean) => void; id: string }) => (
    <button
      id={id}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        checked ? "bg-[#22c55e]" : "bg-linear-300"
      }`}
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
          <span className="text-linear-900">Notifications</span>
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
          <h1 className="mb-2 text-[20px] font-semibold text-linear-900">Notification Settings</h1>
          <p className="text-[12px] text-linear-600">
            Configure how you receive notifications
          </p>
        </div>

        <div className="space-y-6">
          {/* Email Notifications */}
          <div className="rounded-lg border border-linear-200 bg-white shadow-sm">
            <div className="border-b border-linear-200 px-6 py-4">
              <h2 className="text-[13px] font-semibold text-linear-900">Email Notifications</h2>
              <p className="mt-1 text-[11px] text-linear-600">
                Receive updates via email
              </p>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label htmlFor="email-messages" className="text-[12px] font-medium text-linear-900">
                    Messages
                  </label>
                  <p className="text-[11px] text-linear-600">
                    When someone sends you a message
                  </p>
                </div>
                <Toggle checked={emailMessages} onChange={setEmailMessages} id="email-messages" />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label htmlFor="email-connection-requests" className="text-[12px] font-medium text-linear-900">
                    Connection Requests
                  </label>
                  <p className="text-[11px] text-linear-600">
                    When someone wants to connect with you
                  </p>
                </div>
                <Toggle checked={emailConnectionRequests} onChange={setEmailConnectionRequests} id="email-connection-requests" />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label htmlFor="email-connection-accepted" className="text-[12px] font-medium text-linear-900">
                    Connection Accepted
                  </label>
                  <p className="text-[11px] text-linear-600">
                    When someone accepts your connection request
                  </p>
                </div>
                <Toggle checked={emailConnectionAccepted} onChange={setEmailConnectionAccepted} id="email-connection-accepted" />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label htmlFor="email-event-reminders" className="text-[12px] font-medium text-linear-900">
                    Event Reminders
                  </label>
                  <p className="text-[11px] text-linear-600">
                    Reminders for upcoming volunteer events
                  </p>
                </div>
                <Toggle checked={emailEventReminders} onChange={setEmailEventReminders} id="email-event-reminders" />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label htmlFor="email-verification" className="text-[12px] font-medium text-linear-900">
                    Verification Updates
                  </label>
                  <p className="text-[11px] text-linear-600">
                    Updates on hour verification status
                  </p>
                </div>
                <Toggle checked={emailVerificationUpdates} onChange={setEmailVerificationUpdates} id="email-verification" />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label htmlFor="email-endorsements" className="text-[12px] font-medium text-linear-900">
                    Endorsements
                  </label>
                  <p className="text-[11px] text-linear-600">
                    When someone endorses your skills
                  </p>
                </div>
                <Toggle checked={emailEndorsements} onChange={setEmailEndorsements} id="email-endorsements" />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label htmlFor="email-digest" className="text-[12px] font-medium text-linear-900">
                    Weekly Digest
                  </label>
                  <p className="text-[11px] text-linear-600">
                    Summary of your activity and network updates
                  </p>
                </div>
                <Toggle checked={emailWeeklyDigest} onChange={setEmailWeeklyDigest} id="email-digest" />
              </div>
            </div>
          </div>

          {/* Push Notifications */}
          <div className="rounded-lg border border-linear-200 bg-white shadow-sm">
            <div className="border-b border-linear-200 px-6 py-4">
              <h2 className="text-[13px] font-semibold text-linear-900">Push Notifications</h2>
              <p className="mt-1 text-[11px] text-linear-600">
                Get notified on your devices
              </p>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label htmlFor="push-messages" className="text-[12px] font-medium text-linear-900">
                    Messages
                  </label>
                  <p className="text-[11px] text-linear-600">
                    Instant notifications for new messages
                  </p>
                </div>
                <Toggle checked={pushMessages} onChange={setPushMessages} id="push-messages" />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label htmlFor="push-connections" className="text-[12px] font-medium text-linear-900">
                    Connection Requests
                  </label>
                  <p className="text-[11px] text-linear-600">
                    New connection requests
                  </p>
                </div>
                <Toggle checked={pushConnectionRequests} onChange={setPushConnectionRequests} id="push-connections" />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label htmlFor="push-events" className="text-[12px] font-medium text-linear-900">
                    Event Reminders
                  </label>
                  <p className="text-[11px] text-linear-600">
                    Reminders before events start
                  </p>
                </div>
                <Toggle checked={pushEventReminders} onChange={setPushEventReminders} id="push-events" />
              </div>
            </div>
          </div>

          <button
            onClick={handleSave}
            className="flex h-9 items-center gap-2 rounded-md bg-[#22c55e] px-4 text-[13px] font-medium text-white hover:bg-[#22c55e]/90 transition-colors"
          >
            <Save className="h-3.5 w-3.5" />
            Save Notification Settings
          </button>
        </div>
      </div>
    </div>
  );
}
