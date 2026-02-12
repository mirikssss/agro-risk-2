import { ReactNode, MouseEvent } from 'react'
import { usePageTransition } from './TransitionContext'

interface Props {
  to: string
  children: ReactNode
  className?: string
  style?: React.CSSProperties
  onClick?: () => void
}

export default function TransitionLink({ to, children, className, style, onClick }: Props) {
  const { navigateTo } = usePageTransition()

  const handleClick = (e: MouseEvent) => {
    e.preventDefault()
    onClick?.()
    navigateTo(to)
  }

  return (
    <a href={to} onClick={handleClick} className={className} style={style}>
      {children}
    </a>
  )
}
