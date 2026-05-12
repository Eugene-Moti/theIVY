import type { Metadata } from "next";
import { ProjectPage } from "@/components/project-page";
import { assets, projects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Blossoms Ivy Residence | Kileleshwa Apartments for Sale",
  description: "Blossoms Ivy Residence on Gatundu Road, Kileleshwa offers premium 3-bedroom apartments with indoor pool, gym, coffee bar, smart access, and flexible payment plans."
};

import { redirect } from "next/navigation";

export default function BlossomsIvyResidence() {
  redirect("/projects/blossoms-ivy-residence");
}

