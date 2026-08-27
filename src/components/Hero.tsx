"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useIntroDone } from "@/components/Intro";
import { T } from "@/lib/i18n";
import { ui } from "@/lib/dict";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

function Line({
  children,
  delay,
  play,
  className = "",
}: {
  children: React.ReactNode;
  delay: number;
  play: boolean;
  className?: string;
}) {
  return (
    // Offsets/styles live on the wrapper so the reveal clip moves with the text.
    <span className={`block overflow-hidden whitespace-nowrap ${className}`}>
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        animate={play ? { y: 0 } : { y: "110%" }}
        transition={{ duration: 1.1, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero({ videoSrc }: { videoSrc?: string }) {
  // Wait for the first-visit intro curtain so the entrance isn't hidden behind it.
  const play = useIntroDone();
  // Poster-first loading: the still renders instantly, the full-res video
  // streams in behind it and cross-fades once it's actually playing.
  const [allowVideo, setAllowVideo] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);

  useEffect(() => {
    if (!videoSrc) return;
    const frame = requestAnimationFrame(() => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (!reduced) setAllowVideo(true);
    });
    return () => cancelAnimationFrame(frame);
  }, [videoSrc]);

  return (
    <section className="relative flex h-svh min-h-[640px] flex-col overflow-hidden bg-black text-white">
      {/* Photo base + video overlay, slow settle-in */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08 }}
        animate={play ? { scale: 1 } : { scale: 1.08 }}
        transition={{ duration: 2.6, ease: EASE }}
      >
        <div className="absolute inset-0">
          <Image
            src="/hero.jpg"
            alt="Bruno Fevereiro at his desk at night, coding beside a 3D printer and a shelf of books"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[65%_center] sm:object-center"
          />
          {videoSrc && allowVideo && (
            <video
              src={videoSrc}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden
              onPlaying={() => setVideoPlaying(true)}
              className={`absolute inset-0 h-full w-full object-cover object-[65%_center] transition-opacity duration-1000 sm:object-center ${
                videoPlaying ? "opacity-100" : "opacity-0"
              }`}
            />
          )}
        </div>
      </motion.div>

      <div aria-hidden className="hero-vignette absolute inset-0" />
      <div aria-hidden className="grain-live" />

      {/* Display type: flanking the figure, photo breathing in between */}
      <div className="relative z-10 flex w-full flex-1 flex-col justify-center px-12 sm:px-36 lg:px-60">
        {/* Cinematic title card: modest scale, wide tracking, air between the words */}
        <h1 className="flex w-full items-baseline justify-between font-serif text-[clamp(1.125rem,1.9vw,1.75rem)] leading-none font-medium tracking-[0.25em] uppercase">
          <Line delay={0.35} play={play}>
            <T text={ui.heroLine1} />
          </Line>
          <Line delay={0.5} play={play}>
            <T text={ui.heroLine3} />
          </Line>
        </h1>

      </div>

      {/* Bio + scroll cue, kept low where the frame is darkest.
          Desktop: bio left-aligns with "I BUILD"; mobile stays centered. */}
      <div className="relative z-10 flex flex-col gap-8 px-12 pb-8 sm:px-36 lg:px-60">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-end sm:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={play ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 1, delay: 1.1, ease: EASE }}
            className="max-w-md text-center text-sm leading-relaxed text-white/80 sm:text-left"
          >
            <T text={ui.heroBio} />
          </motion.p>
          {/* Credit block: bottom-right, sharing the bio's baseline.
              Social links reveal on hover, collapsed via max-height so they
              don't reserve space when hidden. */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={play ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 1, delay: 1.3, ease: EASE }}
            className="group order-first shrink-0 text-center text-[0.7rem] leading-relaxed tracking-[0.35em] text-white/70 uppercase sm:order-none sm:text-right"
          >
            {/* Points at the figure in the footage: "that's me" */}
            <span aria-hidden className="mb-1 inline-block text-base text-white/70">
              ↖
            </span>
            <br />
            <T text={ui.heroName} />
            <br />
            <span className="text-accent">
              <T text={ui.heroRole} />
            </span>
            <div className="mt-2 flex justify-center gap-4 opacity-40 transition-opacity duration-500 ease-out group-hover:opacity-100 sm:justify-end">
              <a
                href="https://github.com/BRUNO-FEVE"
                target="_blank"
                rel="noopener noreferrer"
                className="link-slide text-white/60 hover:text-white"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/bruno-fevereiro"
                target="_blank"
                rel="noopener noreferrer"
                className="link-slide text-white/60 hover:text-white"
              >
                LinkedIn
              </a>
              <a
                href="mailto:br.fevereiro@icloud.com"
                className="link-slide text-white/60 hover:text-white"
              >
                Email
              </a>
              <a
                href="https://wa.me/5511957705558"
                target="_blank"
                rel="noopener noreferrer"
                className="link-slide text-white/60 hover:text-white"
              >
                WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
        <motion.span
          initial={{ opacity: 0 }}
          animate={play ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="self-center text-center"
        >
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block text-[0.65rem] tracking-[0.35em] text-white/50 uppercase"
          >
            <T text={ui.scroll} />
          </motion.span>
        </motion.span>
      </div>
    </section>
  );
}
