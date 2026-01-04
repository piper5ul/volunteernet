"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface OpportunityFiltersProps {
  causes: Array<{ id: string; name: string; color: string }>;
  selectedCauses: string[];
  onCauseToggle: (causeId: string) => void;
  showVirtualOnly: boolean;
  onVirtualToggle: () => void;
  onClearAll: () => void;
}

export function OpportunityFilters({
  causes,
  selectedCauses,
  onCauseToggle,
  showVirtualOnly,
  onVirtualToggle,
  onClearAll,
}: OpportunityFiltersProps) {
  const hasFilters = selectedCauses.length > 0 || showVirtualOnly;

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Filters</CardTitle>
          {hasFilters && (
            <Button variant="ghost" size="sm" onClick={onClearAll}>
              <X className="mr-1 h-4 w-4" />
              Clear
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Causes */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium">Causes</h3>
          <div className="space-y-2">
            {causes.map((cause) => (
              <div key={cause.id} className="flex items-center space-x-2">
                <Checkbox
                  id={cause.id}
                  checked={selectedCauses.includes(cause.id)}
                  onCheckedChange={() => onCauseToggle(cause.id)}
                />
                <Label
                  htmlFor={cause.id}
                  className="flex cursor-pointer items-center gap-2 text-sm font-normal"
                >
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: cause.color }}
                  />
                  {cause.name}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Type */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium">Type</h3>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="virtual"
              checked={showVirtualOnly}
              onCheckedChange={onVirtualToggle}
            />
            <Label htmlFor="virtual" className="cursor-pointer text-sm font-normal">
              Virtual only
            </Label>
          </div>
        </div>

        {/* Active Filters */}
        {hasFilters && (
          <>
            <Separator />
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Active Filters</h3>
              <div className="flex flex-wrap gap-2">
                {selectedCauses.map((causeId) => {
                  const cause = causes.find((c) => c.id === causeId);
                  if (!cause) return null;
                  return (
                    <Badge
                      key={causeId}
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={() => onCauseToggle(causeId)}
                    >
                      {cause.name}
                      <X className="ml-1 h-3 w-3" />
                    </Badge>
                  );
                })}
                {showVirtualOnly && (
                  <Badge variant="secondary" className="cursor-pointer" onClick={onVirtualToggle}>
                    Virtual
                    <X className="ml-1 h-3 w-3" />
                  </Badge>
                )}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
