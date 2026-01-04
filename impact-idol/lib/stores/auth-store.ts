import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Persona } from "@/lib/types";

interface AuthStore {
  currentPersona: Persona;
  setPersona: (persona: Persona) => void;
  logout: () => void;
}

export const useAuth = create<AuthStore>()(
  persist(
    (set) => ({
      currentPersona: { type: "volunteer", userId: "user-1" }, // Default: Sarah Chen

      setPersona: (persona) => set({ currentPersona: persona }),

      logout: () => set({ currentPersona: { type: "guest" } }),
    }),
    {
      name: "impact-idol-demo-auth",
    }
  )
);
