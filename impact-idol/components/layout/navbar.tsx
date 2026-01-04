"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, Menu, X, Bell, ChevronDown } from "lucide-react";
import { PersonaSwitcher } from "./persona-switcher";
import { NotificationCenter } from "@/components/notifications/notification-center";
import { useAuth } from "@/lib/stores/auth-store";
import { trpc } from "@/lib/utils/trpc";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentPersona } = useAuth();

  const isOrg = currentPersona.type === "org-admin";
  const isVolunteer = currentPersona.type === "volunteer" || currentPersona.type === "squad-leader";

  // Fetch current user data to get username
  const userId = isVolunteer ? currentPersona.userId : null;
  const { data: currentUser } = trpc.users.get.useQuery(
    { id: userId! },
    { enabled: !!userId }
  );

  const profileHref = currentUser?.username ? `/profile/${currentUser.username}` : "/profile";

  const volunteerLinks = [
    { href: "/feed", label: "Feed" },
    { href: "/discover", label: "Discover" },
    { href: "/dashboard", label: "My Dashboard" },
    { href: "/squads", label: "Squads" },
    { href: "/messages", label: "Messages" },
    { href: profileHref, label: "Profile" },
  ];

  const orgLinks = [
    { href: "/org/dashboard", label: "Org Dashboard" },
    { href: "/org/opportunities", label: "Opportunities" },
    { href: "/org/volunteers", label: "Volunteers" },
    { href: "/org/dashboard/verification", label: "Verification" },
    { href: "/messages", label: "Messages" },
  ];

  const links = isOrg ? orgLinks : volunteerLinks;

  return (
    <nav className="sticky top-0 z-50 border-b border-linear-100 bg-white">
      <div className="container mx-auto flex h-14 items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-6 h-6 bg-peer-green rounded-md flex items-center justify-center">
            <Heart className="h-4 w-4 fill-white text-white" />
          </div>
          <span className="font-semibold text-[13px] tracking-tight text-linear-900">Impact Idol</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden items-center gap-1 md:flex flex-1 justify-center">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 text-[13px] font-medium text-linear-600 hover:text-linear-900 hover:bg-linear-50 rounded-md transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <NotificationCenter />
          <div className="w-px h-4 bg-linear-200"></div>
          <PersonaSwitcher />

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-1.5 hover:bg-linear-100 rounded text-linear-600 hover:text-linear-900 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-linear-100 bg-[#fbfbfc] md:hidden">
          <div className="container mx-auto px-4 py-2">
            <div className="flex flex-col space-y-0.5">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-md px-3 py-1.5 text-[13px] font-medium text-linear-600 hover:bg-linear-100 hover:text-linear-900 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
