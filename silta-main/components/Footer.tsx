import { content, DEMO_URL } from '../landingContent'
import TransitionLink from './TransitionLink'
import Button from './Button'

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-line)] bg-[var(--color-surfaceAlt)] py-12 satellite-grid relative">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-wrap justify-between items-start gap-8">
          <div>
            <p className="font-semibold text-[17px] text-[var(--color-text)] mb-2">{content.nav.logo}</p>
            <p className="text-[14px] text-[var(--color-muted)] max-w-[280px]">{content.footer.tagline}</p>
            <p className="text-[11px] text-[var(--color-muted)] opacity-70 mt-2 font-mono tracking-wider">EO · Sentinel-1/2 · NDVI</p>
          </div>
          <nav className="flex flex-wrap gap-6">
            {content.nav.menu.slice(0, 5).map((m) =>
              m.path.startsWith('http') ? (
                <a
                  key={m.path}
                  href={m.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[14px] text-[var(--color-muted)] no-underline hover:text-[var(--color-text)] transition-colors"
                >
                  {m.label}
                </a>
              ) : (
                <TransitionLink
                  key={m.path}
                  to={m.path}
                  className="text-[14px] text-[var(--color-muted)] no-underline hover:text-[var(--color-text)] transition-colors"
                >
                  {m.label}
                </TransitionLink>
              )
            )}
          </nav>
          <Button href={DEMO_URL} variant="primary">{content.nav.cta}</Button>
        </div>
        <div className="mt-10 pt-6 border-t border-[var(--color-line)] flex flex-wrap justify-between gap-4">
          <a href={'mailto:' + content.footer.email} className="text-[14px] text-accent no-underline hover:opacity-90">
            {content.footer.email}
          </a>
          <span className="text-[13px] text-[var(--color-muted)]">{content.footer.copyright}</span>
        </div>
      </div>
    </footer>
  )
}
