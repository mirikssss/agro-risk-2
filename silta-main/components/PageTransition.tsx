import { ReactNode } from 'react'
import { usePageTransition } from './TransitionContext'

interface Props { children: ReactNode }

export default function PageTransition({ children }: Props) {
  const { isExiting } = usePageTransition()

  return (
    <div
      style={{
        pointerEvents: isExiting ? 'none' : 'auto',
        minHeight: isExiting ? '100vh' : undefined,
      }}
    >
      {children}
    </div>
  )
}
