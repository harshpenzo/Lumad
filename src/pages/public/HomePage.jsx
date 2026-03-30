import { useEffect } from 'react'
import HeroSection from '../../components/sections/HeroSection'
import HowItWorks from '../../components/sections/HowItWorks'
import StatsRow from '../../components/sections/StatsRow'
import AudienceCards from '../../components/sections/AudienceCards'
import ScreenCarousel from '../../components/sections/ScreenCarousel'
import IntelligenceSection from '../../components/sections/IntelligenceSection'
import WaitlistSection from '../../components/sections/WaitlistSection'
import FinalCTA from '../../components/sections/FinalCTA'

/**
 * HomePage
 * Assembles all homepage sections. WaitlistSection is added before FinalCTA
 * as the penultimate section, matching the Stitch design spec.
 */
export default function HomePage() {
  useEffect(() => {
    document.title = "LUMAD — India's First Self-Serve DOOH Platform";
    return () => { document.title = 'LUMAD'; };
  }, []);

  return (
    <main id="main-content" aria-label="LUMAD home page">
      <HeroSection />
      <StatsRow />
      <HowItWorks />
      <AudienceCards />
      <ScreenCarousel />
      <IntelligenceSection />
      <WaitlistSection />
      <FinalCTA />
    </main>
  )
}
