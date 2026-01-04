'use client';

import React, { useState } from 'react';
import { Settings, Bookmark, CheckCircle, MapPin, Calendar, Briefcase, Plus } from 'lucide-react';

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState('Resume');

    return (
        <div className="flex h-full">
            {/* CENTER COLUMN (Profile Content) */}
            <div className="flex-1 overflow-y-auto no-scrollbar bg-white">
                {/* Top Nav */}
                <div className="h-14 border-b border-linear-100 flex justify-between items-center px-6 sticky top-0 bg-white/90 backdrop-blur z-20">
                    <div className="text-[13px] text-linear-500">Profile / <span className="text-linear-900 font-medium">Pushkar Phatak</span></div>
                    <div className="flex gap-2">
                        <button className="px-3 py-1.5 border border-linear-200 rounded text-[13px] font-medium text-linear-700 hover:bg-linear-50 transition-colors">Edit Profile</button>
                        <button className="p-1.5 border border-linear-200 rounded text-linear-500 hover:text-black hover:bg-linear-50">
                            <Settings className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <div className="max-w-3xl mx-auto py-10 px-6">

                    {/* Profile Header */}
                    <div className="flex flex-col items-center text-center mb-8">
                        <div className="relative mb-4">
                            <img src="https://i.pravatar.cc/300?u=remix" className="w-24 h-24 rounded-full p-1 border border-linear-100 shadow-sm" />
                            <div className="absolute bottom-1 right-1 bg-peer-green text-white w-6 h-6 rounded-full flex items-center justify-center border-2 border-white" title="Verified">
                                <CheckCircle className="w-3 h-3 fill-current" />
                            </div>
                        </div>

                        <h1 className="text-xl font-bold text-linear-900 flex items-center gap-1.5">
                            Pushkar Phatak
                            <span className="flex items-center justify-center w-3.5 h-3.5 bg-peer-green text-white rounded-full text-[8px]"><CheckCircle className="w-2 h-2" /></span>
                        </h1>
                        <p className="text-[13px] text-linear-500 mt-1 max-w-md">Executive, Founder, Advisor, Mentor</p>
                        <div className="flex items-center gap-4 text-[12px] text-linear-400 mt-2">
                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Joined 26 Feb 2024</span>
                            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> Greater Boston, USA</span>
                        </div>

                        {/* Tags Row */}
                        <div className="flex flex-wrap justify-center gap-1.5 mt-5 max-w-lg">
                            {['Strategic Planning', 'SaaS', 'Fintech', 'Product Management', 'Analytics'].map(tag => (
                                <span key={tag} className="px-2 py-0.5 border border-linear-200 rounded text-[11px] font-medium text-linear-600 bg-white shadow-subtle">{tag}</span>
                            ))}
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex items-center gap-6 border-b border-linear-100 mb-8 sticky top-14 bg-white/95 backdrop-blur z-10 pt-2">
                        {['Work', 'Resume', 'Collections', 'Articles', 'Posts'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-2.5 text-[13px] font-medium transition-colors relative ${activeTab === tab ? 'text-linear-900' : 'text-linear-500 hover:text-linear-900'}`}
                            >
                                {tab}
                                {activeTab === tab && (
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-peer-green rounded-t-sm"></span>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Resume Content (Linear Style) */}
                    <div className="space-y-8">

                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-[14px] font-semibold text-linear-900">Experience</h3>
                            <span className="text-[12px] text-linear-400">21 years, 2 months</span>
                        </div>

                        {/* Timeline Items */}
                        <div className="relative border-l border-linear-200 ml-2 space-y-8 pl-6 pb-2">
                            {[
                                { role: 'Volunteer', company: 'Vibha', status: 'Active', time: 'Aug 2023 - Present (2 yr, 5 m)', loc: 'Boston, MA', img: 'Vibha' },
                                { role: 'Founder', company: 'Sarang Music School', status: 'Verified', time: 'Jul 2023 - Present (2 yr, 6 m)', loc: 'Newton, MA', img: 'SM' },
                                { role: 'Advisor', company: 'Various Companies', status: null, time: 'Dec 2020 - Present (5 yr, 1 m)', loc: null, img: 'VC', textImg: true },
                                { role: 'Head of Sales', company: 'Solid', status: null, time: 'Mar 2022 - Mar 2024 (2 yr)', loc: 'Full-Time', img: 'Solid' },
                            ].map((job, i) => (
                                <div key={i} className="relative group">
                                    <div className="absolute -left-[29px] top-1 w-3 h-3 bg-white border border-linear-300 rounded-full group-hover:border-peer-green transition-colors"></div>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-semibold text-linear-900 text-[14px]">{job.company}</h4>
                                            <p className="text-[13px] text-linear-700 mt-0.5 flex items-center gap-2">
                                                {job.role}
                                                {job.status === 'Active' && <span className="text-peer-green text-[10px] bg-green-50 px-1 rounded border border-green-100 ml-1">Active</span>}
                                                {job.status === 'Verified' && <span className="text-linear-500 text-[10px] bg-linear-50 px-1 rounded border border-linear-100 ml-1">Verified</span>}
                                            </p>
                                            <div className="text-[12px] text-linear-400 mt-1">{job.time} {job.loc && `• ${job.loc}`}</div>
                                        </div>
                                        {job.textImg ? (
                                            <div className="w-8 h-8 rounded border border-linear-100 flex items-center justify-center bg-linear-50 text-[10px] font-bold text-linear-400">{job.img}</div>
                                        ) : (
                                            <img src={`https://ui-avatars.com/api/?name=${job.img}&background=random&color=fff&size=40`} className="w-8 h-8 rounded border border-linear-100" />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT SIDEBAR (Widgets) */}
            <aside className="hidden xl:flex w-72 border-l border-linear-100 bg-[#fbfbfc] flex-col p-4 space-y-6 shrink-0">

                <div className="space-y-1">
                    {['Settings', 'Bookmarks', 'Job Preferences'].map((item) => (
                        <div key={item} className="flex items-center gap-3 px-2 py-1.5 text-[13px] text-linear-700 hover:bg-linear-50 rounded cursor-pointer group">
                            {item === 'Settings' && <Settings className="w-4 h-4 text-linear-400" />}
                            {item === 'Bookmarks' && <Bookmark className="w-4 h-4 text-linear-400" />}
                            {item === 'Job Preferences' && <Briefcase className="w-4 h-4 text-linear-400" />}
                            {item}
                            {item === 'Job Preferences' && <span className="bg-green-100 text-peer-green text-[9px] px-1.5 rounded font-medium ml-auto">OPEN</span>}
                        </div>
                    ))}
                </div>

                <div className="h-px bg-linear-100"></div>

                {/* Analytics Widget */}
                <div className="bg-white rounded-lg border border-linear-200 p-4 shadow-subtle">
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-[12px] font-semibold text-linear-900">Profile Analytics</span>
                        <span className="text-[10px] text-linear-400">Last 7 days</span>
                    </div>

                    <div className="flex justify-between text-center mb-4">
                        {[
                            { label: 'Views', val: 124 },
                            { label: 'Clicks', val: 12 },
                            { label: 'Followers', val: 8 }
                        ].map(stat => (
                            <div key={stat.label}>
                                <div className="text-xl font-bold font-mono text-linear-900">{stat.val}</div>
                                <div className="text-[10px] text-linear-500 uppercase tracking-wide">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Sparkline */}
                    <div className="w-full h-8 flex items-end gap-1 mb-3">
                        {[20, 40, 30, 60, 45, 80, 30].map((h, i) => (
                            <div key={i} className="bg-linear-100 w-full rounded-sm hover:bg-peer-green transition-colors" style={{ height: `${h}%` }}></div>
                        ))}
                    </div>

                    <button className="w-full py-1.5 bg-linear-900 text-white text-[11px] font-medium rounded hover:bg-black transition-colors">Analytics Dashboard</button>
                </div>

                {/* Highlights */}
                <div className="bg-linear-50 rounded-lg p-4 border border-linear-100">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-3 h-3 text-linear-500"><Plus className="w-3 h-3" /></div>
                        <span className="text-[12px] font-semibold text-linear-900">Profile Highlights</span>
                    </div>
                    <ul className="space-y-2.5">
                        <li className="text-[11px] text-linear-600 leading-snug">Currently works at <strong className="text-linear-900">Vibha</strong> as a Volunteer since over 2 years.</li>
                        <li className="text-[11px] text-linear-600 leading-snug">Founder at <strong className="text-linear-900">Sarang Music School</strong> since 2023.</li>
                    </ul>
                </div>
            </aside>
        </div>
    );
}
