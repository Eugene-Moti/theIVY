import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Previous Projects",
  description: "Previous Ivy Group developments include Nandwa Ivy, Diamond Ivy, and Diamond Homes."
};

export default function PreviousProjects() {
  return (
    <section className="section bg-[#f3eddf] pt-36 text-[#121512]">
      <div className="container">
        <p className="eyebrow">Track record</p>
        <h1 className="mt-4 font-serif text-6xl font-semibold">Previous projects</h1>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {["Nandwa Ivy", "Diamond Ivy", "Diamond Homes"].map((name) => (
            <article key={name} className="rounded-lg border border-[#d8c49a]/25 bg-white/70 p-8 shadow-[0_12px_32px_rgba(36,28,12,0.08)]">
              <p className="text-sm font-bold text-[#c9a15b]">Completed development</p>
              <h2 className="mt-4 text-3xl font-semibold">{name}</h2>
              <p className="mt-4 text-black/64">Part of The Ivy Group's growing Nairobi residential portfolio and developer credibility.</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
