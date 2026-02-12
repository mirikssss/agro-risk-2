import { content } from '../landingContent'
import AnimateIn from '../components/AnimateIn'
import SectionHeading from '../components/SectionHeading'
import { EditorialSection, SplitHero, EvidencePanel } from '../components/editorial'
import { SatelliteSensorBadge } from '../components/SatelliteMarks'

export default function ProblemPage() {
  const p = content.problem
  return (
    <div className="bg-[var(--color-bg)] satellite-grid">
      <EditorialSection>
        <div className="relative">
          <SatelliteSensorBadge sensor="EO" position="tr" className="hidden sm:block" />
          <AnimateIn from="top" duration={800}>
            <SectionHeading title="The Problem" subtitle={p.bankNeed} />
          </AnimateIn>

        <SplitHero
          left={
            <div className="pl-0">
              <p className="text-[11px] font-semibold text-[var(--color-muted)] tracking-widest uppercase mb-6">
                Why portfolios are at risk
              </p>
              <div className="space-y-6 border-l-2 border-[var(--color-line)] pl-6">
                {p.reasons.map((r, i) => (
                  <AnimateIn key={i} from="left" delay={100 + i * 80} duration={700}>
                    <div className="relative -left-[30px] flex gap-3">
                      <span className="w-6 h-6 rounded-full border-2 border-[var(--color-text)] bg-[var(--color-bg)] flex items-center justify-center text-[11px] font-semibold shrink-0">
                        {i + 1}
                      </span>
                      <div>
                        <h3 className="text-[15px] font-semibold text-[var(--color-text)] mb-1">{r.title}</h3>
                        <p className="text-[14px] text-[var(--color-muted)] leading-[1.55]">{r.desc}</p>
                      </div>
                    </div>
                  </AnimateIn>
                ))}
              </div>
            </div>
          }
          right={
            <div className="space-y-6">
              <AnimateIn from="right" delay={200} duration={800}>
                <EvidencePanel
                  highlight={p.kpi}
                  label={p.kpiLabel}
                  footnote={p.kpiFootnote}
                />
              </AnimateIn>
              <AnimateIn from="right" delay={280} duration={800}>
                <div className="rounded-xl border-l-4 border-accent bg-[var(--color-surfaceAlt)] p-5 text-[15px] text-[var(--color-text)] leading-[1.6] italic">
                  &ldquo;{p.bankNeed}&rdquo;
                </div>
              </AnimateIn>
            </div>
          }
        />

        {/* Callout banner */}
        <AnimateIn from="bottom" delay={350} duration={800}>
          <div className="mt-14 rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] px-6 py-5 md:px-8 md:py-6 flex flex-col md:flex-row md:items-center gap-4">
            <span className="text-[11px] font-semibold text-accent tracking-widest uppercase shrink-0">
              Why now · What changes with satellites
            </span>
            <p className="text-[15px] text-[var(--color-muted)] leading-[1.6] m-0">
              Continuous, objective coverage from space removes reliance on self-reporting and infrequent inspections. Banks and insurers can act on early signals—weeks before losses materialize.
            </p>
          </div>
        </AnimateIn>
        </div>
      </EditorialSection>
    </div>
  )
}
