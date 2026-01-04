"use client";

import { useState } from "react";
import { trpc } from "@/lib/utils/trpc";
import { useAuth } from "@/lib/stores/auth-store";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Users,
  Search,
  MessageCircle,
  UserPlus,
  Grid3x3,
  List,
  MapPin,
  CheckCircle2,
  X,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function ConnectionsPage() {
  const { currentPersona } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeTab, setActiveTab] = useState<"connections" | "requests" | "suggestions">("connections");

  const userId =
    currentPersona.type === "volunteer" || currentPersona.type === "squad-leader"
      ? currentPersona.userId
      : null;

  const { data: connectionsData, isLoading } = trpc.connections.getConnections.useQuery(
    { userId: userId! },
    { enabled: !!userId }
  );

  const { data: connectionRequests } = trpc.connections.getConnectionRequests.useQuery(
    { userId: userId! },
    { enabled: !!userId }
  );

  if (!userId || currentPersona.type === "guest") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fbfbfc]">
        <div className="text-center">
          <h1 className="mb-2 text-[18px] font-semibold text-linear-900">Sign In Required</h1>
          <p className="mb-4 text-[13px] text-linear-600">
            Sign in to view and manage your connections
          </p>
          <Link href="/login" className="bg-linear-900 hover:bg-black text-white text-[13px] font-medium px-4 py-2 rounded-md shadow-subtle inline-block">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  const connections = connectionsData?.connections || [];
  const filteredConnections = connections.filter(
    (conn) =>
      !searchQuery ||
      conn!.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conn!.headline?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pendingRequestsCount = connectionRequests?.length || 0;

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <header className="h-14 border-b border-linear-100 flex items-center px-6 gap-4 shrink-0">
        <h1 className="font-medium text-[14px] text-linear-900">My Network</h1>
        <div className="h-4 w-px bg-linear-200"></div>
        <span className="text-[13px] text-linear-500">
          {connections.length} {connections.length === 1 ? 'connection' : 'connections'}
        </span>

        <div className="ml-auto flex items-center gap-3">
          <Link href="/discover/people" className="bg-linear-900 text-white text-[12px] font-medium px-3 py-1.5 rounded hover:bg-black transition-colors shadow-subtle flex items-center gap-1.5">
            <UserPlus className="w-3.5 h-3.5" />
            Find People
          </Link>
        </div>
      </header>

      {/* Tabs */}
      <div className="border-b border-linear-100 bg-white px-6">
        <div className="flex gap-6">
          <button
            onClick={() => setActiveTab("connections")}
            className={`py-3 text-[13px] font-medium border-b-2 transition-colors ${
              activeTab === "connections"
                ? 'border-linear-900 text-linear-900'
                : 'border-transparent text-linear-500 hover:text-linear-900'
            }`}
          >
            Connections
            <span className="ml-2 px-1.5 py-0.5 rounded-full bg-linear-100 text-[10px] font-medium text-linear-700">
              {connections.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab("requests")}
            className={`py-3 text-[13px] font-medium border-b-2 transition-colors ${
              activeTab === "requests"
                ? 'border-linear-900 text-linear-900'
                : 'border-transparent text-linear-500 hover:text-linear-900'
            }`}
          >
            Requests
            {pendingRequestsCount > 0 && (
              <span className="ml-2 px-1.5 py-0.5 rounded-full bg-red-100 text-[10px] font-medium text-red-700">
                {pendingRequestsCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("suggestions")}
            className={`py-3 text-[13px] font-medium border-b-2 transition-colors ${
              activeTab === "suggestions"
                ? 'border-linear-900 text-linear-900'
                : 'border-transparent text-linear-500 hover:text-linear-900'
            }`}
          >
            Suggestions
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto bg-[#fbfbfc]">
        <div className="max-w-7xl mx-auto py-6 px-6">
          {activeTab === "connections" && (
            <ConnectionsTab
              connections={filteredConnections}
              isLoading={isLoading}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              viewMode={viewMode}
              setViewMode={setViewMode}
            />
          )}

          {activeTab === "requests" && <ConnectionRequestsTab />}

          {activeTab === "suggestions" && <ConnectionSuggestionsTab userId={userId} />}
        </div>
      </div>
    </div>
  );
}

interface ConnectionsTabProps {
  connections: any[];
  isLoading: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
}

function ConnectionsTab({
  connections,
  isLoading,
  searchQuery,
  setSearchQuery,
  viewMode,
  setViewMode,
}: ConnectionsTabProps) {
  return (
    <>
      {/* Search and View Controls */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-linear-400" />
          <input
            type="text"
            placeholder="Search connections..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-3 py-2 text-[13px] border border-linear-200 rounded-md focus:outline-none focus:ring-2 focus:ring-linear-900 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded border transition-colors ${
              viewMode === "grid"
                ? 'bg-linear-900 text-white border-linear-900'
                : 'bg-white text-linear-600 border-linear-200 hover:bg-linear-50'
            }`}
            title="Grid view"
          >
            <Grid3x3 className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded border transition-colors ${
              viewMode === "list"
                ? 'bg-linear-900 text-white border-linear-900'
                : 'bg-white text-linear-600 border-linear-200 hover:bg-linear-50'
            }`}
            title="List view"
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Connections List/Grid */}
      {isLoading ? (
        <div className={viewMode === "grid" ? "grid gap-3 sm:grid-cols-2 lg:grid-cols-3" : "space-y-3"}>
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-lg border border-linear-200 bg-white shadow-sm p-4">
              <div className="flex items-start gap-3">
                <Skeleton className="h-12 w-12 rounded-full shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : connections.length === 0 ? (
        <div className="rounded-lg border border-linear-200 bg-white shadow-sm py-12 text-center">
          <Users className="mx-auto mb-4 h-12 w-12 text-linear-400" />
          <h3 className="mb-2 text-[14px] font-semibold text-linear-900">
            {searchQuery ? "No connections found" : "No connections yet"}
          </h3>
          <p className="mb-4 text-[13px] text-linear-600">
            {searchQuery
              ? "Try a different search term"
              : "Start connecting with other volunteers"}
          </p>
          {!searchQuery && (
            <Link href="/discover/people" className="bg-linear-900 hover:bg-black text-white text-[13px] font-medium px-4 py-2 rounded-md shadow-subtle inline-block">
              Find People to Connect
            </Link>
          )}
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {connections.map((connection) => (
            <ConnectionCard key={connection!.id} connection={connection!} />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {connections.map((connection) => (
            <ConnectionListItem key={connection!.id} connection={connection!} />
          ))}
        </div>
      )}
    </>
  );
}

interface ConnectionCardProps {
  connection: {
    id: string;
    name: string;
    username: string;
    avatar_url?: string;
    headline?: string;
    location?: string;
    mutualConnections: number;
  };
}

function ConnectionCard({ connection }: ConnectionCardProps) {
  return (
    <div className="rounded-lg border border-linear-200 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <div className="p-4">
        <Link href={`/profile/${connection.username}`} className="block mb-3">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-full bg-linear-100 flex items-center justify-center text-[14px] font-bold text-linear-700 shrink-0 overflow-hidden">
              {connection.avatar_url ? (
                <img src={connection.avatar_url} alt="" className="w-full h-full object-cover" />
              ) : (
                connection.name.substring(0, 2).toUpperCase()
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-[14px] font-semibold text-linear-900 hover:text-peer-green transition-colors truncate">
                {connection.name}
              </h3>
              {connection.headline && (
                <p className="mt-0.5 text-[12px] text-linear-600 line-clamp-2">
                  {connection.headline}
                </p>
              )}
            </div>
          </div>
        </Link>

        {connection.location && (
          <div className="mb-2 flex items-center gap-1.5 text-[11px] text-linear-500">
            <MapPin className="h-3 w-3" />
            {connection.location}
          </div>
        )}

        {connection.mutualConnections > 0 && (
          <div className="mb-3 flex items-center gap-1.5 text-[11px] text-linear-500">
            <Users className="h-3 w-3" />
            {connection.mutualConnections} mutual connection{connection.mutualConnections !== 1 ? "s" : ""}
          </div>
        )}

        <div className="flex gap-2 pt-2 border-t border-linear-100">
          <Link
            href={`/messages?to=${connection.id}`}
            className="flex-1 text-center px-3 py-1.5 text-[12px] font-medium text-linear-900 bg-white border border-linear-200 rounded hover:bg-linear-50 transition-colors flex items-center justify-center gap-1.5"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            Message
          </Link>
          <Link
            href={`/profile/${connection.username}`}
            className="flex-1 text-center px-3 py-1.5 text-[12px] font-medium text-linear-900 bg-white border border-linear-200 rounded hover:bg-linear-50 transition-colors"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}

function ConnectionListItem({ connection }: ConnectionCardProps) {
  return (
    <div className="rounded-lg border border-linear-200 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex items-center gap-4">
          <Link href={`/profile/${connection.username}`}>
            <div className="w-14 h-14 rounded-full bg-linear-100 flex items-center justify-center text-[14px] font-bold text-linear-700 overflow-hidden shrink-0">
              {connection.avatar_url ? (
                <img src={connection.avatar_url} alt="" className="w-full h-full object-cover" />
              ) : (
                connection.name.substring(0, 2).toUpperCase()
              )}
            </div>
          </Link>

          <div className="min-w-0 flex-1">
            <Link href={`/profile/${connection.username}`}>
              <h3 className="text-[14px] font-semibold text-linear-900 hover:text-peer-green transition-colors">
                {connection.name}
              </h3>
            </Link>
            {connection.headline && (
              <p className="mt-0.5 text-[12px] text-linear-600 truncate">{connection.headline}</p>
            )}
            <div className="mt-1 flex flex-wrap gap-3 text-[11px] text-linear-500">
              {connection.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {connection.location}
                </span>
              )}
              {connection.mutualConnections > 0 && (
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {connection.mutualConnections} mutual
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <Link
              href={`/messages?to=${connection.id}`}
              className="px-3 py-1.5 text-[12px] font-medium text-linear-900 bg-white border border-linear-200 rounded hover:bg-linear-50 transition-colors flex items-center gap-1.5"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              Message
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function ConnectionRequestsTab() {
  const { currentPersona } = useAuth();
  const userId = currentPersona.type === "volunteer" || currentPersona.type === "squad-leader" ? currentPersona.userId : null;

  const { data: requests, isLoading, refetch } = trpc.connections.getConnectionRequests.useQuery(
    { userId: userId! },
    { enabled: !!userId }
  );

  const acceptMutation = trpc.connections.acceptConnectionRequest.useMutation({
    onSuccess: () => {
      toast.success("Connection request accepted!");
      refetch();
    },
  });

  const rejectMutation = trpc.connections.rejectConnectionRequest.useMutation({
    onSuccess: () => {
      toast.success("Connection request declined");
      refetch();
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="rounded-lg border border-linear-200 bg-white shadow-sm p-4">
            <div className="flex items-start gap-3">
              <Skeleton className="h-14 w-14 rounded-full shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-8 w-32" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!requests || requests.length === 0) {
    return (
      <div className="rounded-lg border border-linear-200 bg-white shadow-sm py-12 text-center">
        <UserPlus className="mx-auto mb-4 h-12 w-12 text-linear-400" />
        <h3 className="mb-2 text-[14px] font-semibold text-linear-900">No pending requests</h3>
        <p className="text-[13px] text-linear-600">
          You don't have any connection requests at the moment
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {requests.map((request) => (
        <div key={request!.id} className="rounded-lg border border-linear-200 bg-white shadow-sm hover:shadow-md transition-shadow">
          <div className="p-4">
            <div className="flex items-start gap-4">
              <Link href={`/profile/${request!.requester.username}`}>
                <div className="w-14 h-14 rounded-full bg-linear-100 flex items-center justify-center text-[14px] font-bold text-linear-700 overflow-hidden shrink-0">
                  {request!.requester.avatar_url ? (
                    <img src={request!.requester.avatar_url} alt="" className="w-full h-full object-cover" />
                  ) : (
                    request!.requester.name.substring(0, 2).toUpperCase()
                  )}
                </div>
              </Link>

              <div className="min-w-0 flex-1">
                <Link href={`/profile/${request!.requester.username}`}>
                  <h3 className="text-[14px] font-semibold text-linear-900 hover:text-peer-green transition-colors">
                    {request!.requester.name}
                  </h3>
                </Link>
                {request!.requester.headline && (
                  <p className="mt-0.5 text-[12px] text-linear-600">
                    {request!.requester.headline}
                  </p>
                )}
                {request!.mutualConnections > 0 && (
                  <p className="mt-1 text-[11px] text-linear-500 flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {request!.mutualConnections} mutual connection
                    {request!.mutualConnections !== 1 ? "s" : ""}
                  </p>
                )}
                {request!.message && (
                  <p className="mt-2 rounded-md bg-linear-50 border border-linear-100 p-3 text-[12px] italic text-linear-700">
                    "{request!.message}"
                  </p>
                )}

                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() =>
                      acceptMutation.mutate({
                        userId: userId!,
                        requesterId: request!.requester.id,
                      })
                    }
                    disabled={acceptMutation.isPending}
                    className="px-3 py-1.5 text-[12px] font-medium text-white bg-peer-green hover:bg-green-600 rounded shadow-subtle transition-colors disabled:opacity-50 flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Accept
                  </button>
                  <button
                    onClick={() =>
                      rejectMutation.mutate({
                        userId: userId!,
                        requesterId: request!.requester.id,
                      })
                    }
                    disabled={rejectMutation.isPending}
                    className="px-3 py-1.5 text-[12px] font-medium text-linear-900 bg-white border border-linear-200 rounded hover:bg-linear-50 transition-colors disabled:opacity-50 flex items-center gap-1.5"
                  >
                    <X className="h-3.5 w-3.5" />
                    Decline
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ConnectionSuggestionsTab({ userId }: { userId: string }) {
  const { data: suggestions, isLoading } = trpc.connections.getSuggestions.useQuery(
    { userId, limit: 20 },
    { enabled: !!userId }
  );

  const sendRequestMutation = trpc.connections.sendConnectionRequest.useMutation({
    onSuccess: () => {
      toast.success("Connection request sent!");
    },
  });

  if (isLoading) {
    return (
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="rounded-lg border border-linear-200 bg-white shadow-sm p-4">
            <Skeleton className="h-20 w-20 rounded-full mx-auto mb-3" />
            <Skeleton className="h-4 w-2/3 mx-auto mb-2" />
            <Skeleton className="h-3 w-1/2 mx-auto mb-4" />
            <Skeleton className="h-8 w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (!suggestions || suggestions.length === 0) {
    return (
      <div className="rounded-lg border border-linear-200 bg-white shadow-sm py-12 text-center">
        <Users className="mx-auto mb-4 h-12 w-12 text-linear-400" />
        <h3 className="mb-2 text-[14px] font-semibold text-linear-900">No suggestions right now</h3>
        <p className="mb-4 text-[13px] text-linear-600">
          Check back later for personalized connection suggestions
        </p>
        <Link href="/discover/people" className="bg-linear-900 hover:bg-black text-white text-[13px] font-medium px-4 py-2 rounded-md shadow-subtle inline-block">
          Search for People
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {suggestions.map((suggestion) => (
        <div key={suggestion.id} className="rounded-lg border border-linear-200 bg-white shadow-sm hover:shadow-md transition-shadow">
          <div className="p-4">
            <Link href={`/profile/${suggestion.username}`} className="block text-center">
              <div className="w-20 h-20 rounded-full bg-linear-100 flex items-center justify-center text-[16px] font-bold text-linear-700 overflow-hidden mx-auto mb-3">
                {suggestion.avatar_url ? (
                  <img src={suggestion.avatar_url} alt="" className="w-full h-full object-cover" />
                ) : (
                  suggestion.name.substring(0, 2).toUpperCase()
                )}
              </div>
              <h3 className="mb-1 text-[14px] font-semibold text-linear-900 hover:text-peer-green transition-colors">
                {suggestion.name}
              </h3>
              {suggestion.headline && (
                <p className="mb-3 line-clamp-2 text-[12px] text-linear-600">
                  {suggestion.headline}
                </p>
              )}
            </Link>

            {suggestion.mutualConnections > 0 && (
              <p className="mb-3 text-center text-[11px] text-linear-500">
                {suggestion.mutualConnections} mutual connection
                {suggestion.mutualConnections !== 1 ? "s" : ""}
              </p>
            )}

            <button
              onClick={() =>
                sendRequestMutation.mutate({
                  fromUserId: userId,
                  toUserId: suggestion.id,
                })
              }
              disabled={sendRequestMutation.isPending}
              className="w-full px-3 py-1.5 text-[12px] font-medium text-white bg-peer-green hover:bg-green-600 rounded shadow-subtle transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5"
            >
              <UserPlus className="h-3.5 w-3.5" />
              Connect
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
