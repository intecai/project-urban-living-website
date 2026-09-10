import React from "react";
import Navbar from "@/components/Navbar";
import RamapuramHero from "@/components/locations/ramapuram/RamapuramHero";
import RamapuramGallery from "@/components/locations/ramapuram/RamapuramGallery";
import RamapuramPricingPlans from "@/components/locations/ramapuram/RamapuramPricingPlans";
import RamapuramAmenities from "@/components/locations/ramapuram/RamapuramAmenities";
import RamapuramAbout from "@/components/locations/ramapuram/RamapuramAbout";
import RamapuramLocation from "@/components/locations/ramapuram/RamapuramLocation";
import RamapuramEnquiry from "@/components/locations/ramapuram/RamapuramEnquiry";
import RamapuramFooter from "@/components/locations/ramapuram/RamapuramFooter";
import { ramapuramData } from "@/data/locations/ramapuram";
import { getCommonData } from "@/services/commonService";

export default async function RamapuramPage() {
  const commonData = await getCommonData();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F8FAFC] font-Plus_Jakarta_Sans text-slate-900">
      {/* Navbar Header */}
      <Navbar variant="solid" activeLink="Locations" data={commonData.navbar} />

      {/* Main Page Container */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 md:px-12 lg:px-16 py-8 sm:py-12 space-y-8">
        {/* 1. Hero Section (Title, Subtitle, Breadcrumbs) */}
        <RamapuramHero
          title={ramapuramData.hero.title}
          subtitle={ramapuramData.hero.subtitle}
          breadcrumbs={ramapuramData.hero.breadcrumbs}
        />

        {/* 2. Photo Gallery Section */}
        <RamapuramGallery items={ramapuramData.gallery} />

        {/* 3. 2-Column Content Layout (Pricing & Amenities Left + About & Map Right) */}
        <div className="flex flex-col lg:flex-row gap-8 items-start pt-2">
          {/* Left Column (Pricing Plans + Amenities) */}
          <div className="flex-1 w-full space-y-10">
            {/* Pricing Plans Section */}
            <RamapuramPricingPlans
              heading={ramapuramData.pricingPlans.heading}
              items={ramapuramData.pricingPlans.items}
            />

            {/* Amenities Section */}
            <RamapuramAmenities
              heading={ramapuramData.amenities.heading}
              items={ramapuramData.amenities.items}
            />
          </div>

          {/* Right Sidebar Column (About Property, What's Included & Location Address) */}
          <div className="w-full lg:w-[360px] xl:w-[400px] shrink-0 space-y-6">
            <RamapuramAbout
              about={ramapuramData.about}
              whatsIncluded={ramapuramData.whatsIncluded}
            />

            <RamapuramLocation location={ramapuramData.location} />
          </div>
        </div>
      </main>

      {/* Enquiry Banner Section */}
      <RamapuramEnquiry data={commonData.enquiryBanner} />

      {/* Footer Section */}
      <RamapuramFooter data={commonData.footer} />
    </div>
  );
}
