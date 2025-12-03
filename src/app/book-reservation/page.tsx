"use client";
import React, { useState, useRef, useEffect } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaCheckCircle } from "react-icons/fa";
import Image from "next/image";

// Map Modal Component
function MapModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in-fast" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-4xl mx-4 relative animate-slide-up"
        onClick={e => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-navy text-2xl font-bold transition"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h3 className="text-2xl font-bold text-navy mb-6 text-center">Our Location</h3>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8271820880486!2d36.78276647496567!3d-1.27713609871072!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f170056423b43%3A0xac4d412392285ae0!2sBLOSSOM%20IVY%20RESIDENCE!5e0!3m2!1sen!2ske!4v1758788884873!5m2!1sen!2ske"
          className="w-full h-96 rounded-lg"
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Blossom Ivy Residence Map"
        />
      </div>
    </div>
  );
}

const projects = [
  {
    id: "blossoms-ivy",
    name: "BLOSSOMS IVY",
    location: "Kileleshwa",
    image: "/designs/blossom.jpg",
    description: "Elegant apartments in the heart of Kileleshwa, offering tranquil living with urban convenience."
  },
  {
    id: "luckinn-ivy",
    name: "LUCKINN IVY",
    location: "Westlands",
    image: "/designs/Luckinn Ivy.jpg",
    description: "Contemporary living spaces in vibrant Westlands, perfect for modern professionals and families."
  },
  {
    id: "ivy-park",
    name: "IVY PARK",
    location: "Kilimani",
    image: "/designs/Exterior_07_IA.png",
    description: "Sophisticated residences in prestigious Kilimani, combining luxury with accessibility."
  }
];

export default function BookReservation() {
  const [selectedProject, setSelectedProject] = useState("");
  const [mapModalOpen, setMapModalOpen] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedProject && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [selectedProject]);

  return (
    <div className="bg-gradient-to-b from-[#fcfbf7] via-[#f7f6f2] to-[#fcfbf7] min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/designs/video_bg.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"></div>
        <div className="relative z-10 text-center text-gold max-w-4xl mx-auto px-4 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4 drop-shadow-lg animate-slide-down">Book a Private Viewing</h1>
          <p className="text-xl md:text-2xl font-light drop-shadow-md animate-slide-up">Experience our luxury properties in person. Schedule a private tour with our expert team and discover your next home.</p>
        </div>
      </section>

      {/* Project Selection Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto w-full">
        <h2 className="text-3xl text-green-600 font-serif font-bold text-center text-navy mb-12 animate-fade-in">Choose Your Project</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`relative bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105 border-2 ${selectedProject === project.id ? 'border-gold shadow-gold' : 'border-gray-200'} animate-slide-up`}
              style={{ animationDelay: `${index * 0.2}s` }}
              onClick={() => setSelectedProject(project.id)}
            >
              <div className="relative h-48">
                <Image src={project.image} alt={project.name} fill className="object-cover transition-transform duration-300 hover:scale-110" />
                {selectedProject === project.id && (
                  <div className="absolute top-4 right-4 bg-gold text-black rounded-full p-2 animate-bounce">
                    <FaCheckCircle className="text-lg" />
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-serif font-bold text-green-600 mb-2">{project.name}</h3>
                <p className="text-black font-semibold mb-3 flex items-center gap-2">
                  <FaMapMarkerAlt /> {project.location}
                </p>
                <p className="text-gray-700 text-sm font-semibold leading-relaxed mb-4">{project.description}</p>
                <button
                  onClick={() => setSelectedProject(project.id)}
                  className={`w-full py-2 px-4 rounded-lg font-semibold transition-all duration-300 ${
                    selectedProject === project.id
                      ? 'bg-green-600 text-white'
                      : 'bg-gold text-black hover:bg-[#bfa14a] hover:text-white'
                  }`}
                >
                  {selectedProject === project.id ? 'Selected' : 'Select Project'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reservation Form Section */}
      <section className="py-16 px-4 max-w-4xl mx-auto w-full">
        <div ref={formRef} className="bg-white rounded-2xl shadow-xl p-8 border border-gold/40 animate-fade-in">
          <h2 className="text-3xl font-serif font-bold text-green-600 mb-8 text-center animate-slide-down">Reservation Details</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" placeholder="First Name" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold placeholder:text-gray-500 bg-white transition-all duration-300" required />
              <input type="text" placeholder="Last Name" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold placeholder:text-gray-500 bg-white transition-all duration-300" required />
            </div>
            <input type="email" placeholder="Email" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold placeholder:text-gray-500 bg-white transition-all duration-300" required />
            <input type="tel" placeholder="Phone" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold placeholder:text-gray-500 bg-white transition-all duration-300" required />
            <select
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold text-gray-700 bg-white transition-all duration-300"
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              required
              aria-label="Select Project"
            >
              <option value="">Select Project</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>{project.name} - {project.location}</option>
              ))}
            </select>

            <input type="date" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold text-gray-700 bg-white transition-all duration-300" required aria-label="Select Reservation Date" />
            <textarea placeholder="Additional Requests (optional)" rows={4} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold placeholder:text-gray-500 bg-white transition-all duration-300"></textarea>
            <button type="submit" className="w-full bg-gold text-black py-4 rounded-lg font-semibold text-lg hover:bg-[#bfa14a] hover:text-white transition-all duration-200 shadow-md hover:shadow-lg scale-100 hover:scale-105 flex items-center justify-center gap-2 animate-pulse">
              <FaCheckCircle className="text-xl text-green-600" /> Book Reservation
            </button>
          </form>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto w-full">
        <h2 className="text-3xl font-serif font-bold text-center font-bold text-green-600 mb-12 animate-fade-in">Get in Touch</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center border border-gold/40 hover:shadow-2xl transition-all duration-300 animate-slide-up flex flex-col justify-between">
            <div>
              <FaMapMarkerAlt className="text-3xl text-black mx-auto mb-4 animate-pulse" />
              <h3 className="text-xl font-serif font-bold font-bold text-black mb-2">Visit Us</h3>
              <p className="text-gray-700 leading-relaxed">Gatundu Road, Kileleshwa</p>
            </div>
            <button
              onClick={() => setMapModalOpen(true)}
              className="bg-gold text-black px-6 py-2 rounded-lg font-semibold hover:bg-[#bfa14a] hover:text-white transition-all duration-200 shadow-md hover:shadow-lg scale-100 hover:scale-105 mt-4"
            >
              View Map
            </button>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center border border-gold/40 hover:shadow-2xl transition-all duration-300 animate-slide-up flex flex-col justify-between" style={{ animationDelay: '0.2s' }}>
            <div>
              <FaPhoneAlt className="text-3xl text-blue-600 mx-auto mb-4 animate-pulse" />
              <h3 className="text-xl font-serif font-bold font-bold text-black mb-2">Call Us</h3>
              <p className="text-gray-700 leading-relaxed">+254 798 888 866<br/>+254 799 008 564</p>
            </div>
            <a
              href="tel:+254798888866"
              className="bg-gold text-black px-6 py-2 rounded-lg font-semibold hover:bg-[#bfa14a] hover:text-white transition-all duration-200 shadow-md hover:shadow-lg scale-100 hover:scale-105 inline-block mt-4"
            >
              Call Now
            </a>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center border border-gold/40 hover:shadow-2xl transition-all duration-300 animate-slide-up flex flex-col justify-between" style={{ animationDelay: '0.4s' }}>
            <div>
              <FaEnvelope className="text-3xl text-red-600 mx-auto mb-4 animate-pulse" />
              <h3 className="text-xl font-serif font-bold font-bold text-black mb-2">Email Us</h3>
              <p className="text-gray-700 leading-relaxed">blossomivymarketing@gmail.com</p>
            </div>
            <a
              href="mailto:blossomivymarketing@gmail.com"
              className="bg-gold text-black px-6 py-2 rounded-lg font-semibold hover:bg-[#bfa14a] hover:text-white transition-all duration-200 shadow-md hover:shadow-lg scale-100 hover:scale-105 inline-block mt-4"
            >
              Send Email
            </a>
          </div>
        </div>
      </section>

      <MapModal open={mapModalOpen} onClose={() => setMapModalOpen(false)} />
    </div>
  );
}
