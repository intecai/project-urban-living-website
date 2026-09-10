import Navbar from "@/components/Navbar";
import HeroSection from "@/components/home/HeroSection";
import ExploreLocations from "@/components/home/ExploreLocations";
import AmenitiesSection from "@/components/home/AmenitiesSection";
import WhyChooseUsSection from "@/components/home/WhyChooseUsSection";
import ReviewsSection from "@/components/home/ReviewsSection";
import ExploreRooms from "@/components/home/ExploreRooms";
import EnquiryBanner from "@/components/EnquiryBanner";
import Footer from "@/components/Footer";
import { getHomeData } from "@/services/homeService";
import { getCommonData } from "@/services/commonService";

export default async function Home() {
  const homeData = await getHomeData();
  const commonData = await getCommonData();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white font-sans text-slate-900">
      <Navbar variant="solid" activeLink="Home" data={commonData.navbar} />

      <main className="flex-1">
        <HeroSection data={homeData.hero} />
        <ExploreRooms />
        <ExploreLocations data={homeData.exploreLocations} />
        <WhyChooseUsSection data={homeData.whyChooseUs} />
        <ReviewsSection data={homeData.reviews} />
        <AmenitiesSection data={homeData.amenities} />
      </main>

      <EnquiryBanner data={commonData.enquiryBanner} />
      <Footer data={commonData.footer} />
    </div>
  );
}
