import { useScrollReveal } from '../../hooks/useScrollReveal'
import GlassCard from '../../components/ui/GlassCard'
import AmberButton from '../../components/ui/AmberButton'
import './AboutPage.css'

const TEAM = [
  {
    name: 'Arjun Mehta',
    role: 'CHIEF EXECUTIVE OFFICER',
    bio: 'Former OOH veteran with 15 years in traditional media buying.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop'
  },
  {
    name: 'Riya Sharma',
    role: 'CHIEF TECHNOLOGY OFFICER',
    bio: 'Ex-FAANG engineer specializing in computer vision and real-time systems.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop'
  },
  {
    name: 'Vikram Rao',
    role: 'HEAD OF PRODUCT',
    bio: 'Built and scaled multiple SaaS platforms for the creator economy.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&auto=format&fit=crop'
  },
  {
    name: 'Ananya Gupta',
    role: 'HEAD OF OPERATIONS',
    bio: 'Master of supply chain logistics with a passion for urban infrastructure.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&h=200&auto=format&fit=crop'
  }
]

const ADVISORS = [
  { name: 'Siddharth V.', role: 'OOH Industry Expert' },
  { name: 'Meera K.', role: 'D2C Founder' },
  { name: 'Dr. Rohan S.', role: 'Data/AI Expert' },
  { name: 'Priya D.', role: 'Agency Leader' }
]

export default function AboutPage() {
  const heroRef = useScrollReveal(0.1)
  const wayRef = useScrollReveal(0.1)
  const teamRef = useScrollReveal(0.1)

  return (
    <main className="about-page">
      {/* Hero Section */}
      <section className="about-hero container reveal" ref={heroRef}>
        <span className="about-hero__eyebrow mono">OUR MISSION</span>
        <h1 className="about-hero__title">
          Digitizing India's<br />
          <span className="accent">Kinetic Infrastructure.</span>
        </h1>
        <p className="about-hero__desc">
          LUMAD is on a mission to bring transparency, speed, and intelligence to the 
          physical world of advertising. We're building the operating system for 
          next-generation Digital Out-of-Home (DOOH).
        </p>
      </section>

      {/* The Way Section */}
      <section className="about-way container reveal" ref={wayRef}>
        <div className="about-way__grid">
          {/* Old Way */}
          <GlassCard className="about-way__card about-way__card--old">
            <h2 className="about-way__card-title">The Old Way</h2>
            <ul className="about-way__list">
              <li>
                <span className="icon">✕</span>
                <div>
                  <strong>Opaque Pricing</strong>
                  <p>Negotiations take days with no standardization of rates across regions.</p>
                </div>
              </li>
              <li>
                <span className="icon">✕</span>
                <div>
                  <strong>Slow Agencies</strong>
                  <p>A mountain of paperwork and back-and-forth emails before a campaign goes live.</p>
                </div>
              </li>
              <li>
                <span className="icon">✕</span>
                <div>
                  <strong>No Data</strong>
                  <p>Zero visibility on impressions, footfall, or attribution. It's just guess-work.</p>
                </div>
              </li>
            </ul>
          </GlassCard>

          {/* Lumad Way */}
          <GlassCard className="about-way__card about-way__card--lumad" glow>
            <h2 className="about-way__card-title">The LUMAD Way</h2>
            <ul className="about-way__list">
              <li>
                <span className="icon">✓</span>
                <div>
                  <strong>Transparent Rates</strong>
                  <p>Real-time dynamic pricing available on our dashboard. No surprises.</p>
                </div>
              </li>
              <li>
                <span className="icon">✓</span>
                <div>
                  <strong>Live in 5 Minutes</strong>
                  <p>Upload creative, select spots, and push to screens instantly from our console.</p>
                </div>
              </li>
              <li>
                <span className="icon">✓</span>
                <div>
                  <strong>Deep Intelligence</strong>
                  <p>AI-driven attribution, camera-based footfall tracking, and demographic insights.</p>
                </div>
              </li>
            </ul>
          </GlassCard>
        </div>
      </section>

      {/* Team Section */}
      <section className="about-team container reveal" ref={teamRef}>
        <div className="about-team__header">
          <span className="mono">THE KINETIC SQUAD</span>
          <h2 className="about-team__title">Building the future of OOH.</h2>
        </div>

        <div className="about-team__grid">
          {TEAM.map(member => (
            <GlassCard key={member.name} className="team-card" hover>
              <div className="team-card__image-wrap">
                <img src={member.image} alt={member.name} className="team-card__image" />
              </div>
              <h3 className="team-card__name">{member.name}</h3>
              <span className="team-card__role mono">{member.role}</span>
              <p className="team-card__bio">{member.bio}</p>
            </GlassCard>
          ))}
        </div>

        <div className="about-advisors">
          <h3 className="about-advisors__title mono">GUIDED BY INDUSTRY LEGENDS</h3>
          <div className="about-advisors__grid">
            {ADVISORS.map(advisor => (
              <div key={advisor.name} className="advisor-item">
                <span className="advisor-name">{advisor.name}</span>
                <span className="advisor-role">{advisor.role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta container">
        <GlassCard className="about-cta__card" glow>
          <h2>Join the Kinetic Revolution</h2>
          <p>Whether you're an advertiser or a screen owner, let's light up India together.</p>
          <div className="about-cta__actions">
            <AmberButton href="/discover">Launch Campaign →</AmberButton>
            <AmberButton href="/register" variant="outline">Join as Partner</AmberButton>
          </div>
        </GlassCard>
      </section>
    </main>
  )
}
