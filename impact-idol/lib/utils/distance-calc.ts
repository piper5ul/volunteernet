import type { Location } from "@/lib/types";

/**
 * Calculate distance between two coordinates using Haversine formula
 * Returns distance in miles
 */
export function calculateDistance(
  point1: { lat: number; lng: number },
  point2: { lat: number; lng: number }
): number {
  const R = 3959; // Earth's radius in miles
  const dLat = toRad(point2.lat - point1.lat);
  const dLon = toRad(point2.lng - point1.lng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(point1.lat)) *
      Math.cos(toRad(point2.lat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return Math.round(distance * 10) / 10; // Round to 1 decimal place
}

function toRad(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

/**
 * Format distance for display
 */
export function formatDistance(miles: number): string {
  if (miles < 0.1) {
    return "< 0.1 mi";
  }

  if (miles < 1) {
    return `${(miles * 5280).toFixed(0)} ft`;
  }

  if (miles < 100) {
    return `${miles.toFixed(1)} mi`;
  }

  return `${Math.round(miles)} mi`;
}

/**
 * Check if a location is within a radius
 */
export function isWithinRadius(
  center: { lat: number; lng: number },
  point: { lat: number; lng: number },
  radiusMiles: number
): boolean {
  const distance = calculateDistance(center, point);
  return distance <= radiusMiles;
}

/**
 * Find nearby items from a list
 */
export function findNearby<T extends { location?: Location }>(
  items: T[],
  center: { lat: number; lng: number },
  radiusMiles: number
): Array<T & { distance: number }> {
  return items
    .filter((item) => item.location !== undefined)
    .map((item) => ({
      ...item,
      distance: calculateDistance(center, item.location!),
    }))
    .filter((item) => item.distance <= radiusMiles)
    .sort((a, b) => a.distance - b.distance);
}

/**
 * Sort items by distance from a point
 */
export function sortByDistance<T extends { location?: Location }>(
  items: T[],
  center: { lat: number; lng: number }
): Array<T & { distance: number }> {
  return items
    .filter((item) => item.location !== undefined)
    .map((item) => ({
      ...item,
      distance: calculateDistance(center, item.location!),
    }))
    .sort((a, b) => a.distance - b.distance);
}

/**
 * Get bounding box for a radius
 * Returns {minLat, maxLat, minLng, maxLng}
 */
export function getBoundingBox(
  center: { lat: number; lng: number },
  radiusMiles: number
): {
  minLat: number;
  maxLat: number;
  minLng: number;
  maxLng: number;
} {
  const latChange = radiusMiles / 69; // 1 degree lat ≈ 69 miles
  const lngChange = radiusMiles / (69 * Math.cos(toRad(center.lat)));

  return {
    minLat: center.lat - latChange,
    maxLat: center.lat + latChange,
    minLng: center.lng - lngChange,
    maxLng: center.lng + lngChange,
  };
}

/**
 * Mock geocoding - convert address to coordinates
 * In production, this would call Google Maps Geocoding API
 */
export async function geocodeAddress(address: string): Promise<Location> {
  // Mock implementation - return San Francisco by default
  // In production, call Google Maps Geocoding API
  return {
    lat: 37.7749,
    lng: -122.4194,
    name: address,
  };
}

/**
 * Mock reverse geocoding - convert coordinates to address
 */
export async function reverseGeocode(lat: number, lng: number): Promise<string> {
  // Mock implementation
  // In production, call Google Maps Reverse Geocoding API
  return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
}
