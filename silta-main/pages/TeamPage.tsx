import { content } from '../landingContent'
import AnimateIn from '../components/AnimateIn'
import SectionHeading from '../components/SectionHeading'
import { EditorialSection } from '../components/editorial'

export default function TeamPage() {
  const t = content.team
  return (
    <div className="bg-[var(--color-bg)] satellite-grid">
      <EditorialSection>
        <AnimateIn from="top" duration={800}>
          <SectionHeading title={t.title} subtitle={t.sub} />
        </AnimateIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.members.map((m, i) => (
            <AnimateIn key={i} from="bottom" delay={120 + i * 80} duration={800}>
              <div
                className="rounded-[20px] border border-[var(--color-line)] bg-[var(--color-surface)] overflow-hidden transition-all duration-300 hover:shadow-[0_8px_40px_rgba(20,20,20,0.08)] hover:border-[rgba(20,20,20,0.14)]"
                style={{ boxShadow: '0 2px 20px rgba(20,20,20,0.06)' }}
              >
                {/* Photo flush with card top/left/right — no padding */}
                <div className="aspect-[3/4] w-full overflow-hidden">
                  <img
                    src={m.image}
                    alt={m.name}
                    className="block w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-[var(--color-text)] text-lg mb-1">{m.name}</h3>
                  <p className="text-[12px] font-semibold text-accent uppercase tracking-wider mb-2">{m.role}</p>
                  <p className="text-[14px] text-[var(--color-muted)] leading-[1.5]">{m.area}</p>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </EditorialSection>
    </div>
  )
}
