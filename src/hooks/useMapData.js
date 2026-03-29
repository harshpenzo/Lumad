import { useState, useMemo } from 'react'
import { mockScreens } from '../utils/mockScreenData'

/**
 * useMapData
 * Provides screen data and filtering logic for the Discovery page.
 * Returns filtered screens + helper functions.
 */
export function useMapData() {
  const [filters, setFilters] = useState({
    city: '',
    minPrice: 0,
    maxPrice: 500000,
    type: '',       // 'highway' | 'mall' | 'airport' | 'metro' | 'tech_park'
    availability: true,
  })
  const [selectedScreenId, setSelectedScreenId] = useState(null)

  const filteredScreens = useMemo(() => {
    return mockScreens.filter((s) => {
      if (filters.city && s.city !== filters.city) return false
      if (filters.type && s.type !== filters.type) return false
      if (s.pricePerDay < filters.minPrice) return false
      if (s.pricePerDay > filters.maxPrice) return false
      if (filters.availability && !s.available) return false
      return true
    })
  }, [filters])

  const selectedScreen = useMemo(
    () => mockScreens.find((s) => s.id === selectedScreenId) ?? null,
    [selectedScreenId]
  )

  function updateFilter(key, value) {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  function resetFilters() {
    setFilters({
      city: '',
      minPrice: 0,
      maxPrice: 500000,
      type: '',
      availability: true,
    })
  }

  return {
    screens: filteredScreens,
    allScreens: mockScreens,
    filters,
    updateFilter,
    resetFilters,
    selectedScreen,
    selectedScreenId,
    setSelectedScreenId,
  }
}
