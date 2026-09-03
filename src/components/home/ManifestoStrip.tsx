'use client'

import { motion } from 'framer-motion'

const facts = [
  { value: '10+', label: 'Years' },
  { value: '4', label: 'Developments' },
  { value: '3', label: 'Nairobi Neighbourhoods' },
  { value: '1,000+', label: 'Residences' },
]

export default function ManifestoStrip() {
  return (
    <section className="bg-dark border-b border-white/8">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
          >
            <p className="text-gold text-[10px] font-sans font-semibold tracking-[0.3em] uppercase mb-5">
              The Ivy Group · Est. 2014
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.6rem] text-white font-medium tracking-tight leading-[1.1]">
              A decade of landmark<br className="hidden lg:block" /> addresses in Nairobi.
            </h2>
            <div className="h-px w-10 bg-gold mt-6" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.18 }}
            className="grid grid-cols-2 gap-6 lg:gap-8"
          >
            {facts.map((f) => (
              <div key={f.label} className="border-l border-white/12 pl-6">
                <p className="font-serif text-3xl text-white font-light mb-1 tabular-nums">{f.value}</p>
                <p className="text-white/35 text-[10px] font-sans tracking-[0.2em] uppercase">{f.label}</p>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
