const DEFAULT_IMAGE_DOMAIN = "https://dev-urban-living-bucket.s3.us-east-1.amazonaws.com";

export function resolveImageUrl(path?: string): string {
  if (!path || typeof path !== "string" || path.trim().length === 0) {
    return "/images/rooms/room_single.png";
  }

  const cleanPath = path.trim();

  // 1. Absolute URLs or local static asset paths
  if (
    cleanPath.startsWith("http://") ||
    cleanPath.startsWith("https://") ||
    cleanPath.startsWith("data:") ||
    cleanPath.startsWith("/")
  ) {
    return cleanPath;
  }

  const domainEnv = process.env.NEXT_PUBLIC_IMAGE_DOMAIN || DEFAULT_IMAGE_DOMAIN;
  const domain = domainEnv.replace(/\/+$/, "");
  const targetPath = cleanPath.replace(/^\/+/, "");

  // 2. S3 keys with folders or extensions (e.g. temp/xxx.png or uploads/xxx.png)
  if (targetPath.includes("/")) {
    return `${domain}/${targetPath}`;
  }
  
  if (targetPath.includes(".")) {
    // If it has an extension but no folder, assume it's in /uploads/
    return `${domain}/uploads/${targetPath}`;
  }

  // 3. Raw UUID strings returned by CMS API -> Return as raw UUID so PrivateImage fetches presigned URL
  return targetPath;
}
