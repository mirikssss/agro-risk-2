import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { content } from '../landingContent'
import TransitionLink from './TransitionLink'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const loc = useLocation()

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 32)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  useEffect(() => { setOpen(false) }, [loc.pathname])

  return (
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
            className="lg:hidden p-2 rounded-md border-none bg-transparent cursor-pointer text-[var(--color-text)]"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? (
                <><line x1="6" y1="6" x2="18" y2="18" /><line x1="6" y1="18" x2="18" y2="6" /></>
              ) : (
                <><line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="17" x2="20" y2="17" /></>
              )}
            </svg>
          </button>
        </div>

        <div
          className="lg:hidden overflow-hidden transition-[max-height] duration-300 ease-out"
          style={{ maxHeight: open ? 400 : 0 }}
        >
          <div className="pt-3 pb-4 border-t border-[var(--color-line)] mt-2">
            {content.nav.menu.map((m) => (
              <TransitionLink
                key={m.path}
                to={m.path}
                className="block py-2.5 px-3 text-[15px] font-medium no-underline text-[var(--color-text)]"
              >
                {m.label}
              </TransitionLink>
            ))}
            <TransitionLink
              to="/demo"
              className="block mt-3 mx-3 py-3 rounded-[10px] font-semibold text-[14px] text-white no-underline text-center bg-accent2"
            >
              {content.nav.cta}
            </TransitionLink>
          </div>
        </div>
      </div>
    </nav>
  )
}
