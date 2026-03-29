import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { formatINR } from '../../utils/formatCurrency'
import './OwnerDashboardPage.css'

// Mock campaigns specifically generated for the owner dashboard
const MOCK_OWNER_CAMPAIGNS = [
  {
    id: 'camp_89a7sd8',
    screenName: 'Times Square Central',
    buyerName: 'Acme Corp',
    startDate: '2026-03-25T00:00:00Z',
    endDate: '2026-04-10T00:00:00Z',
    status: 'active',
    revenue: 450000,
  },
  {
    id: 'camp_12h4kh2',
    screenName: 'Cyberhub Main Entrance',
    buyerName: 'Globex Inc',
    startDate: '2026-04-01T00:00:00Z',
    endDate: '2026-04-30T00:00:00Z',
    status: 'pending',
    revenue: 820000,
  },
  {
    id: 'camp_56n2bm1',
    screenName: 'Bandra Linking Road Highway',
    buyerName: 'Stark Industries',
    startDate: '2026-02-15T00:00:00Z',
    endDate: '2026-03-01T00:00:00Z',
    status: 'completed',
    revenue: 210000,
  }
]

export default function OwnerDashboardPage() {
  const { user } = useAuth()
  const [campaigns, setCampaigns] = useState([])

  useEffect(() => {
    // In a real app we'd fetch campaigns filtered by ownerId
    // For the mock, we blend the hardcoded mock data with whatever is in localStorage
    const savedCampaigns = JSON.parse(localStorage.getItem('lumad_campaigns') || '[]')
    
    // Convert localStorage campaigns to look like owner perspective campaigns
    const userBooked = savedCampaigns.map(c => ({
      ...c,
      buyerName: 'Self-Booked (Demo)', // Because the same user booked it locally
      revenue: c.price // to owner it's revenue
    }))

    setCampaigns([...userBooked, ...MOCK_OWNER_CAMPAIGNS])
  }, [])

  // Calculate mock metrics
  const totalRevenue = campaigns
    .filter(c => c.status === 'completed' || c.status === 'active')
    .reduce((sum, camp) => sum + camp.revenue, 0)
    
  const pendingPayouts = campaigns
    .filter(c => c.status === 'pending')
    .reduce((sum, camp) => sum + camp.revenue, 0)

  const activeCount = campaigns.filter(c => c.status === 'active').length

  return (
    <div className="owner-dashboard animate-fadeIn">
      <header className="owner-header">
        <h1 className="owner-title">Welcome back, {user?.name || 'Owner'}</h1>
        <p className="owner-subtitle">Here's what is happening with your screens today.</p>
      </header>

      <section className="metrics-row">
        <div className="metric-card-owner">
          <div className="metric-header">
            <span className="metric-label">Total Earned</span>
            <div className="metric-icon">💰</div>
          </div>
          <div className="metric-value">{formatINR(totalRevenue)}</div>
          <div className="metric-trend trend-up">
            ↑ 12% vs last month
          </div>
        </div>

        <div className="metric-card-owner">
          <div className="metric-header">
            <span className="metric-label">Pending Payouts</span>
            <div className="metric-icon">⏳</div>
          </div>
          <div className="metric-value">{formatINR(pendingPayouts)}</div>
          <div className="metric-trend">
            Clears in 3-5 business days
          </div>
        </div>

        <div className="metric-card-owner">
          <div className="metric-header">
            <span className="metric-label">Active Campaigns</span>
            <div className="metric-icon">📺</div>
          </div>
          <div className="metric-value">{activeCount}</div>
          <div className="metric-trend trend-up">
            ↑ 2 from last week
          </div>
        </div>
      </section>

      <section className="recent-campaigns">
        <h2 className="section-title">Recent Network Activity</h2>
        <div className="table-wrapper">
          <table className="campaign-table">
            <thead>
              <tr>
                <th>Screen</th>
                <th>Dates</th>
                <th>Status</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map(camp => (
                <tr key={camp.id}>
                  <td>
                    <div className="campaign-screen-name">{camp.screenName}</div>
                    <div className="campaign-brand">Booked by: {camp.buyerName}</div>
                  </td>
                  <td>
                    {new Date(camp.startDate).toLocaleDateString()} - {new Date(camp.endDate).toLocaleDateString()}
                  </td>
                  <td>
                    <span className={`campaign-status status-${camp.status}`}>
                      {camp.status}
                    </span>
                  </td>
                  <td className="revenue">
                    {formatINR(camp.revenue)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {campaigns.length === 0 && (
            <div className="empty-state">
              <p>No campaign activity yet.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
