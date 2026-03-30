import { useState, useEffect } from 'react'
import { formatINR } from '../../utils/formatCurrency'
import './OwnerInventoryPage.css'

// Initial mock data for user's screens
const INITIAL_SCREENS = [
  {
    id: 'scr_a1',
    name: 'Times Square Central',
    location: 'Mumbai, MH',
    type: 'Billboard',
    status: 'online',
    occupancy: '92%',
    dailyRate: 35000,
    image: '/images/screens/highway.png',
  },
  {
    id: 'scr_b2',
    name: 'Cyberhub Main Entrance',
    location: 'Gurgaon, HR',
    type: 'Digital Kiosk',
    status: 'online',
    occupancy: '78%',
    dailyRate: 15000,
    image: '/images/screens/mall.png',
  },
  {
    id: 'scr_c3',
    name: 'Bandra Linking Road Highway',
    location: 'Mumbai, MH',
    type: 'Billboard',
    status: 'offline', // For demonstration
    occupancy: '0%',
    dailyRate: 40000,
    image: '/images/screens/highway.png',
  }
]

export default function OwnerInventoryPage() {
  const [screens, setScreens] = useState(INITIAL_SCREENS)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    document.title = 'My Inventory — LUMAD';
    return () => { document.title = 'LUMAD'; };
  }, [])
  
  // Form state
  const [newName, setNewName] = useState('')
  const [newLocation, setNewLocation] = useState('')
  const [newType, setNewType] = useState('Billboard')
  const [newRate, setNewRate] = useState('')

  const handleAddScreen = (e) => {
    e.preventDefault()
    
    const newScreen = {
      id: `scr_${Math.random().toString(36).substr(2, 6)}`,
      name: newName,
      location: newLocation,
      type: newType,
      status: 'online', // Default to online
      occupancy: '0%',
      dailyRate: Number(newRate) || 10000,
    }

    setScreens([newScreen, ...screens])
    
    // Reset and close
    setNewName('')
    setNewLocation('')
    setNewType('Billboard')
    setNewRate('')
    setIsModalOpen(false)
  }

  return (
    <div className="owner-inventory animate-fadeIn">
      <header className="inventory-header">
        <div>
          <h1 className="owner-title">Screen Inventory</h1>
          <p className="owner-subtitle">Manage your physical assets and pricing.</p>
        </div>
        <button className="btn-add-screen" onClick={() => setIsModalOpen(true)}>
          <span>+</span> Add New Screen
        </button>
      </header>

      <section className="inventory-grid">
        {screens.map(screen => (
          <div key={screen.id} className="inventory-card">
            <div className="card-image-wrap">
              <span className={`card-status ${screen.status}`}>
                {screen.status}
              </span>
              <img 
                src={screen.image || '/images/screens/highway.png'} 
                alt={screen.name} 
                className="card-image" 
              />
            </div>
            <div className="card-content">
              <div>
                <h3>{screen.name}</h3>
                <div className="card-location">📍 {screen.location} — {screen.type}</div>
              </div>
              
              <div className="card-stats">
                <div className="stat">
                  <span className="stat-val">{formatINR(screen.dailyRate)}</span>
                  <span className="stat-lbl">Daily Rate</span>
                </div>
                <div className="stat">
                  <span className="stat-val">{screen.occupancy}</span>
                  <span className="stat-lbl">Occupancy</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Add Screen Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content animate-fadeIn" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New Screen</h2>
              <button className="btn-close" onClick={() => setIsModalOpen(false)}>×</button>
            </div>
            
            <form className="modal-form" onSubmit={handleAddScreen}>
              <div className="form-group">
                <label>Screen Name / Identifier</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Times Square North Face" 
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>City / Location</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. New York, NY"
                  value={newLocation}
                  onChange={e => setNewLocation(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Screen Type</label>
                <select value={newType} onChange={e => setNewType(e.target.value)}>
                  <option>Billboard</option>
                  <option>Digital Kiosk</option>
                  <option>Transit Screen</option>
                  <option>Airport Network</option>
                </select>
              </div>

              <div className="form-group">
                <label>Daily Rate (INR)</label>
                <input 
                  type="number" 
                  required 
                  placeholder="25000"
                  value={newRate}
                  onChange={e => setNewRate(e.target.value)}
                />
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-add-screen">
                  Save Screen
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
