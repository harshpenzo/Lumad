import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { BookingProvider } from './context/BookingContext'
import { AuthProvider } from './context/AuthContext'
import { useAuth } from './context/AuthContext'

/* ── Layout Components ──────────────────────────────────────────────────── */
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import OwnerLayout from './components/layout/OwnerLayout'
import AdvertiserLayout from './components/layout/AdvertiserLayout'

/* ── Public Pages ───────────────────────────────────────────────────────── */
import HomePage from './pages/public/HomePage'
import AboutPage from './pages/public/AboutPage'
import FeaturesPage from './pages/public/FeaturesPage'
import PricingPage from './pages/public/PricingPage'
import NotFoundPage from './pages/public/NotFoundPage'
import TermsPage from './pages/public/TermsPage'
import PrivacyPage from './pages/public/PrivacyPage'
import CookiePage from './pages/public/CookiePage'

/* ── Auth Pages ─────────────────────────────────────────────────────────── */
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'

/* ── Owner Portal Pages ─────────────────────────────────────────────────── */
import OwnerDashboardPage from './pages/owner/OwnerDashboardPage'
import OwnerInventoryPage from './pages/owner/OwnerInventoryPage'
import OwnerBookingQueuePage from './pages/owner/OwnerBookingQueuePage'
import OwnerEarningsPage from './pages/owner/OwnerEarningsPage'

/* ── Advertiser Portal Pages ────────────────────────────────────────────── */
import DashboardPage from './pages/advertiser/DashboardPage'
import DiscoveryPage from './pages/advertiser/DiscoveryPage'
import CampaignsPage from './pages/advertiser/CampaignsPage'
import BookingPage from './pages/advertiser/BookingPage'

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
 * StandardLayout — wraps public / unauthenticated pages with Navbar + Footer.
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
            {/* ═══════════════════════════════════════════════════════════
                OWNER PORTAL — Sidebar layout, role-gated
               ═══════════════════════════════════════════════════════════ */}
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
              <Route path="bookings" element={<OwnerBookingQueuePage />} />
              <Route path="earnings" element={<OwnerEarningsPage />} />
            </Route>

            {/* ═══════════════════════════════════════════════════════════
                ADVERTISER PORTAL — Sidebar layout, role-gated
               ═══════════════════════════════════════════════════════════ */}
            <Route
              path="/advertiser"
              element={
                <ProtectedRoute>
                  <AdvertiserLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<DashboardPage />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="discover" element={<DiscoveryPage />} />
              <Route path="campaigns" element={<CampaignsPage />} />
              <Route path="book" element={<DiscoveryPage />} />
              <Route path="book/:screenId" element={<BookingPage />} />
            </Route>

            {/* ═══════════════════════════════════════════════════════════
                PUBLIC PAGES — Standard Navbar + Footer
               ═══════════════════════════════════════════════════════════ */}
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

            {/* ── Legacy Redirects (old flat routes → new portal routes) ── */}
            <Route path="/discover" element={<Navigate to="/advertiser/discover" replace />} />
            <Route path="/dashboard" element={<Navigate to="/advertiser/dashboard" replace />} />
            <Route path="/book/:screenId" element={<Navigate to="/advertiser/book/:screenId" replace />} />

            {/* ── 404 Catch-All ── */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BookingProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
