
"use client";

import React, { useState } from 'react';
import Link from "next/link";
import Image from "next/image";

export default function GetInTouch() {
  const [navOpen, setNavOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f7f7e7] via-[#e9ede9] to-[#f7f7e7] flex flex-col">
      {/* Navbar */}
      <nav className="relative z-20 flex items-center justify-between w-full mt-0 px-4 md:px-8 py-3 bg-white/95 rounded-none shadow border-b border-gold/40 font-sans font-thin">
        <div className="flex items-center gap-3">
          <Image
            src="/designs/Ivy_logo.png"
            alt="Ivy Logo"
            width={48}
            height={48}
            className=""
            priority />
          <div className="flex flex-col leading-tight">
            <span className="ivy-logo-text">IVY GROUP</span>
            <span className="ivy-logo-subtitle">Premium Real Estate</span>
          </div>
        </div>
        {/* Hamburger for mobile */}
        <button className="md:hidden flex flex-col justify-center items-center ml-auto z-30" onClick={() => setNavOpen(!navOpen)} aria-label="Open Menu">
          <span className={`block w-7 h-1 bg-[#f7f7e7] rounded transition-all duration-300 mb-1 ${navOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-7 h-1 bg-[#f7f7e7] rounded transition-all duration-300 mb-1 ${navOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-7 h-1 bg-[#f7f7e7] rounded transition-all duration-300 ${navOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
        {/* Desktop Nav */}
        <div className="hidden md:flex flex-1 items-center">
          <ul className="flex flex-1 justify-center items-center gap-6 text-base font-medium">
            <li>
              <Link href="/" className="text-black font-semibold nav-tab relative" aria-label="Home">Home</Link>
            </li>
            <li><a href="#" className="text-black/80 hover:text-black nav-tab relative">Buy</a></li>
            <li><a href="#" className="text-black/80 hover:text-black nav-tab relative">Let</a></li>
            <li><a href="#" className="text-black/80 hover:text-black nav-tab relative">About</a></li>
            <li><a href="/contact" className="text-black/80 hover:text-black nav-tab relative">Contact</a></li>
            <li><a href="/blog" className="text-black/80 hover:text-black nav-tab relative">Blog</a></li>
          </ul>
          <a href="#" className="ml-8 bg-[#35521a] text-[#f7f7e7] px-7 py-2 rounded-lg shadow font-semibold hover:bg-[#466c25] transition whitespace-nowrap min-w-[170px] text-center">Book a Reservation</a>
        </div>
        {/* Mobile Nav Overlay */}
        <div className={`fixed inset-0 bg-black/60 z-20 transition-opacity duration-300 ${navOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}></div>
        <div className={`fixed top-0 right-0 h-full w-4/5 max-w-xs bg-white shadow-lg z-30 transform transition-transform duration-300 ${navOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden flex flex-col pt-24 px-6 gap-6 font-sans font-thin`}>
          <ul className="flex flex-col gap-6 text-lg font-semibold">
            <li>
              <Link href="/" className="text-black nav-tab font-thin" onClick={()=>setNavOpen(false)} aria-label="Home">Home</Link>
            </li>
            <li><a href="#" className="text-black nav-tab font-thin" onClick={()=>setNavOpen(false)}>Buy</a></li>
            <li><a href="#" className="text-black nav-tab font-thin" onClick={()=>setNavOpen(false)}>Let</a></li>
            <li><a href="#" className="text-black nav-tab font-thin" onClick={()=>setNavOpen(false)}>About</a></li>
            <li><a href="/contact" className="text-black nav-tab font-thin" onClick={()=>setNavOpen(false)}>Contact</a></li>
            <li><a href="/blog" className="text-black nav-tab font-thin" onClick={()=>setNavOpen(false)}>Blog</a></li>
          </ul>
          <a href="#" className="mt-8 bg-gold text-white px-7 py-2 rounded-lg shadow font-semibold hover:bg-blue transition whitespace-nowrap min-w-[170px] text-center font-thin">Book a Reservation</a>
        </div>
        <style>{`
          .nav-tab::after {
            content: '';
            display: block;
            position: absolute;
            left: 0;
            right: 0;
            bottom: -2px;
            height: 3px;
            background: linear-gradient(90deg, #ff9900 60%, #ffb84d 100%);
            border-radius: 2px;
            opacity: 0;
            transform: scaleX(0);
            transition: opacity 0.2s, transform 0.2s;
          }
          .nav-tab:hover::after, .nav-tab:focus::after {
            opacity: 1;
            transform: scaleX(1);
          }
        `}</style>
      </nav>
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center py-12 px-4">
        {/* Contact Info */}
        <div className="text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Contact Information</h2>
          <div className="flex items-center mb-4">
            <span className="text-3xl text-[#e5c75e] mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#e5c75e" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75v10.5A2.25 2.25 0 004.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75m-19.5 0A2.25 2.25 0 014.5 4.5h15a2.25 2.25 0 012.25 2.25m-19.5 0v.243a2.25 2.25 0 00.659 1.591l7.591 7.591a2.25 2.25 0 003.182 0l7.591-7.591A2.25 2.25 0 0021.75 6.993V6.75" /></svg>
            </span>
            <div>
              <div className="font-bold">Phone</div>
              <div>+254 700 000 000</div>
            </div>
          </div>
          <div className="flex items-center mb-4">
            <span className="text-3xl text-[#e5c75e] mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#e5c75e" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5A2.25 2.25 0 0119.5 19.5h-15A2.25 2.25 0 012.25 17.25V6.75" /><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L12 12.75l-5.25-6" /></svg>
            </span>
            <div>
              <div className="font-bold">Email</div>
              <div>blossomivymarketing@gmail.com</div>
            </div>
          </div>
          <div className="flex items-center mb-4">
            <span className="text-3xl text-[#e5c75e] mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#e5c75e" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.5-7.5 12-7.5 12s-7.5-4.5-7.5-12a7.5 7.5 0 1115 0z" /></svg>
            </span>
            <div>
              <div className="font-bold">Head Office</div>
              <div>Westlands, Nairobi, Kenya</div>
            </div>
          </div>
        </div>
        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md mx-auto">
          <h3 className="text-2xl font-bold text-[#39591c] mb-6">Send us a Message</h3>
          <form className="space-y-4">
            <input type="text" placeholder="Your Name" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39591c]" />
            <input type="email" placeholder="Your Email" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39591c]" />
            <input type="text" placeholder="Phone Number" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39591c]" />
            <textarea placeholder="Your Message" rows={4} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39591c]" />
            <button type="submit" className="w-full bg-[#39591c] text-white py-3 rounded-lg font-semibold text-lg hover:bg-[#2e4717] transition">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}
