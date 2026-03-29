/**
 * calculateReach.js
 * Estimates campaign impressions from screen footfall and slot count.
 */

/**
 * Calculate estimated impressions for a booking.
 * @param {number} footfallPerDay - Average daily footfall for the screen
 * @param {number} slots - Number of 10-second slots booked per day
 * @param {number} days - Campaign duration in days
 * @param {number} attentionRate - Fraction of footfall that sees the ad (default 0.15)
 */
export function calculateReach(footfallPerDay, slots, days = 1, attentionRate = 0.15) {
  // Each slot is 10 seconds in a ~10 minute loop (60 slots/hour)
  // Higher slot count = higher share of voice = more attention
  const shareOfVoice = Math.min(slots / 60, 1)
  const dailyImpressions = Math.round(footfallPerDay * attentionRate * shareOfVoice)
  const totalImpressions = dailyImpressions * days

  return {
    dailyImpressions,
    totalImpressions,
    shareOfVoice: Math.round(shareOfVoice * 100),
  }
}

/**
 * Calculate CPM (cost per thousand impressions).
 * @param {number} totalCost - Total campaign cost in rupees
 * @param {number} totalImpressions - Total estimated impressions
 */
export function calculateCPM(totalCost, totalImpressions) {
  if (totalImpressions === 0) return 0
  return Math.round((totalCost / totalImpressions) * 1000)
}
