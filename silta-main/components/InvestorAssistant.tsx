import React, { useState, useRef, useEffect, useCallback } from 'react';

const QUICK_PROMPTS = [
  'How does it work?',
  'Why better than competitors?',
  'What data do you use?',
  'Explain p10/p50/p90',
  "What's ready today?",
];

type Message = { role: 'user' | 'model'; parts: string };

const API_BASE = '';

/** Renders assistant text with **bold** and * bullets. */
function formatAssistantText(text: string): React.ReactNode {
  const lines = text.split(/\n/);
  return lines.map((line, i) => {
    const isBullet = /^\s*\*\s+/.test(line);
    const content = isBullet ? line.replace(/^\s*\*\s+/, '').trim() : line;
    if (!content && !isBullet) return <br key={i} />;
    const parts: React.ReactNode[] = [];
    let pos = 0;
    const re = /\*\*([^*]+)\*\*/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(content)) !== null) {
      if (m.index > pos) parts.push(content.slice(pos, m.index));
      parts.push(<strong key={`${i}-${m.index}`}>{m[1]}</strong>);
      pos = m.index + m[0].length;
    }
    if (pos < content.length) parts.push(content.slice(pos));
    const block = parts.length === 1 && typeof parts[0] === 'string' ? parts[0] : <span>{parts}</span>;
    if (isBullet) {
      return (
        <div key={i} className="flex gap-2 mt-1 first:mt-0">
          <span className="shrink-0 text-[var(--color-accent)]">•</span>
          <span>{block}</span>
        </div>
      );
    }
    return (
      <div key={i} className="mt-1 first:mt-0">{block}</div>
    );
  });
}

export default function InvestorAssistant({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [voiceMode, setVoiceMode] = useState(false);
  const [recording, setRecording] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const [panelVisible, setPanelVisible] = useState(false);
  const [pendingTts, setPendingTts] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<{ id: number | null }>({ id: null });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingText, scrollToBottom]);

  useEffect(() => {
    if (open) {
      const t = requestAnimationFrame(() => requestAnimationFrame(() => setPanelVisible(true)));
      return () => cancelAnimationFrame(t);
    }
    setPanelVisible(false);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;
      setInput('');
      const userMsg: Message = { role: 'user', parts: trimmed };
      setMessages((m) => [...m, userMsg]);
      setLoading(true);
      setStreamingText('');

      const history = [...messages, userMsg]
        .filter((x) => (x.role === 'model' ? String(x.parts ?? '').trim() : true))
        .map((x) => ({ role: x.role, parts: x.parts }));

      try {
        const res = await fetch(`${API_BASE}/api/ai/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: history, stream: true }),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({ error: res.statusText }));
          const msg = res.status === 404
            ? 'API not found. Start the dev server (npm run dev from project root) and run "npm run build:server" in silta-main. Check the terminal where the API runs (port 3001).'
            : `Error ${res.status}: ${err.error || res.statusText}`;
          setMessages((m) => [...m, { role: 'model', parts: msg }]);
          return;
        }
        if (!res.body) {
          setMessages((m) => [...m, { role: 'model', parts: 'Empty response from server.' }]);
          return;
        }
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let full = '';
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n');
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') continue;
              try {
                const parsed = JSON.parse(data) as { delta?: string };
                if (parsed.delta) {
                  full += parsed.delta;
                  setStreamingText(full);
                }
              } catch {
                /* ignore */
              }
            }
          }
        }
        const finalText = full.trim();
        if (!voiceMode) {
          if (finalText) {
            setMessages((m) => [...m, { role: 'model', parts: finalText }]);
          } else {
            setMessages((m) => [...m, { role: 'model', parts: 'The server did not return a response. Please try again or check that the API (Gemini) is configured on the server.' }]);
          }
        }
        setStreamingText('');
        if (voiceMode && finalText) setPendingTts(finalText);
      } catch (e) {
        setMessages((m) => [
          ...m,
          { role: 'model', parts: `Network error: ${e instanceof Error ? e.message : 'Unknown'}` },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [loading, messages, voiceMode]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const startRecording = useCallback(() => {
    const Win = window as unknown as {
      SpeechRecognition?: new () => { start: () => void; onresult: (e: { resultIndex: number; results: { isFinal: boolean; [0]: { transcript: string } }[] }) => void; onend: () => void; onerror: () => void };
      webkitSpeechRecognition?: new () => { start: () => void; onresult: (e: { resultIndex: number; results: { isFinal: boolean; [0]: { transcript: string } }[] }) => void; onend: () => void; onerror: () => void };
    };
    const SR = Win.SpeechRecognition || Win.webkitSpeechRecognition;
    if (!SR) {
      setMessages((m) => [...m, { role: 'model', parts: 'Voice input is not supported in this browser. Use Chrome or Edge.' }]);
      return;
    }
    const rec = new SR() as unknown as { start: () => void; continuous: boolean; interimResults: boolean; lang: string; onresult: (e: { resultIndex: number; results: { isFinal: boolean; [0]: { transcript: string } }[] }) => void; onend: () => void; onerror: () => void };
    rec.continuous = false;
    rec.interimResults = false;
    rec.lang = 'en-US';
    let finalTranscript = '';
    rec.onresult = (event: { resultIndex: number; results: { isFinal: boolean; [0]: { transcript: string } }[] }) => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) finalTranscript += event.results[i][0].transcript;
      }
    };
    rec.onend = () => {
      setRecording(false);
      stopWaveform();
      if (finalTranscript.trim()) sendMessage(finalTranscript.trim());
    };
    rec.onerror = () => setRecording(false);
    rec.start();
    setRecording(true);
    startWaveformFromMic();
  }, [sendMessage]);

  const stopWaveform = useCallback(() => {
    if (animationFrameRef.current.id !== null) {
      cancelAnimationFrame(animationFrameRef.current.id);
      animationFrameRef.current.id = null;
    }
    analyserRef.current = null;
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((t) => t.stop());
      mediaStreamRef.current = null;
    }
  }, []);

  const getCanvasColors = useCallback(() => {
    const el = canvasRef.current ?? document.documentElement;
    const style = getComputedStyle(el);
    return {
      bg: style.getPropertyValue('--color-bg').trim() || '#F6F1E8',
      accent: style.getPropertyValue('--color-accent').trim() || '#2F6F4E',
    };
  }, []);

  const startWaveformFromMic = useCallback(() => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      mediaStreamRef.current = stream;
      const ctx = new AudioContext();
      const src = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 64;
      src.connect(analyser);
      analyserRef.current = analyser;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const draw = () => {
        if (!analyserRef.current || !canvas) return;
        const data = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(data);
        const g = canvas.getContext('2d');
        if (!g) return;
        const { bg, accent } = getCanvasColors();
        g.fillStyle = bg;
        g.fillRect(0, 0, canvas.width, canvas.height);
        g.fillStyle = accent;
        const w = canvas.width / data.length;
        for (let i = 0; i < data.length; i++) {
          const h = (data[i] / 255) * canvas.height * 0.8;
          g.fillRect(i * w, (canvas.height - h) / 2, Math.max(1, w - 1), h);
        }
        animationFrameRef.current.id = requestAnimationFrame(draw);
      };
      draw();
    }).catch(() => {});
  }, [getCanvasColors]);

  const startWaveformFromAudio = useCallback((audio: HTMLAudioElement) => {
    const ctx = new AudioContext();
    const src = ctx.createMediaElementSource(audio);
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 64;
    src.connect(analyser);
    if (ctx.destination) analyser.connect(ctx.destination);
    analyserRef.current = analyser;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const draw = () => {
      if (!analyserRef.current || !canvas) return;
      const data = new Uint8Array(analyserRef.current.frequencyBinCount);
      analyserRef.current.getByteFrequencyData(data);
      const g = canvas.getContext('2d');
      if (!g) return;
      const { bg, accent } = getCanvasColors();
      g.fillStyle = bg;
      g.fillRect(0, 0, canvas.width, canvas.height);
      g.fillStyle = accent;
      const w = canvas.width / data.length;
      for (let i = 0; i < data.length; i++) {
        const h = (data[i] / 255) * canvas.height * 0.8;
        g.fillRect(i * w, (canvas.height - h) / 2, Math.max(1, w - 1), h);
      }
      animationFrameRef.current.id = requestAnimationFrame(draw);
    };
    draw();
  }, [getCanvasColors]);

  const playTts = useCallback(async (text: string) => {
    if (playing) return;
    setPlaying(true);
    try {
      const res = await fetch(`${API_BASE}/api/ai/tts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) {
        setPlaying(false);
        return;
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audio.playbackRate = 1.25;
      (audioRef as React.MutableRefObject<HTMLAudioElement | null>).current = audio;
      audio.onended = () => {
        URL.revokeObjectURL(url);
        if (animationFrameRef.current.id !== null) {
          cancelAnimationFrame(animationFrameRef.current.id);
          animationFrameRef.current.id = null;
        }
        analyserRef.current = null;
        setPlaying(false);
      };
      setTimeout(() => {
        const c = canvasRef.current;
        if (c) startWaveformFromAudio(audio);
      }, 80);
      audio.play();
    } catch {
      setPlaying(false);
    }
  }, [playing, startWaveformFromAudio]);

  useEffect(() => {
    if (pendingTts && !playing) {
      playTts(pendingTts);
      setPendingTts(null);
    }
  }, [pendingTts, playing, playTts]);

  const showWaveform = recording || playing;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end pointer-events-none"
      style={{ pointerEvents: open ? 'auto' : 'none' }}
      role="dialog"
      aria-modal="true"
      aria-label="AgroRisk AI Assistant"
      aria-hidden={!open}
    >
      {/* Backdrop — click to close */}
      <div
        className="absolute inset-0 bg-black/40 transition-opacity duration-300"
        style={{ opacity: open ? 1 : 0 }}
        onClick={onClose}
        aria-hidden
      />
      {/* Panel: 50% width, slide in from right with smooth transition */}
      <div
        className="relative z-10 w-full max-w-[50vw] min-w-[320px] h-full bg-[var(--color-surface)] border-l border-[var(--color-line)] shadow-2xl flex flex-col transition-[transform] duration-300 ease-out"
        style={{ transform: open && panelVisible ? 'translateX(0)' : 'translateX(100%)' }}
      >
        <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--color-line)] shrink-0">
          <h2 className="font-semibold text-[17px] text-[var(--color-text)]">Ask AgroRisk AI</h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setVoiceMode((v) => !v)}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${voiceMode ? 'bg-[var(--color-accent)] text-white' : 'border border-[var(--color-line)] text-[var(--color-muted)] hover:bg-[var(--color-surfaceAlt)]'}`}
              aria-label={voiceMode ? 'Switch to chat' : 'Voice mode'}
              title={voiceMode ? 'Chat' : 'Voice'}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5-3c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/></svg>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full border border-[var(--color-line)] flex items-center justify-center text-[var(--color-muted)] hover:bg-[var(--color-surfaceAlt)]"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>

        {voiceMode ? (
          /* Voice-only UI (ChatGPT style): only waveform + mic + stop */
          <>
            <div className="flex-1 flex flex-col items-center justify-center min-h-0 px-6">
              <div className="relative flex items-center justify-center w-full max-w-sm h-24 rounded-2xl bg-[var(--color-surfaceAlt)] border border-[var(--color-line)]">
                <div className="absolute inset-0 flex items-center justify-center gap-1.5 px-4" aria-hidden>
                  {[...Array(20)].map((_, i) => (
                    <span
                      key={i}
                      className="w-2 rounded-full bg-[var(--color-accent)] animate-voice-bar"
                      style={{ height: 32, animationDelay: `${i * 0.05}s` }}
                    />
                  ))}
                </div>
                <canvas
                  ref={canvasRef}
                  width={320}
                  height={96}
                  className="relative z-10 w-full h-full max-w-sm rounded-2xl bg-transparent"
                  aria-hidden
                />
              </div>
              <p className="mt-4 text-[13px] text-[var(--color-muted)]">
                {recording ? 'Listening…' : playing ? 'Playing…' : 'Tap mic to ask'}
              </p>
            </div>
            <div className="p-6 flex items-center justify-center gap-4 border-t border-[var(--color-line)]">
              <button
                type="button"
                onClick={() => {
                  if (playing && audioRef.current) {
                    audioRef.current.pause();
                    audioRef.current.currentTime = 0;
                    setPlaying(false);
                    stopWaveform();
                  }
                  if (recording) {
                    mediaStreamRef.current?.getTracks().forEach((t) => t.stop());
                    mediaStreamRef.current = null;
                    setRecording(false);
                    stopWaveform();
                  }
                }}
                disabled={!recording && !playing}
                className="w-14 h-14 rounded-full border-2 border-[var(--color-line)] flex items-center justify-center text-[var(--color-muted)] hover:border-[var(--color-text)] hover:text-[var(--color-text)] disabled:opacity-40 disabled:pointer-events-none transition-colors"
                aria-label="Stop"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden><rect x="6" y="6" width="12" height="12" rx="2"/></svg>
              </button>
              <button
                type="button"
                onClick={recording ? undefined : startRecording}
                disabled={loading || playing}
                className={`w-16 h-16 rounded-full flex items-center justify-center shrink-0 transition-transform hover:scale-105 ${
                  recording ? 'bg-red-500 text-white' : 'bg-[var(--color-accent)] text-white hover:opacity-90'
                } disabled:opacity-50`}
                aria-label={recording ? 'Recording' : 'Record'}
              >
                {recording ? (
                  <span className="w-5 h-5 rounded-full bg-white animate-pulse" />
                ) : (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5-3c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/></svg>
                )}
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Voice waveform strip (when not in voice-only mode) */}
            {showWaveform && (
              <div className="relative flex items-center justify-center h-16 px-4 bg-[var(--color-surfaceAlt)] border-b border-[var(--color-line)] shrink-0">
                <div className="absolute inset-0 flex items-center justify-center gap-1.5 px-4" aria-hidden>
                  {[...Array(14)].map((_, i) => (
                    <span key={i} className="w-1.5 rounded-full bg-[var(--color-accent)] animate-voice-bar" style={{ height: 24, animationDelay: `${i * 0.06}s` }} />
                  ))}
                </div>
                <canvas ref={canvasRef} width={280} height={48} className="relative z-10 w-full max-w-[280px] h-12 rounded bg-transparent" aria-hidden />
              </div>
            )}

            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 min-h-0">
              {messages.length === 0 && !streamingText && (
                <p className="text-[14px] text-[var(--color-muted)] animate-message-in">Ask anything about AgroRisk: product, data, model, roadmap, or how we compare.</p>
              )}
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-message-in`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[14px] ${
                      msg.role === 'user' ? 'bg-[var(--color-accent2)] text-white' : 'bg-[var(--color-surfaceAlt)] text-[var(--color-text)] border border-[var(--color-line)]'
                    }`}
                  >
                    <div className="break-words">{formatAssistantText(msg.parts)}</div>
                    {msg.role === 'model' && (
                      <button type="button" onClick={() => playTts(msg.parts)} disabled={playing} className="mt-2 text-[12px] text-[var(--color-accent)] hover:underline disabled:opacity-50">
                        {playing ? 'Playing…' : 'Play answer'}
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {streamingText && (
                <div className="flex justify-start animate-message-in">
                  <div className="max-w-[85%] rounded-2xl px-4 py-2.5 text-[14px] bg-[var(--color-surfaceAlt)] text-[var(--color-text)] border border-[var(--color-line)]">
                    <div className="break-words">{formatAssistantText(streamingText)}</div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-3 border-t border-[var(--color-line)] space-y-2 shrink-0">
              <div className="flex flex-wrap gap-2">
                {QUICK_PROMPTS.map((q) => (
                  <button key={q} type="button" onClick={() => sendMessage(q)} disabled={loading} className="text-[12px] px-3 py-1.5 rounded-full border border-[var(--color-line)] bg-[var(--color-surfaceAlt)] text-[var(--color-text)] hover:border-[var(--color-accent)] disabled:opacity-50">
                    {q}
                  </button>
                ))}
              </div>
              <form onSubmit={handleSubmit} className="flex gap-2 items-center">
                <div className="flex-1 flex items-center rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)]">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask anything about AgroRisk…"
                    className="flex-1 min-w-0 px-4 py-3 text-[14px] bg-transparent border-0 outline-none text-[var(--color-text)] placeholder-[var(--color-muted)]"
                    disabled={loading}
                  />
                </div>
                <button type="submit" disabled={loading || !input.trim()} className="shrink-0 px-4 py-3 rounded-xl font-medium text-[14px] bg-[var(--color-accent2)] text-white hover:opacity-90 disabled:opacity-50">
                  {loading ? '…' : 'Send'}
                </button>
              </form>
              <p className="text-[11px] text-[var(--color-muted)]">Answers grounded in our product brief</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export { QUICK_PROMPTS };
