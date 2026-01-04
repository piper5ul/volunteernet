import { router } from "../trpc";
import { opportunitiesRouter } from "./opportunities";
import { usersRouter } from "./users";
import { organizationsRouter } from "./organizations";
import { squadsRouter } from "./squads";
import { impactRouter, verificationRouter } from "./impact";
import { messagesRouter, notificationsRouter } from "./messages";
import { feedRouter } from "./feed";
import { connectionsRouter } from "./connections";

/**
 * Root tRPC router
 * All API routes are defined here
 */
export const appRouter = router({
  opportunities: opportunitiesRouter,
  users: usersRouter,
  organizations: organizationsRouter,
  squads: squadsRouter,
  impact: impactRouter,
  verification: verificationRouter,
  messages: messagesRouter,
  notifications: notificationsRouter,
  feed: feedRouter,
  connections: connectionsRouter,
});

export type AppRouter = typeof appRouter;
