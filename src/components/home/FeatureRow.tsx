'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const p = (path: string) => encodeURI(path)

const HERO = {
  image: p('/Ivy Myst Assets/Courtyard 01_Night.jpg'),
  href: '/ivy-myst',
}

const SIDE_IMAGES = [
  {
    image: p('/Ivy Myst Assets/New Renders/Exterior/Gate Front View.png'),
    caption: 'Four landmark developments',
    href: '/developments',
  },
  {
    image: p('/Ivy Myst Assets/New Renders/Myst amenities/reception area.png'),
    caption: 'Market notes & guides',
    href: '/insights',
  },
]

export default function FeatureRow() {
  return (
    <section className="bg-white py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-16 items-center">
          {/* Text block — slides in from the left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-gold text-[10px] font-sans font-semibold tracking-[0.3em] uppercase mb-4">
              Now Selling
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-dark leading-[1.1] mb-6">
              Ivy Myst, Kileleshwa
            </h2>
            <p className="text-dark/55 text-[14px] font-sans font-light leading-[1.85] mb-9 max-w-md">
              Curved architecture, garden terraces and a rooftop Celestial Pool on Gatundu Road.
              Groundbreaking is complete — now selling at early-stage pricing.
            </p>
            <Link
              href={HERO.href}
              className="inline-flex items-center gap-2.5 bg-dark text-white px-7 py-3.5 text-[11px] font-sans font-semibold tracking-[0.18em] uppercase hover:bg-gold-dark transition-colors"
            >
              Explore Ivy Myst <ArrowRight size={13} />
            </Link>
          </motion.div>

          {/* Image cluster — pieces converge from different directions */}
          <div className="grid grid-cols-2 gap-4 lg:gap-5">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href={HERO.href} className="relative block aspect-[3/4] overflow-hidden bg-dark group">
                <Image
                  src={HERO.image}
                  alt="Ivy Myst, Kileleshwa"
                  fill
                  sizes="(max-width: 1024px) 50vw, 30vw"
                  quality={84}
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                />
              </Link>
            </motion.div>

            <div className="flex flex-col gap-4 lg:gap-5">
              {SIDE_IMAGES.map((img, i) => (
                <motion.div
                  key={img.href}
                  initial={{ opacity: 0, y: i === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.7, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link href={img.href} className="relative block aspect-[4/3] overflow-hidden bg-[#F5F2EE] group">
                    <Image
                      src={img.image}
                      alt={img.caption}
                      fill
                      sizes="(max-width: 1024px) 50vw, 30vw"
                      quality={82}
                      className="object-contain transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                    />
                  </Link>
                  <Link href={img.href}>
                    <p className="text-dark/45 text-[10px] font-sans tracking-[0.14em] uppercase mt-3 hover:text-gold transition-colors">
                      {img.caption}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
