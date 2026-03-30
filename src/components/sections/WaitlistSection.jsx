import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import './WaitlistSection.css'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xaqlonnw'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^\d{10}$/

/**
 * WaitlistSection
 * Left: headline + benefits + testimonial
 * Right: role-toggle form (Advertiser / Screen Owner)
 * Submits to Formspree. Shows inline validation errors and success state.
 */
export default function WaitlistSection() {
  const [role, setRole] = useState('advertiser')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const [form, setForm] = useState({
    name: '', business: '', city: '', budget: '', email: '', phone: ''
  })
  const [errors, setErrors] = useState({})

  function handleChange(e) {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    // Clear error on change
    if (errors[name]) setErrors(e => ({ ...e, [name]: '' }))
  }

  function validate() {
    const newErrors = {}
    if (!form.name.trim()) newErrors.name = 'Full name is required.'
    if (!form.business.trim()) newErrors.business = 'This field is required.'
    if (!form.city.trim()) newErrors.city = 'City is required.'
    if (role === 'advertiser' && !form.budget) newErrors.budget = 'Please select a budget.'
    if (!form.email.trim()) {
      newErrors.email = 'Email is required.'
    } else if (!EMAIL_RE.test(form.email)) {
      newErrors.email = 'Enter a valid email address.'
    }
    if (!form.phone.trim()) {
      newErrors.phone = 'Phone is required.'
    } else if (!PHONE_RE.test(form.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Enter a valid 10-digit phone number.'
    }
    return newErrors
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitError('')

    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setSubmitting(true)
    try {
      // 1. Primary: save to Supabase waitlist table
      const { error: dbError } = await supabase.from('waitlist').insert({
        full_name:      form.name,
        business_name:  form.business,
        city:           form.city,
        monthly_budget: form.budget || null,
        email:          form.email,
        phone:          form.phone,
        role,
      })
      if (dbError) console.warn('[LUMAD] Waitlist DB insert failed:', dbError.message)

      // 2. Backup: Formspree email notification
      await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role, fullName: form.name, businessName: form.business,
          city: form.city, budget: form.budget || 'N/A',
          email: form.email, phone: form.phone,
        }),
      }).catch(() => {}) // silently ignore Formspree failures

      setSubmitted(true)
    } catch {
      setSubmitError('Network error. Please check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="waitlist" id="waitlist" aria-labelledby="waitlist-title">
      <div className="waitlist__inner container">

        {/* ── Left Panel ── */}
        <div className="waitlist__left">
          <div className="waitlist__brand">
            <span className="waitlist__brand-icon" aria-hidden="true">▦</span>
            <div>
              <span className="waitlist__brand-name">LUMAD</span>
              <span className="waitlist__brand-tagline mono">LIGHT UP EVERY SCREEN.</span>
            </div>
          </div>

          <h2 id="waitlist-title" className="waitlist__headline">
            Be among
            <br />the first to
            <br />light up
            <br />India's<br />
            <em className="waitlist__headline-em">screens.</em>
          </h2>

          <ul className="waitlist__benefits">
            {[
              'Priority access to premium inventory',
              'Exclusive beta-only pricing',
              'Dedicated onboarding support'
            ].map(b => (
              <li key={b} className="waitlist__benefit">
                <span className="waitlist__check" aria-hidden="true">✓</span>
                {b}
              </li>
            ))}
          </ul>

          {/* Testimonials */}
          <div className="waitlist__testimonials">
            <p className="waitlist__testimonials-label mono">WHAT EARLY PARTNERS SAY</p>
            <div className="waitlist__testimonial-card">
              <p>"Finally a platform that makes DOOH as easy as Google Ads. We booked 3 screens in 8 minutes."</p>
              <footer>— PRIYA MENON, D2C FOUNDER · BENGALURU</footer>
            </div>
            <div className="waitlist__testimonial-card">
              <p>"Transparent pricing, no middlemen. Our Q1 OOH spend dropped 40% for the same reach."</p>
              <footer>— ROHIT KAPOOR, CMO · DELHI</footer>
            </div>
            <div className="waitlist__testimonial-card">
              <p>"As a screen owner, listing took 5 minutes. I had my first booking the same evening."</p>
              <footer>— SUNITA PATIL, SCREEN OWNER · PUNE</footer>
            </div>
          </div>
        </div>

        {/* ── Right Panel (Form) ── */}
        <div className="waitlist__right">
          {submitted ? (
            <div className="waitlist__success">
              <div className="waitlist__success-icon">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                  <circle cx="20" cy="20" r="20" fill="#F5A623" fillOpacity="0.15" />
                  <path d="M12 20.5L17.5 26L28 14" stroke="#F5A623" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3>You're on the list!</h3>
              <p>
                We'll reach out to you at{' '}
                <strong className="waitlist__success-email">{form.email}</strong>{' '}
                as soon as we launch in your city.
              </p>
            </div>
          ) : (
            <form className="waitlist__form" onSubmit={handleSubmit} noValidate>
              {/* Role toggle */}
              <div className="waitlist__toggle" role="group" aria-label="Select your role">
                <button
                  type="button"
                  className={`waitlist__toggle-btn ${role === 'advertiser' ? 'active' : ''}`}
                  onClick={() => setRole('advertiser')}
                >
                  I'm an Advertiser
                </button>
                <button
                  type="button"
                  className={`waitlist__toggle-btn ${role === 'owner' ? 'active' : ''}`}
                  onClick={() => setRole('owner')}
                >
                  I'm a Screen Owner
                </button>
              </div>

              <div className="waitlist__field">
                <label className="waitlist__label mono" htmlFor="wl-name">FULL NAME</label>
                <input
                  id="wl-name"
                  name="name"
                  type="text"
                  className={`waitlist__input ${errors.name ? 'waitlist__input--error' : ''}`}
                  placeholder="Aarav Sharma"
                  value={form.name}
                  onChange={handleChange}
                />
                {errors.name && <span className="waitlist__error">{errors.name}</span>}
              </div>

              <div className="waitlist__row">
                <div className="waitlist__field">
                  <label className="waitlist__label mono" htmlFor="wl-business">
                    {role === 'advertiser' ? 'BUSINESS NAME' : 'COMPANY / ENTITY'}
                  </label>
                  <input
                    id="wl-business"
                    name="business"
                    type="text"
                    className={`waitlist__input ${errors.business ? 'waitlist__input--error' : ''}`}
                    placeholder="Elevate Studios"
                    value={form.business}
                    onChange={handleChange}
                  />
                  {errors.business && <span className="waitlist__error">{errors.business}</span>}
                </div>
                <div className="waitlist__field">
                  <label className="waitlist__label mono" htmlFor="wl-city">CITY</label>
                  <input
                    id="wl-city"
                    name="city"
                    type="text"
                    className={`waitlist__input ${errors.city ? 'waitlist__input--error' : ''}`}
                    placeholder="Mumbai"
                    value={form.city}
                    onChange={handleChange}
                  />
                  {errors.city && <span className="waitlist__error">{errors.city}</span>}
                </div>
              </div>

              {role === 'advertiser' && (
                <div className="waitlist__field">
                  <label className="waitlist__label mono" htmlFor="wl-budget">MONTHLY AD BUDGET</label>
                  <select
                    id="wl-budget"
                    name="budget"
                    className={`waitlist__input waitlist__select ${errors.budget ? 'waitlist__input--error' : ''}`}
                    value={form.budget}
                    onChange={handleChange}
                  >
                    <option value="">Select budget range</option>
                    <option value="under50k">Under ₹50,000</option>
                    <option value="50k-1l">₹50,000 – ₹1,00,000</option>
                    <option value="1l-5l">₹1,00,000 – ₹5,00,000</option>
                    <option value="above5l">Above ₹5,00,000</option>
                  </select>
                  {errors.budget && <span className="waitlist__error">{errors.budget}</span>}
                </div>
              )}

              <div className="waitlist__row">
                <div className="waitlist__field">
                  <label className="waitlist__label mono" htmlFor="wl-email">EMAIL</label>
                  <input
                    id="wl-email"
                    name="email"
                    type="email"
                    className={`waitlist__input ${errors.email ? 'waitlist__input--error' : ''}`}
                    placeholder="aarav@elevate.in"
                    value={form.email}
                    onChange={handleChange}
                  />
                  {errors.email && <span className="waitlist__error">{errors.email}</span>}
                </div>
                <div className="waitlist__field">
                  <label className="waitlist__label mono" htmlFor="wl-phone">PHONE</label>
                  <input
                    id="wl-phone"
                    name="phone"
                    type="tel"
                    className={`waitlist__input ${errors.phone ? 'waitlist__input--error' : ''}`}
                    placeholder="98765 43210"
                    value={form.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && <span className="waitlist__error">{errors.phone}</span>}
                </div>
              </div>

              {submitError && (
                <div className="waitlist__submit-error" role="alert">{submitError}</div>
              )}

              <button
                type="submit"
                className={`waitlist__submit ${submitting ? 'waitlist__submit--loading' : ''}`}
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <span className="waitlist__spinner" aria-hidden="true" />
                    SUBMITTING...
                  </>
                ) : 'JOIN THE WAITLIST'}
              </button>

              <div className="waitlist__social-proof">
                <div className="waitlist__avatars" aria-hidden="true">
                  {['AS', 'RK', 'PM'].map(i => (
                    <span key={i} className="waitlist__avatar">{i}</span>
                  ))}
                </div>
                <p className="waitlist__proof-text mono">
                  ALREADY 500+ BUSINESSES WAITING. WE'LL REACH OUT WITHIN 48 HOURS.
                </p>
              </div>

              <div className="waitlist__divider" />

              <div className="waitlist__direct">
                <span className="waitlist__direct-label mono">DIRECT INQUIRIES</span>
                <a href="mailto:hello@lumad.in" className="waitlist__direct-email">hello@lumad.in</a>
              </div>
            </form>
          )}
        </div>

      </div>
    </section>
  )
}
