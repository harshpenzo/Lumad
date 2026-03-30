import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AmberButton from '../../components/ui/AmberButton'
import './FeaturesPage.css'

const FEATURES = [
  {
    icon: '🧠',
    title: 'AI Audience Matching',
    desc: 'Our SmartMatch engine analyzes foot traffic patterns and demographics to recommend the perfect screens for your brand.',
    points: ['Demographic targeting', 'Peak hour analysis', 'Contextual placement matching']
  },
  {
    icon: '🗺️',
    title: 'Live Inventory Map',
    desc: 'Browse hundreds of premium digital screens across the city with real-time availability and transparent pricing.',
    points: ['Interactive Leaflet mapping', 'Filter by screen type', 'Instant visual previews']
  },
  {
    icon: '⚡',
    title: '4-Step Booking Wizard',
    desc: 'Say goodbye to long email chains. Our streamlined checkout process lets you launch a DOOH campaign in minutes.',
    points: ['Drag-and-drop creative upload', 'Interactive scheduling calendar', 'Secure payment gateway']
  },
  {
    icon: '📊',
    title: 'Real-Time Analytics',
    desc: 'Track the performance of your campaigns with a live dashboard displaying reach, spend, and estimated impressions.',
    points: ['Campaign ROI tracking', 'Live status updates', 'Exportable reports']
  }
]

export default function FeaturesPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Platform Features — LUMAD';
    return () => { document.title = 'LUMAD'; };
  }, [])


  return (
    <main className="features-page animate-fadeIn">
      <div className="features-hero">
        <span className="features-pretitle">The Platform</span>
        <h1 className="features-title">Intelligent DOOH Automation</h1>
        <p className="features-subtitle">
          Lumad replaces fragmented workflows with a single, seamless platform. 
          Discover screens, match your audience, and launch campaigns instantly.
        </p>
      </div>

      <div className="features-grid">
        {FEATURES.map((feat, i) => (
          <div key={i} className="feature-block">
            <div className="feature-icon-wrapper">
              {feat.icon}
            </div>
            <h3>{feat.title}</h3>
            <p>{feat.desc}</p>
            <ul className="feature-list">
              {feat.points.map((point, j) => (
                <li key={j}>
                  <span className="feature-list-icon">✦</span> {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="feature-cta">
        <h2 className="feature-cta-title">Ready to reach your audience?</h2>
        <AmberButton href="/discover" size="lg">Explore Screens Now</AmberButton>
      </div>
    </main>
  )
}
