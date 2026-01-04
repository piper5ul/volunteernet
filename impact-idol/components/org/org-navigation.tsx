"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/stores/auth-store";
import {
  LayoutDashboard,
  Calendar,
  Users,
  CheckCircle,
  MessageSquare,
  Bell,
  ChevronDown,
  Settings,
  UsersRound,
  CreditCard,
  LogOut,
  Building2,
} from "lucide-react";

export function OrgNavigation() {
  const pathname = usePathname();
  const { currentPersona } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Mock org data - replace with actual data
  const orgName = "Green Future SF";
  const notificationCount = 2;

  const navItems = [
    { href: "/org/dashboard", label: "Org Dashboard", icon: LayoutDashboard },
    { href: "/org/opportunities", label: "Opportunities", icon: Calendar },
    { href: "/org/volunteers", label: "Volunteers", icon: Users },
    { href: "/verification", label: "Verification", icon: CheckCircle },
    { href: "/messages", label: "Messages", icon: MessageSquare },
  ];

  const profileMenuItems = [
    { href: "/org/settings", label: "Organization Settings", icon: Settings },
    { href: "/org/team", label: "Team Members", icon: UsersRound },
    { href: "/org/billing", label: "Billing & Plan", icon: CreditCard },
  ];

  const isActive = (href: string) => {
    if (href === "/org/dashboard") {
      return pathname === href || pathname === "/org";
    }
    return pathname?.startsWith(href);
  };

  return (
    <header className="h-14 border-b border-linear-200 bg-white px-6 sticky top-0 z-50">
      <div className="flex h-full items-center justify-between">
        {/* Left: Logo & Navigation */}
        <div className="flex items-center gap-6">
          {/* Logo */}
          <Link href="/org/dashboard" className="flex items-center gap-2">
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
              className="flex items-center gap-2 px-3 py-1.5 text-[13px] font-medium text-linear-900 bg-amber-50 border border-amber-200 rounded-md hover:bg-amber-100 transition-colors"
            >
              <Building2 className="h-4 w-4" />
              {orgName} (Org)
              <span className="text-[10px] font-bold text-amber-700 bg-amber-200 px-1.5 py-0.5 rounded">
                DEMO
              </span>
              <ChevronDown className="h-3.5 w-3.5" />
            </button>

            {/* Dropdown Menu */}
            {showProfileMenu && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowProfileMenu(false)}
                />
                <div className="absolute right-0 top-12 w-56 rounded-lg border border-linear-200 bg-white shadow-lg z-50">
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
