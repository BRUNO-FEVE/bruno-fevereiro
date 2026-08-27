# brunofevereiro — personal site

Portfolio + writing. Next.js App Router, MDX articles as plain files, deployed on Vercel.

## Run it

```sh
pnpm install
pnpm dev
```

## Write an article

Add a file to `content/writing/my-article.mdx`:

```mdx
---
title: "My article title"
date: "2026-07-10"
summary: "One or two sentences shown in lists and under the title."
---

Regular markdown here. Code blocks get syntax highlighting automatically.
```

The filename becomes the URL: `content/writing/my-article.mdx` → `/writing/my-article`.
Commit and push — Vercel deploys it.

## Add a project

Edit `src/data/projects.ts`. Set `featured: true` to show it on the home page (first three shown).

## Where things live

- `src/app/page.tsx` — home page (hero headline + bio live here)
- `src/components/Header.tsx` / `Footer.tsx` — nav and contact links
- `src/app/globals.css` — colors (light/dark), typography, article prose styles
- `src/components/Reveal.tsx` — scroll/load animations (Motion)

## Design

- Serif: Newsreader (headlines, italic accents) · Sans: Geist (body) · Mono: Geist Mono (code)
- Strict palette: white + black with a red accent; dark mode follows the system automatically.
- Cinematic full-viewport hero (`src/components/Hero.tsx`) — photo lives at `public/hero.png`.
- Every image is automatically treated as an aged photo: warm monochrome filter on all `img`
  elements (globals.css), plus grain + vignette via the `.photo-frame` wrapper (article images
  get it automatically through the MDX `img` override).
