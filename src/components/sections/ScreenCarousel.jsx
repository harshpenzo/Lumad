import { useRef } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import ScreenCard from '../ui/ScreenCard'
import { mockScreens } from '../../utils/mockScreenData'
import './ScreenCarousel.css'

/**
 * ScreenCarousel
 * Sourced from Stitch homepage:
 * "Western Express Highway Gantry / Phoenix Marketcity Atrium / IGI Airport T3 Arrivals"
 * Horizontal scrollable carousel of ScreenCard components (carousel variant).
 *
 * FIX: ref and reveal class are now on the same element (header div).
 * The track-wrap has explicit margin-top so it never overlaps the header.
 */

const CAROUSEL_SCREENS = mockScreens.filter((s) => s.available).slice(0, 6)

export default function ScreenCarousel() {
  const headerRef = useScrollReveal(0.08)
  const trackRef  = useRef(null)

  function scrollLeft() {
    trackRef.current?.scrollBy({ left: -290, behavior: 'smooth' })
  }
  function scrollRight() {
    trackRef.current?.scrollBy({ left: 290, behavior: 'smooth' })
  }

  return (
    <section className="carousel-section" aria-labelledby="carousel-title">
      {/* ref and reveal are on the SAME element — fixes animation bug */}
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
          <button
            className="carousel-section__arrow"
            onClick={scrollLeft}
            aria-label="Scroll carousel left"
          >←</button>
          <button
            className="carousel-section__arrow"
            onClick={scrollRight}
            aria-label="Scroll carousel right"
          >→</button>
        </div>
      </div>

      {/* track-wrap is outside reveal so it never gets transformed/hidden */}
      <div className="carousel-section__track-wrap">
        <div className="carousel-section__track" ref={trackRef} role="list">
          {CAROUSEL_SCREENS.map((screen) => (
            <div key={screen.id} role="listitem">
              <ScreenCard
                screen={screen}
                variant="carousel"
                onSelect={() => { window.location.href = '/discover' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
