import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import EnquiryBanner from "@/components/EnquiryBanner";
import Footer from "@/components/Footer";
import { getLocationDetailBySlug } from "@/services/locationsService";
import { getCommonData } from "@/services/commonService";

interface LocationDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function LocationDetailPage({ params }: LocationDetailPageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug || "ramapuram";
  
  const locationData = await getLocationDetailBySlug(slug);
  const commonData = await getCommonData();

  if (!locationData) {
    return (
      <div className="min-h-screen flex flex-col justify-between bg-white font-sans text-slate-900">
        <Navbar variant="solid" activeLink="Locations" data={commonData.navbar} />
        <div className="flex-1 flex flex-col items-center justify-center p-12 text-center space-y-4">
          <h1 className="text-2xl font-bold text-[#011A2A]">Location Not Found</h1>
          <p className="text-slate-500">The location you requested does not exist.</p>
          <Link href="/locations" className="px-5 py-2.5 bg-[#2563EB] text-white rounded-full text-sm font-semibold">
            Back to Locations
          </Link>
        </div>
        <Footer data={commonData.footer} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F8FAFC] font-Plus_Jakarta_Sans text-slate-900">
      {/* 1. Header Navbar */}
      <Navbar variant="solid" activeLink="Locations" data={commonData.navbar} />

      {/* 2. Main Location Content Area */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 md:px-12 lg:px-16 py-8 sm:py-12 space-y-8">
        
        {/* Breadcrumbs & Header Section */}
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
            <span className="text-[#011A2A] font-semibold capitalize">{slug}</span>
          </nav>

          <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#011A2A] font-Plus_Jakarta_Sans tracking-tight">
            {locationData.title}
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] font-normal mt-1 font-Plus_Jakarta_Sans">
            {locationData.subtitle}
          </p>
        </div>

        {/* Photo Gallery Grid (4 Images Collage) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-5">
          {/* Main Left Image */}
          <div className="md:col-span-2 relative h-[280px] sm:h-[360px] rounded-[16px] overflow-hidden bg-slate-100 shadow-2xs group">
            <Image
              src={locationData.gallery[0]?.src || "/images/rooms/room_comfort.png"}
              alt={locationData.gallery[0]?.alt || locationData.title}
              fill
              priority
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Center Column 2 Stacked Images */}
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

          {/* Right Column Tall Image */}
          <div className="md:col-span-1 relative h-[280px] sm:h-[360px] rounded-[16px] overflow-hidden bg-slate-100 shadow-2xs group">
            <Image
              src={locationData.gallery[3]?.src || "/images/rooms/room_sharing.png"}
              alt={locationData.gallery[3]?.alt || "Gallery 4"}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* 2-Column Content Layout (Pricing Plans Left + Sidebar Right) */}
        <div className="flex flex-col lg:flex-row gap-8 items-start pt-4">
          
          {/* Left Column: Pricing Plans List */}
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
                  {/* Left Room Thumbnail */}
                  <div className="relative w-full sm:w-[180px] md:w-[210px] h-[130px] rounded-[12px] overflow-hidden shrink-0 bg-slate-100">
                    <Image
                      src={plan.image}
                      alt={plan.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Room Details & Description */}
                  <div className="flex-1 flex flex-col justify-between h-full space-y-2">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-[#011A2A] font-Plus_Jakarta_Sans">
                        {plan.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#64748B] font-normal mt-1 leading-relaxed">
                        {plan.description}
                      </p>
                    </div>

                    {/* Available Now Badge */}
                    <div className="flex items-center gap-1.5 pt-2 sm:pt-4">
                      <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                      <span className="text-xs font-semibold text-[#10B981] font-Plus_Jakarta_Sans">
                        Available Now
                      </span>
                    </div>
                  </div>

                  {/* Right Pricing Info */}
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

          {/* Right Column: About Property & Included Amenities Sidebar */}
          <div className="w-full lg:w-[360px] xl:w-[400px] shrink-0 space-y-6">
            
            {/* About Property Card */}
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

            {/* What's Included Card */}
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

      {/* 3. Bottom Enquiry Banner */}
      <EnquiryBanner data={commonData.enquiryBanner} />

      {/* 4. Footer */}
      <Footer data={commonData.footer} />
    </div>
  );
}
