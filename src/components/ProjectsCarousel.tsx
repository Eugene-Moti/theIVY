"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useAnimation, PanInfo } from 'framer-motion';
import Image from 'next/image';

interface Project {
  name: string;
  location: string;
  description: string;
  image: string;
  link: string;
  bgClass: string;
  isPrevious: boolean;
}

interface ProjectsCarouselProps {
  projects: Project[];
}

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  return (
    <motion.div
      className={`relative group rounded-2xl shadow-lg p-6 flex flex-col items-center w-[340px] xl:w-[370px] cursor-pointer overflow-hidden min-h-[400px] ${project.isPrevious
        ? 'bg-[#f0f0f0] border-2 border-[#e5d7a3]'
        : 'bg-[#dcd6cc]'
        }`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      whileHover={{
        y: -10,
        scale: 1.02,
        boxShadow: "0 20px 40px rgba(191, 161, 74, 0.3)",
        transition: { duration: 0.3, type: "spring", stiffness: 300 }
      }}
    >
      {/* Previous Project Badge */}
      {project.isPrevious && (
        <div className="absolute top-4 right-4 bg-[#e5d7a3] text-black px-3 py-1 rounded-full text-xs font-semibold z-20 shadow-md">
          PREVIOUS PROJECT
        </div>
      )}

      {/* Hover background overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0 bg-gradient-to-t from-black/20 to-transparent" />

      <div className="relative z-10 w-full h-36 mb-4 overflow-hidden rounded-xl">
        <Image
          src={project.image}
          alt={project.name}
          width={400}
          height={144}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <h3 className={`text-2xl font-serif font-bold transition-colors duration-300 mb-1 relative z-10 text-center ${project.isPrevious
        ? 'text-[#8b7355] group-hover:text-white'
        : 'text-black group-hover:text-white'
        }`}>
        {project.name}
      </h3>

      <div className={`transition-colors duration-300 font-serif font-semibold mb-2 relative z-10 text-center ${project.isPrevious
        ? 'text-[#8b7355]/80 group-hover:text-white/90'
        : 'text-black/80 group-hover:text-white/90'
        }`}>
        {project.location}
      </div>

      <p className={`transition-colors duration-300 font-serif font-medium mb-6 relative z-10 text-center flex-grow ${project.isPrevious
        ? 'text-[#8b7355] group-hover:text-white/90'
        : 'text-black group-hover:text-white/90'
        }`}>
        {project.description}
      </p>

      <div className="relative z-10 w-full flex justify-center mt-auto">
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full py-2.5 rounded-full font-serif font-semibold shadow-lg transition text-base tracking-wide text-center ${project.isPrevious
            ? 'bg-[#e5d7a3] text-[#8b7355] hover:bg-[#d6c07a] group-hover:bg-white group-hover:text-[#8b7355]'
            : 'bg-[#f5f2ea] text-black hover:bg-[#c8b05a] group-hover:bg-white group-hover:text-black'
            }`}
        >
          EXPLORE {project.name}
        </a>
      </div>
    </motion.div>
  );
};

export default function ProjectsCarousel({ projects }: ProjectsCarouselProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const controls = useAnimation();

  // Duplicate projects for infinite scroll effect
  const duplicatedProjects = [...projects, ...projects, ...projects];

  // Auto-scroll functionality
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 4000); // Auto-scroll every 4 seconds

    return () => clearInterval(interval);
  }, [isHovered, projects.length]);

  // Update carousel position based on currentIndex
  useEffect(() => {
    const cardWidth = 380; // Approximate card width + gap
    const newX = -currentIndex * cardWidth;
    controls.start({ x: newX, transition: { type: "spring", stiffness: 100, damping: 20 } });
  }, [currentIndex, controls]);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x > swipeThreshold) {
      // Swipe right
      setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    } else if (info.offset.x < -swipeThreshold) {
      // Swipe left
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }
  };

  const scrollLeft = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const scrollRight = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl text-center mb-2 ivy-logo-text">
          OUR PREVIOUS PROJECTS
        </h2>
        <div className="flex items-center justify-center w-full mb-8">
          <div className="h-0.5 w-32 bg-[#e5d7a3] mr-2" />
          <span className="text-[#e5d7a3] text-2xl">★</span>
          <div className="h-0.5 w-32 bg-[#e5d7a3] ml-2" />
        </div>
        <p className="text-lg text-gray-100 text-center max-w-2xl mx-auto font-serif font-medium">
          Exceptional developments across Nairobi&apos;s most prestigious neighborhoods. Discover our current flagship projects and explore our legacy of completed developments.
        </p>
      </div>

      {/* Carousel Container */}
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Navigation Arrows */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-all duration-300 hover:scale-110 border border-[#e5d7a3]"
          aria-label="Previous projects"
        >
          <svg className="w-6 h-6 text-[#CBA135]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-all duration-300 hover:scale-110 border border-[#e5d7a3]"
          aria-label="Next projects"
        >
          <svg className="w-6 h-6 text-[#CBA135]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Carousel Track */}
        <motion.div
          ref={carouselRef}
          className="flex gap-6 cursor-grab active:cursor-grabbing"
          animate={controls}
          drag="x"
          dragConstraints={{ left: -1000, right: 1000 }}
          onDragEnd={handleDragEnd}
          style={{ x }}
        >
          {duplicatedProjects.map((project, index) => (
            <div key={`${project.name}-${index}`} className="flex-shrink-0">
              <ProjectCard project={project} index={index % projects.length} />
            </div>
          ))}
        </motion.div>

        {/* Scroll Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                ? 'bg-[#e5d7a3] scale-125'
                : 'bg-gray-300 hover:bg-[#e5d7a3]/50'
                }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Mobile-specific styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          .carousel-track {
            gap: 1rem;
          }
          .project-card {
            width: 280px;
          }
        }
      `}</style>
    </div>
  );
}
