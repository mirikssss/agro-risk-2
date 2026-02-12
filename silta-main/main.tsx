import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import HeroPage from './pages/HeroPage'
import ProblemPage from './pages/ProblemPage'
import SolutionPage from './pages/SolutionPage'
import HowPage from './pages/HowPage'
import WhyUsPage from './pages/WhyUsPage'
import BusinessPage from './pages/BusinessPage'
import RoadmapPage from './pages/RoadmapPage'
import TeamPage from './pages/TeamPage'
import DemoPage from './pages/DemoPage'
import MVPPage from './pages/MVPPage'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HeroPage />} />
          <Route path="/problem" element={<ProblemPage />} />
          <Route path="/solution" element={<SolutionPage />} />
          <Route path="/how" element={<HowPage />} />
          <Route path="/whyus" element={<WhyUsPage />} />
          <Route path="/business" element={<BusinessPage />} />
          <Route path="/roadmap" element={<RoadmapPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/demo" element={<DemoPage />} />
          <Route path="/mvp" element={<MVPPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
