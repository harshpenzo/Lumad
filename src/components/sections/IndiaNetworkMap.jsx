import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import './IndiaNetworkMap.css'

/**
 * IndiaNetworkMap
 * A static, decorative Leaflet map showing India with 5 glowing
 * amber city dots — styled to match the LUMAD platform dark theme.
 * Used in the About page "Scaling the Network" section.
 */

const NETWORK_CITIES = [
  { name: 'New Delhi', lat: 28.6139, lng: 77.2090 },
  { name: 'Mumbai',    lat: 19.0760, lng: 72.8777 },
  { name: 'Hyderabad', lat: 17.3850, lng: 78.4867 },
  { name: 'Bengaluru', lat: 12.9716, lng: 77.5946 },
  { name: 'Chennai',   lat: 13.0827, lng: 80.2707 },
]

export default function IndiaNetworkMap() {
  return (
    <div className="india-map-wrapper">
      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={4.4}
        scrollWheelZoom={false}
        zoomControl={false}
        dragging={false}
        doubleClickZoom={false}
        touchZoom={false}
        keyboard={false}
        className="india-map"
        attributionControl={false}
      >
        {/* Same dark CARTO tile as DiscoveryPage */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {NETWORK_CITIES.map((city) => (
          <CircleMarker
            key={city.name}
            center={[city.lat, city.lng]}
            radius={10}
            pathOptions={{
              color: '#f5a623',
              fillColor: '#f5a623',
              fillOpacity: 0.9,
              weight: 0,
            }}
          >
            {/* Outer glow ring */}
            <CircleMarker
              center={[city.lat, city.lng]}
              radius={20}
              pathOptions={{
                color: '#f5a623',
                fillColor: '#f5a623',
                fillOpacity: 0.15,
                weight: 1,
              }}
            />
            <Tooltip
              permanent
              direction="right"
              offset={[14, 0]}
              className="india-map__tooltip"
            >
              {city.name}
            </Tooltip>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  )
}
