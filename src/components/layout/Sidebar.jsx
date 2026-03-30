import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Sidebar.css'

/**
 * Shared Sidebar component — used by both Owner and Advertiser portals.
 *
 * Props:
 * - badge       : string   (e.g. "Owner" or "Advertiser")
 * - links       : Array<{ label, to, icon }>
 * - sections    : Array<{ label, links: Array }>  (optional — grouped)
 * - user        : { name, role }
 * - onLogout    : () => void
 * - insight     : { label, icon, text } | null
 */
export default function Sidebar({ badge, links, sections, user, onLogout, insight }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  // Lock body scroll when mobile sidebar is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const initials = user?.name
    ? user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : '?'

  /** Check if a link is currently active */
  const isActive = (to) => {
    // Exact match for index routes
    if (to === location.pathname) return true
    // For sub-routes, check if current path starts with the link
    // but only if the link has more specificity than the base
    return false
  }

  const renderLink = (link, i) => (
    <Link
      key={link.to}
      to={link.to}
      className={`sidebar__link ${isActive(link.to) ? 'active' : ''}`}
      style={{ animationDelay: `${i * 40}ms` }}
    >
      <span className="sidebar__link-icon">{link.icon}</span>
      {link.label}
    </Link>
  )

  return (
    <>
      {/* Mobile hamburger toggle */}
      <button
        className="sidebar-toggle"
        onClick={() => setMobileOpen(o => !o)}
        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
      >
        {mobileOpen ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        )}
      </button>

      {/* Mobile overlay */}
      <div
        className={`sidebar-overlay ${mobileOpen ? 'sidebar-overlay--visible' : ''}`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`sidebar ${mobileOpen ? 'sidebar--open' : ''}`}>
        {/* Brand */}
        <div className="sidebar__header">
          <Link to="/" className="sidebar__brand">
            <span className="sidebar__brand-text">LUMAD</span>
            <span className="sidebar__brand-badge">{badge}</span>
          </Link>
        </div>

        {/* User info */}
        {user && (
          <div className="sidebar__user">
            <div className="sidebar__avatar">{initials}</div>
            <div className="sidebar__user-info">
              <div className="sidebar__user-name">{user.name}</div>
              <div className="sidebar__user-role">{user.role}</div>
            </div>
          </div>
        )}

        {/* Navigation links */}
        <nav className="sidebar__nav">
          {sections ? (
            sections.map((section, si) => (
              <div key={si}>
                {section.label && (
                  <div className="sidebar__section-label">{section.label}</div>
                )}
                {section.links.map((link, li) => renderLink(link, si * 10 + li))}
              </div>
            ))
          ) : (
            links?.map((link, i) => renderLink(link, i))
          )}
        </nav>

        {/* Optional insight card */}
        {insight && (
          <div className="sidebar__insight">
            <div className="sidebar__insight-label">
              {insight.icon} {insight.label}
            </div>
            {insight.text}
          </div>
        )}

        {/* Footer / Logout */}
        <div className="sidebar__footer">
          <button className="sidebar__logout" onClick={onLogout}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Log Out
          </button>
        </div>
      </aside>
    </>
  )
}
