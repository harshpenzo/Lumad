import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import { useEffect, useRef } from 'react'
import AmberButton from '../ui/AmberButton'
import './DiscoveryMap.css'

// Custom Amber dot icon using L.divIcon (matches Stitch style)
function createCustomIcon(isActive) {
  return new L.divIcon({
    className: 'custom-leaflet-icon',
    html: `<div class="map-pin ${isActive ? 'map-pin--active animate-glowPulse' : ''}">
             <div class="map-pin__core"></div>
           </div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  })
}

// Map updater component to auto-fly to active pin or fit bounds
function MapUpdater({ screens, activeScreenId }) {
  const map = useMap()
  const previousActiveRef = useRef(activeScreenId)

  useEffect(() => {
    if (!screens || screens.length === 0) return

    if (activeScreenId && activeScreenId !== previousActiveRef.current) {
      // Fly to the new active screen
      const activeScreen = screens.find(s => s.id === activeScreenId)
      if (activeScreen) {
        map.flyTo([activeScreen.lat, activeScreen.lng], 14, { duration: 1.5 })
      }
    } else if (!activeScreenId && previousActiveRef.current) {
      // We just un-selected, maybe fly out to fit all?
      // Or just do nothing to keep map steady. Let's fit bounds.
      const bounds = L.latLngBounds(screens.map(s => [s.lat, s.lng]))
      if (bounds.isValid()) {
         map.flyToBounds(bounds, { padding: [50, 50], duration: 1.5 })
      }
    } else if (screens.length > 0 && !activeScreenId && !previousActiveRef.current) {
       // Initial load or filter change
       const bounds = L.latLngBounds(screens.map(s => [s.lat, s.lng]))
       if (bounds.isValid()) {
         map.fitBounds(bounds, { padding: [50, 50] })
       }
    }
    
    // Fix leaf tiles not rendering on initial hidden mount
    setTimeout(() => {
      map.invalidateSize()
    }, 250)

    previousActiveRef.current = activeScreenId
  }, [screens, activeScreenId, map])

  return null
}

export default function DiscoveryMap({ screens, activeScreenId, onMarkerClick }) {
  // Center of India roughly
  const defaultCenter = [20.5937, 78.9629]

  return (
    <div className="discovery-map-wrapper">
      <MapContainer
        center={defaultCenter}
        zoom={5}
        scrollWheelZoom={true}
        className="discovery-map"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {screens.map((screen) => {
          const isActive = screen.id === activeScreenId
          return (
            <Marker
              key={screen.id}
              position={[screen.lat, screen.lng]}
              icon={createCustomIcon(isActive)}
              eventHandlers={{
                click: () => onMarkerClick(screen.id),
              }}
            >
              <Popup className="lumad-popup" autoPan={false}>
                <div className="popup-content">
                  <h4 className="popup-title">{screen.name}</h4>
                  <p className="popup-meta">{screen.city} &bull; {screen.type}</p>
                  <p className="popup-price mono">₹{screen.pricePerSlot.toLocaleString()}/slot</p>
                  <AmberButton
                    size="sm"
                    fullWidth
                    onClick={(e) => {
                      e.stopPropagation()
                      onMarkerClick(screen.id)
                    }}
                  >
                    View Details
                  </AmberButton>
                </div>
              </Popup>
            </Marker>
          )
        })}

        <MapUpdater screens={screens} activeScreenId={activeScreenId} />
      </MapContainer>
    </div>
  )
}
