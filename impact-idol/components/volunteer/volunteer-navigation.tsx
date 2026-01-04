"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/stores/auth-store";
import {
  Home,
  Compass,
  Calendar,
  MessageSquare,
  User,
  Bell,
  ChevronDown,
  Settings,
  Award,
  Heart,
  LogOut,
} from "lucide-react";

export function VolunteerNavigation() {
  const pathname = usePathname();
  const { currentPersona } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Mock user data - replace with actual data
  const userName = "Alex Thompson";
  const userAvatar = undefined;
  const notificationCount = 3;

  const navItems = [
    { href: "/dashboard", label: "Home", icon: Home },
    { href: "/discover", label: "Discover", icon: Compass },
    { href: "/opportunities", label: "My Opportunities", icon: Calendar },
    { href: "/messages", label: "Messages", icon: MessageSquare },
    { href: "/profile", label: "Profile", icon: User },
  ];

  const profileMenuItems = [
    { href: "/profile/edit", label: "Edit Profile", icon: Settings },
    { href: "/profile/impact", label: "My Impact", icon: Award },
    { href: "/profile/saved", label: "Saved Opportunities", icon: Heart },
  ];

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === href || pathname === "/";
    }
    return pathname?.startsWith(href);
  };

  return (
    <header className="h-14 border-b border-linear-200 bg-white px-6 sticky top-0 z-50">
      <div className="flex h-full items-center justify-between">
        {/* Left: Logo & Navigation */}
        <div className="flex items-center gap-6">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-peer-green flex items-center justify-center">
              <span className="text-white text-[14px] font-bold">II</span>
            </div>
            <span className="text-[14px] font-semibold text-linear-900">Impact Idol</span>
          </Link>

          {/* Navigation Items */}
          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-2 text-[13px] font-medium rounded-md transition-colors ${
                    active
                      ? "bg-linear-100 text-linear-900"
                      : "text-linear-600 hover:text-linear-900 hover:bg-linear-50"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right: Notifications & Profile */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <button className="relative p-2 text-linear-600 hover:text-linear-900 hover:bg-linear-50 rounded-md transition-colors">
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 px-3 py-1.5 hover:bg-linear-50 rounded-md transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-linear-100 flex items-center justify-center text-[12px] font-bold text-linear-700 overflow-hidden">
                {userAvatar ? (
                  <img src={userAvatar} alt="" className="w-full h-full object-cover" />
                ) : (
                  userName.substring(0, 2).toUpperCase()
                )}
              </div>
              <span className="text-[13px] font-medium text-linear-900">{userName}</span>
              <ChevronDown className="h-3.5 w-3.5 text-linear-600" />
            </button>

            {/* Dropdown Menu */}
            {showProfileMenu && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowProfileMenu(false)}
                />
                <div className="absolute right-0 top-12 w-52 rounded-lg border border-linear-200 bg-white shadow-lg z-50">
                  <div className="p-1">
                    {profileMenuItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setShowProfileMenu(false)}
                          className="flex items-center gap-2 px-3 py-2 text-[13px] text-linear-900 hover:bg-linear-50 rounded transition-colors"
                        >
                          <Icon className="h-4 w-4" />
                          {item.label}
                        </Link>
                      );
                    })}
                    <div className="border-t border-linear-100 my-1"></div>
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        // Handle logout
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-[13px] text-red-600 hover:bg-red-50 rounded transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      Log Out
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
