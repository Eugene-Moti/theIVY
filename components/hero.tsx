"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { BrochureDownload } from "@/components/brochure-download";
import { assets, projects } from "@/lib/data";

const slides = [
  {
    project: projects[0],
    image: assets.ivyParkHero,
    eyebrow: "Latest launch in Kilimani"
  },
  {
    project: projects[1],
    image: assets.blossomsHero,
    eyebrow: "Luxury residences in Kileleshwa"
  },
  {
    project: projects[2],
    image: assets.luckinnHero,
    eyebrow: "Refined Westlands living"
  }
];

export function Hero() {
  const [active, setActive] = useState(0);
  const activeSlide = slides[active];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, []);

  const goToPrevious = () => setActive((current) => (current === 0 ? slides.length - 1 : current - 1));
  const goToNext = () => setActive((current) => (current + 1) % slides.length);

  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <Image
            key={slide.project.slug}
            src={slide.image}
            alt={`${slide.project.name} exterior`}
            fill
            priority={index === 0}
            sizes="100vw"
            className={`object-cover transition-opacity duration-1000 ${active === index ? "opacity-100" : "opacity-0"}`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1110]/55 via-[#0d1110]/28 to-[#0d1110]/78" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1110]/50 via-transparent to-[#0d1110]/50" />
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

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 pt-20 text-center">
        <div className="mx-auto max-w-4xl">
          <div className="mb-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Image src={activeSlide.project.logo} alt={`${activeSlide.project.name} logo`} width={activeSlide.project.secondaryLogo ? 300 : 230} height={110} className={`max-h-28 w-auto drop-shadow-[0_0_22px_rgba(0,0,0,0.45)] ${activeSlide.project.logoClass ?? ""}`} />
            {activeSlide.project.secondaryLogo && (
              <Image src={activeSlide.project.secondaryLogo} alt={`${activeSlide.project.name} secondary logo`} width={150} height={70} className={`max-h-20 w-auto drop-shadow-[0_0_22px_rgba(0,0,0,0.45)] ${activeSlide.project.logoClass ?? ""}`} />
            )}
          </div>
          <p className="eyebrow">{activeSlide.eyebrow}</p>
          <h1 className="mt-5 font-serif text-6xl font-semibold leading-[0.95] md:text-8xl">{activeSlide.project.name}</h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-8 text-white/80">{activeSlide.project.description}</p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href={`/${activeSlide.project.slug}`} className="gold-gradient flex items-center justify-center gap-2 rounded-full px-6 py-4 font-bold text-[#111]">
              Learn More <ArrowRight size={18} />
            </Link>
            <BrochureDownload brochure={activeSlide.project.brochure} projectName={activeSlide.project.name} variant="outline" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-3">
        {slides.map((slide, index) => (
          <button
            key={slide.project.slug}
            type="button"
            onClick={() => setActive(index)}
            className={`h-2.5 rounded-full transition-all ${active === index ? "w-10 bg-[#c9a15b]" : "w-2.5 bg-white/55 hover:bg-white"}`}
            aria-label={`Show ${slide.project.name}`}
          />
        ))}
      </div>
    </section>
  );
}
