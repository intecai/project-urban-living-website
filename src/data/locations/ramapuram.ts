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

export interface AboutPropertyData {
  title: string;
  paragraph1: string;
  paragraph2: string;
  readMoreLabel: string;
  readLessLabel: string;
  mapImage: string;
}

export interface RamapuramData {
  hero: {
    title: string;
    subtitle: string;
    breadcrumbs: { label: string; href?: string }[];
  };
  gallery: GalleryItem[];
  pricingPlans: {
    heading: string;
    items: PricingPlanItem[];
  };
  amenities: {
    heading: string;
    items: AmenityItemData[];
  };
  aboutProperty: AboutPropertyData;
  about: {
    badge: string;
    title: string;
    description: string;
    highlights: string[];
  };
  whatsIncluded: {
    title: string;
    items: string[];
  };
  location: {
    title: string;
    address: string;
    area: string;
    city: string;
    mapSrc?: string;
  };
}

export const ramapuramData: RamapuramData = {
  hero: {
    title: "Urban Living - Ramapuram",
    subtitle: "Comfortable PG Living • Private & Shared Rooms • All Essential Amenities",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Locations", href: "/locations" },
      { label: "Ramapuram" },
    ],
  },
  gallery: [
    {
      id: "1",
      src: "/images/rooms/room_comfort.png",
      alt: "Ramapuram Main Living Room",
      span: "main",
    },
    {
      id: "2",
      src: "/images/rooms/room_deluxe.png",
      alt: "TV & Entertainment Lounge",
      span: "center-top",
    },
    {
      id: "3",
      src: "/images/rooms/room_single.png",
      alt: "Study Desk & Bedroom View",
      span: "center-bottom",
    },
    {
      id: "4",
      src: "/images/rooms/room_sharing.png",
      alt: "Spacious Double Bedroom",
      span: "right",
    },
  ],
  pricingPlans: {
    heading: "Pricing Plans",
    items: [
      {
        id: "1",
        title: "Double Sharing",
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
      "Urban Living - Ramapuram offers comfortable and affordable PG accommodation in Ramapuram, Coimbatore, designed for students and working professionals. Located in a convenient residential area, our fully furnished PG provides single, double, and triple sharing rooms with essential amenities for a comfortable stay.",
    paragraph2:
      "With homely food and EB charges included, residents can enjoy a hassle-free living experience without worrying about additional monthly expenses. The property is equipped with Wi-Fi, air conditioning, washing machine, geyser, power backup, and essential kitchen facilities. With a secure and well-maintained environment, Urban Living makes everyday living comfortable and convenient.",
    readMoreLabel: "See More",
    readLessLabel: "See Less",
    mapImage: "/images/rooms/urbanlivingMap.png",
  },
  about: {
    badge: "Most Popular",
    title: "About This Property",
    description:
      "A comfortable PG in Ramapuram with attached bath, high speed WiFi, nutritious food, and 24/7 security. Located close to DLF IT Park and SRM University.",
    highlights: [
      "Ideal for students & IT professionals",
      "Regular housekeeping & laundry options",
      "Access to all modern amenities",
    ],
  },
  whatsIncluded: {
    title: "What's Included",
    items: [
      "High-speed Wi-Fi",
      "3 Times Nutritious Meals",
      "Air Conditioning & Power Backup",
      "Housekeeping & Laundry Service",
      "24/7 CCTV & Gated Security",
    ],
  },
  location: {
    title: "Location",
    address: "Ramapuram, Chennai, Tamil Nadu 600089",
    area: "Ramapuram",
    city: "Chennai",
  },
};
