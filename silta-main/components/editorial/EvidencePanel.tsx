import { ReactNode } from 'react'

type Props = {
  /** Big number / KPI */
  highlight: string
  label: string
  footnote?: string
  /** Optional quote/statement below */
  statement?: ReactNode
  className?: string
}

export default function EvidencePanel({ highlight, label, footnote, statement, className = '' }: Props) {
  return (
    <div className={`rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] p-6 md:p-8 ${className}`} style={{ boxShadow: '0 2px 20px rgba(20,20,20,0.06)' }}>
      <div className="font-serif text-[clamp(36px,5vw,52px)] font-semibold text-[var(--color-text)] leading-none tracking-tight">
        {highlight}
      </div>
      <p className="mt-2 text-[15px] text-[var(--color-muted)]">{label}</p>
      {footnote && <p className="mt-1 text-[12px] text-[var(--color-muted)] opacity-80">{footnote}</p>}
      {statement && (
        <div className="mt-6 pt-6 border-t border-[var(--color-line)] text-[15px] text-[var(--color-text)] leading-[1.6] italic">
          {statement}
        </div>
      )}
    </div>
  )
}
