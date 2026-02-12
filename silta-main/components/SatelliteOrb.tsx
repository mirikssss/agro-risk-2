/**
 * Rotating satellite decorative element — shown on all pages.
 */
export default function SatelliteOrb() {
  return (
    <div
      className="fixed bottom-8 right-8 w-14 h-14 pointer-events-none z-[9997] opacity-40 hidden sm:block"
      aria-hidden
    >
      <div className="w-full h-full animate-satellite-spin">
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-[var(--color-accent)]"
        >
          {/* Satellite body */}
          <rect x="18" y="14" width="12" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
          {/* Solar panel left */}
          <rect x="8" y="18" width="10" height="12" rx="1" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.9" />
          {/* Solar panel right */}
          <rect x="30" y="18" width="10" height="12" rx="1" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.9" />
          {/* Antenna */}
          <line x1="24" y1="14" x2="24" y2="8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          <circle cx="24" cy="8" r="1.5" fill="currentColor" />
        </svg>
      </div>
    </div>
  )
}
