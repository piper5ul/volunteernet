"use client";

import { useState } from "react";
import { Heart, Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setSubmitted(true);
    toast.success("Password reset link sent!");
  };

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fbfbfc] px-4 py-12">
        <div className="w-full max-w-md">
          <div className="rounded-lg border border-linear-200 bg-white shadow-sm p-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>

            <h1 className="mb-2 text-[20px] font-bold text-linear-900">Check Your Email</h1>
            <p className="mb-6 text-[13px] text-linear-600">
              We've sent password reset instructions to <strong>{email}</strong>
            </p>

            <div className="mb-6 rounded-lg bg-blue-50 border border-blue-200 p-4 text-left">
              <p className="mb-2 text-[12px] font-semibold text-blue-900">Didn't receive the email?</p>
              <ul className="list-inside list-disc space-y-1 text-[11px] text-blue-800">
                <li>Check your spam or junk folder</li>
                <li>Make sure you entered the correct email</li>
                <li>Wait a few minutes and check again</li>
              </ul>
            </div>

            <div className="space-y-2">
              <Link
                href="/login"
                className="block w-full px-4 py-2.5 text-[13px] font-medium text-white bg-linear-900 rounded-md hover:bg-black transition-colors shadow-subtle"
              >
                Back to Login
              </Link>
              <button
                onClick={() => setSubmitted(false)}
                className="w-full px-4 py-2.5 text-[13px] font-medium text-linear-900 bg-white border border-linear-200 rounded-md hover:bg-linear-50 transition-colors"
              >
                Try Different Email
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fbfbfc] px-4 py-12">
      <div className="w-full max-w-md">
        <div className="rounded-lg border border-linear-200 bg-white shadow-sm p-8">
          {/* Logo & Header */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-peer-green/10">
              <Heart className="h-8 w-8 text-peer-green" />
            </div>
            <h1 className="mb-2 text-[24px] font-bold text-linear-900">Forgot Password?</h1>
            <p className="text-[13px] text-linear-600">
              No worries, we'll send you reset instructions
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-[12px] font-medium text-linear-900 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-linear-400" />
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-3 py-2 text-[13px] border border-linear-200 rounded-md focus:outline-none focus:ring-2 focus:ring-linear-900 focus:border-transparent"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2.5 text-[13px] font-medium text-white bg-linear-900 rounded-md hover:bg-black transition-colors shadow-subtle"
            >
              Send Reset Link
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-[12px] text-linear-600 hover:text-peer-green transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
