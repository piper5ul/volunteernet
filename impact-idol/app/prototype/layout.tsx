import Link from 'next/link';
import { LayoutDashboard, User, Search, Inbox, CheckSquare, Search as SearchIcon, Home, Users, Calendar, Bell, Trophy, QrCode, Settings, Sparkles } from 'lucide-react';

export default function PrototypeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-white text-linear-900 font-sans overflow-hidden">
            {/* GLOBAL SIDEBAR */}
            <nav className="w-64 border-r border-linear-100 flex flex-col bg-[#fbfbfc] shrink-0">
                <div className="h-14 flex items-center px-4 border-b border-linear-100/50">
                    <div className="w-6 h-6 bg-peer-green rounded-md flex items-center justify-center text-white font-bold text-xs">P</div>
                    <span className="ml-2 font-semibold text-[13px] tracking-tight">Impact Idol</span>
                </div>

                <div className="flex-1 overflow-y-auto py-2 px-2 space-y-0.5">
                    <div className="px-3 pt-2 pb-1 text-[11px] font-medium text-linear-400 uppercase tracking-wider">Prototype Routes</div>

                    <Link href="/prototype/home" className="flex items-center gap-3 px-3 py-1.5 rounded-md text-[13px] text-linear-600 hover:bg-linear-100/50 transition-colors">
                        <Home className="w-4 h-4 text-linear-400" />
                        Home Feed
                    </Link>

                    <Link href="/prototype/dashboard" className="flex items-center gap-3 px-3 py-1.5 rounded-md text-[13px] text-linear-600 hover:bg-linear-100/50 transition-colors">
                        <LayoutDashboard className="w-4 h-4 text-linear-400" />
                        Dashboard
                    </Link>

                    <Link href="/prototype/profile" className="flex items-center gap-3 px-3 py-1.5 rounded-md text-[13px] text-linear-600 hover:bg-linear-100/50 transition-colors">
                        <User className="w-4 h-4 text-linear-400" />
                        Profile
                    </Link>

                    <Link href="/prototype/search" className="flex items-center gap-3 px-3 py-1.5 rounded-md text-[13px] text-linear-600 hover:bg-linear-100/50 transition-colors">
                        <SearchIcon className="w-4 h-4 text-linear-400" />
                        Search
                    </Link>

                    <Link href="/prototype/inbox" className="flex items-center gap-3 px-3 py-1.5 rounded-md text-[13px] text-linear-600 hover:bg-linear-100/50 transition-colors">
                        <Inbox className="w-4 h-4 text-linear-400" />
                        Inbox
                    </Link>

                    <Link href="/prototype/verification" className="flex items-center gap-3 px-3 py-1.5 rounded-md text-[13px] text-linear-600 hover:bg-linear-100/50 transition-colors">
                        <CheckSquare className="w-4 h-4 text-linear-400" />
                        Verification
                    </Link>

                    <div className="px-3 pt-4 pb-1 text-[11px] font-medium text-linear-400 uppercase tracking-wider">Apps</div>

                    <Link href="/prototype/squads" className="flex items-center gap-3 px-3 py-1.5 rounded-md text-[13px] text-linear-600 hover:bg-linear-100/50 transition-colors">
                        <Users className="w-4 h-4 text-linear-400" />
                        Squads
                    </Link>

                    <Link href="/prototype/calendar" className="flex items-center gap-3 px-3 py-1.5 rounded-md text-[13px] text-linear-600 hover:bg-linear-100/50 transition-colors">
                        <Calendar className="w-4 h-4 text-linear-400" />
                        Calendar
                    </Link>

                    <Link href="/prototype/notifications" className="flex items-center gap-3 px-3 py-1.5 rounded-md text-[13px] text-linear-600 hover:bg-linear-100/50 transition-colors">
                        <Bell className="w-4 h-4 text-linear-400" />
                        Notifications
                    </Link>

                    <Link href="/prototype/leaderboard" className="flex items-center gap-3 px-3 py-1.5 rounded-md text-[13px] text-linear-600 hover:bg-linear-100/50 transition-colors">
                        <Trophy className="w-4 h-4 text-linear-400" />
                        Leaderboard
                    </Link>

                    <div className="px-3 pt-4 pb-1 text-[11px] font-medium text-linear-400 uppercase tracking-wider">Utilities</div>

                    <Link href="/prototype/check-in" className="flex items-center gap-3 px-3 py-1.5 rounded-md text-[13px] text-linear-600 hover:bg-linear-100/50 transition-colors">
                        <QrCode className="w-4 h-4 text-linear-400" />
                        Check-in
                    </Link>

                    <Link href="/prototype/settings" className="flex items-center gap-3 px-3 py-1.5 rounded-md text-[13px] text-linear-600 hover:bg-linear-100/50 transition-colors">
                        <Settings className="w-4 h-4 text-linear-400" />
                        Settings
                    </Link>

                    <Link href="/prototype/onboarding" className="flex items-center gap-3 px-3 py-1.5 rounded-md text-[13px] text-linear-600 hover:bg-linear-100/50 transition-colors">
                        <Sparkles className="w-4 h-4 text-linear-400" />
                        Onboarding Demo
                    </Link>
                </div>

                <div className="p-3 border-t border-linear-100 mt-auto">
                    <div className="flex items-center gap-2 px-2 py-1 hover:bg-linear-50 rounded-md cursor-pointer transition-colors">
                        <div className="w-6 h-6 rounded-full bg-linear-200" />
                        <div className="flex-1 min-w-0">
                            <p className="text-[13px] font-medium text-linear-900 truncate">Prototype User</p>
                        </div>
                    </div>
                </div>
            </nav>

            {/* PAGE CONTENT */}
            <div className="flex-1 flex flex-col min-w-0 bg-white overflow-hidden">
                {children}
            </div>
        </div>
    );
}
