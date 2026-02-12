type Props = {
  text: string
  className?: string
}

export default function QuoteBlock({ text, className = '' }: Props) {
  return (
    <blockquote
      className={`
        relative pl-6 pr-6 py-5 rounded-2xl border border-surface-border bg-surface-card/80 backdrop-blur-sm
        text-gray-300 italic
        before:absolute before:left-4 before:top-5 before:w-1 before:h-12 before:rounded-full before:bg-data-cyan/50
        ${className}
      `}
    >
      "{text}"
    </blockquote>
  )
}
