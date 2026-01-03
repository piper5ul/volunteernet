# VolunteerNet (Impact Idol)

**The global system of record for volunteer impact**

## Vision

Transform volunteering into a verified professional credential. Think "LinkedIn for Volunteers" meets a volunteer marketplace.

## Project Status

🚧 **Pre-Development** - Requirements & Design Phase

## Documentation

- 📄 [Complete Product Requirements](docs/requirements/Initial-Requirements-2026-01-03.md) - Full technical specification (v7.0)

## Key Features (Planned)

### For Volunteers
- ✅ Public volunteer profiles with verified impact history
- ✅ "Resume of Good" - exportable volunteer CV
- ✅ Discovery marketplace for volunteer opportunities
- ✅ Impact dashboard (track hours, causes, organizations)

### For Organizations
- ✅ Volunteer Relationship Management (VRM)
- ✅ Automatic hour verification (48-hour passive verification)
- ✅ Grant reporting tools (calculate monetary value of volunteer time)
- ✅ Volunteer search and matching

### For Squads (Viral Growth)
- ✅ Group booking with magic links (zero-friction onboarding)
- ✅ Guest → Full User conversion flow
- ✅ Corporate/school/social group volunteering

## Tech Stack

- **Frontend:** Next.js 15 + React 19 + Tailwind CSS + shadcn/ui
- **Backend:** Next.js API Routes + tRPC (type-safe APIs)
- **Database:** PostgreSQL 16 + PostGIS (geospatial queries)
- **ORM:** Drizzle ORM
- **Auth:** BetterAuth (OAuth + Magic Links)
- **Queue:** BullMQ (background jobs)
- **Email:** Resend
- **Hosting:** Vercel (frontend) + Neon (database)

## Getting Started

Coming soon! Project setup in progress.

## Core Differentiators

1. **Verified volunteer profiles** - Like LinkedIn, but for social good
2. **Dual verification system** - Volunteers and organizations verify each other
3. **Squad booking** - Viral growth through group volunteering
4. **Grant reporting** - Automatic impact reports for fundraising
5. **API-first** - Data portability and ecosystem building

## Success Metrics

- **WVI (Weekly Verified Impact):** Total verified volunteer hours per week
- **Viral Coefficient:** New users per squad booking (target: >2.0)
- **Auto-Verify Rate:** % of hours auto-verified by organizations (target: >80%)

## Roadmap

- **Phase 1 (Months 1-3):** MVP - Core marketplace + guest flow
- **Phase 2 (Months 4-6):** Engagement - QR check-in + passive verification
- **Phase 3 (Months 7-9):** Professional Network - Rich profiles + endorsements
- **Phase 4 (Months 10-12):** Scale - Public API + mobile app

## License

TBD

## Contact

TBD
