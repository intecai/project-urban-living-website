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
    <section className="w-full left-0 bottom-0 ">
      <div
        className="relative w-full h-auto min-h-[220px] md:h-[269px] bg-cover bg-center bg-no-repeat flex flex-col md:flex-row items-center justify-between px-6 sm:px-10 lg:px-16 py-8 md:py-0 gap-6 md:gap-8"
        style={{ backgroundImage: "url('/images/common/safe.png')" }}
      >
        {/* Left Side: Shield Icon positioned over the pre-rendered white circle */}
        <div className="flex items-center justify-center shrink-0 w-24 h-24 md:w-32 md:h-32">
          <Image
            src="/images/common/shield.png"
            alt="Safe Shield Icon"
            width={60}
            height={60}
            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain"
            priority
          />
        </div>

        {/* Center Content: Heading + Description */}
        <div className="flex-1 text-center md:text-left flex flex-col justify-center">
          <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-bold font-figtree text-[#011A2A] tracking-tight leading-relaxed md:whitespace-nowrap">
            {heading}
          </h2>
          <p className="mt-2 text-sm sm:text-base font-figtree text-[20px] text-[#011A2A] leading-relaxed">
            {description}
          </p>
        </div>

        {/* Right Side: Enquiry Now Button */}
        <div className="shrink-0 flex items-center md:pr-6">
          <a
            href="/contact"
            className="group inline-flex items-center justify-center bg-[#2571A5] text-[#FFFFFF] text-[19px] font-figtree font-medium text-sm sm:text-base px-8 py-3 rounded-full cursor-pointer"
          >
            <span>{buttonText}</span>
            <ArrowRight className="w-5 h-5 ml-2.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
