'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageSquare, Briefcase, UserPlus, CheckCircle2 } from 'lucide-react';
import { toast } from "sonner";

export default function NotificationsPage() {

    const handleMarkAllRead = () => {
        toast.success("All notifications marked as read");
    };

    return (
        <div className="max-w-3xl mx-auto py-8 px-4">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-linear-900">Notifications</h1>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleMarkAllRead}>Mark all as read</Button>
                </div>
            </div>

            <div className="flex gap-2 mb-6 border-b border-linear-200 pb-1">
                <button className="px-4 py-2 text-sm font-medium text-linear-900 border-b-2 border-linear-900 -mb-1.5">All</button>
                <button className="px-4 py-2 text-sm font-medium text-linear-500 hover:text-linear-700">Unread</button>
                <button className="px-4 py-2 text-sm font-medium text-linear-500 hover:text-linear-700">Mentions</button>
            </div>

            <div className="space-y-1">
                {/* Notification Item */}
                <div className="group flex gap-4 p-4 rounded-lg bg-white border border-linear-200 hover:border-linear-300 transition-colors relative">
                    <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="w-2 h-2 rounded-full bg-blue-500 block"></span>
                    </div>
                    <div className="mt-1 w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        <UserPlus className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm text-linear-900">
                            <span className="font-semibold">Sarah Jenkins</span> sent you a connection request.
                        </p>
                        <div className="text-xs text-linear-500 mt-1">2 hours ago</div>
                        <div className="flex gap-2 mt-3">
                            <Button size="sm" className="h-7 text-xs">Accept</Button>
                            <Button size="sm" variant="ghost" className="h-7 text-xs">Ignore</Button>
                        </div>
                    </div>
                </div>

                {/* Notification Item */}
                <div className="group flex gap-4 p-4 rounded-lg bg-linear-50/50 border border-transparent hover:bg-white hover:border-linear-200 transition-colors">
                    <div className="mt-1 w-8 h-8 rounded-full bg-green-50 text-peer-green flex items-center justify-center shrink-0">
                        <Briefcase className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm text-linear-900">
                            New opportunity matching your skills: <span className="font-semibold">Web Developer for Non-Profit</span>
                        </p>
                        <div className="text-xs text-linear-500 mt-1">5 hours ago</div>
                    </div>
                </div>

                {/* Notification Item */}
                <div className="group flex gap-4 p-4 rounded-lg bg-linear-50/50 border border-transparent hover:bg-white hover:border-linear-200 transition-colors">
                    <div className="mt-1 w-8 h-8 rounded-full bg-pink-50 text-pink-500 flex items-center justify-center shrink-0">
                        <Heart className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm text-linear-900">
                            <span className="font-semibold">Alex Rivera</span> liked your post about the Coastal Cleanup.
                        </p>
                        <div className="text-xs text-linear-500 mt-1">1 day ago</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
