"use client";

import { useEffect, useRef } from "react";

/**
 * Hero visual: a rotating 3D "embedding space". Three clusters of vectors; every few
 * seconds a query vector lands and links to its nearest neighbours — retrieval, as RAG
 * does it. Plain <canvas> with a small perspective projection: no 3D library.
 *
 * - colours follow the site theme (white theme gets darker, higher-contrast points)
 * - pauses when scrolled off-screen; honours prefers-reduced-motion (one static frame)
 * - crisp on high-DPI screens; subtle tilt follows the pointer
 */

type Theme = "slate" | "black" | "white" | "indigo";
type RGB = [number, number, number];

const PALETTES: Record<"dark" | "light", { clusters: RGB[]; query: RGB; links: RGB }> = {
  dark: { clusters: [[20, 184, 166], [99, 102, 241], [148, 163, 184]], query: [245, 158, 11], links: [245, 158, 11] },
  light: { clusters: [[13, 148, 136], [79, 70, 229], [100, 116, 139]], query: [217, 119, 6], links: [217, 119, 6] },
};

const rgba = (c: RGB, a: number) => `rgba(${c[0]},${c[1]},${c[2]},${Math.max(0, Math.min(1, a))})`;

// Deterministic RNG so the cloud looks the same on every visit
function mulberry32(seed: number) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Vec3 = [number, number, number];

export default function EmbeddingSpace({ theme }: { theme: Theme }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const themeRef = useRef<Theme>(theme);
  const redrawStatic = useRef<(() => void) | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rand = mulberry32(42);
    const gauss = (s: number) => Math.sqrt(-2 * Math.log(rand() + 1e-9)) * Math.cos(2 * Math.PI * rand()) * s;
    const centers: Vec3[] = [[-0.55, -0.2, 0.2], [0.5, -0.35, -0.3], [0.1, 0.5, 0.35]];
    const points: { p: Vec3; k: number }[] = [];
    centers.forEach((c, k) => {
      for (let i = 0; i < 70; i++) points.push({ p: [c[0] + gauss(0.18), c[1] + gauss(0.18), c[2] + gauss(0.18)], k });
    });

    let query: Vec3 = [0, 0, 0];
    let neighbours: number[] = [];
    let age = 0;
    const newQuery = () => {
      const c = centers[Math.floor(rand() * centers.length)];
      query = [c[0] + gauss(0.12), c[1] + gauss(0.12), c[2] + gauss(0.12)];
      neighbours = points
        .map((o, i) => [i, Math.hypot(o.p[0] - query[0], o.p[1] - query[1], o.p[2] - query[2])] as const)
        .sort((a, b) => a[1] - b[1]).slice(0, 6).map(([i]) => i);
      age = 0;
    };
    newQuery();

    let size = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = canvas.clientWidth;
      canvas.width = Math.round(size * dpr);
      canvas.height = Math.round(size * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Pointer tilt (eased toward target)
    const tilt = { x: 0, y: 0, tx: 0, ty: 0 };
    const onPointer = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      tilt.ty = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / r.width)) * 0.35;
      tilt.tx = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / r.height)) * 0.25;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    const project = (p: Vec3, ry: number, rx: number) => {
      let [x, y, z] = p;
      let c = Math.cos(ry), s = Math.sin(ry);
      [x, z] = [x * c - z * s, x * s + z * c];
      c = Math.cos(rx); s = Math.sin(rx);
      [y, z] = [y * c - z * s, y * s + z * c];
      const f = 2.6 / (2.6 + z);
      return { x: size / 2 + x * f * size * 0.33, y: size / 2 + y * f * size * 0.33, z, f };
    };

    const draw = (t: number, animate: boolean) => {
      const pal = PALETTES[themeRef.current === "white" ? "light" : "dark"];
      tilt.x += (tilt.tx - tilt.x) * 0.05;
      tilt.y += (tilt.ty - tilt.y) * 0.05;
      const ry = t * 0.00025 + tilt.y;
      const rx = 0.35 + tilt.x;
      ctx.clearRect(0, 0, size, size);

      const P = points.map((o) => ({ ...project(o.p, ry, rx), k: o.k }));
      [...P].sort((a, b) => b.z - a.z).forEach((p) => {
        ctx.fillStyle = rgba(pal.clusters[p.k], 0.05 + 0.5 * p.f);
        ctx.beginPath();
        ctx.arc(p.x, p.y, (1.6 * p.f + 0.6) * (size / 220), 0, Math.PI * 2);
        ctx.fill();
      });

      if (animate) age += 1;
      const q = project(query, ry, rx);
      const grow = animate ? Math.min(1, age / 60) : 1;
      ctx.lineWidth = 1;
      neighbours.forEach((i) => {
        const p = P[i];
        ctx.strokeStyle = rgba(pal.links, 0.55 * grow);
        ctx.beginPath();
        ctx.moveTo(q.x, q.y);
        ctx.lineTo(q.x + (p.x - q.x) * grow, q.y + (p.y - q.y) * grow);
        ctx.stroke();
      });
      ctx.fillStyle = rgba(pal.query, 1);
      ctx.beginPath();
      ctx.arc(q.x, q.y, 3.5 * (size / 220), 0, Math.PI * 2);
      ctx.fill();
      if (animate) {
        ctx.strokeStyle = rgba(pal.query, 1 - age / 90);
        ctx.beginPath();
        ctx.arc(q.x, q.y, 4 + age / 5, 0, Math.PI * 2);
        ctx.stroke();
        if (age > 200) newQuery();
      }
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let visible = true;
    const loop = (t: number) => {
      draw(t, true);
      if (visible) raf = requestAnimationFrame(loop);
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible && !reduced) raf = requestAnimationFrame(loop);
    });

    if (reduced) {
      redrawStatic.current = () => draw(0, false);
      redrawStatic.current();
    } else {
      io.observe(canvas);
    }

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  // Animated frames read themeRef every frame; the static (reduced-motion) frame needs a repaint
  useEffect(() => {
    themeRef.current = theme;
    redrawStatic.current?.();
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="w-full max-w-[240px] aspect-square select-none opacity-90 group-hover:opacity-100 transition-opacity duration-500"
    />
  );
}
