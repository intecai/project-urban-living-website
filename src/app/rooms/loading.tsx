import React from "react";
import RoomCardSkeleton from "@/components/ourRooms/RoomCardSkeleton";

export default function RoomsLoading() {
  return (
    <div className="w-full bg-[#FAFCFF] min-h-screen py-8 sm:py-12 font-figtree">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 space-y-6 sm:space-y-8">
        {/* Category Tabs Skeleton */}
        <div className="flex items-center gap-3 overflow-hidden pb-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-10 w-32 rounded-full bg-slate-200 animate-pulse shrink-0"
            />
          ))}
        </div>

        {/* Toolbar Skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <div className="space-y-2">
            <div className="h-7 w-48 bg-slate-200 rounded animate-pulse" />
            <div className="h-4 w-36 bg-slate-200 rounded animate-pulse" />
          </div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-44 bg-slate-200 rounded-2xl animate-pulse" />
            <div className="h-10 w-24 bg-slate-200 rounded-2xl animate-pulse" />
            <div className="h-10 w-28 bg-slate-200 rounded-2xl animate-pulse" />
          </div>
        </div>

        {/* Room Cards Skeleton List */}
        <div className="space-y-4 sm:space-y-6">
          {Array.from({ length: 4 }).map((_, idx) => (
            <RoomCardSkeleton key={idx} />
          ))}
        </div>
      </div>
    </div>
  );
}
