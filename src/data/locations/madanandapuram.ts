export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  span: string;
}

export interface PricingPlanItem {
  id: string;
  title: string;
  description: string;
  price: string;
  pricePrefix?: string;
  priceSuffix?: string;
  image: string;
  available: boolean;
}

export interface AmenityItemData {
  id: string;
  title: string;
  iconName: string;
  imageIcon?: string;
}

export const MADHANANDAPURAM_MAP_URL =
  "https://www.google.com/maps?q=13.018336296081543,80.15691375732422&z=17&hl=en";
export const MADHANANDAPURAM_LAT = 13.018336296081543;
export const MADHANANDAPURAM_LNG = 80.15691375732422;

export interface AboutPropertyData {
  title: string;
  paragraph1: string;
  paragraph2: string;
  readMoreLabel: string;
  readLessLabel: string;
  mapImage: string;
  mapUrl?: string;
}

export interface FloorOption {
  id: string;
  label: string;
  detailsLabel: string;
  mapUrl?: string;
  gallery: GalleryItem[];
}

export interface MadanandapuramData {
  name: string;
  slug: string;
  mapUrl: string;
  latitude: number;
  longitude: number;
  hero: {
    title: string;
    subtitle: string;
    breadcrumbs: { label: string; href?: string }[];
  };
  floors: FloorOption[];
  pricingPlans: {
    heading: string;
    items: PricingPlanItem[];
  };
  amenities: {
    heading: string;
    items: AmenityItemData[];
  };
  aboutProperty: AboutPropertyData;
}

export const madanandapuramData: MadanandapuramData = {
  name: "Madhanandapuram",
  slug: "madanandapuram",
  mapUrl: MADHANANDAPURAM_MAP_URL,
  latitude: MADHANANDAPURAM_LAT,
  longitude: MADHANANDAPURAM_LNG,
  hero: {
    title: "Urban Living - Madhanandapuram",
    subtitle: "Comfortable PG Living • Private & Shared Rooms • All Essential Amenities",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Locations", href: "/locations" },
      { label: "Madhanandapuram" },
    ],
  },
  floors: [
    {
      id: "ground",
      label: "Ground Floor",
      detailsLabel: "Ground Floor",
      mapUrl: MADHANANDAPURAM_MAP_URL,
      gallery: [
        {
          id: "1",
          src: "/images/rooms/room_deluxe.png",
          alt: "Ground Floor Living Room",
          span: "main",
        },
        {
          id: "2",
          src: "/images/rooms/room_comfort.png",
          alt: "Ground Floor Dining Area",
          span: "center-top",
        },
        {
          id: "3",
          src: "/images/rooms/room_single.png",
          alt: "Ground Floor Bedroom View",
          span: "center-bottom",
        },
        {
          id: "4",
          src: "/images/rooms/room_sharing.png",
          alt: "Ground Floor Lounge",
          span: "right",
        },
      ],
    },
    {
      id: "first",
      label: "First Floor",
      detailsLabel: "First Floor",
      mapUrl: MADHANANDAPURAM_MAP_URL,
      gallery: [
        {
          id: "1",
          src: "/images/rooms/room_single.png",
          alt: "First Floor Living Area",
          span: "main",
        },
        {
          id: "2",
          src: "/images/rooms/room_sharing.png",
          alt: "First Floor Dining Area",
          span: "center-top",
        },
        {
          id: "3",
          src: "/images/rooms/room_deluxe.png",
          alt: "First Floor Bedroom",
          span: "center-bottom",
        },
        {
          id: "4",
          src: "/images/rooms/room_comfort.png",
          alt: "First Floor Balcony View",
          span: "right",
        },
      ],
    },
    {
      id: "4a",
      label: "4A",
      detailsLabel: "4A",
      mapUrl: MADHANANDAPURAM_MAP_URL,
      gallery: [
        {
          id: "1",
          src: "/images/rooms/room_comfort.png",
          alt: "4A Living Suite",
          span: "main",
        },
        {
          id: "2",
          src: "/images/rooms/room_single.png",
          alt: "4A Dining Table",
          span: "center-top",
        },
        {
          id: "3",
          src: "/images/rooms/room_sharing.png",
          alt: "4A Bedroom View",
          span: "center-bottom",
        },
        {
          id: "4",
          src: "/images/rooms/room_deluxe.png",
          alt: "4A View",
          span: "right",
        },
      ],
    },
    {
      id: "4b",
      label: "4B",
      detailsLabel: "4B",
      mapUrl: MADHANANDAPURAM_MAP_URL,
      gallery: [
        {
          id: "1",
          src: "/images/rooms/room_sharing.png",
          alt: "4B Suite Room",
          span: "main",
        },
        {
          id: "2",
          src: "/images/rooms/room_deluxe.png",
          alt: "4B Dining Lounge",
          span: "center-top",
        },
        {
          id: "3",
          src: "/images/rooms/room_comfort.png",
          alt: "4B Bedroom View",
          span: "center-bottom",
        },
        {
          id: "4",
          src: "/images/rooms/room_single.png",
          alt: "4B Balcony",
          span: "right",
        },
      ],
    },
  ],
  pricingPlans: {
    heading: "Pricing Plans",
    items: [
      {
        id: "1",
        title: "Two Sharing",
        description: "Comfortable shared space with access to all essential amenities",
        price: "₹11,000/",
        pricePrefix: "Starting From",
        priceSuffix: "* month",
        image: "/images/rooms/room_single.png",
        available: true,
      },
      {
        id: "2",
        title: "Four Sharing",
        description: "Well-designed shared space with access to all essential amenities",
        price: "₹10,000/",
        pricePrefix: "Starting From",
        priceSuffix: "* month",
        image: "/images/rooms/room_sharing.png",
        available: true,
      },
      {
        id: "3",
        title: "Five Sharing",
        description: "Spacious shared space with access to essential amenities",
        price: "₹10,000/",
        pricePrefix: "Starting From",
        priceSuffix: "* month",
        image: "/images/rooms/room_deluxe.png",
        available: true,
      },
    ],
  },
  amenities: {
    heading: "Amenities",
    items: [
      { id: "1", title: "Kitchen", iconName: "UtensilsCrossed", imageIcon: "/images/rooms/Amenities-kitchen.png" },
      { id: "2", title: "Washing Machine", iconName: "WashingMachine", imageIcon: "/images/rooms/Amenities-WashingMachine.png" },
      { id: "3", title: "CCTV", iconName: "Cctv", imageIcon: "/images/rooms/Amenities-CCTV.png" },
      { id: "4", title: "Geyser", iconName: "Flame", imageIcon: "/images/rooms/Amenities-Geyser.png" },
      { id: "5", title: "AC room", iconName: "AirVent", imageIcon: "/images/rooms/Amenities-AC.png" },
      { id: "6", title: "Kettle", iconName: "Coffee", imageIcon: "/images/rooms/Amenities-Kettle.png" },
      { id: "7", title: "TV", iconName: "Tv", imageIcon: "/images/rooms/Amenities-TV.png" },
      { id: "8", title: "Wi-Fi", iconName: "Wifi", imageIcon: "/images/rooms/Amenities-wifi.png" },
      { id: "9", title: "Induction stove", iconName: "Flame", imageIcon: "/images/rooms/Amenities-Inductionstov.png" },
      { id: "10", title: "Microwave", iconName: "Microwave", imageIcon: "/images/rooms/Amenities-Microwave.png" },
      { id: "11", title: "Digital Lock", iconName: "Lock", imageIcon: "/images/rooms/Amenities-DigitalLock.png" },
      { id: "12", title: "Caretaker", iconName: "UserCheck", imageIcon: "/images/rooms/Amenities-Caretaker.png" },
      { id: "13", title: "Fire extinguisher", iconName: "ShieldAlert", imageIcon: "/images/rooms/Amenities-FireExtinguisher.png" },
    ],
  },
  aboutProperty: {
    title: "About this property",
    paragraph1:
      "Urban Living - Madhanandapuram offers comfortable and affordable PG accommodation in Madhanandapuram, Chennai, designed for students and working professionals. Located in a convenient residential area, our fully furnished PG provides single, double, and triple sharing rooms with essential amenities for a comfortable stay.",
    paragraph2:
      "With homely food and EB charges included, residents can enjoy a hassle-free living experience without worrying about additional monthly expenses. The property is equipped with Wi-Fi, air conditioning, washing machine, geyser, power backup, and essential kitchen facilities. With a secure and well-maintained environment, Urban Living makes everyday living comfortable and convenient.",
    readMoreLabel: "See More",
    readLessLabel: "See Less",
    mapImage: "/images/rooms/urbanlivingMap.png",
    mapUrl: MADHANANDAPURAM_MAP_URL,
  },
};
