import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
}

export default function Badge({ children, className = '' }: Props) {
  return (
    <span
      className={`
        inline-block px-3 py-1.5 rounded-[6px]
        text-[12px] font-semibold tracking-[0.08em] uppercase
        bg-[var(--color-surfaceAlt)] border border-[var(--color-line)] text-[var(--color-muted)]
        ${className}
      `}
    >
      {children}
    </span>
  )
}
