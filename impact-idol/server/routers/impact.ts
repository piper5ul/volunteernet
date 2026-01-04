import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const impactRouter = router({
  /**
   * Get user's impact ledger
   */
  getUserLedger: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const entries = Array.from(ctx.db.impactLedger.values())
        .filter((entry) => entry.user_id === input.userId)
        .sort((a, b) => b.date.getTime() - a.date.getTime());

      return entries.map((entry) => ({
        ...entry,
        organization: entry.org_id ? ctx.db.organizations.get(entry.org_id) : null,
        opportunity: entry.opportunity_id
          ? ctx.db.opportunities.get(entry.opportunity_id)
          : null,
      }));
    }),

  /**
   * Create impact entry
   */
  createEntry: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        orgId: z.string().optional(),
        opportunityId: z.string().optional(),
        hours: z.number().positive(),
        date: z.date(),
        roleTitle: z.string().optional(),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const entry = {
        id: ctx.db.generateId("impact"),
        user_id: input.userId,
        org_id: input.orgId,
        opportunity_id: input.opportunityId,
        hours: input.hours,
        date: input.date,
        role_title: input.roleTitle,
        description: input.description,
        status: "PENDING" as const,
        is_historical: !input.opportunityId,
        created_at: new Date(),
        updated_at: new Date(),
      };

      ctx.db.impactLedger.set(entry.id, entry);
      return entry;
    }),

  /**
   * Verify impact entry
   */
  verify: publicProcedure
    .input(z.object({ impactId: z.string(), tier: z.enum(["SILVER", "GOLD", "PLATINUM"]).optional() }))
    .mutation(async ({ ctx, input }) => {
      const entry = ctx.db.impactLedger.get(input.impactId);
      if (!entry) throw new Error("Impact entry not found");

      entry.status = "VERIFIED";
      entry.tier = input.tier || "GOLD";
      entry.verified_at = new Date();
      entry.updated_at = new Date();

      ctx.db.impactLedger.set(entry.id, entry);

      // Update user total hours
      const user = ctx.db.users.get(entry.user_id);
      if (user) {
        const totalHours = Array.from(ctx.db.impactLedger.values())
          .filter((e) => e.user_id === user.id && e.status === "VERIFIED")
          .reduce((sum, e) => sum + e.hours, 0);
        user.total_hours = totalHours;
        ctx.db.users.set(user.id, user);
      }

      return entry;
    }),

  /**
   * Dispute impact entry
   */
  dispute: publicProcedure
    .input(z.object({ impactId: z.string(), reason: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const entry = ctx.db.impactLedger.get(input.impactId);
      if (!entry) throw new Error("Impact entry not found");

      entry.status = "DISPUTED";
      entry.dispute_reason = input.reason;
      entry.disputed_at = new Date();
      entry.updated_at = new Date();

      ctx.db.impactLedger.set(entry.id, entry);
      return entry;
    }),
});

export const verificationRouter = router({
  /**
   * Get pending verification queue for organization
   */
  getPendingQueue: publicProcedure
    .input(z.object({ orgId: z.string() }))
    .query(async ({ ctx, input }) => {
      const entries = Array.from(ctx.db.impactLedger.values())
        .filter((entry) => entry.org_id === input.orgId && entry.status === "PENDING")
        .sort((a, b) => a.created_at.getTime() - b.created_at.getTime())
        .map((entry) => {
          const autoVerifyAt = new Date(entry.created_at.getTime() + 48 * 60 * 60 * 1000);
          return {
            ...entry,
            user: ctx.db.users.get(entry.user_id),
            opportunity: entry.opportunity_id
              ? ctx.db.opportunities.get(entry.opportunity_id)
              : null,
            autoVerifyAt,
            hoursRemaining: Math.max(
              0,
              (autoVerifyAt.getTime() - Date.now()) / (1000 * 60 * 60)
            ),
          };
        });

      return entries;
    }),

  /**
   * Approve single verification
   */
  approve: publicProcedure
    .input(z.object({ impactId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.procedures.impact.verify({ impactId: input.impactId, tier: "GOLD" });
    }),

  /**
   * Approve all pending for an organization
   */
  approveAll: publicProcedure
    .input(z.object({ impactIds: z.array(z.string()) }))
    .mutation(async ({ ctx, input }) => {
      const results = [];
      for (const impactId of input.impactIds) {
        const entry = await ctx.procedures.impact.verify({ impactId, tier: "GOLD" });
        results.push(entry);
      }
      return results;
    }),
});
