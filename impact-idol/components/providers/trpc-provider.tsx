"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";
import { trpc } from "@/lib/utils/trpc";
import SuperJSON from "superjson";
import { useAuth } from "@/lib/stores/auth-store";

function getBaseUrl() {
  if (typeof window !== "undefined") return "";
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export function TRPCProvider({ children }: { children: React.ReactNode }) {
  const { currentPersona } = useAuth();

  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
      },
    },
  }));

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
          transformer: SuperJSON,
          headers() {
            // Pass current persona to API via headers for mock auth
            const headers: Record<string, string> = {};

            if (currentPersona.type === "volunteer") {
              headers["x-user-id"] = currentPersona.userId;
              headers["x-user-type"] = "volunteer";
            } else if (currentPersona.type === "org-admin") {
              headers["x-org-id"] = currentPersona.orgId;
              headers["x-user-type"] = "org-admin";
            } else if (currentPersona.type === "squad-leader") {
              headers["x-user-id"] = currentPersona.userId;
              headers["x-user-type"] = "squad-leader";
            }

            return headers;
          },
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
