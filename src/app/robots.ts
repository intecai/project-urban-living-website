import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/utils/siteConfig";

export const dynamic = "force-static";

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
