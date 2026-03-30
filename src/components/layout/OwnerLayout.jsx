import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Sidebar from './Sidebar'

const SECTIONS = [
  {
    label: 'My Screens',
    links: [
      { label: 'Dashboard',     to: '/owner',             icon: '📊' },
      { label: 'Inventory',     to: '/owner/inventory',   icon: '📺' },
      { label: 'Booking Queue', to: '/owner/bookings',    icon: '📥' },
    ],
  },
  {
    label: 'Finance',
    links: [
      { label: 'Earnings',      to: '/owner/earnings',    icon: '💰' },
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
          <span className="portal-loading__text">Loading Owner Portal...</span>
        </div>
      </div>
    )
  }

  return (
    <div
      className="portal-layout"
      style={{
        '--portal-accent': 'var(--color-primary)',
        '--portal-accent-rgb': '255, 200, 128',
        '--portal-accent-secondary': 'var(--color-primary-container)',
      }}
    >
      <Sidebar
        badge="Owner"
        sections={SECTIONS}
        user={user}
        onLogout={handleLogout}
        insight={{
          label: 'AI Insight',
          icon: '🧠',
          text: 'Screens in transit hubs see 3× more bookings on weekdays. Consider adjusting pricing.',
        }}
      />
      <main className="portal-main">
        <Outlet />
      </main>
    </div>
  )
}
