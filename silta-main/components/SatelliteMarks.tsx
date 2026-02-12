/**
 * Small satellite-themed labels: coordinates, tile IDs, sensor names.
 * Use in corners of hero/sections to reinforce "we work with satellites".
 */

type Props = {
  /** e.g. "41.31°N, 69.24°E" or "S2 · 37TGS" */
  coordinate?: string
  /** e.g. "Sentinel-2" or "NDVI" */
  sensor?: string
  /** Position: top-left, top-right, bottom-left, bottom-right */
  position?: 'tl' | 'tr' | 'bl' | 'br'
  className?: string
  /** White text for overlay on photo */
  onPhoto?: boolean
}

const posClass = {
  tl: 'top-3 left-3',
  tr: 'top-3 right-3',
  bl: 'bottom-3 left-3',
  br: 'bottom-3 right-3',
}

export function SatelliteCoordinate({ coordinate, position = 'tl', className = '' }: Props) {
  if (!coordinate) return null
  return (
    <span
      className={`absolute text-[10px] font-mono tracking-wider text-[var(--color-muted)] opacity-70 ${posClass[position]} ${className}`}
      aria-hidden
    >
      {coordinate}
    </span>
  )
}

export function SatelliteSensorBadge({ sensor, position = 'tr', className = '' }: Props) {
  if (!sensor) return null
  return (
    <span
      className={`absolute text-[10px] font-semibold uppercase tracking-widest text-accent/90 ${posClass[position]} ${className}`}
      aria-hidden
    >
      {sensor}
    </span>
  )
}

/** Combined: coordinate + sensor for hero image or panels */
export default function SatelliteMarks({
  coordinate = '41.31°N, 69.24°E',
  sensor = 'Sentinel-2',
  position = 'tl',
  className = '',
  onPhoto = false,
}: Props) {
  const textCoord = onPhoto ? 'text-white/95' : 'text-[var(--color-muted)] opacity-70'
  const textSensor = onPhoto ? 'text-white/90' : 'text-accent/80'
  return (
    <div className={`absolute pointer-events-none z-10 ${posClass[position]} ${className}`} aria-hidden>
      <span className={`text-[10px] font-mono tracking-wider ${textCoord} block`}>
        {coordinate}
      </span>
      <span className={`text-[9px] font-semibold uppercase tracking-widest ${textSensor} mt-0.5 block`}>
        {sensor}
      </span>
    </div>
  )
}
