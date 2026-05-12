import type { Metadata } from "next";
import { FloorPlanGallery } from "@/components/floor-plan-gallery";

export const metadata: Metadata = {
  title: "Floor Plans",
  description: "Browse Ivy Group floor plans by project, including Ivy Park Residence, Luckinn Ivy Residence, and Blossoms Ivy Residence."
};

export default function FloorPlans() {
  return (
    <section className="section bg-[#f3eddf] pt-36 text-[#121512]">
      <div className="container">
        <p className="eyebrow">Project floor plans</p>
        <h1 className="mt-4 font-serif text-6xl font-semibold">Compare layouts across our developments.</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-black/64">Browse Ivy Park, Luckinn Ivy, and Blossoms Ivy plans by project, bedroom type, DSQ option, and block arrangement. Tap any plan to enlarge and inspect details.</p>
        <div className="mt-10">
          <FloorPlanGallery />
        </div>
      </div>
    </section>
  );
}
