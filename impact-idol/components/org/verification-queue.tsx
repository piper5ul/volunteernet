"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clock, CheckCircle2, XCircle, Timer, MapPin } from "lucide-react";
import { formatDate, formatDistanceToNow } from "@/lib/utils/date-utils";
import type { ImpactEntry, User, Opportunity } from "@/lib/types";

interface VerificationQueueProps {
  entries: Array<
    ImpactEntry & {
      user?: User | null;
      opportunity?: Opportunity | null;
    }
  >;
  onVerify: (entryId: string, tier: "SILVER" | "GOLD" | "PLATINUM") => void;
  onVerifyAll: (tier: "SILVER" | "GOLD" | "PLATINUM") => void;
  onDispute: (entryId: string, reason: string) => void;
  isLoading?: boolean;
}

export function VerificationQueue({
  entries,
  onVerify,
  onVerifyAll,
  onDispute,
  isLoading,
}: VerificationQueueProps) {
  if (entries.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <CheckCircle2 className="mb-4 h-12 w-12 text-green-600" />
          <h3 className="mb-2 text-lg font-semibold">All Caught Up!</h3>
          <p className="text-sm text-muted-foreground">No pending verifications at the moment</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Batch Actions */}
      <div className="flex items-center justify-between rounded-lg border bg-gray-50 p-4">
        <div>
          <p className="font-medium">{entries.length} Pending Verification{entries.length !== 1 ? "s" : ""}</p>
          <p className="text-sm text-muted-foreground">
            Select a tier to verify all at once
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select onValueChange={(value) => onVerifyAll(value as any)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Verify All As..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="SILVER">🥈 Silver (Email Only)</SelectItem>
              <SelectItem value="GOLD">🥇 Gold (QR/GPS)</SelectItem>
              <SelectItem value="PLATINUM">✨ Platinum (Squad)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Verification Items */}
      {entries.map((entry) => {
        const hoursUntilAutoVerify = entry.auto_verify_at
          ? Math.max(
              0,
              Math.floor(
                (new Date(entry.auto_verify_at).getTime() - Date.now()) /
                  (1000 * 60 * 60)
              )
            )
          : null;

        const initials = entry.user?.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase();

        return (
          <Card key={entry.id} className="border-yellow-200 bg-yellow-50">
            <CardContent className="p-6">
              <div className="flex gap-4">
                {/* Volunteer Info */}
                <Avatar className="h-12 w-12">
                  {entry.user?.avatar_url ? (
                    <AvatarImage src={entry.user.avatar_url} alt={entry.user.name} />
                  ) : (
                    <AvatarFallback>{initials}</AvatarFallback>
                  )}
                </Avatar>

                <div className="flex-1 space-y-3">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold">{entry.user?.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {entry.role_title || entry.opportunity?.title}
                      </p>
                    </div>
                    {hoursUntilAutoVerify !== null && (
                      <Badge variant="secondary" className="gap-1">
                        <Timer className="h-3 w-3" />
                        Auto-verify in {hoursUntilAutoVerify}h
                      </Badge>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{entry.hours} hour{entry.hours !== 1 ? "s" : ""}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{formatDate(entry.date, "MMM d, yyyy")}</span>
                    </div>
                    {entry.opportunity?.location && (
                      <span>{entry.opportunity.location.name}</span>
                    )}
                  </div>

                  {entry.description && (
                    <p className="text-sm text-muted-foreground">{entry.description}</p>
                  )}

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onVerify(entry.id, "SILVER")}
                      disabled={isLoading}
                      className="gap-1"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      Verify as Silver
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onVerify(entry.id, "GOLD")}
                      disabled={isLoading}
                      className="gap-1"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      Verify as Gold
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onVerify(entry.id, "PLATINUM")}
                      disabled={isLoading}
                      className="gap-1"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      Verify as Platinum
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onDispute(entry.id, "Not verified")}
                      disabled={isLoading}
                      className="gap-1 text-red-600 hover:text-red-700"
                    >
                      <XCircle className="h-4 w-4" />
                      Dispute
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
