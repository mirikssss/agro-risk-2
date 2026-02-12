import { useRef, useEffect } from 'react'
import { content } from '../landingContent'
import AnimateIn from '../components/AnimateIn'
import Badge from '../components/Badge'
import Button from '../components/Button'
import SatelliteMarks from '../components/SatelliteMarks'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80'

const FLOATING_CARDS = [
  { title: 'NDVI trend', value: '−0.12', status: 'Worsening', sub: 'Last 14 days' },
  { title: 'Drought risk', value: 'Medium', status: 'Stable', sub: 'Soil moisture' },
  { title: 'Yield anomaly', value: '−8%', status: 'vs. baseline', sub: 'Field 42' },
]

export default function HeroPage() {
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = imgRef.current
    if (!el) return
    const onScroll = () => {
      const rect = el.getBoundingClientRect()
      const centerY = rect.top + rect.height / 2
      const viewportCenter = window.innerHeight / 2
      const dy = (centerY - viewportCenter) * 0.03
      el.style.transform = `translateY(${dy}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const h = content.hero

  return (
    <div className="bg-[var(--color-bg)] satellite-grid">
      <section className="section-border min-h-[calc(100vh-72px)] flex flex-col justify-center py-16 md:py-20 relative">
        <div className="max-w-[1200px] mx-auto px-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: copy */}
            <div className="lg:col-span-5">
              <AnimateIn from="left" duration={800}>
                <Badge className="mb-6">Satellite + AI for Bank-Grade Agri Risk</Badge>
              </AnimateIn>
              <AnimateIn from="left" delay={80} duration={800}>
                <h1
                  className="font-serif text-[var(--color-text)] mb-6 max-w-xl"
                  style={{
                    fontSize: 'clamp(40px, 5.5vw, 64px)',
                    fontWeight: 600,
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {h.h1}
                </h1>
              </AnimateIn>
              <AnimateIn from="left" delay={160} duration={800}>
                <ul className="space-y-2 mb-8 text-[15px] text-[var(--color-muted)] leading-[1.65] max-w-md">
                  {h.bullets.slice(0, 3).map((b, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-accent mt-1.5 shrink-0">•</span>
                      <span>{b.text}</span>
                    </li>
                  ))}
                </ul>
              </AnimateIn>
              <AnimateIn from="left" delay={240} duration={800}>
                <div className="flex flex-wrap gap-3">
                  <Button to="/demo" variant="primary">
                    {h.cta1}
                  </Button>
                  <Button to="/demo" variant="outline">
                    {h.cta2}
                  </Button>
                </div>
              </AnimateIn>
            </div>

            {/* Right: hero image + floating cards */}
            <div className="lg:col-span-7 relative">
              <AnimateIn from="right" delay={120} duration={1000}>
                <div
                  ref={imgRef}
                  className="relative w-full aspect-[4/3] max-h-[min(70vh,520px)] rounded-[20px] overflow-hidden border border-[var(--color-line)] transition-transform duration-150 satellite-grid"
                  style={{ boxShadow: '0 8px 40px rgba(20,20,20,0.08)' }}
                >
                  <SatelliteMarks coordinate="41.31°N, 69.24°E" sensor="Sentinel-2" position="tl" onPhoto />
                  <SatelliteMarks coordinate="Tile 37TGS" sensor="NDVI" position="tr" onPhoto />
                  <img
                    src={HERO_IMAGE}
                    alt="Agricultural field and satellite intelligence"
                    className="w-full h-full object-cover"
                    loading="eager"
                    fetchPriority="high"
                  />
                  {/* Floating paper cards — dark bg + white text for visibility on photo */}
                  <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-3 justify-end pointer-events-none">
                    {FLOATING_CARDS.map((card, i) => (
                      <div
                        key={i}
                        className="bg-[rgba(20,20,20,0.82)] backdrop-blur-sm rounded-xl border border-white/20 px-4 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.25)]"
                        style={{
                          animation: `fadeUp 0.5s ease ${i * 80 + 400}ms both`,
                        }}
                      >
                        <div className="text-[11px] font-semibold tracking-wider uppercase text-white/80">
                          {card.title}
                        </div>
                        <div className="font-serif text-white font-semibold text-lg">
                          {card.value}
                        </div>
                        <div className="text-[12px] text-white/75">
                          {card.status} · {card.sub}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimateIn>
            </div>
          </div>
        </div>
      </section>

      {/* Description block */}
      <section className="section-border py-14 md:py-20">
        <div className="max-w-[720px] mx-auto px-6">
          <AnimateIn from="bottom" delay={100} duration={800}>
            <p className="text-[17px] leading-[1.75] text-[var(--color-muted)] text-center">
              {h.descriptionBlock}
            </p>
          </AnimateIn>
        </div>
      </section>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
