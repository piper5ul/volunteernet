# VolunteerNet: 5-Week Implementation Roadmap

**Timeline:** 5+ weeks to MVP-ready demo
**Goal:** Complete marketplace loop + trust + grant reporting

---

## Sprint 0: Foundation (Days 1-3)

### Database Schema Updates

Before building any UI, add these tables/fields to Drizzle schema:

**1. Opportunity Creation & Management**
```typescript
// Add to opportunities table
created_by UUID (who created this opp)
status VARCHAR ('DRAFT', 'PUBLISHED', 'CLOSED', 'CANCELLED')
expected_hours FLOAT
hours_policy VARCHAR ('FIXED', 'FLEXIBLE', 'OPEN_ENDED')
skill_requirements JSONB [{skill: string, required: boolean}]
experience_required INT (minimum hours needed)
```

**2. Registration & Check-in**
```typescript
// New table: registrations (already exists, just ensure these fields)
status VARCHAR ('REGISTERED', 'CONFIRMED', 'NO_SHOW', 'COMPLETED')
checked_in_at TIMESTAMP
checked_out_at TIMESTAMP

// New table: check_in_logs
id UUID
registration_id UUID
volunteer_id UUID
event_id UUID
checked_in_at TIMESTAMP
checked_out_at TIMESTAMP
verification_method VARCHAR ('QR', 'PIN', 'MANUAL')
```

**3. Hour Claiming**
```typescript
// Add to impact_ledger (already designed in VERIFICATION-AND-TRUST-FRAMEWORK.md)
expected_hours FLOAT
claimed_hours FLOAT
actual_hours FLOAT (computed from check_in/out)
variance_percent FLOAT
variance_justification TEXT
variance_attachment_urls JSONB
status VARCHAR ('PENDING', 'VERIFIED', 'DISPUTED')
```

**4. Volunteer Matching Scores**
```typescript
// New table: volunteer_matches
id UUID
opportunity_id UUID
volunteer_id UUID
match_score FLOAT (0-100)
skill_match FLOAT
availability_match FLOAT
experience_match FLOAT
location_match FLOAT
reliability_match FLOAT
created_at TIMESTAMP
```

**Action:** Create Drizzle migration with all above fields/tables

---

## Week 1: Marketplace Core (Days 4-12)

### Sprint 1A: Opportunity Creation (Days 4-6)

**Build:** `/app/org/opportunities/create/page.tsx`

What the form needs:
```
Title (required)
Description (markdown editor)
Cause category (select from causes table)
Skills required (multi-select with required/preferred)
Experience required (minimum hours)
Date & time (date picker + time range)
Location (address input OR "Virtual" toggle)
Expected hours (float)
Hours policy (dropdown: Fixed / Flexible / Open-Ended)
Capacity (how many volunteers needed)
Age restrictions (18+, etc.)
Background check required? (checkbox)

[Save as Draft] [Publish]
```

**API needed:** `createOpportunity` TRPC mutation
- Validate all fields
- Set `status: 'PUBLISHED'` if publish clicked
- Return opportunity ID

**Dependencies:** None (can be done first)

---

### Sprint 1B: Matching Algorithm (Days 7-9)

**Build:** `/app/org/dashboard/matching/[oppId]/page.tsx`

When org posts an opportunity, show:
```
Opportunity: "Community Garden - Carpenters"

Recommended Volunteers:
[Table with columns:]
- Rank (1-5)
- Name
- Match % (85%, 82%, etc.)
- Skills (Carpentry ✓, Leadership ✓)
- Experience (25 hrs)
- Location (2mi away)
- Rating (4.8★)
- Last activity (3 weeks ago)
- [Invite Button]

[Bulk actions:]
[Invite All] [Invite Top 3]
```

**Algorithm (simple scoring):**
```typescript
matchScore = (
  (hasSkills ? 1.0 : 0.0) * 0.25 +
  (isAvailable ? 1.0 : 0.5) * 0.25 +
  (min(volunteerHours / requiredHours, 1.0)) * 0.15 +
  (volunteerRating / 5.0) * 0.15 +
  (1.0 - (distance / 50)) * 0.10 +
  (volunteerShowUpRate / 100) * 0.10
) * 100
```

**API needed:**
- `getMatchedVolunteers(opportunityId)` TRPC query
- `inviteVolunteer(volunteerId, opportunityId)` mutation
- `inviteMultiple(volunteerIds[], opportunityId)` mutation

**Dependencies:** Opportunity must exist + volunteer profiles need skills/availability

---

### Sprint 1C: Check-in/Check-out Flow (Days 10-12)

**Build:** `/app/check-in/[eventId]/page.tsx`

Flow:
```
[QR Code Scanner UI]
"Point your camera at the event QR code"
OR
[Manual Entry]
"Enter 4-digit PIN: ____"

[Verified! ✓]
Sarah Chen
Carpenter role
Community Garden Rebuild
March 15, 9am-1pm

[Check-out button appears at event end time, or after 2 hours]

[Check Out] (calculates hours from check-in/out time)
Hours logged: 4.0
Status: Pending verification
```

**Requirements:**
- QR code scanner (use `qrcode.react` library)
- Manual PIN fallback
- Display event details
- Show check-out button at event end time
- Calculate hours from timestamps
- Create check_in_log entry
- Trigger registration `checked_in_at` and `checked_out_at` update

**API needed:**
- `checkInVolunteer(registrationId, qrData OR pin)` mutation
- `checkOutVolunteer(registrationId)` mutation (auto-calculates hours)
- `getEventDetails(eventId)` query

**Dependencies:** Registration must exist

---

## Week 2: Hour Claiming & Verification (Days 13-19)

### Sprint 2A: Hour Claim Form (Days 13-15)

**Build:** `/app/claim/[registrationId]/page.tsx`

Flow after volunteer checks out:
```
Event: Community Garden - Carpenters
Expected hours: 4.0
You logged: 4.0

[Autofilled]

Your hours match the expected time. ✓
[Confirm & Claim Hours]

---OR---

Expected hours: 4.0
You logged: 4.7 (17% more than expected)

Your claim is within 20% variance. ✓
[Claim automatically]

---OR---

Expected hours: 4.0
You logged: 5.3 (32% more than expected)

This exceeds our 20% variance.
Why did you work more than expected?

[Textarea] I arrived early to help setup and stayed late to clean.
[File upload] (optional photo evidence)

[Submit for verification]
Status: Pending org approval
```

**Logic:**
- If within 120% of expected: Auto-approve button
- If >120%: Show justification form
- On submit: Create impact_ledger entry with `status: 'PENDING'`, set org_approval_deadline to 7 days

**API needed:**
- `claimHours(registrationId, claimedHours, justification?, attachments?)` mutation
- Creates impact_ledger entry
- Sets org_approval_deadline = now + 7 days

**Dependencies:** Check-out must have happened

---

### Sprint 2B: Org Verification UI Improvements (Days 16-17)

**Enhance:** `/app/org/dashboard/verification/page.tsx`

Add:
```
Pending Verifications (from last 7 days):

[Card for each pending entry]
Sarah Chen claimed 4.2 hours for Community Garden
Expected: 4.0 hours (5% variance) ✓ Auto-approve eligible
Variance justification: "Arrived 15 min early to setup"

[Auto-approve] [Dispute] [More info]

Bulk actions:
[Select all] [Auto-approve selected] [Dispute selected]

Weekly digest summary:
Total pending: 12 hours across 5 volunteers
Auto-approvable: 9.5 hours (80%)
Requires review: 2.5 hours (20%)
```

**Enhancements:**
- Show variance percentage
- Highlight if auto-approvable
- Bulk actions for batch approval
- Auto-move to VERIFIED after 7 days (background job)

**API:** Already exists, just improve UI

---

### Sprint 2C: Volunteer Dashboard Real-time Updates (Days 18-19)

**Enhance:** `/app/dashboard/page.tsx`

Add:
```
Recent Activity Timeline:
- "5.2 hours verified" (linked to org, date, badge)
- "Endorsed for Carpentry by Habitat for Humanity"
- "Reached 50-hour milestone!"

Impact Stats (real-time):
- Total hours: 47.2 (updated from 42 after claim)
- This month: 12.3 hours
- Verified: 45 hours

Badges earned:
- "25-hour volunteer" ✓
- "Community Builder" (20+ events) ✓
```

**Enhancements:**
- Refresh impact stats after hour claim
- Show recent activity in timeline
- Display earned badges
- Link to detailed impact page

---

## Week 3: Trust & Operations (Days 20-26)

### Sprint 3A: Organization Public Page (Days 20-22)

**Build:** `/app/org/[orgId]/page.tsx`

Show:
```
[Org logo]
Organization Name
✓ Verified nonprofit (badge)

Mission statement
Location: San Francisco, CA
Website: example.org
Followers: 234

Stats:
- 145 volunteers
- 1,200 hours logged
- 4.7★ average rating

Tabs:
1. Opportunities (upcoming + open)
2. Volunteers (count, top volunteers)
3. Impact (total hours, causes, trends)
4. Reviews (volunteer testimonials)

Upcoming opportunities:
[Grid of opportunity cards]

Top volunteers:
[List showing name, hours, skills]
```

**API needed:**
- `getOrgDetails(orgId)` query
- `getOrgOpportunities(orgId)` query
- `getOrgVolunteers(orgId)` query
- `getOrgReviews(orgId)` query

---

### Sprint 3B: Grant Reporting Dashboard (Days 23-25)

**Build/Enhance:** `/app/org/dashboard/reports/page.tsx`

Show:
```
Grant Impact Report Generator

Date range: [Start] [End]
Cause filter: [All] [Select causes]

IMPACT REPORT
============

Total volunteer hours: 1,245
Economic value: $37,350 (@ $30/hr avg)

Breakdown by cause:
├─ Community Building: 450 hours
├─ Environmental: 350 hours
└─ Education: 445 hours

Volunteer statistics:
├─ Unique volunteers: 145
├─ Repeat volunteers: 89 (61%)
├─ Average hours per volunteer: 8.6

Top skills contributed:
├─ Carpentry: 200 hours
├─ Project management: 180 hours
└─ Teaching: 150 hours

For grant applications:
"In [date range], 145 verified volunteers contributed 1,245 verified hours
to our organization, representing $37,350 in economic value."

[Export as PDF] [Export as CSV]
```

**Logic:**
- Sum all verified impact_ledger entries
- Group by cause, skill, volunteer
- Calculate economic value (use US Sector average = $30/hr)
- Generate formatted PDF for grants

**API needed:**
- `generateGrantReport(orgId, startDate, endDate, causeFilter)` query
- `exportReportPDF(reportData)` function
- `exportReportCSV(reportData)` function

---

### Sprint 3C: Org Settings Page (Days 26)

**Build:** `/app/org/settings/page.tsx`

Allow editing:
```
Organization Profile

[Logo upload]
Organization name: [text field]
Website: [url field]
Location: [address + map selector]
Mission: [textarea]

Team members:
[Add team member]
[List with role/email, remove button]

Preferences:
[ ] Allow team members to post opportunities
[ ] Require background checks for all volunteers
[ ] Send weekly verification digest

Settings are auto-saved.
```

**API needed:**
- `updateOrgProfile(orgId, data)` mutation
- `addTeamMember(orgId, email, role)` mutation
- `removeTeamMember(orgId, userId)` mutation

---

## Week 4: Volunteer Retention & Polish (Days 27-33)

### Sprint 4A: Impact Resume/Export (Days 27-29)

**Build:** `/app/profile/[username]/impact/page.tsx`

Show:
```
[Volunteer name]
"My Impact"

Total hours: 47.2 verified ✓
Events attended: 12
Organizations: 4

Download impact resume:
[PDF Download] [Share link] [LinkedIn sync]

PDF shows:
---
[Volunteer name]
Volunteer Impact Summary

Total verified hours: 47.2
Verification tier: Gold (Platform-verified)
Organizations served: 4

Hours by cause:
├─ Community: 20 hours
├─ Environment: 15 hours
└─ Education: 12.2 hours

Skills verified:
✓ Project Management (endorsed by 2 orgs)
✓ Carpentry (endorsed by 1 org)
✓ Teaching (endorsed by 1 org)

Endorsements:
"Sarah is an amazing volunteer. Reliable, skilled, and passionate." - Org A
"Great addition to our team!" - Org B

Generated on: [date]
Platform: VolunteerNet
```

**API needed:**
- `generateImpactPDF(userId)` function
- `generateShareableLink(userId)` function
- `getVolunteerImpactSummary(userId)` query

---

### Sprint 4B: Volunteer Lifecycle Alerts (Days 30-31)

**For Orgs:** `/app/org/dashboard/volunteers/page.tsx` enhancement

Add alerts/recommendations:
```
Volunteer Health Dashboard

[Alert] Sarah hasn't volunteered in 3 weeks (unusual)
[Send re-engagement email]

Champions (5+ events):
Marcus - 8 events, 45 hours
Angela - 6 events, 38 hours
[Recognize with badge / message]

At risk (registered but no-showed >2x):
James - 3 registrations, 1 show
[Review before inviting again]
```

**Features:**
- Identify flight-risk volunteers
- Suggest re-engagement emails
- Highlight champions
- Flag chronic no-shows

**API needed:**
- `calculateVolunteerHealth(volunteerId, orgId)` query
- `sendReEngagementEmail(volunteerId, orgId)` mutation

---

### Sprint 4C: Badges & Gamification UI (Days 32-33)

**Enhance:** `/app/profile/[username]/page.tsx`

Add achievement display:
```
Achievements:

[🎖️] "25-hour Volunteer"
Earned after 25 verified hours

[🌱] "Rookie"
Earned after 1st event

[🏆] "Community Builder"
Earned after 20+ events

[🌍] "Environmental Champion"
Earned 50+ hours in environment category

[Share on LinkedIn] [Twitter]
```

**Gamification elements:**
- Auto-award badges based on milestones
- Make badges shareable
- Show on profile prominently

---

## Week 5: Testing & Launch Prep (Days 34-40)

### Sprint 5A: End-to-End Testing (Days 34-36)

**Test the complete flow:**

1. **Org perspective:**
   - [ ] Create org account
   - [ ] Complete org profile
   - [ ] Create opportunity
   - [ ] See matching recommendations
   - [ ] Invite volunteers
   - [ ] See registrations
   - [ ] Verify hours post-event
   - [ ] Export grant report

2. **Volunteer perspective:**
   - [ ] Create volunteer account
   - [ ] Complete profile with skills
   - [ ] Discover opportunities
   - [ ] Register for event
   - [ ] Receive event reminder
   - [ ] Check-in at event
   - [ ] Check-out and claim hours
   - [ ] See hours on dashboard
   - [ ] Download impact resume

3. **Admin perspective:**
   - [ ] Verify organizations
   - [ ] Review fraud flags
   - [ ] Resolve disputes

**Bug fixes & polish based on testing results**

---

### Sprint 5B: Demo Preparation (Days 37-39)

**Create demo data:**
- [ ] 3-4 realistic organizations
- [ ] 15-20 volunteer profiles with varied skills
- [ ] 5-6 opportunities across different causes
- [ ] Some completed events with logged hours
- [ ] Some pending verifications
- [ ] Some dispute examples

**Script the demo flow:**
1. Show org discovering volunteers (matching algorithm)
2. Show org creating opportunity + inviting matches
3. Show volunteer discovering and registering
4. Show check-in/check-out
5. Show hour verification
6. Show volunteer impact dashboard
7. Show grant report export

**Create investor talking points:**
- "20-30% of applicants are typically bad fits. Our algorithm fixes that."
- "Orgs spend 20 hours/month screening. We save them that time."
- "Volunteers get verified portable credentials. They won't leave."
- "Orgs get one-click grant reporting. That's $10k/year saved."

---

### Sprint 5C: Launch Polish (Days 40+)

- [ ] Performance optimization (lazy loading, pagination)
- [ ] Mobile responsiveness check
- [ ] Error handling improvements
- [ ] Loading states + skeletons
- [ ] Accessibility review (ARIA labels, keyboard nav)
- [ ] Analytics setup (track key actions)

---

## Build Dependency Map

```
Foundation (Week 0)
    ↓
Sprint 1A: Create Opportunity
    ↓
Sprint 1B: Matching Algorithm ← Depends on 1A
    ↓
Sprint 1C: Check-in/Check-out ← Depends on registrations
    ↓
Sprint 2A: Hour Claiming ← Depends on 1C
    ↓
Sprint 2B: Verification UI ← Depends on 2A
    ↓
Sprint 2C: Dashboard Updates ← Depends on 2A/2B
    ↓
Sprint 3A: Org Public Page ← No dependencies
    ↓
Sprint 3B: Grant Reporting ← Depends on verified hours (2A/2B)
    ↓
Sprint 3C: Org Settings ← No dependencies
    ↓
Sprint 4A: Impact Resume ← Depends on 2A
    ↓
Sprint 4B: Lifecycle Alerts ← Depends on volunteer data
    ↓
Sprint 4C: Badges ← Depends on hour data
    ↓
Sprint 5: Testing & Launch
```

**Recommended parallelization:**
- While building Sprint 1A (opportunity creation): Database setup
- While building Sprint 1B (matching): Can build Sprint 3A/3C in parallel
- While building Sprint 2: Can build Sprint 3B/4 in parallel

---

## Success Metrics by Week

### Week 1 End Goal
Orgs can create opportunities and see matched volunteers. Volunteers can register.

**Demo capability:** "Here's how we match the right volunteers"

---

### Week 2 End Goal
Full marketplace transaction works: register → check-in → claim hours → verify

**Demo capability:** "Watch the entire transaction from registration to verified hours"

---

### Week 3 End Goal
Org operations features working. Grant reporting available.

**Demo capability:** "Org gets one-click grant report showing $37k in volunteer value"

---

### Week 4 End Goal
Volunteer retention levers active. Badges, impact resume, lifecycle alerts.

**Demo capability:** "Volunteer can download portable impact resume with verified hours"

---

### Week 5 End Goal
Polish complete. End-to-end flow bulletproof. Demo-ready.

**Demo capability:** "Complete investor walkthrough without bugs"

---

## Risk Mitigation

| Risk | Mitigation |
|------|-----------|
| QR code scanner complexity | Use simple PIN fallback for demo |
| PDF generation complexity | Start with JSON export, add PDF later |
| Database migration delays | Test migrations in dev first |
| Matching algorithm accuracy | Use simple scoring first, improve with data |
| Check-in timestamp edge cases | Mock time if needed for demo |

---

## What to Mock vs. Build

### Build (Real)
- Opportunity creation
- Matching algorithm
- Check-in/check-out
- Hour verification
- Grant reporting
- Org public page

### Mock (For Demo)
- Background check provider API (fake data)
- Email sending (show "Email sent" toast)
- Corporate CSR integrations (screenshots only)
- Emergency mobilization (future roadmap slide)

---

## Estimated Team Size & Roles

**Optimal:**
- 2-3 full-stack engineers (frontend + API)
- 1 product/design person (UX, demo prep)
- You (oversight + investor communication)

**Timeline assumes:** 2 solid engineers working full-time on this sprint plan

---

## Next Immediate Action

1. **Today:** Set up database migrations (Foundation sprint)
2. **Tomorrow:** Start Sprint 1A (opportunity creation form)
3. **By end of week:** Matching algorithm displaying
4. **By week 2:** Check-in/check-out working

Which sprints should we start with? Want to dive into the opportunity creation form code?
