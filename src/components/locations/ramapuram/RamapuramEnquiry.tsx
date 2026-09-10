"use client";

import React from "react";
import EnquiryBanner, { EnquiryBannerProps } from "@/components/EnquiryBanner";

export interface RamapuramEnquiryProps {
  data?: EnquiryBannerProps["data"];
}

export default function RamapuramEnquiry({ data }: RamapuramEnquiryProps) {
  return <EnquiryBanner data={data} />;
}
