"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Clock, MapPin, CheckCircle2, Clock as PendingIcon, AlertCircle } from "lucide-react";
import { formatDate } from "@/lib/utils/date-utils";
import type { ImpactEntry, Organization, Opportunity } from "@/lib/types";

interface ImpactTimelineProps {
  entries: Array<
    ImpactEntry & {
      organization?: Organization | null;
      opportunity?: Opportunity | null;
    }
  >;
}

export function ImpactTimeline({ entries }: ImpactTimelineProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "VERIFIED":
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case "PENDING":
        return <PendingIcon className="h-5 w-5 text-yellow-600" />;
      case "DISPUTED":
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string, tier?: string | null) => {
    if (status === "VERIFIED") {
      return (
        <Badge className="bg-green-600">
          {tier === "PLATINUM" ? "✨ Platinum Verified" : tier === "GOLD" ? "🥇 Gold Verified" : "🥈 Silver Verified"}
        </Badge>
      );
    }
    if (status === "PENDING") {
      return <Badge variant="secondary">Pending Verification</Badge>;
    }
    if (status === "DISPUTED") {
      return <Badge variant="destructive">Disputed</Badge>;
    }
    return null;
  };

  if (entries.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Clock className="mb-4 h-12 w-12 text-muted-foreground" />
          <h3 className="mb-2 text-lg font-semibold">No Volunteer History Yet</h3>
          <p className="text-sm text-muted-foreground">
            Your volunteer activities will appear here once you start volunteering!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {entries.map((entry, index) => (
        <Card key={entry.id}>
          <CardContent className="p-6">
            <div className="flex gap-4">
              {/* Icon/Avatar */}
              <div className="shrink-0">
                {entry.organization?.logo_url ? (
                  <Avatar className="h-12 w-12">
                    <img src={entry.organization.logo_url} alt={entry.organization.name} />
                  </Avatar>
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold">
                      {entry.role_title || entry.opportunity?.title || "Volunteer Activity"}
                    </h3>
                    {entry.organization && (
                      <p className="text-sm text-muted-foreground">{entry.organization.name}</p>
                    )}
                  </div>
                  {getStatusIcon(entry.status)}
                </div>

                {entry.description && (
                  <p className="text-sm text-muted-foreground">{entry.description}</p>
                )}

                {entry.impact_description && (
                  <p className="text-sm font-medium text-green-700">
                    💚 {entry.impact_description}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{entry.hours} hour{entry.hours !== 1 ? "s" : ""}</span>
                  </div>
                  <div className="text-muted-foreground">•</div>
                  <span className="text-muted-foreground">{formatDate(entry.date, "PPP")}</span>
                  {getStatusBadge(entry.status, entry.tier)}
                  {entry.is_historical && <Badge variant="outline">Historical</Badge>}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
