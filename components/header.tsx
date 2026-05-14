"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { assets, contact } from "@/lib/data";

const nav = [
  ["DEVELOPMENTS", "/developments"],
  ["BUY", "/buy"],
  ["FLOOR PLANS", "/floor-plans"],
  ["INSIGHTS", "/insights"],
  ["CONTACT", "/contact"],
  ["ABOUT", "/about"]
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#0d1110]/82 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={assets.ivyLogo}
            alt="The Ivy Group"
            width={120}
            height={44}
            className="h-11 w-auto drop-shadow-[0_0_18px_rgba(201,161,91,0.28)]"
            priority
          />
        </Link>
        <nav className="hidden items-center gap-6 text-[0.68rem] font-bold tracking-[0.16em] text-white/78 lg:flex xl:gap-9 xl:text-xs">
          {nav.map(([label, href]) => (
            <Link key={href} href={href} className="group relative py-2 transition hover:text-[#c9a15b]">
              {label}
              <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-[#c9a15b] transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <a href={`tel:${contact.phone.replaceAll(" ", "")}`} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-[#c9a15b] hover:text-[#c9a15b]" aria-label="Call The Ivy Group">
            <Phone size={18} />
          </a>
          <Link href="/contact#brochures" className="rounded-full bg-[#c9a15b] px-5 py-3 text-sm font-bold text-[#111] transition hover:bg-[#e2bd75]">
            Download Brochure
          </Link>
        </div>
        <button className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <div className="border-t border-white/10 bg-[#101613] p-5 lg:hidden">
          <nav className="flex flex-col gap-5 text-sm font-bold tracking-[0.18em]">
            {nav.map(([label, href]) => (
              <Link key={href} href={href} onClick={() => setOpen(false)} className="group relative w-fit py-1 transition hover:text-[#c9a15b]">
                {label}
                <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-[#c9a15b] transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>
          <div className="mt-6 flex items-center gap-3">
            <a href={`tel:${contact.phone.replaceAll(" ", "")}`} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-[#c9a15b] hover:text-[#c9a15b]" aria-label="Call The Ivy Group">
              <Phone size={18} />
            </a>
            <Link href="/contact#brochures" onClick={() => setOpen(false)} className="rounded-full bg-[#c9a15b] px-5 py-3 text-sm font-bold text-[#111] transition hover:bg-[#e2bd75]">
              Download Brochure
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
