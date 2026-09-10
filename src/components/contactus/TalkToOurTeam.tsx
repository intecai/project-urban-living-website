"use client";

import React, { useState } from "react";
import { Calendar, Sun, ChevronDown, ArrowRight, Send, CheckCircle2 } from "lucide-react";

import { TalkToOurTeamData } from "@/types/contact";

export type StayDuration = "Short Stay" | "Long Stay" | "Daily Stays";

const branchOptions = [
  "Anna Nagar",
  "Ramapuram",
  "Madanandapuram",
  "Porur",
];

export interface TalkToOurTeamProps {
  data?: TalkToOurTeamData;
}

export default function TalkToOurTeam({ data }: TalkToOurTeamProps) {
  const [stayDuration, setStayDuration] = useState<StayDuration>("Short Stay");
  const [fullName, setFullName] = useState("");
  const [preferredBranch, setPreferredBranch] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [checkInDate, setCheckInDate] = useState("2026-08-28");
  const [checkOutDate, setCheckOutDate] = useState("2026-09-02");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);

  const title = data?.title || "Talk To our Team";
  const description = data?.description || "Share a few details and we'll get back to you shortly.";

  const handleCheckInChange = (val: string) => {
    setCheckInDate(val);
    if (checkOutDate && val > checkOutDate) {
      setCheckOutDate(val);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!preferredBranch) newErrors.preferredBranch = "Please select a branch";
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) newErrors.email = "Valid email is required";
    if (!phone.trim()) newErrors.phone = "Phone number is required";
    if (!checkInDate) newErrors.checkInDate = "Check-in date is required";
    if (!checkOutDate) newErrors.checkOutDate = "Check-out date is required";
    if (checkInDate && checkOutDate && checkOutDate < checkInDate) {
      newErrors.checkOutDate = "Check-out date cannot be earlier than check-in date";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSuccess(true);
  };

  return (
    <section className="w-full py-12 lg:py-16 bg-[#F8FAFC] font-montserrat flex items-center justify-center min-h-[700px]">
      <div className="w-full max-w-[640px] px-4 sm:px-6">
        
        {/* Main Centered White Form Card */}
        <div className="bg-white rounded-[24px] border border-slate-200/80 shadow-lg p-6 sm:p-8 md:p-10 font-montserrat transition-all">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-medium text-[#000000] text-[16px] tracking-tight font-figtree">
              {title}
            </h2>
            <p className="text-xs sm:text-sm text-[#A9AAAD] text-[17px] mt-2 font-figtree">
              {description}
            </p>
          </div>

          {isSuccess ? (
            <div className="py-12 text-center space-y-4">
              <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
              <h3 className="text-xl font-bold text-[#011A2A]">Thank You!</h3>
              <p className="text-sm text-slate-500 max-w-sm mx-auto">
                Your enquiry has been received. Our team will contact you shortly to help you find your perfect space.
              </p>
              <button
                type="button"
                onClick={() => setIsSuccess(false)}
                className="mt-4 px-6 py-2.5 bg-[#2563EB] text-white text-xs font-semibold rounded-full shadow-xs hover:bg-[#1D4ED8] transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* 1. STAY DURATION */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-[#011A2A] mb-3 font-montserrat">
                  1. How long are you looking to stay? *
                </label>

                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {[
                    { label: "Short Stay", icon: Calendar },
                    { label: "Long Stay", icon: Calendar },
                    { label: "Daily Stays", icon: Sun },
                  ].map((item) => {
                    const Icon = item.icon;
                    const isSelected = stayDuration === item.label;

                    return (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => setStayDuration(item.label as StayDuration)}
                        className={`flex items-center justify-center gap-1.5 sm:gap-2 py-3 px-2 sm:px-3 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                          isSelected
                            ? "border-[#011A2A] bg-white text-[#011A2A] font-semibold shadow-xs"
                            : "border-slate-200/90 bg-slate-50/50 text-slate-500 hover:bg-slate-100/60"
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isSelected ? "text-[#D97706]" : "text-amber-500/70"}`} />
                        <span className="whitespace-nowrap">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. PERSONAL INFORMATION */}
              <div className="space-y-4">
                {/* Row 1: Full Name & Preferred Branch */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5 font-montserrat">
                      Full Name*
                    </label>
                    <input
                      type="text"
                      placeholder="Jane Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className={`w-full h-11 px-4 rounded-xl border bg-white text-xs sm:text-sm text-[#011A2A] placeholder:text-slate-300 focus:outline-hidden transition-all ${
                        errors.fullName ? "border-red-500 focus:border-red-500" : "border-slate-200 focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                      }`}
                    />
                    {errors.fullName && <p className="text-[11px] text-red-500 mt-1">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5 font-montserrat">
                      Preferred Branch
                    </label>
                    <div className="relative">
                      <select
                        value={preferredBranch}
                        onChange={(e) => setPreferredBranch(e.target.value)}
                        className={`w-full h-11 px-4 pr-10 rounded-xl border bg-white text-xs sm:text-sm appearance-none focus:outline-hidden transition-all cursor-pointer ${
                          preferredBranch ? "text-[#011A2A]" : "text-slate-300"
                        } ${errors.preferredBranch ? "border-red-500" : "border-slate-200 focus:border-[#2563EB]"}`}
                      >
                        <option value="" disabled>
                          Select a branch
                        </option>
                        {branchOptions.map((b) => (
                          <option key={b} value={b} className="text-[#011A2A]">
                            {b}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top.1/2 top-3.5 pointer-events-none" />
                    </div>
                    {errors.preferredBranch && <p className="text-[11px] text-red-500 mt-1">{errors.preferredBranch}</p>}
                  </div>
                </div>

                {/* Row 2: Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5 font-montserrat">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="jane@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full h-11 px-4 rounded-xl border bg-white text-xs sm:text-sm text-[#011A2A] placeholder:text-slate-300 focus:outline-hidden transition-all ${
                        errors.email ? "border-red-500" : "border-slate-200 focus:border-[#2563EB]"
                      }`}
                    />
                    {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5 font-montserrat">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 00000 00000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={`w-full h-11 px-4 rounded-xl border bg-white text-xs sm:text-sm text-[#011A2A] placeholder:text-slate-300 focus:outline-hidden transition-all ${
                        errors.phone ? "border-red-500" : "border-slate-200 focus:border-[#2563EB]"
                      }`}
                    />
                    {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>}
                  </div>
                </div>
              </div>

              {/* 3. DATES */}
              <div>
                <div className="flex items-center gap-2 sm:gap-3">
                  {/* Check-in Date */}
                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5 font-montserrat">
                      Check-in Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={checkInDate}
                        onChange={(e) => handleCheckInChange(e.target.value)}
                        className={`w-full h-11 px-3 sm:px-4 rounded-xl border bg-white text-xs sm:text-sm text-[#011A2A] focus:outline-hidden transition-all ${
                          errors.checkInDate ? "border-red-500" : "border-slate-200 focus:border-[#2563EB]"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Arrow Indicator in Middle */}
                  <div className="pt-6 shrink-0">
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                  </div>

                  {/* Check-out Date */}
                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5 font-montserrat">
                      Check-out Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        min={checkInDate}
                        value={checkOutDate}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                        className={`w-full h-11 px-3 sm:px-4 rounded-xl border bg-white text-xs sm:text-sm text-[#011A2A] focus:outline-hidden transition-all ${
                          errors.checkOutDate ? "border-red-500" : "border-slate-200 focus:border-[#2563EB]"
                        }`}
                      />
                    </div>
                  </div>
                </div>
                {errors.checkOutDate && <p className="text-[11px] text-red-500 mt-1">{errors.checkOutDate}</p>}
              </div>

              {/* 4. MESSAGE */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 font-montserrat">
                  Your Message
                </label>
                <textarea
                  placeholder="Tell us what you're looking for.."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  className="w-full h-24 p-4 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-[#011A2A] placeholder:text-slate-300 focus:outline-hidden focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] font-montserrat resize-none transition-all"
                />
              </div>

              {/* 5. SUBMIT BUTTON */}
              <button
                type="submit"
                className="w-full h-12 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs sm:text-sm font-semibold font-montserrat rounded-xl shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer transform active:scale-[0.99]"
              >
                <span>Let's Find Your Perfect Space</span>
                <Send className="w-4 h-4 text-white" />
              </button>

            </form>
          )}

        </div>

      </div>
    </section>
  );
}
