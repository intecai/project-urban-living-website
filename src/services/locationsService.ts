import { cache } from "react";
import locationsData from "@/data/locations.json";
import locationDetailsData from "@/data/locationDetails.json";
import { LocationsPageData, LocationDetailData, LocationCardData, GalleryImage } from "@/types/locations";
import { fetchApi } from "@/utils/apiClient";
import { resolveImageUrl } from "@/utils/image";

export interface LocationDTO {
  id: string;
  name: string;
  pgName: string;
  mapUrl: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export function normalizeLocationDTO(loc: LocationDTO): LocationCardData {
  const slug = loc.name.toLowerCase().trim().replace(/\s+/g, "");
  const rawImage =
    loc.images && loc.images.length > 0
      ? loc.images[0]
      : "";
  const image = resolveImageUrl(rawImage);

  return {
    id: loc.id,
    name: loc.name,
    price: (loc as any).price || "₹10,500/mo",
    image,
    href: `/locations?slug=${slug}&id=${loc.id}`,
    buttonText: "Explore Location",
  };
}

/**
 * Fetch a single paginated page of locations from GET /locations?page=:page&limit=:limit
 * Used for listing locations dynamically on the locations page.
 */
export async function fetchLocationsFromApi(
  page: number = 1,
  limit: number = 10,
  skipCache?: boolean
): Promise<{ locations: LocationCardData[]; total: number; totalPages: number } | null> {
  try {
    const rawResponse = await fetchApi<any>(`/locations?page=${page}&limit=${limit}`, { skipCache });
    if (!rawResponse) return null;

    let dtoList: LocationDTO[] = [];
    let total = 0;
    let totalPages = 1;

    if (Array.isArray(rawResponse)) {
      dtoList = rawResponse;
      total = rawResponse.length;
      totalPages = Math.ceil(total / limit) || 1;
    } else if (rawResponse && typeof rawResponse === "object") {
      if (Array.isArray(rawResponse.data)) dtoList = rawResponse.data;
      else if (Array.isArray(rawResponse.value)) dtoList = rawResponse.value;

      total = typeof rawResponse.total === "number" ? rawResponse.total : dtoList.length;
      totalPages = typeof rawResponse.totalPages === "number" ? rawResponse.totalPages : Math.ceil(total / limit) || 1;
    }

    const filtered = dtoList.filter((l) => !l.deletedAt);
    const normalized = filtered.map(normalizeLocationDTO);

    return {
      locations: normalized,
      total,
      totalPages,
    };
  } catch (err) {
    console.warn("[LOCATIONS API] Exception fetching paginated locations:", err);
    return null;
  }
}

/**
 * Paginate to retrieve all locations from the API across all pages.
 * Used for sitemap generation, dropdowns, and location ID resolution.
 */
export const fetchAllApiLocations = cache(async function fetchAllApiLocations(): Promise<LocationDTO[]> {
  try {
    let page = 1;
    let allLocations: LocationDTO[] = [];
    let hasMore = true;

    while (hasMore && page <= 10) {
      const rawResponse = await fetchApi<any>(`/locations?limit=100&page=${page}`);
      let pageLocations: LocationDTO[] = [];
      let totalPages = 1;

      if (Array.isArray(rawResponse)) {
        pageLocations = rawResponse;
        hasMore = false;
      } else if (rawResponse && typeof rawResponse === "object") {
        if (Array.isArray(rawResponse.data)) pageLocations = rawResponse.data;
        else if (Array.isArray(rawResponse.value)) pageLocations = rawResponse.value;

        totalPages = rawResponse.totalPages || (rawResponse.total ? Math.ceil(rawResponse.total / (rawResponse.limit || 100)) : 1);
        hasMore = page < totalPages;
      } else {
        hasMore = false;
      }

      allLocations = allLocations.concat(pageLocations);
      if (pageLocations.length === 0 || !hasMore) break;
      page++;
    }

    return allLocations.filter((l) => !l.deletedAt);
  } catch (err) {
    console.warn("[LOCATION API] Exception fetching all locations:", err);
    return [];
  }
});

export const fetchLocationById = cache(async function fetchLocationById(id: string): Promise<LocationDTO | null> {
  try {
    const res = await fetchApi<any>(`/locations/${id}`);
    if (res && res.id) return res as LocationDTO;
    if (res && res.data && res.data.id) return res.data as LocationDTO;
    if (res && res.value && res.value.id) return res.value as LocationDTO;
  } catch (err) {
    console.warn(`[LOCATION API] Exception fetching location by ID ${id}:`, err);
  }
  return null;
});

export const fetchLocationByIdOrSlug = cache(async function fetchLocationByIdOrSlug(id?: string | null, slug?: string | null): Promise<LocationDTO | null> {
  if (id) {
    const loc = await fetchLocationById(id);
    if (loc) return loc;
  }

  const all = await fetchAllApiLocations();
  if (all.length === 0) return null;

  if (id) {
    const foundById = all.find((l) => l.id === id);
    if (foundById) return foundById;
  }

  if (slug) {
    const cleanSlug = slug.toLowerCase().trim().replace(/\s+/g, "");
    const foundBySlug = all.find(
      (l) => l.name.toLowerCase().trim().replace(/\s+/g, "") === cleanSlug
    );
    if (foundBySlug) return foundBySlug;
  }

  return null;
});

export const getLocationsData = cache(async function getLocationsData(page: number = 1, limit: number = 10): Promise<LocationsPageData> {
  const fallback = locationsData as LocationsPageData;
  const result = await fetchLocationsFromApi(page, limit);

  if (!result || result.locations.length === 0) {
    return fallback;
  }

  return {
    ...fallback,
    popularLocations: {
      ...fallback.popularLocations,
      locations: result.locations,
    },
  };
});

export const getLocationDetailBySlug = cache(async function getLocationDetailBySlug(slug: string): Promise<LocationDetailData | undefined> {
  const details = locationDetailsData as Record<string, LocationDetailData>;
  const cleanSlug = slug.toLowerCase().trim();
  const baseDetail = details[cleanSlug];

  const apiLocations = await fetchAllApiLocations();

  if (apiLocations.length > 0) {
    const matchedLoc = apiLocations.find(
      (loc) => loc.name.toLowerCase().trim().replace(/\s+/g, "") === cleanSlug || loc.id === cleanSlug
    );
    if (matchedLoc) {
      const updatedGallery: GalleryImage[] = baseDetail ? [...baseDetail.gallery] : [];
      if (matchedLoc.images && matchedLoc.images.length > 0) {
        if (updatedGallery.length > 0) {
          updatedGallery[0] = {
            ...updatedGallery[0],
            src: resolveImageUrl(matchedLoc.images[0]),
          };
        } else {
          matchedLoc.images.forEach((img, i) => {
            updatedGallery.push({
              id: String(i + 1),
              src: resolveImageUrl(img),
              alt: `${matchedLoc.name} Image ${i + 1}`,
              span: i === 0 ? "col-span-2 row-span-2" : "col-span-1 row-span-1",
            });
          });
        }
      }

      if (baseDetail) {
        return {
          ...baseDetail,
          name: matchedLoc.name,
          mapUrl: matchedLoc.mapUrl || baseDetail.mapUrl,
          gallery: updatedGallery,
        };
      }

      // Generate dynamic location detail if not in static fallback
      return {
        slug: cleanSlug,
        name: matchedLoc.name,
        title: `Urban Living in ${matchedLoc.name}`,
        subtitle: `Premium Women's PG Accommodation in ${matchedLoc.name}, Chennai`,
        mapUrl: matchedLoc.mapUrl || "https://maps.google.com/?q=13.029858,80.187920",
        gallery: updatedGallery,
        pricingPlans: [],
        aboutProperty: {
          badge: "Featured Location",
          title: `Welcome to Urban Living ${matchedLoc.name}`,
          description: `Fully furnished, safe, and comfortable women's accommodations in ${matchedLoc.name}. Includes nutritious food, Wi-Fi, 24/7 security, and modern amenities.`,
          highlights: ["Nutritious Food Included", "High-Speed Wi-Fi", "24/7 Security & CCTV", "Daily Housekeeping"],
        },
        whatsIncluded: ["Fully Furnished Rooms", "3 Times Food", "Wi-Fi & Electricity", "Washing Machine & Geyser"],
      };
    }
  }

  return baseDetail;
});
