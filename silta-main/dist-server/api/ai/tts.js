const DEEPGRAM_API_KEY = process.env.DEEPGRAM_API_KEY;
const DEEPGRAM_MODEL = process.env.DEEPGRAM_MODEL || 'aura-2-thalia-en';
const DEEPGRAM_ENCODING = process.env.DEEPGRAM_TTS_ENCODING || 'mp3';
export async function handleTts(req, res) {
    if (!DEEPGRAM_API_KEY) {
        res.status(500).json({ error: 'DEEPGRAM_API_KEY is not configured.' });
        return;
    }
    const { text } = req.body;
    const toSpeak = typeof text === 'string' ? text.trim() : '';
    if (!toSpeak) {
        res.status(400).json({ error: 'Missing or empty text.' });
        return;
    }
    const url = new URL('https://api.deepgram.com/v1/speak');
    url.searchParams.set('model', DEEPGRAM_MODEL);
    url.searchParams.set('encoding', DEEPGRAM_ENCODING);
    try {
        const response = await fetch(url.toString(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${DEEPGRAM_API_KEY}`,
            },
            body: JSON.stringify({ text: toSpeak }),
        });
        if (!response.ok) {
            const errText = await response.text();
            const status = response.status;
            const isAuth = status === 401 || status === 403;
            const hint = isAuth
                ? ' Check DEEPGRAM_API_KEY in silta-main/.env and restart the API server (stop and run npm run dev:api again).'
                : '';
            res.status(status).json({
                error: 'TTS request failed.' + hint,
                details: errText || response.statusText,
            });
            return;
        }
        const buffer = await response.arrayBuffer();
        const contentType = response.headers.get('content-type') || 'audio/mpeg';
        res.setHeader('Content-Type', contentType);
        res.setHeader('Content-Length', String(buffer.byteLength));
        res.end(Buffer.from(buffer));
    }
    catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        res.status(500).json({ error: 'TTS failed.', details: message });
    }
}
