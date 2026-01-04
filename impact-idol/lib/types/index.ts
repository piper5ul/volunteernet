// ==========================================
// CORE TYPES
// ==========================================

export interface Location {
  lat: number;
  lng: number;
  name: string;
}

// ==========================================
// USER TYPES
// ==========================================

export interface User {
  id: string;
  email: string;
  name: string;
  username?: string;
  avatar_url?: string;
  bio?: string;
  tagline?: string;
  phone?: string;

  // Account status
  is_guest: boolean;
  merged_into?: string;
  auth_provider?: "google" | "github" | "email" | null;
  email_verified: boolean;

  // Location & preferences
  location?: Location;
  timezone?: string;
  language_code: string;

  // Reputation & metrics (denormalized)
  verification_score: number;
  total_hours: number;
  volunteer_since?: Date;

  // Privacy settings
  profile_visibility: "PUBLIC" | "PRIVATE" | "CONNECTIONS_ONLY";
  show_location: boolean;
  show_hours: boolean;

  // Metadata
  created_at: Date;
  updated_at: Date;
  last_active_at?: Date;
  deactivated_at?: Date;
}

// ==========================================
// ORGANIZATION TYPES
// ==========================================

export interface Organization {
  id: string;
  name: string;
  slug: string;
  legal_name?: string;
  description?: string;
  mission?: string;
  logo_url?: string;
  cover_image_url?: string;
  website?: string;

  // Verification
  verification_status: "PENDING" | "VERIFIED" | "REJECTED";
  verification_tier:
    | "NONPROFIT_501C3"
    | "COMMUNITY_GROUP"
    | "CORPORATE"
    | "SCHOOL"
    | "GOVERNMENT";
  ein?: string;
  verified_at?: Date;
  verified_by?: string;

  // Contact info
  contact_email?: string;
  contact_phone?: string;
  location?: Location;

  // Settings
  auto_verify_hours: boolean;
  require_background_check: boolean;

  // Metrics (denormalized)
  total_volunteers: number;
  total_hours_hosted: number;
  follower_count: number;

  // Metadata
  created_at: Date;
  updated_at: Date;
  deactivated_at?: Date;
}

export interface OrgMember {
  org_id: string;
  user_id: string;
  role: "OWNER" | "ADMIN" | "COORDINATOR" | "MEMBER";
  permissions?: Record<string, boolean>;
  title?: string;
  joined_at: Date;
  invited_by?: string;
}

// ==========================================
// TAXONOMY TYPES
// ==========================================

export interface Cause {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon: string;
  color: string;
  parent_id?: string;
  sort_order: number;
  is_active: boolean;
}

export interface Skill {
  id: string;
  name: string;
  slug: string;
  description?: string;
  category: "TECHNICAL" | "LANGUAGE" | "TRADE" | "SOFT_SKILL" | "PHYSICAL";
  is_active: boolean;
}

export interface UserCause {
  user_id: string;
  cause_id: string;
  priority: number;
}

export interface UserSkill {
  user_id: string;
  skill_id: string;
  proficiency: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT";
  years_experience?: number;
  verified_count: number;
}

// ==========================================
// OPPORTUNITY TYPES
// ==========================================

export interface Opportunity {
  id: string;
  org_id: string;

  // Basic info
  title: string;
  description: string;
  cause_id: string;

  // Location
  location?: Location;
  is_virtual: boolean;
  virtual_meeting_url?: string;

  // Timing
  starts_at: Date;
  ends_at: Date;
  registration_deadline?: Date;
  timezone: string;
  is_recurring: boolean;
  recurrence_rule?: string;

  // Capacity
  capacity?: number;
  min_volunteers?: number;
  current_registrations: number;

  // Requirements
  min_age?: number;
  requires_background_check: boolean;
  physical_requirements?: string;
  what_to_bring?: string;

  // Status
  status: "DRAFT" | "OPEN" | "FULL" | "CANCELLED" | "COMPLETED";
  visibility: "PUBLIC" | "PRIVATE" | "FOLLOWERS_ONLY";

  // Impact tracking
  expected_impact_description?: string;
  actual_impact_description?: string;

  // Metadata
  created_by: string;
  created_at: Date;
  updated_at: Date;
  published_at?: Date;
  cancelled_at?: Date;
  cancellation_reason?: string;

  // Image
  image_url?: string;
}

export interface OpportunitySkill {
  opportunity_id: string;
  skill_id: string;
  is_required: boolean;
}

export interface OpportunityShift {
  id: string;
  opportunity_id: string;
  name?: string;
  starts_at: Date;
  ends_at: Date;
  capacity?: number;
  current_registrations: number;
}

// ==========================================
// REGISTRATION TYPES
// ==========================================

export interface Registration {
  id: string;
  opportunity_id: string;
  shift_id?: string;
  user_id: string;
  squad_id?: string;

  // Status
  status: "CONFIRMED" | "WAITLIST" | "CANCELLED" | "NO_SHOW" | "ATTENDED";

  // Check-in tracking
  checked_in_at?: Date;
  checked_out_at?: Date;
  check_in_method?: "QR" | "GPS" | "MANUAL";

  // Hours calculation
  actual_hours?: number;

  // Metadata
  registered_at: Date;
  cancelled_at?: Date;
  cancellation_reason?: string;
  notes?: string;
}

// ==========================================
// SQUAD TYPES
// ==========================================

export interface Squad {
  id: string;
  leader_id: string;
  name: string;
  description?: string;
  type: "CORPORATE" | "SCHOOL" | "SOCIAL" | "FRIENDS" | "FAMILY";
  organization_name?: string;

  // Settings
  is_private: boolean;
  expected_size?: number;

  // Metadata
  created_at: Date;
  member_count: number;
}

export interface SquadMember {
  squad_id: string;
  user_id: string;
  is_guest: boolean;
  magic_token?: string;
  token_expires_at?: Date;
  role: "LEADER" | "CO_LEADER" | "MEMBER";
  joined_at: Date;
}

export interface SquadBooking {
  id: string;
  squad_id: string;
  opportunity_id: string;
  spots_reserved: number;
  magic_link?: string;
  created_by: string;
  created_at: Date;
}

// ==========================================
// IMPACT LEDGER TYPES
// ==========================================

export interface ImpactEntry {
  id: string;
  user_id: string;
  org_id?: string;
  opportunity_id?: string;
  registration_id?: string;
  squad_id?: string;

  // Impact data
  hours: number;
  date: Date;
  role_title?: string;
  description?: string;
  impact_description?: string;

  // Verification
  status: "PENDING" | "VERIFIED" | "DISPUTED" | "REJECTED";
  tier?: "SILVER" | "GOLD" | "PLATINUM";
  verification_method?: "EMAIL" | "QR" | "GPS" | "MANUAL";

  verified_at?: Date;
  verified_by?: string;
  verifier_email?: string;
  verification_token?: string;
  verification_expires_at?: Date;

  dispute_reason?: string;
  disputed_at?: Date;
  disputed_by?: string;

  // Metadata
  is_historical: boolean;
  created_at: Date;
  updated_at: Date;
}

// ==========================================
// TRUST & SAFETY TYPES
// ==========================================

export interface Endorsement {
  id: string;
  from_org_id: string;
  to_user_id: string;

  skill_id?: string;
  soft_skill?: "RELIABILITY" | "TEAMWORK" | "LEADERSHIP" | "COMMUNICATION" | "INITIATIVE";

  comment?: string;
  impact_ledger_id?: string;

  is_public: boolean;
  created_at: Date;
}

export interface Review {
  id: string;
  opportunity_id: string;
  reviewer_id: string;
  reviewee_id: string;
  reviewee_type: "USER" | "ORG";

  // Rating
  overall_rating: number;

  // Category ratings (for orgs)
  safety_rating?: number;
  organization_rating?: number;
  impact_rating?: number;

  // Category ratings (for volunteers)
  reliability_rating?: number;
  skill_rating?: number;
  communication_rating?: number;

  comment?: string;
  is_public: boolean;

  // Moderation
  is_flagged: boolean;
  flagged_reason?: string;

  created_at: Date;
  updated_at: Date;
}

export interface MagicToken {
  id: string;
  token: string;
  user_id: string;
  type: "SQUAD_INVITE" | "CLAIM_IMPACT" | "EMAIL_VERIFY";
  expires_at: Date;
  used: boolean;
  used_at?: Date;
  metadata?: Record<string, any>;
  created_at: Date;
}

// ==========================================
// COMMUNICATION TYPES
// ==========================================

export interface Conversation {
  id: string;
  type: "DM" | "EVENT_CHAT" | "SQUAD_CHAT" | "ORG_VOLUNTEER";
  subject?: string;
  reference_id?: string;
  reference_type?: "OPPORTUNITY" | "SQUAD";

  is_archived: boolean;

  created_at: Date;
  updated_at: Date;
  last_message_at?: Date;
}

export interface ConversationParticipant {
  conversation_id: string;
  participant_id: string;
  participant_type: "USER" | "ORG";

  joined_at: Date;
  left_at?: Date;
  last_read_at?: Date;

  is_muted: boolean;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  sender_type: "USER" | "ORG";

  body: string;
  attachments?: Array<{
    url: string;
    type: string;
    name: string;
  }>;

  sent_at: Date;
  edited_at?: Date;
  deleted_at?: Date;

  read_by?: Record<string, Date>;
}

export interface Notification {
  id: string;
  recipient_id: string;

  type: "EMAIL" | "SMS" | "PUSH" | "IN_APP";
  category:
    | "REMINDER"
    | "UPDATE"
    | "VERIFICATION"
    | "ANNOUNCEMENT"
    | "MESSAGE"
    | "SOCIAL";
  title: string;
  body?: string;
  action_url?: string;
  action_text?: string;

  status: "PENDING" | "SENT" | "DELIVERED" | "FAILED" | "READ";
  scheduled_for?: Date;
  sent_at?: Date;
  delivered_at?: Date;
  read_at?: Date;
  failed_reason?: string;

  metadata?: Record<string, any>;
  batch_id?: string;

  created_at: Date;
}

export interface NotificationPreference {
  user_id: string;
  channel: "EMAIL" | "SMS" | "PUSH";
  category: string;
  enabled: boolean;
  frequency: "IMMEDIATE" | "DAILY_DIGEST" | "WEEKLY_DIGEST";
}

// ==========================================
// GAMIFICATION TYPES
// ==========================================

export interface Badge {
  id: string;
  name: string;
  description?: string;
  icon_url?: string;
  tier: "BRONZE" | "SILVER" | "GOLD" | "PLATINUM";
  criteria?: Record<string, any>;
  rarity: "COMMON" | "UNCOMMON" | "RARE" | "LEGENDARY";
  sort_order: number;
  is_active: boolean;
  created_at: Date;
}

export interface UserBadge {
  user_id: string;
  badge_id: string;
  earned_at: Date;
  is_featured: boolean;
}

export interface Achievement {
  id: string;
  user_id: string;
  type: "HOURS_MILESTONE" | "CAUSE_CHAMPION" | "STREAK" | "ORG_PARTNER";
  title: string;
  description?: string;
  value?: Record<string, any>;
  achieved_at: Date;
}

// ==========================================
// ANALYTICS & EXPORTS TYPES
// ==========================================

export interface ExportLog {
  id: string;
  org_id: string;
  exported_by: string;

  type: "GRANT_REPORT" | "VOLUNTEER_LIST" | "HOURS_SUMMARY";
  format: "PDF" | "CSV" | "JSON";

  date_range_start?: Date;
  date_range_end?: Date;
  filters?: Record<string, any>;

  file_url?: string;
  row_count?: number;

  created_at: Date;
  expires_at?: Date;
}

// ==========================================
// SOCIAL TYPES
// ==========================================

export interface UserFollow {
  follower_id: string;
  followee_id: string;
  followee_type: "USER" | "ORG";
  followed_at: Date;
}

export interface UserConnection {
  user_id_1: string;
  user_id_2: string;
  status: "PENDING" | "ACCEPTED" | "BLOCKED";
  requested_by: string;
  requested_at: Date;
  accepted_at?: Date;
}

// ==========================================
// FILTER & QUERY TYPES
// ==========================================

export interface OpportunityFilters {
  causes?: string[];
  skills?: string[];
  location?: {
    lat: number;
    lng: number;
    radius: number; // in miles
  };
  date_range?: {
    start: Date;
    end: Date;
  };
  availability?: "weekends" | "weekdays" | "evenings";
  is_virtual?: boolean;
  search_query?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: "asc" | "desc";
}

// ==========================================
// AGGREGATE TYPES (for stats/metrics)
// ==========================================

export interface ImpactStats {
  total_hours: number;
  total_events: number;
  total_orgs: number;
  total_causes: number;
  monetary_value: number;
  hours_by_cause: Record<string, number>;
  hours_by_month: Array<{ month: string; hours: number }>;
  top_causes: Array<{ cause_id: string; hours: number }>;
  top_orgs: Array<{ org_id: string; hours: number }>;
}

export interface OrgStats {
  total_volunteers: number;
  total_hours: number;
  total_events: number;
  retention_rate: number;
  no_show_rate: number;
  avg_rating: number;
  monetary_value: number;
  new_volunteers_this_month: number;
  active_opportunities: number;
}

// ==========================================
// DEMO/UTILITY TYPES
// ==========================================

export type Persona =
  | { type: "guest" }
  | { type: "volunteer"; userId: string }
  | { type: "org-admin"; orgId: string }
  | { type: "squad-leader"; userId: string; squadId: string };

// ==========================================
// API RESPONSE TYPES
// ==========================================

export interface ApiResponse<T> {
  data?: T;
  error?: {
    code: string;
    message: string;
  };
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
}
