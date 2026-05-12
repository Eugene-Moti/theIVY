import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
// motion is client-only; placeholder page uses static markup for SSR safety.

import Link from "next/link";
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
              <Link href="/contact" className="rounded-full bg-[#C9A96E] px-6 py-3 font-bold text-black">
                Book a Viewing
              </Link>
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

        <div className="mt-14">
          <div className="rounded-2xl border border-white/10 bg-[#111111] p-6">
            <p className="text-white/70">
              Next step will replace this placeholder with the full spec: amenities list, unit mix table, VR modal,
              floor plan tabs, sticky CTA, and SEO/schema.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

