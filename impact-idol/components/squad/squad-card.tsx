import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Users, Clock, Calendar, TrendingUp } from "lucide-react";
import type { Squad, User } from "@/lib/types";
import Link from "next/link";

interface SquadCardProps {
  squad: Squad & {
    leader?: User | null;
    members?: User[];
  };
}

export function SquadCard({ squad }: SquadCardProps) {
  const memberCount = squad.members?.length || 0;
  const totalHours = squad.total_hours || 0;
  const eventCount = squad.event_count || 0;

  const typeColors = {
    corporate: "bg-blue-600",
    school: "bg-purple-600",
    social: "bg-green-600",
    family: "bg-pink-600",
    other: "bg-gray-600",
  };

  const typeLabels = {
    corporate: "Corporate",
    school: "School",
    social: "Social",
    family: "Family",
    other: "Other",
  };

  return (
    <Link href={`/squads/${squad.id}`}>
      <Card className="transition-all hover:shadow-lg">
        <CardContent className="p-6">
          <div className="mb-4 flex items-start justify-between">
            <div className="flex-1">
              <div className="mb-2 flex items-center gap-2">
                <h3 className="text-xl font-semibold">{squad.name}</h3>
                <Badge className={typeColors[squad.type]}>
                  {typeLabels[squad.type]}
                </Badge>
              </div>
              {squad.description && (
                <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
                  {squad.description}
                </p>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="mb-4 grid grid-cols-3 gap-4">
            <div className="flex flex-col">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Users className="h-4 w-4" />
                <span className="text-xs">Members</span>
              </div>
              <p className="mt-1 text-2xl font-bold">{memberCount}</p>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span className="text-xs">Hours</span>
              </div>
              <p className="mt-1 text-2xl font-bold">{totalHours}</p>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span className="text-xs">Events</span>
              </div>
              <p className="mt-1 text-2xl font-bold">{eventCount}</p>
            </div>
          </div>

          {/* Members Preview */}
          {squad.members && squad.members.length > 0 && (
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {squad.members.slice(0, 5).map((member) => (
                  <Avatar key={member.id} className="h-8 w-8 border-2 border-white">
                    {member.avatar_url ? (
                      <AvatarImage src={member.avatar_url} alt={member.name} />
                    ) : (
                      <AvatarFallback className="text-xs">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    )}
                  </Avatar>
                ))}
              </div>
              {memberCount > 5 && (
                <span className="text-sm text-muted-foreground">
                  +{memberCount - 5} more
                </span>
              )}
            </div>
          )}

          {/* Leader */}
          {squad.leader && (
            <div className="mt-3 flex items-center gap-2 border-t pt-3">
              <Avatar className="h-6 w-6">
                {squad.leader.avatar_url ? (
                  <AvatarImage src={squad.leader.avatar_url} alt={squad.leader.name} />
                ) : (
                  <AvatarFallback className="text-xs">
                    {squad.leader.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="text-sm">
                <span className="text-muted-foreground">Led by </span>
                <span className="font-medium">{squad.leader.name}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
