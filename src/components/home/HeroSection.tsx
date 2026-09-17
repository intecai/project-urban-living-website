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
  const secondaryCtaHref = data?.secondaryCtaHref || "/locations";
  const heroImage = data?.heroImage || "/images/home/homeHero.png";

  return (
    <>
      {/* Mobile layout: stacked image under content matching Figma */}
      <section className="md:hidden w-full font-figtree pt-20 sm:pt-24 pb-10 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 w-full space-y-6 sm:space-y-8">
          <div className="max-w-xl space-y-4 sm:space-y-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#2571A5] tracking-tight leading-[1.15] font-lato">
              {titleLine1} <br />
              <span>{titleLine2}</span>{" "}
              <span
                className="text-[#BF9100] font-brittany text-4xl sm:text-5xl font-normal inline-block ml-1 origin-left"
                style={{ transform: "rotate(-14.56deg)" }}
              >
                {titleAccent}
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-[#0A3A5B] font-normal leading-relaxed font-figtree">
              {description}
            </p>
            <div className="flex items-center gap-3 sm:gap-4 pt-1">
              <Link
                href={primaryCtaHref}
                className="px-5 sm:px-7 py-2.5 sm:py-3 bg-[#2571A5] hover:bg-[#00428C] text-[#FFFFFF] text-xs sm:text-sm font-medium rounded-full transition-colors shadow-xs cursor-pointer flex items-center justify-center"
              >
                {primaryCtaText}
              </Link>
              <Link
                href={secondaryCtaHref}
                className="px-5 sm:px-7 py-2.5 sm:py-3 shadow-2xs text-[#0053B0] bg-[#FFFFFF] border border-[#E2E8F0] hover:bg-[#0053B0] hover:text-white text-xs sm:text-sm font-semibold rounded-full transition-colors cursor-pointer flex items-center justify-center"
              >
                {secondaryCtaText}
              </Link>
            </div>
          </div>

          {/* Hero Image Container matching Figma mobile vertical view */}
          <div className="relative w-full aspect-[4/5] sm:h-[480px] rounded-2xl overflow-hidden shadow-xs border border-slate-100">
            <Image
              src={heroImage}
              alt="Designed For Modern Women Home"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* Desktop/tablet: background-image layout (exact original Figma Landing page 1) */}
      <section className="relative w-full overflow-hidden font-figtree py-16 md:py-20 lg:py-28 min-h-[480px] md:min-h-[520px] lg:min-h-[600px] hidden md:flex md:items-center">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src={heroImage}
            alt="Designed For Modern Women Home"
            fill
            priority
            sizes="100vw"
            className="object-cover object-right"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent w-full md:w-[65%] lg:w-[55%]" />
          <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-28 bg-gradient-to-t from-white via-white/40 to-transparent pointer-events-none z-10" />
        </div>
        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 w-full">
          <div className="max-w-[340px] md:max-w-[360px] lg:max-w-[480px] xl:max-w-xl space-y-4 md:space-y-6 sm:space-y-8">
            <h1 className="text-3xl md:text-3xl lg:text-[42px] xl:text-[48px] font-bold text-[#2571A5] tracking-tight leading-[1.15] font-lato">
              {titleLine1} <br />
              <span>{titleLine2}</span>{" "}
              <span
                className="text-[#BF9100] font-brittany text-4xl md:text-4xl lg:text-[48px] xl:text-[52px] font-normal inline-block ml-2 origin-left"
                style={{ transform: "rotate(-14.56deg)" }}
              >
                {titleAccent}
              </span>
            </h1>
            <p className="text-xs md:text-xs lg:text-sm xl:text-[16px] text-[#0A3A5B] font-normal leading-relaxed font-figtree">
              {description}
            </p>
            <div className="flex items-center gap-3 sm:gap-4 pt-1 sm:pt-2">
              <Link
                href={primaryCtaHref}
                className="px-5 sm:px-7 py-2.5 sm:py-3.5 bg-[#2571A5] hover:bg-[#00428C] text-[#FFFFFF] text-xs sm:text-sm rounded-full transition-colors shadow-xs cursor-pointer flex items-center justify-center"
              >
                {primaryCtaText}
              </Link>
              <Link
                href={secondaryCtaHref}
                className="px-5 sm:px-7 py-2.5 sm:py-3.5 shadow-2xs text-[#0053B0] bg-[#FFFFFF] backdrop-blur-xs hover:bg-[#0053B0] hover:text-white text-xs sm:text-sm font-semibold rounded-full transition-colors cursor-pointer flex items-center justify-center"
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
