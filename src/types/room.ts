export interface Room {
  id: string;
  title: string;
  slug?: string;
  category: string;
  amenities: string[];
  price: number;
  priceLabel: string;
  image: string;
  badge?: string;
}
