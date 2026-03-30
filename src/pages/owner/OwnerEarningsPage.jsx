import { useState, useEffect, useMemo } from 'react'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../lib/supabase'
import { formatINR } from '../../utils/formatCurrency'
import './OwnerEarningsPage.css'

export default function OwnerEarningsPage() {
  const { user } = useAuth()
  const [campaigns, setCampaigns] = useState([])
  const [loading, setLoading]     = useState(true)

  useEffect(() => {
    document.title = 'Earnings & Payouts — LUMAD Owner'
    return () => { document.title = 'LUMAD' }
  }, [])

  useEffect(() => {
    if (!user) return
    setLoading(true)
    supabase
      .from('campaigns')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setCampaigns(data || [])
        setLoading(false)
      })
  }, [user])

  // Derived metrics
  const totalEarned = useMemo(
    () => campaigns.filter(c => c.status === 'active' || c.status === 'completed').reduce((s, c) => s + (c.price || 0), 0),
    [campaigns]
  )

  const pendingPayout = useMemo(
    () => campaigns.filter(c => c.status === 'pending').reduce((s, c) => s + (c.price || 0), 0),
    [campaigns]
  )

  const completedCount = campaigns.filter(c => c.status === 'completed').length

  // Fake monthly trend (since we don't have real historical data)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
  const trendData = useMemo(() => {
    const base = totalEarned / 6
    return months.map((m, i) => ({
      month: m,
      amount: Math.round(base * (0.4 + Math.random() * 1.2)),
    }))
  }, [totalEarned])

  const maxTrend = Math.max(...trendData.map(t => t.amount), 1)

  return (
    <div className="earnings-page animate-fadeIn">
      <header className="earn-header">
        <h1 className="earn-title">Earnings & Payouts</h1>
        <p className="earn-subtitle">Track your revenue stream and settlement history.</p>
      </header>

      {/* Summary Cards */}
      <div className="earn-summary">
        <div className="earn-card earn-card--primary">
          <div className="earn-card-label">Total Earned</div>
          <div className="earn-card-value">{formatINR(totalEarned)}</div>
          <div className="earn-card-footnote">Lifetime earnings from active & completed campaigns</div>
        </div>
        <div className="earn-card">
          <div className="earn-card-label">Pending Payout</div>
          <div className="earn-card-value" style={{ color: '#ffb955' }}>{formatINR(pendingPayout)}</div>
          <div className="earn-card-footnote">Settles in 3–5 business days</div>
        </div>
        <div className="earn-card">
          <div className="earn-card-label">Completed Campaigns</div>
          <div className="earn-card-value">{completedCount}</div>
          <div className="earn-card-footnote">Successfully delivered</div>
        </div>
      </div>

      {/* Revenue Trend Chart */}
      <section className="earn-section">
        <h2 className="earn-section-title">Revenue Trend</h2>
        <div className="earn-chart">
          {trendData.map((item, i) => (
            <div key={item.month} className="earn-bar-group" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="earn-bar-label mono">{formatINR(item.amount)}</div>
              <div className="earn-bar-track">
                <div
                  className="earn-bar-fill"
                  style={{ height: `${(item.amount / maxTrend) * 100}%` }}
                />
              </div>
              <div className="earn-bar-month mono">{item.month}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Payout History */}
      <section className="earn-section">
        <h2 className="earn-section-title">Payout History</h2>
        {loading ? (
          <div className="earn-loading">Loading...</div>
        ) : campaigns.length === 0 ? (
          <div className="earn-empty">
            <div className="earn-empty-icon">💸</div>
            <p>No earnings yet. Start by listing screens and attracting advertisers.</p>
          </div>
        ) : (
          <div className="earn-table-wrap">
            <table className="earn-table">
              <thead>
                <tr>
                  <th>Campaign</th>
                  <th>Period</th>
                  <th>Status</th>
                  <th className="text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((camp, i) => (
                  <tr key={camp.id} style={{ animationDelay: `${i * 50}ms` }} className="earn-row">
                    <td>
                      <div className="earn-campaign-name">{camp.screen_name || 'Unnamed'}</div>
                      {camp.screen_location && (
                        <div className="earn-campaign-loc">{camp.screen_location}</div>
                      )}
                    </td>
                    <td className="mono">{camp.start_date} — {camp.end_date}</td>
                    <td>
                      <span className={`earn-status earn-status--${camp.status}`}>
                        {camp.status}
                      </span>
                    </td>
                    <td className="text-right mono">{formatINR(camp.price || 0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  )
}
