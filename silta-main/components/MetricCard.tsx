import { ReactNode } from 'react'

type Props = {
  value: string
  label: string
  icon?: ReactNode
  className?: string
}

export default function MetricCard({ value, label, icon, className = '' }: Props) {
  return (
    <div
      className={`
        rounded-2xl border border-surface-border bg-surface-card backdrop-blur-sm
        px-6 py-5 text-center transition-all duration-300
        hover:border-data-cyan/30 hover:bg-data-cyan/5
        ${className}
      `}
    >
      {icon && <div className="flex justify-center mb-3 opacity-80">{icon}</div>}
      <div className="text-2xl md:text-3xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm text-gray-400">{label}</div>
    </div>
  )
}
