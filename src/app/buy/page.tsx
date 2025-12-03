"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface Room {
  type: string;
  price: string;
}

interface Property {
  name: string;
  description: string;
  image: string;
  brochure: string;
  rooms: Room[];
}

const PropertyCard = ({ property, index }: { property: Property; index: number }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer group min-h-[500px] flex flex-col"
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
      <div className="md:flex flex-1">
        <motion.div
          className="md:w-1/2 relative overflow-hidden"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div className="absolute inset-0 bg-gradient-to-r from-[#bfa14a]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
          <motion.div
            initial={{ filter: "blur(10px)" }}
            animate={isInView ? { filter: "blur(0px)" } : { filter: "blur(10px)" }}
            transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
          >
            <Image
              src={property.image}
              alt={property.name}
              width={600}
              height={400}
              className="w-full h-64 md:h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </motion.div>
        </motion.div>

        <div className="md:w-1/2 p-8 flex flex-col justify-center flex-1">
          <motion.h3
            className="text-2xl font-bold font-serif text-gray-800 mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
          >
            {property.name}
          </motion.h3>

          <motion.p
            className="text-gray-600 mb-6"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
          >
            {property.description}
          </motion.p>

          <motion.div
            className="space-y-4 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: index * 0.2 + 0.6 }}
          >
            {property.rooms.map((room, roomIndex) => (
              <div key={roomIndex} className="flex justify-between items-center border-b border-gray-200 pb-2">
                <span className="font-semibold text-gray-800">{room.type}</span>
                <span className="text-gray-600">{room.price}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 mt-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: index * 0.2 + 0.7 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/contact"
                className="block bg-[#bfa14a] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#a68a3f] transition-all duration-300 text-center shadow-lg hover:shadow-xl"
              >
                Inquire Now
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <a
                href={property.brochure}
                download
                className="block bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-all duration-300 text-center shadow-lg hover:shadow-xl"
              >
                Download Brochure
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default function BuyPage() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundColor = useTransform(scrollYProgress, [0, 1], ["#fcfbf7", "#f9f6f0"]);

  const properties: Property[] = [
    {
      name: "Blossom Ivy",
      description: "A luxurious residential complex offering modern living spaces with premium amenities.",
      image: "/designs/Blossom Ivy.jpg",
      brochure: "/Brochure/BlossomsIvy_brochure.pdf",
      rooms: [
        { type: "1 Bedroom", price: "Sold Out" },
        { type: "2 Bedrooms", price: "Sold Out" },
        { type: "3 Bedrooms", price: "Starting from Ksh 19M" },
        { type: "4 Bedrooms", price: "Sold Out" },
      ],
    },
    {
      name: "Luckinn Ivy",
      description: "Elegant apartments designed for comfort and style, featuring state-of-the-art facilities.",
      image: "/designs/Luckinn Ivy.jpg",
      brochure: "/Brochure/LuckinnIvy_brochure.pdf",
      rooms: [
        { type: "1 Bedroom", price: "Sold Out" },
        { type: "2 Bedrooms", price: "Starting from Ksh 16.3M" },
        { type: "3 Bedrooms", price: "Starting from Ksh 19.3M" },
      ],
    },
    {
      name: "Ivy Park",
      description: "Spacious homes in a serene park setting, perfect for families seeking tranquility.",
      image: "/designs/Ivy Park.png",
      brochure: "/Brochure/IVY_Park.pdf",
      rooms: [
        { type: "1 Bedroom", price: "Starting from Ksh 6.82M" },
        { type: "2 Bedrooms", price: "Starting from Ksh 10.78M" },
        { type: "3 Bedrooms", price: "Starting from Ksh 15.62M" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#fcfbf7]">
      {/* HERO SECTION WITH NIGHT DRONE BACKGROUND */}
      <section
        className="relative py-32 md:py-40 bg-cover bg-center bg-no-repeat bg-fixed overflow-hidden"
        style={{
          backgroundImage: `url('/renders/251118_D01_Droneview-Night%20new_Ivy%20Park.jpg')`,
        }}
      >
        {/* Dark overlay for perfect text readability */}
        <div className="absolute inset-0 bg-black/70"></div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          {/* Optional: Keep the animated house icon above the text */}
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
                stroke="#bfa14a"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M100 50 L50 100 L150 100 Z"
                fill="none"
                stroke="#bfa14a"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold font-serif text-white drop-shadow-2xl mb-6 tracking-tight"
          >
            BUY YOUR DREAM HOME
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-lg md:text-xl lg:text-2xl text-gray-100 max-w-3xl mx-auto leading-relaxed drop-shadow-lg"
          >
            Discover exceptional properties from our premium collection. Choose from a variety of room types and find the perfect home for you.
          </motion.p>
        </div>
      </section>

      {/* PROPERTIES SECTION */}
      <motion.section ref={sectionRef} className="py-20 px-4" style={{ backgroundColor }}>
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold font-serif text-center text-gray-800 mb-16"
          >
            Our Properties
          </motion.h2>

          <div className="space-y-20">
            {properties.map((property, index) => (
              <PropertyCard key={index} property={property} index={index} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* CALL TO ACTION */}
      <section className="bg-[#bfa14a] py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-white mb-4">
            Ready to Find Your Perfect Home?
          </h2>
          <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto">
            Contact our team today to learn more about our properties and start your journey to homeownership.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-[#bfa14a] px-10 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
          >
            Get In Touch
          </Link>
        </div>
      </section>
    </div>
  );
}