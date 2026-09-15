import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import RoomsHero from "@/components/ourRooms/RoomsHero";
import RoomsSection from "@/components/ourRooms/RoomsSection";
import FAQ from "@/components/ourRooms/FAQ";
import EnquiryBanner from "@/components/EnquiryBanner";
import Footer from "@/components/Footer";
import { getRoomsData } from "@/services/roomsService";
import { getCommonData } from "@/services/commonService";

export async function generateMetadata(): Promise<Metadata> {
  const roomsData = await getRoomsData();
  return {
    title: "Our Rooms & Pricing | Urban Living PG",
    description: roomsData?.description || "Explore fully furnished rooms in Chennai with premium amenities, high-speed Wi-Fi, and 24/7 security.",
  };
}

export default async function RoomsPage() {
  const roomsPageData = await getRoomsData();
  const commonData = await getCommonData();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white font-sans text-slate-900">
      {/* Navbar with activeLink="Our Rooms" */}
      <Navbar variant="solid" activeLink="Our Rooms" data={commonData.navbar} />

      <main className="flex-1">
        {/* Rooms Hero Banner Section */}
        <RoomsHero />

        {/* Rooms Listing Section */}
        <RoomsSection data={roomsPageData} />

        {/* Frequently Asked Questions Section */}
        <FAQ data={roomsPageData.faq} />
      </main>

      {/* Enquiry Banner Section */}
      <EnquiryBanner data={commonData.enquiryBanner} />

      {/* Footer Section */}
      <Footer data={commonData.footer} />
    </div>
  );
}
