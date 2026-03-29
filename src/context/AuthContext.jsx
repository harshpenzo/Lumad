import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('lumad_user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email, password) => {
    // Simulated API call delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // For demo purposes, any login is considered successful
    // We create a mock user object based on the email
    const role = email.includes('owner') ? 'owner' : 'advertiser'
    
    const loggedInUser = {
      id: `u_${Math.random().toString(36).substr(2, 9)}`,
      email,
      name: email.split('@')[0],
      role,
      token: 'mock_jwt_token_123'
    }

    localStorage.setItem('lumad_user', JSON.stringify(loggedInUser))
    setUser(loggedInUser)
    return loggedInUser
  }

  const register = async (name, email, password, role) => {
    // Simulated API call delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const newUser = {
      id: `u_${Math.random().toString(36).substr(2, 9)}`,
      name,
      email,
      role, // 'advertiser' or 'owner'
      token: 'mock_jwt_token_456'
    }

    localStorage.setItem('lumad_user', JSON.stringify(newUser))
    setUser(newUser)
    return newUser
  }

  const logout = () => {
    localStorage.removeItem('lumad_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
