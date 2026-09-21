"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import RamapuramHero from "@/components/locations/ramapuram/RamapuramHero";
import RamapuramGallery from "@/components/locations/ramapuram/RamapuramGallery";
import RamapuramPricingPlans from "@/components/locations/ramapuram/RamapuramPricingPlans";
import RamapuramAmenities from "@/components/locations/ramapuram/RamapuramAmenities";
import AboutProperty from "@/components/locations/ramapuram/AboutProperty";
import RamapuramEnquiry from "@/components/locations/ramapuram/RamapuramEnquiry";
import RamapuramFooter from "@/components/locations/ramapuram/RamapuramFooter";
import FloorSelector from "./FloorSelector";
import { madanandapuramData } from "@/data/locations/madanandapuram";
import { LocationDTO } from "@/services/locationsService";

export interface MadanandapuramViewProps {
  commonData: any;
  apiLocation?: LocationDTO | null;
}

export default function MadanandapuramView({ commonData, apiLocation }: MadanandapuramViewProps) {
  const [selectedFloorId, setSelectedFloorId] = useState<string>("first");

  const currentFloor =
    madanandapuramData.floors.find((f) => f.id === selectedFloorId) ||
    madanandapuramData.floors[0];

  const heroTitle = apiLocation
    ? `${apiLocation.pgName} - ${apiLocation.name}`
    : madanandapuramData.hero.title;

  const galleryItems = [...currentFloor.gallery];
  if (apiLocation?.images && apiLocation.images.length > 0 && galleryItems.length > 0) {
    galleryItems[0] = {
      ...galleryItems[0],
      src: apiLocation.images[0],
    };
  }

  const aboutPropertyData = {
    ...madanandapuramData.aboutProperty,
    mapUrl: apiLocation?.mapUrl || madanandapuramData.aboutProperty.mapUrl,
  };

  return (
    <div className="min-h-screen flex flex-col justify-between font-Plus_Jakarta_Sans text-slate-900 bg-white">
      <Navbar variant="solid" activeLink="Locations" data={commonData.navbar} />

      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 md:px-12 lg:px-16 py-8 sm:py-12 space-y-8 sm:space-y-10">
        <RamapuramHero
          title={heroTitle}
          subtitle={madanandapuramData.hero.subtitle}
          breadcrumbs={madanandapuramData.hero.breadcrumbs}
        />

        {/* Floor / Area Selection Filter */}
        <FloorSelector
          floors={madanandapuramData.floors}
          selectedFloorId={selectedFloorId}
          onSelectFloor={setSelectedFloorId}
        />

        {/* Dynamic Gallery based on floor selection */}
        <RamapuramGallery items={galleryItems} />

        <RamapuramPricingPlans
          heading={madanandapuramData.pricingPlans.heading}
          items={madanandapuramData.pricingPlans.items}
        />

        <RamapuramAmenities
          heading={madanandapuramData.amenities.heading}
          items={madanandapuramData.amenities.items}
        />

        <AboutProperty data={aboutPropertyData} />
      </main>

      <RamapuramEnquiry data={commonData.enquiryBanner} />
      <RamapuramFooter data={commonData.footer} />
    </div>
  );
}

