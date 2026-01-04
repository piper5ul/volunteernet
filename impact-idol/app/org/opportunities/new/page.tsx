"use client";

import { useState } from "react";
import { useAuth } from "@/lib/stores/auth-store";
import { OrgNavigation } from "@/components/org/org-navigation";
import { ArrowLeft, Calendar, MapPin, Users, Clock, Tag, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

interface OpportunityFormData {
  title: string;
  description: string;
  cause: string;
  location: string;
  isVirtual: boolean;
  startDate: string;
  startTime: string;
  endTime: string;
  expectedHours: number;
  spotsAvailable: number;
  requiredSkills: string[];
  experienceRequired: string;
  requirements: string;
}

const causes = [
  { id: "environment", name: "Environment" },
  { id: "education", name: "Education" },
  { id: "health", name: "Health & Wellness" },
  { id: "animals", name: "Animal Welfare" },
  { id: "community", name: "Community Development" },
  { id: "hunger", name: "Hunger Relief" },
  { id: "housing", name: "Housing & Homelessness" },
  { id: "elderly", name: "Elderly Care" },
];

const skillOptions = [
  "Teaching",
  "Carpentry",
  "Painting",
  "Gardening",
  "Leadership",
  "Event Planning",
  "Writing",
  "Design",
  "Public Speaking",
  "Mentoring",
  "Data Analysis",
  "Fundraising",
];

export default function CreateOpportunityPage() {
  const { currentPersona } = useAuth();
  const [formData, setFormData] = useState<OpportunityFormData>({
    title: "",
    description: "",
    cause: "",
    location: "",
    isVirtual: false,
    startDate: "",
    startTime: "09:00",
    endTime: "12:00",
    expectedHours: 3,
    spotsAvailable: 10,
    requiredSkills: [],
    experienceRequired: "none",
    requirements: "",
  });

  const [selectedSkills, setSelectedSkills] = useState<Set<string>>(new Set());
  const [isSaving, setIsSaving] = useState(false);

  const handleSkillToggle = (skill: string) => {
    const newSkills = new Set(selectedSkills);
    if (newSkills.has(skill)) {
      newSkills.delete(skill);
    } else {
      newSkills.add(skill);
    }
    setSelectedSkills(newSkills);
  };

  const handleSaveDraft = async () => {
    if (!formData.title.trim()) {
      toast.error("Please enter an opportunity title");
      return;
    }
    setIsSaving(true);
    // Simulate save
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success("Opportunity saved as draft");
    setIsSaving(false);
  };

  const handlePublish = async () => {
    if (!formData.title.trim()) {
      toast.error("Please enter an opportunity title");
      return;
    }
    if (!formData.description.trim()) {
      toast.error("Please enter a description");
      return;
    }
    if (!formData.cause) {
      toast.error("Please select a cause");
      return;
    }
    if (!formData.startDate) {
      toast.error("Please select a date");
      return;
    }
    if (!formData.isVirtual && !formData.location.trim()) {
      toast.error("Please enter a location");
      return;
    }

    setIsSaving(true);
    // Simulate publish
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success("Opportunity published! Volunteers can now register.");
    setIsSaving(false);
    // In real app, would redirect to opportunities list
    setTimeout(() => {
      window.location.href = "/org/opportunities";
    }, 1500);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#fbfbfc]">
      {/* Navigation */}
      <OrgNavigation />

      {/* Page Header */}
      <div className="border-b border-linear-200 bg-white px-6 py-4">
        <div className="mx-auto max-w-6xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/org/opportunities"
              className="p-1.5 hover:bg-linear-50 rounded text-linear-600 hover:text-linear-900"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <Calendar className="h-5 w-5 text-linear-600" />
            <h1 className="text-[16px] font-semibold text-linear-900">Create Opportunity</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveDraft}
              disabled={isSaving}
              className="h-9 px-4 text-[13px] font-medium text-linear-900 bg-white border border-linear-200 rounded-md hover:bg-linear-50 transition-colors disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Save Draft"}
            </button>
            <button
              onClick={handlePublish}
              disabled={isSaving}
              className="h-9 px-4 text-[13px] font-medium text-white bg-linear-900 hover:bg-black rounded-md transition-colors disabled:opacity-50"
            >
              {isSaving ? "Publishing..." : "Publish"}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-4xl px-6 py-8">
          {/* Info Banner */}
          <div className="mb-6 flex gap-3 p-4 rounded-lg border border-blue-200 bg-blue-50">
            <AlertCircle className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-[13px] font-medium text-blue-900">Published opportunities appear in volunteer searches immediately</p>
              <p className="text-[12px] text-blue-700 mt-1">You can edit or unpublish at any time. Volunteers who have registered will be notified of major changes.</p>
            </div>
          </div>

          {/* Form Card */}
          <div className="rounded-lg border border-linear-200 bg-white shadow-sm p-6">
            <div className="space-y-6">
              {/* Basic Info Section */}
              <div>
                <h2 className="text-[14px] font-semibold text-linear-900 mb-4 flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  Basic Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[13px] font-medium text-linear-900 mb-1.5">
                      Opportunity Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g., Community Garden Spring Cleanup"
                      className="w-full h-9 px-3 text-[13px] border border-linear-200 rounded-md focus:outline-none focus:ring-2 focus:ring-linear-900 focus:border-transparent"
                    />
                    <p className="mt-1 text-[11px] text-linear-500">Be specific about what volunteers will be doing</p>
                  </div>

                  <div>
                    <label className="block text-[13px] font-medium text-linear-900 mb-1.5">
                      Cause *
                    </label>
                    <select
                      value={formData.cause}
                      onChange={(e) => setFormData({ ...formData, cause: e.target.value })}
                      className="w-full h-9 px-3 text-[13px] border border-linear-200 rounded-md focus:outline-none focus:ring-2 focus:ring-linear-900 focus:border-transparent"
                    >
                      <option value="">Select a cause...</option>
                      {causes.map((cause) => (
                        <option key={cause.id} value={cause.id}>
                          {cause.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[13px] font-medium text-linear-900 mb-1.5">
                      Description *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={5}
                      placeholder="Describe what volunteers will do, what impact they'll have, and any important details they should know..."
                      className="w-full px-3 py-2 text-[13px] border border-linear-200 rounded-md focus:outline-none focus:ring-2 focus:ring-linear-900 focus:border-transparent resize-none"
                    />
                    <p className="mt-1 text-[11px] text-linear-500">
                      {formData.description.length}/500 characters
                    </p>
                  </div>

                  <div>
                    <label className="block text-[13px] font-medium text-linear-900 mb-1.5">
                      Requirements & Expectations
                    </label>
                    <textarea
                      value={formData.requirements}
                      onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                      rows={3}
                      placeholder="Physical requirements, what to bring, dress code, etc. (optional)"
                      className="w-full px-3 py-2 text-[13px] border border-linear-200 rounded-md focus:outline-none focus:ring-2 focus:ring-linear-900 focus:border-transparent resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Location & Date Section */}
              <div>
                <h2 className="text-[14px] font-semibold text-linear-900 mb-4 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  When & Where
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isVirtual}
                        onChange={(e) => setFormData({ ...formData, isVirtual: e.target.checked })}
                        className="w-4 h-4 rounded border-linear-300"
                      />
                      <span className="text-[13px] font-medium text-linear-900">Virtual Event</span>
                    </label>
                  </div>

                  {!formData.isVirtual && (
                    <div>
                      <label className="block text-[13px] font-medium text-linear-900 mb-1.5 flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" />
                        Location *
                      </label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="e.g., Golden Gate Park, SF"
                        className="w-full h-9 px-3 text-[13px] border border-linear-200 rounded-md focus:outline-none focus:ring-2 focus:ring-linear-900 focus:border-transparent"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-[13px] font-medium text-linear-900 mb-1.5">
                      Date *
                    </label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      className="w-full h-9 px-3 text-[13px] border border-linear-200 rounded-md focus:outline-none focus:ring-2 focus:ring-linear-900 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[13px] font-medium text-linear-900 mb-1.5">
                        Start Time
                      </label>
                      <input
                        type="time"
                        value={formData.startTime}
                        onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                        className="w-full h-9 px-3 text-[13px] border border-linear-200 rounded-md focus:outline-none focus:ring-2 focus:ring-linear-900 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-linear-900 mb-1.5">
                        End Time
                      </label>
                      <input
                        type="time"
                        value={formData.endTime}
                        onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                        className="w-full h-9 px-3 text-[13px] border border-linear-200 rounded-md focus:outline-none focus:ring-2 focus:ring-linear-900 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Hours & Capacity Section */}
              <div>
                <h2 className="text-[14px] font-semibold text-linear-900 mb-4 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Hours & Capacity
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] font-medium text-linear-900 mb-1.5">
                      Expected Hours
                    </label>
                    <input
                      type="number"
                      min="0.5"
                      step="0.5"
                      value={formData.expectedHours}
                      onChange={(e) => setFormData({ ...formData, expectedHours: parseFloat(e.target.value) })}
                      className="w-full h-9 px-3 text-[13px] border border-linear-200 rounded-md focus:outline-none focus:ring-2 focus:ring-linear-900 focus:border-transparent"
                    />
                    <p className="mt-1 text-[11px] text-linear-500">Hours volunteers will log if they complete this</p>
                  </div>
                  <div>
                    <label className="block text-[13px] font-medium text-linear-900 mb-1.5 flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5" />
                      Spots Available
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={formData.spotsAvailable}
                      onChange={(e) => setFormData({ ...formData, spotsAvailable: parseInt(e.target.value) })}
                      className="w-full h-9 px-3 text-[13px] border border-linear-200 rounded-md focus:outline-none focus:ring-2 focus:ring-linear-900 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Skills Section */}
              <div>
                <h2 className="text-[14px] font-semibold text-linear-900 mb-4">Required Skills (Optional)</h2>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {skillOptions.map((skill) => (
                    <label key={skill} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedSkills.has(skill)}
                        onChange={() => handleSkillToggle(skill)}
                        className="w-4 h-4 rounded border-linear-300"
                      />
                      <span className="text-[12px] text-linear-700">{skill}</span>
                    </label>
                  ))}
                </div>
                <p className="text-[11px] text-linear-500">
                  {selectedSkills.size > 0
                    ? `${selectedSkills.size} skill${selectedSkills.size !== 1 ? "s" : ""} selected`
                    : "Select skills if volunteers need prior experience"}
                </p>
              </div>

              {/* Experience Section */}
              <div>
                <h2 className="text-[14px] font-semibold text-linear-900 mb-4">Experience Required</h2>
                <div className="space-y-2">
                  {["none", "beginner", "intermediate", "advanced"].map((level) => (
                    <label key={level} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="experience"
                        value={level}
                        checked={formData.experienceRequired === level}
                        onChange={(e) => setFormData({ ...formData, experienceRequired: e.target.value })}
                        className="w-4 h-4"
                      />
                      <span className="text-[12px] text-linear-700 capitalize">
                        {level === "none" ? "No experience necessary" : `${level} level`}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-linear-100"></div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4">
                <Link
                  href="/org/opportunities"
                  className="text-[13px] font-medium text-linear-600 hover:text-linear-900 transition-colors"
                >
                  Back to Opportunities
                </Link>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSaveDraft}
                    disabled={isSaving}
                    className="h-9 px-4 text-[13px] font-medium text-linear-900 bg-white border border-linear-200 rounded-md hover:bg-linear-50 transition-colors disabled:opacity-50"
                  >
                    {isSaving ? "Saving..." : "Save Draft"}
                  </button>
                  <button
                    onClick={handlePublish}
                    disabled={isSaving}
                    className="h-9 px-4 text-[13px] font-medium text-white bg-linear-900 hover:bg-black rounded-md transition-colors disabled:opacity-50"
                  >
                    {isSaving ? "Publishing..." : "Publish Opportunity"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
