import React from "react";

export default function RoomDetailLoading() {
  return (
    <div className="w-full bg-white min-h-screen py-8 sm:py-12 font-figtree">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 space-y-8">
        {/* Breadcrumb Skeleton */}
        <div className="flex items-center gap-2">
          <div className="h-4 w-16 bg-slate-200 rounded animate-pulse" />
          <div className="h-4 w-4 bg-slate-200 rounded animate-pulse" />
          <div className="h-4 w-24 bg-slate-200 rounded animate-pulse" />
          <div className="h-4 w-4 bg-slate-200 rounded animate-pulse" />
          <div className="h-4 w-32 bg-slate-200 rounded animate-pulse" />
        </div>

        {/* Gallery & Hero Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Main Visual Image Skeleton */}
          <div className="lg:col-span-7 space-y-4">
            <div className="w-full aspect-[4/3] sm:h-[450px] bg-slate-200 rounded-3xl animate-pulse" />
            <div className="flex items-center gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="w-24 h-20 bg-slate-200 rounded-xl animate-pulse shrink-0"
                />
              ))}
            </div>
          </div>

          {/* Right Info Box Skeleton */}
          <div className="lg:col-span-5 bg-[#FAFCFF] border border-[#E2E8F0] rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="space-y-3">
              <div className="h-8 w-3/4 bg-slate-200 rounded animate-pulse" />
              <div className="h-4 w-1/2 bg-slate-200 rounded animate-pulse" />
            </div>

            <div className="h-12 w-40 bg-slate-200 rounded-xl animate-pulse" />

            <div className="space-y-2 pt-4 border-t border-slate-200">
              <div className="h-4 w-full bg-slate-200 rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-slate-200 rounded animate-pulse" />
              <div className="h-4 w-4/6 bg-slate-200 rounded animate-pulse" />
            </div>

            <div className="h-12 w-full bg-slate-300 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
