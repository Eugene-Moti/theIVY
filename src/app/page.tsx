"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";



// PROJECTS DATA
const projectsData = [
  {
    name: "BLOSSOM IVY",
    location: "Kileleshwa",
    description: "Elegant apartments in the heart of Kileleshwa, offering tranquil living with urban convenience.",
    image: "/designs/blossom.jpg",
    link: "https://www.blossomsivy.ke/",
    status: "current" as const,
  },
  {
    name: "LUCKINN IVY",
    location: "Westlands",
    description: "Contemporary living spaces in vibrant Westlands, perfect for modern professionals and families.",
    image: "/designs/Luckinn Ivy.jpg",
    link: "/luckinn-ivy",
    status: "current" as const,
  },
  {
    name: "IVY PARK",
    location: "Kilimani",
    description: "Sophisticated residences in prestigious Kilimani, combining luxury with accessibility.",
    image: "/designs/Exterior_07_IA.png",
    link: "/ivy-park",
    status: "current" as const,
  },
  {
    name: "NANDWA IVY",
    location: "Kileleshwa",
    description: "Premium residential development featuring modern architecture and premium finishes.",
    image: "/designs/Nandwa-Ivy.png",
    link: "#",
    status: "sold-out" as const,
  },
  {
    name: "DIAMOND IVY",
    location: "Kileleshwa",
    description: "Luxury apartments offering exceptional living spaces with diamond-quality craftsmanship.",
    image: "/designs/diamondivy.png",
    link: "#",
    status: "sold-out" as const,
  },
];

// 3D CINEMATIC CAROUSEL
function ProjectsCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [windowWidth, setWindowWidth] = useState(1024);
  const totalSlides = projectsData.length;
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(timer);
  }, [totalSlides]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  const goToSlide = (i: number) => setCurrentSlide(i);

  // Swipe support
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let startX = 0;
    const handleStart = (e: TouchEvent) => (startX = e.changedTouches[0].screenX);
    const handleEnd = (e: TouchEvent) => {
      const diff = startX - e.changedTouches[0].screenX;
      if (Math.abs(diff) > 50) diff > 0 ? nextSlide() : prevSlide();
    };
    track.addEventListener("touchstart", handleStart, { passive: true });
    track.addEventListener("touchend", handleEnd, { passive: true });
    return () => {
      track.removeEventListener("touchstart", handleStart);
      track.removeEventListener("touchend", handleEnd);
    };
  }, []);

  return (
    <section className="relative w-full py-32 md:py-44 text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/renders/251027_Final_Lounge - View 02_IVY PARK.jpg"
          alt="Ivy Park Luxurious Lounge"
          fill
          priority
          quality={98}
          className="object-cover brightness-[0.78] scale-110 md:scale-105"
        />
        <div className="absolute inset-0 bg-black/22" />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#bfa544]/12 via-transparent to-[#bfa544]/6" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-semi-bold tracking-wider text-[#bfa544] font-serif drop-shadow-2xl"
          >
            OUR PROJECTS
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-8 mt-8"
          >
            <div className="h-px w-96 bg-[#bfa544]/70" />
          </motion.div>
        </div>

        {/* 3D CAROUSEL */}
        <div className="relative" style={{ perspective: "1000px" }}>
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 rounded-full overflow-hidden z-20">
            <motion.div
              className="h-full bg-gradient-to-r from-[#bfa544] to-[#d4c07a]"
              animate={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            />
          </div>

          {/* Nav Buttons */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous project"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 flex items-center justify-center hover:bg-white/20 hover:scale-110 active:scale-95 transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next project"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 flex items-center justify-center hover:bg-white/20 hover:scale-110 active:scale-95 transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Track */}
          <div ref={trackRef} className="relative h-[500px] md:h-[620px] overflow-hidden" style={{ transformStyle: "preserve-3d" }}>
            {projectsData.map((project, index) => {
              const position = (index - currentSlide + totalSlides) % totalSlides;
              const isActive = position === 0;
              const isPrev = position === totalSlides - 1;
              const isNext = position === 1;

              return (
                <motion.div
                  key={index}
                  className="carousel-item absolute inset-0"
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : isPrev || isNext ? (windowWidth < 641 ? 0 : 0.7) : 0,
                    scale: isActive ? 1 : isPrev || isNext ? (windowWidth < 641 ? 0.8 : 0.9) : 0.8,
                    x: isActive ? 0 : isPrev ? "-100%" : isNext ? "100%" : 0,
                    z: isActive ? 0 : isPrev || isNext ? -100 : -200,
                  }}
                  transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div className="w-full h-full p-6 md:p-10">
                    <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl group">
                      <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                        priority={index < 3}
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-[#bfa544]/30 via-transparent to-black/60" />

                      {project.status === "sold-out" && (
                        <div className="absolute top-8 right-8 z-10">
                          <span className="bg-red-600/95 backdrop-blur px-8 py-3 rounded-full text-base font-bold uppercase tracking-wider shadow-xl">
                            Sold Out
                          </span>
                        </div>
                      )}

                      <div className="absolute inset-x-0 bottom-0 p-10 md:p-14 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                        <h3 className="text-4xl md:text-6xl font-bold font-serif text-white drop-shadow-2xl leading-tight">
                          {project.name}
                        </h3>
                        <p className="text-[#bfa544] text-2xl md:text-3xl font-medium tracking-wider mt-2">
                          {project.location}
                        </p>
                        <p className="text-gray-100 text-base md:text-lg leading-relaxed mt-4 max-w-2xl opacity-95">
                          {project.description}
                        </p>
                        {project.link !== "#" && (
                          <motion.a
                            href={project.link}
                            target={project.link.startsWith("http") ? "_blank" : "_self"}
                            rel={project.link.startsWith("http") ? "noopener noreferrer" : undefined}
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-block mt-8 bg-[#bfa544] text-black font-bold px-12 py-5 rounded-full hover:bg-[#d4c07a] transition-all shadow-2xl text-lg tracking-wider"
                          >
                            View Project
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Indicators */}
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex gap-3 z-20">
            {projectsData.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goToSlide(i)}
                aria-label={`Go to project ${i + 1}`}
                className={`w-12 h-1.5 rounded-full transition-all ${i === currentSlide ? "bg-[#bfa544] w-20" : "bg-white/30 hover:bg-white/60"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// CONTACT FORM MODAL
function ContactFormModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: open ? 1 : 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: open ? 1 : 0.9, y: open ? 0 : 20 }}
        transition={{ type: "spring", damping: 25 }}
        className="bg-gradient-to-br from-white to-[#f5f8f5] rounded-3xl shadow-2xl p-8 w-full max-w-md mx-6 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-[#bfa544] text-3xl font-light hover:scale-110 transition">
          ×
        </button>
        <h3 className="text-2xl md:text-3xl font-bold text-[#bfa544] text-center mb-6 font-serif">Get In Touch</h3>
        <form className="space-y-5">
          {["Your Name", "Your Email", "Phone Number"].map((ph, i) => (
            <motion.input
              key={i}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              type="text"
              placeholder={ph}
              className="w-full px-5 py-4 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#bfa544]/50 placeholder:text-gray-500"
            />
          ))}
          <textarea
            placeholder="Your Message"
            rows={4}
            className="w-full px-5 py-4 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#bfa544]/50 resize-none placeholder:text-gray-500"
          />
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-gradient-to-r from-[#bfa544] to-[#d4c07a] text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
          >
            Send Message
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
}

// MAIN PAGE
export default function Home() {
  const videoUrl = "/designs/video_bg.mp4";
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const yVideo = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scaleVideo = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const opacityOverlay = useTransform(scrollYProgress, [0, 0.7], [0.4, 0.7]);
  const collectionsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const blogRef = useRef<HTMLDivElement>(null);
  
  const isCollectionsInView = useInView(collectionsRef, { once: true, margin: "-100px" });
  const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" });
  const isFeaturesInView = useInView(featuresRef, { once: true, margin: "-100px" });
  const isTestimonialsInView = useInView(testimonialsRef, { once: true, margin: "-100px" });
  const isBlogInView = useInView(blogRef, { once: true, margin: "-100px" });

  return (
    <>
      {/* HERO */}
      <section ref={heroRef} className="relative min-h-screen overflow-hidden">
        <motion.div style={{ y: yVideo, scale: scaleVideo }} className="absolute inset-0">
          <video
            className="w-full h-full object-cover"
            src={videoUrl}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/renders/251027_FINAL_Cinema-View 1_IVY PARK.jpg"
          />
        </motion.div>
        
        <motion.div style={{ opacity: opacityOverlay }} className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="max-w-6xl mx-auto space-y-10"
          >
            {/* Brand Name and Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-serif text-white drop-shadow-2xl mb-6">
                </h1>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              {[
                { href: "/buy", text: "Explore Properties" },
                { href: "/book-reservation", text: "Book Viewing" },
              ].map((btn, i) => (
                <motion.a
                  key={i}
                  href={btn.href}
                  whileHover={{ scale: 1.08, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative overflow-hidden rounded-full px-10 py-5 text-lg md:text-xl font-medium text-white border-2 border-white/70 backdrop-blur-md transition-all duration-500 hover:border-[#bfa544] hover:bg-white/10"
                >
                  <span className="relative z-10">{btn.text}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#bfa544]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <div className="flex flex-col items-center gap-2 text-white/70">
              <span className="text-sm">Scroll to explore</span>
              <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-1 h-3 bg-white rounded-full mt-2"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <ProjectsCarousel />



      {/* APARTMENT COLLECTIONS */}
      <section ref={collectionsRef} className="py-24 bg-gradient-to-b from-[#f8f9f7] to-[#e9ede9]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isCollectionsInView ? { opacity: 1, y: 0 } : {}}
              className="text-4xl md:text-5xl font-bold text-[#222] font-serif mb-4"
            >
              APARTMENT COLLECTIONS
            </motion.h2>
            <div className="flex items-center justify-center gap-6">
              <motion.div initial={{ width: 0 }} animate={isCollectionsInView ? { width: 240 } : {}} transition={{ delay: 0.4 }} className="h-0.5 bg-[#bfa544]" />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { img: "/designs/IMG-20250709-WA0082.jpg", label: "1 BEDROOM", link: "/buy?type=1-bedroom" },
              { img: "/designs/IMG-20250709-WA0083.jpg", label: "2 BEDROOM", link: "/buy?type=2-bedroom" },
              { img: "/designs/IMG-20250709-WA0084.jpg", label: "3 BEDROOM", link: "/buy?type=3-bedroom" },
              { img: "/designs/IMG-20250709-WA0085.jpg", label: "4 BEDROOM", link: "/buy?type=4-bedroom" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60 }}
                animate={isCollectionsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -12, scale: 1.05 }}
                className="relative group overflow-hidden rounded-2xl shadow-xl cursor-pointer"
              >
                <Image 
                  src={item.img} 
                  alt={item.label} 
                  width={400} 
                  height={400} 
                  className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-center text-white">
                  <h3 className="text-xl md:text-2xl font-bold font-serif mb-3">{item.label}</h3>
                  <Link href={item.link}>
                    <motion.button 
                      whileHover={{ scale: 1.1 }} 
                      className="bg-[#bfa544] text-black font-bold px-8 py-3 rounded-full shadow-lg"
                    >
                      EXPLORE
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section ref={featuresRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-serif text-[#222] mb-4">
              Why Choose IVY GROUP
            </h2>
            <div className="flex items-center justify-center gap-6">
              <div className="h-px w-64 bg-[#bfa544]" />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
                title: "Premium Quality",
                description: "Exceptional craftsmanship with the finest materials and attention to detail"
              },
              {
                icon: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
                title: "Prime Locations",
                description: "Only the most prestigious neighborhoods in Nairobi's prime areas"
              },
              {
                icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z",
                title: "Smart Investment",
                description: "Properties designed for exceptional returns and long-term value"
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-gradient-to-br from-[#faf9f5] to-white rounded-2xl shadow-xl p-8 text-center group hover:shadow-2xl transition-all"
              >
                <svg className="w-14 h-14 text-[#bfa544] mb-6 mx-auto group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d={feature.icon} />
                </svg>
                <h3 className="text-xl font-bold font-serif text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section ref={testimonialsRef} className="py-20 bg-gradient-to-b from-[#f8f9f7] to-[#e9ede9]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-serif text-[#222] mb-4">
              What Our Clients Say
            </h2>
            <div className="flex items-center justify-center gap-6">
              <div className="h-px w-64 bg-[#bfa544]" />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "IVY GROUP transformed our vision into reality. The attention to detail and quality exceeded our expectations.",
                author: "Brad O.",
                role: "BlossomsIvy Investor",
                image: "/designs/cover.jpg"
              },
              {
                quote: "Professional from start to finish. Our investment in Luckinn Ivy has already shown remarkable appreciation.",
                author: "David K.",
                role: "Investor",
                image: "/designs/Luckinn.jpg"
              },
              {
                quote: "Living in Ivy Park feels like a permanent vacation. The amenities and community are exceptional.",
                author: "Erick M.",
                role: "Ivy Park Resident",
                image: "/designs/Exterior_07_IA.png"
              },
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-white rounded-2xl shadow-xl p-8 relative"
              >
                <div className="text-4xl text-[#bfa544] mb-4">"</div>
                <p className="text-gray-700 italic mb-6">{testimonial.quote}</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.author}
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.author}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG PREVIEW SECTION */}
      <section ref={blogRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold font-serif text-[#222] mb-2">
                Latest Insights
              </h2>
              <p className="text-gray-600">Expert perspectives on luxury living and real estate</p>
            </div>
            <Link
              href="/blog"
              className="text-[#bfa544] font-semibold hover:text-[#d4c07a] transition-colors"
            >
              View All →
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "The Future of Luxury Living in Nairobi",
                excerpt: "Trends shaping luxury real estate in 2024",
                category: "Trends",
                readTime: "5 min read",
                image: "/renders/251027_FINAL_Cinema-View 1_IVY PARK.jpg",
                link: "/blog/future-luxury-living-nairobi"
              },
              {
                title: "Investment Strategies for Real Estate",
                excerpt: "Maximizing returns in Nairobi's prime locations",
                category: "Investment",
                readTime: "7 min read",
                image: "/designs/Luckinn Ivy.jpg",
                link: "/blog/investment-strategies-real-estate"
              },
              {
                title: "Sustainable Luxury Living",
                excerpt: "Eco-friendly design meets premium comfort",
                category: "Design",
                readTime: "4 min read",
                image: "/designs/IMG-20250709-WA0080.jpg",
                link: "/blog/sustainable-luxury-living"
              },
            ].map((post, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="group cursor-pointer"
              >
                <Link href={post.link}>
                  <div className="relative h-64 rounded-2xl overflow-hidden mb-4">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#bfa544] text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-gray-900 mb-2 group-hover:text-[#bfa544] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{post.readTime}</span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* GET IN TOUCH SECTION */}
      <section className="py-28 bg-gradient-to-b from-[#f8f9f7] to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-serif text-[#222] mb-4">GET IN TOUCH</h2>
            <div className="flex items-center justify-center gap-6">
              <div className="h-px w-64 bg-[#bfa544]" />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {[
              { 
                icon: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z", 
                title: "EMAIL US", 
                detail: "sales@rsunproperty.net", 
                link: "mailto:sales@rsunproperty.net", 
                cta: "Send Email" 
              },
              { 
                icon: "M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57 1.66 0 3 .98 3 2.19v3.86c0 1.21-.98 2.19-2.19 2.19C8.66 24 2 17.34 2 9.81V5.94C2 4.73 2.98 3.75 4.19 3.75h3.86c1.21 0 2.19.98 2.19 2.19 0 1.24.2 2.45.57 3.57.12.35.03.75-.24 1.02l-2.2 2.2z", 
                title: "CALL US", 
                detail: "+254 799 008 564", 
                link: "tel:+254799008564", 
                cta: "Call Now" 
              },
              { 
                icon: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z", 
                title: "VISIT US", 
                detail: "Gatundu Road, Kileleshwa", 
                link: "https://maps.app.goo.gl/...", 
                cta: "View Map" 
              },
            ].map((card, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 40 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{ delay: i * 0.2 }} 
                whileHover={{ y: -10 }} 
                className="bg-gradient-to-br from-[#faf9f5] to-white rounded-3xl shadow-xl p-10 text-left group hover:shadow-2xl transition-all"
              >
                <svg className="w-14 h-14 text-[#bfa544] mb-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d={card.icon} />
                </svg>
                <h3 className="text-2xl font-bold font-serif text-gray-900 mb-3">{card.title}</h3>
                <p className="text-gray-600 mb-6">{card.detail}</p>
                <motion.a 
                  href={card.link} 
                  whileHover={{ scale: 1.05 }} 
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-[#bfa544] to-[#d4c07a] text-black font-bold py-3 px-6 rounded-full shadow-lg"
                >
                  {card.cta} <span>→</span>
                </motion.a>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            className="mt-20 max-w-5xl mx-auto"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8271820880486!2d36.78276647496567!3d-1.27713609871072!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f170056423b43%3A0xac4d412392285ae0!2sBLOSSOM%20IVY%20RESIDENCE!5e0!3m2!1sen!2ske!4v1758788884873!5m2!1sen!2ske"
              className="w-full h-96 rounded-3xl shadow-2xl border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="IVY GROUP Location"
            />
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="py-20 bg-gradient-to-r from-[#bfa544] to-[#d4c07a]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
            Ready to Find Your Dream Home?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Contact us today to schedule a private viewing or learn more about our exclusive properties
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/book-reservation"
              className="inline-block bg-white text-[#bfa544] px-10 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors shadow-2xl"
            >
              Book a Viewing
            </Link>
            <button
              onClick={() => setContactModalOpen(true)}
              className="inline-block border-2 border-white text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-colors"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* WHATSAPP FLOAT */}
      <motion.a
        href="https://wa.me/254799008564"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 group"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Chat with us on WhatsApp"
      >
        <div className="absolute -top-12 right-0 bg-[#25D366] text-white px-4 py-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition whitespace-nowrap text-sm font-medium">
          Chat with us!
        </div>
        <div className="bg-[#25D366] p-4 rounded-full shadow-2xl">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 0 01-1.51-5.265c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 0 02.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 0 0012.05 0C5.495 0 .016 5.473.014 11.985c0 2.086.56 4.122 1.622 5.9l-1.614 5.927 6.1-1.6a11.89 0 005.69 1.448c6.548 0 11.88-5.318 11.88-11.86 0-3.17-1.24-6.14-3.495-8.366" />
          </svg>
        </div>
      </motion.a>

      <ContactFormModal open={contactModalOpen} onClose={() => setContactModalOpen(false)} />
    </>
  );
}