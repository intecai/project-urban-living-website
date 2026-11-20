import { Suspense } from "react";
import type { Metadata } from "next";
import RoomsClientView from "./RoomsClientView";
import { getRoomsData } from "@/services/roomsService";
import { getCommonData } from "@/services/commonService";

export const metadata: Metadata = {
  title: "Our Rooms & Pricing | Urban Living PG",
  description:
    "Explore fully furnished rooms in Chennai with premium amenities, high-speed Wi-Fi, and 24/7 security.",
};

export default async function RoomsPage() {
  const roomsPageData = await getRoomsData();
  const commonData = await getCommonData();

  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen flex items-center justify-center py-12 text-center text-slate-500 font-figtree">
          Loading rooms...
        </div>
      }
    >
      <RoomsClientView roomsPageData={roomsPageData} commonData={commonData} />
    </Suspense>
  );
}
