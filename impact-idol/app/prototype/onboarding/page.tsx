'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from 'lucide-react';
import { toast } from "sonner";
import { useRouter } from 'next/navigation';

export default function OnboardingPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const totalSteps = 3;

    const causes = ["Education", "Environment", "Health", "Animals", "Arts", "Community", "Technology", "Crisis Relief"];
    const [selectedCauses, setSelectedCauses] = useState<string[]>([]);

    const toggleCause = (cause: string) => {
        setSelectedCauses(prev => prev.includes(cause) ? prev.filter(c => c !== cause) : [...prev, cause]);
    };

    const handleNext = () => {
        if (step < totalSteps) {
            setStep(step + 1);
        } else {
            toast.success("Welcome to Impact Idol!");
            router.push('/prototype/dashboard');
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-md space-y-8">
                {/* Progress */}
                <div className="flex gap-2">
                    {[1, 2, 3].map(i => (
                        <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${i <= step ? 'bg-linear-900' : 'bg-linear-100'}`}></div>
                    ))}
                </div>

                {/* Step 1: Welcome */}
                {step === 1 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="text-center">
                            <h1 className="text-3xl font-bold text-linear-900 tracking-tight">Welcome to Impact Idol</h1>
                            <p className="text-linear-500 mt-3 text-lg">Let's set up your volunteer profile to find the best opportunities for you.</p>
                        </div>
                        <div className="space-y-4 pt-4">
                            <div className="grid gap-2">
                                <label className="text-sm font-medium text-linear-700">Full Name</label>
                                <input type="text" className="h-11 w-full rounded-md border border-linear-200 px-3 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-black" placeholder="Jane Doe" autoFocus />
                            </div>
                            <div className="grid gap-2">
                                <label className="text-sm font-medium text-linear-700">Location</label>
                                <input type="text" className="h-11 w-full rounded-md border border-linear-200 px-3 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-black" placeholder="San Francisco, CA" />
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 2: Interests */}
                {step === 2 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="text-center">
                            <h1 className="text-2xl font-bold text-linear-900 tracking-tight">What do you care about?</h1>
                            <p className="text-linear-500 mt-2">Select at least 3 causes that matter to you.</p>
                        </div>
                        <div className="grid grid-cols-2 gap-3 pt-2">
                            {causes.map(cause => {
                                const isSelected = selectedCauses.includes(cause);
                                return (
                                    <button
                                        key={cause}
                                        onClick={() => toggleCause(cause)}
                                        className={`h-14 rounded-lg border flex items-center justify-center font-medium transition-all ${isSelected ? 'border-linear-900 bg-linear-900 text-white shadow-md' : 'border-linear-200 bg-white text-linear-600 hover:border-linear-300 hover:bg-linear-50'}`}
                                    >
                                        {cause}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                )}

                {/* Step 3: Success */}
                {step === 3 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-center py-8">
                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Check className="w-10 h-10" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-linear-900 tracking-tight">You're all set!</h1>
                            <p className="text-linear-500 mt-3 text-lg">Your profile is ready. Start exploring opportunities to make an impact.</p>
                        </div>
                    </div>
                )}

                <div className="pt-6">
                    <Button size="lg" className="w-full h-12 text-base bg-linear-900 hover:bg-black" onClick={handleNext}>
                        {step === 3 ? "Get Started" : "Continue"} <ArrowRight className="ml-2 w-4 h-4 opacity-50" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
