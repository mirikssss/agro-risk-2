type Metric = { value: string; label: string }

type Props = {
  /** One large metric (left or top on mobile) */
  primary: Metric
  /** Two smaller metrics (right or below) */
  secondary: Metric[]
  disclaimer?: string
  className?: string
}

export default function MetricStack({ primary, secondary, disclaimer, className = '' }: Props) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 ${className}`}>
      <div className="md:col-span-1 rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] p-6 flex flex-col justify-center" style={{ boxShadow: '0 2px 20px rgba(20,20,20,0.06)' }}>
        <div className="font-serif text-2xl md:text-3xl font-semibold text-[var(--color-tech)]">{primary.value}</div>
        <div className="text-[14px] text-[var(--color-muted)] mt-1">{primary.label}</div>
      </div>
      <div className="md:col-span-2 flex flex-col gap-4">
        {secondary.map((m, i) => (
          <div key={i} className="rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] p-4 md:p-5 flex-1" style={{ boxShadow: '0 2px 20px rgba(20,20,20,0.06)' }}>
            <div className="font-serif text-xl font-semibold text-[var(--color-text)]">{m.value}</div>
            <div className="text-[13px] text-[var(--color-muted)] mt-0.5">{m.label}</div>
          </div>
        ))}
      </div>
      {disclaimer && (
        <p className="md:col-span-3 text-[12px] text-[var(--color-muted)] opacity-80">{disclaimer}</p>
      )}
    </div>
  )
}
