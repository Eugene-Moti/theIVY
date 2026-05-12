"use client";

import { motion } from "framer-motion";

export function AmbientEffects() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Aurora / drifting light blobs */}
      <motion.div
        className="absolute left-[-10%] top-[-20%] h-[520px] w-[520px] rounded-full bg-[#c9a15b]/25 blur-3xl"
        animate={{ x: [0, 120, 0], y: [0, 80, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-15%] top-[5%] h-[560px] w-[560px] rounded-full bg-[#31493d]/20 blur-3xl"
        animate={{ x: [0, -120, 0], y: [0, 60, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-[15%] bottom-[-30%] h-[620px] w-[620px] rounded-full bg-[#b86f52]/20 blur-3xl"
        animate={{ x: [0, 140, 0], y: [0, -70, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Subtle noise overlay */}
      <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22300%22><filter id=%22n%22 x=%220%22 y=%220%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/></filter><rect width=%22300%22 height=%22300%22 filter=%22url(%23n)%22 opacity=%220.6%22/></svg>')" }} />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(13,17,16,0)_0%,rgba(13,17,16,0.25)_55%,rgba(13,17,16,0.75)_100%)]" />
    </div>
  );
}
