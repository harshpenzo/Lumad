import { useScrollReveal } from '../../hooks/useScrollReveal'
import GlassCard from '../ui/GlassCard'
import './IntelligenceSection.css'

export default function IntelligenceSection() {
  const sectionRef = useScrollReveal(0.08)

  // Generate mock chart data simulating a traffic curve
  const chartBars = Array.from({ length: 42 }).map((_, i) => {
    // create a bell curve-like distribution centered around index 20 and 30
    const val1 = Math.exp(-Math.pow(i - 15, 2) / 30) * 60;
    const val2 = Math.exp(-Math.pow(i - 30, 2) / 20) * 80;
    const height = Math.max(10, val1 + val2 + Math.random() * 20); // Add some noise
    const isPeak = height > 60;
    return { height: `${height}%`, isPeak };
  });

  return (
    <section className="intel" aria-labelledby="intel-title">
      <div className="intel__inner container reveal" ref={sectionRef}>
        
        {/* Left column */}
        <div className="intel__left">
          <span className="intel__eyebrow mono">INTELLIGENCE PROTOCOL</span>
          <h2 id="intel-title" className="intel__title">
            Not just screens.<br />
            <span className="intel__title-accent">Intelligence.</span>
          </h2>
          <p className="intel__desc">
            We don't just sell pixels. We sell results. Lumad's proprietary engine 
            analyzes traffic patterns, vehicle types, and audience demographics 
            to give you the highest ROI.
          </p>

          <div className="intel__features-list">
            <div className="intel__feature-item">
              <div className="intel__feature-icon-wrapper">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="intel__feature-text">
                <h3>Real-time Attribution</h3>
                <p>Measure foot-traffic drop-in rate post ad exposure.</p>
              </div>
            </div>

            <div className="intel__feature-item">
              <div className="intel__feature-icon-wrapper">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5"/>
                  <circle cx="12" cy="12" r="3" fill="currentColor"/>
                </svg>
              </div>
              <div className="intel__feature-text">
                <h3>AI Smart Targeting</h3>
                <p>1500+ data-points to find the exact screens for your target persona.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right column — Smart Match Engine visual */}
        <div className="intel__right" aria-hidden="true">
          <GlassCard variant="heavy" padding="none" className="intel__match-card">
            
            <div className="intel__card-header">
              <div className="intel__card-title">
                <span className="status-dot"></span>
                Smart Match Engine
              </div>
              <div className="intel__card-badge">
                <svg viewBox="0 0 36 36" className="circular-chart">
                  <path className="circle-bg"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path className="circle-fg"
                    strokeDasharray="98, 100"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="badge-text">98%</span>
              </div>
            </div>

            <div className="intel__chart-section">
              <div className="intel__chart-labels">
                <span className="chart-label-left">HOURLY TRAFFIC</span>
                <span className="chart-label-right">Low <span className="spacing-box"></span> High</span>
              </div>
              
              <div className="intel__chart-bars">
                {chartBars.map((bar, idx) => (
                  <div 
                    key={idx} 
                    className={`chart-bar ${bar.isPeak ? 'peak' : ''}`} 
                    style={{ height: bar.height }}
                  />
                ))}
              </div>
            </div>

            <div className="intel__stats-grid">
              <div className="intel__stat-box">
                <span className="stat-label">EST. IMPRESSIONS</span>
                <span className="stat-value">4.5M+</span>
              </div>
              <div className="intel__stat-box">
                <span className="stat-label">PEAK HOURS</span>
                <span className="stat-value">18:00 - 22:00</span>
              </div>
            </div>

            <div className="intel__card-actions">
              <button className="intel-ghost-btn">Test Simulation</button>
              <button className="intel-ghost-btn">Pricing Structure</button>
            </div>

          </GlassCard>
        </div>
      </div>
    </section>
  )
}
