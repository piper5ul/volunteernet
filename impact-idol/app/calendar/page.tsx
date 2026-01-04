"use client";

import { useState } from "react";
import { trpc } from "@/lib/utils/trpc";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, MapPin, Clock, Download, Filter } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<"month" | "week" | "day">("month");
  const [selectedCause, setSelectedCause] = useState<string>("all");

  const { data: opportunities, isLoading } = trpc.opportunities.list.useQuery({
    limit: 100,
  });

  const { data: causes } = trpc.causes.list.useQuery();

  // Get month/year
  const monthYear = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  // Navigation
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Get days in month
  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Previous month days
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push({ date: null, opportunities: [] });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const dayOpportunities = (opportunities?.opportunities || []).filter((opp) => {
        const oppDate = new Date(opp.starts_at);
        return (
          oppDate.getDate() === i &&
          oppDate.getMonth() === month &&
          oppDate.getFullYear() === year &&
          (selectedCause === "all" || opp.cause_id === selectedCause)
        );
      });

      days.push({ date, opportunities: dayOpportunities });
    }

    return days;
  };

  const days = getDaysInMonth();
  const today = new Date();

  if (isLoading) {
    return (
      <div className="flex flex-col h-screen bg-white">
        <div className="h-14 border-b border-linear-100 flex items-center px-6">
          <Skeleton className="h-5 w-32" />
        </div>
        <div className="flex-1 overflow-y-auto p-8">
          <Skeleton className="h-96" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <header className="h-14 border-b border-linear-100 flex items-center px-6 gap-4 shrink-0">
        <h1 className="font-medium text-[14px] text-linear-900">Calendar</h1>
        <div className="h-4 w-px bg-linear-200"></div>
        <span className="text-[13px] text-linear-500">
          {opportunities?.total || 0} opportunities
        </span>

        <div className="ml-auto flex items-center gap-3">
          {/* Month Navigation */}
          <div className="flex items-center gap-2">
            <button
              onClick={goToPreviousMonth}
              className="p-1.5 hover:bg-linear-100 rounded text-linear-500 hover:text-linear-900 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="min-w-[140px] text-center text-[13px] font-medium text-linear-900">
              {monthYear}
            </div>
            <button
              onClick={goToNextMonth}
              className="p-1.5 hover:bg-linear-100 rounded text-linear-500 hover:text-linear-900 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={goToToday}
            className="text-[12px] font-medium text-linear-900 px-2 py-1 rounded hover:bg-linear-100 transition-colors"
          >
            Today
          </button>

          {/* Cause Filter */}
          <div className="relative">
            <select
              value={selectedCause}
              onChange={(e) => setSelectedCause(e.target.value)}
              className="text-[12px] text-linear-900 border border-linear-200 rounded px-2 py-1 pr-6 bg-white hover:bg-linear-50 focus:outline-none focus:ring-1 focus:ring-linear-300"
            >
              <option value="all">All Causes</option>
              {causes?.map((cause) => (
                <option key={cause.id} value={cause.id}>
                  {cause.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-[#fbfbfc]">
        <div className="max-w-7xl mx-auto p-6">
          {/* Calendar Grid */}
          {view === "month" && (
            <div className="rounded-lg border border-linear-200 bg-white shadow-sm overflow-hidden">
              {/* Weekday Headers */}
              <div className="grid grid-cols-7 gap-0 border-b border-linear-100 bg-linear-50">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="p-3 text-center text-[11px] font-medium text-linear-500 uppercase tracking-wider">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-0">
                {days.map((day, index) => {
                  const isToday =
                    day.date &&
                    day.date.getDate() === today.getDate() &&
                    day.date.getMonth() === today.getMonth() &&
                    day.date.getFullYear() === today.getFullYear();

                  return (
                    <div
                      key={index}
                      className={`min-h-[100px] p-2 border-r border-b border-linear-100 ${
                        day.date
                          ? isToday
                            ? "bg-peer-green/5"
                            : "bg-white hover:bg-linear-50"
                          : "bg-linear-50/50"
                      } ${index % 7 === 6 ? "border-r-0" : ""}`}
                    >
                      {day.date && (
                        <>
                          <div
                            className={`mb-2 text-[12px] font-medium ${
                              isToday
                                ? "w-6 h-6 flex items-center justify-center rounded-full bg-peer-green text-white"
                                : "text-linear-600"
                            }`}
                          >
                            {day.date.getDate()}
                          </div>

                          {/* Opportunities */}
                          <div className="space-y-1">
                            {day.opportunities.slice(0, 2).map((opp) => (
                              <Link
                                key={opp.id}
                                href={`/discover/${opp.id}`}
                                className="block rounded px-1.5 py-0.5 text-[10px] font-medium bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors truncate"
                              >
                                {opp.title}
                              </Link>
                            ))}
                            {day.opportunities.length > 2 && (
                              <div className="text-[10px] text-linear-400 px-1.5">
                                +{day.opportunities.length - 2} more
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Upcoming Events List */}
          <div className="mt-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-[14px] font-semibold text-linear-900">Upcoming Events</h2>
              <button className="text-[12px] font-medium text-linear-900 px-2 py-1 rounded hover:bg-linear-100 transition-colors flex items-center gap-1.5">
                <Download className="w-3.5 h-3.5" />
                Export
              </button>
            </div>

            <div className="space-y-3">
              {(opportunities?.opportunities || [])
                .filter((opp) => new Date(opp.starts_at) >= new Date())
                .slice(0, 5)
                .map((opp) => (
                  <div key={opp.id} className="rounded-lg border border-linear-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                    <div className="p-4">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex-1">
                          <Link href={`/discover/${opp.id}`}>
                            <h3 className="mb-2 text-[14px] font-semibold text-linear-900 hover:text-peer-green transition-colors">
                              {opp.title}
                            </h3>
                          </Link>

                          <div className="flex flex-wrap items-center gap-3 text-[11px] text-linear-500">
                            <div className="flex items-center gap-1">
                              <CalendarIcon className="w-3.5 h-3.5" />
                              {format(new Date(opp.starts_at), "MMM d, yyyy")}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              {format(new Date(opp.starts_at), "h:mm a")}
                            </div>
                            {opp.location && (
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5" />
                                {opp.location.name}
                              </div>
                            )}
                          </div>

                          {opp.organization && (
                            <div className="mt-2 text-[11px] text-linear-600">
                              {opp.organization.name}
                            </div>
                          )}
                        </div>

                        <Link
                          href={`/discover/${opp.id}`}
                          className="bg-linear-900 text-white text-[12px] font-medium px-3 py-1.5 rounded hover:bg-black transition-colors shadow-subtle inline-block text-center shrink-0"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}

              {(!opportunities?.opportunities || opportunities.opportunities.filter((opp) => new Date(opp.starts_at) >= new Date()).length === 0) && (
                <div className="rounded-lg border border-linear-200 bg-white shadow-sm py-12 text-center">
                  <CalendarIcon className="mx-auto mb-3 h-10 w-10 text-linear-400" />
                  <h3 className="mb-2 text-[14px] font-semibold text-linear-900">No upcoming events</h3>
                  <p className="text-[13px] text-linear-500">Check back later for new opportunities</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
