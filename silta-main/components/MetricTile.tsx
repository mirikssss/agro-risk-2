import { ReactNode } from 'react'

type Props = {
  value: string
  label: string
  note?: string
  icon?: ReactNode
  className?: string
}

export default function MetricTile({ value, label, note, icon, className = '' }: Props) {
  return (
    <div
      className={`
        rounded-[20px] border border-[var(--color-line)] bg-[var(--color-surface)]
        p-6 text-left transition-all duration-300
        hover:shadow-[0_8px_40px_rgba(20,20,20,0.08)]
        ${className}
      `}
      style={{ boxShadow: '0 2px 20px rgba(20,20,20,0.06)' }}
    >
      {icon && <div className="mb-3 opacity-80">{icon}</div>}
      <div className="text-2xl md:text-3xl font-semibold text-[var(--color-text)] font-serif mb-1">
        {value}
      </div>
      <div className="text-[15px] text-[var(--color-muted)] leading-snug">{label}</div>
      {note && (
        <div className="mt-2 text-[12px] text-[var(--color-muted)] opacity-80">{note}</div>
      )}
    </div>
  )
}
