---
name: project-page
description: This skill should be used when the user asks to "add a project", "enrich a project page", "add detail to a project", "add a case study for X", "create a project detail page", or wants to expand what's shown on a `/projects/[slug]` page with real facts, resources, or an "About this project" back-link. Only applies to this portfolio repo's project pages, not generic Next.js pages.
---

# Portfolio project detail page

Build or enrich a project's dedicated page at `/projects/[slug]` (`src/app/projects/[slug]/page.tsx`), sourced from `src/data/projects.ts`. Every project gets a page automatically via `generateStaticParams` keyed by `projectSlug(project.title)` — there is no per-project routing to write, only data and (optionally) a diagram component to add.

## Ground rule: facts come from the user, not invention

Every number, date, tool name, or outcome on a project page must come from the user's own account (their CV, or what they say directly in conversation) — never invent or embellish metrics, team sizes, tool names, or results. If a detail is missing, ask rather than guess. This matters more than anywhere else on the site because these pages read as a professional record.

## The `Project` type (`src/data/projects.ts`)

Relevant fields beyond the base title/year/description:

- `details?: Localized[]` — an array of prose paragraphs shown instead of the one-line `description` on the detail page (the teaser list at `/projects` still uses `description`). Each entry is a full paragraph, rendered inside a `.prose` block, one `<p>` per array item.
- `highlight?: Localized` — a short accent-colored badge line shown above the role (e.g. "★ Selected for AWS Summit São Paulo 2026"). Use sparingly — this is for a genuinely distinguishing fact, not routine praise.
- `resources?: { title: string; author?: string; link?: string }[]` — books, articles, or tools that materially helped build the thing. Renders under a "Resources used" heading; `title` is shown in italic serif, `link` (if present) opens in a new tab with a ↗ marker.
- `company?: string` — ties the project to a row in `src/data/experience.ts` via `experienceSlug(company)`. This produces two effects automatically: a "Part of my time at `<company>` →" back-link on the project page, and a related-project card under that job's row on the home page. Don't set this unless the project actually belongs to that job.
- `articles?: string[]` — article slugs (matching filenames in `content/writing/`) linked to this project via `resolveArticleLinks()` in `src/lib/writing.ts`. This is the single source of truth for project↔article linking; the article page derives its own "About this project →" back-link from it via `projectForArticle()`. Unknown slugs are silently skipped, so a typo won't crash the build — it'll just silently not show, which is worth double-checking manually.

Every string field is `Localized` (`{ en: string; pt: string }`) and must have both languages filled in — write real Portuguese, not a placeholder. Content strings (like `details`, `highlight`, resource titles) live in the data file itself; only reusable UI chrome (labels like "Resources used", "Read the story") lives in `src/lib/dict.ts`'s `ui` object.

## Wiring a diagram (optional)

If the project needs a visual (architecture diagram, flow, etc.), see the `project-diagram` skill for how to build one, then register it in `src/app/projects/[slug]/page.tsx`:

```tsx
const diagrams: Record<string, React.ComponentType> = {
  "mainframe-modernization-agents": MainframeAgentsDiagram,
};
```

keyed by the same `projectSlug(project.title)` used for routing. It renders automatically right after the `.prose` details block, before any resources/article sections.

## Site conventions that apply here too

- No em dashes ("—") in any copy — the user has asked for these removed sitewide; write around them with a period, colon, or comma instead.
- Dark-only design tokens (`paper`/`surface`/`ink`/`muted`/`faint`/`accent` from `globals.css`) — never hardcode grays or use Tailwind's default palette.
- `react/no-unescaped-entities` is enforced by `pnpm lint` — escape apostrophes in JSX prose (`&apos;` or restructure the sentence).

## Verification workflow (always, no exceptions)

1. `npx tsc --noEmit -p tsconfig.json` — must be clean.
2. Kill the dev server, `rm -rf .next`, then `pnpm build`. Every route must come out `○ (Static)` or `● (SSG)` — never `ƒ (Dynamic)`. This project deploys as a fully static site; a dynamic route is a build regression, not a warning to ignore.
3. Restart the dev server (`pnpm dev --port 3001`, backgrounded) and spot-check the new/changed page in a real browser: both languages via the EN/PT toggle, desktop and a ~390px mobile viewport, no horizontal overflow.
4. Reveal animations on this site are IntersectionObserver-driven (`Reveal`/`RevealList`/`RevealItem` from `src/components/Reveal.tsx`) — a screenshot taken without scrolling will show hidden (opacity-0) content that isn't actually broken. Scroll gradually before judging a screenshot "blank."
5. Clean up any scratch screenshots or `.playwright-mcp/` directories created during verification before calling the task done.

If browser automation in the current environment fails to hydrate (no React event listeners attach anywhere on the page, not just on the new code), that's an environment/tooling issue, not a code regression — verify via the accessibility snapshot/DOM and a clean build instead, and say plainly that live interactive verification didn't work rather than fabricate a passing test.
