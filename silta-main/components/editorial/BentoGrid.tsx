import { ReactNode } from 'react'

type Cell = { children: ReactNode; span?: 'sm' | 'md' | 'lg'; className?: string }

type Props = {
  cells: Cell[]
  className?: string
}

const spanClass = { sm: 'md:col-span-4', md: 'md:col-span-6', lg: 'md:col-span-12' }

export default function BentoGrid({ cells, className = '' }: Props) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 ${className}`}>
      {cells.map((cell, i) => (
        <div key={i} className={`${spanClass[cell.span ?? 'md']} ${cell.className ?? ''}`}>
          {cell.children}
        </div>
      ))}
    </div>
  )
}
