import type { Metadata } from "next";
import { ArrowRight, Building2, CalendarDays, FileText, Mail, MapPin, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { LeadForm } from "@/components/lead-form";
import { BrochureDownload } from "@/components/brochure-download";
import { Reveal } from "@/components/motion";
import { contact, projects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact The Ivy Group sales team to book a site visit, request a price list, or learn more about Ivy Park Residence and other Nairobi developments."
};

export default function Contact() {
  const contactCards = [
    ["Prime Nairobi portfolio", "Explore residences in Kilimani, Kileleshwa, and Westlands."],
    ["Guided buyer journey", "Get help with prices, site visits, floor plans, and payment pathways."],
    ["Fast response channels", "Call, WhatsApp, email, or request a brochure from one place."],
    ["Investment-aware advice", "Compare location strengths, amenities, rental demand, and timelines."]
  ];

  return (
    <div className="bg-[#f3eddf] text-[#121512]">
      <section className="section relative isolate overflow-hidden pt-36">
        <div className="pointer-events-none absolute left-[-8rem] top-24 h-80 w-80 rounded-full bg-[#c9a15b]/18 blur-3xl" />
        <div className="pointer-events-none absolute bottom-[-12rem] right-[-7rem] h-96 w-96 rounded-full bg-[#31493d]/14 blur-3xl" />

        <div className="container grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr]">
          <Reveal x={-78} distance={0} duration={0.88}>
            <p className="eyebrow">Get in touch</p>
            <h1 className="mt-4 font-serif text-6xl font-semibold">Book a site visit or request the latest price list.</h1>
            <p className="mt-6 text-lg leading-8 text-black/64">
              Speak with The Ivy Group about available residences, payment plans, site visits, brochures, and the right Nairobi address for your lifestyle or investment goals.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#download-brochure" className="featured-cta gold-gradient inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-bold text-[#111] transition">
                Choose a Brochure <ArrowRight size={18} />
              </a>
              <a href={contact.whatsapp} target="_blank" rel="noreferrer noopener" className="inline-flex items-center justify-center gap-2 rounded-full border border-[#25d366]/40 bg-[#25d366] px-6 py-3 font-bold text-[#06140b] transition hover:bg-[#5bed8c]">
                <MessageCircle size={18} /> WhatsApp Us
              </a>
            </div>
          </Reveal>

          <Reveal x={78} distance={0} duration={0.88}>
            <div className="relative overflow-hidden rounded-lg border border-[#d8c49a]/35 bg-[#111815] p-5 text-white shadow-[0_28px_90px_rgba(36,28,12,0.22)]">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c9a15b] to-transparent" />
              <p className="eyebrow">Sales desk</p>
              <h2 className="mt-3 text-3xl font-semibold">Fast help for brochures, visits, pricing, and unit selection.</h2>
              <div className="mt-7 space-y-4 text-white/72">
                <p className="flex items-center gap-3"><MapPin className="shrink-0 text-[#c9a15b]" size={20} /> {contact.office}</p>
                <a href={`mailto:${contact.email}`} className="flex items-center gap-3 transition hover:text-[#c9a15b]"><Mail className="shrink-0" size={20} /> {contact.email}</a>
                <a href={`tel:${contact.phone.replaceAll(" ", "")}`} className="flex items-center gap-3 transition hover:text-[#c9a15b]"><Phone className="shrink-0" size={20} /> {contact.phone}</a>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <a href={`tel:${contact.phone.replaceAll(" ", "")}`} className="mobile-tap inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-[#c9a15b]/70 bg-[#c9a15b]/10 px-5 py-3 font-bold text-[#f3dfb1] transition hover:border-[#f3dfb1] hover:bg-[#c9a15b] hover:text-[#111815]">
                  <Phone size={18} /> Call Now
                </a>
                <a href="#visit-request" className="gold-gradient mobile-tap inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-5 py-3 font-bold text-[#111815] shadow-[0_14px_34px_rgba(201,161,91,0.22)] transition hover:brightness-110">
                  <CalendarDays size={18} /> Book Visit
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="download-brochure" className="section scroll-mt-28 bg-[#111815] text-white">
        <div className="container">
          <Reveal distance={22} className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">Download brochure</p>
            <h2 className="mt-4 font-serif text-5xl font-semibold">Choose the project brochure you need.</h2>
            <p className="mt-5 text-lg leading-8 text-white/62">
              Select a development, share your details, and the brochure will open immediately while our sales team receives your request.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {projects.map((project, index) => (
              <Reveal key={project.slug} delay={index * 0.08} distance={34} className="h-full">
                <article className="group flex h-full flex-col rounded-lg border border-white/10 bg-white/[0.045] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#c9a15b]/55 hover:bg-white/[0.07] hover:shadow-[0_24px_70px_rgba(0,0,0,0.28)]">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#c9a15b] text-[#111815] transition group-hover:scale-105">
                      <FileText size={21} />
                    </div>
                    <span className="rounded-full border border-white/12 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-white/58">{project.status}</span>
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold">{project.name}</h3>
                  <p className="mt-2 flex items-center gap-2 text-sm text-white/58"><Building2 size={15} /> {project.location}</p>
                  <p className="mt-4 flex-1 text-sm leading-6 text-white/62">{project.description}</p>
                  <div className="featured-cta-wrap mt-6">
                    <BrochureDownload brochure={project.brochure} projectName={project.name} variant="dark" label="Share details & download" />
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="visit-request" className="section scroll-mt-28 bg-[#f3eddf]">
        <div className="container grid gap-10 lg:grid-cols-[0.92fr_1.08fr]">
          <Reveal x={-58} distance={0} duration={0.82}>
            <p className="eyebrow">What we can help with</p>
            <h2 className="mt-4 font-serif text-5xl font-semibold">A cleaner path from interest to viewing.</h2>
            <p className="mt-5 text-lg leading-8 text-black/62">
              Tell us what you are comparing, when you want to visit, or which unit size fits your budget. We will guide you through the next practical step.
            </p>

            <div className="mt-9 grid gap-3 sm:grid-cols-2">
              {contactCards.map(([title, copy], index) => (
                <Reveal key={title} delay={index * 0.07}>
                  <div className="group h-full rounded-lg border border-[#d8c49a]/25 bg-white/70 p-5 shadow-[0_12px_32px_rgba(36,28,12,0.08)] transition hover:-translate-y-1 hover:border-[#c9a15b]/55 hover:bg-white">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#111815] text-[#c9a15b] transition group-hover:bg-[#c9a15b] group-hover:text-[#111]">
                      {index === 0 ? <MapPin size={20} /> : index === 1 ? <CalendarDays size={20} /> : index === 2 ? <MessageCircle size={20} /> : <ShieldCheck size={20} />}
                    </div>
                    <p className="font-semibold">{title}</p>
                    <p className="mt-2 text-sm leading-6 text-black/56">{copy}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>

          <Reveal x={58} distance={0} duration={0.82}>
            <LeadForm />
          </Reveal>
        </div>
      </section>

      <section className="section bg-[#efe4cf]">
        <div className="container">
          <Reveal distance={22} className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="eyebrow">Find us</p>
              <h2 className="mt-4 font-serif text-5xl font-semibold">Visit The Ivy Group sales office.</h2>
            </div>
            <a href={`tel:${contact.phone.replaceAll(" ", "")}`} className="mobile-tap inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#c9a15b] px-6 py-3 font-bold text-[#8f642b] transition hover:bg-[#c9a15b] hover:text-[#111]">
              <Phone size={18} /> Call Before Visiting
            </a>
          </Reveal>

          <Reveal distance={26} duration={0.86} className="overflow-hidden rounded-lg border border-[#d8c49a]/45 bg-[#111815] p-2 shadow-[0_28px_90px_rgba(36,28,12,0.18)]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1546.6308911294905!2d36.78450723800919!3d-1.2772002238879356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f170056423b43%3A0xac4d412392285ae0!2sBLOSSOMS%20IVY%20RESIDENCE!5e1!3m2!1sen!2ske!4v1778488647639!5m2!1sen!2ske"
              width="1200"
              height="560"
              style={{ border: 0, width: "100%", minHeight: "min(68vh, 560px)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Blossoms Ivy Residence head office map"
            />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
