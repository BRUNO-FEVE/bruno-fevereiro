"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { markNavigated } from "@/lib/nav-history";

/** Marks nav-history once the pathname changes after the initial mount, so
    BackLink can tell a real in-app navigation apart from a direct page load. */
export function NavigationTracker() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    markNavigated();
  }, [pathname]);

  return null;
}
