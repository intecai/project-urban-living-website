"use client";

import React from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import { AmenitiesSectionData } from "@/types/home";

export interface AmenitiesSectionProps {
  data?: AmenitiesSectionData;
}

const defaultAmenities = [
  { id: "1", title: "CCTV", icon: "/images/home/Camera.png" },
  { id: "2", title: "Caretaker", icon: "/images/home/Caretaker.png" },
  { id: "3", title: "Laundry Zones", icon: "/images/home/LaundryZones.png" },
  { id: "4", title: "Geyser", icon: "/images/home/Geyzer.png" },
  { id: "5", title: "Digital Lock", icon: "/images/home/DigitalLocker.png" },
  { id: "6", title: "Kitchen", icon: "/images/home/Kitchen.png" },
  { id: "7", title: "Wifi", icon: "/images/home/Wifi.png" },
  { id: "8", title: "Parking", icon: "/images/home/ParkingSign.png" },
  { id: "9", title: "Power backup", icon: "/images/home/PowerBackup.png" },
  { id: "10", title: "Homely Food", icon: "/images/home/HomelyFood.png" },
  { id: "11", title: "Air conditioner", icon: "/images/home/AirConditioner.png" },
  { id: "12", title: "Fire Safety", icon: "/images/home/FireSafety.png" },
];

export default function AmenitiesSection({ data }: AmenitiesSectionProps) {
  const eyebrow = data?.eyebrow || "Our Amenities";
  const heading = data?.heading || "Everything You Need for Comfortable Living";
  const items = data?.items || defaultAmenities;

  return (
    <section className="w-full py-14 lg:py-20 bg-white font-montserrat">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        
        {/* Outer Container with Exact Figma Concave Corner Frame */}
        <div className="relative w-full max-w-[1240px] mx-auto px-8 sm:px-14 py-10 sm:py-16">
          
          {/* Responsive SVG Concave Corner Frame (Exact Figma Subtract Shape) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            viewBox="0 0 1000 600"
            preserveAspectRatio="none"
          >
            <path
              d="M 36 0 H 964 A 36 36 0 0 0 1000 36 V 564 A 36 36 0 0 0 964 600 H 36 A 36 36 0 0 0 0 564 V 36 A 36 36 0 0 0 36 0 Z"
              fill="#FDFEFF"
              stroke="#B4B8B9"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* Inner Content Area */}
          <div className="relative z-10 space-y-8 sm:space-y-12">
            
            {/* Top Eyebrow, Heart & Split Divider */}
            <div className="flex flex-col items-center justify-center space-y-2 text-center">
              <span className="text-xs sm:text-sm font-semibold text-[18px] text-[#2571A5] font-figtree">
                {eyebrow}
              </span>

              {/* Left Line + Yellow Heart + Right Line Divider */}
              <div className="flex items-center justify-center gap-3 w-full max-w-[280px] sm:max-w-[340px] my-1">
                <div className="flex-1 h-[1px] bg-[#E5E7EB]" />
                <Heart className="w-3.5 h-3.5 fill-[#EFC53F] text-[#EFC53F] shrink-0" />
                <div className="flex-1 h-[1px] bg-[#E5E7EB]" />
              </div>

              {/* Centered Heading */}
              <h2 className="text-2xl sm:text-3xl lg:text-[26px] font-semibold text-[#011A2A] font-figtree leading-snug pt-2">
                {heading}
              </h2>
            </div>

            {/* 12 Amenities Grid (6 Columns × 2 Rows on Desktop) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-y-8 gap-x-4 justify-items-center py-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col items-center text-center space-y-3 group cursor-pointer"
                >
                  {/* PNG Image Asset */}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center p-1">
                    <Image
                      src={item.icon || (item as any).image}
                      alt={item.title}
                      width={48}
                      height={48}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Amenity Title */}
                  <h3 className="text-xs sm:text-sm font-semibold text-[#011A2A] text-[16px] font-figtree tracking-tight text-center">
                    {item.title}
                  </h3>
                </div>
              ))}
            </div>

            {/* Bottom Centered Description Paragraph */}
            <div className="pt-2 text-center">
              <p className="text-xs sm:text-sm text-[#6C6F73] text-[18px] font-figtree max-w-[720px] mx-auto leading-relaxed text-center">
                At Urban Living, we create a safe, comfortable and inspiring home where you can focus on your dreams and grow every day. At Urban Living, we create a safe, comfortable and inspiring
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
