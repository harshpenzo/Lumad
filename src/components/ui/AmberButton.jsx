import './AmberButton.css'

/**
 * AmberButton — Primary CTA button
 * Sourced from Stitch designMd: "Rounded-full (9999px), background primary_container,
 * text on_primary. Apply a 2px primary glow on hover."
 *
 * Props:
 *   children  — button label
 *   onClick   — click handler
 *   href      — renders as <a> if provided
 *   size      — 'sm' | 'md' | 'lg' (default: 'md')
 *   fullWidth — stretches to 100%
 *   type      — button type attr
 *   disabled  — disabled state
 *   pulse     — adds continuous glow pulse animation
 */
export default function AmberButton({
  children,
  onClick,
  href,
  size = 'md',
  fullWidth = false,
  type = 'button',
  disabled = false,
  pulse = false,
  className = '',
}) {
  const classes = [
    'amber-btn',
    `amber-btn--${size}`,
    fullWidth ? 'amber-btn--full' : '',
    pulse ? 'amber-btn--pulse' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (href) {
    return (
      <a href={href} className={classes} aria-disabled={disabled}>
        {children}
      </a>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      aria-disabled={disabled}
    >
      {children}
    </button>
  )
}
