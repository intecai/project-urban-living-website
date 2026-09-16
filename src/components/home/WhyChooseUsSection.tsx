"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { WhyChooseUsSectionData } from "@/types/home";

export interface WhyChooseUsSectionProps {
  data?: WhyChooseUsSectionData;
}

const defaultFeatures = [
  "Fully furnished premium rooms",
  "Regular housekeeping services",
  "24/7 CCTV security & biometric access",
  "High-speed Wi-Fi connectivity",
];

export default function WhyChooseUsSection({ data }: WhyChooseUsSectionProps) {
  const headingLine1 = data?.headingLine1 || "Why Women Choose";
  const headingLine2 = data?.headingLine2 || "Urban Living?";
  const description =
    data?.description ||
    "We provide more than just a room. We provide safety, comfort and a supportive community for women on their professional journey.";
  const featureList = data?.features || defaultFeatures;
  const bgImage = data?.backgroundImage || "/images/home/homewhy.png";

  return (
    <section id="why-choose-us" className="relative w-full bg-[#072B45] text-white overflow-hidden py-10 sm:py-14 lg:py-24 min-h-auto lg:min-h-[580px] flex items-center font-figtree">
      {/* 1. Desktop Background Image Asset (homewhy.png) */}
      <div className="hidden lg:block absolute inset-0 z-0 pointer-events-none">
        <Image
          src={bgImage}
          alt="Why Women Choose Urban Living Background"
          fill
          priority
          sizes="100vw"
          className="object-contain object-right opacity-100"
        />
      </div>

      {/* 2. Content Container */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 w-full">
        <div className="max-w-[560px] space-y-5 sm:space-y-8">
          {/* Main Title */}
          <h2 className="text-2xl sm:text-3xl lg:text-[38px] text-[#FFFFFF] tracking-tight font-figtree leading-tight">
            {headingLine1} <br />
            <span className="text-[#EFC53F] italic font-figtree">{headingLine2}</span>
          </h2>

          {/* Subtitle Paragraph */}
          <p className="text-xs sm:text-sm lg:text-base text-[#F5F6F7] font-Plus_Jakarta_Sans leading-relaxed max-w-[480px]">
            {description}
          </p>

          {/* Checklist Feature Points */}
          <div className="space-y-3 sm:space-y-3.5 pt-1 sm:pt-2">
            {featureList.map((feature, index) => (
              <div key={index} className="flex items-center gap-2.5 sm:gap-3">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#F2BE41] shrink-0" />
                <span className="text-xs sm:text-sm lg:text-base text-[#F5F6F7] font-figtree font-medium">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Mobile/Tablet Bottom Illustration Image matching Figma */}
        <div className="lg:hidden relative w-full h-[220px] sm:h-[300px] mt-8 overflow-hidden rounded-2xl">
          <Image
            src={bgImage}
            alt="Why Women Choose Urban Living Mobile Illustration"
            fill
            sizes="100vw"
            className="object-contain object-bottom opacity-90"
          />
        </div>
      </div>
    </section>
  );
}
