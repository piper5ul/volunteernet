# VolunteerNet: Verification & Trust Framework

**Status:** Core Design Document | **Version:** 1.0 | **Last Updated:** 2026-01-04

This document defines how we verify users, organizations, hours, and handle fraud detection and appeals on VolunteerNet.

---

## Table of Contents

1. [Organization Verification](#1-organization-verification)
2. [User Verification & Background Checks](#2-user-verification--background-checks)
3. [Hour Verification & Variance Rules](#3-hour-verification--variance-rules)
4. [Fraud Detection & Escalation](#4-fraud-detection--escalation)
5. [Appeals Process](#5-appeals-process)
6. [Database Schema](#6-database-schema)
7. [Implementation Timeline](#7-implementation-timeline)

---

## 1. Organization Verification

### 1.1 Core Principle

**Unverified organizations cannot be active on the platform.** They cannot post opportunities, access volunteer data, log hours, or appear in search/directory until verified.

### 1.2 Verification Tiers

| Tier | Organization Type | Verification Method | Timeline | Auto/Manual |
|------|-------------------|---------------------|----------|-------------|
| **Auto-Approved** | US 501(c)(3) Nonprofits | IRS EIN lookup (API integration) | 2-4 hours | Automated |
| **Auto-Approved** | Government Agencies | Gov domain email + database check | 2-4 hours | Automated |
| **Manual Review** | Corporations | LinkedIn + business registry + CSR verification | 3-5 days | Admin review |
| **Manual Review** | Community Groups (Unincorporated) | Website + formation/registration docs | 3-5 days | Admin review |
| **Manual Review** | International Nonprofits | Country nonprofit registry + docs | 5-7 days | Admin review |

### 1.3 Documentation Requirements by Type

**501(c)(3) Nonprofits:**
- EIN (auto-verified via IRS lookup)
- Organization name match confirmation
- No additional docs needed if IRS lookup succeeds

**Government Agencies:**
- Government email address (org-issued)
- Agency name confirmation
- Optional: Org website

**Corporations:**
- Proof of business registration (D&B, state registry)
- CSR program documentation (internal policy, employee newsletter, etc.)
- Contact email on corporate domain
- Optional: LinkedIn company page

**Community Groups:**
- Website (or equivalent social media presence)
- Formation documents (Articles of Incorporation, LLC formation, cooperative charter, etc.)
- OR: Nonprofit registry in their jurisdiction
- Contact person + email

**International Nonprofits:**
- Charity registry ID (UK Charity Commission, Canada CRA, etc.)
- OR: Formation documents in their country
- Mission statement + recent annual report (if public)

### 1.4 Verification Status States

```
PENDING_SUBMISSION → (submit docs) → UNDER_REVIEW → (admin decision)
                                        ↓                  ↓
                                    VERIFIED          REJECTED (with reason)
                                        ↓
                                    ACTIVE

ACTIVE → (pattern detected or complaint) → FLAGGED (under investigation)
                                              ↓
                                    SUSPENDED or CLEARED
```

### 1.5 Appeals for Organizations

- **Timeline:** 14 days from rejection/suspension
- **Process:** Submit additional evidence or corrected documentation
- **Decision:** Admin re-review within 5 business days
- **Outcomes:** Overturn, Uphold, or Request Different Evidence

---

## 2. User Verification & Background Checks

### 2.1 User Onboarding Verification (No Friction)

**Step 1: Identity Verification**
- Email verification (send magic link)
- Phone optional (for SMS notifications)
- Name + basic profile

**Step 2: Profile Building** (incentivized, not required)
- Add photo (increases trust score)
- Add bio + skills (helps with opportunity matching)
- Add causes of interest (personalization)
- Link social profiles (optional, increases legitimacy)

**Step 3: Activity-Based Trust**
- Profile gets `verification_score` calculated from:
  - Hours logged and verified
  - Organization endorsements received
  - Show-up rate (attendance vs RSVPs)
  - Profile completion %
  - Time on platform

**Result:** User gets visibility badges (e.g., "50 verified hours," "Endorsed by 3 organizations")

### 2.2 Background Checks: Opportunistic & Gated

Background checks are **not required to join the platform**, but **required for specific opportunities**.

**When Orgs Require Background Checks:**
- Opportunities involving minors (schools, youth programs)
- Opportunities involving vulnerable populations (elderly care, mental health)
- High-security roles (facility access, financial handling)
- Org choice: They set `background_check_required` flag on opportunity

**What Triggers It:**
1. Volunteer browses opportunity
2. If `background_check_required = true`, they see:
   - "Background check required for this role"
   - Button: "Get verified now" or "Learn more"

3. Volunteer clicks → Presented with 3 options (see 2.3)

### 2.3 Background Check Payment Model

| Who Pays | Scenario | Price | Validity |
|----------|----------|-------|----------|
| **Organization** | High-security roles (minors, vulnerable) | Org absorbs cost | Per opportunity |
| **Volunteer** | Portable Background Badge | $25 one-time | 1 year platform-wide |
| **Platform** | Scholarship program | Free | Verified income-qualified volunteers |

**Payment Flow:**

```
Volunteer clicks "Get verified"
    ↓
See options:
├─ "This org pays ($0 for you)" → Check ordered, org charged
├─ "Get 1-year platform badge ($25)" → Volunteer pays, valid for all orgs
└─ "Apply for scholarship" → Income verification, platform pays if approved
    ↓
Check ordered → 3rd party (Checkr, GoodHire, etc.)
    ↓
Results back (pass/fail/review needed)
    ↓
Badge issued (temporary for org-specific, 1 year for portable)
    ↓
Volunteer can now register for role
```

---

## 3. Hour Verification & Variance Rules

### 3.1 How Hours Are Logged

**Org Specifies Hours When Creating Opportunity:**
```
Opportunity: "Community Cleanup Day"
├─ Date: March 15, 2026
├─ Expected Duration: 4 hours
├─ Shift Times: 9am - 1pm
└─ Hours Policy: "Fixed" or "Flexible"
```

**When Volunteer Registers & Attends:**
1. Volunteer checks in (QR code or manual)
2. Volunteer checks out (after event)
3. Hours automatically logged

### 3.2 The 20% + Smart Variance Rule

**Default Behavior:**

Volunteers can claim up to **120% of expected hours** without org pre-approval.

```
Expected: 4 hours
├─ Can claim automatically: 4.0 - 4.8 hours (20% variance)
└─ If claimed: Goes to "Pending Verification"

Claimed: 5.2 hours (30%)
├─ Exceeds 20% variance
├─ Status: "Requires Approval"
└─ Org must approve before auto-verify
```

**Smart Threshold:**

Trigger manual review if **either**:
- Overage is >20% of scheduled hours, **OR**
- Overage is >4 total hours absolute

```
Short Task (4 hours):
├─ 20% of 4h = 0.8h
├─ Trigger threshold = 20% OR 4h (whichever is lower)
├─ = 0.8h → Variance cap: 4.8 hours
└─ Example: Claiming 5.5h requires approval

Long Task (40 hours):
├─ 20% of 40h = 8h
├─ Trigger threshold = 20% OR 4h (whichever is lower)
├─ = 4h → Variance cap: 44 hours
└─ Example: Claiming 50h requires approval (but 47h doesn't)
```

### 3.3 Open-Ended Tasks

If opportunity has `hours_policy: "OPEN_ENDED"`:

```
Volunteer can log ANY hours they worked
    ↓
Status: "Pending Verification" (always)
    ↓
Org must verify in weekly digest or via notification
```

### 3.4 Post-Hoc Justification & Weekly Digest

**Volunteer's Responsibility:**
- If claiming hours > 120% of scheduled, must provide justification
- Examples: "Stayed late to finish project," "Ran training session (longer than expected)"
- Free-text field + optional photo/attachment

**Org's Responsibility:**
- Weekly "Pending Hours Digest" email
- Shows all hours in "Pending" state from past 7 days
- Bulk actions: Approve All, Reject All, or review individually
- If org doesn't act within 7 days → hours auto-verify (unless flagged by fraud detection)

---

## 4. Fraud Detection & Escalation

### 4.1 Fraud Detection Triggers

The system monitors for suspicious patterns:

| Pattern | Threshold | Action |
|---------|-----------|--------|
| Org approval rate | >95% (suspiciously lenient) | FLAG & INVESTIGATE |
| Org dispute rate | >10% (too many disputes) | FLAG & INVESTIGATE |
| Volunteer overage rate | >3 instances in 1 month claiming >120% | FLAG & REVIEW |
| New org high volume | New org + >20 hrs logged in first week | FLAG & REVIEW |
| Single-day extreme | Volunteer claims >12 hours in single day | FLAG & REVIEW |
| Squad mismatch | Squad leader hours ≠ individual volunteer hours | FLAG & ESCALATE |
| Check-in variance | >2 hour gap between earliest & latest check-in for same event | FLAG & REVIEW |

### 4.2 Escalation Path: Peer → Admin

When a flagged entry is detected:

```
STEP 1: SQUAD LEADER NOTIFICATION (if applicable)
├─ Squad Leader gets notification: "Please verify participation"
├─ Context: Event details, volunteer names, hours claimed
├─ Actions: "Valid" or "Suspicious"
├─ Timeline: Must respond within 48 hours
└─ If no response → escalate to admin

STEP 2: ADMIN REVIEW (if escalated or marked suspicious)
├─ Admin reviews evidence:
│  ├─ Event check-in log
│  ├─ Volunteer history with org
│  ├─ Org's verification pattern
│  └─ Squad leader's decision (if provided)
├─ Actions: Approve, Reject, Request More Info, Suspend Entry
└─ Timeline: 3-5 business days

STEP 3: NOTIFICATION & APPEAL
├─ If rejected: Volunteer notified with reason + appeal option
├─ If approved: Auto-verified as GOLD or PLATINUM tier
└─ Appeal available for 14 days
```

### 4.3 Verification Tiers

```
SILVER VERIFIED
├─ Method: Third-party email confirmation (historical hours import)
├─ Trust Level: High
└─ Used for: Importing pre-platform volunteer history

GOLD VERIFIED
├─ Method: QR/GPS check-in + org approval (passive or active)
├─ Trust Level: Highest (platform-tracked)
└─ Used for: Standard platform volunteering

PLATINUM VERIFIED
├─ Method: Gold verification + Squad Leader confirmation
├─ Trust Level: Maximum (dual-verified)
└─ Used for: Corporate/school group volunteering with dual oversight
```

---

## 5. Appeals Process

### 5.1 Appeal Timeline & Eligibility

**Appeal Window:** 14 days from decision (rejection, suspension, or disputed hours)

**Why 14 days?**
- Accounts for two full weekends (volunteers are often weekend warriors)
- Industry standard across volunteer platforms
- After 14 days, records lock for Annual Impact Report (immutable for reporting)

### 5.2 Appeals by User Type

**VOLUNTEER APPEALS:**

Scenario: Hours rejected/disputed

```
Reason for Appeal          | Required Evidence          | Outcome Timeline
---------------------------|---------------------------|------------------
"I was there, no-show      | Photos, check-in proof,   | 5 business days
was wrong"                 | witness contact info      |
                           |                           |
"Org claimed fraud but     | Event details, messages   | 5 business days
I completed the work"      | with org, photo proof     |
                           |                           |
"Profile was suspended"    | Explanation of context,   | 3-5 business days
                           | any correcting info       |
```

**ORGANIZATION APPEALS:**

Scenario: Org marked unverified or suspended

```
Reason for Appeal          | Required Evidence          | Outcome Timeline
---------------------------|---------------------------|------------------
"Verification docs were    | Resubmit docs,            | 5 business days
incomplete or lost"        | improved evidence         |
                           |                           |
"We're suspended for high  | Context on disputes,      | 5-7 business days
disputes but legit"        | volunteer testimony       |
                           |                           |
"New org flagged for high  | Event documentation,      | 5-7 business days
volume - we're legitimate" | volunteer feedback        |
```

### 5.3 Appeal Decision Outcomes

1. **Overturn** - Original decision reversed, record updated, notification sent
2. **Uphold** - Original decision upheld, limited appeal recourse
3. **Partial** - Nuanced decision (e.g., "50% of hours approved, 50% rejected")
4. **Request More Info** - Still unclear, ask for specific additional evidence

---

## 6. Database Schema (Drizzle ORM)

### 6.1 Organization Verification

```typescript
// Enhanced organizations table with verification fields
export const organizations = pgTable(
  'organizations',
  {
    id: uuid('id').primaryKey().defaultRandom(),

    // ... existing fields ...

    // Verification fields
    verification_status: varchar('verification_status', { length: 20 })
      .default('PENDING_SUBMISSION')
      .notNull(),
      // PENDING_SUBMISSION, UNDER_REVIEW, VERIFIED, REJECTED, FLAGGED, SUSPENDED

    verification_tier: varchar('verification_tier', { length: 50 }),
      // NONPROFIT_501C3, GOVERNMENT, CORPORATE, COMMUNITY_GROUP, INTERNATIONAL_NONPROFIT

    verified_by: uuid('verified_by').references(() => users.id),
      // Admin who verified

    verified_at: timestamp('verified_at'),
      // When verified

    verification_docs: jsonb('verification_docs'),
      // {
      //   "urls": ["s3://..."],
      //   "types": ["formation_docs", "501c3_letter"],
      //   "submitted_at": "2026-01-04T10:00:00Z",
      //   "last_updated": "2026-01-04T12:00:00Z"
      // }

    verification_score: real('verification_score').default(50),
      // 0-100: Based on dispute rate, approval rate, volunteer feedback
      // Formula: (approval_fairness * 0.5) + (volunteer_satisfaction * 0.3) + (compliance_history * 0.2)

    suspension_reason: text('suspension_reason'),
      // Why org was suspended

    suspension_flagged_at: timestamp('suspension_flagged_at'),
    suspension_appealed_at: timestamp('suspension_appealed_at'),
  },
  (table) => ({
    verification_status_idx: index('idx_org_verification_status').on(table.verification_status),
    verification_score_idx: index('idx_org_verification_score').on(table.verification_score),
  })
);

// Organization Verification History
export const org_verification_history = pgTable(
  'org_verification_history',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    org_id: uuid('org_id')
      .notNull()
      .references(() => organizations.id, { onDelete: 'cascade' }),

    old_status: varchar('old_status', { length: 20 }),
    new_status: varchar('new_status', { length: 20 }),

    reason: text('reason'),
      // Why status changed

    changed_by: uuid('changed_by').references(() => users.id),
      // Admin who made change

    changed_at: timestamp('changed_at').defaultNow(),

    metadata: jsonb('metadata'),
      // {
      //   "appeal_id": "...",
      //   "flagged_reason": "...",
      //   "evidence_reviewed": ["...urls..."]
      // }
  },
  (table) => ({
    org_history_idx: index('idx_org_history_changes').on(table.org_id, table.changed_at),
  })
);
```

### 6.2 Hour Verification & Variance

```typescript
// Enhanced impact_ledger table
export const impact_ledger = pgTable(
  'impact_ledger',
  {
    id: uuid('id').primaryKey().defaultRandom(),

    // ... existing fields ...

    // Hour variance tracking
    expected_hours: real('expected_hours'),
      // Hours org specified when creating opportunity

    claimed_hours: real('claimed_hours'),
      // Hours volunteer claimed (may differ from actual_hours due to variance)

    actual_hours: real('actual_hours'),
      // Computed from check_in/check_out times

    variance_percent: real('variance_percent'),
      // ((actual_hours - expected_hours) / expected_hours) * 100

    variance_justification: text('variance_justification'),
      // Volunteer's explanation if claimed > 120% of expected

    variance_attachment_urls: varchar('variance_attachment_urls', { length: 500 }).array(),
      // Photo/doc evidence for variance

    // Verification info
    verification_method: varchar('verification_method', { length: 20 }),
      // QR, GPS, MANUAL_CHECKIN, HISTORICAL, SQUAD_VERIFIED

    verification_tier: varchar('verification_tier', { length: 20 }),
      // SILVER, GOLD, PLATINUM

    requires_org_approval: boolean('requires_org_approval').default(false),
      // True if claimed > 120% of expected hours

    org_approval_deadline: timestamp('org_approval_deadline'),
      // 7 days after pending status

    org_approved_by: uuid('org_approved_by').references(() => users.id),
    org_approval_comment: text('org_approval_comment'),

    // Fraud tracking
    fraud_flagged: boolean('fraud_flagged').default(false),
    fraud_flag_reason: text('fraud_flag_reason'),

    fraud_investigation_status: varchar('fraud_investigation_status', { length: 20 }),
      // PENDING, UNDER_REVIEW, CLEARED, REJECTED

    // Squad verification
    squad_leader_id: uuid('squad_leader_id').references(() => users.id),
    squad_leader_verified: boolean('squad_leader_verified'),
    squad_leader_verified_at: timestamp('squad_leader_verified_at'),
  },
  (table) => ({
    required_approval_idx: index('idx_impact_requires_approval').on(table.requires_org_approval),
    fraud_flagged_idx: index('idx_impact_fraud_flagged').on(table.fraud_flagged),
    fraud_status_idx: index('idx_impact_fraud_status').on(table.fraud_investigation_status),
  })
);

// Fraud Flags & Investigations
export const fraud_flags = pgTable(
  'fraud_flags',
  {
    id: uuid('id').primaryKey().defaultRandom(),

    impact_ledger_id: uuid('impact_ledger_id')
      .notNull()
      .references(() => impact_ledger.id, { onDelete: 'cascade' }),
    org_id: uuid('org_id').references(() => organizations.id),
    user_id: uuid('user_id').references(() => users.id),

    flag_type: varchar('flag_type', { length: 50 }),
      // ORG_APPROVAL_RATE, ORG_DISPUTE_RATE, VOLUNTEER_OVERAGE, NEW_ORG_VOLUME,
      // SINGLE_DAY_EXTREME, SQUAD_MISMATCH, CHECKIN_VARIANCE

    flag_severity: varchar('flag_severity', { length: 20 }),
      // LOW, MEDIUM, HIGH, CRITICAL

    description: text('description'),
    flagged_at: timestamp('flagged_at').defaultNow(),

    investigation_status: varchar('investigation_status', { length: 20 })
      .default('PENDING')
      .notNull(),
      // PENDING, UNDER_REVIEW, CLEARED, REJECTED

    investigated_by: uuid('investigated_by').references(() => users.id),
    investigated_at: timestamp('investigated_at'),

    investigation_notes: text('investigation_notes'),
    metadata: jsonb('metadata'),
  },
  (table) => ({
    impact_idx: index('idx_fraud_flags_impact').on(table.impact_ledger_id),
    org_severity_idx: index('idx_fraud_flags_org_severity').on(table.org_id, table.flag_severity),
    user_severity_idx: index('idx_fraud_flags_user_severity').on(table.user_id, table.flag_severity),
    status_idx: index('idx_fraud_flags_status').on(table.investigation_status),
  })
);
```

### 6.3 Appeals

```typescript
// Appeals for users & organizations
export const appeals = pgTable(
  'appeals',
  {
    id: uuid('id').primaryKey().defaultRandom(),

    appeal_type: varchar('appeal_type', { length: 20 }).notNull(),
      // HOURS_DISPUTED, HOURS_REJECTED, ORG_UNVERIFIED, ORG_SUSPENDED, PROFILE_SUSPENDED

    appealable_entity_type: varchar('appealable_entity_type', { length: 20 }).notNull(),
      // USER or ORGANIZATION

    appealable_entity_id: uuid('appealable_entity_id').notNull(),
      // References either user_id or org_id

    related_impact_ledger_id: uuid('related_impact_ledger_id').references(
      () => impact_ledger.id
    ),
      // If hours-related appeal

    related_org_id: uuid('related_org_id').references(() => organizations.id),
      // If org verification appeal

    reason_for_appeal: text('reason_for_appeal').notNull(),
    supporting_evidence_urls: varchar('supporting_evidence_urls', { length: 500 }).array(),

    submitted_at: timestamp('submitted_at').defaultNow(),
    submission_deadline: timestamp('submission_deadline'),
      // 14 days from original decision

    decision: varchar('decision', { length: 20 }).default('PENDING'),
      // PENDING, APPROVED (overturn), REJECTED (uphold), PARTIAL, REQUESTING_INFO

    decision_reason: text('decision_reason'),
    decided_by: uuid('decided_by').references(() => users.id),
    decided_at: timestamp('decided_at'),

    metadata: jsonb('metadata'),
  },
  (table) => ({
    entity_idx: index('idx_appeals_entity').on(table.appealable_entity_type, table.appealable_entity_id),
    status_idx: index('idx_appeals_decision').on(table.decision),
    deadline_idx: index('idx_appeals_deadline').on(table.submission_deadline),
  })
);
```

### 6.4 Background Checks

```typescript
// Background Checks for volunteers
export const background_checks = pgTable(
  'background_checks',
  {
    id: uuid('id').primaryKey().defaultRandom(),

    user_id: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    org_id: uuid('org_id').references(() => organizations.id),
      // Null if volunteer-purchased portable check

    opportunity_id: uuid('opportunity_id').references(() => opportunities.id),
      // Which opportunity/role required check

    check_type: varchar('check_type', { length: 20 }),
      // ORG_SPECIFIC (org pays), PORTABLE (volunteer pays), SCHOLARSHIP (platform pays)

    status: varchar('status', { length: 20 }),
      // PENDING, PROCESSING, COMPLETED, FAILED, EXPIRED

    result: varchar('result', { length: 20 }),
      // PASS, FAIL, REVIEW_NEEDED

    third_party_provider: varchar('third_party_provider', { length: 50 }),
      // Checkr, GoodHire, etc.

    third_party_check_id: varchar('third_party_check_id', { length: 255 }),
      // For tracking/reconciliation

    ordered_by: uuid('ordered_by').references(() => users.id),
      // Who initiated (user, org admin, or platform for scholarship)

    ordered_at: timestamp('ordered_at').defaultNow(),
    completed_at: timestamp('completed_at'),

    valid_until: timestamp('valid_until'),
      // For portable checks: 1 year from completion

    cost_amount: decimal('cost_amount', { precision: 10, scale: 2 }),
    cost_paid_by: varchar('cost_paid_by', { length: 20 }),
      // ORGANIZATION, VOLUNTEER, PLATFORM

    notes: text('notes'),
  },
  (table) => ({
    user_valid_idx: index('idx_bg_check_user_valid').on(table.user_id, table.valid_until),
    opportunity_idx: index('idx_bg_check_opportunity').on(table.opportunity_id),
    status_idx: index('idx_bg_check_status').on(table.status),
  })
);
```

---

## 7. Implementation Timeline

### Phase 1: Organization Verification (Weeks 1-2)
- [ ] Build org verification UI (docs upload)
- [ ] Integrate IRS EIN lookup API
- [ ] Implement manual review workflow for admins
- [ ] Create org verification history table
- [ ] Deploy org-level gating (unverified orgs can't post)

### Phase 2: Hour Variance & Smart Thresholds (Weeks 3-4)
- [ ] Enhance `impact_ledger` schema
- [ ] Implement 20% + 4 hour smart threshold
- [ ] Build weekly digest email for orgs
- [ ] Auto-verify after 7 days if no action
- [ ] Create variance justification UI

### Phase 3: Fraud Detection & Escalation (Weeks 5-6)
- [ ] Build fraud flag trigger system
- [ ] Implement Squad Leader notification path
- [ ] Create admin investigation dashboard
- [ ] Implement dual-verification rules
- [ ] Create fraud_flags table and monitoring

### Phase 4: Appeals Process (Weeks 7-8)
- [ ] Build appeals submission UI (user & org)
- [ ] Create admin appeals review dashboard
- [ ] Implement 14-day timer + "Stale Rule"
- [ ] Deploy notification system for appeals
- [ ] Create appeals audit trail

### Phase 5: Background Checks (Weeks 9-10)
- [ ] Integrate 3rd party background check provider (Checkr/GoodHire)
- [ ] Build check ordering flow (org vs volunteer vs platform)
- [ ] Implement portable 1-year badge system
- [ ] Create scholarship verification process
- [ ] Implement check status tracking

### Phase 6: User Profile Trust Scoring (Weeks 11-12)
- [ ] Build `verification_score` calculation
- [ ] Display trust badges on user profiles
- [ ] Implement profile completion incentives
- [ ] Create user-facing verification dashboard

---

## Key Metrics to Monitor

```
Verification Health Dashboard
├─ Org approval rate (target: <90%)
├─ Org dispute rate (alert if >10%)
├─ Volunteer overage rate (track trends)
├─ Average time to verify hours (target: <48h)
├─ Appeal approval rate (should be <5% of decisions)
├─ Background check completion rate
└─ Fraud detection accuracy (false positive rate)

Monthly Reports
├─ # orgs verified
├─ # hours auto-verified vs manual
├─ # fraudulent entries detected & prevented
├─ # appeals submitted & outcomes
└─ # volunteers with portable background checks
```

---

## Next Steps

1. **Schema Implementation**: Add these tables to Prisma schema
2. **API Endpoints**: Build verification, appeal, and fraud investigation endpoints
3. **Admin Dashboard**: Create admin UI for reviewing submissions, appeals, flags
4. **Notifications**: Set up email/SMS for org digests, appeal decisions, fraud investigations
5. **3rd Party Integrations**: Configure IRS lookup, background check providers
