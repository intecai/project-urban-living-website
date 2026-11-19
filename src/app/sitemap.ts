import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/utils/siteConfig";
import { getAllRoomSlugs } from "@/services/roomsService";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl();
  const now = new Date();

  const routes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/rooms/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/rooms/premium-single-room/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/locations/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const slugs = await getAllRoomSlugs();
  for (const slug of slugs) {
    routes.push({
      url: `${baseUrl}/rooms/${encodeURIComponent(slug)}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.75,
    });
  }

  return routes;
}