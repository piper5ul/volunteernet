import { format, formatDistance, formatRelative, differenceInHours, addHours, isFuture, isPast, isToday, isTomorrow, parseISO } from "date-fns";

/**
 * Format a date to a readable string
 */
export function formatDate(date: Date | string, formatStr: string = "PPP"): string {
  const d = typeof date === "string" ? parseISO(date) : date;
  return format(d, formatStr);
}

/**
 * Format a date relative to now ("2 hours ago", "in 3 days")
 */
export function formatRelativeDate(date: Date | string): string {
  const d = typeof date === "string" ? parseISO(date) : date;
  return formatDistance(d, new Date(), { addSuffix: true });
}

/**
 * Format distance to now ("2 hours ago", "in 3 days")
 * Alias for formatRelativeDate for consistency
 */
export function formatDistanceToNow(date: Date | string): string {
  return formatRelativeDate(date);
}

/**
 * Format a date with context ("Today at 5:30 PM", "Tomorrow at 9:00 AM", "Jan 15 at 2:00 PM")
 */
export function formatDateWithContext(date: Date | string): string {
  const d = typeof date === "string" ? parseISO(date) : date;

  if (isToday(d)) {
    return `Today at ${format(d, "h:mm a")}`;
  }

  if (isTomorrow(d)) {
    return `Tomorrow at ${format(d, "h:mm a")}`;
  }

  return format(d, "MMM d 'at' h:mm a");
}

/**
 * Format time range (e.g., "9:00 AM - 12:00 PM")
 */
export function formatTimeRange(start: Date | string, end: Date | string): string {
  const s = typeof start === "string" ? parseISO(start) : start;
  const e = typeof end === "string" ? parseISO(end) : end;

  return `${format(s, "h:mm a")} - ${format(e, "h:mm a")}`;
}

/**
 * Calculate hours between two dates
 */
export function calculateHours(start: Date | string, end: Date | string): number {
  const s = typeof start === "string" ? parseISO(start) : start;
  const e = typeof end === "string" ? parseISO(end) : end;

  const hours = differenceInHours(e, s);
  return Math.max(0, hours);
}

/**
 * Get time remaining until a date (for countdown timers)
 */
export function getTimeRemaining(targetDate: Date | string): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
} {
  const target = typeof targetDate === "string" ? parseISO(targetDate) : targetDate;
  const now = new Date();
  const total = Math.max(0, target.getTime() - now.getTime());

  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return {
    total,
    days,
    hours,
    minutes,
    seconds,
  };
}

/**
 * Format countdown timer string
 */
export function formatCountdown(targetDate: Date | string): string {
  const remaining = getTimeRemaining(targetDate);

  if (remaining.total <= 0) {
    return "Expired";
  }

  if (remaining.days > 0) {
    return `${remaining.days}d ${remaining.hours}h`;
  }

  if (remaining.hours > 0) {
    return `${remaining.hours}h ${remaining.minutes}m`;
  }

  return `${remaining.minutes}m ${remaining.seconds}s`;
}

/**
 * Check if an event is upcoming (within next 7 days)
 */
export function isUpcoming(date: Date | string): boolean {
  const d = typeof date === "string" ? parseISO(date) : date;
  const weekFromNow = addHours(new Date(), 7 * 24);
  return isFuture(d) && d <= weekFromNow;
}

/**
 * Group dates by month for charts
 */
export function groupByMonth(dates: Array<{ date: Date; value: number }>): Array<{ month: string; value: number }> {
  const grouped = new Map<string, number>();

  dates.forEach(({ date, value }) => {
    const month = format(date, "MMM yyyy");
    grouped.set(month, (grouped.get(month) || 0) + value);
  });

  return Array.from(grouped.entries()).map(([month, value]) => ({
    month,
    value,
  }));
}

/**
 * Generate .ics calendar file content
 */
export function generateICS(event: {
  title: string;
  description: string;
  location: string;
  start: Date;
  end: Date;
  url?: string;
}): string {
  const formatICSDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  };

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Impact Idol//Volunteer Event//EN
BEGIN:VEVENT
UID:${Date.now()}@impactidol.com
DTSTAMP:${formatICSDate(new Date())}
DTSTART:${formatICSDate(event.start)}
DTEND:${formatICSDate(event.end)}
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
URL:${event.url || "https://impactidol.com"}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;
}
