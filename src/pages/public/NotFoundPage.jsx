import { Link } from 'react-router-dom'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import './NotFoundPage.css'

export default function NotFoundPage() {
  return (
    <>
      <Navbar />
      <main className="not-found">
        <div className="not-found__inner">
          <span className="not-found__code" aria-hidden="true">404</span>
          <h1 className="not-found__heading">Page not found</h1>
          <p className="not-found__message">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/" className="not-found__btn">
            ← Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
