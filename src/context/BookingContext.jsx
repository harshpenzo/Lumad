import { createContext, useContext, useReducer, useEffect } from 'react'

const BookingContext = createContext()

const initialState = {
  selectedScreen: null,
  creative: null,
  schedule: {
    startDate: null,
    endDate: null,
    durationDays: 0
  },
  slots: [],
  totalPrice: 0,
  currentStep: 1
}

function bookingReducer(state, action) {
  switch (action.type) {
    case 'SET_SCREEN':
      return { ...state, selectedScreen: action.payload, totalPrice: action.payload.pricePerDay }
    case 'SET_CREATIVE':
      return { ...state, creative: action.payload }
    case 'SET_SCHEDULE':
      return { ...state, schedule: action.payload }
    case 'SET_SLOTS':
      return { ...state, slots: action.payload }
    case 'SET_STEP':
      return { ...state, currentStep: action.payload }
    case 'RESET_BOOKING':
      return initialState
    default:
      return state
  }
}

export function BookingProvider({ children }) {
  const [state, dispatch] = useReducer(bookingReducer, initialState)

  return (
    <BookingContext.Provider value={{ state, dispatch }}>
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  const context = useContext(BookingContext)
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider')
  }
  return context
}
