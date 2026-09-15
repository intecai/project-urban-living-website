"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface RamapuramHeroProps {
  title: string;
  subtitle: string;
  breadcrumbs: { label: string; href?: string }[];
}

export default function RamapuramHero({ title, subtitle, breadcrumbs }: RamapuramHeroProps) {
  return (
    <div className="w-full font-Plus_Jakarta_Sans">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs sm:text-sm text-[#6B7280] font-medium mb-3">
        {breadcrumbs.map((item, index) => (
          <React.Fragment key={index}>
            {item.href ? (
              <Link href={item.href} className="hover:text-[#1F2937] transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-[#011A2A] font-semibold">{item.label}</span>
            )}
            {index < breadcrumbs.length - 1 && (
              <ChevronRight className="w-3.5 h-3.5 text-[#9CA3AF]" />
            )}
          </React.Fragment>
        ))}
      </nav>

      {/* Main Title & Subtitle */}
      <h1 className="text-2xl sm:text-3xl lg:text-[24px] font-semibold text-[#212529] font-figtree tracking-tight">
        {title}
      </h1>
      <p className="text-xs sm:text-sm text-[#272828]  mt-1 font-figtree text-[15px]">
        {subtitle}
      </p>
    </div>
  );
}
