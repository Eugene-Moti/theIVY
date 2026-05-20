import type { Metadata } from "next";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/motion";
import { projects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Developments",
  description: "Explore The Ivy Group developments in Kilimani, Kileleshwa, and Westlands, including Ivy Park Residence, Blossoms Ivy Residence, and Luckinn Ivy Residence."
};

export default function Developments() {
  return (
    <section className="section bg-[#f3eddf] pt-36 text-[#121512]">
      <div className="container">
        <Reveal x={-72} distance={0} duration={0.85}>
          <p className="eyebrow">Developments</p>
          <h1 className="mt-4 font-serif text-6xl font-semibold">Nairobi residences by The Ivy Group</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-black/64">Browse ongoing luxury apartment projects designed around lifestyle amenities, prime locations, and strong investment fundamentals.</p>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.1} x={index % 2 === 0 ? -54 : 54} distance={18} duration={0.78} className={index === 0 ? "md:col-span-2" : ""}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
