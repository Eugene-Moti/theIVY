import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Handshake, MapPin, Sparkles } from "lucide-react";
import { assets, projects } from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description: "The Ivy Group is a Nairobi real estate company developing premium residences across Kilimani, Kileleshwa, and Westlands."
};

const companyPillars = [
  {
    title: "Strategic Locations",
    copy: "We focus on Nairobi neighborhoods with strong access, established demand, and everyday convenience for residents.",
    icon: MapPin
  },
  {
    title: "Design-Led Living",
    copy: "Our developments combine refined architecture, generous amenities, and practical apartment layouts for modern urban life.",
    icon: Sparkles
  },
  {
    title: "Buyer Confidence",
    copy: "From enquiry to site visit and payment planning, we keep the purchase journey clear, guided, and responsive.",
    icon: Handshake
  },
  {
    title: "Long-Term Value",
    copy: "We plan with rental demand, resale potential, and neighborhood growth in mind, supporting both homeowners and investors.",
    icon: BadgeCheck
  }
];

export default function About() {
  return (
    <>
      <section className="section bg-[#f3eddf] pt-36 text-[#121512]">
        <div className="container grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="eyebrow">About The Ivy Group</p>
            <h1 className="mt-4 font-serif text-6xl font-semibold">Real estate shaped around lifestyle and investment performance.</h1>
            <p className="mt-6 text-lg leading-8 text-black/64">
              The Ivy Group develops premium Nairobi residences across strategic neighborhoods, with a growing portfolio that balances refined architecture, everyday comfort, investor confidence, and long-term neighborhood value.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3">
              {["Kilimani", "Kileleshwa", "Westlands", "Completed portfolio"].map((item) => (
                <div key={item} className="rounded-lg border border-[#d8c49a]/35 bg-white/65 p-4 text-sm font-bold uppercase tracking-[0.12em] text-black/64">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="relative min-h-[560px] overflow-hidden rounded-lg">
            <Image src={assets.blossomsHero} alt="Blossoms Ivy Residence lobby" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="section bg-[#0d1110] text-white">
        <div className="container">
          <div className="mb-10 max-w-3xl">
            <p className="eyebrow">Our developments</p>
            <h2 className="mt-4 font-serif text-5xl font-semibold">A portfolio across Nairobi's most active residential addresses.</h2>
            <p className="mt-5 text-lg leading-8 text-white/66">
              Each Ivy project is planned around location strength, resident experience, amenity depth, and flexible buyer pathways, making the homes attractive for both owner-occupiers and investors.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {projects.map((project) => (
              <article key={project.slug} className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.045]">
                <div className="relative h-64">
                  <Image src={project.image} alt={project.name} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1110] to-transparent" />
                  <div className="absolute bottom-5 left-5 flex items-end gap-3">
                    <Image src={project.logo} alt={`${project.name} logo`} width={project.secondaryLogo ? 170 : 130} height={64} className={`max-h-16 w-auto ${project.logoClass ?? ""}`} />
                    {project.secondaryLogo && (
                      <Image src={project.secondaryLogo} alt={`${project.name} secondary logo`} width={78} height={42} className={`max-h-10 w-auto ${project.logoClass ?? ""}`} />
                    )}
                  </div>
                </div>
                <div className="p-6">
                  <p className="flex items-center gap-2 text-sm text-white/60"><MapPin size={16} /> {project.location}</p>
                  <h3 className="mt-4 text-2xl font-semibold">{project.name}</h3>
                  <p className="mt-3 leading-7 text-white/66">{project.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.stats.slice(0, 3).map((stat) => (
                      <span key={stat} className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/68">{stat}</span>
                    ))}
                  </div>
                  <Link href={`/${project.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#c9a15b]">
                    View project <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-[#f3eddf] text-[#121512]">
        <div className="container grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow">How we build</p>
            <h2 className="mt-4 font-serif text-5xl font-semibold">A company standard built around trust, comfort, and lasting value.</h2>
            <p className="mt-5 text-lg leading-8 text-black/64">
              The Ivy Group is guided by a simple idea: a home should feel exceptional to live in today and remain valuable as Nairobi continues to grow.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {companyPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div key={pillar.title} className="rounded-lg border border-[#d8c49a]/35 bg-white/70 p-6 shadow-[0_12px_32px_rgba(36,28,12,0.08)]">
                  <Icon className="text-[#c9a15b]" size={26} />
                  <h3 className="mt-5 text-2xl font-semibold">{pillar.title}</h3>
                  <p className="mt-3 leading-7 text-black/62">{pillar.copy}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section bg-[#111815] text-white">
        <div className="container grid gap-8 md:grid-cols-3">
          {[
            ["Completed Portfolio", "A growing development history that supports buyer confidence and brand credibility."],
            ["Premium Residences", "Homes planned with amenities, finishes, security, and convenience at the center."],
            ["Investor-Aware Planning", "Projects positioned for rental demand, location advantage, and long-term ownership value."]
          ].map(([title, copy]) => (
            <div key={title} className="rounded-lg border border-white/10 bg-white/[0.045] p-7">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#c9a15b]">The Ivy Group</p>
              <h3 className="mt-4 text-2xl font-semibold">{title}</h3>
              <p className="mt-3 leading-7 text-white/64">{copy}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
