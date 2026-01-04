# MVP Gap Analysis: What We Have vs. What We Need

**Status:** Action Plan | **Date:** 2026-01-04

Based on the marketplace-first understanding, here's what's been built and what's critically missing.

---

## Marketplace Fundamentals Checklist

### ✅ BUILT (Core Marketplace Flow)

| Component | Status | Details |
|-----------|--------|---------|
| **Opportunity Discovery** | ✅ Complete | `/discover/page.tsx` - search, filters, cause filters, list view, detail preview working |
| **Opportunity Detail** | ✅ Complete | `/discover/[id]/page.tsx` - full info, org card, description, requirements, volunteers tab |
| **Volunteer Registration** | ✅ Complete | In discover page - volunteers can click "Register" for opportunities |
| **Volunteer Profile** | ✅ Complete | `/profile/[username]/page.tsx` - shows hours, verified badge, skills, endorsements, badges |
| **Org Dashboard (Home)** | ✅ Complete | `/org/dashboard/page.tsx` - stats, pending verifications, upcoming events |
| **Volunteer CRM** | ✅ Complete | `/org/dashboard/volunteers/page.tsx` - volunteer list, filter, bulk email, approve/reject |
| **Analytics Dashboard** | ✅ Complete | `/org/dashboard/analytics/page.tsx` - hours chart, cause breakdown, top volunteers |
| **Verification Queue** | ✅ Complete | `/org/dashboard/verification/page.tsx` - approve/dispute hours with real mutations |

### ❌ MISSING (Critical for MVP Marketplace)

| Component | Why Critical | Expected Impact |
|-----------|--------------|-----------------|
| **Opportunity Posting/Creation** | Orgs can't create opportunities without it | Can't test marketplace supply |
| **Opportunity Editing** | Orgs need to update posted opportunities | Bad UX if mistakes happen |
| **Matching Algorithm Display** | Orgs need to see recommended volunteers | Lost efficiency + key differentiator |
| **Check-in/Check-out Flow** | Need to trigger hour logging | Can't verify work happened |
| **Hour Claim & Variance** | Volunteers need to claim work | No way to complete the transaction |
| **Post-Event Data Sync** | Hours need to flow to org verification | Disconnect between attendance and hours |
| **Org Settings/Profile Setup** | Orgs need to configure their profile | Can't complete onboarding |
| **Organization Public Page** | Volunteers need to see org info | No trust/credibility signals |
| **Opportunity Search by Org** | Volunteers need discovery by org name | Discovery UX incomplete |

---

## By User Journey

### **Volunteer Journey (What Works / What's Broken)**

```
1. Signup ✅
   └─ Persona selection working

2. Discover Opportunities ✅
   └─ Search, filter, see details working
   └─ MISSING: Search by organization name

3. View Org Profile ❌
   └─ Can see org from opportunity detail
   └─ MISSING: Full org page (`/org/[orgId]/page.tsx`)

4. Register for Opportunity ✅
   └─ Click register in discover page

5. Attend Event ❌
   └─ MISSING: Pre-event reminder email
   └─ MISSING: Location details/map

6. Check-in to Event ❌
   └─ STUBBED: `/check-in/[eventId]/page.tsx`
   └─ TODO: QR code scanning
   └─ TODO: Manual check-in

7. Log Hours ❌
   └─ MISSING: Post-event check-out
   └─ MISSING: Hour variance claim
   └─ MISSING: Justification form

8. See Impact on Dashboard ✅
   └─ `/dashboard/page.tsx` shows impact
   └─ MISSING: Real-time hour updates

9. Download Impact Resume ❌
   └─ MISSING: Export PDF with verified hours
   └─ MISSING: Shareable impact link
```

**Verdict:** Discovery works, but transaction is broken. Volunteers can browse but can't complete the action.

---

### **Organization Journey (What Works / What's Broken)**

```
1. Signup ✅
   └─ Persona selection working

2. Org Verification ✅
   └─ `/org/dashboard/verification/page.tsx` shows queue
   └─ Can approve/dispute with real mutations

3. Complete Org Profile ❌
   └─ STUBBED: `/org/settings/page.tsx`
   └─ MISSING: Edit org name, mission, logo, location
   └─ MISSING: Add team members

4. Create Opportunity ❌
   └─ MISSING: `/org/opportunities/create/page.tsx`
   └─ MISSING: Form for title, description, skills, date, hours
   └─ MISSING: Shift management

5. Post Opportunity ❌
   └─ Consequence of missing create flow

6. View Applications ✅
   └─ `/org/dashboard/volunteers/page.tsx` shows applications
   └─ Can approve/reject

7. Use Matching to Invite ❌
   └─ MISSING: Algorithm display showing top 5 matches
   └─ MISSING: "Invite these 3" bulk action

8. Check Event Attendees ❌
   └─ MISSING: Pre-event roster showing who RSVPed
   └─ MISSING: Real-time check-in tracking

9. Verify Volunteer Hours ✅
   └─ `/org/dashboard/verification/page.tsx` exists
   └─ Can approve/dispute

10. Access Grant Reports ❌
    └─ MISSING: `/org/dashboard/reports/page.tsx`
    └─ MISSING: Export verified hours with economic value
```

**Verdict:** Org can see volunteers but can't actively recruit them. Can verify hours but has no way to create opportunities.

---

## Feature Breakdown: What to Build Next

### **Tier 1: Absolutely Critical (Week 1-2)**

Must have to complete marketplace loop:

1. **Opportunity Creation Page** (`/org/opportunities/create`)
   - [ ] Form: title, description, cause, skills, experience required
   - [ ] Date/time picker
   - [ ] Location (address or virtual)
   - [ ] Expected hours
   - [ ] Save as draft / Publish
   - **Why:** Orgs can't post without this

2. **Opportunity Editing Page** (`/org/opportunities/[id]/edit`)
   - [ ] All fields from create
   - [ ] Publish/unpublish toggle
   - [ ] Capacity management
   - **Why:** Typos/changes need fixing

3. **Check-in/Check-out Flow** (`/check-in/[eventId]`)
   - [ ] QR code scanner (or fallback manual PIN)
   - [ ] Display event details
   - [ ] Confirm volunteer identity
   - [ ] Check-out at end (triggers hour logging)
   - **Why:** Only way to verify attendance

4. **Hour Claim & Variance** (`/claim/[opportunityId]`)
   - [ ] Show expected hours from opportunity
   - [ ] Allow claim up to 120%
   - [ ] Variance justification form
   - [ ] Photo/evidence upload
   - **Why:** Completes volunteer action

5. **Matching Algorithm Display** (`/org/dashboard/matching/[opportunityId]`)
   - [ ] Show top 5-10 volunteer matches
   - [ ] Match score breakdown
   - [ ] "Invite all" button
   - [ ] Send invitation notification
   - **Why:** Key competitive differentiator + efficiency

6. **Org Public Page** (`/org/[orgId]`)
   - [ ] Org name, logo, mission
   - [ ] Verification badge
   - [ ] Stats (volunteers, hours, rating)
   - [ ] Upcoming opportunities
   - [ ] Volunteer reviews
   - **Why:** Trust/credibility for volunteers

### **Tier 2: Makes Marketplace Work Better (Week 3-4)**

Improves experience but not absolutely blocking:

7. **Org Settings** (`/org/settings`)
   - [ ] Edit org profile (name, logo, mission, location)
   - [ ] Team member management
   - [ ] API keys (for enterprise later)
   - **Why:** Orgs need control

8. **Grant Reporting** (`/org/dashboard/reports`)
   - [ ] Hours by project/cause
   - [ ] Economic value calculation
   - [ ] PDF export
   - [ ] Date range selection
   - **Why:** Solves key org pain point

9. **Pre-Event Reminders**
   - [ ] Email 24h before: details, location, what to bring
   - [ ] In-app notification
   - [ ] Add to calendar (iCal)
   - **Why:** Reduces no-shows

10. **Impact Dashboard Enhancements**
    - [ ] Real-time hour updates after check-out
    - [ ] Downloadable impact resume (PDF)
    - [ ] Hours by cause breakdown
    - [ ] Shareable social link
    - **Why:** Volunteer retention

### **Tier 3: Polish & Retention (Week 5+)**

Nice-to-have, but increases stickiness:

11. **Org Volunteer Lifecycle Alerts**
    - [ ] "This volunteer hasn't logged hours in 3 weeks"
    - [ ] "Send re-engagement email"
    - [ ] Top volunteers recognition
    - **Why:** Increases retention

12. **Volunteer Endorsements UI**
    - [ ] Orgs can endorse volunteers for skills
    - [ ] Show on volunteer profile
    - [ ] "Add this skill" modal
    - **Why:** Drives engagement

13. **Micro-Credentials System**
    - [ ] Volunteer earns badges ("50 Hours," "Tech Mentor")
    - [ ] Shareable badge URL
    - [ ] LinkedIn sync (future)
    - **Why:** Intrinsic motivation

---

## Mapping Against Ecosystem Strategy

| Ecosystem Component | Status | Impact | Priority |
|-------------------|--------|--------|----------|
| **Marketplace Core** | 60% done | Without this, nothing else works | Tier 1 |
| **Verification/Trust** | 40% done | Partially working, needs hour sync | Tier 2 |
| **Org Operations** | 0% done | Reports, CRM, lifecycle features | Tier 2-3 |
| **Matching Algorithm** | 0% done | Biggest competitive advantage | Tier 1 |
| **Corporate Integration** | 0% done | Opens new revenue stream | Later |
| **Micro-Credentials** | 0% done | Volunteer retention lever | Tier 3 |

---

## The "MVP to Demo" Roadmap

### **Week 1-2: Complete Marketplace Loop**

If you're demoing in 2-3 weeks, focus here:

**Build:**
1. Opportunity creation form
2. Check-in/check-out flow
3. Hour claim with variance
4. Matching algorithm display
5. One-click "Invite top 5" action

**Result:** You can show:
- Org creates opportunity
- Algorithm recommends volunteers
- Org invites top 5
- Volunteers attend + check-in
- Hours auto-logged
- Org verifies hours

**This is the core story investors want to see.**

### **Week 3: Trust & Operations**

Add verification flow + reporting:

**Build:**
1. Org public page (trust signals)
2. Grant reporting dashboard
3. Hour verification UI improvements
4. Post-event impact dashboard

**Result:** Complete ecosystem story.

---

## Code Locations (What to Build)

### **NEW FILES NEEDED:**

```
/app/org/opportunities/create/page.tsx          → Opportunity creation form
/app/org/opportunities/[id]/edit/page.tsx       → Opportunity editing form
/app/org/dashboard/matching/[oppId]/page.tsx    → Matching algorithm display
/app/org/dashboard/reports/page.tsx             → Grant reporting (stub exists)
/app/org/[orgId]/page.tsx                       → Org public page (stub exists)
/app/org/settings/page.tsx                      → Org settings (stub exists)
/app/check-in/[eventId]/page.tsx                → Check-in flow (stub exists)
/app/claim/[token]/page.tsx                     → Hour claim form (stub exists)
/app/profile/[username]/impact/page.tsx         → Impact resume/export (new)
/app/discover/page.tsx                          → Enhancement: Add "by org" search
```

### **ENHANCE EXISTING FILES:**

```
/app/org/dashboard/verification/page.tsx        → Improve hour verification UX
/app/profile/[username]/page.tsx                → Add impact export, real-time updates
/app/org/opportunities/page.tsx                 → Add link to create new
/app/org/dashboard/volunteers/page.tsx          → Add "match volunteers" button
```

---

## Success Criteria for MVP

**Volunteer Perspective:**
- [ ] Can find opportunity by cause, location, date
- [ ] Can see organization details before registering
- [ ] Can register for opportunity
- [ ] Can check-in at event (with QR or PIN)
- [ ] Can claim hours (auto-logs within 20% variance)
- [ ] Can see hours on dashboard immediately after
- [ ] Can download "impact resume" with verified hours

**Organization Perspective:**
- [ ] Can create opportunity with all details
- [ ] Can see applicant volunteers with ratings/reviews
- [ ] Can see matching algorithm recommend top volunteers
- [ ] Can invite volunteers with one click
- [ ] Can see who's registered (roster)
- [ ] Can see real-time check-ins during event
- [ ] Can verify hours in 48-hour window
- [ ] Can export grant report with economic value

**Investor Perspective:**
- [ ] "You're solving real problem: only 20-30% of applicants are good fits"
- [ ] "Your algorithm fixes that"
- [ ] "Orgs pay because you save 20 hours/month in screening"
- [ ] "Volunteers stay because their work is verified + portable"
- [ ] "Network effects: more volunteers → better orgs → more volunteers"

---

## Estimated Build Time

| Component | Effort | Timeline |
|-----------|--------|----------|
| Opportunity create/edit | 2-3 days | Week 1 |
| Check-in/check-out | 2-3 days | Week 1 |
| Hour claim form | 1-2 days | Week 1 |
| Matching display | 2-3 days | Week 2 |
| Org public page | 1-2 days | Week 2 |
| Grant reporting | 2-3 days | Week 2-3 |
| Impact resume export | 1-2 days | Week 3 |
| Polish + testing | 3-5 days | Week 3 |

**Total: 4-5 weeks for full MVP**
**Demo-ready version: 2-3 weeks (Tier 1 only)**

---

## What NOT to Build (Yet)

❌ Corporate CSR integration (need marketplace traction first)
❌ Micro-credentials system (nice-to-have, not core)
❌ CRM integrations (Salesforce, Blackbaud)
❌ API/white-label (premature)
❌ Emergency mobilization mode (not your problem yet)
❌ International verification (US-first launch)
❌ Background check integration (can be mocked initially)

Focus on: **Does this marketplace transaction work end-to-end?**

---

## Next Immediate Steps

1. **Decide on scope for demo** (2 weeks? 3 weeks? 4 weeks?)
2. **Prioritize Tier 1 components** in order
3. **Create database schema** for new data (opportunity_created_by, check_in_log, hour_claims)
4. **Start with opportunity creation form** (blocking everything else)
5. **Wire up matching algorithm** (the differentiator)

Which should we build first?
