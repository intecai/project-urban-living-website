"use client";

import React from "react";
import Image from "next/image";
import { AmenityItemData } from "@/data/locations/ramapuram";

export interface RamapuramAmenityItemProps {
  item: AmenityItemData;
}

const fallbackImageMap: Record<string, string> = {
  Kitchen: "/images/rooms/Amenities-kitchen.png",
  "Washing Machine": "/images/rooms/Amenities-WashingMachine.png",
  CCTV: "/images/rooms/Amenities-CCTV.png",
  Geyser: "/images/rooms/Amenities-Geyser.png",
  "AC room": "/images/rooms/Amenities-AC.png",
  AC: "/images/rooms/Amenities-AC.png",
  Kettle: "/images/rooms/Amenities-Kettle.png",
  TV: "/images/rooms/Amenities-TV.png",
  "Wi-Fi": "/images/rooms/Amenities-wifi.png",
  "Induction stove": "/images/rooms/Amenities-Inductionstov.png",
  Microwave: "/images/rooms/Amenities-Microwave.png",
  "Digital Lock": "/images/rooms/Amenities-DigitalLock.png",
  Caretaker: "/images/rooms/Amenities-Caretaker.png",
  "Fire extinguisher": "/images/rooms/Amenities-FireExtinguisher.png",
};

export default function RamapuramAmenityItem({ item }: RamapuramAmenityItemProps) {
  const imageSrc =
    item.imageIcon || fallbackImageMap[item.title] || "/images/rooms/Amenities-wifi.png";

  return (
    <div className="flex items-center gap-3 py-1.5">
      <div className="shrink-0 relative w-5 h-5 flex items-center justify-center">
        <Image
          src={imageSrc}
          alt={item.title}
          width={20}
          height={20}
          className="object-contain w-5 h-5"
        />
      </div>
      <span className="text-sm font-medium text-[#1F2937] font-Plus_Jakarta_Sans">
        {item.title}
      </span>
    </div>
  );
}


