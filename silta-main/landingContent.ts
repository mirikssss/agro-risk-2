export const content = {
  nav: {
    logo: 'AgroRisk',
    menu: [
      { label: 'Problem', path: '/problem' },
      { label: 'Solution & Impact', path: '/solution' },
      { label: 'How It Works', path: '/how' },
      { label: 'Why Us', path: '/whyus' },
      { label: 'Business Model', path: '/business' },
      { label: 'Roadmap', path: '/roadmap' },
      { label: 'Team', path: '/team' },
      { label: 'Demo', path: '/demo' },
    ],
    cta: 'Request a Pilot',
  },

  hero: {
    h1: 'Turn satellite signals into bank-ready risk decisions.',
    sub: 'We combine satellite imagery, weather data, and AI to deliver early crop-stress alerts and decision-ready risk scores for banks and insurers.',
    rightText: 'Embrace satellite-derived evidence, gain early risk signals, and leverage AI-powered scores to make lending and underwriting decisions before losses materialize.',
    bullets: [
      { icon: 'clock', text: 'Early risk detection - weeks before field reports' },
      { icon: 'score', text: 'Simple risk score & alerts - no complex maps' },
      { icon: 'api', text: 'Built for banks & insurers - API-ready platform' },
    ],
    cta1: 'Request Pilot',
    cta2: 'View Demo',
    descriptionBlock: 'AgroRisk is a satellite AI risk engine for banks and insurers. We combine optical and radar imagery, weather data, and anomaly detection to monitor crops at scale and deliver decision-ready risk scores and alerts via API or dashboard.',
    widget: {
      score: 42,
      level: 'Medium',
      trend: 'Worsening',
      ndvi: [0.72, 0.70, 0.65, 0.58, 0.52, 0.48],
      pipeline: 'Satellite > AI > Risk score > Action',
    },
  },

  problem: {
    kpi: '$300M+',
    kpiLabel: 'estimated agricultural losses in Uzbekistan (2024)',
    kpiFootnote: 'source to be confirmed',
    reasons: [
      { title: 'Late Detection', desc: 'Risks surface only after damage. Banks learn about crop failure when loans default - not when stress begins.' },
      { title: 'No Objective Signals', desc: 'Decisions rely on farmer self-reporting and infrequent inspections instead of continuous, satellite-derived evidence.' },
      { title: 'Manual Underwriting', desc: 'No standardized, data-driven approach. Portfolios are blind to correlated weather shocks across regions.' },
    ],
    bankNeed: 'Banks and insurers need continuous, objective field monitoring that delivers actionable signals before losses materialize - not after claims are filed.',
  },

  solution: {
    title: 'Solution & Impact',
    sub: 'Act before losses materialize — with satellite-grade evidence.',
    subLong: 'Turn raw Earth observation signals into decision-ready risk for banks and insurers: p10 / p50 / p90 outcomes, drivers, and recommended actions—before field reports arrive.',
    subSmall: 'Satellite-first. No farmer self-reporting. No waiting for claims.',
    sourceOfTruth: {
      title: 'Single source of truth: space',
      lead: 'Every risk score and alert is built from satellite data. We use zero data from the bank or the farmer.',
      points: [
        'No self-reporting from farmers',
        'No portfolio or internal data uploads from the bank',
        'Continuous Earth observation only — objective, and available before field reports',
      ],
    },
    before: {
      label: 'Before AgroRisk',
      intro: 'Risk is discovered late — after the money is already exposed.',
      items: [
        'Credit decisions rely on manual checks and inconsistent field visits',
        'Stress is invisible until it becomes missed payments or claims',
        'Portfolio managers lack a continuous, objective signal across regions',
        'Claim verification becomes slow, costly, and often disputed',
      ],
    },
    after: {
      label: 'With AgroRisk',
      intro: 'Risk is quantified early — as a probability distribution, not a gut feeling. All inputs from satellites; zero from the bank or the farmer.',
      items: [
        'Continuous monitoring from Sentinel-1 radar + Sentinel-2 optical + weather (works even under clouds via radar)',
        'Output is p10 / p50 / p90 yield anomaly scenarios + risk class (downside is explicit)',
        'Clear "what changed & why": vegetation dynamics (NDVI), moisture/precip anomalies, heat stress, season timeline',
        'Actions, not charts: underwriting limits, pricing suggestions, monitoring intensity, early intervention triggers',
      ],
    },
    pillars: [
      {
        title: 'Underwriting that survives the downside',
        sub: 'From single-number scoring → to downside-aware underwriting.',
        body: "We don't just predict \"expected\" outcome. We show downside (p10) and range (p10–p90) so your limits and pricing reflect reality, not averages.",
      },
      {
        title: 'Monitoring that scales without field visits',
        sub: 'Monitor thousands of fields remotely — continuously.',
        body: 'Satellite imagery can be compiled across large farm populations quickly and remotely, reducing dependence on costly in-person visits.',
      },
      {
        title: 'Faster, cleaner verification for insurance',
        sub: 'Evidence-based verification instead of disputes.',
        body: 'Satellite-derived indices and stress monitoring are widely discussed as inputs for crop insurance design and verification workflows.',
      },
    ],
    pilotTargets: [
      { label: 'Time-to-signal', text: 'detect abnormal stress weeks earlier than manual reporting' },
      { label: 'Ops efficiency', text: 'reduce manual portfolio checks with automated monitoring & alerts' },
      { label: 'Loss prevention', text: 'earlier intervention to reduce late-stage defaults/claims' },
    ],
    pilotFootnote: 'Targets depend on crop, region, season and partner workflow. Validated during pilot.',
    oneLiner: 'Satellite → Model → p10/p50/p90 → Recommendation → Decision.',
  },

  how: {
    title: 'How It Works',
    sub: 'From field to score in four steps.',
    steps: [
      { step: 1, title: 'Field Identification', desc: 'Define field boundaries using cadastral data and open satellite imagery. Link parcels to your portfolio.', tag: 'Tile Grid' },
      { step: 2, title: 'Multi-Modal Monitoring', desc: 'Sentinel-2 (optical), Sentinel-1 (radar), weather stations. Continuous monitoring regardless of clouds.', tag: 'Sentinel-1/2 + Weather' },
      { step: 3, title: 'AI Risk Analysis', desc: 'Anomaly detection, moisture pattern analysis, NDVI trends. Flag stress and contextualize with weather events.', tag: 'Anomaly Detection' },
      { step: 4, title: 'Actionable Output', desc: 'Risk score (0-100), trend (improving/worsening), human-readable alerts. Delivered via dashboard or API.', tag: 'Score + Alerts' },
    ],
  },

  whyUs: {
    title: 'Why Us',
    cards: [
      { title: 'Proven Excellence', desc: 'NASA Space Apps Challenge winners. Demonstrated ability to ship under pressure with cutting-edge space technology.', badge: 'NASA Space Apps' },
      { title: 'Research-Driven Mindset', desc: 'Our approach is grounded in peer-reviewed remote sensing research and validated anomaly detection methods. Reliability over hype.' },
    ],
    differentiator: {
      title: 'Satellites-First. No Manual Reporting.',
      desc: 'No reliance on farmer self-reporting or government archives. Continuous, objective coverage from space is our key differentiator for agricultural risk assessment.',
    },
  },

  business: {
    title: 'Business Model',
    sub: 'Three engagement scenarios.',
    tiers: [
      { name: 'Bank Portfolio API', desc: 'Integrate risk scores into credit workflows. Subscription + per-query pricing.', bestFor: 'Commercial banks', path: 'Pilot > Integration > Scale' },
      { name: 'Insurance Claim Verification', desc: 'Satellite-based verification for crop insurance claims. Pay per verification.', bestFor: 'Insurance companies', path: 'Pilot > SLA > Portfolio' },
      { name: 'Regional Risk Monitoring', desc: 'Dashboard for regional agricultural risk assessment. Annual subscription.', bestFor: 'Government / DFIs', path: 'Pilot > Deployment > Expansion' },
    ],
  },

  roadmap: {
    title: 'Roadmap',
    phases: [
      { phase: 'Phase 1', title: 'Foundation', period: 'Q1-Q2 2026', items: ['MVP development', 'Pilot with 1-2 banks in Uzbekistan', 'Historical data validation', 'Dashboard v1'] },
      { phase: 'Phase 2', title: 'Scale', period: 'Q3-Q4 2026', items: ['API integration', 'Insurance module', 'Multi-region coverage', '10+ institutional clients'] },
      { phase: 'Phase 3', title: 'Expansion', period: '2027+', items: ['Central Asia coverage', 'Credit scoring integration', 'Real-time monitoring', 'Series A readiness'] },
    ],
  },

  team: {
    title: 'Team',
    sub: 'ML / Geo / Banking / Product',
    members: [
      { name: 'Mirakmal Mirzaxidov', role: 'Team Lead', area: 'Product & Coordination', image: '/mirakmal-mirzaxidov.jpg' },
      { name: 'Muhammad Farrux Odilov', role: 'AI Engineer', area: 'ML model train and LLM integration', image: '/mukhmmadfarukh-odilov.jpg' },
      { name: 'Farangiz Iskandarova', role: 'UI/UX Researcher & Designer', area: 'UX & visual design', image: '/farangiz-iskandarova.jpg' },
      { name: 'Akmal Isfandiyorov', role: 'Satellite data & risk models', area: 'Platform & API', image: '/akmal-isfandiyorov.jpg' },
    ],
  },

  demo: {
    title: 'Demo',
    sub: 'See the platform in action.',
    subtitle: 'See the platform in action.',
    features: ['Field-level risk scoring', 'Historical & current vegetation index', 'Interactive dashboard', 'Alert management'],
    ctaDashboard: 'Open Dashboard',
    ctaLive: 'Request Live Demo',
    panel: {
      leftTitle: 'Sample region',
      rightTitle: 'Risk output',
      ctaDashboard: 'Open Dashboard',
      ctaLive: 'Request Live Demo',
      selects: [
        { label: 'Country', options: ['Uzbekistan', 'Kazakhstan'] },
        { label: 'Region', options: ['Tashkent', 'Fergana'] },
        { label: 'Crop', options: ['Cotton', 'Wheat'] },
        { label: 'Year', options: ['2024', '2023'] },
      ],
      outputPlaceholder: {
        score: 42,
        level: 'Medium',
        trend: 'Worsening',
        alerts: ['NDVI decline in sector B', 'Drought risk elevated'],
      },
    },
  },

  mvp: {
    title: 'MVP',
    sub: 'Current capabilities.',
    features: [
      'Field scoring with satellite data',
      'Historical & current vegetation monitoring',
      'Weather correlation analysis',
      'Risk dashboard with alerts',
      'Region-level portfolio view',
    ],
  },

  footer: {
    tagline: 'Satellite AI risk engine for banks and insurers.',
    email: 'contact@agrorisk.io',
    copyright: '(c) 2026 AgroRisk',
  },
}
