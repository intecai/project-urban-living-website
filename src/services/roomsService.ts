import roomsData from "@/data/rooms.json";
import { roomsData as defaultRoomsData } from "@/components/ourRooms/roomsData";
import { RoomsPageData } from "@/types/rooms";
import { RoomItem } from "@/components/ourRooms/types";

export async function getRoomsData(): Promise<RoomsPageData> {
  if (Array.isArray(roomsData)) {
    const rawList = roomsData as any[];
    const roomItems: RoomItem[] = rawList.map((r, idx) => {
      const fallback = defaultRoomsData[idx] || defaultRoomsData.find((item) => item.id === r.id);
      return {
        id: r.id,
        name: r.title || r.name || fallback?.name || "",
        category: (r.category || fallback?.category) as any,
        location: r.location || fallback?.location || "",
        area: r.area || fallback?.area || (r.location ? r.location.split(",")[0].trim() : ""),
        price: r.price !== undefined ? r.price : fallback?.price,
        deposit: r.deposit !== undefined ? r.deposit : fallback?.deposit,
        photoCount: r.photoCount || fallback?.photoCount || 5,
        image: r.image || fallback?.image || "",
        amenities: typeof r.amenities === "object" && !Array.isArray(r.amenities)
          ? r.amenities
          : {
              wifi: Array.isArray(r.amenities) ? r.amenities.includes("WiFi") : (fallback?.amenities.wifi ?? true),
              ac: Array.isArray(r.amenities) ? r.amenities.includes("AC") : (fallback?.amenities.ac ?? true),
              food: Array.isArray(r.amenities) ? r.amenities.includes("Food") : (fallback?.amenities.food ?? true),
              laundry: Array.isArray(r.amenities) ? r.amenities.includes("Laundry") : (fallback?.amenities.laundry ?? false),
              housekeeping: Array.isArray(r.amenities) ? r.amenities.includes("Housekeeping") : (fallback?.amenities.housekeeping ?? false),
            },
        availableNow: r.availableNow !== undefined ? r.availableNow : fallback?.availableNow,
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
  return {
    title: "Explore Our Women's PG Rooms",
    description: "Find your perfect fully-furnished room in Chennai's safest neighborhoods.",
    rooms: defaultRoomsData,
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
      faqs: [],
    },
  };
}

export async function getRoomById(id: string): Promise<RoomItem | undefined> {
  const data = await getRoomsData();
  return data.rooms.find((room) => room.id === id);
}
