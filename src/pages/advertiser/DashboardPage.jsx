import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../lib/supabase'
import { formatINR } from '../../utils/formatCurrency'
import './DashboardPage.css'

export default function DashboardPage() {
  const { user, isLoading } = useAuth()
  const navigate = useNavigate()
  const [campaigns, setCampaigns]     = useState([])
  const [dbLoading, setDbLoading]     = useState(true)

  useEffect(() => {
    document.title = 'My Dashboard — LUMAD';
    return () => { document.title = 'LUMAD'; };
  }, []);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login')
    }
  }, [user, isLoading, navigate])

  useEffect(() => {
    if (!user) return
    setDbLoading(true)
    supabase
      .from('campaigns')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (data) setCampaigns(data)
        else if (error) console.warn('[LUMAD] Campaigns fetch error:', error.message)
        setDbLoading(false)
      })
  }, [user])

  if (isLoading || !user) {
    return <div className="dashboard-layout"><h1 className="dashboard-title">Loading...</h1></div>
  }

  const totalSpend      = campaigns.reduce((sum, c) => sum + (c.price || 0), 0)
  const activeCampaigns = campaigns.filter(c => c.status === 'active' || c.status === 'pending')

  return (
    <main className="dashboard-layout">
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Welcome back, {user.name}</h1>
          <p className="dashboard-subtitle">Here's an overview of your advertising campaigns.</p>
        </div>
        <div className="dashboard-actions">
          <Link to="/advertiser/discover" className="dashboard-btn-primary">New Campaign</Link>
        </div>
      </div>

      <div className="dashboard-grid">
        <aside className="dashboard-metrics">
          <div className="metric-card">
            <h3 className="metric-label">Total Spend</h3>
            <div className="metric-value">{formatINR(totalSpend)}</div>
          </div>
          <div className="metric-card">
            <h3 className="metric-label">Active Campaigns</h3>
            <div className="metric-value">{activeCampaigns.length}</div>
          </div>
          <div className="metric-card">
            <h3 className="metric-label">Est. Impressions</h3>
            <div className="metric-value">
              {(totalSpend * 50).toLocaleString('en-IN')}
            </div>
          </div>
        </aside>

        <section className="dashboard-campaigns">
          <h2 className="campaigns-title">Your Campaigns</h2>

          {dbLoading ? (
            <div className="empty-state"><p>Loading campaigns...</p></div>
          ) : campaigns.length === 0 ? (
            <div className="empty-state">
              <p>You haven't booked any campaigns yet.</p>
              <Link to="/advertiser/discover" className="dashboard-btn-primary">Explore Screens →</Link>
            </div>
          ) : (
            <div className="campaign-list">
              {campaigns.map((camp) => (
                <div key={camp.id} className="campaign-card">
                  <div className="campaign-info-main">
                    <h3 className="campaign-name">{camp.screen_name}</h3>
                    <div className="campaign-meta">
                      {camp.start_date} – {camp.end_date}
                      {camp.screen_location && (
                        <span style={{ marginLeft: '0.75rem', opacity: 0.6 }}>
                          · {camp.screen_location}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="campaign-info-side">
                    <span className="campaign-price">{formatINR(camp.price || 0)}</span>
                    <span className={`campaign-status status-${camp.status}`}>{camp.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
