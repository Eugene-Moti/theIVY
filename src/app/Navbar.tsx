"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// You can add Playfair Display in your globals.css or via Google Fonts link in layout.tsx

export default function Navbar() {
  const [navOpen, setNavOpen] = useState(false);
  const toggleNav = () => setNavOpen(!navOpen);

  return (
    <>
      <nav className="relative z-20 flex items-center justify-between w-full mt-0 px-4 md:px-8 py-3 bg-[#fcfbf7]/95 backdrop-blur-sm rounded-none shadow border-b border-gold/40 font-sans font-thin">
        <div className="flex items-center gap-2 md:gap-3">
          <Image
            src="/designs/Ivy_logo.png"
            alt="Ivy Logo"
            width={40}
            height={40}
            priority
          />
          <div className="flex flex-col leading-tight">
            <span className="ivy-logo-text text-sm md:text-base">IVY GROUP</span>
            <span className="ivy-logo-subtitle text-xs md:text-sm">Premium Real Estate</span>
          </div>
        </div>

        {/* Hamburger for mobile */}
        <button
          className="md:hidden flex flex-col justify-center items-center ml-auto z-30 p-2"
          onClick={toggleNav}
          aria-label="Open Menu"
        >
          <span
            className={`block w-6 h-0.5 bg-gray-800 rounded transition-all duration-300 mb-1 ${
              navOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-gray-800 rounded transition-all duration-300 mb-1 ${
              navOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-gray-800 rounded transition-all duration-300 ${
              navOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          />
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex flex-1 items-center">
          <ul className="flex flex-1 justify-center items-center gap-12 text-sm lg:text-base font-serif font-semibold text-black">
            <li>
              <Link
                href="/"
                className="nav-tab relative hover:text-gold transition-all duration-300"
              >
                HOME
              </Link>
            </li>
            <li>
              <Link
                href="/buy"
                className="nav-tab relative hover:text-gold transition-all duration-300"
              >
                BUY
              </Link>
            </li>
            <li>
              <Link
                href="/let"
                className="nav-tab relative hover:text-gold transition-all duration-300"
              >
                LET
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="nav-tab relative hover:text-gold transition-all duration-300"
              >
                ABOUT
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="nav-tab relative hover:text-gold transition-all duration-300"
              >
                CONTACT
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="nav-tab relative hover:text-gold transition-all duration-300"
              >
                BLOG
              </Link>
            </li>
          </ul>
          <a
            href="/book-reservation"
            className="ml-6 lg:ml-8 bg-gold text-black px-4 lg:px-7 py-2 rounded-lg shadow font-semibold hover:bg-[#bfa14a] hover:text-white transition whitespace-nowrap min-w-[140px] lg:min-w-[170px] text-center text-sm lg:text-base"
          >
            Book a Reservation
          </a>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {navOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden animate-fade-in"
          onClick={toggleNav}
        >
          <div
            className="fixed top-0 right-0 w-80 max-w-[90vw] h-full bg-[#fcfbf7] shadow-2xl transform transition-transform duration-500 ease-in-out animate-slide-in-right"
            onClick={(e) => e.stopPropagation()}
          >
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
                <button
                  onClick={toggleNav}
                  className="text-gray-600 hover:text-gray-800 text-2xl"
                  aria-label="Close Menu"
                >
                  &times;
                </button>
              </div>

              {/* Mobile Menu Links */}
              <div className="flex-1 px-4 py-6">
                <ul className="space-y-6">
                  {["HOME","BUY","LET","ABOUT","CONTACT","BLOG","BOOK RESERVATION"].map((item, idx) => (
                    <li
                      key={idx}
                      className="animate-slide-in-up"
                      style={{ animationDelay: `${0.1 * (idx + 1)}s` }}
                    >
                      <Link
                        href={item === "HOME" ? "/" : `/${item.toLowerCase().replace(" ","-")}`}
                        className="block text-lg font-bold text-gray-700 hover:text-gold transition-colors transform hover:translate-x-2"
                        onClick={toggleNav}
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Animations */}
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
        .animate-fade-in { animation: fadeIn 0.3s ease-out; }
        .animate-slide-in-right { animation: slideInRight 0.5s ease-out; }
        .animate-slide-in-up { animation: slideInUp 0.5s ease-out forwards; opacity: 0; }
        .nav-tab {
          letter-spacing: 2px;
        }
        .nav-tab::after {
          content: '';
          display: block;
          height: 2px;
          width: 0;
          background: #bfa14a;
          transition: width 0.3s ease;
          position: absolute;
          bottom: -4px;
          left: 0;
        }
        .nav-tab:hover::after { width: 100%; }
      `}</style>
    </>
  );
}
