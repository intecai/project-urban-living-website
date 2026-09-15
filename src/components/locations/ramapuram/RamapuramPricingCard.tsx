"use client";

import React from "react";
import Image from "next/image";
import { PricingPlanItem } from "@/data/locations/ramapuram";

export interface RamapuramPricingCardProps {
  item: PricingPlanItem;
}

export default function RamapuramPricingCard({ item }: RamapuramPricingCardProps) {
  const prefix = item.pricePrefix || "Starting From";
  const suffix = item.priceSuffix || "* month";
  // Ensure no duplicate suffix if price string already contains "* month"
  const displayPrice = item.price.replace(/\s*\*?\s*month.*$/i, "").trim();

  return (
    <div className="bg-[#F8FAFC] rounded-[16px] p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between  gap-5 transition-all duration-200 w-full">
      {/* Left Room Thumbnail Image */}
      <div className="relative w-full sm:w-[190px] md:w-[210px] h-[130px] sm:h-[135px] rounded-[12px] overflow-hidden shrink-0 bg-slate-100">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 100vw, 210px"
          className="object-cover"
        />
      </div>

      {/* Middle: Room Title & Description */}
      <div className="flex-1 flex flex-col justify-center space-y-1.5 self-center">
        <h3 className="text-base sm:text-lg font-medium text-[#000000] font-figtree text-[24px]">
          {item.title}
        </h3>
        <p className="text-xs sm:text-sm text-[#272828] text-[21px] leading-relaxed font-figtree">
          {item.description}
        </p>
      </div>

      {/* Right: Price & Available Status Badge */}
      <div className="shrink-0 flex flex-col items-start sm:items-end justify-between w-full sm:w-auto h-auto sm:h-[135px] py-1 self-stretch sm:self-center gap-2 sm:gap-0 border-t sm:border-t-0 border-slate-200/60 pt-3 sm:pt-1">
        {/* Inline Price Line */}
        <div className="text-left sm:text-right text-xs sm:text-sm text-[#6C6F73] font-figtree text-[12px]">
          <span>{prefix} </span>
          <span className="font-semibold text-[#000000] text-[24px] text-sm sm:text-base md:text-lg">
            {displayPrice}{" "}
          </span>
          <span className="text-[#000000] text-[16px] font-figtree">{suffix}</span>
        </div>

        {/* Availability Badge at Bottom Right */}
        {item.available && (
          <div className="flex items-center gap-1.5 mt-auto">
            <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
            <span className="text-xs font-semibold text-[#22C55E] font-inter text-[14px]">
              Available Now
            </span>
          </div>
        )}
      </div>
    </div>
  );
}



