"use client";

import { useState } from "react";
import { Mail, MessageCircle, Send } from "lucide-react";
import { toast } from "sonner";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you within 24 hours.");
    setFormData({ name: "", email: "", category: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-[#fbfbfc] py-12">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-[32px] font-semibold text-linear-900">Contact Us</h1>
          <p className="text-[14px] text-linear-600">
            Have a question? We're here to help.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Contact Form */}
          <div className="lg:col-span-2 rounded-lg border border-linear-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-[18px] font-semibold text-linear-900">Send us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-[13px] font-medium text-linear-900">
                    Name
                  </label>
                  <input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="h-9 w-full rounded-md border border-linear-200 bg-white px-3 text-[13px] text-linear-900 placeholder:text-linear-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-linear-900"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-1.5 block text-[13px] font-medium text-linear-900">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="h-9 w-full rounded-md border border-linear-200 bg-white px-3 text-[13px] text-linear-900 placeholder:text-linear-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-linear-900"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="category" className="mb-1.5 block text-[13px] font-medium text-linear-900">
                  Category
                </label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="h-9 w-full rounded-md border border-linear-200 bg-white px-3 text-[13px] text-linear-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-linear-900"
                >
                  <option value="">Select a category</option>
                  <option value="general">General Inquiry</option>
                  <option value="technical">Technical Support</option>
                  <option value="verification">Hour Verification Issue</option>
                  <option value="partnership">Partnership Opportunity</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="mb-1.5 block text-[13px] font-medium text-linear-900">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={6}
                  className="w-full rounded-md border border-linear-200 bg-white px-3 py-2 text-[13px] text-linear-900 placeholder:text-linear-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-linear-900"
                />
              </div>

              <button
                type="submit"
                className="flex h-9 w-full items-center justify-center gap-2 rounded-md bg-peer-green px-4 text-[13px] font-medium text-white transition-colors hover:bg-green-600"
              >
                <Send className="h-4 w-4" />
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <div className="rounded-lg border border-linear-200 bg-white p-6 shadow-sm">
              <Mail className="mb-4 h-8 w-8 text-peer-green" />
              <h3 className="mb-2 text-[14px] font-semibold text-linear-900">Email Support</h3>
              <p className="mb-2 text-[13px] text-linear-600">
                We typically respond within 24 hours
              </p>
              <a href="mailto:support@impactidol.com" className="text-[13px] text-peer-green transition-colors hover:text-green-700">
                support@impactidol.com
              </a>
            </div>

            <div className="rounded-lg border border-linear-200 bg-white p-6 shadow-sm">
              <MessageCircle className="mb-4 h-8 w-8 text-peer-green" />
              <h3 className="mb-2 text-[14px] font-semibold text-linear-900">Live Chat</h3>
              <p className="mb-4 text-[13px] text-linear-600">
                Chat with our team in real-time
              </p>
              <button className="h-9 w-full rounded-md border border-linear-200 bg-white px-4 text-[13px] text-linear-900 transition-colors hover:bg-linear-50">
                Start Chat
              </button>
            </div>

            <div className="rounded-lg border border-linear-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-[14px] font-semibold text-linear-900">FAQs</h3>
              <p className="mb-4 text-[13px] text-linear-600">
                Find answers to common questions
              </p>
              <a
                href="/help"
                className="flex h-9 w-full items-center justify-center rounded-md border border-linear-200 bg-white px-4 text-[13px] text-linear-900 transition-colors hover:bg-linear-50"
              >
                View Help Center
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
