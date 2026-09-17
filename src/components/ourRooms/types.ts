export type RoomCategory = "all" | "single" | "double" | "triple" | "four" | "five" | "private";

export interface RoomItem {
  id: string;
  name: string;
  slug?: string;
  badge?: string;
  category: RoomCategory;
  location: string;
  area: string;
  price: number;
  deposit: number;
  photoCount: number;
  image: string;
  amenities: {
    wifi: boolean;
    ac: boolean;
    food: boolean;
    laundry: boolean;
    housekeeping: boolean;
    parking?: boolean;
    powerBackup?: boolean;
  };
  availableNow: boolean;
}

export interface FilterState {
  category: RoomCategory;
  locations: string[];
  minPrice: number;
  maxPrice: number;
  amenities: {
    wifi: boolean;
    ac: boolean;
    food: boolean;
    laundry: boolean;
    housekeeping: boolean;
    parking: boolean;
    powerBackup: boolean;
  };
  availableOnly: boolean;
}

export type SortOption = "popular" | "price-asc" | "price-desc";
