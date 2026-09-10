"use client";

import React from "react";
import Image from "next/image";
import { RoomItem } from "./types";
import { MapPin, Camera } from "lucide-react";

interface RoomCardProps {
  room: RoomItem;
}

export default function RoomCard({ room }: RoomCardProps) {
  return (
    <div className="w-full bg-white border border-[#E2E8F0] rounded-[24px] p-4 sm:p-5 flex flex-col md:flex-row gap-5 lg:gap-8 justify-between items-stretch transition-all duration-300 font-jakarta">
      {/* 1. LEFT ROOM IMAGE FRAME (16px border-radius as shown in Figma Dev Mode) */}
      <div className="relative w-full md:w-[320px] lg:w-[350px] shrink-0 h-[210px] sm:h-[225px] rounded-[16px] overflow-hidden bg-slate-100 group">
        <Image
          src={room.image}
          alt={room.name}
          fill
          sizes="(max-width: 768px) 100vw, 350px"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Photo Count Badge sitting inside image at bottom-left */}
        <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-xs text-white text-xs px-3 py-1.5 rounded-[8px] flex items-center gap-1.5 font-medium">
          <Camera className="w-3.5 h-3.5" />
          <span>{room.photoCount} Photos</span>
        </div>
      </div>

      {/* 2. RIGHT CONTENT AREA */}
      <div className="flex-1 flex flex-col justify-between py-1">
        {/* Top Portion: Title & Location */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
          {/* Title & Amenities */}
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold text-[#011A2A] text-[20px] font-figtree tracking-tight leading-snug">
              {room.name}
            </h3>

            {/* Amenities Row with PNG Images */}
            <div className="flex flex-wrap items-center gap-4 text-sm sm:text-base text-[#2571A5] text-[16px] font-figtree mt-3">
              {room.amenities.wifi && (
                <div className="flex items-center gap-2">
                  <Image
                    src="/images/rooms/ourrooms_wifi.png"
                    alt="Wi-Fi"
                    width={20}
                    height={20}
                    className="w-5 h-5 object-contain"
                  />
                  <span>Wi-Fi</span>
                </div>
              )}
              {room.amenities.food && (
                <div className="flex items-center gap-2">
                  <Image
                    src="/images/rooms/ourrooms_food.png"
                    alt="Food"
                    width={20}
                    height={20}
                    className="w-5 h-5 object-contain"
                  />
                  <span>Food</span>
                </div>
              )}
              {room.amenities.ac && (
                <div className="flex items-center gap-2">
                  <Image
                    src="/images/rooms/ourrooms_Ac.png"
                    alt="AC"
                    width={20}
                    height={20}
                    className="w-5 h-5 object-contain"
                  />
                  <span>AC</span>
                </div>
              )}
              {room.amenities.laundry && (
                <div className="flex items-center gap-2">
                  <Image
                    src="/images/rooms/ourrooms_Laundry.png"
                    alt="Laundry"
                    width={20}
                    height={20}
                    className="w-5 h-5 object-contain"
                  />
                  <span>Laundry</span>
                </div>
              )}
            </div>
          </div>

          {/* Location Badge (Top Right) */}
          <div className="flex items-center gap-1.5 text-xs sm:text-sm font-normal text-[#42474E] text-[18px] shrink-0 sm:pt-0.5">
            <MapPin className="w-4 h-4 text-[#94A3B8] shrink-0" />
            <span>{room.location}</span>
          </div>
        </div>

        {/* Bottom Portion: Starting Price & Availability */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pt-4 md:pt-0">
          {/* Price Container */}
          <div className="flex items-baseline gap-2">
            <span className="text-sm text-[#6C6F73] text-[15px] font-figtree">
              Starting from
            </span>
            <div className="flex items-baseline">
              <span className="text-2xl sm:text-[26px] font-bold text-[#2571A5] text-[26px] tracking-tight">
                ₹{room.price}
              </span>
              <span className="text-sm font-medium text-[#42474E] text-[20px] font-inter ml-0.5">
                /mo
              </span>
            </div>
          </div>

          {/* Availability Status (Bottom Right) */}
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#22C55E] text-[14px] font-inter shrink-0">
            <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
            <span>Available Now</span>
          </div>
        </div>
      </div>
    </div>
  );
}
