"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";
import { RamapuramData } from "@/data/locations/ramapuram";

export interface RamapuramAboutProps {
  about: RamapuramData["about"];
  whatsIncluded: RamapuramData["whatsIncluded"];
}

export default function RamapuramAbout({ about, whatsIncluded }: RamapuramAboutProps) {
  return (
    <div className="w-full space-y-6 font-Plus_Jakarta_Sans">
      {/* About This Property Card */}
      <div className="bg-white rounded-[20px] border border-[#E2E8F0] p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-[#0053B0] bg-[#0053B0]/10 px-3 py-1 rounded-full uppercase tracking-wider font-Plus_Jakarta_Sans">
            {about.badge}
          </span>
        </div>

        <h3 className="text-lg font-bold text-[#011A2A] font-Plus_Jakarta_Sans">
          {about.title}
        </h3>

        <p className="text-xs sm:text-sm text-[#64748B] font-normal leading-relaxed font-Plus_Jakarta_Sans">
          {about.description}
        </p>

        <div className="pt-2 border-t border-slate-100 space-y-2.5">
          {about.highlights.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-[#011A2A] font-medium font-Plus_Jakarta_Sans">
              <CheckCircle2 className="w-4 h-4 text-[#0053B0] shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* What's Included Card */}
      <div className="bg-white rounded-[20px] border border-[#E2E8F0] p-6 shadow-2xs space-y-4">
        <h3 className="text-lg font-bold text-[#011A2A] font-Plus_Jakarta_Sans">
          {whatsIncluded.title}
        </h3>

        <div className="space-y-3">
          {whatsIncluded.items.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-[#475569] font-medium font-Plus_Jakarta_Sans">
              <div className="w-2 h-2 rounded-full bg-[#0053B0]" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
