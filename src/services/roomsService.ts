import { cache } from "react";
import { RoomsPageData } from "@/types/rooms";
import { RoomItem, RoomCategory } from "@/components/ourRooms/types";
import { getRoomSlug } from "@/utils/slug";
import { fetchApi } from "@/utils/apiClient";
import { resolveImageUrl } from "@/utils/image";
import { fetchAllApiLocations } from "@/services/locationsService";

export interface RoomLocationDTO {
  id: string;
  name: string;
  pgName: string;
  mapUrl: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface RoomDTO {
  id: string;
  refId: string;
  title: string;
  location: RoomLocationDTO;
  floor: number | null;
  badges: string[];
  amenities: string[];
  price: string;
  availability: boolean;
  roomType: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface RoomsAPIResponse {
  value: RoomDTO[];
  Count: number;
}

export interface GalleryImageItem {
  id: number;
  src: string;
  alt: string;
  title: string;
}

export interface AmenityDetailItem {
  id: string;
  label: string;
  icon: string;
}

export interface WhatsNearbyItem {
  id: string;
  name: string;
  time: string;
  leftIconName?: string;
  modeIconName?: string;
}

export interface RoomDetailData {
  id: string;
  slug: string;
  name: string;
  category: string;
  location: string;
  area: string;
  city: string;
  price: number;
  priceLabel: string;
  deposit: number;
  badge?: string;
  foodInfo: string;
  occupancyTag: string;
  furnishedTag: string;
  bathroomTag: string;
  image: string;
  galleryImages: GalleryImageItem[];
  description: string;
  highlights: string[];
  whatsIncluded: {
    room: string;
    food: string;
    connectivity: string;
    utilities: string;
    commonFacilities: string;
  };
  amenities: AmenityDetailItem[];
  mapUrl: string;
  whatsNearby: WhatsNearbyItem[];
}

export function categoryToRoomTypeEnum(cat?: string): string | null {
  if (!cat || cat === "all") return null;
  const lower = cat.toLowerCase();
  if (lower === "single" || lower === "single room") return "Single room";
  if (lower === "double" || lower === "double sharing") return "Double sharing";
  if (lower === "triple" || lower === "triple sharing") return "Triple sharing";
  if (lower === "four" || lower === "four sharing") return "Four sharing";
  if (lower === "five" || lower === "five sharing") return "Five sharing";
  return null;
}

export function roomTypeEnumToCategory(roomType?: string, title?: string): RoomCategory {
  // CMS backend data is corrupted for `roomType` (many shared rooms have roomType="Single room").
  // Therefore, we must prioritize parsing the `title` first to classify rooms correctly in the UI.
  if (title) {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes("single")) return "single";
    if (lowerTitle.includes("double") || lowerTitle.includes("two") || lowerTitle.includes("twin")) return "double";
    if (lowerTitle.includes("triple") || lowerTitle.includes("three")) return "triple";
    if (lowerTitle.includes("four")) return "four";
    if (lowerTitle.includes("five")) return "five";
  }
  if (roomType) {
    const lower = roomType.toLowerCase();
    if (lower.includes("single")) return "single";
    if (lower.includes("double")) return "double";
    if (lower.includes("triple")) return "triple";
    if (lower.includes("four")) return "four";
    if (lower.includes("five")) return "five";
  }
  return "double";
}

export function normalizeRoomDTO(r: RoomDTO, idx: number): RoomItem {
  const title = r.title || `Room ${idx + 1}`;
  const slug = getRoomSlug(title, r.id || r.refId);
  const priceNum = typeof r.price === "number" ? r.price : parseFloat(r.price || "0") || 8000;
  const category = roomTypeEnumToCategory(r.roomType, r.title);
  const locationName = r.location?.name || "Ramapuram";
  const rawImage = r.images && r.images.length > 0 ? r.images[0] : "";
  // Keep raw key/URL; PrivateImage + resolveImageUrl handle both consistently.
  const image = rawImage ? resolveImageUrl(rawImage) : "";
  const amenitiesList = Array.isArray(r.amenities) ? r.amenities : [];

  return {
    id: r.id || `room-${idx}`,
    name: title,
    slug,
    badge: r.badges && r.badges.length > 0 ? r.badges[0] : (r.availability ? "Available Now" : undefined),
    category,
    location: `${locationName}, Chennai`,
    area: locationName,
    price: priceNum,
    deposit: 5000,
    photoCount: r.images?.length || 5,
    image,
    amenities: {
      wifi: amenitiesList.length > 0 ? amenitiesList.some((a) => /wifi/i.test(a)) : true,
      ac: amenitiesList.length > 0 ? amenitiesList.some((a) => /ac/i.test(a)) : true,
      food: amenitiesList.length > 0 ? amenitiesList.some((a) => /food/i.test(a)) : true,
      laundry: amenitiesList.some((a) => /laundry/i.test(a)) || false,
      housekeeping: amenitiesList.some((a) => /housekeeping/i.test(a)) || false,
    },
    availableNow: Boolean(r.availability),
  };
}

/** Fallback when the locations API is unreachable (legacy dev/prod IDs). */
export const LOCATION_NAME_TO_ID_MAP: Record<string, string> = {
  ramapuram: "ff1bdbf3-aba4-4a86-a0fc-a87655db7208",
  madanandapuram: "621f272c-daf5-431d-a19f-4a48bb765ac7",
  madhanandapuram: "621f272c-daf5-431d-a19f-4a48bb765ac7",
};

export function resolveLocationId(locNameOrId?: string): string | undefined {
  if (!locNameOrId || locNameOrId === "all") return undefined;
  if (/^[0-9a-fA-F-]{16,}$/.test(locNameOrId)) {
    return locNameOrId;
  }
  const clean = locNameOrId.toLowerCase().trim().replace(/\s+/g, "");
  return LOCATION_NAME_TO_ID_MAP[clean];
}

async function resolveLocationIdsFromApi(
  locationNames: string[],
): Promise<string[]> {
  const apiLocations = await fetchAllApiLocations();
  const ids: string[] = [];

  for (const name of locationNames) {
    const normalized = name.toLowerCase().trim();
    const fromApi = apiLocations.find(
      (loc) => loc.name.toLowerCase().trim() === normalized,
    );
    if (fromApi?.id) {
      ids.push(fromApi.id);
      continue;
    }
    const fallback = resolveLocationId(name);
    if (fallback) ids.push(fallback);
  }

  return [...new Set(ids)];
}

function parseRoomListResponse(response: unknown): RoomDTO[] {
  if (!response) return [];
  if (Array.isArray(response)) return response as RoomDTO[];
  const wrapped = response as { data?: RoomDTO[]; value?: RoomDTO[] };
  if (Array.isArray(wrapped.data)) return wrapped.data;
  if (Array.isArray(wrapped.value)) return wrapped.value;
  return [];
}

export const fetchAllRoomDTOs = cache(async function fetchAllRoomDTOs(): Promise<RoomDTO[]> {
  const response = await fetchApi<unknown>("/rooms?limit=100");
  return parseRoomListResponse(response);
});

const AMENITY_KEY_TO_API_MAP: Record<string, string> = {
  wifi: "High-Speed-Wifi",
  ac: "Ac-Rooms",
  food: "Food",
  laundry: "Laundry",
  housekeeping: "Housekeeping",
  parking: "Parking",
  powerBackup: "Power Backup",
};

export function resolveAmenityValues(selected: Record<string, boolean>): string[] {
  if (!selected) return [];
  return Object.entries(selected)
    .filter(([, active]) => active)
    .map(([key]) => AMENITY_KEY_TO_API_MAP[key])
    .filter((v): v is string => Boolean(v));
}

export async function fetchRoomsFromApi(
  category?: string,
  minPrice?: number,
  maxPrice?: number,
  locations?: string[],
  amenities?: string[],
  availability?: boolean,
  search?: string
): Promise<RoomItem[] | null> {
  const params = new URLSearchParams();

  const mappedRoomType = categoryToRoomTypeEnum(category);
  if (category === "single") {
    params.append("roomType", "Single room");
  } else if (mappedRoomType) {
    params.append("roomType", mappedRoomType);
  }
  params.append("limit", "100");

  if (search && search.trim()) {
    params.append("search", search.trim());
  }
  if (minPrice !== undefined && minPrice !== null) {
    params.append("minPrice", minPrice.toString());
  }
  if (maxPrice !== undefined && maxPrice !== null) {
    params.append("maxPrice", maxPrice.toString());
  }

  const selectedLocations = locations?.filter(Boolean) ?? [];
  let filterMultipleLocationsClientSide = false;

  if (selectedLocations.length === 1) {
    const locationIds = await resolveLocationIdsFromApi(selectedLocations);
    if (locationIds[0]) {
      params.append("locationId", locationIds[0]);
    }
  } else if (selectedLocations.length > 1) {
    filterMultipleLocationsClientSide = true;
  }

  if (amenities && amenities.length > 0) {
    params.append("amenities", amenities.join(","));
  }
  if (availability !== undefined && availability !== null) {
    params.append("availability", availability ? "true" : "false");
  }

  const queryString = params.toString();
  const endpoint = queryString ? `/rooms?${queryString}` : "/rooms";
  const response = await fetchApi<unknown>(endpoint);

  if (!response) {
    return null;
  }

  const dtoList = parseRoomListResponse(response);
  const normalized = dtoList.map((dto, idx) => normalizeRoomDTO(dto, idx));

  let filtered =
    category && category !== "all" && category !== "single"
      ? normalized.filter((room) => room.category === category)
      : normalized;

  if (filterMultipleLocationsClientSide) {
    const wanted = new Set(
      selectedLocations.map((l) => l.toLowerCase().trim()),
    );
    filtered = filtered.filter((room) => wanted.has(room.area.toLowerCase().trim()));
  }

  return filtered;
}

export const getRoomsData = cache(async function getRoomsData(
  categoryFilter?: string,
  minPrice?: number,
  maxPrice?: number,
  locations?: string[],
  amenities?: string[],
  availability?: boolean,
  search?: string
): Promise<RoomsPageData> {
  const roomItems = await fetchRoomsFromApi(categoryFilter, minPrice, maxPrice, locations, amenities, availability, search);

  return {
    title: "Explore Our Women's PG Rooms",
    description: "Find your perfect fully-furnished room in Chennai's safest neighborhoods.",
    rooms: roomItems || [],
    filterOptions: {
      categories: [
        { id: "all", label: "All Rooms" },
        { id: "single", label: "Single Room" },
        { id: "double", label: "Double Sharing" },
        { id: "triple", label: "Triple Rooms" },
        { id: "four", label: "Four Sharing" },
        { id: "five", label: "Five Sharing" },
      ],
      locations: ["Ramapuram", "Madanandapuram"],
      priceRange: { min: 5000, max: 20000, step: 500 },
      amenities: [],
    },
    faq: {
      title: "Frequently Asked Questions",
      subtitle: "Find answers to common questions about our rooms and services.",
      faqs: [
        {
          id: "1",
          question: "Is food included in the rent?",
          answer:
            "Yes, all our rooms include nutritious breakfast, lunch, and dinner. We offer both vegetarian and non-vegetarian meal options on a rotating menu.",
        },
        {
          id: "2",
          question: "Can i visit the room before booking?",
          answer:
            "Yes, you can schedule a physical site visit or request a virtual tour with our property manager prior to booking.",
        },
        {
          id: "3",
          question: "What documents are required for booking?",
          answer:
            "You will need a valid government photo ID (Aadhaar Card/Passport), proof of employment or college admission, and passport-size photographs.",
        },
        {
          id: "4",
          question: "Is the security deposit refundable?",
          answer:
            "Yes, the security deposit is fully refundable at the time of check-out after adjusting any pending dues or damages.",
        },
        {
          id: "5",
          question: "Are utilities (Wi-Fi, electricity, water) included?",
          answer:
            "High-speed Wi-Fi and water supply are fully included. Electricity is billed based on individual sub-meter usage.",
        },
      ],
    },
  };
});

export const getAllRoomSlugs = cache(async function getAllRoomSlugs(): Promise<string[]> {
  const dtoList = await fetchAllRoomDTOs();
  const rooms = dtoList.map((dto, idx) => normalizeRoomDTO(dto, idx));
  const slugs = new Set<string>();
  rooms.forEach((r) => {
    if (r.slug) {
      slugs.add(r.slug.trim());
      slugs.add(r.slug.trim().toLowerCase());
    }
    if (r.id) {
      slugs.add(r.id.trim());
      slugs.add(r.id.trim().toLowerCase());
    }
    const nameSlug = getRoomSlug(r.name);
    if (nameSlug) {
      slugs.add(nameSlug.trim().toLowerCase());
    }
  });
  return Array.from(slugs);
});

export const getRoomBySlug = cache(async function getRoomBySlug(slug: string): Promise<RoomItem | undefined> {
  const dtoList = await fetchAllRoomDTOs();
  const rooms = dtoList.map((dto, idx) => normalizeRoomDTO(dto, idx));
  const cleanSlug = slug.trim().toLowerCase();

  return rooms.find((r) => {
    if (r.id.toLowerCase() === cleanSlug) return true;
    const rSlug = (r.slug || getRoomSlug(r.name)).toLowerCase();
    return rSlug === cleanSlug;
  });
});

export const getRoomDetailBySlug = cache(async function getRoomDetailBySlug(slug: string): Promise<RoomDetailData | null> {
  if (!slug) return null;
  const cleanSlug = slug.trim().toLowerCase();

  // 1. Direct API fetch if cleanSlug is a UUID or room ID format
  let apiSingleRoom: RoomDTO | null = null;
  let roomItem: RoomItem | undefined = undefined;

  if (/^[0-9a-fA-F-]{16,}$/.test(cleanSlug)) {
    const raw = await fetchApi<any>(`/rooms/${cleanSlug}`);
    if (raw) {
      if (raw.data && typeof raw.data === "object" && !Array.isArray(raw.data) && raw.data.id) {
        apiSingleRoom = raw.data;
      } else if (raw.value && typeof raw.value === "object" && !Array.isArray(raw.value) && raw.value.id) {
        apiSingleRoom = raw.value;
      } else if (typeof raw === "object" && !Array.isArray(raw) && raw.id) {
        apiSingleRoom = raw;
      }
    }
  }

  // 2. Only fetch the room index if direct UUID fetch didn't yield a room
  if (!apiSingleRoom) {
    const dtoList = await fetchAllRoomDTOs();
    const indexedRooms = dtoList.map((dto, idx) => normalizeRoomDTO(dto, idx));
    roomItem = indexedRooms.find((r) => {
      const rId = r.id ? r.id.toLowerCase() : "";
      const rSlug = r.slug ? r.slug.toLowerCase() : "";
      const nameSlug = getRoomSlug(r.name).toLowerCase();
      return (
        rId === cleanSlug ||
        rSlug === cleanSlug ||
        nameSlug === cleanSlug
      );
    });

    // If neither API nor roomItem gave a result, return null (404 state)
    if (!roomItem) {
      return null;
    }

    // 3. If roomItem found by slug, fetch live details from GET /rooms/:id using its UUID if not already loaded
    if (roomItem.id && /^[0-9a-fA-F-]{16,}$/.test(roomItem.id)) {
      const raw = await fetchApi<any>(`/rooms/${roomItem.id}`);
      if (raw) {
        if (raw.data && typeof raw.data === "object" && !Array.isArray(raw.data) && raw.data.id) {
          apiSingleRoom = raw.data;
        } else if (raw.value && typeof raw.value === "object" && !Array.isArray(raw.value) && raw.value.id) {
          apiSingleRoom = raw.value;
        } else if (typeof raw === "object" && !Array.isArray(raw) && raw.id) {
          apiSingleRoom = raw;
        }
      }
    }
  }

  // 4. Construct normalized RoomDetailData
  const name = apiSingleRoom?.title || roomItem?.name || "Premium Room";
  const rawPrice = apiSingleRoom?.price ?? roomItem?.price ?? 8000;
  const price = typeof rawPrice === "number" ? rawPrice : parseFloat(rawPrice as string) || 8000;
  const category = apiSingleRoom ? roomTypeEnumToCategory(apiSingleRoom.roomType, apiSingleRoom.title) : roomItem?.category || "double";
  const locationName = apiSingleRoom?.location?.name || roomItem?.area || "Ramapuram";
  const rawImages = apiSingleRoom?.images && apiSingleRoom.images.length > 0 
    ? apiSingleRoom.images 
    : (roomItem?.image ? [roomItem.image] : []);
  const images = rawImages.map((img) => resolveImageUrl(img)).filter(Boolean);
  const mapUrl = apiSingleRoom?.location?.mapUrl || "https://maps.google.com/?q=13.029858,80.187920";

  let occupancyTag = "Single Occupancy";
  if (category === "triple") occupancyTag = "Triple Occupancy";
  else if (category === "double") occupancyTag = "Double Occupancy";
  else if (category === "four") occupancyTag = "Four Sharing";
  else if (category === "five") occupancyTag = "Five Sharing";

  const masterAmenities: AmenityDetailItem[] = [
    { id: "kitchen", label: "Kitchen", icon: "/images/rooms/Amenities-kitchen.png" },
    { id: "geyser", label: "Geyser", icon: "/images/rooms/Amenities-Geyser.png" },
    { id: "tv", label: "TV", icon: "/images/rooms/Amenities-TV.png" },
    { id: "microwave", label: "Microwave", icon: "/images/rooms/Amenities-Microwave.png" },
    { id: "fireExtinguisher", label: "Fire extinguisher", icon: "/images/rooms/Amenities-FireExtinguisher.png" },
    { id: "washingMachine", label: "Washing Machine", icon: "/images/rooms/Amenities-WashingMachine.png" },
    { id: "acRoom", label: "AC room", icon: "/images/rooms/Amenities-AC.png" },
    { id: "wifi", label: "Wi-Fi", icon: "/images/rooms/Amenities-wifi.png" },
    { id: "digitalLock", label: "Digital Lock", icon: "/images/rooms/Amenities-DigitalLock.png" },
    { id: "cctv", label: "CCTV", icon: "/images/rooms/Amenities-CCTV.png" },
    { id: "kettle", label: "Kettle", icon: "/images/rooms/Amenities-Kettle.png" },
    { id: "inductionStove", label: "Induction stove", icon: "/images/rooms/Amenities-Inductionstov.png" },
    { id: "caretaker", label: "Caretaker", icon: "/images/rooms/Amenities-Caretaker.png" },
  ];

  const galleryImages: GalleryImageItem[] = images.map((imgSrc, idx) => ({
    id: idx + 1,
    src: imgSrc,
    alt: `${name} View ${idx + 1}`,
    title: idx === 0 ? "Main Room View" : `Room View ${idx + 1}`,
  }));



  const nearbyList: WhatsNearbyItem[] = [
    { id: "1", name: "Shine Sports Academy", time: "3 min", leftIconName: "MapPin", modeIconName: "Footprints" },
    { id: "2", name: "Sunshine Badminton Academy", time: "4 min", leftIconName: "MapPin", modeIconName: "Footprints" },
    { id: "3", name: "Kovai Medical Center & Hospital", time: "7 min", leftIconName: "MapPin", modeIconName: "Car" },
    { id: "4", name: "Peelamedu Bus Stand", time: "12 min", leftIconName: "Bus", modeIconName: "Bus" },
    { id: "5", name: "Coimbatore Railway Station", time: "15 min", leftIconName: "Train", modeIconName: "Train" },
  ];

  return {
    id: apiSingleRoom?.id || roomItem?.id || cleanSlug,
    slug: roomItem?.slug || cleanSlug,
    name,
    category,
    location: `${locationName}, Chennai`,
    area: locationName,
    city: "Chennai",
    price,
    priceLabel: "month",
    deposit: 5000,
    badge: apiSingleRoom?.badges?.[0] || roomItem?.badge,
    foodInfo: "Homely Food Included",
    occupancyTag,
    furnishedTag: "Fully Furnished",
    bathroomTag: "Attached Bathroom",
    image: images[0] || "",
    galleryImages,
    description: `A comfortable ${name.toLowerCase()} designed for your privacy and convenience. Located in ${locationName}, this fully furnished room comes with an attached bathroom and all essential amenities for a peaceful and hassle-free stay.`,
    highlights: [
      "Ideal for students and working professionals",
      "Well-ventilated with natural light",
      "Regular housekeeping & laundry facility",
      "Access to all common PG amenities",
    ],
    whatsIncluded: {
      room: `Fully furnished ${name.toLowerCase()} with attached bathroom`,
      food: "Homely food included (Breakfast, Lunch & Dinner)",
      connectivity: "High-speed Wi-Fi internet access",
      utilities: "EB (Electricity) & water supply included",
      commonFacilities: "Access to all shared amenities and common areas",
    },
    amenities: masterAmenities,
    mapUrl,
    whatsNearby: nearbyList,
  };
});

