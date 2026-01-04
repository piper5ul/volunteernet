# Linear Design Rebuild - Implementation Summary

## Completed Work (8 of 38 screens)

### ✅ Onboarding Screens (5/5)
All onboarding screens have been completely rebuilt with Linear design:

1. **`/app/onboarding/welcome/page.tsx`** - Welcome page with feature grid and progress indicators
2. **`/app/onboarding/profile/page.tsx`** - Profile setup with photo upload, name, headline, location, and bio
3. **`/app/onboarding/interests/page.tsx`** - Cause selection with checkable cards
4. **`/app/onboarding/skills/page.tsx`** - Skills offered and skills to learn with custom tabs
5. **`/app/onboarding/complete/page.tsx`** - Completion page with next steps and confetti

### ✅ Settings Screens (3/6)
Three critical settings screens rebuilt:

1. **`/app/settings/account/page.tsx`** - Email and password management with danger zone
2. **`/app/settings/privacy/page.tsx`** - Privacy controls with toggles and dropdowns
3. **`/app/settings/notifications/page.tsx`** - Email and push notification preferences

### 🔄 Remaining Settings (3)
- `/app/settings/emails/page.tsx` - Email frequency preferences
- `/app/settings/integrations/page.tsx` - Calendar and LinkedIn integrations
- `/app/settings/data/page.tsx` - Data download and account deletion

## Linear Design System Implemented

### Core Design Elements

#### 1. Header Pattern (h-14 with breadcrumbs)
```tsx
<div className="h-14 border-b border-linear-border bg-white px-6 flex items-center">
  <div className="flex items-center gap-2 text-[11px] text-linear-muted">
    <Link href="/parent">Parent</Link>
    <span>/</span>
    <span className="text-linear-primary">Current</span>
  </div>
</div>
```

#### 2. Typography Scale
- **Page Titles:** `text-[20px]` to `text-[28px]` with `font-semibold`
- **Section Headers:** `text-[13px] font-semibold`
- **Body Text:** `text-[13px]`
- **Labels:** `text-[11px]` to `text-[12px] font-medium`
- **Helper Text:** `text-[11px]`

#### 3. Color Classes
```css
/* Text Colors */
text-linear-primary   /* Main text */
text-linear-muted     /* Secondary/helper text */
text-linear-accent    /* Blue accent */
text-peer-green       /* Green accent */

/* Background Colors */
bg-[#fbfbfc]          /* Page background */
bg-white              /* Card backgrounds */
bg-linear-hover       /* Hover states */
bg-peer-green         /* Primary actions */

/* Border Colors */
border-linear-border  /* Main borders */
border-linear-separator /* Subtle separators */
```

#### 4. Component Library

**Primary Button:**
```tsx
<button className="flex h-9 items-center gap-2 rounded-md bg-peer-green px-4 text-[13px] font-medium text-white hover:bg-peer-green/90 transition-colors">
  <Icon className="h-3.5 w-3.5" />
  Button Text
</button>
```

**Secondary Button:**
```tsx
<button className="flex h-9 items-center gap-2 rounded-md border border-linear-border bg-white text-[13px] text-linear-primary hover:bg-linear-hover transition-colors">
  <Icon className="h-3.5 w-3.5" />
  Button Text
</button>
```

**Text Input:**
```tsx
<input
  type="text"
  className="w-full h-9 rounded-md border border-linear-border bg-white px-3 text-[13px] text-linear-primary placeholder:text-linear-muted focus:outline-none focus:ring-1 focus:ring-peer-green"
  placeholder="Enter text..."
/>
```

**Textarea:**
```tsx
<textarea
  rows={4}
  className="w-full rounded-md border border-linear-border bg-white px-3 py-2 text-[13px] text-linear-primary placeholder:text-linear-muted focus:outline-none focus:ring-1 focus:ring-peer-green resize-none"
  placeholder="Enter text..."
/>
```

**Toggle Switch:**
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

**Select Dropdown:**
```tsx
<div className="relative">
  <select className="w-full h-9 appearance-none rounded-md border border-linear-border bg-white px-3 pr-8 text-[13px] text-linear-primary focus:outline-none focus:ring-1 focus:ring-peer-green">
    <option value="value1">Option 1</option>
    <option value="value2">Option 2</option>
  </select>
  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
    <svg className="h-4 w-4 text-linear-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  </div>
</div>
```

**Card with Header:**
```tsx
<div className="rounded-lg border border-linear-border bg-white shadow-sm">
  <div className="border-b border-linear-border px-6 py-4">
    <h2 className="text-[13px] font-semibold text-linear-primary">Card Title</h2>
    <p className="mt-1 text-[11px] text-linear-muted">Card description</p>
  </div>
  <div className="p-6">
    {/* Card content */}
  </div>
</div>
```

**Custom Tab System:**
```tsx
const [activeTab, setActiveTab] = useState("tab1");

<div className="grid grid-cols-2 rounded-md border border-linear-border bg-linear-hover p-1">
  <button
    onClick={() => setActiveTab("tab1")}
    className={`h-8 rounded text-[12px] font-medium transition-colors ${
      activeTab === "tab1"
        ? "bg-white text-linear-primary shadow-sm"
        : "text-linear-muted hover:text-linear-primary"
    }`}
  >
    Tab 1
  </button>
  <button
    onClick={() => setActiveTab("tab2")}
    className={`h-8 rounded text-[12px] font-medium transition-colors ${
      activeTab === "tab2"
        ? "bg-white text-linear-primary shadow-sm"
        : "text-linear-muted hover:text-linear-primary"
    }`}
  >
    Tab 2
  </button>
</div>
```

**Badge:**
```tsx
<div className="inline-flex items-center rounded-md border border-linear-border bg-linear-hover px-3 py-1 text-[12px] text-linear-primary">
  Badge Text
</div>
```

**Back Link:**
```tsx
<Link
  href="/parent"
  className="mb-4 inline-flex items-center gap-2 text-[12px] text-linear-muted hover:text-linear-primary transition-colors"
>
  <ArrowLeft className="h-3.5 w-3.5" />
  Back to Parent
</Link>
```

## Remaining Work (30 screens)

### Settings (3 screens)
Apply the same pattern shown in account/privacy/notifications to:
- `emails/page.tsx` - Email frequency dropdown + toggles
- `integrations/page.tsx` - Integration cards with connect/disconnect buttons
- `data/page.tsx` - Download data button + danger zone for deletion

### Functional Pages (11 screens)
- `profile/edit/page.tsx`
- `search/page.tsx`
- `discover/people/page.tsx`
- `squads/create/page.tsx`
- `squads/[id]/members/page.tsx`
- `dashboard/goals/page.tsx`
- `dashboard/year-in-review/[year]/page.tsx`
- `check-in/[eventId]/page.tsx`
- `claim/[token]/page.tsx`
- `join/[token]/page.tsx`
- `review/[orgId]/page.tsx`

### Other Features (3 screens)
- `map/page.tsx`
- `causes/page.tsx`
- `groups/page.tsx`

### Marketing/Info (6 screens)
- `about/page.tsx`
- `contact/page.tsx`
- `help/page.tsx`
- `guidelines/page.tsx`
- `privacy/page.tsx`
- `terms/page.tsx`

## Implementation Steps for Remaining Screens

For each remaining screen:

1. **Read the existing file** to understand its structure and functionality
2. **Remove all shadcn imports**: Button, Card, Input, Label, Select, Tabs, Badge, Switch, etc.
3. **Add the h-14 header** with breadcrumb navigation
4. **Replace the page background** with `bg-[#fbfbfc]`
5. **Convert each shadcn component** using the patterns above
6. **Update all text sizing** to the 11px-14px scale
7. **Replace colors** with Linear palette classes
8. **Test functionality** remains intact

## Files Modified

### Onboarding
- `/Users/pushkar/Downloads/VolunteerNet/impact-idol/app/onboarding/welcome/page.tsx`
- `/Users/pushkar/Downloads/VolunteerNet/impact-idol/app/onboarding/profile/page.tsx`
- `/Users/pushkar/Downloads/VolunteerNet/impact-idol/app/onboarding/interests/page.tsx`
- `/Users/pushkar/Downloads/VolunteerNet/impact-idol/app/onboarding/skills/page.tsx`
- `/Users/pushkar/Downloads/VolunteerNet/impact-idol/app/onboarding/complete/page.tsx`

### Settings
- `/Users/pushkar/Downloads/VolunteerNet/impact-idol/app/settings/account/page.tsx`
- `/Users/pushkar/Downloads/VolunteerNet/impact-idol/app/settings/privacy/page.tsx`
- `/Users/pushkar/Downloads/VolunteerNet/impact-idol/app/settings/notifications/page.tsx`

## Key Achievements

✅ Removed all shadcn/ui component dependencies from 8 screens
✅ Established consistent Linear design system
✅ Maintained all existing functionality and state management
✅ Created reusable component patterns for future screens
✅ Improved typography consistency with precise px values
✅ Implemented proper focus states and accessibility

## Next Steps

Continue applying the established patterns to the remaining 30 screens. Each screen should take 5-10 minutes following the component patterns documented here. The Linear design system is now fully defined and ready for systematic application across all remaining pages.
