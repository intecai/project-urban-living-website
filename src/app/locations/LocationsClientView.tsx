"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import PopularLocations from "@/components/locations/PopularLocations";
import EverythingYouNeed from "@/components/locations/EverythingYouNeed";
import EnquiryBanner from "@/components/EnquiryBanner";
import Footer from "@/components/Footer";

// Ramapuram custom components
import RamapuramHero from "@/components/locations/ramapuram/RamapuramHero";
import RamapuramGallery from "@/components/locations/ramapuram/RamapuramGallery";
import RamapuramPricingPlans from "@/components/locations/ramapuram/RamapuramPricingPlans";
import RamapuramAmenities from "@/components/locations/ramapuram/RamapuramAmenities";
import AboutProperty from "@/components/locations/ramapuram/AboutProperty";
import RamapuramEnquiry from "@/components/locations/ramapuram/RamapuramEnquiry";
import RamapuramFooter from "@/components/locations/ramapuram/RamapuramFooter";
import { ramapuramData } from "@/data/locations/ramapuram";

// Madanandapuram custom component
import MadanandapuramView from "@/components/locations/madanandapuram/MadanandapuramView";

import LocationsHero from "@/components/locations/LocationsHero";

// Data types
import locationDetailsData from "@/data/locationDetails.json";
import { LocationsPageData, LocationDetailData } from "@/types/locations";

export interface LocationsClientViewProps {
  locationsData: LocationsPageData;
  commonData: any;
}

export default function LocationsClientView({ locationsData, commonData }: LocationsClientViewProps) {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");

  // If a slug query parameter is provided (e.g. /locations?slug=ramapuram)
  if (slug) {
    const lowerSlug = slug.toLowerCase();

    // Custom Ramapuram location detail view
    if (lowerSlug === "ramapuram") {
      return (
        <div className="min-h-screen flex flex-col justify-between font-Plus_Jakarta_Sans text-slate-900">
          <Navbar variant="solid" activeLink="Locations" data={commonData.navbar} />

          <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 md:px-12 lg:px-16 py-8 sm:py-12 space-y-12">
            <RamapuramHero
              title={ramapuramData.hero.title}
              subtitle={ramapuramData.hero.subtitle}
              breadcrumbs={ramapuramData.hero.breadcrumbs}
            />
            <RamapuramGallery items={ramapuramData.gallery} />
            <RamapuramPricingPlans
              heading={ramapuramData.pricingPlans.heading}
              items={ramapuramData.pricingPlans.items}
            />
            <RamapuramAmenities
              heading={ramapuramData.amenities.heading}
              items={ramapuramData.amenities.items}
            />
            <AboutProperty data={ramapuramData.aboutProperty} />
          </main>

          <RamapuramEnquiry data={commonData.enquiryBanner} />
          <RamapuramFooter data={commonData.footer} />
        </div>
      );
    }

    // Custom Madhanandapuram / Madanandapuram location detail view
    if (lowerSlug === "madanandapuram" || lowerSlug === "madhanandapuram") {
      return <MadanandapuramView commonData={commonData} />;
    }

    // Generic Location Detail page for other location slugs
    const details = locationDetailsData as Record<string, LocationDetailData>;
    const locationData = details[lowerSlug] || details["ramapuram"];

    if (locationData) {
      return (
        <div className="min-h-screen flex flex-col justify-between bg-[#F8FAFC] font-Plus_Jakarta_Sans text-slate-900">
          <Navbar variant="solid" activeLink="Locations" data={commonData.navbar} />

          <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 md:px-12 lg:px-16 py-8 sm:py-12 space-y-8">
            <div>
              <nav className="flex items-center gap-2 text-xs sm:text-sm text-[#6B7280] font-medium mb-3">
                <Link href="/" className="hover:text-[#1F2937] transition-colors">
                  Home
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-[#9CA3AF]" />
                <Link href="/locations" className="hover:text-[#1F2937] transition-colors">
                  Locations
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-[#9CA3AF]" />
                <span className="text-[#011A2A] font-semibold capitalize">{lowerSlug}</span>
              </nav>

              <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#011A2A] font-Plus_Jakarta_Sans tracking-tight">
                {locationData.title}
              </h1>
              <p className="text-xs sm:text-sm text-[#64748B] font-normal mt-1 font-Plus_Jakarta_Sans">
                {locationData.subtitle}
              </p>
            </div>

            {/* Photo Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-5">
              <div className="md:col-span-2 relative h-[280px] sm:h-[360px] rounded-[16px] overflow-hidden bg-slate-100 shadow-2xs group">
                <Image
                  src={locationData.gallery[0]?.src || "/images/rooms/room_comfort.png"}
                  alt={locationData.gallery[0]?.alt || locationData.title}
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="md:col-span-1 flex flex-col gap-4 sm:gap-5">
                <div className="relative h-[132px] sm:h-[170px] rounded-[16px] overflow-hidden bg-slate-100 shadow-2xs group">
                  <Image
                    src={locationData.gallery[1]?.src || "/images/rooms/room_deluxe.png"}
                    alt={locationData.gallery[1]?.alt || "Gallery 2"}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="relative h-[132px] sm:h-[170px] rounded-[16px] overflow-hidden bg-slate-100 shadow-2xs group">
                  <Image
                    src={locationData.gallery[2]?.src || "/images/rooms/room_single.png"}
                    alt={locationData.gallery[2]?.alt || "Gallery 3"}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              <div className="md:col-span-1 relative h-[280px] sm:h-[360px] rounded-[16px] overflow-hidden bg-slate-100 shadow-2xs group">
                <Image
                  src={locationData.gallery[3]?.src || "/images/rooms/room_sharing.png"}
                  alt={locationData.gallery[3]?.alt || "Gallery 4"}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Content Layout */}
            <div className="flex flex-col lg:flex-row gap-8 items-start pt-4">
              <div className="flex-1 w-full space-y-6">
                <h2 className="text-xl sm:text-2xl font-bold text-[#011A2A] font-Plus_Jakarta_Sans tracking-tight">
                  Pricing Plans
                </h2>
                <div className="space-y-4">
                  {locationData.pricingPlans.map((plan) => (
                    <div
                      key={plan.id}
                      className="bg-white rounded-[16px] border border-[#E2E8F0] p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-2xs hover:border-[#0053B0]/40 transition-all duration-200"
                    >
                      <div className="relative w-full sm:w-[180px] md:w-[210px] h-[130px] rounded-[12px] overflow-hidden shrink-0 bg-slate-100">
                        <Image
                          src={plan.image}
                          alt={plan.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between h-full space-y-2">
                        <div>
                          <h3 className="text-base sm:text-lg font-bold text-[#011A2A] font-Plus_Jakarta_Sans">
                            {plan.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-[#64748B] font-normal mt-1 leading-relaxed">
                            {plan.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5 pt-2 sm:pt-4">
                          <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                          <span className="text-xs font-semibold text-[#10B981] font-Plus_Jakarta_Sans">
                            Available Now
                          </span>
                        </div>
                      </div>
                      <div className="sm:text-right shrink-0 self-end sm:self-center pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 w-full sm:w-auto flex sm:flex-col justify-between items-center sm:items-end">
                        <span className="block text-[10px] sm:text-[11px] font-semibold text-[#9CA3AF] tracking-wider uppercase font-Plus_Jakarta_Sans">
                          Starting From
                        </span>
                        <span className="block text-base sm:text-lg font-bold text-[#0053B0] font-Plus_Jakarta_Sans tracking-tight mt-0.5">
                          {plan.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full lg:w-[360px] xl:w-[400px] shrink-0 space-y-6">
                <div className="bg-white rounded-[20px] border border-[#E2E8F0] p-6 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#0053B0] bg-[#0053B0]/10 px-3 py-1 rounded-full uppercase tracking-wider">
                      {locationData.aboutProperty.badge || "Most Popular"}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#011A2A] font-Plus_Jakarta_Sans">
                    {locationData.aboutProperty.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#64748B] font-normal leading-relaxed">
                    {locationData.aboutProperty.description}
                  </p>
                  <div className="pt-2 border-t border-slate-100 space-y-2.5">
                    {locationData.aboutProperty.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-[#011A2A] font-medium">
                        <CheckCircle2 className="w-4 h-4 text-[#0053B0] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-[20px] border border-[#E2E8F0] p-6 shadow-2xs space-y-4">
                  <h3 className="text-lg font-bold text-[#011A2A] font-Plus_Jakarta_Sans">
                    What's Included
                  </h3>
                  <div className="space-y-3">
                    {locationData.whatsIncluded.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-[#475569] font-medium">
                        <div className="w-2 h-2 rounded-full bg-[#0053B0]" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </main>
          <EnquiryBanner data={commonData.enquiryBanner} />
          <Footer data={commonData.footer} />
        </div>
      );
    }
  }

  // Default Locations Overview Page
  return (
    <div className="min-h-screen flex flex-col justify-between bg-white font-sans text-slate-900">
      <Navbar variant="solid" activeLink="Locations" data={commonData.navbar} />
      <main className="flex-1">
        <LocationsHero />
        <PopularLocations data={locationsData.popularLocations} />
        <EverythingYouNeed data={locationsData.everythingYouNeed} />
      </main>
      <EnquiryBanner data={commonData.enquiryBanner} />
      <Footer data={commonData.footer} />
    </div>
  );
}
