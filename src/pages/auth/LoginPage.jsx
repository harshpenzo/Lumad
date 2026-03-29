import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './AuthPages.css'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('advertiser') // 'advertiser' or 'owner'
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)
    
    try {
      // Small cheat: since it's mock auth, we let 'owner' in their role and 'advertiser' in theirs
      // The context sets role based on 'owner' string in email, so we dynamically tweak email for demo
      const loginEmail = role === 'owner' && !email.includes('owner') ? `owner_${email}` : email
      
      await login(loginEmail, password)
      navigate('/dashboard')
    } catch (err) {
      setError('Failed to login. Please check your credentials.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="auth-layout">
      <div className="auth-background"></div>
      
      <div className="auth-container">
        <div className="auth-header">
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to your Lumad account</p>
        </div>

        <div className="auth-tabs">
          <button 
            type="button"
            className={`auth-tab ${role === 'advertiser' ? 'active' : ''}`}
            onClick={() => setRole('advertiser')}
          >
            Advertiser
          </button>
          <button 
            type="button"
            className={`auth-tab ${role === 'owner' ? 'active' : ''}`}
            onClick={() => setRole('owner')}
          >
            Screen Owner
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {error && <div className="auth-error">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input 
              id="email"
              type="email" 
              className="form-input" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              id="password"
              type="password" 
              className="form-input" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required 
            />
          </div>

          <button 
            type="submit" 
            className="auth-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="auth-footer">
          Don't have an account? 
          <Link to="/register" className="auth-link">Create one</Link>
        </div>
      </div>
    </main>
  )
}
