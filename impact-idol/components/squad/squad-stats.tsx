import { Card, CardContent } from "@/components/ui/card";
import { Users, Clock, Calendar, TrendingUp, Award, DollarSign } from "lucide-react";

interface SquadStatsProps {
  stats: {
    memberCount: number;
    totalHours: number;
    eventCount: number;
    averageHoursPerMember: number;
    monetaryValue: number;
    topVolunteer?: {
      name: string;
      hours: number;
    };
  };
}

export function SquadStats({ stats }: SquadStatsProps) {
  const statItems = [
    {
      label: "Total Members",
      value: stats.memberCount,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      label: "Total Hours",
      value: stats.totalHours,
      icon: Clock,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      label: "Events Completed",
      value: stats.eventCount,
      icon: Calendar,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      label: "Avg Hours/Member",
      value: stats.averageHoursPerMember.toFixed(1),
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      label: "Monetary Value",
      value: `$${stats.monetaryValue.toLocaleString()}`,
      icon: DollarSign,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {statItems.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className={`rounded-lg p-3 ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {stats.topVolunteer && (
        <Card className="sm:col-span-2 lg:col-span-5">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-yellow-100 p-3">
                <Award className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Top Volunteer</p>
                <p className="text-xl font-semibold">
                  {stats.topVolunteer.name} - {stats.topVolunteer.hours} hours
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
