import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { publicProcedure, router } from "../trpc";
import { db } from "../db";

export const connectionsRouter = router({
  // Get user's connections
  getConnections: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        limit: z.number().min(1).max(100).default(50),
        offset: z.number().min(0).default(0),
      })
    )
    .query(async ({ input }) => {
      const { userId, limit, offset } = input;

      // Get all connections where user is either follower or following
      const connections = Array.from(db.userFollows.values())
        .filter(
          (conn) =>
            conn.follower_id === userId &&
            conn.following_id !== userId &&
            conn.status === "ACCEPTED"
        )
        .map((conn) => {
          const connectedUser = db.users.get(conn.following_id);
          if (!connectedUser) return null;

          // Count mutual connections
          const mutualConnections = Array.from(db.userFollows.values()).filter(
            (c) =>
              c.follower_id === userId &&
              c.following_id !== userId &&
              Array.from(db.userFollows.values()).some(
                (c2) =>
                  c2.follower_id === conn.following_id &&
                  c2.following_id === c.following_id &&
                  c2.status === "ACCEPTED"
              )
          ).length;

          return {
            id: connectedUser.id,
            name: connectedUser.name,
            username: connectedUser.username,
            avatar_url: connectedUser.avatar_url,
            headline: connectedUser.headline,
            location: connectedUser.location,
            mutualConnections,
            connected_at: conn.created_at,
          };
        })
        .filter((c) => c !== null);

      // Sort by most recent connection
      const sortedConnections = connections.sort(
        (a, b) =>
          new Date(b!.connected_at).getTime() - new Date(a!.connected_at).getTime()
      );

      return {
        connections: sortedConnections.slice(offset, offset + limit),
        total: connections.length,
      };
    }),

  // Get connection requests (pending)
  getConnectionRequests: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { userId } = input;

      // Get pending requests where user is the following_id (received requests)
      const requests = Array.from(db.userFollows.values())
        .filter(
          (conn) =>
            conn.following_id === userId &&
            conn.status === "PENDING"
        )
        .map((conn) => {
          const requester = db.users.get(conn.follower_id);
          if (!requester) return null;

          // Count mutual connections
          const mutualConnections = Array.from(db.userFollows.values()).filter(
            (c) =>
              c.follower_id === userId &&
              c.status === "ACCEPTED" &&
              Array.from(db.userFollows.values()).some(
                (c2) =>
                  c2.follower_id === conn.follower_id &&
                  c2.following_id === c.following_id &&
                  c2.status === "ACCEPTED"
              )
          ).length;

          return {
            id: conn.follower_id + "-" + conn.following_id,
            requester: {
              id: requester.id,
              name: requester.name,
              username: requester.username,
              avatar_url: requester.avatar_url,
              headline: requester.headline,
              location: requester.location,
            },
            message: conn.message,
            mutualConnections,
            created_at: conn.created_at,
          };
        })
        .filter((r) => r !== null);

      return requests.sort(
        (a, b) =>
          new Date(b!.created_at).getTime() - new Date(a!.created_at).getTime()
      );
    }),

  // Send connection request
  sendConnectionRequest: publicProcedure
    .input(
      z.object({
        fromUserId: z.string(),
        toUserId: z.string(),
        message: z.string().max(300).optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { fromUserId, toUserId, message } = input;

      // Check if users exist
      const fromUser = db.users.get(fromUserId);
      const toUser = db.users.get(toUserId);

      if (!fromUser || !toUser) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      // Check if connection already exists
      const existingConnection = Array.from(db.userFollows.values()).find(
        (conn) =>
          (conn.follower_id === fromUserId && conn.following_id === toUserId) ||
          (conn.follower_id === toUserId && conn.following_id === fromUserId)
      );

      if (existingConnection) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Connection request already exists",
        });
      }

      // Create connection request
      const connectionId = `${fromUserId}-${toUserId}`;
      const newConnection = {
        follower_id: fromUserId,
        following_id: toUserId,
        status: "PENDING" as const,
        message: message || undefined,
        created_at: new Date().toISOString(),
      };

      db.userFollows.set(connectionId, newConnection);

      return { success: true, connectionId };
    }),

  // Accept connection request
  acceptConnectionRequest: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        requesterId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { userId, requesterId } = input;

      const connectionId = `${requesterId}-${userId}`;
      const connection = db.userFollows.get(connectionId);

      if (!connection) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Connection request not found",
        });
      }

      if (connection.following_id !== userId) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You cannot accept this request",
        });
      }

      // Update status to accepted
      connection.status = "ACCEPTED";
      db.userFollows.set(connectionId, connection);

      // Create reverse connection for mutual following
      const reverseConnectionId = `${userId}-${requesterId}`;
      db.userFollows.set(reverseConnectionId, {
        follower_id: userId,
        following_id: requesterId,
        status: "ACCEPTED",
        created_at: new Date().toISOString(),
      });

      return { success: true };
    }),

  // Reject connection request
  rejectConnectionRequest: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        requesterId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { userId, requesterId } = input;

      const connectionId = `${requesterId}-${userId}`;
      const connection = db.userFollows.get(connectionId);

      if (!connection) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Connection request not found",
        });
      }

      if (connection.following_id !== userId) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You cannot reject this request",
        });
      }

      // Delete the connection request
      db.userFollows.delete(connectionId);

      return { success: true };
    }),

  // Get suggested connections
  getSuggestions: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        limit: z.number().min(1).max(20).default(5),
      })
    )
    .query(async ({ input }) => {
      const { userId, limit } = input;

      // Get user's existing connections
      const existingConnections = Array.from(db.userFollows.values())
        .filter(
          (conn) =>
            (conn.follower_id === userId || conn.following_id === userId) &&
            conn.status === "ACCEPTED"
        )
        .map((conn) =>
          conn.follower_id === userId ? conn.following_id : conn.follower_id
        );

      // Get users who are not already connected
      const suggestions = Array.from(db.users.values())
        .filter(
          (user) =>
            user.id !== userId && !existingConnections.includes(user.id)
        )
        .slice(0, limit)
        .map((user) => {
          // Count mutual connections
          const mutualConnections = Array.from(db.userFollows.values()).filter(
            (conn) => {
              const connectedUserId =
                conn.follower_id === userId
                  ? conn.following_id
                  : conn.follower_id;

              return (
                existingConnections.includes(connectedUserId) &&
                Array.from(db.userFollows.values()).some(
                  (c) =>
                    (c.follower_id === user.id &&
                      c.following_id === connectedUserId) ||
                    (c.following_id === user.id &&
                      c.follower_id === connectedUserId)
                )
              );
            }
          ).length;

          return {
            id: user.id,
            name: user.name,
            username: user.username,
            avatar_url: user.avatar_url,
            headline: user.headline,
            location: user.location,
            mutualConnections,
            reason: mutualConnections > 0 ? `${mutualConnections} mutual connections` : "Suggested for you",
          };
        });

      return suggestions;
    }),

  // Remove connection
  removeConnection: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        connectionId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { userId, connectionId } = input;

      // Remove both directions of the connection
      const connection1 = `${userId}-${connectionId}`;
      const connection2 = `${connectionId}-${userId}`;

      db.userFollows.delete(connection1);
      db.userFollows.delete(connection2);

      return { success: true };
    }),
});
