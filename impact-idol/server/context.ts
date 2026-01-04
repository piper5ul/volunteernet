import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { db } from "./db";

/**
 * Create tRPC context
 * This is called for every tRPC request
 */
export async function createContext(opts: FetchCreateContextFnOptions) {
  // In production, get user from session/JWT
  // For demo, we'll get it from headers or use a default
  const userId = opts.req.headers.get("x-user-id") || null;
  const userType = opts.req.headers.get("x-user-type") || "guest";
  const orgId = opts.req.headers.get("x-org-id") || null;

  return {
    db,
    user: userId
      ? {
          id: userId,
          type: userType as "volunteer" | "org-admin" | "squad-leader" | "guest",
          orgId: orgId,
        }
      : null,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
