import { ReactNode } from 'react'

type Props = {
  step: number
  title: string
  desc: string
  icon: ReactNode
  isLast?: boolean
}

export default function StepCard({ step, title, desc, icon, isLast }: Props) {
  return (
    <div className="relative flex gap-6 md:gap-8">
      {!isLast && (
        <div className="absolute left-8 top-16 bottom-0 w-px bg-surface-border hidden md:block" />
      )}
      <div className="relative z-10 flex-shrink-0 w-16 h-16 rounded-2xl bg-data-cyan/20 border border-data-cyan/30 flex items-center justify-center text-data-cyan">
        {icon}
      </div>
      <div className="flex-1 pb-12 md:pb-16">
        <span className="text-sm font-semibold text-data-cyan mb-2 block">Step {step}</span>
        <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400">{desc}</p>
      </div>
    </div>
  )
}
