"use client";

import { use, useState, useEffect } from "react";
import { trpc } from "@/lib/utils/trpc";
import { useAuth } from "@/lib/stores/auth-store";
import { QrCode, MapPin, Clock, CheckCircle2, Camera, Upload, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { formatDate, formatTimeRange } from "@/lib/utils/date-utils";
import { toast } from "sonner";

export default function CheckInPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = use(params);
  const { currentPersona } = useAuth();
  const [checkedIn, setCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<Date | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [notes, setNotes] = useState("");
  const [rating, setRating] = useState(0);

  const { data: opportunity, isLoading } = trpc.opportunities.get.useQuery({ id: eventId });

  const checkInMutation = trpc.opportunities.checkIn.useMutation({
    onSuccess: () => {
      setCheckedIn(true);
      setCheckInTime(new Date());
      toast.success("Checked in successfully!");
    },
  });

  const checkOutMutation = trpc.opportunities.checkOut.useMutation({
    onSuccess: () => {
      toast.success("Checked out successfully! Your hours will be verified soon.");
    },
  });

  const qrCodeData = `check-in:${eventId}:${currentPersona.userId}`;

  const handleCheckIn = () => {
    if (currentPersona.type === "volunteer" && currentPersona.userId) {
      checkInMutation.mutate({
        eventId,
        userId: currentPersona.userId,
      });
    }
  };

  const handleCheckOut = () => {
    if (currentPersona.type === "volunteer" && currentPersona.userId) {
      checkOutMutation.mutate({
        eventId,
        userId: currentPersona.userId,
        notes,
        rating,
      });
    }
  };

  const calculateHours = () => {
    if (!checkInTime || !opportunity) return 0;
    const now = new Date();
    const hours = (now.getTime() - checkInTime.getTime()) / (1000 * 60 * 60);
    return Math.round(hours * 10) / 10;
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fbfbfc]">
        <div className="text-[13px] text-linear-600">Loading event...</div>
      </div>
    );
  }

  if (!opportunity) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fbfbfc]">
        <div className="text-center">
          <h1 className="mb-2 text-[20px] font-semibold text-linear-900">Event Not Found</h1>
          <Link
            href="/discover"
            className="inline-flex h-9 items-center rounded-md bg-peer-green px-4 text-[13px] font-medium text-white hover:bg-green-600 transition-colors"
          >
            Back to Discover
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fbfbfc]">
      {/* Header */}
      <div className="h-14 border-b border-linear-200 bg-white px-6 flex items-center">
        <Link
          href={`/discover/${eventId}`}
          className="flex items-center gap-2 text-[11px] text-linear-500 hover:text-linear-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Event</span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          {/* Event Info Card */}
          <div className="mb-6 rounded-lg border border-linear-200 bg-white shadow-sm p-6">
            <h1 className="mb-3 text-[20px] font-semibold text-linear-900">{opportunity.title}</h1>
            <div className="space-y-2 text-[13px] text-linear-600">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {formatTimeRange(opportunity.starts_at, opportunity.ends_at)}
              </div>
              {opportunity.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {opportunity.location.name}
                </div>
              )}
            </div>
          </div>

          {/* Check-In Section */}
          {!checkedIn && !showCheckout && (
            <div className="rounded-lg border border-linear-200 bg-white shadow-sm">
              <div className="py-12 text-center px-8">
                <div className="mb-6">
                  <div className="mx-auto mb-4 flex h-64 w-64 items-center justify-center rounded-lg border-2 border-linear-200 bg-white shadow-sm">
                    <QrCode className="h-48 w-48 text-linear-900" />
                  </div>
                  <p className="text-[13px] text-linear-600">
                    Show this QR code to the event coordinator
                  </p>
                  <p className="mt-1 text-[11px] text-linear-500">
                    Event ID: {eventId.slice(0, 8)}
                  </p>
                </div>

                <div className="mb-6">
                  <div className="mx-auto mb-2 text-[13px] font-medium text-linear-900">OR</div>
                </div>

                <button
                  onClick={handleCheckIn}
                  disabled={checkInMutation.isPending}
                  className="inline-flex h-9 items-center gap-2 rounded-md bg-peer-green px-6 text-[13px] font-medium text-white hover:bg-green-600 transition-colors shadow-subtle disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <CheckCircle2 className="h-5 w-5" />
                  {checkInMutation.isPending ? "Checking In..." : "Manual Check-In"}
                </button>

                <p className="mt-4 text-[11px] text-linear-600">
                  By checking in, you confirm your attendance at this event
                </p>
              </div>
            </div>
          )}

          {/* Checked In - Awaiting Checkout */}
          {checkedIn && !showCheckout && (
            <div className="rounded-lg border border-linear-200 bg-white shadow-sm">
              <div className="py-12 text-center px-8">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-peer-green/10">
                  <CheckCircle2 className="h-10 w-10 text-peer-green" />
                </div>

                <h2 className="mb-2 text-[20px] font-semibold text-linear-900">Checked In!</h2>
                <p className="mb-6 text-[13px] text-linear-600">
                  Checked in at {checkInTime?.toLocaleTimeString()}
                </p>

                <div className="mb-6 rounded-lg bg-blue-50 border border-blue-200 p-4">
                  <div className="mb-1 text-[32px] font-bold text-blue-600">
                    {calculateHours()}h
                  </div>
                  <div className="text-[13px] text-blue-800">Time volunteered so far</div>
                </div>

                <button
                  onClick={() => setShowCheckout(true)}
                  className="inline-flex h-9 items-center rounded-md bg-peer-green px-6 text-[13px] font-medium text-white hover:bg-green-600 transition-colors shadow-subtle"
                >
                  Ready to Check Out
                </button>
              </div>
            </div>
          )}

          {/* Checkout Form */}
          {showCheckout && (
            <div className="rounded-lg border border-linear-200 bg-white shadow-sm">
              <div className="p-8">
                <h2 className="mb-4 text-[18px] font-semibold text-linear-900">Check Out</h2>

                <div className="mb-6 rounded-lg bg-blue-50 border border-blue-200 p-4">
                  <div className="mb-1 text-[24px] font-bold text-blue-600">
                    {calculateHours()} hours
                  </div>
                  <div className="text-[13px] text-blue-800">
                    Total volunteer time
                  </div>
                </div>

                {/* Rating */}
                <div className="mb-4">
                  <label className="mb-2 block text-[13px] font-medium text-linear-900">
                    How was your experience? (Optional)
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className={`text-[32px] transition-colors ${
                          star <= rating ? "text-yellow-400" : "text-linear-300"
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div className="mb-6">
                  <label htmlFor="notes" className="mb-2 block text-[13px] font-medium text-linear-900">
                    Add Notes or Reflection (Optional)
                  </label>
                  <textarea
                    id="notes"
                    placeholder="What did you accomplish? Any highlights from today?"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                    className="w-full rounded-md border border-linear-200 bg-white px-3 py-2 text-[13px] text-linear-900 placeholder:text-linear-400 focus:outline-none focus:ring-2 focus:ring-linear-900 focus:border-transparent resize-none"
                  />
                </div>

                {/* Photo Upload */}
                <div className="mb-6">
                  <label className="mb-2 block text-[13px] font-medium text-linear-900">
                    Upload Photos (Optional)
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="flex h-9 flex-1 items-center justify-center gap-2 rounded-md border border-linear-200 bg-white text-[13px] text-linear-900 hover:bg-linear-50 transition-colors"
                    >
                      <Camera className="h-4 w-4" />
                      Take Photo
                    </button>
                    <button
                      type="button"
                      className="flex h-9 flex-1 items-center justify-center gap-2 rounded-md border border-linear-200 bg-white text-[13px] text-linear-900 hover:bg-linear-50 transition-colors"
                    >
                      <Upload className="h-4 w-4" />
                      Upload
                    </button>
                  </div>
                  <p className="mt-2 text-[11px] text-linear-600">
                    Photos help verify your volunteer hours
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowCheckout(false)}
                    className="flex h-9 flex-1 items-center justify-center rounded-md border border-linear-200 bg-white text-[13px] text-linear-900 hover:bg-linear-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCheckOut}
                    disabled={checkOutMutation.isPending}
                    className="flex h-9 flex-1 items-center justify-center rounded-md bg-peer-green text-[13px] font-medium text-white hover:bg-green-600 transition-colors shadow-subtle disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {checkOutMutation.isPending ? "Checking Out..." : "Check Out"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Instructions */}
          {!checkedIn && (
            <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
              <h3 className="mb-2 text-[13px] font-semibold text-blue-900">How Check-In Works</h3>
              <ul className="space-y-1 text-[13px] text-blue-800">
                <li>1. Show your QR code to the event coordinator, OR</li>
                <li>2. Use manual check-in if QR scanning isn't available</li>
                <li>3. Complete your volunteer work</li>
                <li>4. Check out when done to log your hours</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
