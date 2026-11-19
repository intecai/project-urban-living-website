"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { resolveImageUrl } from "@/utils/image";

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
    const resolved = resolveImageUrl(fileId.trim());
    setUrl(resolved || null);
  }, [fileId]);

  if (!url) {
    return <div className={`bg-slate-200 animate-pulse ${className || ""}`} />;
  }

  const resolvedSizes =
    sizes || (fill ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" : undefined);

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