'use client';

import React from 'react';
import { Search, ChevronDown, CheckCircle, Clock } from 'lucide-react';

export default function SearchPage() {
    return (
        <div className="flex h-full">
            {/* Left Sidebar (Filters) */}
            <aside className="w-56 border-r border-linear-100 bg-[#fbfbfc] flex flex-col pt-4 shrink-0">
                <div className="px-3 mb-2 text-[11px] font-medium text-linear-500 uppercase tracking-wider">Type</div>
                <nav className="space-y-0.5 px-2 mb-6">
                    {['Everything', 'People', 'Organizations', 'Opportunities'].map((item) => (
                        <button key={item} className={`flex w-full items-center gap-2 px-2 py-1.5 rounded-md text-[13px] font-medium transition-colors ${item === 'Everything' ? 'bg-linear-100/50 text-linear-900' : 'text-linear-600 hover:bg-linear-50'}`}>
                            {item}
                        </button>
                    ))}
                </nav>

                <div className="px-3 mb-2 text-[11px] font-medium text-linear-500 uppercase tracking-wider">Filters</div>
                <div className="px-3 space-y-3">
                    <div className="text-[12px] text-linear-600 border-b border-linear-100 pb-2">
                        <span className="block mb-1.5 font-medium text-linear-900">Location</span>
                        <div className="flex items-center justify-between text-linear-500 hover:text-linear-900 cursor-pointer">
                            San Francisco <span className="text-[10px] text-linear-400">×</span>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Search Results List */}
            <div className="flex-1 overflow-y-auto min-w-0 bg-white border-r border-linear-100">
                {/* Token Bar */}
                <div className="h-10 border-b border-linear-100 flex items-center px-4 gap-2">
                    <span className="text-[11px] text-linear-400 uppercase tracking-wide mr-1">Query:</span>
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] bg-linear-100 text-linear-700 border border-linear-200">
                        "volunteer in san fran"
                        <button className="ml-1 text-linear-400 hover:text-linear-600">×</button>
                    </span>
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] bg-linear-50 text-linear-600 border border-linear-200 border-dashed cursor-pointer hover:bg-linear-100">
                        + Add Filter
                    </span>
                </div>

                {/* Results */}
                <div className="divide-y divide-linear-50">
                    {[
                        { title: 'San Francisco Food Bank Driver', type: 'Opp', desc: 'Looking for drivers to deliver meals.', sub: 'SF Food Bank', date: 'Mar 12', selected: true },
                        { title: 'San Francisco SPCA', type: 'Org', desc: 'Animal shelter and veterinary hospital.', sub: '3.2k Followers', date: 'San Francisco, CA', selected: false },
                        { title: 'Sandra Francisco', type: 'Person', desc: 'Community organizer.', sub: '42 Connections', date: 'Mutual: Alex Rivera', selected: false },
                    ].map((item, i) => (
                        <div key={i} className={`p-4 cursor-pointer hover:bg-linear-50 ${item.selected ? 'bg-linear-50/80 shadow-[inset_2px_0_0_#545f73]' : ''}`}>
                            <div className="flex justify-between items-start mb-1">
                                <div className="flex items-center gap-2">
                                    <div className={`p-1 rounded ${item.type === 'Person' ? 'rounded-full overflow-hidden p-0 w-6 h-6' : 'bg-linear-100 text-linear-500'}`}>
                                        {item.type === 'Person' ? <img src="https://i.pravatar.cc/100?u=sarah" /> : <Search className="w-3.5 h-3.5" />}
                                    </div>
                                    <span className="text-[13px] font-medium text-linear-900">{item.title}</span>
                                </div>
                                <span className="text-[11px] text-linear-400">{item.type}</span>
                            </div>
                            <p className="text-[12px] text-linear-500 line-clamp-1 pl-8">{item.desc}</p>
                            <div className="pl-8 mt-2 flex items-center gap-3 text-[11px] text-linear-400">
                                <span className="flex items-center gap-1 text-linear-600">{item.sub}</span>
                                <span>•</span>
                                <span>{item.date}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Preview Panel */}
            <aside className="w-80 bg-[#fbfbfc] flex flex-col overflow-y-auto shrink-0">
                <div className="h-12 border-b border-linear-100 flex items-center px-4 justify-between shrink-0">
                    <div className="text-[10px] font-mono text-linear-400 uppercase">VOL-492</div>
                    <div className="flex gap-2">
                        <button className="text-linear-400 hover:text-linear-700">↓</button>
                        <button className="text-linear-400 hover:text-linear-700">↑</button>
                    </div>
                </div>

                <div className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                        <div className="w-10 h-10 rounded-md bg-red-100 flex items-center justify-center text-red-600 font-bold shrink-0">SF</div>
                        <div>
                            <h2 className="text-[14px] font-semibold text-linear-900 leading-snug">San Francisco Food Bank Driver</h2>
                            <a href="#" className="text-[12px] text-linear-500 hover:text-linear-800 hover:underline mt-0.5 block">SF Food Bank</a>
                        </div>
                    </div>

                    <div className="space-y-4 mb-6">
                        <div className="flex items-center justify-between">
                            <span className="text-[12px] text-linear-500">Status</span>
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-linear-100 text-[11px] font-medium text-linear-700 border border-linear-200">
                                <div className="w-1.5 h-1.5 rounded-full bg-peer-green"></div> Open
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-[12px] text-linear-500">Date</span>
                            <span className="text-[12px] text-linear-900">Mar 12, 2026</span>
                        </div>
                    </div>

                    <div className="h-px bg-linear-100 mb-6"></div>

                    <h3 className="text-[12px] font-medium text-linear-900 mb-2">Description</h3>
                    <p className="text-[13px] text-linear-600 leading-relaxed mb-6">
                        We need 5 volunteers to help distribute meals. You must have a valid drivers license and a vehicle. Shifts differ by route but generally last 2-3 hours.
                    </p>

                    <button className="w-full py-2 bg-linear-900 text-white text-[13px] font-medium rounded-md hover:bg-black shadow-subtle mb-3">Apply Now</button>
                </div>
            </aside>
        </div>
    );
}
