"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  X,
  Check,
  RotateCcw,
  Wifi,
  SunMedium,
  Utensils,
  Shirt,
  Sparkles,
  Car,
  Zap,
} from "lucide-react";
import { FilterState, RoomCategory } from "./types";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onApply: (newFilters: FilterState) => void;
  onReset: () => void;
}

const MIN_LIMIT = 5000;
const MAX_LIMIT = 12000;
const STEP = 500;

const roomTypeOptions: { label: string; value: RoomCategory; icon: string }[] = [
  { label: "All Rooms", value: "all", icon: "/images/rooms/AllRooms.png" },
  { label: "Single Room", value: "single", icon: "/images/rooms/SingRooms.png" },
  { label: "Double Sharing", value: "double", icon: "/images/rooms/DoubleRooms.png" },
  { label: "Triple Sharing", value: "triple", icon: "/images/rooms/TripleRooms.png" },
  { label: "Private Room", value: "private", icon: "/images/rooms/PrivateRooms.png" },
];

const amenityOptions = [
  { key: "wifi", label: "Wi-Fi", icon: Wifi },
  { key: "ac", label: "AC", icon: SunMedium },
  { key: "food", label: "Food", icon: Utensils },
  { key: "laundry", label: "Laundry", icon: Shirt },
  { key: "housekeeping", label: "Housekeeping", icon: Sparkles },
  { key: "parking", label: "Parking", icon: Car },
  { key: "powerBackup", label: "Power Backup", icon: Zap },
] as const;

export default function FilterModal({
  isOpen,
  onClose,
  filters,
  onApply,
  onReset,
}: FilterModalProps) {
  const [localFilters, setLocalFilters] = useState<FilterState>(filters);

  useEffect(() => {
    // If opening with wide default bounds, set initial range to ₹6,000 – ₹8,000 matching Figma
    if (filters.minPrice <= 5000 && filters.maxPrice >= 20000) {
      setLocalFilters({
        ...filters,
        minPrice: 6000,
        maxPrice: 8000,
      });
    } else {
      setLocalFilters(filters);
    }
  }, [filters, isOpen]);

  if (!isOpen) return null;

  const minVal = Math.max(MIN_LIMIT, Math.min(localFilters.minPrice, MAX_LIMIT));
  const maxVal = Math.max(MIN_LIMIT, Math.min(localFilters.maxPrice, MAX_LIMIT));

  const minPercent = Math.min(
    100,
    Math.max(0, Math.round(((minVal - MIN_LIMIT) / (MAX_LIMIT - MIN_LIMIT)) * 100))
  );
  const maxPercent = Math.min(
    100,
    Math.max(0, Math.round(((maxVal - MIN_LIMIT) / (MAX_LIMIT - MIN_LIMIT)) * 100))
  );
  const centerPercent = (minPercent + maxPercent) / 2;

  const handleMinSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxVal - STEP);
    setLocalFilters((prev) => ({ ...prev, minPrice: value }));
  };

  const handleMaxSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minVal + STEP);
    setLocalFilters((prev) => ({ ...prev, maxPrice: value }));
  };

  const toggleAmenity = (key: keyof FilterState["amenities"]) => {
    setLocalFilters({
      ...localFilters,
      amenities: {
        ...localFilters.amenities,
        [key]: !localFilters.amenities[key],
      },
    });
  };

  const handleApply = () => {
    onApply(localFilters);
    onClose();
  };

  const handleReset = () => {
    const resetState: FilterState = {
      category: "all",
      locations: [],
      minPrice: 5000,
      maxPrice: 12000,
      amenities: {
        wifi: false,
        ac: false,
        food: false,
        laundry: false,
        housekeeping: false,
        parking: false,
        powerBackup: false,
      },
      availableOnly: false,
    };
    setLocalFilters(resetState);
    onReset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#021521]/60 backdrop-blur-xs p-4 overflow-y-auto font-figtree">
      <style>{`
        .dual-range-slider input[type="range"]::-webkit-slider-thumb {
          pointer-events: auto;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: #0A3A5B;
          border: 3px solid #FFFFFF;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
          cursor: pointer;
          -webkit-appearance: none;
          margin-top: -7px;
        }
        .dual-range-slider input[type="range"]::-moz-range-thumb {
          pointer-events: auto;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: #0A3A5B;
          border: 3px solid #FFFFFF;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
          cursor: pointer;
        }
      `}</style>

      <div className="bg-white w-full max-w-2xl rounded-[24px] shadow-2xl border border-slate-100 overflow-hidden p-6 sm:p-8 flex flex-col space-y-6 relative animate-in fade-in zoom-in duration-200">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div>
          <h2 className="text-2xl font-bold text-[#0B3558] tracking-tight">
            Filters
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">
            Refine your search to find the perfect room for you.
          </p>
        </div>

        {/* Section 1: Room Type */}
        <div>
          <h3 className="text-sm font-bold text-[#0B3558] tracking-tight">
            Room Type
          </h3>
          <p className="text-xs text-slate-400 font-normal mb-3">
            Choose the type of room you are looking for.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {roomTypeOptions.map((cat) => {
              const isSelected = localFilters.category === cat.value;

              return (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() =>
                    setLocalFilters({ ...localFilters, category: cat.value })
                  }
                  className={`relative flex flex-col items-center justify-center p-3 sm:p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#0B3558] text-white border-[#0B3558] shadow-xs"
                      : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div
                    className={`absolute top-2 right-2 w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                      isSelected
                        ? "bg-white text-[#0B3558] border-white"
                        : "border-slate-300 bg-white"
                    }`}
                  >
                    {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </div>

                  <Image
                    src={cat.icon}
                    alt={cat.label}
                    width={20}
                    height={20}
                    className={`w-5 h-5 mb-1.5 object-contain ${
                      isSelected ? "brightness-0 invert" : ""
                    }`}
                  />
                  <span className="text-[11px] sm:text-xs font-semibold whitespace-nowrap">
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 2: Monthly Budget (Two-Handle Dual Range Slider) */}
        <div>
          <h3 className="text-sm font-bold text-[#0B3558] tracking-tight">
            Monthly Budget
          </h3>
          <p className="text-xs text-slate-400 font-normal mb-6">
            Select your preferred monthly rent range.
          </p>

          <div className="relative pt-6 pb-2 px-1 dual-range-slider">
            {/* Floating Selected Range Badge */}
            <div
              className="absolute -top-1 transform -translate-x-1/2 transition-all duration-75 pointer-events-none"
              style={{ left: `${centerPercent}%` }}
            >
              <span className="bg-[#DBEAFE] text-xs font-bold px-3.5 py-1 rounded-full shadow-xs whitespace-nowrap">
                ₹{minVal.toLocaleString("en-IN")} – ₹
                {maxVal.toLocaleString("en-IN")}
              </span>
            </div>

            {/* Range Track Container */}
            <div className="relative w-full h-1.5 mt-3">
              {/* Light Gray Base Track */}
              <div className="absolute inset-0 bg-slate-200 rounded-full" />

              {/* Dark Blue Active Range Highlight */}
              <div
                className="absolute top-0 bottom-0 bg-[#0A3A5B] rounded-full transition-all duration-75"
                style={{
                  left: `${minPercent}%`,
                  width: `${maxPercent - minPercent}%`,
                }}
              />

              {/* Input 1: Min Price Knob */}
              <input
                type="range"
                min={MIN_LIMIT}
                max={MAX_LIMIT}
                step={STEP}
                value={minVal}
                onChange={handleMinSliderChange}
                className="absolute inset-0 w-full h-1.5 opacity-100 bg-transparent appearance-none pointer-events-none z-30"
              />

              {/* Input 2: Max Price Knob */}
              <input
                type="range"
                min={MIN_LIMIT}
                max={MAX_LIMIT}
                step={STEP}
                value={maxVal}
                onChange={handleMaxSliderChange}
                className="absolute inset-0 w-full h-1.5 opacity-100 bg-transparent appearance-none pointer-events-none z-40"
              />
            </div>

            {/* Boundary Labels */}
            <div className="flex justify-between text-xs text-slate-500 font-medium mt-3">
              <span>₹5,000</span>
              <span>₹12,000</span>
            </div>
          </div>
        </div>

        {/* Section 3: Amenities */}
        <div>
          <h3 className="text-sm font-bold text-[#0B3558] tracking-tight">
            Amenities
          </h3>
          <p className="text-xs text-slate-400 font-normal mb-3">
            Select the amenities that are important to you.
          </p>

          <div className="grid grid-cols-3 sm:grid-cols-7 gap-2">
            {amenityOptions.map((item) => {
              const Icon = item.icon;
              const isChecked = localFilters.amenities[item.key];

              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => toggleAmenity(item.key)}
                  className={`relative flex flex-col items-center justify-center p-3 rounded-2xl border transition-all cursor-pointer ${
                    isChecked
                      ? "border-[#0B3558] bg-blue-50/50 text-[#0B3558] shadow-2xs font-semibold"
                      : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div
                    className={`absolute top-2 right-2 w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-colors ${
                      isChecked
                        ? "bg-[#0B3558] text-white border-[#0B3558]"
                        : "border-slate-300 bg-white"
                    }`}
                  >
                    {isChecked && <Check className="w-2 h-2 stroke-[3]" />}
                  </div>

                  <Icon
                    className={`w-4 h-4 mb-1.5 ${
                      isChecked ? "text-[#0B3558]" : "text-slate-600"
                    }`}
                  />
                  <span className="text-[10px] sm:text-[11px] font-medium text-center leading-tight">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#0B3558] hover:text-[#2563EB] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear All</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full text-xs font-semibold text-slate-600 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="bg-[#0B3558] hover:bg-[#082842] text-white px-6 py-2.5 rounded-full text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
