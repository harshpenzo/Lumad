import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Sidebar.css'

/**
 * Shared Sidebar component — Used by both Owner and Advertiser portals.
 * Matches the "MISSION CONTROL" aesthetic from Stitch.
 */
export default function Sidebar({ 
  links, 
  sections, 
  onLogout, 
  actionLabel, 
  onAction 
}) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const isActive = (to) => {
    if (to === location.pathname) return true
    if (to !== '/owner' && to !== '/advertiser' && location.pathname.startsWith(to)) return true
    return false
  }

  const renderLink = (link, i) => (
    <Link
      key={link.to}
      to={link.to}
      className={`sidebar__link ${isActive(link.to) ? 'active' : ''}`}
      style={{ animationDelay: `${i * 30}ms` }}
    >
      <span className="sidebar__link-icon">{link.icon}</span>
      <span className="sidebar__link-label">{link.label}</span>
      {isActive(link.to) && <span className="sidebar__active-indicator" />}
    </Link>
  )

  const defaultIcons = {
    Dashboard: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>,
    "My Campaigns": <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>,
    "Discover Screens": <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/></svg>,
    Analytics: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/></svg>,
    Billing: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>,
    Settings: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
    Support: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
    Logout: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
  }

  const enhancedLinks = links?.map(link => ({
    ...link,
    icon: link.icon && typeof link.icon === 'string' ? defaultIcons[link.label] || link.icon : link.icon
  }))

  const enhancedSections = sections?.map(section => ({
    ...section,
    links: section.links.map(link => ({
      ...link,
      icon: link.icon && typeof link.icon === 'string' ? defaultIcons[link.label] || link.icon : link.icon
    }))
  }))

  return (
    <>
      <button
        className="sidebar-toggle"
        onClick={() => setMobileOpen(o => !o)}
        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
      >
        {mobileOpen ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
        )}
      </button>

      <div
        className={`sidebar-overlay ${mobileOpen ? 'sidebar-overlay--visible' : ''}`}
        onClick={() => setMobileOpen(false)}
      />

      <aside className={`sidebar ${mobileOpen ? 'sidebar--open' : ''}`}>
        <div className="sidebar__header">
          <Link to="/" className="sidebar__brand">
            <span className="sidebar__brand-text">LUMAD</span>
            <span className="sidebar__brand-sub">MISSION CONTROL</span>
          </Link>
        </div>

        <nav className="sidebar__nav">
          {enhancedSections ? (
            enhancedSections.map((section, si) => (
              <div key={si} className="sidebar__section">
                {section.links.map((link, li) => renderLink(link, si * 10 + li))}
              </div>
            ))
          ) : (
            enhancedLinks?.map((link, i) => renderLink(link, i))
          )}
        </nav>

        <div className="sidebar__footer">
          {actionLabel && (
            <button className="sidebar__action-btn-v2" onClick={onAction}>
              <div className="sidebar__action-circle">+</div>
              {actionLabel}
            </button>
          )}

          <div className="sidebar__bottom-links">
            {renderLink({ to: '/support', label: 'Support', icon: defaultIcons.Support }, 90)}
            <button className="sidebar__link" onClick={onLogout}>
              <span className="sidebar__link-icon">{defaultIcons.Logout}</span>
              <span className="sidebar__link-label">Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
