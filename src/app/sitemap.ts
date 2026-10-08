import type { MetadataRoute } from "next";
import { getRoomsData } from "@/services/roomsService";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://urbanliving.client.intecai.in";
  const now = new Date();

  const routes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/rooms`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/rooms/premium-single-room`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/locations`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/locations?slug=ramapuram`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/locations?slug=madanandapuram`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  try {
    const roomsData = await getRoomsData().catch(() => null);
    if (roomsData?.rooms && roomsData.rooms.length > 0) {
      for (const room of roomsData.rooms) {
        if (room.slug) {
          routes.push({
            url: `${baseUrl}/rooms/${encodeURIComponent(room.slug)}`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.8,
          });
        }
      }
    } else {
      const fallbackSlugs = [
        "premium-single-room",
        "single-room",
        "double-sharing-room",
        "triple-sharing-room",
        "four-sharing-room",
      ];
      for (const slug of fallbackSlugs) {
        routes.push({
          url: `${baseUrl}/rooms/${slug}`,
          lastModified: now,
          changeFrequency: "weekly",
          priority: 0.8,
        });
      }
    }
  } catch {
    // graceful fallback
  }

  return routes;
}
