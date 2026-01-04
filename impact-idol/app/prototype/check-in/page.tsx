'use client';

import React from 'react';
import { QrCode, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { toast } from "sonner";

export default function CheckInPage() {
    // Mock functionality
    const handleScan = () => {
        toast.message('Camera Access Requested', {
            description: 'In a real app, this would open the camera.'
        });
    }

    return (
        <div className="flex flex-col h-full bg-black text-white relative items-center justify-center p-6">
            <Link href="/prototype/dashboard" className="absolute top-6 left-6 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                <ArrowLeft className="w-5 h-5 text-white" />
            </Link>

            <div className="text-center space-y-8 max-w-sm w-full">
                <div>
                    <h1 className="text-2xl font-bold mb-2">Volunteer Check-in</h1>
                    <p className="text-white/60 text-sm">Scan the QR code at the event location to verify your attendance.</p>
                </div>

                <div className="aspect-square bg-white/10 rounded-3xl border-2 border-dashed border-white/30 flex items-center justify-center relative overflow-hidden group cursor-pointer" onClick={handleScan}>
                    <QrCode className="w-32 h-32 text-white/80 group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-peer-green/20 to-transparent translate-y-[-100%] animate-[scan_3s_ease-in-out_infinite]"></div>
                </div>

                <Button size="lg" className="w-full bg-peer-green hover:bg-peer-green-dark text-white font-medium h-12 rounded-xl" onClick={handleScan}>
                    Open Camera Scanner
                </Button>

                <div className="pt-8 border-t border-white/10">
                    <div className="flex items-center justify-center gap-2 text-sm text-white/50">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Your location will be verified</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
