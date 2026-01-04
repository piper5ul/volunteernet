"use client";

import { useState } from "react";
import { trpc } from "@/lib/utils/trpc";
import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";
import { useAuth } from "@/lib/stores/auth-store";
import { toast } from "sonner";
import { format } from "date-fns";

export default function DiscoverPage() {
  const { currentPersona } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCauses, setSelectedCauses] = useState<string[]>([]);
  const [showVirtualOnly, setShowVirtualOnly] = useState(false);
  const [filter, setFilter] = useState<"everything" | "people" | "organizations" | "opportunities">("everything");
  const [selectedOpportunityId, setSelectedOpportunityId] = useState<string | null>(null);

  const { data, isLoading } = trpc.opportunities.list.useQuery({
    causes: selectedCauses.length > 0 ? selectedCauses : undefined,
    isVirtual: showVirtualOnly ? true : undefined,
    search: searchQuery || undefined,
    limit: 50,
  });

  const causes = [
    { id: "cause-environment", name: "Environment", color: "green" },
    { id: "cause-education", name: "Education", color: "blue" },
    { id: "cause-health", name: "Health", color: "red" },
    { id: "cause-animals", name: "Animal Welfare", color: "orange" },
    { id: "cause-community", name: "Community", color: "purple" },
    { id: "cause-hunger", name: "Hunger Relief", color: "orange" },
  ];

  const registerMutation = trpc.opportunities.register.useMutation({
    onSuccess: () => {
      toast.success("Registration Successful! Check your email for details.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleRegister = (opportunityId: string) => {
    if (currentPersona.type === "guest") {
      toast.error("Please log in to register for opportunities.");
      return;
    }

    const userId =
      currentPersona.type === "volunteer" || currentPersona.type === "squad-leader"
        ? currentPersona.userId
        : null;

    if (!userId) {
      toast.error("Invalid user type. Switch to a volunteer persona.");
      return;
    }

    registerMutation.mutate({ opportunityId, userId });
  };

  const handleCauseToggle = (causeId: string) => {
    setSelectedCauses((prev) =>
      prev.includes(causeId) ? prev.filter((id) => id !== causeId) : [...prev, causeId]
    );
  };

  const selectedOpportunity = data?.opportunities.find(o => o.id === selectedOpportunityId);

  return (
    <div className="flex h-screen bg-white">
      {/* Left Sidebar (Filters) */}
      <aside className="w-56 border-r border-linear-100 bg-[#fbfbfc] flex flex-col pt-4 shrink-0">
        <div className="px-3 mb-2 text-[11px] font-medium text-linear-500 uppercase tracking-wider">Type</div>
        <nav className="space-y-0.5 px-2 mb-6">
          {['everything', 'people', 'organizations', 'opportunities'].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item as any)}
              className={`flex w-full items-center gap-2 px-2 py-1.5 rounded-md text-[13px] font-medium transition-colors capitalize ${
                filter === item ? 'bg-linear-100/50 text-linear-900' : 'text-linear-600 hover:bg-linear-50'
              }`}
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="px-3 mb-2 text-[11px] font-medium text-linear-500 uppercase tracking-wider">Filters</div>
        <div className="px-3 space-y-3">
          <div className="text-[12px] text-linear-600 pb-2">
            <span className="block mb-1.5 font-medium text-linear-900">Causes</span>
            <div className="space-y-1">
              {causes.map(cause => (
                <label key={cause.id} className="flex items-center gap-2 cursor-pointer hover:text-linear-900">
                  <input
                    type="checkbox"
                    checked={selectedCauses.includes(cause.id)}
                    onChange={() => handleCauseToggle(cause.id)}
                    className="w-3 h-3 rounded border-linear-300"
                  />
                  <span className="text-[12px]">{cause.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="text-[12px] text-linear-600 border-t border-linear-100 pt-3">
            <label className="flex items-center gap-2 cursor-pointer hover:text-linear-900">
              <input
                type="checkbox"
                checked={showVirtualOnly}
                onChange={() => setShowVirtualOnly(!showVirtualOnly)}
                className="w-3 h-3 rounded border-linear-300"
              />
              <span className="text-[12px]">Virtual Only</span>
            </label>
          </div>

          {(selectedCauses.length > 0 || showVirtualOnly) && (
            <button
              onClick={() => {
                setSelectedCauses([]);
                setShowVirtualOnly(false);
              }}
              className="text-[11px] text-linear-500 hover:text-linear-900 w-full text-left"
            >
              Clear All Filters
            </button>
          )}
        </div>
      </aside>

      {/* Search Results List */}
      <div className="flex-1 overflow-y-auto min-w-0 bg-white border-r border-linear-100">
        {/* Token Bar / Search */}
        <div className="h-10 border-b border-linear-100 flex items-center px-4 gap-2">
          <span className="text-[11px] text-linear-400 uppercase tracking-wide mr-1">Query:</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search opportunities..."
            className="flex-1 text-[11px] text-linear-700 bg-transparent focus:outline-none placeholder-linear-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-linear-400 hover:text-linear-600 text-[11px]"
            >
              ×
            </button>
          )}
        </div>

        {/* Results Count */}
        {!isLoading && data && (
          <div className="px-4 py-2 text-[11px] text-linear-500 border-b border-linear-50">
            {data.total} {data.total === 1 ? "result" : "results"}
          </div>
        )}

        {/* Results */}
        <div className="divide-y divide-linear-50">
          {isLoading ? (
            <div className="p-4 space-y-3">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-20" />
              ))}
            </div>
          ) : !data || data.opportunities.length === 0 ? (
            <div className="py-12 text-center">
              <Search className="mx-auto mb-2 h-8 w-8 text-linear-400" />
              <p className="text-[13px] text-linear-500 mb-1">No opportunities found</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCauses([]);
                  setShowVirtualOnly(false);
                }}
                className="text-[12px] text-linear-900 font-medium hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            data.opportunities.map((opportunity) => (
              <div
                key={opportunity.id}
                onClick={() => setSelectedOpportunityId(opportunity.id)}
                className={`p-4 cursor-pointer hover:bg-linear-50 transition-colors ${
                  selectedOpportunityId === opportunity.id ? 'bg-linear-50/80 shadow-[inset_2px_0_0_#545f73]' : ''
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <div className="flex items-center gap-2">
                    <div className="p-1 rounded bg-linear-100 text-linear-500">
                      <Search className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[13px] font-medium text-linear-900">{opportunity.title}</span>
                  </div>
                  <span className="text-[11px] text-linear-400">Opp</span>
                </div>
                <p className="text-[12px] text-linear-500 line-clamp-1 pl-8">
                  {opportunity.description?.slice(0, 100) || "No description"}
                </p>
                <div className="pl-8 mt-2 flex items-center gap-3 text-[11px] text-linear-400">
                  <span className="flex items-center gap-1 text-linear-600">
                    {opportunity.organization?.name || "Unknown Org"}
                  </span>
                  <span>•</span>
                  <span>{opportunity.starts_at ? format(new Date(opportunity.starts_at), 'MMM d') : "TBD"}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Right Preview Panel */}
      <aside className="w-80 bg-[#fbfbfc] flex flex-col overflow-y-auto shrink-0">
        {!selectedOpportunity ? (
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="text-center">
              <Search className="mx-auto mb-3 h-10 w-10 text-linear-300" />
              <p className="text-[13px] text-linear-500">Select an opportunity to view details</p>
            </div>
          </div>
        ) : (
          <>
            <div className="h-12 border-b border-linear-100 flex items-center px-4 justify-between shrink-0">
              <div className="text-[10px] font-mono text-linear-400 uppercase">
                OPP-{selectedOpportunity.id.slice(0, 6)}
              </div>
              <div className="flex gap-2">
                <button className="text-linear-400 hover:text-linear-700 text-[13px]">↓</button>
                <button className="text-linear-400 hover:text-linear-700 text-[13px]">↑</button>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-md bg-blue-100 flex items-center justify-center text-blue-600 font-bold shrink-0 text-[14px]">
                  {selectedOpportunity.organization?.name?.[0] || "?"}
                </div>
                <div>
                  <h2 className="text-[14px] font-semibold text-linear-900 leading-snug">
                    {selectedOpportunity.title}
                  </h2>
                  <a href="#" className="text-[12px] text-linear-500 hover:text-linear-800 hover:underline mt-0.5 block">
                    {selectedOpportunity.organization?.name || "Unknown Organization"}
                  </a>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-linear-500">Status</span>
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-linear-100 text-[11px] font-medium text-linear-700 border border-linear-200">
                    <div className="w-1.5 h-1.5 rounded-full bg-peer-green"></div>{" "}
                    {selectedOpportunity.status || "Open"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-linear-500">Date</span>
                  <span className="text-[12px] text-linear-900">
                    {selectedOpportunity.starts_at
                      ? format(new Date(selectedOpportunity.starts_at), "MMM d, yyyy")
                      : "TBD"}
                  </span>
                </div>
                {selectedOpportunity.location && (
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] text-linear-500">Location</span>
                    <span className="text-[12px] text-linear-900">
                      {selectedOpportunity.location.name || "See details"}
                    </span>
                  </div>
                )}
              </div>

              <div className="h-px bg-linear-100 mb-6"></div>

              <h3 className="text-[12px] font-medium text-linear-900 mb-2">Description</h3>
              <p className="text-[13px] text-linear-600 leading-relaxed mb-6">
                {selectedOpportunity.description || "No description available"}
              </p>

              <button
                onClick={() => handleRegister(selectedOpportunity.id)}
                disabled={registerMutation.isPending}
                className="w-full py-2 bg-linear-900 text-white text-[13px] font-medium rounded-md hover:bg-black shadow-subtle mb-3 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {registerMutation.isPending ? "Registering..." : "Register Now"}
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
