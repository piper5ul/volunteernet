"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Clock, Award, Building2, Heart, DollarSign } from "lucide-react";
import { formatMonetaryValue } from "@/lib/utils/impact-calc";

interface ImpactStatsGridProps {
  stats: {
    totalHours: number;
    verifiedHours: number;
    uniqueOrgs: number;
    uniqueCauses: number;
    monetaryValue: number;
  };
}

export function ImpactStatsGrid({ stats }: ImpactStatsGridProps) {
  const { totalHours, verifiedHours, uniqueOrgs, uniqueCauses, monetaryValue } = stats;
  const statItems = [
    {
      label: "Total Hours",
      value: totalHours.toFixed(1),
      icon: Clock,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      label: "Verified Hours",
      value: verifiedHours.toFixed(1),
      icon: Award,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      label: "Organizations",
      value: uniqueOrgs,
      icon: Building2,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      label: "Causes Supported",
      value: uniqueCauses,
      icon: Heart,
      color: "text-pink-600",
      bgColor: "bg-pink-100",
    },
    {
      label: "Monetary Value",
      value: formatMonetaryValue(monetaryValue),
      icon: DollarSign,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
      description: "Value of volunteer time",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {statItems.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <p className="mt-2 text-3xl font-bold">{stat.value}</p>
                  {stat.description && (
                    <p className="mt-1 text-xs text-muted-foreground">{stat.description}</p>
                  )}
                </div>
                <div className={`rounded-full ${stat.bgColor} p-3`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
