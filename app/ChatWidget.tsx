"use client";

import { useEffect, useRef, useState } from "react";

/**
 * "Ask about Rohit" — floating RAG chat panel. Talks to /api/chat, streams the answer,
 * and shows which CV/site passages it was grounded in.
 */

type Theme = "slate" | "black" | "white" | "indigo";
type Source = { n: number; id: string; title: string };
type Msg = { role: "user" | "assistant"; content: string; sources?: Source[]; error?: boolean };

const SUGGESTIONS = [
  "Where does Rohit work now?",
  "What has he built with LangGraph?",
  "Tell me about his MCP server project",
];

export default function ChatWidget({ theme }: { theme: Theme }) {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const light = theme === "white";
  const panel = light ? "bg-white border-slate-200 text-slate-800" : "bg-slate-900/95 border-slate-700 text-slate-200";
  const muted = light ? "text-slate-500" : "text-slate-400";
  const bubbleUser = light ? "bg-teal-600 text-white" : "bg-teal-500 text-slate-950";
  const bubbleBot = light ? "bg-slate-100 text-slate-800" : "bg-slate-800 text-slate-100";
  const chip = light
    ? "border-slate-300 text-slate-600 hover:bg-slate-50"
    : "border-slate-700 text-slate-300 hover:bg-slate-800";

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [msgs]);

  useEffect(() => () => abortRef.current?.abort(), []);

  async function send(text: string) {
    const question = text.trim();
    if (!question || busy) return;
    const history: Msg[] = [...msgs.filter((m) => !m.error), { role: "user", content: question }];
    setMsgs([...history, { role: "assistant", content: "" }]);
    setInput("");
    setBusy(true);

    const update = (patch: Partial<Msg>) =>
      setMsgs((cur) => {
        const next = [...cur];
        next[next.length - 1] = { ...next[next.length - 1], ...patch };
        return next;
      });

    const ctrl = new AbortController();
    abortRef.current = ctrl;
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history.slice(-6).map(({ role, content }) => ({ role, content })) }),
        signal: ctrl.signal,
      });
      if (!res.ok || !res.body) {
        const err = await res.json().catch(() => ({}));
        update({ content: err.error ?? "Sorry, something went wrong. Please try again.", error: true });
        return;
      }
      let sources: Source[] = [];
      try { sources = JSON.parse(decodeURIComponent(res.headers.get("X-Chat-Sources") ?? "[]")); } catch {}
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += dec.decode(value, { stream: true });
        update({ content: acc });
      }
      // Only show the sources the answer actually cited (fall back to all of them).
      const cited = sources.filter((s) => acc.includes(`[${s.n}]`));
      update({ content: acc || "Sorry, I couldn't generate an answer.", sources: cited.length ? cited : sources });
    } catch (e) {
      if ((e as Error).name !== "AbortError") update({ content: "Network error — please try again.", error: true });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 print:hidden">
      {open && (
        <section
          role="dialog"
          aria-label="Ask about Rohit"
          className={`w-[calc(100vw-2rem)] sm:w-96 h-[min(34rem,calc(100vh-6rem))] flex flex-col rounded-xl border shadow-2xl backdrop-blur ${panel}`}
        >
          <header className={`flex items-center justify-between px-4 py-3 border-b ${light ? "border-slate-200" : "border-slate-700"}`}>
            <div>
              <h2 className="font-semibold text-sm">Ask about Rohit</h2>
              <p className={`text-[11px] ${muted}`}>Answers from his CV and this site</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className={`rounded p-1 ${light ? "hover:bg-slate-100" : "hover:bg-slate-800"}`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </header>

          <div ref={listRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3 text-sm" aria-live="polite">
            {msgs.length === 0 && (
              <div className="space-y-3">
                <p className={muted}>
                  Hi! Ask me about Rohit&apos;s experience, projects, skills or education.
                </p>
                <div className="flex flex-col gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button key={s} onClick={() => send(s)} className={`text-left text-xs px-3 py-2 rounded-lg border transition-colors ${chip}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {msgs.map((m, i) => (
              <div key={i} className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}>
                <div
                  className={`max-w-[88%] rounded-lg px-3 py-2 whitespace-pre-wrap leading-relaxed ${
                    m.role === "user" ? bubbleUser : bubbleBot
                  } ${m.error ? "border border-amber-500/60" : ""}`}
                >
                  {m.content || (busy && i === msgs.length - 1 ? <span className={`animate-pulse ${muted}`}>Thinking…</span> : null)}
                </div>
                {m.sources && m.sources.length > 0 && (
                  <div className="mt-1 flex flex-wrap gap-1 max-w-[88%]">
                    {m.sources.map((s) => (
                      <span key={s.id} title={s.title} className={`text-[10px] font-mono px-1.5 py-0.5 rounded border truncate max-w-full ${chip}`}>
                        [{s.n}] {s.title}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); send(input); }}
            className={`border-t px-3 py-3 ${light ? "border-slate-200" : "border-slate-700"}`}
          >
            <div className="flex gap-2 items-end">
              <label htmlFor="chat-input" className="sr-only">Your question</label>
              <textarea
                id="chat-input"
                ref={inputRef}
                rows={1}
                maxLength={500}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }}
                placeholder="Ask a question…"
                className={`flex-1 resize-none rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-500/50 ${
                  light ? "bg-white border-slate-300 placeholder-slate-400" : "bg-slate-950 border-slate-700 placeholder-slate-500"
                }`}
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                aria-label="Send"
                className={`rounded-lg px-3 py-2 text-sm font-semibold disabled:opacity-40 transition-opacity ${bubbleUser}`}
              >
                Send
              </button>
            </div>
            <p className={`mt-2 text-[10px] ${muted}`}>AI answers can be wrong — check the CV for details.</p>
          </form>
        </section>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? "Close chat" : "Ask about Rohit"}
        className={`flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold shadow-lg transition-transform hover:scale-105 ${bubbleUser}`}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        <span className="hidden sm:inline">{open ? "Close" : "Ask about Rohit"}</span>
      </button>
    </div>
  );
}
