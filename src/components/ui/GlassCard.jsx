import './GlassCard.css'

/**
 * GlassCard — Base glassmorphism wrapper
 * Stitch designMd: "Backdrop Blur (20px-40px) + semi-transparent surface_variant.
 * Active elements cast glow light: 24px blur, primary at 8%."
 *
 * Props:
 *   variant — 'default' | 'heavy' | 'screen' (screen preview frame)
 *   hover   — enables hover lift effect
 *   glow    — adds ambient amber glow
 *   padding — 'sm' | 'md' | 'lg' | 'none'
 */
export default function GlassCard({
  children,
  variant = 'default',
  hover = false,
  glow = false,
  padding = 'md',
  className = '',
  onClick,
}) {
  const classes = [
    'glass-card-comp',
    `glass-card-comp--${variant}`,
    `glass-card-comp--pad-${padding}`,
    hover ? 'glass-card-comp--hover' : '',
    glow ? 'glass-card-comp--glow' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} onClick={onClick}>
      {children}
    </div>
  )
}
