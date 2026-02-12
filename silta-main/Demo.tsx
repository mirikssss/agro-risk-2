import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import DemoPanel from './components/DemoPanel'
import { content } from './landingContent'

export default function Demo() {
  return (
    <div className="min-h-screen bg-surface-dark text-white font-sans">
      <nav className="sticky top-0 z-50 border-b border-surface-border bg-surface-dark/90 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-3 text-white font-bold"
            >
              <div className="w-10 h-10 rounded-xl bg-agro-green/20 border border-agro-green/40 flex items-center justify-center">
                <img src="/logo.png" alt="" className="w-7 h-7 object-contain" />
              </div>
              AgroRisk
            </Link>
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-300 hover:bg-white/5 text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {content.demo.title}
          </h1>
          <p className="text-gray-400">
            {content.demo.sub}
          </p>
        </div>
        <DemoPanel />
        <p className="mt-6 text-sm text-gray-500 text-center">
          This is a UI mock. Risk output is illustrative. Request a live demo for real data.
        </p>
      </main>
    </div>
  )
}
