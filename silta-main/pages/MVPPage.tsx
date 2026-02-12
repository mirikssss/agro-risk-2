import { content } from '../landingContent'
import AnimateIn from '../components/AnimateIn'
import SectionHeading from '../components/SectionHeading'
import Card from '../components/Card'

export default function MVPPage() {
  const m = content.mvp
  return (
    <div className="bg-[var(--color-bg)] section-border satellite-grid">
      <div className="max-w-[720px] mx-auto px-6 py-16 md:py-24">
        <AnimateIn from="top" duration={800}>
          <SectionHeading title={m.title} subtitle={m.sub} />
        </AnimateIn>

        <div className="space-y-3">
          {m.features.map((f, i) => (
            <AnimateIn key={i} from="bottom" delay={120 + i * 80} duration={800}>
              <Card hover className="flex items-center gap-4">
                <span className="w-9 h-9 rounded-lg border border-accent text-accent flex items-center justify-center font-semibold text-sm shrink-0">
                  {i + 1}
                </span>
                <span className="text-[15px] text-[var(--color-text)]">{f}</span>
              </Card>
            </AnimateIn>
          ))}
        </div>
      </div>
    </div>
  )
}
