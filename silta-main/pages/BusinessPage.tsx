import { useState } from 'react'
import AnimateIn from '../components/AnimateIn'
import { EditorialSection } from '../components/editorial'
import Button from '../components/Button'
import CheckListItem from '../components/CheckListItem'
import TransitionLink from '../components/TransitionLink'

type OfferingTab = 'banks' | 'insurers' | 'dfis'

const OFFERINGS: Record<
  OfferingTab,
  {
    whatTheyGet: string[]
    outputFormats: string[]
    buyer: string
    useCase: string
  }
> = {
  banks: {
    whatTheyGet: [
      'Portfolio-level risk scores and early stress signals',
      'p10 / p50 / p90 scenarios per field or portfolio segment',
      'Banker-readable insights and evidence packs for credit committees',
      'Dashboard + API + Alerts for integration into credit workflows',
      'Calibration and validation vs historical outcomes',
    ],
    outputFormats: 'Dashboard · API · Alerts · Evidence pack'.split(' · '),
    buyer: 'Credit risk, agri-lending, or treasury',
    useCase: 'Pilot on one region/crop, then scale to full portfolio; underwriting and monitoring.',
  },
  insurers: {
    whatTheyGet: [
      'Claim verification using satellite + weather evidence',
      'Per-claim or per-hectare pricing',
      'Evidence pack for disputed or high-value claims',
      'Parametric triggers and area-level indices (roadmap)',
      'Faster settlement and fewer manual inspections',
    ],
    outputFormats: 'Dashboard · API · Alerts · Evidence pack'.split(' · '),
    buyer: 'Crop insurance underwriting and claims',
    useCase: 'Verify loss extent and timing; reduce fraud and operational cost.',
  },
  dfis: {
    whatTheyGet: [
      'Regional agricultural risk monitoring and early warning',
      'Multi-region dashboards and aggregated risk metrics',
      'Evidence for policy and subsidy design',
      'API for integration with national or donor systems',
      'Custom crops and regions (enterprise)',
    ],
    outputFormats: 'Dashboard · API · Alerts · Evidence pack'.split(' · '),
    buyer: 'Ministry of Agriculture, development banks, agencies',
    useCase: 'Monitor food security and sector risk; support lending and insurance programs.',
  },
}

function PricingCalculatorStatic() {
  return (
    <div className="rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] p-5 md:p-6">
      <p className="text-[11px] font-semibold text-[var(--color-muted)] uppercase tracking-wider mb-3">
        Pricing calculator (indicative)
      </p>
      <div className="grid grid-cols-2 gap-3 text-[14px]">
        <div>
          <label className="block text-[var(--color-muted)] mb-1">Regions</label>
          <div className="rounded-lg border border-[var(--color-line)] bg-[var(--color-surfaceAlt)] px-3 py-2 font-medium text-[var(--color-text)]">
            1
          </div>
        </div>
        <div>
          <label className="block text-[var(--color-muted)] mb-1">Fields to score / month</label>
          <div className="rounded-lg border border-[var(--color-line)] bg-[var(--color-surfaceAlt)] px-3 py-2 font-medium text-[var(--color-text)]">
            5,000
          </div>
        </div>
      </div>
      <p className="mt-4 text-[15px] font-semibold text-[var(--color-accent)]">
        From ~$1,200 / month + usage
      </p>
      <p className="mt-1 text-[12px] text-[var(--color-muted)]">
        Based on Bank Portfolio API. Exact quote after scoping.
      </p>
    </div>
  )
}

export default function BusinessPage() {
  const [tab, setTab] = useState<OfferingTab>('banks')
  const offering = OFFERINGS[tab]

  return (
    <div className="bg-[var(--color-bg)] satellite-grid">
      {/* Hero */}
      <EditorialSection>
        <AnimateIn from="top" duration={800}>
          <h1 className="font-serif text-[var(--color-text)] text-[clamp(32px,5vw,52px)] font-semibold leading-[1.12] tracking-[-0.02em] max-w-3xl mb-4">
            A pricing model banks can actually pilot.
          </h1>
          <p className="text-[18px] md:text-[20px] text-[var(--color-muted)] leading-[1.55] max-w-2xl mb-8">
            Start small, prove lift, then integrate and scale across the portfolio.
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              'MVP ready',
              '8 years satellite + weather history',
              'Probabilistic risk (p10 / p50 / p90) + banker-readable insights',
            ].map((chip, i) => (
              <span
                key={i}
                className="inline-flex items-center rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] px-4 py-2 text-[14px] font-medium text-[var(--color-text)]"
              >
                {chip}
              </span>
            ))}
          </div>
        </AnimateIn>
      </EditorialSection>

      {/* Offerings: tabs + content */}
      <EditorialSection className="pt-0">
        <AnimateIn from="bottom" delay={100} duration={800}>
          <p className="text-[11px] font-semibold text-[var(--color-muted)] uppercase tracking-wider mb-4">
            Offerings
          </p>
          <div className="flex flex-wrap gap-1 p-1 rounded-xl border border-[var(--color-line)] bg-[var(--color-surfaceAlt)] w-fit mb-10">
            {(['banks', 'insurers', 'dfis'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`px-4 py-2.5 rounded-lg text-[14px] font-medium transition-all duration-200 ${
                  tab === t
                    ? 'bg-[var(--color-surface)] text-[var(--color-text)] shadow-sm border border-[var(--color-line)]'
                    : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
                }`}
              >
                {t === 'banks' ? 'Banks' : t === 'insurers' ? 'Insurers' : 'DFIs / Government'}
              </button>
            ))}
          </div>

          <div
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10"
            style={{ minHeight: 200 }}
          >
            <div key={tab} className="lg:col-span-7 space-y-6 animate-tab-content-in">
              <div>
                <h3 className="text-[13px] font-semibold text-[var(--color-muted)] uppercase tracking-wider mb-3">
                  What they get
                </h3>
                <ul className="list-none p-0 m-0 space-y-2">
                  {offering.whatTheyGet.map((item, i) => (
                    <CheckListItem key={i}>{item}</CheckListItem>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-[13px] font-semibold text-[var(--color-muted)] uppercase tracking-wider mb-2">
                  Output formats
                </h3>
                <p className="text-[15px] text-[var(--color-text)]">
                  {offering.outputFormats.join(' · ')}
                </p>
              </div>
              <div className="rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] p-4">
                <p className="text-[13px] text-[var(--color-muted)] mb-1">Typical buyer</p>
                <p className="text-[15px] font-medium text-[var(--color-text)]">{offering.buyer}</p>
                <p className="text-[13px] text-[var(--color-muted)] mt-2">Use case</p>
                <p className="text-[15px] text-[var(--color-text)]">{offering.useCase}</p>
              </div>
            </div>
            <div className="lg:col-span-5">
              <PricingCalculatorStatic />
            </div>
          </div>
        </AnimateIn>
      </EditorialSection>

      {/* Pricing cards */}
      <EditorialSection className="pt-0">
        <AnimateIn from="bottom" delay={150} duration={800}>
          <p className="text-[11px] font-semibold text-[var(--color-muted)] uppercase tracking-wider mb-6">
            Pricing
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] p-6 flex flex-col">
              <h3 className="font-serif text-[18px] font-semibold text-[var(--color-text)] mb-1">
                Pilot (6–8 weeks)
              </h3>
              <p className="text-[22px] font-bold text-[var(--color-accent)] mb-4">$4,900</p>
              <ul className="list-none p-0 m-0 space-y-2 text-[14px] text-[var(--color-muted)] flex-1">
                {[
                  '1 region + crop',
                  'Portfolio scoring',
                  'Dashboard + alerts',
                  '1 workshop',
                  'Data quality report + integration plan',
                ].map((item, i) => (
                  <CheckListItem key={i}>{item}</CheckListItem>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] p-6 flex flex-col">
              <h3 className="font-serif text-[18px] font-semibold text-[var(--color-text)] mb-1">
                Bank Portfolio API
              </h3>
              <p className="text-[22px] font-bold text-[var(--color-accent)] mb-1">
                from $1,200 / month
              </p>
              <p className="text-[13px] text-[var(--color-muted)] mb-4">
                from $0.15 per scored field/loan
              </p>
              <ul className="list-none p-0 m-0 space-y-2 text-[14px] text-[var(--color-muted)] flex-1">
                {['Dashboard', 'Model refresh', 'Alerts', 'SLA-lite'].map((item, i) => (
                  <CheckListItem key={i}>{item}</CheckListItem>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] p-6 flex flex-col">
              <h3 className="font-serif text-[18px] font-semibold text-[var(--color-text)] mb-1">
                Insurance Claim Verification
              </h3>
              <p className="text-[22px] font-bold text-[var(--color-accent)] mb-4">
                $19 per claim
              </p>
              <p className="text-[14px] text-[var(--color-muted)] mb-4">
                or $0.25/ha per verification
              </p>
              <ul className="list-none p-0 m-0 space-y-2 text-[14px] text-[var(--color-muted)] flex-1">
                <CheckListItem>Evidence pack per claim</CheckListItem>
                <CheckListItem>Bulk and API options</CheckListItem>
              </ul>
            </div>

            <div className="rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] p-6 flex flex-col">
              <h3 className="font-serif text-[18px] font-semibold text-[var(--color-text)] mb-1">
                Regional Risk Monitoring
              </h3>
              <p className="text-[22px] font-bold text-[var(--color-accent)] mb-4">
                from $12k / year per region
              </p>
              <ul className="list-none p-0 m-0 space-y-2 text-[14px] text-[var(--color-muted)] flex-1">
                <CheckListItem>Multi-region dashboard</CheckListItem>
                <CheckListItem>API + evidence pack</CheckListItem>
                <CheckListItem>Custom crops (enterprise)</CheckListItem>
              </ul>
            </div>
          </div>
          <p className="mt-6 text-[13px] text-[var(--color-muted)]">
            Enterprise: SSO, SLA, on-prem, custom crops/regions.
          </p>
        </AnimateIn>
      </EditorialSection>

      {/* Pilot → Integration → Scale timeline */}
      <EditorialSection className="pt-0">
        <AnimateIn from="bottom" delay={200} duration={800}>
          <p className="text-[11px] font-semibold text-[var(--color-muted)] uppercase tracking-wider mb-6">
            Pilot → Integration → Scale
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] p-6">
              <h3 className="font-serif text-[18px] font-semibold text-[var(--color-text)] mb-2">
                Pilot (Weeks 1–8)
              </h3>
              <ul className="list-none p-0 m-0 space-y-2 text-[14px]">
                {[
                  'Connect data, calibrate, validate vs historical outcomes',
                  'Deliver dashboard + evidence',
                ].map((item, i) => (
                  <CheckListItem key={i}>{item}</CheckListItem>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] p-6">
              <h3 className="font-serif text-[18px] font-semibold text-[var(--color-text)] mb-2">
                Integration (Weeks 8–12)
              </h3>
              <ul className="list-none p-0 m-0 space-y-2 text-[14px]">
                {['API + workflow hooks', 'User roles'].map((item, i) => (
                  <CheckListItem key={i}>{item}</CheckListItem>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] p-6">
              <h3 className="font-serif text-[18px] font-semibold text-[var(--color-text)] mb-2">
                Scale (Quarter 2+)
              </h3>
              <ul className="list-none p-0 m-0 space-y-2 text-[14px]">
                {[
                  'Multi-region',
                  'Insurance module',
                  'Real-time monitoring',
                  'Cross-country expansion',
                ].map((item, i) => (
                  <CheckListItem key={i}>{item}</CheckListItem>
                ))}
              </ul>
            </div>
          </div>
        </AnimateIn>
      </EditorialSection>

      {/* ROI strip */}
      <EditorialSection className="pt-0">
        <AnimateIn from="bottom" delay={250} duration={800}>
          <div className="rounded-2xl border border-[var(--color-after-border)] bg-[var(--color-after)] p-8 md:p-10">
            <p className="text-[11px] font-semibold text-[var(--color-accent)] uppercase tracking-wider mb-6">
              Why it pays off
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <p className="font-serif text-[20px] md:text-[22px] font-semibold text-[var(--color-text)] leading-snug">
                  Weeks earlier signals (not post-damage).
                </p>
              </div>
              <div>
                <p className="font-serif text-[20px] md:text-[22px] font-semibold text-[var(--color-text)] leading-snug">
                  Faster underwriting + fewer manual inspections.
                </p>
              </div>
              <div>
                <p className="font-serif text-[20px] md:text-[22px] font-semibold text-[var(--color-text)] leading-snug">
                  Portfolio-level visibility of correlated weather shocks.
                </p>
              </div>
            </div>
          </div>
        </AnimateIn>
      </EditorialSection>

      {/* CTA */}
      <EditorialSection className="pt-0">
        <AnimateIn from="bottom" delay={300} duration={800}>
          <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] p-8 md:p-10 text-center max-w-2xl mx-auto">
            <h2 className="font-serif text-[28px] md:text-[32px] font-semibold text-[var(--color-text)] mb-3">
              Ready to pilot?
            </h2>
            <p className="text-[15px] text-[var(--color-muted)] mb-6">
              We'll scope a pilot in 30 minutes.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button to="/demo" variant="primary">
                Request a Pilot
              </Button>
              <TransitionLink
                to="/demo"
                className="inline-flex items-center justify-center font-semibold rounded-[10px] px-5 py-3 text-[15px] border border-[var(--color-line)] text-[var(--color-text)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
              >
                View Demo
              </TransitionLink>
            </div>
          </div>
        </AnimateIn>
      </EditorialSection>
    </div>
  )
}
