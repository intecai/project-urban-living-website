"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { ReviewsSectionData } from "@/types/home";

export interface ReviewsSectionProps {
  data?: ReviewsSectionData;
}

const defaultReviews = [
  {
    id: "1",
    quote: "My staying experience is so nice, and received me very politely. Living experience is also very good. Very good performance. I never experienced such a kind of performance. Very good service.",
    rating: 5,
    author: "Priya S.",
    avatar: "/images/home/Priya S..png",
    date: "1 week ago",
    avatarColor: "bg-[#F3E8FF] text-[#7E22CE]",
  },
  {
    id: "2",
    quote: "I love my room and the customer service is excellent. They respond in a timely manner with loads of information about amenities, accessories and maintenance information.",
    rating: 5,
    author: "Swathi R.",
    avatar: "/images/home/Swathi R..png",
    date: "10 days ago",
    avatarColor: "bg-[#FEF3C7] text-[#D97706]",
  },
  {
    id: "3",
    quote: "I love my room and the customer service is excellent. They respond in a timely manner with loads of information about amenities, accessories and maintenance information.",
    rating: 5,
    author: "Swathi R.",
    avatar: "/images/home/Swathi R..png",
    date: "10 days ago",
    avatarColor: "bg-[#E0F2FE] text-[#0369A1]",
  },
];

export default function ReviewsSection({ data }: ReviewsSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const eyebrow = data?.eyebrow || "Read Reviews,";
  const headingLine1 = data?.headingLine1 || "Stay with";
  const headingLine2 = data?.headingLine2 || "confidence.";
  const ratingScore = data?.ratingScore || "4.2/5";
  const ratingSource = data?.ratingSource || "Google";
  const reviewsCountText = data?.reviewsCountText || "Based on 5210 reviews";
  const reviewList = data?.reviews || defaultReviews;

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 360;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const getAvatarColor = (index: number) => {
    const colors = [
      "bg-[#F3E8FF] text-[#7E22CE]",
      "bg-[#FEF3C7] text-[#D97706]",
      "bg-[#E0F2FE] text-[#0369A1]",
      "bg-[#DCFCE7] text-[#15803D]",
    ];
    return colors[index % colors.length];
  };

  return (
    <section className="w-full py-14 lg:py-20 bg-white font-montserrat overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 space-y-12 sm:space-y-16">
        
        {/* Top Header & Google Rating */}
        <div className="text-center space-y-3">
          {/* Two-Line Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-[38px] font-montserrat tracking-tight text-[#011A2A] leading-tight">
            <span className="font-figtree text-[38px] text-[#051125] block">{eyebrow}</span>
            <span className="font-semibold  font-figtree text-[38px] text-[#051125] block">{headingLine1} {headingLine2}</span>
          </h2>

          {/* Google Rating Row */}
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-figtree pt-1">
            <span className="font-semibold text-[#011A2A]">{ratingScore}</span>
            <Star className="w-4 h-4 fill-[#EFC53F] text-[#EFC53F]" />
            <span className="font-semibold font-figtree text-[14px] text-[#011A2A]">{ratingSource}</span>
            <span className="text-[#6B7280] text-[14px] font-figtree">{reviewsCountText}</span>
          </div>
        </div>

        {/* Two-Column Main Reviews Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Fixed 3-Line Title */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-3xl sm:text-4xl lg:text-[40px] text-[#051125] font-figtree leading-[1.15] text-left">
              What our <br className="hidden sm:inline" />
              residents are <br className="hidden sm:inline" />
              saying
            </h3>

            {/* Slider Navigation Controls */}
            <div className="hidden sm:flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => scroll("left")}
                className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 hover:text-[#2563EB] transition-colors cursor-pointer"
                aria-label="Previous Reviews"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 hover:text-[#2563EB] transition-colors cursor-pointer"
                aria-label="Next Reviews"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Column: Horizontally Scrollable Review Cards Carousel */}
          <div className="lg:col-span-8 overflow-hidden relative">
            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto scroll-smooth pb-4 pt-1 px-1 no-scrollbar snap-x snap-mandatory"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {reviewList.map((review, idx) => (
                <div
                  key={review.id}
                  className="w-[290px] sm:w-[340px] shrink-0 bg-white rounded-[20px] border border-slate-200/80 shadow-2xs hover:shadow-md transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between h-[270px] sm:h-[290px] snap-start"
                >
                  {/* Review Paragraph */}
                  <p className="text-xs sm:text-sm text-slate-600 font-normal font-montserrat leading-relaxed line-clamp-5">
                    "{review.quote || (review as any).text}"
                  </p>

                  <div className="space-y-3 pt-3">
                    {/* 5 Yellow Stars */}
                    <div className="flex items-center gap-1 text-[#EFC53F]">
                      {[...Array(review.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#EFC53F] text-[#EFC53F]" />
                      ))}
                    </div>

                    {/* Reviewer Avatar, Name & Date */}
                    <div className="flex items-center gap-3">
                      {review.avatar ||
                      (review.author?.includes("Priya")
                        ? "/images/home/Priya S..png"
                        : review.author?.includes("Swathi")
                        ? "/images/home/Swathi R..png"
                        : null) ? (
                        <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden shrink-0 border border-slate-100">
                          <Image
                            src={
                              review.avatar ||
                              (review.author?.includes("Priya")
                                ? "/images/home/Priya S..png"
                                : "/images/home/Swathi R..png")
                            }
                            alt={review.author || "Reviewer"}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div
                          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm shrink-0 ${getAvatarColor(idx)}`}
                        >
                          {(review.author || (review as any).name).charAt(0)}
                        </div>
                      )}
                      <div>
                        <h4 className="text-sm font-semibold text-[14px] text-[#051125] font-figtree leading-tight">
                          {review.author || (review as any).name}
                        </h4>
                        <span className="text-[12px] text-[#9CA3AF] font-figtree">
                          {review.date}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
