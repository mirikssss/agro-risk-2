import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PageTransition from './components/PageTransition'
import { TransitionProvider } from './components/TransitionContext'
import InvestorAssistant from './components/InvestorAssistant'

export default function Layout() {
  const [assistantOpen, setAssistantOpen] = useState(false)
  useEffect(() => {
    const open = () => setAssistantOpen(true)
    window.addEventListener('open-agrorisk-assistant', open)
    return () => window.removeEventListener('open-agrorisk-assistant', open)
  }, [])
  return (
    <TransitionProvider>
      <div style={{ minHeight: '100vh', background: 'var(--color-bg)', color: 'var(--color-text)' }}>
        <Navbar />
        <main style={{ position: 'relative', paddingTop: 72, overflow: 'hidden' }}>
          <PageTransition>
            <Outlet />
          </PageTransition>
        </main>
        <Footer />

        {/* Floating AI assistant — on all pages */}
        <button
          type="button"
          onClick={() => setAssistantOpen(true)}
          className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full shadow-lg border-2 border-[var(--color-accent)] bg-[var(--color-surface)] text-[var(--color-accent)] flex items-center justify-center hover:bg-[var(--color-accent)]/10 transition-colors"
          aria-label="Ask AgroRisk AI"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M12 2l1.8 6.4L20 10l-6.2 1.6L12 18l-1.8-6.4L4 10l6.2-1.6L12 2z" />
          </svg>
        </button>
        <InvestorAssistant open={assistantOpen} onClose={() => setAssistantOpen(false)} />
      </div>
    </TransitionProvider>
  )
}
