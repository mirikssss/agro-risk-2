import { content } from '../landingContent'
import AnimateIn from '../components/AnimateIn'
import SectionHeading from '../components/SectionHeading'
import { EditorialSection } from '../components/editorial'

export default function HowPage() {
  const { title, sub, steps } = content.how

  return (
    <div className="bg-[var(--color-bg)] satellite-grid">
      <EditorialSection>
        <AnimateIn from="top" duration={800}>
          <SectionHeading title={title} subtitle={sub} />
        </AnimateIn>

        <div className="relative mt-12">
          {/* Vertical line (desktop) */}
          <div
            className="absolute top-0 bottom-0 left-1/2 w-px -translate-x-px hidden md:block"
            style={{ background: 'var(--color-line)' }}
          />

          {steps.map((s, i) => {
            const isLeft = i % 2 === 0
            return (
              <div key={i} className="relative flex flex-row gap-4 md:gap-0 mb-16 md:mb-28 last:mb-0 md:items-center">
                {/* Left half */}
                <div className={`flex-1 md:w-1/2 flex-shrink-0 ${isLeft ? 'pl-14 md:pl-0 md:pr-14' : 'hidden md:block'}`}>
                  {isLeft && (
                    <AnimateIn from="left" delay={120 + i * 120} duration={800}>
                      <div className="rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] p-8 md:p-10 shadow-[0_2px_20px_rgba(20,20,20,0.06)]">
                        <span className="text-[11px] font-semibold text-accent tracking-widest uppercase">
                          Step {s.step} — {s.tag}
                        </span>
                        <h3 className="font-serif text-[var(--color-text)] font-semibold mt-3 mb-4 leading-tight" style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>
                          {s.title}
                        </h3>
                        <p className="text-[17px] text-[var(--color-muted)] leading-[1.65]">{s.desc}</p>
                      </div>
                    </AnimateIn>
                  )}
                </div>

                {/* Center node */}
                <div className="absolute left-0 md:left-1/2 top-6 md:top-1/2 md:-translate-y-1/2 md:-translate-x-1/2 w-12 h-12 rounded-full border-2 border-accent bg-[var(--color-bg)] flex items-center justify-center font-serif font-semibold text-[var(--color-text)] text-lg z-10 shrink-0 mt-2 md:mt-0">
                  {s.step}
                </div>

                {/* Right half */}
                <div className={`flex-1 md:w-1/2 flex-shrink-0 pl-16 md:pl-14 ${!isLeft ? '' : 'hidden md:block'}`}>
                  {!isLeft && (
                    <AnimateIn from="right" delay={120 + i * 120} duration={800}>
                      <div className="rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] p-8 md:p-10 shadow-[0_2px_20px_rgba(20,20,20,0.06)]">
                        <span className="text-[11px] font-semibold text-accent tracking-widest uppercase">
                          Step {s.step} — {s.tag}
                        </span>
                        <h3 className="font-serif text-[var(--color-text)] font-semibold mt-3 mb-4 leading-tight" style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>
                          {s.title}
                        </h3>
                        <p className="text-[17px] text-[var(--color-muted)] leading-[1.65]">{s.desc}</p>
                      </div>
                    </AnimateIn>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Diagram */}
        <AnimateIn from="bottom" delay={400} duration={800}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-2 text-[13px] font-semibold text-[var(--color-muted)] uppercase tracking-wider py-4">
            <span>Satellite</span>
            <span className="text-[var(--color-line)]">→</span>
            <span>Model</span>
            <span className="text-[var(--color-line)]">→</span>
            <span>Decision</span>
          </div>
        </AnimateIn>
      </EditorialSection>
    </div>
  )
}
