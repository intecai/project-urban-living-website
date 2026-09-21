"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import RoomCard from "./RoomCard";
import { Room } from "@/types/room";
import { fetchRoomsFromApi } from "@/services/roomsService";

const categoryTabs = [
  { id: "all", label: "All Rooms", icon: "/images/home/Crown_home.png", isGold: false },
  { id: "single", label: "Single room", icon: "/images/home/SingleRoom.png", isGold: false },
  { id: "double", label: "Double Sharing", icon: "/images/home/DoubleSharing.png", isGold: false },
  { id: "triple", label: "Triple sharing", icon: "/images/home/TripleSharing.png", isGold: false },
  { id: "four", label: "Four Sharing", icon: "/images/home/fourSharing_home.png", isGold: false },
  { id: "five", label: "Five Sharing", icon: "/images/home/fiveSharingHome.png", isGold: false },
];

export interface ExploreRoomsProps {
  initialRooms?: Room[];
}

export default function ExploreRooms({ initialRooms }: ExploreRoomsProps) {
  const [roomsList, setRoomsList] = useState<Room[]>(initialRooms || []);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [isLoading, setIsLoading] = useState<boolean>(!initialRooms || initialRooms.length === 0);

  useEffect(() => {
    console.log("[HOME] activeCategory:", activeCategory);
    let isMounted = true;
    async function loadApiRooms() {
      setIsLoading(true);
      console.log("[HOME] fetching category:", activeCategory);
      try {
        const apiRooms = await fetchRoomsFromApi(activeCategory);
        console.log("[HOME] API rooms returned:", apiRooms);

        if (isMounted && apiRooms !== null && apiRooms !== undefined) {
          const mappedRooms: Room[] = (apiRooms || []).map((r) => {
            let activeAmenities: string[] = [];
            if (r.amenities && typeof r.amenities === "object" && !Array.isArray(r.amenities)) {
              activeAmenities = Object.entries(r.amenities)
                .filter(([, val]) => Boolean(val))
                .map(([key]) => key.toUpperCase());
            } else if (Array.isArray(r.amenities)) {
              activeAmenities = (r.amenities as any[]).map((a) => String(a).toUpperCase());
            }

            return {
              id: r.id,
              title: r.name,
              slug: r.slug,
              category: r.category,
              amenities: activeAmenities,
              price: r.price,
              priceLabel: "month",
              image: r.image,
              badge: r.badge,
            };
          });

          console.log("[HOME] setting roomsList:", mappedRooms);
          setRoomsList(mappedRooms);
        }
      } catch (err) {
        console.error("[HOME ERROR] Exception during loadApiRooms:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    loadApiRooms();
    return () => {
      isMounted = false;
    };
  }, [activeCategory]);

  console.log("[HOME] FINAL roomsList:", roomsList);
  console.log("[HOME] FINAL roomsList length:", roomsList.length);

  return (
    <section className="w-full py-10 sm:py-12 lg:py-16 bg-white font-figtree" id="explore-rooms">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 space-y-6 sm:space-y-8">
        
        {/* 1. Section Title & Desktop Explore All Link */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-center sm:text-left">
          <h2 className="text-xl sm:text-3xl lg:text-[28px] font-bold sm:font-normal text-[#0E1C36] text-center sm:text-left font-figtree tracking-tight w-full sm:w-auto">
            Explore Our Women's PG Rooms
          </h2>

          <Link
            href="/rooms"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#02569B] hover:text-[#01417a] transition-colors group"
          >
            <span>Explore all rooms</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 2. Category Navigation Tabs Row */}
        <div>
          <div className="flex items-center justify-start sm:justify-start gap-6 sm:gap-12 overflow-x-auto no-scrollbar pb-3 px-1">
            {categoryTabs.map((tab) => {
              const isActive = activeCategory === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveCategory(tab.id)}
                  className={`relative flex flex-col items-center gap-1.5 sm:gap-2 pb-3 text-xs sm:text-sm font-medium whitespace-nowrap transition-colors focus:outline-hidden cursor-pointer ${
                    isActive
                      ? tab.isGold
                        ? "text-[#D97706] font-semibold"
                        : "text-[#02569B] font-semibold"
                      : "text-slate-500 hover:text-slate-800 font-normal"
                  }`}
                >
                  <div className="relative w-5 h-5 sm:w-7 sm:h-7 shrink-0">
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

        {/* 3. Room Cards Grid (2 Columns on Mobile, 4 Columns on Desktop) */}
        {isLoading ? (
          <div className="py-10 text-center text-slate-500 font-medium text-sm col-span-full">
            Loading rooms...
          </div>
        ) : roomsList.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 pt-1 sm:pt-2">
            {roomsList.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        ) : (
          <div className="py-10 text-center text-slate-500 font-medium text-sm col-span-full">
            No rooms available in this category.
          </div>
        )}

        {/* 4. Mobile Bottom Explore All Rooms CTA Pill Button */}
        <div className="sm:hidden pt-2 flex justify-center">
          <Link
            href="/rooms"
            className="inline-flex items-center justify-center gap-2 bg-[#2571A5] hover:bg-[#02569B] text-white text-xs font-semibold px-7 py-3 rounded-full shadow-xs cursor-pointer transition-colors"
          >
            <span>Explore all rooms</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
