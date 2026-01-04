'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { User, Bell, Lock, Globe, Moon, Monitor } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
    return (
        <div className="flex h-full max-w-5xl mx-auto">
            {/* Settings Sidebar */}
            <aside className="w-64 border-r border-linear-200 py-8 pr-6 shrink-0">
                <h1 className="text-xl font-bold text-linear-900 px-3 mb-6">Settings</h1>
                <nav className="space-y-1">
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md bg-linear-100 text-linear-900">
                        <User className="w-4 h-4" /> Account
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-linear-600 hover:bg-linear-50 transition-colors">
                        <Bell className="w-4 h-4" /> Notifications
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-linear-600 hover:bg-linear-50 transition-colors">
                        <Lock className="w-4 h-4" /> Privacy
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-linear-600 hover:bg-linear-50 transition-colors">
                        <Globe className="w-4 h-4" /> Language
                    </button>
                </nav>
            </aside>

            {/* Content */}
            <div className="flex-1 py-10 pl-10 overflow-y-auto">
                <div className="max-w-xl space-y-10">
                    {/* Section: Profile */}
                    <section>
                        <h2 className="text-lg font-semibold text-linear-900 mb-6 pb-2 border-b border-linear-200">Public Profile</h2>
                        <div className="space-y-6">
                            <div className="flex items-start gap-6">
                                <div className="w-20 h-20 rounded-full bg-linear-100 shrink-0"></div>
                                <div className="space-y-2">
                                    <Button variant="outline" size="sm">Change Avatar</Button>
                                    <p className="text-xs text-linear-400">JPG, GIF or PNG. 1MB max.</p>
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <label className="text-sm font-medium text-linear-700">Display Name</label>
                                <input type="text" defaultValue="Pushkar" className="flex h-9 w-full rounded-md border border-linear-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-linear-900" />
                            </div>

                            <div className="grid gap-2">
                                <label className="text-sm font-medium text-linear-700">Bio</label>
                                <textarea className="flex min-h-[80px] w-full rounded-md border border-linear-200 bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-linear-900" defaultValue="Passionate about technology and social impact." />
                            </div>
                        </div>
                    </section>

                    {/* Section: Preferences */}
                    <section>
                        <h2 className="text-lg font-semibold text-linear-900 mb-6 pb-2 border-b border-linear-200">Preferences</h2>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <label className="text-sm font-medium text-linear-900">Email Notifications</label>
                                    <p className="text-xs text-linear-500">Receive weekly digest emails</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <label className="text-sm font-medium text-linear-900">Profile Visibility</label>
                                    <p className="text-xs text-linear-500">Allow search engines to index my profile</p>
                                </div>
                                <Switch />
                            </div>
                            <Separator />
                            <div className="space-y-3">
                                <label className="text-sm font-medium text-linear-900">Theme</label>
                                <div className="grid grid-cols-3 gap-3">
                                    <div className="border-2 border-linear-900 rounded-md p-2 flex flex-col items-center gap-2 bg-white cursor-pointer hover:bg-linear-50">
                                        <Monitor className="w-5 h-5" />
                                        <span className="text-xs font-medium">System</span>
                                    </div>
                                    <div className="border border-linear-200 rounded-md p-2 flex flex-col items-center gap-2 bg-white cursor-pointer hover:bg-linear-50">
                                        <Moon className="w-5 h-5" />
                                        <span className="text-xs font-medium">Dark</span>
                                    </div>
                                    <div className="border border-linear-200 rounded-md p-2 flex flex-col items-center gap-2 bg-white cursor-pointer hover:bg-linear-50">
                                        <div className="w-5 h-5 rounded-full border border-linear-300 bg-white"></div>
                                        <span className="text-xs font-medium">Light</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
