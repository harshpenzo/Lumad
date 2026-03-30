import { useRef } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import ScreenCard from '../ui/ScreenCard'
import { useScreens } from '../../hooks/useScreens'
import './ScreenCarousel.css'

/**
 * ScreenCarousel
 * Fetches top 6 available screens from Supabase via useScreens hook.
 * Shows skeleton cards while loading.
 */
export default function ScreenCarousel() {
  const headerRef = useScrollReveal(0.08)
  const trackRef  = useRef(null)
  const { screens, loading } = useScreens({ availability: true })
  const carouselScreens = screens.slice(0, 6)

  function scrollLeft()  { trackRef.current?.scrollBy({ left: -290, behavior: 'smooth' }) }
  function scrollRight() { trackRef.current?.scrollBy({ left:  290, behavior: 'smooth' }) }

  return (
    <section className="carousel-section" aria-labelledby="carousel-title">
      <div className="carousel-section__header container reveal" ref={headerRef}>
        <div className="carousel-section__title-group">
          <span className="carousel-section__eyebrow mono">LIVE INVENTORY</span>
          <h2 id="carousel-title" className="carousel-section__title">
            Screens across India,<br />
            live on LUMAD.
          </h2>
          <p className="carousel-section__sub">
            From premium highway gantries to sleek airport digital pods,
            find the perfect canvas for your brand.
          </p>
        </div>
        <div className="carousel-section__nav" aria-label="Carousel navigation">
          <button className="carousel-section__arrow" onClick={scrollLeft}  aria-label="Scroll carousel left">←</button>
          <button className="carousel-section__arrow" onClick={scrollRight} aria-label="Scroll carousel right">→</button>
        </div>
      </div>

      <div className="carousel-section__track-wrap">
        <div className="carousel-section__track" ref={trackRef} role="list">
          {loading ? (
            /* Skeleton placeholder cards while fetching */
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="screen-card-skeleton" aria-hidden="true" />
            ))
          ) : (
            carouselScreens.map((screen) => (
              <div key={screen.id} role="listitem">
                <ScreenCard
                  screen={screen}
                  variant="carousel"
                  onSelect={() => { window.location.href = '/discover' }}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
