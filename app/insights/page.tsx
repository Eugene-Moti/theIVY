import type { Metadata } from "next";
import { InsightsGrid } from "@/components/insights-grid";
import { Reveal } from "@/components/motion";

export const metadata: Metadata = {
  title: "Insights",
  description: "Read Ivy Group property insights on Nairobi apartment demand, payment plans, investment strategy, and lifestyle-led developments."
};

export default function Insights() {
  return (
    <section className="section bg-[#f3eddf] pt-36 text-[#121512]">
      <div className="container">
        <Reveal x={-72} distance={0} duration={0.85}>
          <p className="eyebrow">Insights</p>
          <h1 className="mt-4 max-w-5xl font-serif text-6xl font-semibold">Property intelligence for Nairobi buyers and investors.</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-black/64">
            Explore practical guides, neighborhood thinking, and buyer education from The Ivy Group team.
          </p>
        </Reveal>

        <InsightsGrid />
      </div>
    </section>
  );
}
