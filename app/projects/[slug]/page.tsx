import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
// motion is client-only; placeholder page uses static markup for SSR safety.

import Link from "next/link";
import { ArrowLeft, ArrowRight, Phone } from "lucide-react";
import { BrochureDownload } from "@/components/brochure-download";
import { Reveal } from "@/components/motion";
import { ProjectShowcaseCarousel } from "@/components/project-showcase-carousel";
import { contact, projects, assets } from "@/lib/data";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolved = await params;
  const project = projects.find((p) => p.slug === resolved.slug);

  if (!project) return { title: "The Ivy Group | Project" };

  const canonical = `https://ivygroup.ke/projects/${project.slug}`;
  const title = `The Ivy Group | ${project.name} | Luxury Apartments in Nairobi`;
  const description = `${project.name} in Nairobi (Kenya): luxury apartments, prime location, off-plan options, and investment-focused amenities. Explore unit mix, floor plans, and book a viewing.`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      images: project.image ? [project.image] : [assets.ivyParkHero]
    }
  };
}

export default function ProjectSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  // Next.js/TS types in this repo are expecting params as Promise<any>.
  // This keeps build-time type checking happy.
  const { slug } = (params as unknown as { slug: string });
  const project = projects.find((p) => p.slug === (slug as string));

  if (!project) notFound();

  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  const previousProject = projects[(currentIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <div className="overflow-x-hidden pb-24 pt-16 md:pt-24">
      <div className="relative">
        <div className="relative overflow-hidden border-y border-white/10 bg-[#0A0A0A]">
          <div className="absolute inset-0">
            {"heroVideo" in project && project.heroVideo ? (
              <video
                className="h-full w-full object-cover brightness-[0.62]"
                src={project.heroVideo}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={project.image}
                aria-label={`${project.name} cinematic video`}
              />
            ) : (
              <Image
                src={project.image}
                alt={`${project.name} hero image`}
                fill
                priority
                className="object-cover brightness-[0.65]"
                sizes="100vw"
              />
            )}
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,10,0.72),rgba(10,10,10,0.08)_58%,rgba(10,10,10,0.38)),linear-gradient(0deg,rgba(10,10,10,0.78),transparent_56%)]" />
          </div>
          <div className="relative mx-auto flex min-h-[72vh] max-w-7xl flex-col justify-end p-4 pb-8 md:min-h-[82vh] md:p-14">
            <Reveal x={-86} distance={0} duration={0.9}>
            <h1 className="font-serif text-[clamp(2.8rem,14vw,4.8rem)] font-light leading-none md:text-7xl">{project.name}</h1>

            <p className="mt-4 max-w-2xl text-white/70">
              {project.location} · {project.completion}
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <div className="featured-cta-wrap">
                <BrochureDownload brochure={project.brochure} projectName={project.name} />
              </div>
              <Link
                href="/floor-plans"
                className="featured-cta mobile-tap flex min-h-12 items-center justify-center rounded-full border border-white/20 bg-black/30 px-6 py-3 font-bold text-white"
              >
                View Floor Plans
              </Link>
            </div>


            </Reveal>
          </div>
        </div>

        <Reveal distance={30} scale={0.98} duration={0.82}>
          <ProjectShowcaseCarousel projectName={project.name} items={project.showcase} />
        </Reveal>

        <section className="mx-auto mt-12 max-w-7xl px-4 md:mt-14">
          <Reveal x={-64} distance={0} duration={0.82} className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#C9A96E]">Project location</p>
              <h2 className="mt-3 font-serif text-[2.25rem] font-light leading-none md:text-5xl">{project.name} on the map</h2>
            </div>
            <div className="flex max-w-xl flex-col gap-3 md:items-end">
              <p className="text-white/60 md:text-right">
                Explore the surrounding roads, nearby lifestyle hubs, and access routes around {project.location}.
              </p>
              <a href={`tel:${contact.phone.replaceAll(" ", "")}`} className="mobile-tap inline-flex min-h-12 w-fit items-center justify-center gap-2 rounded-full border border-[#C9A96E] px-5 py-3 text-sm font-bold text-[#C9A96E] transition hover:bg-[#C9A96E] hover:text-[#111]">
                <Phone size={17} /> Call Before Visiting
              </a>
            </div>
          </Reveal>
          <Reveal x={64} distance={18} duration={0.82} className="overflow-hidden rounded-2xl border border-white/10 bg-[#111111] shadow-[0_24px_80px_rgba(0,0,0,0.32)]">
            <iframe
              src={project.mapEmbed}
              width="100%"
              height="560"
              style={{ border: 0, width: "100%" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${project.name} location map`}
              className="block min-h-[420px] w-full"
            />
          </Reveal>
        </section>

        <Reveal distance={28} scale={0.97} duration={0.78} className="mx-auto mt-14 max-w-7xl rounded-2xl border border-white/10 bg-[#0A0A0A] p-5 md:p-7">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#C9A96E]">Explore more residences</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Link
              href={`/projects/${previousProject.slug}`}
              className="group flex min-w-0 items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition hover:border-[#C9A96E]/70 hover:bg-white/[0.06]"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 text-[#C9A96E] transition group-hover:border-[#C9A96E]">
                <ArrowLeft size={18} />
              </span>
              <span>
                <span className="block text-xs font-bold uppercase tracking-[0.16em] text-white/42">Previous project</span>
                <span className="mt-1 block font-serif text-2xl text-white">{previousProject.name}</span>
                <span className="mt-1 block text-sm text-white/58">{previousProject.location}</span>
              </span>
            </Link>
            <Link
              href={`/projects/${nextProject.slug}`}
              className="group flex min-w-0 items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-right transition hover:border-[#C9A96E]/70 hover:bg-white/[0.06]"
            >
              <span>
                <span className="block text-xs font-bold uppercase tracking-[0.16em] text-white/42">Next project</span>
                <span className="mt-1 block font-serif text-2xl text-white">{nextProject.name}</span>
                <span className="mt-1 block text-sm text-white/58">{nextProject.location}</span>
              </span>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 text-[#C9A96E] transition group-hover:border-[#C9A96E]">
                <ArrowRight size={18} />
              </span>
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

