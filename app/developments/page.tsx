import type { Metadata } from "next";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Developments",
  description: "Explore The Ivy Group developments in Kilimani, Kileleshwa, and Westlands, including Ivy Park Residence, Blossoms Ivy Residence, and Luckinn Ivy Residence."
};

export default function Developments() {
  return (
    <section className="section bg-[#f3eddf] pt-36 text-[#121512]">
      <div className="container">
        <p className="eyebrow">Developments</p>
        <h1 className="mt-4 font-serif text-6xl font-semibold">Nairobi residences by The Ivy Group</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-black/64">Browse ongoing luxury apartment projects designed around lifestyle amenities, prime locations, and strong investment fundamentals.</p>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {projects.map((project, index) => <ProjectCard key={project.slug} project={project} priority={index === 0} />)}
        </div>
      </div>
    </section>
  );
}
