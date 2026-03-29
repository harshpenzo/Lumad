import { useEffect, useRef } from 'react'

/**
 * useScrollReveal
 * Adds 'revealed' class to target element when it enters the viewport.
 * Usage: const ref = useScrollReveal(); <section ref={ref} className="reveal"> ... </section>
 */
export function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed')
          observer.unobserve(el)
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return ref
}
