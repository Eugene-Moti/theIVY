import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, MapPin, Phone } from "lucide-react";
import { LeadForm } from "@/components/lead-form";
import { BrochureDownload } from "@/components/brochure-download";
import { contact, projects } from "@/lib/data";

type ProjectPageProps = {
  project: any;
  hero: string;
  intro: string;
  details: string[];
  amenities: string[];
  units: string[];
  gallery: string[];
  investment?: string[];
};

export function ProjectPage({ project, hero, intro, details, amenities, units, gallery, investment = [] }: ProjectPageProps) {
  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  const previousProject = projects[(currentIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <>
      <section className="relative min-h-[86vh] overflow-hidden px-4 pt-28 md:px-6 md:pt-32">
        <div className="image-vignette absolute inset-0">
          <Image src={hero} alt={project.name} fill priority sizes="100vw" className="object-cover" />
        </div>
        <div className="relative z-10 mx-auto grid min-h-[calc(86vh-7rem)] max-w-7xl items-end gap-8 pb-14 lg:grid-cols-[1fr_390px]">
          <div>
            <p className="eyebrow">{project.status}</p>
            <h1 className="mt-4 font-serif text-[clamp(2.8rem,14vw,4.8rem)] font-semibold leading-none md:text-7xl">{project.name}</h1>
            <p className="mt-4 flex items-center gap-2 text-base text-white/76 md:text-lg"><MapPin size={19} className="shrink-0" /> {project.location}</p>
            <p className="mt-5 max-w-3xl text-base leading-7 text-white/76 md:mt-6 md:text-xl md:leading-8">{intro}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <BrochureDownload brochure={project.brochure} projectName={project.name} />
              <Link href="/floor-plans" className="mobile-tap flex min-h-12 items-center justify-center rounded-full border border-white/20 px-6 py-4 font-bold">View Floor Plans</Link>
            </div>
          </div>
          <LeadForm compact />
        </div>
      </section>
      <section className="section bg-[#111815]">
        <div className="container grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <aside className="top-28 h-fit rounded-lg border border-white/10 bg-white/[0.04] p-6 lg:sticky">
            <p className="eyebrow">Project snapshot</p>
            <div className="mt-5 space-y-4">
              {details.map((detail) => <p key={detail} className="border-b border-white/10 pb-4 text-white/76">{detail}</p>)}
            </div>
          </aside>
          <div>
            <h2 className="font-serif text-[2.4rem] font-semibold leading-none md:text-5xl">Residence highlights</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {amenities.map((item) => (
                <div key={item} className="flex gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-4 text-white/76">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-[#c9a15b]" size={18} /> {item}
                </div>
              ))}
            </div>
            <h2 className="mt-14 font-serif text-4xl font-semibold">Unit mix</h2>
            <div className="mt-6 grid gap-4">
              {units.map((unit) => (
                <div key={unit} className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-[#0d1110] p-5">
                  <span>{unit}</span>
                  <ArrowRight className="text-[#c9a15b]" size={18} />
                </div>
              ))}
            </div>
            {investment.length > 0 && (
              <>
                <h2 className="mt-14 font-serif text-4xl font-semibold">Investment case</h2>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {investment.map((item) => <div key={item} className="rounded-lg bg-[#c9a15b] p-5 font-semibold text-[#111]">{item}</div>)}
                </div>
              </>
            )}
          </div>
        </div>
      </section>
      <section className="section bg-[#f3eddf] text-[#121512]">
        <div className="container">
          <p className="eyebrow">Gallery</p>
          <h2 className="mt-3 font-serif text-[2.4rem] font-semibold leading-none md:text-5xl">Lifestyle, interiors, and architecture</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {gallery.map((image, index) => (
              <div key={image} className={`relative overflow-hidden rounded-lg ${index === 0 ? "min-h-[420px] md:col-span-2" : "min-h-[280px]"}`}>
                <Image src={image} alt={`${project.name} gallery ${index + 1}`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-700 hover:scale-105" />
              </div>
            ))}
          </div>
        </div>
      </section>
      {project.mapEmbed && (
        <section className="section bg-[#111815]">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="eyebrow">Project location</p>
                <h2 className="mt-3 font-serif text-[2.4rem] font-semibold leading-none md:text-5xl">{project.name} on the map</h2>
              </div>
              <div className="flex max-w-xl flex-col gap-3 md:items-end">
                <p className="text-white/62 md:text-right">
                  Explore the surrounding roads, nearby lifestyle hubs, and access routes around {project.location}.
                </p>
                <a href={`tel:${contact.phone.replaceAll(" ", "")}`} className="mobile-tap inline-flex min-h-12 w-fit items-center justify-center gap-2 rounded-full border border-[#c9a15b] px-5 py-3 text-sm font-bold text-[#c9a15b] transition hover:bg-[#c9a15b] hover:text-[#111]">
                  <Phone size={17} /> Call Before Visiting
                </a>
              </div>
            </div>
            <div className="overflow-hidden rounded-lg border border-white/10 bg-[#0d1110] shadow-[0_24px_80px_rgba(0,0,0,0.32)]">
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
          </div>
        </section>
      )}
      <section className="section bg-[#0d1110]">
        <div className="mx-auto max-w-7xl rounded-lg border border-white/10 bg-white/[0.035] p-4 md:p-7">
          <p className="eyebrow">Explore more residences</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Link
              href={`/projects/${previousProject.slug}`}
              className="group flex min-w-0 items-center gap-4 rounded-lg border border-white/10 bg-[#111815] p-4 transition hover:border-[#c9a15b]/70 hover:bg-white/[0.06]"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 text-[#c9a15b] transition group-hover:border-[#c9a15b]">
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
              className="group flex min-w-0 items-center justify-between gap-4 rounded-lg border border-white/10 bg-[#111815] p-4 text-right transition hover:border-[#c9a15b]/70 hover:bg-white/[0.06]"
            >
              <span>
                <span className="block text-xs font-bold uppercase tracking-[0.16em] text-white/42">Next project</span>
                <span className="mt-1 block font-serif text-2xl text-white">{nextProject.name}</span>
                <span className="mt-1 block text-sm text-white/58">{nextProject.location}</span>
              </span>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 text-[#c9a15b] transition group-hover:border-[#c9a15b]">
                <ArrowRight size={18} />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
