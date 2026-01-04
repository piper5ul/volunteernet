import { Heart, Users, TrendingUp, Award, Target } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const stats = [
    { label: "Volunteers", value: "50,000+", icon: Users },
    { label: "Organizations", value: "1,200+", icon: Target },
    { label: "Hours Logged", value: "2M+", icon: TrendingUp },
    { label: "Lives Impacted", value: "10M+", icon: Heart },
  ];

  return (
    <div className="min-h-screen bg-[#fbfbfc]">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-peer-green to-green-600 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-[48px] font-semibold">About Impact Idol</h1>
          <p className="mx-auto max-w-2xl text-[18px]">
            The LinkedIn for Volunteers - Your system of record for volunteer impact
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="mb-6 text-center text-[28px] font-semibold text-linear-900">Our Mission</h2>
          <div className="rounded-lg border border-linear-200 bg-white p-8 shadow-sm">
            <p className="mb-4 text-[16px] leading-relaxed text-linear-600">
              Impact Idol exists to make volunteer work as recognizable and valued as professional work. We believe that the time you give to help others deserves to be verified, tracked, and celebrated.
            </p>
            <p className="text-[16px] leading-relaxed text-linear-600">
              We're building a world where your volunteer experience opens doors, creates connections, and inspires others to give back.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-[28px] font-semibold text-linear-900">Our Impact</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="rounded-lg border border-linear-200 bg-white p-6 text-center shadow-sm">
                  <Icon className="mx-auto mb-4 h-12 w-12 text-peer-green" />
                  <div className="mb-2 text-[32px] font-semibold text-peer-green">{stat.value}</div>
                  <div className="text-[13px] text-linear-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="mb-12 text-center text-[28px] font-semibold text-linear-900">Our Values</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-linear-200 bg-white p-6 shadow-sm">
              <Award className="mb-4 h-8 w-8 text-peer-green" />
              <h3 className="mb-2 text-[18px] font-semibold text-linear-900">Trust & Verification</h3>
              <p className="text-[13px] text-linear-600">
                Every hour matters. We ensure all volunteer work is properly verified and recognized.
              </p>
            </div>

            <div className="rounded-lg border border-linear-200 bg-white p-6 shadow-sm">
              <Users className="mb-4 h-8 w-8 text-peer-green" />
              <h3 className="mb-2 text-[18px] font-semibold text-linear-900">Community</h3>
              <p className="text-[13px] text-linear-600">
                Building connections between volunteers, organizations, and causes that matter.
              </p>
            </div>

            <div className="rounded-lg border border-linear-200 bg-white p-6 shadow-sm">
              <TrendingUp className="mb-4 h-8 w-8 text-peer-green" />
              <h3 className="mb-2 text-[18px] font-semibold text-linear-900">Impact</h3>
              <p className="text-[13px] text-linear-600">
                Making it easy to track, measure, and amplify the difference you make in the world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-peer-green py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-[28px] font-semibold">Join the Movement</h2>
          <p className="mb-8 text-[18px]">
            Start tracking your volunteer impact today
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/signup"
              className="h-10 rounded-md bg-white px-6 text-[13px] font-medium text-peer-green transition-colors hover:bg-gray-100"
            >
              Get Started
            </Link>
            <Link
              href="/discover"
              className="h-10 rounded-md border border-white bg-transparent px-6 text-[13px] font-medium text-white transition-colors hover:bg-white/10"
            >
              Browse Opportunities
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
