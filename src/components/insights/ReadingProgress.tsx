'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

/** Thin gold bar fixed under the navbar, filling as the reader scrolls
 * through the whole page — a lightweight "how much is left" cue. */
export default function ReadingProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2.5px] bg-gold origin-left z-[60]"
    />
  )
}
