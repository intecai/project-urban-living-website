"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Filter, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { RoomCategory, FilterState, SortOption, RoomItem } from "./types";
import { RoomsPageData } from "@/types/rooms";
import { roomsData as fallbackRoomsData } from "./roomsData";
import RoomCard from "./RoomCard";
import FilterModal from "./FilterModal";

export interface RoomsSectionProps {
  data?: RoomsPageData;
}

const categoryTabs: { label: string; value: RoomCategory; icon: string }[] = [
  { label: "All Rooms", value: "all", icon: "/images/rooms/AllRooms.png" },
  { label: "Single Rooms", value: "single", icon: "/images/rooms/SingRooms.png" },
  { label: "Double Sharing", value: "double", icon: "/images/rooms/twoSharingroom.png" },
  { label: "Triple Sharing", value: "triple", icon: "/images/rooms/threeSharingroom.png" },
  { label: "Four Sharing", value: "four", icon: "/images/rooms/fourSharingRoom.png" },
  { label: "Five Sharing", value: "five", icon: "/images/rooms/fiveSharingRoom.png" },
];

const initialFilters: FilterState = {
  category: "all",
  locations: [],
  minPrice: 5000,
  maxPrice: 20000,
  amenities: {
    wifi: false,
    ac: false,
    food: false,
    laundry: false,
    housekeeping: false,
    parking: false,
    powerBackup: false,
  },
  availableOnly: false,
};

export default function RoomsSection({ data }: RoomsSectionProps) {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const roomList: RoomItem[] = data?.rooms || fallbackRoomsData;

  const ITEMS_PER_PAGE = 5;

  // Filter logic
  const filteredRooms = useMemo(() => {
    return roomList.filter((room) => {
      // Category filter
      if (filters.category !== "all") {
        if (filters.category === "four") {
          if (room.category !== "four" && !room.name.toLowerCase().includes("four") && !room.slug?.includes("four")) {
            return false;
          }
        } else if (filters.category === "five") {
          if (room.category !== "five" && !room.name.toLowerCase().includes("five") && !room.slug?.includes("five")) {
            return false;
          }
        } else if (filters.category === "double") {
          if ((room.category !== "double" && !room.name.toLowerCase().includes("double") && !room.name.toLowerCase().includes("two")) || room.name.toLowerCase().includes("four")) {
            return false;
          }
        } else if (room.category !== filters.category) {
          return false;
        }
      }
      // Location filter
      if (
        filters.locations.length > 0 &&
        !filters.locations.some((loc) => room.location.includes(loc))
      ) {
        return false;
      }
      // Price range filter
      if (room.price < filters.minPrice || room.price > filters.maxPrice) {
        return false;
      }
      // Amenities filter
      if (filters.amenities.wifi && !room.amenities.wifi) return false;
      if (filters.amenities.ac && !room.amenities.ac) return false;
      if (filters.amenities.food && !room.amenities.food) return false;
      if (filters.amenities.laundry && !room.amenities.laundry) return false;
      if (filters.amenities.housekeeping && !room.amenities.housekeeping) return false;

      return true;
    });
  }, [filters]);

  // Sort logic
  const sortedRooms = useMemo(() => {
    const list = [...filteredRooms];
    if (sortBy === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    }
    return list;
  }, [filteredRooms, sortBy]);

  // Pagination logic
  const totalPages = Math.ceil(sortedRooms.length / ITEMS_PER_PAGE) || 1;
  const paginatedRooms = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedRooms.slice(start, start + ITEMS_PER_PAGE);
  }, [sortedRooms, currentPage]);

  const handleCategorySelect = (cat: RoomCategory) => {
    setFilters((prev) => ({ ...prev, category: cat }));
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilters(initialFilters);
    setCurrentPage(1);
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

  return (
    <section className="w-full py-10 lg:py-14 font-figtree min-h-[600px]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 space-y-8">

        {/* 1. Category Filter Tabs - 2-column grid on mobile/tablet, centered flex row on desktop */}
        <div className="grid grid-cols-2 max-w-md mx-auto sm:max-w-lg lg:max-w-none gap-2.5 sm:gap-3 lg:flex lg:flex-row lg:items-center lg:justify-center lg:gap-4 w-full px-1">
          {categoryTabs.map((tab, index) => {
            const isSelected = filters.category === tab.value;
            const isLastItem = index === categoryTabs.length - 1;

            return (
              <div
                key={tab.value}
                className={`${isLastItem ? "col-span-2 flex justify-center lg:col-span-1 lg:block" : ""
                  }`}
              >
                <button
                  type="button"
                  onClick={() => handleCategorySelect(tab.value)}
                  className={`flex items-center justify-center gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer w-full lg:w-auto ${isLastItem ? "max-w-[200px] sm:max-w-[220px] lg:max-w-none" : ""
                    } ${isSelected
                      ? "bg-[#0053B0] text-white shadow-xs"
                      : "bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                >
                  <Image
                    src={tab.icon}
                    alt={tab.label}
                    width={18}
                    height={18}
                    className={`w-4 h-4 object-contain ${isSelected ? "brightness-0 invert" : ""}`}
                  />
                  <span>{tab.label}</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* 2. Header & Controls Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          {/* Left: Page Title Info */}
          <div>
            <h1 className="text-xl sm:text-2xl md:text-[28px] font-bold text-[#1F2937] font-jakarta tracking-tight">
              {sortedRooms.length} Rooms Available
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-[#9CA3AF] font-jakarta font-normal mt-0.5 sm:mt-1">
              Across 6 Locations in Chennai
            </p>
          </div>

          {/* Right: Filter & Sort Controls */}
          <div className="flex items-center justify-between sm:justify-start gap-3 sm:gap-5 w-full sm:w-auto font-jakarta">
            {/* Filter Button */}
            <button
              type="button"
              onClick={() => setIsFilterModalOpen(true)}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 sm:px-5 py-2 h-[38px] bg-white border border-[#E2E8F0] rounded-[16px] text-xs sm:text-sm font-medium text-[#1F2937] hover:bg-slate-50 hover:border-slate-300 transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4 text-[#374151]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.5 3.5H13.5M4.5 8H11.5M6.5 12.5H9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Filter</span>
              {filters.locations.length > 0 && (
                <span className="w-2 h-2 rounded-full bg-[#0053B0]" />
              )}
            </button>

            {/* Sort Dropdown */}
            <div className="flex-1 sm:flex-initial flex items-center justify-end gap-2">
              <span className="hidden sm:inline text-xs sm:text-sm text-[#6B7280] font-normal whitespace-nowrap">
                Sort by
              </span>
              <div className="relative w-full sm:w-auto">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="w-full sm:w-auto appearance-none bg-white border border-[#E2E8F0] rounded-[16px] pl-3 sm:pl-4 pr-8 sm:pr-9 py-2 h-[38px] text-xs sm:text-sm font-medium text-[#1F2937] hover:bg-slate-50 hover:border-slate-300 transition-colors cursor-pointer focus:outline-hidden"
                >
                  <option value="popular">Popular</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
                <ChevronDown className="w-4 h-4 text-[#4B5563] absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* 3. Rooms Cards List */}
        {paginatedRooms.length > 0 ? (
          <div className="space-y-4 sm:space-y-6">
            {paginatedRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-[#011A2A]">No rooms match your filter criteria</h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              Try adjusting your max budget or selecting a different room type to see available accommodations.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="mt-2 inline-flex items-center px-4 py-2 bg-[#2563EB] text-white text-xs font-semibold rounded-full shadow-xs hover:bg-[#1D4ED8] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* 4. Pagination (Figma Matched) */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 sm:gap-8 pt-8 sm:pt-10 pb-6 font-jakarta select-none">
            {/* Previous Link */}
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="flex items-center gap-1 sm:gap-2 text-xs sm:text-base font-semibold text-[#4B5563] hover:text-black disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5.5 sm:h-5.5 stroke-[2.2]" />
              <span>Previous</span>
            </button>

            {/* Page Numbers Row */}
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
                    onClick={() => setCurrentPage(page)}
                    className={`transition-all cursor-pointer ${isActive
                        ? "w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-[#FAC024] text-white font-bold text-xs sm:text-xl flex items-center justify-center shadow-xs"
                        : "text-xs sm:text-xl font-medium text-[#4B5563] hover:text-[#1F2937] px-1.5 sm:px-2 py-1"
                      }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>

            {/* Next Link */}
            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              className="flex items-center gap-1 sm:gap-2 text-xs sm:text-base font-semibold text-[#4B5563] hover:text-black disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4 sm:w-5.5 sm:h-5.5 stroke-[2.5]" />
            </button>
          </div>
        )}

        {/* 5. Filter Modal */}
        <FilterModal
          isOpen={isFilterModalOpen}
          onClose={() => setIsFilterModalOpen(false)}
          filters={filters}
          onApply={(newFilters) => {
            setFilters(newFilters);
            setCurrentPage(1);
          }}
          onReset={handleResetFilters}
        />

      </div>
    </section>
  );
}
