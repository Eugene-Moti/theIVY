"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaFacebookF, FaTiktok, FaInstagram, FaSpinner, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { sendContactEmail } from "@/actions/contact-us";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await sendContactEmail({
        firstName: "Newsletter",
        lastName: "Subscriber",
        email: email,
        phone: "N/A",
        inquiryType: "newsletter",
        propertyInterest: "",
        message: "Newsletter subscription request",
        formType: "newsletter", // Specify newsletter type
      });

      if (res.success) {
        setSuccess(true);
        setEmail("");
        setTimeout(() => setSuccess(false), 5000);
      } else {
        setError(res.error || "Subscription failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
      console.error("Newsletter subscription error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="w-full bg-[#1c1c1c] text-white/80 pt-12 md:pt-16 pb-8 px-4 font-sans font-thin">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 pb-8 md:pb-10 border-b border-white/10">
        {/* Brand & Description */}
        <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2 mb-2">
            <Image src="/designs/Ivy_logo.png" alt="Ivy Group Logo" width={32} height={32} className="rounded md:w-[36px] md:h-[36px]" />
            <span className="text-lg md:text-xl font-serif text-white">IVY GROUP</span>
          </div>
          <div className="text-sm leading-relaxed">IVY GROUP Kenya is a premier real estate and property development company based in Nairobi. We specialize in creating modern, elegant, and investment-worthy developments that redefine upscale living in the city.</div>
        </div>
        
        {/* Quick Links */}
        <div>
          <h3 className="text-base md:text-lg font-serif font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-3 text-sm">
            <li><Link href="/" className="hover:text-gold transition-colors">Home</Link></li>
            <li><Link href="/buy" className="hover:text-gold transition-colors">Buy</Link></li>
            <li><a href="#" className="hover:text-gold transition-colors">Let</a></li>
            <li><Link href="/about" className="hover:text-gold transition-colors">About</Link></li>
            <li><Link href="/contact" className="hover:text-gold transition-colors">Contact</Link></li>
          </ul>
        </div>
        
        {/* Newsletter */}
        <div>
          <h3 className="text-base md:text-lg font-serif font-semibold text-white mb-4">Newsletter</h3>
          <p className="text-sm mb-4 text-white">Subscribe for the latest market insights and property alerts.</p>
          <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
            <div className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="bg-white/10 border border-white/20 text-white px-3 py-2 rounded-md sm:rounded-l-md sm:rounded-r-none text-sm w-full focus:outline-none focus:ring-2 focus:ring-gold disabled:opacity-50" 
              />
              <button 
                type="submit" 
                disabled={loading}
                className="bg-gold text-black px-3 md:px-4 py-2 rounded-md sm:rounded-r-md sm:rounded-l-none font-semibold text-sm hover:bg-[#c8b05a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    <span className="hidden sm:inline">Subscribing...</span>
                  </>
                ) : (
                  'Subscribe'
                )}
              </button>
            </div>
            
            {success && (
              <div className="flex items-center gap-2 text-green-400 text-xs">
                <FaCheckCircle />
                <span>Successfully subscribed!</span>
              </div>
            )}
            
            {error && (
              <div className="flex items-center gap-2 text-red-400 text-xs">
                <FaExclamationCircle />
                <span>{error}</span>
              </div>
            )}
          </form>
        </div>
        
        {/* Social Media */}
        <div>
          <h3 className="text-base md:text-lg font-serif font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex gap-4 md:gap-5 text-lg mb-4">
            <a href="https://www.facebook.com/profile.php?id=61577046309467" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-gold transition-colors"><FaFacebookF /></a>
            <a href="https://www.tiktok.com/@theivygroup.ke" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="hover:text-gold transition-colors"><FaTiktok /></a>
            <a href="https://www.instagram.com/theivygroup_ke/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-gold transition-colors"><FaInstagram /></a>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center pt-6 text-white/60 text-xs md:text-sm gap-4">
        <div>© {new Date().getFullYear()} IVY GROUP. All rights reserved.</div>
        <div className="flex flex-col sm:flex-row gap-4 text-xs">
          <Link href="/privacy" className="hover:text-gold transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-gold transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}