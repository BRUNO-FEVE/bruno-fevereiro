"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { getHasNavigated } from "@/lib/nav-history";

/** A "back" link that returns to wherever the visitor actually came from
    (via browser history) instead of always dead-ending on `href`. Falls
    back to a normal navigation to `href` when the page was opened directly
    (no in-app navigation happened yet, per NavigationTracker), and
    middle-click/cmd-click for a new tab still uses `href` as usual since
    `router.back()` doesn't apply. */
export function BackLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <Link
      href={href}
      className={className}
      onClick={(e) => {
        if (
          getHasNavigated() &&
          e.button === 0 &&
          !e.metaKey &&
          !e.ctrlKey &&
          !e.shiftKey &&
          !e.altKey
        ) {
          e.preventDefault();
          router.back();
        }
      }}
    >
      {children}
    </Link>
  );
}
