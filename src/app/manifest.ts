import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Urban Living PG - Luxury Women's Accommodation & Coliving",
    short_name: "Urban Living",
    description:
      "Premium, safe and fully furnished luxury coliving and PG accommodations for working women and students in Chennai.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#2571A5",
    icons: [
      {
        src: "/images/common/mainLogo.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/images/common/mainLogo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
