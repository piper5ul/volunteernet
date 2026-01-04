"use client";

import { useAuth } from "@/lib/stores/auth-store";
import { User, Building2, Users, UserCircle } from "lucide-react";

export function PersonaSwitcher() {
  const { currentPersona, setPersona } = useAuth();

  const getCurrentLabel = () => {
    if (currentPersona.type === "volunteer") {
      return "Sarah Chen (Volunteer)";
    }
    if (currentPersona.type === "org-admin") {
      return "Green Future SF (Org)";
    }
    if (currentPersona.type === "squad-leader") {
      return "Mike Thompson (Squad Leader)";
    }
    return "Guest";
  };

  const getCurrentIcon = () => {
    if (currentPersona.type === "volunteer") return <User className="h-4 w-4" />;
    if (currentPersona.type === "org-admin") return <Building2 className="h-4 w-4" />;
    if (currentPersona.type === "squad-leader") return <Users className="h-4 w-4" />;
    return <UserCircle className="h-4 w-4" />;
  };

  return (
    <div className="relative inline-block text-left">
      <div className="flex items-center gap-2 rounded-lg border border-yellow-400 bg-yellow-50 px-3 py-1.5 text-sm">
        {getCurrentIcon()}
        <span className="font-medium">{getCurrentLabel()}</span>
        <span className="text-xs text-yellow-700">(DEMO)</span>
        <select
          value={JSON.stringify(currentPersona)}
          onChange={(e) => setPersona(JSON.parse(e.target.value))}
          className="absolute inset-0 w-full cursor-pointer opacity-0"
        >
          <option value={JSON.stringify({ type: "guest" })}>Guest (Not logged in)</option>
          <option value={JSON.stringify({ type: "volunteer", userId: "user-1" })}>
            Sarah Chen (Volunteer)
          </option>
          <option value={JSON.stringify({ type: "volunteer", userId: "user-2" })}>
            James Rodriguez (Volunteer)
          </option>
          <option
            value={JSON.stringify({ type: "squad-leader", userId: "user-3", squadId: "squad-1" })}
          >
            Mike Thompson (Squad Leader)
          </option>
          <option value={JSON.stringify({ type: "org-admin", orgId: "org-1" })}>
            Green Future SF (Organization)
          </option>
          <option value={JSON.stringify({ type: "org-admin", orgId: "org-2" })}>
            SF Education Coalition (Organization)
          </option>
        </select>
      </div>
    </div>
  );
}
