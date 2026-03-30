import { useState, useEffect, useRef } from 'react'
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

  // Close menu on click outside
  const menuRef = useRef(null)
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuOpen && menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [menuOpen])

  return (
    <header ref={menuRef} className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} role="banner">
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
              <AmberButton href={user.role === 'owner' ? '/owner' : '/advertiser/dashboard'} size="sm">Dashboard</AmberButton>
            </>
          ) : (
            <>
              <GhostButton href="/login" size="sm">Log in</GhostButton>
              <AmberButton href="/advertiser/discover" size="sm">Start Advertising</AmberButton>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="navbar__hamburger"
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
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
                onClick={() => setMenuOpen(false)}
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
              <AmberButton href={user.role === 'owner' ? '/owner' : '/advertiser/dashboard'} size="md" fullWidth>Dashboard</AmberButton>
            </>
          ) : (
            <>
              <GhostButton href="/login" size="md" fullWidth>Log in</GhostButton>
              <AmberButton href="/advertiser/discover" size="md" fullWidth>Start Advertising</AmberButton>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
