"use client";
import React, { useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaCheckCircle } from "react-icons/fa";
import { FaTiktok, FaFacebookF, FaInstagram } from "react-icons/fa";

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

export default function ContactPage() {
  const [mapModalOpen, setMapModalOpen] = useState(false);

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
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4 drop-shadow-lg animate-slide-down">Get In Touch</h1>
          <p className="text-xl md:text-2xl font-light drop-shadow-md animate-slide-up">Connect with our luxury real estate experts. We&apos;re here to help you find your dream home.</p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 px-4 max-w-4xl mx-auto w-full">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gold/40 animate-fade-in">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-green-600 mb-8 text-center animate-slide-down">Send Us a Message</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <input type="text" placeholder="First Name" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold placeholder:text-gray-500 bg-white transition-all duration-300 text-sm sm:text-base text-black" required />
              <input type="text" placeholder="Last Name" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold placeholder:text-gray-500 bg-white transition-all duration-300 text-sm sm:text-base text-black" required />
            </div>
            <input type="email" placeholder="Email Address" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold placeholder:text-gray-500 bg-white transition-all duration-300 text-sm sm:text-base text-black" required />
            <input type="tel" placeholder="Phone Number" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold placeholder:text-gray-500 bg-white transition-all duration-300 text-sm sm:text-base text-black" required />
            <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold text-gray-700 bg-white transition-all duration-300 text-sm sm:text-base" required aria-label="Inquiry Type">
              <option value="">Select Inquiry Type</option>
              <option value="general">General Inquiry</option>
              <option value="sales">Sales</option>
              <option value="rentals">Rentals</option>
              <option value="investment">Investment Opportunities</option>
              <option value="support">Support</option>
              <option value="other">Other</option>
            </select>
            <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold text-gray-700 bg-white transition-all duration-300 text-sm sm:text-base" aria-label="Property Interest">
              <option value="">Property Interest (Optional)</option>
              <option value="1-bedroom">Blossoms Ivy</option>
              <option value="2-bedroom">Luckinn Ivy</option>
              <option value="3-bedroom">Ivy Park</option>

            </select>
            <textarea placeholder="Tell us about your requirements..." rows={4} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold placeholder:text-gray-500 bg-white transition-all duration-300 text-sm sm:text-base text-black" required></textarea>
            <button type="submit" className="w-full bg-gold text-black py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-[#bfa14a] hover:text-white transition-all duration-200 shadow-md hover:shadow-lg scale-100 hover:scale-105 flex items-center justify-center gap-2 animate-pulse">
              <FaCheckCircle className="text-lg sm:text-xl text-green-600" /> Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto w-full">
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-center text-green-600 mb-12 animate-fade-in">Contact Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 text-center border border-gold/40 hover:shadow-2xl transition-all duration-300 animate-slide-up flex flex-col justify-between">
            <div>
              <FaMapMarkerAlt className="text-2xl sm:text-3xl text-black mx-auto mb-4 animate-pulse" />
              <h3 className="text-lg sm:text-xl font-serif font-bold text-black mb-2">Visit Us</h3>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">Gatundu Road, Kileleshwa, Nairobi</p>
            </div>
            <button
              onClick={() => setMapModalOpen(true)}
              className="bg-gold text-black px-4 sm:px-6 py-2 rounded-lg font-semibold text-sm sm:text-base hover:bg-[#bfa14a] hover:text-white transition-all duration-200 shadow-md hover:shadow-lg scale-100 hover:scale-105 mt-4"
            >
              View Map
            </button>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 text-center border border-gold/40 hover:shadow-2xl transition-all duration-300 animate-slide-up flex flex-col justify-between" style={{ animationDelay: '0.2s' }}>
            <div>
              <FaPhoneAlt className="text-2xl sm:text-3xl text-black mx-auto mb-4 animate-pulse" />
              <h3 className="text-lg sm:text-xl font-serif font-bold text-black mb-2">Call Us</h3>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">+254 797 236 333<br/>+254 799 008 564</p>
            </div>
            <a
              href="tel:+254797236333"
              className="bg-gold text-black px-4 sm:px-6 py-2 rounded-lg font-semibold text-sm sm:text-base hover:bg-[#bfa14a] hover:text-white transition-all duration-200 shadow-md hover:shadow-lg scale-100 hover:scale-105 inline-block mt-4"
            >
              Call Now
            </a>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 text-center border border-gold/40 hover:shadow-2xl transition-all duration-300 animate-slide-up flex flex-col justify-between sm:col-span-2 lg:col-span-1" style={{ animationDelay: '0.4s' }}>
            <div>
              <FaEnvelope className="text-2xl sm:text-3xl text-black mx-auto mb-4 animate-pulse" />
              <h3 className="text-lg sm:text-xl font-serif font-bold text-black mb-2">Email Us</h3>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">blossomivymarketing@gmail.com</p>
            </div>
            <a
              href="mailto:blossomivymarketing@gmail.com"
              className="bg-gold text-black px-4 sm:px-6 py-2 rounded-lg font-semibold text-sm sm:text-base hover:bg-[#bfa14a] hover:text-white transition-all duration-200 shadow-md hover:shadow-lg scale-100 hover:scale-105 inline-block mt-4"
            >
              Send Email
            </a>
          </div>
        </div>
      </section>

      {/* Business Hours and Social Media */}
      <section className="py-16 px-4 max-w-4xl mx-auto w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-gold/40 animate-fade-in">
            <h3 className="text-lg sm:text-xl font-serif font-bold text-black mb-4 flex items-center gap-2">
              <FaClock className="text-xl sm:text-2xl" /> Business Hours
            </h3>
            <div className="space-y-2 text-gray-700 text-sm sm:text-base">
              <div className="flex justify-between">
                <span>Monday - Friday:</span>
                <span>9:00 AM - 5:30 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday:</span>
                <span>9:00 AM - 4:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday:</span>
                <span>Closed</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-gold/40 animate-fade-in">
            <h3 className="text-lg sm:text-xl font-serif font-bold text-black mb-4">Follow Us</h3>
            <div className="flex gap-4 text-xl sm:text-2xl">
              <a href="https://www.tiktok.com/@theivygroup.ke" target="_blank" rel="noopener noreferrer" className="text-[#39591c] hover:text-[#2e4717]" title="TikTok"><FaTiktok /></a>
              <a href="https://www.facebook.com/profile.php?id=61577046309467" target="_blank" rel="noopener noreferrer" className="text-[#39591c] hover:text-[#2e4717]" title="Facebook"><FaFacebookF /></a>
              <a href="https://www.instagram.com/theivygroup_ke/" target="_blank" rel="noopener noreferrer" className="text-[#39591c] hover:text-[#2e4717]" title="Instagram"><FaInstagram /></a>

            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Floating Button with Tooltip */}
      <div className="fixed bottom-8 right-8 flex items-center z-50 group">
        <div className="opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-200 mr-3 bg-[#25D366] text-white font-semibold px-4 py-2 rounded-lg shadow-lg whitespace-nowrap text-base pointer-events-none select-none">
          WhatsApp Us !
        </div>
        <a href="https://wa.me/+254797236333" target="_blank" rel="noopener noreferrer" className="bg-[#25D366] rounded-full p-4 shadow-lg hover:scale-110 transition group" aria-label="WhatsApp">
          <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="32" height="32"><path d="M20.52 3.48A12 12 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.18-1.62A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52zM12 22c-1.7 0-3.36-.33-4.92-.98l-.35-.15-3.67.96.98-3.58-.18-.37A9.94 9.94 0 0 1 2 12C2 6.48 6.48 2 12 2c2.65 0 5.15 1.03 7.03 2.9A9.94 9.94 0 0 1 22 12c0 5.52-4.48 10-10 10zm5.2-7.6c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.28-.48.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.62-.47-.16-.01-.35-.01-.54-.01-.19 0-.5.07-.76.34-.26.27-1 1-.97 2.43.03 1.43 1.03 2.81 1.18 3 .15.19 2.03 3.1 4.93 4.23.69.3 1.23.48 1.65.61.69.22 1.32.19 1.81.12.55-.08 1.65-.67 1.89-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33z"/></svg>
        </a>
      </div>

      <MapModal open={mapModalOpen} onClose={() => setMapModalOpen(false)} />
    </div>
  );
}
