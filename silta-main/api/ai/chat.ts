import type { Request, Response } from 'express';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';
import { FACTS } from '../../lib/agroRiskFacts.js';
import { AGRO_RISK_SYSTEM_PROMPT } from './systemPrompt.js';

/** Vercel serverless entry: deploy to Vercel → /api/ai/chat works without a separate server */
export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  await handleChat(req as unknown as Request, res as unknown as Response);
}

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
const MAX_HISTORY_TURNS = 10;

export async function handleChat(req: Request, res: Response): Promise<void> {
  if (!GEMINI_API_KEY) {
    res.status(500).json({ error: 'GEMINI_API_KEY is not configured.' });
    return;
  }

  const body = req.body as {
    message?: string;
    messages?: Array<{ role: 'user' | 'model'; parts: string }>;
    stream?: boolean;
  };
  const wantStream = Boolean(body.stream);
  let messages: Array<{ role: 'user' | 'model'; parts: string }> = body.messages ?? [];
  if (typeof body.message === 'string' && body.message.trim()) {
    messages = [...messages, { role: 'user', parts: body.message.trim() }];
  }
  const lastUser = messages.filter((m) => m.role === 'user').pop();
  const userText = typeof lastUser?.parts === 'string' ? lastUser.parts : '';
  if (!userText?.trim()) {
    res.status(400).json({ error: 'Missing or empty message.' });
    return;
  }

  const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
  const systemBlock =
    AGRO_RISK_SYSTEM_PROMPT +
    '\n\n---\nFACTS (your only source of truth; never invent data not present here):\n' +
    JSON.stringify(FACTS, null, 0);

  const history = messages.slice(-MAX_HISTORY_TURNS * 2).map((m) => ({
    role: m.role === 'model' ? 'model' : 'user',
    parts: [{ text: m.parts }],
  }));

  try {
    if (wantStream) {
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
      res.flushHeaders?.();

      const stream = await ai.models.generateContentStream({
        model: GEMINI_MODEL,
        contents: history,
        config: {
          systemInstruction: systemBlock,
          temperature: 0.4,
        },
      });

      for await (const chunk of stream) {
        const text = chunk.text;
        if (text) {
          res.write(`data: ${JSON.stringify({ delta: text })}\n\n`);
          (res as unknown as { flush?: () => void }).flush?.();
        }
      }
      res.write('data: [DONE]\n\n');
      res.end();
    } else {
      const result = await ai.models.generateContent({
        model: GEMINI_MODEL,
        contents: history,
        config: {
          systemInstruction: systemBlock,
          temperature: 0.4,
        },
      });
      const text = result.text ?? '';
      res.status(200).json({ text, message: text });
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    if (!res.headersSent) {
      res.status(500).json({ error: 'Chat failed.', details: message });
    } else {
      res.end();
    }
  }
}
