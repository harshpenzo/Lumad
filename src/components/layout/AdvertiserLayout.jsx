import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Sidebar from './Sidebar'
import TopBar from './TopBar'
import './Sidebar.css'

const ADVERTISER_SECTIONS = [
  {
    links: [
      { label: 'Dashboard',         to: '/advertiser/dashboard',   icon: '📈' },
      { label: 'My Campaigns',      to: '/advertiser/campaigns',   icon: '📋' },
      { label: 'Discover Screens',  to: '/advertiser/discover',    icon: '🗺️' },
      { label: 'Analytics',         to: '/advertiser/analytics',   icon: '📉' },
      { label: 'Billing',           to: '/advertiser/billing',     icon: '💳' },
      { label: 'Settings',          to: '/advertiser/settings',    icon: '⚙️' },
    ],
  },
]

export default function AdvertiserLayout() {
  const { user, isLoading, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading && (!user || user.role === 'owner')) {
      navigate(user ? '/owner/dashboard' : '/login')
    }
  }, [user, isLoading, navigate])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  if (isLoading || !user) {
    return (
      <div 
        className="portal-loading" 
        style={{ '--portal-accent': '#00D4FF', '--portal-accent-rgb': '0, 212, 255' }}
      >
        <div className="portal-loading__inner">
          <div className="portal-loading__spinner" />
          <span className="portal-loading__text">Initializing Feed...</span>
        </div>
      </div>
    )
  }

  return (
    <div
      className="portal-layout"
      style={{
        '--portal-accent': '#00D4FF', /* Specific advertiser cyan */
        '--portal-accent-rgb': '0, 212, 255',
        '--portal-accent-secondary': 'rgba(0, 212, 255, 0.2)',
      }}
    >
      <Sidebar
        sections={ADVERTISER_SECTIONS}
        onLogout={handleLogout}
        actionLabel="Create Campaign"
        onAction={() => navigate('/advertiser/discover')}
      />
      <div className="portal-container">
        <TopBar title="Command Center" showSearch />
        <main className="portal-main">
          <div className="portal-content-limit">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
