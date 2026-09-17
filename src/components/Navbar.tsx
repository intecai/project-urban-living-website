"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

import { NavbarData } from "@/types/common";
import { TalkToOurTeamModal } from "@/components/contactus/TalkToOurTeam";

export type NavbarVariant = "transparent" | "solid" | "translucent";

export interface NavbarProps {
  variant?: NavbarVariant;
  activeLink?: string;
  darkText?: boolean;
  data?: NavbarData;
}

const defaultNavLinks = [
  { label: "Home", href: "/" },
  { label: "Our Rooms", href: "/rooms" },
  { label: "Locations", href: "/locations" },
  { label: "Contact Us", href: "/contact" },
];

export default function Navbar({
  variant = "solid",
  activeLink = "Home",
  darkText = false,
  data,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookNowModalOpen, setBookNowModalOpen] = useState(false);

  useEffect(() => {
    const handleOpenModal = () => setBookNowModalOpen(true);
    window.addEventListener("open-book-now", handleOpenModal);

    const handleHashChange = () => {
      if (window.location.hash === "#book-now") {
        setBookNowModalOpen(true);
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    if (typeof window !== "undefined" && window.location.hash === "#book-now") {
      setBookNowModalOpen(true);
    }

    return () => {
      window.removeEventListener("open-book-now", handleOpenModal);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const links = data?.navLinks || defaultNavLinks;
  const logoSrc = data?.logo?.src || "/images/common/mainLogo1.png";
  const logoAlt = data?.logo?.alt || "Urban Living Logo";
  const ctaLabel = data?.ctaButton?.label || "Book Now";

  const isTransparent = variant === "transparent";
  const isTranslucent = variant === "translucent";

  // Base navbar position & background styling
  let headerContainerStyles =
    "relative w-full bg-white z-50 border-b border-slate-100 shadow-xs transition-all duration-300";

  if (isTransparent) {
    headerContainerStyles =
      "absolute top-0 left-0 right-0 z-50 bg-transparent w-full transition-all duration-300";
  } else if (isTranslucent) {
    headerContainerStyles =
      "absolute top-0 left-0 right-0 z-50 bg-white/85 backdrop-blur-xs border-b border-slate-200/30 w-full transition-all duration-300";
  }

  // Nav links text styling
  let inactiveLinkStyles =
    "text-[#011A2A] hover:text-[#2563EB] font-medium transition-colors";

  if (isTransparent) {
    inactiveLinkStyles = darkText
      ? "text-[#011A2A] hover:text-[#2563EB] font-medium transition-colors"
      : "text-[#011A2A] hover:text-[#2563EB] font-medium transition-colors";
  } else if (isTranslucent) {
    inactiveLinkStyles =
      "text-[#011A2A] hover:text-[#2563EB] font-medium transition-colors";
  }

  const activeLinkStyles = "bg-[#2571A5] text-white font-medium shadow-xs px-4 py-2 rounded-full";

  // Mobile menu button icon color
  const menuIconColor = "text-[#011A2A]";

  // Mobile menu drawer background
  const mobileMenuBg =
    "bg-white/95 text-[#011A2A] backdrop-blur-md border-b border-slate-200 shadow-xl";

  return (
    <>
      <header className={headerContainerStyles}>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 h-20 sm:h-24 flex items-center justify-between">
          {/* Brand Logo */}
          <a href="/" className="flex items-center gap-2 focus:outline-hidden">
            <Image
              src={logoSrc}
              alt={logoAlt}
              width={120}
              height={100}
              className="h-12 sm:h-16 w-auto object-contain"
              priority
            />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 text-sm lg:text-[15px] font-figtree">
            {links.map((link) => {
              const isActive = activeLink === link.label;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`px-4 py-2 rounded-full transition-all duration-200 ${
                    isActive ? activeLinkStyles : inactiveLinkStyles
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex items-center">
            <button
              type="button"
              onClick={() => setBookNowModalOpen(true)}
              className="bg-[#2571A5] hover:bg-[#02569B] text-white px-5 sm:px-6 py-2.5 rounded-full text-sm font-medium font-figtree shadow-xs transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              {ctaLabel}
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#2571A5] ${menuIconColor}`}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className={`md:hidden px-4 pt-2 pb-6 space-y-3 ${mobileMenuBg} absolute top-full left-0 right-0 z-50`}>
            <div className="flex flex-col space-y-2">
              {links.map((link) => {
                const isActive = activeLink === link.label;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? "bg-[#2571A5] text-white font-semibold"
                        : "text-[#011A2A] hover:bg-slate-100"
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>

            <div className="pt-2 border-t border-slate-200/20">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setBookNowModalOpen(true);
                }}
                className="block w-full text-center bg-[#2571A5] hover:bg-[#02569B] text-white px-5 py-3 rounded-xl text-sm font-semibold shadow-xs cursor-pointer"
              >
                {ctaLabel}
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Global Book Now / Talk To Our Team Modal */}
      <TalkToOurTeamModal
        isOpen={bookNowModalOpen}
        onClose={() => setBookNowModalOpen(false)}
      />
    </>
  );
}
