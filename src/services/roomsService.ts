import roomsData from "@/data/rooms.json";
import { roomsData as defaultRoomsData } from "@/components/ourRooms/roomsData";
import { RoomsPageData } from "@/types/rooms";
import { RoomItem } from "@/components/ourRooms/types";
import { getRoomSlug } from "@/utils/slug";
import { MapPin, Footprints, Car, Bus, Train } from "lucide-react";

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

export async function getRoomsData(): Promise<RoomsPageData> {
  const rawList = Array.isArray(roomsData) ? (roomsData as any[]) : [];
  const roomItems: RoomItem[] = rawList.map((r, idx) => {
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
        { id: "private", label: "Private Suite" },
      ],
      locations: ["Ramapuram", "Madanandapuram", "Anna Nagar", "Guindy", "Porur", "Velachery"],
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
  const data = await getRoomsData();

  let room = data.rooms.find((r) => {
    const rSlug = (r.slug || getRoomSlug(r.name)).toLowerCase();
    return rSlug === cleanSlug;
  });

  // Handle fallback matching for known standard slug aliases if not directly found
  if (!room) {
    if (cleanSlug === "premium-single-room") {
      room = data.rooms.find((r) => r.slug === "premium-single-room") || data.rooms[0];
    } else if (cleanSlug === "single-room") {
      room = data.rooms.find((r) => r.category === "single") || data.rooms[0];
    } else if (cleanSlug === "three-sharing-room" || cleanSlug === "triple-sharing-room") {
      room = data.rooms.find((r) => r.category === "triple" || r.name.toLowerCase().includes("three")) || data.rooms[2];
    } else if (cleanSlug === "double-sharing-room" || cleanSlug === "two-sharing-room") {
      room = data.rooms.find((r) => r.category === "double" || r.name.toLowerCase().includes("two")) || data.rooms[4];
    } else if (cleanSlug === "deluxe-single-room") {
      room = data.rooms.find((r) => r.slug === "deluxe-single-room") || data.rooms[1];
    }
  }

  // If slug is unknown / invalid, return null to trigger 404
  if (!room) {
    return null;
  }

  // Determine Occupancy Tag
  let occupancyTag = "Single Occupancy";
  if (room.name.toLowerCase().includes("three") || room.category === "triple") {
    occupancyTag = "Triple Occupancy";
  } else if (room.name.toLowerCase().includes("two") || room.name.toLowerCase().includes("double") || room.name.toLowerCase().includes("twin") || room.category === "double") {
    occupancyTag = "Double Occupancy";
  } else if (room.name.toLowerCase().includes("four")) {
    occupancyTag = "Four Sharing";
  } else if (room.category === "private") {
    occupancyTag = "Private Suite";
  }

  // Determine Map URL based on location area
  let mapUrl = "https://maps.google.com/?q=13.029858,80.187920";
  if (room.location.toLowerCase().includes("madanandapuram")) {
    mapUrl = "https://www.google.com/maps?q=13.018336296081543,80.15691375732422&z=17&hl=en";
  }

  // Master Amenities mapping
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

  // Gallery Images setup
  const galleryImages: GalleryImageItem[] = [
    {
      id: 1,
      src: room.image || "/images/rooms/premium_single_main.png",
      alt: `${room.name} Main View`,
      title: "Main Room View",
    },
    {
      id: 2,
      src: "/images/rooms/premium_single_bathroom.png",
      alt: "Attached Bathroom View",
      title: "Bathroom View",
    },
    {
      id: 3,
      src: "/images/rooms/premium_single_thumb2.png",
      alt: `${room.name} Interior Angle 1`,
      title: "Bedroom View 1",
    },
    {
      id: 4,
      src: "/images/rooms/premium_single_thumb3.png",
      alt: `${room.name} Interior Angle 2`,
      title: "Bedroom View 2",
    },
  ];

  const nearbyList: WhatsNearbyItem[] = [
    {
      id: "1",
      name: "Shine Sports Academy",
      time: "3 min",
      leftIconName: "MapPin",
      modeIconName: "Footprints",
    },
    {
      id: "2",
      name: "Sunshine Badminton Academy",
      time: "4 min",
      leftIconName: "MapPin",
      modeIconName: "Footprints",
    },
    {
      id: "3",
      name: "Kovai Medical Center & Hospital",
      time: "7 min",
      leftIconName: "MapPin",
      modeIconName: "Car",
    },
    {
      id: "4",
      name: "Peelamedu Bus Stand",
      time: "12 min",
      leftIconName: "Bus",
      modeIconName: "Bus",
    },
    {
      id: "5",
      name: "Coimbatore Railway Station",
      time: "15 min",
      leftIconName: "Train",
      modeIconName: "Train",
    },
  ];

  return {
    id: room.id,
    slug: room.slug || cleanSlug,
    name: room.name,
    category: room.category,
    location: room.location,
    area: room.area,
    city: "Chennai",
    price: room.price,
    priceLabel: "month",
    deposit: room.deposit,
    badge: room.badge,
    foodInfo: room.amenities.food ? "Food Included" : "Self Cooking / Food Available",
    occupancyTag,
    furnishedTag: "Fully Furnished",
    bathroomTag: "Attached Bathroom",
    image: room.image,
    galleryImages,
    description: `A comfortable ${room.name.toLowerCase()} designed for your privacy and convenience. Located in ${room.location}, this fully furnished room comes with an attached bathroom and all essential amenities for a peaceful and hassle-free stay.`,
    highlights: [
      "Ideal for students and working professionals",
      "Well-ventilated with natural light",
      "Regular housekeeping & laundry facility",
      "Access to all common PG amenities",
    ],
    whatsIncluded: {
      room: `Fully furnished ${room.name.toLowerCase()} with attached bathroom`,
      food: room.amenities.food ? "Homely food included (Breakfast, Lunch & Dinner)" : "Food options & self-cooking area available",
      connectivity: "High-speed Wi-Fi internet access",
      utilities: "EB (Electricity) & water supply included",
      commonFacilities: "Access to all shared amenities and common areas",
    },
    amenities: masterAmenities,
    mapUrl,
    whatsNearby: nearbyList,
  };
}
