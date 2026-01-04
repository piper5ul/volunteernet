"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./navbar";

export function ConditionalNavbar() {
  const pathname = usePathname();

  // Don't show navbar on pages that have their own navigation
  const hideNavbar =
    pathname?.startsWith("/org/dashboard") ||
    pathname?.startsWith("/org/settings") ||
    pathname?.startsWith("/org/team") ||
    pathname?.startsWith("/org/opportunities") ||
    pathname?.startsWith("/org/volunteers");

  if (hideNavbar) {
    return null;
  }

  return <Navbar />;
}
