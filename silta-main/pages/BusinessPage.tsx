import { content } from '../landingContent'
import AnimateIn from '../components/AnimateIn'
import SectionHeading from '../components/SectionHeading'
import Button from '../components/Button'
import { EditorialSection } from '../components/editorial'

export default function BusinessPage() {
  const b = content.business
  const featured = b.tiers[0]

  return (
    <div className="bg-[var(--color-bg)] satellite-grid">
      <EditorialSection>
        <AnimateIn from="top" duration={800}>
          <SectionHeading title={b.title} subtitle={b.sub} />
        </AnimateIn>

        {/* Engagement modes as table grid */}
        <AnimateIn from="bottom" delay={150} duration={800}>
          <div className="rounded-xl border border-[var(--color-line)] overflow-hidden bg-[var(--color-surface)]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-0 border-b border-[var(--color-line)] bg-[var(--color-surfaceAlt)]">
              <div className="md:col-span-4 px-4 py-3 md:border-r border-[var(--color-line)] text-[11px] font-semibold text-[var(--color-muted)] uppercase tracking-wider">
                Offering
              </div>
              <div className="md:col-span-8 px-4 py-3 text-[11px] font-semibold text-[var(--color-muted)] uppercase tracking-wider">
                Best for · Pilot path
              </div>
            </div>
            {b.tiers.map((t, i) => (
                <div key={i} className="md:col-span-12 grid grid-cols-1 md:grid-cols-12 gap-0 border-b border-[var(--color-line)] last:border-b-0">
                  <div className="md:col-span-4 px-4 py-4 md:border-r border-[var(--color-line)] font-medium text-[var(--color-text)]">
                    {t.name}
                  </div>
                  <div className="md:col-span-8 px-4 py-4 text-[14px] text-[var(--color-muted)]">
                    <span className="text-[var(--color-text)] font-medium">{t.bestFor}</span>
                    <span className="mx-2">·</span>
                    <span>{t.path}</span>
                  </div>
                </div>
              ))}
          </div>
        </AnimateIn>

        {/* Featured: Bank Portfolio API */}
        <AnimateIn from="bottom" delay={300} duration={800}>
          <div
            className="mt-10 rounded-xl border-2 p-8 md:p-10"
            style={{ borderColor: 'var(--color-after-border)', background: 'var(--color-after)' }}
          >
            <span className="text-[11px] font-semibold text-accent tracking-widest uppercase">Primary focus</span>
            <h3 className="font-serif text-[var(--color-text)] text-2xl md:text-3xl font-semibold mt-2 mb-3">
              {featured.name}
            </h3>
            <p className="text-[15px] text-[var(--color-muted)] leading-[1.6] max-w-2xl mb-6">
              {featured.desc}
            </p>
            <p className="text-[13px] text-[var(--color-muted)] mb-4">
              Best for <strong className="text-[var(--color-text)]">{featured.bestFor}</strong> · {featured.path}
            </p>
            <p className="text-[13px] text-[var(--color-muted)] mb-6">API · Dashboard · Alerts · Reporting</p>
            <Button to="/demo" variant="primary">Request a Pilot</Button>
          </div>
        </AnimateIn>
      </EditorialSection>
    </div>
  )
}
