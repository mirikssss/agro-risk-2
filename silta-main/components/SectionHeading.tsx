import { ReactNode } from 'react'

type Props = {
  title: string
  subtitle?: string
  children?: ReactNode
  className?: string
}

export default function SectionHeading({ title, subtitle, children, className = '' }: Props) {
  return (
    <header className={`mb-12 md:mb-16 ${className}`}>
      <h2 className="font-serif text-[var(--color-text)] text-[clamp(28px,4vw,44px)] font-semibold leading-[1.15] tracking-[-0.02em] mb-3 max-w-3xl">
        {title}
      </h2>
      {subtitle && (
        <p className="text-[17px] leading-[1.65] text-[var(--color-muted)] max-w-2xl">
          {subtitle}
        </p>
      )}
      {children}
    </header>
  )
}
