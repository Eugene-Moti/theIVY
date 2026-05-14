import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin } from "lucide-react";
import { LeadForm } from "@/components/lead-form";
import { BrochureDownload } from "@/components/brochure-download";

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
  return (
    <>
      <section className="relative min-h-[86vh] overflow-hidden px-6 pt-32">
        <div className="image-vignette absolute inset-0">
          <Image src={hero} alt={project.name} fill priority sizes="100vw" className="object-cover" />
        </div>
        <div className="relative z-10 mx-auto grid min-h-[calc(86vh-8rem)] max-w-7xl items-end gap-8 pb-16 lg:grid-cols-[1fr_390px]">
          <div>
            <p className="eyebrow">{project.status}</p>
            <h1 className="mt-4 font-serif text-5xl font-semibold leading-tight md:text-7xl">{project.name}</h1>
            <p className="mt-4 flex items-center gap-2 text-lg text-white/76"><MapPin size={19} /> {project.location}</p>
            <p className="mt-6 max-w-3xl text-xl leading-8 text-white/76">{intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <BrochureDownload brochure={project.brochure} projectName={project.name} />
              <Link href="/floor-plans" className="rounded-full border border-white/20 px-6 py-4 font-bold">View Floor Plans</Link>
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
            <h2 className="font-serif text-5xl font-semibold">Residence highlights</h2>
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
                <div key={unit} className="flex items-center justify-between rounded-lg border border-white/10 bg-[#0d1110] p-5">
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
          <h2 className="mt-3 font-serif text-5xl font-semibold">Lifestyle, interiors, and architecture</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {gallery.map((image, index) => (
              <div key={image} className={`relative overflow-hidden rounded-lg ${index === 0 ? "min-h-[420px] md:col-span-2" : "min-h-[280px]"}`}>
                <Image src={image} alt={`${project.name} gallery ${index + 1}`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-700 hover:scale-105" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
