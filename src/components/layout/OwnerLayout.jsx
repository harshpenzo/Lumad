import { useEffect } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './OwnerLayout.css'

export default function OwnerLayout() {
  const { user, isLoading, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    // If we finished loading and there's either no user, or they aren't an owner, boot them
    if (!isLoading && (!user || user.role !== 'owner')) {
      navigate('/login')
    }
  }, [user, isLoading, navigate])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  // Prevent flicker during load
  if (isLoading || !user || user.role !== 'owner') {
    return <div className="owner-layout" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100vw' }}><p className="mono">Authenticating Owner...</p></div>
  }

  const LINKS = [
    { label: 'Dashboard', to: '/owner', icon: '📊' },
    { label: 'Inventory', to: '/owner/inventory', icon: '📺' },
  ]

  return (
    <div className="owner-layout animate-fadeIn">
      {/* Sidebar Navigation */}
      <aside className="owner-sidebar">
        <div className="sidebar-header">
          <Link to="/" className="sidebar-brand">
            LUMAD <span>Owner</span>
          </Link>
        </div>
        
        <nav className="sidebar-nav">
          {LINKS.map(link => (
            <Link 
              key={link.to} 
              to={link.to} 
              className={`sidebar-link ${location.pathname === link.to ? 'active' : ''}`}
            >
              <span className="sidebar-icon">{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="owner-logout" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content Area (Outlet for nested routes) */}
      <main className="owner-main">
        <Outlet />
      </main>
    </div>
  )
}
