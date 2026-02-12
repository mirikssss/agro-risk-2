/**
 * Premium editorial agro-tech design tokens.
 * Single source of truth for colors, spacing, typography.
 */

export const theme = {
  colors: {
    bg: '#F6F1E8',
    surface: '#FFFFFF',
    surfaceAlt: '#FBF7F0',
    text: '#141414',
    muted: '#5E5E5E',
    line: 'rgba(20,20,20,0.10)',
    accent: '#2F6F4E',
    accent2: '#2B5FD9',
    warn: '#C46A2B',
    good: '#2F6F4E',
    bad: '#B23A3A',
    /** Before (risk) — muted red that fits warm paper */
    beforeBg: '#EDE0DC',
    beforeBorder: 'rgba(178,58,58,0.2)',
    /** After (solution) — muted green that fits warm paper */
    afterBg: '#E2EBE4',
    afterBorder: 'rgba(47,111,78,0.25)',
    /** Tech accent for KPI/alerts only */
    techAccent: '#2D7A6E',
    techLime: 'rgba(109,176,134,0.35)',
  },
  fonts: {
    serif: '"Instrument Serif", "Playfair Display", Georgia, serif',
    sans: '"Manrope", "Inter", system-ui, sans-serif',
  },
  layout: {
    containerMax: 1200,
    containerNarrow: 720,
    gridColumns: 12,
    sectionPaddingY: 80,
    sectionPaddingX: 24,
  },
  radius: {
    card: 20,
    button: 10,
    badge: 6,
  },
  shadow: {
    card: '0 2px 20px rgba(20,20,20,0.06)',
    cardHover: '0 8px 40px rgba(20,20,20,0.08)',
  },
  typography: {
    h1: { fontSize: 'clamp(40px, 5.5vw, 64px)', fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.02em' },
    h2: { fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 600, lineHeight: 1.15, letterSpacing: '-0.02em' },
    h3: { fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 600, lineHeight: 1.25 },
    body: { fontSize: 17, lineHeight: 1.65 },
    bodySm: { fontSize: 15, lineHeight: 1.6 },
    label: { fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const },
  },
} as const

export type Theme = typeof theme
