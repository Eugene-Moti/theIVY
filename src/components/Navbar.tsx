"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

<style jsx>{`
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes slideInRight {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }
  @keyframes slideInUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  .animate-fade-in {
    animation: fadeIn 0.3s ease-out;
  }
  .animate-slide-in-right {
    animation: slideInRight 0.5s ease-out;
  }
  .animate-slide-in-up {
    animation: slideInUp 0.5s ease-out forwards;
    opacity: 0;
  }
`}</style>

export default function Navbar() {
  const [navOpen, setNavOpen] = useState(false);

  const toggleNav = () => setNavOpen(!navOpen);

  return (
    <>
      <nav className="relative z-20 flex items-center justify-between w-full mt-0 px-4 md:px-8 py-3 bg-[#fcfbf7]/95 backdrop-blur-sm rounded-none shadow border-b border-gold/40 font-sans font-thin">
        <div className="flex items-center gap-3">
          <Image
            src="/designs/Ivy_logo.png"
            alt="Ivy Logo"
            width={48}
            height={48}
            className=""
            priority
          />
          <div className="flex flex-col leading-tight">
            <span className="ivy-logo-text">IVY GROUP</span>
            <span className="ivy-logo-subtitle">Premium Real Estate</span>
          </div>
        </div>
        {/* Hamburger for mobile */}
        <button className="md:hidden flex flex-col justify-center items-center ml-auto z-30" onClick={toggleNav} aria-label="Open Menu">
          <span className={`block w-7 h-0.5 bg-gray-800 rounded transition-all duration-300 mb-1.5 ${navOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-7 h-0.5 bg-gray-800 rounded transition-all duration-300 mb-1.5 ${navOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-7 h-0.5 bg-gray-800 rounded transition-all duration-300 ${navOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
        {/* Desktop Nav */}
        <div className="hidden md:flex flex-1 items-center">
          <ul className="flex flex-1 justify-center items-center gap-8 text-base font-medium">
            <li>
              <Link href="/" className="text-black font-semibold nav-tab relative" aria-label="Home">HOME</Link>
            </li>
            <li><Link href="/buy" className="text-black/80 hover:text-black nav-tab relative">BUY</Link></li>
            <li><Link href="/let" className="text-black/80 hover:text-black nav-tab relative">LET</Link></li>
            <li><Link href="/about" className="text-black/80 hover:text-black nav-tab relative">ABOUT</Link></li>
            <li><a href="/contact" className="text-black/80 hover:text-black nav-tab relative">CONTACT</a></li>
            <li><a href="/blog" className="text-black/80 hover:text-black nav-tab relative">BLOG</a></li>
          </ul>
          <a href="/book-reservation" className="ml-8 bg-gold text-black px-7 py-2 rounded-lg shadow font-semibold hover:bg-[#bfa14a] hover:text-white transition whitespace-nowrap min-w-[170px] text-center">Book a Reservation</a>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {navOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden animate-fade-in" onClick={toggleNav}>
          <div className="fixed top-0 right-0 w-80 max-w-[90vw] h-full bg-[#fcfbf7] shadow-2xl transform transition-transform duration-500 ease-in-out animate-slide-in-right" onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-col h-full">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-4 border-b border-gold/40">
                <div className="flex items-center gap-2">
                  <Image
                    src="/designs/Ivy_logo.png"
                    alt="Ivy Logo"
                    width={32}
                    height={32}
                    priority
                  />
                  <span className="text-lg font-serif font-bold text-navy">IVY GROUP</span>
                </div>
                <button onClick={toggleNav} className="text-gray-600 hover:text-gray-800 text-2xl" aria-label="Close Menu">
                  &times;
                </button>
              </div>

              {/* Mobile Menu Links */}
              <div className="flex-1 px-4 py-6">
                <ul className="space-y-6">
                  <li className="animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
                    <Link href="/" className="block text-lg font-bold text-black hover:text-gold transition-colors transform hover:translate-x-2" onClick={toggleNav}>
                      HOME
                    </Link>
                  </li>
                  <li className="animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
                    <Link href="/buy" className="block text-lg font-bold text-gray-700 hover:text-gold transition-colors transform hover:translate-x-2" onClick={toggleNav}>
                      BUY
                    </Link>
                  </li>
                  <li className="animate-slide-in-up" style={{ animationDelay: '0.3s' }}>
                    <Link href="/let" className="block text-lg font-bold text-gray-700 hover:text-gold transition-colors transform hover:translate-x-2" onClick={toggleNav}>
                      LET
                    </Link>
                  </li>
                  <li className="animate-slide-in-up" style={{ animationDelay: '0.4s' }}>
                    <Link href="/about" className="block text-lg font-bold text-gray-700 hover:text-gold transition-colors transform hover:translate-x-2" onClick={toggleNav}>
                      ABOUT
                    </Link>
                  </li>
                  <li className="animate-slide-in-up" style={{ animationDelay: '0.5s' }}>
                    <Link href="/contact" className="block text-lg font-bold text-gray-700 hover:text-gold transition-colors transform hover:translate-x-2" onClick={toggleNav}>
                      CONTACT
                    </Link>
                  </li>
                  <li className="animate-slide-in-up" style={{ animationDelay: '0.6s' }}>
                    <Link href="/blog" className="block text-lg font-bold text-gray-700 hover:text-gold transition-colors transform hover:translate-x-2" onClick={toggleNav}>
                      BLOG
                    </Link>
                  </li>
                  <li className="animate-slide-in-up" style={{ animationDelay: '0.7s' }}>
                    <Link href="/book-reservation" className="block text-lg font-bold text-gray-700 hover:text-gold transition-colors transform hover:translate-x-2" onClick={toggleNav}>
                      BOOK RESERVATION
                    </Link>
                  </li>
                </ul>
              </div>


            </div>
          </div>
        </div>
      )}
    </>
  );
}
