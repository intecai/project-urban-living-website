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

  // Handle keys that come from our backend API uploads
  if (cleanPath.startsWith('uploads/')) {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://urbanliving.client.intecai.in/api";
    // Typically Express static files are served at /uploads, outside the /api route
    const rootUrl = baseUrl.replace(/\/api\/?$/, "");
    return `${rootUrl}/${cleanPath}`;
  }

  // If it's a UUID (used for our file uploads), resolve it to the backend endpoint
  const isUUID = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/i.test(cleanPath);
  if (isUUID) {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://urbanliving.client.intecai.in/api";
    return `${baseUrl}/upload/${cleanPath}`;
  }

  const domainEnv = process.env.NEXT_PUBLIC_IMAGE_DOMAIN || DEFAULT_IMAGE_DOMAIN;
  const domain = domainEnv.replace(/\/+$/, "");
  return `${domain}/${cleanPath.replace(/^\/+/, "")}`;
}
