"use client";

import { useAuth } from "@/lib/stores/auth-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { trpc } from "@/lib/utils/trpc";

export default function ProfileRedirectPage() {
  const { currentPersona } = useAuth();
  const router = useRouter();

  // Fetch current user data to get username
  const userId =
    currentPersona.type === "volunteer" || currentPersona.type === "squad-leader"
      ? currentPersona.userId
      : null;

  const { data: currentUser, isLoading } = trpc.users.get.useQuery(
    { id: userId! },
    { enabled: !!userId }
  );

  useEffect(() => {
    if (isLoading) return;

    // Redirect to the user's profile if logged in
    if (currentPersona.type === "volunteer" || currentPersona.type === "squad-leader") {
      if (currentUser?.username) {
        router.push(`/profile/${currentUser.username}`);
      }
    } else if (currentPersona.type === "org-admin") {
      // Redirect org admins somewhere else (maybe their org page)
      router.push("/dashboard");
    } else {
      // Guest users - redirect to login
      router.push("/login");
    }
  }, [currentPersona, currentUser, isLoading, router]);

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="h-14 border-b border-linear-100 flex items-center px-6">
        <Skeleton className="h-5 w-32" />
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-linear-900 border-r-transparent mb-4"></div>
          <p className="text-[13px] text-linear-500">Redirecting to your profile...</p>
        </div>
      </div>
    </div>
  );
}
