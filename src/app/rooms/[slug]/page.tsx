import type { Metadata } from "next";
import PremiumSingleRoomView from "@/components/ourRooms/PremiumSingleRoomView";
import { getCommonData } from "@/services/commonService";

export async function generateStaticParams() {
  return [
    { slug: "premium-single-room" },
    { slug: "single-room" },
    { slug: "deluxe-single-room" },
  ];
}

export const metadata: Metadata = {
  title: "Premium Single Room | Urban Living PG",
  description:
    "Explore fully furnished rooms in Chennai with premium amenities, high-speed Wi-Fi, food included, and attached bathroom.",
};

export default async function RoomDetailPage() {
  const commonData = await getCommonData();

  return <PremiumSingleRoomView commonData={commonData} />;
}
