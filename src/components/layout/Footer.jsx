import { useState } from 'react'
import { Link } from 'react-router-dom'
import Toast from '../ui/Toast'
import './Footer.css'

/**
 * Footer
 * Links: real routes go to pages, "Coming Soon" shows toast notification.
 */

const COMING_SOON = ['API Docs', 'Careers', 'Press', 'Contact Us', 'Support', 'Monetization', 'Status']

const FOOTER_LINKS = {
  Platform: [
    { label: 'Screen Discovery', to: '/discover' },
    { label: 'Features',         to: '/features' },
    { label: 'Pricing',          to: '/pricing' },
    { label: 'API Docs',         to: null },
  ],
  Company: [
    { label: 'About LUMAD', to: '/about' },
    { label: 'Contact Us',  to: null },
    { label: 'Careers',     to: null },
    { label: 'Press',       to: null },
  ],
  'Screen Owners': [
    { label: 'List Your Screen', to: '/owner' },
    { label: 'Owner Dashboard',  to: '/owner/dashboard' },
    { label: 'Monetization',     to: null },
    { label: 'Support',          to: null },
  ],
  Legal: [
    { label: 'Terms of Service', to: '/terms' },
    { label: 'Privacy Policy',   to: '/privacy' },
    { label: 'Cookie Policy',    to: '/cookies' },
    { label: 'Status',           to: null },
  ],
}

export default function Footer() {
  const year = new Date().getFullYear()
  const [toast, setToast] = useState(null)

  function showComingSoon(label) {
    setToast(`${label} is coming soon! Stay tuned.`)
  }

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__inner container">

        {/* Brand column */}
        <div className="footer__brand">
          <Link to="/" className="footer__logo" aria-label="LUMAD home">
            <span className="footer__logo-text">LUMAD</span>
            <span className="footer__logo-dot" aria-hidden="true">●</span>
          </Link>
          <p className="footer__tagline">
            India's first self-serve DOOH platform.
            <br />
            <span className="footer__tagline-highlight">Light up every screen.</span>
          </p>
          <p className="footer__desc">
            Discover screens. Upload your ad. Go live — no calls, no agencies, no waiting.
          </p>
        </div>

        {/* Link columns */}
        <nav className="footer__links-grid" aria-label="Footer navigation">
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group} className="footer__link-group">
              <h3 className="footer__link-heading">{group}</h3>
              <ul role="list">
                {links.map(({ label, to }) => (
                  <li key={label}>
                    {to ? (
                      <Link to={to} className="footer__link">{label}</Link>
                    ) : (
                      <button
                        className="footer__link footer__link--btn"
                        onClick={() => showComingSoon(label)}
                      >
                        {label}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p className="footer__copyright mono">
            © {year} LUMAD Technologies Pvt. Ltd. All rights reserved.
          </p>
          <div className="footer__bottom-links">
            <Link to="/terms" className="footer__bottom-link">Terms</Link>
            <Link to="/privacy" className="footer__bottom-link">Privacy</Link>
            <button className="footer__bottom-link footer__link--btn" onClick={() => showComingSoon('Status')}>Status</button>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </footer>
  )
}
