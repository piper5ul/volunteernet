"use client";

import { useState } from "react";
import { trpc } from "@/lib/utils/trpc";
import { useAuth } from "@/lib/stores/auth-store";
import { Target, TrendingUp, Award, Plus, Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function GoalsPage() {
  const { currentPersona } = useAuth();
  const userId = currentPersona.type === "volunteer" ? currentPersona.userId : null;

  const [showAddGoal, setShowAddGoal] = useState(false);
  const [goalType, setGoalType] = useState<"hours" | "skills" | "causes">("hours");
  const [goalTarget, setGoalTarget] = useState("");
  const [goalPeriod, setGoalPeriod] = useState<"monthly" | "yearly">("monthly");
  const [selectedSkill, setSelectedSkill] = useState("");
  const [selectedCause, setSelectedCause] = useState("");

  const { data: goals, isLoading } = trpc.users.getGoals.useQuery(
    { userId: userId || "" },
    { enabled: !!userId }
  );

  const { data: stats } = trpc.users.getImpactStats.useQuery(
    { userId: userId || "" },
    { enabled: !!userId }
  );

  const { data: causes } = trpc.causes.list.useQuery();

  const createGoalMutation = trpc.users.createGoal.useMutation({
    onSuccess: () => {
      toast.success("Goal created successfully!");
      setShowAddGoal(false);
      setGoalTarget("");
    },
  });

  const deleteGoalMutation = trpc.users.deleteGoal.useMutation({
    onSuccess: () => {
      toast.success("Goal deleted");
    },
  });

  const handleCreateGoal = () => {
    if (!userId) return;

    let goalData: any = {
      userId,
      type: goalType,
      period: goalPeriod,
    };

    if (goalType === "hours") {
      goalData.target = parseInt(goalTarget);
    } else if (goalType === "skills") {
      goalData.skill = selectedSkill;
    } else if (goalType === "causes") {
      goalData.cause = selectedCause;
    }

    createGoalMutation.mutate(goalData);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fbfbfc]">
        <div className="h-14 border-b border-linear-200 bg-white px-6 flex items-center">
          <div className="h-4 w-32 bg-linear-200 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  const currentMonth = new Date().toLocaleDateString("en-US", { month: "long" });
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-[#fbfbfc]">
      {/* Header */}
      <div className="h-14 border-b border-linear-200 bg-white px-6 flex items-center gap-3">
        <Link href="/dashboard" className="flex items-center gap-2 text-[13px] text-linear-600 hover:text-linear-900">
          <ArrowLeft className="h-4 w-4" />
          <span>Dashboard</span>
        </Link>
        <span className="text-[13px] text-linear-400">/</span>
        <span className="text-[13px] text-linear-900 font-medium">Goals</span>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-[20px] font-semibold text-linear-900 mb-1">My Goals</h1>
            <p className="text-[13px] text-linear-600">
              Set and track your volunteer impact goals
            </p>
          </div>
          <button
            onClick={() => setShowAddGoal(!showAddGoal)}
            className="inline-flex h-8 items-center justify-center gap-2 rounded-md bg-[#22c55e] px-4 text-[13px] font-medium text-white hover:bg-[#16a34a]"
          >
            <Plus className="h-4 w-4" />
            Add Goal
          </button>
        </div>

        {/* Add Goal Form */}
        {showAddGoal && (
          <div className="mb-6 rounded-lg border border-linear-200 bg-white shadow-sm p-6">
            <h3 className="mb-4 text-[14px] font-semibold text-linear-900">Create New Goal</h3>

            <div className="space-y-4">
              {/* Goal Type */}
              <div>
                <label className="block text-[12px] font-medium text-linear-900 mb-2">Goal Type</label>
                <select
                  value={goalType}
                  onChange={(e: any) => setGoalType(e.target.value)}
                  className="w-full h-9 rounded-md border border-linear-200 bg-white px-3 text-[13px] text-linear-900 focus:outline-none focus:ring-1 focus:ring-[#22c55e] focus:border-[#22c55e]"
                >
                  <option value="hours">Volunteer Hours</option>
                  <option value="skills">Learn a Skill</option>
                  <option value="causes">Support a Cause</option>
                </select>
              </div>

              {/* Hours Goal */}
              {goalType === "hours" && (
                <>
                  <div>
                    <label className="block text-[12px] font-medium text-linear-900 mb-2">Target Hours</label>
                    <input
                      type="number"
                      placeholder="e.g., 20"
                      value={goalTarget}
                      onChange={(e) => setGoalTarget(e.target.value)}
                      className="w-full h-9 rounded-md border border-linear-200 bg-white px-3 text-[13px] text-linear-900 placeholder:text-linear-400 focus:outline-none focus:ring-1 focus:ring-[#22c55e] focus:border-[#22c55e]"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-medium text-linear-900 mb-2">Time Period</label>
                    <select
                      value={goalPeriod}
                      onChange={(e: any) => setGoalPeriod(e.target.value)}
                      className="w-full h-9 rounded-md border border-linear-200 bg-white px-3 text-[13px] text-linear-900 focus:outline-none focus:ring-1 focus:ring-[#22c55e] focus:border-[#22c55e]"
                    >
                      <option value="monthly">Per Month</option>
                      <option value="yearly">Per Year</option>
                    </select>
                  </div>
                </>
              )}

              {/* Skills Goal */}
              {goalType === "skills" && (
                <div>
                  <label className="block text-[12px] font-medium text-linear-900 mb-2">Skill to Learn</label>
                  <input
                    placeholder="e.g., Event Planning"
                    value={selectedSkill}
                    onChange={(e) => setSelectedSkill(e.target.value)}
                    className="w-full h-9 rounded-md border border-linear-200 bg-white px-3 text-[13px] text-linear-900 placeholder:text-linear-400 focus:outline-none focus:ring-1 focus:ring-[#22c55e] focus:border-[#22c55e]"
                  />
                </div>
              )}

              {/* Causes Goal */}
              {goalType === "causes" && (
                <div>
                  <label className="block text-[12px] font-medium text-linear-900 mb-2">Cause to Support</label>
                  <select
                    value={selectedCause}
                    onChange={(e) => setSelectedCause(e.target.value)}
                    className="w-full h-9 rounded-md border border-linear-200 bg-white px-3 text-[13px] text-linear-900 focus:outline-none focus:ring-1 focus:ring-[#22c55e] focus:border-[#22c55e]"
                  >
                    <option value="">Select a cause</option>
                    {causes?.map((cause) => (
                      <option key={cause.id} value={cause.id}>
                        {cause.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => setShowAddGoal(false)}
                  className="h-8 rounded-md border border-linear-200 bg-white px-4 text-[13px] font-medium text-linear-900 hover:bg-[#fbfbfc]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateGoal}
                  disabled={createGoalMutation.isPending}
                  className="h-8 rounded-md bg-[#22c55e] px-4 text-[13px] font-medium text-white hover:bg-[#16a34a] disabled:opacity-50"
                >
                  Create Goal
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Active Goals */}
        {goals && goals.length > 0 ? (
          <div className="space-y-4">
            {goals.map((goal: any) => {
              const progress = goal.current || 0;
              const target = goal.target || 100;
              const percentage = Math.min((progress / target) * 100, 100);

              return (
                <div key={goal.id} className="rounded-lg border border-linear-200 bg-white shadow-sm p-6">
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#22c55e]/10">
                        {goal.type === "hours" ? (
                          <Target className="h-6 w-6 text-[#22c55e]" />
                        ) : goal.type === "skills" ? (
                          <TrendingUp className="h-6 w-6 text-[#22c55e]" />
                        ) : (
                          <Award className="h-6 w-6 text-[#22c55e]" />
                        )}
                      </div>

                      <div>
                        <h3 className="text-[14px] font-semibold text-linear-900">{goal.title}</h3>
                        <p className="text-[12px] text-linear-600">{goal.description}</p>
                        <span className="mt-1 inline-block rounded-md bg-linear-100 px-2 py-0.5 text-[11px] text-linear-700">
                          {goal.period === "monthly" ? currentMonth : currentYear}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => deleteGoalMutation.mutate({ goalId: goal.id })}
                      className="h-8 w-8 rounded-md hover:bg-[#fbfbfc] flex items-center justify-center text-linear-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Progress Bar */}
                  {goal.type === "hours" && (
                    <>
                      <div className="mb-2 flex items-center justify-between text-[12px]">
                        <span className="font-medium text-linear-900">Progress</span>
                        <span className="text-linear-600">
                          {progress} / {target} hours
                        </span>
                      </div>
                      <div className="mb-2 h-2 overflow-hidden rounded-full bg-linear-100">
                        <div
                          className="h-full bg-[#22c55e] transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <p className="text-[11px] text-linear-500">
                        {percentage >= 100 ? "Goal achieved!" : `${Math.round(percentage)}% complete`}
                      </p>
                    </>
                  )}

                  {goal.type === "skills" && (
                    <div className="rounded-lg bg-blue-50 p-3">
                      <p className="text-[12px] text-blue-800">
                        Track your progress by volunteering in roles that develop this skill
                      </p>
                    </div>
                  )}

                  {goal.type === "causes" && (
                    <>
                      <div className="mb-2 flex items-center justify-between text-[12px]">
                        <span className="font-medium text-linear-900">Hours Contributed</span>
                        <span className="text-linear-600">{progress} hours</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-linear-100">
                        <div
                          className="h-full bg-[#22c55e] transition-all"
                          style={{ width: `${Math.min((progress / 20) * 100, 100)}%` }}
                        />
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-lg border border-linear-200 bg-white shadow-sm py-12 text-center">
            <Target className="mx-auto mb-4 h-12 w-12 text-linear-400" />
            <h3 className="mb-2 text-[14px] font-semibold text-linear-900">No Goals Yet</h3>
            <p className="mb-4 text-[12px] text-linear-600">
              Set your first goal to stay motivated and track your impact
            </p>
            <button
              onClick={() => setShowAddGoal(true)}
              className="inline-flex h-8 items-center justify-center gap-2 rounded-md bg-[#22c55e] px-4 text-[13px] font-medium text-white hover:bg-[#16a34a]"
            >
              <Plus className="h-4 w-4" />
              Create Your First Goal
            </button>
          </div>
        )}

        {/* Suggested Goals */}
        <div className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-6">
          <h3 className="mb-3 text-[13px] font-semibold text-blue-900">Suggested Goals</h3>
          <div className="space-y-2 text-[12px] text-blue-800">
            <p>• Volunteer 10 hours this month</p>
            <p>• Learn event planning skills</p>
            <p>• Support 3 different causes this year</p>
            <p>• Volunteer with 5 different organizations</p>
          </div>
        </div>
      </div>
    </div>
  );
}
