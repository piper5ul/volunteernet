'use client';

import React from 'react';
import { MoreHorizontal, Plus, Filter, ArrowUpRight } from 'lucide-react';

export default function DashboardPage() {
    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <header className="h-14 border-b border-linear-100 flex items-center px-6 gap-4 shrink-0">
                <h1 className="font-medium text-[14px]">Dashboard</h1>
                <div className="h-4 w-px bg-linear-200"></div>
                <span className="text-[13px] text-linear-500">Overview</span>

                <div className="ml-auto flex items-center gap-3">
                    <div className="flex items-center gap-2 text-[12px] text-linear-500">
                        <span>Last synced 2m ago</span>
                        <button className="p-1 hover:bg-linear-100 rounded text-linear-900">
                            <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                    </div>
                    <button className="bg-linear-900 text-white text-[12px] font-medium px-3 py-1.5 rounded hover:bg-black transition-colors shadow-subtle border border-transparent">
                        New Entry
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto p-8">
                <div className="max-w-5xl mx-auto">

                    {/* Stats Row */}
                    <div className="grid grid-cols-4 gap-4 mb-10">
                        {[
                            { label: 'Total Hours', value: '42.5', sub: '+12%', subColor: 'text-peer-green' },
                            { label: 'Events Attended', value: '18', sub: null },
                            { label: 'Impact Score', value: '942', sub: 'Top 5%', subColor: 'text-linear-400' },
                            { label: 'Network Reach', value: '1.2k', sub: null },
                        ].map((stat, i) => (
                            <div key={i} className="p-4 rounded-lg border border-linear-200 shadow-subtle bg-white">
                                <span className="text-[12px] font-medium text-linear-500">{stat.label}</span>
                                <div className="mt-1 flex items-baseline gap-2">
                                    <span className="text-2xl font-medium tracking-tight text-linear-900">{stat.value}</span>
                                    {stat.sub && (
                                        <span className={`text-[11px] font-medium ${stat.subColor}`}>{stat.sub}</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Active Opportunities */}
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-[14px] font-medium text-linear-900">Active Volunteer Opportunities</h3>
                        <div className="flex gap-2 text-[12px]">
                            <button className="text-linear-900 font-medium hover:bg-linear-100 px-2 py-0.5 rounded transition-colors">All</button>
                            <button className="text-linear-500 hover:text-linear-900 hover:bg-linear-100 px-2 py-0.5 rounded transition-colors">Active</button>
                            <button className="text-linear-500 hover:text-linear-900 hover:bg-linear-100 px-2 py-0.5 rounded transition-colors">Pending</button>
                        </div>
                    </div>

                    <div className="border border-linear-200 rounded-lg bg-white shadow-sm overflow-hidden mb-10">
                        <div className="flex items-center px-4 py-2 border-b border-linear-100 bg-linear-50/50 text-[11px] font-medium text-linear-500">
                            <div className="w-20">ID</div>
                            <div className="flex-1">Title</div>
                            <div className="w-32">Status</div>
                            <div className="w-32">Organization</div>
                            <div className="w-24 text-right">Date</div>
                        </div>

                        {[
                            { id: 'VOL-128', title: 'Coastal Cleanup Drive', status: 'In Progress', org: 'Ocean Cly', date: 'Mar 12', color: 'orange', orgColor: 'blue' },
                            { id: 'VOL-129', title: 'Food Pantry Sort', status: 'Todo', org: 'SF Food', date: 'Mar 15', color: 'gray', orgColor: 'red' },
                            { id: 'VOL-124', title: 'Tech Mentorship Session', status: 'Done', org: 'CodeGood', date: 'Yesterday', color: 'linear', orgColor: 'purple', strikethrough: true },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center px-4 py-2.5 border-b border-linear-100 text-[13px] cursor-pointer hover:bg-linear-50 transition-colors group">
                                <div className="w-20 font-mono text-[11px] text-linear-400 group-hover:text-linear-500">{item.id}</div>
                                <div className={`flex-1 font-medium text-linear-900 ${item.strikethrough ? 'line-through text-linear-400' : ''}`}>{item.title}</div>
                                <div className="w-32 flex items-center">
                                    <div className={`w-2 h-2 rounded-full mr-2 ${item.color === 'linear' ? 'bg-linear-400' : item.color === 'gray' ? 'bg-linear-300' : 'bg-orange-400'}`}></div>
                                    <span className={`${item.color === 'linear' ? 'text-linear-400' : 'text-linear-600'}`}>{item.status}</span>
                                </div>
                                <div className={`w-32 flex items-center gap-1.5 text-linear-600 ${item.strikethrough ? 'text-opacity-50' : ''}`}>
                                    <span className={`w-3 h-3 rounded-[2px] bg-${item.orgColor}-500`}></span> {item.org}
                                </div>
                                <div className="w-24 text-right text-linear-400 text-[12px]">{item.date}</div>
                            </div>
                        ))}
                    </div>

                    {/* Activity & Goals */}
                    <div className="flex gap-8">
                        <div className="flex-1">
                            <h3 className="text-[14px] font-medium text-linear-900 mb-4">Recent Activity</h3>
                            <div className="relative border-l border-linear-200 ml-2 space-y-6 pl-6 pb-2">
                                {[
                                    { text: 'Sarah Jenkins commented on your post.', time: '2 hours ago' },
                                    { text: 'You earned the Community Hero badge.', time: 'Yesterday' },
                                ].map((act, i) => (
                                    <div key={i} className="relative">
                                        <div className="absolute -left-[29px] top-1 w-3 h-3 bg-white border border-linear-300 rounded-full"></div>
                                        <div className="text-[13px] text-linear-900" dangerouslySetInnerHTML={{ __html: act.text.replace(/(Sarah Jenkins|Community Hero)/g, '<span class="font-medium">$1</span>') }}></div>
                                        <div className="text-[12px] text-linear-400 mt-0.5">{act.time}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="w-72 shrink-0">
                            <h3 className="text-[14px] font-medium text-linear-900 mb-4">Goals</h3>
                            <div className="bg-linear-50 rounded-lg p-4 border border-linear-100 space-y-4">
                                <div>
                                    <div className="flex justify-between text-[12px] mb-1.5">
                                        <span className="font-medium text-linear-700">Monthly Hours</span>
                                        <span className="text-linear-500">80%</span>
                                    </div>
                                    <div className="w-full bg-linear-200 h-1.5 rounded-full overflow-hidden">
                                        <div className="bg-peer-green h-full w-[80%] rounded-full"></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-[12px] mb-1.5">
                                        <span className="font-medium text-linear-700">Skills Gained</span>
                                        <span className="text-linear-500">2/5</span>
                                    </div>
                                    <div className="w-full bg-linear-200 h-1.5 rounded-full overflow-hidden">
                                        <div className="bg-linear-500 h-full w-[40%] rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
