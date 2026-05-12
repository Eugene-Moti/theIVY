import Link from "next/link";
import { ArrowUpRight, Facebook, Instagram, Mail, MapPin, Music2, Phone, Play, ShieldCheck } from "lucide-react";
import { contact, projects, socials } from "@/lib/data";

const socialIcons: Record<string, typeof Facebook> = {
  Facebook,
  Instagram,
  TikTok: Music2,
  YouTube: Play
};

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#090c0b] px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 border-b border-white/10 pb-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="eyebrow">The Ivy Group</p>
            <h2 className="mt-3 max-w-3xl font-serif text-4xl font-semibold">Premium Nairobi residences for lifestyle, rental demand, and long-term capital growth.</h2>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {["3 ongoing developments", "Prime Nairobi addresses", "Flexible buyer support"].map((item) => (
                <div key={item} className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.035] px-4 py-3 text-sm text-white/72">
                  <ShieldCheck size={17} className="text-[#c9a15b]" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <form className="rounded-lg border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#c9a15b]">Newsletter</p>
            <h3 className="mt-3 text-2xl font-semibold">Get launch updates and buyer insights.</h3>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Email address"
                className="min-h-12 flex-1 rounded-full border border-white/12 bg-[#0d1110] px-5 text-sm text-white outline-none transition placeholder:text-white/38 focus:border-[#c9a15b]"
                aria-label="Email address"
              />
              <button type="submit" className="rounded-full bg-[#c9a15b] px-6 py-3 text-sm font-bold text-[#111] transition hover:bg-[#e2bd75]">
                Subscribe
              </button>
            </div>
          </form>
        </div>

        <div className="grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-[1.1fr_0.9fr_0.9fr_0.9fr]">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.16em] text-[#c9a15b]">Developments</p>
            <div className="flex flex-col gap-3 text-white/72">
              {projects.map((project) => (
                <Link key={project.slug} href={`/${project.slug}`} className="hover:text-white">{project.name}</Link>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.16em] text-[#c9a15b]">Explore</p>
            <div className="flex flex-col gap-3 text-white/72">
              <Link href="/buy" className="hover:text-white">Buy</Link>
              <Link href="/floor-plans" className="hover:text-white">Floor Plans</Link>
              <Link href="/insights" className="hover:text-white">Insights</Link>
              <Link href="/about" className="hover:text-white">About</Link>
              <Link href="/contact" className="hover:text-white">Contact</Link>
            </div>
          </div>
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.16em] text-[#c9a15b]">Contact</p>
            <div className="space-y-4 text-white/72">
              <p className="flex gap-3"><MapPin size={18} className="mt-1 shrink-0 text-[#c9a15b]" /> {contact.office}</p>
              <a href={`mailto:${contact.email}`} className="flex gap-3 hover:text-white"><Mail size={18} className="shrink-0 text-[#c9a15b]" /> {contact.email}</a>
              <a href={`tel:${contact.phone.replaceAll(" ", "")}`} className="flex gap-3 hover:text-white"><Phone size={18} className="shrink-0 text-[#c9a15b]" /> {contact.phone}</a>
            </div>
          </div>
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.16em] text-[#c9a15b]">Follow us</p>
            <div className="flex flex-col gap-3">
              {socials.map(([label, href]) => {
                const SocialIcon = socialIcons[label] ?? ArrowUpRight;
                return (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-bold text-white/72 transition hover:border-[#c9a15b] hover:text-white"
                  >
                    <span className="flex items-center gap-3">
                      <SocialIcon size={17} className="text-[#c9a15b]" />
                      {label}
                    </span>
                    <ArrowUpRight size={16} className="text-[#c9a15b] transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-3 border-t border-white/10 pt-6 text-sm text-white/46 md:flex-row">
          <p>Copyright 2026 The Ivy Group. All rights reserved.</p>
          <p>Luxury residences in Kilimani, Kileleshwa, and Westlands.</p>
        </div>
      </div>
    </footer>
  );
}
