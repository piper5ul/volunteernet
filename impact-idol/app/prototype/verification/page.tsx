'use client';

import React from 'react';
import { Filter, Eye, Check, X } from 'lucide-react';

export default function VerificationPage() {
    return (
        <div className="flex h-full flex-col">
            {/* Top Nav (Admin Context) */}
            <header className="h-12 border-b border-linear-100 flex items-center px-4 shrink-0 bg-[#fbfbfc]">
                <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-md bg-linear-800 flex items-center justify-center text-white text-[10px] font-bold">OC</div>
                    <span className="text-[13px] font-medium text-linear-900">Ocean Cleanup Org</span>
                    <span className="text-[13px] text-linear-400">/</span>
                    <span className="text-[13px] text-linear-600">Verification Queue</span>
                </div>

                <div className="ml-auto flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-[12px] text-linear-500 hover:text-linear-900 cursor-pointer">
                        <span className="bg-linear-200 text-linear-700 px-1.5 rounded-full text-[10px]">12</span>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-linear-200 overflow-hidden"><img src="https://i.pravatar.cc/150?u=admin" className="w-full h-full object-cover" /></div>
                </div>
            </header>

            <div className="flex-1 flex overflow-hidden">

                {/* Sidebar Filters */}
                <aside className="w-56 border-r border-linear-100 bg-[#fbfbfc] flex flex-col pt-4 shrink-0">
                    <div className="px-3 mb-2 flex justify-between items-center text-[11px] font-medium text-linear-500 uppercase tracking-wider">
                        Views
                    </div>

                    <nav className="space-y-0.5 px-2">
                        <a href="#" className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-linear-100/50 text-[13px] font-medium text-linear-900">
                            Pending Verification
                            <span className="ml-auto text-[11px] text-linear-500">24</span>
                        </a>
                        <a href="#" className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-linear-50 text-[13px] text-linear-600 transition-colors">
                            Flagged / Disputed
                            <span className="ml-auto text-[11px] text-linear-500">3</span>
                        </a>
                    </nav>

                    <div className="mt-6 px-3 mb-2 text-[11px] font-medium text-linear-500 uppercase tracking-wider">Filters</div>
                    <div className="px-3 space-y-3">
                        <div className="text-[12px] text-linear-600">
                            <span className="block mb-1 font-medium">Event</span>
                            <select className="w-full bg-white border border-linear-200 rounded px-2 py-1 text-[12px] focus:outline-none focus:border-peer-green">
                                <option>All Events</option>
                                <option>Coastal Cleanup</option>
                            </select>
                        </div>
                    </div>
                </aside>

                {/* Main Workspace */}
                <div className="flex-1 flex flex-col min-w-0 bg-white">

                    {/* Toolbar */}
                    <div className="h-10 border-b border-linear-100 flex items-center px-4 justify-between shrink-0">
                        <div className="flex items-center gap-2">
                            <div className="flex items-center bg-linear-50 border border-linear-200 rounded px-2 py-1">
                                <Filter className="w-3.5 h-3.5 text-linear-400 mr-2" />
                                <input type="text" placeholder="Filter by name..." className="bg-transparent text-[12px] focus:outline-none w-48 placeholder-linear-400" />
                            </div>
                            <div className="h-4 w-px bg-linear-200 mx-1"></div>
                            <span className="text-[12px] text-linear-500">24 records found</span>
                        </div>
                    </div>

                    {/* Dense Table */}
                    <div className="flex-1 overflow-auto">
                        <table className="w-full text-left text-[13px] border-collapse">
                            <thead className="sticky top-0 bg-white z-10 box-shadow-subtle">
                                <tr className="border-b border-linear-200 text-[11px] font-medium text-linear-500">
                                    <th className="w-10 px-4 py-2 text-center"><input type="checkbox" className="" /></th>
                                    <th className="px-4 py-2 w-24">ID</th>
                                    <th className="px-4 py-2">Volunteer</th>
                                    <th className="px-4 py-2">Event</th>
                                    <th className="px-4 py-2">Date</th>
                                    <th className="px-4 py-2 text-right">Hours</th>
                                    <th className="px-4 py-2">Proof</th>
                                    <th className="px-4 py-2">Status</th>
                                    <th className="px-4 py-2 text-right w-40">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-linear-100">
                                {[
                                    { id: '#VR-1294', name: 'Alex Rivera', event: 'Coastal Cleanup', date: 'Mar 12, 2026', hours: '4.5', status: 'Pending', statusColor: 'yellow' },
                                    { id: '#VR-1293', name: 'Sarah Jenkins', event: 'Coastal Cleanup', date: 'Mar 12, 2026', hours: '4.0', status: 'Flagged', statusColor: 'red' },
                                    { id: '#VR-1292', name: 'Emily Zhang', event: 'Food Drive', date: 'Mar 11, 2026', hours: '2.5', status: 'Verified', statusColor: 'green' },
                                ].map((row, i) => (
                                    <tr key={i} className="hover:bg-linear-50 transition-colors group">
                                        <td className="px-4 py-2 text-center"><input type="checkbox" /></td>
                                        <td className="px-4 py-2 font-mono text-[11px] text-linear-400 select-all">{row.id}</td>
                                        <td className="px-4 py-2">
                                            <div className="flex items-center gap-2">
                                                <div className="w-5 h-5 rounded-full bg-linear-200 overflow-hidden"><img src={`https://ui-avatars.com/api/?name=${row.name}&background=random`} className="w-full h-full" /></div>
                                                <span className="font-medium text-linear-900">{row.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-2 text-linear-600"><span className="bg-linear-50 border border-linear-200 px-1.5 py-0.5 rounded text-[11px]">{row.event}</span></td>
                                        <td className="px-4 py-2 text-linear-500 text-[12px]">{row.date}</td>
                                        <td className="px-4 py-2 text-right font-mono text-linear-900">{row.hours}</td>
                                        <td className="px-4 py-2">
                                            <div className="flex items-center gap-1 text-[11px] text-blue-600 hover:underline cursor-pointer">
                                                <Eye className="w-3 h-3" /> View Photo
                                            </div>
                                        </td>
                                        <td className="px-4 py-2">
                                            <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-${row.statusColor}-50 text-${row.statusColor}-700 border border-${row.statusColor}-200`}>
                                                <span className={`w-1.5 h-1.5 rounded-full bg-${row.statusColor}-500 mr-1`}></span> {row.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2 text-right">
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex justify-end gap-1">
                                                <button className="bg-white border border-linear-200 hover:border-linear-300 text-peer-green rounded px-2 py-1 text-[11px] font-medium shadow-sm flex items-center gap-1"><Check className="w-3 h-3" /> Approve</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    );
}
