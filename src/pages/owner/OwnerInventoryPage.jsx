import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../lib/supabase'
import { formatINR } from '../../utils/formatCurrency'
import './OwnerInventoryPage.css'

export default function OwnerInventoryPage() {
  const { user } = useAuth()
  const [screens, setScreens]       = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading]       = useState(true)
  const [saving, setSaving]         = useState(false)
  const [saveError, setSaveError]   = useState('')

  // Form state
  const [newName, setNewName]     = useState('')
  const [newLocation, setNewLocation] = useState('')
  const [newCity, setNewCity]     = useState('')
  const [newType, setNewType]     = useState('Billboard')
  const [newRate, setNewRate]     = useState('')

  useEffect(() => {
    document.title = 'My Inventory — LUMAD';
    return () => { document.title = 'LUMAD'; };
  }, []);

  useEffect(() => {
    if (!user) return
    fetchScreens()
  }, [user])

  async function fetchScreens() {
    setLoading(true)
    const { data, error } = await supabase
      .from('screen_listings')
      .select('*')
      .eq('owner_id', user.id)
      .order('created_at', { ascending: false })
    if (data) setScreens(data)
    else if (error) console.warn('[LUMAD] Screen listings error:', error.message)
    setLoading(false)
  }

  const handleAddScreen = async (e) => {
    e.preventDefault()
    setSaveError('')
    if (!newName.trim() || !newLocation.trim()) return
    setSaving(true)

    const { error } = await supabase.from('screen_listings').insert({
      owner_id:   user.id,
      name:       newName,
      location:   newLocation,
      city:       newCity,
      category:   newType,
      daily_rate: Number(newRate) || 10000,
      status:     'pending',
    })

    if (error) {
      setSaveError('Failed to save screen. Please try again.')
      console.warn('[LUMAD] Insert screen error:', error.message)
    } else {
      // Reset form & refresh
      setNewName(''); setNewLocation(''); setNewCity('');
      setNewType('Billboard'); setNewRate('');
      setIsModalOpen(false)
      fetchScreens()
    }
    setSaving(false)
  }

  const statusColor = { active: '#4caf50', pending: '#ffc107', inactive: '#666' }

  return (
    <div className="owner-inventory animate-fadeIn">
      <header className="inventory-header">
        <div>
          <h1 className="owner-title">Screen Inventory</h1>
          <p className="owner-subtitle">Manage your physical assets and pricing.</p>
        </div>
        <button className="btn-add-screen" onClick={() => setIsModalOpen(true)}>
          <span>+</span> List New Screen
        </button>
      </header>

      {loading ? (
        <p style={{ padding: '2rem', color: 'rgba(255,255,255,0.4)' }}>Loading your screens...</p>
      ) : screens.length === 0 ? (
        <div className="empty-state" style={{ padding: '3rem', textAlign: 'center' }}>
          <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '1.5rem' }}>
            You haven't listed any screens yet.
          </p>
          <button className="btn-add-screen" onClick={() => setIsModalOpen(true)}>
            + List Your First Screen
          </button>
        </div>
      ) : (
        <section className="inventory-grid">
          {screens.map(screen => (
            <div key={screen.id} className="inventory-card">
              <div className="card-content">
                <div>
                  <h3>{screen.name}</h3>
                  <div className="card-location">📍 {screen.location} — {screen.category}</div>
                  {screen.city && <div className="card-location" style={{ marginTop: '0.25rem' }}>🏙 {screen.city}</div>}
                </div>
                <div className="card-stats">
                  <div className="stat">
                    <span className="stat-val">{formatINR(screen.daily_rate)}</span>
                    <span className="stat-lbl">Daily Rate</span>
                  </div>
                  <div className="stat">
                    <span className="stat-val" style={{ color: statusColor[screen.status] || '#fff' }}>
                      {screen.status}
                    </span>
                    <span className="stat-lbl">Status</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Add Screen Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content animate-fadeIn" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>List a New Screen</h2>
              <button className="btn-close" onClick={() => setIsModalOpen(false)}>×</button>
            </div>

            <form className="modal-form" onSubmit={handleAddScreen}>
              <div className="form-group">
                <label>Screen Name / Identifier</label>
                <input type="text" required placeholder="e.g. Times Square North Face"
                  value={newName} onChange={e => setNewName(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Location / Address</label>
                <input type="text" required placeholder="e.g. Western Express Highway, Andheri"
                  value={newLocation} onChange={e => setNewLocation(e.target.value)} />
              </div>
              <div className="form-group">
                <label>City</label>
                <input type="text" placeholder="e.g. Mumbai"
                  value={newCity} onChange={e => setNewCity(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Screen Type</label>
                <select value={newType} onChange={e => setNewType(e.target.value)}>
                  <option>Billboard</option>
                  <option>Digital Kiosk</option>
                  <option>Transit Screen</option>
                  <option>Airport Network</option>
                  <option>Mall Atrium</option>
                  <option>Tech Park LED</option>
                </select>
              </div>
              <div className="form-group">
                <label>Daily Rate (INR)</label>
                <input type="number" required placeholder="25000"
                  value={newRate} onChange={e => setNewRate(e.target.value)} />
              </div>
              {saveError && <p style={{ color: '#ff8888', fontSize: '0.85rem' }}>{saveError}</p>}
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-add-screen" disabled={saving}>
                  {saving ? 'Saving...' : 'List Screen'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
