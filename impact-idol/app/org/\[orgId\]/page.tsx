"use client";

import { useState } from "react";
import { Building2, MapPin, Globe, Mail, Star, Users, Clock, Award, Share2, Heart, Calendar, Briefcase } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

interface OrgProfile {
  id: string;
  name: string;
  mission: string;
  description: string;
  logo: string;
  location: string;
  website: string;
  email: string;
  verificationLevel: "silver" | "gold" | "platinum";
  rating: number;
  totalVolunteers: number;
  totalHours: number;
  activeCauses: string[];
  founded: number;
}

interface Opportunity {
  id: string;
  title: string;
  date: string;
  location: string;
  spots: number;
  cause: string;
}

interface Review {
  id: string;
  volunteerName: string;
  volunteerAvatar: string;
  rating: number;
  text: string;
  date: string;
}

// Mock org data
const mockOrg: OrgProfile = {
  id: "org-123",
  name: "Green Future SF",
  mission: "Building a sustainable future through community-led environmental action",
  description:
    "We're a nonprofit dedicated to environmental sustainability in San Francisco. Through our community programs, we engage local volunteers in activities ranging from urban gardening and park restoration to ocean cleanup and climate advocacy. Our mission is to create lasting environmental change while building community resilience.",
  logo: "GF",
  location: "Mission District, San Francisco, CA",
  website: "https://greenfuturesf.org",
  email: "volunteers@greenfuturesf.org",
  verificationLevel: "platinum",
  rating: 4.8,
  totalVolunteers: 245,
  totalHours: 5200,
  activeCauses: ["Environment", "Community Development", "Climate Action"],
  founded: 2015,
};

const mockOpportunities: Opportunity[] = [
  {
    id: "1",
    title: "Community Garden Spring Cleanup",
    date: "Apr 15, 2024",
    location: "Mission District",
    spots: 5,
    cause: "Environment",
  },
  {
    id: "2",
    title: "Bay Area Coastal Cleanup",
    date: "Apr 22, 2024",
    location: "Ocean Beach",
    spots: 12,
    cause: "Environment",
  },
  {
    id: "3",
    title: "Tree Planting at Golden Gate Park",
    date: "May 1, 2024",
    location: "Golden Gate Park",
    spots: 8,
    cause: "Environment",
  },
];

const mockReviews: Review[] = [
  {
    id: "r1",
    volunteerName: "Sarah Chen",
    volunteerAvatar: "SC",
    rating: 5,
    text: "Incredible experience! The team was so organized and welcoming. I learned a lot about urban gardening and felt like my work made a real impact.",
    date: "3 weeks ago",
  },
  {
    id: "r2",
    volunteerName: "Marcus Rodriguez",
    volunteerAvatar: "MR",
    rating: 5,
    text: "This organization really cares about their volunteers. Clear instructions, good safety practices, and a fun team atmosphere. Signed up for their next event!",
    date: "1 month ago",
  },
  {
    id: "r3",
    volunteerName: "Angela Liu",
    volunteerAvatar: "AL",
    rating: 4,
    text: "Great cause and meaningful work. Only thing I'd improve is more communication before the event about what to bring, but overall a solid experience.",
    date: "6 weeks ago",
  },
];

export default function OrgPublicPage({ params }: { params: { orgId: string } }) {
  const [isSaved, setIsSaved] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    toast.success(isSaved ? "Removed from saved" : "Saved to your favorites");
  };

  const getVerificationBadgeColor = (level: string) => {
    switch (level) {
      case "platinum":
        return "bg-blue-100 text-blue-700 border border-blue-200";
      case "gold":
        return "bg-yellow-100 text-yellow-700 border border-yellow-200";
      case "silver":
        return "bg-gray-100 text-gray-700 border border-gray-200";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-[#fbfbfc]">
      {/* Hero / Header */}
      <div className="bg-white border-b border-linear-200">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <div className="flex items-start gap-6 mb-6">
            {/* Logo */}
            <div className="w-24 h-24 rounded-lg bg-linear-100 flex items-center justify-center shrink-0">
              <span className="text-[32px] font-bold text-linear-700">{mockOrg.logo}</span>
            </div>

            {/* Org Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-[24px] font-bold text-linear-900">{mockOrg.name}</h1>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium ${getVerificationBadgeColor(mockOrg.verificationLevel)}`}>
                  <Award className="h-3.5 w-3.5" />
                  {mockOrg.verificationLevel.charAt(0).toUpperCase() + mockOrg.verificationLevel.slice(1)} Verified
                </span>
              </div>

              <p className="text-[13px] text-linear-600 mb-4 line-clamp-2">
                {mockOrg.mission}
              </p>

              {/* Contact Info */}
              <div className="flex flex-wrap items-center gap-4 text-[12px] text-linear-600">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  {mockOrg.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5" />
                  <a href={mockOrg.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    Website
                  </a>
                </span>
                <span className="flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5" />
                  <a href={`mailto:${mockOrg.email}`} className="hover:underline">
                    Contact
                  </a>
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 shrink-0">
              <button
                onClick={handleShare}
                className="flex items-center gap-2 h-9 px-3 text-[12px] font-medium text-linear-900 bg-white border border-linear-200 rounded-lg hover:bg-linear-50 transition-colors"
              >
                <Share2 className="h-4 w-4" />
                Share
              </button>
              <button
                onClick={handleSave}
                className={`flex items-center gap-2 h-9 px-3 text-[12px] font-medium rounded-lg transition-colors ${
                  isSaved
                    ? "bg-red-100 text-red-700 border border-red-200"
                    : "text-linear-900 bg-white border border-linear-200 hover:bg-linear-50"
                }`}
              >
                <Heart className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
                {isSaved ? "Saved" : "Save"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="mx-auto max-w-6xl px-6 py-6 grid grid-cols-4 gap-4">
        <div className="rounded-lg bg-white border border-linear-200 shadow-sm p-4">
          <p className="text-[11px] font-medium text-linear-600 mb-1">Avg Rating</p>
          <div className="flex items-baseline gap-1">
            <span className="text-[20px] font-bold text-linear-900">{mockOrg.rating}</span>
            <span className="text-[12px] text-linear-600">
              <Star className="h-3 w-3 inline fill-yellow-400 text-yellow-400" />
            </span>
          </div>
        </div>

        <div className="rounded-lg bg-white border border-linear-200 shadow-sm p-4">
          <p className="text-[11px] font-medium text-linear-600 mb-1">Active Volunteers</p>
          <p className="text-[20px] font-bold text-linear-900">{mockOrg.totalVolunteers}</p>
        </div>

        <div className="rounded-lg bg-white border border-linear-200 shadow-sm p-4">
          <p className="text-[11px] font-medium text-linear-600 mb-1">Hours Logged</p>
          <p className="text-[20px] font-bold text-linear-900">{mockOrg.totalHours.toLocaleString()}</p>
        </div>

        <div className="rounded-lg bg-white border border-linear-200 shadow-sm p-4">
          <p className="text-[11px] font-medium text-linear-600 mb-1">Founded</p>
          <p className="text-[20px] font-bold text-linear-900">{mockOrg.founded}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-6 pb-12">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column */}
          <div className="col-span-8 space-y-6">
            {/* About Section */}
            <div className="rounded-lg bg-white border border-linear-200 shadow-sm p-6">
              <h2 className="text-[16px] font-semibold text-linear-900 mb-3">About Us</h2>
              <p className="text-[13px] text-linear-700 leading-relaxed">{mockOrg.description}</p>

              <div className="mt-6 pt-6 border-t border-linear-100">
                <p className="text-[12px] text-linear-600 mb-3">Areas of Focus</p>
                <div className="flex flex-wrap gap-2">
                  {mockOrg.activeCauses.map((cause) => (
                    <span
                      key={cause}
                      className="inline-flex items-center px-3 py-1.5 rounded-full bg-linear-100 text-[12px] font-medium text-linear-700"
                    >
                      {cause}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Upcoming Opportunities */}
            <div className="rounded-lg bg-white border border-linear-200 shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[16px] font-semibold text-linear-900 flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Opportunities
                </h2>
                <Link
                  href="/discover"
                  className="text-[12px] font-medium text-linear-600 hover:text-linear-900"
                >
                  View All →
                </Link>
              </div>

              <div className="space-y-3">
                {mockOpportunities.map((opp) => (
                  <div
                    key={opp.id}
                    className="p-4 rounded-lg border border-linear-100 hover:border-linear-200 hover:bg-linear-50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="text-[13px] font-semibold text-linear-900">{opp.title}</h3>
                      </div>
                      <span className="text-[11px] font-medium text-linear-500 bg-linear-100 px-2 py-0.5 rounded">
                        {opp.cause}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-[11px] text-linear-600">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {opp.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {opp.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" />
                        {opp.spots} spots
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews Section */}
            <div className="rounded-lg bg-white border border-linear-200 shadow-sm p-6">
              <h2 className="text-[16px] font-semibold text-linear-900 mb-4 flex items-center gap-2">
                <Star className="h-5 w-5" />
                Volunteer Reviews
              </h2>

              <div className="space-y-4">
                {mockReviews.map((review) => (
                  <div
                    key={review.id}
                    className="pb-4 border-b border-linear-100 last:border-0 last:pb-0"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-linear-200 flex items-center justify-center">
                          <span className="text-[10px] font-bold text-linear-700">
                            {review.volunteerAvatar}
                          </span>
                        </div>
                        <div>
                          <p className="text-[12px] font-semibold text-linear-900">
                            {review.volunteerName}
                          </p>
                          <p className="text-[11px] text-linear-500">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3.5 w-3.5 ${
                              i < review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-linear-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-[12px] text-linear-700 leading-relaxed">
                      {review.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="col-span-4">
            <div className="rounded-lg bg-white border border-linear-200 shadow-sm p-6 sticky top-6">
              <h3 className="text-[14px] font-semibold text-linear-900 mb-4">
                Want to volunteer?
              </h3>

              <div className="space-y-3 mb-6">
                <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <p className="text-[11px] text-blue-700">
                    ✓ {mockOrg.verificationLevel.toUpperCase()} verified organization
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                  <p className="text-[11px] text-green-700">
                    ✓ {mockOrg.totalVolunteers}+ active volunteers
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-purple-50 border border-purple-200">
                  <p className="text-[11px] text-purple-700">
                    ✓ {mockOrg.rating}★ average rating from volunteers
                  </p>
                </div>
              </div>

              <Link
                href="/discover"
                className="w-full py-2 bg-linear-900 text-white text-[13px] font-medium rounded-lg hover:bg-black transition-colors block text-center mb-2"
              >
                View Opportunities
              </Link>

              <button className="w-full py-2 bg-white text-linear-900 text-[13px] font-medium rounded-lg border border-linear-200 hover:bg-linear-50 transition-colors">
                Follow Organization
              </button>

              {/* Impact Statement */}
              <div className="mt-6 pt-6 border-t border-linear-100">
                <p className="text-[11px] font-medium text-linear-600 mb-2">Organization Impact</p>
                <div className="text-[12px] text-linear-700">
                  <p className="mb-2">
                    <span className="font-semibold text-linear-900">
                      {mockOrg.totalHours.toLocaleString()} hours
                    </span>
                    {" "}of verified volunteer work
                  </p>
                  <p>
                    <span className="font-semibold text-linear-900">
                      ${(mockOrg.totalHours * 30).toLocaleString()}
                    </span>
                    {" "}economic value at $30/hr
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
