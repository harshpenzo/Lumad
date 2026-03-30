import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../lib/supabase'
import { formatINR } from '../../utils/formatCurrency'
import './DashboardPage.css'

export default function DashboardPage() {
  const { user, isLoading } = useAuth()
  const navigate = useNavigate()
  const [campaigns, setCampaigns]     = useState([])
  const [dbLoading, setDbLoading]     = useState(true)
  const [activeFilter, setActiveFilter] = useState('All')

  useEffect(() => {
    document.title = 'Command Center — LUMAD Advertiser'
    return () => { document.title = 'LUMAD' }
  }, [])

  useEffect(() => {
    if (!isLoading && !user) navigate('/login')
  }, [user, isLoading, navigate])

  useEffect(() => {
    if (!user) return
    setDbLoading(true)
    supabase
      .from('campaigns')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data) setCampaigns(data)
        setDbLoading(false)
      })
  }, [user])

  const totalSpend      = campaigns.reduce((sum, c) => sum + (c.price || 0), 0)
  const activeCount     = campaigns.filter(c => c.status === 'active').length
  const impressions     = (totalSpend * 50)

  const filteredCampaigns = campaigns.filter(c => {
    if (activeFilter === 'All') return true
    return c.status.toLowerCase() === activeFilter.toLowerCase()
  })

  // Mock data for graphs
  const heatmapBars = Array.from({ length: 15 }, (_, i) => ({
    height: Math.random() * 80 + 20,
    opacity: 0.1 * (i + 1)
  }))

  return (
    <div className="advertiser-dashboard animate-fadeIn">
      {/* ── Main Column ───────────────────────────────────────────────── */}
      <div className="adv-main">
        
        {/* Top Stats HUD */}
        <section className="adv-stats-row-v2">
          <div className="adv-stat-card-hud hud--amber">
            <div className="hud-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6.33 11a22.33 22.33 0 0 1-3.67 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>
            </div>
            <div className="hud-value">{activeCount || 3}</div>
            <div className="hud-label">ACTIVE CAMPAIGNS</div>
          </div>
          <div className="adv-stat-card-hud hud--blue">
            <div className="hud-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
            </div>
            <div className="hud-value">12.4L</div>
            <div className="hud-label">IMPRESSIONS THIS MONTH</div>
          </div>
          <div className="adv-stat-card-hud hud--dark">
            <div className="hud-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="15" x="2" y="3" rx="2"/><path d="M7 21h10"/><path d="M12 18v3"/></svg>
            </div>
            <div className="hud-value">7</div>
            <div className="hud-label">SCREENS RUNNING</div>
          </div>
          <div className="adv-stat-card-hud hud--gold">
            <div className="hud-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/><path d="M16 21V15"/><path d="M8 21V15"/></svg>
            </div>
            <div className="hud-value">₹1,24,000</div>
            <div className="hud-label">TOTAL SPENT</div>
          </div>
        </section>

        {/* Hero Title */}
        <section className="adv-hero-v2">
          <h1 className="hero-title-v2">Your Campaigns</h1>
          
          <div className="adv-filters-v2">
            {['All', 'Active', 'Scheduled', 'Completed'].map(f => (
              <button 
                key={f}
                className={`filter-tab-v2 ${activeFilter === f ? 'active' : ''}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </section>

        {/* Campaign List */}
        <div className="adv-campaign-grid-v2">
          {filteredCampaigns.map((camp, i) => (
            <div key={camp.id} className="camp-card-v2">
              <div className="card-v2-header">
                <div>
                  <h3 className="card-v2-title">{camp.screen_name || (i === 0 ? 'Neon Summer Rush' : 'Monsoon Exclusive')}</h3>
                  <div className="card-v2-status">
                    <span className={`status-dot ${i === 0 ? 'dot--green' : 'dot--amber'}`} />
                    {i === 0 ? 'LIVE NOW' : 'SCHEDULED'}
                  </div>
                </div>
                <div className="card-v2-actions-top">
                  <button className="card-v2-icon-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/></svg></button>
                  <button className="card-v2-icon-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg></button>
                </div>
              </div>

              <div className="card-v2-meta">
                <div className="meta-v2-row">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span>{camp.screen_location || 'Cyber Hub Digital Wall • Gurgaon'}</span>
                </div>
                <div className="meta-v2-row">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  <span>{camp.start_date || 'Jun 01'} – {camp.end_date || 'Jun 30, 2024'}</span>
                </div>
              </div>

              <div className="card-v2-progress">
                <div className="progress-v2-text">
                  <span>PROGRESS: DAY 14 OF 30</span>
                  <span>46%</span>
                </div>
                <div className="progress-v2-bar">
                  <div className="progress-v2-fill" style={{ width: '46%' }} />
                </div>
              </div>

              <div className="card-v2-stats">
                <div className="stat-v2-item">
                  <span className="stat-v2-label">TODAY'S HITS</span>
                  <span className="stat-v2-val">4,280</span>
                </div>
                <div className="stat-v2-item">
                  <span className="stat-v2-label">TOTAL REACH</span>
                  <span className="stat-v2-val">82.1K</span>
                </div>
              </div>

              <div className="card-v2-footer">
                <button className="view-report-btn">VIEW REPORT</button>
                <div className="card-v2-controls">
                  <button className="control-icon-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg></button>
                  <button className="control-icon-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Sidebar Column ────────────────────────────────────────────── */}
      <aside className="adv-sidebar-v2">
        
        {/* Performance Pulse */}
        <div className="ana-card-v2">
          <div className="ana-header-v2">
            <div>
              <h4 className="ana-title-v2">Performance Pulse</h4>
              <div className="ana-subtitle-v2">DAILY IMPRESSIONS <span className="ana-trend">+12.4%</span></div>
            </div>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F5A623" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
          </div>
          
          <div className="ana-chart-v2">
            <svg viewBox="0 0 200 60" className="pulse-chart">
              <defs>
                <linearGradient id="chartLineGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F5A623" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#F5A623" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,45 Q20,10 40,30 T80,10 T120,40 T160,5 T200,35" fill="none" stroke="#F5A623" strokeWidth="2.5" />
              <path d="M0,45 Q20,10 40,30 T80,10 T120,40 T160,5 T200,35 V60 H0 Z" fill="url(#chartLineGradient)" />
              {/* Grid Lines */}
              <line x1="0" y1="15" x2="200" y2="15" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
              <line x1="0" y1="35" x2="200" y2="35" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
              <line x1="0" y1="55" x2="200" y2="55" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
            </svg>
          </div>

          <div className="ana-section-v2">
            <div className="ana-label-v2">PEAK PERFORMANCE TIMES (MON - SUN)</div>
            <div className="heatmap-v2">
              {[60, 40, 70, 50, 90, 80, 100, 90, 70, 50, 40, 30].map((h, i) => (
                <div key={i} className="heat-bar-v2" style={{ height: `${h}%`, background: `linear-gradient(to top, rgba(245,166,35,0.1) 0%, rgba(245,166,35,${h/100}) 100%)` }} />
              ))}
            </div>
          </div>
        </div>

        {/* Audience Demographics */}
        <div className="ana-card-v2">
          <div className="ana-label-v2">AUDIENCE DEMOGRAPHICS</div>
          <div className="demographics-v2">
            <div className="donut-v2">
              <svg viewBox="0 0 40 40">
                <circle cx="20" cy="20" r="18" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
                <circle cx="20" cy="20" r="18" fill="none" stroke="#F5A623" strokeWidth="3.5" strokeDasharray="65, 100" strokeLinecap="round" />
                <circle cx="20" cy="20" r="18" fill="none" stroke="#00D4FF" strokeWidth="3.5" strokeDasharray="25, 100" strokeDashoffset="-65" strokeLinecap="round" />
              </svg>
              <div className="donut-val-v2">82%</div>
            </div>
            <div className="demographics-list-v2">
              <div className="demo-item-v2">
                <span className="demo-dot" style={{ backgroundColor: '#F5A623' }} />
                <span className="demo-name">Gen Z & Millennial</span>
                <span className="demo-percent">65%</span>
              </div>
              <div className="demo-item-v2">
                <span className="demo-dot" style={{ backgroundColor: '#00D4FF' }} />
                <span className="demo-name">Business Prof.</span>
                <span className="demo-percent">25%</span>
              </div>
              <div className="demo-item-v2">
                <span className="demo-dot" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />
                <span className="demo-name">Other</span>
                <span className="demo-percent">10%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Network Expansion */}
        <div className="network-card-v2">
          <div className="network-bg-overlay" />
          <div className="network-content">
            <h4 className="network-title">Network Expansion</h4>
            <p className="network-text">New prime locations available in South Bombay and Indiranagar. Book now for monsoon discounts.</p>
            <button className="explore-btn-v2">
              EXPLORE NEW SCREENS 
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
          </div>
        </div>

        {/* Bottom Contact Tab */}
        <div className="contact-tab-v2">
          <div className="contact-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </div>
        </div>

      </aside>
    </div>
  )
}
