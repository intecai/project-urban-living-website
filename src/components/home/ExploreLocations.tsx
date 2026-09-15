"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ExploreLocationsData } from "@/types/home";

export interface ExploreLocationsProps {
  data?: ExploreLocationsData;
}

const defaultLocations = [
  {
    id: "1",
    name: "Ramapuram",
    price: "₹8,500/mo",
    image: "/images/rooms/room_single.png",
    href: "/locations?slug=ramapuram",
  },
  {
    id: "2",
    name: "Madanandapuram",
    price: "₹7,200/mo",
    image: "/images/rooms/room_deluxe.png",
    href: "/locations?slug=madanandapuram",
  },
  {
    id: "3",
    name: "Madanandapuram",
    price: "₹9,000/mo",
    image: "/images/rooms/room_sharing.png",
    href: "/locations?slug=madanandapuram",
  },
];

export default function ExploreLocations({ data }: ExploreLocationsProps) {
  const title = data?.title || "Explore Our PG Locations";
  const locationList = data?.locations || defaultLocations;

  return (
    <section className="w-full py-12 sm:py-16 bg-white font-figtree">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 space-y-8">
        {/* Section Heading */}
        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-[28px] text-[#0E1C36] text-left tracking-tight font-figtree">
            {title}
          </h2>
        </div>

        {/* 3 Location Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {locationList.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-[24px] shadow-2xs shadow-md p-4 pt-4 pb-[18px] flex flex-col justify-between group"
            >
              {/* Image inside card padding with rounded corners */}
              <div className="relative w-full aspect-[4/3] sm:h-[220px] overflow-hidden rounded-[16px] bg-slate-100">
                <Image
                  src={card.image}
                  alt={card.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>

              {/* Card Body */}
              <div className="pt-4 flex flex-col justify-between flex-1 space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base sm:text-[18px] text-[16px] font-semibold text-[#051125] font-Plus_Jakarta_Sans tracking-tight">
                    {card.name}
                  </h3>

                  <div className="text-right shrink-0">
                    <span className="block text-[12px] font-medium text-[#424753] tracking-wider uppercase font-figtree mb-0.5">
                      STARTS FROM
                    </span>
                    <span className="block text-base sm:text-lg font-bold text-[#0053B0] text-[16px] font-figtree tracking-tight">
                      {card.price}
                    </span>
                  </div>
                </div>

                {/* Explore Rooms Button */}
                <Link
                  href={card.href}
                  className="w-full py-2.5 sm:py-3 rounded-full border border-[#0053B0] text-[#0053B0] text-[16px] bg-white hover:bg-[#02569B] hover:text-white text-xs sm:text-sm font-semibold text-center transition-colors duration-200 shadow-2xs font-figtree flex items-center justify-center cursor-pointer mt-3"
                >
                  Explore Rooms
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
