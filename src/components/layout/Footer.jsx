import { Link } from 'react-router-dom'
import './Footer.css'

/**
 * Footer
 * Sourced from Stitch mobile screen (fbbd0961616146f382a4c69b87ebf7ca):
 * Links: Terms of Service, Privacy Policy, API Docs, Support, Status
 * Also from homepage bottom: tagline "Light up every screen."
 */

const FOOTER_LINKS = {
  Platform: [
    { label: 'Screen Discovery', to: '/discover' },
    { label: 'Features',         to: '/features' },
    { label: 'Pricing',          to: '/pricing' },
    { label: 'API Docs',         to: '#' },
  ],
  Company: [
    { label: 'About LUMAD', to: '/about' },
    { label: 'Contact Us',  to: '#' },
    { label: 'Careers',     to: '#' },
    { label: 'Press',       to: '#' },
  ],
  'Screen Owners': [
    { label: 'List Your Screen', to: '/owner' },
    { label: 'Owner Dashboard',  to: '/owner/dashboard' },
    { label: 'Monetization',     to: '#' },
    { label: 'Support',          to: '#' },
  ],
  Legal: [
    { label: 'Terms of Service', to: '#' },
    { label: 'Privacy Policy',   to: '#' },
    { label: 'Cookie Policy',    to: '#' },
    { label: 'Status',           to: '#' },
  ],
}

export default function Footer() {
  const year = new Date().getFullYear()

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
                    <Link to={to} className="footer__link">{label}</Link>
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
            <Link to="#" className="footer__bottom-link">Terms</Link>
            <Link to="#" className="footer__bottom-link">Privacy</Link>
            <Link to="#" className="footer__bottom-link">Status</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
