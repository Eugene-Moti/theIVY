"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Download, Home, Menu, Phone, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { assets, contact, projects } from "@/lib/data";

const nav = [
  ["DEVELOPMENTS", "/developments"],
  ["BUY", "/buy"],
  ["RENT", "/rent"],
  ["FLOOR PLANS", "/floor-plans"],
  ["INSIGHTS", "/insights"],
  ["CONTACT", "/contact"],
  ["ABOUT", "/about"]
];

export function Header() {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#0d1110]/82 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 max-md:h-16 max-md:w-full max-md:px-3">
        <Link href="/" onClick={closeMenu} className="flex items-center gap-3">
          <Image
            src={assets.ivyLogo}
            alt="The Ivy Group"
            width={120}
            height={44}
            className="h-8 w-auto drop-shadow-[0_0_18px_rgba(201,161,91,0.28)] sm:h-10 md:h-11"
            priority
          />
        </Link>
        <nav className="hidden items-center gap-6 text-[0.68rem] font-bold tracking-[0.16em] text-white/78 lg:flex xl:gap-9 xl:text-xs">
          {nav.map(([label, href]) =>
            label === "BUY" ? (
              <div key={href} className="group relative py-2">
                <Link href={href} className="relative flex items-center gap-1.5 transition hover:text-[#c9a15b]">
                  {label}
                  <ChevronDown size={13} className="transition group-hover:rotate-180" />
                  <span className="absolute bottom-[-8px] left-0 h-px w-full origin-left scale-x-0 bg-[#c9a15b] transition-transform duration-300 group-hover:scale-x-100" />
                </Link>
                <div className="invisible absolute left-1/2 top-full w-80 -translate-x-1/2 translate-y-3 opacity-0 transition duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  <div className="pt-4">
                    <div className="overflow-hidden rounded-lg border border-white/10 bg-[#0d1110]/96 p-2 text-left shadow-[0_24px_70px_rgba(0,0,0,0.45)] backdrop-blur-xl">
                      <Link
                        href="/buy"
                        className="block rounded-md px-4 py-3 text-[0.68rem] uppercase tracking-[0.16em] text-[#c9a15b] transition hover:bg-white/[0.06]"
                      >
                        View all projects
                      </Link>
                      <div className="my-1 h-px bg-white/10" />
                      {projects.map((project) => (
                        <Link
                          key={project.slug}
                          href={`/projects/${project.slug}`}
                          className="block rounded-md px-4 py-3 tracking-normal transition hover:bg-white/[0.06] hover:text-[#c9a15b]"
                        >
                          <span className="block text-sm font-bold tracking-normal text-white">{project.name}</span>
                          <span className="mt-1 block text-xs font-medium tracking-normal text-white/55">{project.location}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Link key={href} href={href} className="group relative py-2 transition hover:text-[#c9a15b]">
                {label}
                <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-[#c9a15b] transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            )
          )}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <a href={`tel:${contact.phone.replaceAll(" ", "")}`} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-[#c9a15b] hover:text-[#c9a15b]" aria-label="Call The Ivy Group">
            <Phone size={18} />
          </a>
          <Link href="/contact#brochures" className="rounded-full bg-[#c9a15b] px-5 py-3 text-sm font-bold text-[#111] transition hover:bg-[#e2bd75]">
            Download Brochure
          </Link>
        </div>
        <button className="mobile-tap flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] sm:h-11 sm:w-11 lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-x-0 top-16 max-h-[calc(100dvh-4rem)] w-screen overflow-y-auto overflow-x-hidden border-t border-white/10 bg-[#101613]/96 p-3 pb-7 shadow-[0_28px_80px_rgba(0,0,0,0.5)] backdrop-blur-2xl sm:p-4 lg:hidden"
            initial={{ opacity: 0, y: -18, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -12, filter: "blur(8px)" }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav className="grid gap-2 text-sm font-bold tracking-[0.16em]">
              <Link href="/" onClick={closeMenu} className="mobile-menu-link">
                <Home size={17} /> HOME
              </Link>
              {nav.map(([label, href]) =>
                label === "BUY" ? (
                  <div key={href} className="rounded-lg border border-white/10 bg-white/[0.035] p-2">
                    <Link href={href} onClick={closeMenu} className="mobile-menu-link">
                      {label}
                      <ChevronDown size={16} className="text-[#c9a15b]" />
                    </Link>
                    <div className="mt-2 grid gap-1 text-xs tracking-[0.08em] text-white/70">
                      {projects.map((project) => (
                        <Link key={project.slug} href={`/projects/${project.slug}`} onClick={closeMenu} className="rounded-md px-3 py-3 transition hover:bg-white/[0.06] hover:text-[#c9a15b] active:scale-[0.99]">
                          {project.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link key={href} href={href} onClick={closeMenu} className="mobile-menu-link">
                    {label}
                    <span className="h-1.5 w-1.5 rounded-full bg-[#c9a15b]/70" />
                  </Link>
                )
              )}
            </nav>
            <div className="mt-5 grid grid-cols-[auto_1fr] items-center gap-3">
              <a href={`tel:${contact.phone.replaceAll(" ", "")}`} className="mobile-tap flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-[#c9a15b] hover:text-[#c9a15b]" aria-label="Call The Ivy Group">
                <Phone size={18} />
              </a>
              <Link href="/contact#brochures" onClick={closeMenu} className="gold-gradient mobile-tap flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-bold text-[#111]">
                <Download size={16} /> Download Brochure
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
