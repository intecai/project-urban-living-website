"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { fetchApi } from "@/utils/apiClient";

export default function FloatingWhatsApp() {
  const [whatsappUrl, setWhatsappUrl] = useState("https://wa.me/919003079966");

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetchApi<any>('/settings');
        const data = res?.data || res?.value || (res && typeof res === 'object' && 'whatsappNumber' in res ? res : null);
        if (data && data.whatsappNumber) {
          const num = data.whatsappNumber.replace(/[^0-9]/g, '');
          if (num) {
            setWhatsappUrl(`https://wa.me/${num}`);
          }
        }
      } catch (e) {
        console.error("Failed to load whatsapp settings", e);
      }
    }
    loadSettings();
  }, []);

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
