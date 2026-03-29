import HeroSection from '../../components/sections/HeroSection'
import HowItWorks from '../../components/sections/HowItWorks'
import StatsRow from '../../components/sections/StatsRow'
import AudienceCards from '../../components/sections/AudienceCards'
import ScreenCarousel from '../../components/sections/ScreenCarousel'
import IntelligenceSection from '../../components/sections/IntelligenceSection'
import FinalCTA from '../../components/sections/FinalCTA'

/**
 * HomePage
 * Assembles all Phase 1 sections in the correct order from Stitch design.
 * Each section has its own scroll reveal animation.
 * SEO: single <h1> is in HeroSection.
 */
export default function HomePage() {
  return (
    <main id="main-content" aria-label="LUMAD home page">
      <HeroSection />
      <StatsRow />
      <HowItWorks />
      <AudienceCards />
      <ScreenCarousel />
      <IntelligenceSection />
      <FinalCTA />
    </main>
  )
}
