import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
  hover?: boolean
}

export default function Card({ children, className = '', style = {}, hover }: Props) {
  return (
    <div
      className={`
        rounded-[20px] border border-[var(--color-line)] bg-[var(--color-surface)]
        p-6 transition-all duration-300
        ${hover ? 'hover:shadow-[0_8px_40px_rgba(20,20,20,0.08)] hover:border-[rgba(20,20,20,0.14)]' : ''}
        ${className}
      `}
      style={{ boxShadow: '0 2px 20px rgba(20,20,20,0.06)', ...style }}
    >
      {children}
    </div>
  )
}
