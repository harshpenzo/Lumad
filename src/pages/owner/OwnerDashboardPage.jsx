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
    document.title = 'Mission Control — LUMAD Owner'
    return () => { document.title = 'LUMAD' }
  }, [])

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

  const activeCount = campaigns.filter(c => c.status === 'active').length
  const pendingCount = campaigns.filter(c => c.status === 'pending').length

  // Mock data for the "Aesthetic" look
  const weeklyData = [
    { day: 'MON', val: 65 },
    { day: 'TUE', val: 40 },
    { day: 'WED', val: 85 },
    { day: 'THU', val: 95 },
    { day: 'FRI', val: 70 },
    { day: 'SAT', val: 120 },
    { day: 'SUN', val: 45 },
  ]

  const calendarDates = Array.from({ length: 31 }, (_, i) => ({
    date: i + 1,
    status: [4, 6, 12, 24].includes(i + 1) ? 'booked' : [8, 15].includes(i + 1) ? 'active' : 'none'
  }))

  return (
    <div className="owner-dashboard animate-fadeIn">
      {/* ── Main Content Column ─────────────────────────────────────────── */}
      <div className="owner-dashboard__main">
        
        {/* Top Metrics Row HUD */}
        <section className="adv-stats-row-v2">
          <div className="adv-stat-card-hud hud--amber">
            <div className="hud-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
            </div>
            <div className="hud-value">{formatINR(totalRevenue || 12840)}</div>
            <div className="hud-label">TOTAL EARNINGS (MTD)</div>
          </div>
          <div className="adv-stat-card-hud hud--blue">
            <div className="hud-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-1.5"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/><path d="M10 16h4"/><path d="M12 14v4"/></svg>
            </div>
            <div className="hud-value">{activeCount || 24}</div>
            <div className="hud-label">ACTIVE BOOKINGS</div>
          </div>
          <div className="adv-stat-card-hud hud--dark">
            <div className="hud-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
            </div>
            <div className="hud-value">12</div>
            <div className="hud-label">UPCOMING CAMPAIGNS</div>
          </div>
          <div className="adv-stat-card-hud hud--gold">
            <div className="hud-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="15" x="2" y="3" rx="2"/><path d="M7 21h10"/><path d="M12 18v3"/></svg>
            </div>
            <div className="hud-value">92.4%</div>
            <div className="hud-label">SCREEN UTILISATION</div>
          </div>
        </section>

        {/* Hero Title */}
        <section className="adv-hero-v2">
          <h1 className="hero-title-v2">Station Control</h1>
          <div className="adv-filters-v2" style={{ opacity: 0.8 }}>
            <span className="filter-tab-v2 active">ACTIVE SCREENS</span>
            <span className="filter-tab-v2">OFFLINE</span>
          </div>
        </section>

        <div className="owner-grid-v2">
          {/* Booking Queue */}
          <section className="camp-card-v2" style={{ gridColumn: '1 / -1' }}>
            <div className="card-v2-header">
              <div>
                <h3 className="card-v2-title">Booking Queue</h3>
                <div className="card-v2-status">PENDING APPROVAL</div>
              </div>
              <a href="/owner/bookings" className="view-report-btn">VIEW ALL REQUESTS →</a>
            </div>
            <div className="booking-list-v2">
              {campaigns.filter(c => c.status === 'pending').slice(0, 2).map((camp, i) => (
                <div key={camp.id} className="booking-item-v2">
                  <div className="bi-thumb-v2">
                    <div style={{ width: '100%', height: '100%', background: `linear-gradient(45deg, #060608, ${['#F5A623', '#00D4FF'][i % 2]})`, opacity: 0.3 }} />
                  </div>
                  <div className="bi-info-v2">
                    <div className="bi-name-v2">{camp.screen_name || 'HyperVelocity Sports'}</div>
                    <div className="bi-meta-v2">OCT 12 – OCT 28 • TIMES SQUARE SCREEN 04</div>
                  </div>
                  <div className="bi-price-v2">{formatINR(camp.price || 1450)}</div>
                  <div className="bi-actions-v2">
                    <button className="bi-btn-accept-v2">ACCEPT</button>
                    <button className="control-icon-btn">REJECT</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Earnings Trend */}
          <section className="camp-card-v2">
            <div className="card-v2-header">
              <h3 className="card-v2-title">Earnings Trend</h3>
              <div className="ana-subtitle-v2">WEEKLY</div>
            </div>
            <div className="chart-container-v2">
              {weeklyData.map((d, i) => (
                <div key={d.day} className="bar-group-v2">
                  <div className="bar-track-v2">
                    <div className="bar-fill-v2" style={{ height: `${d.val}%`, background: `linear-gradient(to top, var(--color-primary), rgba(245,166,35,0.2))` }} />
                  </div>
                  <span className="bar-day-v2">{d.day}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Payout History */}
          <section className="camp-card-v2">
            <div className="card-v2-header">
              <h3 className="card-v2-title">Payouts</h3>
            </div>
            <div className="payout-list-v2">
              {[
                { id: '#TX-982104', date: 'OCT 01', val: 4250 },
                { id: '#TX-982099', date: 'SEP 01', val: 3840 }
              ].map(tx => (
                <div key={tx.id} className="payout-item-v2">
                  <div>
                    <div className="pi-id-v2">{tx.id}</div>
                    <div className="pi-date-v2">{tx.date}, 2024</div>
                  </div>
                  <div className="pi-val-v2">{formatINR(tx.val)}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* ── Sidebar Column ────────────────────────────────────────────── */}
      <aside className="adv-sidebar-v2">
        
        {/* Availability Calendar */}
        <div className="ana-card-v2">
          <div className="ana-header-v2">
            <h4 className="ana-title-v2">Screen Availability</h4>
            <span className="ana-subtitle-v2">OCTOBER</span>
          </div>
          <div className="mini-calendar-v2">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
              <div key={d} className="cal-day-label-v2">{d}</div>
            ))}
            {calendarDates.map(d => (
              <div 
                key={d.date} 
                className={`cal-date-v2 ${d.status === 'booked' ? 'booked' : d.status === 'active' ? 'active' : ''}`}
              >
                {d.date}
              </div>
            ))}
          </div>
        </div>

        {/* Network Pulse */}
        <div className="ana-card-v2">
          <h4 className="ana-title-v2">Network Pulse</h4>
          <div className="pulse-list-v2">
            <div className="pulse-item-v2">
              <span className="pulse-label-v2">Uptime</span>
              <span className="pulse-val-v2" style={{ color: '#00E676' }}>99.9%</span>
            </div>
            <div className="pulse-item-v2">
              <span className="pulse-label-v2">Avg. CPM</span>
              <span className="pulse-val-v2">₹12.40</span>
            </div>
            <div className="pulse-item-v2">
              <span className="pulse-label-v2">Active Impressions</span>
              <span className="pulse-val-v2">420K / DAY</span>
            </div>
          </div>
        </div>

        {/* AI Insight */}
        <div className="network-card-v2">
          <div className="network-bg-overlay" style={{ opacity: 0.05 }} />
          <div className="network-content">
            <h4 className="network-title">✨ AI Insight</h4>
            <p className="network-text" style={{ fontSize: '0.7rem' }}>
              DEMAND FOR SCREEN 04 IS SPIKING FOR HOLIDAY BOOKINGS. CONSIDER ADJUSTING RATES.
            </p>
            <button className="explore-btn-v2" style={{ color: '#BE94FF' }}>OPTIMIZE PRICING</button>
          </div>
        </div>

      </aside>
    </div>
  )
}
