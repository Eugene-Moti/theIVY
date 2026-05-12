import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Investment Guide",
  description: "Learn why The Ivy Group apartments in Kilimani, Kileleshwa, and Westlands are positioned for rental demand and capital appreciation."
};

export default function InvestmentGuide() {
  const items = [
    ["Prime Nairobi nodes", "Kilimani, Kileleshwa, and Westlands remain high-demand locations for professionals, expatriates, and families."],
    ["Flexible payment plans", "Buyers can reserve with a 20% deposit, then spread the balance during construction or use mortgage financing."],
    ["Amenity-led demand", "Pools, gyms, co-working spaces, rooftop lounges, and smart access support lifestyle appeal and rental competitiveness."],
    ["Ivy Park priority", "Ivy Park Residence is positioned for Airbnb, furnished rentals, and long-term occupancy near Yaya Centre."]
  ];

  return (
    <section className="section pt-36">
      <div className="container">
        <p className="eyebrow">Buyer intelligence</p>
        <h1 className="mt-4 max-w-4xl font-serif text-6xl font-semibold">A clearer path to buying off-plan apartments in Nairobi.</h1>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {items.map(([title, copy]) => (
            <article key={title} className="rounded-lg border border-white/10 bg-white/[0.045] p-7">
              <TrendingUp className="text-[#c9a15b]" />
              <h2 className="mt-6 text-2xl font-semibold">{title}</h2>
              <p className="mt-3 leading-7 text-white/64">{copy}</p>
            </article>
          ))}
        </div>
        <Link href="/contact" className="gold-gradient mt-10 inline-flex items-center gap-2 rounded-full px-6 py-4 font-bold text-[#111]">
          Talk to Sales <ArrowRight size={17} />
        </Link>
      </div>
    </section>
  );
}
