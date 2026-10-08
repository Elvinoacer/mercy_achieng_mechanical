"use client";

/**
 * SmoothScroll — Lenis buttery smooth scrolling wired into the app.
 * - Disabled entirely for `prefers-reduced-motion` (native scroll then).
 * - Intercepts in-page anchor links and animates to target via Lenis.
 * - Exposes the instance on `window.__lenis` for lock/unlock by overlays.
 */

import { useEffect, type ReactNode } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { useReducedMotion } from "framer-motion";

type LenisLike = { stop: () => void; start: () => void };

export function lockPageScroll() {
  document.documentElement.classList.add("lenis-stopped");
  document.body.style.overflow = "hidden";
  (window as unknown as { __lenis?: LenisLike }).__lenis?.stop();
}

export function unlockPageScroll() {
  document.documentElement.classList.remove("lenis-stopped");
  document.body.style.overflow = "";
  (window as unknown as { __lenis?: LenisLike }).__lenis?.start();
}

function AnchorHandler() {
  const lenis = useLenis();

  useEffect(() => {
    (window as unknown as { __lenis?: LenisLike }).__lenis = lenis ?? undefined;
    if (!lenis) return;

    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;
      const el = document.querySelector(hash);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -72, duration: 1.5 });
    };

    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      (window as unknown as { __lenis?: LenisLike }).__lenis = undefined;
    };
  }, [lenis]);

  return null;
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <>
        <NativeAnchors />
        {children}
      </>
    );
  }

  return (
    <ReactLenis root options={{ lerp: 0.09, wheelMultiplier: 1, touchMultiplier: 1.35 }}>
      <AnchorHandler />
      {children}
    </ReactLenis>
  );
}

/** Fallback smooth anchors when Lenis is disabled (reduced motion). */
function NativeAnchors() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;
      const el = document.querySelector(hash);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: "auto", block: "start" });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
