"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import PrivateImage from "@/components/PrivateImage";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { PopularLocationsData, LocationCardData } from "@/types/locations";
import { fetchLocationsFromApi } from "@/services/locationsService";

export interface PopularLocationsProps {
  data?: PopularLocationsData;
}

function LocationCardSkeleton() {
  return (
    <div className="bg-white rounded-[20px] sm:rounded-[24px] border border-[#E2E8F0] p-4 flex flex-col justify-between shadow-2xs animate-pulse">
      <div className="w-full h-[200px] sm:h-[215px] rounded-[14px] sm:rounded-[16px] bg-slate-200 mb-4" />
      <div className="flex items-center justify-between gap-2 mb-4 px-0.5">
        <div className="h-5 w-32 bg-slate-200 rounded" />
        <div className="h-5 w-20 bg-slate-200 rounded" />
      </div>
      <div className="w-full h-10 sm:h-[42px] bg-slate-200 rounded-full" />
    </div>
  );
}

export default function PopularLocations({ data }: PopularLocationsProps) {
  const eyebrow = data?.eyebrow || "NEIGHBORHOODS";
  const heading = data?.heading || "Popular Locations in Chennai";
  const viewAllText = data?.viewAllText || "View all areas";
  const viewAllHref = data?.viewAllHref || "/rooms/";

  const [locations, setLocations] = useState<LocationCardData[]>(data?.locations || []);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // In-memory cache for page transitions (SWR style)
  const pageCacheRef = useRef<Map<number, { locations: LocationCardData[]; totalPages: number }>>(new Map());
  const isFirstMountRef = useRef<boolean>(true);
  const sectionTopRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const isInitialMount = isFirstMountRef.current;

    // Cache-first for subsequent page transitions
    if (!isInitialMount && pageCacheRef.current.has(currentPage)) {
      const cached = pageCacheRef.current.get(currentPage)!;
      setLocations(cached.locations);
      setTotalPages(cached.totalPages);
      setIsLoading(false);
      return;
    }

    if (isFirstMountRef.current) {
      isFirstMountRef.current = false;
    }

    if (!isInitialMount && (!locations || locations.length === 0)) {
      setIsLoading(true);
    }

    async function loadLocations() {
      try {
        // Query GET /locations?page=:page&limit=10
        const result = await fetchLocationsFromApi(currentPage, 10, isInitialMount);
        if (result && result.locations) {
          pageCacheRef.current.set(currentPage, {
            locations: result.locations,
            totalPages: result.totalPages,
          });
          setLocations(result.locations);
          setTotalPages(result.totalPages);
        }
      } catch (err) {
        console.error("[POPULAR LOCATIONS] Failed to load locations:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadLocations();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    sectionTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const getPaginationItems = (current: number, total: number) => {
    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    if (current <= 3) {
      return [1, 2, 3, 4, 5, "...", total];
    }
    if (current >= total - 2) {
      return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
    }
    return [1, "...", current - 1, current, current + 1, "...", total];
  };

  if (!isLoading && locations.length === 0) {
    return null;
  }

  return (
    <section ref={sectionTopRef} className="w-full py-12 lg:py-16 bg-white font-Plus_Jakarta_Sans">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16 space-y-6">

        {/* Section Eyebrow & Header Row */}
        <div>
          <span className="block text-xs sm:text-sm tracking-wider text-[#0053B0] font-figtree uppercase mb-1">
            {eyebrow}
          </span>

          <div className="flex flex-row items-center justify-between gap-4">
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#0B1C30] text-[26px] tracking-tight font-figtree">
              {heading}
            </h2>

            <Link
              href={viewAllHref}
              className="text-xs sm:text-sm font-semibold text-[#0053B0] hover:underline inline-flex items-center gap-1 sm:gap-1.5 font-Plus_Jakarta_Sans transition-colors shrink-0"
            >
              <span>{viewAllText}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Location Cards Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 pt-2">
            {Array.from({ length: 3 }).map((_, idx) => (
              <LocationCardSkeleton key={idx} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 pt-2">
            {locations.map((card) => (
              <div
                key={card.id}
                className="bg-white rounded-[20px] sm:rounded-[24px] border border-[#E2E8F0] p-4 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all duration-300 group"
              >
                {/* Inner Image Frame with Rounded Corners */}
                <div className="relative w-full h-[200px] sm:h-[215px] overflow-hidden rounded-[14px] sm:rounded-[16px] bg-slate-100 mb-4">
                  <PrivateImage
                    fileId={card.image}
                    alt={card.name}
                    fill
                    loading="lazy"
                    quality={80}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>

                {/* Card Title & Price Area */}
                <div className="flex items-start sm:items-center justify-between gap-2 mb-4 px-0.5">
                  <h3 className="text-base sm:text-lg font-bold text-[#0B1C30] font-figtree tracking-tight leading-snug">
                    {card.name}
                  </h3>

                  <div className="text-right shrink-0">
                    <span className="block text-[10px] sm:text-[11px] font-semibold text-[#424753] tracking-wider uppercase font-figtree whitespace-nowrap">
                      STARTS FROM
                    </span>
                    <span className="block text-base sm:text-lg font-bold text-[#0053B0] font-figtree tracking-tight whitespace-nowrap">
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
        )}

        {/* Pagination Bar (when totalPages > 1) */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 sm:gap-8 pt-8 sm:pt-10 pb-6 font-jakarta select-none">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
              className="flex items-center gap-1 sm:gap-2 text-xs sm:text-base font-semibold text-[#4B5563] hover:text-black disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5.5 sm:h-5.5 stroke-[2.2]" />
              <span>Previous</span>
            </button>

            <div className="flex items-center gap-2 sm:gap-6">
              {getPaginationItems(currentPage, totalPages).map((item, index) => {
                if (item === "...") {
                  return (
                    <span key={`ellipsis-${index}`} className="text-sm sm:text-xl font-normal text-[#9CA3AF] px-0.5 sm:px-1">
                      ...
                    </span>
                  );
                }

                const page = item as number;
                const isActive = currentPage === page;

                return (
                  <button
                    key={page}
                    type="button"
                    onClick={() => handlePageChange(page)}
                    className={`transition-all cursor-pointer flex items-center justify-center shrink-0 w-8 h-8 sm:w-11 sm:h-11 rounded-full text-xs sm:text-xl ${
                      isActive
                        ? "bg-[#2571A5] text-white font-bold shadow-xs"
                        : "font-medium text-[#4B5563] hover:bg-slate-100 hover:text-[#1F2937]"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
              className="flex items-center gap-1 sm:gap-2 text-xs sm:text-base font-semibold text-[#4B5563] hover:text-black disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4 sm:w-5.5 sm:h-5.5 stroke-[2.5]" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
