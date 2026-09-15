"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AboutPropertyData } from "@/data/locations/ramapuram";

export interface AboutPropertyProps {
  data: AboutPropertyData;
}

export default function AboutProperty({ data }: AboutPropertyProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <section className="w-full space-y-5 pt-8 font-Plus_Jakarta_Sans">
      {/* Section Header */}
      <h2 className="text-xl sm:text-2xl font-semibold text-[#000000] font-figtree tracking-tight">
        {data.title}
      </h2>

      {/* Description Paragraphs */}
      <div className="space-y-4 text-[14px] sm:text-[15px] text-[#9CA3AF] font-normal leading-relaxed max-w-5xl font-figtree">
        <p>{data.paragraph1}</p>
        <p>{data.paragraph2}</p>
      </div>

      {/* See More Toggle Button */}
      <div>
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-[21px] sm:text-[15px] font-medium text-[#272828] hover:text-[#0053B0] transition-colors focus:outline-none cursor-pointer font-figtree inline-block mt-1"
        >
          {data.readMoreLabel}
        </button>
      </div>

      {/* Map Image Container */}
      <div className="w-full rounded-[24px] overflow-hidden bg-white shadow-xs mt-6">
        <div className="relative w-full h-[320px] sm:h-[420px] md:h-[480px]">
          <Image
            src={data.mapImage}
            alt={`${data.title} Map`}
            fill
            sizes="(max-width: 1440px) 100vw, 1440px"
            className="object-cover object-center"
            priority
          />
        </div>
      </div>
    </section>
  );
}

