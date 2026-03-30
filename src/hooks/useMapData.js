import { useState, useMemo } from 'react'
import { useScreens } from './useScreens'

/**
 * useMapData
 * Wraps useScreens with filter state for the Discovery page.
 * Swap from mockScreenData to live Supabase data via useScreens.
 */
export function useMapData() {
  const [filters, setFilters] = useState({
    city:         '',
    minPrice:     0,
    maxPrice:     500000,
    type:         '',
    availability: true,
  })
  const [selectedScreenId, setSelectedScreenId] = useState(null)

  // Pass filters into useScreens so it can apply client-side filtering
  const { screens, allScreens, loading, error } = useScreens({
    city:         filters.city     || undefined,
    type:         filters.type     || undefined,
    minPrice:     filters.minPrice,
    maxPrice:     filters.maxPrice,
    availability: filters.availability,
  })

  const selectedScreen = useMemo(
    () => allScreens.find((s) => s.id === selectedScreenId) ?? null,
    [selectedScreenId, allScreens]
  )

  function updateFilter(key, value) {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  function resetFilters() {
    setFilters({ city: '', minPrice: 0, maxPrice: 500000, type: '', availability: true })
  }

  return {
    screens,
    allScreens,
    filters,
    updateFilter,
    resetFilters,
    selectedScreen,
    selectedScreenId,
    setSelectedScreenId,
    loading,
    error,
  }
}
