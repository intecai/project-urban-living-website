"use client";

import React from "react";
import { AmenityItemData } from "@/data/locations/ramapuram";
import RamapuramAmenityItem from "./RamapuramAmenityItem";

export interface RamapuramAmenitiesProps {
  heading: string;
  items: AmenityItemData[];
}

export default function RamapuramAmenities({ heading, items }: RamapuramAmenitiesProps) {
  return (
    <div className="w-full space-y-5 pt-8 font-Plus_Jakarta_Sans">
      <h2 className="text-xl sm:text-2xl font-bold text-[#011A2A] font-Plus_Jakarta_Sans tracking-tight">
        {heading}
      </h2>

      {/* Multi-column Grid Layout (3 Columns on Desktop matching Figma) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8">
        {items.map((item) => (
          <RamapuramAmenityItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

