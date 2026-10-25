# Rohit Jondhale — AI/ML Engineer portfolio

Next.js 16 site with hand-written canvas 3D visuals and an **"Ask about Rohit"** RAG chatbot.

```bash
npm install
npm run dev        # http://localhost:3000
npm run eval:chat  # offline chatbot eval (no keys needed)
```

## "Ask about Rohit" chatbot

A small retrieval-augmented assistant that answers visitors' questions from the CV and this site, with citations.

```
question ─► validate (≤500 chars, last 6 turns, per-IP rate limit)
         ─► BM25 retrieval over ~25 passages (CV + app/content.ts)
         ─► greeting / off-topic / injection?  → canned reply, no LLM call
         ─► Groq · GPT-OSS 120B (free tier)  → Claude API fallback → extractive answer
         ─► streamed text + X-Chat-Sources header → source chips in the UI
```

| File | Role |
| --- | --- |
| `app/content.ts` | Site content — rendered by the page **and** indexed by the bot, so they never disagree |
| `app/knowledge/cv.ts` | Curated CV passages (no address or phone) |
| `app/lib/retrieval.ts` | BM25 with stopwords, light stemming, title boost, query synonyms |
| `app/lib/chat.ts` | Validation, routing, grounded system prompt, provider chain, SSE parsing |
| `app/api/chat/route.ts` | `POST /api/chat` route handler |
| `app/ChatWidget.tsx` | Theme-aware floating chat panel with streaming and source chips |
| `scripts/eval-chat.mjs` | 43 offline checks: retrieval hit-rate, off-topic/injection routing, privacy, input limits |

**Why BM25, not embeddings?** The corpus is ~25 short passages. Keyword ranking with synonyms gets every eval question
right, costs nothing, needs no second API, and is deterministic, so it can be tested in CI.

### Configuration

Set in Vercel → Project → Settings → Environment Variables (see `.env.example`). Both are optional: with no keys the
bot returns the best-matching passage instead of a generated answer.

| Variable | Purpose |
| --- | --- |
| `GROQ_API_KEY` | Primary model, free tier — [console.groq.com/keys](https://console.groq.com/keys) |
| `ANTHROPIC_API_KEY` | Fallback when Groq is down or rate-limited |
| `GROQ_MODEL`, `ANTHROPIC_MODEL` | Optional model overrides |

The rate limiter is in-memory per server instance — enough for a portfolio; a global cap would need a KV store.
