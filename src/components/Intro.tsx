"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

// True once the intro curtain is gone (or was never shown). Components that
// animate on first paint (the Hero) wait for this so their entrance isn't
// hidden behind the curtain. Defaults to true so they work without the provider.
const IntroContext = createContext(true);
export const useIntroDone = () => useContext(IntroContext);

const HOLD_MS = 2200;
const FLASH_MS = 90;

// A quick strobe through the photography gallery while the curtain holds.
// Pulled straight from the photography hobby set (see src/data/hobbies.ts)
// rather than imported from there, since this is purely decorative and
// shouldn't couple the intro to that data shape.
const FLASH_PHOTOS = Array.from(
  { length: 19 },
  (_, i) => `/photo-${String(i + 1).padStart(2, "0")}.jpg`,
);

export function IntroProvider({ children }: { children: React.ReactNode }) {
  // "pending" = before hydration decides; SSR renders the curtain opaque so
  // first-time visitors never see content flash before the intro.
  const [state, setState] = useState<"pending" | "playing" | "done">("pending");
  const playing = state === "playing";
  const [frame, setFrame] = useState(0);

  // Position for the flashing photo: a light spring lag so it trails the
  // pointer (or a finger, on touch) instead of snapping to it.
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 300, damping: 30, mass: 0.5 });

  // Warm the flash photos into the browser cache as soon as this mounts,
  // independent of whether the intro ends up playing, so the strobe never
  // stalls waiting on a fetch mid-flash.
  useEffect(() => {
    FLASH_PHOTOS.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const frameId = requestAnimationFrame(() => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduced || sessionStorage.getItem("intro-seen")) {
        setState("done");
        return;
      }
      // `.jump` (not `.set`) so the photo starts centered instantly instead
      // of the spring animating in from its 0,0 default on first paint.
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      x.jump(cx);
      y.jump(cy);
      springX.jump(cx);
      springY.jump(cy);
      setState("playing");
      timer = setTimeout(() => {
        sessionStorage.setItem("intro-seen", "1");
        setState("done");
      }, HOLD_MS);
    });
    return () => {
      cancelAnimationFrame(frameId);
      if (timer) clearTimeout(timer);
    };
  }, [x, y, springX, springY]);

  useEffect(() => {
    if (!playing) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [playing]);

  // The strobe: cycle frames fast, and follow the pointer (mouse or touch)
  // so the small photo trails the cursor while it flashes through the set.
  useEffect(() => {
    if (!playing) return;
    const flashTimer = setInterval(() => {
      setFrame((f) => (f + 1) % FLASH_PHOTOS.length);
    }, FLASH_MS);
    const onMouseMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) {
        x.set(touch.clientX);
        y.set(touch.clientY);
      }
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    return () => {
      clearInterval(flashTimer);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [playing, x, y]);

  return (
    <IntroContext.Provider value={state === "done"}>
      {children}
      <AnimatePresence>
        {state !== "done" && (
          <motion.div
            aria-hidden
            // Repeat visitors hit pending → done: exit instantly (duration 0).
            exit={{
              y: "-100%",
              transition: { duration: playing ? 0.9 : 0, ease: EASE },
            }}
            className="fixed inset-0 z-70 flex flex-col items-center justify-center gap-6 bg-paper"
          >
            {playing && (
              <motion.div
                aria-hidden
                style={{ x: springX, y: springY }}
                className="pointer-events-none absolute top-0 left-0"
              >
                <div
                  className="aspect-3/4 w-32 -translate-x-1/2 -translate-y-1/2 sm:w-40"
                  style={{ perspective: 700 }}
                >
                  {/* Keying on `frame` remounts this on every flash, so the
                      settle replays each time: the card tilts in from a
                      slightly lifted corner (a 3D rotateX/rotateY, not a flat
                      2D spin) and lays flat, reading as a photo being set
                      down rather than a bounce. Damping is tuned just under
                      critical so it settles cleanly with no elastic
                      overshoot — quiet, not springy. */}
                  <motion.div
                    key={frame}
                    initial={{ rotateX: 10, rotateY: -8, scale: 0.97, opacity: 0.7 }}
                    animate={{ rotateX: 0, rotateY: 0, scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 380, damping: 30, mass: 0.5 }}
                    className="photo-frame h-full w-full"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={FLASH_PHOTOS[frame]}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </motion.div>
                </div>
              </motion.div>
            )}

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={playing ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: EASE }}
              className="font-serif text-3xl italic tracking-tight text-ink sm:text-4xl"
            >
              Bruno Fevereiro
            </motion.p>
            <motion.span
              initial={{ scaleX: 0 }}
              animate={playing ? { scaleX: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.4, ease: EASE }}
              className="h-px w-24 origin-left bg-accent"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </IntroContext.Provider>
  );
}
