"use client";

import React from "react";

export interface FloorSelectorProps {
  floors: { id: string; label: string; detailsLabel: string }[];
  selectedFloorId: string;
  onSelectFloor: (id: string) => void;
}

export default function FloorSelector({
  floors,
  selectedFloorId,
  onSelectFloor,
}: FloorSelectorProps) {
  const currentFloor = floors.find((f) => f.id === selectedFloorId) || floors[0];

  return (
    <div className="w-full bg-white rounded-[10px] border border-[#E5E7EB] px-4 py-3 sm:px-5 sm:py-3.5 font-Plus_Jakarta_Sans">
      {/* First Row: Label + Horizontally Aligned Compact Pill Buttons */}
      <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
        <span className="text-[12px] sm:text-[13px] font-medium text-[#374151] mr-1">
          Select Floor / Area
        </span>

        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {floors.map((floor) => {
            const isActive = floor.id === selectedFloorId;
            return (
              <button
                key={floor.id}
                type="button"
                onClick={() => onSelectFloor(floor.id)}
                className={`px-3 py-1 sm:px-3.5 sm:py-1 rounded-full text-[11px] sm:text-[12px] font-medium transition-colors duration-150 cursor-pointer ${
                  isActive
                    ? "bg-[#0053B0] border border-[#0053B0] text-white"
                    : "bg-white text-[#374151] border border-[#E5E7EB] hover:border-[#0053B0] hover:text-[#0053B0]"
                }`}
              >
                {floor.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Second Row: Small Green Indicator + Compact Status Text */}
      <div className="flex items-center gap-1.5 mt-2 sm:mt-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] inline-block shrink-0" />
          <span className="text-[11px] sm:text-[12px] text-[#6B7280] font-normal font-Plus_Jakarta_Sans">
            Showing details for {currentFloor.detailsLabel}
          </span>
        </div>
    </div>
  );
}
