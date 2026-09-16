import type { Metadata } from "next";
import PremiumSingleRoomView from "@/components/ourRooms/PremiumSingleRoomView";
import { getCommonData } from "@/services/commonService";

export const metadata: Metadata = {
  title: "Premium Single Room | Urban Living PG Ramapuram",
  description:
    "Explore our Premium Single Room in Ramapuram, Chennai. Fully furnished single occupancy room with attached bathroom, food, high-speed Wi-Fi & all essential PG amenities.",
};

export default async function PremiumSingleRoomPage() {
  const commonData = await getCommonData();

  return <PremiumSingleRoomView commonData={commonData} />;
}
