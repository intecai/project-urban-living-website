"use client";

import React from "react";
import Image from "next/image";
import { EverythingYouNeedData } from "@/types/locations";

export interface EverythingYouNeedProps {
  data?: EverythingYouNeedData;
}

const defaultNearbyItems = [
  {
    id: "1",
    title: "Metro Stations",
    description: "easy access to major metro lines",
    icon: "/images/locations/metrostation.png",
  },
  {
    id: "2",
    title: "IT parks",
    description: "easy access to major metro lines",
    icon: "/images/locations/ITparks.png",
  },
  {
    id: "3",
    title: "Colleges",
    description: "easy access to major metro lines",
    icon: "/images/locations/colleges.png",
  },
  {
    id: "4",
    title: "Healthcare",
    description: "easy access to major metro lines",
    icon: "/images/locations/healthcare.png",
  },
  {
    id: "5",
    title: "Supermarket",
    description: "easy access to major metro lines",
    icon: "/images/locations/shoppingcart.png",
  },
  {
    id: "6",
    title: "Food and Dining",
    description: "easy access to major metro lines",
    icon: "/images/locations/foodAndDinning.png",
  },
];

export default function EverythingYouNeed({ data }: EverythingYouNeedProps) {
  const heading = data?.heading || "Everything you Need, Close By";
  const features = data?.features || defaultNearbyItems;

  return (
    <section className="w-full py-12 lg:py-16 bg-white font-montserrat">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 space-y-8 sm:space-y-10">
        
        {/* Left-Aligned Heading */}
        <h2 className="text-2xl sm:text-3xl font-semibold text-[#0B1C30] text-[26px] tracking-tight mt-8 font-figtree text-left">
          {heading}
        </h2>

        {/* 6 Nearby Items Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 justify-items-center">
          {features.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center text-center space-y-2.5 max-w-[160px]"
            >
              {/* Circular Background with PNG Image */}
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#EFF6FF] flex items-center justify-center shadow-2xs mb-4 transition-transform hover:scale-105 duration-300">
                <Image
                  src={item.icon || (item as any).image}
                  alt={item.title}
                  width={18}
                  height={18}
                  className="w-5 h-5 sm:w-8 sm:h-8 object-contain"
                />
              </div>

              {/* Item Title */}
              <h3 className="text-sm sm:text-base text-[#0B1C30] text-[26px] font-Plus_Jakarta_Sans mb-1 leading-snug">
                {item.title}
              </h3>

              {/* 2-line Description */}
              <p className="text-xs text-[#000000] text-[14px] font-Plus_Jakarta_Sans leading-tight max-w-[140px]">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
