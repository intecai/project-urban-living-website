"use client";

import React from "react";
import Image from "next/image";
import { Room } from "@/types/room";

export interface RoomCardProps {
  room: Room;
}

export default function RoomCard({ room }: RoomCardProps) {
  const formattedAmenities = Array.isArray(room.amenities)
    ? room.amenities.join(" • ")
    : room.amenities;

  return (
    <div className="group bg-white rounded-[24px] border border-[#E5E7EB] overflow-hidden shadow-2xs flex flex-col justify-between h-full font-figtree">
      {/* 1. Image & Badge Container */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-slate-100 rounded-t-[24px]">
        <Image
          src={room.image}
          alt={room.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover rounded-t-[24px]"
        />

        {/* Frosted Glass Status Badge */}
        {room.badge && (
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-block px-3.5 py-1.5 text-xs sm:text-[13px] font-medium rounded-xl text-white bg-white/25 backdrop-blur-md border border-white/20 shadow-xs">
              {room.badge}
            </span>
          </div>
        )}
      </div>

      {/* 2. Card Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        {/* Title & Amenities */}
        <div>
          <h3 className="text-xl sm:text-[22px] font-semibold text-[20px] text-[#011A2A] font-figtree tracking-tight leading-tight mb-2">
            {room.title}
          </h3>
          <p className="text-sm sm:text-[15px] text-[#6C6F73] text-[15px] font-figtree leading-relaxed">
            {formattedAmenities}
          </p>
        </div>

        {/* Price Info */}
        <div className="mt-6 sm:mt-8">
          <p className="text-sm sm:text-[14px] text-[#6C6F73] text-[15px] font-figtree mb-1">
            Starting from
          </p>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-[26px] font-bold text-[#02569B] leading-none">
              ₹{room.price.toLocaleString("en-IN")}
            </span>
            <span className="text-sm sm:text-[15px] text-[#2571A5] text-[22px] font-figtree font-semibold">
              / {room.priceLabel || "month"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
