# AgroRisk Investor/Jury AI Assistant

The **Ask AgroRisk AI** chat and voice assistant is powered by:

- **LLM:** Google Gemini 2.5 Flash (via `@google/genai`)
- **TTS:** Deepgram ([TTS REST API](https://developers.deepgram.com/reference/text-to-speech/speak-request))
- **ASR:** Browser Web Speech API (client-side; no server ASR)

Facts are taken from **`lib/agroRiskFacts.ts`** (single source of truth; same data is re-exported for the app in `components/facts.tsx`).

## Environment variables (server)

Set these for the **Node API server** (e.g. in `.env` in project root, or in your host’s env). Do **not** expose them to the client.

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | Yes (for chat) | Google AI Studio API key for Gemini |
| `GEMINI_MODEL` | No | Model name (default: `gemini-2.5-flash`) |
| `DEEPGRAM_API_KEY` | Yes (for voice) | [Deepgram](https://developers.deepgram.com/) API key (TTS) |
| `DEEPGRAM_MODEL` | No | TTS model (default: `aura-2-thalia-en`) |
| `DEEPGRAM_TTS_ENCODING` | No | Output encoding (default: `mp3`) |

## Running locally

1. Install deps: `npm install`
2. Build server TS: `npm run build:server`
3. Start API server: `npm run dev:api` (runs on port 3001)
4. Start Vite: `npm run dev:vite` (proxies `/api` to 3001)
5. Or run both: `npm run dev`

Without `GEMINI_API_KEY`, `/api/ai/chat` returns 500. Without `DEEPGRAM_API_KEY`, `/api/ai/tts` returns 500. The UI still loads; chat/voice will show an error if keys are missing.

## Deploy on Vercel (chat + TTS without a separate server)

The same `api/ai/chat.ts` and `api/ai/tts.ts` work as **Vercel Serverless Functions**. After deploy, `/api/ai/chat` and `/api/ai/tts` are served by Vercel; no Node server on port 3001 is needed.

1. Deploy the project to Vercel. If the repo root is the parent of `silta-main`, set **Root Directory** to `silta-main` in the Vercel project settings so that `api/` and the frontend build are found.
2. In the Vercel project: **Settings → Environment Variables** add:
   - `GEMINI_API_KEY` — Google AI Studio API key
   - `DEEPGRAM_API_KEY` — Deepgram API key (TTS)
3. Redeploy once after saving the variables (or enable “Redeploy when env changes”).

The frontend calls `/api/ai/chat` and `/api/ai/tts` on the same origin, so no proxy or CORS changes are needed.

## API routes

- **POST `/api/ai/chat`**  
  Body: `{ "message": "…" }` or `{ "messages": [{ "role": "user"|"model", "parts": "…" }], "stream": true }`  
  Response: JSON `{ "text": "…" }` or SSE stream (`data: {"delta":"…"}`).

- **POST `/api/ai/tts`**  
  Body: `{ "text": "…" }`  
  Response: `audio/mpeg` binary.

## System prompt and guardrails

The system prompt is in **`api/ai/systemPrompt.ts`**. It instructs the model to:

- Use only the provided **FACTS** object; never invent metrics or partnerships.
- Separate “ready now” vs “planned”.
- Explain p10/p50/p90 and model metrics from FACTS when asked.
- Use structured answers for “why better than competitors” (Data, Model, Product, Integration, Explainability).
- Not claim official ministry/bank partnerships unless stated in FACTS as signed/live.

Answers are grounded in the product brief only (no external citations).
