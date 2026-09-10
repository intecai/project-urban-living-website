export interface LocationCardItem {
  id: string;
  name: string;
  price: string;
  image: string;
  href: string;
}

export interface ExploreLocationsData {
  title: string;
  locations: LocationCardItem[];
}

export interface AmenityItem {
  id: string;
  title: string;
  icon: string;
  description: string;
}

export interface AmenitiesSectionData {
  eyebrow: string;
  heading: string;
  items: AmenityItem[];
}

export interface WhyChooseUsSectionData {
  headingLine1: string;
  headingLine2: string;
  description: string;
  features: string[];
  backgroundImage: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  location: string;
  quote: string;
  rating: number;
  date: string;
  avatar?: string;
}

export interface ReviewsSectionData {
  eyebrow: string;
  headingLine1: string;
  headingLine2: string;
  ratingScore: string;
  ratingSource: string;
  reviewsCountText: string;
  reviews: ReviewItem[];
}

export interface HeroSectionData {
  titleLine1: string;
  titleLine2: string;
  titleAccent: string;
  description: string;
  primaryCtaText: string;
  primaryCtaHref: string;
  secondaryCtaText: string;
  secondaryCtaHref: string;
  heroImage: string;
}

export interface HomeData {
  hero?: HeroSectionData;
  exploreLocations: ExploreLocationsData;
  amenities: AmenitiesSectionData;
  whyChooseUs: WhyChooseUsSectionData;
  reviews: ReviewsSectionData;
}
