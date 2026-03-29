import './GhostButton.css'

/**
 * GhostButton — Outlined secondary button
 * Stitch designMd: "Rounded-full, outline border, no fill.
 * On hover: fill with secondary_container at 10% opacity."
 */
export default function GhostButton({
  children,
  onClick,
  href,
  size = 'md',
  fullWidth = false,
  type = 'button',
  disabled = false,
  className = '',
}) {
  const classes = [
    'ghost-btn',
    `ghost-btn--${size}`,
    fullWidth ? 'ghost-btn--full' : '',
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
    >
      {children}
    </button>
  )
}
