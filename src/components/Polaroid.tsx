"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useState } from "react";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

// Same sizing algorithm (block, width-driven, height auto) in both the
// thumbnail and the lightbox — the card wrapper's width is what changes
// between the two, not the image's own CSS. Keeping the image's box model
// identical is what lets the shared `layoutId` FLIP transform interpolate
// cleanly instead of jumping/distorting between two different layouts.
function PolaroidPhoto({
  src,
  alt,
  width,
  height,
  priority,
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
}) {
  return width && height ? (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes="(max-width: 640px) 90vw, 42rem"
      className="block h-auto w-full"
      priority={priority}
    />
  ) : (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className="block h-auto w-full" />
  );
}

// A single standout photo (not a filmstrip) framed like a physical Polaroid:
// off-white card, thick bottom edge, a slight tilt that straightens on
// hover. Clicking it grows the same card — same `layoutId` on both the
// thumbnail and the portalled lightbox — into a centered, full-size
// Polaroid, so the photo visibly lifts off the page rather than just
// cross-fading into a plain image viewer.
// `width`/`height` are optional — pass them for a known local image (lets
// next/image size it, and lets the lightbox size the card to the photo's
// real aspect ratio so it doesn't overflow the viewport); omit for
// arbitrary content images (e.g. MDX article photos) and it falls back to
// a plain <img> at its natural size.
export function Polaroid({
  src,
  alt,
  width,
  height,
  rotate = -2,
  priority,
  className,
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  rotate?: number;
  priority?: boolean;
  className?: string;
}) {
  const id = useId();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  // The card's width in the lightbox: bounded by viewport width, and by
  // viewport height converted through the photo's own aspect ratio so a
  // tall (portrait) shot doesn't blow past the screen. Unknown aspect
  // (no width/height given) falls back to a plain width cap.
  const aspect = width && height ? width / height : undefined;
  const bigWidth = aspect ? `min(85vw, calc(62vh * ${aspect}))` : "min(85vw, 32rem)";

  return (
    <>
      <motion.button
        type="button"
        layoutId={`polaroid-${id}`}
        onClick={() => setOpen(true)}
        aria-label={`View photo: ${alt}`}
        initial={false}
        animate={{ rotate: open ? 0 : rotate }}
        whileHover={open ? undefined : { rotate: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className={`block w-full cursor-zoom-in bg-ink p-3 pb-8 text-left shadow-[0_24px_48px_-16px_rgba(0,0,0,0.65)] ${
          open ? "invisible" : ""
        } ${className ?? ""}`}
      >
        <span className="photo-frame relative block w-full overflow-hidden bg-surface">
          <PolaroidPhoto src={src} alt={alt} width={width} height={height} priority={priority} />
        </span>
      </motion.button>

      {typeof window !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setOpen(false)}
                className="fixed inset-0 z-40 flex cursor-zoom-out items-center justify-center bg-black/90 p-6"
              >
                <motion.div
                  layoutId={`polaroid-${id}`}
                  transition={{ duration: 0.5, ease: EASE }}
                  onClick={(e) => e.stopPropagation()}
                  style={{ width: bigWidth }}
                  className="cursor-default bg-ink p-4 pb-14 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.75)]"
                >
                  <span className="photo-frame relative block w-full overflow-hidden bg-surface">
                    <PolaroidPhoto src={src} alt={alt} width={width} height={height} />
                  </span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
