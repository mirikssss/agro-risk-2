import { ReactNode } from 'react'

type Props = {
  left: ReactNode
  right: ReactNode
  reverseOnMobile?: boolean
  className?: string
}

export default function SplitHero({ left, right, reverseOnMobile, className = '' }: Props) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start ${className}`}>
      <div className={reverseOnMobile ? 'order-2 md:order-1' : ''}>{left}</div>
      <div className={reverseOnMobile ? 'order-1 md:order-2' : ''}>{right}</div>
    </div>
  )
}
