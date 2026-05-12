import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Luckinn Ivy Residence | Westlands Apartments for Sale",
  description:
    "Luckinn Ivy Residence in Westlands offers available 3BR + DSQ apartments with indoor pool, gym, co-working space, yoga room, smart locks, and December 2026 completion."
};

export default function LuckinnIvyResidence() {
  redirect("/projects/luckinn-ivy-residence");
}


