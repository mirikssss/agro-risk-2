import { content } from '../landingContent'
import AnimateIn from '../components/AnimateIn'
import SectionHeading from '../components/SectionHeading'
import { EditorialSection, BentoGrid } from '../components/editorial'

/** Small NDVI-style bar strip for decoration */
function NdviBars() {
  const heights = [72, 68, 65, 58, 52, 48]
  return (
    <div className="flex items-end gap-0.5 h-8 mt-2" aria-hidden>
      {heights.map((h, i) => (
        <div
          key={i}
          className="w-1.5 rounded-sm bg-accent/40"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  )
}

export default function WhyUsPage() {
  const w = content.whyUs
  return (
    <div className="bg-[var(--color-bg)] satellite-grid">
      <EditorialSection>
        <AnimateIn from="top" duration={800}>
          <SectionHeading title={w.title} />
        </AnimateIn>

        <BentoGrid
          cells={[
            {
              span: 'lg',
              children: (
                <AnimateIn from="left" delay={100} duration={800}>
                  <div className="rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] p-6 md:p-8">
                    <h3 className="font-serif text-[var(--color-text)] text-xl md:text-2xl font-semibold mb-2">
                      Why satellites beat reports
                    </h3>
                    <p className="text-[15px] text-[var(--color-muted)] leading-[1.6] mb-4">{w.differentiator.desc}</p>
                    <NdviBars />
                  </div>
                </AnimateIn>
              ),
            },
            {
              span: 'md',
              children: (
                <AnimateIn from="bottom" delay={180} duration={800}>
                  <div className="rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] p-5 h-full">
                    <h4 className="font-semibold text-[var(--color-text)] mb-1">Model + Validation</h4>
                    <p className="text-[14px] text-[var(--color-muted)] leading-[1.55]">
                      Peer-reviewed remote sensing and validated anomaly detection. Reliability over hype.
                    </p>
                    <NdviBars />
                  </div>
                </AnimateIn>
              ),
            },
            {
              span: 'md',
              children: (
                <AnimateIn from="bottom" delay={220} duration={800}>
                  <div className="rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] p-5 h-full">
                    <h4 className="font-semibold text-[var(--color-text)] mb-1">Coverage + Updates</h4>
                    <p className="text-[14px] text-[var(--color-muted)] leading-[1.55]">
                      Continuous, objective coverage. No reliance on manual reports or government archives.
                    </p>
                    <NdviBars />
                  </div>
                </AnimateIn>
              ),
            },
            {
              span: 'sm',
              children: (
                <AnimateIn from="bottom" delay={260} duration={800}>
                  <div className="rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] p-4">
                    <h4 className="font-semibold text-[var(--color-text)] text-sm mb-1">API-ready</h4>
                    <p className="text-[13px] text-[var(--color-muted)]">Built for banks & insurers.</p>
                  </div>
                </AnimateIn>
              ),
            },
            {
              span: 'sm',
              children: (
                <AnimateIn from="bottom" delay={300} duration={800}>
                  <div className="rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] p-4">
                    <h4 className="font-semibold text-[var(--color-text)] text-sm mb-1">Explainable</h4>
                    <p className="text-[13px] text-[var(--color-muted)]">Human-readable alerts and scores.</p>
                  </div>
                </AnimateIn>
              ),
            },
            {
              span: 'sm',
              children: (
                <AnimateIn from="bottom" delay={340} duration={800}>
                  <div className="rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] p-4">
                    <h4 className="font-semibold text-[var(--color-text)] text-sm mb-1">Fast onboarding</h4>
                    <p className="text-[13px] text-[var(--color-muted)]">Pilot to integration in weeks.</p>
                  </div>
                </AnimateIn>
              ),
            },
          ]}
        />

        {/* Original cards from content (compact) */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {w.cards.map((c, i) => (
            <AnimateIn key={i} from="bottom" delay={400 + i * 60} duration={800}>
              <div className="rounded-xl border border-[var(--color-line)] bg-[var(--color-surfaceAlt)] p-5">
                {c.badge && (
                  <span className="text-[11px] font-semibold text-accent tracking-wider uppercase">{c.badge}</span>
                )}
                <h4 className="font-serif text-[var(--color-text)] font-semibold mt-1 mb-1">{c.title}</h4>
                <p className="text-[14px] text-[var(--color-muted)] leading-[1.55]">{c.desc}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </EditorialSection>
    </div>
  )
}
