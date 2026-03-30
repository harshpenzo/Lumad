/**
 * useScreens.js
 * Fetches screen inventory from Supabase and exposes filtered results.
 * Falls back to mockScreenData if Supabase is unavailable.
 */
import { useState, useEffect, useMemo } from 'react'
import { supabase } from '../lib/supabase'
import { mockScreens } from '../utils/mockScreenData'

/** Convert Supabase snake_case row → camelCase shape used by all components */
function rowToScreen(row) {
  return {
    id:             row.id,
    name:           row.name,
    location:       row.location,
    city:           row.city,
    type:           row.category,          // category in DB → type in UI
    lat:            parseFloat(row.lat),
    lng:            parseFloat(row.lng),
    width:          row.width_ft,
    height:         row.height_ft,
    unit:           'ft',
    pricePerDay:    row.price_per_day,
    pricePerSlot:   row.price_per_slot || Math.round(row.price_per_day / 24),
    footfallPerDay: row.footfall_per_day,
    dwellTime:      parseFloat(row.dwell_time_min),
    available:      row.available,
    matchScore:     row.match_score,
    audiences:      row.audiences  || [],
    peakHours:      row.peak_hours || [],
    image:          row.image_url  || '/images/screens/highway.png',
  }
}

/**
 * useScreens(filters?)
 * @param {object} filters  Optional: { city, type, minPrice, maxPrice, availability }
 * @returns { screens, allScreens, loading, error }
 */
export function useScreens(filters = {}) {
  const [allScreens, setAllScreens] = useState([])
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)

    supabase
      .from('screens')
      .select('*')
      .order('match_score', { ascending: false })
      .then(({ data, error: err }) => {
        if (cancelled) return
        if (err || !data || data.length === 0) {
          console.warn('[LUMAD] Supabase screens unavailable, using mock data:', err?.message)
          setAllScreens(mockScreens)
        } else {
          setAllScreens(data.map(rowToScreen))
        }
        setError(err || null)
        setLoading(false)
      })

    return () => { cancelled = true }
  }, [])

  const screens = useMemo(() => {
    let result = allScreens
    if (filters.city)             result = result.filter(s => s.city === filters.city)
    if (filters.type)             result = result.filter(s => s.type === filters.type)
    if (filters.availability !== false) result = result.filter(s => s.available)
    if (filters.minPrice != null) result = result.filter(s => s.pricePerDay >= filters.minPrice)
    if (filters.maxPrice != null) result = result.filter(s => s.pricePerDay <= filters.maxPrice)
    return result
  }, [allScreens, filters])

  return { screens, allScreens, loading, error }
}
