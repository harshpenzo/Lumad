import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './AuthPages.css'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [role, setRole] = useState('advertiser')
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const { register } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Create Account — LUMAD';
    return () => { document.title = 'LUMAD'; };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    // Inline validation
    const errs = {}
    if (!name.trim()) errs.name = 'Full name is required.'
    if (!email.trim()) errs.email = 'Email is required.'
    if (!password.trim()) errs.password = 'Password is required.'
    if (!passwordConfirm.trim()) errs.passwordConfirm = 'Please confirm your password.'
    else if (password !== passwordConfirm) errs.passwordConfirm = 'Passwords do not match.'
    if (Object.keys(errs).length > 0) { setFieldErrors(errs); return; }
    setFieldErrors({})
    setIsSubmitting(true)
    
    try {
      await register(name, email, password, role)
      if (role === 'advertiser') {
        navigate('/dashboard')
      } else {
        navigate('/owner')
      }
    } catch (err) {
      setError('Failed to create an account. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="auth-layout">
      <div className="auth-background"></div>
      
      <div className="auth-container">
        <div className="auth-header">
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Join the premier DOOH advertising platform</p>
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
            <label htmlFor="name">Full Name or Company</label>
            <input 
              id="name"
              type="text" 
              className={`form-input ${fieldErrors.name ? 'form-input--error' : ''}`}
              value={name}
              onChange={(e) => { setName(e.target.value); setFieldErrors(f=>({...f,name:''})) }}
              placeholder="Acme Corp"
            />
            {fieldErrors.name && <span className="form-field-error">{fieldErrors.name}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input 
              id="email"
              type="email" 
              className={`form-input ${fieldErrors.email ? 'form-input--error' : ''}`}
              value={email}
              onChange={(e) => { setEmail(e.target.value); setFieldErrors(f=>({...f,email:''})) }}
              placeholder="name@company.com"
            />
            {fieldErrors.email && <span className="form-field-error">{fieldErrors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              id="password"
              type="password" 
              className={`form-input ${fieldErrors.password ? 'form-input--error' : ''}`}
              value={password}
              onChange={(e) => { setPassword(e.target.value); setFieldErrors(f=>({...f,password:''})) }}
              placeholder="••••••••"
            />
            {fieldErrors.password && <span className="form-field-error">{fieldErrors.password}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input 
              id="passwordConfirm"
              type="password" 
              className={`form-input ${fieldErrors.passwordConfirm ? 'form-input--error' : ''}`}
              value={passwordConfirm}
              onChange={(e) => { setPasswordConfirm(e.target.value); setFieldErrors(f=>({...f,passwordConfirm:''})) }}
              placeholder="••••••••"
            />
            {fieldErrors.passwordConfirm && <span className="form-field-error">{fieldErrors.passwordConfirm}</span>}
          </div>

          <button 
            type="submit" 
            className="auth-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="auth-footer">
          Already have an account? 
          <Link to="/login" className="auth-link">Sign in</Link>
        </div>
      </div>
    </main>
  )
}
