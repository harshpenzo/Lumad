import { useState, useEffect } from 'react'
import AmberButton from '../../components/ui/AmberButton'
import { formatINR } from '../../utils/formatCurrency'
import './PricingPage.css'

export default function PricingPage() {
  const [budget, setBudget] = useState(25000)

  // Mock calculation: 1 INR roughly equates to 5 impressions on average
  const estimatedImpressions = Math.floor(budget * 5).toLocaleString()
  const screenDays = Math.max(1, Math.floor(budget / 5000))

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="pricing-page animate-fadeIn">
      <div className="pricing-hero">
        <h1>Transparent Platform Pricing.</h1>
        <p>No subscription fees. No hidden agency cuts. Sign up for free and pay only for the screens you book, when you book them.</p>
      </div>

      <div className="pricing-content">
        <section className="pricing-pillars">
          <div className="pricing-pillar">
            <span className="pillar-icon">🆓</span>
            <div className="pillar-text">
              <h3>Free to Browse</h3>
              <p>Create an account, explore our live interactive map, and use our AI matching engine completely free of charge. Plan your next campaign without any commitment.</p>
            </div>
          </div>

          <div className="pricing-pillar">
            <span className="pillar-icon">💳</span>
            <div className="pillar-text">
              <h3>Pay Per Screen-Day</h3>
              <p>Pricing is calculated based on the specific premium screens you select and the duration of your campaign. See the exact cost before you ever enter payment details.</p>
            </div>
          </div>

          <div className="pricing-pillar">
            <span className="pillar-icon">🛡️</span>
            <div className="pillar-text">
              <h3>Zero Agency Fees</h3>
              <p>Traditional DOOH buys involve multiple middlemen taking a cut. Lumad connects you directly to the screen owner, ensuring 100% of your budget goes toward ad plays.</p>
            </div>
          </div>
        </section>

        <section className="pricing-calculator">
          <h4 className="calc-title">Campaign ROI Estimator</h4>
          
          <div className="calc-display">
            <div className="calc-amount">{formatINR(budget)}</div>
            <p className="calc-desc">Your Campaign Budget</p>
          </div>

          <div className="calc-slider-wrap">
            <input 
              type="range" 
              min="5000" 
              max="200000" 
              step="5000"
              value={budget} 
              onChange={(e) => setBudget(Number(e.target.value))} 
              className="calc-slider"
            />
          </div>

          <div className="calc-metrics">
            <div className="calc-metric">
              <span className="calc-metric-lbl">Est. Impressions</span>
              <span className="calc-metric-val">{estimatedImpressions}</span>
            </div>
            <div className="calc-metric">
              <span className="calc-metric-lbl">Avg. Screen Days</span>
              <span className="calc-metric-val">{screenDays}</span>
            </div>
          </div>

          <AmberButton href="/discover" fullWidth>Start Planning</AmberButton>
        </section>
      </div>

      <p className="pricing-disclaimer">
        *Estimates are based on network averages. Actual impressions and costs will vary depending on specific screen locations, seasonality, and campaign duration.
      </p>
    </main>
  )
}
