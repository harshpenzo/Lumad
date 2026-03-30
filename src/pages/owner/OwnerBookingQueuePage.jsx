import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../lib/supabase'
import { formatINR } from '../../utils/formatCurrency'
import './OwnerBookingQueuePage.css'

const STATUS_LABELS = {
  pending:   'Pending Approval',
  active:    'Live',
  completed: 'Completed',
  rejected:  'Rejected',
}

const STATUS_COLORS = {
  pending:   { bg: 'rgba(255, 193, 7, 0.1)',  text: '#ffb955',  dot: '#ffb955' },
  active:    { bg: 'rgba(0, 230, 118, 0.1)',   text: '#00e676',  dot: '#00e676' },
  completed: { bg: 'rgba(162, 231, 255, 0.1)', text: '#a2e7ff',  dot: '#a2e7ff' },
  rejected:  { bg: 'rgba(255, 180, 171, 0.1)', text: '#ffb4ab',  dot: '#ffb4ab' },
}

export default function OwnerBookingQueuePage() {
  const { user } = useAuth()
  const [campaigns, setCampaigns] = useState([])
  const [loading, setLoading]     = useState(true)
  const [filter, setFilter]       = useState('all')

  useEffect(() => {
    document.title = 'Booking Queue — LUMAD Owner'
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

  const filtered = filter === 'all'
    ? campaigns
    : campaigns.filter(c => c.status === filter)

  const pendingCount = campaigns.filter(c => c.status === 'pending').length
  const activeCount  = campaigns.filter(c => c.status === 'active').length

  return (
    <div className="booking-queue animate-fadeIn">
      <header className="bq-header">
        <div>
          <h1 className="bq-title">Booking Queue</h1>
          <p className="bq-subtitle">
            Manage incoming campaign requests and track live bookings.
          </p>
        </div>
        <div className="bq-counters">
          <div className="bq-counter">
            <span className="bq-counter-value" style={{ color: '#ffb955' }}>{pendingCount}</span>
            <span className="bq-counter-label">Pending</span>
          </div>
          <div className="bq-counter">
            <span className="bq-counter-value" style={{ color: '#00e676' }}>{activeCount}</span>
            <span className="bq-counter-label">Live</span>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="bq-filters">
        {['all', 'pending', 'active', 'completed'].map(f => (
          <button
            key={f}
            className={`bq-filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f === 'all' ? 'All Bookings' : STATUS_LABELS[f] || f}
            {f !== 'all' && (
              <span className="bq-filter-count">
                {campaigns.filter(c => c.status === f).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Queue List */}
      {loading ? (
        <div className="bq-loading">
          <div className="bq-loading-bar" />
          <p>Fetching booking queue...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bq-empty">
          <div className="bq-empty-icon">📭</div>
          <h3>No bookings {filter !== 'all' ? `with status "${filter}"` : 'yet'}</h3>
          <p>When advertisers book your screens, requests will appear here for review.</p>
        </div>
      ) : (
        <div className="bq-list">
          {filtered.map((camp, i) => {
            const colors = STATUS_COLORS[camp.status] || STATUS_COLORS.pending
            return (
              <div
                key={camp.id}
                className="bq-card"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="bq-card-left">
                  <div className="bq-card-screen">{camp.screen_name || 'Unnamed Screen'}</div>
                  <div className="bq-card-meta">
                    <span className="mono">{camp.start_date} — {camp.end_date}</span>
                    {camp.screen_location && (
                      <span className="bq-card-loc">📍 {camp.screen_location}</span>
                    )}
                  </div>
                </div>
                <div className="bq-card-right">
                  <div className="bq-card-price">{formatINR(camp.price || 0)}</div>
                  <span
                    className="bq-status-chip"
                    style={{ background: colors.bg, color: colors.text }}
                  >
                    <span className="bq-status-dot" style={{ background: colors.dot }} />
                    {STATUS_LABELS[camp.status] || camp.status}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
