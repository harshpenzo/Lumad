import AmberButton from '../ui/AmberButton'
import GhostButton from '../ui/GhostButton'
import './HeroSection.css'

export default function HeroSection() {
  return (
    <section className="hero" aria-label="LUMAD hero banner">

      {/* Animated Cyberpunk Background */}
      <div className="hero__bg" aria-hidden="true" />
      <div className="hero__bg-overlay" aria-hidden="true" />

      {/* Optional Glow (from previous design, can keep subtle) */}
      <div className="hero__glow" aria-hidden="true" style={{ opacity: 0.3 }} />

      <div className="hero__inner container">
        
        {/* Pre-headline Badge */}
        <div className="hero__badge-modern animate-fadeUp" style={{ animationDelay: '0ms' }}>
          <span className="hero__badge-dot" aria-hidden="true" />
          <span className="hero__badge-text">India's First Self-Serve DOOH Platform</span>
        </div>

        {/* Main headline - Stacked tight typography */}
        <div className="animate-fadeUp" style={{ animationDelay: '100ms' }}>
          <h1 className="hero__headline">
            <span>Your ad.</span>
            <span className="hero__hl-grad1">Every</span>
            <span className="hero__hl-grad2">screen</span>
            <span>in India.</span>
          </h1>

          <p className="hero__sub">
            Discover high-footfall screens across malls, highways, and tech parks. 
            Upload your creative. Go live in minutes — no calls, no agencies, no waiting.
          </p>

          {/* CTA row - Left aligned */}
          <div className="hero__ctas animate-fadeUp" style={{ animationDelay: '250ms' }}>
            <AmberButton href="/discover" size="lg" pulse>
              Start Advertising →
            </AmberButton>
            <GhostButton href="/owner" size="lg">
              List Your Screen
            </GhostButton>
          </div>
        </div>
      </div>
    </section>
  )
}
