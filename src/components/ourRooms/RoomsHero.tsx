"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

export default function RoomsHero() {
  return (
    <section className="relative w-full bg-[#F8FAFC] overflow-hidden min-h-[260px] sm:min-h-[320px] md:min-h-[380px] lg:min-h-[440px] flex items-center">
      {/* Background Image Banner */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/rooms/OurRoomsHero.png"
          alt="Our Rooms Hero Banner"
          fill
          priority
          className="object-cover object-right select-none"
        />
        {/* Soft overlay gradient for responsive text readability on mobile/tablet */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 sm:via-white/70 to-transparent z-1 pointer-events-none w-full md:w-3/4 lg:w-3/5" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 w-full pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-10 lg:pb-14">
        <div className="max-w-lg lg:max-w-xl">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-[#011A2A] font-manrope font-medium mb-3 sm:mb-4">
            <Link href="/" className="hover:text-[#1F2937] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#9CA3AF]" />
            <span className="text-[#9A9EA1] font-normal">Rooms</span>
          </nav>

          {/* Main Hero Headline */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] xl:text-[52px] text-[#000000] font-Plus_Jakarta_Sans tracking-tight leading-[1.15] mb-3 sm:mb-4 font-medium">
            Our Rooms
          </h1>

          {/* Subtitle Description */}
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-[#0A3A5B] font-Plus_Jakarta_Sans font-normal leading-relaxed max-w-md sm:max-w-lg">
            Choose From Premium, fully furnished rooms across Chennai. Safe, Comfortable and designed for your Lifestyle.
          </p>
        </div>
      </div>
    </section>
  );
}
