import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { content } from '../landingContent'
import TransitionLink from './TransitionLink'
import { usePageTransition } from './TransitionContext'

const MENU_CLOSE_DURATION = 300

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const loc = useLocation()
  const { navigateTo } = usePageTransition()

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 32)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  useEffect(() => { setOpen(false) }, [loc.pathname])

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? 'rgba(246,241,232,0.92)' : 'var(--color-bg)',
          borderBottom: '1px solid var(--color-line)',
          backdropFilter: scrolled ? 'saturate(1.1) blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'saturate(1.1) blur(12px)' : 'none',
        }}
      >
        <div className="max-w-[1200px] mx-auto px-6">
          <div
            className="flex items-center justify-between transition-all duration-300"
            style={{ height: scrolled ? 56 : 64 }}
          >
            <TransitionLink
              to="/"
              className="flex items-center gap-2.5 no-underline text-[var(--color-text)]"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'var(--color-accent)' }}
              />
              <span className="font-semibold text-[17px] tracking-tight font-sans">
                {content.nav.logo}
              </span>
            </TransitionLink>

            <div className="hidden lg:flex items-center gap-1">
              {content.nav.menu.map((m) => (
                <TransitionLink
                  key={m.path}
                  to={m.path}
                  className={`nav-link px-3 py-2 rounded-md text-[14px] font-medium transition-colors ${
                    loc.pathname === m.path ? 'active text-accent' : 'text-[var(--color-text)]'
                  }`}
                >
                  {m.label}
                </TransitionLink>
              ))}
              <TransitionLink
                to="/demo"
                className="ml-3 px-5 py-2.5 rounded-[10px] font-semibold text-[14px] text-white no-underline bg-accent2 hover:opacity-90 transition-opacity"
              >
                {content.nav.cta}
              </TransitionLink>
            </div>

            <button
              className="lg:hidden relative w-10 h-10 rounded-full border-2 border-[var(--color-line)] flex items-center justify-center bg-[var(--color-surface)] hover:border-accent transition-colors"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              {open ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="6" y1="6" x2="18" y2="18" /><line x1="6" y1="18" x2="18" y2="6" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="17" x2="20" y2="17" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu — full-screen cosmic overlay */}
      <div
        className="lg:hidden fixed inset-0 z-40 transition-all duration-300 ease-out"
        style={{
          visibility: open ? 'visible' : 'hidden',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        {/* Space-style backdrop: dark gradient + orbit ring (click to close) */}
        <button
          type="button"
          className="absolute inset-0 w-full h-full border-0 p-0 m-0 cursor-pointer"
          style={{ background: 'transparent' }}
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(165deg, rgba(20,28,38,0.97) 0%, rgba(30,42,55,0.98) 50%, rgba(20,28,38,0.97) 100%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 80% 50% at 50% 0%, rgba(47,111,78,0.15) 0%, transparent 50%),
              radial-gradient(circle at 20% 80%, rgba(47,111,78,0.08) 0%, transparent 25%),
              radial-gradient(circle at 80% 20%, rgba(43,111,217,0.06) 0%, transparent 20%)
            `,
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-full pt-24 pb-12 px-6 pointer-events-none">
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--color-accent)] mb-8 opacity-90">
            Satellite · Navigation
          </p>
          <nav className="flex flex-col items-center gap-1 w-full max-w-xs pointer-events-auto">
            {content.nav.menu.map((m, i) => (
              <a
                key={m.path}
                href={m.path}
                className="w-full flex items-center gap-3 py-4 px-5 rounded-2xl no-underline transition-colors text-left"
                style={{
                  background: loc.pathname === m.path ? 'rgba(47,111,78,0.2)' : 'rgba(255,255,255,0.06)',
                  color: loc.pathname === m.path ? '#a7f3d0' : 'rgba(255,255,255,0.9)',
                  border: `1px solid ${loc.pathname === m.path ? 'rgba(47,111,78,0.4)' : 'rgba(255,255,255,0.08)'}`,
                  animationDelay: `${i * 40}ms`,
                }}
                onClick={(e) => {
                  e.preventDefault()
                  setOpen(false)
                  if (loc.pathname !== m.path) setTimeout(() => navigateTo(m.path), MENU_CLOSE_DURATION)
                }}
              >
                <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] shrink-0" aria-hidden />
                <span className="font-medium text-[15px]">{m.label}</span>
              </a>
            ))}
          </nav>
          <a
            href="/demo"
            className="mt-8 w-full max-w-xs py-4 rounded-2xl font-semibold text-[15px] text-center no-underline bg-[var(--color-accent2)] text-white hover:opacity-90 transition-opacity border border-white/10 pointer-events-auto block"
            onClick={(e) => {
              e.preventDefault()
              setOpen(false)
              setTimeout(() => navigateTo('/demo'), MENU_CLOSE_DURATION)
            }}
          >
            {content.nav.cta}
          </a>
        </div>

        {/* Close hint */}
        <p className="absolute bottom-8 left-0 right-0 text-center text-[12px] text-white/40">
          Tap outside or close to dismiss
        </p>
      </div>
    </>
  )
}
