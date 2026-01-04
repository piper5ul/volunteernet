"use client";

import { useAuth } from "@/lib/stores/auth-store";
import { OrgNavigation } from "@/components/org/org-navigation";
import { VolunteerNavigation } from "@/components/volunteer/volunteer-navigation";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { currentPersona } = useAuth();

  // Determine which navigation to show based on persona
  const showOrgNavigation = currentPersona?.type === "organization";
  const showVolunteerNavigation = currentPersona?.type === "volunteer" || currentPersona?.type === "squad-leader";

  return (
    <div className="flex flex-col min-h-screen">
      {showOrgNavigation && <OrgNavigation />}
      {showVolunteerNavigation && <VolunteerNavigation />}
      {children}
    </div>
  );
}
