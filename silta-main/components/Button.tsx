import { ReactNode } from 'react'
import TransitionLink from './TransitionLink'

type Props = {
  children: ReactNode
  to?: string
  href?: string
  variant?: 'primary' | 'secondary' | 'outline'
  onClick?: () => void
  type?: 'button' | 'submit'
  className?: string
  style?: React.CSSProperties
}

const base = 'inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-[10px] px-5 py-3 text-[15px]'

export default function Button({
  children,
  to,
  href,
  variant = 'primary',
  onClick,
  type = 'button',
  className = '',
  style = {},
}: Props) {
  const variants = {
    primary: 'bg-accent2 text-white hover:opacity-90 shadow-sm',
    secondary: 'bg-[var(--color-accent)] text-white hover:opacity-90 shadow-sm',
    outline: 'bg-transparent border border-[var(--color-line)] text-[var(--color-text)] hover:border-[var(--color-muted)] hover:bg-[var(--color-surfaceAlt)]',
  }

  const combined = `${base} ${variants[variant]} ${className}`.trim()

  if (to) {
    return (
      <TransitionLink to={to} className={combined} style={style}>
        {children}
      </TransitionLink>
    )
  }
  if (href) {
    return (
      <a href={href} className={combined} style={style} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }
  return (
    <button type={type} onClick={onClick} className={combined} style={style}>
      {children}
    </button>
  )
}
