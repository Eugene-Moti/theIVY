import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BadgeCheck } from "lucide-react";
import { Reveal } from "@/components/motion";
import { tours } from "@/lib/data";

export const metadata: Metadata = {
  title: "Virtual Tours",
  description: "Explore Ivy Group virtual tours for amenities, co-working spaces, and one, two, and three-bedroom showhouses."
};

export default function VirtualTours() {
  return (
    <section className="section pt-36">
      <div className="container">
        <Reveal x={-72} distance={0} duration={0.85}>
          <p className="eyebrow">Immersive showrooms</p>
          <h1 className="mt-4 font-serif text-6xl font-semibold">Virtual tours</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/68">Walk through apartment layouts and amenity spaces before scheduling an in-person visit with the sales team.</p>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {tours.map(([title, description, href], index) => (
            <Reveal key={href} delay={index * 0.08} x={index % 2 === 0 ? -48 : 48} distance={22} scale={0.97} duration={0.74}>
              <Link href={href} target="_blank" className="group block h-full rounded-lg border border-white/10 bg-white/[0.045] p-7 transition hover:border-[#c9a15b]">
                <div className="flex items-start justify-between gap-4">
                  <BadgeCheck className="text-[#c9a15b]" />
                  <ArrowUpRight className="transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
                <h2 className="mt-8 text-3xl font-semibold">{title}</h2>
                <p className="mt-3 text-white/64">{description}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
