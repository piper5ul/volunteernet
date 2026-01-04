"use client";

import { use, useState } from "react";
import { trpc } from "@/lib/utils/trpc";
import { useAuth } from "@/lib/stores/auth-store";
import { Skeleton } from "@/components/ui/skeleton";
import {
  MapPin,
  Calendar,
  Award,
  Clock,
  Share2,
  MessageCircle,
  CheckCircle2,
  Briefcase,
  GraduationCap,
  Star,
  Globe,
} from "lucide-react";
import { formatDate } from "@/lib/utils/date-utils";
import Link from "next/link";
import { format } from "date-fns";

export default function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = use(params);
  const { currentPersona } = useAuth();
  const [activeTab, setActiveTab] = useState<"impact" | "skills" | "endorsements" | "badges">("impact");

  const { data: user, isLoading } = trpc.users.getByUsername.useQuery({ username });
  const { data: stats } = trpc.users.getImpactStats.useQuery(
    { userId: user?.id || "" },
    { enabled: !!user }
  );
  const { data: timeline } = trpc.users.getTimeline.useQuery(
    { userId: user?.id || "" },
    { enabled: !!user }
  );
  const { data: badges } = trpc.users.getBadges.useQuery(
    { userId: user?.id || "" },
    { enabled: !!user }
  );
  const { data: endorsements } = trpc.users.getEndorsements.useQuery(
    { userId: user?.id || "" },
    { enabled: !!user }
  );

  if (isLoading) {
    return (
      <div className="flex flex-col h-screen bg-white">
        <div className="h-14 border-b border-linear-100 flex items-center px-6">
          <Skeleton className="h-5 w-32" />
        </div>
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto">
            <Skeleton className="h-48 mb-6" />
            <Skeleton className="h-96" />
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fbfbfc]">
        <div className="text-center">
          <h1 className="mb-2 text-[18px] font-semibold text-linear-900">Profile Not Found</h1>
          <p className="mb-4 text-[13px] text-linear-600">
            This user doesn't exist or their profile is private.
          </p>
          <Link href="/discover" className="bg-linear-900 hover:bg-black text-white text-[13px] font-medium px-4 py-2 rounded-md shadow-subtle inline-block">
            Browse Opportunities
          </Link>
        </div>
      </div>
    );
  }

  const isOwnProfile =
    (currentPersona.type === "volunteer" || currentPersona.type === "squad-leader") &&
    currentPersona.userId === user.id;

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <header className="h-14 border-b border-linear-100 flex items-center px-6 gap-4 shrink-0">
        <h1 className="font-medium text-[14px] text-linear-900">Profile</h1>
        <div className="h-4 w-px bg-linear-200"></div>
        <span className="text-[13px] text-linear-500">@{username}</span>

        <div className="ml-auto flex items-center gap-3">
          {isOwnProfile ? (
            <Link href="/profile/edit" className="bg-linear-900 text-white text-[12px] font-medium px-3 py-1.5 rounded hover:bg-black transition-colors shadow-subtle">
              Edit Profile
            </Link>
          ) : (
            <>
              <button className="bg-linear-900 text-white text-[12px] font-medium px-3 py-1.5 rounded hover:bg-black transition-colors shadow-subtle flex items-center gap-1.5">
                <MessageCircle className="w-3.5 h-3.5" />
                Message
              </button>
              <button className="p-1.5 hover:bg-linear-100 rounded text-linear-500 hover:text-linear-900 transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Profile Header Section */}
        <div className="border-b border-linear-100 bg-[#fbfbfc] p-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-6">
              {/* Avatar */}
              <div className="w-24 h-24 rounded-full bg-linear-100 flex items-center justify-center text-[24px] font-bold text-linear-700 shrink-0">
                {user.avatar_url ? (
                  <img src={user.avatar_url} alt={user.name} className="w-full h-full rounded-full object-cover" />
                ) : (
                  initials
                )}
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-[18px] font-semibold text-linear-900">{user.name}</h2>
                      {user.is_verified && (
                        <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-linear-100 text-[10px] font-medium text-linear-700 border border-linear-200">
                          <CheckCircle2 className="w-3 h-3 text-peer-green" />
                          Verified
                        </div>
                      )}
                    </div>
                    {user.headline && (
                      <p className="text-[13px] text-linear-600 mb-2">{user.headline}</p>
                    )}
                    <div className="flex items-center gap-3 text-[12px] text-linear-500">
                      {user.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {typeof user.location === 'string' ? user.location : user.location.name}
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        Joined {formatDate(user.created_at, "MMM yyyy")}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                {user.bio && (
                  <p className="text-[13px] text-linear-600 leading-relaxed mb-4">{user.bio}</p>
                )}

                {/* Links */}
                {(user.website_url || user.linkedin_url) && (
                  <div className="flex gap-3 mb-4">
                    {user.website_url && (
                      <a
                        href={user.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-[12px] text-linear-900 hover:underline"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        Website
                      </a>
                    )}
                    {user.linkedin_url && (
                      <a
                        href={user.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-[12px] text-linear-900 hover:underline"
                      >
                        <Briefcase className="w-3.5 h-3.5" />
                        LinkedIn
                      </a>
                    )}
                  </div>
                )}

                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 rounded-lg border border-linear-200 bg-white">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-linear-500" />
                      <span className="text-[11px] text-linear-500 font-medium">Hours</span>
                    </div>
                    <p className="text-[18px] font-semibold text-linear-900">{stats?.totalHours || 0}</p>
                  </div>
                  <div className="p-3 rounded-lg border border-linear-200 bg-white">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle2 className="w-4 h-4 text-linear-500" />
                      <span className="text-[11px] text-linear-500 font-medium">Verified</span>
                    </div>
                    <p className="text-[18px] font-semibold text-linear-900">{stats?.verifiedHours || 0}</p>
                  </div>
                  <div className="p-3 rounded-lg border border-linear-200 bg-white">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="w-4 h-4 text-linear-500" />
                      <span className="text-[11px] text-linear-500 font-medium">Orgs</span>
                    </div>
                    <p className="text-[18px] font-semibold text-linear-900">{stats?.organizationCount || 0}</p>
                  </div>
                  <div className="p-3 rounded-lg border border-linear-200 bg-white">
                    <div className="flex items-center gap-2 mb-1">
                      <Award className="w-4 h-4 text-linear-500" />
                      <span className="text-[11px] text-linear-500 font-medium">Badges</span>
                    </div>
                    <p className="text-[18px] font-semibold text-linear-900">{badges?.length || 0}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-linear-100 bg-white">
          <div className="max-w-4xl mx-auto px-8">
            <div className="flex gap-6">
              {['impact', 'skills', 'endorsements', 'badges'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`py-3 text-[13px] font-medium border-b-2 transition-colors capitalize ${
                    activeTab === tab
                      ? 'border-linear-900 text-linear-900'
                      : 'border-transparent text-linear-500 hover:text-linear-900'
                  }`}
                >
                  {tab}
                  {tab === 'endorsements' && endorsements && ` (${endorsements.length})`}
                  {tab === 'badges' && badges && ` (${badges.length})`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-8">
          <div className="max-w-4xl mx-auto">
            {/* Impact Tab */}
            {activeTab === 'impact' && (
              <div className="space-y-6">
                {/* Impact by Cause */}
                <div>
                  <h3 className="text-[14px] font-medium text-linear-900 mb-4">Impact by Cause</h3>
                  <div className="space-y-3">
                    {stats?.causeBreakdown && stats.causeBreakdown.length > 0 ? (
                      stats.causeBreakdown.map((cause) => (
                        <div key={cause.causeId}>
                          <div className="mb-1.5 flex items-center justify-between text-[12px]">
                            <span className="font-medium text-linear-900">{cause.causeName}</span>
                            <span className="text-linear-500">{cause.hours}h</span>
                          </div>
                          <div className="h-1.5 w-full overflow-hidden rounded-full bg-linear-200">
                            <div
                              className="h-full rounded-full bg-peer-green"
                              style={{
                                width: `${(cause.hours / (stats.totalHours || 1)) * 100}%`,
                              }}
                            />
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-[13px] text-linear-500">No impact data yet</p>
                    )}
                  </div>
                </div>

                {/* Volunteer History */}
                <div>
                  <h3 className="text-[14px] font-medium text-linear-900 mb-4">Volunteer History</h3>
                  <div className="relative border-l border-linear-200 ml-2 space-y-6 pl-6">
                    {timeline && timeline.length > 0 ? (
                      timeline.slice(0, 10).map((entry) => (
                        <div key={entry.id} className="relative">
                          <div className="absolute -left-[29px] top-1 w-3 h-3 bg-white border border-linear-300 rounded-full"></div>
                          <div className="text-[13px] text-linear-900">
                            <span className="font-medium">{entry.role_title || entry.opportunity?.title}</span>
                            {entry.organization && (
                              <> at <span className="font-medium">{entry.organization.name}</span></>
                            )}
                          </div>
                          <div className="text-[12px] text-linear-400 mt-0.5">
                            {format(new Date(entry.date), "MMM d, yyyy")} • {entry.hours_logged || 0} hours
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="relative">
                        <div className="absolute -left-[29px] top-1 w-3 h-3 bg-white border border-linear-300 rounded-full"></div>
                        <div className="text-[13px] text-linear-500">No volunteer history yet</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Skills Tab */}
            {activeTab === 'skills' && (
              <div className="grid gap-8 md:grid-cols-2">
                {/* Skills Offered */}
                <div>
                  <h3 className="mb-3 flex items-center gap-2 text-[14px] font-medium text-linear-900">
                    <Briefcase className="w-4 h-4" />
                    Skills I Can Offer
                  </h3>
                  {user.skills_offered && user.skills_offered.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {user.skills_offered.map((skill) => (
                        <span key={skill} className="px-2 py-1 rounded-md bg-linear-100 text-[12px] font-medium text-linear-700 border border-linear-200">
                          {skill}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[13px] text-linear-500">No skills listed</p>
                  )}
                </div>

                {/* Skills to Gain */}
                <div>
                  <h3 className="mb-3 flex items-center gap-2 text-[14px] font-medium text-linear-900">
                    <GraduationCap className="w-4 h-4" />
                    Skills I Want to Gain
                  </h3>
                  {user.skills_to_gain && user.skills_to_gain.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {user.skills_to_gain.map((skill) => (
                        <span key={skill} className="px-2 py-1 rounded-md bg-white text-[12px] font-medium text-linear-700 border border-linear-200">
                          {skill}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[13px] text-linear-500">No skills listed</p>
                  )}
                </div>
              </div>
            )}

            {/* Endorsements Tab */}
            {activeTab === 'endorsements' && (
              <div>
                {endorsements && endorsements.length > 0 ? (
                  <div className="space-y-3">
                    {endorsements.map((endorsement) => (
                      <div key={endorsement.id} className="rounded-lg border border-linear-200 p-4 bg-white">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-linear-100 flex items-center justify-center text-[12px] font-medium text-linear-700">
                              {endorsement.organization?.logo_url ? (
                                <img
                                  src={endorsement.organization.logo_url}
                                  alt={endorsement.organization.name}
                                  className="w-full h-full rounded-full object-cover"
                                />
                              ) : (
                                endorsement.organization?.name[0]
                              )}
                            </div>
                            <div>
                              <p className="text-[13px] font-medium text-linear-900">{endorsement.organization?.name}</p>
                              <p className="text-[11px] text-linear-500">
                                {formatDate(endorsement.created_at, "MMM d, yyyy")}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3.5 h-3.5 ${
                                  i < endorsement.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-linear-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        {endorsement.message && (
                          <p className="text-[13px] text-linear-600">{endorsement.message}</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <Star className="mx-auto mb-2 h-8 w-8 text-linear-400" />
                    <p className="text-[13px] text-linear-500">No endorsements yet</p>
                  </div>
                )}
              </div>
            )}

            {/* Badges Tab */}
            {activeTab === 'badges' && (
              <div>
                {badges && badges.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {badges.map((badge) => (
                      <div
                        key={badge.id}
                        className="flex flex-col items-center gap-3 rounded-lg border border-linear-200 p-6 text-center bg-white"
                      >
                        <div className="text-4xl">{badge.icon}</div>
                        <div>
                          <p className="text-[13px] font-semibold text-linear-900">{badge.name}</p>
                          <p className="text-[12px] text-linear-500 mt-1">{badge.description}</p>
                        </div>
                        <span className="px-2 py-1 rounded-md bg-linear-100 text-[10px] font-medium text-linear-700 border border-linear-200">
                          Earned {formatDate(badge.earned_at, "MMM yyyy")}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <Award className="mx-auto mb-2 h-8 w-8 text-linear-400" />
                    <p className="text-[13px] text-linear-500">No badges earned yet</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
