@AGENTS.md

# Bruno Fevereiro — personal portfolio

Personal site: cinematic photo hero, projects, work history, writing (MDX), hobbies.
Next.js 16 (App Router, Turbopack), Tailwind 4, Motion (framer-motion), pnpm. Deploys to Vercel; every route must stay fully static (SSG).

## Commands

```sh
pnpm dev --port 3001   # dev server — Bruno's browser tabs point at :3001
pnpm build             # production build; all routes must come out ○ Static / ● SSG
pnpm lint              # eslint (react/no-unescaped-entities is enforced — escape apostrophes in JSX)
```

Do NOT run `pnpm build` while the dev server is running — they share `.next/` and the dev server ends up serving broken pages. Kill dev, build, restart dev (`rm -rf .next` if it acts weird).

## Design system — the rules that make it look like one site

The whole site lives in the hero's world. When adding anything, reuse these primitives instead of inventing new styles:

- **Always dark.** No light mode. Colors come only from the tokens in `src/app/globals.css`: `paper` (near-black bg), `surface`, `ink` (off-white), `muted`, `faint` (borders), `accent` (red). Never hardcode grays or use Tailwind palette colors.
- **Red is scarce.** The accent appears in small doses: the italic hero line, section-label dashes (`<span className="text-accent">—</span>`), hover states, links in prose. Don't paint large areas red.
- **Type:** Newsreader (serif) for display/headings — uppercase for big display type, italic for accents and personality; Geist for body; Geist Mono for code. Section labels are `text-sm tracking-widest uppercase text-muted` with the red dash.
- **Every image and video is an old photo.** A global `img, video` filter (grayscale + sepia) in globals.css handles the grade; wrap photos in `.photo-frame` for grain + vignette. Article images get this automatically via the MDX `img` override in `src/app/writing/[slug]/page.tsx`. Never opt an image out.
- **Film grain** covers the site via `body::after` (z-50, pointer-events-none). Overlays that should sit *under* the grain (e.g. the lightbox) use z-40.
- **Hero film grain** (hero only, over `hero-vignette`): a single `.grain-live` CSS layer in `globals.css` — dense fine grayscale noise, **`hard-light` blend at opacity 0.35**. This is the look Bruno explicitly chose ("go back to the version that made the video a little gray"): the grain slightly lifts/grays the footage, and that's intentional — don't "fix" it. Knobs: layer `opacity` for strength, `background-size` for grain size; static under `prefers-reduced-motion`. History (don't retry): overlay/screen/speck CSS variants, exposure flicker, dust, gate weave — all rejected; baking grain into the video file is impossible (temporal noise is incompressible — 3-min 1080p encodes came out 500-800MB); a WebGL grain-merge shader version was built and worked, but Bruno preferred this one.
- **Motion:** one easing everywhere — `[0.21, 0.47, 0.32, 0.98]`. Scroll reveals use `Reveal` / `RevealList` + `RevealItem` from `src/components/Reveal.tsx` (fade + rise, `once: true`). Keep durations 0.5–1.1s. Animations are garnish, not the meal.
- Layout: `main` is full-width; each page wraps its own content in `mx-auto w-full max-w-2xl px-6`. Only the hero breaks out full-bleed.

## Where things live

| What | Where |
|---|---|
| Hero (full-viewport photo + display type) | `src/components/Hero.tsx`, photo at `public/hero.jpg` |
| Live Photo bounce (optional) | drop palindromic loop at `public/hero-live.mp4` — hero picks it up automatically, falls back to the still |
| Projects | `src/data/projects.ts` (`featured: true` → home, first three; `company` → related-project card under that job) |
| Work history | `src/data/experience.ts` — rich rows: role timeline + related-project cards (auto-matched via `projects.ts` `company`) + optional per-job `photos` film-roll gallery |
| Education / Certifications / Awards (home-page list sections) | `src/data/education.ts`, `src/data/certifications.ts`, `src/data/awards.ts` — awards can carry a `photo` thumbnail (`.photo-frame`, aged automatically) |
| Hobbies (running PRs, rugby, books) | `src/data/hobbies.ts` |
| Articles | `content/writing/*.mdx` — filename becomes the URL slug |
| Article pipeline (gray-matter + MDXRemote + rehype-pretty-code) | `src/lib/writing.ts`, `src/app/writing/[slug]/page.tsx` |
| Photo filmstrips (draggable strip + caption lightbox) | `src/components/PhotoGallery.tsx` |
| First-visit intro curtain (once per session, `sessionStorage: intro-seen`) | `src/components/Intro.tsx` — the Hero gates its entrance on `useIntroDone()` |
| Nav (floats over hero on `/`, normal elsewhere) | `src/components/Header.tsx` |

## i18n (EN / pt-BR)

Client-side, not route-based: `LanguageProvider` + `useLang` in `src/lib/i18n.tsx`, persisted to `localStorage("lang")`, default EN (SSR renders EN; pt applies after hydration — acceptable for this site, don't "fix" it into route i18n without being asked). All visible copy is `Localized = { en, pt }`: UI strings live in `src/lib/dict.ts` (`ui.*`), content strings in the data files. Render every localized string through `<T text={...} />` — it applies the letter-scramble decode animation on language switch (`useScramble`; respects reduced motion). The EN/PT toggle is `LangToggle` in the Header. Article MDX content, alt texts, and dates are intentionally EN-only.

## Content conventions

- Article frontmatter: `title`, `date` (ISO `YYYY-MM-DD`), `summary`. Site language is English; write with personality, not résumé-speak.
- Facts about Bruno (roles, dates, metrics) come from his master CV — don't invent or embellish numbers. GitHub is `BRUNO-FEVE`; WorklogBar's repo is private, so no link on that project.
- New photos: drop in `public/`, add to the relevant data file, render through `PhotoGallery` (galleries) or a `.photo-frame` wrapper (single). The aged treatment is automatic.
- Gallery photos take `alt` (straight accessible description) and `caption` (shown in the lightbox — self-deprecating, dev-humor voice, e.g. "Turns out the defense also does pull requests.").

Each project has its own page at `/projects/[slug]` (slug via `projectSlug(title)` in `src/data/projects.ts`), styled after the article pages. `/projects` is a teaser list (title, year, truncated description, role) that links into it — same pattern as `/writing` → `/writing/[slug]`. Project cards link externally when the project has `link`, otherwise to `/projects/<projectSlug(title)>`. A project with a `company` shows a back-link on its page to that job's row in "Where I've worked" via `experienceSlug(company)` (anchor id + `scroll-mt-24` live on the `ExperienceRow` in `src/app/page.tsx`). A job's gallery renders only when its `photos` array is non-empty.

Project ↔ article links: a project's `articles: [<slug>]` in `projects.ts` is the single source of truth — it renders "Read the story" lines under the project (on its `/projects/[slug]` page and home featured rows, via the shared `resolveArticleLinks()` in `src/lib/writing.ts`) and the article page derives its "About this project →" back-link via `projectForArticle()`. Unknown slugs are skipped silently. Article links are siblings of the row's link wrapper, never nested inside it.

## Known placeholders (as of Jul 2026)

- 5K/10K PR times and the book list in `src/data/hobbies.ts` — waiting on Bruno's real data (Strava profile is login-walled; athlete id 207032134).
- Experience galleries: `photos: []` in `src/data/experience.ts` for Bradesco Seguros, Armond & Co, and Dev Community Mauá — waiting on Bruno's photos (marked `TODO(bruno)`).
- The two articles in `content/writing/` are marked placeholders for Bruno to replace.
- ~~hero-live.mp4~~ DONE (Jul 2026): full 3:13 desk video at `public/hero-live.mp4` (1080p30 H.264, crf 26, ~1Mbps, 24MB, faststart, no audio) — poster cross-fades to video in `Hero.tsx` once playing. Source: `IMG_8557.MOV` (HEVC; note `avconvert` crashes at ~87% on it — use the brew-installed `ffmpeg`, which handles it fine).

## Verifying changes

Screenshot-driven: build, run, and capture pages in a real browser before calling visual work done (there are helper scripts from past sessions in the Claude scratchpad; any Playwright setup works). Check both a desktop and a ~390px mobile viewport, confirm no horizontal overflow, and — because reveals are IntersectionObserver-driven — scroll gradually in scripts or elements will screenshot in their hidden state.
