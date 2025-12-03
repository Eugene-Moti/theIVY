"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Building, Users, Award, MapPin, Home, Shield, TrendingUp, Target, Heart, Star, Clock, CheckCircle } from "lucide-react";

// Gold Star Component - Consistent with Home Page
const GoldStar = () => (
  <svg className="w-12 h-12 md:w-14 md:h-14 text-[#bfa544]" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 .587l3.668 7.431 8.332 1.209-6 5.852 1.416 8.262L12 19.897l-7.416 3.896 1.416-8.262-6-5.852 8.332-1.209z" />
  </svg>
);

// Enhanced Carousel Component - Consistent with Home Page ProjectsCarousel
function ProjectsCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [windowWidth, setWindowWidth] = useState(1024);
  const totalSlides = 3;
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

  const projects = [
    {
      name: "BLOSSOM IVY",
      location: "Kileleshwa",
      description: "Elegant apartments offering tranquil living with urban convenience in prime Kileleshwa.",
      image: "/designs/IMG-20250709-WA0079.jpg",
      status: "current" as const,
    },
    {
      name: "LUCKINN IVY",
      location: "Westlands",
      description: "Contemporary living spaces in vibrant Westlands, designed for modern professionals.",
      image: "/designs/IMG-20250709-WA0081.jpg",
      status: "current" as const,
    },
    {
      name: "IVY PARK",
      location: "Kilimani",
      description: "Sophisticated residences combining luxury with accessibility in prestigious Kilimani.",
      image: "/designs/IMG-20250709-WA0082.jpg",
      status: "current" as const,
    },
  ];

  return (
    <div className="relative w-full" style={{ perspective: "1000px" }}>
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
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 flex items-center justify-center hover:bg-white/20 hover:scale-110 active:scale-95 transition-all"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 flex items-center justify-center hover:bg-white/20 hover:scale-110 active:scale-95 transition-all"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Track */}
      <div ref={trackRef} className="relative h-[500px] md:h-[620px] overflow-hidden" style={{ transformStyle: "preserve-3d" }}>
        {projects.map((project, index) => {
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
                    <motion.div
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-block mt-8 bg-[#bfa544] text-black font-bold px-12 py-5 rounded-full hover:bg-[#d4c07a] transition-all shadow-2xl text-lg tracking-wider"
                    >
                      Learn More
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Indicators */}
      <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={`w-12 h-1.5 rounded-full transition-all ${i === currentSlide ? "bg-[#bfa544] w-20" : "bg-white/30 hover:bg-white/60"}`}
          />
        ))}
      </div>
    </div>
  );
}

// Property Card Component - Consistent with Buy Page
const PropertyCard = ({ property, index }: { property: any; index: number }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      className="bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer group min-h-[400px] flex flex-col"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.6,
        delay: index * 0.2,
        ease: "easeOut",
      }}
      whileHover={{
        y: -10,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        transition: { duration: 0.3 },
      }}
    >
      <div className="relative overflow-hidden h-64">
        <motion.div
          initial={{ filter: "blur(10px)" }}
          animate={isInView ? { filter: "blur(0px)" } : { filter: "blur(10px)" }}
          transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
        >
          <Image
            src={property.image}
            alt={property.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <span className="bg-[#bfa544] text-white px-4 py-2 rounded-full text-sm font-semibold">
            {property.status}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-2xl font-bold font-serif text-gray-800 mb-2">
          {property.name}
        </h3>
        <div className="flex items-center gap-2 text-gray-600 mb-3">
          <MapPin className="w-4 h-4" />
          <span>{property.location}</span>
        </div>
        <p className="text-gray-600 mb-4 flex-1">
          {property.description}
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#bfa544] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#a68a3f] transition-all duration-300 text-center shadow-lg hover:shadow-xl"
        >
          View Details
        </motion.button>
      </div>
    </motion.div>
  );
};

export default function AboutPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0.7, 0.95]);

  // Stats data - consistent with Buy page styling
  const stats = [
    { icon: <Building className="w-8 h-8" />, value: "50+", label: "Projects Completed" },
    { icon: <Users className="w-8 h-8" />, value: "1000+", label: "Happy Families" },
    { icon: <Award className="w-8 h-8" />, value: "15+", label: "Years Excellence" },
    { icon: <Home className="w-8 h-8" />, value: "4", label: "Active Projects" },
  ];

  // Features data - consistent with Home page styling
  const features = [
    {
      icon: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z",
      title: "Premium Locations",
      description: "Only Nairobi's most prestigious neighborhoods"
    },
    {
      icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
      title: "Quality Assurance",
      description: "Premium finishes and master craftsmanship"
    },
    {
      icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z",
      title: "Smart Investment",
      description: "Properties that appreciate with time"
    },
  ];

  // Values data
  const values = [
    { icon: <Star className="w-12 h-12" />, title: "Excellence", description: "We pursue perfection in every detail — from concept to completion." },
    { icon: <Shield className="w-12 h-12" />, title: "Integrity", description: "Transparency and honesty form the foundation of everything we do." },
    { icon: <TrendingUp className="w-12 h-12" />, title: "Innovation", description: "We embrace cutting-edge design and technology to shape tomorrow's living." },
  ];

  // Properties data for property cards
  const properties = [
    {
      name: "Blossom Ivy",
      location: "Kileleshwa",
      description: "Luxurious residential complex with modern living spaces and premium amenities.",
      image: "/designs/Blossom Ivy.jpg",
      status: "Current"
    },
    {
      name: "Luckinn Ivy",
      location: "Westlands",
      description: "Elegant apartments designed for comfort and style with state-of-the-art facilities.",
      image: "/designs/Luckinn Ivy.jpg",
      status: "Current"
    },
    {
      name: "Ivy Park",
      location: "Kilimani",
      description: "Spacious homes in a serene park setting, perfect for families seeking tranquility.",
      image: "/designs/Ivy Park.png",
      status: "Current"
    },
  ];

  return (
    <>
      {/* HERO SECTION - Consistent with Buy Page */}
      <section ref={heroRef} className="relative min-h-screen overflow-hidden">
        <motion.div 
          style={{ y: yBg, scale: scaleBg }} 
          className="absolute inset-0 -z-10"
        >
          <Image
            src="/renders/251027_FINAL_Cinema-View 1_IVY PARK.jpg"
            alt="IVY PARK – Signature Living"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>

        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-black/70"
        />

        {/* Hero Content - Consistent with Home Page */}
        <div className="relative z-10 flex items-center justify-center min-h-screen px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="relative max-w-6xl"
          >
            {/* Optional decorative house icon from Buy page */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mb-10"
            >
              <svg width="120" height="90" viewBox="0 0 200 150" className="mx-auto" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M50 100 L50 130 L150 130 L150 100 L100 50 Z M70 130 L70 110 L90 110 L90 130 Z M110 130 L110 110 L130 110 L130 130 Z"
                  fill="none"
                  stroke="#bfa544"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M100 50 L50 100 L150 100 Z"
                  fill="none"
                  stroke="#bfa544"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-serif text-white drop-shadow-2xl mb-6 tracking-tight">
              ABOUT <span className="text-[#bfa544]">IVY GROUP</span>
            </h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-lg md:text-xl lg:text-2xl text-gray-100 max-w-3xl mx-auto leading-relaxed drop-shadow-lg mb-10"
            >
              Crafting Nairobi's most coveted addresses with unparalleled luxury and sophistication since 2010
            </motion.p>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <motion.a
                href="/buy"
                whileHover={{ scale: 1.08, y: -4 }}
                whileTap={{ scale: 0.95 }}
                className="group relative overflow-hidden rounded-full px-10 py-5 text-lg md:text-xl font-medium text-white border-2 border-white/70 backdrop-blur-md transition-all duration-500 hover:border-[#bfa544] hover:bg-white/10"
              >
                <span className="relative z-10">View Properties</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#bfa544]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.08, y: -4 }}
                whileTap={{ scale: 0.95 }}
                className="group relative overflow-hidden rounded-full px-10 py-5 text-lg md:text-xl font-medium text-white border-2 border-[#bfa544] bg-[#bfa544]/20 backdrop-blur-md transition-all duration-500 hover:bg-[#bfa544]/30"
              >
                <span className="relative z-10">Get In Touch</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#bfa544]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* OUR STORY SECTION */}
      <section className="py-32 bg-gradient-to-b from-[#f8f9f7] to-[#e9ede9]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold font-serif text-[#222] mb-4"
            >
              OUR STORY
            </motion.h2>
            <div className="flex items-center justify-center gap-6">
              <motion.div 
                initial={{ width: 0 }} 
                whileInView={{ width: 120 }} 
                transition={{ delay: 0.4 }}
                className="h-0.5 bg-[#bfa544]" 
              />
              <GoldStar />
              <motion.div 
                initial={{ width: 0 }} 
                whileInView={{ width: 120 }} 
                transition={{ delay: 0.4 }}
                className="h-0.5 bg-[#bfa544]" 
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className="space-y-6 text-lg leading-relaxed text-gray-700"
            >
              <p className="text-2xl text-[#bfa544] font-serif italic mb-8">
                "Building not just homes, but legacies."
              </p>
              <p>
                <span className="font-bold text-[#222]">IVY GROUP</span> stands as Kenya's premier real estate and property development company, specializing in luxury residences and modern lifestyle spaces that redefine urban living.
              </p>
              <p>
                With over <span className="text-[#bfa544] font-bold text-xl">15 years of excellence</span>, we have delivered more than <span className="text-[#bfa544] font-bold text-xl">50 landmark projects</span> and welcomed over <span className="text-[#bfa544] font-bold text-xl">1,000 families</span> into homes that define legacy and sophistication.
              </p>
              <p>
                From exclusive apartments in prime Nairobi locations to bespoke real estate solutions, we have built our reputation on professionalism, integrity, and an unwavering commitment to customer satisfaction.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, type: "spring" }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/designs/IMG-20250709-WA0080.jpg"
                  alt="IVY GROUP Legacy"
                  width={800}
                  height={600}
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                {/* Award Badge - Consistent with Buy page styling */}
                <div className="absolute top-8 right-8 bg-gradient-to-br from-[#bfa544] to-[#d4c07a] rounded-2xl p-6 text-center shadow-2xl">
                  <Award className="w-8 h-8 text-white mx-auto mb-2" />
                  <div className="text-white font-bold">Award-Winning</div>
                  <div className="text-sm text-white/90">Developer</div>
                </div>
                
                <div className="absolute bottom-8 left-8 text-white max-w-md">
                  <p className="text-4xl font-serif font-bold mb-4">Redefining Luxury Living</p>
                  <p className="text-lg opacity-90">Where exceptional design meets timeless elegance</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats Section - Consistent with Buy page card styling */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-xl p-8 text-center group hover:shadow-2xl transition-all"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-2xl bg-[#bfa544]/10 text-[#bfa544] group-hover:bg-gradient-to-br group-hover:from-[#bfa544] group-hover:to-[#d4c07a] group-hover:text-white transition-all duration-500">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold text-[#222] mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FLAGSHIP PROJECTS - Enhanced Carousel */}
      <section className="relative py-32 md:py-44 text-white overflow-hidden">
        {/* Background - Consistent with Home Page Carousel */}
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
          <div className="text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-semi-bold tracking-wider text-[#bfa544] font-serif drop-shadow-2xl"
            >
              OUR FLAGSHIP PROJECTS
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center gap-8 mt-8"
            >
              <div className="h-px w-48 bg-[#bfa544]/70" />
              <GoldStar />
              <div className="h-px w-48 bg-[#bfa544]/70" />
            </motion.div>
            <p className="mt-10 text-xl text-gray-100 max-w-3xl mx-auto">
              Discover our curated selection of iconic developments, each representing the pinnacle of luxury living in Nairobi.
            </p>
          </div>

          {/* Carousel */}
          <ProjectsCarousel />
        </div>
      </section>

      {/* WHY CHOOSE US - Consistent with Home Page Features */}
      <section className="py-28 bg-white">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-[#222] mb-4">WHY CHOOSE IVY GROUP</h2>
          <div className="flex items-center justify-center gap-6">
            <div className="h-px w-32 bg-[#bfa544]" />
            <GoldStar />
            <div className="h-px w-32 bg-[#bfa544]" />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto px-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ y: -10 }}
              className="bg-gradient-to-br from-[#faf9f5] to-white rounded-3xl shadow-xl p-10 text-left group hover:shadow-2xl transition-all"
            >
              <svg className="w-14 h-14 text-[#bfa544] mb-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d={feature.icon} />
              </svg>
              <h3 className="text-2xl font-bold font-serif text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-32 bg-gradient-to-b from-[#f8f9f7] to-[#e9ede9]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Mission - Consistent with Buy page card styling */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="bg-white rounded-3xl shadow-xl p-12 border border-[#bfa544]/10">
                <div className="flex items-center gap-4 mb-8">
                  <Target className="w-10 h-10 text-[#bfa544]" />
                  <h3 className="text-4xl md:text-5xl font-serif font-bold text-[#222]">
                    Our Mission
                  </h3>
                </div>
                <p className="text-xl text-gray-700 leading-relaxed">
                  To deliver exceptional real estate solutions that exceed expectations through innovative design, superior craftsmanship, and personalized service — creating homes that are both luxurious sanctuaries and sound long-term investments.
                </p>
                
                <div className="mt-12 pt-8 border-t border-[#bfa544]/20">
                  <div className="flex items-center gap-6">
                    <div className="text-3xl font-bold text-[#bfa544]">01</div>
                    <p className="text-gray-600">
                      Elevating living standards through architectural excellence
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Vision - Consistent with Buy page card styling */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative group"
            >
              <div className="bg-gradient-to-br from-[#bfa544] to-[#d4c07a] rounded-3xl shadow-xl p-12 text-black">
                <div className="flex items-center gap-4 mb-8">
                  <Heart className="w-10 h-10 text-black" />
                  <h3 className="text-4xl md:text-5xl font-serif font-bold">
                    Our Vision
                  </h3>
                </div>
                <p className="text-xl leading-relaxed font-medium">
                  To be Kenya's most trusted and innovative real estate developer, setting the gold standard for luxury living while shaping sustainable, iconic communities for generations to come.
                </p>
                
                <div className="mt-12 pt-8 border-t border-black/20">
                  <div className="flex items-center gap-6">
                    <div className="text-3xl font-bold text-black">02</div>
                    <p className="text-black/80">
                      Building timeless communities that inspire future generations
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* OUR VALUES - Property Cards Style */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold font-serif text-[#222] mb-4">OUR CORE VALUES</h2>
            <div className="flex items-center justify-center gap-6">
              <div className="h-px w-32 bg-[#bfa544]" />
              <GoldStar />
              <div className="h-px w-32 bg-[#bfa544]" />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <div className="bg-gradient-to-br from-[#faf9f5] to-white rounded-3xl shadow-xl p-12 group-hover:shadow-2xl transition-all duration-500 border border-[#bfa544]/10">
                  <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#bfa544]/10 to-[#bfa544]/5 text-[#bfa544] group-hover:bg-gradient-to-br group-hover:from-[#bfa544] group-hover:to-[#d4c07a] group-hover:text-white transition-all duration-500">
                    {value.icon}
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-[#222] mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ACTIVE PROJECTS - Property Cards Grid */}
      <section className="py-32 bg-gradient-to-b from-[#f8f9f7] to-[#e9ede9]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold font-serif text-[#222] mb-4"
            >
              OUR ACTIVE PROJECTS
            </motion.h2>
            <div className="flex items-center justify-center gap-6">
              <motion.div 
                initial={{ width: 0 }} 
                whileInView={{ width: 120 }} 
                transition={{ delay: 0.4 }}
                className="h-0.5 bg-[#bfa544]" 
              />
              <GoldStar />
              <motion.div 
                initial={{ width: 0 }} 
                whileInView={{ width: 120 }} 
                transition={{ delay: 0.4 }}
                className="h-0.5 bg-[#bfa544]" 
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {properties.map((property, index) => (
              <PropertyCard key={index} property={property} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION - Consistent with Buy Page */}
      <section className="bg-[#bfa544] py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-white mb-4">
            Ready to Be Part of Our Legacy?
          </h2>
          <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto">
            Join the exclusive community of discerning homeowners who have chosen IVY GROUP for their perfect sanctuary.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/buy"
              className="inline-block bg-white text-[#bfa544] px-10 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              View Properties
            </Link>
            <Link
              href="/contact"
              className="inline-block border-2 border-white text-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}