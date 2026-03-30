import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Sidebar from './Sidebar'

const SECTIONS = [
  {
    label: 'Campaign Hub',
    links: [
      { label: 'Dashboard',       to: '/advertiser',            icon: '📊' },
      { label: 'Discover Screens', to: '/advertiser/discover',  icon: '🗺️' },
      { label: 'My Campaigns',    to: '/advertiser/campaigns',  icon: '📋' },
    ],
  },
  {
    label: 'Tools',
    links: [
      { label: 'Book a Screen',   to: '/advertiser/book',       icon: '🚀' },
    ],
  },
]

export default function AdvertiserLayout() {
  const { user, isLoading, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading && (!user || user.role === 'owner')) {
      navigate(user ? '/owner' : '/login')
    }
  }, [user, isLoading, navigate])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  if (isLoading || !user) {
    return (
      <div className="portal-loading" style={{ '--portal-accent': 'var(--color-secondary)', '--portal-accent-rgb': '0, 210, 253' }}>
        <div className="portal-loading__inner">
          <div className="portal-loading__spinner" />
          <span className="portal-loading__text">Loading Campaign Hub...</span>
        </div>
      </div>
    )
  }

  return (
    <div
      className="portal-layout"
      style={{
        '--portal-accent': 'var(--color-secondary)',
        '--portal-accent-rgb': '0, 210, 253',
        '--portal-accent-secondary': 'var(--color-secondary-container)',
      }}
    >
      <Sidebar
        badge="Advertiser"
        sections={SECTIONS}
        user={user}
        onLogout={handleLogout}
        insight={{
          label: 'Campaign Tip',
          icon: '💡',
          text: 'Morning slots (6–10 AM) in metro stations show 40% higher engagement rates.',
        }}
      />
      <main className="portal-main">
        <Outlet />
      </main>
    </div>
  )
}
