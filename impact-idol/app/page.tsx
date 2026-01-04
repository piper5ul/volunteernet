"use client";

import Link from "next/link";
import { ArrowRight, Users, Award, TrendingUp, Shield, Sparkles } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col bg-white">
      {/* Hero Section */}
      <section className="relative border-b border-linear-100 bg-gradient-to-br from-[#fbfbfc] to-white py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-linear-200 bg-white px-3 py-1.5 text-[11px] font-medium text-linear-700 shadow-sm">
              <Sparkles className="h-3 w-3 text-peer-green" />
              Interactive Demo Mode
            </div>
            <h1 className="mb-6 text-[48px] font-bold leading-tight tracking-tight text-linear-900">
              Your Volunteer Work
              <span className="block bg-gradient-to-r from-peer-green to-green-600 bg-clip-text text-transparent">
                Verified & Visible
              </span>
            </h1>
            <p className="mb-10 text-[16px] leading-relaxed text-linear-600">
              Impact Idol is the global system of record for volunteer impact. Build a verified
              portfolio of your volunteer work and turn social good into a professional credential.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/discover"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-linear-900 px-6 py-2.5 text-[14px] font-semibold text-white shadow-subtle transition-colors hover:bg-black"
              >
                Discover Opportunities
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-linear-200 bg-white px-6 py-2.5 text-[14px] font-semibold text-linear-900 shadow-sm transition-colors hover:bg-linear-50"
              >
                View Your Impact
              </Link>
            </div>

            {/* Demo Instructions */}
            <div className="mt-8 rounded-lg border border-amber-200 bg-amber-50/50 p-4 text-left">
              <p className="text-[12px] text-amber-900">
                <span className="font-semibold">Demo Mode:</span> Switch personas using the dropdown in the top-right to explore different user experiences (Volunteer, Org Admin, Squad Leader).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-b border-linear-100 bg-white py-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-[32px] font-bold text-linear-900">
              Why Impact Idol?
            </h2>
            <p className="text-[14px] text-linear-600">
              Everything you need to track, verify, and showcase your volunteer impact
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="group rounded-lg border border-linear-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-md bg-blue-100">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="mb-2 text-[14px] font-semibold text-linear-900">Verified Impact</h3>
              <p className="text-[12px] leading-relaxed text-linear-600">
                Multi-tier verification system ensures your volunteer hours are authentic and
                trustworthy.
              </p>
            </div>

            <div className="group rounded-lg border border-linear-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-md bg-green-100">
                <Award className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="mb-2 text-[14px] font-semibold text-linear-900">Public Portfolio</h3>
              <p className="text-[12px] leading-relaxed text-linear-600">
                Build a professional volunteer resume that you can share with employers and
                schools.
              </p>
            </div>

            <div className="group rounded-lg border border-linear-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-md bg-purple-100">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="mb-2 text-[14px] font-semibold text-linear-900">Squad Volunteering</h3>
              <p className="text-[12px] leading-relaxed text-linear-600">
                Volunteer with corporate teams, student groups, or friends using our magic link
                system.
              </p>
            </div>

            <div className="group rounded-lg border border-linear-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-md bg-orange-100">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="mb-2 text-[14px] font-semibold text-linear-900">Track Your Growth</h3>
              <p className="text-[12px] leading-relaxed text-linear-600">
                Visualize your volunteer journey with charts, badges, and impact metrics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-linear-100 bg-[#fbfbfc] py-16">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid gap-12 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-2 text-[48px] font-bold text-linear-900">1,043</div>
              <div className="text-[13px] font-medium text-linear-500 uppercase tracking-wider">Total Volunteers</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-[48px] font-bold text-peer-green">6,017</div>
              <div className="text-[13px] font-medium text-linear-500 uppercase tracking-wider">Hours Verified</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-[48px] font-bold text-linear-900">342</div>
              <div className="text-[13px] font-medium text-linear-500 uppercase tracking-wider">Organizations</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-b border-linear-100 bg-white py-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-[32px] font-bold text-linear-900">
              How It Works
            </h2>
            <p className="text-[14px] text-linear-600">
              Three simple steps to start building your verified impact portfolio
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="relative">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-peer-green text-[16px] font-bold text-white">
                1
              </div>
              <h3 className="mb-2 text-[16px] font-semibold text-linear-900">Find Opportunities</h3>
              <p className="text-[13px] leading-relaxed text-linear-600">
                Browse thousands of verified volunteer opportunities from trusted nonprofits in your area.
              </p>
            </div>
            <div className="relative">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-peer-green text-[16px] font-bold text-white">
                2
              </div>
              <h3 className="mb-2 text-[16px] font-semibold text-linear-900">Volunteer & Log Hours</h3>
              <p className="text-[13px] leading-relaxed text-linear-600">
                Complete your volunteer work and log your hours. Organizations verify your impact.
              </p>
            </div>
            <div className="relative">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-peer-green text-[16px] font-bold text-white">
                3
              </div>
              <h3 className="mb-2 text-[16px] font-semibold text-linear-900">Share Your Portfolio</h3>
              <p className="text-[13px] leading-relaxed text-linear-600">
                Build a public portfolio of verified volunteer work to share with employers and schools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-linear-900 py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-linear-800 to-linear-900"></div>
        <div className="container relative mx-auto px-6 max-w-4xl">
          <div className="mx-auto max-w-2xl text-center text-white">
            <h2 className="mb-4 text-[36px] font-bold">Ready to track your impact?</h2>
            <p className="mb-8 text-[15px] leading-relaxed text-linear-200">
              Join thousands of volunteers building verified portfolios of their social impact.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/discover"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-6 py-2.5 text-[14px] font-semibold text-linear-900 shadow-lg transition-colors hover:bg-linear-50"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-linear-600 bg-transparent px-6 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-linear-800"
              >
                View Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
