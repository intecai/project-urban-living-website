"use client";

import React from "react";
import { MapPin } from "lucide-react";
import { RamapuramData } from "@/data/locations/ramapuram";

export interface RamapuramLocationProps {
  location: RamapuramData["location"];
}

export default function RamapuramLocation({ location }: RamapuramLocationProps) {
  return (
    <div className="bg-white rounded-[20px] border border-[#E2E8F0] p-6 shadow-2xs space-y-4 font-Plus_Jakarta_Sans">
      <div className="flex items-center gap-2">
        <MapPin className="w-5 h-5 text-[#0053B0]" />
        <h3 className="text-lg font-bold text-[#011A2A] font-Plus_Jakarta_Sans">
          {location.title}
        </h3>
      </div>

      <p className="text-xs sm:text-sm text-[#64748B] font-normal leading-relaxed font-Plus_Jakarta_Sans">
        {location.address}
      </p>

      <a
        href={`https://maps.google.com/?q=${encodeURIComponent(location.address)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-xs font-semibold text-[#0053B0] hover:underline"
      >
        View on Google Maps →
      </a>
    </div>
  );
}
