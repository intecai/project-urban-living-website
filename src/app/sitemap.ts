import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/utils/siteConfig";
import { fetchAllRoomDTOs } from "@/services/roomsService";
import { fetchAllApiLocations } from "@/services/locationsService";

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

  const addedUrls = new Set<string>();

  // 1. Dynamic Room URLs with actual CMS updatedAt timestamps
  try {
    const dtoList = await fetchAllRoomDTOs();
    for (const room of dtoList) {
      if (room.id) {
        const lastModified = room.updatedAt ? new Date(room.updatedAt) : now;
        const url = `${baseUrl}/rooms/?id=${encodeURIComponent(room.id)}`;
        if (!addedUrls.has(url)) {
          addedUrls.add(url);
          routes.push({
            url,
            lastModified,
            changeFrequency: "daily",
            priority: 0.85,
          });
        }
      }
    }
  } catch (err) {
    console.warn("[SITEMAP] Error fetching dynamic rooms:", err);
  }

  // 2. Dynamic Location URLs
  try {
    const locations = await fetchAllApiLocations();
    for (const loc of locations) {
      const slug = loc.name.toLowerCase().trim().replace(/\s+/g, "");
      const lastModified = loc.updatedAt ? new Date(loc.updatedAt) : now;
      const url = `${baseUrl}/locations/?slug=${encodeURIComponent(slug)}&id=${encodeURIComponent(loc.id)}`;
      if (!addedUrls.has(url)) {
        addedUrls.add(url);
        routes.push({
          url,
          lastModified,
          changeFrequency: "weekly",
          priority: 0.8,
        });
      }
    }
  } catch (err) {
    console.warn("[SITEMAP] Error fetching dynamic locations:", err);
  }

  return routes;
}
