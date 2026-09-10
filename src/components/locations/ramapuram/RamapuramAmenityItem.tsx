"use client";

import React from "react";
import Image from "next/image";
import {
  UtensilsCrossed,
  Shirt,
  Video,
  Flame,
  Wind,
  Coffee,
  Tv,
  Wifi,
  Zap,
  Box,
  ShieldAlert,
} from "lucide-react";
import { AmenityItemData } from "@/data/locations/ramapuram";

export interface RamapuramAmenityItemProps {
  item: AmenityItemData;
}

const iconMap: Record<string, React.ReactNode> = {
  UtensilsCrossed: <UtensilsCrossed className="w-5 h-5 text-[#F59E0B]" />,
  Shirt: <Shirt className="w-5 h-5 text-[#F59E0B]" />,
  Video: <Video className="w-5 h-5 text-[#F59E0B]" />,
  Flame: <Flame className="w-5 h-5 text-[#F59E0B]" />,
  Wind: <Wind className="w-5 h-5 text-[#F59E0B]" />,
  Coffee: <Coffee className="w-5 h-5 text-[#F59E0B]" />,
  Tv: <Tv className="w-5 h-5 text-[#F59E0B]" />,
  Wifi: <Wifi className="w-5 h-5 text-[#F59E0B]" />,
  Zap: <Zap className="w-5 h-5 text-[#F59E0B]" />,
  Box: <Box className="w-5 h-5 text-[#F59E0B]" />,
  ShieldAlert: <ShieldAlert className="w-5 h-5 text-[#F59E0B]" />,
};

export default function RamapuramAmenityItem({ item }: RamapuramAmenityItemProps) {
  const icon = iconMap[item.iconName] || <Wifi className="w-5 h-5 text-[#F59E0B]" />;

  return (
    <div className="flex items-center gap-3 py-2">
      {item.imageIcon ? (
        <div className="w-6 h-6 shrink-0 relative">
          <Image
            src={item.imageIcon}
            alt={item.title}
            width={24}
            height={24}
            className="w-full h-full object-contain"
          />
        </div>
      ) : (
        <div className="shrink-0">{icon}</div>
      )}
      <span className="text-sm font-semibold text-[#1F2937] font-Plus_Jakarta_Sans">
        {item.title}
      </span>
    </div>
  );
}
