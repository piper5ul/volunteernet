import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const squadsRouter = router({
  /**
   * Get squad by ID
   */
  get: publicProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
    const squad = ctx.db.squads.get(input.id);
    if (!squad) throw new Error("Squad not found");

    const leader = ctx.db.users.get(squad.leader_id);
    const members = Array.from(ctx.db.squadMembers.values())
      .filter((m) => m.squad_id === input.id)
      .map((m) => ({
        ...m,
        user: ctx.db.users.get(m.user_id),
      }));

    return {
      ...squad,
      leader,
      members,
    };
  }),

  /**
   * Get user's squads
   */
  getUserSquads: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const memberSquadIds = Array.from(ctx.db.squadMembers.values())
        .filter((m) => m.user_id === input.userId)
        .map((m) => m.squad_id);

      const squads = Array.from(ctx.db.squads.values())
        .filter((s) => memberSquadIds.includes(s.id) || s.leader_id === input.userId)
        .map((squad) => ({
          ...squad,
          leader: ctx.db.users.get(squad.leader_id),
        }));

      return squads;
    }),

  /**
   * Create squad
   */
  create: publicProcedure
    .input(
      z.object({
        leaderId: z.string(),
        name: z.string(),
        description: z.string().optional(),
        type: z.enum(["CORPORATE", "SCHOOL", "SOCIAL", "FRIENDS", "FAMILY"]),
        organizationName: z.string().optional(),
        expectedSize: z.number().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const squad = {
        id: ctx.db.generateId("squad"),
        leader_id: input.leaderId,
        name: input.name,
        description: input.description,
        type: input.type,
        organization_name: input.organizationName,
        is_private: false,
        expected_size: input.expectedSize,
        created_at: new Date(),
        member_count: 1,
      };

      ctx.db.squads.set(squad.id, squad);

      // Add leader as member
      const member = {
        squad_id: squad.id,
        user_id: input.leaderId,
        is_guest: false,
        role: "LEADER" as const,
        joined_at: new Date(),
      };
      ctx.db.squadMembers.set(`${squad.id}-${input.leaderId}`, member);

      return squad;
    }),

  /**
   * Book opportunity for squad
   */
  bookOpportunity: publicProcedure
    .input(
      z.object({
        squadId: z.string(),
        opportunityId: z.string(),
        spotCount: z.number().positive(),
        invitees: z.array(
          z.object({
            email: z.string().email(),
            name: z.string().optional(),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const squad = ctx.db.squads.get(input.squadId);
      if (!squad) throw new Error("Squad not found");

      const opportunity = ctx.db.opportunities.get(input.opportunityId);
      if (!opportunity) throw new Error("Opportunity not found");

      // Check capacity
      if (
        opportunity.capacity &&
        opportunity.current_registrations + input.spotCount > opportunity.capacity
      ) {
        throw new Error("Not enough spots available");
      }

      // Create booking
      const booking = {
        id: ctx.db.generateId("booking"),
        squad_id: input.squadId,
        opportunity_id: input.opportunityId,
        spots_reserved: input.spotCount,
        created_by: squad.leader_id,
        created_at: new Date(),
      };
      ctx.db.squadBookings.set(booking.id, booking);

      // Create registrations for each invitee
      const registrations = [];
      for (const invitee of input.invitees) {
        // Find or create user
        let user = Array.from(ctx.db.users.values()).find((u) => u.email === invitee.email);

        if (!user) {
          // Create guest user
          user = {
            id: ctx.db.generateId("user"),
            email: invitee.email,
            name: invitee.name || invitee.email,
            is_guest: true,
            auth_provider: null,
            email_verified: false,
            language_code: "en",
            verification_score: 0,
            total_hours: 0,
            profile_visibility: "PRIVATE" as const,
            show_location: false,
            show_hours: false,
            created_at: new Date(),
            updated_at: new Date(),
          };
          ctx.db.users.set(user.id, user);
        }

        // Add to squad
        const magicToken = ctx.db.generateId("token");
        const squadMember = {
          squad_id: input.squadId,
          user_id: user.id,
          is_guest: !user.auth_provider,
          magic_token: magicToken,
          token_expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          role: "MEMBER" as const,
          joined_at: new Date(),
        };
        ctx.db.squadMembers.set(`${input.squadId}-${user.id}`, squadMember);

        // Create registration
        const registration = {
          id: ctx.db.generateId("reg"),
          opportunity_id: input.opportunityId,
          user_id: user.id,
          squad_id: input.squadId,
          status: "CONFIRMED" as const,
          registered_at: new Date(),
        };
        ctx.db.registrations.set(registration.id, registration);
        registrations.push({ ...registration, magicLink: `/join/${magicToken}` });

        // Update opportunity count
        opportunity.current_registrations += 1;
      }

      ctx.db.opportunities.set(opportunity.id, opportunity);

      return {
        booking,
        registrations,
      };
    }),

  /**
   * Generate magic link for squad member
   */
  generateMagicLink: publicProcedure
    .input(z.object({ squadId: z.string(), opportunityId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const token = ctx.db.generateId("token");
      const magicToken = {
        id: token,
        token,
        user_id: "", // Will be set when used
        type: "SQUAD_INVITE" as const,
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        used: false,
        created_at: new Date(),
        metadata: {
          squad_id: input.squadId,
          opportunity_id: input.opportunityId,
        },
      };

      ctx.db.magicTokens.set(token, magicToken);
      return { magicLink: `/join/${token}` };
    }),
});
