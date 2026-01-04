"use client";

import { useState } from "react";
import { trpc } from "@/lib/utils/trpc";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function OnboardingInterestsPage() {
  const router = useRouter();
  const [selectedCauses, setSelectedCauses] = useState<Set<string>>(new Set());

  const { data: causes, isLoading } = trpc.causes.list.useQuery();

  const handleToggleCause = (causeId: string) => {
    setSelectedCauses((prev) => {
      const next = new Set(prev);
      if (next.has(causeId)) {
        next.delete(causeId);
      } else {
        next.add(causeId);
      }
      return next;
    });
  };

  const handleContinue = () => {
    if (selectedCauses.size === 0) {
      toast.error("Please select at least one cause");
      return;
    }

    toast.success("Interests saved!");
    router.push("/onboarding/skills");
  };

  return (
    <div className="min-h-screen bg-[#fbfbfc]">
      {/* Header */}
      <div className="h-14 border-b border-linear-100 bg-white px-6 flex items-center">
        <div className="flex items-center gap-2 text-[11px] text-linear-500">
          <span>Onboarding</span>
          <span>/</span>
          <span className="text-linear-900">Interests</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-3xl">
          {/* Card */}
          <div className="rounded-lg border border-linear-200 bg-white shadow-sm">
            <div className="p-8">
              {/* Header */}
              <div className="mb-8 text-center">
                <h1 className="mb-2 text-[20px] font-semibold text-linear-900">
                  What Causes Do You Care About?
                </h1>
                <p className="text-[12px] text-linear-600">
                  Select the causes you're passionate about (choose at least one)
                </p>
              </div>

              {/* Progress Indicator */}
              <div className="mb-8">
                <div className="mb-2 flex justify-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-linear-200"></div>
                  <div className="h-2 w-2 rounded-full bg-linear-200"></div>
                  <div className="h-2 w-2 rounded-full bg-peer-green"></div>
                  <div className="h-2 w-2 rounded-full bg-linear-200"></div>
                </div>
                <p className="text-center text-[11px] text-linear-600">Step 3 of 4</p>
              </div>

              {/* Causes Grid */}
              {isLoading ? (
                <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-32 animate-pulse rounded-lg bg-linear-100" />
                  ))}
                </div>
              ) : (
                <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {causes?.map((cause) => {
                    const isSelected = selectedCauses.has(cause.id);

                    return (
                      <button
                        key={cause.id}
                        onClick={() => handleToggleCause(cause.id)}
                        className={`relative overflow-hidden rounded-lg border-2 p-6 text-left transition-all ${
                          isSelected
                            ? "border-peer-green bg-peer-green/5 shadow-sm"
                            : "border-linear-200 hover:border-linear-300 hover:shadow-sm"
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-peer-green text-white">
                            <Check className="h-4 w-4" />
                          </div>
                        )}

                        <div
                          className="mb-3 h-12 w-12 rounded-full"
                          style={{ backgroundColor: `${cause.color}20` }}
                        >
                          <div
                            className="flex h-full items-center justify-center text-2xl"
                            style={{ color: cause.color }}
                          >
                            {cause.icon || "❤️"}
                          </div>
                        </div>

                        <h3 className="mb-1 text-[13px] font-semibold text-linear-900">
                          {cause.name}
                        </h3>
                        <p className="line-clamp-2 text-[11px] text-linear-600">
                          {cause.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Selected Count */}
              <div className="mb-6 text-center">
                <div className="inline-flex items-center rounded-md border border-linear-200 bg-linear-100 px-3 py-1 text-[12px] text-linear-900">
                  {selectedCauses.size} {selectedCauses.size === 1 ? "cause" : "causes"} selected
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Link
                  href="/onboarding/profile"
                  className="flex h-9 flex-1 items-center justify-center gap-2 rounded-md border border-linear-200 bg-white text-[13px] text-linear-900 hover:bg-linear-50 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Link>
                <button
                  onClick={handleContinue}
                  disabled={selectedCauses.size === 0}
                  className="flex h-9 flex-1 items-center justify-center gap-2 rounded-md bg-peer-green text-[13px] font-medium text-white hover:bg-green-600 transition-colors shadow-subtle disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              {/* Skip */}
              <div className="mt-4 text-center">
                <Link
                  href="/onboarding/skills"
                  className="text-[12px] text-linear-600 hover:text-peer-green transition-colors"
                >
                  Skip for now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
