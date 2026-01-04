# Linear Design Rebuild Status

## Completed Screens (7/38)

### Onboarding Screens (5/5) ✅
1. `/app/onboarding/welcome/page.tsx` - ✅ COMPLETED
2. `/app/onboarding/profile/page.tsx` - ✅ COMPLETED
3. `/app/onboarding/skills/page.tsx` - ✅ COMPLETED  
4. `/app/onboarding/interests/page.tsx` - ✅ COMPLETED
5. `/app/onboarding/complete/page.tsx` - ✅ COMPLETED

### Settings Screens (2/6) ✅
1. `/app/settings/account/page.tsx` - ✅ COMPLETED
2. `/app/settings/privacy/page.tsx` - ✅ COMPLETED
3. `/app/settings/notifications/page.tsx` - 🔄 IN PROGRESS
4. `/app/settings/emails/page.tsx` - ⏳ PENDING
5. `/app/settings/integrations/page.tsx` - ⏳ PENDING
6. `/app/settings/data/page.tsx` - ⏳ PENDING

## Remaining Screens (31/38)

### Settings Screens (4 remaining)
- notifications, emails, integrations, data

### Functional Pages (11)
- profile/edit, search, discover/people, squads/create, squads/[id]/members
- dashboard/goals, dashboard/year-in-review/[year], check-in/[eventId]
- claim/[token], join/[token], review/[orgId]

### Other Features (4)
- map, causes, groups (+ 1 unspecified)

### Marketing/Info Pages (6)
- about, contact, help, guidelines, privacy, terms

## Linear Design Pattern

All rebuilt screens follow this consistent pattern:

### 1. Header Structure
```tsx
<div className="h-14 border-b border-linear-border bg-white px-6 flex items-center">
  <div className="flex items-center gap-2 text-[11px] text-linear-muted">
    <Link href="/parent">Parent</Link>
    <span>/</span>
    <span className="text-linear-primary">Current</span>
  </div>
</div>
```

### 2. Typography Scale
- Page titles: `text-[20px]` to `text-[28px]`
- Section headers: `text-[13px]`
- Body text: `text-[13px]`
- Labels: `text-[11px]` to `text-[12px]`
- Helper text: `text-[11px]`

### 3. Color Palette
- Primary text: `text-linear-primary`
- Muted text: `text-linear-muted`
- Borders: `border-linear-border`
- Background: `bg-[#fbfbfc]`
- Accent: `text-peer-green` / `bg-peer-green`
- Secondary accent: `text-linear-accent`

### 4. Component Patterns

**Buttons:**
```tsx
// Primary
className="flex h-9 items-center gap-2 rounded-md bg-peer-green px-4 text-[13px] font-medium text-white hover:bg-peer-green/90 transition-colors"

// Secondary
className="flex h-9 items-center gap-2 rounded-md border border-linear-border bg-white text-[13px] text-linear-primary hover:bg-linear-hover transition-colors"
```

**Inputs:**
```tsx
className="w-full h-9 rounded-md border border-linear-border bg-white px-3 text-[13px] text-linear-primary placeholder:text-linear-muted focus:outline-none focus:ring-1 focus:ring-peer-green"
```

**Cards:**
```tsx
<div className="rounded-lg border border-linear-border bg-white shadow-sm">
  <div className="border-b border-linear-border px-6 py-4">
    <h2 className="text-[13px] font-semibold text-linear-primary">Title</h2>
    <p className="mt-1 text-[11px] text-linear-muted">Description</p>
  </div>
  <div className="p-6">
    {/* Content */}
  </div>
</div>
```

**Toggle Switches:**
```tsx
<button
  onClick={() => setState(!state)}
  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
    state ? "bg-peer-green" : "bg-linear-separator"
  }`}
>
  <span
    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
      state ? "translate-x-6" : "translate-x-1"
    }`}
  />
</button>
```

**Select Dropdowns:**
```tsx
<div className="relative">
  <select className="w-full h-9 appearance-none rounded-md border border-linear-border bg-white px-3 pr-8 text-[13px] text-linear-primary focus:outline-none focus:ring-1 focus:ring-peer-green">
    <option>Option</option>
  </select>
  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
    <svg className="h-4 w-4 text-linear-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  </div>
</div>
```

## Key Changes Made

### Removed Components
- All shadcn/ui components (Button, Card, Input, Label, Select, Tabs, Badge, Switch, etc.)
- Replaced with native HTML elements styled with Linear design

### Added Features
- Consistent h-14 header with breadcrumbs
- Linear color palette throughout
- Precise typography sizing (11px-14px range)
- Custom styled form elements
- Proper focus states with peer-green accent
- Consistent spacing and padding

### Maintained Functionality
- All state management preserved
- Event handlers intact
- Navigation flows unchanged
- Form validation logic kept
- Toast notifications working
