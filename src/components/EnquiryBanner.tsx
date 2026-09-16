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
    <section className="w-full left-0 bottom-0 py-6 md:py-0 px-4 sm:px-6 md:px-0">
      <div
        className="relative w-full h-auto min-h-[220px] md:h-[269px] bg-white md:bg-cover md:bg-center md:bg-no-repeat flex flex-col md:flex-row items-center justify-between p-6 sm:p-8 md:px-10 lg:px-16 md:py-0 gap-4 md:gap-8 rounded-3xl md:rounded-none border border-slate-100 md:border-none shadow-md md:shadow-none"
        style={{ backgroundImage: "undefined" }}
      >
        {/* Mobile-only background helper or Desktop background image */}
        <div
          className="hidden md:block absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none z-0"
          style={{ backgroundImage: "url('/images/common/safe.png')" }}
        />

        {/* Shield Icon Badge */}
        <div className="relative z-10 flex items-center justify-center shrink-0 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full bg-white md:bg-transparent shadow-xs md:shadow-none border border-slate-100 md:border-none mx-auto md:mx-0">
          <Image
            src="/images/common/shield.png"
            alt="Safe Shield Icon"
            width={60}
            height={60}
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 object-contain"
            priority
          />
        </div>

        {/* Center Content: Heading + Description */}
        <div className="relative z-10 flex-1 text-center md:text-left flex flex-col justify-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[38px] font-bold font-figtree text-[#011A2A] tracking-tight leading-snug md:leading-relaxed md:whitespace-nowrap">
            {heading}
          </h2>
          <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm md:text-base font-figtree md:text-[20px] text-[#6B7280] md:text-[#011A2A] leading-relaxed max-w-sm md:max-w-none mx-auto md:mx-0">
            {description}
          </p>
        </div>

        {/* Right Side: Enquiry Now Button */}
        <div className="relative z-10 shrink-0 flex items-center justify-center md:pr-6 mt-2 md:mt-0 w-full md:w-auto">
          <a
            href="/contact"
            className="group inline-flex items-center justify-center bg-[#2571A5] hover:bg-[#02569B] text-[#FFFFFF] font-figtree font-medium text-xs sm:text-sm md:text-[19px] px-7 sm:px-8 py-3 rounded-full cursor-pointer transition-colors shadow-xs w-auto"
          >
            <span>{buttonText}</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 md:ml-2.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
