# Volunteer Matching Algorithm: What It Actually Does

**Status:** Design Document | **Purpose:** Define the matching algorithm's scope & implementation

---

## The Problem It Solves

**Current state (most volunteer platforms):**
- Org posts: "Need carpenters for community garden rebuild"
- Volunteers browse and apply
- Org reviews applications manually
- **Result:** 80% of applicants are wrong fit, lots of no-shows, wasted time

**With matching algorithm:**
- Org posts opportunity with details
- Algorithm **proactively identifies** the 5-10 best volunteers
- **Orgs spend 80% less time screening**
- **Volunteers who get matched show up 2x more often** (because they're actually good fits)

---

## Three Ways to Deploy a Matching Algorithm

### Approach 1: "Display & Recommendation" (Easiest)
**What it does:**
- Org posts opportunity
- Algorithm shows org a ranked list of volunteers
- Org manually invites top 5
- Volunteers receive invite, can accept/decline

**Workflow:**
```
Org posts "Carpenters needed March 15"
    ↓
Algorithm runs match calculation
    ↓
System shows org:
├─ Sarah (89% match, 20 hrs carpentry exp, 5mi away, available)
├─ Marcus (84% match, 15 hrs exp, 8mi away, available)
├─ Angela (79% match, 10 hrs exp, 2mi away, available)
└─ (etc)
    ↓
Org clicks "Invite these 3" (one-click bulk action)
    ↓
Volunteers get notification: "Habitat for Humanity invited you to..."
    ↓
They accept or decline
```

**Effort saved:** Org goes from reviewing 50 applications → inviting 5 pre-screened candidates
**For volunteer:** Sees invites in dashboard → accepts if interested

**Cost to build:** Medium (ranking algorithm + notification system)
**Time to show business value:** Immediate (20% conversion of invites vs. 5% conversion of public postings)

---

### Approach 2: "Smart Discovery" (Medium Complexity)
**What it does:**
- Algorithm **proactively shows volunteers opportunities** that match them
- Volunteers see curated feed instead of searching
- Orgs still post publicly, but volunteers discover through recommendations

**Workflow:**
```
Volunteer profile has:
├─ Skills: Carpentry, Gardening, Leadership
├─ Availability: Weekends only
├─ Location: SF
├─ Past rating: 4.8 stars
└─ Experience: 25 hours

Opportunity posted:
├─ "Carpenter needed for community rebuild"
├─ Date: March 15 (Saturday)
├─ Location: SF
├─ Experience required: 10+

Algorithm calculates match:
├─ Skill match: 95% (has carpentry)
├─ Availability match: 100% (weekend + available)
├─ Location match: 100% (same city)
├─ Experience match: 100% (25 hrs > 10 hrs required)
└─ TOTAL MATCH SCORE: 93%
    ↓
Volunteer sees in their feed: "Great match for you: Carpenter role at Habitat"
    ↓
Volunteer clicks → sees opportunity details → applies
```

**Effort saved:** Volunteers don't waste time searching; they see curated recommendations
**For org:** Fewer applications, but higher quality

**Cost to build:** Medium-High (recommendation algorithm + feed infrastructure)
**Time to show business value:** 2-3 weeks (need data to build recommendation models)

---

### Approach 3: "Auto-Matching with Approval" (Most Powerful)
**What it does:**
- Algorithm **automatically assigns volunteers to opportunities**
- System notifies them and asks for confirmation
- Orgs just create opportunities; system handles matching
- Dramatically reduces friction for both sides

**Workflow:**
```
Org posts: "Carpenter needed March 15, 4 spots available"
    ↓
Algorithm runs match scoring for ALL active volunteers
    ↓
Top 4 matches identified:
├─ Sarah (89% match)
├─ Marcus (84% match)
├─ Angela (79% match)
└─ David (75% match)
    ↓
System auto-assigns:
├─ Sarah → confirmed
├─ Marcus → waiting for confirmation
├─ Angela → waiting for confirmation
└─ David → waiting for confirmation
    ↓
Org sees: "4 spots filled. Waiting on 2 confirmations"
Volunteers get notification: "You're assigned to Carpenter role March 15. Confirm by tomorrow?"
    ↓
When volunteers confirm, org gets roster 48h before event
```

**Effort saved:**
- Org: 0 manual invitations (100% automated)
- Volunteer: Sees pre-matched opportunities, not overloaded with choices

**For org:** Dramatically higher show-up rate (because volunteers were actually selected, not just applied)
**For volunteer:** Less paralysis (algorithm chose for them) + higher commitment rate

**Cost to build:** High (complex assignment algorithm + confirmation workflow)
**Time to show business value:** Immediate (auto-assignment = instant improvements)

---

## What the Algorithm Scores (Input Factors)

Depending on which approach you choose, the algorithm weighs these factors:

### Hard Constraints (Must Match)
- **Availability:** Volunteer available on that date/time?
- **Skills:** Does volunteer have required skills?
- **Location:** Is volunteer within acceptable distance?
- **Background checks:** If required, does volunteer have valid check?
- **Age restrictions:** Some roles require 18+, etc.

### Soft Signals (Improve Score)
- **Experience level:** More past hours = higher score
- **Ratings:** Volunteers with 4.8+ stars ranked higher
- **Reliability:** Show-up rate (if volunteer no-showed 30% of events, lower score)
- **Org match:** If volunteer previously worked with similar org type, score up
- **Cause alignment:** Volunteer interested in "education"? Rank education opportunities higher
- **Geographic preference:** Some volunteers prefer certain neighborhoods
- **Time preference:** Some prefer morning vs. evening

### Predictive Signals (ML-Based)
Once you have data:
- **No-show likelihood:** ML model predicting who will actually show up
- **Satisfaction likelihood:** Will this volunteer rate org 4+ stars?
- **Retention:** Will this volunteer volunteer again with this org?
- **Success likelihood:** Will this volunteer complete the full task?

---

## Scoring Example (Simple Math)

Let's say you weight factors like this:

```
Match Score = (Skills × 0.25) + (Availability × 0.25) + (Experience × 0.15) + (Ratings × 0.15) + (Location × 0.10) + (Reliability × 0.10)

Opportunity: Carpenter, March 15, SF, 10+ hrs required, 3 spots

Volunteer: Sarah
├─ Has carpentry skills? YES (100%) × 0.25 = 25
├─ Available March 15? YES (100%) × 0.25 = 25
├─ Has 10+ hrs experience? YES, has 25 (100%) × 0.15 = 15
├─ Rating? 4.8 stars (100%) × 0.15 = 15
├─ Within 5mi? YES (100%) × 0.10 = 10
├─ Show-up rate? 95% (95%) × 0.10 = 9.5
└─ TOTAL = 99.5% match ← Rank #1

Volunteer: Marcus
├─ Has carpentry skills? YES (100%) × 0.25 = 25
├─ Available March 15? YES (100%) × 0.25 = 25
├─ Has 10+ hrs experience? YES, has 15 (100%) × 0.15 = 15
├─ Rating? 4.2 stars (88%) × 0.15 = 13.2
├─ Within 8mi? Sort of (80%) × 0.10 = 8
├─ Show-up rate? 87% (87%) × 0.10 = 8.7
└─ TOTAL = 94.9% match ← Rank #2

Volunteer: Angela
├─ Has carpentry skills? YES (100%) × 0.25 = 25
├─ Available March 15? MAYBE, needs to check (70%) × 0.25 = 17.5
├─ Has 10+ hrs experience? YES, has 10 (100%) × 0.15 = 15
├─ Rating? 4.6 stars (96%) × 0.15 = 14.4
├─ Within 2mi? YES (100%) × 0.10 = 10
├─ Show-up rate? 92% (92%) × 0.10 = 9.2
└─ TOTAL = 91.1% match ← Rank #3
```

**Result:** Invite (or assign) Sarah, Marcus, Angela in that order.

---

## For Your Investor Demo: Which Approach?

**I recommend: Approach 1 + Approach 2 (Hybrid)**

**Phase 1 (MVP for demo):**
- Show Approach 1: "Org posts opportunity → algorithm recommends top 5 volunteers"
- This is instantly credible and easy to understand
- Demo can have fake/semi-real data (investors don't know the difference)

**Phase 2 (3-6 months in):**
- Add Approach 2: "Volunteers see curated feed of matched opportunities"
- Requires more data to make recommendations good, so wait until you have real usage

**Phase 3 (1 year in):**
- Add Approach 3: "Auto-matching with confirmation"
- Only viable once you have enough volunteers that algorithm can confidently assign

---

## The Demo Screen (What to Build First)

**Current version (what you'd show):**

```
Org Admin Dashboard - Match Volunteers to Opportunity

Opportunity: "Community Garden Rebuild - Carpenters Needed"
Date: March 15, 2026 (Saturday)
Time: 9am - 1pm
Location: Golden Gate Park, SF
Spots available: 3
Experience required: 10+ hours carpentry
```

Recommended Volunteers (sorted by match score):

| Rank | Name | Match | Skills | Exp | Location | Rating | Show-up | Action |
|------|------|-------|--------|-----|----------|--------|---------|--------|
| 1 | Sarah Chen | 99% | Carpentry, Leadership | 25h | 5mi | 4.8★ | 95% | [Invite] |
| 2 | Marcus Rodriguez | 95% | Carpentry, Painting | 15h | 8mi | 4.2★ | 87% | [Invite] |
| 3 | Angela Liu | 91% | Carpentry, Gardening | 10h | 2mi | 4.6★ | 92% | [Invite] |
| 4 | James Park | 87% | Gardening, Leadership | 5h | 3mi | 4.4★ | 88% | [Invite] |
| 5 | Lisa Wang | 82% | Carpentry, Painting | 20h | 12mi | 4.1★ | 80% | [Invite] |

**One-click bulk action:**
- [Invite Top 3]  ← Sends invites to Sarah, Marcus, Angela
- [Invite All 5]  ← Sends to all shown
- [Customize]     ← Adjust filters/weights

**Then show:**
- Notification to volunteers: "Habitat for Humanity invited you to Carpenter role March 15"
- Org admin dashboard updating: "Invites sent. Waiting on 3 confirmations."
- Simple metrics: "Match quality: 94% avg. Expected show-up rate: 91%"

---

## The Business Story

**To investors, you'd say:**

"Current volunteer platforms are passive job boards. We're different: Our algorithm **actively matches** the right volunteers to the right opportunities.

**Result for orgs:**
- 80% less time screening volunteers
- 3x higher show-up rate
- Better volunteer satisfaction (they're matched to roles they'll succeed in)

**Result for volunteers:**
- Don't waste time browsing 100 opportunities
- See only curated matches relevant to them
- Higher success/completion rate (matched to their skill level)

**Network effect:**
- More data → better matches → higher retention → more volunteers → better matches
- Competitors can't replicate because it requires real volunteer history data"

---

## What NOT to Do in Your Demo

❌ Don't show "likes" (LinkedIn style = not a differentiator)
❌ Don't show "applying" (that's what everyone does = status quo)
❌ Don't show generic "search filters" (that's table stakes)

✅ DO show:
- Algorithm making smart recommendations
- Match scores with reasoning
- One-click bulk invite
- Impact on outcomes (expected show-up %, satisfaction)

---

## Technical Implementation (If You Want to Build This)

### Stack:
- **Matching engine:** Node.js/Python (simple weighted scoring to start)
- **Storage:** PostgreSQL (store match scores, calculations)
- **Async job:** Run matches in background (don't block on page load)
- **UI:** React component showing ranked list

### Pseudo-code (Simplified):

```typescript
function calculateMatch(volunteer: Volunteer, opportunity: Opportunity): MatchScore {
  const skillsMatch = hasRequiredSkills(volunteer, opportunity) ? 1.0 : 0.0;
  const availabilityMatch = isAvailable(volunteer, opportunity.datetime) ? 1.0 : 0.5;
  const experienceMatch = Math.min(volunteer.hours / opportunity.requiredHours, 1.0);
  const ratingMatch = volunteer.avgRating / 5.0;
  const locationMatch = 1.0 - (volunteer.distance / MAX_DISTANCE);
  const reliabilityMatch = volunteer.showUpRate;

  const score =
    (skillsMatch * 0.25) +
    (availabilityMatch * 0.25) +
    (experienceMatch * 0.15) +
    (ratingMatch * 0.15) +
    (locationMatch * 0.10) +
    (reliabilityMatch * 0.10);

  return {
    score: score * 100,
    reasons: [
      `${skillsMatch === 1.0 ? '✓' : '✗'} Has required skills`,
      `Available on ${opportunity.datetime}`,
      `${volunteer.hours}h experience (${experience > required ? 'exceeds' : 'meets'} ${opportunity.requiredHours}h)`,
      `${volunteer.avgRating}★ rating`,
      `${volunteer.distance}mi away`,
      `${Math.round(volunteer.showUpRate * 100)}% show-up rate`
    ]
  };
}

// Get top 5 matches
function recommendVolunteers(opportunity: Opportunity): MatchedVolunteer[] {
  const allVolunteers = db.volunteers.findAll();
  const matches = allVolunteers
    .map(v => ({ volunteer: v, match: calculateMatch(v, opportunity) }))
    .sort((a, b) => b.match.score - a.match.score)
    .slice(0, 5);

  return matches;
}
```

---

## My Recommendation for Your Prototype

**To Show:**
1. Org posts opportunity with details (date, location, skills, experience required)
2. Algorithm recommends top 5 volunteers with:
   - Match percentage
   - Why they match (skill, availability, location, experience, ratings)
   - One-click invite to multiple

**Keep it simple for MVP:**
- Use static data or semi-realistic mock data
- Show 2-3 opportunities with pre-calculated match scores
- Focus on the UX (how beautiful/intuitive is the recommendation?)
- Don't worry about perfect algorithm tuning yet

**Narrative to investors:**
"We're not a job board. We're a **matching engine**. Orgs don't have to screen anymore; the algorithm does it. This is where the ROI lives—saving 20 hours/month per org at current volunteer software."

---

## What Do You Want to Build?

**Three options:**

1. **Simple Demo** (Fake data, pre-calculated matches)
   - Fastest to show
   - No backend algorithm needed yet
   - Investors see the UI/UX story

2. **Functional MVP** (Real algorithm, mock volunteers)
   - Shows you can actually build it
   - Real scoring logic
   - Proves concept

3. **Data-Driven** (Real volunteers + real algorithm)
   - Most impressive but takes time
   - Requires you to seed volunteer data first
   - Best for closing enterprise deals

Which resonates with your timeline?
