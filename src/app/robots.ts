import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/utils/siteConfig";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getSiteUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/scratch/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
