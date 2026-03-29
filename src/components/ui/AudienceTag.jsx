import './AudienceTag.css'

/**
 * AudienceTag — Tag chips on screen cards (audience segments)
 * Stitch: "The Filter Layer — label-md, pill-shaped, secondary-fixed background."
 */
export default function AudienceTag({ label, className = '' }) {
  return (
    <span className={`audience-tag ${className}`}>
      {label}
    </span>
  )
}
