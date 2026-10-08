"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { fetchApi } from "@/utils/apiClient";

interface PrivateImageProps {
  fileId: string;
  alt?: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
}

export default function PrivateImage({
  fileId,
  alt,
  className,
  fill,
  width,
  height,
  sizes,
  priority,
}: PrivateImageProps) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!fileId) return;

    // If it's already a full URL or a local static path, just use it
    if (fileId.startsWith("http") || fileId.startsWith("/")) {
      setUrl(fileId);
      return;
    }

    // Check if it looks like an S3 key with a slash or extension and not just a UUID
    if (fileId.includes("/") || fileId.includes(".")) {
      setUrl(`${process.env.NEXT_PUBLIC_IMAGE_DOMAIN}/${fileId}`);
      return;
    }

    // Fallback for UUIDs - use direct backend endpoint
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://urbanliving.client.intecai.in/api";
    setUrl(`${baseUrl}/upload/${fileId}`);
  }, [fileId]);

  if (!url) {
    return <div className={`bg-slate-200 animate-pulse ${className || ""}`} />;
  }

  return (
    <Image
      src={url}
      alt={alt || "Image"}
      className={className}
      fill={fill}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
    />
  );
}
