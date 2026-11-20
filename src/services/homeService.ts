import { cache } from "react";
import homeData from "@/data/home.json";
import { HomeData, ReviewItem, LocationCardItem } from "@/types/home";
import { fetchApi } from "@/utils/apiClient";
import { fetchAllApiLocations } from "./locationsService";
import { resolveImageUrl } from "@/utils/image";

interface TestimonialDTO {
  id: string;
  customerName: string;
  rating: string | number;
  reviewText: string;
  status: string;
  location?: { id: string; name: string };
  createdAt?: string;
}

export const getHomeData = cache(async function getHomeData(): Promise<HomeData> {
  const fallback = homeData as HomeData;

  // 1. Fetch dynamic locations from CMS API
  let dynamicLocations: LocationCardItem[] = fallback.exploreLocations.locations;
  try {
    const apiLocations = await fetchAllApiLocations();
    if (apiLocations && apiLocations.length > 0) {
      dynamicLocations = apiLocations.map((loc) => {
        const slug = loc.name.toLowerCase().trim().replace(/\s+/g, "");
        const rawImg = loc.images && loc.images.length > 0 ? loc.images[0] : "";
        return {
          id: loc.id,
          name: loc.name,
          price: (loc as any).price || "₹10,500/mo",
          image: resolveImageUrl(rawImg) || "/images/home/ramapuram.png",
          href: `/locations?slug=${slug}&id=${loc.id}`,
          buttonText: "Explore Location",
        };
      });
    }
  } catch (err) {
    console.warn("[HOME SERVICE] Error loading dynamic locations:", err);
  }

  // 2. Fetch dynamic reviews/testimonials from CMS API
  let dynamicReviews: ReviewItem[] = fallback.reviews.reviews;
  try {
    const rawTestimonials = await fetchApi<any>("/testimonials?limit=100");
    let list: TestimonialDTO[] = [];
    if (Array.isArray(rawTestimonials)) {
      list = rawTestimonials;
    } else if (rawTestimonials && Array.isArray(rawTestimonials.data)) {
      list = rawTestimonials.data;
    } else if (rawTestimonials && Array.isArray(rawTestimonials.value)) {
      list = rawTestimonials.value;
    }

    const published = list.filter((t) => !t.status || t.status.toLowerCase() === "published");
    if (published.length > 0) {
      dynamicReviews = published.map((t, idx) => ({
        id: t.id || `rev-${idx}`,
        author: t.customerName || "Resident",
        location: t.location?.name ? `${t.location.name}, Chennai` : "Chennai",
        quote: t.reviewText || "",
        rating: typeof t.rating === "number" ? t.rating : parseFloat(t.rating) || 5,
        date: t.createdAt
          ? new Date(t.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })
          : "Recently",
      }));
    }
  } catch (err) {
    console.warn("[HOME SERVICE] Error loading dynamic testimonials:", err);
  }

  return {
    ...fallback,
    exploreLocations: {
      ...fallback.exploreLocations,
      locations: dynamicLocations,
    },
    reviews: {
      ...fallback.reviews,
      reviews: dynamicReviews,
    },
  };
});
