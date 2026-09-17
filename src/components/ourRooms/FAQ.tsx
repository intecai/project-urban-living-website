"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { FAQSectionData } from "@/types/rooms";

export interface FAQProps {
  data?: FAQSectionData;
}

const defaultFaqData = [
  {
    id: "1",
    question: "Is food included in the rent?",
    answer:
      "Yes, all our rooms include nutritious breakfast, lunch, and dinner. We offer both vegetarian and non-vegetarian meal options on a rotating menu.",
  },
  {
    id: "2",
    question: "Can I visit the room before booking?",
    answer:
      "Yes, you can schedule a physical site visit or request a virtual tour with our property manager prior to booking.",
  },
  {
    id: "3",
    question: "What documents are required for booking?",
    answer:
      "You will need a valid government photo ID (Aadhaar Card/Passport), proof of employment or college admission, and passport-size photographs.",
  },
  {
    id: "4",
    question: "Is the security deposit refundable?",
    answer:
      "Yes, the security deposit is fully refundable at the time of check-out after adjusting any pending dues or damages.",
  },
  {
    id: "5",
    question: "Are utilities (Wi-Fi, electricity, water) included?",
    answer:
      "High-speed Wi-Fi and water supply are fully included. Electricity is billed based on individual sub-meter usage.",
  },
];

export default function FAQ({ data }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const title = data?.title || "Frequently Asked Questions";
  const subtitle = data?.subtitle || "Find answers to common questions about our rooms and services.";
  const faqs = (data?.faqs && data.faqs.length > 0) ? data.faqs : defaultFaqData;

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full py-10 sm:py-16 lg:py-24 bg-white font-figtree" id="faq">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-3xl lg:text-[38px] font-bold text-[#0B3558] font-figtree tracking-tight">
            {title}
          </h2>
          <div className="w-12 h-[3px] bg-[#F59E0B] mx-auto mt-2.5 mb-3 sm:mb-4 rounded-full" />
          <p className="text-xs sm:text-base text-slate-500 font-figtree font-normal">
            {subtitle}
          </p>
        </div>

        {/* Accordion Container - Figma Matched */}
        <div className="max-w-[1097px] mx-auto space-y-3 sm:space-y-5">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={item.id}
                className="bg-white rounded-[14px] sm:rounded-[16px] border border-[#E2E8F0] overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full px-4 sm:px-6 py-3.5 sm:py-5 flex items-center justify-between text-left focus:outline-hidden cursor-pointer group gap-3"
                >
                  <span className="text-sm sm:text-lg lg:text-[19px] font-bold text-[#011A2A] font-figtree transition-colors pr-2">
                    {item.question}
                  </span>
                  <span className="shrink-0 text-slate-500">
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-[#011A2A]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 group-hover:text-[#011A2A] transition-colors" />
                    )}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-6 pb-4 sm:pb-5 pt-0 text-xs sm:text-base text-slate-600 leading-relaxed max-w-3xl whitespace-normal break-words font-figtree">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

