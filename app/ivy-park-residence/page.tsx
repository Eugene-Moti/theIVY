import type { Metadata } from "next";
import { ProjectPage } from "@/components/project-page";
import { assets, projects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Ivy Park Residence | Apartments for Sale in Kilimani",
  description: "Ivy Park Residence on Kirichwa Road, Kilimani offers 1, 2, and 3-bedroom apartments from KES 6.8M with rooftop lounges, heated pools, co-working, and flexible payment plans."
};

import { redirect } from "next/navigation";

export default function IvyParkResidence() {
  redirect("/projects/ivy-park-residence");
}

