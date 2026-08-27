"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useMotionValue,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { T } from "@/lib/i18n";
import { ui, type Localized } from "@/lib/dict";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

// Film geometry. CELL = frame width + trailing gap; the sprocket-hole pattern
// (21px, set in .film-perf) divides CELL exactly, so the seamless wrap jump
// (a multiple of CELL) never visibly shifts the perforations.
const FRAME_W = 160;
const GAP = 8;
const CELL = FRAME_W + GAP; // 168 = 8 × 21
const SPEED = 22; // px/s auto-advance

export type GalleryPhoto = { src: string; alt: string; caption?: Localized };

export function PhotoGallery({ photos }: { photos: GalleryPhoto[] }) {
  const [active, setActive] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const [copies, setCopies] = useState(2);
  const viewportRef = useRef<HTMLDivElement>(null);
  // spinningRef: the drag gesture or its inertia glide currently owns x.
  // clickGuardRef: suppress the click that follows a drag release.
  const spinningRef = useRef(false);
  const clickGuardRef = useRef(false);
  const settleTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const hoverRef = useRef(false);
  const activeRef = useRef<number | null>(null);
  const reducedRef = useRef(false);
  const x = useMotionValue(0);

  const loop = photos.length * CELL;

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    reducedRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  // Enough copies to cover the widest viewport plus one full loop.
  useEffect(() => {
    const measure = () => {
      const viewport = viewportRef.current;
      if (!viewport) return;
      setCopies(Math.ceil(viewport.clientWidth / loop) + 2);
    };
    const frame = requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", measure);
    };
  }, [loop]);

  // The projector: advance the film each frame, wrap into (-loop, 0].
  useAnimationFrame((_, delta) => {
    if (spinningRef.current) return; // the reel is in the user's hand or free-spinning
    let next = x.get();
    const autoAdvance =
      !hoverRef.current && activeRef.current === null && !reducedRef.current;
    if (autoAdvance) next -= (SPEED * delta) / 1000;
    next = ((next % loop) - loop) % loop;
    x.set(next);
  });

  useEffect(() => {
    setZoomed(false);
  }, [active]);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((i) => ((i ?? 0) + 1) % photos.length);
      if (e.key === "ArrowLeft")
        setActive((i) => ((i ?? 0) - 1 + photos.length) % photos.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, photos.length]);

  return (
    <>
      <div
        ref={viewportRef}
        onPointerEnter={() => (hoverRef.current = true)}
        onPointerLeave={() => (hoverRef.current = false)}
        className="relative overflow-hidden"
      >
        <motion.div
          drag="x"
          style={{ x }}
          // Reel physics: a flick free-spins the film, friction (inertia
          // animation) slows it down, and it ratchets onto a frame boundary.
          dragTransition={{
            power: 0.9,
            timeConstant: 480,
            modifyTarget: (target) => Math.round(target / CELL) * CELL,
          }}
          onDragStart={() => {
            spinningRef.current = true;
            clickGuardRef.current = true;
            clearTimeout(settleTimer.current);
          }}
          onDragEnd={() => {
            setTimeout(() => (clickGuardRef.current = false), 60);
            // Safety net if the inertia animation is interrupted and
            // onDragTransitionEnd never fires.
            settleTimer.current = setTimeout(
              () => (spinningRef.current = false),
              2500,
            );
          }}
          onDragTransitionEnd={() => {
            clearTimeout(settleTimer.current);
            spinningRef.current = false;
          }}
          className="w-max cursor-grab bg-[#161310] active:cursor-grabbing"
        >
          {/* sprocket holes ride along with the film */}
          <div aria-hidden className="film-perf" />

          <div className="flex pt-1.5 pb-1">
            {Array.from({ length: copies }).map((_, copy) =>
              photos.map((photo, i) => (
                <div
                  key={`${copy}-${photo.src}`}
                  aria-hidden={copy > 0 || undefined}
                  className="shrink-0 pr-2"
                  style={{ width: CELL }}
                >
                  <button
                    type="button"
                    tabIndex={copy > 0 ? -1 : 0}
                    onClick={() => {
                      if (!clickGuardRef.current) setActive(i);
                    }}
                    aria-label={`View photo: ${photo.alt}`}
                    className="photo-frame group relative block aspect-3/4 w-full overflow-hidden bg-surface"
                  >
                    <Image
                      src={photo.src}
                      alt={copy === 0 ? photo.alt : ""}
                      fill
                      draggable={false}
                      sizes="160px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </button>
                  {/* edge print: frame number + film stock */}
                  <div
                    aria-hidden
                    className="flex items-baseline justify-between pt-1 font-mono text-[0.55rem] tracking-[0.2em] uppercase select-none"
                  >
                    <span className="text-accent/80">
                      {String(i + 1).padStart(2, "0")}A
                    </span>
                    <span className="text-muted/70">BF·400</span>
                  </div>
                </div>
              )),
            )}
          </div>

          <div aria-hidden className="film-perf" />
        </motion.div>

        {/* edge fades */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-paper to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-paper to-transparent"
        />
      </div>
      <p className="mt-3 pr-6 text-right text-[0.6rem] tracking-[0.3em] text-muted uppercase">
        <T text={ui.galleryHint} />
      </p>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-40 flex cursor-zoom-out flex-col items-center justify-center gap-4 bg-black/95 p-6"
          >
            <motion.div
              key={photos[active].src}
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, ease: EASE }}
              onClick={(e) => {
                e.stopPropagation();
                setZoomed((z) => !z);
              }}
              className={`relative w-full transition-all duration-300 ease-out ${
                zoomed
                  ? "h-[95vh] max-w-[95vw] cursor-zoom-out"
                  : "h-[78vh] max-w-4xl cursor-zoom-in"
              }`}
            >
              <Image
                src={photos[active].src}
                alt={photos[active].alt}
                fill
                sizes="95vw"
                className="object-contain"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center gap-2 text-center"
            >
              <p className="max-w-xl font-serif text-lg text-white/85 italic">
                {photos[active].caption ? (
                  <T text={photos[active].caption} />
                ) : (
                  photos[active].alt
                )}
              </p>
              <p className="text-[0.65rem] tracking-[0.25em] text-white/35 uppercase">
                {photos.length > 1 && (
                  <span>
                    {active + 1} / {photos.length} · ←→ ·{" "}
                  </span>
                )}
                <T text={ui.escToClose} />
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
