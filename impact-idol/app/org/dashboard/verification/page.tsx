"use client";

import { trpc } from "@/lib/utils/trpc";
import { useAuth } from "@/lib/stores/auth-store";
import { Skeleton } from "@/components/ui/skeleton";
import { VerificationQueue } from "@/components/org/verification-queue";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function VerificationPage() {
  const { currentPersona } = useAuth();

  const orgId =
    currentPersona.type === "org-admin" ? currentPersona.orgId : null;

  const { data: pendingVerifications, isLoading, refetch } = trpc.verification.getPendingQueue.useQuery(
    { orgId: orgId! },
    { enabled: !!orgId }
  );

  const verifyMutation = trpc.verification.approve.useMutation({
    onSuccess: () => {
      toast.success("Hours Verified!", {
        description: "The volunteer hours have been verified successfully.",
      });
      refetch();
    },
    onError: (error) => {
      toast.error("Verification Failed", { description: error.message });
    },
  });

  const verifyAllMutation = trpc.verification.approveAll.useMutation({
    onSuccess: (data) => {
      toast.success("All Hours Verified!", {
        description: `${data.count} entries verified successfully.`,
      });
      refetch();
    },
    onError: (error) => {
      toast.error("Verification Failed", { description: error.message });
    },
  });

  const disputeMutation = trpc.verification.dispute.useMutation({
    onSuccess: () => {
      toast.success("Hours Disputed", {
        description: "The entry has been marked as disputed.",
      });
      refetch();
    },
    onError: (error) => {
      toast.error("Dispute Failed", { description: error.message });
    },
  });

  if (!orgId || currentPersona.type !== "org-admin") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fbfbfc]">
        <div className="text-center">
          <h1 className="mb-2 text-[18px] font-semibold text-linear-900">Access Denied</h1>
          <p className="mb-4 text-[13px] text-linear-600">
            You must be an organization admin to view this page.
          </p>
          <Link href="/" className="bg-linear-900 hover:bg-black text-white text-[13px] font-medium px-4 py-2 rounded-md shadow-subtle inline-block">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  const handleVerify = (entryId: string, tier: "SILVER" | "GOLD" | "PLATINUM") => {
    verifyMutation.mutate({ impactId: entryId, tier });
  };

  const handleVerifyAll = (tier: "SILVER" | "GOLD" | "PLATINUM") => {
    if (!pendingVerifications) return;
    const impactIds = pendingVerifications.map((entry) => entry.id);
    verifyAllMutation.mutate({ impactIds, tier });
  };

  const handleDispute = (entryId: string, reason: string) => {
    disputeMutation.mutate({ impactId: entryId, reason });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col h-screen bg-white">
        <div className="h-14 border-b border-linear-100 flex items-center px-6">
          <Skeleton className="h-5 w-48" />
        </div>
        <div className="flex-1 overflow-y-auto bg-[#fbfbfc] p-8">
          <div className="max-w-7xl mx-auto">
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-48" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <header className="h-14 border-b border-linear-100 flex items-center px-6 gap-4 shrink-0">
        <Link href="/org/dashboard" className="text-linear-500 hover:text-linear-900 transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div className="h-4 w-px bg-linear-200"></div>
        <h1 className="font-medium text-[14px] text-linear-900">Hour Verification</h1>
        <div className="h-4 w-px bg-linear-200"></div>
        <span className="text-[13px] text-linear-500">
          {pendingVerifications?.length || 0} pending
        </span>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-[#fbfbfc]">
        <div className="max-w-7xl mx-auto p-8">
          {/* Info Card */}
          <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-5">
            <h3 className="mb-3 text-[14px] font-semibold text-blue-900">Verification Tiers</h3>
            <div className="space-y-2 text-[12px] text-blue-800">
              <div className="flex items-start gap-2">
                <span className="font-semibold shrink-0">🥈 Silver:</span>
                <span>Email verified only. Lowest trust score.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold shrink-0">🥇 Gold:</span>
                <span>QR code check-in/out or GPS verification. Standard verification.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold shrink-0">✨ Platinum:</span>
                <span>
                  Squad booking + organization verification. Highest trust score for grant
                  reporting.
                </span>
              </div>
            </div>
            <p className="mt-3 text-[11px] text-blue-700">
              💡 Note: If not verified within 48 hours, entries will auto-verify as Silver.
            </p>
          </div>

          {/* Verification Queue */}
          <VerificationQueue
            entries={pendingVerifications || []}
            onVerify={handleVerify}
            onVerifyAll={handleVerifyAll}
            onDispute={handleDispute}
            isLoading={verifyMutation.isPending || verifyAllMutation.isPending || disputeMutation.isPending}
          />
        </div>
      </div>
    </div>
  );
}
