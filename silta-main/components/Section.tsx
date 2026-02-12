import { ReactNode } from 'react'

type Props = {
  id: string
  children: ReactNode
  className?: string
  title?: string
  subtitle?: string
}

export default function Section({ id, children, className = '', title, subtitle }: Props) {
  return (
    <section id={id} className={`py-16 md:py-24 px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="max-w-6xl mx-auto">
        {(title || subtitle) && (
          <header className="mb-12 md:mb-16">
            {title && (
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg md:text-xl text-gray-400 max-w-2xl">
                {subtitle}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  )
}
