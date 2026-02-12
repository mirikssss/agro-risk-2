import { content } from '../landingContent'

export default function Hero() {
  const scrollToHow = () => {
    document.querySelector('#how')?.scrollIntoView({ behavior: 'smooth' })
  }
  const scrollToDemo = () => {
    document.querySelector('#demo')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface-dark via-surface-navy to-surface-dark" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(6,182,212,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6,182,212,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />
      <div className="absolute top-1/4 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-data-cyan/10 pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-agro-green/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-data-cyan/10 rounded-full blur-3xl pointer-events-none" />
      {/* Scan line (subtle) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-data-cyan/20 to-transparent animate-scan" />
      </div>

      <div className="relative max-w-6xl mx-auto w-full">
        <div className="inline-block px-3 py-1.5 rounded-full bg-agro-green/20 border border-agro-green/40 text-agro-green text-sm font-medium mb-6">
          Satellite + AI for Bank-Grade Agri Risk
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 max-w-4xl">
          {content.hero.h1}
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10">
          {content.hero.sub}
        </p>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={scrollToDemo}
            className="px-6 py-3.5 rounded-xl bg-agro-green text-surface-dark font-semibold hover:bg-agro-green/90 transition-colors"
          >
            {content.hero.cta1}
          </button>
          <button
            onClick={scrollToHow}
            className="px-6 py-3.5 rounded-xl border border-surface-border text-white font-medium hover:bg-white/5 transition-colors"
          >
            {content.hero.cta2}
          </button>
        </div>
      </div>

      {/* Right-side visual: abstract satellite map overlay */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[40%] max-w-md h-80 hidden xl:block pointer-events-none opacity-40"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% 50%, rgba(6,182,212,0.15) 0%, transparent 70%),
            repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(34,197,94,0.08) 2px, rgba(34,197,94,0.08) 4px)
          `,
          borderRadius: '16px',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
      />
    </section>
  )
}
