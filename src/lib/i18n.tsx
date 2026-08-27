"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type { Lang, Localized } from "@/lib/dict";

const SCRAMBLE_CHARS =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZáéíóúãõçâê";

const LangContext = createContext<{
  lang: Lang;
  setLang: (lang: Lang) => void;
}>({ lang: "en", setLang: () => {} });

export const useLang = () => useContext(LangContext);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (localStorage.getItem("lang") === "pt") setLangState("pt");
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  }, [lang]);

  const setLang = (next: Lang) => {
    setLangState(next);
    localStorage.setItem("lang", next);
  };

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

/**
 * Decoder effect: when the target text changes (language switch), every letter
 * cycles through random characters and locks in left-to-right.
 */
export function useScramble(target: string): {
  text: string;
  /** 0–100+ position of the fade band while animating, null when settled. */
  sweep: number | null;
} {
  const [state, setState] = useState<{ text: string; sweep: number | null }>({
    text: target,
    sweep: null,
  });
  const prevRef = useRef(target);

  useEffect(() => {
    const from = prevRef.current;
    if (from === target) return;
    prevRef.current = target;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      const t = setTimeout(() => setState({ text: target, sweep: null }), 0);
      return () => clearTimeout(t);
    }

    // A scramble wave sweeps left → right: ahead of it the old text is still
    // readable, inside it letters flicker, behind it the new text locks in.
    const maxLen = Math.max(from.length, target.length);
    const waveWidth = Math.max(4, Math.round(maxLen * 0.25));
    const duration = Math.min(1800, Math.max(900, 550 + maxLen * 30));
    const start = performance.now();
    let lastFlicker = 0;
    let lastText = from;
    let raf = 0;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      if (progress >= 1) {
        setState({ text: target, sweep: null });
        return;
      }
      const eased = 1 - (1 - progress) ** 2; // easeOutQuad
      const front = eased * (maxLen + waveWidth); // leading edge of the wave
      const locked = Math.floor(front) - waveWidth; // trailing edge: resolved
      if (now - lastFlicker >= 40) {
        lastFlicker = now;
        let out = "";
        for (let i = 0; i < maxLen; i++) {
          if (i < locked) {
            if (i < target.length) out += target[i]; // resolved (may shrink)
          } else if (i < front) {
            out +=
              i < target.length && target[i] === " "
                ? " "
                : SCRAMBLE_CHARS[(Math.random() * SCRAMBLE_CHARS.length) | 0];
          } else if (i < from.length) {
            out += from[i]; // untouched old text ahead of the wave
          }
        }
        lastText = out;
      }
      // The fade band tracks the wave front; overshoots so it fully exits.
      setState({ text: lastText, sweep: eased * 140 - 20 });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, [target]);

  return state;
}

/** Renders localized text with the scramble + fade-sweep animation on language change. */
export function T({ text }: { text: Localized }) {
  const { lang } = useLang();
  const { text: display, sweep } = useScramble(text[lang]);

  let style: React.CSSProperties | undefined;
  if (sweep !== null) {
    const gradient = `linear-gradient(90deg, rgba(0,0,0,1) ${sweep - 30}%, rgba(0,0,0,0.25) ${sweep}%, rgba(0,0,0,1) ${sweep + 22}%)`;
    style = { WebkitMaskImage: gradient, maskImage: gradient };
  }

  return <span style={style}>{display}</span>;
}

/** EN / PT switch, styled by the caller via className. */
export function LangToggle({
  activeClass,
  inactiveClass,
}: {
  activeClass: string;
  inactiveClass: string;
}) {
  const { lang, setLang } = useLang();
  return (
    <button
      type="button"
      onClick={() => setLang(lang === "en" ? "pt" : "en")}
      aria-label={lang === "en" ? "Mudar para português" : "Switch to English"}
      className="cursor-pointer text-xs tracking-[0.2em] uppercase"
    >
      <span className={lang === "en" ? activeClass : inactiveClass}>EN</span>
      <span className={inactiveClass}> / </span>
      <span className={lang === "pt" ? activeClass : inactiveClass}>PT</span>
    </button>
  );
}
