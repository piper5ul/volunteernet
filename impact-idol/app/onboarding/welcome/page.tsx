"use client";

import { Heart, Users, Award, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function OnboardingWelcomePage() {
  return (
    <div className="min-h-screen bg-[#fbfbfc]">
      {/* Header */}
      <div className="h-14 border-b border-linear-100 bg-white px-6 flex items-center">
        <div className="flex items-center gap-2 text-[11px] text-linear-500">
          <span>Onboarding</span>
          <span>/</span>
          <span className="text-linear-900">Welcome</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          {/* Card */}
          <div className="rounded-lg border border-linear-200 bg-white shadow-sm">
            <div className="p-12">
              {/* Welcome Header */}
              <div className="mb-8 text-center">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-peer-green/10">
                  <Heart className="h-12 w-12 text-peer-green" />
                </div>
                <h1 className="mb-3 text-[28px] font-semibold text-linear-900">
                  Welcome to Impact Idol!
                </h1>
                <p className="text-[13px] text-linear-600">
                  The LinkedIn for volunteers - track, verify, and showcase your impact
                </p>
              </div>

              {/* Features Grid */}
              <div className="mb-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-linear-200 bg-[#fbfbfc] p-6 text-center">
                  <Users className="mx-auto mb-3 h-10 w-10 text-blue-600" />
                  <h3 className="mb-2 text-[13px] font-semibold text-linear-900">
                    Build Your Network
                  </h3>
                  <p className="text-[11px] text-linear-600">
                    Connect with volunteers and organizations
                  </p>
                </div>

                <div className="rounded-lg border border-linear-200 bg-[#fbfbfc] p-6 text-center">
                  <TrendingUp className="mx-auto mb-3 h-10 w-10 text-peer-green" />
                  <h3 className="mb-2 text-[13px] font-semibold text-linear-900">
                    Track Your Impact
                  </h3>
                  <p className="text-[11px] text-linear-600">
                    Log and verify every hour you volunteer
                  </p>
                </div>

                <div className="rounded-lg border border-linear-200 bg-[#fbfbfc] p-6 text-center">
                  <Award className="mx-auto mb-3 h-10 w-10 text-amber-500" />
                  <h3 className="mb-2 text-[13px] font-semibold text-linear-900">
                    Earn Recognition
                  </h3>
                  <p className="text-[11px] text-linear-600">
                    Get badges, endorsements, and recommendations
                  </p>
                </div>

                <div className="rounded-lg border border-linear-200 bg-[#fbfbfc] p-6 text-center">
                  <Heart className="mx-auto mb-3 h-10 w-10 text-peer-green" />
                  <h3 className="mb-2 text-[13px] font-semibold text-linear-900">
                    Make a Difference
                  </h3>
                  <p className="text-[11px] text-linear-600">
                    Find opportunities aligned with your passions
                  </p>
                </div>
              </div>

              {/* Progress Indicator */}
              <div className="mb-8">
                <div className="mb-2 flex justify-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-peer-green"></div>
                  <div className="h-2 w-2 rounded-full bg-linear-200"></div>
                  <div className="h-2 w-2 rounded-full bg-linear-200"></div>
                  <div className="h-2 w-2 rounded-full bg-linear-200"></div>
                </div>
                <p className="text-center text-[11px] text-linear-600">Step 1 of 4</p>
              </div>

              {/* CTA */}
              <div className="text-center">
                <Link
                  href="/onboarding/profile"
                  className="inline-flex h-9 items-center gap-2 rounded-md bg-peer-green px-6 text-[13px] font-medium text-white hover:bg-green-600 transition-colors shadow-subtle"
                >
                  Let's Get Started
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <p className="mt-4 text-[11px] text-linear-600">
                  Takes less than 2 minutes to complete
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
