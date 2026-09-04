---
name: release
description: This skill should be used when the user asks to "commit and push", "ship this", "release this", "bump the version", "cut a release", "open a PR to main", or "create a GitHub release" for this portfolio repo. Covers the full commit → version bump → push → PR → release pipeline used on this project. Not for generic git usage outside this flow.
---

# Portfolio release flow

This repo has no feature branches: all work happens on local `dev`, mirrored to `origin/dev`, and every PR goes `dev → main` (confirm with `gh pr list` if unsure — every past PR has `dev` as its head branch). Merging into `main` triggers the production deploy (S3 + CloudFront invalidation), so treat the merge step as outward-facing.

## The pipeline

1. **Verify first.** Before touching git, run this project's standard verification: `npx tsc --noEmit -p tsconfig.json`, then kill the dev server, `rm -rf .next && pnpm build` (every route must stay `○`/`●`, never `ƒ`), then restart the dev server. Don't commit unverified changes.

2. **Bump the version in the same commit as the change**, not as a separate "chore: bump version" commit. Edit the `"version"` field in `package.json` directly (no CHANGELOG file exists in this repo). Default to a **patch** bump (`x.y.Z` → `x.y.(Z+1)`) unless the change is clearly a minor/major-worthy addition, in which case ask before deciding. Check `cat package.json | grep '"version"'` for the current value; don't assume it matches the last release tag (a prior session may have bumped it without tagging yet).

3. **Commit** everything together (`git add -A && git commit -m "..."`). Write the message the way the rest of this repo's history does: a short imperative summary line, optionally a bullet list of what changed, no version number in the subject line itself.

4. **Push** to `origin dev` (`git push origin dev`). No separate feature branch.

5. **Open the PR**: `gh pr create --base main --head dev --title "<Summary> (vX.Y.Z)" --body "..."` — the `(vX.Y.Z)` suffix in the title matches this repo's existing PR titles (check `gh pr list --state all` for examples). Include a short summary and how it was verified in the body.

6. **Do not merge the PR automatically.** Merging into `main` deploys to production — confirm with the user first, every time, even if a previous session merged without asking. If the user hasn't said what they want, ask (e.g. via a question with options like "merge now", "just create the release without merging", "I'll merge myself").

7. **Create the GitHub release** once you know whether the PR is merged:
   - If merged (or the user has said not to wait): tag the appropriate commit and push it — `git tag -a X.Y.Z -m "X.Y.Z" <ref>` (use the tag name with no `v` prefix, matching the existing `1.0.0` tag), `git push origin X.Y.Z`, then `gh release create X.Y.Z --title "X.Y.Z" --notes "..."`.
   - If tagging `dev` while the PR is still open (because the user chose not to wait for the merge), say so explicitly in the release notes (e.g. "this tag is on `dev`, PR #N into `main` is still open") so it's not misread as reflecting what's live on `main`.

## Things to get right

- `package.json`'s version and the latest git tag can disagree (e.g. package.json already bumped in an unreleased commit) — always check both with `git tag -l` and `gh release list`, don't assume.
- A GitHub Release is a distinct action from a version bump or a PR. Bumping `package.json` and merging a PR never creates or updates a release on their own — only `gh release create` does. Don't imply a release happened unless you actually ran that step.
- If asked "did you release/tag this yet", check `gh release list` and `git tag -l` rather than inferring from the commit/PR state.
