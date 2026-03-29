/**
 * formatCurrency.js
 * Indian Rupee formatting with the Indian number system (lakhs, crores).
 */

/**
 * Format a number as Indian Rupee currency.
 * @param {number} value - The amount in rupees
 * @param {boolean} compact - If true, show compact form (₹1.75L, ₹2.1Cr)
 */
export function formatINR(value, compact = false) {
  if (compact) {
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(1)}Cr`
    }
    if (value >= 100000) {
      return `₹${(value / 100000).toFixed(1)}L`
    }
    if (value >= 1000) {
      return `₹${(value / 1000).toFixed(1)}K`
    }
    return `₹${value}`
  }

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)
}

/**
 * Format a number with Indian grouping (no currency symbol).
 * e.g. 175000 → "1,75,000"
 */
export function formatIndianNumber(value) {
  return new Intl.NumberFormat('en-IN').format(value)
}
