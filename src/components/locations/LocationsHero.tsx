"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";

export default function LocationsHero() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/rooms?search=${encodeURIComponent(searchQuery.trim())}`;
    } else {
      window.location.href = "/rooms";
    }
  };

  return (
    <>
      {/* Mobile layout: stacked content + search + hero visual */}
      <section className="md:hidden w-full font-figtree pt-28 sm:pt-28 lg:pt-10 pb-10 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 w-full space-y-6">
          <div className="max-w-xl space-y-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#2571A5] tracking-tight leading-[1.15] font-lato">
              Find your next <br />
              <span>Comfort</span>{" "}
              <span
                className="text-[#BF9100] font-brittany text-4xl sm:text-5xl font-normal inline-block ml-1 origin-left"
                style={{ transform: "rotate(-6deg)" }}
              >
                Home
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-[#0A3A5B] font-normal leading-relaxed font-figtree">
              Experience safe, comfortable, and affordable living in the heart of Chennai.
              Designed exclusively for modern women who seek a perfect blend of privacy and community.
            </p>

            {/* Mobile Search Bar Capsule */}
            <form onSubmit={handleSearchSubmit} className="pt-2">
              <div className="bg-white rounded-full p-1.5 pl-4 border border-[#E2E8F0] shadow-sm flex items-center justify-between gap-2 w-full">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <Search className="w-4 h-4 text-[#9CA3AF] shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search locations in Chennai..."
                    className="w-full text-xs text-[#0F172A] placeholder-[#9CA3AF] bg-transparent outline-none font-medium font-figtree"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#2571A5] hover:bg-[#00428C] text-white font-medium text-xs px-4 py-2 rounded-full shrink-0 transition-colors cursor-pointer"
                >
                  Find Rooms
                </button>
              </div>
            </form>
          </div>

          {/* Mobile Hero Visual Frame */}
          <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-xs border border-slate-100 bg-white">
            <Image
              src="/images/locations/locationhero.png"
              alt="Urban Living Locations PG Hero"
              fill
              priority
              sizes="100vw"
              className="object-contain object-center"
            />
          </div>
        </div>
      </section>

      <section className="relative w-full overflow-hidden font-figtree hidden md:flex items-center min-h-[440px] md:min-h-[480px] lg:min-h-[540px] xl:min-h-[600px] bg-white border-b border-slate-100">
        {/* Full-width background image container */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/locations/locationsheroimage.png"
            alt="Urban Living Locations Hero Background"
            fill
            priority
            sizes="100vw"
            className="object-contain object-right"
          />
        </div>

        {/* Content Overlay */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 w-full relative z-10 py-10 md:py-12 lg:py-16">
          <div className="max-w-[340px] md:max-w-[360px] lg:max-w-[460px] xl:max-w-xl space-y-4 md:space-y-5 lg:space-y-6 xl:space-y-8">
            <h1 className="text-3xl md:text-3xl lg:text-[42px] xl:text-[52px] font-bold text-[#2571A5] tracking-tight leading-[1.15] font-lato">
              Find your next <br />
              <span>Comfort</span>{" "}
              <span
                className="text-[#BF9100] font-brittany text-4xl md:text-4xl lg:text-5xl xl:text-[58px] font-normal inline-block ml-1.5 lg:ml-2 origin-left"
                style={{ transform: "rotate(-6deg)" }}
              >
                Home
              </span>
            </h1>
            <p className="text-xs md:text-xs lg:text-sm xl:text-[16px] text-[#0A3A5B] font-normal leading-relaxed font-figtree">
              Experience safe, comfortable, and affordable living in the heart of Chennai.
              Designed exclusively for modern women who seek a perfect blend of privacy and community.
            </p>

            {/* Search Capsule Input Box */}
            <form onSubmit={handleSearchSubmit} className="pt-1 md:pt-2">
              <div className="bg-white rounded-full p-1.5 lg:p-2 pl-4 lg:pl-6 border border-[#E2E8F0] shadow-md hover:shadow-lg transition-shadow flex items-center justify-between gap-2 lg:gap-3 max-w-[340px] md:max-w-[350px] lg:max-w-[420px] xl:max-w-md w-full">
                <div className="flex items-center gap-2 lg:gap-3 flex-1 min-w-0">
                  <Search className="w-4 h-4 lg:w-5 lg:h-5 text-[#9CA3AF] shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search locations in Chennai..."
                    className="w-full text-xs lg:text-sm text-[#0F172A] placeholder-[#9CA3AF] bg-transparent outline-none font-medium font-figtree"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#2571A5] hover:bg-[#00428C] text-white font-medium text-xs lg:text-sm px-4 lg:px-6 py-2.5 lg:py-3 rounded-full shrink-0 transition-colors shadow-2xs font-figtree cursor-pointer"
                >
                  Find Rooms
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
