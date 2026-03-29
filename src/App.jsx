import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { BookingProvider } from './context/BookingContext'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HomePage from './pages/public/HomePage'
import DiscoveryPage from './pages/advertiser/DiscoveryPage'
import AboutPage from './pages/public/AboutPage'
import BookingPage from './pages/advertiser/BookingPage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import DashboardPage from './pages/advertiser/DashboardPage'

import OwnerLayout from './components/layout/OwnerLayout'
import OwnerDashboardPage from './pages/owner/OwnerDashboardPage'
import OwnerInventoryPage from './pages/owner/OwnerInventoryPage'

import FeaturesPage from './pages/public/FeaturesPage'
import PricingPage from './pages/public/PricingPage'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <BookingProvider>
          <Routes>
            {/* Phase 5 — Owner Portal (Dedicated Layout) */}
            <Route path="/owner" element={<OwnerLayout />}>
              <Route index element={<OwnerDashboardPage />} />
              <Route path="inventory" element={<OwnerInventoryPage />} />
            </Route>

            {/* All other routes (Standard Layout with Navbar/Footer) */}
            <Route path="*" element={
              <>
                <Navbar />
                <Routes>
                  {/* Phase 1 — Live */}
                  <Route path="/" element={<HomePage />} />
                  
                  {/* Phase 2 — Discovery */}
                  <Route path="/discover" element={<DiscoveryPage />} />

                  {/* Phase 7b — About Page (Live) */}
                  <Route path="/about" element={<AboutPage />} />

                  {/* Phase 3 — Booking Wizard */}
                  <Route path="/book/:screenId" element={<BookingPage />} />

                  {/* Phase 4 — Auth & Dashboard */}
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/dashboard" element={<DashboardPage />} />

                  {/* Phase 6 — Platform & Pricing */}
                  <Route path="/features" element={<FeaturesPage />} />
                  <Route path="/pricing" element={<PricingPage />} />
                </Routes>
                <Footer />
              </>
            } />
          </Routes>
        </BookingProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
