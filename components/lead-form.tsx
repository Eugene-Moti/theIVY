import { ArrowRight } from "lucide-react";

export function LeadForm({ compact = false }: { compact?: boolean }) {
  return (
    <form className={`glass grid gap-3 rounded-lg p-5 shadow-[0_24px_70px_rgba(0,0,0,0.2)] ${compact ? "" : "md:grid-cols-2"}`}>
      <input className="rounded-md border border-white/10 bg-white/8 px-4 py-3 text-sm text-white outline-none placeholder:text-white/45 focus:border-[#c9a15b]" placeholder="Full name" />
      <input className="rounded-md border border-white/10 bg-white/8 px-4 py-3 text-sm text-white outline-none placeholder:text-white/45 focus:border-[#c9a15b]" placeholder="Phone number" />
      <input className="rounded-md border border-white/10 bg-white/8 px-4 py-3 text-sm text-white outline-none placeholder:text-white/45 focus:border-[#c9a15b]" placeholder="Email address" />
      <select className="rounded-md border border-white/10 bg-[#18201b] px-4 py-3 text-sm text-white outline-none focus:border-[#c9a15b]">
        <option className="bg-[#18201b] text-white">Ivy Park Residence</option>
        <option className="bg-[#18201b] text-white">Blossoms Ivy Residence</option>
        <option className="bg-[#18201b] text-white">Luckinn Ivy Residence</option>
      </select>
      <textarea className="min-h-28 rounded-md border border-white/10 bg-white/8 px-4 py-3 text-sm text-white outline-none placeholder:text-white/45 focus:border-[#c9a15b] md:col-span-2" placeholder="Preferred unit, visit date, or message" />
      <button className="gold-gradient mobile-tap flex min-h-12 items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-bold text-[#111] md:col-span-2">
        Request Price List <ArrowRight size={16} />
      </button>
    </form>
  );
}
