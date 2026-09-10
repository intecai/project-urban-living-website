export interface LocationCardData {
  id: string;
  name: string;
  price: string;
  image: string;
  href: string;
}

export interface PopularLocationsData {
  eyebrow: string;
  heading: string;
  viewAllText: string;
  viewAllHref: string;
  locations: LocationCardData[];
}

export interface FeatureHighlight {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface EverythingYouNeedData {
  eyebrow: string;
  heading: string;
  description: string;
  features: FeatureHighlight[];
}

export interface LocationsPageData {
  popularLocations: PopularLocationsData;
  everythingYouNeed: EverythingYouNeedData;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  span: string;
}

export interface PricingPlan {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
  available: boolean;
}

export interface LocationDetailData {
  slug: string;
  title: string;
  subtitle: string;
  gallery: GalleryImage[];
  pricingPlans: PricingPlan[];
  aboutProperty: {
    badge?: string;
    title: string;
    description: string;
    highlights: string[];
  };
  whatsIncluded: string[];
}
