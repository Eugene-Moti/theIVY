"use client";

import { motion } from "framer-motion";

export function Reveal({
  children,
  delay = 0,
  className = "",
  id,
  x = 0,
  distance = 26,
  scale = 1,
  duration = 0.75
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  id?: string;
  x?: number;
  distance?: number;
  scale?: number;
  duration?: number;
}) {
  return (
    <motion.div
      id={id}
      className={className}
      initial={{ opacity: 0, x, y: distance, scale }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
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
