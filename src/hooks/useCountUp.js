import { useState, useEffect, useRef } from 'react'

/**
 * useCountUp
 * Animates a number from 0 (or start) to `end` over `duration` ms.
 * Starts only when the element is visible (IntersectionObserver).
 *
 * Usage:
 *   const { count, ref } = useCountUp({ end: 5200, duration: 2000 })
 *   <span ref={ref}>{count.toLocaleString('en-IN')}</span>
 */
export function useCountUp({ end, start = 0, duration = 2000, decimals = 0 }) {
  const [count, setCount] = useState(start)
  const ref = useRef(null)
  const started = useRef(false)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          setHasStarted(true)
          animateCount()
          observer.unobserve(el)
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [end])

  function animateCount() {
    const startTime = performance.now()
    const range = end - start

    function step(currentTime) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = start + range * eased
      setCount(parseFloat(current.toFixed(decimals)))

      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }

    requestAnimationFrame(step)
  }

  return { count, ref, hasStarted }
}
