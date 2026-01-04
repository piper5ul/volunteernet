"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bell,
  CheckCircle2,
  Calendar,
  Users,
  MessageCircle,
  Award,
  Clock,
} from "lucide-react";
import { formatDistanceToNow } from "@/lib/utils/date-utils";

interface Notification {
  id: string;
  type: "verification" | "event" | "message" | "badge" | "reminder";
  title: string;
  body: string;
  created_at: Date;
  is_read: boolean;
}

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "verification",
      title: "Hours Verified",
      body: "Your 3 volunteer hours at Beach Cleanup Drive have been verified!",
      created_at: new Date(Date.now() - 2 * 60 * 60 * 1000),
      is_read: false,
    },
    {
      id: "2",
      type: "event",
      title: "Upcoming Event Tomorrow",
      body: "Tree Planting at Golden Gate Park starts tomorrow at 9:00 AM",
      created_at: new Date(Date.now() - 5 * 60 * 60 * 1000),
      is_read: false,
    },
    {
      id: "3",
      type: "message",
      title: "New Message",
      body: "Green Future SF sent you a message",
      created_at: new Date(Date.now() - 24 * 60 * 60 * 1000),
      is_read: true,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "verification":
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case "event":
        return <Calendar className="h-5 w-5 text-blue-600" />;
      case "message":
        return <MessageCircle className="h-5 w-5 text-purple-600" />;
      case "badge":
        return <Award className="h-5 w-5 text-yellow-600" />;
      case "reminder":
        return <Clock className="h-5 w-5 text-orange-600" />;
    }
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, is_read: true }))
    );
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -right-1 -top-1 h-5 min-w-[20px] rounded-full bg-red-600 px-1 text-xs">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-96 p-0">
        <div className="flex items-center justify-between border-b p-4">
          <div>
            <h3 className="font-semibold">Notifications</h3>
            {unreadCount > 0 && (
              <p className="text-sm text-muted-foreground">
                {unreadCount} unread
              </p>
            )}
          </div>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="text-xs"
            >
              Mark all as read
            </Button>
          )}
        </div>

        <ScrollArea className="h-[400px]">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Bell className="mb-2 h-12 w-12 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">No notifications</p>
            </div>
          ) : (
            <div className="divide-y">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`cursor-pointer p-4 transition-colors hover:bg-gray-50 ${
                    !notification.is_read ? "bg-blue-50" : ""
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex gap-3">
                    <div className="flex-shrink-0">{getIcon(notification.type)}</div>
                    <div className="flex-1 overflow-hidden">
                      <div className="flex items-start justify-between gap-2">
                        <p
                          className={`text-sm font-medium ${
                            !notification.is_read ? "font-semibold" : ""
                          }`}
                        >
                          {notification.title}
                        </p>
                        {!notification.is_read && (
                          <div className="h-2 w-2 flex-shrink-0 rounded-full bg-blue-600" />
                        )}
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                        {notification.body}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {formatDistanceToNow(notification.created_at)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        <div className="border-t p-2">
          <Button variant="ghost" className="w-full" size="sm">
            View All Notifications
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
