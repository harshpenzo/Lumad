import { useScrollReveal } from '../../hooks/useScrollReveal'
import { useCountUp } from '../../hooks/useCountUp'
import { formatIndianNumber } from '../../utils/formatCurrency'
import './StatsRow.css'

/**
 * StatsRow — animated count-up stats
 * Sourced from Stitch homepage trust indicators.
 * All numbers count up on scroll via useCountUp hook.
 * All values rendered in Space Mono per Stitch designMd.
 */

function StatItem({ end, suffix = '', prefix = '', label, decimals = 0 }) {
  const { count, ref, hasStarted } = useCountUp({ end, duration: 2200, decimals })
  return (
    <div className="stats-item" ref={ref}>
      <div className="stats-item__value mono" aria-label={`${prefix}${end}${suffix} ${label}`}>
        {prefix}
        <span 
          className="stats-item__number"
          style={{ opacity: hasStarted ? 1 : 0, transition: 'opacity 0.3s' }}
        >
          {decimals > 0
            ? (hasStarted ? count.toFixed(decimals) : end.toFixed(decimals))
            : formatIndianNumber(Math.round(hasStarted ? count : end))
          }
        </span>
        {suffix && <span className="stats-item__suffix">{suffix}</span>}
      </div>
      <p className="stats-item__label">{label}</p>
    </div>
  )
}

export default function StatsRow() {
  const sectionRef = useScrollReveal(0.15)

  return (
    <section className="stats" aria-label="LUMAD platform statistics">
      <div className="stats__inner container reveal" ref={sectionRef}>
        <dl className="stats__grid reveal-stagger">
          <StatItem end={5200}   suffix="+"  label="Screens live across India" />
          <StatItem end={200}    suffix="+"  label="Cities and towns covered" />
          <StatItem end={12000}  suffix="+"  label="Campaigns delivered" />
          <StatItem end={4.8}    suffix="★"  label="Average advertiser rating" decimals={1} />
        </dl>
      </div>
    </section>
  )
}
