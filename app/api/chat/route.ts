/**
 * POST /api/chat — the "Ask about Rohit" chatbot.
 *
 * Request:  { messages: [{ role: "user" | "assistant", content: string }, ...] }
 * Response: streamed text/plain answer. Headers:
 *   X-Chat-Sources  — URI-encoded JSON [{ n, id, title }] of the passages given to the model
 *   X-Chat-Provider — groq | claude | extractive | canned
 */
import { answer, CANNED, parseMessages, retrieve, textStream } from "../../lib/chat";

export const maxDuration = 30;

// Per-instance, in-memory limiter: good enough to stop casual abuse of a portfolio bot.
// (Serverless instances don't share memory; a hard global cap would need a KV store.)
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 20;
const hitsByIp = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hitsByIp.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hitsByIp.set(ip, recent);
  if (hitsByIp.size > 5000) hitsByIp.clear();
  return recent.length > MAX_PER_WINDOW;
}

function textResponse(stream: ReadableStream<Uint8Array>, provider: string, sources: unknown[] = [], status = 200) {
  return new Response(stream, {
    status,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Chat-Provider": provider,
      "X-Chat-Sources": encodeURIComponent(JSON.stringify(sources)),
    },
  });
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) {
    return Response.json(
      { error: "You've asked a lot of questions in a short time — please try again in a few minutes." },
      { status: 429 },
    );
  }

  let body: unknown;
  try { body = await request.json(); } catch { return Response.json({ error: "Invalid JSON." }, { status: 400 }); }
  const messages = parseMessages(body);
  if (typeof messages === "string") return Response.json({ error: messages }, { status: 400 });

  const { hits, kind } = retrieve(messages);
  if (kind !== "grounded") return textResponse(textStream(CANNED[kind]), "canned");

  const sources = hits.map((h, i) => ({ n: i + 1, id: h.entry.id, title: h.entry.title }));
  const { provider, stream } = await answer(messages, hits);
  return textResponse(stream, provider, sources);
}
