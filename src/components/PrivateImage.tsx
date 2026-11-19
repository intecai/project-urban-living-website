"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface PrivateImageProps {
  fileId: string;
  alt?: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  loading?: "lazy" | "eager";
  quality?: number;
}

const DEFAULT_IMAGE_DOMAIN = "https://dev-urban-living-bucket.s3.us-east-1.amazonaws.com";

export default function PrivateImage({
  fileId,
  alt,
  className,
  fill,
  width,
  height,
  sizes,
  priority,
  loading,
  quality = 80,
}: PrivateImageProps) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!fileId || typeof fileId !== "string" || fileId.trim().length === 0) {
      setUrl(null);
      return;
    }

    const cleanFileId = fileId.trim();

    // 1. If it's already a full URL or a local static path, use directly
    if (
      cleanFileId.startsWith("http://") ||
      cleanFileId.startsWith("https://") ||
      cleanFileId.startsWith("data:") ||
      cleanFileId.startsWith("/")
    ) {
      setUrl(cleanFileId);
      return;
    }

    const domainEnv = process.env.NEXT_PUBLIC_IMAGE_DOMAIN || DEFAULT_IMAGE_DOMAIN;
    const domain = domainEnv.replace(/\/+$/, "");
    const cleanKey = cleanFileId.replace(/^\/+/, "");

    // 2. S3 keys with folders or extensions
    if (cleanKey.includes("/")) {
      setUrl(`${domain}/${cleanKey}`);
      return;
    }

    if (cleanKey.includes(".")) {
      setUrl(`${domain}/uploads/${cleanKey}`);
      return;
    }

    // 3. Fallback for raw UUIDs - use direct backend upload endpoint
    const baseApi = process.env.NEXT_PUBLIC_API_BASE_URL || "https://urbanliving.client.intecai.in/api";
    const cleanBase = baseApi.replace(/\/+$/, "");
    setUrl(`${cleanBase}/upload/${cleanKey}`);
  }, [fileId]);

  if (!url) {
    return <div className={`bg-slate-200 animate-pulse ${className || ""}`} />;
  }

  // Provide sensible responsive sizes default when fill is true and sizes is not explicitly provided
  const resolvedSizes = sizes || (fill ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" : undefined);

  return (
    <Image
      src={url}
      alt={alt || "Image"}
      className={className}
      fill={fill}
      width={width}
      height={height}
      sizes={resolvedSizes}
      priority={priority}
      loading={priority ? undefined : (loading ?? "lazy")}
      quality={quality}
    />
  );
}
