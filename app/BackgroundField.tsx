"use client";

import { useEffect, useRef } from "react";

/**
 * Full-page background: a faint 3D network field (nodes + nearest-neighbour links)
 * behind all content. The camera rotates with scroll, so moving down the page feels
 * like moving through the space; between scrolls it drifts slowly, and an occasional
 * signal pulse travels along a link.
 *
 * Kept deliberately quiet so text stays readable: low alpha, capped at 30 fps,
 * paused in background tabs, fewer nodes on small screens, one static frame under
 * prefers-reduced-motion.
 */

type Theme = "slate" | "black" | "white" | "indigo";
type RGB = [number, number, number];
type Vec3 = [number, number, number];

const COLORS: Record<Theme, { node: RGB; link: RGB; pulse: RGB; alpha: number }> = {
  slate: { node: [94, 234, 212], link: [99, 102, 241], pulse: [45, 212, 191], alpha: 1 },
  black: { node: [94, 234, 212], link: [129, 140, 248], pulse: [45, 212, 191], alpha: 0.9 },
  indigo: { node: [165, 180, 252], link: [45, 212, 191], pulse: [94, 234, 212], alpha: 1 },
  white: { node: [13, 148, 136], link: [79, 70, 229], pulse: [13, 148, 136], alpha: 0.8 },
};

const rgba = (c: RGB, a: number) => `rgba(${c[0]},${c[1]},${c[2]},${Math.max(0, Math.min(1, a))})`;

function mulberry32(seed: number) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function BackgroundField({ theme }: { theme: Theme }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const themeRef = useRef<Theme>(theme);
  const redrawStatic = useRef<(() => void) | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    // ── Scene: nodes in a wide, deep slab; links to nearest neighbours ──
    const small = window.innerWidth < 768;
    const rand = mulberry32(7);
    const N = small ? 55 : 110;
    const nodes: Vec3[] = Array.from({ length: N }, () => [
      (rand() * 2 - 1) * 1.6, (rand() * 2 - 1) * 1.1, (rand() * 2 - 1) * 1.2,
    ]);
    const links: [number, number][] = [];
    nodes.forEach((a, i) => {
      nodes
        .map((b, j) => [j, Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2])] as const)
        .filter(([j, d]) => j > i && d < 0.62)
        .sort((x, y) => x[1] - y[1])
        .slice(0, 3)
        .forEach(([j]) => links.push([i, j]));
    });
    const pulses: { link: number; s: number }[] = [];

    // ── Canvas sizing ──
    let w = 0, h = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // ── Scroll drives the camera (eased) ──
    let scrollTarget = window.scrollY, scroll = scrollTarget;
    const onScroll = () => { scrollTarget = window.scrollY; };
    window.addEventListener("scroll", onScroll, { passive: true });

    const project = (p: Vec3, ry: number, rx: number) => {
      let [x, y, z] = p;
      let c = Math.cos(ry), s = Math.sin(ry);
      [x, z] = [x * c - z * s, x * s + z * c];
      c = Math.cos(rx); s = Math.sin(rx);
      [y, z] = [y * c - z * s, y * s + z * c];
      const f = 3 / (3 + z);
      const scale = Math.max(w, h) * 0.42;
      return { x: w / 2 + x * f * scale, y: h / 2 + y * f * scale, z, f };
    };

    const draw = (t: number, animate: boolean) => {
      const col = COLORS[themeRef.current];
      scroll += (scrollTarget - scroll) * 0.08;
      const ry = t * 0.00004 + scroll * 0.0006;
      const rx = 0.25 + Math.sin(scroll * 0.0004) * 0.15;
      ctx.clearRect(0, 0, w, h);
      const P = nodes.map((n) => project(n, ry, rx));

      ctx.lineWidth = 1;
      links.forEach(([i, j]) => {
        const depth = (P[i].f + P[j].f) / 2;               // ~0.7 far .. ~1.6 near
        ctx.strokeStyle = rgba(col.link, (0.035 + 0.07 * (depth - 0.7)) * col.alpha);
        ctx.beginPath();
        ctx.moveTo(P[i].x, P[i].y);
        ctx.lineTo(P[j].x, P[j].y);
        ctx.stroke();
      });

      if (animate) {
        if (Math.random() < 0.04 && links.length) pulses.push({ link: Math.floor(Math.random() * links.length), s: 0 });
        for (let k = pulses.length - 1; k >= 0; k--) {
          const p = pulses[k];
          p.s += 0.02;
          if (p.s > 1) { pulses.splice(k, 1); continue; }
          const [i, j] = links[p.link];
          const x = P[i].x + (P[j].x - P[i].x) * p.s, y = P[i].y + (P[j].y - P[i].y) * p.s;
          ctx.fillStyle = rgba(col.pulse, 0.35 * Math.sin(Math.PI * p.s) * col.alpha);
          ctx.beginPath();
          ctx.arc(x, y, 1.8 * P[i].f, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      P.forEach((p) => {
        ctx.fillStyle = rgba(col.node, (0.05 + 0.16 * (p.f - 0.7)) * col.alpha);
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.3 * p.f, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0, last = 0;
    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      if (t - last < 33) return;                // ~30 fps is plenty for a background
      last = t;
      draw(t, true);
    };
    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && !reduced) raf = requestAnimationFrame(loop);
    };

    if (reduced) {
      redrawStatic.current = () => draw(0, false);
      redrawStatic.current();
      const redraw = () => redrawStatic.current?.();
      window.addEventListener("resize", redraw);
      return () => {
        window.removeEventListener("resize", resize);
        window.removeEventListener("resize", redraw);
        window.removeEventListener("scroll", onScroll);
      };
    }
    raf = requestAnimationFrame(loop);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    themeRef.current = theme;
    redrawStatic.current?.();
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none"
    />
  );
}
