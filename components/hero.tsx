"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { BrochureDownload } from "@/components/brochure-download";
import { assets, projects } from "@/lib/data";

const slides = [
  {
    project: projects[0],
    image: assets.ivyParkHero
  },
  {
    project: projects[1],
    image: assets.blossomsHero
  },
  {
    project: projects[2],
    image: assets.luckinnHero
  }
];

export function Hero() {
  const [active, setActive] = useState(0);
  const activeSlide = slides[active];
  const dragX = useMotionValue(0);
  const backgroundScale = useTransform(dragX, [-160, 0, 160], [1.04, 1, 1.04]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, []);

  const pulse = () => {
    if ("vibrate" in navigator) {
      navigator.vibrate(12);
    }
  };

  const goToPrevious = () => {
    pulse();
    setActive((current) => (current === 0 ? slides.length - 1 : current - 1));
  };
  const goToNext = () => {
    pulse();
    setActive((current) => (current + 1) % slides.length);
  };

  return (
    <section className="hero-mobile-shell relative min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={activeSlide.project.slug}
            className="absolute inset-0"
            style={{ scale: backgroundScale }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={activeSlide.image}
              alt={`${activeSlide.project.name} exterior`}
              fill
              priority={active === 0}
              sizes="100vw"
              className="hero-mobile-image object-cover"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1110]/46 via-[#0d1110]/14 to-[#0d1110]/72 md:from-[#0d1110]/44 md:via-[#0d1110]/12 md:to-[#0d1110]/68" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1110]/34 via-transparent to-[#0d1110]/34" />
        <div className="mobile-spotlight absolute inset-0 md:hidden" />
      </div>

      <button
        type="button"
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-[#0d1110]/35 text-white backdrop-blur transition hover:border-[#c9a15b] hover:text-[#c9a15b] md:flex"
        aria-label="Previous project"
      >
        <ArrowLeft size={20} />
      </button>
      <button
        type="button"
        onClick={goToNext}
        className="absolute right-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-[#0d1110]/35 text-white backdrop-blur transition hover:border-[#c9a15b] hover:text-[#c9a15b] md:flex"
        aria-label="Next project"
      >
        <ArrowRight size={20} />
      </button>

      <motion.div
        className="relative z-10 flex min-h-screen touch-pan-y items-center justify-center px-5 pb-24 pt-24 text-center md:px-6 md:pb-12 md:pt-20"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.16}
        style={{ x: dragX }}
        onDragEnd={(_, info) => {
          if (info.offset.x > 70 || info.velocity.x > 450) {
            goToPrevious();
          }
          if (info.offset.x < -70 || info.velocity.x < -450) {
            goToNext();
          }
        }}
      >
        <motion.div
          key={activeSlide.project.slug}
          className="hero-readable-copy mx-auto max-w-4xl"
          initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-5 flex flex-col items-center justify-center gap-3 sm:flex-row md:mb-7">
            <Image src={activeSlide.project.logo} alt={`${activeSlide.project.name} logo`} width={activeSlide.project.secondaryLogo ? 300 : 230} height={110} className={`max-h-20 w-auto drop-shadow-[0_0_22px_rgba(0,0,0,0.45)] md:max-h-28 ${activeSlide.project.logoClass ?? ""}`} />
            {activeSlide.project.secondaryLogo && (
              <Image src={activeSlide.project.secondaryLogo} alt={`${activeSlide.project.name} secondary logo`} width={150} height={70} className={`max-h-14 w-auto drop-shadow-[0_0_22px_rgba(0,0,0,0.45)] md:max-h-20 ${activeSlide.project.logoClass ?? ""}`} />
            )}
          </div>
          <h1 className="font-serif text-[clamp(3rem,16vw,5.6rem)] font-semibold leading-[0.92] md:text-8xl">{activeSlide.project.name}</h1>
          <div className="mx-auto mt-5 flex w-fit max-w-full items-center gap-2 rounded-full border border-white/18 bg-[#0d1110]/42 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md md:mt-6 md:px-5 md:py-2.5 md:text-base">
            <MapPin size={15} className="text-[#c9a15b]" />
            {activeSlide.project.location}
          </div>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row md:mt-8">
            <Link href={`/${activeSlide.project.slug}`} className="gold-gradient mobile-tap flex min-h-14 items-center justify-center gap-2 rounded-full px-6 py-4 font-bold text-[#111]">
              Learn More <ArrowRight size={18} />
            </Link>
            <BrochureDownload brochure={activeSlide.project.brochure} projectName={activeSlide.project.name} variant="outline" />
          </div>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-24 left-1/2 z-20 flex -translate-x-1/2 gap-3 md:bottom-8">
        {slides.map((slide, index) => (
          <button
            key={slide.project.slug}
            type="button"
            onClick={() => {
              pulse();
              setActive(index);
            }}
            className={`h-2.5 rounded-full transition-all ${active === index ? "w-10 bg-[#c9a15b]" : "w-2.5 bg-white/55 hover:bg-white"}`}
            aria-label={`Show ${slide.project.name}`}
          />
        ))}
      </div>
      <a href="#featured-mobile" className="absolute bottom-7 right-5 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white shadow-[0_14px_40px_rgba(0,0,0,0.28)] backdrop-blur-md md:hidden" aria-label="Scroll to featured project">
        <ArrowDown size={18} />
      </a>
    </section>
  );
}
