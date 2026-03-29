import { useScrollReveal } from '../../hooks/useScrollReveal'
import GlassCard from '../ui/GlassCard'
import './HowItWorks.css'

/**
 * HowItWorks
 * Sourced from Stitch homepage: 3-step process
 * 01. Discover → 02. Book → 03. Go Live
 */

const STEPS = [
  {
    number: '01',
    title: 'Discover',
    desc: 'Browse high-footfall screens across malls, highways, and tech parks. Filter by audience demographics and peak hours.',
    icon: '🗺️',
    accent: 'amber',
  },
  {
    number: '02',
    title: 'Book',
    desc: 'Select your slots, upload your creative in seconds, and pay instantly. No paperwork, no hidden agency fees.',
    icon: '⚡',
    accent: 'cyan',
  },
  {
    number: '03',
    title: 'Go Live',
    desc: 'Your campaign goes live across selected screens in real-time. Track performance data via your dashboard.',
    icon: '📡',
    accent: 'purple',
  },
]

export default function HowItWorks() {
  const sectionRef = useScrollReveal(0.10)

  return (
    <section className="hiw" aria-labelledby="hiw-title">
      <div className="hiw__inner container reveal" ref={sectionRef}>
        <header className="hiw__header">
          <span className="hiw__eyebrow mono">HOW IT WORKS</span>
          <h2 id="hiw-title" className="hiw__title">
            From brief to billboard<br />
            <span className="hiw__title-sub">in three steps.</span>
          </h2>
        </header>

        <ol className="hiw__steps reveal-stagger" role="list">
          {STEPS.map((step) => (
            <li key={step.number}>
              <GlassCard hover glow padding="lg" className="hiw__card">
                <div className={`hiw__card-accent hiw__card-accent--${step.accent}`} aria-hidden="true" />
                <div className="hiw__card-top">
                  <span className="hiw__step-number mono">{step.number}</span>
                  <span className="hiw__step-icon" aria-hidden="true">{step.icon}</span>
                </div>
                <h3 className="hiw__step-title">{step.title}</h3>
                <p className="hiw__step-desc">{step.desc}</p>
              </GlassCard>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
