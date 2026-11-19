import React from "react";

export default function RoomCardSkeleton() {
  return (
    <div className="w-full bg-white border border-[#E2E8F0] rounded-[20px] sm:rounded-[24px] p-4 sm:p-5 flex flex-col md:flex-row gap-4 sm:gap-5 lg:gap-8 justify-between items-stretch font-jakarta pointer-events-none shadow-sm">
      {/* 1. LEFT ROOM IMAGE FRAME SKELETON */}
      <div className="relative w-full md:w-[320px] lg:w-[350px] shrink-0 h-[200px] sm:h-[225px] rounded-[16px] overflow-hidden bg-slate-200 animate-pulse">
        {/* Photo Count Badge Skeleton */}
        <div className="absolute bottom-3 left-3 bg-slate-300 w-20 h-6 rounded-[8px]" />
      </div>

      {/* 2. RIGHT CONTENT AREA SKELETON */}
      <div className="flex-1 flex flex-col justify-between py-1 space-y-4 md:space-y-0">
        {/* Top Portion: Title & Location */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 sm:gap-2">
          {/* Title & Amenities */}
          <div className="space-y-4">
            <div className="h-7 w-48 sm:w-64 bg-slate-200 rounded-md animate-pulse" />

            {/* Amenities Row */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-1.5 sm:gap-2">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 bg-slate-200 rounded animate-pulse" />
                  <div className="w-12 h-4 bg-slate-200 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>

          {/* Location Badge (Top Right) */}
          <div className="flex items-center gap-1.5 shrink-0 pt-1 sm:pt-0.5">
            <div className="w-4 h-4 bg-slate-200 rounded-full animate-pulse" />
            <div className="w-24 sm:w-32 h-4 bg-slate-200 rounded animate-pulse" />
          </div>
        </div>

        {/* Bottom Portion: Starting Price & Availability */}
        <div className="flex flex-row items-end justify-between gap-2 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 mt-4 md:mt-0">
          {/* Price Container */}
          <div className="flex items-baseline gap-1.5 sm:gap-2">
            <div className="w-16 sm:w-20 h-4 bg-slate-200 rounded animate-pulse hidden sm:block" />
            <div className="w-20 sm:w-28 h-7 sm:h-9 bg-slate-200 rounded animate-pulse" />
          </div>

          {/* Availability Status (Bottom Right) */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-2 h-2 rounded-full bg-slate-200 animate-pulse" />
            <div className="w-20 sm:w-24 h-4 bg-slate-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
