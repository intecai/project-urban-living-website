"use client";

import React from "react";
import Image from "next/image";
import { PricingPlanItem } from "@/data/locations/ramapuram";

export interface RamapuramPricingCardProps {
  item: PricingPlanItem;
}

export default function RamapuramPricingCard({ item }: RamapuramPricingCardProps) {
  return (
    <div className="bg-[#FDFDFD] sm:bg-white rounded-[16px] border border-[#E2E8F0] p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-2xs hover:border-[#0053B0]/40 transition-all duration-200 group">
      {/* Left Room Thumbnail Image */}
      <div className="relative w-full sm:w-[180px] md:w-[210px] h-[130px] sm:h-[135px] rounded-[12px] overflow-hidden shrink-0 bg-slate-100">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 100vw, 210px"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Room Title & Description */}
      <div className="flex-1 flex flex-col justify-between h-full space-y-2">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-[#011A2A] font-Plus_Jakarta_Sans">
            {item.title}
          </h3>
          <p className="text-xs sm:text-sm text-[#64748B] font-normal mt-1 leading-relaxed font-Plus_Jakarta_Sans">
            {item.description}
          </p>
        </div>

        {/* Availability Badge (Visible on mobile here) */}
        {item.available && (
          <div className="hidden sm:flex items-center gap-1.5 pt-2">
            <span className="w-2 h-2 rounded-full bg-[#10B981]" />
            <span className="text-xs font-semibold text-[#10B981] font-Plus_Jakarta_Sans">
              Available Now
            </span>
          </div>
        )}
      </div>

      {/* Right Price & Status Block */}
      <div className="sm:text-right shrink-0 self-end sm:self-center pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 w-full sm:w-auto flex sm:flex-col justify-between items-center sm:items-end">
        <div>
          <span className="block text-[10px] sm:text-[11px] font-semibold text-[#9CA3AF] tracking-wider uppercase font-Plus_Jakarta_Sans">
            Starting From
          </span>
          <span className="block text-base sm:text-lg font-bold text-[#011A2A] sm:text-[#0053B0] font-Plus_Jakarta_Sans tracking-tight mt-0.5">
            {item.price}
          </span>
        </div>

        {/* Availability Badge (Visible on mobile bottom right) */}
        {item.available && (
          <div className="flex sm:hidden items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#10B981]" />
            <span className="text-xs font-semibold text-[#10B981] font-Plus_Jakarta_Sans">
              Available Now
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
