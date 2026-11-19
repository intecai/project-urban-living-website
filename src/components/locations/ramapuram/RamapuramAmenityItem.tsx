"use client";

import React from "react";
import Image from "next/image";
import { AmenityItemData } from "@/data/locations/ramapuram";

export interface RamapuramAmenityItemProps {
  item: AmenityItemData;
}

export default function RamapuramAmenityItem({ item }: RamapuramAmenityItemProps) {
  const imageSrc = item.imageIcon || "";

  return (
    <div className="flex items-center gap-3 py-1.5">
      <div className="shrink-0 relative w-5 h-5 flex items-center justify-center">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={item.title}
            width={20}
            height={20}
            className="object-contain w-5 h-5"
          />
        ) : null}
      </div>
      <span className="text-sm font-medium text-[#1F2937] font-Plus_Jakarta_Sans">
        {item.title}
      </span>
    </div>
  );
}


