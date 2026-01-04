"use client";

import { useState } from "react";
import { trpc } from "@/lib/utils/trpc";
import { useAuth } from "@/lib/stores/auth-store";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Bell,
  Users,
  MessageCircle,
  Award,
  Calendar,
  CheckCircle2,
  Trash2,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

export default function NotificationsPage() {
  const { currentPersona } = useAuth();
  const [activeTab, setActiveTab] = useState<"all" | "unread">("all");

  const userId =
    currentPersona.type === "volunteer" || currentPersona.type === "squad-leader"
      ? currentPersona.userId
      : null;

  const { data: notifications, isLoading, refetch } = trpc.notifications.getNotifications.useQuery(
    { userId: userId! },
    { enabled: !!userId }
  );

  const markAsReadMutation = trpc.notifications.markAsRead.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  const markAllAsReadMutation = trpc.notifications.markAllAsRead.useMutation({
    onSuccess: () => {
      toast.success("All notifications marked as read");
      refetch();
    },
  });

  const deleteNotificationMutation = trpc.notifications.deleteNotification.useMutation({
    onSuccess: () => {
      toast.success("Notification deleted");
      refetch();
    },
  });

  if (!userId || currentPersona.type === "guest") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fbfbfc]">
        <div className="text-center">
          <h1 className="mb-2 text-[18px] font-semibold text-linear-900">Sign In Required</h1>
          <p className="mb-4 text-[13px] text-linear-600">
            Sign in to view your notifications
          </p>
          <Link href="/login" className="bg-linear-900 hover:bg-black text-white text-[13px] font-medium px-4 py-2 rounded-md shadow-subtle inline-block">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  const unreadCount = notifications?.filter((n) => !n.is_read).length || 0;
  const allNotifications = notifications || [];
  const unreadNotifications = allNotifications.filter((n) => !n.is_read);

  const displayedNotifications = activeTab === "all" ? allNotifications : unreadNotifications;

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <header className="h-14 border-b border-linear-100 flex items-center px-6 gap-4 shrink-0">
        <h1 className="font-medium text-[14px] text-linear-900">Notifications</h1>
        <div className="h-4 w-px bg-linear-200"></div>
        <span className="text-[13px] text-linear-500">
          {unreadCount > 0 ? `${unreadCount} unread` : "All caught up"}
        </span>

        <div className="ml-auto flex items-center gap-3">
          {unreadCount > 0 && (
            <button
              onClick={() => markAllAsReadMutation.mutate({ userId: userId! })}
              disabled={markAllAsReadMutation.isPending}
              className="text-[12px] text-linear-900 hover:underline disabled:opacity-50"
            >
              Mark all as read
            </button>
          )}
          <Link href="/settings/notifications" className="p-1.5 hover:bg-linear-100 rounded text-linear-500 hover:text-linear-900 transition-colors">
            <Settings className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* Tabs */}
      <div className="border-b border-linear-100 bg-white px-6">
        <div className="flex gap-6">
          <button
            onClick={() => setActiveTab("all")}
            className={`py-3 text-[13px] font-medium border-b-2 transition-colors ${
              activeTab === "all"
                ? 'border-linear-900 text-linear-900'
                : 'border-transparent text-linear-500 hover:text-linear-900'
            }`}
          >
            All
            <span className="ml-2 px-1.5 py-0.5 rounded-full bg-linear-100 text-[10px] font-medium text-linear-700">
              {allNotifications.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab("unread")}
            className={`py-3 text-[13px] font-medium border-b-2 transition-colors ${
              activeTab === "unread"
                ? 'border-linear-900 text-linear-900'
                : 'border-transparent text-linear-500 hover:text-linear-900'
            }`}
          >
            Unread
            {unreadCount > 0 && (
              <span className="ml-2 px-1.5 py-0.5 rounded-full bg-red-100 text-[10px] font-medium text-red-700">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto bg-[#fbfbfc]">
        <div className="max-w-3xl mx-auto py-6 px-4">
          {isLoading ? (
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="rounded-lg border border-linear-200 bg-white shadow-sm p-4">
                  <div className="flex gap-3">
                    <Skeleton className="h-12 w-12 rounded-full shrink-0" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : displayedNotifications.length === 0 ? (
            <div className="rounded-lg border border-linear-200 bg-white shadow-sm py-12 text-center">
              <Bell className="mx-auto mb-4 h-12 w-12 text-linear-400" />
              <h3 className="mb-2 text-[14px] font-semibold text-linear-900">
                {activeTab === "unread" ? "No unread notifications" : "No notifications"}
              </h3>
              <p className="text-[13px] text-linear-500">
                {activeTab === "unread" ? "You're all caught up!" : "Check back later for updates"}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {displayedNotifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={(id) => markAsReadMutation.mutate({ notificationId: id })}
                  onDelete={(id) => deleteNotificationMutation.mutate({ notificationId: id })}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface NotificationItemProps {
  notification: any;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

function NotificationItem({ notification, onMarkAsRead, onDelete }: NotificationItemProps) {
  const getIcon = () => {
    switch (notification.type) {
      case "CONNECTION_REQUEST":
      case "CONNECTION_ACCEPTED":
        return <Users className="w-5 h-5 text-blue-600" />;
      case "MESSAGE":
        return <MessageCircle className="w-5 h-5 text-green-600" />;
      case "ENDORSEMENT":
      case "RECOMMENDATION":
        return <Award className="w-5 h-5 text-purple-600" />;
      case "EVENT_REMINDER":
      case "REGISTRATION_CONFIRMED":
        return <Calendar className="w-5 h-5 text-orange-600" />;
      case "VERIFICATION_APPROVED":
      case "VERIFICATION_DISPUTED":
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      default:
        return <Bell className="w-5 h-5 text-linear-600" />;
    }
  };

  return (
    <div
      className={`rounded-lg border bg-white shadow-sm transition-all hover:shadow-md ${
        !notification.is_read
          ? "border-l-4 border-l-peer-green border-linear-200"
          : "border-linear-200"
      }`}
    >
      <div className="p-4">
        <div className="flex gap-3">
          <div className="shrink-0">
            {notification.avatar_url ? (
              <div className="w-12 h-12 rounded-full bg-linear-100 flex items-center justify-center overflow-hidden">
                <img src={notification.avatar_url} alt="" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-full bg-linear-100 flex items-center justify-center">
                {getIcon()}
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <p className="text-[13px] font-semibold text-linear-900">
                  {notification.title}
                </p>
                <p className="mt-1 text-[12px] text-linear-600">
                  {notification.message}
                </p>
                <p className="mt-2 text-[11px] text-linear-400">
                  {notification.created_at ? formatDistanceToNow(new Date(notification.created_at), { addSuffix: true }) : "Just now"}
                </p>
              </div>

              <div className="flex gap-1">
                {!notification.is_read && (
                  <button
                    onClick={() => onMarkAsRead(notification.id)}
                    className="p-1.5 hover:bg-linear-100 rounded text-linear-500 hover:text-peer-green transition-colors"
                    title="Mark as read"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => onDelete(notification.id)}
                  className="p-1.5 hover:bg-linear-100 rounded text-linear-500 hover:text-red-600 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {notification.action_url && (
              <Link
                href={notification.action_url}
                className="mt-2 inline-block text-[12px] text-linear-900 font-medium hover:underline"
              >
                View →
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
