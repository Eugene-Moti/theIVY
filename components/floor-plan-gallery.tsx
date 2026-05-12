"use client";

import Image from "next/image";
import { Maximize2, X, ZoomIn, ZoomOut } from "lucide-react";
import { useMemo, useState } from "react";
import { floorPlans } from "@/lib/data";

const tabs = ["All", "1 Bedroom", "2 Bedroom", "2BR + DSQ", "3BR + DSQ", "Block Plans", "Project Plans"];

type VisiblePlan = {
  project: string;
  slug: string;
  logo: string;
  logoClass?: string;
  path: string;
  label: string;
  category: string;
};

function filename(path: string) {
  return path.split("/").pop()?.replace(/\.(jpeg|jpg|png)$/i, "") ?? "Floor plan";
}

function category(path: string) {
  const name = filename(path).toUpperCase();
  if (name.includes("1BEDROOM") || name.includes("1 BED")) return "1 Bedroom";
  if (name.includes("2BR+DSQ")) return "2BR + DSQ";
  if (name.includes("2BEDROOM") || name.includes("2 BED")) return "2 Bedroom";
  if (name.includes("3BR")) return "3BR + DSQ";
  if (name.includes("BLOCK")) return "Block Plans";
  return "Project Plans";
}

function labelFromPath(path: string, project: string, index: number) {
  const name = filename(path);
  if (!name.startsWith("WhatsApp Image")) {
    return name;
  }

  return `${project.replace(" Residence", "")} floor plan ${index + 1}`;
}

export function FloorPlanGallery() {
  const [activeProject, setActiveProject] = useState(floorPlans[0].slug);
  const [activeType, setActiveType] = useState("All");
  const [selected, setSelected] = useState<VisiblePlan | null>(null);
  const [zoom, setZoom] = useState(1);

  const allPlans = useMemo(
    () =>
      floorPlans.flatMap((group) =>
        group.plans.map((path: string, index: number) => ({
          project: group.project,
          slug: group.slug,
          logo: group.logo,
          logoClass: group.logoClass,
          path,
          label: labelFromPath(path, group.project, index),
          category: category(path)
        }))
      ),
    []
  );

  const visible = useMemo(
    () =>
      allPlans.filter((plan) => {
        const projectMatches = activeProject === "all" || plan.slug === activeProject;
        const typeMatches = activeType === "All" || plan.category === activeType;
        return projectMatches && typeMatches;
      }),
    [activeProject, activeType, allPlans]
  );

  return (
    <>
      <div className="grid gap-3 md:grid-cols-3">
        {floorPlans.map((group) => (
          <button
            key={group.slug}
            onClick={() => setActiveProject(group.slug)}
            className={`flex min-h-24 cursor-pointer items-center justify-between gap-4 rounded-lg border p-4 text-left shadow-[0_10px_26px_rgba(36,28,12,0.08)] transition duration-200 hover:-translate-y-1 hover:border-[#c9a15b] hover:bg-[#fff8e8] hover:shadow-[0_18px_38px_rgba(36,28,12,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a15b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f6f1e7] ${
              activeProject === group.slug ? "border-[#c9a15b] bg-[#111815] text-white hover:bg-[#111815]" : "border-[#d8c49a]/35 bg-white/70 text-[#121512]"
            }`}
          >
            <span>
              <span className="block text-sm font-bold uppercase tracking-[0.14em] text-[#c9a15b]">Project</span>
              <span className="mt-1 block text-lg font-semibold">{group.project}</span>
            </span>
            <Image src={group.logo} alt={`${group.project} logo`} width={96} height={42} className={`max-h-12 w-auto ${group.logoClass ?? ""}`} />
          </button>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button key={tab} onClick={() => setActiveType(tab)} className={`cursor-pointer rounded-full px-4 py-2 text-sm font-bold transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(36,28,12,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a15b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f6f1e7] ${activeType === tab ? "bg-[#c9a15b] text-[#111] hover:bg-[#d8b36f]" : "border border-[#d8c49a]/40 text-[#121512]/68 hover:border-[#c9a15b] hover:bg-[#fff8e8] hover:text-[#121512]"}`}>
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((plan) => (
          <button key={plan.path} onClick={() => { setSelected(plan); setZoom(1); }} className="group overflow-hidden rounded-lg border border-[#d8c49a]/25 bg-[#111815] text-left text-white shadow-[0_18px_50px_rgba(36,28,12,0.14)]">
            <div className="relative h-72 bg-white">
              <Image src={plan.path} alt={plan.label} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-contain p-3" />
              <span className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#0d1110]/80 text-white"><Maximize2 size={17} /></span>
            </div>
            <div className="p-5">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#c9a15b]">{plan.project} / {plan.category}</p>
              <h3 className="mt-2 text-xl font-semibold">{plan.label}</h3>
            </div>
          </button>
        ))}
      </div>

      {selected && (
        <div className="fixed inset-0 z-[70] bg-black/88 p-4 text-white backdrop-blur">
          <div className="mx-auto flex h-full max-w-6xl flex-col">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-sm text-white/54">{selected.project}</p>
                <p className="font-semibold">{selected.label}</p>
              </div>
              <div className="flex gap-2">
                <button className="rounded-full border border-white/15 p-3" onClick={() => setZoom(Math.max(0.7, zoom - 0.15))} aria-label="Zoom out"><ZoomOut size={18} /></button>
                <button className="rounded-full border border-white/15 p-3" onClick={() => setZoom(Math.min(1.8, zoom + 0.15))} aria-label="Zoom in"><ZoomIn size={18} /></button>
                <button className="rounded-full border border-white/15 p-3" onClick={() => setSelected(null)} aria-label="Close"><X size={18} /></button>
              </div>
            </div>
            <div className="relative min-h-0 flex-1 overflow-auto rounded-lg bg-white">
              <div style={{ transform: `scale(${zoom})`, transformOrigin: "top center" }} className="relative mx-auto h-[78vh] max-w-5xl transition">
                <Image src={selected.path} alt={selected.label} fill sizes="100vw" className="object-contain" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
