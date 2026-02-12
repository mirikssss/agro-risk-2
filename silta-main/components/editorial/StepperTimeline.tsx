import { useState, ReactNode } from 'react'

export type Step = { id: number; title: string; tag?: string; content: ReactNode }

type Props = {
  steps: Step[]
  diagram?: ReactNode
  className?: string
}

export default function StepperTimeline({ steps, diagram, className = '' }: Props) {
  const [active, setActive] = useState(0)
  const s = steps[active]

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 ${className}`}>
      {/* Sticky nav (desktop) */}
      <nav className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start space-y-1">
        {steps.map((step, i) => (
          <button
            key={step.id}
            type="button"
            onClick={() => setActive(i)}
            className={`
              w-full text-left px-4 py-3 rounded-lg border transition-colors flex items-center gap-3
              ${i === active
                ? 'border-accent bg-[var(--color-after)]/50 text-[var(--color-text)]'
                : 'border-[var(--color-line)] bg-transparent text-[var(--color-muted)] hover:border-[var(--color-muted)]/30'}
            `}
          >
            <span className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center text-sm font-semibold shrink-0">
              {step.id}
            </span>
            <span className="font-medium truncate">{step.title}</span>
          </button>
        ))}
      </nav>

      {/* Content area */}
      <div className="lg:col-span-8">
        {/* Mobile: accordion */}
        <div className="lg:hidden space-y-2">
          {steps.map((step, i) => (
            <div
              key={step.id}
              className="rounded-xl border border-[var(--color-line)] overflow-hidden bg-[var(--color-surface)]"
            >
              <button
                type="button"
                onClick={() => setActive(i === active ? -1 : i)}
                className="w-full flex items-center gap-3 px-4 py-4 text-left"
              >
                <span className="w-8 h-8 rounded-full border-2 border-accent flex items-center justify-center text-sm font-semibold shrink-0">
                  {step.id}
                </span>
                <span className="font-medium flex-1">{step.title}</span>
                <span className="text-[var(--color-muted)]">{active === i ? '−' : '+'}</span>
              </button>
              {active === i && <div className="px-4 pb-4 pt-0 border-t border-[var(--color-line)]">{step.content}</div>}
            </div>
          ))}
        </div>

        {/* Desktop: single content block */}
        <div className="hidden lg:block rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] p-8 shadow-[0_2px_20px_rgba(20,20,20,0.06)]">
          {s?.tag && (
            <span className="text-[11px] font-semibold text-accent tracking-widest uppercase">{s.tag}</span>
          )}
          <h3 className="font-serif text-[var(--color-text)] text-2xl md:text-3xl font-semibold mt-2 mb-4">{s?.title}</h3>
          <div className="text-[15px] text-[var(--color-muted)] leading-[1.65]">{s?.content}</div>
          {diagram && <div className="mt-8 pt-6 border-t border-[var(--color-line)]">{diagram}</div>}
        </div>
      </div>
    </div>
  )
}
