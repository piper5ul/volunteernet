/**
 * Independent Sector hourly rate for volunteer time (2024)
 * This is updated annually and varies by region
 */
export const VOLUNTEER_HOURLY_RATE = 33.49;

/**
 * Calculate monetary value of volunteer hours
 */
export function calculateMonetaryValue(hours: number, hourlyRate: number = VOLUNTEER_HOURLY_RATE): number {
  return Math.round(hours * hourlyRate * 100) / 100;
}

/**
 * Format monetary value
 */
export function formatMonetaryValue(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Format hours for display
 */
export function formatHours(hours: number): string {
  if (hours === 0) return "0 hours";
  if (hours === 1) return "1 hour";
  if (hours < 1) return `${(hours * 60).toFixed(0)} minutes`;
  return `${hours.toFixed(1)} hours`;
}

/**
 * Calculate verification score based on verification tier and count
 */
export function calculateVerificationScore(verifications: Array<{ tier?: string; status: string }>): number {
  let score = 0;
  const verifiedCount = verifications.filter((v) => v.status === "VERIFIED").length;

  verifications.forEach((v) => {
    if (v.status !== "VERIFIED") return;

    switch (v.tier) {
      case "PLATINUM":
        score += 10;
        break;
      case "GOLD":
        score += 7;
        break;
      case "SILVER":
        score += 5;
        break;
      default:
        score += 3;
    }
  });

  // Normalize to 0-100 scale
  // Assuming 20 verified activities = 100 score
  const normalized = Math.min(100, (score / 200) * 100);
  return Math.round(normalized);
}

/**
 * Get impact summary statistics
 */
export function getImpactSummary(impactEntries: Array<{
  hours: number;
  org_id?: string;
  cause_id?: string;
  status: string;
}>): {
  totalHours: number;
  verifiedHours: number;
  pendingHours: number;
  uniqueOrgs: number;
  uniqueCauses: number;
  monetaryValue: number;
} {
  const verified = impactEntries.filter((e) => e.status === "VERIFIED");
  const pending = impactEntries.filter((e) => e.status === "PENDING");

  const totalHours = impactEntries.reduce((sum, e) => sum + e.hours, 0);
  const verifiedHours = verified.reduce((sum, e) => sum + e.hours, 0);
  const pendingHours = pending.reduce((sum, e) => sum + e.hours, 0);

  const uniqueOrgs = new Set(impactEntries.map((e) => e.org_id).filter(Boolean)).size;
  const uniqueCauses = new Set(impactEntries.map((e) => e.cause_id).filter(Boolean)).size;

  const monetaryValue = calculateMonetaryValue(verifiedHours);

  return {
    totalHours,
    verifiedHours,
    pendingHours,
    uniqueOrgs,
    uniqueCauses,
    monetaryValue,
  };
}

/**
 * Group hours by cause
 */
export function groupByCause(impactEntries: Array<{
  hours: number;
  cause_id?: string;
  status: string;
}>): Record<string, number> {
  const grouped: Record<string, number> = {};

  impactEntries
    .filter((e) => e.status === "VERIFIED" && e.cause_id)
    .forEach((e) => {
      if (e.cause_id) {
        grouped[e.cause_id] = (grouped[e.cause_id] || 0) + e.hours;
      }
    });

  return grouped;
}

/**
 * Group hours by organization
 */
export function groupByOrganization(impactEntries: Array<{
  hours: number;
  org_id?: string;
  status: string;
}>): Record<string, number> {
  const grouped: Record<string, number> = {};

  impactEntries
    .filter((e) => e.status === "VERIFIED" && e.org_id)
    .forEach((e) => {
      if (e.org_id) {
        grouped[e.org_id] = (grouped[e.org_id] || 0) + e.hours;
      }
    });

  return grouped;
}

/**
 * Group hours by month
 */
export function groupByMonth(impactEntries: Array<{
  hours: number;
  date: Date;
  status: string;
}>): Array<{ month: string; hours: number }> {
  const grouped = new Map<string, number>();

  impactEntries
    .filter((e) => e.status === "VERIFIED")
    .forEach((e) => {
      const month = `${e.date.getFullYear()}-${String(e.date.getMonth() + 1).padStart(2, "0")}`;
      grouped.set(month, (grouped.get(month) || 0) + e.hours);
    });

  return Array.from(grouped.entries())
    .map(([month, hours]) => ({ month, hours }))
    .sort((a, b) => a.month.localeCompare(b.month));
}

/**
 * Calculate retention rate for an organization
 */
export function calculateRetentionRate(volunteers: Array<{
  first_activity: Date;
  last_activity: Date;
  activity_count: number;
}>): number {
  if (volunteers.length === 0) return 0;

  const returning = volunteers.filter((v) => v.activity_count > 1).length;
  const rate = (returning / volunteers.length) * 100;

  return Math.round(rate * 10) / 10;
}

/**
 * Calculate no-show rate for an organization
 */
export function calculateNoShowRate(registrations: Array<{
  status: string;
}>): number {
  if (registrations.length === 0) return 0;

  const noShows = registrations.filter((r) => r.status === "NO_SHOW").length;
  const rate = (noShows / registrations.length) * 100;

  return Math.round(rate * 10) / 10;
}

/**
 * Get badge progress
 */
export function getBadgeProgress(
  currentHours: number,
  badgeThresholds: number[]
): {
  current: number;
  next: number | null;
  progress: number;
} {
  const nextThreshold = badgeThresholds.find((t) => t > currentHours) || null;
  const currentThreshold = badgeThresholds.filter((t) => t <= currentHours).pop() || 0;

  const progress = nextThreshold
    ? ((currentHours - currentThreshold) / (nextThreshold - currentThreshold)) * 100
    : 100;

  return {
    current: currentThreshold,
    next: nextThreshold,
    progress: Math.round(progress),
  };
}

/**
 * Format large numbers (e.g., 1.2K, 1.5M)
 */
export function formatLargeNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
}
