import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PageTransition from './components/PageTransition'
import SatelliteOrb from './components/SatelliteOrb'
import { TransitionProvider } from './components/TransitionContext'

export default function Layout() {
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
        <SatelliteOrb />
      </div>
    </TransitionProvider>
  )
}
