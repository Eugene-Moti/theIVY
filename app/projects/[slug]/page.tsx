import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
// motion is client-only; placeholder page uses static markup for SSR safety.

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { BrochureDownload } from "@/components/brochure-download";
import { projects, assets } from "@/lib/data";

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
    <div className="py-24">
      {/* Placeholder luxury page: will be fully rebuilt per spec in next step. */}
      <div className="relative mx-auto max-w-7xl px-4">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0A0A0A]">
          <div className="absolute inset-0">
            <Image
              src={project.image}
              alt={`${project.name} hero image`}
              fill
              priority
              className="object-cover brightness-[0.65]"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>
          <div className="relative p-8 md:p-14">
            <h1 className="font-serif text-5xl font-light md:text-7xl">{project.name}</h1>

            <p className="mt-4 max-w-2xl text-white/70">
              {project.location} · Completion: {project.completion}
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <BrochureDownload brochure={project.brochure} projectName={project.name} />
              <Link
                href="/floor-plans"
                className="rounded-full border border-white/20 bg-black/30 px-6 py-3 font-bold text-white"
              >
                View Floor Plans
              </Link>
            </div>


            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {project.stats.map((s) => (
                <div key={s} className="rounded-2xl border border-white/10 bg-black/30 p-4">
                  <p className="text-white/90 font-bold">{s.split(" ")[0]}</p>
                  <p className="mt-1 text-xs uppercase tracking-wide text-white/50">
                    {s.replace(s.split(" ")[0], "").trim()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <section className="mt-14">
          <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#C9A96E]">Project location</p>
              <h2 className="mt-3 font-serif text-4xl font-light md:text-5xl">{project.name} on the map</h2>
            </div>
            <p className="max-w-xl text-white/60 md:text-right">
              Explore the surrounding roads, nearby lifestyle hubs, and access routes around {project.location}.
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#111111] shadow-[0_24px_80px_rgba(0,0,0,0.32)]">
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
          </div>
        </section>

        <div className="mt-14">
          <div className="rounded-2xl border border-white/10 bg-[#111111] p-6">
            <p className="text-white/70">
              Next step will replace this placeholder with the full spec: amenities list, unit mix table, VR modal,
              floor plan tabs, sticky CTA, and SEO/schema.
            </p>
          </div>
        </div>

        <section className="mt-14 rounded-2xl border border-white/10 bg-[#0A0A0A] p-5 md:p-7">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#C9A96E]">Explore more residences</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Link
              href={`/projects/${previousProject.slug}`}
              className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition hover:border-[#C9A96E]/70 hover:bg-white/[0.06]"
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
              className="group flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-right transition hover:border-[#C9A96E]/70 hover:bg-white/[0.06]"
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
        </section>
      </div>
    </div>
  );
}

