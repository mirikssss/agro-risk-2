import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  variant?: 'default' | 'tech' | 'good' | 'warn'
  className?: string
}

export default function DataChip({ children, variant = 'default', className = '' }: Props) {
  const styles = {
    default: 'bg-[var(--color-surfaceAlt)] border-[var(--color-line)] text-[var(--color-text)]',
    tech: 'bg-[var(--color-tech)]/10 border-[var(--color-tech)]/30 text-[var(--color-tech)]',
    good: 'bg-[var(--color-after)] border-[var(--color-after-border)] text-[var(--color-accent)]',
    warn: 'bg-[var(--color-before)]/80 border-[var(--color-before-border)] text-[var(--color-warn)]',
  }
  return (
    <span
      className={`inline-block px-3 py-1.5 rounded-md border text-[13px] font-medium ${styles[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
