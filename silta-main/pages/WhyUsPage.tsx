import { useRef, useState } from 'react'
import AnimateIn from '../components/AnimateIn'
import { EditorialSection } from '../components/editorial'
import CheckListItem from '../components/CheckListItem'
import MetricTile from '../components/MetricTile'
import {
  EVIDENCE_BADGES,
  ACHIEVEMENTS,
  METRICS,
  METRICS_EXPLANATION,
  SATELLITES_VS_REPORTS,
  CERTIFICATES,
  DIFFERENTIATION_BULLETS,
} from '../lib/whyUsData'

function ProofBadge({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] px-4 py-2.5 text-[13px] font-medium text-[var(--color-text)]">
      {children}
    </span>
  )
}

function ImageCard({
  image,
  imageAlt,
  title,
  description,
  bullets,
}: {
  image: string
  imageAlt: string
  title: string
  description: string
  bullets: readonly string[]
}) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  return (
    <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] overflow-hidden shadow-[0_2px_20px_rgba(20,20,20,0.06)]">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
        <div className="md:col-span-3 p-6 md:p-8 flex flex-col justify-center">
          <h3 className="font-serif text-[var(--color-text)] text-xl md:text-2xl font-semibold mb-2">
            {title}
          </h3>
          <p className="text-[15px] text-[var(--color-muted)] leading-[1.55] mb-4">
            {description}
          </p>
          <ul className="list-none p-0 m-0 space-y-2">
            {bullets.map((b, i) => (
              <CheckListItem key={i}>{b}</CheckListItem>
            ))}
          </ul>
        </div>
        <div className="md:col-span-2 relative min-h-[200px] md:min-h-0 bg-[var(--color-surfaceAlt)] overflow-hidden md:rounded-r-2xl">
          {!error ? (
            <>
              <img
                src={image}
                alt={imageAlt}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setLoaded(true)}
                onError={() => setError(true)}
              />
              {!loaded && (
                <div
                  className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[var(--color-surfaceAlt)] to-[var(--color-line)]"
                  aria-hidden
                >
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-muted)" strokeWidth="1.5" className="opacity-40">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M3 9h18M9 21V9" />
                  </svg>
                </div>
              )}
            </>
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[var(--color-surfaceAlt)] to-[var(--color-line)] rounded-r-2xl"
              aria-hidden
            >
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-muted)" strokeWidth="1.5" className="opacity-40">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 9h18M9 21V9" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Carousel({ items }: { items: readonly { src: string; caption: string }[] }) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return
    const step = scrollRef.current.clientWidth * 0.8
    scrollRef.current.scrollBy({ left: dir === 'left' ? -step : step, behavior: 'smooth' })
  }

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth py-2 pb-4 -mx-2 px-2 scrollbar-thin"
        style={{ scrollbarWidth: 'thin' }}
        tabIndex={0}
        role="region"
        aria-label="Certificates carousel"
      >
        {items.map((item, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-[280px] snap-center rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] overflow-hidden shadow-sm"
          >
            <div className="aspect-[4/3] bg-[var(--color-surfaceAlt)] relative">
              <img
                src={item.src}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <p className="p-3 text-[13px] text-[var(--color-muted)] font-medium">
              {item.caption}
            </p>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-2 mt-4">
        <button
          type="button"
          onClick={() => scroll('left')}
          className="w-10 h-10 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] flex items-center justify-center text-[var(--color-text)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
          aria-label="Previous"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <button
          type="button"
          onClick={() => scroll('right')}
          className="w-10 h-10 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] flex items-center justify-center text-[var(--color-text)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
          aria-label="Next"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
        </button>
      </div>
    </div>
  )
}

export default function WhyUsPage() {
  return (
    <div id="whyus" className="bg-[var(--color-bg)] satellite-grid">
      {/* A) Credibility Hero */}
      <EditorialSection className="pt-10 md:pt-14 pb-8 md:pb-10">
        <AnimateIn from="top" duration={800}>
          <h1 className="font-serif text-[var(--color-text)] text-[clamp(32px,5vw,48px)] font-semibold leading-[1.12] tracking-[-0.02em] max-w-3xl mb-4">
            Proof, not promises.
          </h1>
          <p className="text-[17px] md:text-[18px] text-[var(--color-muted)] leading-[1.55] max-w-2xl mb-8">
            We turn satellite and weather signals into bank-ready risk decisions, backed by validation metrics and real domain experience.
          </p>
          <div className="flex flex-wrap gap-3">
            {EVIDENCE_BADGES.map((badge) => (
              <ProofBadge key={badge}>{badge}</ProofBadge>
            ))}
          </div>
        </AnimateIn>
      </EditorialSection>

      {/* B) Two Anchor Proof cards */}
      <EditorialSection className="pt-6 md:pt-8 pb-10 md:pb-12">
        <div className="space-y-8 md:space-y-10">
          {ACHIEVEMENTS.map((a, i) => (
            <AnimateIn key={a.id} from="bottom" delay={i * 80} duration={800}>
              <ImageCard
                image={a.image}
                imageAlt={a.imageAlt}
                title={a.title}
                description={a.description}
                bullets={a.bullets}
              />
            </AnimateIn>
          ))}
        </div>
      </EditorialSection>

      {/* C) Model & Validation */}
      <EditorialSection className="pt-6 md:pt-8 pb-10 md:pb-12">
        <AnimateIn from="bottom" delay={100} duration={800}>
          <p className="text-[11px] font-semibold text-[var(--color-muted)] uppercase tracking-wider mb-6">
            Model & Validation
          </p>
          <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] p-6 md:p-8 shadow-[0_2px_20px_rgba(20,20,20,0.06)]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
              <MetricTile value={METRICS.maeP50} label="MAE (p50)" />
              <MetricTile value={METRICS.rmseP50} label="RMSE (p50)" />
              <MetricTile
                value={`${METRICS.coverageP10P90}%`}
                label="Coverage (p10–p90)"
                note={`Target ${METRICS.coverageTarget}`}
              />
              <MetricTile
                value={`${METRICS.downsideMissRate}%`}
                label="Downside Miss Rate"
                note={`Target ${METRICS.downsideTarget}`}
              />
              <MetricTile
                value={METRICS.volatilitySpreadMean}
                label="Volatility Spread (p90–p10) mean"
              />
            </div>
            <div className="mt-6 pt-6 border-t border-[var(--color-line)] space-y-2">
              {METRICS_EXPLANATION.map((line, i) => (
                <p key={i} className="text-[14px] text-[var(--color-muted)] leading-[1.6]">
                  {line}
                </p>
              ))}
            </div>
          </div>
        </AnimateIn>
      </EditorialSection>

      {/* D) Why satellites beat reports */}
      <EditorialSection className="pt-6 md:pt-8 pb-10 md:pb-12">
        <AnimateIn from="bottom" delay={120} duration={800}>
          <p className="text-[11px] font-semibold text-[var(--color-muted)] uppercase tracking-wider mb-6">
            Why satellites beat reports
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SATELLITES_VS_REPORTS.map((col) => (
              <div
                key={col.label}
                className="rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] p-5 md:p-6"
              >
                <h4 className="font-serif text-[18px] font-semibold text-[var(--color-text)] mb-3">
                  {col.label}
                </h4>
                <ul className="list-none p-0 m-0 space-y-1.5 text-[14px] text-[var(--color-muted)]">
                  {col.points.map((p, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-muted)] shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-6 text-[13px] text-[var(--color-muted)] italic max-w-2xl">
            People trust clear, concrete evidence more than slogans.
          </p>
        </AnimateIn>
      </EditorialSection>

      {/* E) Certificates carousel */}
      <EditorialSection className="pt-6 md:pt-8 pb-10 md:pb-12">
        <AnimateIn from="bottom" delay={140} duration={800}>
          <h2 className="font-serif text-[var(--color-text)] text-xl md:text-2xl font-semibold mb-6">
            Certified & continuously learning
          </h2>
          <Carousel items={CERTIFICATES} />
        </AnimateIn>
      </EditorialSection>

      {/* F) Differentiation summary */}
      <EditorialSection className="pt-6 md:pt-8 pb-10 md:pb-14">
        <AnimateIn from="bottom" delay={160} duration={800}>
          <div className="rounded-2xl border border-[var(--color-after-border)] bg-[var(--color-after)] p-6 md:p-8">
            <h2 className="font-serif text-[var(--color-text)] text-xl md:text-2xl font-semibold mb-6">
              What makes AgroRisk hard to copy
            </h2>
            <ul className="list-none p-0 m-0 space-y-3">
              {DIFFERENTIATION_BULLETS.map((b, i) => (
                <CheckListItem key={i}>{b}</CheckListItem>
              ))}
            </ul>
          </div>
        </AnimateIn>
      </EditorialSection>
    </div>
  )
}
