"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  CheckCircle2,
  Clock,
  Award,
  TrendingUp,
  Sparkles,
  Star,
  Lock,
  Mail,
  UserPlus,
} from "lucide-react";

export default function ClaimImpactPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = use(params);
  const router = useRouter();

  const [step, setStep] = useState<"preview" | "account" | "complete">("preview");
  const [formData, setFormData] = useState({
    password: "",
    username: "",
    bio: "",
  });

  // Mock data - in real app this would come from token
  const mockImpactData = {
    event: "Beach Cleanup Drive",
    organization: "Green Future SF",
    date: "January 15, 2026",
    hours: 3,
    tier: "GOLD",
    squad: "Acme Corp Volunteers",
    guestName: "John Doe",
    guestEmail: "john@example.com",
  };

  const handleClaimAsGuest = () => {
    toast.success("Impact Claimed!", {
      description: "Your volunteer hours have been recorded.",
    });
    router.push("/");
  };

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("complete");
    toast.success("Account Created!", {
      description: "Welcome to Impact Idol! Your impact has been saved to your profile.",
    });
    setTimeout(() => {
      router.push("/dashboard");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#fbfbfc] py-12">
      <div className="container mx-auto max-w-3xl px-4">
        {step === "preview" && (
          <>
            {/* Header */}
            <div className="mb-8 text-center">
              <div className="mb-4 flex items-center justify-center gap-2">
                <Sparkles className="h-10 w-10 text-peer-green" />
                <h1 className="text-[32px] font-semibold text-linear-900">Congratulations!</h1>
              </div>
              <p className="text-[16px] text-linear-600">
                You just made an impact. Claim your verified volunteer hours!
              </p>
            </div>

            {/* Impact Summary */}
            <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-6 shadow-sm">
              <div className="mb-4 text-center">
                <div className="mb-2 flex items-center justify-center gap-2">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                  <h2 className="text-[28px] font-semibold text-green-900">
                    {mockImpactData.hours} Hours Verified
                  </h2>
                </div>
                <span className="inline-flex items-center rounded-full bg-yellow-500 px-3 py-1 text-[12px] font-medium text-white">
                  {mockImpactData.tier === "PLATINUM"
                    ? "✨ Platinum Verified"
                    : mockImpactData.tier === "GOLD"
                      ? "🥇 Gold Verified"
                      : "🥈 Silver Verified"}
                </span>
              </div>

              <div className="space-y-2 text-[13px] text-green-900">
                <div className="flex items-center justify-between">
                  <span className="text-green-700">Event:</span>
                  <span className="font-medium">{mockImpactData.event}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-green-700">Organization:</span>
                  <span className="font-medium">{mockImpactData.organization}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-green-700">Date:</span>
                  <span className="font-medium">{mockImpactData.date}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-green-700">Squad:</span>
                  <span className="font-medium">{mockImpactData.squad}</span>
                </div>
              </div>
            </div>

            {/* Benefits of Creating Account */}
            <div className="mb-6 rounded-lg border border-linear-200 bg-white p-6 shadow-sm">
              <h3 className="mb-2 flex items-center gap-2 text-[16px] font-semibold text-linear-900">
                <Award className="h-5 w-5" />
                Create Your Impact Profile
              </h3>
              <p className="mb-4 text-[13px] text-linear-600">
                Turn your volunteer work into a verified portfolio that showcases your impact
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  <div>
                    <p className="text-[13px] font-medium text-linear-900">Track All Your Hours</p>
                    <p className="text-[13px] text-linear-600">
                      Keep a verified record of every volunteer activity
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <TrendingUp className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                  <div>
                    <p className="text-[13px] font-medium text-linear-900">Build Your Portfolio</p>
                    <p className="text-[13px] text-linear-600">
                      Create a public profile to showcase your community impact
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Star className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-600" />
                  <div>
                    <p className="text-[13px] font-medium text-linear-900">Earn Badges & Recognition</p>
                    <p className="text-[13px] text-linear-600">
                      Get endorsed by organizations and unlock achievements
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 flex-shrink-0 text-purple-600" />
                  <div>
                    <p className="text-[13px] font-medium text-linear-900">Discover More Opportunities</p>
                    <p className="text-[13px] text-linear-600">
                      Find volunteer events that match your interests and skills
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button
                onClick={() => setStep("account")}
                className="flex h-10 w-full items-center justify-center gap-2 rounded-md bg-peer-green px-4 text-[13px] font-medium text-white transition-colors hover:bg-green-600"
              >
                <UserPlus className="h-5 w-5" />
                Create My Free Account
              </button>
              <button
                onClick={handleClaimAsGuest}
                className="h-10 w-full rounded-md border border-linear-200 bg-white px-4 text-[13px] text-linear-900 transition-colors hover:bg-linear-50"
              >
                No Thanks, Just Record My Hours
              </button>
            </div>

            <p className="mt-4 text-center text-[11px] text-linear-500">
              Free forever • No credit card required • Your hours are saved either way
            </p>
          </>
        )}

        {step === "account" && (
          <>
            {/* Progress */}
            <div className="mb-6">
              <div className="mb-2 h-2 overflow-hidden rounded-full bg-linear-100">
                <div className="h-full w-1/2 bg-peer-green transition-all" />
              </div>
              <p className="text-[13px] text-linear-600">Step 2 of 2: Set up your account</p>
            </div>

            {/* Account Creation Form */}
            <div className="rounded-lg border border-linear-200 bg-white p-6 shadow-sm">
              <h2 className="mb-1 text-[18px] font-semibold text-linear-900">Create Your Account</h2>
              <p className="mb-6 text-[13px] text-linear-600">
                We've pre-filled your info from the event
              </p>
              <form onSubmit={handleCreateAccount} className="space-y-4">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-[13px] font-medium text-linear-900">
                    Full Name
                  </label>
                  <input
                    id="name"
                    value={mockImpactData.guestName}
                    disabled
                    className="h-9 w-full rounded-md border border-linear-200 bg-linear-50 px-3 text-[13px] text-linear-600"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-1.5 block text-[13px] font-medium text-linear-900">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={mockImpactData.guestEmail}
                    disabled
                    className="h-9 w-full rounded-md border border-linear-200 bg-linear-50 px-3 text-[13px] text-linear-600"
                  />
                </div>

                <div>
                  <label htmlFor="username" className="mb-1.5 block text-[13px] font-medium text-linear-900">
                    Username *
                  </label>
                  <input
                    id="username"
                    value={formData.username}
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                    placeholder="johndoe"
                    required
                    className="h-9 w-full rounded-md border border-linear-200 bg-white px-3 text-[13px] text-linear-900 placeholder:text-linear-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-linear-900"
                  />
                  <p className="mt-1 text-[11px] text-linear-500">
                    Your profile will be at impact-idol.com/u/{formData.username || "username"}
                  </p>
                </div>

                <div>
                  <label htmlFor="password" className="mb-1.5 block text-[13px] font-medium text-linear-900">
                    Password *
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    placeholder="Create a secure password"
                    required
                    minLength={8}
                    className="h-9 w-full rounded-md border border-linear-200 bg-white px-3 text-[13px] text-linear-900 placeholder:text-linear-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-linear-900"
                  />
                </div>

                <div>
                  <label htmlFor="bio" className="mb-1.5 block text-[13px] font-medium text-linear-900">
                    Bio (Optional)
                  </label>
                  <textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) =>
                      setFormData({ ...formData, bio: e.target.value })
                    }
                    placeholder="Tell us about yourself and why you volunteer..."
                    rows={3}
                    className="w-full rounded-md border border-linear-200 bg-white px-3 py-2 text-[13px] text-linear-900 placeholder:text-linear-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-linear-900"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep("preview")}
                    className="h-9 flex-1 rounded-md border border-linear-200 bg-white px-4 text-[13px] text-linear-900 transition-colors hover:bg-linear-50"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={!formData.username || !formData.password}
                    className="h-9 flex-1 rounded-md bg-peer-green px-4 text-[13px] font-medium text-white transition-colors hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Create Account
                  </button>
                </div>
              </form>
            </div>
          </>
        )}

        {step === "complete" && (
          <div className="rounded-lg border border-green-200 bg-green-50 p-12 text-center shadow-sm">
            <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-green-600" />
            <h2 className="mb-2 text-[24px] font-semibold text-green-900">
              Welcome to Impact Idol!
            </h2>
            <p className="mb-6 text-[14px] text-green-800">
              Your account has been created and your volunteer hours have been added to your
              profile.
            </p>
            <button
              onClick={() => router.push("/dashboard")}
              className="h-10 rounded-md bg-peer-green px-6 text-[13px] font-medium text-white transition-colors hover:bg-green-600"
            >
              View My Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
