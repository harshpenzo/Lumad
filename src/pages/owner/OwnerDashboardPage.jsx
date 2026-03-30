import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../lib/supabase'
import { formatINR } from '../../utils/formatCurrency'
import './OwnerDashboardPage.css'

export default function OwnerDashboardPage() {
  const { user } = useAuth()
  const [listings, setListings]   = useState([])
  const [campaigns, setCampaigns] = useState([])
  const [loading, setLoading]     = useState(true)

  useEffect(() => {
    document.title = 'Owner Dashboard — LUMAD';
    return () => { document.title = 'LUMAD'; };
  }, []);

  useEffect(() => {
    if (!user) return
    setLoading(true)

    Promise.all([
      supabase.from('screen_listings').select('*').eq('owner_id', user.id),
      supabase.from('campaigns').select('*').eq('user_id', user.id)
    ]).then(([{ data: listData }, { data: campData }]) => {
      setListings(listData || [])
      setCampaigns(campData || [])
      setLoading(false)
    })
  }, [user])

  const totalRevenue = campaigns
    .filter(c => c.status === 'active' || c.status === 'completed')
    .reduce((sum, c) => sum + (c.price || 0), 0)

  const pendingPayouts = campaigns
    .filter(c => c.status === 'pending')
    .reduce((sum, c) => sum + (c.price || 0), 0)

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
          <div className="metric-trend trend-up">From active campaigns</div>
        </div>
        <div className="metric-card-owner">
          <div className="metric-header">
            <span className="metric-label">Pending Payouts</span>
            <div className="metric-icon">⏳</div>
          </div>
          <div className="metric-value">{formatINR(pendingPayouts)}</div>
          <div className="metric-trend">Clears in 3–5 business days</div>
        </div>
        <div className="metric-card-owner">
          <div className="metric-header">
            <span className="metric-label">My Screens</span>
            <div className="metric-icon">📺</div>
          </div>
          <div className="metric-value">{listings.length}</div>
          <div className="metric-trend">{activeCount} actively booking</div>
        </div>
      </section>

      <section className="recent-campaigns">
        <h2 className="section-title">Recent Bookings</h2>
        <div className="table-wrapper">
          {loading ? (
            <p style={{ padding: '2rem', color: 'rgba(255,255,255,0.4)' }}>Loading...</p>
          ) : campaigns.length === 0 ? (
            <div className="empty-state"><p>No bookings yet. Share your screen URLs to attract advertisers.</p></div>
          ) : (
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
                      <div className="campaign-screen-name">{camp.screen_name}</div>
                    </td>
                    <td>{camp.start_date} – {camp.end_date}</td>
                    <td>
                      <span className={`campaign-status status-${camp.status}`}>{camp.status}</span>
                    </td>
                    <td className="revenue">{formatINR(camp.price || 0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  )
}
