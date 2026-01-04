# Impact Idol - Volunteer Management Platform

**A comprehensive clickthrough prototype for demonstrating the Impact Idol volunteer management platform.**

![Impact Idol](public/logo.png)

## 🌟 Overview

Impact Idol is the system of record for volunteer impact - helping volunteers build verified portfolios of their community service, while providing organizations with powerful tools to manage, verify, and report on volunteer programs.

This is a **fully functional prototype** built with Next.js 15, TypeScript, and tRPC, featuring:
- ✅ API-first architecture with end-to-end type safety
- ✅ Comprehensive UI for all 4 core user flows
- ✅ Mobile-responsive design
- ✅ In-memory database with realistic mock data
- ✅ Demo-ready persona switcher

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

```bash
# Clone the repository
cd impact-idol

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎯 Key Features

### 1. **Volunteer Discovery & Registration**
- Browse volunteer opportunities with filters (cause, location, skills)
- Map view of nearby opportunities
- One-click registration
- Calendar export (.ics files)
- Social proof ("3 friends volunteered here")

**Demo:** Navigate to `/discover`

### 2. **Volunteer Profile & Impact Dashboard**
- Public portfolio with verified hours
- Impact statistics and charts
- Skills showcase (offered & to gain)
- Endorsements from organizations
- Badges & achievements
- Export profile to PDF

**Demo:** Navigate to `/dashboard` or `/profile/sarah-chen`

### 3. **Squad Booking & Magic Links** (Viral Growth Engine)
- Create squads (corporate/school/social/family)
- Book multiple spots at once
- Generate magic links for easy sign-up
- Guest registration (name + email only)
- Post-event "Claim Your Impact" flow
- Seamless guest → full user conversion

**Demo:** Navigate to `/squads` → Create a squad → Book spots

### 4. **Organization Dashboard & Verification**
- Post volunteer opportunities
- Manage registrations
- 3-tier verification system (Silver/Gold/Platinum)
- 48-hour auto-verification countdown
- Volunteer CRM with tags & notes
- Grant reporting (hours × wage rate)
- Analytics dashboard

**Demo:** Use the persona switcher to switch to "Green Future SF (Org)"

### 5. **Chat & Messaging**
- Direct messaging between volunteers and organizations
- Group chats for events and squads
- Message history
- Typing indicators and read receipts

**Demo:** Navigate to `/messages`

### 6. **Notifications**
- In-app notification center
- Verification alerts
- Event reminders
- Message notifications

**Demo:** Click the bell icon in the navbar

## 🎭 Demo Mode

The prototype includes a **Persona Switcher** (visible in the top-right corner) that allows you to instantly switch between different user types:

1. **Sarah Chen (Volunteer)** - View the volunteer experience
2. **Mike Thompson (Squad Leader)** - Test squad booking features
3. **Green Future SF (Organization)** - Explore org dashboard
4. **Guest** - Experience the public view

All data is persisted in-memory during your session.

## 📱 Mobile Responsive

The entire application is built mobile-first and fully responsive:
- Optimized touch targets (44px minimum)
- Mobile-friendly navigation
- Responsive layouts for all screen sizes
- Touch gestures where appropriate

Test on mobile by opening the app on your phone or using browser DevTools.

## 🏗️ Architecture

### Tech Stack

- **Frontend:** Next.js 15 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS, shadcn/ui
- **API:** tRPC for end-to-end type-safe API routes
- **State:** Zustand for client-side state management
- **Data:** In-memory database (simulating PostgreSQL)
- **Charts:** Recharts
- **Forms:** React Hook Form + Zod validation

### Project Structure

```
impact-idol/
├── app/                      # Next.js pages (App Router)
│   ├── discover/            # Opportunity discovery
│   ├── dashboard/           # Volunteer dashboard
│   ├── profile/             # Public profiles
│   ├── squads/              # Squad management
│   ├── org/                 # Organization features
│   ├── messages/            # Chat & messaging
│   ├── join/                # Magic link landing
│   └── claim/               # Claim impact flow
├── components/              # React components
│   ├── dashboard/           # Dashboard components
│   ├── discover/            # Discovery components
│   ├── squad/               # Squad components
│   ├── org/                 # Organization components
│   ├── messages/            # Messaging components
│   ├── notifications/       # Notification components
│   ├── layout/              # Layout components
│   └── ui/                  # shadcn/ui components
├── server/                  # tRPC backend
│   ├── routers/             # API route handlers
│   ├── db.ts                # In-memory database
│   ├── context.ts           # tRPC context
│   └── trpc.ts              # tRPC setup
├── lib/                     # Utilities
│   ├── types/               # TypeScript interfaces
│   ├── stores/              # Zustand stores
│   └── utils/               # Helper functions
└── public/                  # Static assets
```

### API Routes (tRPC)

All API endpoints are type-safe and located in `server/routers/`:

- **opportunities** - Browse, search, register
- **users** - Profile, stats, timeline
- **organizations** - Org management, analytics
- **squads** - Create, manage, book
- **impact** - Impact ledger operations
- **verification** - Hour verification
- **messages** - Chat functionality
- **notifications** - Notification system

## 🎨 Design System

### Color Palette

- **Primary:** Blue (#3b82f6)
- **Success:** Green (#10b981) - for verified hours
- **Warning:** Yellow (#f59e0b) - for pending
- **Error:** Red (#ef4444) - for disputed

### Cause Colors

- Environment: #10b981
- Education: #3b82f6
- Health: #ef4444
- Animals: #f59e0b
- Community: #8b5cf6
- Hunger: #f97316

## 🧪 Testing the Demo

### End-to-End Flow: Volunteer Journey

1. Start as **Guest**
2. Browse opportunities at `/discover`
3. Switch to **Sarah Chen** (Volunteer)
4. Register for an event
5. View your dashboard at `/dashboard`
6. Check your profile at `/profile/sarah-chen`

### End-to-End Flow: Squad Booking

1. Switch to **Mike Thompson** (Squad Leader)
2. Go to `/squads` → Create a new squad
3. Browse `/discover` → Find an opportunity
4. Book spots for your squad
5. Copy the magic link
6. Open in incognito/private window
7. Register as a guest (name + email only)
8. After "attending" the event, claim your impact

### End-to-End Flow: Organization Management

1. Switch to **Green Future SF** (Organization)
2. View org dashboard at `/org/dashboard`
3. Go to **Verification** → Approve volunteer hours
4. Check **Analytics** → View performance metrics
5. Go to **Opportunities** → Manage events
6. Check **Volunteers** → View CRM

## 📊 Mock Data

The prototype includes realistic seed data:

- **4 Users:** Sarah Chen, James Rodriguez, Mike Thompson, Emily (Guest)
- **3 Organizations:** Green Future SF, SF Education Coalition, SF Food Bank
- **8 Opportunities:** Beach cleanups, tree planting, tutoring, food packing
- **2 Squads:** Acme Corp Volunteers, Smith Family
- **15+ Impact Entries:** Verified volunteer activities
- **Sample Messages:** Conversations between volunteers and orgs
- **Notifications:** Event reminders, verification alerts

## 🚢 Deployment

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel

```bash
vercel deploy
```

The app is configured for easy deployment to Vercel with zero configuration.

## 🔧 Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Adding New Features

1. **Add a new API route:**
   - Create router in `server/routers/yourFeature.ts`
   - Add to `server/routers/_app.ts`

2. **Add a new page:**
   - Create page in `app/yourPage/page.tsx`
   - Add navigation link in `components/layout/navbar.tsx`

3. **Add shadcn/ui component:**
   ```bash
   npx shadcn@latest add [component-name]
   ```

## 🎯 Future Enhancements

This prototype demonstrates core features. In production, you would add:

- [ ] Real database (PostgreSQL with Prisma)
- [ ] Authentication (NextAuth.js or Clerk)
- [ ] Real-time updates (WebSockets or Pusher)
- [ ] Email service (Resend or SendGrid)
- [ ] SMS notifications (Twilio)
- [ ] Payment processing (Stripe for donations)
- [ ] Background jobs (Bull or Inngest)
- [ ] File uploads (AWS S3 or Cloudinary)
- [ ] Advanced search (Algolia or ElasticSearch)
- [ ] Analytics (PostHog or Mixpanel)

## 📝 License

This is a prototype for demonstration purposes.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Charts from [Recharts](https://recharts.org/)

---

**Ready to demo?** Open [http://localhost:3000](http://localhost:3000) and start exploring! 🚀
