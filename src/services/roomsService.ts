import roomsData from "@/data/rooms.json";
import { RoomsPageData } from "@/types/rooms";
import { RoomItem } from "@/components/ourRooms/types";

export async function getRoomsData(): Promise<RoomsPageData> {
  if (Array.isArray(roomsData)) {
    const rawList = roomsData as any[];
    const roomItems: RoomItem[] = rawList.map((r) => ({
      id: r.id,
      name: r.title,
      category: r.category as any,
      location: "Ramapuram, Chennai",
      area: "Ramapuram",
      price: r.price,
      deposit: 5000,
      photoCount: 5,
      image: r.image,
      amenities: {
        wifi: Array.isArray(r.amenities) ? r.amenities.includes("WiFi") : true,
        ac: Array.isArray(r.amenities) ? r.amenities.includes("AC") : true,
        food: Array.isArray(r.amenities) ? r.amenities.includes("Food") : true,
        laundry: Array.isArray(r.amenities) ? r.amenities.includes("Laundry") : false,
        housekeeping: Array.isArray(r.amenities) ? r.amenities.includes("Housekeeping") : false,
      },
      availableNow: true,
    }));

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
        locations: ["Ramapuram", "Madanandapuram", "Anna Nagar", "Guindy"],
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
  return roomsData as RoomsPageData;
}

export async function getRoomById(id: string): Promise<RoomItem | undefined> {
  const data = await getRoomsData();
  return data.rooms.find((room) => room.id === id);
}
