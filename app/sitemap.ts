import type { MetadataRoute } from "next";

const routes = [
  "",
  "/developments",
  "/buy",
  "/ivy-park-residence",
  "/blossoms-ivy-residence",
  "/luckinn-ivy-residence",
  "/previous-projects",
  "/floor-plans",
  "/insights",
  "/virtual-tours",
  "/investment-guide",
  "/about",
  "/contact"
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `https://theivygroup.co.ke${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" || route === "/ivy-park-residence" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/ivy-park-residence" ? 0.95 : 0.7
  }));
}
