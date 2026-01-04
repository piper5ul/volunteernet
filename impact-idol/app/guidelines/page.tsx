"use client";

import { Shield, ArrowLeft, Heart, Users, AlertCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function CommunityGuidelinesPage() {
  return (
    <div className="min-h-screen bg-[#fbfbfc] py-12">
      <div className="container mx-auto max-w-4xl px-4">
        <Link
          href="/"
          className="mb-4 inline-flex h-8 items-center gap-2 text-[13px] text-linear-600 transition-colors hover:text-linear-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="mb-8 text-center">
          <Shield className="mx-auto mb-4 h-16 w-16 text-peer-green" />
          <h1 className="mb-2 text-[32px] font-semibold text-linear-900">Community Guidelines</h1>
          <p className="text-[14px] text-linear-600">
            Help us maintain a positive, inclusive community
          </p>
        </div>

        <div className="mb-6 rounded-lg border border-linear-200 bg-white p-8 shadow-sm">
          <div className="prose max-w-none">
            {/* Our Values */}
            <div className="mb-8">
              <div className="mb-4 flex items-center gap-3">
                <Heart className="h-6 w-6 text-peer-green" />
                <h2 className="m-0 text-[20px] font-semibold text-linear-900">Our Values</h2>
              </div>
              <p className="text-[14px] text-linear-600">
                Impact Idol is built on values of kindness, integrity, and community service. We
                believe volunteer work should be celebrated, verified, and accessible to all.
              </p>
            </div>

            {/* Do's */}
            <div className="mb-8">
              <div className="mb-4 flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
                <h2 className="m-0 text-[20px] font-semibold text-linear-900">Do's</h2>
              </div>
              <ul className="space-y-2 text-[14px] text-linear-600">
                <li>✅ Be respectful and kind to all community members</li>
                <li>✅ Accurately report your volunteer hours</li>
                <li>✅ Provide genuine feedback and reviews</li>
                <li>✅ Support and encourage fellow volunteers</li>
                <li>✅ Honor your volunteer commitments</li>
                <li>✅ Respect organizational boundaries and policies</li>
                <li>✅ Report any issues or concerns to our team</li>
                <li>✅ Celebrate others' volunteer achievements</li>
              </ul>
            </div>

            {/* Don'ts */}
            <div className="mb-8">
              <div className="mb-4 flex items-center gap-3">
                <AlertCircle className="h-6 w-6 text-red-600" />
                <h2 className="m-0 text-[20px] font-semibold text-linear-900">Don'ts</h2>
              </div>
              <ul className="space-y-2 text-[14px] text-linear-600">
                <li>❌ Falsify volunteer hours or verification</li>
                <li>❌ Harass, bully, or discriminate against others</li>
                <li>❌ Post inappropriate, offensive, or illegal content</li>
                <li>❌ Spam or send unsolicited promotional messages</li>
                <li>❌ Impersonate others or create fake accounts</li>
                <li>❌ Share others' private information without consent</li>
                <li>❌ Use the platform for commercial solicitation</li>
                <li>❌ No-show repeatedly without notice</li>
              </ul>
            </div>

            {/* Specific Rules */}
            <h2 className="text-[20px] font-semibold text-linear-900">Specific Guidelines</h2>

            <h3 className="text-[16px] font-semibold text-linear-900">1. Hour Verification</h3>
            <p className="text-[14px] text-linear-600">
              All volunteer hours must be accurate and verifiable. Falsifying hours undermines
              trust and may result in account suspension. Only log hours for actual volunteer
              work completed.
            </p>

            <h3 className="text-[16px] font-semibold text-linear-900">2. Reviews & Ratings</h3>
            <p className="text-[14px] text-linear-600">
              Reviews should be honest, constructive, and based on personal experience. Don't
              post fake reviews or attempt to manipulate ratings. Organizations can respond to
              reviews professionally.
            </p>

            <h3 className="text-[16px] font-semibold text-linear-900">3. Profile Information</h3>
            <p className="text-[14px] text-linear-600">
              Use your real name and accurate information. Profile photos should be appropriate
              and represent you. Don't use misleading credentials or affiliations.
            </p>

            <h3 className="text-[16px] font-semibold text-linear-900">4. Communication</h3>
            <p className="text-[14px] text-linear-600">
              Messages should be respectful and related to volunteering. Don't send spam,
              promotional content, or harassing messages. Organizations should only message
              volunteers about legitimate opportunities.
            </p>

            <h3 className="text-[16px] font-semibold text-linear-900">5. Privacy & Safety</h3>
            <p className="text-[14px] text-linear-600">
              Respect others' privacy. Don't share personal contact information, addresses, or
              sensitive details without permission. Report any safety concerns immediately.
            </p>

            <h3 className="text-[16px] font-semibold text-linear-900">6. Content Posting</h3>
            <p className="text-[14px] text-linear-600">
              Posts, photos, and comments should be relevant to volunteering. No hate speech,
              graphic content, or illegal material. Give credit when sharing others' work or
              photos.
            </p>

            <h3 className="text-[16px] font-semibold text-linear-900">7. Endorsements & Recommendations</h3>
            <p className="text-[14px] text-linear-600">
              Only endorse skills you've personally witnessed. Recommendations should be
              genuine and based on actual volunteer work together. Don't exchange endorsements
              for personal gain.
            </p>

            {/* Enforcement */}
            <div className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-6">
              <h3 className="mb-3 text-[16px] font-semibold text-blue-900">Enforcement</h3>
              <p className="mb-2 text-[13px] text-blue-800">
                Violations of these guidelines may result in:
              </p>
              <ul className="space-y-1 text-[13px] text-blue-800">
                <li>• Warning and request to remove content</li>
                <li>• Temporary account suspension</li>
                <li>• Permanent account termination</li>
                <li>• Legal action for severe violations</li>
              </ul>
            </div>

            {/* Reporting */}
            <h2 className="text-[20px] font-semibold text-linear-900">Reporting Violations</h2>
            <p className="text-[14px] text-linear-600">
              If you see content or behavior that violates these guidelines, please report it
              using the report button or contact us at{" "}
              <strong>support@impactidol.com</strong>. All reports are reviewed promptly and
              kept confidential.
            </p>

            {/* Thank You */}
            <div className="mt-8 rounded-lg border border-green-200 bg-green-50 p-6 text-center">
              <Users className="mx-auto mb-3 h-12 w-12 text-green-600" />
              <h3 className="mb-2 text-[16px] font-semibold text-green-900">Thank You!</h3>
              <p className="text-[13px] text-green-800">
                Thank you for helping us maintain a positive, supportive community where
                volunteers can connect, grow, and make a difference together.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
