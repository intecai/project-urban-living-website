import { RoomItem, RoomCategory } from "@/components/ourRooms/types";

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FAQSectionData {
  title: string;
  subtitle: string;
  faqs: FAQItem[];
}

export interface FilterOptionsData {
  categories: { id: RoomCategory; label: string }[];
  locations: string[];
  priceRange: { min: number; max: number; step: number };
  amenities: { id: string; label: string }[];
}

export interface RoomsPageData {
  title: string;
  description: string;
  rooms: RoomItem[];
  filterOptions: FilterOptionsData;
  faq: FAQSectionData;
}
