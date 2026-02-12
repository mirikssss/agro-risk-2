import { content } from '../landingContent'
import AnimateIn from '../components/AnimateIn'
import SectionHeading from '../components/SectionHeading'
import { EditorialSection } from '../components/editorial'

export default function RoadmapPage() {
  const r = content.roadmap
  return (
    <div className="bg-[var(--color-bg)] satellite-grid">
      <EditorialSection>
        <AnimateIn from="top" duration={800}>
          <SectionHeading title={r.title} />
        </AnimateIn>

        {/* Progress bar */}
        <div className="h-1 rounded-full bg-[var(--color-line)] overflow-hidden mb-8">
          <div className="h-full rounded-full bg-accent transition-all duration-500" style={{ width: '33%' }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 rounded-xl border border-[var(--color-line)] overflow-hidden bg-[var(--color-surface)]">
          {r.phases.map((p, i) => (
            <AnimateIn key={i} from="bottom" delay={120 + i * 100} duration={800}>
              <div className="relative p-6 md:p-8 border-b md:border-b-0 md:border-r border-[var(--color-line)] last:md:border-r-0">
                <span className="absolute top-4 right-4 text-[10px] font-semibold text-accent uppercase tracking-wider border border-accent rounded px-2 py-0.5">
                  Milestone
                </span>
                <p className="text-[11px] font-semibold text-accent uppercase tracking-wider">{p.phase}</p>
                <h3 className="font-serif text-[var(--color-text)] text-xl md:text-2xl font-semibold mt-1 mb-1">
                  {p.title}
                </h3>
                <p className="text-[14px] text-[var(--color-muted)] mb-6">{p.period}</p>
                <ul className="space-y-2 list-none p-0 m-0">
                  {p.items.map((it, j) => (
                    <li key={j} className="flex items-center gap-2 text-[14px] text-[var(--color-text)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateIn>
          ))}
        </div>
      </EditorialSection>
    </div>
  )
}
