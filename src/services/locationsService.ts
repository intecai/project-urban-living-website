import locationsData from "@/data/locations.json";
import locationDetailsData from "@/data/locationDetails.json";
import { LocationsPageData, LocationDetailData, LocationCardData } from "@/types/locations";
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

export async function fetchAllApiLocations(): Promise<LocationDTO[]> {
  try {
    const rawResponse = await fetchApi<any>("/locations");
    let apiLocations: LocationDTO[] = [];
    if (Array.isArray(rawResponse)) {
      apiLocations = rawResponse;
    } else if (rawResponse && Array.isArray(rawResponse.data)) {
      apiLocations = rawResponse.data;
    } else if (rawResponse && Array.isArray(rawResponse.value)) {
      apiLocations = rawResponse.value;
    }
    return apiLocations;
  } catch (err) {
    console.warn("[LOCATION API] Exception fetching all locations:", err);
    return [];
  }
}

export async function fetchLocationById(id: string): Promise<LocationDTO | null> {
  try {
    const res = await fetchApi<any>(`/locations/${id}`);
    if (res && res.id) return res as LocationDTO;
    if (res && res.data && res.data.id) return res.data as LocationDTO;
  } catch (err) {
    console.warn(`[LOCATION API] Exception fetching location by ID ${id}:`, err);
  }
  return null;
}

export async function fetchLocationByIdOrSlug(id?: string | null, slug?: string | null): Promise<LocationDTO | null> {
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
}

export async function getLocationsData(): Promise<LocationsPageData> {
  const fallback = locationsData as LocationsPageData;
  const apiLocations = await fetchAllApiLocations();

  if (apiLocations.length === 0) {
    console.warn(`[FALLBACK WARNING] /locations API returned 0 locations. Using fallback.`);
    return fallback;
  }

  console.log(`[API SUCCESS] Loaded ${apiLocations.length} live locations from backend API.`);

  const normalizedCards: LocationCardData[] = apiLocations.map((loc) => {
    const slug = loc.name.toLowerCase().trim().replace(/\s+/g, "");
    const rawImage =
      loc.images && loc.images.length > 0
        ? loc.images[0]
        : "/images/rooms/room_single.png";
    const image = resolveImageUrl(rawImage);

    // Default starting price per location based on fallback if present
    const matchedFallback = fallback.popularLocations.locations.find(
      (f) => f.name.toLowerCase().includes(slug) || slug.includes(f.name.toLowerCase())
    );

    return {
      id: loc.id,
      name: loc.name,
      price: (loc as any).price || matchedFallback?.price || "₹10,500/mo",
      image,
      href: `/locations?slug=${slug}&id=${loc.id}`,
      buttonText: "Explore Location",
    };
  });

  return {
    ...fallback,
    popularLocations: {
      ...fallback.popularLocations,
      locations: normalizedCards,
    },
  };
}

export async function getLocationDetailBySlug(slug: string): Promise<LocationDetailData | undefined> {
  const details = locationDetailsData as Record<string, LocationDetailData>;
  const cleanSlug = slug.toLowerCase().trim();
  const baseDetail = details[cleanSlug] || details["ramapuram"];

  const apiLocations = await fetchAllApiLocations();

  if (apiLocations.length > 0) {
    const matchedLoc = apiLocations.find(
      (loc) => loc.name.toLowerCase().trim().replace(/\s+/g, "") === cleanSlug
    );
    if (matchedLoc) {
      const updatedGallery = [...baseDetail.gallery];
      if (matchedLoc.images && matchedLoc.images.length > 0) {
        updatedGallery[0] = {
          ...updatedGallery[0],
          src: matchedLoc.images[0],
        };
      }
      return {
        ...baseDetail,
        name: matchedLoc.name,
        mapUrl: matchedLoc.mapUrl || baseDetail.mapUrl,
        gallery: updatedGallery,
      };
    }
  }

  return baseDetail;
}

