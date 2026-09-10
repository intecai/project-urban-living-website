import locationsData from "@/data/locations.json";
import locationDetailsData from "@/data/locationDetails.json";
import { LocationsPageData, LocationDetailData } from "@/types/locations";

export async function getLocationsData(): Promise<LocationsPageData> {
  return locationsData as LocationsPageData;
}

export async function getLocationDetailBySlug(slug: string): Promise<LocationDetailData | undefined> {
  const details = locationDetailsData as Record<string, LocationDetailData>;
  const key = slug.toLowerCase();
  return details[key] || details["ramapuram"];
}
