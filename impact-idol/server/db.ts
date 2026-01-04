import type {
  User,
  Organization,
  Opportunity,
  Registration,
  ImpactEntry,
  Squad,
  SquadMember,
  SquadBooking,
  Cause,
  Skill,
  UserCause,
  UserSkill,
  Conversation,
  ConversationParticipant,
  Message,
  Notification,
  Badge,
  UserBadge,
  Endorsement,
  Review,
  MagicToken,
  UserFollow,
} from "@/lib/types";
import { nanoid } from "nanoid";

/**
 * In-Memory Database
 * Simulates a real database with Map collections and query methods
 */
class InMemoryDB {
  // Collections
  users = new Map<string, User>();
  organizations = new Map<string, Organization>();
  opportunities = new Map<string, Opportunity>();
  registrations = new Map<string, Registration>();
  impactLedger = new Map<string, ImpactEntry>();
  squads = new Map<string, Squad>();
  squadMembers = new Map<string, SquadMember>();
  squadBookings = new Map<string, SquadBooking>();
  causes = new Map<string, Cause>();
  skills = new Map<string, Skill>();
  userCauses = new Map<string, UserCause>();
  userSkills = new Map<string, UserSkill>();
  conversations = new Map<string, Conversation>();
  conversationParticipants = new Map<string, ConversationParticipant>();
  messages = new Map<string, Message>();
  notifications = new Map<string, Notification>();
  badges = new Map<string, Badge>();
  userBadges = new Map<string, UserBadge>();
  endorsements = new Map<string, Endorsement>();
  reviews = new Map<string, Review>();
  magicTokens = new Map<string, MagicToken>();
  userFollows = new Map<string, UserFollow>();
  userPosts = new Map<string, any>(); // Feed posts

  constructor() {
    this.seed();
  }

  /**
   * Seed database with comprehensive mock data
   */
  seed() {
    this.seedCauses();
    this.seedSkills();
    this.seedUsers();
    this.seedOrganizations();
    this.seedOpportunities();
    this.seedSquads();
    this.seedImpactLedger();
    this.seedRegistrations();
    this.seedBadges();
    this.seedConversations();
    this.seedNotifications();
  }

  /**
   * Seed Causes
   */
  private seedCauses() {
    const causes: Cause[] = [
      {
        id: "cause-environment",
        name: "Environment",
        slug: "environment",
        description: "Environmental conservation and sustainability",
        icon: "leaf",
        color: "#10b981",
        sort_order: 1,
        is_active: true,
      },
      {
        id: "cause-education",
        name: "Education",
        slug: "education",
        description: "Educational programs and tutoring",
        icon: "book",
        color: "#3b82f6",
        sort_order: 2,
        is_active: true,
      },
      {
        id: "cause-health",
        name: "Health",
        slug: "health",
        description: "Healthcare and wellness initiatives",
        icon: "heart",
        color: "#ef4444",
        sort_order: 3,
        is_active: true,
      },
      {
        id: "cause-animals",
        name: "Animal Welfare",
        slug: "animals",
        description: "Animal rescue and wildlife conservation",
        icon: "paw",
        color: "#f59e0b",
        sort_order: 4,
        is_active: true,
      },
      {
        id: "cause-community",
        name: "Community Development",
        slug: "community",
        description: "Community building and social services",
        icon: "users",
        color: "#8b5cf6",
        sort_order: 5,
        is_active: true,
      },
      {
        id: "cause-hunger",
        name: "Hunger Relief",
        slug: "hunger",
        description: "Food banks and meal programs",
        icon: "utensils",
        color: "#f97316",
        sort_order: 6,
        is_active: true,
      },
    ];

    causes.forEach((cause) => this.causes.set(cause.id, cause));
  }

  /**
   * Seed Skills
   */
  private seedSkills() {
    const skills: Skill[] = [
      { id: "skill-1", name: "Project Management", slug: "project-management", category: "SOFT_SKILL", is_active: true },
      { id: "skill-2", name: "Graphic Design", slug: "graphic-design", category: "TECHNICAL", is_active: true },
      { id: "skill-3", name: "Spanish", slug: "spanish", category: "LANGUAGE", is_active: true },
      { id: "skill-4", name: "Carpentry", slug: "carpentry", category: "TRADE", is_active: true },
      { id: "skill-5", name: "Teaching", slug: "teaching", category: "SOFT_SKILL", is_active: true },
      { id: "skill-6", name: "Photography", slug: "photography", category: "TECHNICAL", is_active: true },
      { id: "skill-7", name: "Cooking", slug: "cooking", category: "PHYSICAL", is_active: true },
      { id: "skill-8", name: "Event Planning", slug: "event-planning", category: "SOFT_SKILL", is_active: true },
      { id: "skill-9", name: "Web Development", slug: "web-development", category: "TECHNICAL", is_active: true },
      { id: "skill-10", name: "Leadership", slug: "leadership", category: "SOFT_SKILL", is_active: true },
    ];

    skills.forEach((skill) => this.skills.set(skill.id, skill));
  }

  /**
   * Seed Users
   */
  private seedUsers() {
    const users: User[] = [
      {
        id: "user-1",
        email: "sarah.chen@example.com",
        name: "Sarah Chen",
        username: "sarah-chen",
        avatar_url: "https://i.pravatar.cc/150?u=sarah",
        bio: "Environmental advocate and weekend warrior for climate action. Love planting trees and cleaning beaches!",
        tagline: "Making the world greener, one tree at a time",
        is_guest: false,
        auth_provider: "google",
        email_verified: true,
        location: { lat: 37.7749, lng: -122.4194, name: "San Francisco, CA" },
        timezone: "America/Los_Angeles",
        language_code: "en",
        verification_score: 85,
        total_hours: 142,
        volunteer_since: new Date("2023-06-15"),
        profile_visibility: "PUBLIC",
        show_location: true,
        show_hours: true,
        created_at: new Date("2023-06-15"),
        updated_at: new Date(),
      },
      {
        id: "user-2",
        email: "james.rodriguez@example.com",
        name: "James Rodriguez",
        username: "james-rodriguez",
        avatar_url: "https://i.pravatar.cc/150?u=james",
        bio: "Teacher by day, tutor by night. Passionate about education equity.",
        is_guest: false,
        auth_provider: "google",
        email_verified: true,
        location: { lat: 37.8044, lng: -122.2712, name: "Oakland, CA" },
        timezone: "America/Los_Angeles",
        language_code: "en",
        verification_score: 92,
        total_hours: 215,
        volunteer_since: new Date("2022-03-10"),
        profile_visibility: "PUBLIC",
        show_location: true,
        show_hours: true,
        created_at: new Date("2022-03-10"),
        updated_at: new Date(),
      },
      {
        id: "user-3",
        email: "mike.thompson@acmecorp.com",
        name: "Mike Thompson",
        username: "mike-thompson",
        avatar_url: "https://i.pravatar.cc/150?u=mike",
        bio: "Corporate social responsibility coordinator at Acme Corp. Leading our team volunteering initiatives.",
        is_guest: false,
        auth_provider: "google",
        email_verified: true,
        location: { lat: 37.7749, lng: -122.4194, name: "San Francisco, CA" },
        timezone: "America/Los_Angeles",
        language_code: "en",
        verification_score: 78,
        total_hours: 89,
        volunteer_since: new Date("2024-01-15"),
        profile_visibility: "PUBLIC",
        show_location: true,
        show_hours: true,
        created_at: new Date("2024-01-15"),
        updated_at: new Date(),
      },
      {
        id: "user-4",
        email: "emily.guest@example.com",
        name: "Emily Guest",
        is_guest: true,
        auth_provider: null,
        email_verified: false,
        language_code: "en",
        verification_score: 0,
        total_hours: 3,
        profile_visibility: "PRIVATE",
        show_location: false,
        show_hours: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    users.forEach((user) => this.users.set(user.id, user));

    // Seed user causes
    this.userCauses.set("uc-1", { user_id: "user-1", cause_id: "cause-environment", priority: 1 });
    this.userCauses.set("uc-2", { user_id: "user-1", cause_id: "cause-animals", priority: 2 });
    this.userCauses.set("uc-3", { user_id: "user-2", cause_id: "cause-education", priority: 1 });
    this.userCauses.set("uc-4", { user_id: "user-3", cause_id: "cause-community", priority: 1 });

    // Seed user skills
    this.userSkills.set("us-1", {
      user_id: "user-1",
      skill_id: "skill-1",
      proficiency: "ADVANCED",
      years_experience: 3,
      verified_count: 2,
    });
    this.userSkills.set("us-2", {
      user_id: "user-1",
      skill_id: "skill-6",
      proficiency: "INTERMEDIATE",
      years_experience: 2,
      verified_count: 1,
    });
    this.userSkills.set("us-3", {
      user_id: "user-2",
      skill_id: "skill-5",
      proficiency: "EXPERT",
      years_experience: 10,
      verified_count: 5,
    });
  }

  /**
   * Seed Organizations
   */
  private seedOrganizations() {
    const orgs: Organization[] = [
      {
        id: "org-1",
        name: "Green Future SF",
        slug: "green-future-sf",
        legal_name: "Green Future San Francisco",
        description: "We're dedicated to making San Francisco greener through tree planting, beach cleanups, and urban gardening initiatives.",
        mission: "To create a sustainable future for San Francisco through community-led environmental action.",
        logo_url: "https://via.placeholder.com/200x200/10b981/ffffff?text=GF",
        website: "https://greenfuturesf.org",
        verification_status: "VERIFIED",
        verification_tier: "NONPROFIT_501C3",
        ein: "12-3456789",
        verified_at: new Date("2023-01-15"),
        contact_email: "contact@greenfuturesf.org",
        contact_phone: "(415) 555-0100",
        location: { lat: 37.7749, lng: -122.4194, name: "123 Green St, San Francisco, CA 94102" },
        auto_verify_hours: true,
        require_background_check: false,
        total_volunteers: 342,
        total_hours_hosted: 1856,
        follower_count: 567,
        created_at: new Date("2020-01-01"),
        updated_at: new Date(),
      },
      {
        id: "org-2",
        name: "SF Education Coalition",
        slug: "sf-education-coalition",
        description: "Providing free tutoring and educational support to underserved communities in San Francisco.",
        verification_status: "VERIFIED",
        verification_tier: "NONPROFIT_501C3",
        ein: "98-7654321",
        verified_at: new Date("2023-03-20"),
        contact_email: "hello@sfeducation.org",
        location: { lat: 37.7599, lng: -122.4148, name: "456 Mission St, San Francisco, CA 94105" },
        auto_verify_hours: true,
        require_background_check: true,
        total_volunteers: 189,
        total_hours_hosted: 921,
        follower_count: 234,
        created_at: new Date("2019-06-01"),
        updated_at: new Date(),
      },
      {
        id: "org-3",
        name: "SF Food Bank",
        slug: "sf-food-bank",
        description: "Fighting hunger in San Francisco by distributing food to those in need.",
        verification_status: "VERIFIED",
        verification_tier: "NONPROFIT_501C3",
        verified_at: new Date("2023-02-10"),
        contact_email: "volunteer@sffoodbank.org",
        location: { lat: 37.7272, lng: -122.4018, name: "900 Pennsylvania Ave, San Francisco, CA 94107" },
        auto_verify_hours: false,
        require_background_check: false,
        total_volunteers: 512,
        total_hours_hosted: 3240,
        follower_count: 891,
        created_at: new Date("2018-01-01"),
        updated_at: new Date(),
      },
    ];

    orgs.forEach((org) => this.organizations.set(org.id, org));
  }

  /**
   * Seed Opportunities
   */
  private seedOpportunities() {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const nextWeek = new Date(now);
    nextWeek.setDate(nextWeek.getDate() + 7);
    const nextMonth = new Date(now);
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    const opportunities: Opportunity[] = [
      {
        id: "opp-1",
        org_id: "org-1",
        title: "Beach Cleanup - Ocean Beach",
        description: "Join us for our monthly beach cleanup! We'll provide all supplies including gloves, bags, and grabbers. Help us keep Ocean Beach beautiful and protect marine life from plastic pollution. All ages welcome!",
        cause_id: "cause-environment",
        location: { lat: 37.7599, lng: -122.5106, name: "Ocean Beach, San Francisco, CA" },
        is_virtual: false,
        starts_at: tomorrow,
        ends_at: new Date(tomorrow.getTime() + 3 * 60 * 60 * 1000), // 3 hours
        timezone: "America/Los_Angeles",
        is_recurring: false,
        capacity: 30,
        current_registrations: 18,
        status: "OPEN",
        visibility: "PUBLIC",
        expected_impact_description: "Remove 200+ lbs of trash from the beach",
        created_by: "org-1",
        created_at: new Date("2025-12-15"),
        updated_at: new Date(),
        image_url: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=800",
      },
      {
        id: "opp-2",
        org_id: "org-1",
        title: "Tree Planting in Golden Gate Park",
        description: "Help us plant 100 native trees in Golden Gate Park! No experience necessary - we'll teach you everything you need to know. Wear comfortable clothes and closed-toe shoes. Water and snacks provided.",
        cause_id: "cause-environment",
        location: { lat: 37.7694, lng: -122.4862, name: "Golden Gate Park, San Francisco, CA" },
        is_virtual: false,
        starts_at: nextWeek,
        ends_at: new Date(nextWeek.getTime() + 4 * 60 * 60 * 1000),
        timezone: "America/Los_Angeles",
        is_recurring: false,
        capacity: 50,
        current_registrations: 35,
        status: "OPEN",
        visibility: "PUBLIC",
        expected_impact_description: "Plant 100 native trees",
        requires_background_check: false,
        what_to_bring: "Water bottle, sunscreen, closed-toe shoes",
        created_by: "org-1",
        created_at: new Date("2025-12-20"),
        updated_at: new Date(),
        published_at: new Date("2025-12-20"),
        image_url: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800",
      },
      {
        id: "opp-3",
        org_id: "org-2",
        title: "Math Tutoring - Mission High School",
        description: "Tutor high school students in algebra and geometry. Sessions are 1-on-1 or small groups. Background check required. Great for teachers, college students, or anyone with strong math skills!",
        cause_id: "cause-education",
        location: { lat: 37.7626, lng: -122.4234, name: "Mission High School, San Francisco, CA" },
        is_virtual: false,
        starts_at: tomorrow,
        ends_at: new Date(tomorrow.getTime() + 2 * 60 * 60 * 1000),
        timezone: "America/Los_Angeles",
        is_recurring: true,
        recurrence_rule: "FREQ=WEEKLY;BYDAY=TU,TH",
        capacity: 10,
        current_registrations: 7,
        status: "OPEN",
        visibility: "PUBLIC",
        requires_background_check: true,
        min_age: 18,
        created_by: "org-2",
        created_at: new Date("2025-12-10"),
        updated_at: new Date(),
        published_at: new Date("2025-12-10"),
        image_url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
      },
      {
        id: "opp-4",
        org_id: "org-3",
        title: "Food Sorting & Packing",
        description: "Help us sort and pack food donations for distribution to families in need. This is a high-energy, team-based activity perfect for groups. We'll provide training and all equipment.",
        cause_id: "cause-hunger",
        location: { lat: 37.7272, lng: -122.4018, name: "SF Food Bank Warehouse, San Francisco, CA" },
        is_virtual: false,
        starts_at: nextWeek,
        ends_at: new Date(nextWeek.getTime() + 3 * 60 * 60 * 1000),
        timezone: "America/Los_Angeles",
        is_recurring: false,
        capacity: 40,
        min_volunteers: 10,
        current_registrations: 22,
        status: "OPEN",
        visibility: "PUBLIC",
        expected_impact_description: "Pack 500+ meal kits for families",
        physical_requirements: "Able to stand for 3 hours, lift 20 lbs",
        created_by: "org-3",
        created_at: new Date("2025-12-18"),
        updated_at: new Date(),
        published_at: new Date("2025-12-18"),
        image_url: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800",
      },
      {
        id: "opp-5",
        org_id: "org-1",
        title: "Virtual Climate Action Workshop",
        description: "Join our online workshop to learn about climate action you can take from home. We'll cover reducing your carbon footprint, sustainable living tips, and community organizing strategies.",
        cause_id: "cause-environment",
        is_virtual: true,
        virtual_meeting_url: "https://zoom.us/j/mockmeeting",
        starts_at: nextMonth,
        ends_at: new Date(nextMonth.getTime() + 90 * 60 * 1000),
        timezone: "America/Los_Angeles",
        is_recurring: false,
        capacity: 100,
        current_registrations: 42,
        status: "OPEN",
        visibility: "PUBLIC",
        created_by: "org-1",
        created_at: new Date("2025-12-25"),
        updated_at: new Date(),
        published_at: new Date("2025-12-25"),
      },
    ];

    opportunities.forEach((opp) => this.opportunities.set(opp.id, opp));
  }

  /**
   * Seed Squads
   */
  private seedSquads() {
    const squad: Squad = {
      id: "squad-1",
      leader_id: "user-3",
      name: "Acme Corp Volunteers",
      description: "Acme Corporation's employee volunteer program. We volunteer together quarterly!",
      type: "CORPORATE",
      organization_name: "Acme Corporation",
      is_private: false,
      expected_size: 15,
      created_at: new Date("2024-01-15"),
      member_count: 12,
    };

    this.squads.set(squad.id, squad);

    // Squad members
    const members: SquadMember[] = [
      {
        squad_id: "squad-1",
        user_id: "user-3",
        is_guest: false,
        role: "LEADER",
        joined_at: new Date("2024-01-15"),
      },
      {
        squad_id: "squad-1",
        user_id: "user-4",
        is_guest: true,
        role: "MEMBER",
        joined_at: new Date("2024-02-01"),
        magic_token: "mock-magic-token-123",
        token_expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    ];

    members.forEach((member, idx) => this.squadMembers.set(`sm-${idx}`, member));
  }

  /**
   * Seed Impact Ledger
   */
  private seedImpactLedger() {
    const impacts: ImpactEntry[] = [
      {
        id: "impact-1",
        user_id: "user-1",
        org_id: "org-1",
        opportunity_id: "opp-1",
        hours: 3,
        date: new Date("2025-12-01"),
        role_title: "Beach Cleanup Volunteer",
        description: "Helped clean Ocean Beach",
        impact_description: "Collected 45 lbs of trash",
        status: "VERIFIED",
        tier: "GOLD",
        verification_method: "QR",
        verified_at: new Date("2025-12-01"),
        is_historical: false,
        created_at: new Date("2025-12-01"),
        updated_at: new Date("2025-12-01"),
      },
      {
        id: "impact-2",
        user_id: "user-1",
        org_id: "org-1",
        hours: 4,
        date: new Date("2025-11-15"),
        role_title: "Tree Planting Volunteer",
        description: "Planted native trees in Golden Gate Park",
        impact_description: "Planted 12 trees",
        status: "VERIFIED",
        tier: "GOLD",
        verification_method: "QR",
        verified_at: new Date("2025-11-16"),
        is_historical: false,
        created_at: new Date("2025-11-15"),
        updated_at: new Date("2025-11-16"),
      },
      {
        id: "impact-3",
        user_id: "user-2",
        org_id: "org-2",
        hours: 2,
        date: new Date("2025-12-30"),
        role_title: "Math Tutor",
        description: "Tutored algebra students",
        status: "PENDING",
        is_historical: false,
        created_at: new Date("2025-12-30"),
        updated_at: new Date("2025-12-30"),
      },
      // Historical entry
      {
        id: "impact-4",
        user_id: "user-1",
        org_id: "org-1",
        hours: 6,
        date: new Date("2024-08-20"),
        role_title: "Event Coordinator",
        description: "Coordinated community garden event",
        status: "PENDING",
        verification_method: "EMAIL",
        verifier_email: "supervisor@greenfuturesf.org",
        is_historical: true,
        created_at: new Date("2025-12-28"),
        updated_at: new Date("2025-12-28"),
      },
    ];

    impacts.forEach((impact) => this.impactLedger.set(impact.id, impact));
  }

  /**
   * Seed Registrations
   */
  private seedRegistrations() {
    const registrations: Registration[] = [
      {
        id: "reg-1",
        opportunity_id: "opp-1",
        user_id: "user-1",
        status: "CONFIRMED",
        registered_at: new Date("2025-12-20"),
      },
      {
        id: "reg-2",
        opportunity_id: "opp-2",
        user_id: "user-1",
        status: "CONFIRMED",
        registered_at: new Date("2025-12-22"),
      },
      {
        id: "reg-3",
        opportunity_id: "opp-2",
        user_id: "user-3",
        squad_id: "squad-1",
        status: "CONFIRMED",
        registered_at: new Date("2025-12-23"),
      },
      {
        id: "reg-4",
        opportunity_id: "opp-4",
        user_id: "user-2",
        status: "CONFIRMED",
        registered_at: new Date("2025-12-25"),
      },
    ];

    registrations.forEach((reg) => this.registrations.set(reg.id, reg));
  }

  /**
   * Seed Badges
   */
  private seedBadges() {
    const badges: Badge[] = [
      {
        id: "badge-1",
        name: "First Timer",
        description: "Completed your first volunteer activity",
        tier: "BRONZE",
        criteria: { hours: 1 },
        rarity: "COMMON",
        sort_order: 1,
        is_active: true,
        created_at: new Date("2023-01-01"),
      },
      {
        id: "badge-2",
        name: "Dedicated Volunteer",
        description: "Reached 10 hours of verified volunteer time",
        tier: "SILVER",
        criteria: { hours: 10 },
        rarity: "COMMON",
        sort_order: 2,
        is_active: true,
        created_at: new Date("2023-01-01"),
      },
      {
        id: "badge-3",
        name: "Impact Champion",
        description: "Reached 100 hours of verified volunteer time",
        tier: "GOLD",
        criteria: { hours: 100 },
        rarity: "UNCOMMON",
        sort_order: 3,
        is_active: true,
        created_at: new Date("2023-01-01"),
      },
      {
        id: "badge-4",
        name: "Tree Hugger",
        description: "Contributed 25+ hours to environmental causes",
        tier: "GOLD",
        criteria: { cause: "cause-environment", hours: 25 },
        rarity: "UNCOMMON",
        sort_order: 4,
        is_active: true,
        created_at: new Date("2023-01-01"),
      },
    ];

    badges.forEach((badge) => this.badges.set(badge.id, badge));

    // User badges
    this.userBadges.set("ub-1", {
      user_id: "user-1",
      badge_id: "badge-1",
      earned_at: new Date("2023-06-20"),
      is_featured: false,
    });
    this.userBadges.set("ub-2", {
      user_id: "user-1",
      badge_id: "badge-2",
      earned_at: new Date("2023-08-15"),
      is_featured: false,
    });
    this.userBadges.set("ub-3", {
      user_id: "user-1",
      badge_id: "badge-3",
      earned_at: new Date("2024-05-10"),
      is_featured: true,
    });
  }

  /**
   * Seed Conversations & Messages
   */
  private seedConversations() {
    const conv: Conversation = {
      id: "conv-1",
      type: "DM",
      subject: "Question about Beach Cleanup",
      is_archived: false,
      created_at: new Date("2025-12-29"),
      updated_at: new Date("2025-12-30"),
      last_message_at: new Date("2025-12-30"),
    };

    this.conversations.set(conv.id, conv);

    // Participants
    this.conversationParticipants.set("cp-1", {
      conversation_id: "conv-1",
      participant_id: "user-1",
      participant_type: "USER",
      joined_at: new Date("2025-12-29"),
      last_read_at: new Date("2025-12-30"),
      is_muted: false,
    });

    this.conversationParticipants.set("cp-2", {
      conversation_id: "conv-1",
      participant_id: "org-1",
      participant_type: "ORG",
      joined_at: new Date("2025-12-29"),
      last_read_at: new Date("2025-12-30"),
      is_muted: false,
    });

    // Messages
    const messages: Message[] = [
      {
        id: "msg-1",
        conversation_id: "conv-1",
        sender_id: "user-1",
        sender_type: "USER",
        body: "Hi! I was wondering if parking is available near Ocean Beach for the cleanup?",
        sent_at: new Date("2025-12-29T14:30:00"),
      },
      {
        id: "msg-2",
        conversation_id: "conv-1",
        sender_id: "org-1",
        sender_type: "ORG",
        body: "Hi Sarah! Yes, there's a large parking lot at the north end of Ocean Beach. It's free and usually has plenty of space. See you there!",
        sent_at: new Date("2025-12-29T16:45:00"),
      },
      {
        id: "msg-3",
        conversation_id: "conv-1",
        sender_id: "user-1",
        sender_type: "USER",
        body: "Perfect, thank you!",
        sent_at: new Date("2025-12-30T09:15:00"),
      },
    ];

    messages.forEach((msg) => this.messages.set(msg.id, msg));
  }

  /**
   * Seed Notifications
   */
  private seedNotifications() {
    const notifications: Notification[] = [
      {
        id: "notif-1",
        recipient_id: "user-1",
        type: "IN_APP",
        category: "REMINDER",
        title: "Event Tomorrow: Beach Cleanup",
        body: "Don't forget! You're registered for Beach Cleanup - Ocean Beach tomorrow at 9:00 AM.",
        action_url: "/discover/opp-1",
        action_text: "View Event",
        status: "SENT",
        sent_at: new Date(),
        created_at: new Date(),
      },
      {
        id: "notif-2",
        recipient_id: "user-1",
        type: "IN_APP",
        category: "VERIFICATION",
        title: "Hours Verified!",
        body: "Green Future SF verified your 3 hours from the Beach Cleanup event.",
        action_url: "/dashboard",
        action_text: "View Dashboard",
        status: "READ",
        sent_at: new Date("2025-12-01"),
        read_at: new Date("2025-12-01"),
        created_at: new Date("2025-12-01"),
      },
    ];

    notifications.forEach((notif) => this.notifications.set(notif.id, notif));
  }

  /**
   * Reset database to initial state
   */
  reset() {
    this.users.clear();
    this.organizations.clear();
    this.opportunities.clear();
    this.registrations.clear();
    this.impactLedger.clear();
    this.squads.clear();
    this.squadMembers.clear();
    this.squadBookings.clear();
    this.causes.clear();
    this.skills.clear();
    this.userCauses.clear();
    this.userSkills.clear();
    this.conversations.clear();
    this.conversationParticipants.clear();
    this.messages.clear();
    this.notifications.clear();
    this.badges.clear();
    this.userBadges.clear();
    this.endorsements.clear();
    this.reviews.clear();
    this.magicTokens.clear();
    this.userFollows.clear();

    this.seed();
  }

  /**
   * Generate a new ID
   */
  generateId(prefix: string = "id"): string {
    return `${prefix}-${nanoid(10)}`;
  }
}

// Singleton instance
export const db = new InMemoryDB();
