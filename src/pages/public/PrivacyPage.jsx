import { useEffect } from 'react'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import './LegalPage.css'

export default function PrivacyPage() {
  useEffect(() => {
    document.title = 'Privacy Policy — LUMAD';
    return () => { document.title = 'LUMAD'; };
  }, []);

  return (
    <>
      <Navbar />
      <main className="legal-page">
        <div className="legal-page__inner container">
          <p className="legal-page__label mono">LEGAL · LUMAD KINETIC</p>
          <h1 className="legal-page__title">Privacy Policy</h1>
          <div className="legal-page__content">
            <p className="legal-page__placeholder">
              This page is being drafted. Please check back soon or contact us at{' '}
              <a href="mailto:hello@lumad.in">hello@lumad.in</a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
