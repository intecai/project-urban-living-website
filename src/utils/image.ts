const DEFAULT_IMAGE_DOMAIN = "https://dev-urban-living-bucket.s3.us-east-1.amazonaws.com";

export function resolveImageUrl(path?: string): string {
  if (!path || typeof path !== "string" || path.trim().length === 0) {
    return "/images/rooms/room_single.png";
  }
  const cleanPath = path.trim();
  if (
    cleanPath.startsWith("http://") ||
    cleanPath.startsWith("https://") ||
    cleanPath.startsWith("data:") ||
    cleanPath.startsWith("/")
  ) {
    return cleanPath;
  }
  // If it's a UUID (used for our PrivateImage file uploads), return it as is
  const isUUID = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/i.test(cleanPath);
  if (isUUID) {
    return cleanPath;
  }

  const domainEnv = process.env.NEXT_PUBLIC_IMAGE_DOMAIN || DEFAULT_IMAGE_DOMAIN;
  const domain = domainEnv.replace(/\/+$/, "");
  return `${domain}/${cleanPath.replace(/^\/+/, "")}`;
}
