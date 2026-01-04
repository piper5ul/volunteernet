import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { calculateMonetaryValue, calculateRetentionRate, calculateNoShowRate } from "@/lib/utils/impact-calc";

export const organizationsRouter = router({
  /**
   * Get organization by ID
   */
  get: publicProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
    const org = ctx.db.organizations.get(input.id);
    if (!org) throw new Error("Organization not found");
    return org;
  }),

  /**
   * Get organization by ID (alias for compatibility)
   */
  getById: publicProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
    const org = ctx.db.organizations.get(input.id);
    if (!org) throw new Error("Organization not found");
    return org;
  }),

  /**
   * Get organization by slug
   */
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const org = Array.from(ctx.db.organizations.values()).find((o) => o.slug === input.slug);
      if (!org) throw new Error("Organization not found");
      return org;
    }),

  /**
   * Get organization statistics
   */
  getStats: publicProcedure
    .input(z.object({ orgId: z.string() }))
    .query(async ({ ctx, input }) => {
      // Get all impact entries for this org
      const impactEntries = Array.from(ctx.db.impactLedger.values()).filter(
        (entry) => entry.org_id === input.orgId && entry.status === "VERIFIED"
      );

      const totalHours = impactEntries.reduce((sum, entry) => sum + entry.hours, 0);
      const monetaryValue = calculateMonetaryValue(totalHours);

      // Get unique volunteers
      const uniqueVolunteers = new Set(impactEntries.map((e) => e.user_id)).size;

      // Get all registrations for this org's opportunities
      const opportunities = Array.from(ctx.db.opportunities.values()).filter(
        (opp) => opp.org_id === input.orgId
      );
      const oppIds = new Set(opportunities.map((o) => o.id));
      const registrations = Array.from(ctx.db.registrations.values()).filter((reg) =>
        oppIds.has(reg.opportunity_id)
      );

      // Calculate retention rate
      const volunteerActivity = Array.from(
        impactEntries
          .reduce((acc, entry) => {
            if (!acc.has(entry.user_id)) {
              acc.set(entry.user_id, {
                first_activity: entry.date,
                last_activity: entry.date,
                activity_count: 0,
              });
            }
            const vol = acc.get(entry.user_id)!;
            vol.activity_count += 1;
            if (entry.date < vol.first_activity) vol.first_activity = entry.date;
            if (entry.date > vol.last_activity) vol.last_activity = entry.date;
            return acc;
          }, new Map())
          .values()
      );

      const retentionRate = calculateRetentionRate(Array.from(volunteerActivity));
      const noShowRate = calculateNoShowRate(registrations);

      // Get reviews average
      const reviews = Array.from(ctx.db.reviews.values()).filter(
        (r) => r.reviewee_id === input.orgId && r.reviewee_type === "ORG"
      );
      const avgRating =
        reviews.length > 0
          ? reviews.reduce((sum, r) => sum + r.overall_rating, 0) / reviews.length
          : 0;

      // Active opportunities
      const activeOpportunities = opportunities.filter((o) => o.status === "OPEN").length;

      return {
        total_volunteers: uniqueVolunteers,
        total_hours: totalHours,
        total_events: opportunities.length,
        retention_rate: retentionRate,
        no_show_rate: noShowRate,
        avg_rating: Math.round(avgRating * 10) / 10,
        monetary_value: monetaryValue,
        new_volunteers_this_month: 0, // TODO: Calculate
        active_opportunities: activeOpportunities,
      };
    }),

  /**
   * Get organization's volunteers
   */
  getVolunteers: publicProcedure
    .input(
      z.object({
        orgId: z.string(),
        search: z.string().optional(),
        sortBy: z.enum(["name", "hours", "lastActive"]).optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      // Get all volunteers who have volunteered with this org
      const impactEntries = Array.from(ctx.db.impactLedger.values()).filter(
        (entry) => entry.org_id === input.orgId
      );

      const volunteersMap = new Map<
        string,
        {
          user: any;
          totalHours: number;
          eventCount: number;
          lastActive: Date;
          verifiedHours: number;
        }
      >();

      impactEntries.forEach((entry) => {
        if (!volunteersMap.has(entry.user_id)) {
          volunteersMap.set(entry.user_id, {
            user: ctx.db.users.get(entry.user_id)!,
            totalHours: 0,
            eventCount: 0,
            lastActive: entry.date,
            verifiedHours: 0,
          });
        }

        const vol = volunteersMap.get(entry.user_id)!;
        vol.totalHours += entry.hours;
        vol.eventCount += 1;
        if (entry.date > vol.lastActive) vol.lastActive = entry.date;
        if (entry.status === "VERIFIED") vol.verifiedHours += entry.hours;
      });

      let volunteers = Array.from(volunteersMap.values());

      // Search filter
      if (input.search) {
        const searchLower = input.search.toLowerCase();
        volunteers = volunteers.filter((v) =>
          v.user.name.toLowerCase().includes(searchLower)
        );
      }

      // Sort
      if (input.sortBy === "hours") {
        volunteers.sort((a, b) => b.totalHours - a.totalHours);
      } else if (input.sortBy === "lastActive") {
        volunteers.sort((a, b) => b.lastActive.getTime() - a.lastActive.getTime());
      } else {
        volunteers.sort((a, b) => a.user.name.localeCompare(b.user.name));
      }

      return volunteers;
    }),

  /**
   * Get organization's opportunities
   */
  getOpportunities: publicProcedure
    .input(
      z.object({
        orgId: z.string(),
        status: z.enum(["DRAFT", "OPEN", "FULL", "CANCELLED", "COMPLETED"]).optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      let opportunities = Array.from(ctx.db.opportunities.values()).filter(
        (opp) => opp.org_id === input.orgId
      );

      if (input.status) {
        opportunities = opportunities.filter((opp) => opp.status === input.status);
      }

      return opportunities
        .map((opp) => ({
          ...opp,
          cause: ctx.db.causes.get(opp.cause_id),
        }))
        .sort((a, b) => b.starts_at.getTime() - a.starts_at.getTime());
    }),

  /**
   * Create new opportunity
   */
  createOpportunity: publicProcedure
    .input(
      z.object({
        orgId: z.string(),
        title: z.string(),
        description: z.string(),
        causeId: z.string(),
        location: z
          .object({
            lat: z.number(),
            lng: z.number(),
            name: z.string(),
          })
          .optional(),
        isVirtual: z.boolean(),
        virtualMeetingUrl: z.string().optional(),
        startsAt: z.date(),
        endsAt: z.date(),
        capacity: z.number().optional(),
        minAge: z.number().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const opportunity = {
        id: ctx.db.generateId("opp"),
        org_id: input.orgId,
        title: input.title,
        description: input.description,
        cause_id: input.causeId,
        location: input.location,
        is_virtual: input.isVirtual,
        virtual_meeting_url: input.virtualMeetingUrl,
        starts_at: input.startsAt,
        ends_at: input.endsAt,
        timezone: "America/Los_Angeles",
        is_recurring: false,
        capacity: input.capacity,
        current_registrations: 0,
        min_age: input.minAge,
        requires_background_check: false,
        status: "OPEN" as const,
        visibility: "PUBLIC" as const,
        created_by: input.orgId,
        created_at: new Date(),
        updated_at: new Date(),
        published_at: new Date(),
      };

      ctx.db.opportunities.set(opportunity.id, opportunity);
      return opportunity;
    }),

  /**
   * Get organization followers
   */
  getFollowers: publicProcedure
    .input(z.object({ orgId: z.string() }))
    .query(async ({ ctx, input }) => {
      // Get all users who follow this organization
      const followers = Array.from(ctx.db.orgFollows.values())
        .filter((follow) => follow.org_id === input.orgId)
        .map((follow) => {
          const user = ctx.db.users.get(follow.user_id);
          if (!user) return null;

          // Get hours contributed by this volunteer
          const impactEntries = Array.from(ctx.db.impactLedger.values()).filter(
            (entry) => entry.org_id === input.orgId && entry.user_id === user.id
          );
          const hoursContributed = impactEntries.reduce((sum, entry) => sum + entry.hours, 0);

          return {
            id: user.id,
            name: user.name,
            username: user.username,
            avatar_url: user.avatar_url,
            headline: user.headline,
            location: user.location,
            isVerified: user.is_verified,
            followedAt: follow.created_at,
            hoursContributed,
            mutualConnections: 0, // TODO: Calculate
            isConnected: false, // TODO: Check connection status
          };
        })
        .filter((f) => f !== null);

      return followers;
    }),

  /**
   * Get organization reviews
   */
  getReviews: publicProcedure
    .input(z.object({ orgId: z.string() }))
    .query(async ({ ctx, input }) => {
      const reviews = Array.from(ctx.db.reviews.values())
        .filter((r) => r.reviewee_id === input.orgId && r.reviewee_type === "ORG")
        .map((review) => {
          const reviewer = ctx.db.users.get(review.reviewer_id);
          if (!reviewer) return null;

          return {
            id: review.id,
            rating: review.overall_rating,
            title: review.title,
            content: review.content,
            wentWell: review.went_well,
            couldImprove: review.could_improve,
            volunteerRole: review.volunteer_role,
            created_at: review.created_at.toISOString(),
            reviewer: {
              id: reviewer.id,
              name: reviewer.name,
              username: reviewer.username,
              avatar_url: reviewer.avatar_url,
            },
            helpfulCount: review.helpful_count || 0,
            organizationResponse: review.response,
            responseDate: review.response_date?.toISOString(),
          };
        })
        .filter((r) => r !== null);

      return reviews;
    }),

  /**
   * Get organization impact statistics
   */
  getImpactStats: publicProcedure
    .input(z.object({ orgId: z.string() }))
    .query(async ({ ctx, input }) => {
      const impactEntries = Array.from(ctx.db.impactLedger.values()).filter(
        (entry) => entry.org_id === input.orgId && entry.status === "VERIFIED"
      );

      const totalHours = impactEntries.reduce((sum, entry) => sum + entry.hours, 0);
      const totalVolunteers = new Set(impactEntries.map((e) => e.user_id)).size;

      // Calculate monthly hours
      const monthlyHours = impactEntries.reduce((acc: any[], entry) => {
        const month = new Date(entry.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
        });
        const existing = acc.find((m) => m.month === month);
        if (existing) {
          existing.hours += entry.hours;
          existing.volunteers.add(entry.user_id);
        } else {
          acc.push({
            month,
            hours: entry.hours,
            volunteers: new Set([entry.user_id]),
          });
        }
        return acc;
      }, []);

      // Convert Sets to counts
      monthlyHours.forEach((m) => {
        m.volunteers = m.volunteers.size;
      });

      // Calculate impact by cause
      const causeBreakdown = impactEntries.reduce((acc: any[], entry) => {
        const opportunity = Array.from(ctx.db.opportunities.values()).find(
          (o) => o.id === entry.opportunity_id
        );
        const cause = opportunity ? ctx.db.causes.get(opportunity.cause_id) : null;
        const causeName = cause?.name || "Other";

        const existing = acc.find((c) => c.cause === causeName);
        if (existing) {
          existing.hours += entry.hours;
          existing.volunteers.add(entry.user_id);
        } else {
          acc.push({
            cause: causeName,
            hours: entry.hours,
            volunteers: new Set([entry.user_id]),
          });
        }
        return acc;
      }, []);

      // Convert Sets to counts and calculate percentages
      causeBreakdown.forEach((c) => {
        c.volunteers = c.volunteers.size;
        c.percentage = Math.round((c.hours / totalHours) * 100);
      });

      return {
        totalHours,
        totalVolunteers,
        livesImpacted: totalVolunteers * 5, // Estimate
        eventsHosted: new Set(impactEntries.map((e) => e.opportunity_id)).size,
        monthlyHours: monthlyHours.slice(-12), // Last 12 months
        causeBreakdown,
        photoGallery: [], // TODO: Implement photo gallery
      };
    }),

  /**
   * Get organization impact stories
   */
  getImpactStories: publicProcedure
    .input(z.object({ orgId: z.string() }))
    .query(async ({ ctx, input }) => {
      // Return mock impact stories for now
      return [
        {
          id: "story-1",
          title: "Community Clean-Up Success",
          description:
            "With the help of 50+ volunteers, we cleaned up 5 parks and removed over 2 tons of litter from our community.",
          category: "Environmental",
          date: new Date().toISOString(),
          imageUrl: "https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?w=800",
          metrics: [
            { label: "Volunteers", value: "50+" },
            { label: "Parks Cleaned", value: "5" },
            { label: "Litter Removed", value: "2 tons" },
          ],
        },
      ];
    }),

  /**
   * Mark review as helpful
   */
  markReviewHelpful: publicProcedure
    .input(z.object({ reviewId: z.string(), userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const review = ctx.db.reviews.get(input.reviewId);
      if (!review) throw new Error("Review not found");

      review.helpful_count = (review.helpful_count || 0) + 1;
      ctx.db.reviews.set(input.reviewId, review);

      return { success: true };
    }),

  /**
   * Follow organization
   */
  follow: publicProcedure
    .input(z.object({ userId: z.string(), orgId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const followId = `${input.userId}-${input.orgId}`;
      const existing = ctx.db.orgFollows.get(followId);

      if (existing) {
        throw new Error("Already following this organization");
      }

      ctx.db.orgFollows.set(followId, {
        user_id: input.userId,
        org_id: input.orgId,
        created_at: new Date().toISOString(),
      });

      return { success: true };
    }),

  /**
   * Unfollow organization
   */
  unfollow: publicProcedure
    .input(z.object({ userId: z.string(), orgId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const followId = `${input.userId}-${input.orgId}`;
      ctx.db.orgFollows.delete(followId);

      return { success: true };
    }),

  /**
   * Search organizations
   */
  search: publicProcedure
    .input(
      z.object({
        query: z.string().optional(),
        cause: z.string().optional(),
        location: z.string().optional(),
        limit: z.number().default(50),
      })
    )
    .query(async ({ ctx, input }) => {
      let orgs = Array.from(ctx.db.organizations.values());

      if (input.query) {
        const queryLower = input.query.toLowerCase();
        orgs = orgs.filter(
          (org) =>
            org.name.toLowerCase().includes(queryLower) ||
            org.description.toLowerCase().includes(queryLower)
        );
      }

      if (input.location) {
        orgs = orgs.filter((org) =>
          org.location?.toLowerCase().includes(input.location!.toLowerCase())
        );
      }

      return orgs.slice(0, input.limit);
    }),
});
