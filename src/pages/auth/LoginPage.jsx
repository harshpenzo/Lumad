import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './AuthPages.css'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('advertiser')
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [forgotSent, setForgotSent] = useState(false)
  const [showForgot, setShowForgot] = useState(false)
  
  const { login, forgotPassword } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Log In — LUMAD';
    return () => { document.title = 'LUMAD'; };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const errs = {}
    if (!email.trim()) errs.email = 'Email is required.'
    if (!password.trim()) errs.password = 'Password is required.'
    if (Object.keys(errs).length > 0) { setFieldErrors(errs); return; }
    setFieldErrors({})
    setIsSubmitting(true)
    
    try {
      const loginEmail = role === 'owner' && !email.includes('owner') ? `owner_${email}` : email
      await login(loginEmail, password)
      navigate(role === 'owner' ? '/owner' : '/dashboard')
    } catch (err) {
      setError(err.message || 'Failed to login. Please check your credentials.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleForgotPassword = async () => {
    if (!email.trim()) { setFieldErrors({ email: 'Enter your email first.' }); return; }
    try {
      await forgotPassword(email)
      setForgotSent(true)
    } catch (err) {
      setError(err.message || 'Could not send reset email.')
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
              className={`form-input ${fieldErrors.email ? 'form-input--error' : ''}`}
              value={email}
              onChange={(e) => { setEmail(e.target.value); setFieldErrors(f => ({...f, email: ''})) }}
              placeholder="name@company.com"
            />
            {fieldErrors.email && <span className="form-field-error">{fieldErrors.email}</span>}
          </div>

          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label htmlFor="password">Password</label>
              <button
                type="button"
                className="auth-link"
                style={{ fontSize: '0.8rem', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                onClick={handleForgotPassword}
              >
                Forgot password?
              </button>
            </div>
            <input 
              id="password"
              type="password" 
              className={`form-input ${fieldErrors.password ? 'form-input--error' : ''}`}
              value={password}
              onChange={(e) => { setPassword(e.target.value); setFieldErrors(f => ({...f, password: ''})) }}
              placeholder="••••••••"
            />
            {fieldErrors.password && <span className="form-field-error">{fieldErrors.password}</span>}
          </div>

          {forgotSent && (
            <div className="auth-error" style={{ background: 'rgba(80,200,80,0.1)', borderColor: 'rgba(80,200,80,0.3)', color: '#88cc88' }}>
              ✓ Reset link sent to {email}. Check your inbox.
            </div>
          )}

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
