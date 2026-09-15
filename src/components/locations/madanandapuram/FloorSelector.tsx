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
    <div className="w-full space-y-3 font-Plus_Jakarta_Sans">
      {/* Floor Filter Bar */}
      <div className="flex flex-wrap items-center gap-3 border border-[#E2E8F0] bg-white rounded-[16px] px-4 py-3.5 shadow-2xs">
        <span className="text-xs sm:text-sm font-semibold text-[#0F172A] mr-2">
          Select Floor / Area
        </span>

        <div className="flex flex-wrap items-center gap-2.5">
          {floors.map((floor) => {
            const isActive = floor.id === selectedFloorId;
            return (
              <button
                key={floor.id}
                type="button"
                onClick={() => onSelectFloor(floor.id)}
                className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#0053B0] text-white shadow-2xs"
                    : "bg-white text-[#475569] border border-[#E2E8F0] hover:border-[#0053B0] hover:text-[#0053B0]"
                }`}
              >
                {floor.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Status Indicator */}
      <div className="flex items-center gap-2 pl-1">
        <span className="w-2 h-2 rounded-full bg-[#10B981] inline-block shrink-0" />
        <span className="text-xs font-semibold text-[#64748B] font-Plus_Jakarta_Sans">
          Showing details for {currentFloor.detailsLabel}
        </span>
      </div>
    </div>
  );
}
