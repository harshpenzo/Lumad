import { useScrollReveal } from '../../hooks/useScrollReveal'
import AmberButton from '../ui/AmberButton'
import './FinalCTA.css'

/**
 * FinalCTA
 * Sourced from Stitch homepage: "Your ad. Every screen in India. Starting today."
 * Fixed: ref is now on the same element as the 'reveal' class.
 */
export default function FinalCTA() {
  const innerRef = useScrollReveal(0.10)

  return (
    <section className="finalcta" aria-labelledby="finalcta-title">
      {/* Ambient glow */}
      <div className="finalcta__glow" aria-hidden="true" />

      <div className="finalcta__inner container reveal" ref={innerRef}>
        <h2 id="finalcta-title" className="finalcta__title">
          Your ad. Every screen in<br />
          India. <span className="finalcta__title-accent italic">Starting today.</span>
        </h2>
        
        <div className="finalcta__actions">
          <AmberButton href="/register" size="lg" pulse>
            Get Started Free
          </AmberButton>
        </div>

        <div className="finalcta__bullet-row mono">
          <span>NO MINIMUM SPEND</span>
          <span className="dot">•</span>
          <span>NO AGENCY NEEDED</span>
          <span className="dot">•</span>
          <span>CANCEL ANYTIME</span>
        </div>
      </div>
    </section>
  )
}
