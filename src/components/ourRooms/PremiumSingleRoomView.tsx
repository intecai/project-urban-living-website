"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Home,
  Grid,
  Sparkles,
  ChevronRight,
  Users,
  Navigation,
  Activity,
  Bus,
  Train,
  Car,
  Footprints,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import EnquiryBanner from "@/components/EnquiryBanner";
import Footer from "@/components/Footer";

export interface PremiumSingleRoomViewProps {
  commonData?: any;
}

const galleryImages = [
  {
    id: 1,
    src: "/images/rooms/premium_single_main.png",
    alt: "Premium Single Room Main View",
    title: "Main Room View",
  },
  {
    id: 2,
    src: "/images/rooms/premium_single_bathroom.png",
    alt: "Attached Bathroom View",
    title: "Bathroom View",
  },
  {
    id: 3,
    src: "/images/rooms/premium_single_thumb2.png",
    alt: "Bedroom View Angle 1",
    title: "Bedroom View 1",
  },
  {
    id: 4,
    src: "/images/rooms/premium_single_thumb3.png",
    alt: "Bedroom View Angle 2",
    title: "Bedroom View 2",
  },
];

const roomAmenitiesList = [
  { id: "kitchen", label: "Kitchen", icon: "/images/rooms/Amenities-kitchen.png" },
  { id: "geyser", label: "Geyser", icon: "/images/rooms/Amenities-Geyser.png" },
  { id: "tv", label: "TV", icon: "/images/rooms/Amenities-TV.png" },
  { id: "microwave", label: "Microwave", icon: "/images/rooms/Amenities-Microwave.png" },
  { id: "fireExtinguisher", label: "Fire extinguisher", icon: "/images/rooms/Amenities-FireExtinguisher.png" },
  { id: "washingMachine", label: "Washing Machine", icon: "/images/rooms/Amenities-WashingMachine.png" },
  { id: "acRoom", label: "AC room", icon: "/images/rooms/Amenities-AC.png" },
  { id: "wifi", label: "Wi-Fi", icon: "/images/rooms/Amenities-wifi.png" },
  { id: "digitalLock", label: "Digital Lock", icon: "/images/rooms/Amenities-DigitalLock.png" },
  { id: "cctv", label: "CCTV", icon: "/images/rooms/Amenities-CCTV.png" },
  { id: "kettle", label: "Kettle", icon: "/images/rooms/Amenities-Kettle.png" },
  { id: "inductionStove", label: "Induction stove", icon: "/images/rooms/Amenities-Inductionstov.png" },
  { id: "caretaker", label: "Caretaker", icon: "/images/rooms/Amenities-Caretaker.png" },
];

const whatsIncludedList = [
  {
    id: "room",
    title: "Room",
    desc: "Fully furnished private room with attached bathroom",
    iconImage: "/images/rooms/room-abt.png",
  },
  {
    id: "food",
    title: "Food",
    desc: "Homely food included (Breakfast, Lunch & Dinner)",
    iconImage: "/images/rooms/food-abt.png",
  },
  {
    id: "connectivity",
    title: "Connectivity",
    desc: "High-speed Wi-Fi internet access",
    iconImage: "/images/rooms/connectivity-abt.png",
  },
  {
    id: "utilities",
    title: "Utilities",
    desc: "EB (Electricity) & water supply included",
    iconImage: "/images/rooms/utilities-abt.png",
  },
  {
    id: "commonFacilities",
    title: "Common Facilities",
    desc: "Access to all shared amenities and common areas",
    iconImage: "/images/rooms/connectionFacilities-abt.png",
  },
];

const whatsNearbyList = [
  {
    id: "1",
    name: "Shine Sports Academy",
    time: "3 min",
    leftIcon: MapPin,
    modeIcon: Footprints,
  },
  {
    id: "2",
    name: "Sunshine Badminton Academy",
    time: "4 min",
    leftIcon: MapPin,
    modeIcon: Footprints,
  },
  {
    id: "3",
    name: "Kovai Medical Center & Hospital",
    time: "7 min",
    leftIcon: MapPin,
    modeIcon: Car,
  },
  {
    id: "4",
    name: "Peelamedu Bus Stand",
    time: "12 min",
    leftIcon: Bus,
    modeIcon: Bus,
  },
  {
    id: "5",
    name: "Coimbatore Railway Station",
    time: "15 min",
    leftIcon: Train,
    modeIcon: Train,
  },
];

export default function PremiumSingleRoomView({ commonData }: PremiumSingleRoomViewProps) {
  const [selectedImage, setSelectedImage] = useState(galleryImages[0]);

  const handleEnquireScroll = () => {
    const banner = document.getElementById("enquiry-section");
    if (banner) {
      banner.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#FAFCFF] font-figtree text-slate-900">
      {/* 1. TOP NAVBAR */}
      <Navbar variant="solid" activeLink="Our Rooms" data={commonData?.navbar} />

      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 md:px-12 lg:px-16 py-6 sm:py-10 space-y-8">
        
        {/* 2. BREADCRUMBS */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-[#6B7280] font-medium">
          <Link href="/" className="hover:text-[#02569B] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#6B7280]" />
          <Link href="/rooms" className="hover:text-[#02569B] transition-colors">
            Rooms
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#111827]" />
          <span className="text-[#111827] font-medium font-figtree">Premium Single Room</span>
        </nav>

        {/* 3. UPPER 2-COLUMN LAYOUT MATCHING FIGMA TOP ALIGNMENT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT COLUMN (7 Cols): Gallery, About This Room, What's Included */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Main Featured Image Box */}
            <div className="space-y-4">
              <div className="relative w-full aspect-[16/11] sm:h-[430px] rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-100 shadow-xs border border-slate-200">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover transition-all duration-300"
                />

                {/* Most Popular Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-block px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-full text-white bg-[#0E1C36]/90 backdrop-blur-md border border-white/20 shadow-md">
                    Most Popular
                  </span>
                </div>
              </div>

              {/* 3 Thumbnails Directly Below Main Image */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {galleryImages.slice(1, 4).map((img) => {
                  const isSelected = selectedImage.id === img.id;
                  return (
                    <button
                      key={img.id}
                      type="button"
                      onClick={() => setSelectedImage(img)}
                      className={`relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 border-2 transition-all cursor-pointer ${
                        isSelected
                          ? "border-[#02569B] ring-2 ring-[#02569B]/20 scale-[1.02]"
                          : "border-transparent opacity-80 hover:opacity-100 hover:border-slate-300"
                      }`}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(max-width: 768px) 33vw, 20vw"
                        className="object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* About This Room Card */}
            <div className="bg-white border border-[#E2E8F0] rounded-2xl sm:rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xs">
              <div className="flex items-center gap-2.5 text-xl sm:text-2xl font-semibold text-[#111827] font-figtree">
                <Home className="w-5 h-5 text-[#02569B]" />
                <h2>About This Room</h2>
              </div>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                A comfortable private space designed for your privacy and convenience. This fully furnished single room comes with an attached bathroom and all essential amenities for a peaceful and hassle-free stay.
              </p>

              {/* Checkmarks Checklist */}
              <div className="pt-2 space-y-3">
                <div className="flex items-center gap-3 text-sm sm:text-base text-slate-700 font-medium">
                  <Image
                    src="/images/rooms/checkmark.png"
                    alt="Checkmark"
                    width={20}
                    height={20}
                    className="w-5 h-5 object-contain shrink-0"
                  />
                  <span>Ideal for students and working professionals</span>
                </div>
                <div className="flex items-center gap-3 text-sm sm:text-base text-slate-700 font-medium">
                  <Image
                    src="/images/rooms/checkmark.png"
                    alt="Checkmark"
                    width={20}
                    height={20}
                    className="w-5 h-5 object-contain shrink-0"
                  />
                  <span>Well-ventilated with natural light</span>
                </div>
                <div className="flex items-center gap-3 text-sm sm:text-base text-slate-700 font-medium">
                  <Image
                    src="/images/rooms/checkmark.png"
                    alt="Checkmark"
                    width={20}
                    height={20}
                    className="w-5 h-5 object-contain shrink-0"
                  />
                  <span>Regular housekeeping & laundry facility</span>
                </div>
                <div className="flex items-center gap-3 text-sm sm:text-base text-slate-700 font-medium">
                  <Image
                    src="/images/rooms/checkmark.png"
                    alt="Checkmark"
                    width={20}
                    height={20}
                    className="w-5 h-5 object-contain shrink-0"
                  />
                  <span>Access to all common PG amenities</span>
                </div>
              </div>
            </div>

            {/* What's Included Card (5 Vertical Items in a Row) */}
            <div className="bg-white border border-[#E2E8F0] rounded-2xl sm:rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xs">
              <div className="flex items-center gap-2.5 text-xl sm:text-2xl font-bold text-[#011A2A]">
                <Users className="w-5 h-5 text-[#02569B]" />
                <h2>What's Included</h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
                {whatsIncludedList.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-100 flex flex-col items-center text-center space-y-2.5 justify-between h-full group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#E0F2FE] flex items-center justify-center shrink-0 p-2 group-hover:scale-105 transition-transform">
                        <Image
                          src={item.iconImage}
                          alt={item.title}
                          width={24}
                          height={24}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="space-y-1">
                        <span className="text-sm font-semibold text-[#011A2A] block leading-tight">
                          {item.title}
                        </span>
                        <span className="text-[11px] sm:text-xs text-slate-500 leading-snug block">
                          {item.desc}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN (5 Cols): Room Info, Amenities */}
          <div className="lg:col-span-5 space-y-6 lg:pl-2">
            
            {/* Header Title Info Block */}
            <div className="space-y-3">
              <span className="inline-block text-xs sm:text-sm font-medium font-figtree uppercase tracking-wider text-[#2571A5]">
                URBAN LIVING • RAMAPURAM
              </span>
              <h1 className="text-3xl sm:text-4xl font-medium text-[#111827] tracking-tight leading-tight">
                Premium Single Room
              </h1>
              <div className="flex items-center gap-1.5 text-xs sm:text-sm text-[#6B7280] font-figtree">
                <Image
                  src="/images/rooms/location-premium.png"
                  alt="Location Pin"
                  width={16}
                  height={16}
                  className="w-4 h-4 object-contain"
                />
                <span>Ramapuram, Chennai</span>
              </div>

              {/* Feature Tags Individual Pill Badges */}
              <div className="pt-2">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="inline-flex items-center gap-2.5 px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-full text-xs sm:text-sm font-medium text-[#111827] shadow-2xs">
                    <Image
                      src="/images/rooms/singleoccupancy-premium.png"
                      alt="Single Occupancy"
                      width={18}
                      height={18}
                      className="w-4 h-4 object-contain"
                    />
                    <span>Single Occupancy</span>
                  </div>

                  <div className="inline-flex items-center gap-2.5 px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-full text-xs sm:text-sm font-medium text-[#111827] shadow-2xs">
                    <Image
                      src="/images/rooms/fullyfurnished-premium.png"
                      alt="Fully Furnished"
                      width={18}
                      height={18}
                      className="w-4 h-4 object-contain"
                    />
                    <span>Fully Furnished</span>
                  </div>

                  <div className="inline-flex items-center gap-2.5 px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-full text-xs sm:text-sm font-medium text-[#111827] shadow-2xs">
                    <Image
                      src="/images/rooms/attachedbathroom-premium.png"
                      alt="Attached Bathroom"
                      width={18}
                      height={18}
                      className="w-4 h-4 object-contain"
                    />
                    <span>Attached Bathroom</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing Block */}
            <div className="pt-2 space-y-1">
              <div className="flex items-baseline gap-2.5 flex-wrap">
                <span className="text-xl sm:text-2xl text-[#6C6F73] font-normal font-figtree">
                  Starting From
                </span>
                <span className="text-3xl sm:text-4xl lg:text-[37px] font-bold text-[#2571A5] font-figtree leading-none">
                  ₹8,500
                </span>
                <span className="text-base sm:text-xl text-[#6B7280] font-normal font-figtree">
                  / month
                </span>
              </div>
              <span className="text-sm sm:text-base text-[#6B7280] font-normal font-figtree block pt-0.5">
                Food Included
              </span>
            </div>

            {/* Enquire CTA Button */}
            <button
              type="button"
              onClick={handleEnquireScroll}
              className="w-full bg-[#2571A5] hover:bg-[#02569B] text-white py-4 px-6 rounded-[16px] font-medium text-base sm:text-lg shadow-xs transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-3 cursor-pointer"
            >
              <svg className="w-5 h-5 fill-current text-white shrink-0" viewBox="0 0 24 24">
                <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.762.459 3.48 1.332 5.001L2 22l5.12-1.335c1.472.802 3.136 1.224 4.887 1.225h.005c5.505 0 9.988-4.478 9.989-9.984 0-2.668-1.037-5.176-2.926-7.065A9.923 9.923 0 0 0 12.012 2zm0 18.318h-.004a8.27 8.27 0 0 1-4.22-1.164l-.303-.18-3.134.818.835-3.048-.198-.314a8.27 8.27 0 0 1-1.267-4.444c0-4.561 3.712-8.272 8.275-8.272 2.21 0 4.288.862 5.85 2.426a8.226 8.226 0 0 1 2.424 5.852c0 4.562-3.713 8.274-8.275 8.274z" />
                <path d="M16.85 14.37c-.267-.134-1.578-.779-1.823-.868-.245-.089-.423-.134-.601.134-.178.267-.69.868-.846 1.046-.156.178-.312.2-.579.067-.267-.134-1.129-.416-2.15-1.327-.795-.709-1.332-1.584-1.488-1.851-.156-.267-.017-.412.117-.545.12-.12.267-.312.401-.468.134-.156.178-.267.267-.446.089-.178.045-.334-.022-.468-.067-.134-.601-1.448-.824-1.983-.217-.522-.438-.451-.601-.459-.156-.008-.334-.008-.512-.008s-.468.067-.713.334c-.245.267-.935.913-.935 2.227 0 1.314.957 2.584 1.09 2.762.134.178 1.884 2.877 4.564 4.034.638.276 1.136.441 1.525.565.64.204 1.222.175 1.682.106.513-.077 1.578-.646 1.801-1.27.223-.624.223-1.159.156-1.27-.067-.111-.245-.178-.512-.312z" />
              </svg>
              <span>Enquire About This Room</span>
            </button>

            {/* Room Amenities Sidebar Card */}
            <div className="bg-white border border-[#E2E8F0] rounded-2xl sm:rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xs">
              
              {/* Header */}
              <div className="flex items-center gap-2.5 text-xl sm:text-2xl font-bold text-[#011A2A]">
                <Sparkles className="w-5 h-5 text-[#02569B]" />
                <h2>Room Amenities</h2>
              </div>

              {/* List of Amenities with Golden Outline Icons */}
              <div className="space-y-4 pt-1">
                {roomAmenitiesList.map((amenity) => (
                  <div
                    key={amenity.id}
                    className="flex items-center gap-3.5 text-sm sm:text-base text-slate-700 font-medium group"
                  >
                    <div className="w-9 h-9 flex items-center justify-center shrink-0 p-1.5 group-hover:scale-105 transition-transform">
                      <Image
                        src={amenity.icon}
                        alt={amenity.label}
                        width={24}
                        height={24}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span>{amenity.label}</span>
                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>

        {/* 4. LOWER 2-COLUMN LAYOUT MATCHING FIGMA START & END BOUNDS EXACTLY */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch pt-2">
          
          {/* LEFT: Location Card (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="bg-white border border-[#E2E8F0] rounded-2xl sm:rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xs h-full flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2.5 text-xl sm:text-2xl font-bold text-[#011A2A]">
                  <MapPin className="w-5 h-5 text-[#02569B]" />
                  <h2>Location</h2>
                </div>

                <div className="space-y-1">
                  <h3 className="text-base sm:text-lg font-semibold text-[#011A2A] font-figtree">
                    Urban Living - Ramapuram
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6B7280] font-normal font-figtree">
                    Chennai
                  </p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#2571A5] hover:underline pt-1 font-figtree"
                  >
                    <span>View on Google Maps</span>
                    <Image
                      src="/images/rooms/rightarrow.png"
                      alt="Arrow Right"
                      width={14}
                      height={14}
                      className="w-3.5 h-3.5 object-contain"
                    />
                  </a>
                </div>
              </div>

              {/* Map Preview Image */}
              <div className="relative w-full h-[220px] sm:h-[260px] rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 mt-4 flex-1">
                <Image
                  src="/images/rooms/urbanlivingMap.png"
                  alt="Urban Living Ramapuram Map Location"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* RIGHT: What's Nearby Card (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="bg-white border border-[#E2E8F0] rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xs h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 text-xl sm:text-2xl font-bold text-[#011A2A] mb-4">
                  <MapPin className="w-5 h-5 text-[#02569B]" />
                  <h2>What's Nearby</h2>
                </div>

                <div className="divide-y divide-slate-100">
                  {whatsNearbyList.map((item) => {
                    const LeftIcon = item.leftIcon;
                    const ModeIcon = item.modeIcon;
                    return (
                      <div
                        key={item.id}
                        className="flex items-center justify-between text-xs sm:text-sm py-3.5 first:pt-1 last:pb-0"
                      >
                        <div className="flex items-center gap-3">
                          <LeftIcon className="w-4 h-4 text-slate-400 shrink-0" />
                          <span className="text-[#111827] font-medium font-figtree">{item.name}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[#6B7280] text-xs shrink-0 font-normal font-figtree">
                          <ModeIcon className="w-3.5 h-3.5 text-slate-400" />
                          <span>{item.time}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

        </div>

      </main>

      {/* 5. ENQUIRY BANNER & FOOTER */}
      <div id="enquiry-section">
        <EnquiryBanner data={commonData?.enquiryBanner} />
      </div>
      <Footer data={commonData?.footer} />
    </div>
  );
}
