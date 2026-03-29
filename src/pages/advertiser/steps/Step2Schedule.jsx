import { useState, useMemo } from 'react'
import { useBooking } from '../../../context/BookingContext'
import GlassCard from '../../../components/ui/GlassCard'
import AmberButton from '../../../components/ui/AmberButton'
import { formatINR } from '../../../utils/formatCurrency'
import './steps.css'

const FREQUENCIES = [
  { id: 'standard', label: 'Standard', sub: '10s / 10 times per hour', factor: 1 },
  { id: 'premium',  label: 'Premium',  sub: '15s / 15 times per hour', factor: 1.5 },
  { id: 'roadblock', label: 'Roadblock', sub: '30s / 30 times per hour', factor: 3 },
]

export default function Step2Schedule() {
  const { state, dispatch } = useBooking()
  const [selectedFreq, setSelectedFreq] = useState('standard')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const durationDays = useMemo(() => {
    if (!startDate || !endDate) return 0
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffTime = Math.abs(end - start)
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1
  }, [startDate, endDate])

  const currentPrice = useMemo(() => {
    const factor = FREQUENCIES.find(f => f.id === selectedFreq)?.factor || 1
    return state.selectedScreen.pricePerDay * durationDays * factor
  }, [selectedFreq, durationDays, state.selectedScreen.pricePerDay])

  const handleNext = () => {
    if (startDate && endDate) {
      dispatch({ type: 'SET_SCHEDULE', payload: { startDate, endDate, durationDays } })
      dispatch({ type: 'SET_STEP', payload: 3 })
    }
  }

  return (
    <div className="booking-step step-schedule animate-fadeIn">
      <div className="step-header">
        <h2 className="step-title">Select Schedule</h2>
        <p className="step-desc">
          Choose your campaign duration and slot frequency. 
          Dynamic pricing applies based on demand and duration.
        </p>
      </div>

      <div className="step-content">
        {/* Date Selectors */}
        <div className="schedule-dates">
          <GlassCard padding="md" variant="heavy" className="date-card">
            <label className="mono">START DATE</label>
            <input 
              type="date" 
              value={startDate} 
              onChange={(e) => setStartDate(e.target.value)} 
              min={new Date().toISOString().split('T')[0]}
            />
          </GlassCard>
          <div className="date-arrow">→</div>
          <GlassCard padding="md" variant="heavy" className="date-card">
            <label className="mono">END DATE</label>
            <input 
              type="date" 
              value={endDate} 
              onChange={(e) => setEndDate(e.target.value)} 
              min={startDate || new Date().toISOString().split('T')[0]}
            />
          </GlassCard>
        </div>

        {/* Frequency Options */}
        <div className="frequency-options">
          <h4 className="mono">SLOT FREQUENCY</h4>
          <div className="frequency-grid">
            {FREQUENCIES.map(f => (
              <GlassCard 
                key={f.id} 
                hover 
                glow={selectedFreq === f.id}
                className={`freq-card ${selectedFreq === f.id ? 'is-selected' : ''}`}
                onClick={() => setSelectedFreq(f.id)}
              >
                <div className="freq-card__inner">
                  <span className="freq-card__label">{f.label}</span>
                  <p className="freq-card__sub">{f.sub}</p>
                  <span className="freq-card__price mono">
                    {f.id === 'standard' ? 'Base Price' : `+${(f.factor-1)*100}%`}
                  </span>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Live Estimate Preview */}
        {durationDays > 0 && (
          <div className="schedule-estimate animate-fadeUp">
            <div className="estimate-row">
              <span className="mono">DURATION</span>
              <span className="mono highlight">{durationDays} DAYS</span>
            </div>
            <div className="estimate-row">
              <span className="mono">ESTIMATED REACH</span>
              <span className="mono highlight">{state.selectedScreen.footfallPerDay * durationDays * 0.4} IMPRESSIONS</span>
            </div>
          </div>
        )}
      </div>

      <footer className="step-footer">
        <AmberButton 
          variant="outline" 
          onClick={() => dispatch({ type: 'SET_STEP', payload: 1 })}
        >
          ← Back
        </AmberButton>
        <AmberButton 
          onClick={handleNext} 
          disabled={!startDate || !endDate}
          pulse={startDate && endDate}
        >
          Step 3: Review →
        </AmberButton>
      </footer>
    </div>
  )
}
