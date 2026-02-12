/**
 * Why Us page: achievements, validation metrics, certificates.
 * Images: NASA = /2.jpg, Kapitalbank = /77.webp; certificates = /33.png, /44.png, /55.png, /66.png
 */
export const EVIDENCE_BADGES = [
    '8 years satellite history',
    'Validated uncertainty (p10–p90)',
    'Bank workflow-ready',
    'Explainable outputs + AI recommendations',
];
export const ACHIEVEMENTS = [
    {
        id: 'space',
        title: 'Space-grade remote sensing experience',
        description: 'We ship with real satellite data and production-grade pipelines.',
        bullets: [
            'NASA Space Apps winners — shipped under pressure with real satellite data.',
            'We know the pitfalls: clouds, noise, missing tiles, seasonal bias.',
            'We build systems that survive messy Earth data — not toy demos.',
        ],
        image: '/2.jpg',
        imageAlt: 'NASA Space Apps',
    },
    {
        id: 'banking',
        title: 'Built with a banker\'s mindset',
        description: 'Designed for underwriting, limits, and portfolio risk — not just dashboards.',
        bullets: [
            'Team lead works as a data/systems analyst in Kapitalbank.',
            'We design for underwriting, limits, monitoring, and portfolio risk — not "pretty dashboards".',
            'Outputs are written for decision-makers: what happened, why it matters, what to do next.',
        ],
        image: '/77.webp',
        imageAlt: 'Banking domain experience',
    },
];
export const METRICS = {
    maeP50: '1.3464',
    rmseP50: '1.6038',
    coverageP10P90: '80.01',
    coverageTarget: '70–85%',
    downsideMissRate: '16.89',
    downsideTarget: '10–20%',
    volatilitySpreadMean: '2.6196',
};
export const METRICS_EXPLANATION = [
    'We don\'t only predict yield; we predict uncertainty bands (p10/p90) to quantify downside risk.',
    'Coverage within target band means the uncertainty calibration is practical for risk decisions.',
];
export const SATELLITES_VS_REPORTS = [
    {
        label: 'Reports',
        points: ['Delayed', 'Subjective', 'Inconsistent verification'],
    },
    {
        label: 'Field visits',
        points: ['Expensive', 'Limited coverage', 'Doesn\'t scale'],
    },
    {
        label: 'Satellite signals',
        points: ['Objective', 'Repeatable', 'Portfolio-wide', 'Trend-based early warnings'],
    },
];
export const CERTIFICATES = [
    { src: '/33.png', caption: 'Coursera Certificate' },
    { src: '/44.png', caption: 'Coursera Certificate' },
    { src: '/55.png', caption: 'Coursera Certificate' },
    { src: '/66.png', caption: 'Coursera Certificate' },
];
export const DIFFERENTIATION_BULLETS = [
    'Historical satellite dataset pipeline (8 years)',
    'Uncertainty-calibrated risk scoring (p10/p90)',
    'Bank-native product thinking (Kapitalbank experience)',
    'Explainable outputs + recommendations layer',
];
