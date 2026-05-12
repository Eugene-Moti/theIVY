import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";

export function ProjectCard({ project, priority = false }: { project: any; priority?: boolean }) {
  return (
    <Link href={`/${project.slug}`} className={`group block overflow-hidden rounded-lg border border-[#d8c49a]/25 bg-[#111815] text-white shadow-[0_18px_50px_rgba(36,28,12,0.14)] ${priority ? "md:col-span-2" : ""}`}>
      <div className="relative h-80 overflow-hidden">
        <Image src={project.image} alt={project.name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1110] via-[#0d1110]/20 to-transparent" />
        <span className="absolute left-5 top-5 rounded-full bg-[#c9a15b] px-4 py-2 text-xs font-bold text-[#111]">{project.status}</span>
        <div className="absolute bottom-5 left-5 flex items-end gap-3">
          <Image src={project.logo} alt={`${project.name} logo`} width={project.secondaryLogo ? 180 : 140} height={70} className={`max-h-16 w-auto drop-shadow-[0_0_16px_rgba(0,0,0,0.45)] ${project.logoClass ?? ""}`} />
          {project.secondaryLogo && (
            <Image src={project.secondaryLogo} alt={`${project.name} secondary logo`} width={82} height={44} className={`max-h-11 w-auto drop-shadow-[0_0_16px_rgba(0,0,0,0.45)] ${project.logoClass ?? ""}`} />
          )}
        </div>
      </div>
      <div className="p-6">
        <div className="mb-3 flex items-center gap-2 text-sm text-white/60">
          <MapPin size={16} /> {project.location}
        </div>
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-2xl font-semibold">{project.name}</h3>
          <ArrowUpRight className="mt-1 text-[#c9a15b] transition group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>
        <p className="mt-3 text-white/66">{project.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.stats.map((stat: string) => (
            <span key={stat} className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/68">{stat}</span>
          ))}
        </div>
      </div>
    </Link>
  );
}
