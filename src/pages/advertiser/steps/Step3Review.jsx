import { useBooking } from '../../../context/BookingContext'
import GlassCard from '../../../components/ui/GlassCard'
import AmberButton from '../../../components/ui/AmberButton'
import SmartMatchRing from '../../../components/ui/SmartMatchRing'
import { formatINR, formatIndianNumber } from '../../../utils/formatCurrency'
import './steps.css'

export default function Step3Review() {
  const { state, dispatch } = useBooking()

  const handleNext = () => {
    dispatch({ type: 'SET_STEP', payload: 4 })
  }

  const impressions = state.selectedScreen.footfallPerDay * (state.schedule.durationDays || 1)
  const reach = impressions * 0.35 // 35% unique reach multiplier

  return (
    <div className="booking-step step-review animate-fadeIn">
      <div className="step-header">
        <h2 className="step-title">Review Campaign</h2>
        <p className="step-desc">
          Double-check your campaign details before finalizing the booking. 
          AI projections show high ROI for this placement.
        </p>
      </div>

      <div className="step-content">
        <div className="review-grid">
          {/* Summary Card */}
          <GlassCard padding="lg" variant="heavy" className="review-summary">
            <div className="review-section">
              <h4 className="mono">PLACEMENT</h4>
              <p className="review-val">{state.selectedScreen.name}</p>
              <p className="review-sub">{state.selectedScreen.location}, {state.selectedScreen.city}</p>
            </div>

            <div className="review-section">
              <h4 className="mono">CREATIVE ASSET</h4>
              <div className="creative-preview">
                <img src={state.creative.url} alt="Campaign Thumbnail" className="preview-thumb" />
                <div className="preview-info">
                  <p className="review-val">{state.creative.name}</p>
                  <p className="review-sub">{state.creative.type || 'Static Image'}</p>
                </div>
              </div>
            </div>

            <div className="review-section">
              <h4 className="mono">TIMELINE</h4>
              <p className="review-val">
                {state.schedule.startDate} to {state.schedule.endDate}
              </p>
              <p className="review-sub">{state.schedule.durationDays} days of runtime</p>
            </div>
          </GlassCard>

          {/* Intelligence Projections */}
          <GlassCard padding="lg" glow className="review-intel">
            <div className="intel-header">
              <h4 className="mono">ROI PROJECTIONS</h4>
              <div className="intel-live mono">AI LIVE</div>
            </div>

            <div className="intel-row">
              <div className="intel-stat">
                <span className="mono label">EST. REACH</span>
                <span className="mono val">{formatIndianNumber(Math.round(reach))}</span>
              </div>
              <div className="intel-stat">
                <span className="mono label">CPM</span>
                <span className="mono val">₹{( (state.totalPrice || 0) / (reach / 1000) ).toFixed(2)}</span>
              </div>
            </div>

            <div className="intel-match">
              <SmartMatchRing score={state.selectedScreen.matchScore} size={80} stroke={6} />
              <div className="match-info">
                <h5 className="mono">SMART MATCH SCORE</h5>
                <p>This screen matches your campaign's target demographics by {state.selectedScreen.matchScore}%.</p>
              </div>
            </div>

            <div className="intel-insights">
              <p className="mono">INSIGHTS</p>
              <ul className="mono-list">
                <li>Peak traffic: 6 PM - 10 PM</li>
                <li>Audience: Tech professionals, shoppers</li>
                <li>Dwell time avg: {state.selectedScreen.dwellTime}m</li>
              </ul>
            </div>
          </GlassCard>
        </div>
      </div>

      <footer className="step-footer">
        <AmberButton 
          variant="outline" 
          onClick={() => dispatch({ type: 'SET_STEP', payload: 2 })}
        >
          ← Back to Schedule
        </AmberButton>
        <AmberButton onClick={handleNext} pulse>
          Proceed to Payment →
        </AmberButton>
      </footer>
    </div>
  )
}
