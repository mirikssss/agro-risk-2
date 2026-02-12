import { content, DEMO_URL } from '../landingContent'

type Tier = (typeof content.business.tiers)[number]

type Props = {
  tier: Tier
}

export default function PricingCard({ tier }: Props) {
  return (
    <div
      className="rounded-2xl border p-6 md:p-8 h-full flex flex-col transition-all duration-300"
      style={{ borderColor: 'rgba(255,255,255,0.08)', backgroundColor: 'rgba(255,255,255,0.06)' }}
    >
      <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
      <p className="text-sm text-gray-400 mb-4">{tier.desc}</p>
      <p className="text-sm text-gray-400 mb-6">Best for: {tier.bestFor}</p>
      <p className="text-xs text-gray-500 mb-8">{tier.path}</p>
      <a
        href={DEMO_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto block text-center py-3 px-4 rounded-xl font-semibold text-sm transition-colors border border-white/10 text-white hover:bg-white/5 no-underline"
      >
        Learn More
      </a>
    </div>
  )
}
