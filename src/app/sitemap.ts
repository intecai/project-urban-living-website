import type { MetadataRoute } from "next";
import roomsFallbackData from "@/data/rooms.json";

export default function sitemap(): MetadataRoute.Sitemap {
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

  const knownSlugs = new Set<string>([
    "premium-single-room",
    "single-room",
    "double-sharing-room",
    "triple-sharing-room",
    "four-sharing-room",
  ]);

  if (Array.isArray(roomsFallbackData)) {
    for (const r of roomsFallbackData as any[]) {
      if (r?.slug) knownSlugs.add(r.slug);
    }
  }

  for (const slug of knownSlugs) {
    routes.push({
      url: `${baseUrl}/rooms/${encodeURIComponent(slug)}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  return routes;
}
