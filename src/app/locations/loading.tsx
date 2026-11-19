import React from "react";

export default function LocationsLoading() {
  return (
    <div className="w-full bg-white min-h-screen py-8 sm:py-12 font-figtree">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 space-y-10">
        {/* Hero Section Skeleton */}
        <div className="w-full h-[280px] sm:h-[360px] bg-slate-200 rounded-3xl animate-pulse flex flex-col justify-center px-8 sm:px-12 space-y-4">
          <div className="h-10 w-2/3 max-w-md bg-slate-300 rounded animate-pulse" />
          <div className="h-5 w-1/2 max-w-sm bg-slate-300 rounded animate-pulse" />
        </div>

        {/* Section Title Skeleton */}
        <div className="space-y-2">
          <div className="h-8 w-64 bg-slate-200 rounded animate-pulse" />
          <div className="h-4 w-96 bg-slate-200 rounded animate-pulse" />
        </div>

        {/* Location Cards Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E2E8F0] rounded-[24px] p-4 space-y-4 shadow-sm"
            >
              <div className="w-full aspect-[4/3] bg-slate-200 rounded-[16px] animate-pulse" />
              <div className="space-y-2 px-1">
                <div className="h-6 w-3/4 bg-slate-200 rounded animate-pulse" />
                <div className="h-4 w-1/3 bg-slate-200 rounded animate-pulse" />
              </div>
              <div className="h-10 w-full bg-slate-200 rounded-xl animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
