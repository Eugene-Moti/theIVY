import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { BrochureDownload } from "@/components/brochure-download";
import { Hero } from "@/components/hero";
import { LeadForm } from "@/components/lead-form";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/motion";
import { assets, projects } from "@/lib/data";

export default function Home() {
  return (
    <>
      <Hero />
      <section id="featured-mobile" className="section bg-[#f3eddf] text-[#121512]">
        <div className="container grid min-w-0 gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="min-w-0">
            <p className="eyebrow">Flagship project</p>
            <h2 className="mt-4 max-w-full font-serif text-[2.25rem] font-semibold leading-[1.02] md:text-5xl">Ivy Park Residence brings resort-level living to Kilimani.</h2>
            <p className="mt-5 text-base leading-7 text-black/64 md:mt-6 md:text-lg md:leading-8">Near Yaya Centre on Kirichwa Road, Ivy Park is built for homeowners and investors who want central access, lifestyle amenities, flexible payment plans, and strong rental demand.</p>
            <div className="mobile-stat-rail mt-7 grid grid-cols-2 gap-3 md:mt-8">
              {["1BR from KES 6.8M", "2BR from KES 10.7M", "3BR + DSQ from KES 15.6M", "20% deposit"].map((item) => (
                <div key={item} className="mobile-stat-pill flex min-w-0 items-start gap-2 text-sm leading-5 text-black/72 md:items-center md:text-base"><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#c9a15b] md:mt-0" /> <span className="min-w-0">{item}</span></div>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/ivy-park-residence" className="mobile-tap inline-flex min-h-12 max-w-full items-center justify-center gap-2 rounded-full border border-[#c9a15b] px-5 py-3 text-center font-bold leading-tight text-[#8f642b] md:px-6 md:text-[#c9a15b]">
                <span>View Ivy Park Residence</span> <ArrowRight size={17} className="shrink-0" />
              </Link>
              <BrochureDownload brochure={projects[0].brochure} projectName={projects[0].name} variant="dark" />
            </div>
          </Reveal>
          <Reveal delay={0.1} className="mobile-image-card relative min-h-[390px] overflow-hidden rounded-lg md:min-h-[520px]">
            <Image src={assets.ivyParkExterior} alt="Ivy Park Residence facade" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </Reveal>
        </div>
      </section>
      <section className="section bg-[#0d1110]">
        <div className="container">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">Developments</p>
              <h2 className="mt-3 font-serif text-[2.45rem] font-semibold leading-none md:text-5xl">Latest launches and ongoing residences</h2>
            </div>
            <Link href="/developments" className="mobile-tap w-fit rounded-full border border-[#c9a15b]/35 px-4 py-2 text-sm font-bold text-[#c9a15b] md:border-0 md:px-0 md:py-0">View all developments</Link>
          </div>
          <div className="mobile-card-stack grid gap-5 md:grid-cols-2">
            {projects.map((project, index) => <ProjectCard key={project.slug} project={project} priority={index === 0} />)}
          </div>
        </div>
      </section>
      <section className="section bg-[#ece4d5] text-[#121512]">
        <div className="container grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#8f642b]">Our company</p>
            <h2 className="mt-4 font-serif text-[2.45rem] font-semibold leading-none md:text-5xl">A Nairobi developer shaped around trust, design, and lasting value.</h2>
            <p className="mt-5 text-base leading-7 text-black/64 md:text-lg md:leading-8">The Ivy Group creates premium residences in strategic Nairobi neighborhoods, combining refined architecture, lifestyle amenities, flexible buyer support, and clear guidance from first enquiry to handover.</p>
          </div>
          <LeadForm />
        </div>
      </section>
    </>
  );
}
