# Impact Idol: Complete Product Requirements Document
**Version:** 7.0 (Enhanced with Implementation Priorities)
**Date:** January 3, 2026
**Status:** Initial Requirements - Pre-Development
**Vision:** The global **System of Record** for volunteer impact—transforming social good into a verified professional credential.

**Latest Updates (v7.0):**
- ✅ Enhanced passive verification implementation with multi-touch notification strategy
- ✅ Complete guest → full user flow with security measures and abuse prevention
- ✅ Added critical features implementation priorities (Section 9.0)
- ✅ Success metrics and KPIs for viral growth and verification
- ✅ Risk mitigation strategies and technical debt considerations
- ✅ Implementation decision trees for phased rollout

---

## Table of Contents
1. [Executive Summary](#1-executive-summary)
2. [The Problem & Solution](#2-the-problem--solution)
3. [The Three Core Loops (Flywheel)](#3-the-three-core-loops-flywheel)
4. [User Personas & Core Features](#4-user-personas--core-features)
5. [Complete Data Model](#5-complete-data-model)
6. [Communication Architecture](#6-communication-architecture)
7. [Technical Architecture](#7-technical-architecture)
8. [Trust & Verification Protocol](#8-trust--verification-protocol)
9. [Development Roadmap](#9-development-roadmap)
10. [Success Metrics](#10-success-metrics)
11. [Open Questions & Decisions](#11-open-questions--decisions)

---

## 1. Executive Summary

**The Core Problem:** Volunteering is invisible, unverified, and transactional. Volunteers lose their history when they change cities or organizations. Organizations struggle with impact reporting for grants and funding.

**The Solution:** A triple-sided marketplace (Volunteers, Organizations, Squads) built on a verified reputation protocol. Think "LinkedIn for Volunteers" meets a volunteer marketplace.

**Key Differentiators:**
- **Public volunteer profiles** with verified impact history
- **Dual verification system** (volunteers verify orgs, orgs verify volunteers)
- **Squad booking system** for viral growth (corporate teams, student groups, friend groups)
- **Grant reporting tools** for organizations (calculates monetary value of volunteer time)
- **API-first architecture** for data portability and ecosystem building

**Business Model Considerations:**
- Free for individual volunteers (core product)
- Freemium for organizations (basic free, advanced analytics/features paid)
- Potential enterprise tier for corporate volunteer programs

---

## 2. The Problem & Solution

### 2.1 The Current State (Pain Points)

**For Volunteers:**
- ❌ No portable record of volunteer work
- ❌ Can't prove skills gained through volunteering
- ❌ Hard to discover relevant opportunities
- ❌ No recognition beyond a "thank you"
- ❌ Lose history when moving or changing interests

**For Organizations:**
- ❌ Hard to find reliable, skilled volunteers
- ❌ Manual tracking of volunteer hours for grant reports
- ❌ No way to maintain relationships with past volunteers
- ❌ Struggle with no-shows and unreliable volunteers
- ❌ Can't demonstrate impact to funders

**For The Ecosystem:**
- ❌ Volunteer work is invisible to employers
- ❌ No standard for verifying volunteer impact
- ❌ Social good is undervalued in professional contexts

### 2.2 Our Solution

A **verified volunteer reputation system** that serves as:
1. **Professional credential platform** (for volunteers)
2. **Volunteer relationship management system** (for organizations)
3. **Marketplace** (connecting supply and demand)
4. **Social network** (building community around causes)

---

## 3. The Three Core Loops (Flywheel)

These loops solve the "Cold Start" problem and create sustainable growth.

### 3.1 The Utility Loop (Single Player Mode)
**Purpose:** Volunteer gets value even if they're the only user.

```
Volunteer imports past history
  → System sends "Verify" email to supervisor
  → Supervisor verifies (one-click)
  → Hours become "Silver Verified"
  → Supervisor sees value, invited to join as Org
```

**Key Insight:** Every historical entry is a potential lead for org acquisition.

### 3.2 The Growth Loop (Viral Squads)
**Purpose:** Each event booking can 10x user acquisition.

```
Squad Leader books N spots
  → System generates Magic Links
  → Leader shares with team/friends
  → Guests join as "Lite Users" (email only)
  → After event, guests get "Claim Your Impact" email
  → Guests convert to Full Users to see their profile
```

**Key Insight:** Conversion happens AFTER value delivery (volunteering), when motivation is highest.

### 3.3 The Retention Loop (Org Value)
**Purpose:** Organizations get tangible ROI from using the platform.

```
Org verifies volunteer hours (passive or active)
  → Impact Ledger accumulates data
  → System calculates monetary value (hours × local wage)
  → Org exports Grant Report (PDF/CSV)
  → Org secures funding using report
  → Org posts more opportunities
```

**Key Insight:** Grant reports make volunteer tracking a necessity, not a nice-to-have.

---

## 4. User Personas & Core Features

### 4.1 Persona: Volunteers

**Segments:**
- **Students** (18-24): Building resume, exploring careers, required service hours
- **Young Professionals** (25-35): Skill development, networking, purpose
- **Mid-Career** (35-50): Give back, leadership opportunities, teach skills
- **Retirees** (50+): Purpose, community, legacy

**Core Jobs to Be Done:**
1. Discover opportunities that match my interests/location/schedule
2. Build a verified record of my volunteer work
3. Showcase my impact to employers/schools/community
4. Connect with like-minded volunteers
5. Track my personal impact over time

**Feature Set:**

#### Discovery & Matching
- **Geo-based feed**: "Opportunities within 10 miles" (PostGIS-powered)
- **Interest/cause filters**: Environment, education, health, animals, social justice, etc.
- **Skill-based matching**: "Looking for graphic designers", "Need Spanish speakers"
- **Availability matching**: Weekends only, evenings, one-time vs recurring
- **Smart recommendations**: ML-based on past activity and profile
- **Social discovery**: "3 of your connections volunteered here"
- **Search**: Full-text search across opportunities
- **Saved searches**: Get notified of new matches

#### Profile & Portfolio ("Resume of Good")
- **Public profile URL**: `impactidol.com/u/jane-smith`
- **Volunteer history timeline**: Chronological list of verified experiences
- **Hours tracking**: Total hours + breakdown by cause/organization
- **Skills showcase**:
  - Skills offered (what you can contribute)
  - Skills used (verified by organizations)
  - Skills gained (documented growth)
- **Endorsements**: From organizations (like LinkedIn recommendations)
- **Badges/Achievements**: Milestones (10hrs, 100hrs), cause-specific, special recognitions
- **Portfolio media**: Photos from events, impact stories, certificates
- **Export functionality**: Download as PDF resume/CV
- **Privacy controls**: Choose what's public/private
- **Custom URL**: Vanity URLs for established volunteers

#### Impact Dashboard
- **Personal impact metrics**:
  - "50 trees planted"
  - "100 meals served"
  - "20 hours tutoring"
  - Monetary value of time contributed
- **Visual analytics**:
  - Hours over time (charts)
  - Causes contributed to (pie chart)
  - Organizations supported (list)
  - Skills used frequency (bar chart)
- **Comparative stats**: "Top 10% of volunteers in your city"
- **Impact stories**: Rich text + media storytelling
- **Social sharing**: Generate social media cards with stats
- **Year-in-review**: Annual summary (like Spotify Wrapped)

#### Engagement Tools
- **Calendar integration**: Add to Google/Apple Calendar, .ics download
- **Reminders**: Email/SMS/push 24h before event, 1h before event
- **Check-in/check-out**: QR code scan or GPS-based
- **Direct messaging**: Chat with organizations about opportunities
- **Reviews**: Rate organization after event (safety, experience, impact clarity)
- **Referral system**: "Invite friends" with custom message
- **Following**: Follow organizations to get notified of new opportunities
- **Groups**: Join affinity groups (LGBTQ+ volunteers, tech volunteers, etc.)

### 4.2 Persona: Organizations

**Segments:**
- **Established Nonprofits** (501c3): Formal structures, grant-dependent
- **Grassroots Groups**: Community-led, informal, agile
- **Schools/Universities**: Student service programs, required hours tracking
- **Corporate CSR**: Employee volunteer programs, matching gifts
- **Government**: Parks, libraries, community services

**Core Jobs to Be Done:**
1. Find reliable, skilled volunteers quickly
2. Manage volunteer scheduling and communication
3. Track and verify volunteer hours for reporting
4. Build long-term relationships with volunteers
5. Demonstrate impact to funders/board/community

**Feature Set:**

#### Opportunity Management (VRM - Volunteer Relationship Management)
- **Post opportunities**:
  - Title, description, cause category
  - Skills needed (required vs preferred)
  - Location (address or virtual)
  - Date/time with multiple shifts
  - Capacity limits per shift
  - Age requirements, background check needs
- **Shift management**:
  - Create multiple time slots for same event
  - Set different capacities per shift
  - Auto-close when full
- **Registration tracking**:
  - See who's committed (confirmed)
  - Manage waitlist
  - Track RSVPs vs actual attendance
- **Recurring events**:
  - Template for weekly/monthly opportunities
  - Auto-post and manage series
- **Role templates**: Save common opportunity types for quick posting
- **Team/group registration**: Allow squads to book multiple spots at once
- **Cancellation management**: Notify all registered volunteers instantly
- **Check-in tools**: QR codes for volunteers to scan, or manual roll call

#### Communication Hub
- **Broadcast messaging**:
  - Email/SMS to all attendees for an event
  - Targeted messages (confirmed, waitlist, past volunteers)
  - Event updates (time/location changes)
  - Emergency notifications
- **Automated reminders**:
  - System sends reminders 24h before
  - Customizable message templates
- **Direct messaging**: 1-on-1 chat with individual volunteers
- **Announcements**: Post updates to all followers
- **Comment threads**: Discussion on opportunity pages

#### Volunteer Database & CRM
- **Search/filter volunteers**:
  - By skills, location, availability
  - Past participation with your org
  - Reliability score
- **Tagging system**:
  - Create custom tags (regulars, skilled, event-specific)
  - Segment volunteers for targeted outreach
- **Notes**: Add private notes about individual volunteers
- **Relationship history**: See all past interactions
- **Endorsement tool**:
  - Endorse volunteers for specific skills
  - Write recommendations
  - "Rapid review" swipe interface for batch endorsements
- **Export lists**: Download volunteer data for offline use

#### Analytics Dashboard
- **Volunteer metrics**:
  - Top volunteers (most active, most reliable)
  - New vs returning volunteers
  - Retention rate (how many come back)
  - No-show rate
- **Event performance**:
  - Fill rate (capacity vs actual)
  - Cancellation rate
  - Show-up rate (registered vs attended)
  - Average rating from volunteers
- **Impact metrics**:
  - Total hours contributed
  - Number of unique volunteers
  - Monetary value of volunteer time
  - Impact over time (trends)
- **Volunteer pipeline**:
  - Funnel analysis (new → active → champion)
  - Conversion rates
- **Demographics**: Age, skills, location distribution (aggregated, privacy-preserving)
- **Trend analysis**: Growth over time, seasonal patterns

#### Grant Reporting Tools
- **Automated calculation**:
  - Total hours × Independent Sector hourly rate (or local wage)
  - Breakdown by project/program
  - Date range selection
- **Export formats**:
  - PDF formatted for grant applications
  - CSV for spreadsheet manipulation
  - Integration with common grant platforms
- **Custom reports**: Build reports with specific data points
- **Historical tracking**: Year-over-year comparisons

#### Organization Profile
- **Public profile page**: `impactidol.com/org/habitat-for-humanity-sf`
- **Verification badge**: Displays verification status (501c3, community group, etc.)
- **About section**: Mission, history, impact stats
- **Photo gallery**: Show your work in action
- **Team members**: List coordinators and staff
- **Reviews from volunteers**: Star ratings and comments
- **Impact showcase**: Total hours hosted, volunteers engaged, projects completed
- **Followers count**: Build social proof
- **Upcoming events**: Calendar of opportunities

### 4.3 Persona: Squad Leaders

**Segments:**
- **Corporate teams**: HR/CSR coordinators organizing team volunteering
- **Student groups**: Campus clubs, fraternities/sororities, class projects
- **Social groups**: Friend groups, religious groups, hobby clubs

**Core Jobs to Be Done:**
1. Find appropriate volunteer opportunities for my group
2. Book multiple spots at once without making everyone sign up individually
3. Track participation for my team (for corporate reporting or school requirements)
4. Make it easy for my team to participate (low friction)

**Feature Set:**

#### Squad Management
- **Create squad**: Name, type (corporate/school/social), expected size
- **Squad booking**: Reserve N spots for any opportunity
- **Magic link generation**: Get shareable link for squad members
- **Roster management**: See who's joined (guests vs full users)
- **Squad messaging**: Group chat for coordination
- **Squad history**: See all past events your squad attended
- **Squad impact**: Aggregate metrics for the whole squad

#### Lite User / Guest Flow
- **Magic link invitation**: Click link → auto-registered as guest
- **No login required**: Participate without creating account
- **Post-event conversion**: "Claim Your Impact" email after event
- **Seamless upgrade**: One-click to create full account and claim all past hours
- **Data preservation**: All guest activity transferred to full account

---

## 5. Complete Data Model

### 5.1 Schema Overview

**Core Entities:**
- **Identity**: `users`, `organizations`, `org_members`
- **Taxonomy**: `causes`, `skills`
- **Marketplace**: `opportunities`, `registrations`
- **Social**: `squads`, `user_follows`, `connections`
- **Impact**: `impact_ledger`, `endorsements`, `reviews`
- **Communication**: `conversations`, `messages`, `notifications`
- **Gamification**: `badges`, `user_badges`
- **Analytics**: `export_logs`

### 5.2 Detailed Schema

```sql
-- ==========================================
-- IDENTITY & AUTHENTICATION
-- ==========================================

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    avatar_url VARCHAR(500),
    bio TEXT,
    tagline VARCHAR(255), -- One-line description
    phone VARCHAR(20), -- For SMS notifications

    -- Account status
    is_guest BOOLEAN DEFAULT FALSE,
    merged_into UUID REFERENCES users(id), -- For guest → full user merge
    auth_provider VARCHAR(50), -- google, email, github, null for guests
    email_verified BOOLEAN DEFAULT FALSE,

    -- Location & preferences
    location GEOGRAPHY(POINT), -- PostGIS for geo-matching
    location_name VARCHAR(255), -- Human-readable: "San Francisco, CA"
    timezone VARCHAR(50), -- IANA timezone: "America/Los_Angeles"
    language_code VARCHAR(10) DEFAULT 'en', -- For i18n

    -- Reputation & metrics (denormalized for performance)
    verification_score FLOAT DEFAULT 0, -- Calculated reliability metric (0-100)
    total_hours FLOAT DEFAULT 0, -- Cached from impact_ledger
    volunteer_since DATE, -- First volunteer activity

    -- Privacy settings
    profile_visibility VARCHAR(20) DEFAULT 'PUBLIC', -- PUBLIC, PRIVATE, CONNECTIONS_ONLY
    show_location BOOLEAN DEFAULT TRUE,
    show_hours BOOLEAN DEFAULT TRUE,

    -- Metadata
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    last_active_at TIMESTAMP,
    deactivated_at TIMESTAMP -- Soft delete
);

-- Indexes for common queries
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_location ON users USING GIST(location);
CREATE INDEX idx_users_is_guest ON users(is_guest);
CREATE INDEX idx_users_created_at ON users(created_at);

CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE, -- For public URLs: impactidol.com/org/habitat-sf
    legal_name VARCHAR(255), -- Official registered name
    description TEXT,
    mission TEXT, -- Mission statement
    logo_url VARCHAR(500),
    cover_image_url VARCHAR(500),
    website VARCHAR(500),

    -- Verification
    verification_status VARCHAR(20) DEFAULT 'PENDING', -- PENDING, VERIFIED, REJECTED
    verification_tier VARCHAR(50), -- NONPROFIT_501C3, COMMUNITY_GROUP, CORPORATE, SCHOOL, GOVERNMENT
    ein VARCHAR(20), -- Tax ID for US nonprofits
    verified_at TIMESTAMP,
    verified_by UUID REFERENCES users(id), -- Admin who verified

    -- Contact info
    contact_email VARCHAR(255),
    contact_phone VARCHAR(20),
    location GEOGRAPHY(POINT),
    location_name VARCHAR(255), -- "123 Main St, San Francisco, CA 94102"

    -- Settings
    auto_verify_hours BOOLEAN DEFAULT FALSE, -- Auto-verify after 48h
    require_background_check BOOLEAN DEFAULT FALSE,

    -- Metrics (denormalized)
    total_volunteers INT DEFAULT 0,
    total_hours_hosted FLOAT DEFAULT 0,
    follower_count INT DEFAULT 0,

    -- Metadata
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    deactivated_at TIMESTAMP
);

CREATE INDEX idx_orgs_slug ON organizations(slug);
CREATE INDEX idx_orgs_location ON organizations USING GIST(location);
CREATE INDEX idx_orgs_verification_status ON organizations(verification_status);

CREATE TABLE org_members (
    org_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(20) DEFAULT 'MEMBER', -- OWNER, ADMIN, COORDINATOR, MEMBER
    permissions JSONB, -- {"can_verify_hours": true, "can_post_opportunities": true}
    title VARCHAR(100), -- "Volunteer Coordinator"
    joined_at TIMESTAMP DEFAULT NOW(),
    invited_by UUID REFERENCES users(id),
    PRIMARY KEY (org_id, user_id)
);

-- ==========================================
-- TAXONOMY & CLASSIFICATIONS
-- ==========================================

CREATE TABLE causes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) UNIQUE NOT NULL, -- "Environment", "Education", "Health"
    slug VARCHAR(100) UNIQUE, -- "environment", "education"
    description TEXT,
    icon VARCHAR(50), -- Icon identifier for UI
    color VARCHAR(7), -- Hex color: "#4CAF50"
    parent_id UUID REFERENCES causes(id), -- For hierarchy (e.g., "Animal Welfare" → "Wildlife Conservation")
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE
);

-- Seed data examples:
-- Environment, Education, Health, Poverty/Hunger, Animal Welfare,
-- Arts & Culture, Community Development, Disaster Relief, Human Rights, etc.

CREATE TABLE skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) UNIQUE NOT NULL, -- "Graphic Design", "Spanish", "Carpentry"
    slug VARCHAR(100) UNIQUE,
    description TEXT,
    category VARCHAR(50), -- TECHNICAL, LANGUAGE, TRADE, SOFT_SKILL, PHYSICAL
    is_active BOOLEAN DEFAULT TRUE
);

-- ==========================================
-- USER PREFERENCES & ASSOCIATIONS
-- ==========================================

CREATE TABLE user_causes (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    cause_id UUID REFERENCES causes(id) ON DELETE CASCADE,
    priority INT DEFAULT 0, -- For ranking interests
    PRIMARY KEY (user_id, cause_id)
);

CREATE TABLE user_skills (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    skill_id UUID REFERENCES skills(id) ON DELETE CASCADE,
    proficiency VARCHAR(20), -- BEGINNER, INTERMEDIATE, ADVANCED, EXPERT
    years_experience INT,
    verified_count INT DEFAULT 0, -- How many orgs verified this skill
    PRIMARY KEY (user_id, skill_id)
);

-- Social graph
CREATE TABLE user_follows (
    follower_id UUID REFERENCES users(id) ON DELETE CASCADE,
    followee_id UUID, -- Can be user or org
    followee_type VARCHAR(20), -- USER, ORG
    followed_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (follower_id, followee_id, followee_type)
);

CREATE TABLE user_connections (
    user_id_1 UUID REFERENCES users(id) ON DELETE CASCADE,
    user_id_2 UUID REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'PENDING', -- PENDING, ACCEPTED, BLOCKED
    requested_by UUID REFERENCES users(id),
    requested_at TIMESTAMP DEFAULT NOW(),
    accepted_at TIMESTAMP,
    PRIMARY KEY (user_id_1, user_id_2),
    CHECK (user_id_1 < user_id_2) -- Ensure no duplicates
);

-- ==========================================
-- MARKETPLACE: OPPORTUNITIES
-- ==========================================

CREATE TABLE opportunities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID REFERENCES organizations(id) ON DELETE CASCADE,

    -- Basic info
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    cause_id UUID REFERENCES causes(id),

    -- Location
    location GEOGRAPHY(POINT),
    location_name VARCHAR(255), -- Human-readable address
    is_virtual BOOLEAN DEFAULT FALSE,
    virtual_meeting_url VARCHAR(500), -- Zoom link, etc.

    -- Timing
    starts_at TIMESTAMP NOT NULL,
    ends_at TIMESTAMP NOT NULL,
    registration_deadline TIMESTAMP, -- Cut-off for sign-ups
    timezone VARCHAR(50), -- IANA timezone
    is_recurring BOOLEAN DEFAULT FALSE,
    recurrence_rule TEXT, -- iCal RRULE format for recurring events

    -- Capacity
    capacity INT, -- Max volunteers (NULL = unlimited)
    min_volunteers INT, -- Minimum needed for event to happen
    current_registrations INT DEFAULT 0, -- Denormalized count

    -- Requirements
    min_age INT,
    requires_background_check BOOLEAN DEFAULT FALSE,
    physical_requirements TEXT, -- "Able to lift 30lbs", "Walking for 2+ hours"
    what_to_bring TEXT, -- "Gloves, water bottle, sunscreen"

    -- Status
    status VARCHAR(20) DEFAULT 'DRAFT', -- DRAFT, OPEN, FULL, CANCELLED, COMPLETED
    visibility VARCHAR(20) DEFAULT 'PUBLIC', -- PUBLIC, PRIVATE, FOLLOWERS_ONLY

    -- Impact tracking
    expected_impact_description TEXT, -- "We'll plant 100 trees"
    actual_impact_description TEXT, -- Filled in after event

    -- Metadata
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    published_at TIMESTAMP,
    cancelled_at TIMESTAMP,
    cancellation_reason TEXT
);

CREATE INDEX idx_opps_org ON opportunities(org_id);
CREATE INDEX idx_opps_cause ON opportunities(cause_id);
CREATE INDEX idx_opps_location ON opportunities USING GIST(location);
CREATE INDEX idx_opps_starts_at ON opportunities(starts_at);
CREATE INDEX idx_opps_status ON opportunities(status);

-- Many-to-many: opportunities and skills
CREATE TABLE opportunity_skills (
    opportunity_id UUID REFERENCES opportunities(id) ON DELETE CASCADE,
    skill_id UUID REFERENCES skills(id) ON DELETE CASCADE,
    is_required BOOLEAN DEFAULT FALSE, -- Required vs preferred
    PRIMARY KEY (opportunity_id, skill_id)
);

-- Shifts/time slots for same opportunity
CREATE TABLE opportunity_shifts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    opportunity_id UUID REFERENCES opportunities(id) ON DELETE CASCADE,
    name VARCHAR(100), -- "Morning Shift", "Afternoon Shift"
    starts_at TIMESTAMP NOT NULL,
    ends_at TIMESTAMP NOT NULL,
    capacity INT,
    current_registrations INT DEFAULT 0
);

-- ==========================================
-- MARKETPLACE: REGISTRATIONS
-- ==========================================

CREATE TABLE registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    opportunity_id UUID REFERENCES opportunities(id) ON DELETE CASCADE,
    shift_id UUID REFERENCES opportunity_shifts(id) ON DELETE SET NULL,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    squad_id UUID REFERENCES squads(id) ON DELETE SET NULL,

    -- Status
    status VARCHAR(20) DEFAULT 'CONFIRMED', -- CONFIRMED, WAITLIST, CANCELLED, NO_SHOW, ATTENDED

    -- Check-in tracking
    checked_in_at TIMESTAMP,
    checked_out_at TIMESTAMP,
    check_in_method VARCHAR(20), -- QR, GPS, MANUAL

    -- Hours calculation
    actual_hours FLOAT, -- Calculated from check-in/out or manually entered

    -- Metadata
    registered_at TIMESTAMP DEFAULT NOW(),
    cancelled_at TIMESTAMP,
    cancellation_reason TEXT,
    notes TEXT -- Org notes about this volunteer's participation
);

CREATE INDEX idx_reg_opportunity ON registrations(opportunity_id);
CREATE INDEX idx_reg_user ON registrations(user_id);
CREATE INDEX idx_reg_status ON registrations(status);

-- ==========================================
-- SQUADS (GROUP VOLUNTEERING)
-- ==========================================

CREATE TABLE squads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    leader_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    type VARCHAR(20), -- CORPORATE, SCHOOL, SOCIAL, FRIENDS, FAMILY
    organization_name VARCHAR(255), -- "Acme Corp" for corporate squads

    -- Settings
    is_private BOOLEAN DEFAULT FALSE,
    expected_size INT,

    -- Metadata
    created_at TIMESTAMP DEFAULT NOW(),
    member_count INT DEFAULT 1 -- Denormalized
);

CREATE TABLE squad_members (
    squad_id UUID REFERENCES squads(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    is_guest BOOLEAN DEFAULT FALSE,
    magic_token VARCHAR(500), -- For guest invitations
    token_expires_at TIMESTAMP,
    role VARCHAR(20) DEFAULT 'MEMBER', -- LEADER, CO_LEADER, MEMBER
    joined_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (squad_id, user_id)
);

-- Squad bookings (bulk registrations)
CREATE TABLE squad_bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    squad_id UUID REFERENCES squads(id) ON DELETE CASCADE,
    opportunity_id UUID REFERENCES opportunities(id) ON DELETE CASCADE,
    spots_reserved INT NOT NULL,
    magic_link VARCHAR(500), -- Shareable link for squad members
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW()
);

-- ==========================================
-- IMPACT LEDGER (Core Product)
-- ==========================================

CREATE TABLE impact_ledger (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    org_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
    opportunity_id UUID REFERENCES opportunities(id) ON DELETE SET NULL, -- NULL for historical entries
    registration_id UUID REFERENCES registrations(id) ON DELETE SET NULL,
    squad_id UUID REFERENCES squads(id) ON DELETE SET NULL,

    -- Impact data
    hours FLOAT NOT NULL CHECK (hours > 0),
    date DATE NOT NULL,
    role_title VARCHAR(255), -- "Event Coordinator", "Tree Planter"
    description TEXT, -- User's description of what they did
    impact_description TEXT, -- Quantified impact: "Planted 50 trees", "Served 100 meals"

    -- Verification
    status VARCHAR(20) DEFAULT 'PENDING', -- PENDING, VERIFIED, DISPUTED, REJECTED
    tier VARCHAR(20), -- SILVER (email), GOLD (QR/GPS), PLATINUM (squad+org)
    verification_method VARCHAR(20), -- EMAIL, QR, GPS, MANUAL

    verified_at TIMESTAMP,
    verified_by UUID REFERENCES users(id), -- Which org member verified
    verifier_email VARCHAR(255), -- For external verifiers (not on platform)
    verification_token VARCHAR(500), -- For email verification links
    verification_expires_at TIMESTAMP,

    dispute_reason TEXT,
    disputed_at TIMESTAMP,
    disputed_by UUID REFERENCES users(id),

    -- Metadata
    is_historical BOOLEAN DEFAULT FALSE, -- Manually added vs platform-tracked
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_ledger_user ON impact_ledger(user_id);
CREATE INDEX idx_ledger_org ON impact_ledger(org_id);
CREATE INDEX idx_ledger_date ON impact_ledger(date);
CREATE INDEX idx_ledger_status ON impact_ledger(status);

-- ==========================================
-- TRUST & SAFETY
-- ==========================================

CREATE TABLE endorsements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    from_org_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    to_user_id UUID REFERENCES users(id) ON DELETE CASCADE,

    skill_id UUID REFERENCES skills(id) ON DELETE SET NULL, -- Technical skill
    soft_skill VARCHAR(50), -- RELIABILITY, TEAMWORK, LEADERSHIP, COMMUNICATION, INITIATIVE

    comment TEXT, -- Optional recommendation text
    impact_ledger_id UUID REFERENCES impact_ledger(id) ON DELETE SET NULL, -- Which event prompted this

    is_public BOOLEAN DEFAULT TRUE, -- Show on volunteer's profile

    created_at TIMESTAMP DEFAULT NOW(),

    UNIQUE(from_org_id, to_user_id, skill_id, soft_skill) -- One endorsement per skill per org
);

CREATE INDEX idx_endorsements_user ON endorsements(to_user_id);

CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    opportunity_id UUID REFERENCES opportunities(id) ON DELETE CASCADE,
    reviewer_id UUID REFERENCES users(id) ON DELETE CASCADE,
    reviewee_id UUID, -- User ID or Org ID
    reviewee_type VARCHAR(20), -- USER, ORG

    -- Rating
    overall_rating INT CHECK (overall_rating >= 1 AND overall_rating <= 5),

    -- Category ratings (for orgs)
    safety_rating INT CHECK (safety_rating >= 1 AND safety_rating <= 5),
    organization_rating INT CHECK (organization_rating >= 1 AND organization_rating <= 5),
    impact_rating INT CHECK (impact_rating >= 1 AND impact_rating <= 5),

    -- Category ratings (for volunteers, from orgs)
    reliability_rating INT CHECK (reliability_rating >= 1 AND reliability_rating <= 5),
    skill_rating INT CHECK (skill_rating >= 1 AND skill_rating <= 5),
    communication_rating INT CHECK (communication_rating >= 1 AND communication_rating <= 5),

    comment TEXT,
    is_public BOOLEAN DEFAULT TRUE,

    -- Moderation
    is_flagged BOOLEAN DEFAULT FALSE,
    flagged_reason TEXT,

    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),

    UNIQUE(opportunity_id, reviewer_id, reviewee_id, reviewee_type) -- One review per person per event
);

CREATE INDEX idx_reviews_reviewee ON reviews(reviewee_id, reviewee_type);

-- Incident reports
CREATE TABLE incident_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reported_by UUID REFERENCES users(id) ON DELETE SET NULL,
    reported_against_id UUID, -- User or Org
    reported_against_type VARCHAR(20), -- USER, ORG
    opportunity_id UUID REFERENCES opportunities(id) ON DELETE SET NULL,

    category VARCHAR(50), -- SAFETY, HARASSMENT, FRAUD, NO_SHOW, OTHER
    description TEXT NOT NULL,
    severity VARCHAR(20), -- LOW, MEDIUM, HIGH, CRITICAL

    status VARCHAR(20) DEFAULT 'PENDING', -- PENDING, INVESTIGATING, RESOLVED, DISMISSED
    resolution_notes TEXT,
    resolved_by UUID REFERENCES users(id),
    resolved_at TIMESTAMP,

    created_at TIMESTAMP DEFAULT NOW()
);

-- Disputes (for verification conflicts)
CREATE TABLE disputes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    impact_ledger_id UUID REFERENCES impact_ledger(id) ON DELETE CASCADE,
    disputed_by UUID REFERENCES users(id) ON DELETE SET NULL, -- Who initiated dispute (org or volunteer)

    reason TEXT NOT NULL,
    claimed_hours FLOAT, -- If volunteer disputes, what they claim the hours should be

    is_late BOOLEAN DEFAULT FALSE, -- Disputed after 48-hour window
    requires_admin_review BOOLEAN DEFAULT FALSE,

    status VARCHAR(20) DEFAULT 'PENDING', -- PENDING, RESOLVED, DISMISSED
    resolution_notes TEXT,
    resolved_by UUID REFERENCES users(id),
    resolved_at TIMESTAMP,

    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_disputes_ledger ON disputes(impact_ledger_id);
CREATE INDEX idx_disputes_status ON disputes(status);

-- Magic tokens (for guest invites and claim flows)
CREATE TABLE magic_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    token VARCHAR(500) UNIQUE NOT NULL,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,

    type VARCHAR(50), -- SQUAD_INVITE, CLAIM_IMPACT

    expires_at TIMESTAMP NOT NULL,
    used BOOLEAN DEFAULT FALSE,
    used_at TIMESTAMP,

    metadata JSONB, -- Additional context (squad_id, opportunity_id, etc.)

    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_magic_tokens_token ON magic_tokens(token);
CREATE INDEX idx_magic_tokens_user ON magic_tokens(user_id);

-- ==========================================
-- COMMUNICATION
-- ==========================================

CREATE TABLE conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type VARCHAR(20), -- DM (direct message), EVENT_CHAT, SQUAD_CHAT, ORG_VOLUNTEER
    subject VARCHAR(255),
    reference_id UUID, -- Opportunity ID, Squad ID, or NULL for DM
    reference_type VARCHAR(20), -- OPPORTUNITY, SQUAD, NULL

    -- Settings
    is_archived BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    last_message_at TIMESTAMP
);

CREATE TABLE conversation_participants (
    conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
    participant_id UUID, -- User or Org ID
    participant_type VARCHAR(20), -- USER, ORG

    -- Participant status
    joined_at TIMESTAMP DEFAULT NOW(),
    left_at TIMESTAMP,
    last_read_at TIMESTAMP,

    -- Settings
    is_muted BOOLEAN DEFAULT FALSE,

    PRIMARY KEY (conversation_id, participant_id, participant_type)
);

CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
    sender_id UUID, -- User or Org ID
    sender_type VARCHAR(20), -- USER, ORG

    body TEXT NOT NULL,
    attachments JSONB, -- [{"url": "...", "type": "image", "name": "..."}]

    -- Status
    sent_at TIMESTAMP DEFAULT NOW(),
    edited_at TIMESTAMP,
    deleted_at TIMESTAMP, -- Soft delete

    -- Read receipts
    read_by JSONB -- {"user_id": "timestamp"}
);

CREATE INDEX idx_messages_conversation ON messages(conversation_id, sent_at DESC);

CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    recipient_id UUID REFERENCES users(id) ON DELETE CASCADE,

    -- Notification content
    type VARCHAR(50), -- EMAIL, SMS, PUSH, IN_APP
    category VARCHAR(50), -- REMINDER, UPDATE, VERIFICATION, ANNOUNCEMENT, MESSAGE, SOCIAL
    title VARCHAR(255) NOT NULL,
    body TEXT,
    action_url VARCHAR(500), -- Deep link: "impactidol.com/opportunities/123"
    action_text VARCHAR(100), -- CTA button text: "View Event"

    -- Delivery
    status VARCHAR(20) DEFAULT 'PENDING', -- PENDING, SENT, DELIVERED, FAILED, READ
    scheduled_for TIMESTAMP, -- For future delivery
    sent_at TIMESTAMP,
    delivered_at TIMESTAMP,
    read_at TIMESTAMP,
    failed_reason TEXT,

    -- Context
    metadata JSONB, -- {opportunity_id: "...", org_id: "..."}

    -- Grouping (for batching)
    batch_id UUID, -- Group related notifications

    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_notifications_recipient ON notifications(recipient_id, created_at DESC);
CREATE INDEX idx_notifications_status ON notifications(status, scheduled_for);

CREATE TABLE notification_preferences (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    channel VARCHAR(20), -- EMAIL, SMS, PUSH
    category VARCHAR(50), -- REMINDER, UPDATE, VERIFICATION, etc.
    enabled BOOLEAN DEFAULT TRUE,
    frequency VARCHAR(20) DEFAULT 'IMMEDIATE', -- IMMEDIATE, DAILY_DIGEST, WEEKLY_DIGEST
    PRIMARY KEY (user_id, channel, category)
);

-- ==========================================
-- GAMIFICATION
-- ==========================================

CREATE TABLE badges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon_url VARCHAR(500),
    tier VARCHAR(20), -- BRONZE, SILVER, GOLD, PLATINUM

    -- Criteria (examples)
    criteria JSONB, -- {"hours": 100} or {"cause": "environment", "hours": 50}

    rarity VARCHAR(20), -- COMMON, UNCOMMON, RARE, LEGENDARY
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT NOW()
);

-- Seed badge examples:
-- "First Timer" (1 hour), "Dedicated" (10 hours), "Champion" (100 hours)
-- "Tree Hugger" (50 hours in Environment), "Tutor" (25 hours in Education)
-- "Streak Master" (volunteered 12 consecutive months)

CREATE TABLE user_badges (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    badge_id UUID REFERENCES badges(id) ON DELETE CASCADE,
    earned_at TIMESTAMP DEFAULT NOW(),
    is_featured BOOLEAN DEFAULT FALSE, -- Display prominently on profile
    PRIMARY KEY (user_id, badge_id)
);

-- Achievements (broader than badges)
CREATE TABLE achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50), -- HOURS_MILESTONE, CAUSE_CHAMPION, STREAK, ORG_PARTNER, etc.
    title VARCHAR(255),
    description TEXT,
    value JSONB, -- {"hours": 100, "cause": "environment"}
    achieved_at TIMESTAMP DEFAULT NOW()
);

-- ==========================================
-- ANALYTICS & EXPORTS
-- ==========================================

CREATE TABLE export_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    exported_by UUID REFERENCES users(id),

    type VARCHAR(50), -- GRANT_REPORT, VOLUNTEER_LIST, HOURS_SUMMARY
    format VARCHAR(20), -- PDF, CSV, JSON

    -- Filters used
    date_range_start DATE,
    date_range_end DATE,
    filters JSONB, -- {cause: "environment", min_hours: 10}

    -- Output
    file_url VARCHAR(500), -- S3 link to generated file
    row_count INT, -- Number of records included

    created_at TIMESTAMP DEFAULT NOW(),
    expires_at TIMESTAMP -- Download link expiration
);

-- Platform analytics (aggregated, anonymized)
CREATE TABLE platform_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date DATE NOT NULL,
    metric_type VARCHAR(50), -- DAILY_ACTIVE_USERS, HOURS_VERIFIED, OPPORTUNITIES_POSTED
    value FLOAT NOT NULL,
    metadata JSONB, -- Breakdown by cause, location, etc.

    UNIQUE(date, metric_type)
);

-- ==========================================
-- ADMIN & MODERATION
-- ==========================================

CREATE TABLE admin_users (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE PRIMARY KEY,
    role VARCHAR(20), -- SUPER_ADMIN, MODERATOR, SUPPORT
    permissions JSONB,
    added_at TIMESTAMP DEFAULT NOW(),
    added_by UUID REFERENCES users(id)
);

CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(100), -- "verified_organization", "deleted_user", "updated_hours"
    entity_type VARCHAR(50), -- "organization", "user", "impact_ledger"
    entity_id UUID,
    old_value JSONB,
    new_value JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_audit_user ON audit_logs(user_id);
CREATE INDEX idx_audit_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_created ON audit_logs(created_at DESC);
```

### 5.3 Data Relationships Diagram

```
users ──┬─── impact_ledger (one-to-many)
        ├─── registrations (one-to-many)
        ├─── user_causes (many-to-many via junction)
        ├─── user_skills (many-to-many via junction)
        ├─── endorsements (one-to-many as recipient)
        ├─── reviews (one-to-many as reviewer)
        ├─── squads (one-to-many as leader)
        ├─── squad_members (many-to-many via junction)
        └─── notifications (one-to-many)

organizations ──┬─── opportunities (one-to-many)
                ├─── org_members (many-to-many via junction)
                ├─── impact_ledger (one-to-many)
                ├─── endorsements (one-to-many as endorser)
                └─── reviews (one-to-many as reviewee)

opportunities ──┬─── registrations (one-to-many)
                ├─── opportunity_skills (many-to-many via junction)
                ├─── opportunity_shifts (one-to-many)
                └─── reviews (one-to-many)

squads ──┬─── squad_members (many-to-many via junction)
         ├─── registrations (one-to-many)
         └─── impact_ledger (one-to-many)

impact_ledger ──── endorsements (one-to-many, optional reference)
```

---

## 6. Communication Architecture

### 6.1 Communication Types & Channels

#### Transactional (System-Generated)
**Purpose:** Automated notifications for user actions

| Use Case | Email | SMS | Push | In-App | Priority |
|----------|-------|-----|------|--------|----------|
| Registration confirmation | ✅ Primary | ❌ | ✅ | ✅ | High |
| Event reminder (24h before) | ✅ | ✅ Optional | ✅ | ✅ | High |
| Event reminder (1h before) | ❌ | ✅ | ✅ | ✅ | Critical |
| Check-in confirmation | ❌ | ❌ | ✅ | ✅ | Medium |
| Verification request | ✅ Primary | ❌ | ❌ | ✅ | High |
| Hours verified | ✅ | ❌ | ✅ | ✅ | Medium |
| Magic link (squad invite) | ✅ Primary | ✅ Fallback | ❌ | ❌ | Critical |
| Badge earned | ❌ | ❌ | ✅ | ✅ | Low |
| Milestone reached | ✅ | ❌ | ✅ | ✅ | Medium |

#### Broadcast (Org → Volunteers)
**Purpose:** Organization mass communication

- Event updates/changes
- Event cancellations (critical priority)
- Announcements to followers
- Last-minute volunteer callouts
- Impact reports ("We planted 500 trees thanks to you!")

**Channels:** Email (primary), Push (if opted in), In-App

#### Direct Messaging (1-on-1)
**Purpose:** Private conversation between volunteer and organization

- Questions about opportunity
- Special accommodations requests
- Follow-up after event
- Relationship building

**Channels:** In-App (primary), Email digest (secondary)

#### Group Communication
**Purpose:** Event-specific or squad-specific coordination

- Event participant chat
- Squad coordination
- Team updates
- Carpool organization

**Channels:** In-App (primary), Email digest option

### 6.2 Notification Delivery Strategy

#### Priority Levels
1. **Critical** (immediate delivery, multiple channels)
   - Event cancellations
   - Safety alerts
   - Magic links for time-sensitive registrations

2. **High** (deliver within 5 minutes)
   - Registration confirmations
   - Verification requests
   - Event reminders

3. **Medium** (deliver within 1 hour)
   - Hours verified
   - New opportunities matching interests
   - Direct messages

4. **Low** (can be batched in daily digest)
   - Badge achievements
   - Social updates (new follower)
   - General announcements

#### Delivery Queue Architecture
```
Notification Created
  ↓
Check User Preferences (channel + frequency)
  ↓
Assign Priority & Schedule
  ↓
Queue in delivery system (BullMQ)
  ↓
Send via channel (SendGrid, Twilio, FCM)
  ↓
Track delivery status
  ↓
Retry on failure (with exponential backoff)
```

### 6.3 Technical Implementation

#### Tech Stack Recommendations

**Email Service:**
- **Primary recommendation:** [Resend](https://resend.com)
  - Modern developer experience
  - Great deliverability
  - React Email templates support
- **Alternative:** SendGrid (more enterprise features)

**SMS Service:**
- **Twilio** (industry standard)
- Use sparingly (critical notifications only, opt-in)

**Push Notifications:**
- **Firebase Cloud Messaging (FCM)** for cross-platform (iOS + Android + Web)
- Supports both web push and mobile

**Real-Time Infrastructure:**
- **MVP:** Long polling or Server-Sent Events (SSE)
- **Future:** WebSockets (Socket.io or native)
- **Alternative:** Third-party (Pusher, Ably) for faster implementation

**Queue System:**
- **BullMQ** (Redis-based, robust, good for background jobs)
- Handles scheduling, retries, rate limiting

#### Code Example: Notification Service

```typescript
// services/notification.service.ts
import { Resend } from 'resend';
import { Queue } from 'bullmq';

interface NotificationPayload {
  recipientId: string;
  type: 'EMAIL' | 'SMS' | 'PUSH' | 'IN_APP';
  category: string;
  title: string;
  body: string;
  actionUrl?: string;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  metadata?: Record<string, any>;
}

class NotificationService {
  private emailClient = new Resend(process.env.RESEND_API_KEY);
  private notificationQueue = new Queue('notifications');

  async send(payload: NotificationPayload) {
    // 1. Check user preferences
    const preferences = await this.getUserPreferences(payload.recipientId);

    if (!this.shouldSend(payload, preferences)) {
      return { skipped: true, reason: 'user_preference' };
    }

    // 2. Create notification record
    const notification = await db.notifications.create({
      data: {
        recipient_id: payload.recipientId,
        type: payload.type,
        category: payload.category,
        title: payload.title,
        body: payload.body,
        action_url: payload.actionUrl,
        status: 'PENDING',
        metadata: payload.metadata
      }
    });

    // 3. Queue for delivery
    await this.notificationQueue.add(
      'deliver',
      { notificationId: notification.id },
      {
        priority: this.getPriorityValue(payload.priority),
        attempts: 3,
        backoff: { type: 'exponential', delay: 2000 }
      }
    );

    return { notificationId: notification.id };
  }

  // Worker process to deliver notifications
  async deliverEmail(notificationId: string) {
    const notification = await db.notifications.findUnique({
      where: { id: notificationId },
      include: { recipient: true }
    });

    try {
      await this.emailClient.emails.send({
        from: 'Impact Idol <noreply@impactidol.com>',
        to: notification.recipient.email,
        subject: notification.title,
        html: this.renderTemplate(notification),
        headers: {
          'X-Entity-Ref-ID': notificationId
        }
      });

      await db.notifications.update({
        where: { id: notificationId },
        data: { status: 'SENT', sent_at: new Date() }
      });
    } catch (error) {
      await db.notifications.update({
        where: { id: notificationId },
        data: { status: 'FAILED', failed_reason: error.message }
      });
      throw error; // Will trigger retry
    }
  }
}
```

#### Email Templates (React Email)

```tsx
// emails/event-reminder.tsx
import { Html, Button, Text } from '@react-email/components';

interface EventReminderProps {
  volunteerName: string;
  eventTitle: string;
  startTime: string;
  location: string;
  organizationName: string;
}

export default function EventReminder({
  volunteerName,
  eventTitle,
  startTime,
  location,
  organizationName
}: EventReminderProps) {
  return (
    <Html>
      <Text>Hi {volunteerName},</Text>
      <Text>
        This is a reminder that you're signed up to volunteer tomorrow!
      </Text>

      <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px' }}>
        <Text style={{ fontWeight: 'bold' }}>{eventTitle}</Text>
        <Text>📅 {startTime}</Text>
        <Text>📍 {location}</Text>
        <Text>🏢 {organizationName}</Text>
      </div>

      <Button href={`https://impactidol.com/events/${eventId}`}>
        View Event Details
      </Button>

      <Text style={{ color: '#666', fontSize: '12px' }}>
        Need to cancel? Please let {organizationName} know ASAP.
      </Text>
    </Html>
  );
}
```

### 6.4 Notification Preferences UX

**Default Settings (Opt-Out Model):**
- Email: All enabled except low-priority
- SMS: Only critical (opt-in required)
- Push: All enabled
- In-App: All enabled

**User Controls:**
```
Notification Settings
├── Event Reminders
│   ├── Email: ✅ On
│   ├── Push: ✅ On
│   └── SMS: ☐ Off (upgrade to enable)
├── Verification Requests
│   ├── Email: ✅ On
│   └── In-App: ✅ On
├── Direct Messages
│   ├── Email: 🔽 Digest (Daily/Immediate/Off)
│   ├── Push: ✅ On
│   └── In-App: ✅ On
├── Organization Announcements
│   ├── Email: ✅ On
│   └── Push: ☐ Off
└── Social Updates
    ├── Email: 🔽 Weekly Digest
    └── Push: ☐ Off
```

---

## 7. Technical Architecture

### 7.1 Stack Recommendation

#### Backend
```
Language: TypeScript (Node.js)
Why: Full-stack TypeScript, huge ecosystem, great for rapid iteration

Framework: Next.js 15+ (App Router)
Why: Full-stack framework, API routes, SSR/SSG, Vercel deployment, React Server Components

API Layer: tRPC
Why: End-to-end type safety, no code generation, great DX
Alternative: REST with OpenAPI (for public API)

Database: PostgreSQL 16+ with PostGIS extension
Why: Relational data, JSONB for flexibility, PostGIS for geospatial queries

ORM: Drizzle ORM
Why: Lightweight, TypeScript-first, SQL-like syntax, great migrations
Alternative: Prisma (more features, slower performance)

Authentication: BetterAuth
Why: Modern, flexible, built-in magic links, social providers, TypeScript-native

File Storage: AWS S3 or Cloudflare R2
Why: Industry standard, cheap, CDN integration

Queue/Background Jobs: BullMQ
Why: Redis-based, robust retry logic, scheduling, job prioritization

Real-Time: Server-Sent Events (MVP) → Socket.io (v2)
Why: SSE simpler to start, Socket.io for full real-time later

Email: Resend
Why: Modern, great DX, React Email support

SMS: Twilio
Why: Industry standard, reliable

Push Notifications: Firebase Cloud Messaging
Why: Cross-platform (web + mobile)

Search: PostgreSQL full-text search (MVP) → Typesense/Meilisearch (v2)
Why: Native Postgres search fine for MVP, dedicated later for advanced features
```

#### Frontend
```
Framework: Next.js 15+ with React 19
Why: Same framework as backend, App Router, Server Components

State Management: TanStack Query (React Query)
Why: Server state management, caching, optimistic updates

UI Library: shadcn/ui
Why: Accessible, customizable, Tailwind-based, copy-paste components

Styling: Tailwind CSS
Why: Utility-first, fast development, great defaults

Forms: React Hook Form + Zod
Why: Performance, type-safe validation

Maps: Mapbox GL JS
Why: Beautiful maps, good free tier, GeoJSON support

Charts: Recharts
Why: Composable, React-native, good for dashboards

Date/Time: date-fns
Why: Lightweight, tree-shakeable, modern
```

#### Mobile (Phase 2)
```
Framework: React Native with Expo
Why: Share business logic with web, Expo for rapid development

Alternative: Progressive Web App (PWA)
Why: Simpler, no app store approval, works offline
```

#### DevOps & Infrastructure
```
Hosting (Frontend): Vercel
Why: Built for Next.js, edge functions, automatic deploys

Hosting (Backend API): Railway or Render
Why: Easy PostgreSQL hosting, auto-scaling, fair pricing
Alternative: AWS (if need more control)

Database: Neon (Serverless Postgres) or Supabase
Why: PostGIS support, auto-scaling, good free tier

Redis: Upstash (Serverless Redis)
Why: For BullMQ, edge-compatible, pay-per-request

Monitoring: Sentry (errors) + PostHog (analytics)
Why: Sentry for debugging, PostHog for product analytics

CI/CD: GitHub Actions
Why: Free for public repos, tight GitHub integration

CDN: Cloudflare
Why: Fast, cheap, DDoS protection
```

### 7.2 Authentication Architecture (BetterAuth)

**Why BetterAuth?**
1. ✅ Built-in magic link support (critical for guest flow)
2. ✅ Multiple OAuth providers (Google, GitHub, etc.)
3. ✅ Session management
4. ✅ TypeScript-native
5. ✅ Flexible user model (can extend for guest users)

**Implementation Plan:**

```typescript
// auth.config.ts
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg"
  }),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false // We verify via impact, not email
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      redirectURI: `${process.env.APP_URL}/api/auth/callback/google`
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!
    }
  },

  session: {
    expiresIn: 60 * 60 * 24 * 30, // 30 days
    updateAge: 60 * 60 * 24 // Update session every 24 hours
  },

  // Custom plugin for magic links + guest users
  plugins: [
    {
      id: "impact-idol-guest-flow",
      hooks: {
        after: {
          signUp: async ({ user }) => {
            // Create impact_idol user record
            await db.users.create({
              data: {
                id: user.id,
                email: user.email,
                name: user.name,
                avatar_url: user.image,
                is_guest: false,
                auth_provider: 'google' // or whatever provider
              }
            });
          }
        }
      }
    }
  ]
});
```

**Guest → Full User Flow (The Viral Growth Engine):**

**Why This Matters:**
- 🚀 **Exponential growth:** 1 squad leader → 5-10 new users per event
- ✅ **Zero friction:** Guests participate without signing up
- 💎 **High-value conversion:** Users convert AFTER experiencing value (hours logged)
- 📈 **Viral coefficient:** >5x (each user brings 5+ more)

**The Math:**
```
Without guest flow: 1 user → 0.2 referrals (dying)
With guest flow:    1 squad leader → 5 new users (explosive!)
```

#### When to Create Guest Accounts

```typescript
// DECISION: Create guest BEFORE event (when magic link clicked)
// ✅ Pro: Can track "registered" vs "attended", send reminders
// ✅ Pro: Guest can see their "you're registered" confirmation
// ❌ Con: Creates ghost accounts for no-shows (acceptable - can clean up)

// Alternative: Create AFTER event (when checked in)
// ❌ Con: Can't send pre-event reminders to guests
// ❌ Con: No registration confirmation experience
```

#### Complete Guest Flow Implementation

```typescript
// Step 1: Squad Leader Books Spots
export async function createSquadBooking(
  squadId: string,
  opportunityId: string,
  spotCount: number,
  invitees: { email: string; name?: string }[]
) {
  // Validate squad leader
  const squad = await db.squads.findUnique({
    where: { id: squadId },
    include: { leader: true }
  });

  if (!squad) throw new Error('Squad not found');

  // Create booking record
  const booking = await db.squadBookings.create({
    data: {
      squad_id: squadId,
      opportunity_id: opportunityId,
      spots_reserved: spotCount,
      created_by: squad.leader_id
    }
  });

  // Generate invites
  const invites = [];

  for (const invitee of invitees) {
    // Check if user already exists
    let user = await db.users.findUnique({
      where: { email: invitee.email }
    });

    if (!user) {
      // Create guest user
      user = await db.users.create({
        data: {
          email: invitee.email,
          name: invitee.name,
          is_guest: true,
          auth_provider: null
        }
      });
    }

    // Generate secure magic token
    const magicToken = nanoid(32);

    // Add to squad (or update existing membership)
    await db.squadMembers.upsert({
      where: {
        squad_id_user_id: { squad_id: squadId, user_id: user.id }
      },
      create: {
        squad_id: squadId,
        user_id: user.id,
        is_guest: !user.auth_provider, // Only guest if no auth
        magic_token: magicToken,
        token_expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
      },
      update: {
        magic_token: magicToken,
        token_expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      }
    });

    // Create registration
    await db.registrations.create({
      data: {
        opportunity_id: opportunityId,
        user_id: user.id,
        squad_id: squadId,
        status: 'CONFIRMED'
      }
    });

    // Generate magic link
    const magicLink = `${process.env.APP_URL}/join/${magicToken}`;

    invites.push({
      email: invitee.email,
      magicLink,
      isNewUser: !user.auth_provider
    });

    // Send invitation email
    await notificationService.send({
      recipientId: user.id,
      type: 'EMAIL',
      category: 'SQUAD_INVITE',
      title: `${squad.leader.name} invited you to volunteer!`,
      body: `You're registered for [Event Name]. Click to confirm.`,
      actionUrl: magicLink,
      priority: 'HIGH'
    });
  }

  return { booking, invites };
}

// Step 2: Guest Clicks Magic Link
export async function handleMagicLinkClick(magicToken: string) {
  // Verify token
  const squadMember = await db.squadMembers.findFirst({
    where: {
      magic_token: magicToken,
      token_expires_at: { gt: new Date() }
    },
    include: {
      user: true,
      squad: { include: { leader: true } },
      // Get their registration details
      user: {
        include: {
          registrations: {
            where: { squad_id: squadMember.squad_id },
            include: { opportunity: { include: { organization: true } } }
          }
        }
      }
    }
  });

  if (!squadMember) {
    throw new Error('Invalid or expired magic link');
  }

  // If already a full user, just redirect to dashboard
  if (!squadMember.user.is_guest) {
    return {
      redirect: '/dashboard',
      message: 'Welcome back!'
    };
  }

  // Guest user - show registration confirmation page
  return {
    redirect: '/guest-welcome',
    data: {
      email: squadMember.user.email,
      squadName: squadMember.squad.name,
      leaderName: squadMember.squad.leader.name,
      registration: squadMember.user.registrations[0], // The opportunity they're registered for
      isGuest: true
    }
  };
}

// Step 3: After Event - Send "Claim Your Impact" Email
export async function scheduleClaimImpactEmails(opportunityId: string) {
  const opportunity = await db.opportunities.findUnique({
    where: { id: opportunityId }
  });

  // Send 24 hours after event ends (memories fresh, hours likely verified)
  const sendAt = new Date(opportunity.ends_at.getTime() + 24 * 60 * 60 * 1000);

  // Find all guest attendees
  const guestAttendees = await db.registrations.findMany({
    where: {
      opportunity_id: opportunityId,
      status: 'ATTENDED', // Only those who actually showed up
      user: { is_guest: true }
    },
    include: {
      user: true,
      impactLedger: true // Their verified hours
    }
  });

  for (const reg of guestAttendees) {
    const totalHours = reg.impactLedger.reduce((sum, entry) => sum + entry.hours, 0);

    // Generate claim token (different from squad magic link)
    const claimToken = nanoid(32);

    await db.magicTokens.create({
      data: {
        token: claimToken,
        user_id: reg.user.id,
        type: 'CLAIM_IMPACT',
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        used: false
      }
    });

    const claimUrl = `${process.env.APP_URL}/claim/${claimToken}`;

    await notificationQueue.add(
      'send-claim-email',
      {
        userId: reg.user.id,
        email: reg.user.email,
        hours: totalHours,
        eventName: opportunity.title,
        orgName: opportunity.organization.name,
        claimUrl
      },
      { delay: sendAt.getTime() - Date.now() }
    );
  }
}

// Step 4: Claim Impact - The Critical Merge
export async function claimImpact(claimToken: string) {
  // 1. Verify token
  const tokenRecord = await db.magicTokens.findUnique({
    where: { token: claimToken },
    include: { user: true }
  });

  if (!tokenRecord || tokenRecord.used) {
    throw new Error('Invalid or already used token');
  }

  if (new Date() > tokenRecord.expires_at) {
    throw new Error('Token expired');
  }

  if (!tokenRecord.user.is_guest) {
    throw new Error('User already has full account');
  }

  // 2. Mark token as used (prevent reuse)
  await db.magicTokens.update({
    where: { token: claimToken },
    data: { used: true, used_at: new Date() }
  });

  // 3. Return guest data to initiate OAuth signup
  return {
    guestUserId: tokenRecord.user.id,
    guestEmail: tokenRecord.user.email,
    // These will be shown in UI to entice sign-up
    previewData: {
      totalHours: tokenRecord.user.total_hours,
      eventCount: await db.registrations.count({
        where: { user_id: tokenRecord.user.id, status: 'ATTENDED' }
      })
    }
  };
}

// Step 5: The Merge (CRITICAL - Zero Data Loss)
export async function mergeGuestToFullUser(
  guestUserId: string,
  fullUserId: string
) {
  // Use database transaction for atomicity
  const result = await db.$transaction(async (tx) => {
    // 1. Verify guest user exists and is actually a guest
    const guestUser = await tx.users.findUnique({
      where: { id: guestUserId }
    });

    if (!guestUser?.is_guest) {
      throw new Error('Not a guest user');
    }

    // 2. Verify full user exists and is not a guest
    const fullUser = await tx.users.findUnique({
      where: { id: fullUserId }
    });

    if (!fullUser || fullUser.is_guest) {
      throw new Error('Invalid full user');
    }

    // 3. SECURITY: Check if emails match (prevent account takeover)
    if (guestUser.email !== fullUser.email) {
      throw new Error('Email mismatch - possible account takeover attempt');
    }

    // 4. Transfer ALL data (order matters for foreign keys)

    // Impact ledger (the crown jewels)
    const movedLedger = await tx.impactLedger.updateMany({
      where: { user_id: guestUserId },
      data: { user_id: fullUserId }
    });

    // Registrations
    const movedRegs = await tx.registrations.updateMany({
      where: { user_id: guestUserId },
      data: { user_id: fullUserId }
    });

    // Squad memberships
    const movedSquads = await tx.squadMembers.updateMany({
      where: { user_id: guestUserId },
      data: { user_id: fullUserId, is_guest: false }
    });

    // Reviews (if any)
    await tx.reviews.updateMany({
      where: { reviewer_id: guestUserId },
      data: { reviewer_id: fullUserId }
    });

    // Notifications
    await tx.notifications.updateMany({
      where: { recipient_id: guestUserId },
      data: { recipient_id: fullUserId }
    });

    // 5. Archive guest account (soft delete - keep for audit trail)
    await tx.users.update({
      where: { id: guestUserId },
      data: {
        is_guest: false, // No longer active
        merged_into: fullUserId,
        email: `merged_${guestUserId}@archived.impactidol.internal`, // Free up email
        deactivated_at: new Date()
      }
    });

    // 6. Update full user's cached totals
    const totalHours = await tx.impactLedger.aggregate({
      where: { user_id: fullUserId, status: 'VERIFIED' },
      _sum: { hours: true }
    });

    const firstActivity = await tx.impactLedger.findFirst({
      where: { user_id: fullUserId },
      orderBy: { date: 'asc' }
    });

    await tx.users.update({
      where: { id: fullUserId },
      data: {
        total_hours: totalHours._sum.hours || 0,
        volunteer_since: firstActivity?.date
      }
    });

    return {
      movedEntries: {
        impactLedger: movedLedger.count,
        registrations: movedRegs.count,
        squads: movedSquads.count
      },
      totalHours: totalHours._sum.hours || 0
    };
  }, {
    isolationLevel: 'Serializable', // Highest isolation level
    maxWait: 5000, // Wait up to 5s for lock
    timeout: 10000 // Abort after 10s
  });

  // 7. Send success notification
  await notificationService.send({
    recipientId: fullUserId,
    type: 'EMAIL',
    category: 'ACCOUNT',
    title: 'Your Impact Has Been Claimed! 🎉',
    body: `You've successfully claimed ${result.movedEntries.impactLedger} volunteer activities and ${result.totalHours} hours!`,
    actionUrl: `/profile/${fullUserId}`,
    priority: 'HIGH'
  });

  // 8. Analytics tracking
  track('guest_converted_to_full_user', {
    guest_user_id: guestUserId,
    full_user_id: fullUserId,
    claimed_hours: result.totalHours,
    claimed_activities: result.movedEntries.impactLedger,
    conversion_time_hours: calculateHoursSinceFirstActivity(guestUserId)
  });

  return result;
}
```

#### Security & Abuse Prevention

```typescript
// Prevent abuse of magic link system

// 1. Rate limiting on squad invitations
async function checkSquadInviteRateLimit(userId: string) {
  const recentInvites = await db.squadBookings.count({
    where: {
      created_by: userId,
      created_at: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } // Last 24h
    }
  });

  if (recentInvites > 100) {
    throw new Error('Too many squad invites in 24 hours. Please contact support.');
  }
}

// 2. Verify squad leader identity for large squads
async function requireVerificationForLargeSquad(squadId: string) {
  const squad = await db.squads.findUnique({ where: { id: squadId } });

  if (squad.expected_size > 100) {
    // Require phone verification or similar
    const leader = await db.users.findUnique({ where: { id: squad.leader_id } });

    if (!leader.phone_verified) {
      throw new Error('Phone verification required for squads >100 people');
    }
  }
}

// 3. Prevent merge conflicts (security check)
// Already handled in mergeGuestToFullUser() with email matching

// 4. Detect suspicious patterns
async function detectSuspiciousGuestActivity(userId: string) {
  // Flag if same guest email used across many squads
  const squadCount = await db.squadMembers.count({
    where: { user_id: userId, is_guest: true }
  });

  if (squadCount > 20) {
    await flagForReview(userId, 'SUSPICIOUS_MULTI_SQUAD_GUEST');
  }

  // Flag if guest has >50 hours but never converted
  const user = await db.users.findUnique({ where: { id: userId } });

  if (user.is_guest && user.total_hours > 50) {
    await flagForReview(userId, 'HIGH_HOURS_NEVER_CONVERTED');
  }
}
```

#### Analytics & Success Metrics

```typescript
// Track the entire guest funnel

// Stage 1: Invitation
track('squad_booking_created', {
  squad_id,
  opportunity_id,
  spots_reserved: 10,
  invitee_count: 10
});

track('magic_link_sent', {
  squad_id,
  email,
  is_existing_user: false
});

// Stage 2: Engagement
track('magic_link_clicked', {
  squad_id,
  email,
  time_to_click_hours: 2.5 // How long after sent
});

track('guest_account_created', {
  squad_id,
  email
});

// Stage 3: Participation
track('guest_registered_for_event', {
  squad_id,
  opportunity_id,
  email
});

track('guest_attended_event', {
  squad_id,
  opportunity_id,
  email,
  hours: 3
});

// Stage 4: Conversion
track('claim_email_sent', {
  email,
  hours: 3,
  days_since_event: 1
});

track('claim_email_opened', { email });

track('claim_link_clicked', { email });

track('guest_converted_to_full_user', {
  email,
  claimed_hours: 3,
  claimed_activities: 1,
  conversion_time_hours: 26, // Time from first activity to conversion
  squad_id
});

// Success Criteria:
// - Magic link click rate: >60% (people engage with squad invites)
// - Guest attendance rate: >70% (guests actually show up)
// - Guest → Full User conversion: >50% within 7 days (high-value conversion)
// - Viral coefficient: >2 (each user brings 2+ new users)
```

### 7.3 API Architecture (tRPC)

**Why tRPC?**
- ✅ End-to-end type safety (frontend knows exact API shape)
- ✅ No code generation needed
- ✅ Auto-completion in IDE
- ✅ Easy to refactor (TypeScript catches breaking changes)
- ✅ Perfect for monorepo (shared types between frontend/backend)

**Structure:**

```
src/
├── server/
│   ├── trpc.ts              # tRPC instance & context
│   ├── routers/
│   │   ├── _app.ts          # Root router
│   │   ├── auth.ts          # Auth routes
│   │   ├── users.ts         # User routes
│   │   ├── organizations.ts # Org routes
│   │   ├── opportunities.ts # Opportunity routes
│   │   ├── impact.ts        # Impact ledger routes
│   │   ├── squads.ts        # Squad routes
│   │   └── notifications.ts # Notification routes
│   └── services/            # Business logic
│       ├── matching.service.ts
│       ├── verification.service.ts
│       └── notification.service.ts
├── app/                     # Next.js App Router
└── lib/
    └── trpc.ts              # Client-side tRPC setup
```

**Example Router:**

```typescript
// server/routers/opportunities.ts
import { z } from 'zod';
import { router, publicProcedure, protectedProcedure } from '../trpc';

export const opportunitiesRouter = router({
  // Public: Browse opportunities
  search: publicProcedure
    .input(z.object({
      location: z.object({ lat: z.number(), lng: z.number() }).optional(),
      radius: z.number().default(10), // miles
      causeIds: z.array(z.string()).optional(),
      startDate: z.date().optional(),
      endDate: z.date().optional(),
      skillIds: z.array(z.string()).optional(),
      limit: z.number().default(20),
      offset: z.number().default(0)
    }))
    .query(async ({ input }) => {
      const query = db.opportunities
        .where('status', 'OPEN')
        .where('starts_at', '>=', input.startDate || new Date());

      if (input.location) {
        // PostGIS query for distance
        query.whereRaw(
          'ST_DWithin(location::geography, ST_MakePoint(?, ?)::geography, ?)',
          [input.location.lng, input.location.lat, input.radius * 1609.34] // miles to meters
        );
      }

      if (input.causeIds?.length) {
        query.whereIn('cause_id', input.causeIds);
      }

      const opportunities = await query
        .limit(input.limit)
        .offset(input.offset)
        .execute();

      return opportunities;
    }),

  // Protected: Register for opportunity
  register: protectedProcedure
    .input(z.object({
      opportunityId: z.string().uuid(),
      shiftId: z.string().uuid().optional(),
      squadId: z.string().uuid().optional()
    }))
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.user.id;

      // Check capacity
      const opportunity = await db.opportunities.findUnique({
        where: { id: input.opportunityId }
      });

      if (opportunity.status === 'FULL') {
        throw new Error('Opportunity is full');
      }

      // Create registration
      const registration = await db.registrations.create({
        data: {
          opportunity_id: input.opportunityId,
          shift_id: input.shiftId,
          user_id: userId,
          squad_id: input.squadId,
          status: 'CONFIRMED'
        }
      });

      // Send confirmation notification
      await notificationService.send({
        recipientId: userId,
        type: 'EMAIL',
        category: 'CONFIRMATION',
        title: 'Registration Confirmed',
        body: `You're signed up for ${opportunity.title}`,
        priority: 'HIGH',
        metadata: { opportunityId: input.opportunityId }
      });

      return registration;
    }),

  // Protected (Org): Create opportunity
  create: protectedProcedure
    .input(z.object({
      orgId: z.string().uuid(),
      title: z.string().min(5).max(255),
      description: z.string().min(20),
      causeId: z.string().uuid(),
      location: z.object({ lat: z.number(), lng: z.number() }),
      locationName: z.string(),
      startsAt: z.date(),
      endsAt: z.date(),
      capacity: z.number().positive().optional(),
      skillIds: z.array(z.string().uuid()).optional()
    }))
    .mutation(async ({ input, ctx }) => {
      // Check user is org admin
      const membership = await db.orgMembers.findFirst({
        where: {
          org_id: input.orgId,
          user_id: ctx.user.id,
          role: { in: ['OWNER', 'ADMIN', 'COORDINATOR'] }
        }
      });

      if (!membership) {
        throw new Error('Unauthorized');
      }

      // Create opportunity
      const opportunity = await db.opportunities.create({
        data: {
          org_id: input.orgId,
          title: input.title,
          description: input.description,
          cause_id: input.causeId,
          location: `POINT(${input.location.lng} ${input.location.lat})`,
          location_name: input.locationName,
          starts_at: input.startsAt,
          ends_at: input.endsAt,
          capacity: input.capacity,
          status: 'OPEN',
          created_by: ctx.user.id
        }
      });

      // Associate skills
      if (input.skillIds?.length) {
        await db.opportunitySkills.createMany({
          data: input.skillIds.map(skillId => ({
            opportunity_id: opportunity.id,
            skill_id: skillId
          }))
        });
      }

      return opportunity;
    })
});
```

**Client Usage:**

```typescript
// app/opportunities/page.tsx
'use client';
import { trpc } from '@/lib/trpc';

export default function OpportunitiesPage() {
  const [location, setLocation] = useState({ lat: 37.7749, lng: -122.4194 });

  const { data: opportunities, isLoading } = trpc.opportunities.search.useQuery({
    location,
    radius: 10,
    limit: 20
  });

  const registerMutation = trpc.opportunities.register.useMutation({
    onSuccess: () => {
      toast.success('Registered successfully!');
    }
  });

  return (
    <div>
      {opportunities?.map(opp => (
        <OpportunityCard
          key={opp.id}
          opportunity={opp}
          onRegister={() => registerMutation.mutate({ opportunityId: opp.id })}
        />
      ))}
    </div>
  );
}
```

### 7.4 Geospatial Queries (PostGIS)

**Setup:**

```sql
-- Enable PostGIS extension
CREATE EXTENSION IF NOT EXISTS postgis;

-- Create spatial indexes
CREATE INDEX idx_users_location ON users USING GIST(location);
CREATE INDEX idx_orgs_location ON organizations USING GIST(location);
CREATE INDEX idx_opps_location ON opportunities USING GIST(location);
```

**Common Queries:**

```typescript
// Find opportunities within radius
const nearbyOpportunities = await db.$queryRaw`
  SELECT
    o.*,
    ST_Distance(o.location::geography, ST_MakePoint(${lng}, ${lat})::geography) / 1609.34 AS distance_miles
  FROM opportunities o
  WHERE
    o.status = 'OPEN'
    AND ST_DWithin(
      o.location::geography,
      ST_MakePoint(${lng}, ${lat})::geography,
      ${radiusMiles * 1609.34}
    )
  ORDER BY distance_miles ASC
  LIMIT ${limit};
`;

// Find volunteers within radius of organization
const nearbyVolunteers = await db.$queryRaw`
  SELECT
    u.*,
    ST_Distance(u.location::geography, o.location::geography) / 1609.34 AS distance_miles
  FROM users u
  CROSS JOIN organizations o
  WHERE
    o.id = ${orgId}
    AND u.is_guest = false
    AND ST_DWithin(
      u.location::geography,
      o.location::geography,
      ${radiusMiles * 1609.34}
    )
  ORDER BY distance_miles ASC;
`;
```

### 7.5 Matching Algorithm

**Simple Scoring System (MVP):**

```typescript
interface MatchScore {
  opportunityId: string;
  score: number;
  breakdown: {
    distance: number;      // 0-40 points
    skillMatch: number;    // 0-30 points
    causeAffinity: number; // 0-20 points
    availability: number;  // 0-10 points
  };
}

async function calculateMatchScore(
  userId: string,
  opportunityId: string
): Promise<MatchScore> {
  const [user, opportunity] = await Promise.all([
    db.users.findUnique({
      where: { id: userId },
      include: { skills: true, causes: true }
    }),
    db.opportunities.findUnique({
      where: { id: opportunityId },
      include: { skills: true }
    })
  ]);

  // 1. Distance score (0-40 points)
  const distance = calculateDistance(user.location, opportunity.location);
  const distanceScore = Math.max(0, 40 - (distance * 2)); // Lose 2 points per mile

  // 2. Skill match (0-30 points)
  const userSkillIds = user.skills.map(s => s.skill_id);
  const oppSkillIds = opportunity.skills.map(s => s.skill_id);
  const matchingSkills = userSkillIds.filter(id => oppSkillIds.includes(id));
  const skillScore = (matchingSkills.length / oppSkillIds.length) * 30;

  // 3. Cause affinity (0-20 points)
  const causeScore = user.causes.some(c => c.cause_id === opportunity.cause_id) ? 20 : 0;

  // 4. Availability (0-10 points)
  // Check if opportunity time conflicts with user's other registrations
  const hasConflict = await checkScheduleConflict(userId, opportunity.starts_at, opportunity.ends_at);
  const availabilityScore = hasConflict ? 0 : 10;

  const totalScore = distanceScore + skillScore + causeScore + availabilityScore;

  return {
    opportunityId,
    score: totalScore,
    breakdown: {
      distance: distanceScore,
      skillMatch: skillScore,
      causeAffinity: causeScore,
      availability: availabilityScore
    }
  };
}
```

### 7.6 Caching Strategy

**What to Cache:**
1. User profiles (30 min TTL)
2. Organization profiles (1 hour TTL)
3. Opportunity listings (5 min TTL)
4. Cause/skill taxonomies (24 hours TTL)
5. User preferences (1 hour TTL)

**Implementation with React Query:**

```typescript
// lib/query-client.ts
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 30 * 60 * 1000, // 30 minutes
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
});

// app/opportunities/[id]/page.tsx
const { data: opportunity } = trpc.opportunities.getById.useQuery(
  { id: opportunityId },
  {
    staleTime: 5 * 60 * 1000, // Fresh for 5 minutes
    cacheTime: 30 * 60 * 1000, // Keep in cache for 30 minutes
  }
);
```

**Server-side Caching (Redis):**

```typescript
import { Redis } from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

async function getCachedOrFetch<T>(
  key: string,
  fetchFn: () => Promise<T>,
  ttlSeconds: number = 300
): Promise<T> {
  // Try cache first
  const cached = await redis.get(key);
  if (cached) {
    return JSON.parse(cached);
  }

  // Fetch fresh data
  const fresh = await fetchFn();

  // Store in cache
  await redis.setex(key, ttlSeconds, JSON.stringify(fresh));

  return fresh;
}

// Usage
const opportunity = await getCachedOrFetch(
  `opportunity:${id}`,
  () => db.opportunities.findUnique({ where: { id } }),
  300 // 5 minutes
);
```

---

## 8. Trust & Verification Protocol

### 8.1 Verification Tiers

**Silver (Historical Verification)**
- **Method:** Email verification by third party
- **Process:**
  1. Volunteer enters past experience
  2. System sends email to supervisor
  3. Supervisor clicks verify link
  4. Hours marked as "Silver Verified"
- **Trust Level:** High (retrospective verification)
- **Use Case:** Importing volunteer history

**Gold (Live Platform Verification)**
- **Method:** QR code scan or GPS check-in
- **Process:**
  1. Volunteer registers for opportunity
  2. At event, volunteer scans org's QR code OR check-in via GPS
  3. After event, volunteer checks out
  4. Hours calculated automatically
  5. Org has 48 hours to dispute
  6. If no dispute, auto-verified as "Gold"
- **Trust Level:** Highest (real-time, platform-tracked)
- **Use Case:** All platform-organized volunteering

**Platinum (Dual Verification)**
- **Method:** Both org verification AND squad leader verification
- **Process:** Same as Gold, but squad leader also confirms participation
- **Trust Level:** Maximum (two independent verifiers)
- **Use Case:** Corporate/school volunteering where both org and employer/school need to confirm

### 8.2 Passive Verification Rule

**The 48-Hour Window:**
- When a volunteer checks in/out, status is initially `PENDING`
- Organization receives notification: "Please verify or dispute [Volunteer Name]'s 3 hours"
- If org takes **no action within 48 hours**, system auto-verifies:
  - `status` → `VERIFIED`
  - `tier` → `GOLD`
  - `verified_at` → current timestamp
- If org disputes, status → `DISPUTED` and requires manual resolution

**Why This Approach Works:**
- ✅ **Defaults to trust:** Most volunteer work is legitimate
- ✅ **Reduces org friction:** Organizations are busy; don't want another admin task
- ✅ **Gives orgs veto power:** Can still dispute within 48 hours
- ✅ **Creates urgency:** Countdown encourages timely review
- 🎯 **Psychological hack:** Orgs more likely to dispute fraud than verify good work

**Implementation:**

#### Scheduling Strategy

```typescript
// Option A: Hourly Cron Job (RECOMMENDED for MVP)
// Simpler implementation, hour-level precision is sufficient
import cron from 'node-cron';

cron.schedule('0 * * * *', async () => {
  await autoVerifyExpiredPendingHours();
});

// Option B: Per-Entry Scheduled Job (for exact timing later)
// Schedule job for exactly 48h after check-out
await notificationQueue.add(
  'auto-verify',
  { impactLedgerId: entry.id },
  { delay: 48 * 60 * 60 * 1000 } // 48 hours
);
```

#### Core Auto-Verify Function

```typescript
// Background job (runs every hour)
async function autoVerifyExpiredPendingHours() {
  const cutoffTime = new Date(Date.now() - 48 * 60 * 60 * 1000); // 48 hours ago

  const pendingEntries = await db.impactLedger.findMany({
    where: {
      status: 'PENDING',
      verification_method: { in: ['QR', 'GPS'] },
      created_at: { lte: cutoffTime }
    },
    include: {
      user: true,
      organization: true
    }
  });

  const results = {
    verified: 0,
    failed: 0,
    errors: []
  };

  for (const entry of pendingEntries) {
    try {
      await db.impactLedger.update({
        where: { id: entry.id },
        data: {
          status: 'VERIFIED',
          tier: 'GOLD',
          verified_at: new Date()
        }
      });

      // Update user's cached total hours
      await updateUserTotalHours(entry.user_id);

      // Notify volunteer
      await notificationService.send({
        recipientId: entry.user_id,
        type: 'EMAIL',
        category: 'VERIFICATION',
        title: 'Your Hours Have Been Verified!',
        body: `Your ${entry.hours} hours with ${entry.organization.name} are now verified.`,
        actionUrl: `/profile/${entry.user_id}`,
        priority: 'MEDIUM',
        metadata: { impactLedgerId: entry.id }
      });

      results.verified++;
    } catch (error) {
      results.failed++;
      results.errors.push({ ledgerId: entry.id, error: error.message });
    }
  }

  // Log for monitoring
  console.log(`Auto-verified ${results.verified} entries, ${results.failed} failed`);

  return results;
}
```

#### Notification Timeline (Multi-Touch Strategy)

```typescript
// Create three touchpoints to give orgs multiple chances to review

// 1. IMMEDIATE: When check-out happens (Hour 0)
async function notifyOrgOfPendingVerification(ledgerId: string) {
  const entry = await db.impactLedger.findUnique({
    where: { id: ledgerId },
    include: { user: true, organization: true }
  });

  await notificationService.send({
    recipientId: entry.organization.contact_email,
    type: 'EMAIL',
    category: 'VERIFICATION',
    title: `Please verify ${entry.user.name}'s volunteer hours`,
    body: `${entry.user.name} completed ${entry.hours} hours. Review now or it will auto-verify in 48 hours.`,
    actionUrl: `/org/verify/${ledgerId}`,
    priority: 'HIGH'
  });
}

// 2. REMINDER: 24 hours after check-out (50% mark)
await notificationQueue.add(
  'verification-reminder-24h',
  { ledgerId },
  { delay: 24 * 60 * 60 * 1000 }
);

async function send24HourReminder(ledgerId: string) {
  const entry = await db.impactLedger.findUnique({
    where: { id: ledgerId, status: 'PENDING' } // Only if still pending
  });

  if (!entry) return; // Already verified or disputed

  await notificationService.send({
    recipientId: entry.org_id,
    type: 'EMAIL',
    category: 'REMINDER',
    title: `24 hours left to verify volunteer hours`,
    body: `${entry.hours} hours will auto-verify in 24 hours. Dispute now if there's an issue.`,
    actionUrl: `/org/verify/${ledgerId}`,
    priority: 'MEDIUM'
  });
}

// 3. FINAL WARNING: 47 hours after check-out (1 hour before auto-verify)
await notificationQueue.add(
  'verification-final-warning',
  { ledgerId },
  { delay: 47 * 60 * 60 * 1000 }
);

async function sendFinalWarning(ledgerId: string) {
  const entry = await db.impactLedger.findUnique({
    where: { id: ledgerId, status: 'PENDING' }
  });

  if (!entry) return;

  await notificationService.send({
    recipientId: entry.org_id,
    type: 'EMAIL',
    category: 'URGENT',
    title: `⏰ 1 hour left to review volunteer hours`,
    body: `Auto-verifying in 1 hour unless you dispute.`,
    actionUrl: `/org/verify/${ledgerId}`,
    priority: 'HIGH'
  });
}
```

#### Handling Edge Cases

```typescript
// Edge Case 1: Late disputes (after 48-hour window)
async function lateDispute(ledgerId: string, reason: string, disputedBy: string) {
  const entry = await db.impactLedger.findUnique({ where: { id: ledgerId } });

  if (entry.status !== 'VERIFIED') {
    throw new Error('Can only dispute verified hours');
  }

  const hoursElapsed = (Date.now() - entry.verified_at.getTime()) / (1000 * 60 * 60);

  // Allow disputes up to 7 days after auto-verification
  if (hoursElapsed > 168) {
    throw new Error('Dispute window closed (max 7 days after verification)');
  }

  // Create dispute record (requires admin review for late disputes)
  await db.disputes.create({
    data: {
      impact_ledger_id: ledgerId,
      disputed_by: disputedBy,
      reason,
      is_late: hoursElapsed > 48, // Flag late disputes
      requires_admin_review: hoursElapsed > 48,
      created_at: new Date()
    }
  });

  // Freeze the hours (don't unverify immediately for late disputes)
  await db.impactLedger.update({
    where: { id: ledgerId },
    data: {
      status: 'DISPUTED',
      dispute_reason: reason,
      disputed_at: new Date()
    }
  });

  // Notify both parties + admin
  await Promise.all([
    notificationService.send({
      recipientId: entry.user_id,
      type: 'EMAIL',
      category: 'DISPUTE',
      title: 'Your hours have been disputed',
      body: `${entry.organization.name} has disputed your ${entry.hours} hours. Reason: ${reason}`,
      priority: 'HIGH'
    }),
    notifyAdminOfDispute(ledgerId, reason)
  ]);
}

// Edge Case 2: Volunteer disputes auto-verify
// (e.g., "I worked 5 hours but only 3 were logged")
async function volunteerDisputeHours(ledgerId: string, reason: string, claimedHours: number) {
  const entry = await db.impactLedger.findUnique({ where: { id: ledgerId } });

  // Create dispute for admin review
  await db.disputes.create({
    data: {
      impact_ledger_id: ledgerId,
      disputed_by: entry.user_id,
      reason,
      claimed_hours: claimedHours,
      requires_admin_review: true
    }
  });

  // Don't change status yet - admin will mediate
}
```

#### Abuse Prevention & Fraud Detection

```typescript
// Track organization verification behavior to detect bad actors
async function calculateOrgVerificationScore(orgId: string) {
  const stats = await db.impactLedger.groupBy({
    by: ['status'],
    where: { org_id: orgId },
    _count: true,
    _sum: { hours: true }
  });

  const total = stats.reduce((acc, s) => acc + s._count, 0);
  const disputed = stats.find(s => s.status === 'DISPUTED')?._count || 0;
  const autoVerified = stats.find(s => s.status === 'VERIFIED' && s.verification_method === 'AUTO')?._count || 0;

  const disputeRate = disputed / total;
  const autoVerifyRate = autoVerified / total;

  // Red flags for review
  if (disputeRate > 0.3 && total > 20) {
    await flagOrgForReview(orgId, 'SUSPICIOUS_HIGH_DISPUTE_RATE', {
      disputeRate,
      total,
      reason: 'Organization disputes >30% of volunteer hours'
    });
  }

  if (autoVerifyRate === 1.0 && total > 50) {
    await flagOrgForReview(orgId, 'NEVER_MANUALLY_VERIFIES', {
      autoVerifyRate,
      total,
      reason: 'Organization never manually verifies (possible collusion with fake volunteers)'
    });
  }

  // Calculate trust score (0-100)
  const trustScore = Math.max(0, 100 - (disputeRate * 100));

  await db.organizations.update({
    where: { id: orgId },
    data: { verification_score: trustScore }
  });

  return { disputeRate, autoVerifyRate, trustScore };
}

// Track volunteer reliability (for matching algorithm)
async function calculateVolunteerReliabilityScore(userId: string) {
  const stats = await db.impactLedger.groupBy({
    by: ['status'],
    where: { user_id: userId },
    _count: true
  });

  const total = stats.reduce((acc, s) => acc + s._count, 0);
  const disputed = stats.find(s => s.status === 'DISPUTED')?._count || 0;
  const verified = stats.find(s => s.status === 'VERIFIED')?._count || 0;

  // Also factor in no-shows
  const noShows = await db.registrations.count({
    where: { user_id: userId, status: 'NO_SHOW' }
  });

  const disputeRate = disputed / total;
  const verificationRate = verified / total;
  const noShowRate = noShows / total;

  // Reliability score (0-100)
  const reliabilityScore = Math.max(0,
    100 - (disputeRate * 50) - (noShowRate * 30)
  );

  await db.users.update({
    where: { id: userId },
    data: { verification_score: reliabilityScore }
  });

  return reliabilityScore;
}
```

#### Success Metrics to Track

```typescript
// Analytics events for monitoring passive verification health
track('hours_checked_out', { org_id, hours, user_id });
track('verification_pending', { ledger_id, hours });
track('org_notified_to_verify', { org_id, ledger_id, notification_type: 'initial' });
track('org_notified_to_verify', { org_id, ledger_id, notification_type: '24h_reminder' });
track('org_notified_to_verify', { org_id, ledger_id, notification_type: 'final_warning' });

track('hours_manually_verified', {
  org_id,
  ledger_id,
  hours,
  time_to_verify_hours: 4.5 // How quickly org verified
});

track('hours_auto_verified', {
  org_id,
  ledger_id,
  hours
});

track('hours_disputed', {
  org_id,
  ledger_id,
  hours,
  is_late_dispute: false,
  dispute_reason: 'no_show'
});

track('late_dispute', {
  org_id,
  ledger_id,
  hours_after_verification: 72
});

// Success criteria
// - Auto-verify rate: >80% (orgs trust the system)
// - Dispute rate: <5% (hours are legitimate)
// - Late dispute rate: <1% (orgs review promptly)
// - Average time to manual verify: <12 hours (engaged orgs)
```

### 8.3 Check-In Flow (Technical)

**QR Code Check-In:**

```typescript
// Generate QR code for opportunity
async function generateOpportunityQR(opportunityId: string) {
  // Create signed token
  const token = jwt.sign(
    { opportunityId, type: 'CHECK_IN' },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );

  const qrData = `${process.env.APP_URL}/check-in/${token}`;

  return qrData; // Render as QR code with library like `qrcode`
}

// Volunteer scans QR code
async function checkIn(token: string, userId: string) {
  // Verify token
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  const { opportunityId } = payload;

  // Check registration exists
  const registration = await db.registrations.findFirst({
    where: {
      opportunity_id: opportunityId,
      user_id: userId,
      status: 'CONFIRMED'
    }
  });

  if (!registration) {
    throw new Error('No registration found');
  }

  // Update registration
  await db.registrations.update({
    where: { id: registration.id },
    data: {
      checked_in_at: new Date(),
      check_in_method: 'QR'
    }
  });

  return { success: true, message: 'Checked in successfully!' };
}

// Check-out (calculate hours)
async function checkOut(registrationId: string) {
  const registration = await db.registrations.findUnique({
    where: { id: registrationId },
    include: { opportunity: true }
  });

  if (!registration.checked_in_at) {
    throw new Error('Not checked in');
  }

  const checkOutTime = new Date();
  const hours = (checkOutTime - registration.checked_in_at) / (1000 * 60 * 60); // Convert to hours

  // Update registration
  await db.registrations.update({
    where: { id: registrationId },
    data: {
      checked_out_at: checkOutTime,
      actual_hours: hours,
      status: 'ATTENDED'
    }
  });

  // Create impact ledger entry
  await db.impactLedger.create({
    data: {
      user_id: registration.user_id,
      org_id: registration.opportunity.org_id,
      opportunity_id: registration.opportunity_id,
      registration_id: registration.id,
      squad_id: registration.squad_id,
      hours: hours,
      date: new Date(),
      status: 'PENDING', // Will auto-verify in 48h
      tier: 'GOLD',
      verification_method: 'QR',
      is_historical: false
    }
  });

  return { success: true, hours };
}
```

**GPS-Based Check-In (Alternative):**

```typescript
async function checkInGPS(
  opportunityId: string,
  userId: string,
  userLocation: { lat: number; lng: number }
) {
  const opportunity = await db.opportunities.findUnique({
    where: { id: opportunityId }
  });

  // Calculate distance between user and event location
  const distance = calculateDistance(userLocation, opportunity.location);

  // Must be within 100 meters
  if (distance > 0.1) { // km
    throw new Error('You must be at the event location to check in');
  }

  // Check time (must be within event window or 30 min before)
  const now = new Date();
  const startTime = new Date(opportunity.starts_at);
  const thirtyMinBefore = new Date(startTime.getTime() - 30 * 60 * 1000);

  if (now < thirtyMinBefore || now > opportunity.ends_at) {
    throw new Error('Check-in not available at this time');
  }

  // Proceed with check-in (same as QR flow)
  // ...
}
```

### 8.4 Endorsement System

**Swipe Interface (Org View):**

```typescript
// Get volunteers for rapid endorsement review
async function getVolunteersForEndorsement(orgId: string) {
  // Find volunteers who attended recent events but haven't been endorsed
  const recentVolunteers = await db.$queryRaw`
    SELECT DISTINCT
      u.id,
      u.name,
      u.avatar_url,
      il.opportunity_id,
      o.title AS event_title,
      il.hours,
      il.date,
      array_agg(DISTINCT s.name) AS skills_used
    FROM impact_ledger il
    JOIN users u ON u.id = il.user_id
    JOIN opportunities o ON o.id = il.opportunity_id
    LEFT JOIN opportunity_skills os ON os.opportunity_id = o.id
    LEFT JOIN skills s ON s.id = os.skill_id
    WHERE
      il.org_id = ${orgId}
      AND il.status = 'VERIFIED'
      AND il.date >= NOW() - INTERVAL '90 days'
      AND NOT EXISTS (
        SELECT 1 FROM endorsements e
        WHERE e.to_user_id = u.id
        AND e.from_org_id = ${orgId}
        AND e.impact_ledger_id = il.id
      )
    GROUP BY u.id, u.name, u.avatar_url, il.opportunity_id, o.title, il.hours, il.date
    LIMIT 20;
  `;

  return recentVolunteers;
}

// Swipe right = endorse
async function endorseVolunteer(data: {
  orgId: string;
  userId: string;
  impactLedgerId: string;
  softSkills: string[]; // ['RELIABILITY', 'TEAMWORK']
  skillIds?: string[]; // Technical skills
  comment?: string;
}) {
  const endorsements = [];

  // Create soft skill endorsements
  for (const softSkill of data.softSkills) {
    endorsements.push({
      from_org_id: data.orgId,
      to_user_id: data.userId,
      soft_skill: softSkill,
      impact_ledger_id: data.impactLedgerId,
      comment: data.comment
    });
  }

  // Create technical skill endorsements
  for (const skillId of (data.skillIds || [])) {
    endorsements.push({
      from_org_id: data.orgId,
      to_user_id: data.userId,
      skill_id: skillId,
      impact_ledger_id: data.impactLedgerId,
      comment: data.comment
    });
  }

  await db.endorsements.createMany({
    data: endorsements
  });

  // Update user's skill verification counts
  if (data.skillIds?.length) {
    for (const skillId of data.skillIds) {
      await db.userSkills.update({
        where: {
          user_id_skill_id: { user_id: data.userId, skill_id: skillId }
        },
        data: {
          verified_count: { increment: 1 }
        }
      });
    }
  }

  // Notify volunteer
  await notificationService.send({
    recipientId: data.userId,
    type: 'EMAIL',
    category: 'SOCIAL',
    title: 'You Received an Endorsement!',
    body: `[Org Name] endorsed you for ${data.softSkills.join(', ')}`,
    priority: 'MEDIUM'
  });

  return { success: true, count: endorsements.length };
}
```

---

## 9. Development Roadmap

### 9.0 Critical Features: Implementation Priorities

**Two features are ESSENTIAL for platform success and should be prioritized:**

#### Feature 1: Guest Logic (Viral Growth Engine)
**Why Critical:** This is your primary growth mechanism. Without it, growth is linear (1 user → 1 user). With it, growth is exponential (1 user → 5+ users).

**Impact:**
- 🚀 **Viral coefficient:** 5x (each squad leader brings 5+ new users)
- 💎 **High-value conversion:** Users convert AFTER experiencing value (hours logged)
- ✅ **Zero friction:** Guests participate without signing up first

**Without this feature:**
- Growth depends entirely on paid acquisition or word-of-mouth
- Each new user must sign up BEFORE volunteering (high friction)
- No compounding growth effect

**Recommended Phasing:**

**Week 1-2 (MVP Launch):**
1. ✅ Basic guest creation (magic link → guest account)
2. ✅ Guest can register for events via magic link
3. ✅ Basic merge (guest → full user) after event
4. ✅ Manual check-in for guests (org marks them attended)

**Week 3-4 (Post-MVP Enhancement):**
1. ✅ "Claim Your Impact" email 24h after event
2. ✅ Advanced merge with full audit trail
3. ✅ Abuse prevention (rate limiting, security checks)
4. ✅ Analytics tracking (full funnel metrics)

**Why this order:**
- Get guest flow working FIRST (it's your growth engine)
- Manual check-in is fine for early days (builds relationships with orgs)
- Polish the experience after validating core flow works

---

#### Feature 2: Passive Verification (48-Hour Auto-Verify)
**Why Critical:** Organizations won't use the platform if verification is a burden. This feature makes verification effortless.

**Impact:**
- ✅ **Reduces org friction:** Orgs don't need to manually verify every hour
- ✅ **Defaults to trust:** Most volunteer work is legitimate
- ✅ **Drives retention:** Orgs get value (grant reports) without admin overhead

**Without this feature:**
- Orgs must manually verify every volunteer hour (tedious)
- Hours sit in "pending" state forever (poor volunteer experience)
- Orgs churn due to administrative burden

**Recommended Phasing:**

**Week 1-2 (MVP Launch):**
1. ✅ Manual verification only (org must approve/reject)
2. ✅ Org gets notification when hours need verification
3. ✅ Basic approve/reject workflow

**Week 3-4 (Add Passive Verification):**
1. ✅ 48-hour auto-verify cron job
2. ✅ Multi-touch notification strategy (0h, 24h, 47h)
3. ✅ Late dispute handling (7-day grace period)
4. ✅ Abuse detection (org verification scores)

**Why this order:**
- Manual verification validates orgs will actually use the feature
- Builds trust with early orgs (they see you care about accuracy)
- Passive verification is an optimization, not a requirement for launch
- Get data on how long orgs take to verify (informs 48h window choice)

---

### 9.0.1 Success Metrics for Critical Features

**Guest Logic (Viral Growth):**
```
Track these metrics weekly:

Invitation Stage:
- Magic links sent per squad booking
- Magic link click rate (target: >60%)

Participation Stage:
- Guest attendance rate (target: >70%)
- Hours per guest volunteer (target: >2)

Conversion Stage:
- Guest → Full User conversion (target: >50% within 7 days)
- Time to conversion (target: <48 hours after "claim" email)
- Viral coefficient (target: >2.0)

🎯 GOAL: Achieve viral coefficient >2.0 within 8 weeks
```

**Passive Verification:**
```
Track these metrics weekly:

Verification Behavior:
- Manual verification rate (% verified before 48h)
- Auto-verification rate (target: >80%)
- Average time to manual verify (target: <12 hours)

Dispute Metrics:
- Dispute rate (target: <5%)
- Late dispute rate (target: <1%)
- Dispute resolution time (target: <48 hours)

Org Satisfaction:
- % of orgs who export grant reports (retention signal)
- Org churn rate (target: <10% monthly)

🎯 GOAL: >80% auto-verify rate with <5% disputes within 8 weeks
```

---

### 9.0.2 Risk Mitigation

**Risks with Guest Logic:**

| Risk | Mitigation | Priority |
|------|-----------|----------|
| **Email spoofing:** Fake squad leaders invite random people | Rate limit invites (100/day), require phone verification for squads >100 | P0 |
| **Merge conflicts:** Guest tries to claim someone else's hours | Strict email matching, single-use tokens, transaction isolation | P0 |
| **Abandoned guests:** Thousands of ghost accounts | Scheduled cleanup job (delete guests with 0 hours after 90 days) | P1 |
| **Poor conversion:** Guests don't claim their hours | A/B test email timing, content, CTAs | P1 |

**Risks with Passive Verification:**

| Risk | Mitigation | Priority |
|------|-----------|----------|
| **Fraud:** Volunteers and orgs collude to fake hours | Flag orgs that never dispute + auto-verify 100% | P0 |
| **Late disputes:** Org discovers fraud after 48h | Allow 7-day late dispute window with admin review | P0 |
| **Org overwhelm:** Too many verification notifications | Smart batching (daily digest option), clear CTAs | P1 |
| **Volunteer disputes:** "I worked 5 hours not 3" | Volunteer dispute flow with admin mediation | P1 |

---

### 9.0.3 Implementation Decision Tree

**Should you build passive verification in Week 1?**

```
START: Do you have >5 orgs committed to testing?
│
├─ NO → Manual verification only
│   │   (Don't build automation before validating orgs will use it)
│   └─ Launch → Get 5 orgs → Revisit decision
│
└─ YES → Do your test orgs have bandwidth to manually verify?
    │
    ├─ YES → Manual verification for MVP
    │   │   (Build relationship, get feedback)
    │   └─ Week 3: Add passive verification based on data
    │
    └─ NO → Build passive verification in Week 1
        └─ (Necessary for org retention)
```

**Should you build guest flow in Week 1?**

```
START: Do you have a squad leader willing to test?
│
├─ NO → Skip guest flow
│   │   (Focus on individual volunteer experience)
│   └─ Launch → Find squad leaders → Build guest flow
│
└─ YES → Does your squad leader have >5 people to invite?
    │
    ├─ NO → Skip for now
    │   │   (Not enough volume to validate)
    │   └─ Focus on individual flow first
    │
    └─ YES → BUILD GUEST FLOW WEEK 1
        └─ (This is your growth engine - prioritize it!)
```

---

### 9.0.4 Technical Debt Considerations

**What shortcuts are acceptable in Week 1-2?**

**Guest Flow:**
- ✅ **Acceptable:** Simple email-based magic links (no SMS fallback)
- ✅ **Acceptable:** Single-use tokens (no refresh mechanism)
- ✅ **Acceptable:** Basic merge logic (manual admin intervention for conflicts)
- ❌ **Not acceptable:** Lose guest hours during merge (MUST be zero data loss)
- ❌ **Not acceptable:** Guest can claim someone else's hours (security critical)

**Passive Verification:**
- ✅ **Acceptable:** Hourly cron job (not per-minute precision)
- ✅ **Acceptable:** Email-only notifications (no SMS for MVP)
- ✅ **Acceptable:** Simple dispute flow (admin manually resolves all disputes)
- ❌ **Not acceptable:** No notification before auto-verify (orgs must get warning)
- ❌ **Not acceptable:** No dispute window after auto-verify (7-day grace period required)

**When to refactor:**
- **Guest flow:** After 100 successful conversions, refactor merge logic for scale
- **Passive verification:** After 500 auto-verifications, add advanced fraud detection

---

### 9.1 MVP Scope (Phase 1: 3 months)

**Goal:** Validate core value proposition with minimal feature set

**Must-Have Features:**

**For Volunteers:**
- ✅ Sign up with Google OAuth
- ✅ Create basic profile (name, bio, location, interests)
- ✅ Browse opportunities (list view with filters)
- ✅ Search by location + cause
- ✅ Register for opportunity (one-click)
- ✅ Basic impact dashboard (total hours, list of activities)
- ✅ Import historical volunteer work (manual entry)
- ✅ Trigger email verification for historical hours

**For Organizations:**
- ✅ Create organization profile
- ✅ Post opportunity (basic form: title, description, date, location, capacity)
- ✅ View registrations
- ✅ Manual check-in (mark as attended)
- ✅ Verify volunteer hours (approve/reject)
- ✅ Basic grant report (export CSV with total hours + monetary value)

**For Squads:**
- ✅ Create squad
- ✅ Book multiple spots for opportunity
- ✅ Generate magic link for squad members
- ✅ Guest user flow (lite profile)
- ✅ Claim impact flow (guest → full user merge)

**Platform:**
- ✅ tRPC API setup
- ✅ BetterAuth with Google OAuth + magic links
- ✅ PostgreSQL with PostGIS
- ✅ Basic email notifications (via Resend)
- ✅ Core data models (users, orgs, opportunities, impact_ledger, squads)

**Out of Scope for MVP:**
- ❌ QR code check-in (manual only)
- ❌ GPS verification
- ❌ Real-time chat
- ❌ Social features (following, connections)
- ❌ Advanced analytics
- ❌ Badges/gamification
- ❌ Mobile app
- ❌ Skills matching algorithm (basic filters only)
- ❌ Reviews/ratings
- ❌ Endorsements
- ❌ Multi-language support

### 9.2 Phase 2: Engagement & Trust (Months 4-6)

**Goal:** Improve retention and trust

**New Features:**
- ✅ QR code check-in/out
- ✅ Passive verification (48-hour rule)
- ✅ Endorsement system (swipe UI for orgs)
- ✅ Reviews (two-way ratings)
- ✅ Badges and achievements
- ✅ Enhanced impact dashboard (charts, comparisons)
- ✅ Skills matching algorithm (smart recommendations)
- ✅ In-app notifications
- ✅ Direct messaging (volunteer ↔ org)
- ✅ Following organizations
- ✅ Push notifications (web push)
- ✅ Calendar integration (Google Calendar, .ics)
- ✅ Recurring opportunities

### 9.3 Phase 3: Professional Network (Months 7-9)

**Goal:** Become "LinkedIn for Volunteers"

**New Features:**
- ✅ Rich volunteer profiles (portfolio, media uploads)
- ✅ Skill verification system
- ✅ Professional recommendations (like LinkedIn)
- ✅ Export "Resume of Good" as PDF
- ✅ Public profile SEO (JSON-LD, Open Graph)
- ✅ Volunteer connections (social graph)
- ✅ Activity feed (see what connections are doing)
- ✅ Volunteer groups/communities
- ✅ Advanced search (full-text + faceted)
- ✅ Organization verification process (manual review)
- ✅ Corporate volunteer program features

### 9.4 Phase 4: Scale & Ecosystem (Months 10-12)

**Goal:** Build ecosystem and prepare for scale

**New Features:**
- ✅ Public API (REST with OAuth)
- ✅ Webhooks for orgs (integration with their systems)
- ✅ Mobile app (React Native)
- ✅ Multi-language support (i18n)
- ✅ Advanced analytics for orgs (cohort analysis, retention)
- ✅ Volunteer marketplace (orgs can search for volunteers)
- ✅ Background check integration (Checkr)
- ✅ Payment processing (for paid volunteer programs)
- ✅ Enterprise features (SSO, team management)
- ✅ Dedicated search engine (Typesense/Meilisearch)

### 9.5 Sprint 1 Backlog (Weeks 1-2)

**Epic 1: Project Setup & Infrastructure**

**Story 1.1:** Initialize Next.js project with TypeScript
- AC: Next.js 15 with App Router, TypeScript, Tailwind configured
- AC: ESLint, Prettier configured
- AC: Vercel project created

**Story 1.2:** Set up database with Drizzle + PostGIS
- AC: PostgreSQL instance on Neon with PostGIS extension
- AC: Drizzle ORM configured
- AC: Initial schema for users, organizations tables
- AC: Migration system working

**Story 1.3:** Set up BetterAuth with Google OAuth
- AC: BetterAuth configured with Google provider
- AC: Login/signup flow working
- AC: Session management working
- AC: Protected routes working

**Story 1.4:** Set up tRPC
- AC: tRPC server and client configured
- AC: Example router working (health check)
- AC: Type safety verified (frontend knows backend types)

**Epic 2: Core Identity (Volunteers)**

**Story 2.1:** User can create profile via Google sign-up
- AC: OAuth flow completes successfully
- AC: User record created in database
- AC: Redirected to profile setup

**Story 2.2:** User can complete profile (name, bio, location, causes)
- AC: Profile form with all fields
- AC: Location autocomplete (Google Places API)
- AC: Cause selection (checkboxes)
- AC: Data saved to database

**Story 2.3:** User can manually enter past volunteer history
- AC: Form with fields: Org Name, Role, Date Range, Hours, Supervisor Email
- AC: Creates impact_ledger entry with status=PENDING, tier=null
- AC: Data saved and visible on profile

**Story 2.4:** System sends verification email to supervisor
- AC: Email sent via Resend when volunteer adds history
- AC: Email contains verify link (signed token)
- AC: Link expires in 7 days

**Story 2.5:** Supervisor can verify hours via email link
- AC: Clicking link verifies hours (status=VERIFIED, tier=SILVER)
- AC: Volunteer receives notification
- AC: Supervisor sees "Join as Organization" CTA

**Epic 3: Marketplace (Opportunities)**

**Story 3.1:** Org can create organization profile
- AC: Form with org name, description, location, website
- AC: Creates organization record
- AC: Creates org_member record for creator (role=OWNER)

**Story 3.2:** Org can post opportunity
- AC: Form with all required fields (title, description, date, location, capacity, cause)
- AC: Location autocomplete
- AC: Creates opportunity record with status=OPEN
- AC: Visible on opportunities page

**Story 3.3:** Volunteer can browse opportunities
- AC: List view showing all open opportunities
- AC: Basic filters (cause, date range)
- AC: Location-based sorting (PostGIS query)

**Story 3.4:** Volunteer can register for opportunity
- AC: Click "Sign Up" button
- AC: Creates registration record (status=CONFIRMED)
- AC: Decrements available capacity
- AC: Confirmation email sent

**Epic 4: Squad Flow**

**Story 4.1:** User can create squad
- AC: Form with squad name, type, expected size
- AC: Creates squad record
- AC: Creator is squad leader

**Story 4.2:** Squad leader can book spots for opportunity
- AC: "Book for Squad" button on opportunity
- AC: Specify number of spots
- AC: Creates squad_booking record
- AC: Generates magic links for each spot

**Story 4.3:** Squad leader shares magic link, guests can join
- AC: Guest clicks link
- AC: Creates guest user (is_guest=true, email from form)
- AC: Creates registration linked to guest user
- AC: Guest can see basic "You're registered" page (no login required)

**Story 4.4:** After event, guest receives "Claim Your Impact" email
- AC: 24 hours after event, system sends email to guest
- AC: Email has magic link to claim hours
- AC: Clicking link triggers OAuth sign-up
- AC: After sign-up, all guest data merged to full user account

---

## 10. Success Metrics

### 10.1 North Star Metric

**WVI (Weekly Verified Impact):** Total hours verified on platform per week

**Why this metric:**
- Captures both sides of marketplace (volunteers + orgs)
- Measures actual value delivery, not vanity metrics
- Directly correlates with platform value
- Easy to understand and track

**Target:** 10,000 verified hours/week within 12 months

### 10.2 Key Performance Indicators (KPIs)

#### Acquisition
- New volunteer sign-ups per week
- New organizations per week
- Viral coefficient (new users per squad booking)
- Organic vs paid user split

#### Activation
- % of users who complete profile
- % of users who register for first opportunity
- % of users who actually attend first opportunity
- % of organizations who post first opportunity
- Time to first value (sign-up → first volunteer activity)

#### Engagement
- Monthly active volunteers (attended event in last 30 days)
- Average opportunities per volunteer per month
- Repeat volunteer rate (volunteered 2+ times)
- Average hours per volunteer per month
- Organization active rate (posted opportunity in last 30 days)

#### Retention
- Day 7, 30, 90 retention rates
- Cohort retention curves
- % of volunteers who become "champions" (10+ events)
- Organization churn rate

#### Quality
- Average volunteer rating (from orgs)
- Average organization rating (from volunteers)
- Verification rate (% of hours that get verified)
- Dispute rate (% of hours disputed)
- No-show rate

#### Revenue (Future)
- Organizations on paid plans
- Average revenue per organization
- Lifetime value (LTV) of organization
- Customer acquisition cost (CAC)

### 10.3 Product Analytics Events to Track

```typescript
// Key events to instrument with PostHog/Segment

// User journey
track('user_signed_up', { method: 'google' });
track('profile_completed', { has_bio: true, cause_count: 3 });
track('historical_hours_added', { hours: 20, verification_sent: true });

// Opportunity discovery
track('opportunities_viewed', { filter_type: 'cause', result_count: 15 });
track('opportunity_clicked', { opportunity_id, distance_miles: 3.2 });
track('opportunity_registered', { opportunity_id, is_squad: false });

// Check-in flow
track('checked_in', { method: 'QR', opportunity_id });
track('checked_out', { hours: 3, opportunity_id });

// Verification
track('hours_verified', { tier: 'GOLD', hours: 3, auto_verified: true });
track('endorsement_received', { org_id, skill_type: 'soft' });

// Squad growth
track('squad_created', { type: 'CORPORATE', size: 10 });
track('squad_booking_created', { spots: 10, opportunity_id });
track('magic_link_clicked', { squad_id });
track('guest_converted_to_user', { previous_hours: 6 });

// Organization value
track('grant_report_exported', { org_id, total_hours: 500, format: 'PDF' });
track('opportunity_posted', { org_id, cause: 'environment', capacity: 20 });

// Engagement
track('notification_sent', { type: 'EMAIL', category: 'REMINDER' });
track('notification_opened', { type: 'EMAIL' });
track('message_sent', { conversation_type: 'DM' });

// Revenue (future)
track('upgrade_clicked', { current_plan: 'free', target_plan: 'pro' });
track('subscription_started', { plan: 'pro', price: 49 });
```

### 10.4 Success Criteria for MVP Launch

**Must Hit Before Public Launch:**
1. ✅ 50 verified volunteers on platform
2. ✅ 10 verified organizations
3. ✅ 100 total verified hours
4. ✅ Average rating > 4.0/5 (both volunteers and orgs)
5. ✅ < 10% no-show rate
6. ✅ > 80% email deliverability
7. ✅ < 2 second page load time
8. ✅ Zero critical security vulnerabilities (pen test)
9. ✅ 100% uptime for 7 days straight

---

## 11. Open Questions & Decisions

### 11.1 Product Decisions Needed

**Privacy & Data Portability**
- ❓ Should volunteer profiles be public by default or opt-in?
- ❓ Should we allow volunteers to export all their data (GDPR compliance)?
- ❓ Can volunteers delete their accounts? What happens to their hours?

**Monetization**
- ❓ What should be free vs paid for organizations?
  - Option A: Free for small nonprofits (<100 volunteers/year), paid for larger orgs
  - Option B: Free for basic features, paid for advanced (analytics, API, integrations)
  - Option C: Free for everyone, charge enterprise customers only
- ❓ Should we allow donations/tipping to volunteers? (Probably no - keeps it pure)

**Verification Edge Cases**
- ❓ What if org disputes hours after 48-hour window?
- ❓ What if volunteer and org disagree on hours worked?
- ❓ Should there be an appeals process?
- ❓ Who mediates disputes?

**International Expansion**
- ❓ How do we handle nonprofit verification in different countries?
- ❓ What wage rate do we use for international grant reports?
- ❓ Which languages to prioritize for i18n?

**Content Moderation**
- ❓ How do we prevent fake organizations/scams?
- ❓ What's the process for reporting inappropriate behavior?
- ❓ Who handles moderation (internal team vs community moderators)?

### 11.2 Technical Decisions Needed

**Deployment**
- ❓ Monorepo or separate repos for frontend/backend?
  - **Recommendation:** Monorepo (easier type sharing with tRPC)
- ❓ Staging environment strategy?
  - **Recommendation:** Vercel preview deployments + staging branch

**Database**
- ❓ Single database or read replicas?
  - **Recommendation:** Single DB for MVP, replicas when > 10k users
- ❓ Backup strategy?
  - **Recommendation:** Automated daily backups (Neon includes this)

**File Storage**
- ❓ Where to store user uploads (avatars, photos)?
  - **Recommendation:** Cloudflare R2 (S3-compatible, cheaper egress)
- ❓ Image optimization strategy?
  - **Recommendation:** Next.js Image component + CDN

**Search**
- ❓ PostgreSQL full-text search vs dedicated search engine?
  - **Recommendation:** Postgres for MVP, Typesense when search becomes slow

**Real-Time**
- ❓ WebSockets from day one or start with polling?
  - **Recommendation:** Polling for MVP (simpler), WebSockets in Phase 2

**Mobile**
- ❓ PWA vs native app vs React Native?
  - **Recommendation:** PWA for MVP (works immediately), React Native in Phase 4

**Internationalization**
- ❓ When to add multi-language support?
  - **Recommendation:** Phase 4 (validate English market first)

### 11.3 Business/Legal Decisions Needed

**Legal Structure**
- ❓ For-profit or nonprofit?
- ❓ B-Corp certification?

**Terms of Service**
- ❓ Who owns volunteer data? (Answer: Volunteer owns their data)
- ❓ What happens if org goes out of business?
- ❓ Liability for volunteer injuries during events?

**Background Checks**
- ❓ Should platform offer integrated background checks?
- ❓ Who pays for them?
- ❓ Required for all events or just those with minors/vulnerable populations?

**Insurance**
- ❓ Does platform need liability insurance?
- ❓ Do organizations need to show proof of insurance?

**Age Requirements**
- ❓ Minimum age for platform? (COPPA compliance: 13+)
- ❓ How to verify age for events requiring 18+?

---

## 12. Appendix

### 12.1 Glossary

- **Impact Ledger:** The verified record of all volunteer hours and activities
- **Lite User / Guest User:** Someone who participated via magic link but hasn't created full account
- **Magic Link:** Time-limited, signed URL that allows guest participation
- **Verification Tier:** Silver (email), Gold (QR/GPS), Platinum (dual verification)
- **WVI:** Weekly Verified Impact - total hours verified per week
- **Grant Report:** Export of volunteer hours with monetary value for funding applications
- **Squad:** A group that volunteers together (corporate team, student group, friends)
- **Endorsement:** Organization verification of a volunteer's skills or soft skills
- **Passive Verification:** Auto-verification after 48 hours if org doesn't dispute

### 12.2 Technology Reference Links

**Core Stack:**
- [Next.js](https://nextjs.org) - Full-stack React framework
- [tRPC](https://trpc.io) - End-to-end typesafe APIs
- [BetterAuth](https://www.better-auth.com) - Authentication library
- [Drizzle ORM](https://orm.drizzle.team) - TypeScript ORM
- [PostgreSQL](https://www.postgresql.org) - Database
- [PostGIS](https://postgis.net) - Spatial database extension

**Services:**
- [Resend](https://resend.com) - Email delivery
- [Twilio](https://www.twilio.com) - SMS
- [Firebase](https://firebase.google.com) - Push notifications
- [Vercel](https://vercel.com) - Hosting
- [Neon](https://neon.tech) - Serverless Postgres

**Libraries:**
- [shadcn/ui](https://ui.shadcn.com) - UI components
- [TanStack Query](https://tanstack.com/query) - Data fetching
- [Mapbox](https://www.mapbox.com) - Maps
- [BullMQ](https://docs.bullmq.io) - Job queue

### 12.3 Competitive Landscape

**Direct Competitors:**
- **VolunteerMatch:** Largest volunteer marketplace (US-focused, transactional, no profiles)
- **Idealist:** Nonprofit jobs + volunteering (not volunteer-focused)
- **Golden:** Modern volunteer platform (similar model, UK-focused)
- **Points of Light:** Corporate volunteering (enterprise-focused)

**Adjacent Competitors:**
- **LinkedIn:** Professional network (but no volunteer focus)
- **Catchafire:** Skills-based volunteering (virtual only)
- **Taproot Foundation:** Pro bono consulting (high-skill only)
- **GIVIT:** Goods donation (not time-based)

**Our Differentiators:**
1. ✅ Verified volunteer profiles (LinkedIn-like)
2. ✅ Dual verification system (trust both sides)
3. ✅ Squad booking for viral growth
4. ✅ Grant reporting for org retention
5. ✅ API-first for ecosystem building
6. ✅ Global from day one

### 12.4 User Research Questions (Pre-Launch)

**For Volunteers:**
1. Would you use a public volunteer profile for job applications?
2. What would motivate you to import past volunteer work?
3. Would you volunteer more if it was easier to find opportunities?
4. Do you volunteer with friends/coworkers? How do you coordinate?
5. What's the biggest pain point in volunteering currently?

**For Organizations:**
1. How do you currently track volunteer hours?
2. Do you write grants that require volunteer hour reporting?
3. What's your biggest challenge with volunteer management?
4. Would you pay for volunteer management software? How much?
5. How do you currently recruit volunteers?

**For Squad Leaders (Corporate/School):**
1. How do you organize group volunteering currently?
2. What's the most annoying part of coordinating a group?
3. Do you need to track participation for your employer/school?
4. Would a magic link (no individual sign-ups) be valuable?

---

## Document Control

**Version History:**
- v1.0 (2026-01-03): Initial draft from original PRD
- v2.0 (2026-01-03): Added communication architecture
- v3.0 (2026-01-03): Added complete data model
- v4.0 (2026-01-03): Added technical stack recommendations
- v5.0 (2026-01-03): Added BetterAuth integration details
- v6.0 (2026-01-03): Final consolidated version with all gaps addressed

**Document Owner:** Product Team
**Last Reviewed:** 2026-01-03
**Next Review:** Before Sprint 1 kickoff

**Status:** ✅ Ready for Development

---

*End of Document*
