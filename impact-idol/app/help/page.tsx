"use client";

import {
  Search,
  HelpCircle,
  MessageCircle,
  Mail,
  Book,
  Users,
  Award,
  Shield,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const categories = [
    {
      title: "Getting Started",
      icon: Book,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      articles: 12,
    },
    {
      title: "Volunteering",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-100",
      articles: 18,
    },
    {
      title: "Verification & Hours",
      icon: Award,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      articles: 8,
    },
    {
      title: "Privacy & Security",
      icon: Shield,
      color: "text-red-600",
      bgColor: "bg-red-100",
      articles: 6,
    },
  ];

  const faqs = [
    {
      question: "How do I log volunteer hours?",
      answer: "After completing a volunteer opportunity, you'll receive a prompt to log your hours. You can also add historical volunteer work from your dashboard under 'Add Historical Work'.",
    },
    {
      question: "How does hour verification work?",
      answer: "Organizations can verify your hours directly through the platform. For self-reported hours, you'll need to provide supervisor contact information who can verify your work.",
    },
    {
      question: "Can I connect with other volunteers?",
      answer: "Yes! Use the 'Discover People' feature to find and connect with volunteers who share your interests. You can also join squads for group volunteering.",
    },
    {
      question: "How do I create a squad?",
      answer: "Go to the Squads page and click 'Create Squad'. You can invite friends, family, or coworkers to volunteer together and track collective impact.",
    },
    {
      question: "What are badges and how do I earn them?",
      answer: "Badges are achievements you earn based on your volunteer activities, hours logged, and impact. They're automatically awarded as you reach milestones.",
    },
    {
      question: "How can I export my volunteer history?",
      answer: "Visit your Dashboard and click 'Export PDF' to generate a 'Resume of Good' with all your verified volunteer hours and experiences.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fbfbfc] py-6">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-[32px] font-semibold text-linear-900">Help Center</h1>
          <p className="text-[14px] text-linear-600">
            Find answers and get support
          </p>
        </div>

        {/* Search */}
        <div className="mb-8 rounded-lg border border-linear-200 bg-white p-6 shadow-sm">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-linear-500" />
            <input
              placeholder="Search for help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12 w-full rounded-md border border-linear-200 bg-white pl-12 pr-4 text-[14px] text-linear-900 placeholder:text-linear-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-linear-900"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <div key={category.title} className="rounded-lg border border-linear-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <div className="flex items-start gap-4">
                  <div className={`rounded-lg ${category.bgColor} p-3`}>
                    <Icon className={`h-6 w-6 ${category.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[14px] font-semibold text-linear-900">{category.title}</h3>
                    <p className="mt-1 text-[13px] text-linear-600">
                      {category.articles} articles
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* FAQs */}
        <div className="mb-8 rounded-lg border border-linear-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-[20px] font-semibold text-linear-900">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-linear-200 last:border-0">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="flex w-full items-center justify-between py-3 text-left transition-colors hover:text-peer-green"
                >
                  <span className="text-[13px] font-medium text-linear-900">{faq.question}</span>
                  <HelpCircle className={`h-4 w-4 transition-transform ${openFaq === index ? "rotate-180" : ""}`} />
                </button>
                {openFaq === index && (
                  <div className="pb-3 text-[13px] text-linear-600">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="rounded-lg border border-linear-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-[20px] font-semibold text-linear-900">Still need help?</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/contact"
              className="flex h-auto items-start gap-3 rounded-md border border-linear-200 bg-white p-4 transition-colors hover:bg-linear-50"
            >
              <Mail className="mt-1 h-5 w-5 text-linear-600" />
              <div className="text-left">
                <div className="text-[13px] font-semibold text-linear-900">Email Support</div>
                <div className="text-[11px] text-linear-600">
                  We'll respond within 24 hours
                </div>
              </div>
            </Link>

            <button className="flex h-auto items-start gap-3 rounded-md border border-linear-200 bg-white p-4 text-left transition-colors hover:bg-linear-50">
              <MessageCircle className="mt-1 h-5 w-5 text-linear-600" />
              <div>
                <div className="text-[13px] font-semibold text-linear-900">Live Chat</div>
                <div className="text-[11px] text-linear-600">
                  Chat with our team now
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
