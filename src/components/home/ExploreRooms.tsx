"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import RoomCard from "./RoomCard";
import roomsJson from "@/data/rooms.json";
import { Room } from "@/types/room";

const categoryTabs = [
  { id: "premium", label: "Premium Rooms", icon: "/images/home/Crown.png", isGold: true },
  { id: "single", label: "Single room", icon: "/images/home/SingleRoom.png", isGold: false },
  { id: "double", label: "Double Sharing", icon: "/images/home/DoubleSharing.png", isGold: false },
  { id: "triple", label: "Triple sharing", icon: "/images/home/TripleSharing.png", isGold: false },
];

export interface ExploreRoomsProps {
  initialRooms?: Room[];
}

export default function ExploreRooms({ initialRooms }: ExploreRoomsProps) {
  const roomsList: Room[] = initialRooms || (roomsJson as Room[]);
  const [activeCategory, setActiveCategory] = useState<string>("premium");

  // Category filter logic
  const filteredRooms = roomsList.filter((room) => {
    if (activeCategory === "premium") {
      // "Premium Rooms" tab displays the showcase set of rooms
      return true;
    }
    if (activeCategory === "single") {
      return room.category === "single" || room.title.toLowerCase().includes("single");
    }
    if (activeCategory === "double") {
      return room.category === "double" || room.title.toLowerCase().includes("double") || room.title.toLowerCase().includes("four") || room.title.toLowerCase().includes("two");
    }
    if (activeCategory === "triple") {
      return room.category === "triple" || room.title.toLowerCase().includes("three") || room.title.toLowerCase().includes("triple");
    }
    return true;
  });

  return (
    <section className="w-full py-12 lg:py-16 bg-white font-figtree" id="explore-rooms">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 space-y-8">
        
        {/* 1. Left-Aligned Section Title & Explore All Rooms Link */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl lg:text-[28px] text-[#0E1C36] text-left font-figtree tracking-tight">
            Explore Our Women's PG Rooms
          </h2>

          <Link
            href="/rooms"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#02569B] hover:text-[#01417a] transition-colors group self-start sm:self-auto"
          >
            <span>Explore all rooms</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 2. Category Navigation Tabs Row */}
        <div className="">
          <div className="flex items-center gap-8 sm:gap-12 overflow-x-auto no-scrollbar pb-3">
            {categoryTabs.map((tab) => {
              const isActive = activeCategory === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveCategory(tab.id)}
                  className={`relative flex flex-col items-center gap-2 pb-3 text-sm font-medium whitespace-nowrap transition-colors focus:outline-hidden cursor-pointer ${
                    isActive
                      ? tab.isGold
                        ? "text-[#D97706] font-semibold"
                        : "text-[#02569B] font-semibold"
                      : "text-slate-500 hover:text-slate-800 font-normal"
                  }`}
                >
                  <div className="relative w-6 h-6 sm:w-7 sm:h-7 shrink-0">
                    <Image
                      src={tab.icon}
                      alt={tab.label}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span>{tab.label}</span>

                  {/* Active Tab Underline */}
                  {isActive && (
                    <span
                      className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${
                        tab.isGold ? "bg-[#EFC53F]" : "bg-[#02569B]"
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Room Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
          {filteredRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>

      </div>
    </section>
  );
}
