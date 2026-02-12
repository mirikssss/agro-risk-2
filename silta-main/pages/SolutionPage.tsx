import { content } from '../landingContent'
import AnimateIn from '../components/AnimateIn'
import { EditorialSection } from '../components/editorial'
import { SatelliteCoordinate } from '../components/SatelliteMarks'

export default function SolutionPage() {
  const s = content.solution
  const before = s.before
  const after = s.after
  const pillars = s.pillars ?? []
  const oneLiner = s.oneLiner ?? ''
  const subLong = s.subLong ?? ''
  const subSmall = s.subSmall ?? ''
  const source = s.sourceOfTruth

  return (
    <div className="bg-[var(--color-bg)] satellite-grid">
      <EditorialSection>
        <AnimateIn from="top" duration={800}>
          <h2 className="font-serif text-[var(--color-text)] text-[clamp(28px,4vw,44px)] font-semibold leading-[1.15] tracking-[-0.02em] mb-3">
            {s.sub}
          </h2>
          {subLong && (
            <p className="text-[17px] text-[var(--color-muted)] leading-[1.65] max-w-3xl">
              {subLong}
            </p>
          )}
          {subSmall && (
            <p className="text-[14px] text-[var(--color-muted)] mt-4 opacity-90">
              {subSmall}
            </p>
          )}
        </AnimateIn>

        {/* Source of truth: 100% satellite, 0 from bank/farmer */}
        {source && (
          <AnimateIn from="bottom" delay={120} duration={800}>
            <div className="mt-10 rounded-xl border border-[var(--color-after-border)] border-l-4 border-l-accent overflow-hidden bg-[var(--color-after)]">
              <div className="p-6 md:p-8">
                <p className="text-[11px] font-semibold text-accent tracking-widest uppercase mb-2">
                  {source.title}
                </p>
                <p className="text-[17px] font-semibold text-[var(--color-text)] leading-snug mb-4">
                  {source.lead}
                </p>
                <ul className="flex flex-wrap gap-x-6 gap-y-1 text-[14px] text-[var(--color-muted)] list-none p-0 m-0">
                  {source.points.map((point, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" aria-hidden />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AnimateIn>
        )}

        {/* Before (red) / With (green) */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-0 rounded-xl border overflow-hidden shadow-[0_2px_20px_rgba(20,20,20,0.06)] mt-12">
          <SatelliteCoordinate coordinate="p10 / p50 / p90" position="tr" className="hidden sm:block" />
          <AnimateIn from="left" delay={150} duration={800}>
            <div
              className="p-8 md:p-10 h-full border-r border-[var(--color-before-border)]"
              style={{ background: 'var(--color-before)' }}
            >
              <p className="text-[12px] font-semibold tracking-widest uppercase text-[var(--color-muted)] mb-3">
                {before.label}
              </p>
              {before.intro && (
                <p className="text-[15px] font-semibold text-[var(--color-text)] mb-4">{before.intro}</p>
              )}
              <ul className="space-y-3 list-none p-0 m-0">
                {before.items.map((it, i) => (
                  <li key={i} className="flex items-start gap-3 text-[15px] text-[var(--color-text)]">
                    <span className="w-2 h-2 rounded-full shrink-0 mt-1.5 bg-[#B23A3A]" aria-hidden />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          </AnimateIn>
          <AnimateIn from="right" delay={250} duration={800}>
            <div
              className="p-8 md:p-10 h-full border-t sm:border-t-0 sm:border-l border-[var(--color-after-border)]"
              style={{ background: 'var(--color-after)' }}
            >
              <p className="text-[12px] font-semibold tracking-widest uppercase text-accent mb-3">
                {after.label}
              </p>
              {after.intro && (
                <p className="text-[15px] font-semibold text-[var(--color-text)] mb-4">{after.intro}</p>
              )}
              <ul className="space-y-3 list-none p-0 m-0">
                {after.items.map((it, i) => (
                  <li key={i} className="flex items-start gap-3 text-[15px] text-[var(--color-text)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-1.5" aria-hidden />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          </AnimateIn>
        </div>

        {/* 3 Impact pillars */}
        {pillars.length > 0 && (
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((p: { title: string; sub: string; body: string }, i: number) => (
              <AnimateIn key={i} from="bottom" delay={300 + i * 80} duration={800}>
                <div className="rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] p-6 h-full flex flex-col">
                  <span className="text-[11px] font-semibold text-accent tracking-widest uppercase">
                    Pillar {i + 1}
                  </span>
                  <h3 className="font-serif text-[var(--color-text)] text-lg font-semibold mt-2 mb-2">
                    {p.title}
                  </h3>
                  <p className="text-[14px] font-medium text-[var(--color-text)] mb-2">{p.sub}</p>
                  <p className="text-[14px] text-[var(--color-muted)] leading-[1.55] mt-auto">{p.body}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        )}

        {/* One-liner */}
        {oneLiner && (
          <AnimateIn from="fade" delay={700} duration={800}>
            <p className="mt-12 text-center font-serif text-[var(--color-text)] text-lg md:text-xl font-semibold tracking-tight">
              {oneLiner}
            </p>
          </AnimateIn>
        )}
      </EditorialSection>
    </div>
  )
}
