import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { calculateDistance } from "@/lib/utils/distance-calc";

export const opportunitiesRouter = router({
  /**
   * List opportunities with optional filters
   */
  list: publicProcedure
    .input(
      z.object({
        causes: z.array(z.string()).optional(),
        location: z
          .object({
            lat: z.number(),
            lng: z.number(),
            radius: z.number(), // in miles
          })
          .optional(),
        isVirtual: z.boolean().optional(),
        status: z.enum(["DRAFT", "OPEN", "FULL", "CANCELLED", "COMPLETED"]).optional(),
        search: z.string().optional(),
        limit: z.number().min(1).max(100).default(20),
        offset: z.number().min(0).default(0),
      })
    )
    .query(async ({ ctx, input }) => {
      let opportunities = Array.from(ctx.db.opportunities.values());

      // Filter by status (default to OPEN)
      opportunities = opportunities.filter(
        (opp) => opp.status === (input.status || "OPEN")
      );

      // Filter by causes
      if (input.causes && input.causes.length > 0) {
        opportunities = opportunities.filter((opp) =>
          input.causes!.includes(opp.cause_id)
        );
      }

      // Filter by virtual
      if (input.isVirtual !== undefined) {
        opportunities = opportunities.filter(
          (opp) => opp.is_virtual === input.isVirtual
        );
      }

      // Filter by location/radius
      if (input.location) {
        opportunities = opportunities
          .map((opp) => ({
            ...opp,
            distance: opp.location
              ? calculateDistance(input.location!, opp.location)
              : 999,
          }))
          .filter((opp) => opp.distance <= input.location!.radius)
          .sort((a, b) => a.distance - b.distance);
      }

      // Search by title/description
      if (input.search) {
        const searchLower = input.search.toLowerCase();
        opportunities = opportunities.filter(
          (opp) =>
            opp.title.toLowerCase().includes(searchLower) ||
            opp.description.toLowerCase().includes(searchLower)
        );
      }

      // Pagination
      const total = opportunities.length;
      const paginatedOpportunities = opportunities.slice(
        input.offset,
        input.offset + input.limit
      );

      // Enrich with organization data
      const enrichedOpportunities = paginatedOpportunities.map((opp) => ({
        ...opp,
        organization: ctx.db.organizations.get(opp.org_id),
        cause: ctx.db.causes.get(opp.cause_id),
      }));

      return {
        opportunities: enrichedOpportunities,
        total,
        hasMore: input.offset + input.limit < total,
      };
    }),

  /**
   * Get a single opportunity by ID
   */
  get: publicProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
    const opportunity = ctx.db.opportunities.get(input.id);

    if (!opportunity) {
      throw new Error("Opportunity not found");
    }

    // Enrich with related data
    const organization = ctx.db.organizations.get(opportunity.org_id);
    const cause = ctx.db.causes.get(opportunity.cause_id);

    // Get registrations count
    const registrations = Array.from(ctx.db.registrations.values()).filter(
      (reg) => reg.opportunity_id === input.id && reg.status === "CONFIRMED"
    );

    return {
      ...opportunity,
      organization,
      cause,
      registrations: registrations.length,
    };
  }),

  /**
   * Register for an opportunity
   */
  register: publicProcedure
    .input(
      z.object({
        opportunityId: z.string(),
        userId: z.string(),
        squadId: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const opportunity = ctx.db.opportunities.get(input.opportunityId);

      if (!opportunity) {
        throw new Error("Opportunity not found");
      }

      if (opportunity.status !== "OPEN") {
        throw new Error("Opportunity is not open for registration");
      }

      // Check capacity
      if (opportunity.capacity && opportunity.current_registrations >= opportunity.capacity) {
        throw new Error("Opportunity is full");
      }

      // Check if already registered
      const existing = Array.from(ctx.db.registrations.values()).find(
        (reg) =>
          reg.opportunity_id === input.opportunityId &&
          reg.user_id === input.userId &&
          reg.status === "CONFIRMED"
      );

      if (existing) {
        throw new Error("Already registered for this opportunity");
      }

      // Create registration
      const registration = {
        id: ctx.db.generateId("reg"),
        opportunity_id: input.opportunityId,
        user_id: input.userId,
        squad_id: input.squadId,
        status: "CONFIRMED" as const,
        registered_at: new Date(),
      };

      ctx.db.registrations.set(registration.id, registration);

      // Update opportunity count
      opportunity.current_registrations += 1;
      if (opportunity.capacity && opportunity.current_registrations >= opportunity.capacity) {
        opportunity.status = "FULL";
      }
      ctx.db.opportunities.set(opportunity.id, opportunity);

      return registration;
    }),

  /**
   * Get nearby opportunities
   */
  nearby: publicProcedure
    .input(
      z.object({
        lat: z.number(),
        lng: z.number(),
        radius: z.number().default(25),
        limit: z.number().min(1).max(50).default(10),
      })
    )
    .query(async ({ ctx, input }) => {
      const opportunities = Array.from(ctx.db.opportunities.values())
        .filter((opp) => opp.status === "OPEN" && !opp.is_virtual && opp.location)
        .map((opp) => ({
          ...opp,
          distance: calculateDistance(input, opp.location!),
          organization: ctx.db.organizations.get(opp.org_id),
          cause: ctx.db.causes.get(opp.cause_id),
        }))
        .filter((opp) => opp.distance <= input.radius)
        .sort((a, b) => a.distance - b.distance)
        .slice(0, input.limit);

      return opportunities;
    }),
});
