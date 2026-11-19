import type { Metadata } from "next";
import React, { Suspense } from "react";
import { getLocationsData } from "@/services/locationsService";
import { getCommonData } from "@/services/commonService";
import LocationsClientView from "./LocationsClientView";

export const metadata: Metadata = {
  title: "PG Locations in Chennai | Urban Living PG",
  description: "Explore our comfortable women's PG locations across Chennai including Ramapuram and Madanandapuram.",
};

export default async function LocationsPage() {
  const locationsData = await getLocationsData();
  const commonData = await getCommonData();

  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-sans text-slate-500">Loading locations...</div>}>
      <LocationsClientView locationsData={locationsData} commonData={commonData} />
    </Suspense>
  );
}
