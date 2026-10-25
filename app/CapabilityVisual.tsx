"use client";

import { useEffect, useRef } from "react";

/**
 * Small 3D banners for the Core Capabilities cards. One component, three scenes:
 *   agents    LLM core with agent nodes on two tilted orbits; routing pulses out and back
 *   pipeline  Kubernetes-style cluster: wireframe pods on a rotating platform, packets
 *             flowing between neighbours, a control-plane cube in the middle
 *   data      3D bar chart on a grid floor, bars rising and falling
 *
 * Plain canvas + a tiny perspective projection. Theme-aware, high-DPI aware, paused
 * off-screen, a static frame under prefers-reduced-motion, and it speeds up while the
 * card is hovered (pairs with the card's hover tilt).
 */

type Theme = "slate" | "black" | "white" | "indigo";
type Variant = "agents" | "pipeline" | "data";
type RGB = [number, number, number];
type Vec3 = [number, number, number];

const PAL: Record<"dark" | "light", { teal: RGB; indigo: RGB; amber: RGB; grid: RGB }> = {
  dark: { teal: [45, 212, 191], indigo: [129, 140, 248], amber: [245, 158, 11], grid: [148, 163, 184] },
  light: { teal: [13, 148, 136], indigo: [79, 70, 229], amber: [217, 119, 6], grid: [100, 116, 139] },
};
const rgba = (c: RGB, a: number) => `rgba(${c[0]},${c[1]},${c[2]},${Math.max(0, Math.min(1, a))})`;

export default function CapabilityVisual({ variant, theme }: { variant: Variant; theme: Theme }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const themeRef = useRef<Theme>(theme);
  const redrawStatic = useRef<(() => void) | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let w = 0, h = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      redrawStatic.current?.();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    // Scenes are fitted to the banner's height; `lift` recentres scenes whose
    // geometry sits below the origin (platform and chart floors).
    const LIFT: Record<Variant, number> = { agents: 0.1, pipeline: 0.3, data: 0.33 };
    const project = (p: Vec3, ry: number, rx: number, zoom = 1) => {
      let [x, y, z] = p;
      let c = Math.cos(ry), s = Math.sin(ry);
      [x, z] = [x * c - z * s, x * s + z * c];
      c = Math.cos(rx); s = Math.sin(rx);
      [y, z] = [y * c - z * s, y * s + z * c];
      const f = 3 / (3 + z);
      const scale = Math.min(w * 0.4, h * 0.55) * zoom;
      return { x: w / 2 + x * f * scale, y: h / 2 + (y * f - LIFT[variant]) * scale, z, f };
    };
    const line = (a: { x: number; y: number }, b: { x: number; y: number }) => {
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
    };
    const dot = (p: { x: number; y: number }, r: number) => {
      ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, Math.PI * 2); ctx.fill();
    };

    // ── Scene state ─────────────────────────────────────────────────────
    const pulses: { i: number; s: number; back: boolean }[] = [];
    const packets: { i: number; s: number }[] = [];

    const agentsScene = (t: number, pal: typeof PAL.dark, animate: boolean) => {
      const ry = t * 0.0005, rx = 0.45;
      const rings = [
        { n: 6, r: 0.95, tilt: 0.35, speed: 1 },
        { n: 4, r: 0.6, tilt: -0.55, speed: -1.4 },
      ];
      const nodes: Vec3[] = [];
      rings.forEach((ring) => {
        for (let k = 0; k < ring.n; k++) {
          const a = (k / ring.n) * Math.PI * 2 + t * 0.0004 * ring.speed;
          nodes.push([Math.cos(a) * ring.r, Math.sin(a) * ring.r * Math.sin(ring.tilt), Math.sin(a) * ring.r * Math.cos(ring.tilt)]);
        }
      });
      const core = project([0, 0, 0], ry, rx);
      const P = nodes.map((n) => project(n, ry, rx));
      ctx.lineWidth = 1;
      P.forEach((p) => { ctx.strokeStyle = rgba(pal.indigo, 0.12 + 0.18 * (p.f - 0.75)); line(core, p); });
      if (animate && Math.random() < 0.06) pulses.push({ i: Math.floor(Math.random() * P.length), s: 0, back: Math.random() < 0.45 });
      for (let k = pulses.length - 1; k >= 0; k--) {
        const u = pulses[k]; u.s += 0.025;
        if (u.s > 1) { pulses.splice(k, 1); continue; }
        const p = P[u.i], s = u.back ? 1 - u.s : u.s;
        ctx.fillStyle = rgba(u.back ? pal.teal : pal.amber, 0.9);
        dot({ x: core.x + (p.x - core.x) * s, y: core.y + (p.y - core.y) * s }, 1.8);
      }
      [...P].sort((a, b) => b.z - a.z).forEach((p) => {
        ctx.fillStyle = rgba(pal.indigo, 0.35 + 0.45 * (p.f - 0.75)); dot(p, 3.4 * p.f);
      });
      const glow = 0.5 + 0.5 * Math.sin(t * 0.003);
      ctx.strokeStyle = rgba(pal.teal, 0.25 + 0.25 * glow); ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(core.x, core.y, 11 + 2 * glow, 0, Math.PI * 2); ctx.stroke();
      ctx.fillStyle = rgba(pal.teal, 0.95); dot(core, 7);
    };

    const CUBE_EDGES: [number, number][] = [[0,1],[1,3],[3,2],[2,0],[4,5],[5,7],[7,6],[6,4],[0,4],[1,5],[2,6],[3,7]];
    const cube = (c: Vec3, s: number): Vec3[] => {
      const out: Vec3[] = [];
      for (const dx of [-s, s]) for (const dy of [-s, s]) for (const dz of [-s, s]) out.push([c[0] + dx, c[1] + dy, c[2] + dz]);
      return out;
    };
    const pipelineScene = (t: number, pal: typeof PAL.dark, animate: boolean) => {
      const ry = t * 0.00045, rx = 0.55, R = 0.8, N = 6;
      // platform ring
      ctx.lineWidth = 1;
      ctx.strokeStyle = rgba(pal.grid, 0.25);
      ctx.beginPath();
      for (let k = 0; k <= 48; k++) {
        const a = (k / 48) * Math.PI * 2;
        const p = project([Math.cos(a) * (R + 0.2), 0.3, Math.sin(a) * (R + 0.2)], ry, rx);
        if (k) ctx.lineTo(p.x, p.y); else ctx.moveTo(p.x, p.y);
      }
      ctx.stroke();
      const centers: Vec3[] = Array.from({ length: N }, (_, k) => {
        const a = (k / N) * Math.PI * 2;
        return [Math.cos(a) * R, 0.12, Math.sin(a) * R];
      });
      // packets between neighbouring pods, along the ring
      if (animate && Math.random() < 0.05) packets.push({ i: Math.floor(Math.random() * N), s: 0 });
      for (let k = packets.length - 1; k >= 0; k--) {
        const u = packets[k]; u.s += 0.02;
        if (u.s > 1) { packets.splice(k, 1); continue; }
        const a = ((u.i + u.s) / N) * Math.PI * 2;
        ctx.fillStyle = rgba(pal.teal, 0.95);
        dot(project([Math.cos(a) * R, 0.12, Math.sin(a) * R], ry, rx), 2);
      }
      // pods (back to front), then the control plane
      const pods = centers.map((c, k) => ({ k, verts: cube(c, 0.13).map((v) => project(v, ry, rx)), z: project(c, ry, rx).z }));
      pods.push({ k: -1, verts: cube([0, 0, 0], 0.2).map((v) => project(v, ry, rx)), z: project([0, 0, 0], ry, rx).z });
      pods.sort((a, b) => b.z - a.z).forEach(({ k, verts, z }) => {
        const near = 0.55 - z * 0.25;
        ctx.strokeStyle = rgba(k < 0 ? pal.teal : pal.indigo, near);
        ctx.lineWidth = k < 0 ? 1.5 : 1;
        CUBE_EDGES.forEach(([a, b]) => line(verts[a], verts[b]));
      });
    };

    const dataScene = (t: number, pal: typeof PAL.dark) => {
      const ry = -0.6 + Math.sin(t * 0.00025) * 0.5, rx = 0.5, zoom = 0.9;
      const cols = 5, rows = 3, gap = 0.42, bw = 0.12;
      ctx.lineWidth = 1;
      ctx.strokeStyle = rgba(pal.grid, 0.18);
      for (let i = 0; i <= cols; i++) {
        const x = (i - cols / 2) * gap;
        line(project([x, 0.45, -rows / 2 * gap], ry, rx, zoom), project([x, 0.45, rows / 2 * gap], ry, rx, zoom));
      }
      for (let j = 0; j <= rows; j++) {
        const z = (j - rows / 2) * gap;
        line(project([-cols / 2 * gap, 0.45, z], ry, rx, zoom), project([cols / 2 * gap, 0.45, z], ry, rx, zoom));
      }
      const bars: { x: number; z: number; hgt: number; depth: number }[] = [];
      for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) {
        const x = (i - (cols - 1) / 2) * gap, z = (j - (rows - 1) / 2) * gap;
        const hgt = 0.25 + 0.45 * (0.5 + 0.5 * Math.sin(t * 0.0015 + i * 0.9 + j * 1.7));
        bars.push({ x, z, hgt, depth: project([x, 0.45, z], ry, rx, zoom).z });
      }
      bars.sort((a, b) => b.depth - a.depth).forEach(({ x, z, hgt }) => {
        const y0 = 0.45, y1 = 0.45 - hgt;
        const base = [[x - bw, z - bw], [x + bw, z - bw], [x + bw, z + bw], [x - bw, z + bw]] as const;
        const bot = base.map(([bx, bz]) => project([bx, y0, bz], ry, rx, zoom));
        const top = base.map(([bx, bz]) => project([bx, y1, bz], ry, rx, zoom));
        const col = hgt > 0.5 ? pal.teal : pal.indigo;
        ctx.fillStyle = rgba(col, 0.22);
        ctx.beginPath(); top.forEach((p, k) => (k ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y))); ctx.closePath(); ctx.fill();
        ctx.strokeStyle = rgba(col, 0.65);
        for (let k = 0; k < 4; k++) { line(bot[k], top[k]); line(top[k], top[(k + 1) % 4]); }
      });
    };

    let clock = 0, speed = 1, speedTarget = 1, last = 0;
    const draw = (animate: boolean) => {
      const pal = PAL[themeRef.current === "white" ? "light" : "dark"];
      ctx.clearRect(0, 0, w, h);
      if (variant === "agents") agentsScene(clock, pal, animate);
      else if (variant === "pipeline") pipelineScene(clock, pal, animate);
      else dataScene(clock, pal);
    };

    // Hover on the parent card speeds the scene up
    const card = canvas.parentElement;
    const onEnter = () => { speedTarget = 2.5; };
    const onLeave = () => { speedTarget = 1; };
    card?.addEventListener("pointerenter", onEnter);
    card?.addEventListener("pointerleave", onLeave);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0, visible = false;
    const loop = (t: number) => {
      const dt = last ? Math.min(50, t - last) : 16;
      last = t;
      speed += (speedTarget - speed) * 0.06;
      clock += dt * speed;
      draw(true);
      if (visible) raf = requestAnimationFrame(loop);
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      last = 0;
      if (visible) raf = requestAnimationFrame(loop);
    });

    if (reduced) {
      clock = 2000;
      redrawStatic.current = () => draw(false);
      redrawStatic.current();
    } else {
      io.observe(canvas);
    }

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      card?.removeEventListener("pointerenter", onEnter);
      card?.removeEventListener("pointerleave", onLeave);
    };
  }, [variant]);

  useEffect(() => {
    themeRef.current = theme;
    redrawStatic.current?.();
  }, [theme]);

  return <canvas ref={canvasRef} aria-hidden="true" className="block w-full h-28 mb-4 select-none" />;
}
