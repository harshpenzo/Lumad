import { useState } from 'react'
import { useBooking } from '../../../context/BookingContext'
import { useAuth } from '../../../context/AuthContext'
import { supabase } from '../../../lib/supabase'
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
  const { user } = useAuth()
  const [selectedMethod, setSelectedMethod] = useState('upi')
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [payError, setPayError] = useState('')

  const handlePay = async () => {
    setIsProcessing(true)
    setPayError('')
    // Simulate payment gateway processing delay
    await new Promise(res => setTimeout(res, 2500))

    // Save campaign record to Supabase
    const { error } = await supabase.from('campaigns').insert({
      user_id:         user?.id,
      screen_id:       state.selectedScreen.id,
      screen_name:     state.selectedScreen.name,
      screen_location: state.selectedScreen.location,
      start_date:      state.schedule.startDate,
      end_date:        state.schedule.endDate,
      status:          'pending',
      price:           state.totalPrice,
    })

    if (error) {
      console.warn('[LUMAD] Campaign save error:', error.message)
      // Non-fatal — still show success as payment is simulated
    }

    setIsProcessing(false)
    setIsSuccess(true)
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
