import type { Metadata } from "next";
import { CalendarDays, Mail, MapPin, MessageCircle, Phone, ShieldCheck } from "lucide-react";
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
    <section className="section bg-[#f3eddf] pt-36 text-[#121512]">
      <div className="container grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="eyebrow">Get in touch</p>
          <h1 className="mt-4 font-serif text-6xl font-semibold">Book a site visit or request the latest price list.</h1>
          <p className="mt-6 text-lg leading-8 text-black/64">
            Speak with The Ivy Group about available residences, payment plans, site visits, brochures, and the right Nairobi address for your lifestyle or investment goals.
          </p>
          <div className="mt-8 space-y-3 text-lg text-black/68">
            <p className="flex items-center gap-3"><MapPin className="text-[#c9a15b]" size={20} /> {contact.office}</p>
            <a href={`mailto:${contact.email}`} className="flex items-center gap-3 text-[#8f642b] transition hover:text-[#c9a15b]"><Mail size={20} /> {contact.email}</a>
            <a href={`tel:${contact.phone.replaceAll(" ", "")}`} className="flex items-center gap-3 text-[#8f642b] transition hover:text-[#c9a15b]"><Phone size={20} /> {contact.phone}</a>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={contact.whatsapp} target="_blank" rel="noreferrer noopener" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25d366] px-6 py-3 font-bold text-[#06140b] transition hover:bg-[#5bed8c]">
              <MessageCircle size={18} /> WhatsApp Us
            </a>
            <a href={`tel:${contact.phone.replaceAll(" ", "")}`} className="inline-flex items-center justify-center gap-2 rounded-full border border-[#c9a15b] px-6 py-3 font-bold text-[#8f642b] transition hover:bg-[#c9a15b] hover:text-[#111]">
              <Phone size={18} /> Call Now
            </a>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {contactCards.map(([title, copy], index) => (
              <Reveal key={title} delay={index * 0.08}>
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
        </div>
        <div>
          <LeadForm />
          <div className="mt-6 overflow-hidden rounded-lg border border-[#d8c49a]/25">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1546.6308911294905!2d36.78450723800919!3d-1.2772002238879356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f170056423b43%3A0xac4d412392285ae0!2sBLOSSOMS%20IVY%20RESIDENCE!5e1!3m2!1sen!2ske!4v1778488647639!5m2!1sen!2ske" width="600" height="450" style={{ border: 0, width: "100%" }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Blossoms Ivy Residence head office map" />
          </div>
          <div id="brochures" className="mt-6 rounded-lg border border-[#d8c49a]/25 bg-[#111815] p-6 text-white">
            <p className="eyebrow">Brochures</p>
            <h2 className="mt-3 text-2xl font-semibold">Download project brochures</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {projects.map((project) => (
                <div key={project.slug} className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                  <p className="mb-3 font-semibold">{project.name}</p>
                  <BrochureDownload brochure={project.brochure} projectName={project.name} variant="dark" label="Download" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
