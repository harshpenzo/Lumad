import { useState } from 'react'
import { useBooking } from '../../../context/BookingContext'
import GlassCard from '../../../components/ui/GlassCard'
import AmberButton from '../../../components/ui/AmberButton'
import './steps.css'

export default function Step1Creative() {
  const { state, dispatch } = useBooking()
  const [dragActive, setDragActive] = useState(false)
  const [preview, setPreview] = useState(state.creative?.url || null)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      const url = URL.createObjectURL(file)
      setPreview(url)
      dispatch({ type: 'SET_CREATIVE', payload: { name: file.name, url, type: file.type } })
    }
  }

  const handleNext = () => {
    if (state.creative) {
      dispatch({ type: 'SET_STEP', payload: 2 })
    }
  }

  return (
    <div className="booking-step step-creative animate-fadeIn">
      <div className="step-header">
        <h2 className="step-title">Upload Content</h2>
        <p className="step-desc">
          Upload your high-resolution static or video ad. 
          Recommended: 1920x1080 (16:9), Max 50MB.
        </p>
      </div>

      <div className="step-content">
        <div 
          className={`upload-zone ${dragActive ? 'is-dragging' : ''} ${preview ? 'has-preview' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {preview ? (
            <div className="upload-preview">
              <img src={preview} alt="Ad Preview" className="preview-img" />
              <div className="preview-overlay">
                <p className="mono">{state.creative.name}</p>
                <button 
                  className="preview-remove" 
                  onClick={() => { setPreview(null); dispatch({ type: 'SET_CREATIVE', payload: null }); }}
                >
                  Change File
                </button>
              </div>
              {/* Virtual Billboard Mockup */}
              <div className="virtual-billboard">
                <div className="billboard-frame">
                  <img src={preview} alt="Scale Preview" />
                </div>
                <span className="mono label">LIVE PREVIEW ON SCREEN</span>
              </div>
            </div>
          ) : (
            <div className="upload-prompt">
              <span className="upload-icon">📤</span>
              <p>Drag and drop your file here</p>
              <span className="mono or">OR</span>
              <label className="upload-btn">
                Browse Files
                <input 
                  type="file" 
                  hidden 
                  onChange={(e) => {
                    const file = e.target.files[0]
                    const url = URL.createObjectURL(file)
                    setPreview(url)
                    dispatch({ type: 'SET_CREATIVE', payload: { name: file.name, url, type: file.type } })
                  }} 
                />
              </label>
            </div>
          )}
        </div>

        <GlassCard padding="md" variant="heavy" className="creative-specs">
          <h4 className="mono">SUPPORTED FORMATS</h4>
          <div className="specs-grid">
            <div className="spec"><span>Images</span><span className="mono">JPG, PNG, WebP</span></div>
            <div className="spec"><span>Video</span><span className="mono">MP4, MOV (H.264)</span></div>
            <div className="spec"><span>Ratio</span><span className="mono">16:9 Portrait/Landscape</span></div>
          </div>
        </GlassCard>
      </div>

      <footer className="step-footer">
        <AmberButton 
          onClick={handleNext} 
          disabled={!state.creative}
          pulse={!!state.creative}
        >
          Continue to Schedule →
        </AmberButton>
      </footer>
    </div>
  )
}
