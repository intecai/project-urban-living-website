import roomsFallbackData from "@/data/rooms.json";
import { roomsData as defaultRoomsData } from "@/components/ourRooms/roomsData";
import { RoomsPageData } from "@/types/rooms";
import { RoomItem, RoomCategory } from "@/components/ourRooms/types";
import { getRoomSlug } from "@/utils/slug";
import { fetchApi } from "@/utils/apiClient";

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
  if (lower === "single" || lower === "single rooms") return "Single Rooms";
  if (lower === "double" || lower === "double rooms") return "Double Rooms";
  if (lower === "triple" || lower === "triple rooms") return "Triple Rooms";
  if (lower === "four" || lower === "four sharing") return "Four Sharing";
  if (lower === "five" || lower === "five sharing") return "Five Sharing";
  return null;
}

export function roomTypeEnumToCategory(roomType?: string, title?: string): RoomCategory {
  if (roomType) {
    const lower = roomType.toLowerCase();
    if (lower.includes("single")) return "single";
    if (lower.includes("double")) return "double";
    if (lower.includes("triple")) return "triple";
    if (lower.includes("four")) return "four";
    if (lower.includes("five")) return "five";
  }
  if (title) {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes("single")) return "single";
    if (lowerTitle.includes("double") || lowerTitle.includes("two") || lowerTitle.includes("twin")) return "double";
    if (lowerTitle.includes("triple") || lowerTitle.includes("three")) return "triple";
    if (lowerTitle.includes("four")) return "four";
    if (lowerTitle.includes("five")) return "five";
  }
  return "double";
}

export function normalizeRoomDTO(r: RoomDTO, idx: number): RoomItem {
  const title = r.title || `Room ${idx + 1}`;
  const slug = getRoomSlug(title, r.id || r.refId);
  const priceNum = typeof r.price === "number" ? r.price : parseFloat(r.price || "0") || 8000;
  const category = roomTypeEnumToCategory(r.roomType, r.title);
  const locationName = r.location?.name || "Ramapuram";
  const image = r.images && r.images.length > 0 ? r.images[0] : "/images/rooms/room_single.png";
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
      wifi: amenitiesList.some((a) => /wifi/i.test(a)) || true,
      ac: amenitiesList.some((a) => /ac/i.test(a)) || true,
      food: amenitiesList.some((a) => /food/i.test(a)) || true,
      laundry: amenitiesList.some((a) => /laundry/i.test(a)) || false,
      housekeeping: amenitiesList.some((a) => /housekeeping/i.test(a)) || false,
    },
    availableNow: Boolean(r.availability),
  };
}

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
  locationId?: string,
  amenities?: string[],
  availability?: boolean
): Promise<RoomItem[] | null> {
  const roomTypeParam = categoryToRoomTypeEnum(category);
  const params = new URLSearchParams();

  if (roomTypeParam) {
    params.append("roomType", roomTypeParam);
  }
  if (minPrice !== undefined && minPrice !== null) {
    params.append("minPrice", minPrice.toString());
  }
  if (maxPrice !== undefined && maxPrice !== null) {
    params.append("maxPrice", maxPrice.toString());
  }
  if (locationId) {
    params.append("locationId", locationId);
  }
  if (amenities && amenities.length > 0) {
    params.append("amenities", amenities.join(","));
  }
  if (availability !== undefined && availability !== null) {
    params.append("availability", availability ? "true" : "false");
  }

  const queryString = params.toString();
  const endpoint = queryString ? `/rooms?${queryString}` : "/rooms";

  console.log(`[SERVICE] requested category: '${category}', minPrice: ${minPrice}, maxPrice: ${maxPrice}, locationId: ${locationId}, amenities: ${amenities ? JSON.stringify(amenities) : "[]"}, availability: ${availability ?? "''"}`);
  console.log(`[SERVICE] mapped roomType: '${roomTypeParam}'`);
  console.log(`[SERVICE] final URL: '${endpoint}'`);
  
  const response = await fetchApi<any>(endpoint);
  console.log(`[SERVICE] raw response for '${endpoint}':`, response);

  if (!response) {
    console.warn(`[SERVICE WARNING] Endpoint ${endpoint} returned null/error.`);
    return null;
  }

  let dtoList: RoomDTO[] = [];
  if (Array.isArray(response)) {
    dtoList = response;
  } else if (response && Array.isArray(response.data)) {
    dtoList = response.data;
  } else if (response && Array.isArray(response.value)) {
    dtoList = response.value;
  }

  console.log(`[SERVICE] extracted response.data length for '${endpoint}': ${dtoList.length}`, dtoList);
  const normalized = dtoList.map((dto, idx) => normalizeRoomDTO(dto, idx));
  console.log(`[SERVICE] normalized result length for '${endpoint}': ${normalized.length}`, normalized);
  return normalized;
}

export async function getRoomsData(
  categoryFilter?: string,
  minPrice?: number,
  maxPrice?: number,
  locationId?: string,
  amenities?: string[],
  availability?: boolean
): Promise<RoomsPageData> {
  let roomItems = await fetchRoomsFromApi(categoryFilter, minPrice, maxPrice, locationId, amenities, availability);

  // Fallback to local roomsData.json if API returned no data
  if (!roomItems || roomItems.length === 0) {
    console.warn(`[FALLBACK WARNING] API returned 0 rooms. Falling back to rooms.json mock data.`);
    const rawList = Array.isArray(roomsFallbackData) ? (roomsFallbackData as any[]) : [];
    roomItems = rawList.map((r, idx) => {
      const fallback = defaultRoomsData[idx] || defaultRoomsData.find((item) => item.id === r.id);
      const name = r.title || r.name || fallback?.name || "";
      const slug = getRoomSlug(name, r.slug || fallback?.slug);

      return {
        id: r.id || fallback?.id || `room-${idx}`,
        name,
        slug,
        badge: r.badge || fallback?.badge,
        category: (r.category || fallback?.category) as any,
        location: r.location || fallback?.location || "Chennai",
        area: r.area || fallback?.area || (r.location ? r.location.split(",")[0].trim() : "Chennai"),
        price: r.price !== undefined ? r.price : (fallback?.price || 10000),
        deposit: r.deposit !== undefined ? r.deposit : (fallback?.deposit || 5000),
        photoCount: r.photoCount || fallback?.photoCount || 5,
        image: r.image || fallback?.image || "/images/rooms/room_single.png",
        amenities: typeof r.amenities === "object" && !Array.isArray(r.amenities)
          ? r.amenities
          : {
              wifi: Array.isArray(r.amenities) ? r.amenities.includes("WiFi") : (fallback?.amenities.wifi ?? true),
              ac: Array.isArray(r.amenities) ? r.amenities.includes("AC") : (fallback?.amenities.ac ?? true),
              food: Array.isArray(r.amenities) ? r.amenities.includes("Food") : (fallback?.amenities.food ?? true),
              laundry: Array.isArray(r.amenities) ? r.amenities.includes("Laundry") : (fallback?.amenities.laundry ?? false),
              housekeeping: Array.isArray(r.amenities) ? r.amenities.includes("Housekeeping") : (fallback?.amenities.housekeeping ?? false),
            },
        availableNow: r.availableNow !== undefined ? r.availableNow : (fallback?.availableNow ?? true),
      };
    });
  } else {
    console.log(`[API SUCCESS] Using ${roomItems.length} live rooms from backend API (No fallback used).`);
  }

  return {
    title: "Explore Our Women's PG Rooms",
    description: "Find your perfect fully-furnished room in Chennai's safest neighborhoods.",
    rooms: roomItems,
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
}

export async function getAllRoomSlugs(): Promise<string[]> {
  const data = await getRoomsData();
  const slugs = new Set<string>();
  data.rooms.forEach((r) => {
    if (r.slug) slugs.add(r.slug.toLowerCase());
    if (r.id) slugs.add(r.id.toLowerCase());
  });
  // Add common slug aliases
  slugs.add("premium-single-room");
  slugs.add("single-room");
  slugs.add("deluxe-single-room");
  slugs.add("three-sharing-room");
  slugs.add("double-sharing-room");
  slugs.add("two-sharing-room");
  slugs.add("four-sharing-room");
  slugs.add("twin-sharing-room");
  slugs.add("private-room");
  return Array.from(slugs);
}

export async function getRoomBySlug(slug: string): Promise<RoomItem | undefined> {
  const data = await getRoomsData();
  const cleanSlug = slug.trim().toLowerCase();

  return data.rooms.find((r) => {
    if (r.id.toLowerCase() === cleanSlug) return true;
    const rSlug = (r.slug || getRoomSlug(r.name)).toLowerCase();
    if (rSlug === cleanSlug) return true;
    if (cleanSlug === "single-room" && rSlug.includes("single")) return true;
    if (cleanSlug === "three-sharing-room" && rSlug.includes("triple")) return true;
    if (cleanSlug === "double-sharing-room" && (rSlug.includes("double") || rSlug.includes("two"))) return true;
    return false;
  });
}

export async function getRoomDetailBySlug(slug: string): Promise<RoomDetailData | null> {
  const cleanSlug = slug.trim().toLowerCase();

  // First check if cleanSlug is a direct UUID or room ID
  let apiSingleRoom: RoomDTO | null = null;
  if (/^[0-9a-fA-F-]{16,}$/.test(cleanSlug)) {
    apiSingleRoom = await fetchApi<RoomDTO>(`/rooms/${cleanSlug}`);
  }

  const allRoomsData = await getRoomsData();
  let roomItem = allRoomsData.rooms.find((r) => {
    return (
      r.id.toLowerCase() === cleanSlug ||
      (r.slug && r.slug.toLowerCase() === cleanSlug)
    );
  });

  // Handle fallback matching for known standard slug aliases
  if (!roomItem) {
    if (cleanSlug === "premium-single-room") {
      roomItem = allRoomsData.rooms.find((r) => r.slug === "premium-single-room") || allRoomsData.rooms[0];
    } else if (cleanSlug === "single-room") {
      roomItem = allRoomsData.rooms.find((r) => r.category === "single") || allRoomsData.rooms[0];
    } else if (cleanSlug === "three-sharing-room" || cleanSlug === "triple-sharing-room") {
      roomItem = allRoomsData.rooms.find((r) => r.category === "triple" || r.name.toLowerCase().includes("three") || r.name.toLowerCase().includes("triple")) || allRoomsData.rooms[0];
    } else if (cleanSlug === "double-sharing-room" || cleanSlug === "two-sharing-room" || cleanSlug === "twin-sharing-room") {
      roomItem = allRoomsData.rooms.find((r) => r.category === "double" || r.name.toLowerCase().includes("two") || r.name.toLowerCase().includes("double")) || allRoomsData.rooms[0];
    } else if (cleanSlug === "four-sharing-room") {
      roomItem = allRoomsData.rooms.find((r) => r.category === "four" || r.name.toLowerCase().includes("four")) || allRoomsData.rooms[0];
    } else if (cleanSlug === "five-sharing-room") {
      roomItem = allRoomsData.rooms.find((r) => r.category === "five" || r.name.toLowerCase().includes("five")) || allRoomsData.rooms[0];
    } else if (cleanSlug === "deluxe-single-room" || cleanSlug === "private-room") {
      roomItem = allRoomsData.rooms.find((r) => r.slug === cleanSlug || r.category === "single") || allRoomsData.rooms[0];
    }
  }

  if (!roomItem && !apiSingleRoom) {
    return null;
  }

  // If we found a roomItem by slug, fetch live details from GET /rooms/:id using its UUID
  if (roomItem && !apiSingleRoom && roomItem.id && /^[0-9a-fA-F-]{16,}$/.test(roomItem.id)) {
    console.log(`[API CALL] Fetching room detail from /rooms/${roomItem.id} for slug '${cleanSlug}'`);
    apiSingleRoom = await fetchApi<RoomDTO>(`/rooms/${roomItem.id}`);
  }

  // Construct normalized RoomDetailData
  const name = apiSingleRoom?.title || roomItem?.name || "Premium Room";
  const price = apiSingleRoom?.price ? parseFloat(apiSingleRoom.price) : roomItem?.price || 8000;
  const category = apiSingleRoom ? roomTypeEnumToCategory(apiSingleRoom.roomType, apiSingleRoom.title) : roomItem?.category || "double";
  const locationName = apiSingleRoom?.location?.name || roomItem?.area || "Ramapuram";
  const images = apiSingleRoom?.images && apiSingleRoom.images.length > 0 ? apiSingleRoom.images : [roomItem?.image || "/images/rooms/room_single.png"];
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

  // Ensure gallery has at least 4 items for grid presentation
  const fallbackGallery = [
    "/images/rooms/premium_single_main.png",
    "/images/rooms/premium_single_bathroom.png",
    "/images/rooms/premium_single_thumb2.png",
    "/images/rooms/premium_single_thumb3.png",
  ];
  while (galleryImages.length < 4) {
    const idx = galleryImages.length;
    galleryImages.push({
      id: idx + 1,
      src: fallbackGallery[idx] || fallbackGallery[0],
      alt: `${name} View ${idx + 1}`,
      title: `View ${idx + 1}`,
    });
  }

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
    image: images[0],
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
}
