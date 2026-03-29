import { useState } from 'react'
import { useBooking } from '../../../context/BookingContext'
import GlassCard from '../../../components/ui/GlassCard'
import AmberButton from '../../../components/ui/AmberButton'
import { formatINR } from '../../../utils/formatCurrency'
import './steps.css'

const PAYMENT_METHODS = [
  { id: 'upi', label: 'UPI', desc: 'Google Pay, PhonePe, Paytm', icon: '⚡' },
  { id: 'card', label: 'Credit / Debit Card', desc: 'Secure via Razorpay', icon: '💳' },
  { id: 'netbanking', label: 'Net Banking', desc: 'All major Indian banks', icon: '🏦' },
]

export default function Step4Payment() {
  const { state, dispatch } = useBooking()
  const [selectedMethod, setSelectedMethod] = useState('upi')
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handlePay = () => {
    setIsProcessing(true)
    // Simulate payment processing...
    setTimeout(() => {
      // Save campaign to localStorage for Dashboard
      const savedCampaigns = JSON.parse(localStorage.getItem('lumad_campaigns') || '[]')
      const newCampaign = {
        id: `camp_${Math.random().toString(36).substr(2, 9)}`,
        screenId: state.selectedScreen.id,
        screenName: state.selectedScreen.name,
        price: state.totalPrice,
        startDate: state.schedule.startDate,
        endDate: state.schedule.endDate,
        status: 'pending', // could be 'active' depending on logic
        createdAt: new Date().toISOString()
      }
      savedCampaigns.unshift(newCampaign) // Add to front
      localStorage.setItem('lumad_campaigns', JSON.stringify(savedCampaigns))

      setIsProcessing(false)
      setIsSuccess(true)
    }, 2500)
  }

  if (isSuccess) {
    return (
      <div className="payment-success animate-fadeIn">
        <GlassCard padding="lg" glow className="success-content">
          <div className="success-icon">🎉</div>
          <h2 className="success-title">Campaign Booked!</h2>
          <p className="success-desc">
            Your ad is now scheduled for <strong>{state.selectedScreen.name}</strong>. 
            Receipt and campaign details have been sent to your email.
          </p>
          <div className="success-actions">
            <AmberButton onClick={() => window.location.href = '/dashboard'}>
              View Dashboard →
            </AmberButton>
            <button className="mono-btn" onClick={() => window.location.href = '/'}>
              Return Home
            </button>
          </div>
        </GlassCard>
      </div>
    )
  }

  return (
    <div className="booking-step step-payment animate-fadeIn">
      <div className="step-header">
        <h2 className="step-title">Select Payment</h2>
        <p className="step-desc">
          Secure your campaign placement with our simplified payment checkout. 
          Instant confirmation upon successful payment.
        </p>
      </div>

      <div className="step-content">
        <div className="payment-grid">
          {/* Method Selection */}
          <div className="payment-methods">
            <h4 className="mono">PAYMENT METHOD</h4>
            <div className="method-list">
              {PAYMENT_METHODS.map(method => (
                <GlassCard 
                  key={method.id} 
                  hover 
                  glow={selectedMethod === method.id}
                  className={`method-card ${selectedMethod === method.id ? 'is-selected' : ''}`}
                  onClick={() => setSelectedMethod(method.id)}
                >
                  <div className="method-card__inner">
                    <span className="method-icon">{method.icon}</span>
                    <div className="method-info">
                      <span className="method-label">{method.label}</span>
                      <p className="method-desc">{method.desc}</p>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>

          {/* Billing Summary */}
          <GlassCard padding="lg" variant="heavy" className="billing-summary">
            <h4 className="mono">ORDER SUMMARY</h4>
            <div className="summary-list">
              <div className="summary-row">
                <span>Placement Cost</span>
                <span className="mono">{formatINR(state.totalPrice)}</span>
              </div>
              <div className="summary-row">
                <span>GST @ 18%</span>
                <span className="mono">{formatINR(state.totalPrice * 0.18)}</span>
              </div>
              <div className="summary-row total">
                <span>TOTAL AMOUNT</span>
                <span className="mono">{formatINR(state.totalPrice * 1.18)}</span>
              </div>
            </div>

            <div className="billing-trust">
              <p className="mono">🔒 SECURE CHECKOUT</p>
              <p className="trust-sub">SSL encrypted payment powered by Razorpay API.</p>
            </div>
          </GlassCard>
        </div>
      </div>

      <footer className="step-footer">
        <AmberButton 
          variant="outline" 
          onClick={() => dispatch({ type: 'SET_STEP', payload: 3 })}
          disabled={isProcessing}
        >
          ← Back to Review
        </AmberButton>
        <AmberButton 
          onClick={handlePay} 
          pulse={!isProcessing}
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing Securely...' : `Pay ${formatINR(state.totalPrice * 1.18)} Now →`}
        </AmberButton>
      </footer>
    </div>
  )
}
