"use client";
import { useState } from "react";
import Image from "next/image";

export default function GallerySection() {
  const images = [
    "/designs/IMG-20250709-WA0079.jpg",
    "/designs/IMG-20250709-WA0080.jpg",
    "/designs/IMG-20250709-WA0081.jpg",
    "/designs/IMG-20250709-WA0082.jpg",
    "/designs/IMG-20250709-WA0083.jpg",
    "/designs/IMG-20250709-WA0084.jpg",
    "/designs/IMG-20250709-WA0085.jpg",
    "/designs/IMG-20250709-WA0086.jpg",
    "/designs/IMG-20250709-WA0087.jpg",
    "/designs/IMG-20250709-WA0088.jpg",
    "/designs/IMG-20250709-WA0089.jpg",
    "/designs/IMG-20250709-WA0090.jpg",
  ];
  const groupSize = 3;

const groups: string[][] = [];
  for (let i = 0; i < images.length; i += groupSize) {
    groups.push(images.slice(i, i + groupSize));
  }
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalImg, setModalImg] = useState<string | null>(null);

  // Infinite scroll: move left/right by 1 group, but allow index to go beyond bounds
  const handlePrev = () => {
    setActiveIndex((prev) => prev - 1);
  };
  const handleNext = () => {
    setActiveIndex((prev) => prev + 1);
  };

  return (
    <section className="w-full flex flex-col items-center py-20 bg-white">
  <h2 className="text-3xl md:text-4xl font-sans font-thin text-gray-900 text-center mb-2">Gallery</h2>
  <p className="text-lg text-gray-900 text-center mb-12 max-w-2xl font-sans font-thin">
        Explore our stunning apartment renders and completed projects
      </p>
      <div className="relative w-full max-w-6xl h-[350px] flex items-center justify-center z-10 overflow-hidden">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-[#35521a] rounded-full shadow p-2 z-20 border border-[#35521a]"
          aria-label="Previous"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        {/* Slides */}
        <div
          className="flex w-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${((activeIndex % groups.length + groups.length) % groups.length) * 100}%)` }}
        >
          {/* Render 2 extra sets of groups before and after for seamless infinite scroll illusion */}
          {[...Array(3)].map((_, offset) =>
            groups.map((group, groupIdx) => {
              // Calculate a unique key for each virtual group
              const virtualIdx = (offset - 1) * groups.length + groupIdx;
            return (
              <div key={virtualIdx} className="flex w-full min-w-full h-[200px] md:h-[260px] lg:h-[300px]">
                {group.map((img, idx) => (
                  <div
                    key={img + '-' + virtualIdx}
                    className="relative group cursor-pointer flex-1 h-full"
                    onClick={() => setModalImg(img)}
                    style={{ margin: 0, padding: 0 }}
                  >
                    <Image
                      src={img}
                      alt={`Gallery ${groupIdx * groupSize + idx + 1}`}
                      fill
                      className={
                        "rounded-2xl shadow object-cover w-full h-full transition-all duration-300 group-hover:scale-105"
                      }
                      style={{ zIndex: 1, objectFit: 'cover' }}
                    />
                    <div className="absolute inset-0 transition-all duration-300 group-hover:bg-black/20 rounded-2xl" />
                  </div>
                ))}
              </div>
            );
            })
          )}
        </div>
        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-[#35521a] rounded-full shadow p-2 z-20 border border-[#35521a]"
          aria-label="Next"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
        {/* Modal for full screen image */}
        {modalImg && (
          <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 cursor-pointer"
            onClick={() => setModalImg(null)}
          >
            <Image src={modalImg} alt="Full Gallery" width={1200} height={900} className="max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl" />
          </div>
        )}
      </div>
      {/* Blur effect removed as requested */}
    </section>
  );
}
