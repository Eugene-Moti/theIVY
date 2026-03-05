"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { PROPERTIES, Property } from "@/lib/properties";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const } }
};

// 3D CINEMATIC CAROUSEL
function ProjectsCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [windowWidth, setWindowWidth] = useState(1024);
  const totalSlides = PROPERTIES.length;
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
    }, 6000);
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
          className="object-cover brightness-[0.65] scale-110 md:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#bfa544]/10 via-transparent to-[#bfa544]/5" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-20"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-bold tracking-wider text-[#bfa544] font-serif drop-shadow-2xl"
          >
            OUR PROJECTS
          </motion.h2>
          <motion.div
            variants={scaleIn}
            className="flex items-center justify-center gap-8 mt-8"
          >
            <div className="h-px w-32 md:w-96 bg-[#bfa544]/70" />
          </motion.div>
        </motion.div>

        {/* 3D CAROUSEL */}
        <div className="relative" style={{ perspective: "1000px" }}>
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 rounded-full overflow-hidden z-20">
            <motion.div
              className="h-full bg-gradient-to-r from-[#bfa544] to-[#d4c07a]"
              animate={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] as const }}
            />
          </div>

          {/* Nav Buttons */}
          <motion.button
            type="button"
            onClick={prevSlide}
            aria-label="Previous project"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 flex items-center justify-center hover:bg-white/20 hover:scale-110 active:scale-95 transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
          <motion.button
            type="button"
            onClick={nextSlide}
            aria-label="Next project"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 flex items-center justify-center hover:bg-white/20 hover:scale-110 active:scale-95 transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>

          {/* Track */}
          <div ref={trackRef} className="relative h-[500px] md:h-[620px] overflow-hidden" style={{ transformStyle: "preserve-3d" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                className="absolute inset-0"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              >
                <div className="w-full h-full p-6 md:p-10">
                  <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl group">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6 }}
                      className="w-full h-full"
                    >
                      <Image
                        src={PROPERTIES[currentSlide].image}
                        alt={PROPERTIES[currentSlide].name}
                        fill
                        className="object-cover"
                        priority
                      />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-br from-[#bfa544]/20 via-transparent to-black/60" />

                    <div className="absolute inset-x-0 bottom-0 p-10 md:p-14 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                      <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl md:text-6xl font-bold font-serif text-white drop-shadow-2xl leading-tight"
                      >
                        {PROPERTIES[currentSlide].name}
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-[#bfa544] text-2xl md:text-3xl font-medium tracking-wider mt-2"
                      >
                        {PROPERTIES[currentSlide].locationDetail}
                      </motion.p>
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-gray-100 text-base md:text-lg leading-relaxed mt-4 max-w-2xl opacity-95"
                      >
                        {PROPERTIES[currentSlide].description}
                      </motion.p>
                      
                      {/* Quick Stats */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-wrap gap-6 mt-6"
                      >
                        <div className="glass-card rounded-lg px-4 py-2">
                          <span className="text-white/70 text-sm">Blocks</span>
                          <p className="text-white font-bold text-lg">{PROPERTIES[currentSlide].blocks}</p>
                        </div>
                        <div className="glass-card rounded-lg px-4 py-2">
                          <span className="text-white/70 text-sm">Floors</span>
                          <p className="text-white font-bold text-lg">{PROPERTIES[currentSlide].floors}</p>
                        </div>
                        <div className="glass-card rounded-lg px-4 py-2">
                          <span className="text-white/70 text-sm">Units</span>
                          <p className="text-white font-bold text-lg">{PROPERTIES[currentSlide].units}</p>
                        </div>
                        <div className="glass-card rounded-lg px-4 py-2">
                          <span className="text-white/70 text-sm">Completion</span>
                          <p className="text-[#bfa544] font-bold text-lg">{PROPERTIES[currentSlide].completionDate}</p>
                        </div>
                      </motion.div>

                      <motion.a
                        href="/buy"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block mt-8 bg-[#bfa544] text-black font-bold px-12 py-5 rounded-full hover:bg-[#d4c07a] transition-all shadow-2xl text-lg tracking-wider shine-effect btn-glow"
                      >
                        View Project
                      </motion.a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Indicators */}
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex gap-3 z-20">
            {PROPERTIES.map((_, i) => (
              <motion.button
                key={i}
                type="button"
                onClick={() => goToSlide(i)}
                aria-label={`Go to project ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${i === currentSlide ? "bg-[#bfa544] w-20" : "bg-white/30 hover:bg-white/60 w-12"}`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Stats Counter Component
function StatsSection() {
  const stats = [
    { value: "1000+", label: "Units Delivered" },
    { value: "3", label: "Active Projects" },
    { value: "3", label: "Prime Locations" },
    { value: "2026", label: "Next Completion" },
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-[#151c27] to-[#1a2836]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-[#bfa544] font-serif mb-2">
                {stat.value}
              </div>
              <div className="text-white/70 text-sm md:text-base">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Apartment Collections Section
function ApartmentCollections() {
  const collections = [
    { img: "/designs/IMG-20250709-WA0082.jpg", label: "1 BEDROOM", size: "62-90 sqm", price: "From Ksh 6.82M" },
    { img: "/designs/IMG-20250709-WA0083.jpg", label: "2 BEDROOM", size: "73-166 sqm", price: "From Ksh 10.78M" },
    { img: "/designs/IMG-20250709-WA0084.jpg", label: "3 BEDROOM", size: "142-236 sqm", price: "From Ksh 15.62M" },
    { img: "/designs/IMG-20250709-WA0085.jpg", label: "4 BEDROOM", size: "251-260 sqm", price: "Sold Out" },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-[#f8f9f7] to-[#e9ede9]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#222] font-serif mb-4">
            APARTMENT COLLECTIONS
          </h2>
          <div className="flex items-center justify-center gap-6">
            <motion.div initial={{ width: 0 }} whileInView={{ width: 240 }} transition={{ delay: 0.4 }} className="h-0.5 bg-[#bfa544]" />
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {collections.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -12, scale: 1.02 }}
              className="relative group overflow-hidden rounded-2xl shadow-xl cursor-pointer card-shadow"
            >
              <div className="img-zoom-container">
                <Image
                  src={item.img}
                  alt={item.label}
                  width={400}
                  height={400}
                  className="w-full h-80 object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-center text-white">
                <h3 className="text-xl md:text-2xl font-bold font-serif mb-1">{item.label}</h3>
                <p className="text-white/80 text-sm mb-2">{item.size}</p>
                <p className={`text-sm font-semibold ${item.price === "Sold Out" ? "text-red-400" : "text-[#bfa544]"}`}>
                  {item.price}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Amenities Section
function AmenitiesSection() {
  const amenities = [
    { icon: "🏊", title: "Heated Pools", desc: "Indoor & outdoor swimming facilities" },
    { icon: "🏋️", title: "Fitness Centers", desc: "Fully equipped gyms & yoga studios" },
    { icon: "☕", title: "Coffee Bars", desc: "Premium咖啡 & relaxation spaces" },
    { icon: "👶", title: "Kids Play Areas", desc: "Indoor & outdoor play zones" },
    { icon: "💼", title: "Co-working Spaces", desc: "Modern business amenities" },
    { icon: "🌿", title: "Rooftop Gardens", desc: "Landscaped green spaces" },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-[#222] mb-4">
            PREMIUM AMENITIES
          </h2>
          <div className="flex items-center justify-center gap-6">
            <div className="h-px w-32 bg-[#bfa544]" />
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {amenities.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-card rounded-2xl p-8 text-center hover-lift"
            >
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold font-serif text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Why Choose Us Section
function WhyChooseUs() {
  const features = [
    {
      title: "Prime Locations",
      description: "Strategically positioned in Nairobi's most sought-after neighborhoods",
      icon: "📍"
    },
    {
      title: "Modern Design",
      description: "Contemporary architecture with premium finishes and smart home features",
      icon: "🏗️"
    },
    {
      title: "Flexible Payments",
      description: "20% deposit with balance spread through construction or mortgage options",
      icon: "💳"
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-[#f8f9f7] to-[#e9ede9]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-[#222] mb-4">
            Why Choose IVY GROUP
          </h2>
          <div className="flex items-center justify-center gap-6">
            <div className="h-px w-32 bg-[#bfa544]" />
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl shadow-xl p-8 text-center group hover:shadow-2xl transition-all"
            >
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">{feature.icon}</div>
              <h3 className="text-xl font-bold font-serif text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Contact Form Modal
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
  const opacityOverlay = useTransform(scrollYProgress, [0, 0.7], [0.5, 0.8]);

  return (
    <>
      {/* HERO SECTION */}
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

        <motion.div style={{ opacity: opacityOverlay }} className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />

        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="max-w-6xl mx-auto space-y-10"
          >
            {/* Brand Name */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-serif text-white drop-shadow-2xl">
                <span className="gradient-text">IVY GROUP</span>
              </h1>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-xl md:text-2xl text-white max-w-3xl mx-auto leading-relaxed drop-shadow-lg font-medium"
            >
              Experience luxury living in Nairobi's most prestigious locations.
              Modern apartments with premium amenities and flexible payment plans.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              {[
                { href: "/buy", text: "Explore Properties", primary: true },
                { href: "/book-reservation", text: "Book Viewing", primary: false },
              ].map((btn, i) => (
                <motion.a
                  key={i}
                  href={btn.href}
                  whileHover={{ scale: 1.08, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  className={`group relative overflow-hidden rounded-full px-10 py-5 text-lg md:text-xl font-medium transition-all duration-500 ${
                    btn.primary
                      ? "bg-[#bfa544] text-black hover:bg-[#d4c07a] shadow-2xl btn-glow"
                      : "border-2 border-white/70 text-white backdrop-blur-md hover:border-[#bfa544] hover:bg-white/10"
                  }`}
                >
                  <span className="relative z-10">{btn.text}</span>
                  {btn.primary && (
                    <div className="absolute inset-0 bg-gradient-to-r from-[#bfa544]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex flex-col items-center gap-2 text-white/70"
            >
              <span className="text-sm">Scroll to explore</span>
              <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                <motion.div className="w-1 h-3 bg-white rounded-full mt-2" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <ProjectsCarousel />
      <StatsSection />
      <ApartmentCollections />
      <AmenitiesSection />
      <WhyChooseUs />

      {/* GET IN TOUCH SECTION */}
      <section className="py-28 bg-gradient-to-b from-[#f8f9f7] to-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-serif text-[#222] mb-4">GET IN TOUCH</h2>
            <div className="flex items-center justify-center gap-6">
              <div className="h-px w-32 bg-[#bfa544]" />
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {[
              {
                icon: "✉️",
                title: "EMAIL US",
                detail: "sales@rsunproperty.net",
                link: "mailto:sales@rsunproperty.net",
                cta: "Send Email"
              },
              {
                icon: "📞",
                title: "CALL US",
                detail: "+254 799 008 564",
                link: "tel:+254799008564",
                cta: "Call Now"
              },
              {
                icon: "📍",
                title: "VISIT US",
                detail: "Gatundu Road, Kileleshwa",
                link: "#",
                cta: "View Map"
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-3xl shadow-xl p-10 text-center group hover:shadow-2xl transition-all card-shadow"
              >
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">{card.icon}</div>
                <h3 className="text-2xl font-bold font-serif text-gray-900 mb-3">{card.title}</h3>
                <p className="text-gray-600 mb-6">{card.detail}</p>
                <motion.a
                  href={card.link}
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-[#bfa544] to-[#d4c07a] text-black font-bold py-3 px-6 rounded-full shadow-lg hover-lift"
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
      <section className="py-20 bg-gradient-to-r from-[#151c27] to-[#1a2836]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-bold text-white mb-6"
          >
            Ready to Find Your Dream Home?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/90 mb-10 max-w-2xl mx-auto"
          >
            Contact us today to schedule a private viewing or learn more about our exclusive properties
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Link
              href="/book-reservation"
              className="inline-block bg-[#bfa544] text-black px-10 py-4 rounded-full font-semibold text-lg hover:bg-[#d4c07a] transition-colors shadow-2xl hover-lift"
            >
              Book a Viewing
            </Link>
            <button
              onClick={() => setContactModalOpen(true)}
              className="inline-block border-2 border-white text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-colors"
            >
              Contact Us
            </button>
          </motion.div>
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
        <div className="bg-[#25D366] p-4 rounded-full shadow-2xl hover-lift">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 0 01-1.51-5.265c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 0 02.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 0 0012.05 0C5.495 0 .016 5.473.014 11.985c0 2.086.56 4.122 1.622 5.9l-1.614 5.927 6.1-1.6a11.89 0 005.69 1.448c6.548 0 11.88-5.318 11.88-11.86 0-3.17-1.24-6.14-3.495-8.366" />
          </svg>
        </div>
      </motion.a>

      <ContactFormModal open={contactModalOpen} onClose={() => setContactModalOpen(false)} />
    </>
  );
}

