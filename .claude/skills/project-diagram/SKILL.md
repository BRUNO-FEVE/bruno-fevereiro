---
name: project-diagram
description: This skill should be used when the user asks to "add a diagram", "illustrate the flow/architecture", "animate the diagram", "add a visual showcase" for a project page, or wants a custom process/architecture visualization built for `/projects/[slug]`. Only applies to this portfolio repo's custom HTML/CSS diagram components, not charts or data visualizations.
---

# Custom project diagrams (plain HTML/CSS, not images)

Diagrams for project pages are hand-built React components in `src/components/diagrams/<Name>Diagram.tsx`, using plain divs/spans styled with the site's design tokens — never an `<img>` or exported PNG/SVG screenshot. The site applies a global aged-photo filter (`grayscale + sepia + contrast` on every `img, video`) meant for real photographs; running a technical diagram through it just muddies it. Plain HTML/CSS stays crisp and gets to use the real design tokens, real text (localizable, selectable), and CSS animation directly.

Register the finished component in `src/app/projects/[slug]/page.tsx`'s `diagrams` map, keyed by `projectSlug(project.title)` — see the `project-page` skill for that wiring.

## Building blocks (established pattern, reuse rather than reinvent)

A working example lives in `src/components/diagrams/MainframeAgentsDiagram.tsx`. Its reusable pieces:

- **`Box`** — a bordered, centered, uppercase mono block (`border-faint bg-surface text-ink`). The unit for every node in the diagram.
- **`Caption`** — small muted explanatory text under a box, takes a `Localized` prop.
- **`Arrow`** — a "↓" with an optional label above it; takes a `step` prop that places it in the traveling-pulse animation (see below).
- **`SteeringFiles`** (or similar chip-list component) — a compact bordered list, each item prefixed with a small custom SVG icon. Icons are hand-drawn with straight lines only (no curves) to match the site's squared-off icon language — see `FileIcon`/`McpIcon` for the pattern.

Keep new diagrams' vocabulary consistent with these primitives before inventing new visual elements.

## i18n is not optional

Every visible string — box labels, captions, chip text, arrow labels — must be a `Localized` object (`{ en, pt }` from `@/lib/dict`) rendered through `<T text={...} />` from `@/lib/i18n`, exactly like the rest of the site. This is easy to skip when moving fast on a visual component, and it's a real, previously-shipped bug: an entire diagram was built with raw English strings before someone noticed it didn't respond to the language toggle or get the scramble-decode animation. Define the copy as a local `const copy = {...} satisfies Record<string, Localized>` object at the top of the file (content lives near its usage, not in the global `ui` dict) and write real Portuguese for every entry, not a placeholder.

## Animation system

The traveling-pulse convention lives in `globals.css`, shared across diagrams:

- **`.diagram-flow-arrow` / `@keyframes diagram-flow`** — a single red pulse on a 12s `ease-in-out infinite` loop. Every element that should flash once per loop shares this exact animation and duration; an inline `animation-delay` (in seconds, via the `step` prop on `Arrow`) staggers each one so the shared loop reads as a chase tracing the real sequence of steps. This only supports **one flash per element per cycle**.
- **Multi-pulse elements** (something that participates more than once per loop, e.g. a box involved in two passes of a review loop) need their own dedicated keyframe with explicit percentage stops — the delay-offset trick doesn't stretch to this. Pattern:
  ```css
  @keyframes some-box-flow {
    0%, 21%, 29%, 54%, 62%, 100% { color: var(--muted); border-color: var(--faint); }
    25%, 58% { color: var(--accent); border-color: var(--accent); }
  }
  ```
  Narrow windows (a handful of percentage points either side of the peak) read as a brief flash rather than a slow fade.
- Always add a `prefers-reduced-motion: reduce` override disabling every custom animation class.

### Get the causal order right before writing keyframes

The single most common bug in this pattern is assigning the wrong beat to the wrong real-world event. Before writing any percentages, write out the actual sequence in plain language against a 0–100% timeline (e.g. "translator writes (25%) → submits to reviewer (33%) → reviewer checks (42%) → *if rejected*, sent back to translator (50%) → translator rewrites (58%) → resubmits (67%) → reviewer re-checks (75%)"). A recurring mistake was treating two pulses that both meant "submit for review" (happening once per pass) as if one meant "submit" and the other meant "sent back" — they didn't correspond to any real distinct event, which reads as broken/confusing once shipped, not just imprecise.

Don't add a "for symmetry" animation with no real event behind it. If there's no genuine second thing happening, leave the second element static or drop it — a fabricated beat is worse than no beat.

## Responsive direction

Any glyph that conveys direction (arrows) must flip between breakpoints if the layout it describes flips:

- Mobile (elements stacked vertically): use `↓`/`↑`.
- Desktop (`sm:` and up, elements side by side): use `→`/`←`.
- Implement with paired `sm:hidden` / `hidden sm:inline` spans, not CSS `transform: rotate()` (rotating an arrow glyph doesn't reliably mirror it, and some glyphs aren't symmetric under rotation).

When a pair of opposite-direction arrows both need to be visible (not just one flipping to the other), lay them out **perpendicular to the direction they point**: two horizontal arrows (→/←) stack in a vertical column; two vertical arrows (↓/↑) sit side by side in a row. Placing them parallel to their own direction (→ ← in a row, or ↓ ↑ in a column) makes the tips meet head-on and reads as a collision, not a back-and-forth — this was shipped wrong twice in the same diagram (once per orientation) before landing on the perpendicular-layout rule. Concretely: `flex-row sm:flex-col` (or the reverse) depending on which breakpoint has which box arrangement, not one fixed flex direction for both.

## Explanatory prose vs. diagram type

Paragraphs that explain a diagram's *why* (not the diagram's own labels/captions) should render in the site's normal `.prose` styling — same font, size, and left-aligned flow as the rest of the article — not the diagram's small uppercase mono type. The small mono type is for the diagram's own internal labels and chips; a full paragraph in that style reads as too small and technical for something meant to be read normally.

## Verification workflow (same as every other change on this site)

1. `npx tsc --noEmit -p tsconfig.json` — must be clean.
2. Kill the dev server, `rm -rf .next`, `pnpm build` — every route must stay `○`/`●`, never `ƒ`.
3. Restart the dev server and check the page in a real browser: both languages, desktop and ~390px mobile, animation actually firing in the right order.
4. Scroll gradually before screenshotting — `Reveal`-wrapped content is IntersectionObserver-driven and screenshots hidden (opacity-0) if the page hasn't been scrolled into view first.

If browser automation fails to hydrate in the current environment (no React listeners attach anywhere on the page), treat that as an environment issue and verify via DOM/accessibility snapshot plus a clean build instead of guessing at what the animation looks like — say so plainly rather than fabricate a passing interactive test.
