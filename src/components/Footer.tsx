import React from "react";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import { FooterData } from "@/types/common";

export interface FooterProps {
  data?: FooterData;
}

export default function Footer({ data }: FooterProps) {
  const brandDescription =
    data?.brandDescription ||
    "Providing safe, comfortable and affordable living spaces for working women in the heart of Chennai.";
  const quickLinks = data?.quickLinks || [
    { label: "Home", href: "/" },
    { label: "Our Rooms", href: "/rooms" },
    { label: "Locations", href: "/locations" },
    { label: "Contact Us", href: "/contact" },
  ];
  const contactPhone = data?.contactInfo?.phone || "+91 98765 43210";
  const contactEmail = data?.contactInfo?.email || "info@urbanlivingpg.com";
  const contactAddress =
    data?.contactInfo?.address ||
    "No. 45, 2nd Street, Anna Nagar West, Chennai - 600040, Tamil Nadu, India";
  const copyrightText =
    data?.copyrightText || "© 2026 Urban Living. All rights reserved.";

  return (
    <footer className="w-full bg-[#011A2A]">
      {/* Main Footer Content */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pt-12 sm:pt-16 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-8 justify-between">
          
          {/* Column 1: Logo & Tagline */}
          <div className="col-span-2 lg:col-span-1 flex flex-col space-y-3 sm:space-y-4 mb-2 lg:mb-0">
            {/* UL Urban Living Logo */}
            <div className="flex flex-col items-start">
              <Image
                src="/images/common/mainLogo1.png"
                alt="Urban Living Logo"
                width={120}
                height={100}
                className="h-14 sm:h-16 w-auto object-contain"
                priority
              />
            </div>

            <p className="text-[#94A3B8] text-xs sm:text-sm leading-relaxed max-w-sm lg:max-w-[260px] font-figtree">
              {brandDescription}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col space-y-3 sm:space-y-4">
            <h3 className="text-sm sm:text-base font-semibold font-inter text-[#FFFFFF] tracking-tight">
              {data?.quickLinksTitle || "Quick Links"}
            </h3>
            <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm font-figtree text-[#DBDEE3]">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-white transition-colors">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Rooms */}
          <div className="flex flex-col space-y-3 sm:space-y-4">
            <h3 className="text-sm sm:text-base font-semibold font-inter text-[#FFFFFF] tracking-tight">
              Rooms
            </h3>
            <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm font-figtree text-[#DBDEE3]">
              <li>
                <a href="/rooms?category=single" className="hover:text-white transition-colors">Single Occupancy</a>
              </li>
              <li>
                <a href="/rooms?category=double" className="hover:text-white transition-colors">Double Sharing</a>
              </li>
              <li>
                <a href="/rooms?category=triple" className="hover:text-white transition-colors">Triple Sharing</a>
              </li>
              <li>
                <a href="/rooms" className="hover:text-white transition-colors">All Rooms</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Amenities */}
          <div className="flex flex-col space-y-3 sm:space-y-4">
            <h3 className="text-sm sm:text-base font-inter font-semibold text-[#FFFFFF] tracking-tight">
              Amenities
            </h3>
            <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm font-figtree text-[#DBDEE3]">
              <li>
                <a href="#furnished" className="hover:text-white transition-colors">Fully Furnished Rooms</a>
              </li>
              <li>
                <a href="#security" className="hover:text-white transition-colors">24/7 Security</a>
              </li>
              <li>
                <a href="#wifi" className="hover:text-white transition-colors">High-Speed Wi-Fi</a>
              </li>
              <li>
                <a href="#housekeeping" className="hover:text-white transition-colors">Housekeeping</a>
              </li>
              <li>
                <a href="#laundry" className="hover:text-white transition-colors">Laundry Service</a>
              </li>
              <li>
                <a href="#power-backup" className="hover:text-white transition-colors">Power Backup</a>
              </li>
            </ul>
          </div>

          {/* Column 5: Contact Us */}
          <div className="flex flex-col space-y-3 sm:space-y-4">
            <h3 className="text-sm sm:text-base font-inter font-semibold text-[#FFFFFF] tracking-tight">
              {data?.contactTitle || "Contact Us"}
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm font-figtree text-[#DBDEE3]">
              <li className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F59E0B] shrink-0" />
                <a
                  href={`tel:${contactPhone.replace(/\s+/g, "")}`}
                  className="hover:text-white transition-colors"
                >
                  {contactPhone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F59E0B] shrink-0" />
                <a
                  href={`mailto:${contactEmail}`}
                  className="hover:text-white transition-colors break-all text-[11px] sm:text-xs"
                >
                  {contactEmail}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F59E0B] shrink-0 mt-0.5" />
                <span className="leading-tight text-[11px] sm:text-xs">
                  {contactAddress}
                </span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Full-Width Divider Line */}
      <div className="w-full border-t border-[#1E293B]" />

      {/* Bottom Bar Container */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B7280]">
        <p>{copyrightText}</p>
        <div className="flex items-center space-x-6 text-[13px]">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms & Conditions</a>
        </div>
      </div>
    </footer>
  );
}
