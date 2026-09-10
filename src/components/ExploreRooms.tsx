"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Crown, User, Users, ArrowRight } from "lucide-react";

export interface Room {
  id: string;
  title: string;
  category: "premium" | "single" | "double" | "triple";
  amenities: string;
  price: string;
  image: string;
  badgeText: string;
  badgeVariant: "popular" | "left" | "new" | "choice";
}

const allRooms: Room[] = [
  {
    id: "1",
    title: "Premium Single Room",
    category: "premium",
    amenities: "WiFi • AC • Food • Laundry",
    price: "₹8,500",
    image: "/images/rooms/room_single.png",
    badgeText: "Most Popular",
    badgeVariant: "popular",
  },
  {
    id: "2",
    title: "Deluxe Single Room",
    category: "single",
    amenities: "WiFi • AC • Food • Housekeeping",
    price: "₹8,000",
    image: "/images/rooms/room_deluxe.png",
    badgeText: "Only 1 Room Left",
    badgeVariant: "left",
  },
  {
    id: "3",
    title: "Three sharing",
    category: "triple",
    amenities: "WiFi • AC • Food",
    price: "₹7,200",
    image: "/images/rooms/room_sharing.png",
    badgeText: "New",
    badgeVariant: "new",
  },
  {
    id: "4",
    title: "Comfort Three sharing",
    category: "triple",
    amenities: "WiFi • AC • Food • Laundry",
    price: "₹7,800",
    image: "/images/rooms/room_comfort.png",
    badgeText: "Women Choice",
    badgeVariant: "choice",
  },
  {
    id: "5",
    title: "Premium Double Room",
    category: "premium",
    amenities: "WiFi • AC • Food • Laundry",
    price: "₹6,500",
    image: "/images/rooms/room_single.png",
    badgeText: "Most Popular",
    badgeVariant: "popular",
  },
  {
    id: "6",
    title: "Deluxe Double Room",
    category: "double",
    amenities: "WiFi • AC • Food • Housekeeping",
    price: "₹6,000",
    image: "/images/rooms/room_deluxe.png",
    badgeText: "Only 2 Rooms Left",
    badgeVariant: "left",
  },
  {
    id: "7",
    title: "Standard Three sharing",
    category: "triple",
    amenities: "WiFi • AC • Food",
    price: "₹5,500",
    image: "/images/rooms/room_sharing.png",
    badgeText: "New",
    badgeVariant: "new",
  },
  {
    id: "8",
    title: "Comfort Three sharing",
    category: "triple",
    amenities: "WiFi • AC • Food • Laundry",
    price: "₹5,800",
    image: "/images/rooms/room_comfort.png",
    badgeText: "Women Choice",
    badgeVariant: "choice",
  },
];

const tabs = [
  { id: "premium", label: "Premium Rooms", icon: Crown, isGold: true },
  { id: "single", label: "Single room", icon: User },
  { id: "double", label: "Double Sharing", icon: Users },
  { id: "triple", label: "Triple rooms", icon: Users },
];

export default function ExploreRooms() {
  const [activeTab, setActiveTab] = useState<string>("premium");

  // Filter rooms based on selected category, or show all if "premium" / all matches
  const filteredRooms = allRooms.filter((room) => {
    if (activeTab === "premium") return true; // Show full showcase on default premium tab
    if (activeTab === "single") return room.category === "single" || room.title.toLowerCase().includes("single");
    if (activeTab === "double") return room.category === "double" || room.title.toLowerCase().includes("double");
    if (activeTab === "triple") return room.category === "triple" || room.title.toLowerCase().includes("three") || room.title.toLowerCase().includes("triple");
    return true;
  });

  const getBadgeStyle = (variant: Room["badgeVariant"]) => {
    switch (variant) {
      case "popular":
        return "bg-slate-700/90 text-white backdrop-blur-xs";
      case "left":
        return "bg-emerald-600 text-white font-medium";
      case "new":
        return "bg-slate-600/90 text-white backdrop-blur-xs";
      case "choice":
        return "bg-rose-600/90 text-white backdrop-blur-xs";
      default:
        return "bg-slate-800 text-white";
    }
  };

  return (
    <section className="w-full py-12 lg:py-16 bg-white font-figtree" id="rooms">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-3xl font-bold text-[#011A2A] tracking-tight">
              Explore Our Women's PG Rooms
            </h2>
          </div>

          <a
            href="#all-rooms"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2563EB] hover:text-[#1D4ED8] transition-colors group self-start sm:self-auto"
          >
            Explore all rooms
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex items-center gap-6 sm:gap-8 border-b border-slate-200 overflow-x-auto pb-3 mb-8 no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 pb-2 text-xs sm:text-sm font-medium whitespace-nowrap transition-colors focus:outline-hidden cursor-pointer ${
                  isActive
                    ? tab.isGold
                      ? "text-[#D97706] font-semibold"
                      : "text-[#2563EB] font-semibold"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${
                    isActive
                      ? tab.isGold
                        ? "text-[#F59E0B]"
                        : "text-[#2563EB]"
                      : "text-slate-400"
                  }`}
                />
                <span>{tab.label}</span>

                {/* Active Indicator Underline */}
                {isActive && (
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${
                      tab.isGold ? "bg-[#F59E0B]" : "bg-[#2563EB]"
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Room Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredRooms.map((room) => (
            <div
              key={room.id}
              className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              {/* Card Header Image & Overlay Badge */}
              <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-slate-100">
                <Image
                  src={room.image}
                  alt={room.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Top Badge Overlay */}
                <div className="absolute top-3 left-3">
                  <span
                    className={`px-3 py-1 text-[11px] font-semibold rounded-md shadow-xs ${getBadgeStyle(
                      room.badgeVariant
                    )}`}
                  >
                    {room.badgeText}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-base sm:text-[17px] font-bold text-[#011A2A] tracking-tight group-hover:text-[#2563EB] transition-colors">
                    {room.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-normal mt-1">
                    {room.amenities}
                  </p>
                </div>

                {/* Card Footer: Price */}
                <div className="pt-2 flex items-baseline justify-between border-t border-slate-100">
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg sm:text-xl font-bold text-[#2563EB]">
                      {room.price}
                    </span>
                    <span className="text-xs text-slate-400 font-normal">
                      / month
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
