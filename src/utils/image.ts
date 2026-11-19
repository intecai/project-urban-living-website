import { getApiBaseUrl, getImageDomain } from "@/utils/siteConfig";

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/** Backend `GET /api/uploads/:key` — key must be a single segment (no slashes). */
function apiUploadUrl(objectFileName: string): string {
  return `${getApiBaseUrl()}/uploads/${encodeURIComponent(objectFileName)}`;
}

function s3ObjectUrl(key: string): string {
  const domain = getImageDomain();
  const cleanKey = key.replace(/^\/+/, "");
  return `${domain}/${cleanKey}`;
}

/**
 * Resolves CMS/S3 image keys, UUIDs, and static paths to a URL suitable for <Image src>.
 * Prefer the API proxy for `uploads/<file>` so dev/prod work even if bucket ACLs change.
 */
export function resolveImageUrl(path?: string): string {
  if (!path || typeof path !== "string" || path.trim().length === 0) {
    return "";
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

  const targetPath = cleanPath.replace(/^\/+/, "");

  // uploads/abc.jpg → proxy via Express (same as CMS)
  const uploadsMatch = /^uploads\/([^/]+)$/.exec(targetPath);
  if (uploadsMatch?.[1]) {
    return apiUploadUrl(uploadsMatch[1]);
  }

  // Nested keys (cms/uploads/..., temp/...) → public S3 URL
  if (targetPath.includes("/")) {
    return s3ObjectUrl(targetPath);
  }

  if (targetPath.includes(".")) {
    return apiUploadUrl(targetPath);
  }

  if (UUID_REGEX.test(targetPath)) {
    return apiUploadUrl(targetPath);
  }

  return s3ObjectUrl(targetPath);
}