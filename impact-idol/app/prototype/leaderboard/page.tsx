'use client';

import React from 'react';
import { Trophy, Medal, Crown } from 'lucide-react';

export default function LeaderboardPage() {
    return (
        <div className="min-h-full bg-[#f7f8f8] p-6 lg:p-10">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-linear-900 mb-2">Impact Leaderboard</h1>
                    <p className="text-linear-500">Top volunteers in your network this month</p>
                </div>

                {/* Top 3 Podium */}
                <div className="flex justify-center items-end gap-4 mb-12">
                    {/* 2nd Place */}
                    <div className="flex flex-col items-center">
                        <div className="w-20 h-20 rounded-full border-4 border-slate-300 overflow-hidden mb-3 relative">
                            <img src="https://i.pravatar.cc/150?u=2" className="w-full h-full object-cover" />
                            <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-slate-700 font-bold border-2 border-white">2</div>
                        </div>
                        <div className="font-semibold text-linear-900">Sarah J.</div>
                        <div className="text-sm text-linear-500 font-mono">42 hrs</div>
                        <div className="h-24 w-20 bg-slate-200 mt-3 rounded-t-lg opacity-50"></div>
                    </div>

                    {/* 1st Place */}
                    <div className="flex flex-col items-center relative -top-4">
                        <Crown className="w-8 h-8 text-yellow-500 mb-2 fill-yellow-500" />
                        <div className="w-28 h-28 rounded-full border-4 border-yellow-400 overflow-hidden mb-3 relative shadow-lg">
                            <img src="https://i.pravatar.cc/150?u=1" className="w-full h-full object-cover" />
                            <div className="absolute -bottom-1 -right-1 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-yellow-900 font-bold border-2 border-white text-lg">1</div>
                        </div>
                        <div className="font-bold text-lg text-linear-900">Alex R.</div>
                        <div className="text-sm text-linear-500 font-mono">58 hrs</div>
                        <div className="h-32 w-24 bg-yellow-100/50 mt-3 rounded-t-lg border-t border-x border-yellow-200"></div>
                    </div>

                    {/* 3rd Place */}
                    <div className="flex flex-col items-center">
                        <div className="w-20 h-20 rounded-full border-4 border-amber-600 overflow-hidden mb-3 relative">
                            <img src="https://i.pravatar.cc/150?u=3" className="w-full h-full object-cover" />
                            <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center text-amber-100 font-bold border-2 border-white">3</div>
                        </div>
                        <div className="font-semibold text-linear-900">Mike T.</div>
                        <div className="text-sm text-linear-500 font-mono">36 hrs</div>
                        <div className="h-16 w-20 bg-amber-100 mt-3 rounded-t-lg opacity-50"></div>
                    </div>
                </div>

                {/* List */}
                <div className="bg-white rounded-xl border border-linear-200 shadow-sm overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-linear-50 border-b border-linear-200">
                            <tr>
                                <th className="text-left text-xs font-semibold text-linear-500 uppercase tracking-wider py-3 px-6">Rank</th>
                                <th className="text-left text-xs font-semibold text-linear-500 uppercase tracking-wider py-3 px-6">Volunteer</th>
                                <th className="text-right text-xs font-semibold text-linear-500 uppercase tracking-wider py-3 px-6">Hours</th>
                                <th className="text-right text-xs font-semibold text-linear-500 uppercase tracking-wider py-3 px-6">Impact Score</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-linear-100">
                            {[4, 5, 6, 7, 8].map((rank) => (
                                <tr key={rank} className="hover:bg-linear-50/50 transition-colors">
                                    <td className="py-3 px-6 text-sm font-medium text-linear-500">#{rank}</td>
                                    <td className="py-3 px-6">
                                        <div className="flex items-center gap-3">
                                            <img src={`https://i.pravatar.cc/150?u=${rank + 10}`} className="w-8 h-8 rounded-full" />
                                            <span className="text-sm font-medium text-linear-900">Volunteer Name</span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-6 text-right text-sm font-mono text-linear-700">{30 - rank} hrs</td>
                                    <td className="py-3 px-6 text-right">
                                        <Badge variant="secondary" className="font-mono bg-linear-100 text-linear-700">{(30 - rank) * 12}</Badge>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}
