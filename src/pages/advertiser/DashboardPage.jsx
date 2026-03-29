import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './DashboardPage.css'

export default function DashboardPage() {
  const { user, isLoading } = useAuth()
  const navigate = useNavigate()
  const [campaigns, setCampaigns] = useState([])

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login')
    }
  }, [user, isLoading, navigate])

  useEffect(() => {
    // Load campaigns from localStorage
    const savedCampaigns = JSON.parse(localStorage.getItem('lumad_campaigns') || '[]')
    
    // Filter by user if needed (in a real app)
    // For now we just show what's recorded
    setCampaigns(savedCampaigns)
  }, [])

  if (isLoading || !user) {
    return <div className="dashboard-layout"><h1 className="dashboard-title">Loading...</h1></div>
  }

  // Calculate some mock metrics
  const totalSpend = campaigns.reduce((sum, camp) => sum + camp.price, 0)
  const activeCampaigns = campaigns.filter(c => c.status === 'active' || c.status === 'pending')

  return (
    <main className="dashboard-layout">
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Welcome back, {user.name}</h1>
          <p className="dashboard-subtitle">Here's an overview of your advertising campaigns.</p>
        </div>
        <div className="dashboard-actions">
          <Link to="/discover" className="dashboard-btn-primary">
            New Campaign
          </Link>
        </div>
      </div>

      <div className="dashboard-grid">
        <aside className="dashboard-metrics">
          <div className="metric-card">
            <h3 className="metric-label">Total Spend</h3>
            <div className="metric-value">${totalSpend.toLocaleString()}</div>
          </div>
          <div className="metric-card">
            <h3 className="metric-label">Active Campaigns</h3>
            <div className="metric-value">{activeCampaigns.length}</div>
          </div>
          <div className="metric-card">
            <h3 className="metric-label">Total Impressions</h3>
            <div className="metric-value">
              {/* Fake stat: approx 5k impressions per $100 spent */}
              {Math.floor(totalSpend * 50).toLocaleString()}
            </div>
          </div>
        </aside>

        <section className="dashboard-campaigns">
          <h2 className="campaigns-title">Your Campaigns</h2>
          
          {campaigns.length === 0 ? (
            <div className="empty-state">
              <p>You haven't booked any campaigns yet.</p>
              <Link to="/discover" className="dashboard-btn-primary">Explore Screens</Link>
            </div>
          ) : (
            <div className="campaign-list">
              {campaigns.map((camp, index) => (
                <div key={index} className="campaign-card">
                  <div className="campaign-info-main">
                    <h3 className="campaign-name">{camp.screenName}</h3>
                    <div className="campaign-meta">
                      {new Date(camp.startDate).toLocaleDateString()} - {new Date(camp.endDate).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="campaign-info-side">
                    <span className={`campaign-status status-${camp.status}`}>
                      {camp.status}
                    </span>
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
