import { useEffect, useRef, useState, ReactNode } from 'react'
import { usePageTransition } from './TransitionContext'

type Direction = 'left' | 'right' | 'top' | 'bottom' | 'fade'

interface Props {
  children: ReactNode
  from?: Direction
  delay?: number
  duration?: number
  className?: string
  style?: React.CSSProperties
  once?: boolean
  distance?: number
  exitDelay?: number
}

// How far elements travel (in px)
const defaultDist: Record<Direction, [number, number]> = {
  left:   [-100, 0],
  right:  [100, 0],
  top:    [0, -80],
  bottom: [0, 80],
  fade:   [0, 0],
}

export default function AnimateIn({
  children,
  from = 'bottom',
  delay = 0,
  duration = 1000,
  className = '',
  style = {},
  once = true,
  distance,
  exitDelay,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  const { isExiting } = usePageTransition()

  const [dx, dy] = defaultDist[from]
  const mult = distance ? distance / Math.max(Math.abs(dx || 1), Math.abs(dy || 1)) : 1
  const offX = dx * mult
  const offY = dy * mult

  // Exit: fly back to where they came from
  const exitX = offX   // same direction = back where it came from
  const exitY = offY

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setVis(true); return }
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); if (once) obs.unobserve(el) }
      else if (!once) setVis(false)
    }, { threshold: 0.08 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [once])

  // Determine current visual state
  const entering = vis && !isExiting
  const exiting = isExiting

  // Exit delay: stagger elements slightly (reverse order feels nice — use the entry delay reversed)
  const computedExitDelay = exitDelay !== undefined ? exitDelay : Math.max(0, delay * 0.3)
  const exitDuration = 700

  let opacity = 0
  let transform = `translate(${offX}px, ${offY}px) scale(0.96)`
  let transition = `opacity ${duration}ms cubic-bezier(.22,1,.36,1) ${delay}ms, transform ${duration}ms cubic-bezier(.22,1,.36,1) ${delay}ms`

  if (entering) {
    opacity = 1
    transform = 'translate(0, 0) scale(1)'
    transition = `opacity ${duration}ms cubic-bezier(.22,1,.36,1) ${delay}ms, transform ${duration}ms cubic-bezier(.22,1,.36,1) ${delay}ms`
  } else if (exiting) {
    opacity = 0
    transform = `translate(${exitX}px, ${exitY}px) scale(0.94)`
    transition = `opacity ${exitDuration}ms cubic-bezier(.4,0,.2,1) ${computedExitDelay}ms, transform ${exitDuration}ms cubic-bezier(.4,0,.2,1) ${computedExitDelay}ms`
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity,
        transform,
        transition,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  )
}
