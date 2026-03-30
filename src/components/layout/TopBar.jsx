import React from 'react'
import { useAuth } from '../../context/AuthContext'
import './TopBar.css'

export default function TopBar({ title = "Command Center", showSearch = true }) {
  const { user } = useAuth()
  
  const initials = user?.name
    ? user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : 'U'

  return (
    <header className="topbar">
      <div className="topbar__left">
        <h1 className="topbar__title">{title}</h1>
        
        <nav className="topbar__tabs">
          <button className="topbar__tab active">GLOBAL VIEW</button>
          <button className="topbar__tab">LIVE FEED</button>
        </nav>
      </div>

      <div className="topbar__right">
        {showSearch && (
          <div className="topbar__search-compact">
            <input type="text" placeholder="Search parameters..." className="topbar__search-input-sleek" />
            <svg className="topbar__search-icon-sleek" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
        )}

        <div className="topbar__actions">
          <button className="topbar__icon-btn" aria-label="Notifications">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            <span className="topbar__dot" />
          </button>
          <button className="topbar__icon-btn" aria-label="Help">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          </button>
        </div>

        <div className="topbar__profile-v2">
          <div className="topbar__avatar-ring">
            <div className="topbar__avatar-inner">
              {user?.avatar_url ? (
                <img src={user.avatar_url} alt={user.name} />
              ) : (
                <span>{initials}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
