import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, CreditCard, MapPin } from "lucide-react";
import { BrochureDownload } from "@/components/brochure-download";
import { projects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Buy",
  description: "Compare Ivy Group projects for sale in Nairobi and review payment plan options for Ivy Park, Blossoms Ivy, and Luckinn Ivy."
};

export default function Buy() {
  return (
    <section className="section bg-[#f3eddf] pt-36 text-[#121512]">
      <div className="container">
        <p className="eyebrow">Buy with The Ivy Group</p>
        <h1 className="mt-4 max-w-5xl font-serif text-6xl font-semibold">Explore available residences and flexible payment pathways.</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-black/64">
          Compare our Nairobi developments, review current purchase guidance, and choose the project that fits your lifestyle, rental strategy, or long-term portfolio goals.
        </p>

        <div className="mt-12 grid gap-6">
          {projects.map((project) => (
            <article key={project.slug} className="grid overflow-hidden rounded-lg border border-[#d8c49a]/25 bg-[#111815] text-white shadow-[0_18px_50px_rgba(36,28,12,0.14)] lg:grid-cols-[0.95fr_1.05fr]">
              <div className="relative min-h-[360px]">
                <Image src={project.image} alt={`${project.name} exterior`} fill sizes="(max-width: 1024px) 100vw, 48vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1110]/90 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 flex items-end gap-3">
                  <Image src={project.logo} alt={`${project.name} logo`} width={project.secondaryLogo ? 210 : 170} height={80} className={`max-h-20 w-auto ${project.logoClass ?? ""}`} />
                  {project.secondaryLogo && (
                    <Image src={project.secondaryLogo} alt={`${project.name} secondary logo`} width={94} height={50} className={`max-h-12 w-auto ${project.logoClass ?? ""}`} />
                  )}
                </div>
              </div>
              <div className="p-7 md:p-9">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-[#c9a15b] px-4 py-2 text-xs font-bold text-[#111]">{project.status}</span>
                  <span className="flex items-center gap-2 text-sm text-white/62"><MapPin size={16} /> {project.location}</span>
                </div>
                <h2 className="mt-5 font-serif text-4xl font-semibold">{project.name}</h2>
                <p className="mt-3 text-lg text-[#c9a15b]">{project.price}</p>
                <p className="mt-4 leading-7 text-white/68">{project.description}</p>

                <div className="mt-7 grid gap-3 md:grid-cols-2">
                  {project.paymentPlans.map((item: string) => (
                    <div key={item} className="flex items-start gap-3 rounded-lg border border-white/10 bg-[#0d1110]/55 p-4 text-sm text-white/76">
                      <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#c9a15b]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link href={`/${project.slug}`} className="inline-flex items-center justify-center gap-2 rounded-full border border-[#c9a15b] px-6 py-3 font-bold text-[#c9a15b]">
                    Learn More <ArrowRight size={17} />
                  </Link>
                  <BrochureDownload brochure={project.brochure} projectName={project.name} variant="dark" />
                  <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#c9a15b] px-6 py-3 font-bold text-[#111]">
                    <CreditCard size={17} /> Request Payment Plan
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
