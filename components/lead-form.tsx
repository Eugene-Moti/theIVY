"use client";

import { CalendarDays, CheckCircle2 } from "lucide-react";
import { FormEvent, useState } from "react";

export function LeadForm({ compact = false }: { compact?: boolean }) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <form onSubmit={handleSubmit} className={`glass grid gap-3 rounded-lg p-5 shadow-[0_24px_70px_rgba(0,0,0,0.2)] ${compact ? "" : "md:grid-cols-2"}`}>
      <input required className="rounded-md border border-white/10 bg-white/8 px-4 py-3 text-sm text-white outline-none placeholder:text-white/45 focus:border-[#c9a15b]" placeholder="Full name" />
      <input required className="rounded-md border border-white/10 bg-white/8 px-4 py-3 text-sm text-white outline-none placeholder:text-white/45 focus:border-[#c9a15b]" placeholder="Phone number" />
      <input required type="email" className="rounded-md border border-white/10 bg-white/8 px-4 py-3 text-sm text-white outline-none placeholder:text-white/45 focus:border-[#c9a15b]" placeholder="Email address" />
      <select className="rounded-md border border-white/10 bg-[#18201b] px-4 py-3 text-sm text-white outline-none focus:border-[#c9a15b]">
        <option className="bg-[#18201b] text-white">Ivy Park Residence</option>
        <option className="bg-[#18201b] text-white">Blossoms Ivy Residence</option>
        <option className="bg-[#18201b] text-white">Luckinn Ivy Residence</option>
      </select>
      <textarea className="min-h-28 rounded-md border border-white/10 bg-white/8 px-4 py-3 text-sm text-white outline-none placeholder:text-white/45 focus:border-[#c9a15b] md:col-span-2" placeholder="Preferred unit, visit date, or message" />
      <button className="gold-gradient mobile-tap flex min-h-12 items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-bold text-[#111] md:col-span-2">
        Book a Visit <CalendarDays size={16} />
      </button>
      {submitted && (
        <p className="flex items-start gap-2 rounded-md border border-[#c9a15b]/35 bg-[#c9a15b]/10 px-4 py-3 text-sm leading-6 text-white/78 md:col-span-2">
          <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#c9a15b]" />
          Thank you. A dedicated sales assistant will contact you shortly to confirm your visit and guide you through the tour.
        </p>
      )}
    </form>
  );
}
