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
      {
        step: 1,
        tag: 'Field Setup',
        title: 'Portfolio & Field Setup',
        desc: 'We map each loan to a geographic footprint: field boundary (GeoJSON) or tile grid, crop type, season window, and region context. Output: a normalized "field profile" used consistently across monitoring, scoring, and reporting.',
        tagline: 'Everything is tied to geography.',
        footer: 'Inputs: boundary/tile · crop · season · region',
      },
      {
        step: 2,
        tag: 'Multi-Modal Signals',
        title: 'Satellite + Weather Signals',
        desc: 'We stream multi-modal evidence: Sentinel-1 (radar), Sentinel-2 (optical), and weather/soil proxies to build a time-series per field. We track vegetation dynamics (NDVI trend), moisture/precip anomalies, and heat stress. Output: clean features for the model — updated continuously through the season.',
        tagline: 'Evidence updates through the season.',
        footer: 'Signals → Features: NDVI trend · anomalies · stress indicators',
      },
      {
        step: 3,
        tag: 'ML Risk Engine',
        title: 'Probabilistic Risk Forecast (ML)',
        desc: 'Our ML model turns features into a risk distribution, not a single guess: p10/p50/p90 yield anomaly scenarios, downside risk, risk category + confidence. Output: decision-grade risk numbers with traceable drivers.',
        tagline: 'We model uncertainty: p10/p50/p90.',
        footer: 'Model outputs: p10 · p50 · p90 · risk class · confidence',
      },
      {
        step: 4,
        tag: 'Decision & Advice',
        title: 'Actionable Dashboard + AI Recommendations',
        desc: 'We translate model outputs into bank-ready actions: limits, pricing signals, monitoring intensity, early-warning triggers. An AI assistant adds "what changed & why", recommended next steps, and report-ready summaries for credit committees.',
        tagline: 'AI turns risk into actions.',
        footer: 'Decision layer: alerts · explanation · recommendations · report-ready',
      },
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
      {
        phase: 'Phase 1',
        title: 'Foundation',
        period: 'Completed / Now',
        milestone: 'MVP + Data Backbone Ready',
        items: [
          { text: 'MVP dashboard & risk cockpit built', status: 'done' as const },
          { text: '8 years of satellite-derived signals assembled (Sentinel-based)', status: 'done' as const },
          { text: 'Initial conversations with Agrobank stakeholders (problem validation + workflow fit)', status: 'done' as const },
          { text: 'Baseline risk outputs (p10/p50/p90 scenarios) + explainable drivers (v1)', status: 'done' as const },
        ],
      },
      {
        phase: 'Phase 2',
        title: 'Pilot + Product Hardening',
        period: 'Next 3–6 months',
        milestone: 'Bank Pilot + MoA Integration',
        items: [
          { text: 'Pilot with 1 bank (portfolio subset) + KPI validation', status: 'planned' as const },
          { text: 'Integration track with Ministry of Agriculture (Uzbekistan) / data access alignment', status: 'planned' as const },
          { text: 'LLM launch: fine-tune / adapt an assistant on agro + banking domain for better recommendations & explanations', status: 'planned' as const },
          { text: 'Improve field boundary pipeline (GeoJSON acquisition + segmentation + QC)', status: 'planned' as const },
          { text: 'Governance: audit logs, confidence flags, monitoring alerts, API v1', status: 'planned' as const },
        ],
      },
      {
        phase: 'Phase 3',
        title: 'Scale in Central Asia',
        period: '2027+',
        milestone: 'Multi-Country Scale',
        items: [
          { text: 'Enter 2–3 Central Asia markets with local partners', status: 'planned' as const },
          { text: "Work with each country's Ministry of Agriculture / agencies for boundary + reporting alignment", status: 'planned' as const },
          { text: 'Insurance module: claim verification + parametric triggers', status: 'planned' as const },
          { text: 'Portfolio analytics: regional concentration risk, early-warning heatmaps, capital allocation support', status: 'planned' as const },
          { text: 'Enterprise readiness: SLA, security review, multi-tenant deployments', status: 'planned' as const },
        ],
      },
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
