import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMapData } from '../../hooks/useMapData'
import DiscoveryMap from '../../components/sections/DiscoveryMap'
import ScreenCard from '../../components/ui/ScreenCard'
import { cities, screenTypes } from '../../utils/mockScreenData'
import './DiscoveryPage.css'

export default function DiscoveryPage() {
  const {
    screens,
    filters,
    updateFilter,
    resetFilters,
    selectedScreenId,
    setSelectedScreenId
  } = useMapData()
  const navigate = useNavigate()

  // Make sure to scroll to top on load since we are in router
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    document.title = 'Discover Screens — LUMAD';
    return () => { document.title = 'LUMAD'; };
  }, []);

  return (
    <main className="discovery-layout">
      {/* Sidebar - Controls & List */}
      <aside className="discovery-sidebar">
        
        {/* Header Area */}
        <div className="discovery-sidebar__header">
          <h1 className="discovery-sidebar__title">
            Screen Discovery
          </h1>
          <p className="discovery-sidebar__subtitle">
            <span className="mono">{screens.length} Screens</span> found
          </p>
        </div>

        {/* Filters Area */}
        <div className="discovery-filters">
          <div className="filter-group">
            <label className="mono">City</label>
            <select 
              value={filters.city} 
              onChange={(e) => updateFilter('city', e.target.value)}
              className="filter-select"
            >
              <option value="">All Cities</option>
              {cities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="filter-group">
            <label className="mono">Location Type</label>
            <select 
              value={filters.type} 
              onChange={(e) => updateFilter('type', e.target.value)}
              className="filter-select"
            >
              <option value="">All Types</option>
              {screenTypes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>
          
          <button className="filter-reset mono" onClick={resetFilters}>
            Reset Filters
          </button>
        </div>

        {/* Screen List */}
        <div className="discovery-list" role="list">
          {screens.length === 0 ? (
            <div className="discovery-empty">
              No screens found matching these filters.
            </div>
          ) : (
            screens.map(screen => (
              <div 
                key={screen.id} 
                className={`discovery-list-item ${selectedScreenId === screen.id ? 'is-active' : ''}`}
                onMouseEnter={() => setSelectedScreenId(screen.id)}
                role="listitem"
              >
                <ScreenCard 
                  screen={screen} 
                  variant="list"
                  selected={selectedScreenId === screen.id}
                  onSelect={(s) => setSelectedScreenId(s.id)}
                  onBook={(s) => navigate(`/advertiser/book/${s.id}`)}
                />
              </div>
            ))
          )}
        </div>
      </aside>

      {/* Main Map Area */}
      <div className="discovery-map-container">
        <DiscoveryMap 
          screens={screens}
          activeScreenId={selectedScreenId}
          onMarkerClick={(id) => setSelectedScreenId(id)}
        />
      </div>
    </main>
  )
}
