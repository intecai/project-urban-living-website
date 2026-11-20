import React from "react";
import PrivateImage from "@/components/PrivateImage";
import Link from "next/link";
import { LocationCardData } from "@/types/locations";
import { LocationCardItem } from "@/types/home";

export interface ExploreLocationsProps {
  data?: any;
}

export default function ExploreLocations({ data }: ExploreLocationsProps) {
  const locationList: (LocationCardData | LocationCardItem)[] = data?.locations || [];

  if (locationList.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-12 sm:py-16 bg-white font-figtree">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16 space-y-8">
        {/* Section Heading matching Figma */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-[28px] font-bold text-[#0E1C36] text-center sm:text-left tracking-tight font-lato">
              Explore Our PG Locations
            </h2>
          </div>
          <Link
            href="/locations/"
            prefetch={false}
            className="text-xs sm:text-sm font-semibold text-[#2571A5] hover:text-[#00428C] transition-colors flex items-center gap-1 shrink-0 font-figtree cursor-pointer"
          >
            View all areas &rarr;
          </Link>
        </div>

        {/* 3 Location Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {locationList.map((card: LocationCardData | LocationCardItem) => (
            <div
              key={card.id}
              className="bg-white rounded-[24px] shadow-2xs shadow-md p-4 pt-4 pb-[18px] flex flex-col justify-between group"
            >
              {/* Image inside card padding with rounded corners */}
              <div className="relative w-full aspect-[4/3] sm:h-[220px] overflow-hidden rounded-[16px] bg-slate-100">
                <PrivateImage
                  fileId={card.image}
                  alt={card.name}
                  fill
                  loading="lazy"
                  quality={80}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>

              {/* Card Body */}
              <div className="pt-4 flex flex-col justify-between flex-1 space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base sm:text-[18px] font-semibold text-[#051125] font-Plus_Jakarta_Sans tracking-tight">
                    {card.name}
                  </h3>

                  <div className="text-right shrink-0">
                    <span className="block text-xs font-medium text-[#424753] tracking-wider uppercase font-figtree mb-0.5">
                      STARTS FROM
                    </span>
                    <span className="block text-base sm:text-lg font-bold text-[#0053B0] font-figtree tracking-tight">
                      {card.price}
                    </span>
                  </div>
                </div>

                {/* Explore Location Button */}
                <Link
                  href={card.href}
                  prefetch={false}
                  className="w-full py-2.5 sm:py-3 rounded-full border border-[#0053B0] text-[#0053B0] bg-white hover:bg-[#02569B] hover:text-white text-xs sm:text-sm font-semibold text-center transition-colors duration-200 shadow-2xs font-figtree flex items-center justify-center cursor-pointer mt-3"
                >
                  {card.buttonText || "Explore Location"}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
