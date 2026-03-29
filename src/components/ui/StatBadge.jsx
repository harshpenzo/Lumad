import './StatBadge.css'

/**
 * StatBadge — Amber pill stat display
 * Stitch designMd: "Mission Status Chips — rounded-full, label-sm (Space Mono).
 * Use secondary_fixed_dim for 'Active'. Amber for key stats."
 *
 * Props:
 *   label   — short label text (e.g. "42K /day")
 *   prefix  — small text before (e.g. "REACH")
 *   variant — 'amber' | 'cyan' | 'success' | 'muted'
 */
export default function StatBadge({ label, prefix, variant = 'amber', className = '' }) {
  return (
    <span className={`stat-badge stat-badge--${variant} ${className}`}>
      {prefix && <span className="stat-badge__prefix">{prefix}</span>}
      <span className="stat-badge__label">{label}</span>
    </span>
  )
}
