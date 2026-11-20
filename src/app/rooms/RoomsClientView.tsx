"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import RoomsHero from "@/components/ourRooms/RoomsHero";
import RoomsSection from "@/components/ourRooms/RoomsSection";
import FAQ from "@/components/ourRooms/FAQ";
import EnquiryBanner from "@/components/EnquiryBanner";
import Footer from "@/components/Footer";
import PremiumSingleRoomView from "@/components/ourRooms/PremiumSingleRoomView";
import { getRoomDetailBySlug, RoomDetailData } from "@/services/roomsService";
import { RoomsPageData } from "@/types/rooms";
import { CommonData } from "@/types/common";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export interface RoomsClientViewProps {
  roomsPageData: RoomsPageData;
  commonData: CommonData;
}

export default function RoomsClientView({ roomsPageData, commonData }: RoomsClientViewProps) {
  const searchParams = useSearchParams();
  const roomId = searchParams?.get("id") || searchParams?.get("slug");

  const [roomDetail, setRoomDetail] = useState<RoomDetailData | null>(null);
  const [loading, setLoading] = useState<boolean>(Boolean(roomId));
  const [notFoundState, setNotFoundState] = useState<boolean>(false);

  useEffect(() => {
    if (!roomId) {
      setRoomDetail(null);
      setLoading(false);
      setNotFoundState(false);
      return;
    }

    let isMounted = true;
    async function loadRoom() {
      setLoading(true);
      setNotFoundState(false);
      try {
        const data = await getRoomDetailBySlug(roomId!);
        if (isMounted) {
          if (data) {
            setRoomDetail(data);
          } else {
            setNotFoundState(true);
          }
        }
      } catch (err) {
        console.error("Failed to load room detail:", err);
        if (isMounted) setNotFoundState(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadRoom();
    return () => {
      isMounted = false;
    };
  }, [roomId]);

  // If a room ID is present in query parameters (?id=...)
  if (roomId) {
    if (loading) {
      return (
        <div className="min-h-screen flex flex-col justify-between bg-white font-sans text-slate-900">
          <Navbar variant="solid" activeLink="Our Rooms" data={commonData.navbar} />
          <div className="flex-1 flex items-center justify-center py-24">
            <div className="text-center space-y-3 font-figtree">
              <div className="w-10 h-10 border-4 border-[#2571A5] border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-slate-500 text-sm">Loading room details...</p>
            </div>
          </div>
          <Footer data={commonData.footer} />
        </div>
      );
    }

    if (notFoundState || !roomDetail) {
      return (
        <div className="min-h-screen flex flex-col justify-between bg-white font-sans text-slate-900">
          <Navbar variant="solid" activeLink="Our Rooms" data={commonData.navbar} />
          <div className="flex-1 flex items-center justify-center py-20 px-4">
            <div className="max-w-md w-full text-center space-y-4 font-figtree">
              <h2 className="text-2xl font-bold text-[#011A2A]">Room Not Found</h2>
              <p className="text-sm text-slate-600">
                The requested room accommodation could not be found or is no longer available.
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <Link
                  href="/rooms/"
                  className="inline-flex items-center gap-2 bg-[#2571A5] hover:bg-[#02569B] text-white px-5 py-2.5 rounded-full text-sm font-medium transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to All Rooms</span>
                </Link>
              </div>
            </div>
          </div>
          <Footer data={commonData.footer} />
        </div>
      );
    }

    return <PremiumSingleRoomView roomData={roomDetail} commonData={commonData} />;
  }

  // Otherwise, render the standard Rooms listing page
  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-white font-sans text-slate-900">
      <Navbar variant="transparent" activeLink="Our Rooms" data={commonData.navbar} />
      <main className="flex-1">
        <RoomsHero />
        <RoomsSection data={roomsPageData} />
        <FAQ data={roomsPageData.faq} />
      </main>
      <EnquiryBanner data={commonData.enquiryBanner} />
      <Footer data={commonData.footer} />
    </div>
  );
}
