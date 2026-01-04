'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Link as LinkIcon, Users, Calendar, Heart, Share2, MoreHorizontal, CheckCircle2, Trophy } from 'lucide-react';
import Link from 'next/link';

export default function OrganizationProfilePage() {
    return (
        <div className="flex flex-col min-h-screen bg-[#f7f8f8]">
            {/* Cover Photo */}
            <div className="h-40 bg-gradient-to-r from-linear-800 to-linear-600 relative shrink-0">
                <div className="absolute inset-0 bg-black/10"></div>
            </div>

            <div className="container mx-auto px-6 max-w-5xl -mt-10 mb-8 flex items-end gap-6 relative z-10">
                <div className="w-24 h-24 rounded-lg bg-white p-1 shadow-lg shrink-0">
                    <div className="w-full h-full bg-linear-100 rounded flex items-center justify-center text-linear-500 font-bold text-xl">OC</div>
                </div>
                <div className="flex-1 pb-1">
                    <div className="flex justify-between items-end">
                        <div>
                            <h1 className="text-2xl font-bold text-linear-900">Ocean Cleanup</h1>
                            <p className="text-linear-500 font-medium">Non-profit Organization</p>
                        </div>
                        <div className="flex gap-3 mb-1">
                            <Button variant="outline" size="sm" className="gap-2">
                                <MoreHorizontal className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="gap-2">
                                <Share2 className="w-4 h-4" />
                                Share
                            </Button>
                            <Button className="gap-2 bg-linear-900 text-white hover:bg-linear-800">
                                Follow
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 max-w-5xl flex gap-8 pb-12">
                {/* Left Sidebar */}
                <div className="w-64 shrink-0 space-y-6">
                    <Card>
                        <CardContent className="p-4 space-y-4">
                            <div className="space-y-3 pt-2">
                                <div className="flex items-center gap-3 text-sm text-linear-600">
                                    <MapPin className="w-4 h-4 shrink-0" />
                                    <span>San Francisco, CA</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-linear-600">
                                    <LinkIcon className="w-4 h-4 shrink-0" />
                                    <a href="#" className="hover:underline text-blue-600">oceancleanup.org</a>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-linear-600">
                                    <Users className="w-4 h-4 shrink-0" />
                                    <span>12.5k Followers</span>
                                </div>
                            </div>
                            <div className="pt-4 border-t border-linear-100">
                                <h4 className="text-[11px] font-medium text-linear-400 uppercase tracking-wider mb-2">Our Mission</h4>
                                <p className="text-sm text-linear-600 leading-relaxed">
                                    We develop advanced technologies to rid the world's oceans of plastic.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="p-4 pb-2">
                            <CardTitle className="text-sm font-semibold">Impact Stats</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0 space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                                    <Trophy className="w-4 h-4" />
                                </div>
                                <div>
                                    <div className="text-lg font-bold text-linear-900">128</div>
                                    <div className="text-[11px] text-linear-500">Events Hosted</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-green-50 text-peer-green flex items-center justify-center">
                                    <CheckCircle2 className="w-4 h-4" />
                                </div>
                                <div>
                                    <div className="text-lg font-bold text-linear-900">5.2k</div>
                                    <div className="text-[11px] text-linear-500">Hours Verfied</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content */}
                <div className="flex-1 space-y-6">
                    <Tabs defaultValue="opportunities">
                        <TabsList className="w-full justify-start border-b border-linear-200 rounded-none bg-transparent p-0 h-auto">
                            <TabsTrigger value="opportunities" className="rounded-none border-b-2 border-transparent data-[state=active]:border-linear-900 data-[state=active]:bg-transparent px-4 py-2">
                                Opportunities
                            </TabsTrigger>
                            <TabsTrigger value="about" className="rounded-none border-b-2 border-transparent data-[state=active]:border-linear-900 data-[state=active]:bg-transparent px-4 py-2">
                                About
                            </TabsTrigger>
                            <TabsTrigger value="people" className="rounded-none border-b-2 border-transparent data-[state=active]:border-linear-900 data-[state=active]:bg-transparent px-4 py-2">
                                People
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="opportunities" className="mt-6 space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="group flex bg-white border border-linear-200 rounded-lg p-4 hover:border-linear-300 transition-colors shadow-sm">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Badge variant="secondary" className="text-[10px] h-5">Environment</Badge>
                                            <span className="text-[11px] text-linear-400">Posted 2 days ago</span>
                                        </div>
                                        <h3 className="font-semibold text-linear-900 group-hover:text-blue-600 transition-colors">Ocean Beach Cleanup {i}</h3>
                                        <p className="text-sm text-linear-500 mt-1 line-clamp-1">
                                            Help us remove plastic waste from the shoreline this Saturday morning.
                                        </p>
                                        <div className="flex items-center gap-4 mt-3 text-xs text-linear-500">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-3.5 h-3.5" />
                                                <span>Sat, Mar {10 + i}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <MapPin className="w-3.5 h-3.5" />
                                                <span>San Francisco, CA</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-center pl-4 border-l border-linear-100 ml-4">
                                        <Button size="sm" variant="outline">View Details</Button>
                                    </div>
                                </div>
                            ))}
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}
