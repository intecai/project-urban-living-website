"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Search, TrainTrack } from "lucide-react";

export default function LocationsHero() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/rooms?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <section className="w-full relative overflow-hidden bg-[#FCFBF5] border-b border-slate-100 font-Plus_Jakarta_Sans">
      {/* Background Split: Left Light Cream (#FCFBF5), Right Dark Navy (#002B49) */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-[42%] bg-[#002B49] hidden lg:block overflow-hidden">
        {/* Decorative Concentric SVG Curves Overlay */}
        <svg
          className="absolute inset-0 w-full h-full opacity-20 pointer-events-none stroke-white"
          viewBox="0 0 400 700"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="200" cy="350" r="180" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="200" cy="350" r="240" strokeWidth="1" />
          <circle cx="200" cy="350" r="300" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="200" cy="350" r="360" strokeWidth="1" />
          <path d="M-50 100 Q 150 350 -50 600" strokeWidth="1.5" />
          <path d="M450 100 Q 250 350 450 600" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 py-12 lg:py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

          {/* Left Column: Heading, Subtitle & Search Input */}
          <div className="lg:col-span-7 space-y-6 max-w-xl">
            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[52px] font-bold text-[#002B49] leading-[1.18] tracking-tight font-Plus_Jakarta_Sans">
              Find your next <br className="hidden sm:inline" />
              Comfort{" "}
              <span className="font-brittany text-[#D9A229] font-normal text-4xl sm:text-5xl lg:text-[62px] inline-block ml-1">
                Home
              </span>
            </h1>

            {/* Subtitle Description */}
            <p className="text-xs sm:text-sm md:text-base text-[#475569] font-normal leading-relaxed max-w-lg font-Plus_Jakarta_Sans">
              Experience safe, comfortable, and affordable living in the heart of Chennai.
              Designed exclusively for modern women who seek a perfect blend of privacy and community.
            </p>

            {/* Search Input Box */}
            <form onSubmit={handleSearchSubmit} className="pt-2">
              <div className="bg-white rounded-full p-2 pl-5 sm:pl-6 border border-[#E2E8F0] shadow-md hover:shadow-lg transition-shadow flex items-center justify-between gap-3 max-w-md w-full">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[#9CA3AF] shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search locations in Chennai..."
                    className="w-full text-xs sm:text-sm text-[#0F172A] placeholder-[#9CA3AF] bg-transparent outline-none font-medium font-Plus_Jakarta_Sans"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#0053B0] hover:bg-[#004088] text-white font-semibold text-xs sm:text-sm px-5 sm:px-6 py-2.5 sm:py-3 rounded-full shrink-0 transition-colors duration-200 shadow-2xs font-Plus_Jakarta_Sans cursor-pointer"
                >
                  Find Rooms
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Capsule Image Composition with Floating Badges */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end pt-4 lg:pt-0">
            <div className="relative w-[280px] sm:w-[320px] md:w-[340px] h-[380px] sm:h-[430px] md:h-[460px]">

              {/* Oval / Capsule Image Frame with Crisp White Border */}
              <div className="w-full h-full rounded-[160px] overflow-hidden border-[10px] sm:border-[12px] border-white shadow-2xl relative bg-white">
                <Image
                  src="/images/locations/locations_hero_student.png"
                  alt="Urban Living PG Student"
                  fill
                  priority
                  sizes="(max-width: 768px) 320px, 360px"
                  className="object-cover object-center"
                />
              </div>

              {/* Floating Badge 1: Top-Left "3 Prime Location !" */}
              <div className="absolute -top-3 -left-6 sm:-left-10 bg-white rounded-2xl shadow-xl px-3.5 sm:px-4 py-2 sm:py-2.5 border border-slate-100 flex items-center gap-2 z-20 hover:scale-105 transition-transform">
                <span className="text-xs sm:text-sm font-bold text-[#002B49] font-Plus_Jakarta_Sans whitespace-nowrap">
                  3 Prime Location !
                </span>
                <span className="text-base sm:text-lg inline-block -mt-3 -mr-1">✌️</span>
              </div>

              {/* Floating Badge 2: Middle-Right "Near IT Parks" */}
              <div className="absolute top-[52%] -right-4 sm:-right-8 -translate-y-1/2 bg-white rounded-2xl shadow-xl px-3.5 sm:px-4 py-2 sm:py-2.5 border border-slate-100 flex items-center gap-2 z-20 hover:scale-105 transition-transform">
                <span className="text-xs sm:text-sm font-semibold text-[#002B49] font-Plus_Jakarta_Sans whitespace-nowrap">
                  Near IT Parks
                </span>
                <span className="text-amber-400 text-sm">✨</span>
              </div>

              {/* Floating Badge 3: Bottom-Left "Near Metro" */}
              <div className="absolute -bottom-3 -left-6 sm:-left-10 bg-white rounded-2xl shadow-xl px-3.5 sm:px-4 py-2 sm:py-2.5 border border-slate-100 flex items-center gap-2.5 z-20 hover:scale-105 transition-transform">
                <div className="w-6 h-6 rounded-full bg-[#0053B0]/10 flex items-center justify-center shrink-0">
                  <TrainTrack className="w-3.5 h-3.5 text-[#0053B0]" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-[#002B49] font-Plus_Jakarta_Sans whitespace-nowrap">
                  Near Metro
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
