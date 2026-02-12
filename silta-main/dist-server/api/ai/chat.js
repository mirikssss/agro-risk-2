import { GoogleGenAI } from '@google/genai';
import { FACTS } from '../../lib/agroRiskFacts.js';
import { AGRO_RISK_SYSTEM_PROMPT } from './systemPrompt.js';
/** Vercel serverless entry: deploy to Vercel → /api/ai/chat works without a separate server */
export default async function handler(req, res) {
    await handleChat(req, res);
}
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
const MAX_HISTORY_TURNS = 10;
export async function handleChat(req, res) {
    if (!GEMINI_API_KEY) {
        res.status(500).json({ error: 'GEMINI_API_KEY is not configured.' });
        return;
    }
    const body = req.body;
    const wantStream = Boolean(body.stream);
    let messages = body.messages ?? [];
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
    const systemBlock = AGRO_RISK_SYSTEM_PROMPT +
        '\n\n---\nFACTS (your only source of truth; never invent data not present here):\n' +
        JSON.stringify(FACTS, null, 0);
    const history = messages
        .slice(-MAX_HISTORY_TURNS * 2)
        .filter((m) => (m.role === 'model' ? String(m.parts ?? '').trim() : true))
        .map((m) => ({
        role: m.role === 'model' ? 'model' : 'user',
        parts: [{ text: String(m.parts ?? '').trim() }],
    }));
    try {
        const result = await ai.models.generateContent({
            model: GEMINI_MODEL,
            contents: history,
            config: {
                systemInstruction: systemBlock,
                temperature: 0.4,
            },
        });
        let text = result?.text;
        if (text === undefined && result && typeof result.text === 'string') {
            text = result.text;
        }
        if (text === undefined && result?.candidates?.[0]?.content?.parts) {
            text = result.candidates[0].content.parts
                .map((p) => (p && typeof p.text === 'string' ? p.text : ''))
                .join('');
        }
        const fullText = typeof text === 'string' ? text.trim() : '';
        if (wantStream) {
            res.setHeader('Content-Type', 'text/event-stream');
            res.setHeader('Cache-Control', 'no-cache');
            res.setHeader('Connection', 'keep-alive');
            res.flushHeaders?.();
            if (fullText) {
                res.write(`data: ${JSON.stringify({ delta: fullText })}\n\n`);
            }
            else {
                res.write(`data: ${JSON.stringify({ delta: 'I couldn\'t generate a response. Please try again or rephrase your question.' })}\n\n`);
            }
            res.write('data: [DONE]\n\n');
            res.end();
        }
        else {
            res.status(200).json({ text: fullText || '', message: fullText || '' });
        }
    }
    catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        if (!res.headersSent) {
            res.status(500).json({ error: 'Chat failed.', details: message });
        }
        else {
            res.end();
        }
    }
}
