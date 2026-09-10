"use client";

import React from "react";
import Image from "next/image";
import { GalleryItem } from "@/data/locations/ramapuram";

export interface RamapuramGalleryProps {
  items: GalleryItem[];
}

export default function RamapuramGallery({ items }: RamapuramGalleryProps) {
  const mainImage = items[0];
  const centerTop = items[1];
  const centerBottom = items[2];
  const rightImage = items[3];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-5 my-6 sm:my-8">
      {/* 1. Main Left Image */}
      {mainImage && (
        <div className="md:col-span-2 relative h-[280px] sm:h-[360px] rounded-[16px] overflow-hidden bg-slate-100 shadow-2xs group">
          <Image
            src={mainImage.src}
            alt={mainImage.alt}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}

      {/* 2. Center Column 2 Stacked Images */}
      <div className="md:col-span-1 flex flex-col gap-4 sm:gap-5">
        {centerTop && (
          <div className="relative h-[132px] sm:h-[170px] rounded-[16px] overflow-hidden bg-slate-100 shadow-2xs group">
            <Image
              src={centerTop.src}
              alt={centerTop.alt}
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}
        {centerBottom && (
          <div className="relative h-[132px] sm:h-[170px] rounded-[16px] overflow-hidden bg-slate-100 shadow-2xs group">
            <Image
              src={centerBottom.src}
              alt={centerBottom.alt}
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}
      </div>

      {/* 3. Right Column Tall Image */}
      {rightImage && (
        <div className="md:col-span-1 relative h-[280px] sm:h-[360px] rounded-[16px] overflow-hidden bg-slate-100 shadow-2xs group">
          <Image
            src={rightImage.src}
            alt={rightImage.alt}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
    </div>
  );
}
