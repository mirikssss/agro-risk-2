import { useState, useEffect } from 'react'
import AnimateIn from '../components/AnimateIn'
import { EditorialSection } from '../components/editorial'
import CheckListItem from '../components/CheckListItem'
import MetricTile from '../components/MetricTile'
import {
  EVIDENCE_BADGES,
  ACHIEVEMENTS,
  METRICS,
  METRICS_EXPLANATION,
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
      {/* Image full-bleed to card edges, no padding */}
      <div className="relative aspect-[4/3] w-full bg-[var(--color-surfaceAlt)] overflow-hidden">
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
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[var(--color-surfaceAlt)] to-[var(--color-line)]" aria-hidden>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-muted)" strokeWidth="1.5" className="opacity-40">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 9h18M9 21V9" />
            </svg>
          </div>
        )}
      </div>
      <div className="p-6 md:p-8">
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
    </div>
  )
}

function CertificatesGrid({
  items,
  onOpen,
}: {
  items: readonly { src: string; caption: string }[]
  onOpen: (src: string, caption: string) => void
}) {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
      role="region"
      aria-label="Certificates"
    >
      {items.map((item, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onOpen(item.src, item.caption)}
          className="text-left rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] overflow-hidden shadow-[0_2px_20px_rgba(20,20,20,0.06)] hover:border-[var(--color-accent)] hover:shadow-[0_4px_28px_rgba(47,111,78,0.12)] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2"
        >
          <div className="aspect-[4/3] bg-[var(--color-surfaceAlt)] relative overflow-hidden">
            <img
              src={item.src}
              alt=""
              className="w-full h-full object-contain"
            />
          </div>
          <p className="p-4 text-[14px] font-medium text-[var(--color-muted)]">
            {item.caption}
          </p>
        </button>
      ))}
    </div>
  )
}

function CertificatePopup({
  src,
  caption,
  onClose,
}: {
  src: string
  caption: string
  onClose: () => void
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Certificate full size"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
        aria-label="Close"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
      </button>
      <div
        className="relative max-w-[95vw] max-h-[95vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={src}
          alt={caption}
          className="max-w-full max-h-[85vh] w-auto object-contain rounded-lg shadow-2xl"
        />
        <p className="mt-3 text-[14px] text-white/80">{caption}</p>
      </div>
    </div>
  )
}

export default function WhyUsPage() {
  const [popupCert, setPopupCert] = useState<{ src: string; caption: string } | null>(null)
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

      {/* B) Two Anchor Proof cards — 2 in a row, narrower so photos don't stretch */}
      <EditorialSection className="pt-6 md:pt-8 pb-10 md:pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
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

      {/* Certificates — 3 columns, click to open full-screen */}
      <EditorialSection className="pt-6 md:pt-8 pb-10 md:pb-12">
        <AnimateIn from="bottom" delay={140} duration={800}>
          <h2 className="font-serif text-[var(--color-text)] text-xl md:text-2xl font-semibold mb-6">
            Certified & continuously learning
          </h2>
          <CertificatesGrid
            items={CERTIFICATES}
            onOpen={(src, caption) => setPopupCert({ src, caption })}
          />
        </AnimateIn>
      </EditorialSection>
      {popupCert && (
        <CertificatePopup
          src={popupCert.src}
          caption={popupCert.caption}
          onClose={() => setPopupCert(null)}
        />
      )}

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
