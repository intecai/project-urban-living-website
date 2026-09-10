"use client";

import React from "react";
import Footer, { FooterProps } from "@/components/Footer";

export interface RamapuramFooterProps {
  data?: FooterProps["data"];
}

export default function RamapuramFooter({ data }: RamapuramFooterProps) {
  return <Footer data={data} />;
}
