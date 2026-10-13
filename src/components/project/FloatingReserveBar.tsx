'use client'

import { motion } from 'framer-motion'
import { ProjectUnit } from '@/data/projects'

const PAYMENT_PLAN = '20% deposit'

/** "1 Bedroom" / "2 Bedroom + DSQ" / "3 Bedroom + Study + DSQ" -> 1 / 2 / 3 */
function bedMix(units: ProjectUnit[]): string {
  const beds = Array.from(
    new Set(
      units
        .map((u) => u.type.match(/^(\d+)/)?.[1])
        .filter((n): n is string => Boolean(n)),
    ),
  ).sort((a, b) => Number(a) - Number(b))

  if (!beds.length) return 'Enquire'
  if (beds.length === 1) return `${beds[0]} Bed`
  return `${beds.slice(0, -1).join(', ')} & ${beds[beds.length - 1]} Beds`
}

interface Props {
  shortName: string
  priceLabel: string | null
  units: ProjectUnit[]
  locationLabel: string
}

export default function FloatingReserveBar({ shortName, priceLabel, units, locationLabel }: Props) {
  const area = locationLabel.split(',')[0].trim()
  const beds = bedMix(units)

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-0 inset-x-0 z-40 bg-dark/95 backdrop-blur-md border-t border-white/10"
    >
      {/* pr- reserves room so the floating WhatsApp/Chat buttons (bottom-right,
          z-50) never sit on top of the Reserve button */}
      <div className="max-w-7xl mx-auto pl-4 sm:pl-6 lg:pl-10 pr-[92px] sm:pr-[100px] py-3 sm:py-3.5 flex items-center gap-4 sm:gap-8">
        <p
          className="hidden lg:block font-serif text-white text-base font-light flex-shrink-0 whitespace-nowrap"
          style={{ letterSpacing: '0.04em' }}
        >
          {shortName.toUpperCase()}
        </p>

        <div className="hidden lg:block w-px h-8 bg-white/10 flex-shrink-0" />

        <div className="hidden sm:flex items-center gap-7 flex-1 min-w-0">
          <div className="min-w-0">
            <p className="text-white/35 text-[8.5px] font-sans tracking-[0.18em] uppercase mb-1">Prices From</p>
            <p className="text-white text-[13px] font-sans font-medium truncate">{priceLabel ?? 'Enquire'}</p>
          </div>
          <div className="min-w-0 hidden md:block">
            <p className="text-white/35 text-[8.5px] font-sans tracking-[0.18em] uppercase mb-1">Residences</p>
            <p className="text-white text-[13px] font-sans font-medium truncate">{beds}</p>
          </div>
          <div className="min-w-0 hidden md:block">
            <p className="text-white/35 text-[8.5px] font-sans tracking-[0.18em] uppercase mb-1">Payment Plan</p>
            <p className="text-white text-[13px] font-sans font-medium truncate">{PAYMENT_PLAN}</p>
          </div>
          <div className="min-w-0 hidden lg:block">
            <p className="text-white/35 text-[8.5px] font-sans tracking-[0.18em] uppercase mb-1">Location</p>
            <p className="text-white text-[13px] font-sans font-medium truncate">{area}</p>
          </div>
        </div>

        {/* Compact price on mobile — the stat row above is hidden there */}
        <div className="sm:hidden min-w-0 flex-1">
          <p className="text-white/35 text-[8px] font-sans tracking-[0.18em] uppercase">Prices From</p>
          <p className="text-white text-[13px] font-sans font-medium truncate">{priceLabel ?? 'Enquire for pricing'}</p>
        </div>

        <a
          href="#residences"
          className="flex-shrink-0 bg-gold-dark text-white px-4 sm:px-7 py-2.5 sm:py-3 text-[10px] sm:text-[11px] font-sans font-semibold tracking-[0.16em] uppercase hover:bg-gold transition-colors whitespace-nowrap"
        >
          Reserve Your Unit
        </a>
      </div>
    </motion.div>
  )
}
