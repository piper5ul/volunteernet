import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const messagesRouter = router({
  /**
   * Get user's conversations
   */
  getConversations: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const participantRecords = Array.from(ctx.db.conversationParticipants.values()).filter(
        (p) => p.participant_id === input.userId && p.participant_type === "USER"
      );

      const conversations = participantRecords
        .map((p) => {
          const conversation = ctx.db.conversations.get(p.conversation_id);
          if (!conversation) return null;

          // Get last message
          const messages = Array.from(ctx.db.messages.values())
            .filter((m) => m.conversation_id === conversation.id)
            .sort((a, b) => b.sent_at.getTime() - a.sent_at.getTime());

          const lastMessage = messages[0];

          // Get other participants
          const otherParticipants = Array.from(ctx.db.conversationParticipants.values())
            .filter(
              (cp) =>
                cp.conversation_id === conversation.id &&
                !(cp.participant_id === input.userId && cp.participant_type === "USER")
            )
            .map((cp) => {
              if (cp.participant_type === "ORG") {
                return {
                  type: "ORG" as const,
                  ...ctx.db.organizations.get(cp.participant_id)!,
                };
              }
              return {
                type: "USER" as const,
                ...ctx.db.users.get(cp.participant_id)!,
              };
            });

          // Count unread messages
          const unreadCount = messages.filter(
            (m) => m.sent_at > (p.last_read_at || new Date(0))
          ).length;

          return {
            ...conversation,
            lastMessage,
            otherParticipants,
            unreadCount,
          };
        })
        .filter(Boolean)
        .sort((a, b) => (b!.last_message_at?.getTime() || 0) - (a!.last_message_at?.getTime() || 0));

      return conversations;
    }),

  /**
   * Get single conversation with messages
   */
  getConversation: publicProcedure
    .input(z.object({ conversationId: z.string() }))
    .query(async ({ ctx, input }) => {
      const conversation = ctx.db.conversations.get(input.conversationId);
      if (!conversation) throw new Error("Conversation not found");

      const messages = Array.from(ctx.db.messages.values())
        .filter((m) => m.conversation_id === input.conversationId)
        .sort((a, b) => a.sent_at.getTime() - b.sent_at.getTime())
        .map((m) => {
          const sender =
            m.sender_type === "ORG"
              ? ctx.db.organizations.get(m.sender_id)
              : ctx.db.users.get(m.sender_id);
          return {
            ...m,
            sender,
            senderType: m.sender_type,
          };
        });

      const participants = Array.from(ctx.db.conversationParticipants.values())
        .filter((p) => p.conversation_id === input.conversationId)
        .map((p) => ({
          ...p,
          participant:
            p.participant_type === "ORG"
              ? ctx.db.organizations.get(p.participant_id)
              : ctx.db.users.get(p.participant_id),
        }));

      return {
        ...conversation,
        messages,
        participants,
      };
    }),

  /**
   * Send message
   */
  sendMessage: publicProcedure
    .input(
      z.object({
        conversationId: z.string(),
        senderId: z.string(),
        senderType: z.enum(["USER", "ORG"]),
        body: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const message = {
        id: ctx.db.generateId("msg"),
        conversation_id: input.conversationId,
        sender_id: input.senderId,
        sender_type: input.senderType,
        body: input.body,
        sent_at: new Date(),
      };

      ctx.db.messages.set(message.id, message);

      // Update conversation last_message_at
      const conversation = ctx.db.conversations.get(input.conversationId);
      if (conversation) {
        conversation.last_message_at = new Date();
        ctx.db.conversations.set(conversation.id, conversation);
      }

      return message;
    }),

  /**
   * Mark conversation as read
   */
  markAsRead: publicProcedure
    .input(z.object({ conversationId: z.string(), userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const key = `${input.conversationId}-${input.userId}-USER`;
      const participant = Array.from(ctx.db.conversationParticipants.values()).find(
        (p) =>
          p.conversation_id === input.conversationId &&
          p.participant_id === input.userId &&
          p.participant_type === "USER"
      );

      if (participant) {
        participant.last_read_at = new Date();
        // Update in map - we need to find the key
        for (const [k, v] of ctx.db.conversationParticipants.entries()) {
          if (
            v.conversation_id === input.conversationId &&
            v.participant_id === input.userId &&
            v.participant_type === "USER"
          ) {
            ctx.db.conversationParticipants.set(k, participant);
            break;
          }
        }
      }

      return { success: true };
    }),

  /**
   * Create new conversation
   */
  createConversation: publicProcedure
    .input(
      z.object({
        participants: z.array(
          z.object({
            id: z.string(),
            type: z.enum(["USER", "ORG"]),
          })
        ),
        type: z.enum(["DM", "EVENT_CHAT", "SQUAD_CHAT"]),
        subject: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const conversation = {
        id: ctx.db.generateId("conv"),
        type: input.type,
        subject: input.subject,
        is_archived: false,
        created_at: new Date(),
        updated_at: new Date(),
      };

      ctx.db.conversations.set(conversation.id, conversation);

      // Add participants
      input.participants.forEach((p, idx) => {
        const participant = {
          conversation_id: conversation.id,
          participant_id: p.id,
          participant_type: p.type,
          joined_at: new Date(),
          is_muted: false,
        };
        ctx.db.conversationParticipants.set(`${conversation.id}-${p.id}-${idx}`, participant);
      });

      return conversation;
    }),

  /**
   * Get unread message count
   */
  getUnreadCount: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const participantRecords = Array.from(ctx.db.conversationParticipants.values()).filter(
        (p) => p.participant_id === input.userId && p.participant_type === "USER"
      );

      let totalUnread = 0;
      for (const p of participantRecords) {
        const messages = Array.from(ctx.db.messages.values()).filter(
          (m) =>
            m.conversation_id === p.conversation_id &&
            m.sent_at > (p.last_read_at || new Date(0))
        );
        totalUnread += messages.length;
      }

      return totalUnread;
    }),
});

export const notificationsRouter = router({
  /**
   * Get all notifications for user
   */
  getAll: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const notifications = Array.from(ctx.db.notifications.values())
        .filter((n) => n.recipient_id === input.userId)
        .sort((a, b) => b.created_at.getTime() - a.created_at.getTime());

      return notifications;
    }),

  /**
   * Get unread notifications
   */
  getUnread: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const notifications = Array.from(ctx.db.notifications.values())
        .filter((n) => n.recipient_id === input.userId && !n.read_at)
        .sort((a, b) => b.created_at.getTime() - a.created_at.getTime());

      return notifications;
    }),

  /**
   * Mark notification as read
   */
  markAsRead: publicProcedure
    .input(z.object({ notificationId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const notification = ctx.db.notifications.get(input.notificationId);
      if (!notification) throw new Error("Notification not found");

      notification.read_at = new Date();
      notification.status = "READ";
      ctx.db.notifications.set(notification.id, notification);

      return notification;
    }),

  /**
   * Mark all as read
   */
  markAllAsRead: publicProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const notifications = Array.from(ctx.db.notifications.values()).filter(
        (n) => n.recipient_id === input.userId && !n.read_at
      );

      notifications.forEach((n) => {
        n.read_at = new Date();
        n.status = "READ";
        ctx.db.notifications.set(n.id, n);
      });

      return { count: notifications.length };
    }),
});
