import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { publicProcedure, router } from "../trpc";
import { db } from "../db";

export const feedRouter = router({
  getFeed: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        filter: z.enum(["all", "connections", "following"]).default("all"),
        limit: z.number().min(1).max(100).default(20),
        offset: z.number().min(0).default(0),
      })
    )
    .query(async ({ input }) => {
      const { userId, filter, limit, offset } = input;

      // Get user's connections for filtering
      const userConnections = Array.from(db.userFollows.values()).filter(
        (conn) => conn.follower_id === userId || conn.following_id === userId
      );

      const connectionIds = userConnections.map((conn) =>
        conn.follower_id === userId ? conn.following_id : conn.follower_id
      );

      // Get feed items (combination of posts, volunteer activities, connections, endorsements)
      const feedItems = [];

      // 1. User posts from connections
      const posts = Array.from(db.userPosts?.values() || [])
        .filter((post) => {
          if (filter === "all") return true;
          if (filter === "connections") return connectionIds.includes(post.author_id);
          return false;
        })
        .map((post) => {
          const author = db.users.get(post.author_id);
          return {
            id: `post-${post.id}`,
            type: "post" as const,
            author: author ? {
              id: author.id,
              name: author.name,
              username: author.username,
              avatar_url: author.avatar_url,
              headline: author.headline,
            } : null,
            content: post.content,
            image_url: post.image_url,
            created_at: post.created_at,
            likes_count: post.likes_count || 0,
            comments_count: post.comments_count || 0,
            comments: [], // TODO: Fetch comments
          };
        });

      feedItems.push(...posts);

      // 2. Volunteer activities from connections
      const activities = Array.from(db.impactEntries.values())
        .filter((entry) => {
          if (entry.status !== "COMPLETED" && entry.status !== "VERIFIED") return false;
          if (filter === "all") return true;
          if (filter === "connections") return connectionIds.includes(entry.user_id);
          return false;
        })
        .slice(0, 10) // Limit activities
        .map((entry) => {
          const user = db.users.get(entry.user_id);
          const org = entry.org_id ? db.organizations.get(entry.org_id) : null;
          return {
            id: `activity-${entry.id}`,
            type: "volunteer_activity" as const,
            author: user ? {
              id: user.id,
              name: user.name,
              username: user.username,
              avatar_url: user.avatar_url,
              headline: user.headline,
            } : null,
            content: `I volunteered ${entry.hours_logged?.toFixed(1) || 0} hours as ${entry.role_title}!`,
            organization: org ? {
              id: org.id,
              name: org.name,
            } : null,
            hours: entry.hours_logged || 0,
            role_title: entry.role_title,
            created_at: entry.date,
            likes_count: 0,
            comments_count: 0,
            comments: [],
          };
        });

      feedItems.push(...activities);

      // 3. New connections
      const recentConnections = userConnections
        .filter((conn) => connectionIds.includes(conn.follower_id) || connectionIds.includes(conn.following_id))
        .slice(0, 5)
        .map((conn) => {
          const connectorId = conn.follower_id;
          const connectedId = conn.following_id;
          const connector = db.users.get(connectorId);
          const connected = db.users.get(connectedId);

          return {
            id: `connection-${conn.follower_id}-${conn.following_id}`,
            type: "connection" as const,
            author: connector ? {
              id: connector.id,
              name: connector.name,
              username: connector.username,
              avatar_url: connector.avatar_url,
              headline: connector.headline,
            } : null,
            content: `I connected with ${connected?.name || "someone"}`,
            connection: connected ? {
              id: connected.id,
              name: connected.name,
              username: connected.username,
              avatar_url: connected.avatar_url,
            } : null,
            created_at: conn.created_at,
            likes_count: 0,
            comments_count: 0,
            comments: [],
          };
        });

      feedItems.push(...recentConnections);

      // Sort by date and paginate
      const sortedItems = feedItems
        .filter((item) => item.created_at && item.author) // Filter out items without dates or authors
        .sort((a, b) => {
          const dateA = new Date(a.created_at).getTime();
          const dateB = new Date(b.created_at).getTime();
          // Handle invalid dates
          if (isNaN(dateA)) return 1;
          if (isNaN(dateB)) return -1;
          return dateB - dateA;
        })
        .slice(offset, offset + limit);

      return sortedItems;
    }),

  createPost: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        content: z.string().min(1).max(5000),
        image_url: z.string().url().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { userId, content, image_url } = input;

      // Check if user exists
      const user = db.users.get(userId);
      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      // Initialize userPosts if it doesn't exist
      if (!db.userPosts) {
        (db as any).userPosts = new Map();
      }

      const postId = `post-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const newPost = {
        id: postId,
        author_id: userId,
        content,
        image_url,
        created_at: new Date().toISOString(),
        likes_count: 0,
        comments_count: 0,
      };

      db.userPosts.set(postId, newPost);

      return newPost;
    }),

  likePost: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        postId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { userId, postId } = input;

      // TODO: Implement like functionality
      // For now, just increment the count

      const post = db.userPosts?.get(postId);
      if (post) {
        post.likes_count = (post.likes_count || 0) + 1;
        db.userPosts.set(postId, post);
      }

      return { success: true };
    }),

  addComment: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        postId: z.string(),
        content: z.string().min(1).max(1000),
      })
    )
    .mutation(async ({ input }) => {
      const { userId, postId, content } = input;

      // TODO: Implement comment functionality
      // For now, just increment the count

      const post = db.userPosts?.get(postId);
      if (post) {
        post.comments_count = (post.comments_count || 0) + 1;
        db.userPosts.set(postId, post);
      }

      return { success: true };
    }),
});
