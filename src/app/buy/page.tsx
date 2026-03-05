"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { PROPERTIES } from "@/lib/properties";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] } }
};

export default function BuyPage() {
  const sectionRef = useRef(null);

  return (
    <div className="min-h-screen bg-[#fcfbf7]">
      {/* HERO SECTION */}
      <section
        className="relative py-32 md:py-40 bg-cover bg-center bg-no-repeat bg-fixed overflow-hidden"
        style={{
          backgroundImage: `url('/renders/251118_D01_Droneview-Night%20new_Ivy%20Park.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
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
      <motion.section ref={sectionRef} className="py-20 px-4">
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
            {PROPERTIES.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer group hover:shadow-2xl transition-all"
              >
                <div className="md:flex">
                  <motion.div
                    className="md:w-1/2 relative overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#bfa14a]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                    <div className="img-zoom-container h-64 md:h-80">
                      <Image
                        src={property.image}
                        alt={property.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </motion.div>

                  <div className="md:w-1/2 p-8 flex flex-col justify-center flex-1">
                    <motion.h3
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="text-2xl md:text-3xl font-bold font-serif text-gray-800 mb-2"
                    >
                      {property.name}
                    </motion.h3>
                    
                    <p className="text-[#bfa544] font-medium mb-4">{property.locationDetail}</p>

                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      className="text-gray-600 mb-6"
                    >
                      {property.description}
                    </motion.p>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="glass-card rounded-lg px-3 py-2 text-center">
                        <span className="text-gray-500 text-xs">Blocks</span>
                        <p className="text-gray-900 font-bold">{property.blocks}</p>
                      </div>
                      <div className="glass-card rounded-lg px-3 py-2 text-center">
                        <span className="text-gray-500 text-xs">Floors</span>
                        <p className="text-gray-900 font-bold">{property.floors}</p>
                      </div>
                      <div className="glass-card rounded-lg px-3 py-2 text-center">
                        <span className="text-gray-500 text-xs">Units</span>
                        <p className="text-gray-900 font-bold">{property.units}</p>
                      </div>
                    </div>

                    {/* Unit Options */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="space-y-3 mb-6"
                    >
                      <h4 className="font-semibold text-gray-800">Available Units</h4>
                      {property.unitsList.map((unit, unitIndex) => (
                        <div key={unitIndex} className="flex justify-between items-center border-b border-gray-100 pb-2">
                          <div>
                            <span className="font-medium text-gray-800">{unit.type}</span>
                            <span className="text-gray-500 text-sm ml-2">({unit.size})</span>
                          </div>
                          <span className={`font-semibold ${unit.status === 'available' ? 'text-[#bfa544]' : 'text-red-400'}`}>
                            {unit.price}
                          </span>
                        </div>
                      ))}
                    </motion.div>

                    {/* Completion Date */}
                    <p className="text-sm text-gray-500 mb-6">
                      <span className="font-semibold">Completion:</span> {property.completionDate}
                    </p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="flex flex-col sm:flex-row gap-4 mt-auto"
                    >
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link
                          href="/contact"
                          className="block bg-[#bfa14a] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#a68a3f] transition-all duration-300 text-center shadow-lg hover:shadow-xl"
                        >
                          Inquire Now
                        </Link>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link
                          href="/book-reservation"
                          className="block bg-gray-800 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-700 transition-all duration-300 text-center shadow-lg hover:shadow-xl"
                        >
                          Book Viewing
                        </Link>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>

                {/* Amenities */}
                <div className="border-t border-gray-100 p-8 bg-gray-50">
                  <h4 className="font-semibold text-gray-800 mb-4">Key Amenities</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {property.amenities.slice(0, 6).map((amenity, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="w-2 h-2 rounded-full bg-[#bfa544]"></span>
                        {amenity}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* PAYMENT PLANS SECTION */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#151c27] to-[#1a2836]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold font-serif text-white mb-8"
          >
            Flexible Payment Plans
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Deposit Plan",
                description: "20% deposit within 7 days of booking",
                detail: "Balance spread through construction period"
              },
              {
                title: "Cash Buyer",
                description: "Pay full balance within 30 days",
                detail: "Get discounted price"
              },
              {
                title: "Mortgage",
                description: "20% deposit required",
                detail: "Bank financing on completion"
              }
            ].map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-2xl p-6 text-center hover-lift"
              >
                <h3 className="text-xl font-bold text-[#bfa544] mb-3">{plan.title}</h3>
                <p className="text-white mb-2">{plan.description}</p>
                <p className="text-white/70 text-sm">{plan.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
            className="inline-block bg-white text-[#bfa14a] px-10 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
          >
            Get In Touch
          </Link>
        </div>
      </section>
    </div>
  );
}

