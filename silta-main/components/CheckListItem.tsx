import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  done?: boolean
  className?: string
}

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0" aria-hidden>
    <path d="M16.25 5L7.5 13.75 3.75 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const TodoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 opacity-60" aria-hidden>
    <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.5" />
  </svg>
)

export default function CheckListItem({ children, done = true, className = '' }: Props) {
  return (
    <li className={`flex items-start gap-3 text-[15px] text-[var(--color-text)] ${className}`}>
      <span className="mt-0.5 text-[var(--color-accent)]" aria-hidden>
        {done ? <CheckIcon /> : <TodoIcon />}
      </span>
      <span>{children}</span>
    </li>
  )
}
