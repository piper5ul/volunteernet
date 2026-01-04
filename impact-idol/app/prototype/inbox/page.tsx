'use client';

import React from 'react';
import { Archive, Send, Inbox as InboxIcon, Paperclip } from 'lucide-react';

export default function InboxPage() {
    return (
        <div className="flex h-full">
            {/* Sidebar 1: Inbox Nav */}
            <nav className="w-16 lg:w-56 border-r border-linear-100 bg-[#fbfbfc] flex flex-col shrink-0 transition-all">
                <div className="flex-1 overflow-y-auto py-2 px-2 space-y-0.5 mt-2">
                    <button className="w-full flex items-center gap-3 px-2 lg:px-3 py-1.5 rounded-md bg-linear-100/50 text-linear-900 font-medium">
                        <InboxIcon className="w-4 h-4 text-linear-800 shrink-0" />
                        <span className="text-[13px] hidden lg:block">Inbox</span>
                        <span className="ml-auto text-[10px] bg-linear-200 px-1.5 rounded-full hidden lg:block">3</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-2 lg:px-3 py-1.5 rounded-md hover:bg-linear-50 text-linear-600 transition-colors">
                        <Send className="w-4 h-4 text-linear-400 shrink-0" />
                        <span className="text-[13px] hidden lg:block">Sent</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-2 lg:px-3 py-1.5 rounded-md hover:bg-linear-50 text-linear-600 transition-colors">
                        <Archive className="w-4 h-4 text-linear-400 shrink-0" />
                        <span className="text-[13px] hidden lg:block">Archive</span>
                    </button>
                </div>
            </nav>

            {/* Sidebar 2: Thread List */}
            <div className="w-80 border-r border-linear-100 bg-white flex flex-col shrink-0">
                <div className="h-14 border-b border-linear-100 flex items-center px-4 justify-between shrink-0">
                    <span className="font-medium text-[13px]">Inbox (3)</span>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {[
                        { from: 'Sarah Jenkins', time: '2m', subj: 'Re: Coastal Cleanup Logistics', body: 'Hey Pushkar, just confirming the drop-off location...', active: true },
                        { from: 'Alex Rivera', time: '1h', subj: 'New Opportunity Match', body: 'I saw this new teaching opportunity...', active: false, unread: true },
                        { from: 'Ocean Cleanup Team', time: 'Yesterday', subj: 'Event Reminder: Annual Gala', body: 'Don\'t forget to register for the annual gala...', active: false },
                    ].map((thread, i) => (
                        <div key={i} className={`p-3 cursor-pointer group border-b border-linear-50 hover:bg-linear-50 ${thread.active ? 'bg-linear-50 shadow-[inset_3px_0_0_#3a404c]' : ''}`}>
                            <div className="flex justify-between items-start mb-1">
                                <span className={`text-[13px] font-semibold text-linear-900 ${thread.unread ? 'flex items-center gap-1.5' : ''}`}>
                                    {thread.unread && <div className="w-2 h-2 rounded-full bg-blue-500"></div>}
                                    {thread.from}
                                </span>
                                <span className="text-[11px] text-linear-400">{thread.time}</span>
                            </div>
                            <div className="text-[12px] font-medium text-linear-800 mb-1">{thread.subj}</div>
                            <p className="text-[12px] text-linear-500 line-clamp-2">{thread.body}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content: Thread View */}
            <main className="flex-1 flex flex-col min-w-0 bg-white">
                <header className="h-14 border-b border-linear-100 flex items-center px-6 justify-between shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-linear-100 overflow-hidden"><img src="https://i.pravatar.cc/150?u=sarah" className="w-full h-full object-cover" /></div>
                        <div>
                            <div className="text-[13px] font-bold text-linear-900">Sarah Jenkins</div>
                            <div className="text-[11px] text-linear-500">sarah.j@example.com</div>
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    <div className="flex justify-center">
                        <span className="text-[10px] font-medium text-linear-400 bg-linear-50 px-2 py-1 rounded-full border border-linear-100">Today, 10:42 AM</span>
                    </div>

                    <div className="flex gap-4 group">
                        <div className="w-8 h-8 rounded-full bg-linear-100 shrink-0 overflow-hidden"><img src="https://i.pravatar.cc/150?u=sarah" className="w-full h-full object-cover" /></div>
                        <div className="flex-1">
                            <div className="flex items-baseline gap-2 mb-1">
                                <span className="text-[13px] font-bold text-linear-900">Sarah Jenkins</span>
                                <span className="text-[11px] text-linear-400">10:42 AM</span>
                            </div>
                            <div className="text-[13px] text-linear-800 leading-relaxed">
                                <p>Hey Pushkar, just confirming the drop-off location for the supplies. Is it still Gate 4? I remember you mentioned they might be doing construction on the main entrance.</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 group bg-linear-50/50 p-4 -mx-4 rounded-lg border border-transparent hover:border-linear-100 transition-colors">
                        <div className="w-8 h-8 rounded-full bg-linear-100 shrink-0 overflow-hidden"><img src="https://i.pravatar.cc/150?u=remix" className="w-full h-full object-cover" /></div>
                        <div className="flex-1">
                            <div className="flex items-baseline gap-2 mb-1">
                                <span className="text-[13px] font-bold text-linear-900">Pushkar Phatak</span>
                                <span className="text-[11px] text-linear-400">10:45 AM</span>
                            </div>
                            <div className="text-[13px] text-linear-800 leading-relaxed">
                                <p>Hi Sarah! Yes, Gate 4 is correct. The construction is actually on the north side, so the west entrance (Gate 4) is completely clear.</p>
                                <p className="mt-2 text-linear-500 italic text-[12px] flex items-center gap-1"><Paperclip className="w-3 h-3" /> Attached: <a href="#" className="text-blue-600 underline hover:text-blue-800">map_gate_4.pdf</a></p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6 pt-2 shrink-0">
                    <div className="relative border border-linear-200 rounded-lg shadow-sm bg-white focus-within:ring-1 focus-within:ring-linear-300 focus-within:border-linear-300 transition-shadow">
                        <textarea className="w-full min-h-[100px] max-h-[300px] p-3 text-[13px] text-linear-900 placeholder-linear-400 focus:outline-none resize-none rounded-t-lg" placeholder="Reply to Sarah..."></textarea>
                        <div className="flex justify-between items-center px-2 py-2 bg-linear-50 rounded-b-lg border-t border-linear-100">
                            <div className="flex gap-1"></div>
                            <div className="flex gap-2 items-center">
                                <span className="text-[11px] text-linear-400">Cmd + Enter to send</span>
                                <button className="bg-linear-900 text-white text-[12px] font-medium px-3 py-1.5 rounded hover:bg-black transition-colors shadow-subtle">Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
