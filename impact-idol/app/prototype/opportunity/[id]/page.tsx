'use client';

import React from 'react';
import { Calendar, MapPin, Clock, Users, Share2, CheckCircle, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function OpportunityDetailPage() {
    return (
        <div className="flex h-full flex-col bg-white">
            {/* Header */}
            <header className="h-14 border-b border-linear-100 flex items-center px-6 gap-3 shrink-0">
                <Link href="/prototype/search" className="p-1.5 -ml-1.5 rounded hover:bg-linear-50 text-linear-500 transition-colors">
                    <ChevronLeft className="w-4 h-4" />
                </Link>
                <span className="text-[13px] text-linear-400 font-mono">VOL-492</span>
                <div className="h-4 w-px bg-linear-200"></div>
                <span className="text-[13px] text-linear-600">Coastal Cleanup Drive</span>

                <div className="ml-auto flex items-center gap-3">
                    <button className="p-1.5 text-linear-500 hover:bg-linear-50 rounded"><Share2 className="w-4 h-4" /></button>
                    <button className="bg-linear-900 text-white text-[12px] font-medium px-4 py-1.5 rounded-md hover:bg-black shadow-subtle">Register Now</button>
                </div>
            </header>

            <div className="flex-1 flex overflow-hidden">
                {/* Main Content */}
                <div className="flex-1 overflow-y-auto p-8 lg:p-12">
                    <div className="max-w-3xl">
                        <h1 className="text-2xl font-bold text-linear-900 mb-2">Coastal Cleanup Drive</h1>
                        <div className="flex items-center gap-2 mb-8">
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] bg-linear-100 text-linear-600 font-medium">Environment</span>
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] bg-green-50 text-peer-green border border-green-100 font-medium">Open</span>
                        </div>

                        <div className="prose prose-sm prose-gray max-w-none text-linear-800">
                            <p className="mb-4">
                                Join us for our monthly coastal cleanup event! We will be gathering at Ocean Beach to remove trash and debris, protecting our marine life and keeping our beaches beautiful for everyone to enjoy.
                            </p>
                            <h3 className="text-[14px] font-semibold text-linear-900 mt-6 mb-2">About this event</h3>
                            <p className="mb-4">
                                This event is family-friendly and suitable for all ages. We will provide:
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-2 mb-6 text-linear-600">
                                <li>Gloves and trash bags</li>
                                <li>Safety orientation</li>
                                <li>Refreshments and snacks</li>
                                <li>Community service hour verification</li>
                            </ul>

                            <h3 className="text-[14px] font-semibold text-linear-900 mt-6 mb-2">Requirements</h3>
                            <p>Comfortable walking shoes, sun protection, and a water bottle.</p>
                        </div>

                        <div className="mt-12 pt-8 border-t border-linear-100">
                            <h3 className="text-[14px] font-semibold text-linear-900 mb-4">Activity</h3>
                            <div className="space-y-4">
                                <div className="flex gap-3 text-[13px]">
                                    <div className="w-6 h-6 rounded-full bg-linear-100 flex items-center justify-center text-[10px] shrink-0 font-bold text-linear-500">SF</div>
                                    <div>
                                        <span className="font-semibold text-linear-900">SF Food Bank</span>
                                        <span className="text-linear-500"> created this opportunity</span>
                                        <div className="text-[11px] text-linear-400 mt-0.5">3 days ago</div>
                                    </div>
                                </div>
                                <div className="flex gap-3 text-[13px]">
                                    <img src="https://i.pravatar.cc/150?u=sarah" className="w-6 h-6 rounded-full shrink-0" />
                                    <div>
                                        <span className="font-semibold text-linear-900">Sarah Jenkins</span>
                                        <span className="text-linear-500"> registered for this event</span>
                                        <div className="text-[11px] text-linear-400 mt-0.5">5 hours ago</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar Metadata */}
                <aside className="w-72 border-l border-linear-100 bg-[#fbfbfc] p-6 space-y-8 shrink-0 overflow-y-auto">
                    <div>
                        <h4 className="text-[11px] font-medium text-linear-500 uppercase tracking-wider mb-3">Organization</h4>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-md bg-linear-800 flex items-center justify-center text-white text-[12px] font-bold">OC</div>
                            <div>
                                <div className="text-[13px] font-semibold text-linear-900">Ocean Cleanup</div>
                                <a href="#" className="text-[11px] text-blue-600 hover:underline">View Profile</a>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-[11px] font-medium text-linear-500 uppercase tracking-wider mb-3">Details</h4>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3 text-[13px]">
                                <Calendar className="w-4 h-4 text-linear-400 shrink-0 mt-0.5" />
                                <div>
                                    <div className="text-linear-900 font-medium">Sat, Mar 12, 2026</div>
                                    <div className="text-linear-500 text-[11px]">9:00 AM - 12:00 PM</div>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 text-[13px]">
                                <MapPin className="w-4 h-4 text-linear-400 shrink-0 mt-0.5" />
                                <div>
                                    <div className="text-linear-900 font-medium">Ocean Beach</div>
                                    <div className="text-linear-500 text-[11px]">Stairwell 17</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-[13px]">
                                <Clock className="w-4 h-4 text-linear-400 shrink-0" />
                                <span className="text-linear-900">3 Hours</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-[11px] font-medium text-linear-500 uppercase tracking-wider mb-3">Attendees</h4>
                        <div className="flex -space-x-1.5">
                            {[1, 2, 3, 4, 5].map(i => (
                                <img key={i} src={`https://i.pravatar.cc/150?u=${i}`} className="w-7 h-7 rounded-full border-2 border-white" />
                            ))}
                            <div className="w-7 h-7 rounded-full border-2 border-white bg-linear-100 flex items-center justify-center text-[9px] font-medium text-linear-500">+12</div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
