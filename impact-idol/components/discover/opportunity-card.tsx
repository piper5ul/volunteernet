"use client";

import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Clock } from "lucide-react";
import { formatDateWithContext, formatTimeRange } from "@/lib/utils/date-utils";
import { formatDistance } from "@/lib/utils/distance-calc";
import type { Opportunity, Organization, Cause } from "@/lib/types";

interface OpportunityCardProps {
  opportunity: Opportunity & {
    organization?: Organization;
    cause?: Cause;
    distance?: number;
  };
  onRegister?: () => void;
}

export function OpportunityCard({ opportunity, onRegister }: OpportunityCardProps) {
  const spotsLeft = opportunity.capacity
    ? opportunity.capacity - opportunity.current_registrations
    : null;

  return (
    <Card className="group overflow-hidden transition-shadow hover:shadow-lg">
      {/* Image */}
      {opportunity.image_url && (
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={opportunity.image_url}
            alt={opportunity.title}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
          {opportunity.is_virtual && (
            <Badge className="absolute right-3 top-3 bg-purple-600">Virtual</Badge>
          )}
        </div>
      )}

      <CardHeader className="space-y-2 pb-3">
        {/* Organization */}
        {opportunity.organization && (
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              {opportunity.organization.logo_url && (
                <img src={opportunity.organization.logo_url} alt={opportunity.organization.name} />
              )}
            </Avatar>
            <span className="text-sm text-muted-foreground">
              {opportunity.organization.name}
            </span>
          </div>
        )}

        {/* Title */}
        <Link href={`/discover/${opportunity.id}`}>
          <h3 className="text-xl font-semibold leading-tight transition-colors hover:text-primary">
            {opportunity.title}
          </h3>
        </Link>

        {/* Cause Badge */}
        {opportunity.cause && (
          <Badge
            variant="outline"
            style={{ borderColor: opportunity.cause.color, color: opportunity.cause.color }}
          >
            {opportunity.cause.name}
          </Badge>
        )}
      </CardHeader>

      <CardContent className="space-y-3 pb-3">
        {/* Description */}
        <p className="line-clamp-2 text-sm text-muted-foreground">{opportunity.description}</p>

        {/* Details Grid */}
        <div className="space-y-2 text-sm">
          {/* Date */}
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{formatDateWithContext(opportunity.starts_at)}</span>
          </div>

          {/* Time */}
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{formatTimeRange(opportunity.starts_at, opportunity.ends_at)}</span>
          </div>

          {/* Location */}
          {!opportunity.is_virtual && opportunity.location && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span className="truncate">{opportunity.location.name}</span>
              {opportunity.distance !== undefined && (
                <span className="ml-auto text-xs">
                  {formatDistance(opportunity.distance)}
                </span>
              )}
            </div>
          )}

          {/* Capacity */}
          {opportunity.capacity && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>
                {opportunity.current_registrations} / {opportunity.capacity} volunteers
              </span>
              {spotsLeft !== null && spotsLeft <= 5 && spotsLeft > 0 && (
                <Badge variant="secondary" className="ml-auto">
                  {spotsLeft} spots left
                </Badge>
              )}
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-3">
        <Button
          className="w-full"
          onClick={onRegister}
          disabled={opportunity.status !== "OPEN"}
        >
          {opportunity.status === "FULL"
            ? "Full"
            : opportunity.status === "COMPLETED"
              ? "Completed"
              : "Register"}
        </Button>
      </CardFooter>
    </Card>
  );
}
