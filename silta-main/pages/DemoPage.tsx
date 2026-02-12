import { content, DEMO_URL } from '../landingContent'
import AnimateIn from '../components/AnimateIn'
import SectionHeading from '../components/SectionHeading'
import Button from '../components/Button'
import { EditorialSection } from '../components/editorial'
export default function DemoPage() {
  const d = content.demo
  const openAssistant = () => window.dispatchEvent(new CustomEvent('open-agrorisk-assistant'))
  return (
    <div className="bg-[var(--color-bg)] satellite-grid">
      <EditorialSection>
        <AnimateIn from="top" duration={800}>
          <SectionHeading title={d.title} subtitle={d.sub} />
        </AnimateIn>

        {/* Interactive mock: one frame */}
        <AnimateIn from="bottom" delay={200} duration={800}>
          <div className="relative rounded-xl border border-[var(--color-line)] overflow-hidden bg-[var(--color-surface)] shadow-[0_2px_20px_rgba(20,20,20,0.06)]">
            <div className="flex items-center gap-2 py-3 px-5 border-b border-[var(--color-line)] bg-[var(--color-surfaceAlt)]">
              <span className="w-3 h-3 rounded-full bg-[#ff5f57] shadow-[inset_0_1px_0_rgba(0,0,0,0.1)]" title="Close" />
              <span className="w-3 h-3 rounded-full bg-[#febc2e] shadow-[inset_0_1px_0_rgba(0,0,0,0.1)]" title="Minimize" />
              <span className="w-3 h-3 rounded-full bg-[#28c840] shadow-[inset_0_1px_0_rgba(0,0,0,0.1)]" title="Zoom" />
              <span className="text-[12px] text-[var(--color-muted)] ml-3">dashboard.agrorisk.io</span>
              <span className="ml-auto text-[10px] font-mono text-accent/80 tracking-wider">Live · NDVI</span>
            </div>
            <div className="p-5 grid grid-cols-3 gap-3">
              {[
                { title: 'Yield forecast', value: '2.7 t/ha', sub: 'p50 anomaly +9.0%' },
                { title: 'Yield anomaly', value: '+9.0%', sub: 'vs 5‑yr average' },
                { title: 'Field risk', value: 'Low', sub: 'Satellite-based' },
                { title: 'Trend dynamics', value: 'Improving', sub: 'NDVI slope +0.008' },
                { title: 'Climatic stress', value: 'HTC 0.75', sub: 'Normal' },
                { title: 'Confidence', value: '±3.1%', sub: 'Anomaly range 6.3–9.4%' },
              ].map((card, i) => (
                <div key={i} className="rounded-lg bg-[var(--color-surfaceAlt)] border border-[var(--color-line)] p-3 flex flex-col justify-between min-h-[72px]">
                  <p className="text-[10px] font-semibold text-[var(--color-muted)] uppercase tracking-wider">
                    {card.title}
                  </p>
                  <p className="text-[15px] font-semibold text-[var(--color-text)] leading-tight mt-0.5">
                    {card.value}
                  </p>
                  <p className="text-[11px] text-[var(--color-muted)] mt-1">
                    {card.sub}
                  </p>
                </div>
              ))}
            </div>
            <div className="mx-5 mb-5 rounded-xl overflow-hidden border border-[var(--color-line)] bg-black aspect-video">
              <iframe
                src="https://www.youtube.com/embed/7GL3GYlno1o"
                title="AgroRisk - платформа для прогноза урожайности для агрокредитования"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </AnimateIn>

        {/* What you'll see — 3 bullets */}
        <AnimateIn from="bottom" delay={320} duration={800}>
          <p className="mt-6 text-[12px] font-semibold text-[var(--color-muted)] uppercase tracking-wider mb-3">
            What you&apos;ll see
          </p>
          <ul className="space-y-2 text-[15px] text-[var(--color-text)]">
            {d.features.slice(0, 3).map((f, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-accent shrink-0">•</span>
                {f}
              </li>
            ))}
          </ul>
        </AnimateIn>

        <AnimateIn from="fade" delay={450} duration={800}>
          <div className="flex flex-wrap gap-3 mt-8">
            <Button href={DEMO_URL} variant="outline">{d.ctaDashboard}</Button>
            <Button href={DEMO_URL} variant="primary">{d.ctaLive}</Button>
            <button
              type="button"
              onClick={openAssistant}
              className="px-5 py-2.5 rounded-xl font-semibold text-[14px] border-2 border-[var(--color-accent)] text-[var(--color-accent)] bg-transparent hover:bg-[var(--color-accent)]/10 transition-colors"
            >
              Ask AgroRisk AI
            </button>
          </div>
          <p className="mt-4 text-[13px] text-[var(--color-muted)]">
            This is a UI mock. Request a live demo for real satellite data.
          </p>
        </AnimateIn>
      </EditorialSection>
    </div>
  )
}
