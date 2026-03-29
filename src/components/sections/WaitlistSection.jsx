import { useState } from 'react'
import './WaitlistSection.css'

/**
 * WaitlistSection
 * Matches Stitch "Join Waitlist" screen:
 * Left: headline + benefits + testimonial
 * Right: role-toggle form (Advertiser / Screen Owner)
 */
export default function WaitlistSection() {
  const [role, setRole] = useState('advertiser')
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '', business: '', city: '', budget: '', email: '', phone: ''
  })

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
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

          <blockquote className="waitlist__testimonial">
            <p>"Lumad has completely changed how we think about local marketing. It's finally possible for a small business to be seen where it matters."</p>
            <footer>— ARJUN MEHTA, BETA PARTNER</footer>
          </blockquote>
        </div>

        {/* ── Right Panel (Form) ── */}
        <div className="waitlist__right">
          {submitted ? (
            <div className="waitlist__success">
              <div className="waitlist__success-icon">✓</div>
              <h3>You're on the list!</h3>
              <p>We'll reach out within 48 hours. Welcome to the Lumad beta.</p>
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
                  className="waitlist__input"
                  placeholder="Aarav Sharma"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
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
                    className="waitlist__input"
                    placeholder="Elevate Studios"
                    value={form.business}
                    onChange={handleChange}
                  />
                </div>
                <div className="waitlist__field">
                  <label className="waitlist__label mono" htmlFor="wl-city">CITY</label>
                  <input
                    id="wl-city"
                    name="city"
                    type="text"
                    className="waitlist__input"
                    placeholder="Mumbai"
                    value={form.city}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {role === 'advertiser' && (
                <div className="waitlist__field">
                  <label className="waitlist__label mono" htmlFor="wl-budget">MONTHLY AD BUDGET</label>
                  <select
                    id="wl-budget"
                    name="budget"
                    className="waitlist__input waitlist__select"
                    value={form.budget}
                    onChange={handleChange}
                  >
                    <option value="">₹50,000 – ₹1,00,000</option>
                    <option value="under50k">Under ₹50,000</option>
                    <option value="50k-1l">₹50,000 – ₹1,00,000</option>
                    <option value="1l-5l">₹1,00,000 – ₹5,00,000</option>
                    <option value="above5l">Above ₹5,00,000</option>
                  </select>
                </div>
              )}

              <div className="waitlist__row">
                <div className="waitlist__field">
                  <label className="waitlist__label mono" htmlFor="wl-email">EMAIL</label>
                  <input
                    id="wl-email"
                    name="email"
                    type="email"
                    className="waitlist__input"
                    placeholder="aarav@elevate.in"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="waitlist__field">
                  <label className="waitlist__label mono" htmlFor="wl-phone">PHONE</label>
                  <input
                    id="wl-phone"
                    name="phone"
                    type="tel"
                    className="waitlist__input"
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button type="submit" className="waitlist__submit">
                JOIN THE WAITLIST
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
