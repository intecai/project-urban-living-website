import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PremiumSingleRoomView from "@/components/ourRooms/PremiumSingleRoomView";
import { getCommonData } from "@/services/commonService";
import { getRoomDetailBySlug, getAllRoomSlugs } from "@/services/roomsService";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllRoomSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const room = await getRoomDetailBySlug(slug);

  if (!room) {
    return {
      title: "Room Not Found | Urban Living PG",
      description: "The requested room accommodation could not be found.",
    };
  }

  return {
    title: `${room.name} | Urban Living PG`,
    description: `Explore ${room.name} in ${room.location} starting from ₹${room.price.toLocaleString("en-IN")}/month with all essential amenities.`,
  };
}

export default async function RoomDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const roomData = await getRoomDetailBySlug(slug);

  if (!roomData) {
    notFound();
  }

  const commonData = await getCommonData();

  return <PremiumSingleRoomView roomData={roomData} commonData={commonData} />;
}
