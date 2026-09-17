import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { EnquiryBannerData } from "@/types/common";

export interface EnquiryBannerProps {
  data?: EnquiryBannerData;
}

export default function EnquiryBanner({ data }: EnquiryBannerProps) {
  const heading = data?.heading || "Safe. Comfortable. Yours.";
  const description = data?.description || "Enquire now and our team will help you find this perfect room.";
  const buttonText = data?.formLabels?.submitButton || "Enquiry Now";

  return (
    <>
      {/* 1. MOBILE ENQUIRY BANNER (Exact Figma Recreation for < 768px: Vertically Stacked & Centered) */}
      <section className="block md:hidden w-full px-4 sm:px-6 py-4 font-figtree">
        <div className="relative w-full rounded-[20px] bg-[#F4F8FC] border border-[#E0EDF8] shadow-xs p-6 sm:p-8 flex flex-col items-center text-center space-y-3.5 sm:space-y-4 overflow-hidden">
          {/* Subtle Background Shield Watermark */}
          <svg
            className="absolute right-2 bottom-2 w-36 h-36 text-[#0053B0] opacity-[0.05] pointer-events-none"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="m9 12 2 2 4-4" />
          </svg>

          {/* Shield Icon in White Circular Container */}
          <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white shadow-[0_4px_16px_rgba(0,83,176,0.1)] border border-[#E0EDF8] flex items-center justify-center shrink-0 mb-0.5">
            <Image
              src="/images/common/shield.png"
              alt="Safe Shield Icon"
              width={60}
              height={60}
              className="w-9 h-9 sm:w-11 sm:h-11 object-contain"
              priority
            />
          </div>

          {/* Heading */}
          <h2 className="relative z-10 text-xl sm:text-2xl font-semibold font-figtree text-[#0B1C30] tracking-tight">
            {heading}
          </h2>

          {/* Description */}
          <p className="relative z-10 text-xs sm:text-sm font-figtree text-[#475569] leading-relaxed max-w-[260px] sm:max-w-xs mx-auto">
            {description}
          </p>

          {/* Compact Pill Button */}
          <div className="relative z-10 pt-1">
            <a
              href="/contact"
              className="inline-flex items-center justify-center bg-[#0053B0] hover:bg-[#02569B] text-white font-figtree font-medium text-xs sm:text-sm px-6 py-2.5 sm:py-3 rounded-full transition-colors shadow-xs w-auto cursor-pointer"
            >
              <span>{buttonText}</span>
              <ArrowRight className="w-4 h-4 ml-2 shrink-0" />
            </a>
          </div>
        </div>
      </section>

      {/* 2. TABLET ENQUIRY BANNER (Figma Responsive Layout for 768px - 1023px: Horizontal Flow) */}
      <section className="hidden md:block xl:hidden w-full max-w-[1440px] mx-auto px-6 md:px-10 py-6 font-figtree">
        <div className="relative w-full rounded-[24px] bg-[#F4F8FC] border border-[#E0EDF8] shadow-xs px-8 py-6 md:px-10 md:py-8 flex flex-row items-center justify-between gap-6 overflow-hidden">
          {/* Subtle Background Shield Watermark */}
          <svg
            className="absolute right-6 top-1/2 -translate-y-1/2 w-48 h-48 text-[#0053B0] opacity-[0.06] pointer-events-none"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="m9 12 2 2 4-4" />
          </svg>

          {/* Left: Shield Icon in White Circular Container */}
          <div className="relative z-10 w-16 h-16 md:w-20 md:h-20 rounded-full bg-white shadow-[0_4px_16px_rgba(0,83,176,0.1)] border border-[#E0EDF8] flex items-center justify-center shrink-0">
            <Image
              src="/images/common/shield.png"
              alt="Safe Shield Icon"
              width={60}
              height={60}
              className="w-9 h-9 md:w-11 md:h-11 object-contain"
              priority
            />
          </div>

          {/* Center/Left Content */}
          <div className="relative z-10 flex-1 text-left space-y-1">
            <h2 className="text-xl md:text-2xl lg:text-[28px] font-semibold font-figtree text-[#0B1C30] tracking-tight">
              {heading}
            </h2>
            <p className="text-xs md:text-sm lg:text-base font-figtree text-[#475569] leading-relaxed">
              {description}
            </p>
          </div>

          {/* Right: Enquiry Now Pill Button */}
          <div className="relative z-10 shrink-0">
            <a
              href="/contact"
              className="inline-flex items-center justify-center bg-[#0053B0] hover:bg-[#02569B] text-white font-figtree font-medium text-xs md:text-sm px-6 py-3 rounded-full transition-colors shadow-xs shrink-0 cursor-pointer"
            >
              <span>{buttonText}</span>
              <ArrowRight className="w-4 h-4 ml-2 shrink-0" />
            </a>
          </div>
        </div>
      </section>

      {/* 3. DESKTOP ENQUIRY BANNER (LOCKED - 100% UNTOUCHED FOR >= 1280px) */}
      <section className="hidden xl:block w-full">
        <div
          className="relative w-full h-[269px] bg-cover bg-center bg-no-repeat flex flex-row items-center justify-between px-10 lg:px-16 py-0 gap-8"
          style={{ backgroundImage: "url('/images/common/safe.png')" }}
        >
          {/* Shield Icon Badge */}
          <div className="relative z-10 flex items-center justify-center shrink-0 w-32 h-32">
            <Image
              src="/images/common/shield.png"
              alt="Safe Shield Icon"
              width={60}
              height={60}
              className="w-16 h-16 object-contain"
              priority
            />
          </div>

          {/* Center Content: Heading + Description */}
          <div className="relative z-10 flex-1 text-left flex flex-col justify-center">
            <h2 className="text-3xl lg:text-[38px] font-bold font-figtree text-[#011A2A] tracking-tight leading-relaxed whitespace-nowrap">
              {heading}
            </h2>
            <p className="mt-2 text-base font-figtree lg:text-[20px] text-[#011A2A] leading-relaxed">
              {description}
            </p>
          </div>

          {/* Right Side: Enquiry Now Button */}
          <div className="relative z-10 shrink-0 flex items-center justify-center pr-6 w-auto">
            <a
              href="/contact"
              className="group inline-flex items-center justify-center bg-[#2571A5] hover:bg-[#02569B] text-[#FFFFFF] font-figtree font-medium text-[19px] px-8 py-3 rounded-full cursor-pointer transition-colors shadow-xs w-auto"
            >
              <span>{buttonText}</span>
              <ArrowRight className="w-5 h-5 ml-2.5" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
