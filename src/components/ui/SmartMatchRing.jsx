import './SmartMatchRing.css'

/**
 * SmartMatchRing — Circular progress ring showing AI match %
 * Sourced from Stitch Screen Discovery: "Smart Match Engine" component
 * SVG ring that draws itself on mount.
 *
 * Props:
 *   score  — 0–100 match percentage
 *   size   — ring diameter in px (default 64)
 *   stroke — stroke width (default 4)
 */
export default function SmartMatchRing({ score = 0, size = 64, stroke = 4 }) {
  const radius = (size - stroke * 2) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  // Color based on score
  const color =
    score >= 85 ? 'var(--color-primary)' :
    score >= 65 ? 'var(--color-secondary)' :
    'var(--color-outline)'

  return (
    <div
      className="match-ring"
      style={{ width: size, height: size }}
      aria-label={`Match score: ${score}%`}
      title={`Smart Match: ${score}%`}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-surface-container-highest)"
          strokeWidth={stroke}
        />
        {/* Progress */}
        <circle
          className="match-ring__progress"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ '--ring-offset': offset }}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <span className="match-ring__label" style={{ color }}>
        {score}
        <span className="match-ring__unit">%</span>
      </span>
    </div>
  )
}
