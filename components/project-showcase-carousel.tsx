"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export type ProjectShowcaseItem = {
  type?: "image" | "video";
  src: string;
  title: string;
  caption: string;
};

type ProjectShowcaseCarouselProps = {
  projectName: string;
  items: ProjectShowcaseItem[];
};

export function ProjectShowcaseCarousel({ projectName, items }: ProjectShowcaseCarouselProps) {
  const [active, setActive] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const safeItems = useMemo(() => items.filter((item) => item.src), [items]);
  const current = safeItems[active] ?? safeItems[0];

  useEffect(() => {
    if (!isPlaying || safeItems.length < 2) return;

    const timer = window.setInterval(() => {
      setActive((index) => (index + 1) % safeItems.length);
    }, current?.type === "video" ? 9000 : 5200);

    return () => window.clearInterval(timer);
  }, [current?.type, isPlaying, safeItems.length]);

  if (!safeItems.length) return null;

  const visibleItem = current as ProjectShowcaseItem;
  const goTo = (index: number) => setActive((index + safeItems.length) % safeItems.length);

  return (
    <section className="mt-14 overflow-hidden border-y border-white/10 bg-[#070807] shadow-[0_28px_90px_rgba(0,0,0,0.4)]">
      <div className="relative min-h-[68vh] md:min-h-[82vh]">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={visibleItem.src}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.08, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.98, filter: "blur(8px)" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {visibleItem.type === "video" ? (
              <video
                className="h-full w-full object-cover"
                src={visibleItem.src}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label={`${projectName} video showcase`}
              />
            ) : (
              <Image
                src={visibleItem.src}
                alt={`${projectName} - ${visibleItem.title}`}
                fill
                sizes="100vw"
                className="object-cover"
                priority={active === 0}
              />
            )}
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,8,7,0.46),rgba(7,8,7,0.04)_54%,rgba(7,8,7,0.22)),linear-gradient(0deg,rgba(7,8,7,0.72),transparent_58%)]" />
        <motion.div
          className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(110deg,transparent,rgba(246,241,231,0.18),transparent)]"
          animate={{ x: ["-120%", "120%"] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 mx-auto flex min-h-[68vh] max-w-7xl flex-col justify-between p-5 md:min-h-[82vh] md:p-9">
          <div className="flex items-center justify-between gap-4">
            <p className="rounded-full border border-white/15 bg-black/30 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#C9A96E]">
              Showcase
            </p>
            <button
              type="button"
              onClick={() => setIsPlaying((value) => !value)}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/15 bg-black/30 text-white transition hover:border-[#C9A96E]/70 hover:text-[#C9A96E]"
              aria-label={isPlaying ? "Pause showcase" : "Play showcase"}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>
          </div>

          <div className="max-w-xl">
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={`${visibleItem.src}-copy`}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="inline-flex rounded-full border border-white/15 bg-black/35 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white/72">
                  {String(active + 1).padStart(2, "0")} / {String(safeItems.length).padStart(2, "0")}
                </p>
                <h3 className="mt-4 font-serif text-3xl font-light leading-tight md:text-5xl">{visibleItem.title}</h3>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="grid grid-cols-4 gap-2 md:grid-cols-6">
              {safeItems.map((item, index) => (
                <button
                  key={item.src}
                  type="button"
                  onClick={() => goTo(index)}
                  className={`relative h-16 overflow-hidden rounded-md border transition md:h-20 ${
                    index === active ? "border-[#C9A96E]" : "border-white/12 opacity-70 hover:opacity-100"
                  }`}
                  aria-label={`Show ${item.title}`}
                >
                  {item.type === "video" ? (
                    <video className="h-full w-full object-cover" src={item.src} muted playsInline preload="metadata" />
                  ) : (
                    <Image src={item.src} alt="" fill sizes="120px" className="object-cover" />
                  )}
                  <span className="absolute inset-0 bg-black/15" />
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => goTo(active - 1)}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white transition hover:border-[#C9A96E]/70 hover:text-[#C9A96E]"
                aria-label="Previous showcase image"
              >
                <ArrowLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => goTo(active + 1)}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white transition hover:border-[#C9A96E]/70 hover:text-[#C9A96E]"
                aria-label="Next showcase image"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
