"use client";

import { CheckCircle2, Sparkles, Users, TrendingUp, Heart } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import confetti from "canvas-confetti";

export default function OnboardingCompletePage() {
  useEffect(() => {
    // Trigger confetti animation
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#3b82f6", "#8b5cf6", "#ec4899"],
      });

      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#3b82f6", "#8b5cf6", "#ec4899"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  return (
    <div className="min-h-screen bg-[#fbfbfc]">
      {/* Header */}
      <div className="h-14 border-b border-linear-100 bg-white px-6 flex items-center">
        <div className="flex items-center gap-2 text-[11px] text-linear-500">
          <span>Onboarding</span>
          <span>/</span>
          <span className="text-linear-900">Complete</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          {/* Card */}
          <div className="rounded-lg border border-linear-200 bg-white shadow-sm">
            <div className="p-12">
              {/* Success Icon */}
              <div className="mb-6 text-center">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-peer-green/10">
                  <CheckCircle2 className="h-12 w-12 text-peer-green" />
                </div>
                <h1 className="mb-3 text-[28px] font-semibold text-linear-900">
                  You're All Set!
                </h1>
                <p className="text-[13px] text-linear-600">
                  Welcome to the Impact Idol community
                </p>
              </div>

              {/* Next Steps */}
              <div className="mb-8 space-y-4">
                <div className="rounded-lg border border-linear-200 bg-white p-4 shadow-sm">
                  <div className="mb-2 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-100">
                      <Heart className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[13px] font-semibold text-linear-900">
                        Find Opportunities
                      </h3>
                      <p className="text-[11px] text-linear-600">
                        Browse volunteer opportunities near you
                      </p>
                    </div>
                    <Link
                      href="/discover"
                      className="flex h-8 items-center rounded-md border border-linear-200 bg-white px-3 text-[12px] text-linear-900 hover:bg-linear-50 transition-colors"
                    >
                      Browse
                    </Link>
                  </div>
                </div>

                <div className="rounded-lg border border-linear-200 bg-white p-4 shadow-sm">
                  <div className="mb-2 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-100">
                      <Users className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[13px] font-semibold text-linear-900">
                        Connect with Volunteers
                      </h3>
                      <p className="text-[11px] text-linear-600">
                        Build your volunteer network
                      </p>
                    </div>
                    <Link
                      href="/discover/people"
                      className="flex h-8 items-center rounded-md border border-linear-200 bg-white px-3 text-[12px] text-linear-900 hover:bg-linear-50 transition-colors"
                    >
                      Connect
                    </Link>
                  </div>
                </div>

                <div className="rounded-lg border border-linear-200 bg-white p-4 shadow-sm">
                  <div className="mb-2 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-100">
                      <TrendingUp className="h-5 w-5 text-peer-green" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[13px] font-semibold text-linear-900">
                        Set Your Goals
                      </h3>
                      <p className="text-[11px] text-linear-600">
                        Track your volunteer impact
                      </p>
                    </div>
                    <Link
                      href="/dashboard/goals"
                      className="flex h-8 items-center rounded-md border border-linear-200 bg-white px-3 text-[12px] text-linear-900 hover:bg-linear-50 transition-colors"
                    >
                      Set Goals
                    </Link>
                  </div>
                </div>
              </div>

              {/* Sparkles Tip */}
              <div className="mb-8 rounded-lg border border-linear-200 bg-[#fbfbfc] p-4">
                <div className="flex items-start gap-3">
                  <Sparkles className="mt-0.5 h-5 w-5 text-peer-green" />
                  <div>
                    <h3 className="mb-1 text-[13px] font-semibold text-linear-900">
                      Pro Tip
                    </h3>
                    <p className="text-[11px] text-linear-600">
                      Complete your first volunteer activity and get it verified to earn your
                      "First Impact" badge!
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="text-center">
                <Link
                  href="/dashboard"
                  className="inline-flex h-9 items-center rounded-md bg-peer-green px-6 text-[13px] font-medium text-white hover:bg-green-600 transition-colors shadow-subtle"
                >
                  Go to Dashboard
                </Link>
                <p className="mt-4 text-[11px] text-linear-600">
                  You can always update your profile from settings
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
