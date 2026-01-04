import { FileText, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TermsOfServicePage() {
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
          <FileText className="mx-auto mb-4 h-16 w-16 text-peer-green" />
          <h1 className="mb-2 text-[32px] font-semibold text-linear-900">Terms of Service</h1>
          <p className="text-[14px] text-linear-600">Last updated: January 3, 2026</p>
        </div>

        <div className="rounded-lg border border-linear-200 bg-white p-8 shadow-sm">
          <div className="prose max-w-none">
            <h2 className="text-[20px] font-semibold text-linear-900">1. Acceptance of Terms</h2>
            <p className="text-[14px] text-linear-600">
              By accessing or using Impact Idol, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>

            <h2 className="text-[20px] font-semibold text-linear-900">2. Eligibility</h2>
            <p className="text-[14px] text-linear-600">
              You must be at least 13 years old to use Impact Idol. If you are under 18, you must have permission from a parent or guardian.
            </p>

            <h2 className="text-[20px] font-semibold text-linear-900">3. User Accounts</h2>
            <h3 className="text-[16px] font-semibold text-linear-900">Account Creation</h3>
            <ul className="text-[14px] text-linear-600">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your password</li>
              <li>Notify us immediately of unauthorized access</li>
              <li>You are responsible for all activity on your account</li>
            </ul>

            <h3 className="text-[16px] font-semibold text-linear-900">Account Termination</h3>
            <p className="text-[14px] text-linear-600">
              We reserve the right to suspend or terminate accounts that violate these terms or engage in harmful behavior.
            </p>

            <h2 className="text-[20px] font-semibold text-linear-900">4. User Conduct</h2>
            <p className="text-[14px] text-linear-600">You agree not to:</p>
            <ul className="text-[14px] text-linear-600">
              <li>Falsify volunteer hours or verification information</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Post inappropriate, offensive, or illegal content</li>
              <li>Impersonate others or create fake accounts</li>
              <li>Spam or send unsolicited messages</li>
              <li>Interfere with the platform's operation</li>
            </ul>

            <h2 className="text-[20px] font-semibold text-linear-900">5. Volunteer Hour Verification</h2>
            <p className="text-[14px] text-linear-600">
              You agree to accurately report volunteer hours and provide truthful information for verification. Falsifying hours may result in account termination.
            </p>

            <h2 className="text-[20px] font-semibold text-linear-900">6. Content Ownership</h2>
            <h3 className="text-[16px] font-semibold text-linear-900">Your Content</h3>
            <p className="text-[14px] text-linear-600">
              You retain ownership of content you post. By posting content, you grant us a license to use, display, and distribute it on the platform.
            </p>

            <h3 className="text-[16px] font-semibold text-linear-900">Platform Content</h3>
            <p className="text-[14px] text-linear-600">
              Impact Idol and its content are protected by copyright and other intellectual property laws. You may not copy, modify, or distribute our content without permission.
            </p>

            <h2 className="text-[20px] font-semibold text-linear-900">7. Privacy</h2>
            <p className="text-[14px] text-linear-600">
              Your use of Impact Idol is subject to our Privacy Policy. Please review it to understand how we collect and use your information.
            </p>

            <h2 className="text-[20px] font-semibold text-linear-900">8. Disclaimers</h2>
            <p className="text-[14px] text-linear-600">
              Impact Idol is provided "as is" without warranties of any kind. We do not guarantee:
            </p>
            <ul className="text-[14px] text-linear-600">
              <li>Uninterrupted or error-free service</li>
              <li>Accuracy of user-provided information</li>
              <li>Specific results from using the platform</li>
            </ul>

            <h2 className="text-[20px] font-semibold text-linear-900">9. Limitation of Liability</h2>
            <p className="text-[14px] text-linear-600">
              Impact Idol shall not be liable for any indirect, incidental, or consequential damages arising from your use of the platform.
            </p>

            <h2 className="text-[20px] font-semibold text-linear-900">10. Indemnification</h2>
            <p className="text-[14px] text-linear-600">
              You agree to indemnify and hold harmless Impact Idol from any claims arising from your use of the platform or violation of these terms.
            </p>

            <h2 className="text-[20px] font-semibold text-linear-900">11. Changes to Terms</h2>
            <p className="text-[14px] text-linear-600">
              We may update these terms from time to time. Continued use of the platform after changes constitutes acceptance of the new terms.
            </p>

            <h2 className="text-[20px] font-semibold text-linear-900">12. Governing Law</h2>
            <p className="text-[14px] text-linear-600">
              These terms are governed by the laws of the State of California, United States.
            </p>

            <h2 className="text-[20px] font-semibold text-linear-900">13. Contact Us</h2>
            <p className="text-[14px] text-linear-600">
              Questions about these terms? Contact us at:
            </p>
            <p className="text-[14px] text-linear-600">
              <strong>Email:</strong> legal@impactidol.com<br />
              <strong>Address:</strong> Impact Idol, Inc., 123 Volunteer Way, San Francisco, CA 94102
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
