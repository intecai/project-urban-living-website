"use client";

import React from "react";
import Image from "next/image";

export default function FloatingWhatsApp() {
  const whatsappUrl = "https://wa.me/919003079966";

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact us on WhatsApp"
      className="fixed z-50 right-0 bottom-6 md:bottom-auto md:top-1/2 md:-translate-y-1/2 block w-12 h-12 sm:w-14 sm:h-14 transition-all duration-200 ease-in-out hover:-translate-x-1 active:scale-95 drop-shadow-md hover:drop-shadow-xl focus:outline-none focus:ring-2 focus:ring-[#25D366]"
    >
      <Image
        src="/images/rooms/floatingWP.png"
        alt="WhatsApp"
        width={56}
        height={56}
        className="w-full h-full object-contain pointer-events-none"
        priority
      />
    </a>
  );
}
