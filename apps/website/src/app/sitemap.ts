import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://wafflella.com";
  const pages = ["/", "/menu", "/about", "/contact"];

  return pages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: page === "/" ? "weekly" : "monthly",
    priority: page === "/" ? 1 : 0.8,
  }));
}
