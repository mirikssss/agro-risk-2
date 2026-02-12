import { useState } from 'react'
import { content } from '../landingContent'
import { ExternalLink } from 'lucide-react'

const { panel } = content.demo

export default function DemoPanel() {
  const [country, setCountry] = useState(panel.selects[0].options[0])
  const [region, setRegion] = useState(panel.selects[1].options[0])
  const [crop, setCrop] = useState(panel.selects[2].options[0])
  const [year, setYear] = useState(panel.selects[3].options[0])

  return (
    <div className="rounded-2xl border border-surface-border bg-surface-card/80 backdrop-blur-sm overflow-hidden">
      <div className="grid md:grid-cols-2 gap-0">
        {/* Left: sample region controls */}
        <div className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-surface-border">
          <h3 className="text-lg font-semibold text-white mb-4">{panel.leftTitle}</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">{panel.selects[0].label}</label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-navy border border-surface-border text-white focus:outline-none focus:ring-2 focus:ring-data-cyan/50"
              >
                {panel.selects[0].options.map((o: string) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">{panel.selects[1].label}</label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-navy border border-surface-border text-white focus:outline-none focus:ring-2 focus:ring-data-cyan/50"
              >
                {panel.selects[1].options.map((o: string) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">{panel.selects[2].label}</label>
              <select
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-navy border border-surface-border text-white focus:outline-none focus:ring-2 focus:ring-data-cyan/50"
              >
                {panel.selects[2].options.map((o: string) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">{panel.selects[3].label}</label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-navy border border-surface-border text-white focus:outline-none focus:ring-2 focus:ring-data-cyan/50"
              >
                {panel.selects[3].options.map((o: string) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Right: Risk Output mock */}
        <div className="p-6 md:p-8 bg-surface-navy/50">
          <h3 className="text-lg font-semibold text-white mb-4">{panel.rightTitle}</h3>
          <div className="space-y-4">
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-white">{panel.outputPlaceholder.score}</span>
              <span className="px-2.5 py-0.5 rounded-md bg-risk-amber/20 text-risk-amber text-sm font-medium">
                {panel.outputPlaceholder.level}
              </span>
            </div>
            <div>
              <span className="text-sm text-gray-400">Trend: </span>
              <span className="text-risk-red font-medium">{panel.outputPlaceholder.trend}</span>
            </div>
            <div>
              <span className="text-sm text-gray-400 block mb-2">Alerts:</span>
              <ul className="space-y-1.5">
                {panel.outputPlaceholder.alerts.map((a: string, i: number) => (
                  <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                    <span className="text-risk-amber mt-0.5">•</span>
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-6 border-t border-surface-border flex flex-wrap gap-3">
        <button
          type="button"
          className="px-4 py-2.5 rounded-xl bg-surface-card border border-surface-border text-white font-medium text-sm hover:bg-white/5 transition-colors inline-flex items-center gap-2"
        >
          {panel.ctaDashboard}
          <ExternalLink className="w-4 h-4" />
        </button>
        <a
          href="#demo"
          className="px-4 py-2.5 rounded-xl bg-agro-green text-surface-dark font-semibold text-sm hover:bg-agro-green/90 transition-colors inline-flex items-center gap-2"
        >
          {panel.ctaLive}
        </a>
      </div>
    </div>
  )
}
