"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface ImpactChartProps {
  data: Array<{ month: string; hours: number }>;
}

export function ImpactChart({ data }: ImpactChartProps) {
  // Format month for display (e.g., "2025-01" -> "Jan")
  const formattedData = data.map((d) => ({
    ...d,
    monthLabel: new Date(d.month + "-01").toLocaleDateString("en-US", { month: "short" }),
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hours by Month</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="monthLabel" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="hours" fill="#3b82f6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
