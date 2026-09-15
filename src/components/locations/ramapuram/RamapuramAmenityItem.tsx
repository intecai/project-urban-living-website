"use client";

import React from "react";
import {
  UtensilsCrossed,
  WashingMachine,
  Cctv,
  Flame,
  AirVent,
  Coffee,
  Tv,
  Wifi,
  Microwave,
  Lock,
  UserCheck,
  ShieldAlert,
} from "lucide-react";
import { AmenityItemData } from "@/data/locations/ramapuram";

export interface RamapuramAmenityItemProps {
  item: AmenityItemData;
}

const iconMap: Record<string, React.ReactNode> = {
  UtensilsCrossed: <UtensilsCrossed className="w-5 h-5 text-[#EAB308] stroke-[1.8]" />,
  WashingMachine: <WashingMachine className="w-5 h-5 text-[#EAB308] stroke-[1.8]" />,
  Cctv: <Cctv className="w-5 h-5 text-[#EAB308] stroke-[1.8]" />,
  Flame: <Flame className="w-5 h-5 text-[#EAB308] stroke-[1.8]" />,
  AirVent: <AirVent className="w-5 h-5 text-[#EAB308] stroke-[1.8]" />,
  Coffee: <Coffee className="w-5 h-5 text-[#EAB308] stroke-[1.8]" />,
  Tv: <Tv className="w-5 h-5 text-[#EAB308] stroke-[1.8]" />,
  Wifi: <Wifi className="w-5 h-5 text-[#EAB308] stroke-[1.8]" />,
  Microwave: <Microwave className="w-5 h-5 text-[#EAB308] stroke-[1.8]" />,
  Lock: <Lock className="w-5 h-5 text-[#EAB308] stroke-[1.8]" />,
  UserCheck: <UserCheck className="w-5 h-5 text-[#EAB308] stroke-[1.8]" />,
  ShieldAlert: <ShieldAlert className="w-5 h-5 text-[#EAB308] stroke-[1.8]" />,
};

export default function RamapuramAmenityItem({ item }: RamapuramAmenityItemProps) {
  const icon = iconMap[item.iconName] || <Wifi className="w-5 h-5 text-[#EAB308] stroke-[1.8]" />;

  return (
    <div className="flex items-center gap-3 py-1.5">
      <div className="shrink-0 flex items-center justify-center">{icon}</div>
      <span className="text-sm font-medium text-[#1F2937] font-Plus_Jakarta_Sans">
        {item.title}
      </span>
    </div>
  );
}

