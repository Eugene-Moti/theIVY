'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { end: 10, suffix: '+', label: 'Years of Excellence' },
  { end: 4, suffix: '', label: 'Active Developments' },
  { end: 1000, suffix: '+', label: 'Homes Delivered' },
  { end: 3, suffix: '', label: 'Prime Nairobi Locations' },
]

function Counter({ end, suffix }: { end: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    if (!inView) return
    const duration = 2000
    const fps = 60
    const steps = (duration / 1000) * fps
    const increment = end / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, 1000 / fps)

    return () => clearInterval(timer)
  }, [inView, end])

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

export default function StatsSection() {
  return (
    <section className="py-20 lg:py-28 bg-dark">
      {/* Section inner */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 lg:mb-20"
        >
          <p className="text-gold text-[11px] font-sans font-semibold tracking-[0.3em] uppercase mb-4">
            BY THE NUMBERS
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-white font-light leading-tight">
            A Track Record of Excellence
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: i * 0.1 }}
              className="text-center relative"
            >
              {/* Thin top rule */}
              <div className="w-8 h-[1px] bg-gold/50 mx-auto mb-7" />

              <p className="font-serif text-5xl lg:text-6xl font-light text-white mb-3 leading-none">
                <Counter end={stat.end} suffix={stat.suffix} />
              </p>

              <p className="text-white/35 text-[10px] font-sans font-medium tracking-[0.22em] uppercase">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-20 border-t border-white/10 pt-10"
        >
          <p className="font-serif text-xl text-white/40 font-light italic">
            "Driven by quality, innovation, integrity and customer satisfaction."
          </p>
        </motion.div>
      </div>
    </section>
  )
}
