"use client";

import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaTiktok, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="w-full bg-[#1c1c1c] text-white/80 pt-16 pb-8 px-4 font-sans font-thin">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-white/10">
        {/* Brand & Description */}
        <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2 mb-2">
            <Image src="/designs/Ivy_logo.png" alt="Ivy Group Logo" width={36} height={36} className="rounded" />
            <span className="text-xl sm:text-2xl font-serif text-white">IVY GROUP</span>
          </div>
          <div className="text-sm leading-relaxed">IVY GROUP Kenya is a premier real estate and property development company based in Nairobi. We specialize in creating modern, elegant, and investment-worthy developments that redefine upscale living in the city.</div>
        </div>
        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-serif font-semibold text-white mb-4">Quick Links</h3>
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
          <h3 className="text-lg font-serif font-semibold text-white mb-4">Newsletter</h3>
          <p className="text-sm mb-4 text-white">Subscribe for the latest market insights and property alerts.</p>
          <form className="flex flex-col sm:flex-row">
            <input type="email" placeholder="Your email" className="bg-white/10 border border-white/20 text-white px-3 py-2 rounded-md sm:rounded-l-md sm:rounded-r-none text-sm w-full focus:outline-none focus:ring-2 focus:ring-gold mb-2 sm:mb-0" />
            <button type="submit" className="bg-gold text-black px-4 py-2 rounded-md sm:rounded-r-md sm:rounded-l-none font-semibold text-sm hover:bg-[#c8b05a] transition-colors">Subscribe</button>
          </form>
        </div>
        {/* Social Media */}
        <div>
          <h3 className="text-lg font-serif font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex gap-5 text-lg mb-4">
            <a href="https://www.facebook.com/profile.php?id=61577046309467" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-gold transition-colors"><FaFacebookF /></a>
            <a href="https://www.tiktok.com/@theivygroup.ke" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="hover:text-gold transition-colors"><FaTiktok /></a>
            <a href="https://www.instagram.com/theivygroup_ke/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-gold transition-colors"><FaInstagram /></a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center pt-6 text-white/60 text-sm gap-4">
        <div>© {new Date().getFullYear()} IVY GROUP. All rights reserved.</div>
        <div className="flex flex-col sm:flex-row gap-4 text-xs">
          <Link href="/privacy" className="hover:text-gold transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-gold transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
