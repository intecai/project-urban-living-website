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
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 justify-between">
          
          {/* Column 1: Logo & Tagline */}
          <div className="lg:col-span-1 flex flex-col space-y-4">
            {/* UL Urban Living Logo */}
            <div className="flex flex-col items-start">
              <Image
                src="/images/common/mainLogo1.png"
                alt="Urban Living Logo"
                width={120}
                height={100}
                className="h-16 w-auto object-contain"
                priority
              />
            </div>

            <p className="text-[#DBDEE3] text-[15px] sm:text-sm leading-relaxed max-w-[260px] font-figtree">
              {brandDescription}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-base font-semibold font-inter text-[#FFFFFF] tracking-tight">
              {data?.quickLinksTitle || "Quick Links"}
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm font-figtree text-[15px] text-[#DBDEE3]">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Rooms */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-base font-semibold font-inter text-[#FFFFFF] tracking-tight">
              Rooms
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm font-figtree text-[15px] text-[#DBDEE3]">
              <li>
                <a href="/rooms?category=single">Single Occupancy</a>
              </li>
              <li>
                <a href="/rooms?category=double">Double Sharing</a>
              </li>
              <li>
                <a href="/rooms?category=triple">Triple Sharing</a>
              </li>
              <li>
                <a href="/rooms">All Rooms</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Amenities */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-base font-inter font-semibold text-[#FFFFFF] tracking-tight">
              Amenities
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm font-figtree text-[15px] text-[#DBDEE3]">
              <li>
                <a href="#furnished">Fully Furnished Rooms</a>
              </li>
              <li>
                <a href="#security">24/7 Security</a>
              </li>
              <li>
                <a href="#wifi">High-Speed Wi-Fi</a>
              </li>
              <li>
                <a href="#housekeeping">Housekeeping</a>
              </li>
              <li>
                <a href="#laundry">Laundry Service</a>
              </li>
              <li>
                <a href="#power-backup">Power Backup</a>
              </li>
            </ul>
          </div>

          {/* Column 5: Contact Us */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-base font-inter font-semibold text-[#FFFFFF] tracking-tight">
              {data?.contactTitle || "Contact Us"}
            </h3>
            <ul className="space-y-3.5 text-xs sm:text-sm font-figtree text-[15px] text-[#DBDEE3]">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#F59E0B] shrink-0" />
                <a
                  href={`tel:${contactPhone.replace(/\s+/g, "")}`}
                  className="hover:text-white transition-colors"
                >
                  {contactPhone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#F59E0B] shrink-0" />
                <a
                  href={`mailto:${contactEmail}`}
                  className="hover:text-white transition-colors break-all"
                >
                  {contactEmail}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
                <span className="leading-snug">
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
