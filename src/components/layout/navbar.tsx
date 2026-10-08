"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useState } from "react";
import { Moon, Sun, Menu, X, ArrowUpRight } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { navSections, profile } from "@/data/profile";
import { easeOutExpo } from "@/components/motion/primitives";
import { lockPageScroll, unlockPageScroll } from "@/components/motion/smooth-scroll";

export function Navbar({ onRecruiter }: { onRecruiter: () => void }) {
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 });
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const reduce = useReducedMotion();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    if (y > prev && y > 420 && !mobileOpen) setHidden(true);
    else setHidden(false);
    setScrolled(y > 24);
  });

  // Scroll-spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    navSections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Lock scroll while the full-screen menu is open
  useEffect(() => {
    if (mobileOpen) lockPageScroll();
    else unlockPageScroll();
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        className={cn(
          "no-print fixed inset-x-0 top-0 z-[70]",
          scrolled && !mobileOpen
            ? "border-b border-border/70 bg-background/72 backdrop-blur-lg"
            : "border-b border-transparent bg-transparent"
        )}
        animate={reduce ? undefined : hidden && !mobileOpen ? { y: "-100%" } : { y: 0 }}
        transition={{ duration: 0.38, ease: easeOutExpo }}
      >
        {/* Scroll progress — molten hairline */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-border/30" aria-hidden="true">
          <motion.div className="h-full origin-left bg-eng-amber" style={{ scaleX: progress }} />
        </div>

        <nav className="mx-auto max-w-[1600px] px-5 sm:px-8" aria-label="Primary">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Brand — display wordmark */}
            <motion.a
              href="#hero"
              className="group flex items-baseline gap-2.5"
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.1 }}
            >
              <span className="font-display text-lg font-extrabold leading-none tracking-tight text-foreground">
                MA<span className="text-eng-amber">®</span>
              </span>
              <span className="label-tech hidden text-[9px] sm:block">
                MECHANICAL &amp; PRODUCTION ENGINEER
              </span>
            </motion.a>

            {/* Desktop links */}
            <motion.ul
              className="hidden items-center gap-0.5 lg:flex"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.2 }}
            >
              {navSections.map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className={cn(
                      "relative px-3.5 py-2 text-[13px] font-medium transition-colors duration-300",
                      active === id
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {label}
                    {active === id && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-3.5 -bottom-0.5 h-[2px] bg-eng-amber"
                        transition={{ duration: 0.4, ease: easeOutExpo }}
                      />
                    )}
                  </a>
                </li>
              ))}
            </motion.ul>

            {/* Actions */}
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.3 }}
            >
              <button
                onClick={onRecruiter}
                className="hidden items-center gap-2 border border-eng-amber/50 px-3.5 py-2 text-[11px] font-medium uppercase tracking-[0.1em] text-eng-amber transition-all duration-300 hover:bg-eng-amber hover:text-background md:inline-flex"
              >
                <span className="animate-pulse-dot h-1.5 w-1.5 bg-eng-amber" aria-hidden="true" />
                Recruiter Mode
              </button>
              <button
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                className="inline-flex h-9 w-9 items-center justify-center border border-border text-muted-foreground transition-colors duration-300 hover:border-foreground/40 hover:text-foreground"
                aria-label="Toggle light and dark theme"
              >
                <Sun className="hidden h-4 w-4 dark:block" />
                <Moon className="dark:hidden h-4 w-4" />
              </button>
              <button
                className="inline-flex h-9 w-9 items-center justify-center border border-border lg:hidden"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </motion.div>
          </div>
        </nav>
      </motion.header>

      {/* ── Full-screen obsidian menu (mobile) ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[65] flex flex-col bg-background/97 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0, clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ opacity: 0, clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="bg-blueprint-fine pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
            <div className="relative flex flex-1 flex-col justify-center px-8 pt-16">
              <ul className="space-y-2">
                {navSections.map(({ id, label }, i) => (
                  <li key={id} className="overflow-hidden">
                    <motion.a
                      href={`#${id}`}
                      onClick={() => setMobileOpen(false)}
                      className="group flex items-baseline gap-4 py-2"
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "110%" }}
                      transition={{ duration: 0.55, ease: easeOutExpo, delay: 0.08 + i * 0.05 }}
                    >
                      <span className="font-mono text-[11px] text-eng-amber">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={cn(
                          "display-3 transition-colors duration-300",
                          active === id ? "text-foreground" : "text-foreground/60 group-hover:text-foreground"
                        )}
                      >
                        {label}
                      </span>
                      <ArrowUpRight
                        className="h-5 w-5 self-center text-muted-foreground transition-all duration-300 group-hover:rotate-45 group-hover:text-eng-amber"
                        aria-hidden="true"
                      />
                    </motion.a>
                  </li>
                ))}
              </ul>

              <motion.div
                className="mt-10 border-t border-border pt-6"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.45, duration: 0.5 }}
              >
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    onRecruiter();
                  }}
                  className="inline-flex w-full items-center justify-center gap-2 border border-eng-amber/60 px-4 py-3.5 text-[11px] font-medium uppercase tracking-[0.12em] text-eng-amber"
                >
                  <span className="animate-pulse-dot h-1.5 w-1.5 bg-eng-amber" aria-hidden="true" />
                  Recruiter Mode — 60 Second Summary
                </button>
                <p className="label-tech mt-4 text-center text-[9px]">
                  {profile.location.toUpperCase()} — OPEN TO RELOCATION
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
