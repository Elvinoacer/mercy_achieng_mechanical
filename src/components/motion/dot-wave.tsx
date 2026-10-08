"use client";

/**
 * DotWave — technical dot-matrix wave field on canvas.
 * Bone dots oscillate on intersecting sine waves; the pointer
 * charges nearby dots to molten amber. Performance-first:
 *  - devicePixelRatio capped at 1.75
 *  - pauses when off-screen (IntersectionObserver) or tab hidden
 *  - single static frame for prefers-reduced-motion
 *  - dot count scales with viewport area (capped)
 */

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface Dot {
  x: number;
  y: number;
  r: number;
  a: number;
  amber: number;
}

export function DotWave({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let running = true;
    let visible = true;
    let W = 0;
    let H = 0;
    let dots: Dot[] = [];
    const mouse = { x: -9999, y: -9999 };
    const DPR = Math.min(window.devicePixelRatio || 1, 1.75);

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      canvas.width = Math.round(W * DPR);
      canvas.height = Math.round(H * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

      const spacing = W < 640 ? 30 : 26;
      dots = [];
      for (let y = spacing / 2; y < H; y += spacing) {
        for (let x = spacing / 2; x < W; x += spacing) {
          dots.push({ x, y, r: 1, a: 0.3, amber: 0 });
        }
      }
    };

    const drawFrame = (t: number) => {
      ctx.clearRect(0, 0, W, H);
      const time = t * 0.0011;
      const mx = mouse.x;
      const my = mouse.y;

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        const wave =
          Math.sin(d.x * 0.011 + time * 1.6) +
          Math.cos(d.y * 0.009 - time * 1.2) +
          Math.sin((d.x + d.y) * 0.004 + time * 0.8);
        const n = (wave + 3) / 6; // 0..1

        let targetR = 0.7 + n * 1.9;
        let targetA = 0.16 + n * 0.22;

        // pointer charge
        const dx = d.x - mx;
        const dy = d.y - my;
        const dist2 = dx * dx + dy * dy;
        let charge = 0;
        if (dist2 < 32400) {
          // within 180px
          const dist = Math.sqrt(dist2);
          charge = 1 - dist / 180;
          targetR += charge * 2.4;
          targetA += charge * 0.55;
        }

        // ease toward targets (cheap temporal smoothing)
        d.r += (targetR - d.r) * 0.16;
        d.a += (targetA - d.a) * 0.16;
        d.amber += (charge - d.amber) * 0.14;

        const r = d.r;
        if (r < 0.35) continue;

        if (d.amber > 0.02) {
          const cr = Math.round(236 + (255 - 236) * d.amber);
          const cg = Math.round(231 + (92 - 231) * d.amber);
          const cb = Math.round(221 + (31 - 221) * d.amber);
          ctx.fillStyle = `rgba(${cr},${cg},${cb},${Math.min(1, d.a)})`;
        } else {
          ctx.fillStyle = `rgba(236,231,221,${d.a})`;
        }
        ctx.fillRect(d.x - r / 2, d.y - r / 2, r, r);
      }
    };

    const loop = (t: number) => {
      if (running && visible) drawFrame(t);
      raf = requestAnimationFrame(loop);
    };

    const onResize = () => {
      build();
      if (reduce) drawFrame(0);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    build();
    if (reduce) {
      drawFrame(0);
    } else {
      raf = requestAnimationFrame(loop);
      window.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("mouseleave", onLeave);
    }

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    const onVis = () => {
      visible = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVis);

    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      aria-hidden="true"
    />
  );
}
