"use client";

import { useState } from "react";
import { ArrowRight, ArrowLeft, X, Plus } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const suggestedSkills = [
  "Event Planning",
  "Fundraising",
  "Social Media",
  "Photography",
  "Graphic Design",
  "Public Speaking",
  "Teaching",
  "Mentoring",
  "Construction",
  "Cooking",
  "First Aid",
  "Project Management",
  "Translation",
  "Data Entry",
  "Marketing",
  "Writing",
];

export default function OnboardingSkillsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"offered" | "learn">("offered");
  const [skillsOffered, setSkillsOffered] = useState<Set<string>>(new Set());
  const [skillsToLearn, setSkillsToLearn] = useState<Set<string>>(new Set());
  const [customSkill, setCustomSkill] = useState("");

  const handleAddSkillOffered = (skill: string) => {
    setSkillsOffered((prev) => {
      const next = new Set(prev);
      if (next.has(skill)) {
        next.delete(skill);
      } else {
        next.add(skill);
      }
      return next;
    });
  };

  const handleAddSkillToLearn = (skill: string) => {
    setSkillsToLearn((prev) => {
      const next = new Set(prev);
      if (next.has(skill)) {
        next.delete(skill);
      } else {
        next.add(skill);
      }
      return next;
    });
  };

  const handleAddCustomSkill = (type: "offered" | "learn") => {
    if (!customSkill.trim()) return;

    if (type === "offered") {
      handleAddSkillOffered(customSkill);
    } else {
      handleAddSkillToLearn(customSkill);
    }

    setCustomSkill("");
  };

  const handleContinue = () => {
    toast.success("Skills saved!");
    router.push("/onboarding/complete");
  };

  return (
    <div className="min-h-screen bg-[#fbfbfc]">
      {/* Header */}
      <div className="h-14 border-b border-linear-100 bg-white px-6 flex items-center">
        <div className="flex items-center gap-2 text-[11px] text-linear-500">
          <span>Onboarding</span>
          <span>/</span>
          <span className="text-linear-900">Skills</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-3xl">
          {/* Card */}
          <div className="rounded-lg border border-linear-200 bg-white shadow-sm">
            <div className="p-8">
              {/* Header */}
              <div className="mb-8 text-center">
                <h1 className="mb-2 text-[20px] font-semibold text-linear-900">
                  What Are Your Skills?
                </h1>
                <p className="text-[12px] text-linear-600">
                  Share skills you can offer and skills you want to learn
                </p>
              </div>

              {/* Progress Indicator */}
              <div className="mb-8">
                <div className="mb-2 flex justify-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-linear-200"></div>
                  <div className="h-2 w-2 rounded-full bg-linear-200"></div>
                  <div className="h-2 w-2 rounded-full bg-linear-200"></div>
                  <div className="h-2 w-2 rounded-full bg-peer-green"></div>
                </div>
                <p className="text-center text-[11px] text-linear-600">Step 4 of 4</p>
              </div>

              {/* Tabs */}
              <div className="mb-8">
                <div className="grid grid-cols-2 rounded-md border border-linear-200 bg-linear-100 p-1 mb-6">
                  <button
                    onClick={() => setActiveTab("offered")}
                    className={`h-8 rounded text-[12px] font-medium transition-colors ${
                      activeTab === "offered"
                        ? "bg-white text-linear-900 shadow-sm"
                        : "text-linear-600 hover:text-linear-900"
                    }`}
                  >
                    Skills I Offer ({skillsOffered.size})
                  </button>
                  <button
                    onClick={() => setActiveTab("learn")}
                    className={`h-8 rounded text-[12px] font-medium transition-colors ${
                      activeTab === "learn"
                        ? "bg-white text-linear-900 shadow-sm"
                        : "text-linear-600 hover:text-linear-900"
                    }`}
                  >
                    Skills to Learn ({skillsToLearn.size})
                  </button>
                </div>

                {/* Skills I Offer */}
                {activeTab === "offered" && (
                  <div className="space-y-4">
                    {/* Selected Skills */}
                    {skillsOffered.size > 0 && (
                      <div className="rounded-lg border border-linear-200 bg-[#fbfbfc] p-4">
                        <p className="mb-2 text-[11px] font-medium text-linear-900">
                          Your Skills:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {Array.from(skillsOffered).map((skill) => (
                            <div
                              key={skill}
                              className="inline-flex items-center gap-1 rounded-md border border-linear-200 bg-white px-2.5 py-1 text-[12px] text-linear-900"
                            >
                              {skill}
                              <button
                                onClick={() => handleAddSkillOffered(skill)}
                                className="ml-1 hover:text-red-600"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Add Custom Skill */}
                    <div>
                      <label className="block mb-1.5 text-[11px] font-medium text-linear-900">
                        Add a skill
                      </label>
                      <div className="flex gap-2">
                        <input
                          placeholder="Type a skill..."
                          value={customSkill}
                          onChange={(e) => setCustomSkill(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleAddCustomSkill("offered");
                            }
                          }}
                          className="flex-1 h-9 rounded-md border border-linear-200 bg-white px-3 text-[13px] text-linear-900 placeholder:text-linear-400 focus:outline-none focus:ring-2 focus:ring-linear-900 focus:border-transparent"
                        />
                        <button
                          onClick={() => handleAddCustomSkill("offered")}
                          disabled={!customSkill.trim()}
                          className="flex h-9 w-9 items-center justify-center rounded-md border border-linear-200 bg-white hover:bg-linear-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Plus className="h-4 w-4 text-linear-900" />
                        </button>
                      </div>
                    </div>

                    {/* Suggested Skills */}
                    <div>
                      <p className="mb-3 text-[11px] font-medium text-linear-900">
                        Or select from popular skills:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {suggestedSkills.map((skill) => (
                          <button
                            key={skill}
                            onClick={() => handleAddSkillOffered(skill)}
                            className={`rounded-md border px-3 py-1.5 text-[12px] transition-colors ${
                              skillsOffered.has(skill)
                                ? "border-peer-green bg-peer-green text-white"
                                : "border-linear-200 text-linear-900 hover:border-peer-green"
                            }`}
                          >
                            {skill}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Skills to Learn */}
                {activeTab === "learn" && (
                  <div className="space-y-4">
                    {/* Selected Skills */}
                    {skillsToLearn.size > 0 && (
                      <div className="rounded-lg border border-linear-200 bg-[#fbfbfc] p-4">
                        <p className="mb-2 text-[11px] font-medium text-linear-900">
                          Skills You Want to Learn:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {Array.from(skillsToLearn).map((skill) => (
                            <div
                              key={skill}
                              className="inline-flex items-center gap-1 rounded-md border border-linear-200 bg-white px-2.5 py-1 text-[12px] text-linear-900"
                            >
                              {skill}
                              <button
                                onClick={() => handleAddSkillToLearn(skill)}
                                className="ml-1 hover:text-red-600"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Add Custom Skill */}
                    <div>
                      <label className="block mb-1.5 text-[11px] font-medium text-linear-900">
                        Add a skill to learn
                      </label>
                      <div className="flex gap-2">
                        <input
                          placeholder="Type a skill..."
                          value={customSkill}
                          onChange={(e) => setCustomSkill(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleAddCustomSkill("learn");
                            }
                          }}
                          className="flex-1 h-9 rounded-md border border-linear-200 bg-white px-3 text-[13px] text-linear-900 placeholder:text-linear-400 focus:outline-none focus:ring-2 focus:ring-linear-900 focus:border-transparent"
                        />
                        <button
                          onClick={() => handleAddCustomSkill("learn")}
                          disabled={!customSkill.trim()}
                          className="flex h-9 w-9 items-center justify-center rounded-md border border-linear-200 bg-white hover:bg-linear-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Plus className="h-4 w-4 text-linear-900" />
                        </button>
                      </div>
                    </div>

                    {/* Suggested Skills */}
                    <div>
                      <p className="mb-3 text-[11px] font-medium text-linear-900">
                        Or select from popular skills:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {suggestedSkills.map((skill) => (
                          <button
                            key={skill}
                            onClick={() => handleAddSkillToLearn(skill)}
                            className={`rounded-md border px-3 py-1.5 text-[12px] transition-colors ${
                              skillsToLearn.has(skill)
                                ? "border-peer-green bg-peer-green text-white"
                                : "border-linear-200 text-linear-900 hover:border-peer-green"
                            }`}
                          >
                            {skill}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Link
                  href="/onboarding/interests"
                  className="flex h-9 flex-1 items-center justify-center gap-2 rounded-md border border-linear-200 bg-white text-[13px] text-linear-900 hover:bg-linear-50 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Link>
                <button
                  onClick={handleContinue}
                  className="flex h-9 flex-1 items-center justify-center gap-2 rounded-md bg-peer-green text-[13px] font-medium text-white hover:bg-green-600 transition-colors shadow-subtle"
                >
                  Complete Setup
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              {/* Skip */}
              <div className="mt-4 text-center">
                <Link
                  href="/onboarding/complete"
                  className="text-[12px] text-linear-600 hover:text-peer-green transition-colors"
                >
                  Skip for now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
