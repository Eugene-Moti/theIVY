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
      <section className="section bg-[#f3eddf] text-[#121512]">
        <div className="container grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <p className="eyebrow">Flagship project</p>
            <h2 className="mt-4 font-serif text-5xl font-semibold">Ivy Park Residence brings resort-level living to Kilimani.</h2>
            <p className="mt-6 text-lg leading-8 text-black/64">Near Yaya Centre on Kirichwa Road, Ivy Park is built for homeowners and investors who want central access, lifestyle amenities, flexible payment plans, and strong rental demand.</p>
            <div className="mt-8 grid grid-cols-2 gap-3">
              {["1BR from KES 6.8M", "2BR from KES 10.7M", "3BR + DSQ from KES 15.6M", "20% deposit"].map((item) => (
                <div key={item} className="flex items-center gap-2 text-black/72"><CheckCircle2 size={18} className="text-[#c9a15b]" /> {item}</div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/ivy-park-residence" className="inline-flex items-center gap-2 rounded-full border border-[#c9a15b] px-6 py-3 font-bold text-[#c9a15b]">
                View Ivy Park Residence <ArrowRight size={17} />
              </Link>
              <BrochureDownload brochure={projects[0].brochure} projectName={projects[0].name} variant="dark" />
            </div>
          </Reveal>
          <Reveal delay={0.1} className="relative min-h-[520px] overflow-hidden rounded-lg">
            <Image src={assets.ivyParkExterior} alt="Ivy Park Residence facade" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </Reveal>
        </div>
      </section>
      <section className="section bg-[#0d1110]">
        <div className="container">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">Developments</p>
              <h2 className="mt-3 font-serif text-5xl font-semibold">Latest launches and ongoing residences</h2>
            </div>
            <Link href="/developments" className="text-sm font-bold text-[#c9a15b]">View all developments</Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {projects.map((project, index) => <ProjectCard key={project.slug} project={project} priority={index === 0} />)}
          </div>
        </div>
      </section>
      <section className="section bg-[#ece4d5] text-[#121512]">
        <div className="container grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#8f642b]">Our company</p>
            <h2 className="mt-4 font-serif text-5xl font-semibold">A Nairobi developer shaped around trust, design, and lasting value.</h2>
            <p className="mt-5 text-lg leading-8 text-black/64">The Ivy Group creates premium residences in strategic Nairobi neighborhoods, combining refined architecture, lifestyle amenities, flexible buyer support, and clear guidance from first enquiry to handover.</p>
          </div>
          <LeadForm />
        </div>
      </section>
    </>
  );
}
