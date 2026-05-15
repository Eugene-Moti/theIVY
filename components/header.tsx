"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
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
        <button className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <div className="border-t border-white/10 bg-[#101613] p-5 lg:hidden">
          <nav className="flex flex-col gap-5 text-sm font-bold tracking-[0.18em]">
            {nav.map(([label, href]) =>
              label === "BUY" ? (
                <div key={href}>
                  <Link href={href} onClick={() => setOpen(false)} className="group relative w-fit py-1 transition hover:text-[#c9a15b]">
                    {label}
                    <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-[#c9a15b] transition-transform duration-300 group-hover:scale-x-100" />
                  </Link>
                  <div className="mt-3 flex flex-col gap-2 border-l border-white/10 pl-4 text-xs tracking-[0.08em] text-white/70">
                    {projects.map((project) => (
                      <Link key={project.slug} href={`/projects/${project.slug}`} onClick={() => setOpen(false)} className="py-1 transition hover:text-[#c9a15b]">
                        {project.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link key={href} href={href} onClick={() => setOpen(false)} className="group relative w-fit py-1 transition hover:text-[#c9a15b]">
                  {label}
                  <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-[#c9a15b] transition-transform duration-300 group-hover:scale-x-100" />
                </Link>
              )
            )}
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
