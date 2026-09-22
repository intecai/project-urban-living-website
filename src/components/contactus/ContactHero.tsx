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
  const bgImage = data?.bgImage || "/images/contactus/contactHeroImage.png";

  return (
    <section className="relative w-full overflow-hidden aspect-[1440/627] flex flex-col justify-between bg-[#FAF6EB]">
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
      <Navbar variant="transparent" activeLink="Contact Us" data={navbarData} />

      {/* 3. Centered Heading over Image & below Navbar */}
      <div className="relative z-10 flex-1 flex items-center justify-center pt-14 sm:pt-20 md:pt-24 lg:pt-14 pb-4 sm:pb-8 md:pb-12 px-4 text-center">
        <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-[40px] font-semibold text-[#1D6095] tracking-tight font-montserrat">
          {heading}
        </h1>
      </div>
    </section>
  );
}
