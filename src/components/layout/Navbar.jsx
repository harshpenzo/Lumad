import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import AmberButton from '../ui/AmberButton'
import GhostButton from '../ui/GhostButton'
import './Navbar.css'

/**
 * Navbar
 * Sourced from Stitch: nav links are Platform, Inventory, Solutions, Pricing
 * (extracted from both homepage and mobile screens).
 * Glassmorphic background on scroll. Mobile hamburger menu.
 */

const NAV_LINKS = [
  { label: 'Platform',  to: '/features' },
  { label: 'Inventory', to: '/discover' },
  { label: 'About',     to: '/about' },
  { label: 'Pricing',   to: '/pricing' },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  // Add glass background after scrolling past hero
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} role="banner">
      <nav className="navbar__inner container" aria-label="Main navigation">

        {/* Logo */}
        <Link to="/" className="navbar__logo" aria-label="LUMAD home">
          <span className="navbar__logo-text">LUMAD</span>
          <span className="navbar__logo-dot" aria-hidden="true">●</span>
        </Link>

        {/* Desktop nav links */}
        <ul className="navbar__links" role="list">
          {NAV_LINKS.map(({ label, to }) => (
            <li key={to}>
              <Link
                to={to}
                className={`navbar__link ${location.pathname === to ? 'navbar__link--active' : ''}`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTAs */}
        <div className="navbar__actions">
          {user ? (
            <>
              <GhostButton onClick={() => { logout(); navigate('/') }} size="sm">Log out</GhostButton>
              <AmberButton href={user.role === 'owner' ? '/owner' : '/dashboard'} size="sm">Dashboard</AmberButton>
            </>
          ) : (
            <>
              <GhostButton href="/login" size="sm">Log in</GhostButton>
              <AmberButton href="/discover" size="sm">Start Advertising</AmberButton>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <span className="navbar__hamburger-bar" />
          <span className="navbar__hamburger-bar" />
          <span className="navbar__hamburger-bar" />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <div
        id="mobile-menu"
        className={`navbar__mobile ${menuOpen ? 'navbar__mobile--open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <ul className="navbar__mobile-links" role="list">
          {NAV_LINKS.map(({ label, to }) => (
            <li key={to}>
              <Link
                to={to}
                className={`navbar__mobile-link ${location.pathname === to ? 'navbar__mobile-link--active' : ''}`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="navbar__mobile-actions">
          {user ? (
            <>
              <GhostButton onClick={() => { logout(); navigate('/'); setMenuOpen(false) }} size="md" fullWidth>Log out</GhostButton>
              <AmberButton href={user.role === 'owner' ? '/owner' : '/dashboard'} size="md" fullWidth>Dashboard</AmberButton>
            </>
          ) : (
            <>
              <GhostButton href="/login" size="md" fullWidth>Log in</GhostButton>
              <AmberButton href="/discover" size="md" fullWidth>Start Advertising</AmberButton>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
