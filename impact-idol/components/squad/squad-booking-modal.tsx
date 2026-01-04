"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Users, AlertCircle } from "lucide-react";
import type { Opportunity, Squad } from "@/lib/types";

interface SquadBookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  opportunity: Opportunity;
  squad: Squad;
  onBook: (spotCount: number) => void;
  isLoading?: boolean;
}

export function SquadBookingModal({
  open,
  onOpenChange,
  opportunity,
  squad,
  onBook,
  isLoading,
}: SquadBookingModalProps) {
  const [spotCount, setSpotCount] = useState(1);

  const spotsLeft = opportunity.capacity
    ? opportunity.capacity - opportunity.current_registrations
    : null;

  const handleBook = () => {
    onBook(spotCount);
  };

  const canBook = spotsLeft === null || spotCount <= spotsLeft;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Book Squad Spots</DialogTitle>
          <DialogDescription>
            Reserve spots for {squad.name} at this volunteer opportunity
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Opportunity Info */}
          <div className="rounded-lg border p-3">
            <p className="font-medium">{opportunity.title}</p>
            <p className="text-sm text-muted-foreground">
              {opportunity.organization?.name}
            </p>
          </div>

          {/* Capacity Info */}
          {spotsLeft !== null && (
            <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>Available Spots</span>
              </div>
              <Badge variant={spotsLeft > 5 ? "secondary" : "destructive"}>
                {spotsLeft} left
              </Badge>
            </div>
          )}

          {/* Spot Count Input */}
          <div className="space-y-2">
            <Label htmlFor="spotCount">Number of Spots to Reserve</Label>
            <Input
              id="spotCount"
              type="number"
              min={1}
              max={spotsLeft || undefined}
              value={spotCount}
              onChange={(e) => setSpotCount(parseInt(e.target.value) || 1)}
            />
            <p className="text-xs text-muted-foreground">
              You can invite up to {spotCount} squad member{spotCount !== 1 ? "s" : ""} to this
              event
            </p>
          </div>

          {/* Warning if trying to book too many */}
          {!canBook && spotsLeft !== null && (
            <div className="flex gap-2 rounded-lg border border-red-200 bg-red-50 p-3">
              <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-600" />
              <p className="text-sm text-red-900">
                Only {spotsLeft} spot{spotsLeft !== 1 ? "s are" : " is"} available. Please reduce
                the number of spots.
              </p>
            </div>
          )}

          {/* What Happens Next */}
          <div className="rounded-lg bg-blue-50 p-3">
            <p className="mb-1 text-sm font-medium text-blue-900">What happens next:</p>
            <ol className="list-decimal space-y-1 pl-5 text-sm text-blue-800">
              <li>Spots will be reserved for your squad</li>
              <li>You'll receive a magic link to share with your team</li>
              <li>Team members can register with just their name and email</li>
              <li>No account required to participate!</li>
            </ol>
          </div>
        </div>

        <DialogFooter className="flex-col gap-2 sm:flex-row">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
            Cancel
          </Button>
          <Button
            onClick={handleBook}
            disabled={!canBook || isLoading || spotCount < 1}
            className="w-full sm:w-auto"
          >
            {isLoading ? "Booking..." : `Book ${spotCount} Spot${spotCount !== 1 ? "s" : ""}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
