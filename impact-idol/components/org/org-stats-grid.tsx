import { Card, CardContent } from "@/components/ui/card";
import { Users, Clock, Calendar, TrendingUp, DollarSign, Award } from "lucide-react";

interface OrgStatsGridProps {
  stats: {
    totalVolunteers: number;
    totalHours: number;
    totalEvents: number;
    retentionRate: number;
    monetaryValue: number;
    averageRating: number;
  };
}

export function OrgStatsGrid({ stats }: OrgStatsGridProps) {
  const statItems = [
    {
      label: "Total Volunteers",
      value: stats.totalVolunteers.toLocaleString(),
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      change: "+12% this month",
    },
    {
      label: "Total Hours",
      value: stats.totalHours.toLocaleString(),
      icon: Clock,
      color: "text-green-600",
      bgColor: "bg-green-100",
      change: "+8% this month",
    },
    {
      label: "Events Hosted",
      value: stats.totalEvents.toLocaleString(),
      icon: Calendar,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      change: `${stats.totalEvents} this year`,
    },
    {
      label: "Retention Rate",
      value: `${stats.retentionRate}%`,
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      change: "Above average",
    },
    {
      label: "Monetary Value",
      value: `$${stats.monetaryValue.toLocaleString()}`,
      icon: DollarSign,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
      change: "Grant reporting",
    },
    {
      label: "Average Rating",
      value: stats.averageRating.toFixed(1),
      icon: Award,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
      change: "From volunteers",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {statItems.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <p className="mt-2 text-3xl font-bold">{stat.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{stat.change}</p>
              </div>
              <div className={`rounded-lg p-2 ${stat.bgColor}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
