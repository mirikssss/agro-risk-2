import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  /** Optional 12-col grid wrapper; use when you need grid inside */
  grid?: boolean
}

export default function EditorialSection({ children, className = '', grid }: Props) {
  return (
    <section className={`section-border py-16 md:py-24 ${className}`}>
      <div className={`max-w-[1200px] mx-auto px-6 ${grid ? 'grid grid-cols-12 gap-6 md:gap-8' : ''}`}>
        {children}
      </div>
    </section>
  )
}
