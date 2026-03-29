import GlassCard from './GlassCard'
import StatBadge from './StatBadge'
import AudienceTag from './AudienceTag'
import SmartMatchRing from './SmartMatchRing'
import { formatINR, formatIndianNumber } from '../../utils/formatCurrency'
import './ScreenCard.css'

/**
 * ScreenCard — DOOH screen listing card
 * Sourced from Stitch "Screen Discovery": card pattern showing
 * screen name, location, footfall, dwell time, estimated investment,
 * audience tags, and Smart Match score.
 *
 * Props:
 *   screen     — screen object from mockScreenData
 *   selected   — boolean, is this card currently selected
 *   onSelect   — click handler (screen) => void
 *   variant    — 'list' | 'carousel' (default: 'list')
 */
export default function ScreenCard({ screen, selected = false, onSelect, onBook, variant = 'list' }) {
  const typeLabels = {
    highway:   'Highway',
    mall:      'Mall',
    airport:   'Airport',
    metro:     'Metro',
    tech_park: 'Tech Park',
  }

  return (
    <article
      className={`screen-card screen-card--${variant} ${selected ? 'screen-card--selected' : ''}`}
      onClick={() => onSelect?.(screen)}
      aria-pressed={selected}
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onSelect?.(screen)}
    >
      {/* Screen image / placeholder */}
      <div className="screen-card__image">
        {screen.image ? (
          <img 
            src={screen.image} 
            alt={screen.name} 
            className="screen-card__img" 
            loading="lazy"
          />
        ) : (
          <div className="screen-card__image-placeholder">
            <span className="screen-card__type-badge">{typeLabels[screen.type] ?? screen.type}</span>
            <span className="screen-card__size-badge mono">
              {screen.width}×{screen.height} {screen.unit}
            </span>
          </div>
        )}
        
        {/* Overlay badges (always show on top of image or placeholder) */}
        {screen.image && (
          <div className="screen-card__image-overlay">
            <span className="screen-card__type-badge">{typeLabels[screen.type] ?? screen.type}</span>
            <span className="screen-card__size-badge mono">
              {screen.width}×{screen.height} {screen.unit}
            </span>
          </div>
        )}
        {/* Availability dot */}
        <span className={`screen-card__avail ${screen.available ? 'screen-card__avail--online' : 'screen-card__avail--offline'}`}>
          {screen.available ? 'Available' : 'Booked'}
        </span>
      </div>

      <div className="screen-card__body">
        {/* Header row */}
        <div className="screen-card__header">
          <div className="screen-card__title-group">
            <h3 className="screen-card__name">{screen.name}</h3>
            <p className="screen-card__location">
              <span className="screen-card__location-icon">📍</span>
              {screen.location}
            </p>
          </div>
          <SmartMatchRing score={screen.matchScore} size={52} stroke={3} />
        </div>

        {/* Stats row */}
        <div className="screen-card__stats">
          <div className="screen-card__stat">
            <span className="screen-card__stat-label mono">FOOTFALL</span>
            <span className="screen-card__stat-value mono">
              {formatIndianNumber(screen.footfallPerDay)}<span className="screen-card__stat-unit">/day</span>
            </span>
          </div>
          <div className="screen-card__stat">
            <span className="screen-card__stat-label mono">DWELL TIME</span>
            <span className="screen-card__stat-value mono">
              {screen.dwellTime}<span className="screen-card__stat-unit"> min</span>
            </span>
          </div>
          <div className="screen-card__stat">
            <span className="screen-card__stat-label mono">EST. INVESTMENT</span>
            <span className="screen-card__stat-value screen-card__stat-value--amber mono">
              {formatINR(screen.pricePerDay, true)}<span className="screen-card__stat-unit">/day</span>
            </span>
          </div>
        </div>

        {/* Audience tags */}
        {variant === 'list' && (
          <div className="screen-card__audiences">
            {screen.audiences.slice(0, 3).map((a) => (
              <AudienceTag key={a} label={a} />
            ))}
          </div>
        )}

        {/* CTA */}
        {variant === 'list' && (
          <div className="screen-card__footer">
            <StatBadge
              label={screen.available ? 'AVAILABLE' : 'BOOKED'}
              variant={screen.available ? 'success' : 'muted'}
            />
            <button
              className="screen-card__book-btn"
              onClick={(e) => {
                e.stopPropagation()
                onBook ? onBook(screen) : onSelect?.(screen)
              }}
              aria-label={`Book ${screen.name}`}
            >
              Book Now →
            </button>
          </div>
        )}
      </div>
    </article>
  )
}
