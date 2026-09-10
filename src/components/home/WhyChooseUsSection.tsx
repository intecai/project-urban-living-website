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
    <section id="why-choose-us" className="relative w-full bg-[#072B45] text-white overflow-hidden py-16 sm:py-20 lg:py-24 min-h-[500px] sm:min-h-[540px] lg:min-h-[580px] flex items-center font-figtree">
      {/* 1. Background Image Asset (homewhy.png) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src={bgImage}
          alt="Why Women Choose Urban Living Background"
          fill
          priority
          sizes="100vw"
          className="object-contain object-right opacity-90 lg:opacity-100"
        />
      </div>

      {/* 2. Overlay Left Content */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 w-full">
        <div className="max-w-[560px] space-y-6 sm:space-y-8">
          {/* Main Title */}
          <h2 className="text-3xl sm:text-4xl lg:text-[38px] text-[#FFFFFF] tracking-tight font-figtree leading-tight">
            {headingLine1} <br />
            <span className="text-[#EFC53F] italic font-figtree">{headingLine2}</span>
          </h2>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base text-[#F5F6F7] text-[20px] font-Plus_Jakarta_Sans leading-relaxed max-w-[480px]">
            {description}
          </p>

          {/* Checklist Feature Points */}
          <div className="space-y-3.5 pt-2">
            {featureList.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#F2BE41] shrink-0" />
                <span className="text-sm sm:text-base text-[18px] text-[#F5F6F7] font-figtree">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
