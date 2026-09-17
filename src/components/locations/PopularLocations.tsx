"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PopularLocationsData, LocationCardData } from "@/types/locations";

export interface PopularLocationsProps {
  data?: PopularLocationsData;
}

const defaultLocationCards: LocationCardData[] = [
  {
    id: "1",
    name: "Ramapuram",
    price: "₹10,500/mo",
    image: "/images/rooms/room_single.png",
    href: "/locations?slug=ramapuram",
    buttonText: "Explore Location",
  },
  {
    id: "2",
    name: "Madhanandapuram",
    price: "₹10,500/mo",
    image: "/images/rooms/room_deluxe.png",
    href: "/locations?slug=madanandapuram",
    buttonText: "Explore Location",
  },
  {
    id: "3",
    name: "Madhanandapuram",
    price: "₹9,000/mo",
    image: "/images/rooms/room_comfort.png",
    href: "/locations?slug=madanandapuram",
    buttonText: "Explore Location",
  },
];

export default function PopularLocations({ data }: PopularLocationsProps) {
  const eyebrow = data?.eyebrow || "NEIGHBORHOODS";
  const heading = data?.heading || "Popular Locations in Chennai";
  const viewAllText = data?.viewAllText || "View all areas";
  const viewAllHref = data?.viewAllHref || "/rooms";
  const locations = data?.locations || defaultLocationCards;

  return (
    <section className="w-full py-12 lg:py-16 bg-white font-Plus_Jakarta_Sans">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16 space-y-6">

        {/* Section Eyebrow & Header Row */}
        <div>
          <span className="block text-xs sm:text-sm tracking-wider text-[#0053B0] text-[12px] font-figtree uppercase mb-1">
            {eyebrow}
          </span>

          <div className="flex flex-row items-center justify-between gap-4">
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#0B1C30] text-[26px] tracking-tight font-figtree">
              {heading}
            </h2>

            <a
              href={viewAllHref}
              className="text-xs sm:text-sm font-semibold text-[#0053B0] hover:underline inline-flex items-center gap-1 sm:gap-1.5 font-Plus_Jakarta_Sans transition-colors shrink-0"
            >
              <span>{viewAllText}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* 3 Location Cards Grid - Exact Figma 16px Padding & Inner Image Frame */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 pt-2">
          {locations.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-[20px] sm:rounded-[24px] border border-[#E2E8F0] p-4 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all duration-300 group"
            >
              {/* Inner Image Frame with Rounded Corners */}
              <div className="relative w-full h-[200px] sm:h-[215px] overflow-hidden rounded-[14px] sm:rounded-[16px] bg-slate-100 mb-4">
                <Image
                  src={card.image}
                  alt={card.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>

              {/* Card Title & Price Area */}
              <div className="flex items-start sm:items-center justify-between gap-2 mb-4 px-0.5">
                {/* Location Name */}
                <h3 className="text-base sm:text-lg font-bold text-[#0B1C30] text-[16px] font-figtree tracking-tight leading-snug">
                  {card.name}
                </h3>

                {/* Price Block */}
                <div className="text-right shrink-0">
                  <span className="block text-[10px] sm:text-[11px] font-semibold text-[#424753] text-[12px] tracking-wider uppercase font-figtree whitespace-nowrap">
                    STARTS FROM
                  </span>
                  <span className="block text-base sm:text-lg font-bold text-[#0053B0] text-[16px] font-figtree tracking-tight whitespace-nowrap">
                    {card.price}
                  </span>
                </div>
              </div>

              {/* Explore Location Button */}
              <a
                href={card.href}
                className="w-full h-10 sm:h-[42px] bg-white hover:bg-[#0053B0] hover:text-white border border-[#0053B0] text-[#0053B0] text-xs sm:text-sm font-semibold font-figtree rounded-full flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
              >
                {card.buttonText || "Explore Location"}
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

