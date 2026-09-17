"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Room } from "@/types/room";

import { getRoomSlug } from "@/utils/slug";

export interface RoomCardProps {
  room: Room;
}

export default function RoomCard({ room }: RoomCardProps) {
  const roomSlug = room.slug || getRoomSlug(room.title);

  const formattedAmenities = Array.isArray(room.amenities)
    ? room.amenities.join(" • ")
    : room.amenities;

  return (
    <Link
      href={`/rooms/${roomSlug}`}
      className="group bg-white rounded-2xl sm:rounded-[24px] border border-[#E5E7EB] overflow-hidden shadow-2xs hover:shadow-md hover:border-[#02569B]/40 transition-all duration-300 flex flex-col justify-between h-full font-figtree cursor-pointer"
    >
      {/* 1. Image & Badge Container */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-slate-100 rounded-t-2xl sm:rounded-t-[24px]">
        <Image
          src={room.image}
          alt={room.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover rounded-t-2xl sm:rounded-t-[24px] group-hover:scale-105 transition-transform duration-500"
        />

        {/* Frosted Glass Status Badge */}
        {room.badge && (
          <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-10">
            <span className="inline-block px-2 sm:px-3.5 py-1 sm:py-1.5 text-[10px] sm:text-[13px] font-medium rounded-md sm:rounded-xl text-white bg-white/30 backdrop-blur-md border border-white/20 shadow-xs">
              {room.badge}
            </span>
          </div>
        )}
      </div>

      {/* 2. Card Content */}
      <div className="p-3 sm:p-5 lg:p-6 flex-1 flex flex-col justify-between">
        {/* Title & Amenities */}
        <div>
          <h3 className="text-sm sm:text-lg lg:text-[22px] font-semibold text-[#011A2A] group-hover:text-[#02569B] transition-colors font-figtree tracking-tight leading-snug mb-1">
            {room.title}
          </h3>
          <p className="text-[11px] sm:text-xs lg:text-[15px] text-[#6C6F73] font-figtree leading-relaxed line-clamp-2">
            {formattedAmenities}
          </p>
        </div>

        {/* Price Info */}
        <div className="mt-3 sm:mt-6">
          <p className="hidden sm:block text-xs sm:text-[14px] text-[#6C6F73] font-figtree mb-0.5">
            Starting from
          </p>
          <div className="flex items-baseline gap-1 sm:gap-1.5 flex-wrap">
            <span className="text-base sm:text-xl lg:text-[26px] font-bold text-[#02569B] leading-none">
              ₹{room.price.toLocaleString("en-IN")}
            </span>
            <span className="text-[11px] sm:text-sm lg:text-[15px] text-[#2571A5] font-figtree font-medium">
              / {room.priceLabel || "month"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

