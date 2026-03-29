import { useScrollReveal } from '../../hooks/useScrollReveal'
import GlassCard from '../../components/ui/GlassCard'
import AmberButton from '../../components/ui/AmberButton'
import GhostButton from '../../components/ui/GhostButton'
import './AboutPage.css'

const TEAM = [
  {
    name: 'Arjun Mehta',
    role: 'CEO',
    bio: 'Former OOH veteran with 15 years in traditional media buying.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop'
  },
  {
    name: 'Riya Sharma',
    role: 'CTO',
    bio: 'Ex-FAANG engineer in computer vision and real-time systems.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop'
  },
  {
    name: 'Vikram Rao',
    role: 'Head of Product',
    bio: 'Built and scaled multiple SaaS platforms for the creator economy.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&auto=format&fit=crop'
  },
  {
    name: 'Ananya Gupta',
    role: 'Head of Ops',
    bio: 'Supply chain logistics veteran with a passion for urban infrastructure.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&h=200&auto=format&fit=crop'
  }
]

const ADVISORS = [
  { name: 'Siddharth V.',  role: 'OOH Industry Expert' },
  { name: 'Meera K.',      role: 'D2C Founder' },
  { name: 'Dr. Rohan S.', role: 'Data / AI Expert' },
  { name: 'Priya D.',      role: 'Agency Leader' }
]

// City dot positions tuned to the proper India polygon SVG below
const CITY_DOTS = [
  { name: 'Delhi',     cx: 185, cy: 128 },
  { name: 'Mumbai',    cx: 130, cy: 238 },
  { name: 'Hyderabad', cx: 195, cy: 268 },
  { name: 'Bengaluru', cx: 185, cy: 320 },
  { name: 'Chennai',   cx: 210, cy: 338 },
]

export default function AboutPage() {
  const heroRef   = useScrollReveal(0.1)
  const quoteRef  = useScrollReveal(0.1)
  const wayRef    = useScrollReveal(0.1)
  const mapRef    = useScrollReveal(0.1)
  const teamRef   = useScrollReveal(0.1)

  return (
    <main className="about-page">

      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="about-hero container reveal" ref={heroRef}>
        <p className="about-hero__eyebrow mono">OUR MISSION · LUMAD KINETIC</p>
        <h1 className="about-hero__title">
          We're building the infrastructure<br />
          for <span className="about-hero__title-accent">physical-world</span><br />
          <span className="about-hero__title-accent">advertising</span> in India.
        </h1>
        <p className="about-hero__lead mono">For brands. For streets. For every screen.</p>
      </section>

      {/* ── Vision Quote ────────────────────────────────── */}
      <section className="about-quote reveal" ref={quoteRef}>
        <div className="container">
          <blockquote className="about-quote__blockquote">
            <p>"Making it as easy to book a digital hoarding<br />as booking a flight ticket."</p>
          </blockquote>
        </div>
      </section>

      {/* ── Old Way vs LUMAD Way ────────────────────────── */}
      <section className="about-way container reveal" ref={wayRef}>
        <div className="about-way__grid">

          {/* Old Way */}
          <GlassCard className="about-way__card about-way__card--old">
            <div className="about-way__card-header">
              <span className="about-way__icon">⏱</span>
              <span className="about-way__mono mono">THE OLD WAY</span>
            </div>
            <ul className="about-way__list">
              <li>
                <span className="about-way__bullet about-way__bullet--bad">✕</span>
                <div>
                  <strong>Opaque Pricing</strong>
                  <p>Negotiations take days with no standardization of rates across regions.</p>
                </div>
              </li>
              <li>
                <span className="about-way__bullet about-way__bullet--bad">✕</span>
                <div>
                  <strong>Slow Agencies</strong>
                  <p>A mountain of paperwork and back-and-forth emails before a campaign goes live.</p>
                </div>
              </li>
              <li>
                <span className="about-way__bullet about-way__bullet--bad">✕</span>
                <div>
                  <strong>No Data</strong>
                  <p>Zero visibility on impressions, footfall, or attribution. It's just guess-work.</p>
                </div>
              </li>
            </ul>
          </GlassCard>

          {/* Lumad Way */}
          <GlassCard className="about-way__card about-way__card--lumad" glow>
            <div className="about-way__card-header">
              <span className="about-way__icon about-way__icon--amber">⚡</span>
              <span className="about-way__mono about-way__mono--amber mono">THE LUMAD WAY</span>
            </div>
            <ul className="about-way__list">
              <li>
                <span className="about-way__bullet about-way__bullet--good">✓</span>
                <div>
                  <strong>Transparent Rates</strong>
                  <p>Real-time dynamic pricing on our dashboard. No surprises, no middlemen.</p>
                </div>
              </li>
              <li>
                <span className="about-way__bullet about-way__bullet--good">✓</span>
                <div>
                  <strong>Live in 5 Minutes</strong>
                  <p>Upload creative, select spots, push to screens instantly from our console.</p>
                </div>
              </li>
              <li>
                <span className="about-way__bullet about-way__bullet--good">✓</span>
                <div>
                  <strong>Deep Intelligence</strong>
                  <p>AI-driven attribution, camera footfall tracking, and demographic insights.</p>
                </div>
              </li>
            </ul>
          </GlassCard>

        </div>
      </section>

      {/* ── Network Map ─────────────────────────────────── */}
      <section className="about-network container reveal" ref={mapRef}>
        <div className="about-network__grid">
          <div className="about-network__map-wrap">
            <div className="about-network__map">
              <svg
                viewBox="0 0 340 430"
                className="about-network__svg"
                aria-label="Map of India showing LUMAD screen network cities"
              >
                {/* Filled India background (glow effect) */}
                <defs>
                  <radialGradient id="indiaGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#f5a623" stopOpacity="0.08" />
                    <stop offset="100%" stopColor="#f5a623" stopOpacity="0.02" />
                  </radialGradient>
                </defs>

                {/* Accurate India polygon outline */}
                <polygon
                  points="
                    170,18  185,15  205,22  220,18  240,28
                    258,38  268,55  272,75  268,92  278,108
                    285,128 280,148 268,160 275,178 268,196
                    278,212 272,228 258,242 248,258 255,272
                    248,285 235,298 225,312 215,328 208,345
                    200,362 195,378 190,395 185,410 180,422
                    175,410 170,395 165,378 158,360 148,342
                    138,328 125,315 112,300 98,288 85,275
                    72,260 62,245 55,228 48,212 42,195
                    38,178 32,162 28,145 25,128 22,110
                    28,92   35,75   42,58   52,42   65,30
                    82,22   100,16  118,14  138,12  155,15
                  "
                  fill="url(#indiaGlow)"
                  stroke="rgba(245,166,35,0.45)"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />

                {/* City glow dots positioned on the SVG coordinate system */}
                {CITY_DOTS.map((city) => (
                  <g key={city.name}>
                    {/* outer pulse ring */}
                    <circle cx={city.cx} cy={city.cy} r="10" fill="rgba(245,166,35,0.12)">
                      <animate attributeName="r" values="8;14;8" dur="2.5s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.6;0.1;0.6" dur="2.5s" repeatCount="indefinite" />
                    </circle>
                    {/* inner solid dot */}
                    <circle cx={city.cx} cy={city.cy} r="4.5" fill="#f5a623" opacity="0.9" />
                    {/* city name label */}
                    <text
                      x={city.cx + 8}
                      y={city.cy + 4}
                      fontSize="10"
                      fill="rgba(245,166,35,0.75)"
                      fontFamily="monospace"
                      letterSpacing="0.5"
                    >
                      {city.name}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </div>

          <div className="about-network__content">
            <h2 className="about-network__title">Scaling the Network</h2>
            <div className="about-network__tags">
              {['Mumbai', 'Delhi', 'Bengaluru', 'Chennai', 'Hyderabad'].map(c => (
                <span key={c} className="about-network__tag">{c}</span>
              ))}
            </div>
            <p className="about-network__desc">
              Our network is expanding. We help brands create massive outdoor icons 
              that build countries, launch brands, and real-time connect cities.
            </p>
            <p className="about-network__stat">
              5 CITIES · 1,000+ SCREENS, GROWING EVERY WEEK.
            </p>
          </div>
        </div>
      </section>

      {/* ── Team ────────────────────────────────────────── */}
      <section className="about-team container reveal" ref={teamRef}>
        <div className="about-team__header">
          <h2 className="about-team__title">
            Built by people obsessed with<br />advertising and technology
          </h2>
          <div className="about-team__accent" aria-hidden="true" />
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
              <div className="team-card__socials">
                <span className="team-card__social-icon">in</span>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Advisors */}
        <div className="about-advisors">
          <p className="about-advisors__title mono">GUIDED BY INDUSTRY LEGENDS</p>
          <div className="about-advisors__grid">
            {ADVISORS.map(a => (
              <div key={a.name} className="advisor-item">
                <span className="advisor-name">{a.name}</span>
                <span className="advisor-role">{a.role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ───────────────────────────────────── */}
      <section className="about-cta container">
        <GlassCard className="about-cta__card" glow>
          <h2>Ready to own the streets?</h2>
          <p>India is rapidly growing programmatic infrastructure for advertising. Get early access to premium inventory and special rates.</p>
          <div className="about-cta__actions">
            <AmberButton href="/discover" size="lg" pulse>Launch Campaign</AmberButton>
            <GhostButton href="/about#waitlist" size="lg">Talk to an Expert</GhostButton>
          </div>
        </GlassCard>
      </section>

    </main>
  )
}
