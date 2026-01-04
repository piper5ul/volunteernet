'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Plus, Users, ArrowRight } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

export default function SquadsPage() {
    return (
        <div className="flex flex-col h-full bg-[#f7f8f8]">
            {/* Header */}
            <header className="h-16 border-b border-linear-200 bg-white px-6 flex items-center justify-between shrink-0">
                <div>
                    <h1 className="text-lg font-semibold text-linear-900">Squads</h1>
                    <p className="text-xs text-linear-500">Your volunteer teams and communities</p>
                </div>
                <Button className="gap-2 bg-linear-900 text-white">
                    <Plus className="w-4 h-4" />
                    Create Squad
                </Button>
            </header>

            <div className="flex-1 overflow-y-auto p-6">
                {/* Filters */}
                <div className="flex gap-3 mb-6">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-linear-400" />
                        <input
                            type="text"
                            placeholder="Search squads..."
                            className="w-full h-10 pl-9 pr-4 rounded-md border border-linear-200 text-sm focus:outline-none focus:border-linear-400 focus:ring-1 focus:ring-linear-400"
                        />
                    </div>
                    <Button variant="outline" className="gap-2">
                        <Filter className="w-4 h-4" />
                        Filter
                    </Button>
                </div>

                {/* My Squads Section */}
                <div className="mb-8">
                    <h2 className="text-sm font-semibold text-linear-900 mb-4 flex items-center gap-2">
                        Your Squads <Badge variant="secondary" className="h-5">3</Badge>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[1, 2, 3].map((i) => (
                            <Card key={i} className="hover:border-linear-300 transition-colors cursor-pointer group">
                                <CardContent className="p-5">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="w-12 h-12 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-lg">
                                            TS
                                        </div>
                                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Active</Badge>
                                    </div>
                                    <h3 className="font-semibold text-linear-900 group-hover:text-blue-600 transition-colors">Tech for Social Good</h3>
                                    <p className="text-sm text-linear-500 mt-1 mb-4 line-clamp-2">
                                        A community of developers and designers building tools for non-profits.
                                    </p>
                                    <div className="flex items-center justify-between text-xs text-linear-500 pt-4 border-t border-linear-100">
                                        <div className="flex items-center gap-1.5">
                                            <Users className="w-3.5 h-3.5" />
                                            <span>24 members</span>
                                        </div>
                                        <div className="flex -space-x-1.5">
                                            {[1, 2, 3].map(user => (
                                                <div key={user} className="w-5 h-5 rounded-full bg-linear-200 border border-white"></div>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Discovery Section */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-sm font-semibold text-linear-900">Recommended for you</h2>
                        <a href="#" className="text-xs text-blue-600 hover:underline flex items-center gap-1">View all <ArrowRight className="w-3 h-3" /></a>
                    </div>

                    <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center p-4 bg-white border border-linear-200 rounded-lg hover:border-linear-300 transition-colors">
                                <div className="w-10 h-10 rounded bg-orange-50 text-orange-600 flex items-center justify-center font-bold shrink-0">
                                    CC
                                </div>
                                <div className="ml-4 flex-1">
                                    <h4 className="text-sm font-semibold text-linear-900">Climate Champions</h4>
                                    <p className="text-xs text-linear-500 mt-0.5">Focusing on local environmental impact initiatives.</p>
                                </div>
                                <div className="flex items-center gap-6 mr-4 text-xs text-linear-500">
                                    <span>1.2k members</span>
                                    <span>56 events</span>
                                </div>
                                <Button size="sm" variant="outline">Join</Button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
