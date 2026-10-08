import type { Metadata } from "next";
import { Inter, Figtree, Montserrat, Plus_Jakarta_Sans, Lato, Alex_Brush, Great_Vibes, Manrope, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

const lato = Lato({
  variable: "--font-lato",
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
});

const alexBrush = Alex_Brush({
  variable: "--font-alex-brush",
  weight: "400",
  subsets: ["latin"],
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  weight: "400",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage-grotesque",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://urbanliving.client.intecai.in";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2571A5",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Urban Living PG | Luxury Women's Accommodation & Coliving Chennai",
    template: "%s | Urban Living PG",
  },
  description:
    "Urban Living provides premium, fully furnished luxury PG and coliving accommodations for working women and students in Ramapuram & Madhanandapuram, Chennai. Includes high-speed Wi-Fi, AC, nutritious food, daily housekeeping, 24/7 security, and power backup.",
  keywords: [
    "PG in Chennai",
    "Luxury PG for women Chennai",
    "Women's PG in Ramapuram",
    "Women's PG in Madhanandapuram",
    "Coliving Chennai",
    "Ladies PG near DLF Chennai",
    "Urban Living PG",
    "Single room PG Chennai",
    "Sharing room PG Chennai",
    "Safe hostel for women Chennai",
  ],
  authors: [{ name: "Urban Living" }],
  creator: "Urban Living",
  publisher: "Urban Living",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    title: "Urban Living PG | Luxury Women's Accommodation & Coliving Chennai",
    description:
      "Urban Living offers premium, safe, and fully furnished luxury PG accommodation and coliving spaces for women in Chennai, located in Ramapuram & Madhanandapuram.",
    siteName: "Urban Living PG",
    images: [
      {
        url: "/images/rooms/room_single.png",
        width: 1200,
        height: 630,
        alt: "Urban Living Luxury PG Accommodation in Chennai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Urban Living PG | Luxury Women's Accommodation & Coliving Chennai",
    description:
      "Premium, safe and fully furnished luxury coliving and PG accommodations for women in Ramapuram & Madhanandapuram, Chennai.",
    images: ["/images/rooms/room_single.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/images/common/mainLogo.png",
    shortcut: "/images/common/mainLogo.png",
    apple: "/images/common/mainLogo.png",
  },
};

const lodgingJsonLd = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: "Urban Living PG",
  description:
    "Premium, safe and fully furnished luxury PG accommodation and coliving spaces for women in Chennai.",
  url: siteUrl,
  telephone: "+91 98840 22247",
  priceRange: "₹5000 - ₹20000",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Ramapuram & Madhanandapuram",
    addressLocality: "Chennai",
    addressRegion: "Tamil Nadu",
    postalCode: "600089",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 13.0315,
    longitude: 80.1817,
  },
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "High Speed Wi-Fi", value: true },
    { "@type": "LocationFeatureSpecification", name: "Air Conditioning", value: true },
    { "@type": "LocationFeatureSpecification", name: "Nutritious Food", value: true },
    { "@type": "LocationFeatureSpecification", name: "Daily Housekeeping", value: true },
    { "@type": "LocationFeatureSpecification", name: "24/7 Security & CCTV", value: true },
    { "@type": "LocationFeatureSpecification", name: "Power Backup", value: true },
    { "@type": "LocationFeatureSpecification", name: "Washing Machine / Laundry", value: true },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${figtree.variable} ${montserrat.variable} ${plusJakartaSans.variable} ${lato.variable} ${alexBrush.variable} ${greatVibes.variable} ${manrope.variable} ${bricolageGrotesque.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(lodgingJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
