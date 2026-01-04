import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { getImpactSummary, groupByCause, groupByOrganization, groupByMonth } from "@/lib/utils/impact-calc";

export const usersRouter = router({
  /**
   * Get user by ID
   */
  get: publicProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
    const user = ctx.db.users.get(input.id);
    if (!user) throw new Error("User not found");

    // Get user causes
    const userCauses = Array.from(ctx.db.userCauses.values())
      .filter((uc) => uc.user_id === input.id)
      .map((uc) => ctx.db.causes.get(uc.cause_id))
      .filter(Boolean);

    // Get user skills
    const userSkills = Array.from(ctx.db.userSkills.values())
      .filter((us) => us.user_id === input.id)
      .map((us) => ({
        ...ctx.db.skills.get(us.skill_id)!,
        proficiency: us.proficiency,
        verified_count: us.verified_count,
      }));

    return {
      ...user,
      causes: userCauses,
      skills: userSkills,
    };
  }),

  /**
   * Get user by username
   */
  getByUsername: publicProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = Array.from(ctx.db.users.values()).find((u) => u.username === input.username);
      if (!user) throw new Error("User not found");

      // Get user causes
      const userCauses = Array.from(ctx.db.userCauses.values())
        .filter((uc) => uc.user_id === user.id)
        .map((uc) => ctx.db.causes.get(uc.cause_id))
        .filter(Boolean);

      // Get user skills
      const userSkills = Array.from(ctx.db.userSkills.values())
        .filter((us) => us.user_id === user.id)
        .map((us) => ({
          ...ctx.db.skills.get(us.skill_id)!,
          proficiency: us.proficiency,
          verified_count: us.verified_count,
        }));

      return {
        ...user,
        causes: userCauses,
        skills: userSkills,
      };
    }),

  /**
   * Get user's impact statistics
   */
  getImpactStats: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const impactEntries = Array.from(ctx.db.impactLedger.values()).filter(
        (entry) => entry.user_id === input.userId
      );

      const summary = getImpactSummary(
        impactEntries.map((e) => ({
          hours: e.hours,
          org_id: e.org_id,
          cause_id: impactEntries.find((ie) => ie.id === e.id)
            ? Array.from(ctx.db.opportunities.values()).find((o) => o.id === e.opportunity_id)
                ?.cause_id
            : undefined,
          status: e.status,
        }))
      );

      const byCause = groupByCause(
        impactEntries.map((e) => ({
          hours: e.hours,
          cause_id: Array.from(ctx.db.opportunities.values()).find(
            (o) => o.id === e.opportunity_id
          )?.cause_id,
          status: e.status,
        }))
      );

      const byOrg = groupByOrganization(
        impactEntries.map((e) => ({
          hours: e.hours,
          org_id: e.org_id,
          status: e.status,
        }))
      );

      const byMonth = groupByMonth(
        impactEntries.map((e) => ({
          hours: e.hours,
          date: e.date,
          status: e.status,
        }))
      );

      return {
        ...summary,
        byCause,
        byOrg,
        byMonth,
      };
    }),

  /**
   * Get user's impact timeline
   */
  getTimeline: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const entries = Array.from(ctx.db.impactLedger.values())
        .filter((entry) => entry.user_id === input.userId)
        .sort((a, b) => b.date.getTime() - a.date.getTime())
        .map((entry) => ({
          ...entry,
          organization: entry.org_id ? ctx.db.organizations.get(entry.org_id) : null,
          opportunity: entry.opportunity_id
            ? ctx.db.opportunities.get(entry.opportunity_id)
            : null,
        }));

      return entries;
    }),

  /**
   * Get user's badges
   */
  getBadges: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const userBadges = Array.from(ctx.db.userBadges.values())
        .filter((ub) => ub.user_id === input.userId)
        .map((ub) => ({
          ...ctx.db.badges.get(ub.badge_id)!,
          earned_at: ub.earned_at,
          is_featured: ub.is_featured,
        }))
        .sort((a, b) => b.earned_at.getTime() - a.earned_at.getTime());

      return userBadges;
    }),

  /**
   * Get endorsements for a user
   */
  getEndorsements: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const endorsements = Array.from(ctx.db.endorsements.values())
        .filter((e) => e.to_user_id === input.userId && e.is_public)
        .map((e) => ({
          ...e,
          organization: ctx.db.organizations.get(e.from_org_id)!,
          skill: e.skill_id ? ctx.db.skills.get(e.skill_id) : null,
        }))
        .sort((a, b) => b.created_at.getTime() - a.created_at.getTime());

      return endorsements;
    }),

  /**
   * Get user's upcoming registrations
   */
  getUpcoming: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const now = new Date();
      const registrations = Array.from(ctx.db.registrations.values())
        .filter(
          (reg) =>
            reg.user_id === input.userId &&
            (reg.status === "CONFIRMED" || reg.status === "WAITLIST")
        )
        .map((reg) => {
          const opportunity = ctx.db.opportunities.get(reg.opportunity_id)!;
          return {
            ...reg,
            opportunity: {
              ...opportunity,
              organization: ctx.db.organizations.get(opportunity.org_id),
              cause: ctx.db.causes.get(opportunity.cause_id),
            },
          };
        })
        .filter((reg) => reg.opportunity.starts_at > now)
        .sort((a, b) => a.opportunity.starts_at.getTime() - b.opportunity.starts_at.getTime());

      return registrations;
    }),

  /**
   * Search users
   */
  searchUsers: publicProcedure
    .input(
      z.object({
        query: z.string().optional(),
        location: z.string().optional(),
        cause: z.string().optional(),
        skill: z.string().optional(),
        limit: z.number().min(1).max(100).default(50),
      })
    )
    .query(async ({ ctx, input }) => {
      const { query, location, cause, skill, limit } = input;

      let users = Array.from(ctx.db.users.values());

      // Filter by search query
      if (query) {
        const lowerQuery = query.toLowerCase();
        users = users.filter(
          (u) =>
            u.name?.toLowerCase().includes(lowerQuery) ||
            u.headline?.toLowerCase().includes(lowerQuery) ||
            u.bio?.toLowerCase().includes(lowerQuery)
        );
      }

      // Filter by location
      if (location) {
        const lowerLocation = location.toLowerCase();
        users = users.filter((u) => u.location?.toLowerCase().includes(lowerLocation));
      }

      // Filter by cause
      if (cause) {
        const usersWithCause = Array.from(ctx.db.userCauses.values())
          .filter((uc) => {
            const causeObj = ctx.db.causes.get(uc.cause_id);
            return causeObj?.slug === cause;
          })
          .map((uc) => uc.user_id);

        users = users.filter((u) => usersWithCause.includes(u.id));
      }

      // Filter by skill
      if (skill) {
        const lowerSkill = skill.toLowerCase();
        const usersWithSkill = Array.from(ctx.db.userSkills.values())
          .filter((us) => {
            const skillObj = ctx.db.skills.get(us.skill_id);
            return skillObj?.name.toLowerCase().includes(lowerSkill);
          })
          .map((us) => us.user_id);

        users = users.filter((u) => usersWithSkill.includes(u.id));
      }

      // Get skills for each user
      const usersWithData = users.slice(0, limit).map((user) => {
        const userSkills = Array.from(ctx.db.userSkills.values())
          .filter((us) => us.user_id === user.id)
          .map((us) => ctx.db.skills.get(us.skill_id)?.name)
          .filter(Boolean);

        return {
          ...user,
          skills: userSkills,
        };
      });

      return usersWithData;
    }),

  /**
   * Add historical volunteer entry
   */
  addHistoricalEntry: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        orgName: z.string(),
        hours: z.number().positive(),
        date: z.date(),
        roleTitle: z.string(),
        description: z.string(),
        supervisorEmail: z.string().email(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Create impact entry
      const entry = {
        id: ctx.db.generateId("impact"),
        user_id: input.userId,
        hours: input.hours,
        date: input.date,
        role_title: input.roleTitle,
        description: input.description,
        status: "PENDING" as const,
        verification_method: "EMAIL" as const,
        verifier_email: input.supervisorEmail,
        is_historical: true,
        created_at: new Date(),
        updated_at: new Date(),
      };

      ctx.db.impactLedger.set(entry.id, entry);

      // Create verification token
      const token = ctx.db.generateId("token");
      const magicToken = {
        id: token,
        token,
        user_id: input.userId,
        type: "EMAIL_VERIFY" as const,
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        used: false,
        created_at: new Date(),
        metadata: { impact_id: entry.id, org_name: input.orgName },
      };

      ctx.db.magicTokens.set(token, magicToken);

      return { entry, verificationToken: token };
    }),
});
