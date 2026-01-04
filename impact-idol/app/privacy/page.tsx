import { Shield, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicyPage() {
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
          <h1 className="mb-2 text-[32px] font-semibold text-linear-900">Privacy Policy</h1>
          <p className="text-[14px] text-linear-600">Last updated: January 3, 2026</p>
        </div>

        <div className="rounded-lg border border-linear-200 bg-white p-8 shadow-sm">
          <div className="prose max-w-none">
            <h2 className="text-[20px] font-semibold text-linear-900">1. Information We Collect</h2>
            <p className="text-[14px] text-linear-600">
              We collect information you provide directly to us when you create an account, log volunteer hours, message other users, or interact with our platform.
            </p>

            <h3 className="text-[16px] font-semibold text-linear-900">Personal Information</h3>
            <ul className="text-[14px] text-linear-600">
              <li>Name, email address, and profile photo</li>
              <li>Location, headline, and bio</li>
              <li>Volunteer history and hours logged</li>
              <li>Skills, causes, and interests</li>
              <li>Messages and connections with other users</li>
            </ul>

            <h3 className="text-[16px] font-semibold text-linear-900">Automatically Collected Information</h3>
            <ul className="text-[14px] text-linear-600">
              <li>Device and browser information</li>
              <li>IP address and location data</li>
              <li>Usage patterns and activity on the platform</li>
            </ul>

            <h2 className="text-[20px] font-semibold text-linear-900">2. How We Use Your Information</h2>
            <p className="text-[14px] text-linear-600">We use your information to:</p>
            <ul className="text-[14px] text-linear-600">
              <li>Provide and improve our services</li>
              <li>Verify volunteer hours and maintain trust</li>
              <li>Connect you with opportunities and other volunteers</li>
              <li>Send notifications and updates</li>
              <li>Analyze platform usage and trends</li>
            </ul>

            <h2 className="text-[20px] font-semibold text-linear-900">3. Information Sharing</h2>
            <p className="text-[14px] text-linear-600">We share your information only in the following circumstances:</p>
            <ul className="text-[14px] text-linear-600">
              <li><strong>With organizations:</strong> When you volunteer or register for opportunities</li>
              <li><strong>With other users:</strong> Based on your privacy settings</li>
              <li><strong>With service providers:</strong> Who help us operate the platform</li>
              <li><strong>For legal purposes:</strong> When required by law</li>
            </ul>

            <h2 className="text-[20px] font-semibold text-linear-900">4. Your Rights and Choices</h2>
            <p className="text-[14px] text-linear-600">You have the right to:</p>
            <ul className="text-[14px] text-linear-600">
              <li>Access and download your data</li>
              <li>Correct inaccurate information</li>
              <li>Delete your account and data</li>
              <li>Control who sees your profile and activity</li>
              <li>Opt out of marketing communications</li>
            </ul>

            <h2 className="text-[20px] font-semibold text-linear-900">5. Data Security</h2>
            <p className="text-[14px] text-linear-600">
              We use industry-standard security measures to protect your information, including encryption, secure servers, and regular security audits.
            </p>

            <h2 className="text-[20px] font-semibold text-linear-900">6. Data Retention</h2>
            <p className="text-[14px] text-linear-600">
              We retain your information for as long as your account is active or as needed to provide services. You can request deletion of your data at any time.
            </p>

            <h2 className="text-[20px] font-semibold text-linear-900">7. Children's Privacy</h2>
            <p className="text-[14px] text-linear-600">
              Our platform is not intended for users under 13 years of age. We do not knowingly collect information from children under 13.
            </p>

            <h2 className="text-[20px] font-semibold text-linear-900">8. Changes to This Policy</h2>
            <p className="text-[14px] text-linear-600">
              We may update this privacy policy from time to time. We will notify you of significant changes via email or platform notification.
            </p>

            <h2 className="text-[20px] font-semibold text-linear-900">9. Contact Us</h2>
            <p className="text-[14px] text-linear-600">
              If you have questions about this privacy policy, please contact us at:
            </p>
            <p className="text-[14px] text-linear-600">
              <strong>Email:</strong> privacy@impactidol.com<br />
              <strong>Address:</strong> Impact Idol, Inc., 123 Volunteer Way, San Francisco, CA 94102
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
