"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { T, LangToggle } from "@/lib/i18n";
import { ui } from "@/lib/dict";

const allLinks = [
  { href: "/writing", label: ui.navWriting },
  { href: "/projects", label: ui.navProjects },
];

export function Header({ hasArticles = true }: { hasArticles?: boolean }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const links = hasArticles
    ? allLinks
    : allLinks.filter((link) => link.href !== "/writing");

  if (isHome) {
    // Corner nav floating over the cinematic hero — always light.
    return (
      <header className="absolute inset-x-0 top-0 z-20 flex items-baseline justify-between px-6 pt-8 text-white sm:px-10">
        <Link
          href="/"
          className="font-serif text-lg italic tracking-tight transition-colors hover:text-accent"
        >
          BF
        </Link>
        <nav className="flex items-baseline gap-7 text-xs tracking-[0.2em] uppercase">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="link-slide text-white/80 transition-colors hover:text-white"
            >
              <T text={label} />
            </Link>
          ))}
          <LangToggle activeClass="text-white" inactiveClass="text-white/50" />
        </nav>
      </header>
    );
  }

  return (
    <header className="mx-auto flex w-full max-w-2xl items-baseline justify-between px-6 pt-10 pb-16 sm:pt-14">
      <Link
        href="/"
        className="font-serif text-lg italic tracking-tight text-ink transition-colors hover:text-accent"
      >
        BF
      </Link>
      <nav className="flex items-baseline gap-7 text-xs tracking-[0.2em] uppercase">
        {links.map(({ href, label }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`link-slide transition-colors ${
                active ? "text-ink" : "text-muted hover:text-ink"
              }`}
            >
              <T text={label} />
            </Link>
          );
        })}
        <LangToggle activeClass="text-ink" inactiveClass="text-muted" />
      </nav>
    </header>
  );
}
