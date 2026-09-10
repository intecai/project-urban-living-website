"use client";

import React from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { ContactHeroData } from "@/types/contact";
import { NavbarData } from "@/types/common";

export interface ContactHeroProps {
  data?: ContactHeroData;
  navbarData?: NavbarData;
}

export default function ContactHero({ data, navbarData }: ContactHeroProps) {
  const heading = data?.heading || "Contact Us";
  const bgImage = data?.bgImage || "/images/contactus/contactHero.png";

  return (
    <section className="relative w-full overflow-hidden min-h-[460px] sm:min-h-[520px] md:min-h-[580px] lg:min-h-[620px] flex flex-col justify-between">
      {/* 1. Single Hero Background Image (starts at top 0 behind Navbar) */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImage}
          alt="Contact Us Hero Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* 2. Navbar Overlay (absolute top-0 overlaying image) */}
      <Navbar variant="translucent" activeLink="Contact Us" data={navbarData} />

      {/* 3. Centered Heading over Image & below Navbar */}
      <div className="relative z-10 flex-1 flex items-center justify-center pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-24 px-4 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-semibold text-[#1D6095] tracking-tight font-montserrat">
          {heading}
        </h1>
      </div>
    </section>
  );
}
