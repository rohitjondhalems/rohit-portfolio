/**
 * BM25 retrieval over the knowledge base. ~40 short chunks, so a keyword index built once
 * per server instance is fast, free and deterministic — no embedding API needed.
 */
import { knowledgeBase, type KnowledgeEntry } from "./knowledge";

const STOPWORDS = new Set(
  ("a an and are as at be been but by can could did do does for from had has have he her his how i if in into is it " +
    "its me my of on or our she so than that the their them then there these they this to was we were what when where " +
    "which who whom why will with would you your about tell rohit rohits jondhale him please any some much many also write print give show")
    .split(" "),
);

// Query-side synonyms so recruiter phrasing hits CV wording.
const SYNONYMS: Record<string, string[]> = {
  job: ["experience", "role"], work: ["experience"], worked: ["experience"], employer: ["experience"],
  company: ["experience"], current: ["present"], currently: ["present"], now: ["present"],
  study: ["education"], studied: ["education"], degree: ["education", "ms", "tech"], university: ["education"],
  college: ["education"], qualification: ["education", "certification"], certificate: ["certification"],
  certified: ["certification"], contact: ["email", "linkedin"], reach: ["contact", "email"], hire: ["contact"],
  email: ["contact"], phone: ["contact"], mcp: ["invoicelens"], forecast: ["forecasting"], llm: ["genai", "llms"],
  genai: ["generative"], agent: ["agents", "langgraph"], agentic: ["agents"], cloud: ["azure", "aws"],
  years: ["experience"], skill: ["skills"], tech: ["skills"], stack: ["skills"], tools: ["skills"],
  bot: ["chatbot"], chatbot: ["chatbot"], located: ["based"], location: ["based"], live: ["based"],
};

function stem(t: string): string {
  if (t.length > 5 && t.endsWith("ing")) return t.slice(0, -3);
  if (t.length > 4 && t.endsWith("ies")) return t.slice(0, -3) + "y";
  if (t.length > 4 && t.endsWith("es") && !t.endsWith("ses")) return t.slice(0, -2);
  if (t.length > 3 && t.endsWith("s") && !t.endsWith("ss")) return t.slice(0, -1);
  if (t.length > 5 && t.endsWith("ed")) return t.slice(0, -2);
  return t;
}

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[’']/g, "")
    .split(/[^a-z0-9+#.]+/)
    .map((t) => t.replace(/^\.+|\.+$/g, ""))
    .filter((t) => t.length > 1 && !STOPWORDS.has(t))
    .map(stem);
}

type Doc = { entry: KnowledgeEntry; tf: Map<string, number>; len: number };

const K1 = 1.4;
const B = 0.6;
const TITLE_WEIGHT = 3; // title tokens count three times

function buildIndex(entries: KnowledgeEntry[]) {
  const docs: Doc[] = entries.map((entry) => {
    const toks = [
      ...Array.from({ length: TITLE_WEIGHT }, () => tokenize(entry.title)).flat(),
      ...tokenize(`${entry.section} ${entry.text}`),
    ];
    const tf = new Map<string, number>();
    toks.forEach((t) => tf.set(t, (tf.get(t) ?? 0) + 1));
    return { entry, tf, len: toks.length };
  });
  const df = new Map<string, number>();
  docs.forEach((d) => d.tf.forEach((_, t) => df.set(t, (df.get(t) ?? 0) + 1)));
  const avgLen = docs.reduce((s, d) => s + d.len, 0) / Math.max(1, docs.length);
  return { docs, df, avgLen, N: docs.length };
}

const index = buildIndex(knowledgeBase);

export type Hit = { entry: KnowledgeEntry; score: number };

export function expandQuery(query: string): string[] {
  const base = tokenize(query);
  const extra = base.flatMap((t) => (SYNONYMS[t] ?? []).map(stem));
  return [...new Set([...base, ...extra])];
}

export function search(query: string, k = 4): Hit[] {
  const terms = expandQuery(query);
  if (!terms.length) return [];
  const { docs, df, avgLen, N } = index;
  const scored = docs.map((d) => {
    let score = 0;
    for (const t of terms) {
      const f = d.tf.get(t);
      if (!f) continue;
      const n = df.get(t) ?? 0;
      const idf = Math.log(1 + (N - n + 0.5) / (n + 0.5));
      score += idf * ((f * (K1 + 1)) / (f + K1 * (1 - B + (B * d.len) / avgLen)));
    }
    return { entry: d.entry, score };
  });
  return scored.filter((h) => h.score > 0).sort((a, b) => b.score - a.score).slice(0, k);
}

/** Below this top score the question is treated as off-topic and no LLM is called. */
export const MIN_SCORE = 1.5;
