import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Bell, Building2, Clock3 } from "lucide-react";
import { contact } from "@/lib/data";

export const metadata: Metadata = {
  title: "Rent | Coming Soon",
  description:
    "The Ivy Group rental desk is coming soon. We are not renting apartments at the moment, but future rental opportunities will be announced here."
};

export default function Rent() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-20 text-white">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/IVY PARK RESIDENCE/IVY PARK WIDE.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/IVY PARK RESIDENCE/IVY PARK RESIDENCE - RENDERS/EXTERIORS/251118_D01_Droneview-Sunset_Ivy Park.jpg"
        aria-label="Ivy Park Residence background video"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,8,7,0.86),rgba(7,8,7,0.38)_54%,rgba(7,8,7,0.7)),linear-gradient(0deg,rgba(7,8,7,0.92),rgba(7,8,7,0.08)_58%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-20 h-px animate-[rentSweep_4.8s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-[#c9a15b] to-transparent opacity-70" />

      <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl flex-col justify-center px-6 py-16">
        <div className="max-w-3xl animate-[rentRise_900ms_cubic-bezier(0.22,1,0.36,1)_both]">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#c9a15b]/45 bg-black/30 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#e5c37e] backdrop-blur-md">
            <Clock3 size={15} /> Rentals coming soon
          </p>
          <h1 className="mt-6 font-serif text-5xl font-light leading-tight md:text-7xl">
            Rent with The Ivy Group is opening later.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">
            We are not renting apartments right now. This page will become the home for future rental availability,
            viewing requests, and resident leasing updates.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/buy"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#c9a15b] px-6 py-4 font-bold text-[#111] transition hover:bg-[#e2bd75]"
            >
              Explore homes for sale <ArrowRight size={17} />
            </Link>
            <a
              href={`https://wa.me/${contact.phone.replace(/\D/g, "")}?text=Hello%20Ivy%20Group%2C%20please%20notify%20me%20when%20rentals%20are%20available.`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-black/25 px-6 py-4 font-bold text-white transition hover:border-[#c9a15b] hover:text-[#c9a15b]"
            >
              <Bell size={17} /> Get rental updates
            </a>
          </div>
        </div>

        <div className="mt-14 grid max-w-4xl gap-3 md:grid-cols-3">
          {[
            ["Not active yet", "Rental listings are not currently open."],
            ["Future leasing", "Availability will be announced here first."],
            ["Sales continue", "Our current focus is project purchases."]
          ].map(([title, text], index) => (
            <div
              key={title}
              className="animate-[rentRise_900ms_cubic-bezier(0.22,1,0.36,1)_both] rounded-lg border border-white/10 bg-black/24 p-5 backdrop-blur-md"
              style={{ animationDelay: `${180 + index * 110}ms` }}
            >
              <Building2 className="text-[#c9a15b]" size={20} />
              <p className="mt-4 font-bold">{title}</p>
              <p className="mt-2 text-sm leading-6 text-white/58">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
