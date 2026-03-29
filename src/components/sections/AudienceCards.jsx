import { useScrollReveal } from '../../hooks/useScrollReveal'
import GlassCard from '../ui/GlassCard'
import AmberButton from '../ui/AmberButton'
import './AudienceCards.css'

/**
 * AudienceCards
 * Sourced from Stitch homepage:
 * Local Businesses, D2C Brands, Marketing Agencies, Screen Owners
 */

const AUDIENCES = [
  {
    id:      'local',
    emoji:   '🏪',
    title:   'Local Businesses',
    desc:    'Hyper-local targeting to drive foot traffic from your immediate neighborhood.',
    cta:     'Learn More',
    href:    '/features',
    accent:  '#F5A623',
  },
  {
    id:      'd2c',
    emoji:   '🚀',
    title:   'D2C Brands',
    desc:    'Scale your offline presence rapidly across major Indian metros with ease.',
    cta:     'Learn More',
    href:    '/features',
    accent:  '#00D4FF',
  },
  {
    id:      'agency',
    emoji:   '📊',
    title:   'Marketing Agencies',
    desc:    'A unified platform to manage DOOH inventory for all your clients efficiently.',
    cta:     'Learn More',
    href:    '/features',
    accent:  '#DAC9FF',
  },
  {
    id:      'owner',
    emoji:   '📺',
    title:   'Screen Owners',
    desc:    'Monetize your empty slots and manage your screen inventory with our AI tools.',
    cta:     'List Your Screen',
    href:    '/owner',
    accent:  '#00E676',
  },
]

export default function AudienceCards() {
  const sectionRef = useScrollReveal(0.08)

  return (
    <section className="audience" aria-labelledby="audience-title">
      <div className="audience__inner container reveal" ref={sectionRef}>
        <header className="audience__header">
          <span className="audience__eyebrow mono">WHO IT'S FOR</span>
          <h2 id="audience-title" className="audience__title">
            Built for every<br />player in DOOH.
          </h2>
        </header>

        <ul className="audience__grid reveal-stagger" role="list">
          {AUDIENCES.map((a) => (
            <li key={a.id}>
              <GlassCard hover padding="lg" className="audience__card">
                <div className="audience__card-icon" style={{ '--accent': a.accent }} aria-hidden="true">
                  {a.emoji}
                </div>
                <h3 className="audience__card-title">{a.title}</h3>
                <p className="audience__card-desc">{a.desc}</p>
                <a href={a.href} className="audience__card-link" style={{ '--accent': a.accent }}>
                  {a.cta} →
                </a>
              </GlassCard>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
