import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../lib/supabase'
import { formatINR } from '../../utils/formatCurrency'
import './CampaignsPage.css'

const STATUS_MAP = {
  active:    { label: 'Live',      color: '#00e676', bg: 'rgba(0,230,118,0.1)' },
  pending:   { label: 'Pending',   color: '#ffb955', bg: 'rgba(255,193,7,0.1)' },
  completed: { label: 'Completed', color: '#a2e7ff', bg: 'rgba(162,231,255,0.1)' },
  rejected:  { label: 'Rejected',  color: '#ffb4ab', bg: 'rgba(255,180,171,0.1)' },
}

export default function CampaignsPage() {
  const { user } = useAuth()
  const [campaigns, setCampaigns] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    document.title = 'My Campaigns — LUMAD'
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

  const filtered = filter === 'all' ? campaigns : campaigns.filter(c => c.status === filter)

  return (
    <div className="campaigns-page animate-fadeIn">
      <header className="cp-header">
        <div>
          <h1 className="cp-title">My Campaigns</h1>
          <p className="cp-subtitle">Track and manage all your advertising campaigns.</p>
        </div>
        <Link to="/advertiser/discover" className="cp-new-btn">
          <span>+</span> New Campaign
        </Link>
      </header>

      {/* Filter tabs */}
      <div className="cp-filters">
        {['all', 'active', 'pending', 'completed'].map(f => (
          <button
            key={f}
            className={`cp-filter ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f === 'all' ? 'All' : STATUS_MAP[f]?.label || f}
            <span className="cp-filter-count">{f === 'all' ? campaigns.length : campaigns.filter(c => c.status === f).length}</span>
          </button>
        ))}
      </div>

      {loading ? (
        <div className="cp-loading"><div className="cp-spinner" /><span>Loading campaigns...</span></div>
      ) : filtered.length === 0 ? (
        <div className="cp-empty">
          <div className="cp-empty-icon">📋</div>
          <h3>No campaigns {filter !== 'all' ? `with "${filter}" status` : 'yet'}</h3>
          <p>Discover screens and launch your first campaign to start reaching audiences.</p>
          <Link to="/advertiser/discover" className="cp-new-btn" style={{ marginTop: '1rem' }}>Explore Screens →</Link>
        </div>
      ) : (
        <div className="cp-grid">
          {filtered.map((camp, i) => {
            const st = STATUS_MAP[camp.status] || STATUS_MAP.pending
            return (
              <div key={camp.id} className="cp-card" style={{ animationDelay: `${i * 50}ms` }}>
                <div className="cp-card-top">
                  <h3 className="cp-card-name">{camp.screen_name || 'Unnamed Screen'}</h3>
                  <span className="cp-card-status" style={{ background: st.bg, color: st.color }}>
                    {st.label}
                  </span>
                </div>
                <div className="cp-card-meta">
                  <span className="mono">{camp.start_date} — {camp.end_date}</span>
                  {camp.screen_location && <span>📍 {camp.screen_location}</span>}
                </div>
                <div className="cp-card-bottom">
                  <div className="cp-card-price">{formatINR(camp.price || 0)}</div>
                  <div className="cp-card-impressions mono">
                    ~{((camp.price || 0) * 50).toLocaleString('en-IN')} impressions
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
