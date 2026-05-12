"use client";

import { motion } from "framer-motion";

export function Reveal({
  children,
  delay = 0,
  className = "",
  distance = 26,
  duration = 0.75
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  distance?: number;
  duration?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}


export function Counter({ value, suffix = "" }: { value: string; suffix?: string }) {
  return <span>{value}{suffix}</span>;
}
