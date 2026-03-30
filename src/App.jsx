import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { BookingProvider } from './context/BookingContext'
import { AuthProvider } from './context/AuthContext'
import { useAuth } from './context/AuthContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HomePage from './pages/public/HomePage'
import DiscoveryPage from './pages/advertiser/DiscoveryPage'
import AboutPage from './pages/public/AboutPage'
import BookingPage from './pages/advertiser/BookingPage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import DashboardPage from './pages/advertiser/DashboardPage'
import NotFoundPage from './pages/public/NotFoundPage'
import TermsPage from './pages/public/TermsPage'
import PrivacyPage from './pages/public/PrivacyPage'
import CookiePage from './pages/public/CookiePage'

import OwnerLayout from './components/layout/OwnerLayout'
import OwnerDashboardPage from './pages/owner/OwnerDashboardPage'
import OwnerInventoryPage from './pages/owner/OwnerInventoryPage'

import FeaturesPage from './pages/public/FeaturesPage'
import PricingPage from './pages/public/PricingPage'

/**
 * ScrollToTop — resets window scroll to top on every route change.
 */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

/**
 * ProtectedRoute — redirects unauthenticated users to /login.
 */
function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuth()
  if (isLoading) return null
  if (!user) {
    return <Navigate to="/login" replace />
  }
  return children
}

/**
 * StandardLayout — wraps public / advertiser pages with Navbar + Footer.
 */
function StandardLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <BookingProvider>
          <ScrollToTop />
          <Routes>
            {/* ── Owner Portal (Dedicated Sidebar Layout) ── */}
            <Route
              path="/owner"
              element={
                <ProtectedRoute>
                  <OwnerLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<OwnerDashboardPage />} />
              <Route path="dashboard" element={<OwnerDashboardPage />} />
              <Route path="inventory" element={<OwnerInventoryPage />} />
            </Route>

            {/* ── Public Pages ── */}
            <Route path="/" element={<StandardLayout><HomePage /></StandardLayout>} />
            <Route path="/about" element={<StandardLayout><AboutPage /></StandardLayout>} />
            <Route path="/features" element={<StandardLayout><FeaturesPage /></StandardLayout>} />
            <Route path="/pricing" element={<StandardLayout><PricingPage /></StandardLayout>} />

            {/* ── Legal Pages ── */}
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/cookies" element={<CookiePage />} />

            {/* ── Auth Pages ── */}
            <Route path="/login" element={<StandardLayout><LoginPage /></StandardLayout>} />
            <Route path="/register" element={<StandardLayout><RegisterPage /></StandardLayout>} />

            {/* ── Advertiser Pages ── */}
            <Route
              path="/discover"
              element={<StandardLayout><DiscoveryPage /></StandardLayout>}
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <StandardLayout><DashboardPage /></StandardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/book/:screenId"
              element={
                <ProtectedRoute>
                  <StandardLayout><BookingPage /></StandardLayout>
                </ProtectedRoute>
              }
            />

            {/* ── 404 Catch-All ── */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BookingProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
