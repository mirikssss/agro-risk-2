/**
 * Single source of truth for the Investor/Jury Assistant.
 * Shared by frontend (components/facts.tsx) and server (api/ai).
 * Do not invent numbers. If a value isn't verified, explain validation plan.
 */
export const FACTS = {
    product: {
        name: "AgroRisk",
        tagline: "Satellite-to-score risk intelligence for banks & insurers",
        oneLiner: "We turn satellite + weather signals into bank-ready risk scores, early warnings, and actionable recommendations — weeks before losses materialize.",
        websitePositioning: "From Sentinel signals to portfolio decisions — with clear p10/p50/p90 scenarios and explainable drivers.",
        audience: ["Commercial banks", "Agri lenders", "Insurers", "DFIs / Gov programs"],
        geographyFocus: ["Uzbekistan (initial focus)", "Central Asia (expansion)"],
    },
    currentStatus: {
        mvp: "ready",
        mvpNotes: [
            "MVP is implemented and demo-able (dashboard-style product experience).",
            "Core workflow exists: region/field context → signals → scoring outputs → explanation layer.",
        ],
        stakeholderConversations: [
            {
                org: "Agrobank (Uzbekistan)",
                status: "in_progress",
                notes: [
                    "We have spoken with representatives to validate workflow and information needs.",
                    "No claim of partnership or procurement unless signed; treat as discovery/validation.",
                ],
            },
        ],
        dataset: {
            satelliteYears: 8,
            coverageNote: "We have assembled multi-year satellite signal history suitable for training/validation and seasonal baselines.",
            status: "ready",
            notes: [
                "Multi-year history enables seasonal baselines, anomaly detection, and scenario bands (p10/p50/p90).",
                "Data quality still depends on correct field boundaries for true per-field scoring.",
            ],
        },
    },
    problem: {
        corePain: "Banks and insurers discover agricultural risk too late — after crop stress becomes default, not when early signals appear.",
        whyNow: [
            "Climate volatility increases correlated shocks across portfolios.",
            "Satellite + weather data is available continuously; underwriting workflows still lag behind.",
            "Banks need explainable, auditable signals — not black-box scores.",
        ],
        commonBankPainPoints: [
            "Reactive detection (post-damage) instead of early warning",
            "Subjective field inspections and self-reported farmer data",
            "Slow claim verification / slow portfolio monitoring",
            "Portfolio blind spots (correlated drought/heat/vegetation stress across regions)",
        ],
    },
    solution: {
        whatWeDeliver: [
            "Continuous monitoring of agricultural areas using satellite and weather signals",
            "Risk scoring outputs designed for banking decisions (limits, pricing, monitoring)",
            "Explainable drivers and scenario bands (p10/p50/p90) to support underwriting",
            "AI recommendations and next actions based on historical patterns and current signals",
        ],
        outcomes: [
            "Earlier risk detection (weeks ahead of manual reporting)",
            "Better underwriting discipline via evidence-based signals",
            "Faster, more objective monitoring and claim support",
            "Portfolio-level visibility across regions and crops",
        ],
        whyItMatters: [
            "Banks don't need more dashboards — they need decision-grade signals that fit credit workflows.",
            "Scenario thinking (p10/p50/p90) helps risk teams plan downside and set guardrails.",
        ],
    },
    howItWorks: {
        pipelineSummary: "Field/Region → Satellite & Weather Signals → ML Risk Outputs (p10/p50/p90) → Alerts → Explainable Insights → AI Recommendations → Decision/API",
        steps: [
            {
                id: 1,
                title: "Field Context & Identification",
                subtitle: "Link land to the borrower and define what to monitor",
                whatHappens: [
                    "Map the borrower's land (field boundaries where available) or start with a region-level proxy.",
                    "Attach crop type / season and create a monitoring scope.",
                ],
                outputs: ["Monitoring scope (field or region)", "Crop/season context and baseline period definition"],
                bankerValue: [
                    "Creates an auditable link between a loan and the land exposure.",
                    "Defines what 'normal' looks like for this scope before scoring begins.",
                ],
            },
            {
                id: 2,
                title: "Multi-Modal Monitoring",
                subtitle: "Satellites + weather, continuously",
                whatHappens: [
                    "Ingest Sentinel-2 optical vegetation signals (when cloud-free).",
                    "Use Sentinel-1 radar to reduce cloud dependency (structure/moisture proxies).",
                    "Combine with weather anomalies (precipitation, temperature) and seasonal baselines.",
                ],
                outputs: [
                    "Time-series signals (vegetation, moisture proxies, weather anomalies)",
                    "Baselines (multi-year seasonal expectations)",
                ],
                bankerValue: [
                    "Objective, continuous evidence — not subjective field visits.",
                    "Early signal detection before defaults and claims spike.",
                ],
            },
            {
                id: 3,
                title: "ML Risk Modeling (Scenarios, Not Just a Score)",
                subtitle: "Compute risk outputs, drivers, and uncertainty bands",
                whatHappens: [
                    "Model estimates risk-relevant anomalies vs seasonal baselines.",
                    "Produces scenario bands: downside (p10), expected (p50), upside (p90).",
                    "Extracts top drivers (e.g., drought pressure, NDVI drop, persistent stress).",
                ],
                outputs: [
                    "Risk score (0–100 or calibrated scale)",
                    "Trend (improving / stable / worsening)",
                    "Scenario bands (p10/p50/p90) for planning and limits",
                    "Drivers (what moved the score)",
                ],
                bankerValue: [
                    "Risk teams can set limits/pricing using scenario logic, not gut feel.",
                    "Explainability: 'why is it risky' is as important as 'what is the score'.",
                ],
            },
            {
                id: 4,
                title: "Decision-Ready Output + AI Recommendations",
                subtitle: "Turn outputs into actions",
                whatHappens: [
                    "Surface alerts and a banker-readable explanation (what changed, why it matters).",
                    "Generate recommendations using historical patterns + current risk outputs (LLM layer).",
                    "Deliver via dashboard and API for integration into credit workflows.",
                ],
                outputs: [
                    "Alerts and summaries for credit officers",
                    "Recommended next actions (monitoring, verification, pricing/limit flags)",
                    "API-ready payload for integration",
                ],
                bankerValue: [
                    "Shortens time from signal → decision.",
                    "Makes analytics usable: clear actions instead of raw indices.",
                ],
            },
        ],
    },
    dataAndSignals: {
        satellites: [
            {
                name: "Sentinel-2 (optical)",
                whatItAdds: [
                    "Vegetation condition and crop stress signals via optical indices",
                    "Seasonal baselines and anomaly detection across years",
                ],
                exampleSignals: ["NDVI and NDVI-change vs baseline", "Vegetation health percentile vs multi-year history"],
            },
            {
                name: "Sentinel-1 (SAR / radar)",
                whatItAdds: [
                    "Reduced sensitivity to clouds",
                    "Moisture/structure-related proxies (depending on processing)",
                ],
                exampleSignals: ["Radar backscatter trends", "Moisture proxy features (if implemented)"],
            },
        ],
        weather: {
            sources: ["Weather reanalysis / station-derived feeds (implementation dependent)"],
            features: [
                "Precipitation anomaly (drought pressure)",
                "Temperature anomaly (heat stress)",
                "Seasonal stress composite (weighted components)",
            ],
            notes: [
                "Weather contributes to stress context and helps disambiguate vegetation signals.",
                "Exact provider can be stated if already chosen in code/config.",
            ],
        },
        soilAndLand: {
            note: "We use soil/land proxies where available (not lab-grade soil sampling).",
            proxies: [
                "Land cover / land use context",
                "Terrain & elevation proxies (where available)",
                "Moisture-related proxies (via radar + weather context)",
            ],
            whyUseful: [
                "Improves interpretation of vegetation signals (e.g., drought sensitivity varies by land context).",
                "Supports portfolio comparisons across regions with different baseline conditions.",
            ],
        },
        fieldBoundaries: {
            status: "in_progress",
            whyImportant: [
                "True per-borrower scoring requires accurate field boundaries (GeoJSON/shapefile).",
                "Without boundaries we may default to region proxies which reduces specificity.",
            ],
            approach: [
                "Collect/obtain official or semi-official parcel boundaries where possible.",
                "Fallback: semi-automatic segmentation using satellite imagery + human validation for MVP.",
                "Quality control: consistency checks across seasons/years and spatial plausibility filters.",
            ],
            disclaimer: ["We do not claim nationwide field boundary coverage yet; this is a priority workstream."],
        },
    },
    model: {
        philosophy: [
            "Prefer objective signals over self-reporting.",
            "Quantify uncertainty via scenario bands (p10/p50/p90) instead of pretending single-point certainty.",
            "Prioritize explainability: drivers must be visible and auditable for bank adoption.",
        ],
        outputs: {
            riskScore: "A calibrated risk score designed for credit workflows (interpretable scale; higher means higher risk).",
            trend: "Direction of change over recent windows (improving / stable / worsening) to support monitoring.",
            scenarios: {
                p10: "Downside scenario — what risk looks like under worse-than-typical conditions (lower tail).",
                p50: "Expected scenario — central estimate based on current signals and seasonal baseline.",
                p90: "Upside scenario — what risk looks like under better-than-typical conditions (upper tail).",
                plainExplanation: [
                    "p10/p50/p90 are scenario bands, not promises.",
                    "They help banks plan limits/pricing with downside awareness and avoid false certainty.",
                ],
            },
            drivers: [
                "Vegetation anomaly vs multi-year seasonal baseline",
                "NDVI drop vs previous period",
                "Drought pressure (precip anomaly)",
                "Heat stress (temp anomaly, if applicable)",
                "Persistence of stress over time window",
            ],
            alerts: [
                "Early warning when stress crosses thresholds or trend worsens",
                "Portfolio-level clustering of risks (correlated regional stress)",
            ],
        },
        explainability: {
            whatWeShow: [
                "What changed (signals and deltas)",
                "Why the score moved (top drivers + simple narrative)",
                "Scenario band interpretation (p10/p50/p90) in plain language",
            ],
            howWeAvoidBlackBox: [
                "Expose drivers and baseline comparisons instead of a single opaque number.",
                "Keep consistent definitions for metrics (e.g., baseline years, percentile logic).",
            ],
        },
        benchmarks: {
            mae_p50: 1.3464,
            rmse_p50: 1.6038,
            coverage_p10_p90_pct: 80.01,
            downside_miss_rate_pct: 16.89,
            volatility_spread_mean: 2.6196,
            summary: "Backtested yield risk engine: p50 MAE 1.3464, RMSE 1.6038. Uncertainty band p10–p90 achieves 80.01% coverage (within 70–85% target). Downside miss rate 16.89% (within 10–20% target). Mean p90–p10 spread 2.6196 for risk-sensitive decisioning.",
            notes: [
                "MAE/RMSE are for p50 (median) yield estimate on the evaluation set.",
                "Coverage is empirical probability that true yield falls inside the predicted p10–p90 interval.",
                "Downside miss rate measures how often the model underestimates downside risk (misses bad outcomes).",
                "Spread (p90–p10) represents uncertainty width; used for pricing/limits and confidence flags.",
                "Do not claim external validation/pilot performance unless signed.",
            ],
        },
    },
    recommendations: {
        engine: "An AI guidance layer that translates model outputs + historical patterns into banker-friendly actions (LLM-assisted, grounded in computed signals).",
        types: [
            "Recommended monitoring actions (when to re-check, what to verify)",
            "Risk policy suggestions (flag for limit/pricing review based on scenario band)",
            "Claim verification support (where signals suggest mismatch or heightened risk)",
            "Data requests (what additional info would reduce uncertainty)",
        ],
        format: [
            "Short summary + key numbers highlighted",
            "Drivers + 'so what' explanation",
            "Next actions checklist",
        ],
        disclaimer: [
            "Recommendations are decision support, not automatic approvals/denials.",
            "We avoid hallucinations by grounding advice in computed outputs and known context.",
        ],
    },
    differentiators: {
        vsTypicalProcess: [
            "Continuous monitoring instead of episodic field visits",
            "Objective signals instead of self-reported data",
            "Scenario bands (p10/p50/p90) instead of single-point certainty",
            "Explainable drivers aligned with bank risk governance",
        ],
        vsGenericCompetitors: [
            "Bank-ready outputs: designed for underwriting/monitoring workflows, not just agronomy dashboards",
            "Explainability and uncertainty handling (scenario bands) as a first-class feature",
            "Focus on Uzbekistan/Central Asia realities (data availability, field boundary constraints, integration paths)",
        ],
        defensibility: [
            "Multi-year historical signal dataset and baselines",
            "Workflow integration focus (dashboard + API + decision narratives)",
            "Planned domain-tuned LLM for better recommendations (agro + banking context)",
        ],
    },
    businessModel: {
        primaryUsers: ["Banks", "Insurers", "Government/DFI programs"],
        offerings: [
            {
                name: "Bank Portfolio API",
                bestFor: ["Commercial banks", "Agri lenders"],
                pricingLogic: ["Subscription + usage-based per query (depending on integration depth)"],
                integration: ["Risk score API", "Alerts webhook", "Dashboard access for analysts"],
            },
            {
                name: "Insurance Claim Verification",
                bestFor: ["Crop insurance providers"],
                pricingLogic: ["Pay-per-verification or tiered packages"],
                integration: ["Claim evidence packet", "Signal summaries and drivers"],
            },
            {
                name: "Regional Risk Monitoring",
                bestFor: ["Government / DFIs"],
                pricingLogic: ["Annual subscription"],
                integration: ["Region dashboards", "Early warning reports", "Policy monitoring"],
            },
        ],
    },
    roadmap: {
        phases: [
            {
                title: "Now (MVP → Pilot)",
                timeframe: "2026",
                readiness: "ready",
                checklist: [
                    { item: "MVP dashboard and core scoring workflow", status: "done" },
                    { item: "8-year satellite signal history assembled", status: "done" },
                    { item: "Discovery conversations with bank stakeholders", status: "done" },
                    { item: "Pilot design with 1–2 institutions", status: "in_progress" },
                    { item: "Field boundaries acquisition + QC pipeline", status: "in_progress" },
                ],
            },
            {
                title: "Integration & Reliability",
                timeframe: "Next 6–12 months",
                readiness: "in_progress",
                checklist: [
                    { item: "API integration into bank credit workflows", status: "planned" },
                    { item: "Ministry of Agriculture integration (data access / validation)", status: "planned" },
                    { item: "Model validation/backtesting report (verified metrics)", status: "in_progress" },
                    { item: "Insurance module (claim verification workflow)", status: "planned" },
                ],
            },
            {
                title: "Scale to Central Asia + Domain AI",
                timeframe: "2027+",
                readiness: "planned",
                checklist: [
                    { item: "Domain-tuned LLM (agro + banking) for sharper recommendations", status: "planned" },
                    { item: "Multi-country coverage (Central Asia)", status: "planned" },
                    { item: "Partnership approach with each country's agriculture agencies", status: "planned" },
                    { item: "Near real-time monitoring and portfolio risk clustering", status: "planned" },
                ],
            },
        ],
        wowButReal: [
            "Build bank-grade explainable risk intelligence for agriculture — not just agronomy charts.",
            "Make scenario-based risk (p10/p50/p90) standard for agri lending decisions in the region.",
        ],
    },
    complianceAndBoundaries: {
        truthRules: [
            "Never fabricate metrics, partnerships, customers, or deployment status.",
            "If a number is not verified, say it's being validated and explain how.",
            "Always separate 'ready now' vs 'planned' in responses.",
        ],
        partnerships: [
            "We can say: 'we spoke with Agrobank representatives' / 'in discussions'.",
            "We must NOT say: 'partnered with' / 'integrated with' unless signed and implemented.",
            "Same rule applies to Ministry of Agriculture integration: in progress/planned only.",
        ],
        privacy: [
            "Minimize personal/borrower data in chat; focus on product-level explanation.",
            "Any portfolio data in demos should be synthetic/anonymized unless explicit permission exists.",
        ],
    },
    faqSeeds: [
        { q: "What problem do you solve for banks and insurers?", intentTag: "overview" },
        { q: "How does AgroRisk work step-by-step?", intentTag: "overview" },
        { q: "What data do you use (Sentinel, weather, soil)?", intentTag: "data" },
        { q: "What do p10/p50/p90 mean in plain language?", intentTag: "model" },
        { q: "How is your score explainable and auditable?", intentTag: "model" },
        { q: "How are you better than competitors?", intentTag: "competition" },
        { q: "What is ready today vs what is in roadmap?", intentTag: "roadmap" },
        { q: "How would a bank integrate this into underwriting?", intentTag: "bank_value" },
    ],
};
