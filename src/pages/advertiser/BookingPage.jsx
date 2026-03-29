import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useBooking } from '../../context/BookingContext'
import { mockScreens } from '../../utils/mockScreenData'
import GlassCard from '../../components/ui/GlassCard'
import AmberButton from '../../components/ui/AmberButton'
import { formatINR } from '../../utils/formatCurrency'

// Step components (to be implemented next)
import Step1Creative from './steps/Step1Creative'
import Step2Schedule from './steps/Step2Schedule'
import Step3Review from './steps/Step3Review'
import Step4Payment from './steps/Step4Payment'

import './BookingPage.css'

export default function BookingPage() {
  const { screenId } = useParams()
  const navigate = useNavigate()
  const { state, dispatch } = useBooking()
  const [loading, setLoading] = useState(true)

  // Find the screen from mock data
  useEffect(() => {
    const screen = mockScreens.find(s => s.id === screenId)
    if (!screen) {
      navigate('/discover')
    } else {
      dispatch({ type: 'SET_SCREEN', payload: screen })
      setLoading(false)
    }
  }, [screenId, navigate, dispatch])

  if (loading || !state.selectedScreen) {
    return (
      <main className="booking-page booking-page--loading">
        <div className="animate-spin">⌛</div>
      </main>
    )
  }

  const steps = [
    { num: 1, label: 'Creative' },
    { num: 2, label: 'Schedule' },
    { num: 3, label: 'Review' },
    { num: 4, label: 'Payment' }
  ]

  const renderStep = () => {
    switch (state.currentStep) {
      case 1: return <Step1Creative />
      case 2: return <Step2Schedule />
      case 3: return <Step3Review />
      case 4: return <Step4Payment />
      default: return <Step1Creative />
    }
  }

  return (
    <main className="booking-page container">
      <header className="booking-header">
        <div className="booking-header__back" onClick={() => navigate('/discover')}>
          ← Back to Discovery
        </div>
        <h1 className="booking-header__title">
          Book <span className="accent">{state.selectedScreen.name}</span>
        </h1>
      </header>

      <div className="booking-layout">
        {/* Main Wizard Area */}
        <div className="booking-wizard">
          {/* Progress Bar */}
          <nav className="booking-nav">
            {steps.map(s => (
              <div 
                key={s.num} 
                className={`booking-nav__step ${state.currentStep >= s.num ? 'is-active' : ''}`}
                onClick={() => s.num < state.currentStep && dispatch({ type: 'SET_STEP', payload: s.num })}
              >
                <span className="booking-nav__step-num mono">{s.num}</span>
                <span className="booking-nav__step-label">{s.label}</span>
              </div>
            ))}
            <div className="booking-nav__line" style={{ '--progress': `${(state.currentStep - 1) / (steps.length - 1) * 100}%` }} />
          </nav>

          {/* Current Step Content */}
          <div className="booking-step-container">
            {renderStep()}
          </div>
        </div>

        {/* Sticky Detail Panel */}
        <aside className="booking-panel">
          <GlassCard padding="lg" variant="heavy" className="booking-panel__card" glow>
            <h3 className="booking-panel__title mono">CAMPAIGN SUMMARY</h3>
            
            <div className="booking-panel__screen">
              <span className="mono label">LOCATION</span>
              <p>{state.selectedScreen.location}</p>
            </div>

            <div className="booking-panel__stats">
              <div className="stat">
                <span className="mono label">CITY</span>
                <p>{state.selectedScreen.city}</p>
              </div>
              <div className="stat">
                <span className="mono label">MATCH</span>
                <p className="accent">{state.selectedScreen.matchScore}%</p>
              </div>
            </div>

            <div className="booking-panel__divider" />

            <div className="booking-panel__schedule">
              <span className="mono label">DATES</span>
              <p>
                {state.schedule.startDate ? state.schedule.startDate : '--'} 
                {state.schedule.endDate ? ` to ${state.schedule.endDate}` : ''}
              </p>
            </div>

            <div className="booking-panel__pricing">
              <div className="price-item">
                <span>Daily Rate</span>
                <span className="mono">{formatINR(state.selectedScreen.pricePerDay)}</span>
              </div>
              <div className="price-item total">
                <span>Total Investment</span>
                <span className="mono total-value">{formatINR(state.totalPrice)}</span>
              </div>
            </div>

            <div className="booking-panel__disclaimer mono">
              Excl. GST @ 18%
            </div>
          </GlassCard>
        </aside>
      </div>
    </main>
  )
}
