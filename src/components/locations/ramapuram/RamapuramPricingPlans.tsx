"use client";

import React from "react";
import { PricingPlanItem } from "@/data/locations/ramapuram";
import RamapuramPricingCard from "./RamapuramPricingCard";

export interface RamapuramPricingPlansProps {
  heading: string;
  items: PricingPlanItem[];
}

export default function RamapuramPricingPlans({ heading, items }: RamapuramPricingPlansProps) {
  return (
    <div className="w-full space-y-5 font-Plus_Jakarta_Sans">
      <h2 className="text-xl sm:text-2xl font-bold text-[#011A2A] font-Plus_Jakarta_Sans tracking-tight">
        {heading}
      </h2>

      <div className="space-y-4">
        {items.map((item) => (
          <RamapuramPricingCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
