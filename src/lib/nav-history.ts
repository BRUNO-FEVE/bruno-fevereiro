// Tracks whether the visitor has navigated client-side within this page
// load, so BackLink can tell "arrived via an internal link" (safe to go
// back to) apart from "opened this URL directly" (no useful history).
// window.history.length isn't reliable for this: a brand-new tab already
// starts with 2 entries (about:blank + the loaded page), and
// document.referrer doesn't update across client-side route changes.
let hasNavigated = false;

export function markNavigated() {
  hasNavigated = true;
}

export function getHasNavigated() {
  return hasNavigated;
}
