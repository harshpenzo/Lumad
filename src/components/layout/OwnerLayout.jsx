import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Sidebar from './Sidebar'
import TopBar from './TopBar'
import './Sidebar.css'

const OWNER_SECTIONS = [
  {
    links: [
      { label: 'Overview',      to: '/owner/dashboard',   icon: '📊' },
      { label: 'My Screens',    to: '/owner/inventory',   icon: '📺' },
      { label: 'Booking Queue', to: '/owner/bookings',    icon: '📥' },
      { label: 'Earnings',      to: '/owner/earnings',    icon: '💰' },
      { label: 'Settings',      to: '/owner/settings',    icon: '⚙️' },
    ],
  },
]

export default function OwnerLayout() {
  const { user, isLoading, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'owner')) {
      navigate(user ? '/' : '/login')
    }
  }, [user, isLoading, navigate])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  if (isLoading || !user || user.role !== 'owner') {
    return (
      <div
        className="portal-loading"
        style={{
          '--portal-accent': 'var(--color-primary)',
          '--portal-accent-rgb': '255, 200, 128',
        }}
      >
        <div className="portal-loading__inner">
          <div className="portal-loading__spinner" />
          <span className="portal-loading__text">Establishing Link...</span>
        </div>
      </div>
    )
  }

  return (
    <div
      className="portal-layout"
      style={{
        '--portal-accent': '#F5A623', /* Specific owner amber */
        '--portal-accent-rgb': '245, 166, 35',
        '--portal-accent-secondary': 'rgba(245, 166, 35, 0.2)',
      }}
    >
      <Sidebar
        sections={OWNER_SECTIONS}
        onLogout={handleLogout}
        actionLabel="Add New Screen"
        onAction={() => navigate('/owner/inventory/new')}
      />
      <div className="portal-container">
        <TopBar title="Command Center" />
        <main className="portal-main">
          <div className="portal-content-limit">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
