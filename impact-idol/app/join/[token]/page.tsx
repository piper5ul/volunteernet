"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { trpc } from "@/lib/utils/trpc";
import { toast } from "sonner";
import {
  Users,
  Calendar,
  MapPin,
  Clock,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { formatDateWithContext } from "@/lib/utils/date-utils";

export default function JoinPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = use(params);
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  // In a real app, this would decode the token to get squad and opportunity info
  // For now, we'll use mock data
  const mockSquad = {
    id: "squad-1",
    name: "Acme Corp Volunteers",
    type: "corporate" as const,
    leader: {
      name: "Mike Thompson",
      avatar_url: null,
    },
  };

  const mockOpportunity = {
    id: "opp-1",
    title: "Beach Cleanup Drive",
    organization: {
      name: "Green Future SF",
      logo_url: null,
    },
    starts_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    ends_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000), // 3 hours duration
    location: {
      name: "Ocean Beach, San Francisco",
    },
    spotsReserved: 10,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // In real app, this would call the tRPC mutation
    toast.success("Registration Successful!", {
      description: "You're all set. We'll send you a confirmation email.",
    });

    // Simulate navigation to success page
    setTimeout(() => {
      router.push(`/join/${token}/success`);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#fbfbfc] py-12">
      <div className="container mx-auto max-w-2xl px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <Sparkles className="h-8 w-8 text-purple-600" />
            <h1 className="text-[32px] font-semibold text-linear-900">You're Invited!</h1>
          </div>
          <p className="text-[16px] text-linear-600">
            Join {mockSquad.name} for a volunteer opportunity
          </p>
        </div>

        {/* Opportunity Card */}
        <div className="mb-6 rounded-lg border border-linear-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-start gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg border border-linear-200 bg-linear-50 text-[24px] font-semibold text-linear-900">
              {mockOpportunity.organization.logo_url ? (
                <img
                  src={mockOpportunity.organization.logo_url}
                  alt={mockOpportunity.organization.name}
                  className="h-full w-full rounded-lg object-cover"
                />
              ) : (
                mockOpportunity.organization.name[0]
              )}
            </div>
            <div className="flex-1">
              <h2 className="mb-1 text-[18px] font-semibold text-linear-900">{mockOpportunity.title}</h2>
              <p className="text-[13px] text-linear-600">
                {mockOpportunity.organization.name}
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[13px] text-linear-600">
              <Calendar className="h-4 w-4 text-linear-500" />
              <span>{formatDateWithContext(mockOpportunity.starts_at)}</span>
            </div>
            <div className="flex items-center gap-2 text-[13px] text-linear-600">
              <Clock className="h-4 w-4 text-linear-500" />
              <span>3 hours</span>
            </div>
            <div className="flex items-center gap-2 text-[13px] text-linear-600">
              <MapPin className="h-4 w-4 text-linear-500" />
              <span>{mockOpportunity.location.name}</span>
            </div>
            <div className="flex items-center gap-2 text-[13px] text-linear-600">
              <Users className="h-4 w-4 text-linear-500" />
              <span>{mockOpportunity.spotsReserved} spots reserved for {mockSquad.name}</span>
            </div>
          </div>
        </div>

        {/* Registration Form */}
        <div className="mb-6 rounded-lg border border-linear-200 bg-white p-6 shadow-sm">
          <h3 className="mb-1 text-[18px] font-semibold text-linear-900">Quick Registration</h3>
          <p className="mb-6 text-[13px] text-linear-600">
            No account needed! Just enter your name and email to register.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-[13px] font-medium text-linear-900">
                Full Name *
              </label>
              <input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                required
                className="h-9 w-full rounded-md border border-linear-200 bg-white px-3 text-[13px] text-linear-900 placeholder:text-linear-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-linear-900"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-1.5 block text-[13px] font-medium text-linear-900">
                Email Address *
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
                required
                className="h-9 w-full rounded-md border border-linear-200 bg-white px-3 text-[13px] text-linear-900 placeholder:text-linear-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-linear-900"
              />
              <p className="mt-1 text-[11px] text-linear-500">
                We'll send you event details and reminders
              </p>
            </div>

            <button
              type="submit"
              className="h-10 w-full rounded-md bg-peer-green px-4 text-[13px] font-medium text-white transition-colors hover:bg-green-600"
            >
              Register for Event
            </button>
          </form>
        </div>

        {/* What Happens Next */}
        <div className="rounded-lg border border-green-200 bg-green-50 p-6 shadow-sm">
          <h3 className="mb-3 flex items-center gap-2 text-[14px] font-semibold text-green-900">
            <CheckCircle2 className="h-5 w-5" />
            What happens next?
          </h3>
          <ul className="space-y-2 text-[13px] text-green-800">
            <li className="flex items-start gap-2">
              <span className="mt-0.5">1.</span>
              <span>You'll receive a confirmation email with event details</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5">2.</span>
              <span>We'll send you a reminder 24 hours before the event</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5">3.</span>
              <span>Check in at the event using the QR code in your email</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5">4.</span>
              <span>
                After the event, we'll send you an email to claim your verified volunteer hours
                and create a full account (optional!)
              </span>
            </li>
          </ul>
        </div>

        {/* Invited By */}
        <div className="mt-6 flex items-center justify-center gap-2 text-[13px] text-linear-600">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-linear-200 text-[11px] font-medium text-linear-900">
            {mockSquad.leader.avatar_url ? (
              <img src={mockSquad.leader.avatar_url} alt={mockSquad.leader.name} className="h-full w-full rounded-full object-cover" />
            ) : (
              mockSquad.leader.name
                .split(" ")
                .map((n) => n[0])
                .join("")
            )}
          </div>
          <span>
            Invited by {mockSquad.leader.name} from {mockSquad.name}
          </span>
        </div>
      </div>
    </div>
  );
}
