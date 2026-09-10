import Navbar from "@/components/Navbar";
import PopularLocations from "@/components/locations/PopularLocations";
import EverythingYouNeed from "@/components/locations/EverythingYouNeed";
import EnquiryBanner from "@/components/EnquiryBanner";
import Footer from "@/components/Footer";
import { getLocationsData } from "@/services/locationsService";
import { getCommonData } from "@/services/commonService";

export default async function LocationsPage() {
  const locationsData = await getLocationsData();
  const commonData = await getCommonData();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white font-sans text-slate-900">
      <Navbar variant="solid" activeLink="Locations" data={commonData.navbar} />

      <main className="flex-1">
        {/* Popular Locations Section */}
        <PopularLocations data={locationsData.popularLocations} />

        {/* Everything You Need Section */}
        <EverythingYouNeed data={locationsData.everythingYouNeed} />
      </main>

      {/* Enquiry Banner Section */}
      <EnquiryBanner data={commonData.enquiryBanner} />

      {/* Footer Section */}
      <Footer data={commonData.footer} />
    </div>
  );
}
