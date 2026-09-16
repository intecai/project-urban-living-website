"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { HeroSectionData } from "@/types/home";

export interface HeroSectionProps {
  data?: HeroSectionData;
}

export default function HeroSection({ data }: HeroSectionProps) {
  const titleLine1 = data?.titleLine1 || "Designed For Modern";
  const titleLine2 = data?.titleLine2 || "Women";
  const titleAccent = data?.titleAccent || "Home";
  const description =
    data?.description ||
    "Experience safe, comfortable, and affordable living in the heart of Chennai. Designed exclusively for modern women who seek a perfect blend of privacy and community.";
  const primaryCtaText = data?.primaryCtaText || "Explore Rooms";
  const primaryCtaHref = data?.primaryCtaHref || "/rooms";
  const secondaryCtaText = data?.secondaryCtaText || "View Locations";
  const secondaryCtaHref = data?.secondaryCtaHref || "#explore-locations";
  const heroImage = data?.heroImage || "/images/home/homeHero.png";

  return (
    <>
      {/* Mobile layout: stacked image under content */}
      <section className="md:hidden w-full font-figtree py-12">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 w-full">
          <div className="max-w-xl space-y-6 sm:space-y-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#2571A5] tracking-tight leading-[1.15] font-lato">
              {titleLine1} <br />
              <span>{titleLine2}</span>{" "}
              <span
                className="text-[#BF9100] font-brittany text-4xl sm:text-5xl font-normal inline-block ml-2 origin-left"
                style={{ transform: "rotate(-14.56deg)" }}
              >
                {titleAccent}
              </span>
            </h1>
            <p className="text-sm sm:text-base text-[#0A3A5B] font-normal leading-relaxed font-figtree">
              {description}
            </p>
            <div className="flex items-center gap-4 pt-2">
              <Link
                href={primaryCtaHref}
                className="px-7 py-3 sm:py-3.5 bg-[#2571A5] hover:bg-[#00428C] text-[#FFFFFF] text-xs sm:text-sm rounded-full transition-colors shadow-xs cursor-pointer flex items-center justify-center"
              >
                {primaryCtaText}
              </Link>
              <Link
                href={secondaryCtaHref}
                className="px-7 py-3 sm:py-3.5 shadow-2xs text-[#0053B0] bg-[#FFFFFF] backdrop-blur-xs hover:bg-[#0053B0] hover:text-white text-xs sm:text-sm font-semibold rounded-full transition-colors cursor-pointer flex items-center justify-center"
              >
                {secondaryCtaText}
              </Link>
            </div>
          </div>
          <div className="mt-8">
            <Image
              src={heroImage}
              alt="Designed For Modern Women Home"
              width={1200}
              height={800}
              priority
              sizes="100vw"
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>
        </div>
      </section>

      {/* Desktop/tablet: background-image layout (exact original) */}
      <section className="relative w-full overflow-hidden font-figtree py-20 lg:py-28 min-h-[540px] lg:min-h-[620px] hidden md:flex md:items-center">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src={heroImage}
            alt="Designed For Modern Women Home"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/75 to-transparent sm:w-[75%] lg:w-[60%]" />
          <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-28 bg-gradient-to-t from-white via-white/40 to-transparent pointer-events-none z-10" />
        </div>
        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 w-full">
          <div className="max-w-xl space-y-6 sm:space-y-8">
            <h1 className="text-3xl sm:text-4xl lg:text-[48px] font-bold text-[#2571A5] tracking-tight leading-[1.15] font-lato">
              {titleLine1} <br />
              <span>{titleLine2}</span>{" "}
              <span
                className="text-[#BF9100] font-brittany text-4xl sm:text-5xl lg:text-[52px] font-normal inline-block ml-2 origin-left"
                style={{ transform: "rotate(-14.56deg)" }}
              >
                {titleAccent}
              </span>
            </h1>
            <p className="text-sm sm:text-base lg:text-[16px] text-[#0A3A5B] font-normal leading-relaxed font-figtree">
              {description}
            </p>
            <div className="flex items-center gap-4 pt-2">
              <Link
                href={primaryCtaHref}
                className="px-7 py-3 sm:py-3.5 bg-[#2571A5] hover:bg-[#00428C] text-[#FFFFFF] text-xs sm:text-sm text-[11px] rounded-full transition-colors shadow-xs cursor-pointer flex items-center justify-center"
              >
                {primaryCtaText}
              </Link>
              <Link
                href={secondaryCtaHref}
                className="px-7 py-3 sm:py-3.5 shadow-2xs text-[#0053B0] bg-[#FFFFFF] backdrop-blur-xs hover:bg-[#0053B0] hover:text-white text-xs sm:text-sm font-semibold text-[12px] rounded-full transition-colors cursor-pointer flex items-center justify-center"
              >
                {secondaryCtaText}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
