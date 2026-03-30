import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext(null)

/**
 * AuthProvider — wraps the app and exposes auth state + helpers.
 * Uses Supabase Auth; user metadata stores `full_name` and `role`.
 */
export function AuthProvider({ children }) {
  const [user, setUser]         = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Hydrate from existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(normalise(session?.user ?? null))
      setIsLoading(false)
    })

    // Keep in sync with Supabase session changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(normalise(session?.user ?? null))
      setIsLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  /** Map Supabase user → component-friendly shape (same API as before) */
  function normalise(supabaseUser) {
    if (!supabaseUser) return null
    return {
      ...supabaseUser,
      id:    supabaseUser.id,
      email: supabaseUser.email,
      name:  supabaseUser.user_metadata?.full_name
              || supabaseUser.email?.split('@')[0]
              || 'User',
      role:  supabaseUser.user_metadata?.role || 'advertiser',
    }
  }

  async function login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    return data
  }

  async function register(name, email, password, role) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name, role },
        // emailRedirectTo is only needed if email confirmation is ON
      },
    })
    if (error) throw error
    return data
  }

  async function logout() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  async function forgotPassword(email) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    if (error) throw error
  }

  return (
    <AuthContext.Provider value={{
      user, isLoading,
      login, register, logout, forgotPassword,
      isAuthenticated: !!user,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
