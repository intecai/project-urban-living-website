import { getApiBaseUrl, getImageDomain } from "@/utils/siteConfig";

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/** Backend `GET /api/uploads/:key` — key must be a single segment (no slashes). */
function apiUploadUrl(objectFileName: string): string {
  const clean = objectFileName.replace(/^\/+/, "").replace(/^uploads\//i, "");
  return `${getApiBaseUrl()}/uploads/${encodeURIComponent(clean)}`;
}

function s3ObjectUrl(key: string): string {
  const domain = getImageDomain();
  const cleanKey = key.replace(/^\/+/, "");
  return `${domain}/${cleanKey}`;
}

/**
 * Resolves CMS/S3 image keys, UUIDs, and static paths to a URL suitable for <Image src>.
 * Prefers the API proxy pattern (/api/uploads/:key) for CMS S3 keys and UUIDs so dev/prod
 * work seamlessly even if the S3 bucket is private.
 */
export function resolveImageUrl(path?: string): string {
  if (!path || typeof path !== "string" || path.trim().length === 0) {
    return "";
  }

  const cleanPath = path.trim();

  // If wrong legacy path /upload/{id} was passed, rewrite to /api/uploads/{key}
  if (/^\/?upload\/[^\/]+$/i.test(cleanPath)) {
    const key = cleanPath.replace(/^\/?upload\//i, "");
    return apiUploadUrl(key);
  }

  if (
    cleanPath.startsWith("http://") ||
    cleanPath.startsWith("https://") ||
    cleanPath.startsWith("data:") ||
    cleanPath.startsWith("/")
  ) {
    return cleanPath;
  }

  const targetPath = cleanPath.replace(/^\/+/, "");

  // uploads/abc.jpg → proxy via API /api/uploads/:key (same as CMS)
  const uploadsMatch = /^uploads\/([^/]+)$/i.exec(targetPath);
  if (uploadsMatch?.[1]) {
    return apiUploadUrl(uploadsMatch[1]);
  }

  // Nested S3 keys (e.g. cms/uploads/file.png or temp/file.png)
  // Use the API proxy with the extracted filename to avoid private bucket access failures,
  // falling back to S3 object URL if no filename could be extracted.
  if (targetPath.includes("/")) {
    const segments = targetPath.split("/");
    const lastSegment = segments[segments.length - 1];
    if (lastSegment && (lastSegment.includes(".") || UUID_REGEX.test(lastSegment))) {
      return apiUploadUrl(lastSegment);
    }
    return s3ObjectUrl(targetPath);
  }

  // File name with extension (e.g. 4d9a71ad.png) -> API proxy
  if (targetPath.includes(".")) {
    return apiUploadUrl(targetPath);
  }

  // Raw UUID string -> API proxy /api/uploads/{key}
  if (UUID_REGEX.test(targetPath)) {
    return apiUploadUrl(targetPath);
  }

  // Fallback to API proxy
  return apiUploadUrl(targetPath);
}
