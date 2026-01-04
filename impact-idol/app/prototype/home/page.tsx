'use client';

import React from 'react';
import { Heart, MessageSquare, Share2, MoreHorizontal, User } from 'lucide-react';

export default function HomeFeedPage() {
    return (
        <div className="flex flex-col h-full bg-linear-50/30">
            {/* Header */}
            <header className="h-14 border-b border-linear-100 bg-white flex items-center px-6 gap-4 shrink-0 sticky top-0 z-10">
                <h1 className="font-medium text-[14px]">Home Feed</h1>
                <div className="ml-auto flex items-center gap-2">
                    <button className="text-[12px] font-medium text-linear-600 hover:text-linear-900 bg-linear-100/50 px-3 py-1.5 rounded-md">Following</button>
                    <button className="text-[12px] font-medium text-linear-500 hover:text-linear-900 px-3 py-1.5 rounded-md">For You</button>
                </div>
            </header>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
                <div className="max-w-2xl mx-auto py-6 space-y-6">

                    {/* Post Creator */}
                    <div className="bg-white rounded-lg border border-linear-200 p-4 shadow-sm">
                        <div className="flex gap-3">
                            <div className="w-10 h-10 rounded-full bg-linear-100 overflow-hidden shrink-0"><img src="https://i.pravatar.cc/150?u=remix" className="w-full h-full object-cover" /></div>
                            <div className="flex-1">
                                <input type="text" placeholder="Share your latest volunteer impact..." className="w-full text-[14px] p-2 bg-linear-50 rounded-md border-transparent focus:bg-white focus:border-linear-300 focus:outline-none transition-all placeholder:text-linear-400" />
                            </div>
                        </div>
                        <div className="flex justify-between items-center mt-3 pl-12">
                            <div className="flex gap-2">
                                {/* Actions icons could go here */}
                            </div>
                            <button className="bg-linear-900 text-white text-[12px] font-medium px-4 py-1.5 rounded-md hover:bg-black shadow-subtle">Post</button>
                        </div>
                    </div>

                    {/* Feed Item 1 */}
                    <div className="bg-white rounded-lg border border-linear-200 shadow-sm overflow-hidden">
                        <div className="p-4 flex gap-3">
                            <div className="w-10 h-10 rounded-full bg-linear-100 overflow-hidden shrink-0"><img src="https://i.pravatar.cc/150?u=alex" className="w-full h-full object-cover" /></div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-[13px] font-semibold text-linear-900">Alex Rivera</h3>
                                        <p className="text-[12px] text-linear-500">Volunteered at <span className="text-linear-700 font-medium">Coastal Cleanup Drive</span></p>
                                    </div>
                                    <span className="text-[11px] text-linear-400">2h ago</span>
                                </div>
                                <p className="text-[13px] text-linear-800 mt-2 leading-relaxed">
                                    Amazing day out at the beach! We collected over 500lbs of trash today. So proud of the team and the impact we made. 🌊♻️
                                </p>
                                <div className="mt-3 rounded-lg overflow-hidden bg-linear-100 aspect-video relative">
                                    <div className="absolute inset-0 flex items-center justify-center text-linear-400 text-sm font-medium">Photo: Cleanup Crew Group Shot</div>
                                </div>

                                <div className="flex items-center gap-6 mt-4 pt-3 border-t border-linear-50">
                                    <button className="flex items-center gap-1.5 text-[12px] text-linear-500 hover:text-red-500 transition-colors group">
                                        <Heart className="w-4 h-4 group-hover:fill-red-500" /> 24
                                    </button>
                                    <button className="flex items-center gap-1.5 text-[12px] text-linear-500 hover:text-linear-900 transition-colors">
                                        <MessageSquare className="w-4 h-4" /> 5
                                    </button>
                                    <button className="flex items-center gap-1.5 text-[12px] text-linear-500 hover:text-linear-900 transition-colors ml-auto">
                                        <Share2 className="w-4 h-4" /> Share
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Feed Item 2 */}
                    <div className="bg-white rounded-lg border border-linear-200 shadow-sm overflow-hidden">
                        <div className="p-4 flex gap-3">
                            <div className="w-10 h-10 rounded-md bg-linear-800 text-white flex items-center justify-center text-[10px] font-bold shrink-0">SF</div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-[13px] font-semibold text-linear-900">SF Food Bank</h3>
                                        <p className="text-[12px] text-linear-500">Posted a new opportunity</p>
                                    </div>
                                    <button className="text-linear-400 hover:text-linear-600"><MoreHorizontal className="w-4 h-4" /></button>
                                </div>

                                <div className="mt-2 text-[13px] text-linear-800">
                                    We are urgently looking for 5 drivers for this weekend's meal distribution.
                                </div>

                                <a href="#" className="mt-3 block border border-linear-200 rounded-md p-3 hover:bg-linear-50 transition-colors group">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <div className="text-[13px] font-semibold text-linear-900 group-hover:text-peer-green transition-colors">Weekend Meal Delivery Driver</div>
                                            <div className="text-[11px] text-linear-500 mt-0.5">Mission District • Sat, Mar 15 • 3 Hours</div>
                                        </div>
                                        <div className="bg-white border border-linear-200 px-3 py-1 rounded text-[11px] font-medium shadow-sm">View</div>
                                    </div>
                                </a>

                                <div className="flex items-center gap-6 mt-4 pt-3 border-t border-linear-50">
                                    <button className="flex items-center gap-1.5 text-[12px] text-linear-500 hover:text-red-500 transition-colors">
                                        <Heart className="w-4 h-4" /> 12
                                    </button>
                                    <button className="flex items-center gap-1.5 text-[12px] text-linear-500 hover:text-linear-900 transition-colors">
                                        <MessageSquare className="w-4 h-4" /> 2
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
