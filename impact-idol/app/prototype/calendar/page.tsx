'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MapPin, Clock } from 'lucide-react';

export default function CalendarPage() {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dates = Array.from({ length: 35 }, (_, i) => i + 1); // Mock calendar grid

    return (
        <div className="flex flex-col h-full bg-white">
            <header className="h-14 border-b border-linear-200 flex items-center justify-between px-6 shrink-0">
                <h1 className="text-lg font-semibold text-linear-900">Schedule</h1>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0"><ChevronLeft className="w-4 h-4" /></Button>
                    <span className="text-sm font-medium text-linear-900 w-32 text-center">March 2026</span>
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0"><ChevronRight className="w-4 h-4" /></Button>
                    <div className="h-4 w-px bg-linear-200 mx-2"></div>
                    <Button variant="outline" size="sm" className="h-8 text-xs">Today</Button>
                </div>
            </header>

            <div className="flex-1 flex overflow-hidden">
                {/* Calendar Grid */}
                <div className="flex-1 border-r border-linear-200 flex flex-col">
                    <div className="grid grid-cols-7 border-b border-linear-200">
                        {days.map(day => (
                            <div key={day} className="py-2 text-center text-xs font-medium text-linear-500 bg-linear-50/50">
                                {day}
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-7 grid-rows-5 flex-1 bg-linear-50">
                        {dates.map(date => {
                            const dayNum = date > 31 ? date - 31 : date; // overflow logic simplistic
                            const isCurrentMonth = date <= 31;

                            return (
                                <div key={date} className={`border-b border-r border-linear-200 bg-white p-2 min-h-[100px] relative hover:bg-linear-50 transition-colors group ${!isCurrentMonth && 'bg-linear-50/30'}`}>
                                    <span className={`text-xs font-medium ${isCurrentMonth ? 'text-linear-700' : 'text-linear-300'}`}>{dayNum}</span>

                                    {date === 14 && (
                                        <div className="mt-2 text-[10px] bg-blue-50 text-blue-700 border border-blue-100 rounded px-1.5 py-1 font-medium truncate cursor-pointer hover:bg-blue-100 transition-colors">
                                            Beach Cleanup
                                        </div>
                                    )}
                                    {date === 16 && (
                                        <div className="mt-2 text-[10px] bg-green-50 text-green-700 border border-green-100 rounded px-1.5 py-1 font-medium truncate cursor-pointer hover:bg-green-100 transition-colors">
                                            Food Bank
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Upcoming List */}
                <div className="w-80 bg-white shrink-0 flex flex-col">
                    <div className="p-4 border-b border-linear-200">
                        <h3 className="text-sm font-semibold text-linear-900">Upcoming Events</h3>
                    </div>
                    <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                        {[1, 2].map(i => (
                            <div key={i} className="flex gap-3 items-start group cursor-pointer">
                                <div className="flex flex-col items-center min-w-[3rem] bg-linear-50 rounded border border-linear-200 p-2 text-center">
                                    <span className="text-[10px] uppercase font-bold text-linear-500">Mar</span>
                                    <span className="text-xl font-bold text-linear-900 leading-none mt-0.5">{14 + i * 2}</span>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-linear-900 group-hover:text-blue-600 transition-colors">Beach Cleanup Drive</h4>
                                    <div className="mt-1 flex items-center gap-1.5 text-xs text-linear-500">
                                        <Clock className="w-3 h-3" />
                                        <span>9:00 AM - 12:00 PM</span>
                                    </div>
                                    <div className="mt-1 flex items-center gap-1.5 text-xs text-linear-500">
                                        <MapPin className="w-3 h-3" />
                                        <span>Ocean Beach, SF</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
